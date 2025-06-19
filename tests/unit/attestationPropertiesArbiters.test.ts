/**
 * Attestation Properties Arbiters Unit Tests
 *
 * This file contains tests for the attestation properties arbiters client functionality, including:
 * - AttesterArbiter (Composing & NonComposing)
 * - ExpirationTimeArbiter (Composing & NonComposing)
 * - RecipientArbiter (Composing & NonComposing)
 * - RefUidArbiter (Composing & NonComposing)
 * - RevocableArbiter (Composing & NonComposing)
 * - RevocationTimeArbiter (Composing & NonComposing)
 * - SchemaArbiter (Composing & NonComposing)
 * - TimestampArbiter (Composing & NonComposing)
 * - UidArbiter (Composing & NonComposing)
 * - ValueArbiter (Composing & NonComposing)
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

describe("Attestation Properties Arbiters Tests", () => {
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let testClient: TestContext["testClient"];

  beforeAll(async () => {
    testContext = await setupTestEnvironment();
    
    // Generate test accounts
    const alicePrivateKey = generatePrivateKey();
    const bobPrivateKey = generatePrivateKey();
    alice = privateKeyToAddress(alicePrivateKey);
    bob = privateKeyToAddress(bobPrivateKey);
    
    testClient = testContext.testClient;
  });

  afterAll(async () => {
    await teardownTestEnvironment(testContext);
  });

  describe("AttesterArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode AttesterArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x1234567890abcdef" as `0x${string}`,
          expectedAttester: bob,
        };

        // Test encoding
        const encoded = client.attestationPropertiesArbiters.encodeAttesterArbiterComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

        // Test decoding
        const decoded = client.attestationPropertiesArbiters.decodeAttesterArbiterComposingDemand(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expectedAttester).toBe(originalDemand.expectedAttester);
      });

      test("should handle empty baseDemand", () => {
        const client = testContext.aliceClient;
        
        const demand = {
          baseArbiter: alice,
          baseDemand: "0x" as `0x${string}`,
          expectedAttester: bob,
        };

        const encoded = client.attestationPropertiesArbiters.encodeAttesterArbiterComposingDemand(demand);
        const decoded = client.attestationPropertiesArbiters.decodeAttesterArbiterComposingDemand(encoded);
        
        expect(decoded.baseDemand).toBe("0x");
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode AttesterArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          expectedAttester: alice,
        };

        // Test encoding
        const encoded = client.attestationPropertiesArbiters.encodeAttesterArbiterNonComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

        // Test decoding
        const decoded = client.attestationPropertiesArbiters.decodeAttesterArbiterNonComposingDemand(encoded);
        expect(decoded.expectedAttester).toBe(originalDemand.expectedAttester);
      });
    });
  });

  describe("ExpirationTimeArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode ExpirationTimeArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0xabcdef1234567890" as `0x${string}`,
          minExpirationTime: 1735689600n, // BigInt timestamp
          maxExpirationTime: 1735689900n, // BigInt timestamp
        };

        const encoded = client.attestationPropertiesArbiters.encodeExpirationTimeArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeExpirationTimeArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.minExpirationTime).toBe(originalDemand.minExpirationTime);
        expect(decoded.maxExpirationTime).toBe(originalDemand.maxExpirationTime);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode ExpirationTimeArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          minExpirationTime: 1735689600n,
          maxExpirationTime: 1735689900n,
        };

        const encoded = client.attestationPropertiesArbiters.encodeExpirationTimeArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeExpirationTimeArbiterNonComposingDemand(encoded);
        
        expect(decoded.minExpirationTime).toBe(originalDemand.minExpirationTime);
        expect(decoded.maxExpirationTime).toBe(originalDemand.maxExpirationTime);
      });
    });
  });

  describe("RecipientArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode RecipientArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x" as `0x${string}`,
          expectedRecipient: bob,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRecipientArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRecipientArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expectedRecipient).toBe(originalDemand.expectedRecipient);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RecipientArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          expectedRecipient: bob,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRecipientArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRecipientArbiterNonComposingDemand(encoded);
        
        expect(decoded.expectedRecipient).toBe(originalDemand.expectedRecipient);
      });
    });
  });

  describe("RefUidArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode RefUidArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x1111" as `0x${string}`,
          expectedRefUID: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRefUidArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRefUidArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expectedRefUID).toBe(originalDemand.expectedRefUID);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RefUidArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          expectedRefUID: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRefUidArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRefUidArbiterNonComposingDemand(encoded);
        
        expect(decoded.expectedRefUID).toBe(originalDemand.expectedRefUID);
      });
    });
  });

  describe("RevocableArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode RevocableArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x2222" as `0x${string}`,
          expectedRevocable: true,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRevocableArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRevocableArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expectedRevocable).toBe(originalDemand.expectedRevocable);
      });

      test("should handle false revocable value", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x" as `0x${string}`,
          expectedRevocable: false,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRevocableArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRevocableArbiterComposingDemand(encoded);
        
        expect(decoded.expectedRevocable).toBe(false);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RevocableArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          expectedRevocable: true,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRevocableArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRevocableArbiterNonComposingDemand(encoded);
        
        expect(decoded.expectedRevocable).toBe(originalDemand.expectedRevocable);
      });
    });
  });

  describe("RevocationTimeArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode RevocationTimeArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x3333" as `0x${string}`,
          minRevocationTime: 1735689600n,
          maxRevocationTime: 1735689900n,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRevocationTimeArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRevocationTimeArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.minRevocationTime).toBe(originalDemand.minRevocationTime);
        expect(decoded.maxRevocationTime).toBe(originalDemand.maxRevocationTime);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RevocationTimeArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          minRevocationTime: 0n, // 0 means not revoked
          maxRevocationTime: 1735689900n,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRevocationTimeArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRevocationTimeArbiterNonComposingDemand(encoded);
        
        expect(decoded.minRevocationTime).toBe(originalDemand.minRevocationTime);
        expect(decoded.maxRevocationTime).toBe(originalDemand.maxRevocationTime);
      });
    });
  });

  describe("SchemaArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode SchemaArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x4444" as `0x${string}`,
          expectedSchema: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeSchemaArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeSchemaArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expectedSchema).toBe(originalDemand.expectedSchema);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode SchemaArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          expectedSchema: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeSchemaArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeSchemaArbiterNonComposingDemand(encoded);
        
        expect(decoded.expectedSchema).toBe(originalDemand.expectedSchema);
      });
    });
  });

  describe("TimestampArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode TimestampArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x5555" as `0x${string}`,
          minTimestamp: 1735689600n,
          maxTimestamp: 1735689900n,
        };

        const encoded = client.attestationPropertiesArbiters.encodeTimestampArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeTimestampArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.minTimestamp).toBe(originalDemand.minTimestamp);
        expect(decoded.maxTimestamp).toBe(originalDemand.maxTimestamp);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode TimestampArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          minTimestamp: 1735689600n,
          maxTimestamp: 1735689900n,
        };

        const encoded = client.attestationPropertiesArbiters.encodeTimestampArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeTimestampArbiterNonComposingDemand(encoded);
        
        expect(decoded.minTimestamp).toBe(originalDemand.minTimestamp);
        expect(decoded.maxTimestamp).toBe(originalDemand.maxTimestamp);
      });
    });
  });

  describe("UidArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode UidArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x6666" as `0x${string}`,
          expectedUID: "0x1111111111111111111111111111111111111111111111111111111111111111" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeUidArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeUidArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expectedUID).toBe(originalDemand.expectedUID);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode UidArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          expectedUID: "0x2222222222222222222222222222222222222222222222222222222222222222" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeUidArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeUidArbiterNonComposingDemand(encoded);
        
        expect(decoded.expectedUID).toBe(originalDemand.expectedUID);
      });
    });
  });

  describe("ValueArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode ValueArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x7777" as `0x${string}`,
          minValue: 1000000000000000000n, // 1 ETH in wei
          maxValue: 2000000000000000000n, // 2 ETH in wei
        };

        const encoded = client.attestationPropertiesArbiters.encodeValueArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeValueArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.minValue).toBe(originalDemand.minValue);
        expect(decoded.maxValue).toBe(originalDemand.maxValue);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode ValueArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          minValue: 0n, // Free attestation
          maxValue: 1000000000000000000n, // Max 1 ETH
        };

        const encoded = client.attestationPropertiesArbiters.encodeValueArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeValueArbiterNonComposingDemand(encoded);
        
        expect(decoded.minValue).toBe(originalDemand.minValue);
        expect(decoded.maxValue).toBe(originalDemand.maxValue);
      });

      test("should handle large values", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          minValue: 999999999999999999999999n, // Very large value
          maxValue: 1000000000000000000000000n, // Even larger value
        };

        const encoded = client.attestationPropertiesArbiters.encodeValueArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeValueArbiterNonComposingDemand(encoded);
        
        expect(decoded.minValue).toBe(originalDemand.minValue);
        expect(decoded.maxValue).toBe(originalDemand.maxValue);
      });
    });
  });

  describe("Error handling", () => {
    test("should throw error for invalid hex data", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.attestationPropertiesArbiters.decodeAttesterArbiterComposingDemand("invalid-hex" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for insufficient data", () => {
      const client = testContext.aliceClient;
      
      expect(() => {
        client.attestationPropertiesArbiters.decodeAttesterArbiterComposingDemand("0x123" as `0x${string}`);
      }).toThrow();
    });
  });

  describe("Integration with manual encoding", () => {
    test("should produce same result as manual ABI encoding", () => {
      const client = testContext.aliceClient;
      
      const demand = {
        expectedAttester: alice,
      };
      
      // Manual encoding using viem directly
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(address expectedAttester)"),
        [demand]
      );
      
      // SDK encoding
      const sdkEncoded = client.attestationPropertiesArbiters.encodeAttesterArbiterNonComposingDemand(demand);
      
      expect(sdkEncoded).toBe(manualEncoded);
    });
  });
});
