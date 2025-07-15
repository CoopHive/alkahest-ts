import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";
import {
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "../utils/setup";
import { z } from "zod";
import { type } from "arktype";

describe("StringObligation Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let aliceClient: TestContext["aliceClient"];
  let bobClient: TestContext["bobClient"];
  let testClient: TestContext["testClient"];

  beforeAll(async () => {
    // Setup test environment
    testContext = await setupTestEnvironment();

    // Extract the values we need for tests
    alice = testContext.alice;
    bob = testContext.bob;
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

  describe("StringObligation", () => {
    test("testGetSchema", async () => {
      // Get schema from stringObligation client
      const schema = await aliceClient.stringObligation.getSchema();

      // Verify schema is not empty
      expect(schema).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testDoObligation", async () => {
      // Setup test data
      const testString = "Test String Data";

      // Make a statement using alice's client - returns transaction hash
      const { attested: attestedEvent } =
        await aliceClient.stringObligation.doObligation(testString);

      // Verify attestation UID exists
      expect(attestedEvent.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testMakeAndGetObligation", async () => {
      // Setup test data
      const testString = "Test String Data";

      // Make an obligation using alice's client - returns transaction hash
      const { attested: attestedEvent } =
        await aliceClient.stringObligation.doObligation(testString);

      // Get the complete obligation
      const obligation = await aliceClient.stringObligation.getObligation(
        attestedEvent.uid,
      );

      // Verify attestation details
      expect(obligation.recipient).toBe(alice);

      // Verify decoded data
      expect(obligation.data.item).toBe(testString);
    });

    test("testMakeJsonObligation", async () => {
      // Setup test JSON data
      const testJsonData = {
        name: "Test Object",
        value: 123,
        properties: {
          isTest: true,
          tags: ["test", "json", "data"],
        },
      };

      // Make a JSON obligation
      const { attested: attestedEvent } =
        await aliceClient.stringObligation.doObligationJson(testJsonData);

      // Verify attestation UID exists
      expect(attestedEvent.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Get the JSON obligation
      const jsonObligation =
        await aliceClient.stringObligation.getJsonObligation<
          typeof testJsonData
        >(attestedEvent.uid);

      // Verify the decoded JSON data
      expect(jsonObligation.data.item).toEqual(testJsonData);
    });

    test("testGetInvalidObligation", async () => {
      // Try to get a non-existent obligation
      const invalidUid =
        "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`;

      // Expect this to throw an error
      expect(
        aliceClient.stringObligation.getObligation(invalidUid),
      ).rejects.toThrow();
    });

    test("testDecode", async () => {
      // Create encoded data for testing
      const testString = "Test Decode Function";
      const encodedData = encodeAbiParameters(
        parseAbiParameters("(string item)"),
        [{ item: testString }],
      );

      // Use the decode function
      const decoded = aliceClient.stringObligation.decode(encodedData);

      // Verify decoded data
      expect(decoded.item).toBe(testString);
    });

    test("testDecodeJson", async () => {
      // Create test JSON data
      const testJsonData = {
        name: "JSON Test Object",
        value: 456,
        nested: {
          flag: true,
          list: [1, 2, 3],
        },
      };

      // Create encoded data for testing
      const encodedData = encodeAbiParameters(
        parseAbiParameters("(string item)"),
        [{ item: JSON.stringify(testJsonData) }],
      );

      // Use the decodeJson function
      const decoded =
        aliceClient.stringObligation.decodeJson<typeof testJsonData>(
          encodedData,
        );

      // Verify decoded JSON data
      expect(decoded).toEqual(testJsonData);
    });

    test("testDecodeZod", async () => {
      const data = {
        foo: "bar",
        baz: 123,
      };

      const encodedData = encodeAbiParameters(
        parseAbiParameters("(string item)"),
        [{ item: JSON.stringify(data) }],
      );

      const TestSchema = z.object({
        foo: z.string(),
        baz: z.number(),
      });

      // Test with default options (sync, not safe)
      const decoded = aliceClient.stringObligation.decodeZod(
        encodedData,
        TestSchema,
      );

      // Verify decoded data - should be the string value directly
      expect(decoded).toEqual(data);

      // Test with safe option
      const safeDecoded = aliceClient.stringObligation.decodeZod(
        encodedData,
        TestSchema,
        undefined,
        { async: false, safe: true },
      );

      // Verify safe parsing result
      expect(safeDecoded.success).toBe(true);
      if (safeDecoded.success) {
        expect(safeDecoded.data).toEqual(data);
      }

      // Test with async option
      const asyncDecoded = await aliceClient.stringObligation.decodeZod(
        encodedData,
        TestSchema,
        undefined,
        { async: true, safe: false },
      );

      // Verify async parsing result
      expect(asyncDecoded).toEqual(data);

      // Test with both async and safe options
      const asyncSafeDecoded = await aliceClient.stringObligation.decodeZod(
        encodedData,
        TestSchema,
        undefined,
        { async: true, safe: true },
      );

      // Verify async safe parsing result
      expect(asyncSafeDecoded.success).toBe(true);
      if (asyncSafeDecoded.success) {
        expect(asyncSafeDecoded.data).toEqual(data);
      }
    });

    test("testDecodeArkType", async () => {
      const data = {
        foo: "bar",
        baz: 123,
      };

      const encodedData = encodeAbiParameters(
        parseAbiParameters("(string item)"),
        [{ item: JSON.stringify(data) }],
      );

      const TestType = type({
        foo: "string",
        baz: "number",
      });

      // Use the decodeArkType function
      const decoded = aliceClient.stringObligation.decodeArkType(
        encodedData,
        TestType,
      );

      // Verify decoded data - should be the string value directly
      expect(decoded).toEqual(data);
    });
  });
});
