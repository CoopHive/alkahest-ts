import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "../utils/setup";

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
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_statement) => true,
  });

  decisions.forEach(($) => expect($?.decision).toBe(true));

  const collectionHash = await testContext.bobClient.erc20.collectPayment(
    escrow.uid,
    fulfillment.uid,
  );

  expect(collectionHash).toBeTruthy();
});

test("trivialListenAndArbitrate", async () => {
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

  const { unwatch } = await testContext.bobClient.oracle.listenAndArbitrate({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_statement) => true,
    onAfterArbitrate: async (decision) => {
      expect(decision?.attestation.uid).toEqual(fulfillment.uid);
      expect(decision?.statement[0].item).toEqual("foo");
      expect(decision?.decision).toBe(true);
    },
    pollingInterval: 50,
  });

  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.makeStatement("foo");

  await Bun.sleep(100);
  const collectionHash = await testContext.bobClient.erc20.collectPayment(
    escrow.uid,
    fulfillment.uid,
  );

  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("conditionalArbitratePast", async () => {
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

  const { attested: fulfillment1 } =
    await testContext.bobClient.stringObligation.makeStatement("good");

  const { attested: fulfillment2 } =
    await testContext.bobClient.stringObligation.makeStatement("bad");

  const decisions = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_statement) => _statement[0].item === "good",
  });

  decisions.forEach(($) =>
    expect($?.decision).toBe($?.statement[0].item === "good"),
  );

  const failedCollection = testContext.bobClient.erc20.collectPayment(
    escrow.uid,
    fulfillment2.uid,
  );

  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bobClient.erc20.collectPayment(
    escrow.uid,
    fulfillment1.uid,
  );

  expect(collectionHash).toBeTruthy();
});

test("conditionalListenAndArbitrate", async () => {
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

  const { unwatch } = await testContext.bobClient.oracle.listenAndArbitrate({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_statement) => _statement[0].item === "good",
    onAfterArbitrate: async (decision) => {
      expect(decision?.decision).toBe(decision?.statement[0].item === "good");
    },
    pollingInterval: 50,
  });

  const { attested: fulfillment1 } =
    await testContext.bobClient.stringObligation.makeStatement("good");

  const { attested: fulfillment2 } =
    await testContext.bobClient.stringObligation.makeStatement("bad");

  await Bun.sleep(100);
  const failedCollection = testContext.bobClient.erc20.collectPayment(
    escrow.uid,
    fulfillment2.uid,
  );
  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bobClient.erc20.collectPayment(
    escrow.uid,
    fulfillment1.uid,
  );
  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("trivialArbitratePastEscrow", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "foo" },
    ]),
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
    await testContext.bobClient.stringObligation.makeStatement(
      "foo",
      escrow.uid,
    );

  const decisions = await testContext.bobClient.oracle.arbitratePastForEscrow({
    escrow: {
      attester: testContext.addresses.erc20EscrowObligation,
      demandAbi: parseAbiParameters("(string mockDemand)"),
    },
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_demand, _statement) => true,
  });

  decisions.forEach(($) => expect($?.decision).toBe(true));

  const collectionHash = await testContext.bobClient.erc20.collectPayment(
    escrow.uid,
    fulfillment.uid,
  );

  expect(collectionHash).toBeTruthy();
});
