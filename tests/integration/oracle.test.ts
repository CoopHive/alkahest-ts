import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../../src";
import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
  createWalletClient,
  http,
  nonceManager,
  parseAbiParameter,
  parseAbiItem,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "../utils/setup";

let clientBuyer: ReturnType<typeof makeClient>;
let clientSeller: ReturnType<typeof makeClient>;

let testContext: TestContext;

beforeAll(async () => {
  testContext = await setupTestEnvironment();
});

beforeEach(async () => {
  // Reset to initial state before each test
  if (testContext.anvilInitState) {
    await testContext.testClient.loadState({
      state: testContext.anvilInitState,
    });
  }
});

afterAll(async () => {
  // Clean up
  await teardownTestEnvironment(testContext);
});

test("trivialArbitratePast", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("string mockData"), ["foo"]),
  });

  const { attested: escrow } =
    await testContext.aliceClient.erc20.permitAndBuyWithErc20(
      {
        address: testContext.mockAddresses.erc20A,
        value: 10n,
      },
      { arbiter, demand },
      0n,
    );

  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.makeStatement("foo");

  const decisions = await testContext.bobClient.oracle.arbitratePast({
    contractAddress: testContext.addresses.stringObligation,
    statementAbi: parseAbiParameters("(string item)"),
    arbitrate: async (_statement) => true,
  });

  console.log("decisions: ", decisions);

  const collectionHash = await testContext.bobClient.erc20.collectPayment(
    escrow.uid,
    fulfillment.uid,
  );

  expect(collectionHash).toBeTruthy();
});
