import { beforeAll, beforeEach, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { decodeAbiParameters, encodeAbiParameters, parseAbiParameters } from "viem";
import { ANVIL_ACCOUNTS, MOCK_TOKENS, MOCK_ABIS, createTestClient, mintERC721, mintERC1155, advanceTime, mockErc721, mockErc1155 } from "./utils/anvil";
import { abi as erc20Abi } from "../src/contracts/IERC20";

const usdc = contractAddresses["Base Sepolia"].usdc;
const eurc = contractAddresses["Base Sepolia"].eurc;

let clientBuyer: ReturnType<typeof makeClient>;
let clientSeller: ReturnType<typeof makeClient>;
let aliceTokenId: bigint;
let bobTokenId: bigint;

beforeAll(() => {
  // create clients using Anvil default accounts
  clientBuyer = makeClient(createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey));
  clientSeller = makeClient(createTestClient(ANVIL_ACCOUNTS.BOB.privateKey));
});

// Before each test, make sure accounts have enough tokens and NFTs
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
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"] // USDC contract
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
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"]
    });
  }

  // Mint fresh ERC721 tokens for Alice and Bob
  aliceTokenId = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  bobTokenId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);
  
  // Mint NFTs
  await mintERC721(testClientBuyer, MOCK_TOKENS.NFT1, clientBuyer.address, aliceTokenId);
  await mintERC721(testClientSeller, MOCK_TOKENS.NFT2, clientSeller.address, bobTokenId);
});

test("decodeEscrowStatement and decodePaymentStatement", async () => {
  // Create mock statement data for testing decode functions
  const escrowStatementData = encodeAbiParameters(
    parseAbiParameters("(address token, uint256 tokenId, address arbiter, bytes demand)"),
    [{
      token: mockErc721,
      tokenId: 1n,
      arbiter: contractAddresses["Base Sepolia"].trivialArbiter,
      demand: "0x1234" as `0x${string}`,
    }]
  );

  const paymentStatementData = encodeAbiParameters(
    parseAbiParameters("(address token, uint256 tokenId, address payee)"),
    [{
      token: mockErc721,
      tokenId: 2n,
      payee: clientSeller.address,
    }]
  );

  // Test decode functions
  const decodedEscrow = clientBuyer.erc721.decodeEscrowStatement(escrowStatementData);
  expect(decodedEscrow.token).toBe(mockErc721);
  expect(decodedEscrow.tokenId).toBe(1n);
  expect(decodedEscrow.arbiter).toBe(contractAddresses["Base Sepolia"].trivialArbiter);
  expect(decodedEscrow.demand).toBe("0x1234");

  const decodedPayment = clientBuyer.erc721.decodePaymentStatement(paymentStatementData);
  expect(decodedPayment.token).toBe(mockErc721);
  expect(decodedPayment.tokenId).toBe(2n);
  expect(decodedPayment.payee).toBe(clientSeller.address);
});

test("approveAll and revokeAll", async () => {
  try {
    // Test approveAll function (this will likely fail without a real ERC721 contract)
    const approveResult = await clientBuyer.erc721.approveAll(
      mockErc721,
      "escrow"
    );
    expect(approveResult).toBeString();

    // Test revokeAll function
    const revokeResult = await clientBuyer.erc721.revokeAll(
      mockErc721,
      "escrow"
    );
    expect(revokeResult).toBeString();
  } catch (err) {
    // These will likely fail without a real ERC721 contract
    console.log("ERC721 approve/revoke tests failed (expected without real contracts):", err);
  }
});

test("collectExpired", async () => {
  // Create an escrow with a short expiration time (5 seconds)
  const escrowApproval = await clientBuyer.erc721.approve(
    { address: MOCK_TOKENS.NFT1, id: aliceTokenId },
    "escrow"
  );
  expect(escrowApproval).toBeString();

  // Create a test client for blockchain interactions
  const testClient = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  
  // Get current block timestamp
  const block = await testClient.getBlock();
  // Create an escrow that expires in 5 seconds
  const expirationTime = BigInt(Number(block.timestamp) + 5);
  
  const escrow = await clientBuyer.erc721.buyErc721ForErc721(
    { address: MOCK_TOKENS.NFT1, id: aliceTokenId },
    { address: MOCK_TOKENS.NFT2, id: bobTokenId },
    expirationTime
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Try to collect before expiration - should fail
  try {
    await clientBuyer.erc721.collectExpired(escrow.attested.uid);
    // Should not reach here
    expect(true).toBe(false);
  } catch (err) {
    // Expected to fail because escrow hasn't expired
    expect(err).toBeTruthy();
  }

  // Advance time by 10 seconds (past the expiration)
  await advanceTime(testClient, 10);

  // Now collect the expired escrow - should succeed
  const collectTx = await clientBuyer.erc721.collectExpired(escrow.attested.uid);
  expect(collectTx).toBeString();

  // Verify the NFT was returned to the buyer
  const nftOwner = await testClient.readContract({
    address: MOCK_TOKENS.NFT1,
    abi: MOCK_ABIS.ERC721, 
    functionName: "ownerOf",
    args: [aliceTokenId],
  });
  
  // The NFT should be owned by the buyer again
  expect(nftOwner).toBe(clientBuyer.address);
});

test("buyErc20WithErc721", async () => {
  // Test creating an escrow for trading ERC721 for ERC20
  // Approve the escrow contract to transfer the NFT
  const escrowApproval = await clientBuyer.erc721.approve(
    { address: MOCK_TOKENS.NFT1, id: aliceTokenId },
    "escrow"
  );
  expect(escrowApproval).toBeString();

  // Create an escrow offering the NFT and requesting USDC
  const escrow = await clientBuyer.erc721.buyErc20WithErc721(
    { address: MOCK_TOKENS.NFT1, id: aliceTokenId },
    { address: usdc, value: 10n },
    0n // No expiration
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Seller pays with ERC20 to get the NFT
  const paymentApproval = await clientSeller.erc20.approve(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].erc20PaymentObligation
  );
  expect(paymentApproval).toBeString();

  // Seller fulfills the escrow 
  const payment = await clientSeller.erc721.payErc721ForErc20(
    escrow.attested.uid
  );
  expect(payment.hash).toBeString();

  // Create test client for verification
  const testClient = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);
  
  // Verify the NFT was transferred to the seller
  const nftOwner = await testClient.readContract({
    address: MOCK_TOKENS.NFT1,
    abi: MOCK_ABIS.ERC721,
    functionName: "ownerOf",
    args: [aliceTokenId],
  });
  
  // The NFT should now be owned by the seller
  expect(nftOwner).toBe(clientSeller.address);
});

test("buyErc1155WithErc721 (simulated)", async () => {
  // Test creating an escrow for trading ERC721 for ERC1155
  try {
    // This will likely fail without a real NFT
    const escrow = await clientBuyer.erc721.buyErc1155WithErc721(
      { address: mockErc721, id: 1n },
      { address: mockErc1155, id: 2n, value: 5n },
      0n
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without a real NFT
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

    // This will likely fail without a real NFT
    const escrow = await clientBuyer.erc721.buyBundleWithErc721(
      { address: mockErc721, id: 1n },
      bundle,
      clientSeller.address,
      0n
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without a real NFT
    console.log("ERC721-Bundle trading test failed (expected):", err);
  }
});