/**
 * Attestation Properties Arbiters Unit Tests
 *
 * This file contains tests for the attestation properties arbiters client functionality, including:
 * - AttesterArbiter (Composing & NonComposing)
 * - ExpirationTimeAfterArbiter (Composing & NonComposing)
 * - RecipientArbiter (Composing & NonComposing)
 * - RefUidArbiter (Composing & NonComposing)
 * - RevocableArbiter (Composing & NonComposing)
 * - SchemaArbiter (Composing & NonComposing)
 * - TimeAfterArbiter (Composing & NonComposing)
 * - UidArbiter (Composing & NonComposing)
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
          attester: bob,
        };

        // Test encoding
        const encoded = client.attestationPropertiesArbiters.encodeAttesterArbiterComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

        // Test decoding
        const decoded = client.attestationPropertiesArbiters.decodeAttesterArbiterComposingDemand(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.attester).toBe(originalDemand.attester);
      });

      test("should handle empty baseDemand", () => {
        const client = testContext.aliceClient;
        
        const demand = {
          baseArbiter: alice,
          baseDemand: "0x" as `0x${string}`,
          attester: bob,
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
          attester: alice,
        };

        // Test encoding
        const encoded = client.attestationPropertiesArbiters.encodeAttesterArbiterNonComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

        // Test decoding
        const decoded = client.attestationPropertiesArbiters.decodeAttesterArbiterNonComposingDemand(encoded);
        expect(decoded.attester).toBe(originalDemand.attester);
      });
    });
  });

  describe("ExpirationTimeAfterArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode ExpirationTimeAfterArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0xabcdef1234567890" as `0x${string}`,
          expirationTime: 1735689600n, // BigInt timestamp
        };

        const encoded = client.attestationPropertiesArbiters.encodeExpirationTimeAfterArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeExpirationTimeAfterArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode ExpirationTimeAfterArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          expirationTime: 1735689600n,
        };

        const encoded = client.attestationPropertiesArbiters.encodeExpirationTimeAfterArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeExpirationTimeAfterArbiterNonComposingDemand(encoded);
        
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
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
          recipient: bob,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRecipientArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRecipientArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.recipient).toBe(originalDemand.recipient);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RecipientArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          recipient: bob,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRecipientArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRecipientArbiterNonComposingDemand(encoded);
        
        expect(decoded.recipient).toBe(originalDemand.recipient);
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
          refUID: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRefUidArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRefUidArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.refUID).toBe(originalDemand.refUID);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RefUidArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          refUID: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRefUidArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRefUidArbiterNonComposingDemand(encoded);
        
        expect(decoded.refUID).toBe(originalDemand.refUID);
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
          revocable: true,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRevocableArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRevocableArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.revocable).toBe(originalDemand.revocable);
      });

      test("should handle false revocable value", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x" as `0x${string}`,
          revocable: false,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRevocableArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRevocableArbiterComposingDemand(encoded);
        
        expect(decoded.revocable).toBe(false);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RevocableArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          revocable: true,
        };

        const encoded = client.attestationPropertiesArbiters.encodeRevocableArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeRevocableArbiterNonComposingDemand(encoded);
        
        expect(decoded.revocable).toBe(originalDemand.revocable);
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
          schema: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeSchemaArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeSchemaArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.schema).toBe(originalDemand.schema);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode SchemaArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          schema: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeSchemaArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeSchemaArbiterNonComposingDemand(encoded);
        
        expect(decoded.schema).toBe(originalDemand.schema);
      });
    });
  });

  describe("TimeAfterArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode TimeAfterArbiterComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x5555" as `0x${string}`,
          time: 1735689600n,
        };

        const encoded = client.attestationPropertiesArbiters.encodeTimeAfterArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeTimeAfterArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode TimeAfterArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          time: 1735689600n,
        };

        const encoded = client.attestationPropertiesArbiters.encodeTimeAfterArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeTimeAfterArbiterNonComposingDemand(encoded);
        
        expect(decoded.time).toBe(originalDemand.time);
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
          uid: "0x1111111111111111111111111111111111111111111111111111111111111111" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeUidArbiterComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeUidArbiterComposingDemand(encoded);
        
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.uid).toBe(originalDemand.uid);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode UidArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;
        
        const originalDemand = {
          uid: "0x2222222222222222222222222222222222222222222222222222222222222222" as `0x${string}`,
        };

        const encoded = client.attestationPropertiesArbiters.encodeUidArbiterNonComposingDemand(originalDemand);
        const decoded = client.attestationPropertiesArbiters.decodeUidArbiterNonComposingDemand(encoded);
        
        expect(decoded.uid).toBe(originalDemand.uid);
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
        attester: alice,
      };
      
      // Manual encoding using viem directly
      const manualEncoded = encodeAbiParameters(
        parseAbiParameters("(address attester)"),
        [demand]
      );
      
      // SDK encoding
      const sdkEncoded = client.attestationPropertiesArbiters.encodeAttesterArbiterNonComposingDemand(demand);
      
      expect(sdkEncoded).toBe(manualEncoded);
    });
  });
});
