/**
 * Logical Arbiters Unit Tests
 *
 * This file contains tests for the logical arbiters client functionality, including:
 * - AnyArbiter - validates if any of the provided arbiters pass
 * - AllArbiter - validates if all of the provided arbiters pass
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
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";

describe("Logical Arbiters Tests", () => {
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let charlie: `0x${string}`;
  let testClient: TestContext["testClient"];

  // Helper function to compare addresses case-insensitively
  const expectAddressesEqual = (actual: readonly `0x${string}`[], expected: `0x${string}`[]) => {
    expect(actual.map(addr => addr.toLowerCase())).toEqual(expected.map(addr => addr.toLowerCase()));
  };

  // Helper function to compare hex strings case-insensitively
  const expectHexEqual = (actual: readonly `0x${string}`[], expected: `0x${string}`[]) => {
    expect(actual.map(hex => hex.toLowerCase())).toEqual(expected.map(hex => hex.toLowerCase()));
  };

  beforeAll(async () => {
    testContext = await setupTestEnvironment();
    
    // Generate test accounts
    const alicePrivateKey = generatePrivateKey();
    const bobPrivateKey = generatePrivateKey();
    const charliePrivateKey = generatePrivateKey();
    alice = privateKeyToAddress(alicePrivateKey);
    bob = privateKeyToAddress(bobPrivateKey);
    charlie = privateKeyToAddress(charliePrivateKey);
    
    testClient = testContext.testClient;
  });

  afterAll(async () => {
    await teardownTestEnvironment(testContext);
  });

  describe("AnyArbiter", () => {
    test("should encode and decode AnyArbiter demand data correctly", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [alice, bob, charlie],
        demands: [
          "0x1234" as `0x${string}`,
          "0x5678" as `0x${string}`,
          "0xabcd" as `0x${string}`,
        ],
      };

      // Test encoding
      const encoded = client.logicalArbiters.encodeAnyArbiterDemand(originalDemand);
      expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

      // Test decoding
      const decoded = client.logicalArbiters.decodeAnyArbiterDemand(encoded);
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle single arbiter", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [alice],
        demands: ["0x1234567890abcdef" as `0x${string}`],
      };

      const encoded = client.logicalArbiters.encodeAnyArbiterDemand(originalDemand);
      const decoded = client.logicalArbiters.decodeAnyArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle empty demands", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [alice, bob],
        demands: ["0x" as `0x${string}`, "0x" as `0x${string}`],
      };

      const encoded = client.logicalArbiters.encodeAnyArbiterDemand(originalDemand);
      const decoded = client.logicalArbiters.decodeAnyArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle many arbiters", () => {
      const client = testContext.aliceClient;
      
      // Generate 10 test addresses
      const arbiters = Array.from({ length: 10 }, () => 
        privateKeyToAddress(generatePrivateKey())
      );
      const demands = Array.from({ length: 10 }, (_, i) => 
        `0x${i.toString(16).padStart(4, "0")}` as `0x${string}`
      );
      
      const originalDemand = { arbiters, demands };

      const encoded = client.logicalArbiters.encodeAnyArbiterDemand(originalDemand);
      const decoded = client.logicalArbiters.decodeAnyArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle complex demand data", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [alice, bob],
        demands: [
          // Complex encoded data (e.g., from another arbiter)
          "0x000000000000000000000000" + alice.slice(2) + "0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000" + bob.slice(2) + "0000000000000000000000000000000000000000000000000000000000000004deadbeef00000000000000000000000000000000000000000000000000000000" as `0x${string}`,
          "0x" as `0x${string}`,
        ],
      };

      const encoded = client.logicalArbiters.encodeAnyArbiterDemand(originalDemand);
      const decoded = client.logicalArbiters.decodeAnyArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expectHexEqual(decoded.demands, originalDemand.demands);
    });

    test("should handle mismatched array lengths", () => {
      const client = testContext.aliceClient;
      
      // The implementation doesn't validate array lengths, so this should encode successfully
      // but may not be meaningful for actual contract usage
      const demand = {
        arbiters: [alice, bob],
        demands: ["0x1234" as `0x${string}`], // Length mismatch
      };
      
      const encoded = client.logicalArbiters.encodeAnyArbiterDemand(demand);
      expect(encoded).toMatch(/^0x[0-9a-f]+$/i);
      
      const decoded = client.logicalArbiters.decodeAnyArbiterDemand(encoded);
      expectAddressesEqual(decoded.arbiters, demand.arbiters);
      expect(decoded.demands).toEqual(demand.demands);
    });
  });

  describe("AllArbiter", () => {
    test("should encode and decode AllArbiter demand data correctly", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [alice, bob, charlie],
        demands: [
          "0x1111" as `0x${string}`,
          "0x2222" as `0x${string}`,
          "0x3333" as `0x${string}`,
        ],
      };

      // Test encoding
      const encoded = client.logicalArbiters.encodeAllArbiterDemand(originalDemand);
      expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

      // Test decoding
      const decoded = client.logicalArbiters.decodeAllArbiterDemand(encoded);
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle single arbiter", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [bob],
        demands: ["0xfedcba9876543210" as `0x${string}`],
      };

      const encoded = client.logicalArbiters.encodeAllArbiterDemand(originalDemand);
      const decoded = client.logicalArbiters.decodeAllArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle empty arrays", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [] as `0x${string}`[],
        demands: [] as `0x${string}`[],
      };

      const encoded = client.logicalArbiters.encodeAllArbiterDemand(originalDemand);
      const decoded = client.logicalArbiters.decodeAllArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle large datasets", () => {
      const client = testContext.aliceClient;
      
      // Generate 50 test addresses and demands
      const arbiters = Array.from({ length: 50 }, () => 
        privateKeyToAddress(generatePrivateKey())
      );
      const demands = Array.from({ length: 50 }, (_, i) => 
        `0x${i.toString(16).padStart(8, "0")}` as `0x${string}`
      );
      
      const originalDemand = { arbiters, demands };

      const encoded = client.logicalArbiters.encodeAllArbiterDemand(originalDemand);
      const decoded = client.logicalArbiters.decodeAllArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle varied demand lengths", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [alice, bob, charlie],
        demands: [
          "0x" as `0x${string}`, // Empty
          "0x1234" as `0x${string}`, // Short
          "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef12" as `0x${string}`, // Long
        ],
      };

      const encoded = client.logicalArbiters.encodeAllArbiterDemand(originalDemand);
      const decoded = client.logicalArbiters.decodeAllArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });
  });

  describe("Cross-compatibility", () => {
    test("AnyArbiter and AllArbiter should use the same encoding format", () => {
      const client = testContext.aliceClient;
      
      const demand = {
        arbiters: [alice, bob],
        demands: ["0x1111" as `0x${string}`, "0x2222" as `0x${string}`],
      };

      const anyEncoded = client.logicalArbiters.encodeAnyArbiterDemand(demand);
      const allEncoded = client.logicalArbiters.encodeAllArbiterDemand(demand);
      
      // The encoding should be identical since they use the same struct
      expect(anyEncoded).toBe(allEncoded);
      
      // Both should decode correctly with either decoder
      const anyDecoded = client.logicalArbiters.decodeAnyArbiterDemand(anyEncoded);
      const allDecoded = client.logicalArbiters.decodeAllArbiterDemand(allEncoded);
      
      expect(anyDecoded).toEqual(allDecoded);
      expect(anyDecoded.arbiters).toEqual(demand.arbiters);
      expect(anyDecoded.demands).toEqual(demand.demands);
    });
  });

  describe("Error handling", () => {
    test("should throw error for invalid hex data in AnyArbiter", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.logicalArbiters.decodeAnyArbiterDemand("invalid-hex" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for invalid hex data in AllArbiter", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.logicalArbiters.decodeAllArbiterDemand("not-hex" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for insufficient data", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.logicalArbiters.decodeAnyArbiterDemand("0x123" as `0x${string}`);
      }).toThrow();
      
      expect(() => {
        client.logicalArbiters.decodeAllArbiterDemand("0x456" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for malformed addresses", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.logicalArbiters.encodeAnyArbiterDemand({
          arbiters: ["invalid-address" as `0x${string}`],
          demands: ["0x1234" as `0x${string}`],
        });
      }).toThrow();
    });
  });

  describe("Integration with manual encoding", () => {
    test("should produce same result as manual ABI encoding for AnyArbiter", () => {
      const client = testContext.aliceClient;
      
      const demand = {
        arbiters: [alice, bob],
        demands: ["0x1234" as `0x${string}`, "0x5678" as `0x${string}`],
      };
      
      // Manual encoding using viem directly
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(address[] arbiters, bytes[] demands)"),
        [demand]
      );
      
      // SDK encoding
      const sdkEncoded = client.logicalArbiters.encodeAnyArbiterDemand(demand);
      
      expect(sdkEncoded).toBe(manualEncoded);
    });

    test("should produce same result as manual ABI encoding for AllArbiter", () => {
      const client = testContext.aliceClient;
      
      const demand = {
        arbiters: [charlie],
        demands: ["0xabcd" as `0x${string}`],
      };
      
      // Manual encoding using viem directly
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(address[] arbiters, bytes[] demands)"),
        [demand]
      );
      
      // SDK encoding
      const sdkEncoded = client.logicalArbiters.encodeAllArbiterDemand(demand);
      
      expect(sdkEncoded).toBe(manualEncoded);
    });
  });

  describe("Nested arbiters scenario", () => {
    test("should handle nested AnyArbiter inside AllArbiter", () => {
      const client = testContext.aliceClient;
      
      // First, create a demand for a nested AnyArbiter
      const nestedAnyDemand = client.logicalArbiters.encodeAnyArbiterDemand({
        arbiters: [alice, bob],
        demands: ["0x1111" as `0x${string}`, "0x2222" as `0x${string}`],
      });
      
      // Then use that as a demand in an AllArbiter
      const allDemand = {
        arbiters: [charlie, testContext.addresses.anyArbiter || charlie], // Use anyArbiter address if available
        demands: ["0x3333" as `0x${string}`, nestedAnyDemand],
      };
      
      const encoded = client.logicalArbiters.encodeAllArbiterDemand(allDemand);
      const decoded = client.logicalArbiters.decodeAllArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, allDemand.arbiters);
      expect(decoded.demands).toEqual(allDemand.demands);
      
      // Verify we can decode the nested demand
      const nestedDecoded = client.logicalArbiters.decodeAnyArbiterDemand(decoded.demands[1]);
      expectAddressesEqual(nestedDecoded.arbiters, [alice, bob]);
      expect(nestedDecoded.demands).toEqual(["0x1111", "0x2222"]);
    });

    test("should handle nested AllArbiter inside AnyArbiter", () => {
      const client = testContext.aliceClient;
      
      // First, create a demand for a nested AllArbiter
      const nestedAllDemand = client.logicalArbiters.encodeAllArbiterDemand({
        arbiters: [alice, bob, charlie],
        demands: [
          "0xaaaa" as `0x${string}`,
          "0xbbbb" as `0x${string}`,
          "0xcccc" as `0x${string}`,
        ],
      });
      
      // Then use that as a demand in an AnyArbiter
      const anyDemand = {
        arbiters: [alice, testContext.addresses.allArbiter || bob], // Use allArbiter address if available
        demands: ["0x1234" as `0x${string}`, nestedAllDemand],
      };
      
      const encoded = client.logicalArbiters.encodeAnyArbiterDemand(anyDemand);
      const decoded = client.logicalArbiters.decodeAnyArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, anyDemand.arbiters);
      expect(decoded.demands).toEqual(anyDemand.demands);
      
      // Verify we can decode the nested demand
      const nestedDecoded = client.logicalArbiters.decodeAllArbiterDemand(decoded.demands[1]);
      expectAddressesEqual(nestedDecoded.arbiters, [alice, bob, charlie]);
      expect(nestedDecoded.demands).toEqual(["0xaaaa", "0xbbbb", "0xcccc"]);
    });
  });

  describe("Real-world usage patterns", () => {
    test("should handle typical multi-signature scenario", () => {
      const client = testContext.aliceClient;
      
      // Create demands for multiple trusted party arbiters
      const trusteeAddresses = [alice, bob, charlie];
      const trusteeSignatures = [
        "0x1111111111111111111111111111111111111111111111111111111111111111" as `0x${string}`,
        "0x2222222222222222222222222222222222222222222222222222222222222222" as `0x${string}`,
        "0x3333333333333333333333333333333333333333333333333333333333333333" as `0x${string}`,
      ];
      
      // AllArbiter: Require all trustees to sign
      const multiSigDemand = {
        arbiters: trusteeAddresses,
        demands: trusteeSignatures,
      };
      
      const encoded = client.logicalArbiters.encodeAllArbiterDemand(multiSigDemand);
      const decoded = client.logicalArbiters.decodeAllArbiterDemand(encoded);
      
      expect(decoded.arbiters).toEqual(trusteeAddresses);
      expect(decoded.demands).toEqual(trusteeSignatures);
    });

    test("should handle fallback arbiter scenario", () => {
      const client = testContext.aliceClient;
      
      // AnyArbiter: Primary arbiter or fallback arbiter
      const fallbackDemand = {
        arbiters: [alice, bob], // Primary: alice, Fallback: bob
        demands: [
          "0x1234567890abcdef" as `0x${string}`, // Primary demand
          "0x" as `0x${string}`, // Fallback (empty demand)
        ],
      };
      
      const encoded = client.logicalArbiters.encodeAnyArbiterDemand(fallbackDemand);
      const decoded = client.logicalArbiters.decodeAnyArbiterDemand(encoded);
      
      expect(decoded.arbiters).toEqual(fallbackDemand.arbiters);
      expect(decoded.demands).toEqual(fallbackDemand.demands);
    });
  });
});
