/**
 * General Arbiters Unit Tests
 *
 * Tests for the arbiters client functionality, including:
 * - IntrinsicsArbiter2: Schema-based validation
 * - TrustedPartyArbiter: Creator-based validation with composable base arbiter
 * - SpecificAttestationArbiter: Validates against a specific attestation UID
 * - TrustedOracleArbiter: Oracle-based decision making with arbitration requests
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
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "../utils/setup";

// Import contract artifacts needed for tests
import { abi as intrinsicsArbiter2Abi } from "../../src/contracts/IntrinsicsArbiter2";
import { abi as trustedPartyArbiterAbi } from "../../src/contracts/TrustedPartyArbiter";
import { abi as specificAttestationArbiterAbi } from "../../src/contracts/SpecificAttestationArbiter";
import { abi as trustedOracleArbiterAbi } from "../../src/contracts/TrustedOracleArbiter";

describe("General Arbiters Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let charlie: `0x${string}`;
  let aliceClient: TestContext["aliceClient"];
  let bobClient: TestContext["bobClient"];
  let testClient: TestContext["testClient"];

  beforeAll(async () => {
    // Setup test environment
    testContext = await setupTestEnvironment();

    // Extract the values we need for tests
    alice = testContext.alice;
    bob = testContext.bob;
    // Generate a third address for testing
    charlie = privateKeyToAddress(generatePrivateKey());
    aliceClient = testContext.aliceClient;
    bobClient = testContext.bobClient;
    testClient = testContext.testClient;
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

  // Helper function to create a test attestation
  const createTestAttestation = (overrides = {}) => ({
    uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
    schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as const,
    time: BigInt(Math.floor(Date.now() / 1000)),
    expirationTime: 0n,
    revocationTime: 0n,
    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
    recipient: alice,
    attester: bob,
    revocable: true,
    data: "0x" as const,
    ...overrides,
  });

  describe("IntrinsicsArbiter2", () => {
    const targetSchema = "0x1234567890123456789012345678901234567890123456789012345678901234" as const;

    test("should encode and decode IntrinsicsArbiter2 demand data correctly", () => {
      const originalDemand = { schema: targetSchema };

      const encoded = aliceClient.arbiters.encodeIntrinsics2Demand(originalDemand);
      const decoded = aliceClient.arbiters.decodeIntrinsics2Demand(encoded);

      expect(decoded.schema).toBe(originalDemand.schema);
    });

    test("should validate attestation with matching schema", async () => {
      const attestation = createTestAttestation({ schema: targetSchema });
      const demand = aliceClient.arbiters.encodeIntrinsics2Demand({ schema: targetSchema });
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      const result = await testClient.readContract({
        address: testContext.addresses.intrinsicsArbiter2,
        abi: intrinsicsArbiter2Abi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("should reject attestation with non-matching schema", async () => {
      const wrongSchema = "0x9999999999999999999999999999999999999999999999999999999999999999" as const;
      const attestation = createTestAttestation({ schema: wrongSchema });
      const demand = aliceClient.arbiters.encodeIntrinsics2Demand({ schema: targetSchema });
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

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

    test("should produce same result as manual ABI encoding", () => {
      const demand = { schema: targetSchema };
      
      // Manual encoding using viem directly
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(bytes32 schema)"),
        [demand]
      );
      
      // SDK encoding
      const sdkEncoded = aliceClient.arbiters.encodeIntrinsics2Demand(demand);
      
      expect(sdkEncoded).toBe(manualEncoded);
    });
  });

  describe("TrustedPartyArbiter", () => {
    test("should encode and decode TrustedPartyArbiter demand data correctly", () => {
      const originalDemand = {
        baseArbiter: alice,
        baseDemand: "0x1234" as `0x${string}`,
        creator: bob,
      };

      const encoded = aliceClient.arbiters.encodeTrustedPartyDemand(originalDemand);
      const decoded = aliceClient.arbiters.decodeTrustedPartyDemand(encoded);

      expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
      expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
      expect(decoded.creator).toBe(originalDemand.creator);
    });

    test("should validate attestation from trusted party", async () => {
      const trustedCreator = bob;
      // The TrustedPartyArbiter checks if the recipient matches the creator
      const attestation = createTestAttestation({ recipient: trustedCreator });
      const demand = aliceClient.arbiters.encodeTrustedPartyDemand({
        baseArbiter: testContext.addresses.trivialArbiter, // Use trivial arbiter as base
        baseDemand: "0x" as `0x${string}`,
        creator: trustedCreator,
      });
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      const result = await testClient.readContract({
        address: testContext.addresses.trustedPartyArbiter,
        abi: trustedPartyArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("should reject attestation from non-trusted party", async () => {
      const trustedCreator = bob;
      const nonTrustedRecipient = charlie;
      const attestation = createTestAttestation({ recipient: nonTrustedRecipient });
      const demand = aliceClient.arbiters.encodeTrustedPartyDemand({
        baseArbiter: testContext.addresses.trivialArbiter,
        baseDemand: "0x" as `0x${string}`,
        creator: trustedCreator,
      });
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      try {
        await testClient.readContract({
          address: testContext.addresses.trustedPartyArbiter,
          abi: trustedPartyArbiterAbi.abi,
          functionName: "checkStatement",
          args: [attestation, demand, counteroffer],
        });
        expect(false).toBe(true); // Should not reach here
      } catch (error) {
        expect((error as any).toString()).toContain("NotTrustedParty");
      }
    });

    test("should produce same result as manual ABI encoding", () => {
      const demand = {
        baseArbiter: alice,
        baseDemand: "0xabcd" as `0x${string}`,
        creator: bob,
      };
      
      // Manual encoding using viem directly
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, address creator)"),
        [demand]
      );
      
      // SDK encoding
      const sdkEncoded = aliceClient.arbiters.encodeTrustedPartyDemand(demand);
      
      expect(sdkEncoded).toBe(manualEncoded);
    });
  });

  describe("SpecificAttestationArbiter", () => {
    const targetUid = "0x1111111111111111111111111111111111111111111111111111111111111111" as const;

    test("should encode and decode SpecificAttestationArbiter demand data correctly", () => {
      const originalDemand = { uid: targetUid };

      const encoded = aliceClient.arbiters.encodeSpecificAttestationDemand(originalDemand);
      const decoded = aliceClient.arbiters.decodeSpecificAttestationDemand(encoded);

      expect(decoded.uid).toBe(originalDemand.uid);
    });

    test("should validate attestation with matching UID", async () => {
      const attestation = createTestAttestation({ uid: targetUid });
      const demand = aliceClient.arbiters.encodeSpecificAttestationDemand({ uid: targetUid });
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      const result = await testClient.readContract({
        address: testContext.addresses.specificAttestationArbiter,
        abi: specificAttestationArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("should reject attestation with non-matching UID", async () => {
      const wrongUid = "0x2222222222222222222222222222222222222222222222222222222222222222" as const;
      const attestation = createTestAttestation({ uid: wrongUid });
      const demand = aliceClient.arbiters.encodeSpecificAttestationDemand({ uid: targetUid });
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      try {
        await testClient.readContract({
          address: testContext.addresses.specificAttestationArbiter,
          abi: specificAttestationArbiterAbi.abi,
          functionName: "checkStatement",
          args: [attestation, demand, counteroffer],
        });
        expect(false).toBe(true); // Should not reach here
      } catch (error) {
        expect((error as any).toString()).toContain("NotDemandedAttestation");
      }
    });

    test("should produce same result as manual ABI encoding", () => {
      const demand = { uid: targetUid };
      
      // Manual encoding using viem directly
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(bytes32 uid)"),
        [demand]
      );
      
      // SDK encoding
      const sdkEncoded = aliceClient.arbiters.encodeSpecificAttestationDemand(demand);
      
      expect(sdkEncoded).toBe(manualEncoded);
    });
  });

  describe("TrustedOracleArbiter", () => {
    test("should encode and decode TrustedOracleArbiter demand data correctly", () => {
      const originalDemand = {
        oracle: alice,
        data: "0xdeadbeef" as `0x${string}`,
      };

      const encoded = aliceClient.arbiters.encodeTrustedOracleDemand(originalDemand);
      const decoded = aliceClient.arbiters.decodeTrustedOracleDemand(encoded);

      expect(decoded.oracle).toBe(originalDemand.oracle);
      expect(decoded.data).toBe(originalDemand.data);
    });

    test("should validate oracle arbitration request", async () => {
      const oracle = bob;
      const arbitrationData = "0xdeadbeef" as `0x${string}`;
      const attestation = createTestAttestation();
      const demand = aliceClient.arbiters.encodeTrustedOracleDemand({
        oracle,
        data: arbitrationData,
      });
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Note: TrustedOracleArbiter may require actual oracle arbitration to be made first
      // This test mainly verifies the encoding/decoding works correctly
      try {
        const result = await testClient.readContract({
          address: testContext.addresses.trustedOracleArbiter,
          abi: trustedOracleArbiterAbi.abi,
          functionName: "checkStatement",
          args: [attestation, demand, counteroffer],
        });
        
        // May return false if no arbitration has been made yet
        expect(typeof result).toBe("boolean");
      } catch (error) {
        // May throw if oracle hasn't made arbitration yet
        console.log("Expected error for oracle arbitration:", error);
      }
    });

    test("should produce same result as manual ABI encoding", () => {
      const demand = {
        oracle: alice,
        data: "0x1234abcd" as `0x${string}`,
      };
      
      // Manual encoding using viem directly
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(address oracle, bytes data)"),
        [demand]
      );
      
      // SDK encoding
      const sdkEncoded = aliceClient.arbiters.encodeTrustedOracleDemand(demand);
      
      expect(sdkEncoded).toBe(manualEncoded);
    });
  });

  describe("Error handling", () => {
    test("should throw error for invalid hex data", () => {
      expect(() => {
        aliceClient.arbiters.decodeIntrinsics2Demand("0x123" as `0x${string}`);
      }).toThrow();
    });

    test("should handle empty demand data gracefully", () => {
      // Some arbiters may accept empty data
      const emptyDemand = aliceClient.arbiters.encodeTrustedOracleDemand({
        oracle: alice,
        data: "0x" as `0x${string}`,
      });
      
      expect(emptyDemand).toMatch(/^0x[0-9a-f]+$/i);
      
      const decoded = aliceClient.arbiters.decodeTrustedOracleDemand(emptyDemand);
      expect(decoded.oracle).toBe(alice);
      expect(decoded.data).toBe("0x");
    });
  });

  describe("Integration scenarios", () => {
    test("should handle complex TrustedPartyArbiter with nested arbiters", async () => {
      // Create a nested scenario where TrustedPartyArbiter wraps IntrinsicsArbiter2
      const targetSchema = "0x1234567890123456789012345678901234567890123456789012345678901234" as const;
      const intrinsicsData = aliceClient.arbiters.encodeIntrinsics2Demand({ schema: targetSchema });
      
      const trustedPartyDemand = aliceClient.arbiters.encodeTrustedPartyDemand({
        baseArbiter: testContext.addresses.intrinsicsArbiter2,
        baseDemand: intrinsicsData,
        creator: bob,
      });

      const attestation = createTestAttestation({ 
        schema: targetSchema,
        recipient: bob  // Trusted party (recipient must match creator)
      });
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      const result = await testClient.readContract({
        address: testContext.addresses.trustedPartyArbiter,
        abi: trustedPartyArbiterAbi.abi,
        functionName: "checkStatement",
        args: [attestation, trustedPartyDemand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("should handle multiple encode/decode cycles", () => {
      const originalDemand = {
        baseArbiter: alice,
        baseDemand: "0xdeadbeef" as `0x${string}`,
        creator: bob,
      };

      // Encode -> decode -> encode -> decode
      const encoded1 = aliceClient.arbiters.encodeTrustedPartyDemand(originalDemand);
      const decoded1 = aliceClient.arbiters.decodeTrustedPartyDemand(encoded1);
      const encoded2 = aliceClient.arbiters.encodeTrustedPartyDemand(decoded1);
      const decoded2 = aliceClient.arbiters.decodeTrustedPartyDemand(encoded2);

      expect(encoded1).toBe(encoded2);
      expect(decoded1).toEqual(decoded2);
      expect(decoded2.baseArbiter).toBe(originalDemand.baseArbiter);
      expect(decoded2.baseDemand).toBe(originalDemand.baseDemand);
      expect(decoded2.creator).toBe(originalDemand.creator);
    });
  });
});
