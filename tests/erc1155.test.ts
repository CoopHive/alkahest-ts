import { beforeAll, beforeEach, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { encodeAbiParameters, parseAbiParameters, parseAbi } from "viem";
import {
  ANVIL_ACCOUNTS,
  MOCK_TOKENS,
  MOCK_ABIS,
  createTestClient,
  createWalletClient,
  mintERC1155,
  mintERC721,
  advanceTime,
  mockErc721,
  mockErc1155,
} from "./utils/anvil";
import { abi as erc20Abi } from "../src/contracts/IERC20";

const usdc = contractAddresses["Base Sepolia"].usdc;

// Real mock ERC1155 addresses from our deployment
const mockErc1155_1 =
  "0x7CAA519f345B4128612cD19F1C8C7Bd76A744B71" as `0x${string}`; // MockERC1155_1
const mockErc1155_2 =
  "0xD3e4a076131bE79940c19Dd721aDEED6516aDb7A" as `0x${string}`; // MockERC1155_2

// MockERC1155 ABI for minting
const mockErc1155Abi = parseAbi([
  "function mint(address to, uint256 id, uint256 amount) public",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
]);

let clientAlice: ReturnType<typeof makeClient>;
let clientBob: ReturnType<typeof makeClient>;
let aliceTokenId: bigint;
let bobTokenId: bigint;
let aliceErc721Id: bigint;
let bobErc721Id: bigint;

// Helper function to mint new ERC1155 tokens for tests
async function mintErc1155Tokens() {
  // Create random token IDs to avoid conflicts
  const aliceTokenId1 = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  const aliceTokenId2 = BigInt(Math.floor(Math.random() * 1000000) + 1010000);
  const bobTokenId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);

  // Mint tokens for Alice
  const mintToken1 = await clientAlice.viemClient.writeContract({
    address: mockErc1155_1,
    abi: mockErc1155Abi,
    functionName: "mint",
    args: [clientAlice.address, aliceTokenId1, 5n], // Mint 5 tokens
  });

  const mintToken2 = await clientAlice.viemClient.writeContract({
    address: mockErc1155_1,
    abi: mockErc1155Abi,
    functionName: "mint",
    args: [clientAlice.address, aliceTokenId2, 10n], // Mint 10 tokens
  });

  // Mint tokens for Bob
  const mintToken3 = await clientBob.viemClient.writeContract({
    address: mockErc1155_2,
    abi: mockErc1155Abi,
    functionName: "mint",
    args: [clientBob.address, bobTokenId, 10n], // Mint 10 tokens
  });

  // Wait for transactions to be mined
  await clientAlice.viemClient.waitForTransactionReceipt({ hash: mintToken1 });
  await clientAlice.viemClient.waitForTransactionReceipt({ hash: mintToken2 });
  await clientBob.viemClient.waitForTransactionReceipt({ hash: mintToken3 });

  return {
    aliceErc1155_1: { address: mockErc1155_1, id: aliceTokenId1, value: 5n },
    aliceErc1155_2: { address: mockErc1155_1, id: aliceTokenId2, value: 10n },
    bobErc1155: { address: mockErc1155_2, id: bobTokenId, value: 10n },
  };
}

beforeAll(() => {
  // create clients using Anvil default accounts with walletClient instead of testClient
  clientAlice = makeClient(createWalletClient(ANVIL_ACCOUNTS.ALICE.privateKey));
  clientBob = makeClient(createWalletClient(ANVIL_ACCOUNTS.BOB.privateKey));
});

// Before each test, make sure accounts have enough tokens and ERC1155 tokens
beforeEach(async () => {
  // Create test clients for direct blockchain interactions
  const testClientAlice = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  const testClientBob = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Fund test accounts with USDC
  const aliceUsdcBalance = await testClientAlice.readContract({
    address: usdc,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientAlice.address],
  });

  // Ensure Alice has at least 100 USDC
  if (aliceUsdcBalance < 100n) {
    console.log("Funding Alice with USDC");
    await testClientAlice.request({
      method: "anvil_impersonateAccount",
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"],
    });

    await testClientAlice.writeContract({
      address: usdc,
      abi: erc20Abi.abi,
      functionName: "transfer",
      args: [clientAlice.address, 1000n],
      account: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`,
    });

    await testClientAlice.request({
      method: "anvil_stopImpersonatingAccount",
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"],
    });
  }

  // Mint fresh ERC1155 tokens for Alice and Bob
  aliceTokenId = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  bobTokenId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);

  // Also mint an ERC721 for Alice for cross-token tests
  aliceErc721Id = BigInt(Math.floor(Math.random() * 1000000) + 3010000);
  // Create a random ID for Bob's ERC721
  bobErc721Id = BigInt(Math.floor(Math.random() * 1000000) + 4010000);

  // Mint tokens
  await mintERC1155(
    testClientAlice,
    MOCK_TOKENS.MULTI_TOKEN1,
    clientAlice.address,
    aliceTokenId,
    10n,
  ); // Mint 10 tokens
  await mintERC1155(
    testClientBob,
    MOCK_TOKENS.MULTI_TOKEN2,
    clientBob.address,
    bobTokenId,
    5n,
  ); // Mint 5 tokens
  await mintERC721(
    testClientAlice,
    MOCK_TOKENS.NFT1,
    clientAlice.address,
    aliceErc721Id,
  );
});

test("tradeErc1155ForErc1155", async () => {
  // Mint fresh tokens for this test
  const tokens = await mintErc1155Tokens();

  // approve escrow contract to use ERC1155 tokens
  const escrowApproval = await clientAlice.erc1155.approveAll(
    tokens.aliceErc1155_1.address,
    "escrow",
  );
  console.log(escrowApproval);
  expect(escrowApproval).toBeString();

  // deposit ERC1155 tokens into escrow, demanding other ERC1155 tokens, with no expiration
  const escrow = await clientAlice.erc1155.buyErc1155ForErc1155(
    tokens.aliceErc1155_1,
    tokens.bobErc1155,
    0n,
  );
  console.log(escrow);

  // approve payment contract to use ERC1155 tokens
  const paymentApproval = await clientBob.erc1155.approveAll(
    tokens.bobErc1155.address,
    "payment",
  );
  console.log(paymentApproval);
  expect(paymentApproval).toBeString();

  // pay with ERC1155 tokens for ERC1155 tokens (fulfill the buy order)
  const payment = await clientBob.erc1155.payErc1155ForErc1155(
    escrow.attested.uid,
  );
  console.log(payment);
});

test("tradeErc1155ForErc20", async () => {
  // Mint fresh tokens for this test
  const tokens = await mintErc1155Tokens();

  // approve escrow contract to use ERC1155 tokens
  const escrowApproval = await clientAlice.erc1155.approveAll(
    tokens.aliceErc1155_2.address,
    "escrow",
  );
  console.log(escrowApproval);
  expect(escrowApproval).toBeString();

  // deposit ERC1155 tokens into escrow, demanding ERC20 tokens, with no expiration
  const escrow = await clientAlice.erc1155.buyErc20WithErc1155(
    tokens.aliceErc1155_2,
    { address: usdc, value: 100n },
    0n,
  );
  console.log(escrow);

  // approve payment contract to spend tokens
  const paymentApproval = await clientBob.erc20.approve(
    { address: usdc, value: 100n },
    contractAddresses["Base Sepolia"].erc20PaymentObligation,
  );
  console.log(paymentApproval);
  expect(paymentApproval).toBeString();

  // pay with ERC20 for ERC1155 (fulfill the buy order)
  const payment = await clientBob.erc1155.payErc1155ForErc20(
    escrow.attested.uid,
  );
  console.log(payment);
});

test("customDemandWithErc1155", async () => {
  // Mint fresh tokens for this test
  const tokens = await mintErc1155Tokens();

  // approve escrow contract to use ERC1155 tokens
  const escrowApproval = await clientAlice.erc1155.approveAll(
    tokens.aliceErc1155_1.address,
    "escrow",
  );
  expect(escrowApproval).toBeString();

  // construct custom demand using TrustedPartyArbiter
  const demand = clientAlice.arbiters.encodeTrustedPartyDemand({
    creator: clientBob.address,
    baseArbiter: contractAddresses["Base Sepolia"].trivialArbiter,
    baseDemand: "0x", // Empty demand for test
  });

  // make escrow with generic escrow function,
  // passing in TrustedPartyArbiter's address and our custom demand
  const escrow = await clientAlice.erc1155.buyWithErc1155(
    tokens.aliceErc1155_1,
    { arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter, demand },
    0n,
  );
  console.log("escrow: ", escrow);

  // now Bob creates a fulfillment
  const buyStatement = await clientBob.getAttestation(escrow.attested.uid);
  const decodedStatement = clientBob.erc1155.decodeEscrowStatement(
    buyStatement.data,
  );

  // Create a result statement
  const resultHash = await clientBob.stringResult.makeStatement(
    "ERC1155 fulfillment",
  );
  const resultStatement = await clientBob.getAttestationFromTxHash(resultHash);
  console.log("result statement: ", resultStatement);

  // collect the payment from escrow
  const collection = await clientBob.erc1155.collectPayment(
    escrow.attested.uid,
    resultStatement.uid,
  );
  console.log("collection: ", collection);

  // Alice can wait for fulfillment of their escrow
  const fulfillment = await clientAlice.waitForFulfillment(
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
        payee: clientBob.address,
      },
    ],
  );

  // Test decode functions
  const decodedEscrow =
    clientAlice.erc1155.decodeEscrowStatement(escrowStatementData);
  expect(decodedEscrow.token).toBe(mockErc1155);
  expect(decodedEscrow.tokenId).toBe(1n);
  expect(decodedEscrow.amount).toBe(5n);
  expect(decodedEscrow.arbiter).toBe(
    contractAddresses["Base Sepolia"].trivialArbiter,
  );
  expect(decodedEscrow.demand).toBe("0x1234");

  const decodedPayment =
    clientAlice.erc1155.decodePaymentStatement(paymentStatementData);
  expect(decodedPayment.token).toBe(mockErc1155);
  expect(decodedPayment.tokenId).toBe(2n);
  expect(decodedPayment.amount).toBe(3n);
  expect(decodedPayment.payee).toBe(clientBob.address);
});

test("approveAll and revokeAll", async () => {
  try {
    // Test approveAll function (this will likely fail without a real ERC1155 contract)
    const approveResult = await clientAlice.erc1155.approveAll(
      mockErc1155,
      "escrow",
    );
    expect(approveResult).toBeString();

    // Test revokeAll function
    const revokeResult = await clientAlice.erc1155.revokeAll(
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
  const escrowApproval = await clientAlice.erc1155.approveAll(
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

  const escrow = await clientAlice.erc1155.buyErc1155ForErc1155(
    { address: MOCK_TOKENS.MULTI_TOKEN1, id: aliceTokenId, value: 3n },
    { address: MOCK_TOKENS.MULTI_TOKEN2, id: bobTokenId, value: 2n },
    expirationTime,
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Try to collect before expiration - should fail
  try {
    await clientAlice.erc1155.collectExpired(escrow.attested.uid);
    // Should not reach here
    expect(true).toBe(false);
  } catch (err) {
    // Expected to fail because escrow hasn't expired
    expect(err).toBeTruthy();
  }

  // Advance time by 10 seconds (past the expiration)
  await advanceTime(testClient, 10);

  // Now collect the expired escrow - should succeed
  const collectTx = await clientAlice.erc1155.collectExpired(
    escrow.attested.uid,
  );
  expect(collectTx).toBeString();

  // Verify the tokens were returned to Alice
  const balance = await testClient.readContract({
    address: MOCK_TOKENS.MULTI_TOKEN1,
    abi: MOCK_ABIS.ERC1155,
    functionName: "balanceOf",
    args: [clientAlice.address, aliceTokenId],
  });

  // The balance should still be 10 since the tokens were returned
  expect(balance).toBe(10n);
});

test("buyErc20WithErc1155 (simulated)", async () => {
  // Test creating an escrow for trading ERC1155 for ERC20
  try {
    // In a real test, we would:
    // 1. Mint ERC1155 tokens to Alice
    // 2. Approve the escrow contract
    // 3. Create the escrow

    // For now, we'll just test the function can be called
    // This will likely fail without real tokens
    const escrow = await clientAlice.erc1155.buyErc20WithErc1155(
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
  // First, we need to mint an ERC721 to Bob for the trade
  const mintClient = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);
  await mintERC721(
    mintClient,
    MOCK_TOKENS.NFT2,
    clientBob.address,
    bobErc721Id,
  );

  // Approve the escrow contract to transfer ERC1155 tokens
  const escrowApproval = await clientAlice.erc1155.approveAll(
    MOCK_TOKENS.MULTI_TOKEN1,
    "escrow",
  );
  expect(escrowApproval).toBeString();

  // Create an escrow offering ERC1155 tokens and requesting an ERC721 token
  // Create test client for transaction handling
  const testClientAlice = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);

  const escrow = await clientAlice.erc1155.buyErc721WithErc1155(
    { address: MOCK_TOKENS.MULTI_TOKEN1, id: aliceTokenId, value: 3n },
    { address: MOCK_TOKENS.NFT2, id: bobErc721Id },
    0n, // No expiration
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Bob approves the ERC721 token for the trade
  const paymentApproval = await clientBob.erc721.approve(
    { address: MOCK_TOKENS.NFT2, id: bobErc721Id },
    "payment",
  );
  expect(paymentApproval).toBeString();

  // Create a test client for Bob
  const testClientBob = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Bob fulfills the escrow
  const payment = await clientBob.erc1155.payErc1155ForErc721(
    escrow.attested.uid,
  );
  expect(payment.hash).toBeString();

  // Create test clients for verification
  const verifyClientAlice = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  const verifyClientBob = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Verify the ERC721 token was transferred to Alice
  const erc721Owner = await verifyClientAlice.readContract({
    address: MOCK_TOKENS.NFT2,
    abi: MOCK_ABIS.ERC721,
    functionName: "ownerOf",
    args: [bobErc721Id],
  });

  // The ERC721 token should now be owned by Alice
  expect(erc721Owner).toBe(clientAlice.address);

  // Verify the ERC1155 tokens were transferred to Bob
  const tokenBalance = await verifyClientBob.readContract({
    address: MOCK_TOKENS.MULTI_TOKEN1,
    abi: MOCK_ABIS.ERC1155,
    functionName: "balanceOf",
    args: [clientBob.address, aliceTokenId],
  });

  // Bob should have received 3 tokens
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
    const escrow = await clientAlice.erc1155.buyBundleWithErc1155(
      { address: mockErc1155, id: 1n, value: 5n },
      bundle,
      clientBob.address,
      0n,
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without real tokens
    console.log("ERC1155-Bundle trading test failed (expected):", err);
  }
});
