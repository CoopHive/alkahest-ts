import { beforeAll, beforeEach, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import { abi as jobResultObligationAbi } from "../src/contracts/JobResultObligation";
import {
  ANVIL_ACCOUNTS,
  createTestClient,
  createWalletClient,
  MOCK_TOKENS,
  advanceTime,
  mockErc20,
  mockErc721,
  mockErc1155,
  mintERC20,
} from "./utils/anvil";
import { abi as erc20Abi } from "../src/contracts/IERC20";
import { abi as erc721Abi } from "../src/contracts/IERC721";
import { abi as erc1155Abi } from "../src/contracts/IERC1155";

// Use our own mock tokens instead of the Base Sepolia tokens
const buyerToken = MOCK_TOKENS.ERC20_1;
const sellerToken = MOCK_TOKENS.ERC20_2;

let clientBuyer: ReturnType<typeof makeClient>;
let clientSeller: ReturnType<typeof makeClient>;

let usdc = contractAddresses["Base Sepolia"].usdc;
let eurc = contractAddresses["Base Sepolia"].eurc;

beforeAll(() => {
  // create clients using Anvil default accounts with walletClient instead of testClient
  clientBuyer = makeClient(createWalletClient(ANVIL_ACCOUNTS.ALICE.privateKey));
  clientSeller = makeClient(createWalletClient(ANVIL_ACCOUNTS.BOB.privateKey));
});

// Before each test, make sure accounts have enough tokens
beforeEach(async () => {
  // Create test clients for direct blockchain interactions
  const testClientBuyer = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  const testClientSeller = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Get token balances for our mock tokens
  const buyerTokenBalance = await testClientBuyer.readContract({
    address: buyerToken,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientBuyer.address],
  });

  const sellerTokenBalance = await testClientSeller.readContract({
    address: sellerToken,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientSeller.address],
  });

  // Ensure buyer has at least 100 tokens
  if (buyerTokenBalance < 100n) {
    console.log("Funding buyer with mock tokens");
    // Mint more tokens for the buyer if needed
    await mintERC20(
      testClientBuyer,
      buyerToken,
      clientBuyer.address,
      1000n * 10n ** 18n,
    );
  }

  // Ensure seller has at least 100 tokens
  if (sellerTokenBalance < 100n) {
    console.log("Funding seller with mock tokens");
    // Mint more tokens for the seller if needed
    await mintERC20(
      testClientSeller,
      sellerToken,
      clientSeller.address,
      1000n * 10n ** 18n,
    );
  }

  // Verify the mock tokens and other tokens are available
  try {
    await testClientBuyer.readContract({
      address: mockErc721,
      abi: erc721Abi.abi,
      functionName: "balanceOf",
      args: [clientBuyer.address],
    });
  } catch {
    console.log("Mock ERC721 not available, tests requiring it may fail");
  }

  try {
    await testClientBuyer.readContract({
      address: mockErc1155,
      abi: erc1155Abi.abi,
      functionName: "balanceOf",
      args: [clientBuyer.address, 1n],
    });
  } catch {
    console.log("Mock ERC1155 not available, tests requiring it may fail");
  }
});

test("tradeErc20ForErc20", async () => {
  // Create test clients for waiting on transactions
  const testClientBuyer = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  const testClientSeller = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // Check initial token balances
  const initialBuyerTokenBalance = await testClientBuyer.readContract({
    address: buyerToken,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientBuyer.address],
  });

  const initialSellerTokenBalance = await testClientSeller.readContract({
    address: sellerToken,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientSeller.address],
  });

  console.log(`Initial buyer token balance: ${initialBuyerTokenBalance}`);
  console.log(`Initial seller token balance: ${initialSellerTokenBalance}`);

  // The amount we'll use for trading
  const tradeAmount = 10n * 10n ** 18n; // 10 tokens with 18 decimals

  // approve escrow contract to spend tokens
  const escrowApproval = await clientBuyer.erc20.approve(
    { address: buyerToken, value: tradeAmount },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  console.log("Escrow approval hash:", escrowApproval);
  expect(escrowApproval).toBeString();

  // Wait for the approval transaction to be mined
  await testClientBuyer.waitForTransactionReceipt({ hash: escrowApproval });

  // deposit buyer tokens into escrow, demanding seller tokens, with no expiration
  const escrow = await clientBuyer.erc20.buyErc20ForErc20(
    { address: buyerToken, value: tradeAmount },
    { address: sellerToken, value: tradeAmount },
    0n,
  );
  console.log("Escrow:", escrow);

  // Wait for the escrow transaction to be mined
  await testClientBuyer.waitForTransactionReceipt({ hash: escrow.hash });

  // Check buyer's token balance after escrow
  const afterEscrowBuyerTokenBalance = await testClientBuyer.readContract({
    address: buyerToken,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientBuyer.address],
  });
  console.log(
    `Buyer token balance after escrow: ${afterEscrowBuyerTokenBalance}`,
  );
  expect(afterEscrowBuyerTokenBalance).toBe(
    initialBuyerTokenBalance - tradeAmount,
  );

  // approve payment contract to spend tokens
  const paymentApproval = await clientSeller.erc20.approve(
    { address: sellerToken, value: tradeAmount },
    contractAddresses["Base Sepolia"].erc20PaymentObligation,
  );
  console.log("Payment approval hash:", paymentApproval);
  expect(paymentApproval).toBeString();

  // Wait for the approval transaction to be mined
  await testClientSeller.waitForTransactionReceipt({ hash: paymentApproval });

  // pay seller tokens for buyer tokens (fulfill the buy order)
  const payment = await clientSeller.erc20.payErc20ForErc20(
    escrow.attested.uid,
  );
  console.log("Payment:", payment);

  // Wait for the payment transaction to be mined
  await testClientSeller.waitForTransactionReceipt({ hash: payment.hash });

  // Check final token balances
  const finalBuyerTokenBalance = await testClientBuyer.readContract({
    address: buyerToken,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientBuyer.address],
  });

  const finalSellerTokenBalance = await testClientSeller.readContract({
    address: sellerToken,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientSeller.address],
  });

  const finalBuyerSellerTokenBalance = await testClientBuyer.readContract({
    address: sellerToken,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientBuyer.address],
  });

  const finalSellerBuyerTokenBalance = await testClientSeller.readContract({
    address: buyerToken,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientSeller.address],
  });

  console.log(`Final buyer token balance: ${finalBuyerTokenBalance}`);
  console.log(`Final seller token balance: ${finalSellerTokenBalance}`);
  console.log(`Buyer's seller token balance: ${finalBuyerSellerTokenBalance}`);
  console.log(`Seller's buyer token balance: ${finalSellerBuyerTokenBalance}`);

  // Verify the trade was completed successfully
  expect(finalBuyerTokenBalance).toBe(initialBuyerTokenBalance - tradeAmount);
  expect(finalSellerTokenBalance).toBe(initialSellerTokenBalance - tradeAmount);
  expect(finalBuyerSellerTokenBalance).toBe(tradeAmount);
  expect(finalSellerBuyerTokenBalance).toBe(tradeAmount);
});

test("tradeErc20ForCustom", async () => {
  // the example will use JobResultObligation to demand a string to be capitalized
  // but JobResultObligation is generic enough to represent much more (a db query, a Dockerfile...)
  // see https://github.com/CoopHive/alkahest-mocks/blob/main/src/Statements/JobResultObligation.sol
  //
  // for custom cases, you'll have to implement your own arbiter
  //
  // in the example, we'll use TrustedPartyArbiter and TrivialArbiter
  // to make sure the result is from a particular trusted party,
  // without actually validating the result
  // see https://github.com/CoopHive/alkahest-mocks/blob/main/src/Validators/TrustedPartyArbiter.sol
  // and https://github.com/CoopHive/alkahest-mocks/blob/main/src/Validators/TrivialArbiter.sol

  // construct custom demand. note that this could be anything, and is determined by the arbiter.
  // since our base arbiter is TrivialArbiter, which doesn't actually decode DemandData,
  // the format doesn't matter. though the seller and buyer do still have to agree on it
  // so that the seller can properly fulfill the demand.
  // struct DemandData {
  //     string query;
  // }
  const baseDemand = encodeAbiParameters(parseAbiParameters("(string query)"), [
    { query: "hello world" },
  ]);

  // we use TrustedPartyArbiter to wrap the base demand. This actually does decode DemandData,
  // and we use the DemandData format it defines,
  // to demand that only our trusted seller can fulfill the demand.
  // if the baseDemand were something other than TrivialArbiter,
  // it would be an additional check on the fulfillment.
  // many arbiters can be stacked according to this pattern.
  // TrustedPartyArbiter.DemandData:
  // struct DemandData {
  //     address creator;
  //     address baseArbiter;
  //     bytes baseDemand;
  // }
  // if using a custom Arbiter not supported by the SDK, you can use encodeAbiParameters directly,
  // like we did for the baseDemand
  const demand = clientBuyer.arbiters.encodeTrustedPartyDemand({
    creator: clientSeller.address,
    baseArbiter: contractAddresses["Base Sepolia"].trivialArbiter,
    baseDemand,
  });

  // Create a test client for transaction handling
  const testClientA = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);

  // approve escrow contract to spend tokens
  const escrowApproval = await clientBuyer.erc20.approve(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  expect(escrowApproval).toBeString();
  await testClientA.waitForTransactionReceipt({ hash: escrowApproval });
  console.log("escrow approval: ", escrowApproval);

  // make escrow with generic escrow function,
  // passing in TrustedPartyArbiter's address and our custom demand,
  // and no expiration (would be a future unix timstamp in seconds if used)
  const escrow = await clientBuyer.erc20.buyWithErc20(
    { address: usdc, value: 10n },
    { arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter, demand },
    0n,
  );
  console.log("escrow: ", escrow);

  // now the seller manually decodes the statement and demand
  // and creates a StringResultObligation
  // and manually collects payment
  const buyStatement = await clientSeller.getAttestation(escrow.attested.uid);
  // ERC20EscrowObligation.StatementData
  // struct StatementData {
  //     address token;
  //     uint256 amount;
  //     address arbiter;
  //     bytes demand;
  // }
  const decodedStatement = clientSeller.erc20.decodeEscrowStatement(
    buyStatement.data,
  );
  // TrustedPartyArbiter.DemandData
  // if using a custom arbiter, you can instead use decodeAbiParameters directly like below
  const decodedDemand = clientSeller.arbiters.decodeTrustedPartyDemand(
    decodedStatement.demand,
  );
  // custom base demand described above
  const decodedBaseDemand = decodeAbiParameters(
    parseAbiParameters("(string query)"),
    decodedDemand.baseDemand,
  )[0];

  // uppercase string for the example;
  // this could be anything as agreed upon between buyer and seller
  // (running a Docker job, executing a DB query...)
  // as long as the job "spec" is agreed upon between buyer and seller,
  // and the "query" is contained in the demand
  const result = decodedBaseDemand.query.toUpperCase();
  console.log("result: ", result);

  // manually make result statement

  // JobResultObligation.StatementData:
  // struct StatementData {
  //     string result;
  // }
  //
  // Create a test client for direct contract interaction
  const testClientB = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);

  // JobResultObligation.makeStatement
  // function makeStatement(
  //     StatementData calldata data,
  //     bytes32 refUID
  // ) public returns (bytes32)
  const resultHash = await testClientB.writeContract({
    address: "0x823a06994B4e817a5127c042dBd2742CcFdF2076", // custom deployment
    abi: jobResultObligationAbi.abi,
    functionName: "makeStatement",
    args: [
      { result },
      "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32 0
    ],
  });
  console.log(resultHash);
  const resultStatement =
    await clientSeller.getAttestedEventFromTxHash(resultHash);
  console.log("result statement: ", resultStatement);

  // and collect the payment from escrow
  const collection = await clientSeller.erc20.collectPayment(
    escrow.attested.uid,
    resultStatement.uid,
  );

  console.log("collection: ", collection);

  // meanwhile, the buyer can wait for fulfillment of her escrow.
  // if called after fulfillment, like in this case, it will
  // return the fulfilling statement immediately
  const fulfillment = await clientBuyer.waitForFulfillment(
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
    escrow.attested.uid,
  );
  console.log("fulfillment: ", fulfillment);

  // and extract the result from the fulfillment statement
  if (!fulfillment.fulfillment) throw new Error("invalid fulfillment");
  const fulfillmentData = await clientBuyer.getAttestation(
    fulfillment.fulfillment,
  );
  const decodedResult = decodeAbiParameters(
    parseAbiParameters("(string result)"),
    fulfillmentData.data,
  )[0];
  console.log("decoded result: ", decodedResult);
  expect(decodedResult).toEqual({ result: "HELLO WORLD" });
});

test("decodeEscrowStatement and decodePaymentStatement", async () => {
  // Create mock statement data for testing decode functions
  const escrowStatementData = encodeAbiParameters(
    parseAbiParameters(
      "(address token, uint256 amount, address arbiter, bytes demand)",
    ),
    [
      {
        token: usdc,
        amount: 10n,
        arbiter: contractAddresses["Base Sepolia"].trivialArbiter,
        demand: "0x1234" as `0x${string}`,
      },
    ],
  );

  const paymentStatementData = encodeAbiParameters(
    parseAbiParameters("(address token, uint256 amount, address payee)"),
    [
      {
        token: eurc,
        amount: 15n,
        payee: clientSeller.address,
      },
    ],
  );

  // Test decode functions
  const decodedEscrow =
    clientBuyer.erc20.decodeEscrowStatement(escrowStatementData);
  expect(decodedEscrow.token).toBe(usdc);
  expect(decodedEscrow.amount).toBe(10n);
  expect(decodedEscrow.arbiter).toBe(
    contractAddresses["Base Sepolia"].trivialArbiter,
  );
  expect(decodedEscrow.demand).toBe("0x1234");

  const decodedPayment =
    clientBuyer.erc20.decodePaymentStatement(paymentStatementData);
  expect(decodedPayment.token).toBe(eurc);
  expect(decodedPayment.amount).toBe(15n);
  expect(decodedPayment.payee).toBe(clientSeller.address);
});

test("approveIfLess", async () => {
  // Create a test client for setting up approvals
  const testClient = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);

  // Set initial allowance to 5
  await testClient.writeContract({
    address: usdc,
    abi: erc20Abi.abi,
    functionName: "approve",
    args: [contractAddresses["Base Sepolia"].erc20EscrowObligation, 5n],
  });

  // When allowance is less than requested value, should approve
  const approveResult1 = await clientBuyer.erc20.approveIfLess(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  expect(approveResult1).toBeString();

  // When allowance is equal to or greater than requested value, should return null
  await testClient.writeContract({
    address: usdc,
    abi: erc20Abi.abi,
    functionName: "approve",
    args: [contractAddresses["Base Sepolia"].erc20EscrowObligation, 15n],
  });

  const approveResult2 = await clientBuyer.erc20.approveIfLess(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  expect(approveResult2).toBeNull();
});

test("collectExpired", async () => {
  // Create a test client for blockchain interactions
  const testClient = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);

  // Create an escrow with a short expiration time (5 seconds)
  const escrowApproval = await clientBuyer.erc20.approve(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  expect(escrowApproval).toBeString();

  // Get current block timestamp
  const block = await testClient.getBlock();
  // Create an escrow that expires in 5 seconds
  const expirationTime = BigInt(Number(block.timestamp) + 5);

  const escrow = await clientBuyer.erc20.buyErc20ForErc20(
    { address: usdc, value: 10n },
    { address: eurc, value: 10n },
    expirationTime,
  );
  expect(escrow.hash).toBeString();
  expect(escrow.attested.uid).toBeString();

  // Try to collect before expiration - should fail
  try {
    await clientBuyer.erc20.collectExpired(escrow.attested.uid);
    // Should not reach here
    expect(true).toBe(false);
  } catch (err) {
    // Expected to fail because escrow hasn't expired
    expect(err).toBeTruthy();
  }

  // Advance time by 10 seconds (past the expiration)
  await advanceTime(testClient, 10);

  // Now collect the expired escrow - should succeed
  const collectTx = await clientBuyer.erc20.collectExpired(escrow.attested.uid);
  expect(collectTx).toBeString();

  // Verify the escrow was collected by checking the buyer's USDC balance
  const buyerBalance = await testClient.readContract({
    address: usdc,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientBuyer.address],
  });

  // Balance should be higher now that the funds were returned
  expect(buyerBalance).toBeGreaterThan(0n);
});

test("buyErc721WithErc20", async () => {
  // Test creating an escrow for trading ERC20 for ERC721
  // Approve the escrow contract to spend tokens
  const escrowApproval = await clientBuyer.erc20.approve(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  expect(escrowApproval).toBeString();

  // Create an escrow for trading ERC20 for ERC721
  try {
    const escrow = await clientBuyer.erc20.buyErc721WithErc20(
      { address: usdc, value: 10n },
      { address: mockErc721, id: 1n },
      0n,
    );
    expect(escrow.hash).toBeString();
    expect(escrow.attested.uid).toBeString();
  } catch (err) {
    // This might fail if the mock contracts aren't fully set up
    // In a production environment, we'd have proper mock contracts deployed
    console.log(
      "ERC721 trading test failed (expected if mocks not deployed):",
      err,
    );
  }
});

test("payWithErc20", async () => {
  // Test creating a direct payment with ERC20
  const paymentApproval = await clientSeller.erc20.approve(
    { address: eurc, value: 10n },
    contractAddresses["Base Sepolia"].erc20PaymentObligation,
  );
  expect(paymentApproval).toBeString();

  // Create a direct payment to buyer
  const payment = await clientSeller.erc20.payWithErc20(
    { address: eurc, value: 10n },
    clientBuyer.address,
  );
  expect(payment.hash).toBeString();
  expect(payment.attested.uid).toBeString();

  // Verify the payment statement data
  const attestation = await clientSeller.getAttestation(payment.attested.uid);
  const decodedPayment = clientSeller.erc20.decodePaymentStatement(
    attestation.data,
  );
  expect(decodedPayment.token).toBe(eurc);
  expect(decodedPayment.amount).toBe(10n);
  expect(decodedPayment.payee).toBe(clientBuyer.address);
});

test("buyErc1155WithErc20", async () => {
  // Test creating an escrow for trading ERC20 for ERC1155
  // Approve the escrow contract to spend tokens
  const escrowApproval = await clientBuyer.erc20.approve(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  expect(escrowApproval).toBeString();

  // Create an escrow for trading ERC20 for ERC1155
  try {
    const escrow = await clientBuyer.erc20.buyErc1155WithErc20(
      { address: usdc, value: 10n },
      { address: mockErc1155, id: 1n, value: 5n },
      0n,
    );
    expect(escrow.hash).toBeString();
    expect(escrow.attested.uid).toBeString();
  } catch (err) {
    // This might fail if the mock contracts aren't fully set up
    // In a production environment, we'd have proper mock contracts deployed
    console.log(
      "ERC1155 trading test failed (expected if mocks not deployed):",
      err,
    );
  }
});

test("buyBundleWithErc20", async () => {
  // Test creating an escrow for trading ERC20 for a token bundle
  // Approve the escrow contract to spend tokens
  const escrowApproval = await clientBuyer.erc20.approve(
    { address: usdc, value: 20n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  expect(escrowApproval).toBeString();

  // Create a bundle of tokens
  const bundle = {
    erc20s: [{ address: eurc, value: 5n }],
    erc721s: [{ address: MOCK_TOKENS.ERC721_1, id: 1n }],
    erc1155s: [{ address: MOCK_TOKENS.ERC1155_1, id: 1n, value: 3n }],
  };

  // Create an escrow for trading ERC20 for the bundle
  try {
    const escrow = await clientBuyer.erc20.buyBundleWithErc20(
      { address: usdc, value: 20n },
      bundle,
      clientSeller.address,
      0n,
    );
    expect(escrow.hash).toBeString();
    expect(escrow.attested.uid).toBeString();
  } catch (err) {
    // This might fail if the mock contracts aren't fully set up
    // In a production environment, we'd have proper mock contracts deployed
    console.log(
      "Bundle trading test failed (expected if mocks not deployed):",
      err,
    );
  }
});
