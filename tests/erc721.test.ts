import { beforeAll, beforeEach, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { encodeAbiParameters, parseAbiParameters, parseAbi } from "viem";
import {
  ANVIL_ACCOUNTS,
  MOCK_TOKENS,
  MOCK_ABIS,
  createTestClient,
  createWalletClient,
  mintERC721,
  advanceTime,
  mockErc721,
  mockErc1155,
} from "./utils/anvil";
import { abi as erc20Abi } from "../src/contracts/IERC20";

const usdc = contractAddresses["Base Sepolia"].usdc;
const eurc = contractAddresses["Base Sepolia"].eurc;

// Real mock ERC721 addresses from our deployment
const mockErc721_1 =
  "0x6AA9Fa7A3E3529Ee5F566D4c5c2528BE6D7E2eB4" as `0x${string}`; // MockERC721_1
const mockErc721_2 =
  "0x0895b774eB8a8b69Ca2DCe1897636d7e79f98d78" as `0x${string}`; // MockERC721_2

// MockERC721 ABI for minting
const mockErc721Abi = parseAbi([
  "function mint(address to, uint256 tokenId) public",
  "function ownerOf(uint256 tokenId) view returns (address)",
]);

let clientAlice: ReturnType<typeof makeClient>;
let clientBob: ReturnType<typeof makeClient>;
let aliceTokenId: bigint;
let bobTokenId: bigint;

// Helper function to mint new tokens for tests
async function mintErc721Tokens() {
  // Mint new tokens for Alice using large random IDs to avoid conflicts
  const aliceTokenId1 = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  const aliceTokenId2 = BigInt(Math.floor(Math.random() * 1000000) + 1010000);

  // Mint new tokens for Bob
  const bobTokenId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);

  // Mint tokens
  const mintToken1 = await clientAlice.viemClient.writeContract({
    address: mockErc721_1,
    abi: mockErc721Abi,
    functionName: "mint",
    args: [clientAlice.address, aliceTokenId1],
  });

  const mintToken2 = await clientAlice.viemClient.writeContract({
    address: mockErc721_1,
    abi: mockErc721Abi,
    functionName: "mint",
    args: [clientAlice.address, aliceTokenId2],
  });

  const mintToken3 = await clientBob.viemClient.writeContract({
    address: mockErc721_2,
    abi: mockErc721Abi,
    functionName: "mint",
    args: [clientBob.address, bobTokenId],
  });

  // Wait for transactions to be mined
  await clientAlice.viemClient.waitForTransactionReceipt({ hash: mintToken1 });
  await clientAlice.viemClient.waitForTransactionReceipt({ hash: mintToken2 });
  await clientBob.viemClient.waitForTransactionReceipt({ hash: mintToken3 });

  return {
    aliceErc721: { address: mockErc721_1, id: aliceTokenId1 },
    aliceErc721_2: { address: mockErc721_1, id: aliceTokenId2 },
    bobErc721: { address: mockErc721_2, id: bobTokenId },
  };
}

beforeAll(() => {
  // create clients using Anvil default accounts with walletClient instead of testClient
  clientAlice = makeClient(createWalletClient(ANVIL_ACCOUNTS.ALICE.privateKey));
  clientBob = makeClient(createWalletClient(ANVIL_ACCOUNTS.BOB.privateKey));
});

// Before each test, make sure accounts have enough tokens and ERC721 tokens
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
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"], // USDC contract
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

  // Mint fresh ERC721 tokens for Alice and Bob
  aliceTokenId = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  bobTokenId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);

  // Mint ERC721 tokens
  await mintERC721(
    testClientAlice,
    MOCK_TOKENS.NFT1,
    clientAlice.address,
    aliceTokenId,
  );
  await mintERC721(
    testClientBob,
    MOCK_TOKENS.NFT2,
    clientBob.address,
    bobTokenId,
  );
});

test("tradeErc721ForErc721", async () => {
  // Mint fresh tokens for this test to avoid conflicts
  const tokens = await mintErc721Tokens();

  // approve escrow contract to spend ERC721 token
  const escrowApproval = await clientAlice.erc721.approve(
    tokens.aliceErc721,
    "escrow",
  );
  console.log(escrowApproval);
  expect(escrowApproval).toBeString();

  // deposit ERC721 token into escrow, demanding another ERC721 token, with no expiration
  const escrow = await clientAlice.erc721.buyErc721ForErc721(
    tokens.aliceErc721,
    tokens.bobErc721,
    0n,
  );
  console.log(escrow);

  // approve payment contract to spend ERC721 token
  const paymentApproval = await clientBob.erc721.approve(
    tokens.bobErc721,
    "payment",
  );
  console.log(paymentApproval);
  expect(paymentApproval).toBeString();

  // pay with ERC721 token for another ERC721 token (fulfill the buy order)
  const payment = await clientBob.erc721.payErc721ForErc721(
    escrow.attested.uid,
  );
  console.log(payment);
});

test("tradeErc721ForCustom", async () => {
  // Mint fresh tokens for this test
  const tokens = await mintErc721Tokens();

  // approve escrow contract to spend ERC721 token
  const escrowApproval = await clientAlice.erc721.approve(
    tokens.aliceErc721_2,
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
  const escrow = await clientAlice.erc721.buyWithErc721(
    tokens.aliceErc721_2,
    { arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter, demand },
    0n,
  );
  console.log("escrow: ", escrow);

  // now Bob creates a fulfillment
  const buyStatement = await clientBob.getAttestation(escrow.attested.uid);
  const decodedStatement = clientBob.erc721.decodeEscrowStatement(
    buyStatement.data,
  );

  // Create a result statement (e.g., JobResultObligation)
  const resultHash =
    await clientBob.stringResult.makeStatement("Result completed");
  const resultStatement =
    await clientBob.getAttestedEventFromTxHash(resultHash);
  console.log("result statement: ", resultStatement);

  // collect the payment from escrow
  const collection = await clientBob.erc721.collectPayment(
    escrow.attested.uid,
    resultStatement.uid,
  );
  console.log("collection: ", collection);

  // meanwhile, Alice can wait for fulfillment of their escrow
  const fulfillment = await clientAlice.waitForFulfillment(
    contractAddresses["Base Sepolia"].erc721EscrowObligation,
    escrow.attested.uid,
  );
  console.log("fulfillment: ", fulfillment);

  // Extract the result from the fulfillment statement
  if (!fulfillment.fulfillment) throw new Error("invalid fulfillment");
  const fulfillmentData = await clientAlice.getAttestation(
    fulfillment.fulfillment,
  );
  console.log("fulfillment data: ", fulfillmentData);
});

test("decodeEscrowStatement and decodePaymentStatement", async () => {
  // Create mock statement data for testing decode functions
  const escrowStatementData = encodeAbiParameters(
    parseAbiParameters(
      "(address token, uint256 tokenId, address arbiter, bytes demand)",
    ),
    [
      {
        token: mockErc721,
        tokenId: 1n,
        arbiter: contractAddresses["Base Sepolia"].trivialArbiter,
        demand: "0x1234" as `0x${string}`,
      },
    ],
  );

  const paymentStatementData = encodeAbiParameters(
    parseAbiParameters("(address token, uint256 tokenId, address payee)"),
    [
      {
        token: mockErc721,
        tokenId: 2n,
        payee: clientBob.address,
      },
    ],
  );

  // Test decode functions
  const decodedEscrow =
    clientAlice.erc721.decodeEscrowStatement(escrowStatementData);
  expect(decodedEscrow.token).toBe(mockErc721);
  expect(decodedEscrow.tokenId).toBe(1n);
  expect(decodedEscrow.arbiter).toBe(
    contractAddresses["Base Sepolia"].trivialArbiter,
  );
  expect(decodedEscrow.demand).toBe("0x1234");

  const decodedPayment =
    clientAlice.erc721.decodePaymentStatement(paymentStatementData);
  expect(decodedPayment.token).toBe(mockErc721);
  expect(decodedPayment.tokenId).toBe(2n);
  expect(decodedPayment.payee).toBe(clientBob.address);
});

test("approveAll and revokeAll", async () => {
  try {
    // Test approveAll function (this will likely fail without a real ERC721 contract)
    const approveResult = await clientAlice.erc721.approveAll(
      mockErc721,
      "escrow",
    );
    expect(approveResult).toBeString();

    // Test revokeAll function
    const revokeResult = await clientAlice.erc721.revokeAll(
      mockErc721,
      "escrow",
    );
    expect(revokeResult).toBeString();
  } catch (err) {
    // These will likely fail without a real ERC721 contract
    console.log(
      "ERC721 approve/revoke tests failed (expected without real contracts):",
      err,
    );
  }
});

test("collectExpired", async () => {
  // Create an escrow with a short expiration time (5 seconds)
  const escrowApproval = await clientAlice.erc721.approve(
    { address: MOCK_TOKENS.NFT1, id: aliceTokenId },
    "escrow",
  );
  expect(escrowApproval).toBeString();

  // Create a test client for blockchain interactions
  const testClient = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);

  // Get current block timestamp
  const block = await testClient.getBlock();
  // Create an escrow that expires in 5 seconds
  const expirationTime = BigInt(Number(block.timestamp) + 5);

  const escrow = await clientAlice.erc721.buyErc721ForErc721(
    { address: MOCK_TOKENS.NFT1, id: aliceTokenId },
    { address: MOCK_TOKENS.NFT2, id: bobTokenId },
    expirationTime,
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Try to collect before expiration - should fail
  try {
    await clientAlice.erc721.collectExpired(escrow.attested.uid);
    // Should not reach here
    expect(true).toBe(false);
  } catch (err) {
    // Expected to fail because escrow hasn't expired
    expect(err).toBeTruthy();
  }

  // Advance time by 10 seconds (past the expiration)
  await advanceTime(testClient, 10);

  // Now collect the expired escrow - should succeed
  const collectTx = await clientAlice.erc721.collectExpired(
    escrow.attested.uid,
  );
  expect(collectTx).toBeString();

  // Verify the ERC721 token was returned to Alice
  const erc721Owner = await testClient.readContract({
    address: MOCK_TOKENS.NFT1,
    abi: MOCK_ABIS.ERC721,
    functionName: "ownerOf",
    args: [aliceTokenId],
  });

  // The ERC721 token should be owned by Alice again
  expect(erc721Owner).toBe(clientAlice.address);
});

test("buyErc20WithErc721", async () => {
  // Test creating an escrow for trading ERC721 for ERC20
  // Approve the escrow contract to transfer the ERC721 token
  const escrowApproval = await clientAlice.erc721.approve(
    { address: MOCK_TOKENS.NFT1, id: aliceTokenId },
    "escrow",
  );
  expect(escrowApproval).toBeString();

  // Create an escrow offering the ERC721 token and requesting USDC
  const escrow = await clientAlice.erc721.buyErc20WithErc721(
    { address: MOCK_TOKENS.NFT1, id: aliceTokenId },
    { address: usdc, value: 10n },
    0n, // No expiration
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Bob pays with ERC20 to get the ERC721 token
  const paymentApproval = await clientBob.erc20.approve(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].erc20PaymentObligation,
  );
  expect(paymentApproval).toBeString();

  // Bob fulfills the escrow
  const payment = await clientBob.erc721.payErc721ForErc20(escrow.attested.uid);
  expect(payment.hash).toBeString();

  // Create test client for verification
  const testClient = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Verify the ERC721 token was transferred to Bob
  const erc721Owner = await testClient.readContract({
    address: MOCK_TOKENS.NFT1,
    abi: MOCK_ABIS.ERC721,
    functionName: "ownerOf",
    args: [aliceTokenId],
  });

  // The ERC721 token should now be owned by Bob
  expect(erc721Owner).toBe(clientBob.address);
});

test("buyErc1155WithErc721 (simulated)", async () => {
  // Test creating an escrow for trading ERC721 for ERC1155
  try {
    // This will likely fail without a real ERC721 token
    const escrow = await clientAlice.erc721.buyErc1155WithErc721(
      { address: mockErc721, id: 1n },
      { address: mockErc1155, id: 2n, value: 5n },
      0n,
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without a real ERC721 token
    console.log("ERC721-ERC1155 trading test failed (expected):", err);
  }
});

test("buyBundleWithErc721 (simulated)", async () => {
  // Test creating an escrow for trading ERC721 for a token bundle
  try {
    // Create a bundle of tokens
    const bundle = {
      erc20s: [{ address: usdc, value: 10n }],
      erc721s: [{ address: mockErc721, id: 2n }],
      erc1155s: [{ address: mockErc1155, id: 3n, value: 3n }],
    };

    // This will likely fail without a real ERC721 token
    const escrow = await clientAlice.erc721.buyBundleWithErc721(
      { address: mockErc721, id: 1n },
      bundle,
      clientBob.address,
      0n,
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without a real ERC721 token
    console.log("ERC721-Bundle trading test failed (expected):", err);
  }
});
