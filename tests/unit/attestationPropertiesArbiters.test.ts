/**
 * Attestation Properties Arbiters Unit Tests
 *
 * This file contains tests for the arbiters client functionality, including:
 * - AttesterArbiter (Composing & NonComposing)
 * - ExpirationTimeAfterArbiter (Composing & NonComposing)
 * - RecipientArbiter (Composing & NonComposing)
 * - RefUidArbiter (Composing & NonComposing)
 * - RevocableArbiter (Composing & NonComposing)
 * - SchemaArbiter (Composing & NonComposing)
 * - TimeAfterArbiter (Composing & NonComposing)
 * - UidArbiter (Composing & NonComposing)
 */

import { afterAll, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import { setupTestEnvironment, type TestContext, teardownTestEnvironment } from "../utils/setup";

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
        const encoded = client.arbiters.encodeAttesterArbiterComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

        // Test decoding
        const decoded = client.arbiters.decodeAttesterArbiterComposingDemand(encoded);
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

        const encoded = client.arbiters.encodeAttesterArbiterComposingDemand(demand);
        const decoded = client.arbiters.decodeAttesterArbiterComposingDemand(encoded);

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
        const encoded = client.arbiters.encodeAttesterArbiterNonComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

        // Test decoding
        const decoded = client.arbiters.decodeAttesterArbiterNonComposingDemand(encoded);
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

        const encoded = client.arbiters.encodeExpirationTimeAfterArbiterComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeExpirationTimeAfterArbiterComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeExpirationTimeAfterArbiterNonComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeExpirationTimeAfterArbiterNonComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeRecipientArbiterComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeRecipientArbiterComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeRecipientArbiterNonComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeRecipientArbiterNonComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeRefUidArbiterComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeRefUidArbiterComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeRefUidArbiterNonComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeRefUidArbiterNonComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeRevocableArbiterComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeRevocableArbiterComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeRevocableArbiterComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeRevocableArbiterComposingDemand(encoded);

        expect(decoded.revocable).toBe(false);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RevocableArbiterNonComposing demand data correctly", () => {
        const client = testContext.aliceClient;

        const originalDemand = {
          revocable: true,
        };

        const encoded = client.arbiters.encodeRevocableArbiterNonComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeRevocableArbiterNonComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeSchemaArbiterComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeSchemaArbiterComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeSchemaArbiterNonComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeSchemaArbiterNonComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeTimeAfterArbiterComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeTimeAfterArbiterComposingDemand(encoded);

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

        const encoded = client.arbiters.encodeTimeAfterArbiterNonComposingDemand(originalDemand);
        const decoded = client.arbiters.decodeTimeAfterArbiterNonComposingDemand(encoded);

        expect(decoded.time).toBe(originalDemand.time);
      });
    });
  });

  describe("TimeBeforeArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode TimeBeforeArbiterComposing demand data correctly", () => {
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x1234" as `0x${string}`,
          time: 1234567890n,
        };

        const client = testContext.aliceClient;
        const encoded = client.arbiters.encodeTimeBeforeArbiterComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.decodeTimeBeforeArbiterComposingDemand(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode TimeBeforeArbiterNonComposing demand data correctly", () => {
        const originalDemand = {
          time: 9876543210n,
        };

        const client = testContext.aliceClient;
        const encoded = client.arbiters.encodeTimeBeforeArbiterNonComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.decodeTimeBeforeArbiterNonComposingDemand(encoded);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });
  });

  describe("TimeEqualArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode TimeEqualArbiterComposing demand data correctly", () => {
        const originalDemand = {
          baseArbiter: bob,
          baseDemand: "0xabcd" as `0x${string}`,
          time: 5555555555n,
        };

        const client = testContext.aliceClient;
        const encoded = client.arbiters.encodeTimeEqualArbiterComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.decodeTimeEqualArbiterComposingDemand(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode TimeEqualArbiterNonComposing demand data correctly", () => {
        const originalDemand = {
          time: 7777777777n,
        };

        const client = testContext.aliceClient;
        const encoded = client.arbiters.encodeTimeEqualArbiterNonComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.decodeTimeEqualArbiterNonComposingDemand(encoded);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });
  });

  describe("ExpirationTimeBeforeArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode ExpirationTimeBeforeArbiterComposing demand data correctly", () => {
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0xdeadbeef" as `0x${string}`,
          expirationTime: 2000000000n,
        };

        const client = testContext.aliceClient;
        const encoded = client.arbiters.encodeExpirationTimeBeforeArbiterComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.decodeExpirationTimeBeforeArbiterComposingDemand(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode ExpirationTimeBeforeArbiterNonComposing demand data correctly", () => {
        const originalDemand = {
          expirationTime: 3000000000n,
        };

        const client = testContext.aliceClient;
        const encoded = client.arbiters.encodeExpirationTimeBeforeArbiterNonComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.decodeExpirationTimeBeforeArbiterNonComposingDemand(encoded);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });
  });

  describe("ExpirationTimeEqualArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode ExpirationTimeEqualArbiterComposing demand data correctly", () => {
        const originalDemand = {
          baseArbiter: bob,
          baseDemand: "0xcafebabe" as `0x${string}`,
          expirationTime: 4000000000n,
        };

        const client = testContext.aliceClient;
        const encoded = client.arbiters.encodeExpirationTimeEqualArbiterComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.decodeExpirationTimeEqualArbiterComposingDemand(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode ExpirationTimeEqualArbiterNonComposing demand data correctly", () => {
        const originalDemand = {
          expirationTime: 6000000000n,
        };

        const client = testContext.aliceClient;
        const encoded = client.arbiters.encodeExpirationTimeEqualArbiterNonComposingDemand(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.decodeExpirationTimeEqualArbiterNonComposingDemand(encoded);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });
  });

  describe("Error handling", () => {
    test("should throw error for invalid hex data", () => {
      const client = testContext.aliceClient;

      expect(() => {
        client.arbiters.decodeAttesterArbiterComposingDemand("invalid-hex" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for insufficient data", () => {
      const client = testContext.aliceClient;

      expect(() => {
        client.arbiters.decodeAttesterArbiterComposingDemand("0x123" as `0x${string}`);
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
      const manualEncoded = encodeAbiParameters(parseAbiParameters("(address attester)"), [demand]);

      // SDK encoding
      const sdkEncoded = client.arbiters.encodeAttesterArbiterNonComposingDemand(demand);

      expect(sdkEncoded).toBe(manualEncoded);
    });
  });
});
