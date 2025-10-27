import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { setupTestEnvironment, type TestContext, teardownTestEnvironment } from "../utils/setup";

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

test("trivial arbitratePast", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bobClient.oracle.requestArbitration(fulfillment.uid, testContext.bob);

  // Wait for arbitration request to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  const obligationAbi = parseAbiParameters("(string item)");
  const decisions = await testContext.bobClient.oracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
    return true;
  });

  decisions.forEach(($) => expect($.decision).toBe(true));

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(escrow.uid, fulfillment.uid);

  expect(collectionHash).toBeTruthy();
});

test("conditional arbitratePast", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment1 } = await testContext.bobClient.stringObligation.doObligation("good", escrow.uid);

  const { attested: fulfillment2 } = await testContext.bobClient.stringObligation.doObligation("bad", escrow.uid);

  // Request arbitration for both
  const requestHash1 = await testContext.bobClient.oracle.requestArbitration(fulfillment1.uid, testContext.bob);
  const requestHash2 = await testContext.bobClient.oracle.requestArbitration(fulfillment2.uid, testContext.bob);

  // Wait for arbitration requests to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash1,
  });
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash2,
  });

  const obligationAbi = parseAbiParameters("(string item)");
  const decisions = await testContext.bobClient.oracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
    return obligation[0].item === "good";
  });

  expect(decisions.length).toBe(2);
  expect(decisions.filter((d) => d.decision).length).toBe(1);

  const failedCollection = testContext.bobClient.erc20.collectEscrow(escrow.uid, fulfillment2.uid);
  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(escrow.uid, fulfillment1.uid);

  expect(collectionHash).toBeTruthy();
});

test("arbitratePast with skipAlreadyArbitrated", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bobClient.oracle.requestArbitration(fulfillment.uid, testContext.bob);

  // Wait for arbitration request to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  const obligationAbi = parseAbiParameters("(string item)");

  // First arbitration
  const firstDecisions = await testContext.bobClient.oracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
    return obligation[0].item === "foo";
  });

  expect(firstDecisions.length).toBe(1);

  // Wait for transaction confirmation
  await testContext.testClient.waitForTransactionReceipt({
    hash: firstDecisions[0].hash,
  });

  // Second arbitration with skipAlreadyArbitrated should find nothing
  const secondDecisions = await testContext.bobClient.oracle.arbitratePast(
    async (attestation) => {
      const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "foo";
    },
    { skipAlreadyArbitrated: true },
  );

  expect(secondDecisions.length).toBe(0);
});

test("listenAndArbitrate", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const obligationAbi = parseAbiParameters("(string item)");
  const { decisions, unwatch } = await testContext.bobClient.oracle.listenAndArbitrate(
    async (attestation) => {
      const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
      return true;
    },
    {
      onAfterArbitrate: async (decision) => {
        const obligation = testContext.bobClient.extractObligationData(obligationAbi, decision.attestation);
        expect(decision.attestation.uid).toEqual(fulfillment.uid);
        expect(obligation[0].item).toEqual("foo");
        expect(decision.decision).toBe(true);
      },
      pollingInterval: 50,
    },
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  await testContext.bobClient.oracle.requestArbitration(fulfillment.uid, testContext.bob);

  await Bun.sleep(150);

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(escrow.uid, fulfillment.uid);

  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("listenAndArbitrate with onlyNew", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const obligationAbi = parseAbiParameters("(string item)");

  // Start listening with onlyNew: true
  const { decisions, unwatch } = await testContext.bobClient.oracle.listenAndArbitrate(
    async (attestation) => {
      const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "good";
    },
    {
      onlyNew: true,
      pollingInterval: 50,
    },
  );

  expect(decisions.length).toBe(0); // Should not arbitrate past

  // Create new fulfillment
  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation("good", escrow.uid);

  // Request arbitration
  await testContext.bobClient.oracle.requestArbitration(fulfillment.uid, testContext.bob);

  await Bun.sleep(150);

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(escrow.uid, fulfillment.uid);

  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("arbitratePast with escrow demand extraction", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment1 } = await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);

  const { attested: fulfillment2 } = await testContext.bobClient.stringObligation.doObligation("bar", escrow.uid);

  // Request arbitration for both
  const requestHash1 = await testContext.bobClient.oracle.requestArbitration(fulfillment1.uid, testContext.bob);
  const requestHash2 = await testContext.bobClient.oracle.requestArbitration(fulfillment2.uid, testContext.bob);

  // Wait for arbitration requests to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash1,
  });
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash2,
  });

  const obligationAbi = parseAbiParameters("(string item)");
  const demandAbi = parseAbiParameters("(string mockDemand)");

  const decisions = await testContext.bobClient.oracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
    const [, demand] = await testContext.bobClient.getEscrowAndDemand(demandAbi, attestation);
    return obligation[0].item === demand[0].mockDemand;
  });

  expect(decisions.length).toBe(2);
  expect(decisions.filter((d) => d.decision).length).toBe(1);

  const failedCollection = testContext.bobClient.erc20.collectEscrow(escrow.uid, fulfillment2.uid);
  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(escrow.uid, fulfillment1.uid);

  expect(collectionHash).toBeTruthy();
});

test("waitForArbitration with existing decision", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bobClient.oracle.requestArbitration(fulfillment.uid, testContext.bob);
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  // Make arbitration decision
  const obligationAbi = parseAbiParameters("(string item)");
  const decisions = await testContext.bobClient.oracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
    return obligation[0].item === "foo";
  });

  // Wait for arbitration transaction to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: decisions[0].hash,
  });

  // waitForArbitration should immediately return the existing decision
  const result = await testContext.bobClient.oracle.waitForArbitration(fulfillment.uid, testContext.bob);

  expect(result.obligation).toBe(fulfillment.uid);
  expect(result.oracle).toBe(testContext.bob);
  expect(result.decision).toBe(true);
});

test("waitForArbitration with new decision", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bobClient.oracle.requestArbitration(fulfillment.uid, testContext.bob);
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  // Start waiting for arbitration (this should wait for a new decision)
  const waitPromise = testContext.bobClient.oracle.waitForArbitration(fulfillment.uid, testContext.bob);

  // Make arbitration decision after a short delay
  setTimeout(async () => {
    const obligationAbi = parseAbiParameters("(string item)");
    await testContext.bobClient.oracle.arbitratePast(async (attestation) => {
      const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "foo";
    });
  }, 100);

  // Wait for the arbitration result
  const result = await waitPromise;

  expect(result.obligation).toBe(fulfillment.uid);
  expect(result.oracle).toBe(testContext.bob);
  expect(result.decision).toBe(true);
});

test("waitForArbitration with false decision", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation("bad", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bobClient.oracle.requestArbitration(fulfillment.uid, testContext.bob);
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  // Start waiting for arbitration
  const waitPromise = testContext.bobClient.oracle.waitForArbitration(fulfillment.uid, testContext.bob);

  // Make arbitration decision with false result
  setTimeout(async () => {
    const obligationAbi = parseAbiParameters("(string item)");
    await testContext.bobClient.oracle.arbitratePast(async (attestation) => {
      const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "foo"; // This will be false for "bad"
    });
  }, 100);

  // Wait for the arbitration result
  const result = await waitPromise;

  expect(result.obligation).toBe(fulfillment.uid);
  expect(result.oracle).toBe(testContext.bob);
  expect(result.decision).toBe(false);
});

test("waitForArbitration integration with escrow collection", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.general.trustedOracle.encode({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bobClient.oracle.requestArbitration(fulfillment.uid, testContext.bob);
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  // Wait for arbitration and then collect escrow
  const waitPromise = testContext.bobClient.oracle.waitForArbitration(fulfillment.uid, testContext.bob);

  // Make arbitration decision
  setTimeout(async () => {
    const obligationAbi = parseAbiParameters("(string item)");
    await testContext.bobClient.oracle.arbitratePast(async (attestation) => {
      const obligation = testContext.bobClient.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "foo";
    });
  }, 100);

  // Wait for the arbitration result
  const result = await waitPromise;

  expect(result.decision).toBe(true);

  // Now collect escrow using the arbitration result
  const collectionHash = await testContext.bobClient.erc20.collectEscrow(escrow.uid, fulfillment.uid);

  expect(collectionHash).toBeTruthy();
});
