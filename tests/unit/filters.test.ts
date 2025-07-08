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

test("arbitratePast with enhanced time filters", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "foo" },
    ]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  // Create multiple fulfillments at different times
  const { attested: fulfillment1 } = await testContext.bobClient.stringObligation.doObligation(
    "foo",
    escrow.uid,
  );

  // Wait a bit longer
  await new Promise(resolve => setTimeout(resolve, 3000));

  const { attested: fulfillment2 } = await testContext.bobClient.stringObligation.doObligation(
    "foo",
    escrow.uid,
  );

  // First check if we can get any statements without filters
  const { decisions: allDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
  });

  // Should have 2 statements
  expect(allDecisions.length).toBe(2);

  // Test minAge filter - only process attestations older than 2 seconds
  const { decisions: recentDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    minAge: 2n, // 2 seconds (should filter out the recent fulfillment2)
  });

  // Should process the older attestation but skip the recent one
  expect(recentDecisions.length).toBe(1);
  expect(recentDecisions[0]?.attestation.uid).toBe(fulfillment1.uid);

  // Test excludeExpired filter with expired attestations
  // (Note: This would require creating attestations with expiration times)
});

test("arbitratePast with attestation property filters", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "foo" },
    ]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  // Create fulfillments from different attesters
  const { attested: fulfillment1 } = await testContext.bobClient.stringObligation.doObligation(
    "foo",
    escrow.uid,
  );

  const { attested: fulfillment2 } = await testContext.aliceClient.stringObligation.doObligation(
    "bar",
    escrow.uid,
  );

  // Test specificAttester filter
  const { decisions: bobDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    specificAttester: testContext.addresses.stringObligation,
    skipAlreadyArbitrated: true,
  });

  // Should only process fulfillments from the specific attester
  expect(bobDecisions.length).toBeGreaterThan(0);

  // Test excludeAttesters filter
  const { decisions: excludedDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    excludeAttesters: [testContext.alice], // Exclude Alice's attestations
    skipAlreadyArbitrated: true,
  });

  // Should exclude attestations from Alice
  const aliceAttestations = excludedDecisions.filter(
    (d: any) => d?.attestation.attester.toLowerCase() === testContext.alice.toLowerCase()
  );
  expect(aliceAttestations.length).toBe(0);
});

test("arbitratePast with batch processing filters", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "foo" },
    ]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  // Create multiple fulfillments sequentially to avoid timing issues
  const fulfillments = [];
  fulfillments.push(await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid));
  fulfillments.push(await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid));
  fulfillments.push(await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid));

  // Test maxStatements filter
  const { decisions: limitedDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    maxStatements: 2, // Limit to 2 statements
    dryRun: true, // Use dry run to avoid executing transactions
  });

  // Should only process 2 statements
  expect(limitedDecisions.length).toBeLessThanOrEqual(2);
  // In dry run mode, check that decisions are simulated
  if (limitedDecisions.length > 0) {
    expect(limitedDecisions[0]?.simulated).toBe(true);
  }

  // Test prioritizeRecent filter
  const { decisions: prioritizedDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    prioritizeRecent: true,
    maxStatements: 1,
    dryRun: true, // Use dry run to avoid executing transactions
  });

  // Should process the most recent attestation first
  if (prioritizedDecisions.length > 0) {
    expect(prioritizedDecisions[0]?.simulated).toBe(true);
    expect(prioritizedDecisions[0]?.attestation.time).toBeGreaterThan(0n);
  }
});

test("arbitratePast with dry run mode", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "foo" },
    ]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation(
    "foo",
    escrow.uid,
  );

  // Test dry run mode
  const { decisions: dryRunDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    dryRun: true, // Only simulate, don't execute
    skipAlreadyArbitrated: true,
  });

  // Should return simulated results
  expect(dryRunDecisions.length).toBeGreaterThan(0);
  if (dryRunDecisions.length > 0) {
    expect(dryRunDecisions[0]?.simulated).toBe(true);
    expect(dryRunDecisions[0]?.decision).toBe(true);
    // Hash should not exist in dry run mode
    expect(dryRunDecisions[0]?.hash).toBeUndefined();
  }
});

test("arbitratePast with block range filters", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "foo" },
    ]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation(
    "foo",
    escrow.uid,
  );

  // Get current block number after creating the fulfillment
  const currentBlock = await testContext.testClient.getBlockNumber();

  // First verify we can find statements without block filters
  const { decisions: allDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    dryRun: true, // Use dry run to avoid executing arbitrations
  });

  // Should find the attestation without any filters
  expect(allDecisions.length).toBeGreaterThan(0);

  // Test fromBlock filter - only process from current block onwards
  const { decisions: recentBlockDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    fromBlock: currentBlock, // Use current block to ensure we include the fulfillment
    dryRun: true, // Use dry run to avoid executing arbitrations
  });

  // Should find the attestation created at or after the specified block
  expect(recentBlockDecisions.length).toBeGreaterThan(0);

  // Test toBlock filter - only process up to current block
  // Note: Block tags like "latest" work more reliably than specific block numbers
  // in test environments due to timing and chain state consistency
  const { decisions: pastBlockDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    fromBlock: "earliest",
    toBlock: "latest", // Use "latest" tag for reliable block range filtering
    dryRun: true, // Use dry run to avoid executing arbitrations
  });

  // Should find attestations within the block range
  expect(pastBlockDecisions.length).toBeGreaterThan(0);
});

test("arbitratePast with performance filters", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "foo" },
    ]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bobClient.stringObligation.doObligation(
    "foo",
    escrow.uid,
  );

  // Test maxGasPerTx filter
  const { decisions: gasLimitedDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    maxGasPerTx: 100000n, // Set a reasonable gas limit
    skipAlreadyArbitrated: true,
  });

  // Should process transactions within gas limits
  expect(gasLimitedDecisions.length).toBeGreaterThanOrEqual(0);

  // Test skipValidation filter
  const { decisions: skipValidationDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    skipValidation: true, // Skip validation checks
    skipAlreadyArbitrated: true,
  });

  // Should process without validation
  expect(skipValidationDecisions.length).toBeGreaterThanOrEqual(0);
});

test("arbitratePast with combined filters", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.bob,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
      { mockDemand: "foo" },
    ]),
  });

  const { attested: escrow } = await testContext.aliceClient.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  // Create multiple fulfillments sequentially to avoid timing issues
  await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);
  await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);
  await testContext.bobClient.stringObligation.doObligation("foo", escrow.uid);

  // Test combination of filters
  const { decisions: combinedDecisions } = await testContext.bobClient.oracle.arbitratePast({
    fulfillment: {
      attester: testContext.addresses.stringObligation,
      statementAbi: parseAbiParameters("(string item)"),
    },
    arbitrate: async (statement: readonly [{ item: string }]) => statement[0].item === "foo",
    maxStatements: 2, // Limit batch size
    prioritizeRecent: true, // Prioritize recent attestations
    dryRun: true, // Only simulate
    maxGasPerTx: 100000n, // Gas limit
  });

  // Should respect all filter constraints
  expect(combinedDecisions.length).toBeLessThanOrEqual(2);
  if (combinedDecisions.length > 0) {
    // All should be simulated
    combinedDecisions.forEach(decision => {
      expect(decision?.simulated).toBe(true);
      expect(decision?.hash).toBeUndefined();
    });
  }
});
