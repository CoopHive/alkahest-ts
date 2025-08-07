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
      const encoded = client.arbiters.encodeAnyArbiterDemand(originalDemand);
      expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

      // Test decoding
      const decoded = client.arbiters.decodeAnyArbiterDemand(encoded);
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle single arbiter", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [alice],
        demands: ["0x1234567890abcdef" as `0x${string}`],
      };

      const encoded = client.arbiters.encodeAnyArbiterDemand(originalDemand);
      const decoded = client.arbiters.decodeAnyArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle empty demands", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [alice, bob],
        demands: ["0x" as `0x${string}`, "0x" as `0x${string}`],
      };

      const encoded = client.arbiters.encodeAnyArbiterDemand(originalDemand);
      const decoded = client.arbiters.decodeAnyArbiterDemand(encoded);
      
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

      const encoded = client.arbiters.encodeAnyArbiterDemand(originalDemand);
      const decoded = client.arbiters.decodeAnyArbiterDemand(encoded);
      
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

      const encoded = client.arbiters.encodeAnyArbiterDemand(originalDemand);
      const decoded = client.arbiters.decodeAnyArbiterDemand(encoded);
      
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
      
      const encoded = client.arbiters.encodeAnyArbiterDemand(demand);
      expect(encoded).toMatch(/^0x[0-9a-f]+$/i);
      
      const decoded = client.arbiters.decodeAnyArbiterDemand(encoded);
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
      const encoded = client.arbiters.encodeAllArbiterDemand(originalDemand);
      expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

      // Test decoding
      const decoded = client.arbiters.decodeAllArbiterDemand(encoded);
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle single arbiter", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [bob],
        demands: ["0xfedcba9876543210" as `0x${string}`],
      };

      const encoded = client.arbiters.encodeAllArbiterDemand(originalDemand);
      const decoded = client.arbiters.decodeAllArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, originalDemand.arbiters);
      expect(decoded.demands).toEqual(originalDemand.demands);
    });

    test("should handle empty arrays", () => {
      const client = testContext.aliceClient;
      
      const originalDemand = {
        arbiters: [] as `0x${string}`[],
        demands: [] as `0x${string}`[],
      };

      const encoded = client.arbiters.encodeAllArbiterDemand(originalDemand);
      const decoded = client.arbiters.decodeAllArbiterDemand(encoded);
      
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

      const encoded = client.arbiters.encodeAllArbiterDemand(originalDemand);
      const decoded = client.arbiters.decodeAllArbiterDemand(encoded);
      
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

      const encoded = client.arbiters.encodeAllArbiterDemand(originalDemand);
      const decoded = client.arbiters.decodeAllArbiterDemand(encoded);
      
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

      const anyEncoded = client.arbiters.encodeAnyArbiterDemand(demand);
      const allEncoded = client.arbiters.encodeAllArbiterDemand(demand);
      
      // The encoding should be identical since they use the same struct
      expect(anyEncoded).toBe(allEncoded);
      
      // Both should decode correctly with either decoder
      const anyDecoded = client.arbiters.decodeAnyArbiterDemand(anyEncoded);
      const allDecoded = client.arbiters.decodeAllArbiterDemand(allEncoded);
      
      expect(anyDecoded).toEqual(allDecoded);
      expect(anyDecoded.arbiters).toEqual(demand.arbiters);
      expect(anyDecoded.demands).toEqual(demand.demands);
    });
  });

  describe("Error handling", () => {
    test("should throw error for invalid hex data in AnyArbiter", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.arbiters.decodeAnyArbiterDemand("invalid-hex" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for invalid hex data in AllArbiter", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.arbiters.decodeAllArbiterDemand("not-hex" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for insufficient data", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.arbiters.decodeAnyArbiterDemand("0x123" as `0x${string}`);
      }).toThrow();
      
      expect(() => {
        client.arbiters.decodeAllArbiterDemand("0x456" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for malformed addresses", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.arbiters.encodeAnyArbiterDemand({
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
      const sdkEncoded = client.arbiters.encodeAnyArbiterDemand(demand);
      
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
      const sdkEncoded = client.arbiters.encodeAllArbiterDemand(demand);
      
      expect(sdkEncoded).toBe(manualEncoded);
    });
  });

  describe("Nested arbiters scenario", () => {
    test("should handle nested AnyArbiter inside AllArbiter", () => {
      const client = testContext.aliceClient;
      
      // First, create a demand for a nested AnyArbiter
      const nestedAnyDemand = client.arbiters.encodeAnyArbiterDemand({
        arbiters: [alice, bob],
        demands: ["0x1111" as `0x${string}`, "0x2222" as `0x${string}`],
      });
      
      // Then use that as a demand in an AllArbiter
      const allDemand = {
        arbiters: [charlie, testContext.addresses.anyArbiter || charlie], // Use anyArbiter address if available
        demands: ["0x3333" as `0x${string}`, nestedAnyDemand],
      };
      
      const encoded = client.arbiters.encodeAllArbiterDemand(allDemand);
      const decoded = client.arbiters.decodeAllArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, allDemand.arbiters);
      expect(decoded.demands).toEqual(allDemand.demands);
      
      // Verify we can decode the nested demand
      const nestedDecoded = client.arbiters.decodeAnyArbiterDemand(decoded.demands[1]);
      expectAddressesEqual(nestedDecoded.arbiters, [alice, bob]);
      expect(nestedDecoded.demands).toEqual(["0x1111", "0x2222"]);
    });

    test("should handle nested AllArbiter inside AnyArbiter", () => {
      const client = testContext.aliceClient;
      
      // First, create a demand for a nested AllArbiter
      const nestedAllDemand = client.arbiters.encodeAllArbiterDemand({
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
      
      const encoded = client.arbiters.encodeAnyArbiterDemand(anyDemand);
      const decoded = client.arbiters.decodeAnyArbiterDemand(encoded);
      
      expectAddressesEqual(decoded.arbiters, anyDemand.arbiters);
      expect(decoded.demands).toEqual(anyDemand.demands);
      
      // Verify we can decode the nested demand
      const nestedDecoded = client.arbiters.decodeAllArbiterDemand(decoded.demands[1]);
      expectAddressesEqual(nestedDecoded.arbiters, [alice, bob, charlie]);
      expect(nestedDecoded.demands).toEqual(["0xaaaa", "0xbbbb", "0xcccc"]);
    });
  });

  describe("ABI-driven encoding validation", () => {
    test("should use contract ABI when available for AnyArbiter", () => {
      const client = testContext.aliceClient;
      
      const demand = {
        arbiters: [alice, bob],
        demands: ["0x1234" as `0x${string}`, "0x5678" as `0x${string}`],
      };
      
      // Get the SDK encoding (should use contract ABI)
      const sdkEncoded = client.arbiters.encodeAnyArbiterDemand(demand);
      
      // Verify it's valid hex
      expect(sdkEncoded).toMatch(/^0x[0-9a-f]+$/i);
      
      // Verify decoding works correctly
      const decoded = client.arbiters.decodeAnyArbiterDemand(sdkEncoded);
      expectAddressesEqual(decoded.arbiters, demand.arbiters);
      expect(decoded.demands).toEqual(demand.demands);
      
      // Verify it matches manual encoding (fallback behavior)
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(address[] arbiters, bytes[] demands)"),
        [demand]
      );
      expect(sdkEncoded).toBe(manualEncoded);
    });

    test("should use contract ABI when available for AllArbiter", () => {
      const client = testContext.aliceClient;
      
      const demand = {
        arbiters: [alice, bob, charlie],
        demands: ["0xaaaa" as `0x${string}`, "0xbbbb" as `0x${string}`, "0xcccc" as `0x${string}`],
      };
      
      // Get the SDK encoding (should use contract ABI)
      const sdkEncoded = client.arbiters.encodeAllArbiterDemand(demand);
      
      // Verify it's valid hex
      expect(sdkEncoded).toMatch(/^0x[0-9a-f]+$/i);
      
      // Verify decoding works correctly
      const decoded = client.arbiters.decodeAllArbiterDemand(sdkEncoded);
      expectAddressesEqual(decoded.arbiters, demand.arbiters);
      expect(decoded.demands).toEqual(demand.demands);
      
      // Verify it matches manual encoding (fallback behavior)
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(address[] arbiters, bytes[] demands)"),
        [demand]
      );
      expect(sdkEncoded).toBe(manualEncoded);
    });

    test("should handle ABI extraction correctly", () => {
      const client = testContext.aliceClient;
      
      // Test both arbiters with the same demand structure
      const demand = {
        arbiters: [alice],
        demands: ["0x1111" as `0x${string}`],
      };

      const anyEncoded = client.arbiters.encodeAnyArbiterDemand(demand);
      const allEncoded = client.arbiters.encodeAllArbiterDemand(demand);
      
      // Since both use the same DemandData struct, they should produce identical encoding
      expect(anyEncoded).toBe(allEncoded);
      
      // Both should decode correctly with cross-decoding
      const anyDecodedByAll = client.arbiters.decodeAllArbiterDemand(anyEncoded);
      const allDecodedByAny = client.arbiters.decodeAnyArbiterDemand(allEncoded);
      
      expectAddressesEqual(anyDecodedByAll.arbiters, demand.arbiters);
      expectAddressesEqual(allDecodedByAny.arbiters, demand.arbiters);
      expect(anyDecodedByAll.demands).toEqual(demand.demands);
      expect(allDecodedByAny.demands).toEqual(demand.demands);
    });

    test("should maintain type safety with ABI-driven approach", () => {
      const client = testContext.aliceClient;
      
      const demand = {
        arbiters: [alice, bob],
        demands: ["0x1234" as `0x${string}`, "0x5678" as `0x${string}`],
      };

      // Encode using our ABI-driven method
      const encoded = client.arbiters.encodeAnyArbiterDemand(demand);
      
      // Decode using our ABI-driven method
      const decoded = client.arbiters.decodeAnyArbiterDemand(encoded);
      
      // Verify all types are preserved correctly
      expect(Array.isArray(decoded.arbiters)).toBe(true);
      expect(Array.isArray(decoded.demands)).toBe(true);
      expect(decoded.arbiters.length).toBe(demand.arbiters.length);
      expect(decoded.demands.length).toBe(demand.demands.length);
      
      // Verify address format
      decoded.arbiters.forEach(addr => {
        expect(addr).toMatch(/^0x[0-9a-fA-F]{40}$/);
      });
      
      // Verify hex string format
      decoded.demands.forEach(hex => {
        expect(hex).toMatch(/^0x[0-9a-fA-F]*$/);
      });
    });

    test("should handle edge cases with ABI-driven encoding", () => {
      const client = testContext.aliceClient;
      
      // Test empty arrays
      const emptyDemand = {
        arbiters: [] as `0x${string}`[],
        demands: [] as `0x${string}`[],
      };
      
      const emptyEncoded = client.arbiters.encodeAnyArbiterDemand(emptyDemand);
      const emptyDecoded = client.arbiters.decodeAnyArbiterDemand(emptyEncoded);
      
      expect(emptyDecoded.arbiters).toEqual(emptyDemand.arbiters);
      expect(emptyDecoded.demands).toEqual(emptyDemand.demands);
      
      // Test single item arrays
      const singleDemand = {
        arbiters: [alice],
        demands: ["0x" as `0x${string}`],
      };
      
      const singleEncoded = client.arbiters.encodeAllArbiterDemand(singleDemand);
      const singleDecoded = client.arbiters.decodeAllArbiterDemand(singleEncoded);
      
      expectAddressesEqual(singleDecoded.arbiters, singleDemand.arbiters);
      expect(singleDecoded.demands).toEqual(singleDemand.demands);
      
      // Test large arrays (stress test ABI extraction)
      const largeArbiters = Array.from({ length: 20 }, () => 
        privateKeyToAddress(generatePrivateKey())
      );
      const largeDemands = Array.from({ length: 20 }, (_, i) => 
        `0x${i.toString(16).padStart(4, "0")}` as `0x${string}`
      );
      
      const largeDemand = { arbiters: largeArbiters, demands: largeDemands };
      const largeEncoded = client.arbiters.encodeAnyArbiterDemand(largeDemand);
      const largeDecoded = client.arbiters.decodeAnyArbiterDemand(largeEncoded);
      
      expectAddressesEqual(largeDecoded.arbiters, largeDemand.arbiters);
      expect(largeDecoded.demands).toEqual(largeDemand.demands);
    });

    test("should produce consistent results across multiple calls", () => {
      const client = testContext.aliceClient;
      
      const demand = {
        arbiters: [alice, bob, charlie],
        demands: ["0x1111" as `0x${string}`, "0x2222" as `0x${string}`, "0x3333" as `0x${string}`],
      };

      // Encode the same demand multiple times
      const encoded1 = client.arbiters.encodeAnyArbiterDemand(demand);
      const encoded2 = client.arbiters.encodeAnyArbiterDemand(demand);
      const encoded3 = client.arbiters.encodeAllArbiterDemand(demand);
      
      // All should produce identical results (deterministic)
      expect(encoded1).toBe(encoded2);
      expect(encoded1).toBe(encoded3);
      
      // All should decode to the same result
      const decoded1 = client.arbiters.decodeAnyArbiterDemand(encoded1);
      const decoded2 = client.arbiters.decodeAllArbiterDemand(encoded2);
      const decoded3 = client.arbiters.decodeAnyArbiterDemand(encoded3);
      
      expect(decoded1).toEqual(decoded2);
      expect(decoded1).toEqual(decoded3);
    });

    test("should handle contract ABI vs fallback consistency", () => {
      const client = testContext.aliceClient;
      
      // Test various demand structures to ensure ABI extraction works consistently
      const testCases = [
        {
          arbiters: [alice],
          demands: ["0x1234" as `0x${string}`],
        },
        {
          arbiters: [alice, bob],
          demands: ["0x1234" as `0x${string}`, "0x5678" as `0x${string}`],
        },
        {
          arbiters: [alice, bob, charlie],
          demands: ["0x1111" as `0x${string}`, "0x2222" as `0x${string}`, "0x3333" as `0x${string}`],
        }
      ];

      testCases.forEach((demand, index) => {
        // SDK encoding (uses ABI when available, fallback otherwise)
        const sdkEncoded = client.arbiters.encodeAnyArbiterDemand(demand);
        
        // Manual encoding (always uses parseAbiParameters)
        const manualEncoded = encodeAbiParameters(
          parseAbiParameters("(address[] arbiters, bytes[] demands)"),
          [demand]
        );
        
        // Should produce identical results
        expect(sdkEncoded).toBe(manualEncoded);
        
        // Decoding should work correctly
        const decoded = client.arbiters.decodeAnyArbiterDemand(sdkEncoded);
        expectAddressesEqual(decoded.arbiters, demand.arbiters);
        expect(decoded.demands).toEqual(demand.demands);
      });
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
      
      const encoded = client.arbiters.encodeAllArbiterDemand(multiSigDemand);
      const decoded = client.arbiters.decodeAllArbiterDemand(encoded);
      
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
      
      const encoded = client.arbiters.encodeAnyArbiterDemand(fallbackDemand);
      const decoded = client.arbiters.decodeAnyArbiterDemand(encoded);
      
      expect(decoded.arbiters).toEqual(fallbackDemand.arbiters);
      expect(decoded.demands).toEqual(fallbackDemand.demands);
    });
  });
});
