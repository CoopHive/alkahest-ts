import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";
import { makeClient } from "../../src";
import { createAnvil } from "@viem/anvil";
import {
  createWalletClient,
  http,
  createTestClient,
  publicActions,
  walletActions,
  parseEther,
  nonceManager,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";
import { $ } from "bun";

// Import contract artifacts
import StringObligation from "@contracts/StringObligation.json";

// Import implementation contracts from fixtures
import EAS from "../fixtures/EAS.json";
import SchemaRegistry from "../fixtures/SchemaRegistry.json";
import { getAttestedEventFromTxHash } from "../../src/utils";
import { z } from "zod";
import { type, Type } from "arktype";

describe("StringObligation Tests", () => {
  // Anvil instance
  const anvil = createAnvil();
  let anvilInitState: `0x${string}`;

  const chain = foundry;
  const transport = http("http://127.0.0.1:8545", { timeout: 60_000 });

  // Client instances
  let aliceClient: ReturnType<typeof makeClient>;
  let bobClient: ReturnType<typeof makeClient>;
  const testClient = createTestClient({
    mode: "anvil",
    account: privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    }),
    chain,
    transport,
  })
    .extend(walletActions)
    .extend(publicActions);

  // Addresses
  let alice: `0x${string}`;
  let bob: `0x${string}`;

  // Contract addresses - will be populated when contracts are deployed
  const localAddresses = {
    eas: "" as `0x${string}`,
    easSchemaRegistry: "" as `0x${string}`,
    stringObligation: "" as `0x${string}`,
  };

  beforeAll(async () => {
    console.debug("Starting Anvil instance...");
    // Start anvil
    await anvil.start();
    console.debug("Anvil instance started");

    // Setup accounts like in Solidity tests
    console.debug("Setting up test accounts...");
    const aliceAccount = privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    });
    const bobAccount = privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    });

    alice = aliceAccount.address;
    bob = bobAccount.address;
    console.debug(`Accounts created - Alice: ${alice}, Bob: ${bob}`);

    // Create wallet clients for Alice and Bob
    console.debug("Creating wallet clients...");
    const aliceWalletClient = createWalletClient({
      account: aliceAccount,
      chain,
      transport,
    }).extend(publicActions);

    const bobWalletClient = createWalletClient({
      account: bobAccount,
      chain,
      transport,
    }).extend(publicActions);
    console.debug("Wallet clients created");

    // Fund accounts with ETH
    await testClient.setBalance({
      address: testClient.account.address,
      value: parseEther("10"),
    });
    await testClient.setBalance({
      address: alice,
      value: parseEther("10"),
    });
    await testClient.setBalance({
      address: bob,
      value: parseEther("10"),
    });

    // Deploy EAS contracts first
    console.debug("Deploying SchemaRegistry...");
    const schemaRegistryHash = await testClient.deployContract({
      abi: SchemaRegistry.abi,
      bytecode: SchemaRegistry.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`SchemaRegistry deployed, tx hash: ${schemaRegistryHash}`);

    const schemaRegistryReceipt = await testClient.waitForTransactionReceipt({
      hash: schemaRegistryHash,
    });

    localAddresses.easSchemaRegistry =
      schemaRegistryReceipt.contractAddress as `0x${string}`;
    console.debug(
      `SchemaRegistry deployed at: ${localAddresses.easSchemaRegistry}`,
    );

    console.debug("Deploying EAS...");
    const easHash = await testClient.deployContract({
      abi: EAS.abi,
      bytecode: EAS.bytecode.object as `0x${string}`,
      args: [localAddresses.easSchemaRegistry],
    });
    console.debug(`EAS deployed, tx hash: ${easHash}`);

    const easReceipt = await testClient.waitForTransactionReceipt({
      hash: easHash,
    });

    localAddresses.eas = easReceipt.contractAddress as `0x${string}`;
    console.debug(`EAS deployed at: ${localAddresses.eas}`);

    // Deploy StringObligation
    console.debug("Deploying StringObligation...");
    const stringObligationHash = await testClient.deployContract({
      abi: StringObligation.abi,
      bytecode: StringObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `StringObligation deployed, tx hash: ${stringObligationHash}`,
    );

    const stringObligationReceipt = await testClient.waitForTransactionReceipt({
      hash: stringObligationHash,
    });

    localAddresses.stringObligation =
      stringObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `StringObligation deployed at: ${localAddresses.stringObligation}`,
    );

    // Create clients with local contract addresses
    aliceClient = makeClient(aliceWalletClient, localAddresses);
    bobClient = makeClient(bobWalletClient, localAddresses);
    anvilInitState = await testClient.dumpState();
    console.debug("Setup complete");
  });

  beforeEach(async () => {
    await testClient.loadState({ state: anvilInitState });
  });

  afterAll(async () => {
    await $`pkill anvil`;
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

    test("testMakeStatement", async () => {
      // Setup test data
      const testString = "Test String Data";

      // Make a statement using alice's client - returns transaction hash
      const hash = await aliceClient.stringObligation.makeStatement(testString);

      // Wait for the transaction to be mined
      const receipt = await aliceClient.viemClient.waitForTransactionReceipt({
        hash,
      });

      // Check transaction was successful
      expect(receipt.status).toBe("success");

      // Extract the attestation UID from transaction logs
      const attestedEvent = await getAttestedEventFromTxHash(
        aliceClient.viemClient,
        hash,
      );

      // Verify attestation UID exists
      expect(attestedEvent.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testMakeAndGetStatement", async () => {
      // Setup test data
      const testString = "Test String Data";

      // Make a statement using alice's client - returns transaction hash
      const hash = await aliceClient.stringObligation.makeStatement(testString);

      // Get the attested event from the transaction hash
      const attestedEvent = await getAttestedEventFromTxHash(
        aliceClient.viemClient,
        hash,
      );

      // Verify attestation UID exists
      expect(attestedEvent.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Get the complete obligation/statement
      const obligation = await aliceClient.stringObligation.getObligation(
        attestedEvent.uid,
      );

      // Verify attestation details
      expect(obligation.recipient).toBe(alice);

      // Verify decoded data
      expect(obligation.data.item).toBe(testString);
    });

    test("testMakeJsonStatement", async () => {
      // Setup test JSON data
      const testJsonData = {
        name: "Test Object",
        value: 123,
        properties: {
          isTest: true,
          tags: ["test", "json", "data"],
        },
      };

      // Make a JSON statement
      const hash =
        await aliceClient.stringObligation.makeStatementJson(testJsonData);

      // Get the attested event from the transaction hash
      const attestedEvent = await getAttestedEventFromTxHash(
        aliceClient.viemClient,
        hash,
      );

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

    test("testGetInvalidStatement", async () => {
      // Try to get a non-existent statement/obligation
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
        [{ item: testString }]
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
          list: [1, 2, 3]
        }
      };

      // Create encoded data for testing
      const encodedData = encodeAbiParameters(
        parseAbiParameters("(string item)"),
        [{ item: JSON.stringify(testJsonData) }]
      );

      // Use the decodeJson function
      const decoded = aliceClient.stringObligation.decodeJson<typeof testJsonData>(encodedData);

      // Verify decoded JSON data
      expect(decoded).toEqual(testJsonData);
    });

    test("testDecodeZod", async () => {
      // Create a Zod schema for testing - this parses the string item directly
      const TestSchema = z.string().min(1);

      // Create encoded data for testing
      const testString = "Test String For Zod";
      const encodedData = encodeAbiParameters(
        parseAbiParameters("(string item)"),
        [{ item: testString }]
      );

      // Test with default options (sync, not safe)
      const decoded = aliceClient.stringObligation.decodeZod(
        encodedData,
        TestSchema
      );

      // Verify decoded data - should be the string value directly
      expect(decoded).toBe(testString);

      // Test with safe option - explicitly typing the result to help TypeScript
      const safeDecoded = aliceClient.stringObligation.decodeZod(
        encodedData,
        TestSchema,
        undefined,
        { async: false, safe: true }
      ) as z.SafeParseReturnType<string, string>;

      // Verify safe parsing result
      expect(safeDecoded.success).toBe(true);
      if (safeDecoded.success) {
        expect(safeDecoded.data).toBe(testString);
      }
    });

    test("testDecodeArkType", async () => {
      // Create an arktype schema for testing - validate the string directly
      // Type-cast to help TypeScript understand the schema type
      const TestType = type("string") as Type<string>;

      // Create encoded data for testing
      const testString = "Test String For ArkType";
      const encodedData = encodeAbiParameters(
        parseAbiParameters("(string item)"),
        [{ item: testString }]
      );

      // Use the decodeArkType function
      const decoded = aliceClient.stringObligation.decodeArkType(
        encodedData,
        TestType
      );

      // Verify decoded data - should be the string value directly
      expect(decoded).toBe(testString);
    });
  });
});
