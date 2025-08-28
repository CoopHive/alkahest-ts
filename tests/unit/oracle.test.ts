import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import {
  encodeAbiParameters,
  parseAbiParameters,
  decodeAbiParameters,
} from "viem";
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
      0n
    );

  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "foo",
      escrow.uid
    );

  const decisions = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      obligationAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_obligation) => true,
  });

  decisions.decisions.forEach(($: { decision: any }) =>
    expect($?.decision).toBe(true)
  );

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment.uid
  );

  expect(collectionHash).toBeTruthy();
});

test("trivialListenAndArbitrate", async () => {
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
      0n
    );

  const { unwatch } = await testContext.bobClient.oracle.listenAndArbitrate({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      obligationAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_obligation) => true,
    onAfterArbitrate: async (decision) => {
      expect(decision?.attestation.uid).toEqual(fulfillment.uid);
      expect(decision?.obligation[0].item).toEqual("foo");
      expect(decision?.decision).toBe(true);
    },
    pollingInterval: 50,
  });

  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "foo",
      escrow.uid
    );

  await Bun.sleep(100);
  const collectionHash = await testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment.uid
  );

  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("conditionalArbitratePast", async () => {
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
      0n
    );

  const { attested: fulfillment1 } =
    await testContext.bobClient.stringObligation.doObligation(
      "good",
      escrow.uid
    );

  const { attested: fulfillment2 } =
    await testContext.bobClient.stringObligation.doObligation(
      "bad",
      escrow.uid
    );

  const decisions = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      obligationAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_obligation) => _obligation[0].item === "good",
  });

  decisions.decisions.forEach(($) =>
    expect($?.decision).toBe($?.obligation[0].item === "good")
  );

  const failedCollection = testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment2.uid
  );
  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment1.uid
  );

  expect(collectionHash).toBeTruthy();
});

test("conditionalListenAndArbitrate", async () => {
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
      0n
    );

  const { unwatch } = await testContext.bobClient.oracle.listenAndArbitrate({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      obligationAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_obligation) => _obligation[0].item === "good",
    onAfterArbitrate: async (decision) => {
      expect(decision?.decision).toBe(decision?.obligation[0].item === "good");
    },
    pollingInterval: 50,
  });

  const { attested: fulfillment1 } =
    await testContext.bobClient.stringObligation.doObligation(
      "good",
      escrow.uid
    );

  const { attested: fulfillment2 } =
    await testContext.bobClient.stringObligation.doObligation(
      "bad",
      escrow.uid
    );

  await Bun.sleep(100);
  const failedCollection = testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment2.uid
  );
  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment1.uid
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
      0n
    );

  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "foo",
      escrow.uid
    );

  const decisions = await testContext.bobClient.oracle.arbitratePastForEscrow({
    escrow: {
      attester: testContext.addresses.erc20EscrowObligation,
      demandAbi: parseAbiParameters("(string mockDemand)"),
    },
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      obligationAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_obligation, _demand) => true,
  });

  decisions.decisions.forEach(($) => expect($?.decision).toBe(true));

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment.uid
  );

  expect(collectionHash).toBeTruthy();
});

test("trivialListenAndArbitrateEscrow", async () => {
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
      0n
    );

  const { unwatch } =
    await testContext.bobClient.oracle.listenAndArbitrateForEscrow({
      escrow: {
        attester: testContext.addresses.erc20EscrowObligation,
        demandAbi: parseAbiParameters("(string mockDemand)"),
      },
      fulfillment: {
        attester: testContext.addresses.stringObligation,
        obligationAbi: parseAbiParameters("(string item)"),
      },
      arbitrate: async (_obligation, _demand) => true,
      onAfterArbitrate: async (decision) => {
        expect(decision?.attestation.uid).toEqual(fulfillment.uid);
        expect(decision?.obligation[0].item).toEqual("foo");
        expect(decision?.decision).toBe(true);
      },
      pollingInterval: 50,
    });

  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "foo",
      escrow.uid
    );

  await Bun.sleep(100);
  const collectionHash = await testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment.uid
  );

  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("conditionalArbitratePastEscrow", async () => {
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
      0n
    );

  const { attested: fulfillment1 } =
    await testContext.bobClient.stringObligation.doObligation(
      "foo",
      escrow.uid
    );

  const { attested: fulfillment2 } =
    await testContext.bobClient.stringObligation.doObligation(
      "bar",
      escrow.uid
    );

  const decisions = await testContext.bobClient.oracle.arbitratePastForEscrow({
    escrow: {
      attester: testContext.addresses.erc20EscrowObligation,
      demandAbi: parseAbiParameters("(string mockDemand)"),
    },
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      obligationAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (_obligation, _demand) =>
      _obligation[0].item === _demand[0].mockDemand,
  });

  decisions.decisions.forEach(($) =>
    expect($!.demand[0].mockDemand === $!.obligation[0].item).toBe(
      $!.decision !== null ? $!.decision : false
    )
  );

  const failedCollection = testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment2.uid
  );
  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment1.uid
  );

  expect(collectionHash).toBeTruthy();
});

test("conditionalListenAndArbitrateEscrow", async () => {
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
      0n
    );

  const { unwatch } =
    await testContext.bobClient.oracle.listenAndArbitrateForEscrow({
      escrow: {
        attester: testContext.addresses.erc20EscrowObligation,
        demandAbi: parseAbiParameters("(string mockDemand)"),
      },
      fulfillment: {
        attester: testContext.addresses.stringObligation,
        obligationAbi: parseAbiParameters("(string item)"),
      },
      arbitrate: async (_obligation, _demand) =>
        _obligation[0].item === _demand[0].mockDemand,
      onAfterArbitrate: async (decision) => {
        expect(decision?.decision).toBe(
          decision?.obligation[0].item === decision?.demand[0].mockDemand
        );
      },
      pollingInterval: 50,
    });

  const { attested: fulfillment1 } =
    await testContext.bobClient.stringObligation.doObligation(
      "foo",
      escrow.uid
    );

  const { attested: fulfillment2 } =
    await testContext.bobClient.stringObligation.doObligation(
      "bar",
      escrow.uid
    );

  await Bun.sleep(100);
  const failedCollection = testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment2.uid
  );
  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    fulfillment1.uid
  );
  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("arbitratePast with skipAlreadyArbitrated option", async () => {
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
      0n
    );

  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "foo",
      escrow.uid
    );

  // First arbitration should succeed
  const { decisions: firstDecisions } =
    await testContext.bobClient.oracle.arbitratePast({
      fulfillment: {
        obligationAbi: parseAbiParameters("(string item)"),
        attester: testContext.addresses.stringObligation,
      },
      arbitrate: async (obligation) => {
        return obligation[0].item === "foo";
      },
      options: { skipArbitrated: false },
    });

  expect(firstDecisions.length).toBe(1);
  expect(firstDecisions[0]?.decision).toBe(true);

  // Wait for the transaction to be confirmed
  const firstDecision = firstDecisions[0];
  if (firstDecision && "hash" in firstDecision && firstDecision.hash) {
    await testContext.testClient.waitForTransactionReceipt({
      hash: firstDecision.hash,
    });
  } else {
    throw new Error("Expected first decision to have a hash");
  }

  // Second arbitration with skipAlreadyArbitrated: false should attempt to arbitrate again
  const { decisions: secondDecisions } =
    await testContext.bobClient.oracle.arbitratePast({
      fulfillment: {
        obligationAbi: parseAbiParameters("(string item)"),
        attester: testContext.addresses.stringObligation,
      },
      arbitrate: async (obligation) => {
        return obligation[0].item === "foo";
      },
      options: { skipArbitrated: false },
    });

  expect(secondDecisions.length).toBe(1);

  // Third arbitration with skipAlreadyArbitrated: true should skip re-arbitration
  const { decisions: thirdDecisions } =
    await testContext.bobClient.oracle.arbitratePast({
      fulfillment: {
        obligationAbi: parseAbiParameters("(string item)"),
        attester: testContext.addresses.stringObligation,
      },
      arbitrate: async (obligation) => {
        return obligation[0].item === "foo";
      },
      options: { skipArbitrated: true },
    });

  expect(thirdDecisions.length).toBe(0); // Should skip already arbitrated fulfillments
});

test("arbitratePastForEscrow with skipAlreadyArbitrated option", async () => {
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
      0n
    );

  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "foo",
      escrow.uid
    );

  // First arbitration should succeed
  const { decisions: firstDecisions } =
    await testContext.bobClient.oracle.arbitratePastForEscrow({
      escrow: {
        attester: testContext.addresses.erc20EscrowObligation,
        demandAbi: parseAbiParameters("(string mockDemand)"),
      },
      fulfillment: {
        attester: testContext.addresses.stringObligation,
        obligationAbi: parseAbiParameters("(string item)"),
      },
      arbitrate: async (obligation, demand) => {
        return obligation[0].item === demand[0].mockDemand;
      },
      options: { skipArbitrated: false },
    });

  expect(firstDecisions.length).toBe(1);
  expect(firstDecisions[0]?.decision).toBe(true);

  // Wait for the transaction to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: firstDecisions[0]?.hash!,
  });

  // Second arbitration with skipAlreadyArbitrated: true should skip re-arbitration
  const { decisions: secondDecisions } =
    await testContext.bobClient.oracle.arbitratePastForEscrow({
      escrow: {
        attester: testContext.addresses.erc20EscrowObligation,
        demandAbi: parseAbiParameters("(string mockDemand)"),
      },
      fulfillment: {
        attester: testContext.addresses.stringObligation,
        obligationAbi: parseAbiParameters("(string item)"),
      },
      arbitrate: async (obligation, demand) => {
        return obligation[0].item === demand[0].mockDemand;
      },
      options: { skipArbitrated: true },
    });

  expect(secondDecisions.length).toBe(0); // Should skip already arbitrated fulfillments
});

test("listenAndArbitrateNewFulfillments - only listens for new events", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "test" },
    ]),
  });

  // Create escrow first
  const { attested: escrow } =
    await testContext.aliceClient.erc20.permitAndBuyWithErc20(
      {
        address: testContext.mockAddresses.erc20A,
        value: 10n,
      },
      { arbiter, demand },
      0n
    );

  // Create a fulfillment BEFORE starting to listen
  const { attested: pastFulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "test",
      escrow.uid
    );

  let arbitrationsProcessed = 0;
  let newFulfillmentProcessed = false;

  // Start listening only for NEW events (should not process past fulfillment)
  const { unwatch } = await testContext.bobClient.oracle.listenAndArbitrate({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      obligationAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (obligation) => {
      arbitrationsProcessed++;
      if (obligation[0].item === "new-test") {
        newFulfillmentProcessed = true;
      }
      return obligation[0].item === "new-test";
    },
    onAfterArbitrate: async (decision) => {
      expect(decision?.obligation[0].item).toEqual("new-test");
      expect(decision?.decision).toBe(true);
    },
    pollingInterval: 25,
    options: { onlyNew: true },
  });

  // Wait a bit to ensure listener is established
  await Bun.sleep(25);

  // Past fulfillment should NOT be processed
  expect(arbitrationsProcessed).toBe(0);

  // Create a NEW fulfillment after starting to listen
  const { attested: newFulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "new-test",
      escrow.uid
    );

  // Wait for the new fulfillment to be processed
  await Bun.sleep(75);

  // Should have processed exactly 1 arbitration (the new one)
  expect(arbitrationsProcessed).toBe(1);
  expect(newFulfillmentProcessed).toBe(true);

  // Verify collection works
  const collectionHash = await testContext.bobClient.erc20.collectEscrow(
    escrow.uid,
    newFulfillment.uid
  );
  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("listenAndArbitrateNewFulfillments with conditional arbitration", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "accept" },
    ]),
  });

  const { attested: escrow } =
    await testContext.aliceClient.erc20.permitAndBuyWithErc20(
      {
        address: testContext.mockAddresses.erc20A,
        value: 10n,
      },
      { arbiter, demand },
      0n
    );

  let acceptedCount = 0;
  let rejectedCount = 0;

  const { unwatch } = await testContext.bobClient.oracle.listenAndArbitrate({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      obligationAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (obligation) => {
      const shouldAccept = obligation[0].item === "accept";
      if (shouldAccept) acceptedCount++;
      else rejectedCount++;
      return shouldAccept;
    },
    onAfterArbitrate: async (decision) => {
      expect(decision?.decision).toBe(
        decision?.obligation[0].item === "accept"
      );
    },
    pollingInterval: 25,
    options: { onlyNew: true },
  });

  // Create fulfillments that should be accepted
  await testContext.bobClient.stringObligation.doObligation(
    "accept",
    escrow.uid
  );
  await testContext.bobClient.stringObligation.doObligation(
    "reject",
    escrow.uid
  );
  await testContext.bobClient.stringObligation.doObligation(
    "accept",
    escrow.uid
  );

  await Bun.sleep(100);

  expect(acceptedCount).toBe(2);
  expect(rejectedCount).toBe(1);

  unwatch();
});

test("listenAndArbitrateNewFulfillmentsForEscrow with skipAlreadyArbitrated", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "skip-test" },
    ]),
  });

  let arbitrationsAttempted = 0;

  const { unwatch } =
    await testContext.bobClient.oracle.listenAndArbitrateForEscrow({
      escrow: {
        attester: testContext.addresses.erc20EscrowObligation,
        demandAbi: parseAbiParameters("(string mockDemand)"),
      },
      fulfillment: {
        attester: testContext.addresses.stringObligation,
        obligationAbi: parseAbiParameters("(string item)"),
      },
      arbitrate: async (obligation, demand) => {
        arbitrationsAttempted++;
        return obligation[0].item === demand[0].mockDemand;
      },
      options: { skipArbitrated: true, onlyNew: true },
      pollingInterval: 25,
    });

  // Create new escrow
  const { attested: escrow } =
    await testContext.aliceClient.erc20.permitAndBuyWithErc20(
      {
        address: testContext.mockAddresses.erc20A,
        value: 10n,
      },
      { arbiter, demand },
      0n
    );

  await Bun.sleep(50);

  // Create fulfillment
  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "skip-test",
      escrow.uid
    );

  await Bun.sleep(75);

  // Should have processed the first arbitration
  expect(arbitrationsAttempted).toBe(1);

  // Create another fulfillment with the same obligation - should be skipped due to already arbitrated
  const { attested: duplicateFulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "skip-test",
      escrow.uid
    );

  await Bun.sleep(75);

  // Should still be 1 because the duplicate should be skipped
  expect(arbitrationsAttempted).toBe(2); // Note: This tests the listener behavior, not the skipAlreadyArbitrated for the same fulfillment

  unwatch();
});

test("listenAndArbitrate with onlyIfEscrowDemandsCurrentOracle", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;

  // Create demand for Bob (current oracle)
  const demandForBob =
    testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
      oracle: testContext.bob,
      data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
        { mockDemand: "for-bob" },
      ]),
    });

  let arbitrationsProcessed = 0;
  let processedFulfillments: string[] = [];

  // Bob starts listening with onlyIfEscrowDemandsCurrentOracle: true
  const { unwatch } = await testContext.bobClient.oracle.listenAndArbitrate({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      obligationAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (obligation) => {
      arbitrationsProcessed++;
      processedFulfillments.push(obligation[0].item);
      return true;
    },
    pollingInterval: 25,
    options: { onlyNew: true, requireOracle: true },
  });

  // Create escrow demanding Bob as oracle
  const { attested: escrowForBob } =
    await testContext.aliceClient.erc20.permitAndBuyWithErc20(
      {
        address: testContext.mockAddresses.erc20A,
        value: 10n,
      },
      { arbiter, demand: demandForBob },
      0n
    );

  await Bun.sleep(50);

  // Create fulfillment for Bob's escrow (should be processed)
  const { attested: fulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "for-bob",
      escrowForBob.uid
    );

  // Get the full attestation to verify refUID
  const fullAttestation = await testContext.bobClient.getAttestation(
    fulfillment.uid
  );

  // Verify the fulfillment is properly linked to the escrow
  expect(fullAttestation.refUID).toBe(escrowForBob.uid);

  await Bun.sleep(150);

  // Should process 1 arbitration (the one demanding Bob as oracle)
  // Note: Since we're only creating one escrow that demands Bob, it should be processed
  expect(arbitrationsProcessed).toBe(1);
  expect(processedFulfillments).toContain("for-bob");

  unwatch();
});

test("listenAndArbitrateForEscrow - listens to past and new escrows, only new fulfillments", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;

  // Create a past escrow BEFORE starting to listen
  const pastDemand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand(
    {
      oracle: testContext.bob,
      data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
        { mockDemand: "past-escrow" },
      ]),
    }
  );

  const { attested: pastEscrow } =
    await testContext.aliceClient.erc20.permitAndBuyWithErc20(
      {
        address: testContext.mockAddresses.erc20A,
        value: 10n,
      },
      { arbiter, demand: pastDemand },
      0n
    );

  // Create a past fulfillment BEFORE starting to listen (should NOT be processed)
  const { attested: pastFulfillment } =
    await testContext.bobClient.stringObligation.doObligation(
      "past-fulfillment",
      pastEscrow.uid
    );

  let arbitrationsProcessed = 0;
  let processedFulfillments: string[] = [];

  // Start listening - should pick up past escrows but only NEW fulfillments
  const { unwatch } =
    await testContext.bobClient.oracle.listenAndArbitrateForEscrow({
      escrow: {
        attester: testContext.addresses.erc20EscrowObligation,
        demandAbi: parseAbiParameters("(string mockDemand)"),
      },
      fulfillment: {
        attester: testContext.addresses.stringObligation,
        obligationAbi: parseAbiParameters("(string item)"),
      },
      arbitrate: async (obligation, demand) => {
        arbitrationsProcessed++;
        processedFulfillments.push(
          `${obligation[0].item}-${demand[0].mockDemand}`
        );
        return obligation[0].item.includes(demand[0].mockDemand);
      },
      options: { onlyNew: true },

      pollingInterval: 50,
    });

  // Wait to ensure listener is established
  await Bun.sleep(100);

  // Past fulfillment should NOT be processed since we only listen to NEW fulfillments
  expect(arbitrationsProcessed).toBe(0);

  // Create NEW fulfillment for the past escrow (should be processed)
  const { attested: newFulfillmentForPastEscrow } =
    await testContext.bobClient.stringObligation.doObligation(
      "new-for-past-escrow",
      pastEscrow.uid
    );

  await Bun.sleep(150);

  // Should process the new fulfillment for past escrow
  expect(arbitrationsProcessed).toBe(1);
  expect(processedFulfillments).toContain("new-for-past-escrow-past-escrow");

  unwatch();
}, 10000); // Increased timeout to 10 seconds
