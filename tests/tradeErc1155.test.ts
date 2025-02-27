import { beforeAll, expect, test, describe } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import {
  createWalletClient,
  http,
  parseAbi,
} from "viem";

// Real mock ERC1155 addresses from our deployment
const mockMultiToken1 = "0x7CAA519f345B4128612cD19F1C8C7Bd76A744B71" as `0x${string}`; // MockMultiToken1
const mockMultiToken2 = "0xD3e4a076131bE79940c19Dd721aDEED6516aDb7A" as `0x${string}`; // MockMultiToken2
// Keep USDC for ERC20 tests
const usdc = contractAddresses["Base Sepolia"].usdc;

// MockERC1155 ABI for minting
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

// Helper function to mint new ERC1155 tokens for tests
async function mintErc1155Tokens() {
  // Create random token IDs to avoid conflicts
  const aliceTokenId1 = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  const aliceTokenId2 = BigInt(Math.floor(Math.random() * 1000000) + 1010000);
  const bobTokenId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);
  
  // Mint tokens for Alice
  const mintToken1 = await clientBuyer.viemClient.writeContract({
    address: mockMultiToken1,
    abi: mockErc1155Abi,
    functionName: "mint",
    args: [clientBuyer.address, aliceTokenId1, 5n], // Mint 5 tokens
  });
  
  const mintToken2 = await clientBuyer.viemClient.writeContract({
    address: mockMultiToken1,
    abi: mockErc1155Abi,
    functionName: "mint",
    args: [clientBuyer.address, aliceTokenId2, 10n], // Mint 10 tokens
  });
  
  // Mint tokens for Bob
  const mintToken3 = await clientSeller.viemClient.writeContract({
    address: mockMultiToken2,
    abi: mockErc1155Abi,
    functionName: "mint",
    args: [clientSeller.address, bobTokenId, 10n], // Mint 10 tokens
  });
  
  // Wait for transactions to be mined
  await clientBuyer.viemClient.waitForTransactionReceipt({ hash: mintToken1 });
  await clientBuyer.viemClient.waitForTransactionReceipt({ hash: mintToken2 });
  await clientSeller.viemClient.waitForTransactionReceipt({ hash: mintToken3 });
  
  return {
    aliceToken1: { address: mockMultiToken1, id: aliceTokenId1, value: 5n },
    aliceToken2: { address: mockMultiToken1, id: aliceTokenId2, value: 10n },
    bobToken: { address: mockMultiToken2, id: bobTokenId, value: 10n },
  };
}

test("tradeErc1155ForErc1155", async () => {
  // Mint fresh tokens for this test
  const tokens = await mintErc1155Tokens();
  
  // approve escrow contract to use ERC1155 tokens
  const escrowApproval = await clientBuyer.erc1155.approveAll(
    tokens.aliceToken1.address,
    "escrow",
  );
  console.log(escrowApproval);
  expect(escrowApproval).toBeString();

  // deposit ERC1155 tokens into escrow, demanding other ERC1155 tokens, with no expiration
  const escrow = await clientBuyer.erc1155.buyErc1155ForErc1155(
    tokens.aliceToken1,
    tokens.bobToken,
    0n,
  );
  console.log(escrow);

  // approve payment contract to use ERC1155 tokens
  const paymentApproval = await clientSeller.erc1155.approveAll(
    tokens.bobToken.address,
    "payment",
  );
  console.log(paymentApproval);
  expect(paymentApproval).toBeString();

  // pay with ERC1155 tokens for ERC1155 tokens (fulfill the buy order)
  const payment = await clientSeller.erc1155.payErc1155ForErc1155(
    escrow.attested.uid,
  );
  console.log(payment);
});

test("tradeErc1155ForErc20", async () => {
  // Mint fresh tokens for this test
  const tokens = await mintErc1155Tokens();

  // approve escrow contract to use ERC1155 tokens
  const escrowApproval = await clientBuyer.erc1155.approveAll(
    tokens.aliceToken2.address,
    "escrow",
  );
  console.log(escrowApproval);
  expect(escrowApproval).toBeString();

  // deposit ERC1155 tokens into escrow, demanding ERC20 tokens, with no expiration
  const escrow = await clientBuyer.erc1155.buyErc20WithErc1155(
    tokens.aliceToken2,
    { address: usdc, value: 100n },
    0n,
  );
  console.log(escrow);

  // approve payment contract to spend tokens
  const paymentApproval = await clientSeller.erc20.approve(
    { address: usdc, value: 100n },
    contractAddresses["Base Sepolia"].erc20PaymentObligation,
  );
  console.log(paymentApproval);
  expect(paymentApproval).toBeString();

  // pay with ERC20 for ERC1155 (fulfill the buy order)
  const payment = await clientSeller.erc1155.payErc1155ForErc20(
    escrow.attested.uid,
  );
  console.log(payment);
});

test("customDemandWithErc1155", async () => {
  // Mint fresh tokens for this test
  const tokens = await mintErc1155Tokens();
  
  // approve escrow contract to use ERC1155 tokens
  const escrowApproval = await clientBuyer.erc1155.approveAll(
    tokens.aliceToken1.address,
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
  const escrow = await clientBuyer.erc1155.buyWithErc1155(
    tokens.aliceToken1,
    { arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter, demand },
    0n,
  );
  console.log("escrow: ", escrow);

  // now the seller creates a fulfillment
  const buyStatement = await clientSeller.getAttestation(escrow.attested.uid);
  const decodedStatement = clientSeller.erc1155.decodeEscrowStatement(
    buyStatement.data,
  );
  
  // Create a result statement
  const resultHash = await clientSeller.stringResult.makeStatement("ERC1155 fulfillment");
  const resultStatement = await clientSeller.getAttestationFromTxHash(resultHash);
  console.log("result statement: ", resultStatement);

  // collect the payment from escrow
  const collection = await clientSeller.erc1155.collectPayment(
    escrow.attested.uid,
    resultStatement.uid,
  );
  console.log("collection: ", collection);

  // the buyer can wait for fulfillment of their escrow
  const fulfillment = await clientBuyer.waitForFulfillment(
    contractAddresses["Base Sepolia"].erc1155EscrowObligation,
    escrow.attested.uid,
  );
  console.log("fulfillment: ", fulfillment);
});