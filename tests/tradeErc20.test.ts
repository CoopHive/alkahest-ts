import { beforeAll, beforeEach, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import { abi as jobResultObligationAbi } from "../src/contracts/JobResultObligation";
import { ANVIL_ACCOUNTS, createTestClient } from "./utils/anvil";
import { abi as erc20Abi } from "../src/contracts/IERC20";

const usdc = contractAddresses["Base Sepolia"].usdc;
const eurc = contractAddresses["Base Sepolia"].eurc;

let clientBuyer: ReturnType<typeof makeClient>;
let clientSeller: ReturnType<typeof makeClient>;

beforeAll(() => {
  // create clients using Anvil default accounts
  clientBuyer = makeClient(createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey));
  clientSeller = makeClient(createTestClient(ANVIL_ACCOUNTS.BOB.privateKey));
});

// Before each test, make sure accounts have enough USDC and EURC by impersonating accounts that have tokens
beforeEach(async () => {
  // Create test clients for direct blockchain interactions
  const testClientBuyer = createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey);
  const testClientSeller = createTestClient(ANVIL_ACCOUNTS.BOB.privateKey);
  
  // Fund test accounts with tokens by impersonating accounts that have tokens
  // Get token balances
  const buyerUsdcBalance = await testClientBuyer.readContract({
    address: usdc,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientBuyer.address],
  });

  const sellerEurcBalance = await testClientSeller.readContract({
    address: eurc,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [clientSeller.address],
  });

  // Ensure buyer has at least 100 USDC
  if (buyerUsdcBalance < 100n) {
    console.log("Funding buyer with USDC");
    // Find an account with USDC (you might need to adjust this based on your fork)
    // Use anvil_impersonateAccount to impersonate an account with USDC
    // This is just an example - you would need to find a real account with USDC on Base Sepolia
    await testClientBuyer.request({
      method: "anvil_impersonateAccount",
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"] // USDC contract itself for testing
    });

    // Transfer USDC to buyer
    await testClientBuyer.writeContract({
      address: usdc,
      abi: erc20Abi.abi,
      functionName: "transfer",
      args: [clientBuyer.address, 1000n],
      account: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`,
    });

    // Stop impersonating
    await testClientBuyer.request({
      method: "anvil_stopImpersonatingAccount",
      params: ["0x036CbD53842c5426634e7929541eC2318f3dCF7e"]
    });
  }

  // Ensure seller has at least 100 EURC
  if (sellerEurcBalance < 100n) {
    console.log("Funding seller with EURC");
    // Find an account with EURC
    await testClientSeller.request({
      method: "anvil_impersonateAccount",
      params: ["0x808456652fdb597867f38412077A9182bf77359F"] // EURC contract itself for testing
    });

    // Transfer EURC to seller
    await testClientSeller.writeContract({
      address: eurc,
      abi: erc20Abi.abi,
      functionName: "transfer",
      args: [clientSeller.address, 1000n],
      account: "0x808456652fdb597867f38412077A9182bf77359F" as `0x${string}`,
    });

    // Stop impersonating
    await testClientSeller.request({
      method: "anvil_stopImpersonatingAccount",
      params: ["0x808456652fdb597867f38412077A9182bf77359F"]
    });
  }
});

test("tradeErc20ForErc20", async () => {
  // approve escrow contract to spend tokens
  const escrowApproval = await clientBuyer.erc20.approve(
    { address: usdc, value: 10n },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  console.log(escrowApproval);
  expect(escrowApproval).toBeString();

  // deposit 10usdc into escrow, demanding 10eurc, with no expiration
  const escrow = await clientBuyer.erc20.buyErc20ForErc20(
    { address: usdc, value: 10n },
    { address: eurc, value: 10n },
    0n,
  );
  console.log(escrow);

  // approve payment contract to spend tokens
  const paymentApproval = await clientSeller.erc20.approve(
    { address: eurc, value: 10n },
    contractAddresses["Base Sepolia"].erc20PaymentObligation,
  );
  console.log(paymentApproval);
  expect(paymentApproval).toBeString();

  // pay 10eurc for 10usdc (fulfill the buy order)
  const payment = await clientSeller.erc20.payErc20ForErc20(
    escrow.attested.uid,
  );
  console.log(payment);
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
    await clientSeller.getAttestationFromTxHash(resultHash);
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
