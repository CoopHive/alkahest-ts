/**
 * Arbiters Unit Tests
 *
 * This file contains tests for the arbiter client functionality, including:
 * - TrivialArbiter
 * - TrustedPartyArbiter
 * - TrustedOracleArbiter
 * - SpecificAttestationArbiter
 *
 * These tests mirror the solidity tests in test/unit/arbiters
 */

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "../utils/setup";

// Import contract artifacts needed for tests
import TrivialArbiter from "../../src/contracts/TrivialArbiter.json";
import TrustedPartyArbiter from "../../src/contracts/TrustedPartyArbiter.json";
import TrustedOracleArbiter from "../../src/contracts/TrustedOracleArbiter.json";
import SpecificAttestationArbiter from "../../src/contracts/SpecificAttestationArbiter.json";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";

describe("Arbiters Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let aliceClient: TestContext["aliceClient"];
  let bobClient: TestContext["bobClient"];
  let testClient: TestContext["testClient"];

  // Additional oracle account
  let oracle: `0x${string}`;
  let oracleClient: (typeof testContext)["aliceClient"];

  beforeAll(async () => {
    // Setup test environment
    testContext = await setupTestEnvironment();

    // Extract the values we need for tests
    alice = testContext.alice;
    bob = testContext.bob;
    aliceClient = testContext.aliceClient;
    bobClient = testContext.bobClient;
    testClient = testContext.testClient;

    // We'll use Bob as the oracle for simplicity
    oracle = bob;
    oracleClient = bobClient;
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

  describe("TrivialArbiter", () => {
    // Mirrors test/unit/arbiters/TrivialArbiter.t.sol
    test("testCheckStatementAlwaysReturnsTrue", async () => {
      // Create a test attestation (values don't matter for TrivialArbiter)
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Empty demand data
      const demand = "0x" as `0x${string}`;
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check that the arbiter returns true
      const result = await testClient.readContract({
        address: testContext.addresses.trivialArbiter,
        abi: TrivialArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      // Should always return true
      expect(result).toBe(true);

      // Try with different values, should still return true
      const attestation2 = {
        ...attestation,
        uid: "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`,
      };

      const demand2 = "0x736f6d652064617461" as `0x${string}`; // "some data" in hex
      const counteroffer2 =
        "0x000000000000000000000000000000000000000000000000000000000000002a" as `0x${string}`; // 42 in hex

      const result2 = await testClient.readContract({
        address: testContext.addresses.trivialArbiter,
        abi: TrivialArbiter.abi,
        functionName: "checkStatement",
        args: [attestation2, demand2, counteroffer2],
      });

      // Should always return true
      expect(result2).toBe(true);
    });
  });

  describe("TrustedPartyArbiter", () => {
    // Mirrors test/unit/arbiters/TrustedPartyArbiter.t.sol

    // Create mock addresses for testing
    const creator =
      "0x0000000000000000000000000000000000000123" as `0x${string}`;
    const nonCreator =
      "0x0000000000000000000000000000000000000456" as `0x${string}`;

    test("testCheckStatementWithCorrectCreator", async () => {
      // Create a test attestation with the correct recipient (creator)
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient: creator,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data with the correct creator and TrivialArbiter as base arbiter (will return true)
      const demandData = {
        baseArbiter: testContext.addresses.trivialArbiter,
        baseDemand: "0x" as `0x${string}`,
        creator: creator,
      };

      // Encode the demand data
      const demand = encodeAbiParameters(
        parseAbiParameters(
          "(address baseArbiter, bytes baseDemand, address creator)",
        ),
        [demandData],
      );

      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement should return true
      const result = await testClient.readContract({
        address: testContext.addresses.trustedPartyArbiter,
        abi: TrustedPartyArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckStatementWithIncorrectCreator", async () => {
      // Create a test attestation with an incorrect recipient (not the creator)
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient: nonCreator, // Different from creator
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data with the correct creator
      const demandData = {
        baseArbiter: testContext.addresses.trivialArbiter,
        baseDemand: "0x" as `0x${string}`,
        creator: creator,
      };

      // Encode the demand data
      const demand = encodeAbiParameters(
        parseAbiParameters(
          "(address baseArbiter, bytes baseDemand, address creator)",
        ),
        [demandData],
      );

      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement should revert with NotTrustedParty
      try {
        await testClient.readContract({
          address: testContext.addresses.trustedPartyArbiter,
          abi: TrustedPartyArbiter.abi,
          functionName: "checkStatement",
          args: [attestation, demand, counteroffer],
        });
        // If we didn't get an error, the test should fail
        expect(false).toBe(true);
      } catch (error) {
        // The error should contain "NotTrustedParty"
        expect((error as any).toString()).toContain("NotTrustedParty");
      }
    });
  });

  describe("TrustedOracleArbiter", () => {
    // Mirrors test/unit/arbiters/TrustedOracleArbiter.t.sol
    const statementUid =
      "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`;

    test("testConstructor", async () => {
      // Create an attestation with the statement UID
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data
      const demandData = {
        oracle: oracle,
      };

      // Encode demand data
      const demand =
        oracleClient.arbiters.encodeTrustedOracleDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement - should be false initially since no decision has been made
      const result = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      // Should be false initially
      expect(result).toBe(false);
    });

    test("testArbitrate", async () => {
      // Create an attestation with the statement UID
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data
      const demandData = {
        oracle: oracle,
      };

      // Encode demand data
      const demand =
        oracleClient.arbiters.encodeTrustedOracleDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Initially the decision should be false (default value)
      const initialResult = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(initialResult).toBe(false);

      // Make a positive arbitration decision
      const arbitrateHash =
        await oracleClient.arbiters.arbitrateAsTrustedOracle(
          statementUid,
          true,
        );

      // Wait for transaction receipt
      await testClient.waitForTransactionReceipt({
        hash: arbitrateHash,
      });

      // Now the decision should be true
      const finalResult = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(finalResult).toBe(true);
    });

    test("testCheckStatementWithDifferentOracles", async () => {
      // Set up two different oracles with different decisions
      const oracle1 = oracle;
      const oracle2 = alice;

      // Oracle 1 makes a positive decision
      const arbitrateHash1 =
        await oracleClient.arbiters.arbitrateAsTrustedOracle(
          statementUid,
          true,
        );

      // Wait for transaction receipt
      await testClient.waitForTransactionReceipt({
        hash: arbitrateHash1,
      });

      // Oracle 2 makes a negative decision
      const arbitrateHash2 =
        await aliceClient.arbiters.arbitrateAsTrustedOracle(
          statementUid,
          false,
        );

      // Wait for transaction receipt
      await testClient.waitForTransactionReceipt({
        hash: arbitrateHash2,
      });

      // Create the attestation
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Check with oracle1 - should be true
      const demandData1 = {
        oracle: oracle1,
      };
      const demand1 =
        oracleClient.arbiters.encodeTrustedOracleDemand(demandData1);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      const result1 = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand1, counteroffer],
      });

      expect(result1).toBe(true);

      // Check with oracle2 - should be false
      const demandData2 = {
        oracle: oracle2,
      };
      const demand2 =
        aliceClient.arbiters.encodeTrustedOracleDemand(demandData2);

      const result2 = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand2, counteroffer],
      });

      expect(result2).toBe(false);
    });

    test("testCheckStatementWithNoDecision", async () => {
      // Create a new oracle address that hasn't made a decision
      const newOracle = privateKeyToAddress(generatePrivateKey());

      // Create the attestation
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data
      const demandData = {
        oracle: newOracle,
      };

      // Encode demand data
      const demand = aliceClient.arbiters.encodeTrustedOracleDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check with the new oracle - should be false (default value)
      const result = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(false);
    });
  });

  describe("SpecificAttestationArbiter", () => {
    // Mirrors test/unit/arbiters/SpecificAttestationArbiter.t.sol
    test("testCheckStatementWithCorrectUID", async () => {
      // Create a test attestation
      const uid =
        "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`;
      const attestation = {
        uid: uid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data with matching UID
      const demandData = {
        uid: uid,
      };

      // Encode demand data
      const demand =
        aliceClient.arbiters.encodeSpecificAttestationDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement - should return true
      const result = await testClient.readContract({
        address: testContext.addresses.specificAttestationArbiter,
        abi: SpecificAttestationArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckStatementWithIncorrectUID", async () => {
      // Create a test attestation
      const uid =
        "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`;
      const attestation = {
        uid: uid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data with non-matching UID
      const demandData = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000002" as `0x${string}`,
      };

      // Encode demand data
      const demand =
        aliceClient.arbiters.encodeSpecificAttestationDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement should revert with NotDemandedAttestation
      try {
        await testClient.readContract({
          address: testContext.addresses.specificAttestationArbiter,
          abi: SpecificAttestationArbiter.abi,
          functionName: "checkStatement",
          args: [attestation, demand, counteroffer],
        });
        // If we didn't get an error, the test should fail
        expect(false).toBe(true);
      } catch (error) {
        // The error should contain "NotDemandedAttestation"
        expect((error as any).toString()).toContain("NotDemandedAttestation");
      }
    });
  });
});
