import { beforeAll, expect, test, describe } from "bun:test";
import { contractAddresses, makeClient, type TokenBundle } from "../src";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import {
  createWalletClient,
  http,
  parseAbi,
} from "viem";

const usdc = contractAddresses["Base Sepolia"].usdc;
const eurc = contractAddresses["Base Sepolia"].eurc;
// Real mock NFT and ERC1155 addresses from our deployment
const mockNft1 = "0x6AA9Fa7A3E3529Ee5F566D4c5c2528BE6D7E2eB4" as `0x${string}`; // MockNFT1
const mockNft2 = "0x0895b774eB8a8b69Ca2DCe1897636d7e79f98d78" as `0x${string}`; // MockNFT2
const mockMultiToken1 = "0x7CAA519f345B4128612cD19F1C8C7Bd76A744B71" as `0x${string}`; // MockMultiToken1
const mockMultiToken2 = "0xD3e4a076131bE79940c19Dd721aDEED6516aDb7A" as `0x${string}`; // MockMultiToken2

// ABIs for minting
const mockErc721Abi = parseAbi([
  "function mint(address to, uint256 tokenId) public",
  "function ownerOf(uint256 tokenId) view returns (address)",
]);

const mockErc1155Abi = parseAbi([
  "function mint(address to, uint256 id, uint256 amount) public",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
]);

let clientBuyer: ReturnType<typeof makeClient>;
let clientSeller: ReturnType<typeof makeClient>;

beforeAll(() => {
  // create clients
  clientBuyer = makeClient(
    createWalletClient({
      account: privateKeyToAccount(process.env.PRIVKEY_ALICE as `0x${string}`, {
        nonceManager, // automatic nonce management
      }),
      chain: baseSepolia,
      transport: http(process.env.RPC_URL as string),
    }),
  );
  clientSeller = makeClient(
    createWalletClient({
      account: privateKeyToAccount(process.env.PRIVKEY_BOB as `0x${string}`, {
        nonceManager, // automatic nonce management
      }),
      chain: baseSepolia,
      transport: http(process.env.RPC_URL as string),
    }),
  );
});

// Helper function to mint tokens for bundle tests
async function mintBundleTokens() {
  // Generate random IDs to avoid conflicts
  const aliceNftId = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  const bobNftId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);
  const aliceMultiTokenId = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  const bobMultiTokenId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);
  
  // Mint NFTs
  const mintAliceNft = await clientBuyer.viemClient.writeContract({
    address: mockNft1,
    abi: mockErc721Abi,
    functionName: "mint",
    args: [clientBuyer.address, aliceNftId],
  });
  
  const mintBobNft = await clientSeller.viemClient.writeContract({
    address: mockNft2,
    abi: mockErc721Abi,
    functionName: "mint",
    args: [clientSeller.address, bobNftId],
  });
  
  // Mint ERC1155 tokens
  const mintAliceMultiToken = await clientBuyer.viemClient.writeContract({
    address: mockMultiToken1,
    abi: mockErc1155Abi,
    functionName: "mint",
    args: [clientBuyer.address, aliceMultiTokenId, 5n],
  });
  
  const mintBobMultiToken = await clientSeller.viemClient.writeContract({
    address: mockMultiToken2,
    abi: mockErc1155Abi,
    functionName: "mint",
    args: [clientSeller.address, bobMultiTokenId, 10n],
  });
  
  // Wait for transactions to be mined
  await clientBuyer.viemClient.waitForTransactionReceipt({ hash: mintAliceNft });
  await clientSeller.viemClient.waitForTransactionReceipt({ hash: mintBobNft });
  await clientBuyer.viemClient.waitForTransactionReceipt({ hash: mintAliceMultiToken });
  await clientSeller.viemClient.waitForTransactionReceipt({ hash: mintBobMultiToken });
  
  return {
    aliceNft: { address: mockNft1, id: aliceNftId },
    bobNft: { address: mockNft2, id: bobNftId },
    aliceMultiToken: { address: mockMultiToken1, id: aliceMultiTokenId, value: 5n },
    bobMultiToken: { address: mockMultiToken2, id: bobMultiTokenId, value: 10n },
  };
}

test("tradeBundleForBundle", async () => {
  // Mint fresh tokens for bundle test
  const tokens = await mintBundleTokens();
  
  // Create token bundles for trading
  const myBundle: TokenBundle = {
    erc20s: [{ address: usdc, value: 100n }],
    erc721s: [tokens.aliceNft],
    erc1155s: [tokens.aliceMultiToken],
  };

  const theirBundle: TokenBundle = {
    erc20s: [{ address: eurc, value: 200n }],
    erc721s: [tokens.bobNft],
    erc1155s: [tokens.bobMultiToken],
  };

  // Approve tokens for escrow
  await clientBuyer.erc20.approve(
    { address: usdc, value: 100n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  await clientBuyer.erc721.approve(
    tokens.aliceNft,
    "escrow",
  );
  await clientBuyer.erc1155.approveAll(
    tokens.aliceMultiToken.address,
    "escrow",
  );

  // Create escrow with token bundle, demanding another bundle
  const escrow = await clientBuyer.bundle.buyBundleForBundle(
    myBundle,
    theirBundle,
    0n,
  );
  console.log(escrow);
  expect(escrow.hash).toBeString();

  // Approve tokens for payment
  await clientSeller.erc20.approve(
    { address: eurc, value: 200n },
    contractAddresses["Base Sepolia"].erc20PaymentObligation,
  );
  await clientSeller.erc721.approve(
    tokens.bobNft,
    "payment",
  );
  await clientSeller.erc1155.approveAll(
    tokens.bobMultiToken.address,
    "payment",
  );

  // Pay with token bundle for another bundle
  const payment = await clientSeller.bundle.payBundleForBundle(
    escrow.attested.uid,
  );
  console.log(payment);
});

test("bundleWithCustomDemand", async () => {
  // Mint fresh tokens for this test
  const tokens = await mintBundleTokens();
  
  // Create a token bundle for trading
  const myBundle: TokenBundle = {
    erc20s: [{ address: usdc, value: 50n }],
    erc721s: [],
    erc1155s: [tokens.aliceMultiToken],
  };

  // Approve tokens for escrow
  await clientBuyer.erc20.approve(
    { address: usdc, value: 50n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  await clientBuyer.erc1155.approveAll(
    tokens.aliceMultiToken.address,
    "escrow",
  );

  // Construct custom demand
  const demand = clientBuyer.arbiters.encodeTrustedPartyDemand({
    creator: clientSeller.address,
    baseArbiter: contractAddresses["Base Sepolia"].trivialArbiter,
    baseDemand: "0x", // Empty demand for test
  });

  // Create escrow with token bundle and custom demand
  const escrow = await clientBuyer.bundle.buyWithBundle(
    myBundle,
    { arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter, demand },
    0n,
  );
  console.log("escrow: ", escrow);

  // Seller creates fulfillment
  const buyStatement = await clientSeller.getAttestation(escrow.attested.uid);
  const decodedStatement = clientSeller.bundle.decodeEscrowStatement(
    buyStatement.data,
  );
  
  // Create result statement
  const resultHash = await clientSeller.stringResult.makeStatement("Bundle fulfillment");
  const resultStatement = await clientSeller.getAttestationFromTxHash(resultHash);
  console.log("result statement: ", resultStatement);

  // Collect payment from escrow
  const collection = await clientSeller.bundle.collectPayment(
    escrow.attested.uid,
    resultStatement.uid,
  );
  console.log("collection: ", collection);

  // Buyer waits for fulfillment
  const fulfillment = await clientBuyer.waitForFulfillment(
    contractAddresses["Base Sepolia"].tokenBundleEscrowObligation,
    escrow.attested.uid,
  );
  console.log("fulfillment: ", fulfillment);
});