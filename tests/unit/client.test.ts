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
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";
import { $ } from "bun";
import {
  compareAddresses,
  createTokenTestExtension,
} from "../utils/tokenTestUtils";

// Import contract artifacts from src/contracts where available
import EAS from "../fixtures/EAS.json";
import AttestationBarterUtils from "@contracts/AttestationBarterUtils.json";
import AttestationEscrowObligation2 from "@contracts/AttestationEscrowObligation2.json";
import ERC20EscrowObligation from "@contracts/ERC20EscrowObligation.json";
import SchemaRegistry from "../fixtures/SchemaRegistry.json";
import TrivialArbiter from "@contracts/TrivialArbiter.json";
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import StringObligation from "@contracts/StringObligation.json";

describe("Client Tests", () => {
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
    .extend(publicActions)
    .extend(createTokenTestExtension());

  // Addresses
  let alice: `0x${string}`;
  let bob: `0x${string}`;

  // Contract addresses - will be populated when contracts are deployed
  const localAddresses = {
    eas: "" as `0x${string}`,
    easSchemaRegistry: "" as `0x${string}`,
    stringObligation: "" as `0x${string}`,
    trivialArbiter: "" as `0x${string}`,
    erc20EscrowObligation: "" as `0x${string}`,
    attestationEscrowObligation2: "" as `0x${string}`,
    attestationBarterUtils: "" as `0x${string}`,
  };

  // Test token
  let erc20Token: `0x${string}`;

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

    console.debug("Waiting for SchemaRegistry transaction receipt...");
    const schemaRegistryReceipt = await testClient.waitForTransactionReceipt({
      hash: schemaRegistryHash,
    });
    console.debug("SchemaRegistry receipt received");

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

    console.debug("Waiting for EAS transaction receipt...");
    const easReceipt = await testClient.waitForTransactionReceipt({
      hash: easHash,
    });
    console.debug("EAS receipt received");

    localAddresses.eas = easReceipt.contractAddress as `0x${string}`;
    console.debug(`EAS deployed at: ${localAddresses.eas}`);

    // Deploy StringObligation contract
    console.debug("Deploying StringObligation...");
    const stringObligationHash = await testClient.deployContract({
      abi: StringObligation.abi,
      bytecode: StringObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `StringObligation deployed, tx hash: ${stringObligationHash}`,
    );

    console.debug("Waiting for StringObligation transaction receipt...");
    const stringObligationReceipt = await testClient.waitForTransactionReceipt({
      hash: stringObligationHash,
    });
    console.debug("StringObligation receipt received");

    localAddresses.stringObligation =
      stringObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `StringObligation deployed at: ${localAddresses.stringObligation}`,
    );

    console.debug("Deploying ERC20EscrowObligation...");
    const erc20EscrowObligationHash = await testClient.deployContract({
      abi: ERC20EscrowObligation.abi,
      bytecode: ERC20EscrowObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `ERC20EscrowObligation deployed, tx hash: ${erc20EscrowObligationHash}`,
    );

    console.debug("Waiting for ERC20EscrowObligation transaction receipt...");
    const erc20EscrowObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc20EscrowObligationHash,
      });
    console.debug("ERC20EscrowObligation receipt received");

    localAddresses.erc20EscrowObligation =
      erc20EscrowObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `ERC20EscrowObligation deployed at: ${localAddresses.erc20EscrowObligation}`,
    );

    // Deploy TrivialArbiter
    console.debug("Deploying TrivialArbiter...");
    const trivialArbiterHash = await testClient.deployContract({
      abi: TrivialArbiter.abi,
      bytecode: TrivialArbiter.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`TrivialArbiter deployed, tx hash: ${trivialArbiterHash}`);

    console.debug("Waiting for TrivialArbiter transaction receipt...");
    const trivialArbiterReceipt = await testClient.waitForTransactionReceipt({
      hash: trivialArbiterHash,
    });
    console.debug("TrivialArbiter receipt received");

    localAddresses.trivialArbiter =
      trivialArbiterReceipt.contractAddress as `0x${string}`;
    console.debug(
      `TrivialArbiter deployed at: ${localAddresses.trivialArbiter}`,
    );

    // Deploy AttestationEscrowObligation
    console.debug("Deploying AttestationEscrowObligation...");
    const attestationEscrowObligation2Hash = await testClient.deployContract({
      abi: AttestationEscrowObligation2.abi,
      bytecode: AttestationEscrowObligation2.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `AttestationEscrowObligation2 deployed, tx hash: ${attestationEscrowObligation2Hash}`,
    );

    console.debug(
      "Waiting for AttestationEscrowObligation transaction receipt...",
    );
    const attestationEscrowObligation2Receipt =
      await testClient.waitForTransactionReceipt({
        hash: attestationEscrowObligation2Hash,
      });
    console.debug("AttestationEscrowObligation receipt received");

    localAddresses.attestationEscrowObligation2 =
      attestationEscrowObligation2Receipt.contractAddress as `0x${string}`;
    console.debug(
      `AttestationEscrowObligation deployed at: ${localAddresses.attestationEscrowObligation2}`,
    );

    // Deploy ERC20 token for testing
    console.debug("Deploying ERC20 Token...");
    const erc20TokenHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Test Token", "TEST"],
    });
    console.debug(`ERC20 Token deployed, tx hash: ${erc20TokenHash}`);

    console.debug("Waiting for ERC20 Token transaction receipt...");
    const erc20TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenHash,
    });
    console.debug("ERC20 Token receipt received");

    erc20Token = erc20TokenReceipt.contractAddress as `0x${string}`;
    console.debug(`ERC20 Token deployed at: ${erc20Token}`);

    // Deploy AttestationBarterUtils
    console.debug("Deploying AttestationBarterUtils...");
    const attestationBarterUtilsHash = await testClient.deployContract({
      abi: AttestationBarterUtils.abi,
      bytecode: AttestationBarterUtils.bytecode.object as `0x${string}`,
      args: [
        localAddresses.eas,
        localAddresses.easSchemaRegistry,
        localAddresses.attestationEscrowObligation2,
      ],
    });
    console.debug(
      `AttestationBarterUtils deployed, tx hash: ${attestationBarterUtilsHash}`,
    );

    console.debug("Waiting for AttestationBarterUtils transaction receipt...");
    const attestationBarterUtilsReceipt =
      await testClient.waitForTransactionReceipt({
        hash: attestationBarterUtilsHash,
      });
    console.debug("AttestationBarterUtils receipt received");

    localAddresses.attestationBarterUtils =
      attestationBarterUtilsReceipt.contractAddress as `0x${string}`;
    console.debug(
      `AttestationBarterUtils deployed at: ${localAddresses.attestationBarterUtils}`,
    );

    // Create clients with local contract addresses
    console.debug("Creating Alice and Bob clients...");
    aliceClient = makeClient(aliceWalletClient, localAddresses);
    bobClient = makeClient(bobWalletClient, localAddresses);

    console.debug("Transferring ERC20 Token A to Alice...");
    await testClient.writeContract({
      address: erc20Token,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [alice, parseEther("1000")],
    });
    console.debug("ERC20 Token transferred to Alice");

    anvilInitState = await testClient.dumpState();
    console.debug("Setup complete");
  });

  beforeEach(async () => {
    await testClient.loadState({ state: anvilInitState });
  });

  afterAll(async () => {
    await $`pkill anvil`;
  });

  // Register a test schema for testing creating attestations
  async function registerTestSchema() {
    // Generate a unique schema name to avoid AlreadyExists errors
    const uniqueSchemaName = `string testData${Date.now()}`;

    // Register schema using the SDK function
    const hash = await aliceClient.attestation.registerSchema(
      uniqueSchemaName,
      localAddresses.attestationBarterUtils,
      true,
    );

    const receipt = await testClient.waitForTransactionReceipt({ hash });

    // Get the schema ID from the event
    const log = receipt.logs[0];
    return log.topics[1] as `0x${string}`; // Force type to be 0x-prefixed string
  }

  describe("Client Initialization", () => {
    test("should properly initialize client with required addresses", () => {
      // Check that client was created with the correct addresses
      expect(aliceClient).toBeDefined();
      expect(aliceClient.address).toBe(alice);
      expect(aliceClient.contractAddresses.eas).toBe(localAddresses.eas);
      expect(aliceClient.contractAddresses.easSchemaRegistry).toBe(
        localAddresses.easSchemaRegistry,
      );

      // Verify client has all expected components
      expect(aliceClient.arbiters).toBeDefined();
      expect(aliceClient.erc20).toBeDefined();
      expect(aliceClient.erc721).toBeDefined();
      expect(aliceClient.erc1155).toBeDefined();
      expect(aliceClient.bundle).toBeDefined();
      expect(aliceClient.attestation).toBeDefined();
      expect(aliceClient.stringObligation).toBeDefined();
      expect(aliceClient.viemClient).toBeDefined();
      expect(aliceClient.getAttestation).toBeDefined();
      expect(aliceClient.getAttestedEventFromTxHash).toBeDefined();
      expect(aliceClient.waitForFulfillment).toBeDefined();
    });
  });

  describe("getAttestation", () => {
    test("should retrieve an attestation by UID", async () => {
      const testSchemaId = await registerTestSchema();

      // Create a test attestation to retrieve
      const { attested: attestationData } =
        await aliceClient.attestation.createAttestation(
          testSchemaId,
          bob,
          BigInt(Math.floor(Date.now() / 1000) + 86400), // 1 day expiration
          true, // revocable
          "0x0000000000000000000000000000000000000000000000000000000000000000", // no ref
          ("0x" + Buffer.from("test data").toString("hex")) as `0x${string}`, // data
        );

      // Use the getAttestation function to retrieve it
      const attestation = await aliceClient.getAttestation(attestationData.uid);

      // Verify retrieved data is correct
      expect(attestation.uid).toBe(attestationData.uid);
      expect(attestation.schema).toBe(testSchemaId);
      expect(attestation.recipient).toBe(bob);
      expect(
        compareAddresses(
          attestation.attester,
          localAddresses.attestationBarterUtils,
        ),
      ).toBe(true);
    });
  });

  describe("getAttestedEventFromTxHash", () => {
    test("should retrieve attestation event from transaction hash", async () => {
      const testSchemaId = await registerTestSchema();

      // Create a test attestation to retrieve the event for
      const { hash: txHash } = await aliceClient.attestation.createAttestation(
        testSchemaId,
        bob,
        BigInt(Math.floor(Date.now() / 1000) + 86400), // 1 day expiration
        true, // revocable
        "0x0000000000000000000000000000000000000000000000000000000000000000", // no ref
        ("0x" + Buffer.from("event test").toString("hex")) as `0x${string}`, // data
      );

      // Get the attestation event using the transaction hash
      const attestEvent = await aliceClient.getAttestedEventFromTxHash(txHash);

      // Verify the event data is non-empty
      expect(
        compareAddresses(
          attestEvent.attester,
          localAddresses.attestationBarterUtils,
        ),
      ).toBe(true);
      expect(attestEvent.schemaUID).toBe(testSchemaId);
      expect(attestEvent.uid).toBeDefined();
      expect(attestEvent.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });
  });

  describe("waitForFulfillment", () => {
    test("should wait for an escrow fulfillment", async () => {
      // First create a string attestation by Bob to use for fulfillment
      const { attested: fulfillmentEvent } =
        await bobClient.stringObligation.makeStatement("fulfillment data");
      const fulfillmentUid = fulfillmentEvent.uid as `0x${string}`;

      await aliceClient.erc20.approve(
        { address: erc20Token, value: 10n },
        "escrow",
      );
      // Alice creates an escrow attestation that requires a fulfillment
      const { attested: escrowData } = await aliceClient.erc20.buyWithErc20(
        { address: erc20Token, value: 10n },
        { arbiter: localAddresses.trivialArbiter, demand: "0x" },
        0n,
      );

      // Start a promise that waits for fulfillment in the background
      const fulfillmentPromise = aliceClient.waitForFulfillment(
        localAddresses.erc20EscrowObligation,
        escrowData.uid,
      );

      // Bob collects the escrow by providing the fulfillment
      await bobClient.erc20.collectPayment(escrowData.uid, fulfillmentUid);

      // Wait for the fulfillment promise to resolve
      const fulfillment = await fulfillmentPromise;

      // Verify we got a valid fulfillment
      expect(fulfillment.payment).toBe(escrowData.uid);
      expect(fulfillment.fulfillment).toBe(fulfillmentUid);
      expect(fulfillment.fulfiller).toBe(bob);
    });
  });
});
