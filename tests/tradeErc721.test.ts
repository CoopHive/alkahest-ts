import { beforeAll, expect, test, describe } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import {
  createWalletClient,
  http,
  parseAbi,
  encodeFunctionData,
} from "viem";

// Real mock NFT addresses from our deployment
const mockNft1 = "0x6AA9Fa7A3E3529Ee5F566D4c5c2528BE6D7E2eB4" as `0x${string}`; // MockNFT1
const mockNft2 = "0x0895b774eB8a8b69Ca2DCe1897636d7e79f98d78" as `0x${string}`; // MockNFT2

// MockERC721 ABI for minting
const mockErc721Abi = parseAbi([
  "function mint(address to, uint256 tokenId) public",
  "function ownerOf(uint256 tokenId) view returns (address)",
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

// Helper function to mint new tokens for tests
async function mintErc721Tokens() {
  // Mint new tokens for Alice using large random IDs to avoid conflicts
  const aliceTokenId1 = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  const aliceTokenId2 = BigInt(Math.floor(Math.random() * 1000000) + 1010000);
  
  // Mint new tokens for Bob
  const bobTokenId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);
  
  // Mint tokens
  const mintToken1 = await clientBuyer.viemClient.writeContract({
    address: mockNft1,
    abi: mockErc721Abi,
    functionName: "mint",
    args: [clientBuyer.address, aliceTokenId1],
  });
  
  const mintToken2 = await clientBuyer.viemClient.writeContract({
    address: mockNft1,
    abi: mockErc721Abi,
    functionName: "mint",
    args: [clientBuyer.address, aliceTokenId2],
  });
  
  const mintToken3 = await clientSeller.viemClient.writeContract({
    address: mockNft2,
    abi: mockErc721Abi,
    functionName: "mint",
    args: [clientSeller.address, bobTokenId],
  });
  
  // Wait for transactions to be mined
  await clientBuyer.viemClient.waitForTransactionReceipt({ hash: mintToken1 });
  await clientBuyer.viemClient.waitForTransactionReceipt({ hash: mintToken2 });
  await clientSeller.viemClient.waitForTransactionReceipt({ hash: mintToken3 });
  
  return {
    aliceNft: { address: mockNft1, id: aliceTokenId1 },
    aliceNft2: { address: mockNft1, id: aliceTokenId2 },
    bobNft: { address: mockNft2, id: bobTokenId },
  };
}

test("tradeErc721ForErc721", async () => {
  // Mint fresh tokens for this test to avoid conflicts
  const tokens = await mintErc721Tokens();
  
  // approve escrow contract to spend NFT
  const escrowApproval = await clientBuyer.erc721.approve(
    tokens.aliceNft,
    "escrow",
  );
  console.log(escrowApproval);
  expect(escrowApproval).toBeString();

  // deposit NFT into escrow, demanding another NFT, with no expiration
  const escrow = await clientBuyer.erc721.buyErc721ForErc721(
    tokens.aliceNft,
    tokens.bobNft,
    0n,
  );
  console.log(escrow);

  // approve payment contract to spend NFT
  const paymentApproval = await clientSeller.erc721.approve(
    tokens.bobNft,
    "payment",
  );
  console.log(paymentApproval);
  expect(paymentApproval).toBeString();

  // pay with NFT for another NFT (fulfill the buy order)
  const payment = await clientSeller.erc721.payErc721ForErc721(
    escrow.attested.uid,
  );
  console.log(payment);
});

test("tradeErc721ForCustom", async () => {
  // Mint fresh tokens for this test
  const tokens = await mintErc721Tokens();
  
  // approve escrow contract to spend NFT
  const escrowApproval = await clientBuyer.erc721.approve(
    tokens.aliceNft2,
    "escrow",
  );
  expect(escrowApproval).toBeString();
  
  // construct custom demand using TrustedPartyArbiter
  const demand = clientBuyer.arbiters.encodeTrustedPartyDemand({
    creator: clientSeller.address,
    baseArbiter: contractAddresses["Base Sepolia"].trivialArbiter,
    baseDemand: "0x", // Empty demand for test
  });

  // make escrow with generic escrow function,
  // passing in TrustedPartyArbiter's address and our custom demand
  const escrow = await clientBuyer.erc721.buyWithErc721(
    tokens.aliceNft2,
    { arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter, demand },
    0n,
  );
  console.log("escrow: ", escrow);

  // now the seller creates a fulfillment
  const buyStatement = await clientSeller.getAttestation(escrow.attested.uid);
  const decodedStatement = clientSeller.erc721.decodeEscrowStatement(
    buyStatement.data,
  );
  
  // Create a result statement (e.g., JobResultObligation)
  const resultHash = await clientSeller.stringResult.makeStatement("Result completed");
  const resultStatement = await clientSeller.getAttestationFromTxHash(resultHash);
  console.log("result statement: ", resultStatement);

  // collect the payment from escrow
  const collection = await clientSeller.erc721.collectPayment(
    escrow.attested.uid,
    resultStatement.uid,
  );
  console.log("collection: ", collection);

  // meanwhile, the buyer can wait for fulfillment of their escrow
  const fulfillment = await clientBuyer.waitForFulfillment(
    contractAddresses["Base Sepolia"].erc721EscrowObligation,
    escrow.attested.uid,
  );
  console.log("fulfillment: ", fulfillment);
  
  // Extract the result from the fulfillment statement
  if (!fulfillment.fulfillment) throw new Error("invalid fulfillment");
  const fulfillmentData = await clientBuyer.getAttestation(
    fulfillment.fulfillment,
  );
  console.log("fulfillment data: ", fulfillmentData);
});