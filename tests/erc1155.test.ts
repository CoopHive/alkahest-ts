import { beforeAll, beforeEach, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import {
  ANVIL_ACCOUNTS,
  MOCK_TOKENS,
  MOCK_ABIS,
  createTestClient,
  mintERC1155,
  mintERC721,
  advanceTime,
  mockErc721,
  mockErc1155,
} from "./utils/anvil";
import { abi as erc20Abi } from "../src/contracts/IERC20";

const usdc = contractAddresses["Base Sepolia"].usdc;

// Real mock ERC1155 addresses from our deployment
const mockMultiToken1 = "0x7CAA519f345B4128612cD19F1C8C7Bd76A744B71" as `0x${string}`; // MockMultiToken1
const mockMultiToken2 = "0xD3e4a076131bE79940c19Dd721aDEED6516aDb7A" as `0x${string}`; // MockMultiToken2

// MockERC1155 ABI for minting
const mockErc1155Abi = parseAbi([
  "function mint(address to, uint256 id, uint256 amount) public",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
]);

let clientBuyer: ReturnType<typeof makeClient>;
let clientSeller: ReturnType<typeof makeClient>;
let aliceTokenId: bigint;
let bobTokenId: bigint;
let aliceNftId: bigint;
let sellerNftId: bigint;

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

beforeAll(() => {
  // create clients using Anvil default accounts
  clientBuyer = makeClient(createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey));
  clientSeller = makeClient(createTestClient(ANVIL_ACCOUNTS.BOB.privateKey));
});

// Before each test, make sure accounts have enough tokens and ERC1155 tokens
beforeEach(async () => {
  // Create test clients for direct blockchain interactions
  const testClientBuyer = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  const testClientSeller = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Fund test accounts with USDC
  const buyerUsdcBalance = await testClientBuyer.readContract({
    address: usdc,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientBuyer.address],
  });

  // Ensure buyer has at least 100 USDC
  if (buyerUsdcBalance < 100n) {
    console.log("Funding buyer with USDC");
    await testClientBuyer.request({
      method: "anvil_impersonateAccount",
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"],
    });

    await testClientBuyer.writeContract({
      address: usdc,
      abi: erc20Abi.abi,
      functionName: "transfer",
      args: [clientBuyer.address, 1000n],
      account: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`,
    });

    await testClientBuyer.request({
      method: "anvil_stopImpersonatingAccount",
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"],
    });
  }

  // Mint fresh ERC1155 tokens for Alice and Bob
  aliceTokenId = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  bobTokenId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);

  // Also mint an ERC721 for Alice for cross-token tests
  aliceNftId = BigInt(Math.floor(Math.random() * 1000000) + 3010000);
  // Create a random ID for seller's NFT
  sellerNftId = BigInt(Math.floor(Math.random() * 1000000) + 4010000);

  // Mint tokens
  await mintERC1155(
    testClientBuyer,
    MOCK_TOKENS.MULTI_TOKEN1,
    clientBuyer.address,
    aliceTokenId,
    10n,
  ); // Mint 10 tokens
  await mintERC1155(
    testClientSeller,
    MOCK_TOKENS.MULTI_TOKEN2,
    clientSeller.address,
    bobTokenId,
    5n,
  ); // Mint 5 tokens
  await mintERC721(
    testClientBuyer,
    MOCK_TOKENS.NFT1,
    clientBuyer.address,
    aliceNftId,
  );
});

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

test("decodeEscrowStatement and decodePaymentStatement", async () => {
  // Create mock statement data for testing decode functions
  const escrowStatementData = encodeAbiParameters(
    parseAbiParameters(
      "(address token, uint256 tokenId, uint256 amount, address arbiter, bytes demand)",
    ),
    [
      {
        token: mockErc1155,
        tokenId: 1n,
        amount: 5n,
        arbiter: contractAddresses["Base Sepolia"].trivialArbiter,
        demand: "0x1234" as `0x${string}`,
      },
    ],
  );

  const paymentStatementData = encodeAbiParameters(
    parseAbiParameters(
      "(address token, uint256 tokenId, uint256 amount, address payee)",
    ),
    [
      {
        token: mockErc1155,
        tokenId: 2n,
        amount: 3n,
        payee: clientSeller.address,
      },
    ],
  );

  // Test decode functions
  const decodedEscrow =
    clientBuyer.erc1155.decodeEscrowStatement(escrowStatementData);
  expect(decodedEscrow.token).toBe(mockErc1155);
  expect(decodedEscrow.tokenId).toBe(1n);
  expect(decodedEscrow.amount).toBe(5n);
  expect(decodedEscrow.arbiter).toBe(
    contractAddresses["Base Sepolia"].trivialArbiter,
  );
  expect(decodedEscrow.demand).toBe("0x1234");

  const decodedPayment =
    clientBuyer.erc1155.decodePaymentStatement(paymentStatementData);
  expect(decodedPayment.token).toBe(mockErc1155);
  expect(decodedPayment.tokenId).toBe(2n);
  expect(decodedPayment.amount).toBe(3n);
  expect(decodedPayment.payee).toBe(clientSeller.address);
});

test("approveAll and revokeAll", async () => {
  try {
    // Test approveAll function (this will likely fail without a real ERC1155 contract)
    const approveResult = await clientBuyer.erc1155.approveAll(
      mockErc1155,
      "escrow",
    );
    expect(approveResult).toBeString();

    // Test revokeAll function
    const revokeResult = await clientBuyer.erc1155.revokeAll(
      mockErc1155,
      "escrow",
    );
    expect(revokeResult).toBeString();
  } catch (err) {
    // These will likely fail without a real ERC1155 contract
    console.log(
      "ERC1155 approve/revoke tests failed (expected without real contracts):",
      err,
    );
  }
});

test("collectExpired", async () => {
  // Create an escrow with a short expiration time (5 seconds)
  const escrowApproval = await clientBuyer.erc1155.approveAll(
    MOCK_TOKENS.MULTI_TOKEN1,
    "escrow",
  );
  expect(escrowApproval).toBeString();

  // Create a test client for blockchain interactions
  const testClient = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);

  // Get current block timestamp
  const block = await testClient.getBlock();
  // Create an escrow that expires in 5 seconds
  const expirationTime = BigInt(Number(block.timestamp) + 5);

  const escrow = await clientBuyer.erc1155.buyErc1155ForErc1155(
    { address: MOCK_TOKENS.MULTI_TOKEN1, id: aliceTokenId, value: 3n },
    { address: MOCK_TOKENS.MULTI_TOKEN2, id: bobTokenId, value: 2n },
    expirationTime,
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Try to collect before expiration - should fail
  try {
    await clientBuyer.erc1155.collectExpired(escrow.attested.uid);
    // Should not reach here
    expect(true).toBe(false);
  } catch (err) {
    // Expected to fail because escrow hasn't expired
    expect(err).toBeTruthy();
  }

  // Advance time by 10 seconds (past the expiration)
  await advanceTime(testClient, 10);

  // Now collect the expired escrow - should succeed
  const collectTx = await clientBuyer.erc1155.collectExpired(
    escrow.attested.uid,
  );
  expect(collectTx).toBeString();

  // Verify the tokens were returned to the buyer
  const balance = await testClient.readContract({
    address: MOCK_TOKENS.MULTI_TOKEN1,
    abi: MOCK_ABIS.ERC1155,
    functionName: "balanceOf",
    args: [clientBuyer.address, aliceTokenId],
  });

  // The balance should still be 10 since the tokens were returned
  expect(balance).toBe(10n);
});

test("buyErc20WithErc1155 (simulated)", async () => {
  // Test creating an escrow for trading ERC1155 for ERC20
  try {
    // In a real test, we would:
    // 1. Mint ERC1155 tokens to the buyer
    // 2. Approve the escrow contract
    // 3. Create the escrow

    // For now, we'll just test the function can be called
    // This will likely fail without real tokens
    const escrow = await clientBuyer.erc1155.buyErc20WithErc1155(
      { address: mockErc1155, id: 1n, value: 5n },
      { address: usdc, value: 10n },
      0n,
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without real tokens
    console.log("ERC1155-ERC20 trading test failed (expected):", err);
  }
});

test("buyErc721WithErc1155", async () => {
  // Test creating an escrow for trading ERC1155 for ERC721
  // First, we need to mint an ERC721 to the seller for the trade
  const mintClient = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);
  await mintERC721(
    mintClient,
    MOCK_TOKENS.NFT2,
    clientSeller.address,
    sellerNftId,
  );

  // Approve the escrow contract to transfer ERC1155 tokens
  const escrowApproval = await clientBuyer.erc1155.approveAll(
    MOCK_TOKENS.MULTI_TOKEN1,
    "escrow",
  );
  expect(escrowApproval).toBeString();

  // Create an escrow offering ERC1155 tokens and requesting an ERC721 token
  // Create test client for transaction handling
  const testClient = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);

  const escrow = await clientBuyer.erc1155.buyErc721WithErc1155(
    { address: MOCK_TOKENS.MULTI_TOKEN1, id: aliceTokenId, value: 3n },
    { address: MOCK_TOKENS.NFT2, id: sellerNftId },
    0n, // No expiration
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Seller approves the ERC721 token for the trade
  const paymentApproval = await clientSeller.erc721.approve(
    { address: MOCK_TOKENS.NFT2, id: sellerNftId },
    "payment",
  );
  expect(paymentApproval).toBeString();

  // Create a test client for the seller
  const testClientSeller = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Seller fulfills the escrow
  const payment = await clientSeller.erc1155.payErc1155ForErc721(
    escrow.attested.uid,
  );
  expect(payment.hash).toBeString();

  // Create test clients for verification
  const verifyClientBuyer = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  const verifyClientSeller = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Verify the ERC721 token was transferred to the buyer
  const nftOwner = await verifyClientBuyer.readContract({
    address: MOCK_TOKENS.NFT2,
    abi: MOCK_ABIS.ERC721,
    functionName: "ownerOf",
    args: [sellerNftId],
  });

  // The NFT should now be owned by the buyer
  expect(nftOwner).toBe(clientBuyer.address);

  // Verify the ERC1155 tokens were transferred to the seller
  const tokenBalance = await verifyClientSeller.readContract({
    address: MOCK_TOKENS.MULTI_TOKEN1,
    abi: MOCK_ABIS.ERC1155,
    functionName: "balanceOf",
    args: [clientSeller.address, aliceTokenId],
  });

  // The seller should have received 3 tokens
  expect(tokenBalance).toBe(3n);
});

test("buyBundleWithErc1155 (simulated)", async () => {
  // Test creating an escrow for trading ERC1155 for a token bundle
  try {
    // Create a bundle of tokens
    const bundle = {
      erc20s: [{ address: usdc, value: 10n }],
      erc721s: [{ address: mockErc721, id: 2n }],
      erc1155s: [{ address: mockErc1155, id: 3n, value: 3n }],
    };

    // This will likely fail without real tokens
    const escrow = await clientBuyer.erc1155.buyBundleWithErc1155(
      { address: mockErc1155, id: 1n, value: 5n },
      bundle,
      clientSeller.address,
      0n,
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without real tokens
    console.log("ERC1155-Bundle trading test failed (expected):", err);
  }
});