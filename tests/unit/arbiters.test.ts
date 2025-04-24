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
import { abi as trivialArbiterAbi } from "../../src/contracts/TrivialArbiter";
import { abi as trustedPartyArbiterAbi } from "../../src/contracts/TrustedPartyArbiter";
import { abi as trustedOracleArbiterAbi } from "../../src/contracts/TrustedOracleArbiter";
import { abi as specificAttestationArbiterAbi } from "../../src/contracts/SpecificAttestationArbiter";
import { abi as intrinsicsArbiter2Abi } from "../../src/contracts/IntrinsicsArbiter2";
import { abi as anyArbiterAbi } from "../../src/contracts/AnyArbiter";
import { abi as allArbiterAbi } from "../../src/contracts/AllArbiter";
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
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Empty demand data
      const demand = "0x" as const;
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check that the arbiter returns true
      const result = await testClient.readContract({
        address: testContext.addresses.trivialArbiter,
        abi: trivialArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      // Should always return true
      expect(result).toBe(true);

      // Try with different values, should still return true
      const attestation2 = {
        ...attestation,
        uid: "0x0000000000000000000000000000000000000000000000000000000000000001" as const,
      };

      const demand2 = "0x736f6d652064617461" as const; // "some data" in hex
      const counteroffer2 =
        "0x000000000000000000000000000000000000000000000000000000000000002a" as const; // 42 in hex

      const result2 = await testClient.readContract({
        address: testContext.addresses.trivialArbiter,
        abi: trivialArbiterAbi.abi,
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
    const creator = "0x0000000000000000000000000000000000000123" as const;
    const nonCreator = "0x0000000000000000000000000000000000000456" as const;

    test("testCheckStatementWithCorrectCreator", async () => {
      // Create a test attestation with the correct recipient (creator)
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: creator,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data with the correct creator and TrivialArbiter as base arbiter (will return true)
      const demandData = {
        baseArbiter: testContext.addresses.trivialArbiter,
        baseDemand: "0x" as const,
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
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check statement should return true
      const result = await testClient.readContract({
        address: testContext.addresses.trustedPartyArbiter,
        abi: trustedPartyArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckStatementWithIncorrectCreator", async () => {
      // Create a test attestation with an incorrect recipient (not the creator)
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: nonCreator, // Different from creator
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data with the correct creator
      const demandData = {
        baseArbiter: testContext.addresses.trivialArbiter,
        baseDemand: "0x" as const,
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
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check statement should revert with NotTrustedParty
      try {
        await testClient.readContract({
          address: testContext.addresses.trustedPartyArbiter,
          abi: trustedPartyArbiterAbi.abi,
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
      "0x0000000000000000000000000000000000000000000000000000000000000001" as const;

    test("testConstructor", async () => {
      // Create an attestation with the statement UID
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data
      const demandData = {
        oracle: oracle,
        data: "0x" as const,
      };

      // Encode demand data
      const demand =
        oracleClient.arbiters.encodeTrustedOracleDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check statement - should be false initially since no decision has been made
      const result = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
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
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data
      const demandData = {
        oracle: oracle,
        data: "0x" as const,
      };

      // Encode demand data
      const demand =
        oracleClient.arbiters.encodeTrustedOracleDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Initially the decision should be false (default value)
      const initialResult = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
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
        abi: trustedOracleArbiterAbi.abi,
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
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Check with oracle1 - should be true
      const demandData1 = {
        oracle: oracle1,
        data: "0x" as const,
      };
      const demand1 =
        oracleClient.arbiters.encodeTrustedOracleDemand(demandData1);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      const result1 = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, demand1, counteroffer],
      });

      expect(result1).toBe(true);

      // Check with oracle2 - should be false
      const demandData2 = {
        oracle: oracle2,
        data: "0x" as const,
      };
      const demand2 =
        aliceClient.arbiters.encodeTrustedOracleDemand(demandData2);

      const result2 = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
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
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data
      const demandData = {
        oracle: newOracle,
        data: "0x" as const,
      };

      // Encode demand data
      const demand = aliceClient.arbiters.encodeTrustedOracleDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check with the new oracle - should be false (default value)
      const result = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
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
        "0x0000000000000000000000000000000000000000000000000000000000000001" as const;
      const attestation = {
        uid: uid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data with matching UID
      const demandData = {
        uid: uid,
      };

      // Encode demand data
      const demand =
        aliceClient.arbiters.encodeSpecificAttestationDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check statement - should return true
      const result = await testClient.readContract({
        address: testContext.addresses.specificAttestationArbiter,
        abi: specificAttestationArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckStatementWithIncorrectUID", async () => {
      // Create a test attestation
      const uid =
        "0x0000000000000000000000000000000000000000000000000000000000000001" as const;
      const attestation = {
        uid: uid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data with non-matching UID
      const demandData = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000002" as const,
      };

      // Encode demand data
      const demand =
        aliceClient.arbiters.encodeSpecificAttestationDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check statement should revert with NotDemandedAttestation
      try {
        await testClient.readContract({
          address: testContext.addresses.specificAttestationArbiter,
          abi: specificAttestationArbiterAbi.abi,
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

  describe("IntrinsicsArbiter2", () => {
    // Test schema hash
    const schema =
      "0x1234567890123456789012345678901234567890123456789012345678901234" as const;

    test("testEncodeDecodeIntrinsics2Demand", () => {
      // Create demand data
      const demandData = { schema };

      // Encode the demand data
      const encodedDemand =
        aliceClient.arbiters.encodeIntrinsics2Demand(demandData);

      // Decode the encoded demand data
      const decodedDemand =
        aliceClient.arbiters.decodeIntrinsics2Demand(encodedDemand);

      // Verify the decoded data matches the original
      expect(decodedDemand.schema).toBe(schema);
    });

    test("testCheckStatementWithMatchingSchema", async () => {
      // Create a test attestation with matching schema
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        schema,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data with matching schema
      const demandData = { schema };
      const demand = aliceClient.arbiters.encodeIntrinsics2Demand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check statement should return true for matching schema
      const result = await testClient.readContract({
        address: testContext.addresses.intrinsicsArbiter2,
        abi: intrinsicsArbiter2Abi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckStatementWithNonMatchingSchema", async () => {
      // Create a test attestation with different schema
      const differentSchema =
        "0x5555555555555555555555555555555555555555555555555555555555555555" as const;
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        schema: differentSchema,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Demand data with original schema
      const demandData = { schema };
      const demand = aliceClient.arbiters.encodeIntrinsics2Demand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should fail with "SchemaMismatch" error
      try {
        await testClient.readContract({
          address: testContext.addresses.intrinsicsArbiter2,
          abi: intrinsicsArbiter2Abi.abi,
          functionName: "checkStatement",
          args: [attestation, demand, counteroffer],
        });
        expect(false).toBe(true); // Should not reach here
      } catch (error) {
        expect((error as any).toString()).toContain("InvalidSchema");
      }
    });
  });

  describe("AnyArbiter", () => {
    test("testEncodeDecodeMultiArbiterDemand", () => {
      // Create multi arbiter demand data
      const demandData = {
        arbiters: [
          testContext.addresses.trivialArbiter,
          testContext.addresses.intrinsicsArbiter2,
        ],
        demands: ["0x1234" as const, "0x5678" as const],
      };

      // Encode the demand data
      const encodedDemand =
        aliceClient.arbiters.encodeMultiArbiterDemand(demandData);

      // Decode the encoded demand data
      const decodedDemand =
        aliceClient.arbiters.decodeMultiArbiterDemand(encodedDemand);

      // Verify decoded data matches original
      expect(decodedDemand.arbiters.map(($) => $.toLowerCase())).toEqual(
        demandData.arbiters.map(($) => $.toLowerCase()),
      );
      expect(decodedDemand.demands).toEqual(demandData.demands);
    });

    test("testCheckStatementWithAnyTrueArbiter", async () => {
      // Create attestation
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand with TrivialArbiter (always returns true) and another arbiter
      const demandData = {
        arbiters: [
          testContext.addresses.trivialArbiter,
          testContext.addresses.specificAttestationArbiter,
        ],
        demands: [
          "0x" as const, // Empty demand for TrivialArbiter
          "0x1234" as const, // Invalid demand for SpecificAttestationArbiter
        ],
      };

      const demand = aliceClient.arbiters.encodeMultiArbiterDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should return true because at least one arbiter (TrivialArbiter) returns true
      const result = await testClient.readContract({
        address: testContext.addresses.anyArbiter,
        abi: anyArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckStatementWithAllFalseArbiters", async () => {
      // Prepare attestation
      const statementUid =
        "0x0000000000000000000000000000000000000000000000000000000000000001" as const;
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Set up TrustedOracleArbiter with no decision (returns false)
      const oracleDemand = aliceClient.arbiters.encodeTrustedOracleDemand({
        oracle: alice,
        data: "0x" as const,
      });

      // Set up SpecificAttestationArbiter with wrong UID (will fail)
      const specificDemand =
        aliceClient.arbiters.encodeSpecificAttestationDemand({
          uid: "0x0000000000000000000000000000000000000000000000000000000000000002" as const,
        });

      // Create AnyArbiter demand with both failing arbiters
      const demandData = {
        arbiters: [
          testContext.addresses.trustedOracleArbiter,
          testContext.addresses.specificAttestationArbiter,
        ],
        demands: [oracleDemand, specificDemand],
      };

      const demand = aliceClient.arbiters.encodeMultiArbiterDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should return false because all arbiters return false
      const result = await testClient.readContract({
        address: testContext.addresses.anyArbiter,
        abi: anyArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(false);
    });
  });

  describe("AllArbiter", () => {
    test("testEncodeDecodeMultiArbiterDemand", () => {
      // Same as AnyArbiter test, both use the same encoding
      const demandData = {
        arbiters: [
          testContext.addresses.trivialArbiter,
          testContext.addresses.intrinsicsArbiter2,
        ],
        demands: ["0x1234" as const, "0x5678" as const],
      };

      const encodedDemand =
        aliceClient.arbiters.encodeMultiArbiterDemand(demandData);
      const decodedDemand =
        aliceClient.arbiters.decodeMultiArbiterDemand(encodedDemand);

      expect(decodedDemand.arbiters.map(($) => $.toLowerCase())).toEqual(
        demandData.arbiters.map(($) => $.toLowerCase()),
      );

      expect(decodedDemand.demands).toEqual(demandData.demands);
    });

    test("testCheckStatementWithAllTrueArbiters", async () => {
      // Create attestation
      const uid =
        "0x0000000000000000000000000000000000000000000000000000000000000001" as const;
      const attestation = {
        uid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand with TrivialArbiter and SpecificAttestationArbiter that both return true
      const specificDemand =
        aliceClient.arbiters.encodeSpecificAttestationDemand({
          uid,
        });

      const demandData = {
        arbiters: [
          testContext.addresses.trivialArbiter,
          testContext.addresses.specificAttestationArbiter,
        ],
        demands: [
          "0x" as const, // Empty demand for TrivialArbiter (always true)
          specificDemand, // Matching UID for SpecificAttestationArbiter (true)
        ],
      };

      const demand = aliceClient.arbiters.encodeMultiArbiterDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should return true because all arbiters return true
      const result = await testClient.readContract({
        address: testContext.addresses.allArbiter,
        abi: allArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckStatementWithOneFalseArbiter", async () => {
      // Create attestation
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000001" as const,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Set up specific attestation demand with wrong UID (will fail)
      const specificDemand =
        aliceClient.arbiters.encodeSpecificAttestationDemand({
          uid: "0x0000000000000000000000000000000000000000000000000000000000000002" as const,
        });

      // Create AllArbiter demand with one true and one false arbiter
      const demandData = {
        arbiters: [
          testContext.addresses.trivialArbiter, // Always returns true
          testContext.addresses.specificAttestationArbiter, // Will return false with wrong UID
        ],
        demands: ["0x" as const, specificDemand],
      };

      const demand = aliceClient.arbiters.encodeMultiArbiterDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should revert when any arbiter returns false
      try {
        await testClient.readContract({
          address: testContext.addresses.allArbiter,
          abi: allArbiterAbi.abi,
          functionName: "checkStatement",
          args: [attestation, demand, counteroffer],
        });
        expect(false).toBe(true); // Should not reach here
      } catch (error) {
        // underlying error is thrown but not decoded, since it's not on the ABI
        expect((error as any).toString()).toContain("0x1579b0f7");
      }
    });
  });
});
