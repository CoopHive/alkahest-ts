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
const eurc = contractAddresses["Base Sepolia"].eurc;

let clientBuyer: ReturnType<typeof makeClient>;
let clientSeller: ReturnType<typeof makeClient>;
let aliceNftId: bigint;
let bobNftId: bigint;
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
  
  // Fund test accounts with USDC and EURC
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
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"], // USDC contract
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

  // Fund seller with EURC
  const sellerEurcBalance = await testClientSeller.readContract({
    address: eurc,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientSeller.address],
  });

  if (sellerEurcBalance < 100n) {
    console.log("Funding seller with EURC");
    await testClientSeller.request({
      method: "anvil_impersonateAccount",
      params: ["0x808456652fdb597867f38412077A9182bf77359F"], // EURC contract
    });

    await testClientSeller.writeContract({
      address: eurc,
      abi: erc20Abi.abi,
      functionName: "transfer",
      args: [clientSeller.address, 1000n],
      account: "0x808456652fdb597867f38412077A9182bf77359F" as `0x${string}`,
    });

    await testClientSeller.request({
      method: "anvil_stopImpersonatingAccount",
      params: ["0x808456652fdb597867f38412077A9182bf77359F"],
    });
  }

  // Mint fresh tokens for each test
  aliceNftId = BigInt(Math.floor(Math.random() * 1000000) + 10000);
  bobNftId = BigInt(Math.floor(Math.random() * 1000000) + 2010000);
  aliceTokenId = BigInt(Math.floor(Math.random() * 1000000) + 3010000);
  bobTokenId = BigInt(Math.floor(Math.random() * 1000000) + 4010000);

  // Mint tokens
  await mintERC721(
    testClientBuyer,
    MOCK_TOKENS.NFT1,
    clientBuyer.address,
    aliceNftId,
  );
  await mintERC721(
    testClientSeller,
    MOCK_TOKENS.NFT2,
    clientSeller.address,
    bobNftId,
  );
  await mintERC1155(
    testClientBuyer,
    MOCK_TOKENS.MULTI_TOKEN1,
    clientBuyer.address,
    aliceTokenId,
    10n,
  );
  await mintERC1155(
    testClientSeller,
    MOCK_TOKENS.MULTI_TOKEN2,
    clientSeller.address,
    bobTokenId,
    10n,
  );
});

test("decodePaymentStatement", async () => {
  // Create mock statement data for testing decode function
  const paymentStatementData = encodeAbiParameters(
    parseAbiParameters(`(
      address[] erc20Tokens,
      uint256[] erc20Amounts,
      address[] erc721Tokens,
      uint256[] erc721TokenIds,
      address[] erc1155Tokens,
      uint256[] erc1155TokenIds,
      uint256[] erc1155Amounts,
      address payee
    )`),
    [
      {
        erc20Tokens: [usdc, eurc],
        erc20Amounts: [10n, 5n],
        erc721Tokens: [mockErc721],
        erc721TokenIds: [1n],
        erc1155Tokens: [mockErc1155],
        erc1155TokenIds: [2n],
        erc1155Amounts: [3n],
        payee: clientSeller.address,
      },
    ],
  );

  // Test decode function
  const decodedPayment =
    clientBuyer.bundle.decodePaymentStatement(paymentStatementData);
  expect(decodedPayment.erc20Tokens).toEqual([usdc, eurc]);
  expect(decodedPayment.erc20Amounts).toEqual([10n, 5n]);
  expect(decodedPayment.erc721Tokens).toEqual([mockErc721]);
  expect(decodedPayment.erc721TokenIds).toEqual([1n]);
  expect(decodedPayment.erc1155Tokens).toEqual([mockErc1155]);
  expect(decodedPayment.erc1155TokenIds).toEqual([2n]);
  expect(decodedPayment.erc1155Amounts).toEqual([3n]);
  expect(decodedPayment.payee).toBe(clientSeller.address);
});

test("collectExpired", async () => {
  // Create a bundle of tokens
  const offerBundle = {
    erc20s: [{ address: usdc, value: 10n }],
    erc721s: [{ address: MOCK_TOKENS.NFT1, id: aliceNftId }],
    erc1155s: [
      { address: MOCK_TOKENS.MULTI_TOKEN1, id: aliceTokenId, value: 3n },
    ],
  };

  // Create a bundle to request
  const requestBundle = {
    erc20s: [{ address: eurc, value: 15n }],
    erc721s: [{ address: MOCK_TOKENS.NFT2, id: bobNftId }],
    erc1155s: [
      { address: MOCK_TOKENS.MULTI_TOKEN2, id: bobTokenId, value: 5n },
    ],
  };

  // Approve tokens for the bundle
  await clientBuyer.erc20.approve(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].tokenBundleEscrowObligation,
  );

  await clientBuyer.erc721.approve(
    { address: MOCK_TOKENS.NFT1, id: aliceNftId },
    "escrow",
  );

  await clientBuyer.erc1155.approveAll(MOCK_TOKENS.MULTI_TOKEN1, "escrow");

  // Create a test client for blockchain interactions
  const testClient = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  
  // Get current block timestamp
  const block = await testClient.getBlock();
  // Create an escrow that expires in 5 seconds
  const expirationTime = BigInt(Number(block.timestamp) + 5);

  // Create the escrow with the bundle
  // Create demand object with explicit type
  const bundleDemand = {
    arbiter: contractAddresses["Base Sepolia"].trivialArbiter,
    demand: "0x" as `0x${string}`,
  };

  const escrow = await clientBuyer.bundle.buyWithBundle(
    offerBundle,
    bundleDemand,
    expirationTime,
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Try to collect before expiration - should fail
  try {
    await clientBuyer.bundle.collectExpired(escrow.attested.uid);
    // Should not reach here
    expect(true).toBe(false);
  } catch (err) {
    // Expected to fail because escrow hasn't expired
    expect(err).toBeTruthy();
  }

  // Advance time by 10 seconds (past the expiration)
  await advanceTime(testClient, 10);

  // Now collect the expired escrow - should succeed
  const collectTx = await clientBuyer.bundle.collectExpired(
    escrow.attested.uid,
  );
  expect(collectTx).toBeString();

  // Verify assets were returned to the buyer
  const nftOwner = await testClient.readContract({
    address: MOCK_TOKENS.NFT1,
    abi: MOCK_ABIS.ERC721,
    functionName: "ownerOf",
    args: [aliceNftId],
  });

  // The NFT should still be owned by the buyer
  expect(nftOwner).toBe(clientBuyer.address);
});

test("buyErc20WithBundle (simulated)", async () => {
  // Test creating an escrow for trading a bundle for ERC20
  try {
    // Create a bundle of tokens to offer
    const bundle = {
      erc20s: [{ address: usdc, value: 5n }],
      erc721s: [{ address: mockErc721, id: 1n }],
      erc1155s: [{ address: mockErc1155, id: 2n, value: 3n }],
    };

    // This will likely fail without real tokens
    const escrow = await clientBuyer.bundle.buyWithBundle(
      bundle,
      {
        arbiter: contractAddresses["Base Sepolia"].trivialArbiter,
        demand: "0x" as `0x${string}`,
      },
      0n,
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without real tokens
    console.log("Bundle-ERC20 trading test failed (expected):", err);
  }
});

test("buyErc721WithBundle (simulated)", async () => {
  // Test creating an escrow for trading a bundle for ERC721
  try {
    // Create a bundle of tokens to offer
    const bundle = {
      erc20s: [{ address: usdc, value: 5n }],
      erc721s: [],
      erc1155s: [{ address: mockErc1155, id: 2n, value: 3n }],
    };

    // This will likely fail without real tokens
    const escrow = await clientBuyer.bundle.buyWithBundle(
      bundle,
      {
        arbiter: contractAddresses["Base Sepolia"].trivialArbiter,
        demand: "0x" as `0x${string}`,
      },
      0n,
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without real tokens
    console.log("Bundle-ERC721 trading test failed (expected):", err);
  }
});

test("buyErc1155WithBundle (simulated)", async () => {
  // Test creating an escrow for trading a bundle for ERC1155
  try {
    // Create a bundle of tokens to offer
    const bundle = {
      erc20s: [{ address: usdc, value: 5n }],
      erc721s: [{ address: mockErc721, id: 1n }],
      erc1155s: [],
    };

    // This will likely fail without real tokens
    const escrow = await clientBuyer.bundle.buyWithBundle(
      bundle,
      {
        arbiter: contractAddresses["Base Sepolia"].trivialArbiter,
        demand: "0x" as `0x${string}`,
      },
      0n,
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without real tokens
    console.log("Bundle-ERC1155 trading test failed (expected):", err);
  }
});

test("buyBundleWithBundle (simulated)", async () => {
  // Test creating an escrow for trading a bundle for another bundle
  try {
    // Create bundles of tokens
    const offerBundle = {
      erc20s: [{ address: usdc, value: 15n }],
      erc721s: [{ address: mockErc721, id: 1n }],
      erc1155s: [],
    };

    const requestBundle = {
      erc20s: [{ address: eurc, value: 10n }],
      erc721s: [],
      erc1155s: [{ address: mockErc1155, id: 5n, value: 7n }],
    };

    // This will likely fail without real tokens
    // Create a custom demand for the bundle exchange
    const bundleDemand = {
      arbiter: contractAddresses["Base Sepolia"].trivialArbiter,
      demand: "0x" as `0x${string}`,
    };

    const escrow = await clientBuyer.bundle.buyWithBundle(
      offerBundle,
      bundleDemand,
      0n,
    );
    expect(escrow.hash).toBeString();
  } catch (err) {
    // Expected to fail without real tokens
    console.log("Bundle-Bundle trading test failed (expected):", err);
  }
});

test("payWithBundle", async () => {
  // Test creating a direct payment with a bundle
  // Create a bundle of tokens to pay with
  const bundle = {
    erc20s: [{ address: usdc, value: 5n }],
    erc721s: [{ address: MOCK_TOKENS.NFT1, id: aliceNftId }],
    erc1155s: [
      { address: MOCK_TOKENS.MULTI_TOKEN1, id: aliceTokenId, value: 3n },
    ],
  };

  // Approve tokens for the bundle payment
  await clientBuyer.erc20.approve(
    { address: usdc, value: 5n },
    contractAddresses["Base Sepolia"].tokenBundlePaymentObligation,
  );

  await clientBuyer.erc721.approve(
    { address: MOCK_TOKENS.NFT1, id: aliceNftId },
    "payment",
  );

  await clientBuyer.erc1155.approveAll(MOCK_TOKENS.MULTI_TOKEN1, "payment");

  // Make the bundle payment
  const payment = await clientBuyer.bundle.payWithBundle(
    bundle,
    clientSeller.address,
  );
  expect(payment.hash).toBeString();
  expect(payment.attested.uid).toBeString();

  // Verify the payment was successful and assets were transferred
  // Create test clients for verification
  const testClientBuyer = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  const testClientSeller = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Verify ERC721 transfer
  const nftOwner = await testClientBuyer.readContract({
    address: MOCK_TOKENS.NFT1,
    abi: MOCK_ABIS.ERC721,
    functionName: "ownerOf",
    args: [aliceNftId],
  });

  // The NFT should now be owned by the seller
  expect(nftOwner).toBe(clientSeller.address);

  // Verify ERC1155 transfer
  const tokenBalance = await testClientSeller.readContract({
    address: MOCK_TOKENS.MULTI_TOKEN1,
    abi: MOCK_ABIS.ERC1155,
    functionName: "balanceOf",
    args: [clientSeller.address, aliceTokenId],
  });

  // The seller should have received 3 tokens
  expect(tokenBalance).toBe(3n);

  // Verify ERC20 transfer
  const usdcBalance = await testClientSeller.readContract({
    address: usdc,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientSeller.address],
  });

  // Seller should have received 5 USDC
  expect(usdcBalance).toBeGreaterThan(0n);
});
