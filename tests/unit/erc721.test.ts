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
  getAddress,
  nonceManager,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { baseSepolia, foundry } from "viem/chains";
import { $ } from "bun";
import {
  compareAddresses,
  createTokenTestExtension,
} from "../utils/tokenTestUtils";

// Import contract artifacts from src/contracts where available
import ERC20EscrowObligation from "@contracts/ERC20EscrowObligation.json";
import ERC20PaymentObligation from "@contracts/ERC20PaymentObligation.json";
import ERC721EscrowObligation from "@contracts/ERC721EscrowObligation.json";
import ERC721PaymentObligation from "@contracts/ERC721PaymentObligation.json";
import ERC1155EscrowObligation from "@contracts/ERC1155EscrowObligation.json";
import ERC1155PaymentObligation from "@contracts/ERC1155PaymentObligation.json";
import TokenBundleEscrowObligation from "@contracts/TokenBundleEscrowObligation.json";
import TokenBundlePaymentObligation from "@contracts/TokenBundlePaymentObligation.json";
import ERC721BarterCrossToken from "@contracts/ERC721BarterCrossToken.json";

// Import implementation contracts from fixtures
// These are needed because they have bytecode for deployment (interfaces don't)
import EAS from "../fixtures/EAS.json";
import SchemaRegistry from "../fixtures/SchemaRegistry.json";
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";

describe("ERC721 Tests", () => {
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
    erc20BarterUtils: "" as `0x${string}`,
    erc721BarterUtils: "" as `0x${string}`,
    erc20EscrowObligation: "" as `0x${string}`,
    erc20PaymentObligation: "" as `0x${string}`,
    erc721EscrowObligation: "" as `0x${string}`,
    erc721PaymentObligation: "" as `0x${string}`,
    erc1155EscrowObligation: "" as `0x${string}`,
    erc1155PaymentObligation: "" as `0x${string}`,
    tokenBundleEscrowObligation: "" as `0x${string}`,
    tokenBundlePaymentObligation: "" as `0x${string}`,
  };

  // Contract instances
  let erc20Token: `0x${string}`;
  let aliceErc721Token: `0x${string}`;
  let bobErc721Token: `0x${string}`;
  let erc1155Token: `0x${string}`;

  // Token IDs
  let aliceTokenId: bigint;
  let bobTokenId: bigint;

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

    // Deploy Obligations
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

    console.debug("Deploying ERC20PaymentObligation...");
    const erc20PaymentObligationHash = await testClient.deployContract({
      abi: ERC20PaymentObligation.abi,
      bytecode: ERC20PaymentObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `ERC20PaymentObligation deployed, tx hash: ${erc20PaymentObligationHash}`,
    );

    console.debug("Waiting for ERC20PaymentObligation transaction receipt...");
    const erc20PaymentObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc20PaymentObligationHash,
      });
    console.debug("ERC20PaymentObligation receipt received");

    localAddresses.erc20PaymentObligation =
      erc20PaymentObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `ERC20PaymentObligation deployed at: ${localAddresses.erc20PaymentObligation}`,
    );

    console.debug("Deploying ERC721EscrowObligation...");
    const erc721EscrowObligationHash = await testClient.deployContract({
      abi: ERC721EscrowObligation.abi,
      bytecode: ERC721EscrowObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `ERC721EscrowObligation deployed, tx hash: ${erc721EscrowObligationHash}`,
    );

    console.debug("Waiting for ERC721EscrowObligation transaction receipt...");
    const erc721EscrowObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc721EscrowObligationHash,
      });
    console.debug("ERC721EscrowObligation receipt received");

    localAddresses.erc721EscrowObligation =
      erc721EscrowObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `ERC721EscrowObligation deployed at: ${localAddresses.erc721EscrowObligation}`,
    );

    console.debug("Deploying ERC721PaymentObligation...");
    const erc721PaymentObligationHash = await testClient.deployContract({
      abi: ERC721PaymentObligation.abi,
      bytecode: ERC721PaymentObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `ERC721PaymentObligation deployed, tx hash: ${erc721PaymentObligationHash}`,
    );

    console.debug("Waiting for ERC721PaymentObligation transaction receipt...");
    const erc721PaymentObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc721PaymentObligationHash,
      });
    console.debug("ERC721PaymentObligation receipt received");

    localAddresses.erc721PaymentObligation =
      erc721PaymentObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `ERC721PaymentObligation deployed at: ${localAddresses.erc721PaymentObligation}`,
    );

    console.debug("Deploying ERC1155EscrowObligation...");
    const erc1155EscrowObligationHash = await testClient.deployContract({
      abi: ERC1155EscrowObligation.abi,
      bytecode: ERC1155EscrowObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `ERC1155EscrowObligation deployed, tx hash: ${erc1155EscrowObligationHash}`,
    );

    console.debug("Waiting for ERC1155EscrowObligation transaction receipt...");
    const erc1155EscrowObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc1155EscrowObligationHash,
      });
    console.debug("ERC1155EscrowObligation receipt received");

    localAddresses.erc1155EscrowObligation =
      erc1155EscrowObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `ERC1155EscrowObligation deployed at: ${localAddresses.erc1155EscrowObligation}`,
    );

    console.debug("Deploying ERC1155PaymentObligation...");
    const erc1155PaymentObligationHash = await testClient.deployContract({
      abi: ERC1155PaymentObligation.abi,
      bytecode: ERC1155PaymentObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `ERC1155PaymentObligation deployed, tx hash: ${erc1155PaymentObligationHash}`,
    );

    console.debug(
      "Waiting for ERC1155PaymentObligation transaction receipt...",
    );
    const erc1155PaymentObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc1155PaymentObligationHash,
      });
    console.debug("ERC1155PaymentObligation receipt received");

    localAddresses.erc1155PaymentObligation =
      erc1155PaymentObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `ERC1155PaymentObligation deployed at: ${localAddresses.erc1155PaymentObligation}`,
    );

    console.debug("Deploying TokenBundleEscrowObligation...");
    const tokenBundleEscrowObligationHash = await testClient.deployContract({
      abi: TokenBundleEscrowObligation.abi,
      bytecode: TokenBundleEscrowObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `TokenBundleEscrowObligation deployed, tx hash: ${tokenBundleEscrowObligationHash}`,
    );

    console.debug(
      "Waiting for TokenBundleEscrowObligation transaction receipt...",
    );
    const tokenBundleEscrowObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: tokenBundleEscrowObligationHash,
      });
    console.debug("TokenBundleEscrowObligation receipt received");

    localAddresses.tokenBundleEscrowObligation =
      tokenBundleEscrowObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `TokenBundleEscrowObligation deployed at: ${localAddresses.tokenBundleEscrowObligation}`,
    );

    console.debug("Deploying TokenBundlePaymentObligation...");
    const tokenBundlePaymentObligationHash = await testClient.deployContract({
      abi: TokenBundlePaymentObligation.abi,
      bytecode: TokenBundlePaymentObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });
    console.debug(
      `TokenBundlePaymentObligation deployed, tx hash: ${tokenBundlePaymentObligationHash}`,
    );

    console.debug(
      "Waiting for TokenBundlePaymentObligation transaction receipt...",
    );
    const tokenBundlePaymentObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: tokenBundlePaymentObligationHash,
      });
    console.debug("TokenBundlePaymentObligation receipt received");

    localAddresses.tokenBundlePaymentObligation =
      tokenBundlePaymentObligationReceipt.contractAddress as `0x${string}`;
    console.debug(
      `TokenBundlePaymentObligation deployed at: ${localAddresses.tokenBundlePaymentObligation}`,
    );

    // Deploy ERC721BarterCrossToken which extends ERC721BarterUtils
    console.debug("Deploying ERC721BarterCrossToken...");
    const erc721BarterUtilsHash = await testClient.deployContract({
      abi: ERC721BarterCrossToken.abi,
      bytecode: ERC721BarterCrossToken.bytecode.object as `0x${string}`,
      args: [
        localAddresses.eas,
        localAddresses.erc20EscrowObligation,
        localAddresses.erc20PaymentObligation,
        localAddresses.erc721EscrowObligation,
        localAddresses.erc721PaymentObligation,
        localAddresses.erc1155EscrowObligation,
        localAddresses.erc1155PaymentObligation,
        localAddresses.tokenBundleEscrowObligation,
        localAddresses.tokenBundlePaymentObligation,
      ],
    });
    console.debug(
      `ERC721BarterCrossToken deployed, tx hash: ${erc721BarterUtilsHash}`,
    );

    console.debug("Waiting for ERC721BarterCrossToken transaction receipt...");
    const erc721BarterUtilsReceipt = await testClient.waitForTransactionReceipt(
      {
        hash: erc721BarterUtilsHash,
      },
    );
    console.debug("ERC721BarterCrossToken receipt received");

    localAddresses.erc721BarterUtils =
      erc721BarterUtilsReceipt.contractAddress as `0x${string}`;
    console.debug(
      `ERC721BarterCrossToken deployed at: ${localAddresses.erc721BarterUtils}`,
    );

    // Deploy mock tokens
    console.debug("Deploying ERC20 Token...");
    const erc20TokenHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Test Token", "TEST"],
    });
    console.debug(`ERC20 Token deployed, tx hash: ${erc20TokenHash}`);

    console.debug("Deploying Alice's ERC721 token...");
    const aliceErc721TokenHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(
      `Alice's ERC721 token deployed, tx hash: ${aliceErc721TokenHash}`,
    );

    console.debug("Deploying Bob's ERC721 token...");
    const bobErc721TokenHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(
      `Bob's ERC721 token deployed, tx hash: ${bobErc721TokenHash}`,
    );

    console.debug("Deploying ERC1155 token...");
    const erc1155TokenHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`ERC1155 token deployed, tx hash: ${erc1155TokenHash}`);

    // Get contract addresses
    console.debug("Waiting for ERC20 Token transaction receipt...");
    const erc20TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenHash,
    });
    console.debug("ERC20 Token receipt received");

    console.debug("Waiting for Alice's ERC721 token transaction receipt...");
    const aliceErc721TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: aliceErc721TokenHash,
    });
    console.debug("Alice's ERC721 token receipt received");

    console.debug("Waiting for Bob's ERC721 token transaction receipt...");
    const bobErc721TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: bobErc721TokenHash,
    });
    console.debug("Bob's ERC721 token receipt received");

    console.debug("Waiting for ERC1155 token transaction receipt...");
    const erc1155TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: erc1155TokenHash,
    });
    console.debug("ERC1155 token receipt received");

    erc20Token = erc20TokenReceipt.contractAddress as `0x${string}`;
    aliceErc721Token = aliceErc721TokenReceipt.contractAddress as `0x${string}`;
    bobErc721Token = bobErc721TokenReceipt.contractAddress as `0x${string}`;
    erc1155Token = erc1155TokenReceipt.contractAddress as `0x${string}`;
    console.debug(`Contract addresses obtained:
      - ERC20: ${erc20Token}
      - Alice's ERC721: ${aliceErc721Token}
      - Bob's ERC721: ${bobErc721Token}
      - ERC1155: ${erc1155Token}`);

    // Transfer and mint tokens to Alice and Bob
    console.debug("Transferring ERC20 to Bob...");
    await testClient.writeContract({
      address: erc20Token,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [bob, parseEther("1000")],
    });
    console.debug("ERC20 transferred to Bob");

    // Mint NFTs
    console.debug("Minting ERC721 to Alice...");
    const aliceMintTx = await testClient.writeContract({
      address: aliceErc721Token,
      abi: MockERC721.abi,
      functionName: "mint",
      args: [alice],
    });
    const aliceMintReceipt = await testClient.waitForTransactionReceipt({
      hash: aliceMintTx,
    });

    // Get the tokenId from the transaction logs
    aliceTokenId = 1n; // First token minted is ID 1
    console.debug(`ERC721 minted to Alice with ID: ${aliceTokenId}`);

    console.debug("Minting ERC721 to Bob...");
    const bobMintTx = await testClient.writeContract({
      address: bobErc721Token,
      abi: MockERC721.abi,
      functionName: "mint",
      args: [bob],
    });
    const bobMintReceipt = await testClient.waitForTransactionReceipt({
      hash: bobMintTx,
    });

    // Get the tokenId from the transaction logs
    bobTokenId = 1n; // First token minted is ID 1
    console.debug(`ERC721 minted to Bob with ID: ${bobTokenId}`);

    console.debug("Minting ERC1155 to Bob...");
    await testClient.writeContract({
      address: erc1155Token,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [bob, 1n, 100n],
    });
    console.debug("ERC1155 minted to Bob");

    console.debug("Creating Alice and Bob clients...");
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

  describe("ERC721BarterUtils", () => {
    test("testBuyErc721ForErc721", async () => {
      console.debug("Starting testBuyErc721ForErc721 test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      console.debug(`Test setup: expiration=${expiration}`);

      // Alice approves and creates an escrow to trade her ERC721 for Bob's ERC721
      console.debug("ALICE: Approving ERC721 token for escrow...");
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );
      console.debug("ALICE: ERC721 token approved for escrow");

      console.debug("ALICE: Creating buy attestation (buyErc721ForErc721)...");
      const { attested: buyAttestation } =
        await aliceClient.erc721.buyErc721ForErc721(
          { address: aliceErc721Token, id: aliceTokenId },
          { address: bobErc721Token, id: bobTokenId },
          expiration,
        );
      console.debug(
        `ALICE: Buy attestation created with UID: ${buyAttestation.uid}`,
      );

      // Assert the attestation was created
      expect(buyAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's token is now in escrow
      const newOwner = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(
        compareAddresses(newOwner, localAddresses.erc721EscrowObligation),
      ).toBe(true);
      console.debug("testBuyErc721ForErc721 test completed successfully");
    });

    test("testPayErc721ForErc721", async () => {
      console.debug("Starting testPayErc721ForErc721 test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First, create a buy attestation
      console.debug("ALICE: Approving ERC721 token for escrow...");
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      console.debug("ALICE: Creating buy attestation (buyErc721ForErc721)...");
      const { attested: buyAttestation } =
        await aliceClient.erc721.buyErc721ForErc721(
          { address: aliceErc721Token, id: aliceTokenId },
          { address: bobErc721Token, id: bobTokenId },
          expiration,
        );

      // Check ownership before the exchange
      const aliceInitialOwnsToken = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      const bobInitialOwnsToken = await testClient.getERC721Owner({
        address: bobErc721Token,
        id: bobTokenId,
      });

      console.debug(
        `Initial ownership - Alice's token: ${aliceInitialOwnsToken}, Bob's token: ${bobInitialOwnsToken}`,
      );

      // Bob approves and fulfills the trade
      console.debug("BOB: Approving ERC721 token for payment...");
      await bobClient.erc721.approve(
        { address: bobErc721Token, id: bobTokenId },
        "payment",
      );
      console.debug("BOB: ERC721 token approved for payment");

      console.debug(
        `BOB: Fulfilling escrow with buy attestation UID: ${buyAttestation.uid}`,
      );
      const { hash } = await bobClient.erc721.payErc721ForErc721(
        buyAttestation.uid,
      );
      console.debug(`BOB: Payment transaction submitted with hash: ${hash}`);

      // Check token ownership after the exchange
      const aliceFinalOwnsToken = await testClient.getERC721Owner({
        address: bobErc721Token,
        id: bobTokenId,
      });

      const bobFinalOwnsToken = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      // Verify token transfers
      expect(compareAddresses(aliceFinalOwnsToken, alice)).toBe(true);
      expect(compareAddresses(bobFinalOwnsToken, bob)).toBe(true);
      console.debug("testPayErc721ForErc721 test completed successfully");
    });
  });

  describe("ERC721BarterCrossToken", () => {
    test("testBuyErc20WithErc721", async () => {
      const erc20Amount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow for ERC20
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      const { attested } = await aliceClient.erc721.buyErc20WithErc721(
        { address: aliceErc721Token, id: aliceTokenId },
        { address: erc20Token, value: erc20Amount },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's token is now in escrow
      const newOwner = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(
        compareAddresses(newOwner, localAddresses.erc721EscrowObligation),
      ).toBe(true);
    });

    test("testPayErc721ForErc20", async () => {
      const erc20Amount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      const { attested: buyAttestation } =
        await aliceClient.erc721.buyErc20WithErc721(
          { address: aliceErc721Token, id: aliceTokenId },
          { address: erc20Token, value: erc20Amount },
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token },
        alice,
      );

      // Bob approves and fulfills the escrow
      await bobClient.erc20.approve(
        { address: erc20Token, value: erc20Amount },
        "payment",
      );

      const { attested: payAttestation } =
        await bobClient.erc721.payErc721ForErc20(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token },
        alice,
      );

      const bobOwnsToken = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      // Verify transfers
      expect(compareAddresses(bobOwnsToken, bob)).toBe(true);
      expect(aliceFinalBalanceErc20 - aliceInitialBalanceErc20).toBe(
        erc20Amount,
      );
    });

    test("testBuyErc1155WithErc721", async () => {
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow for ERC1155
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      const { attested } = await aliceClient.erc721.buyErc1155WithErc721(
        { address: aliceErc721Token, id: aliceTokenId },
        { address: erc1155Token, id: tokenId, value: amount },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's token is now in escrow
      const newOwner = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(
        compareAddresses(newOwner, localAddresses.erc721EscrowObligation),
      ).toBe(true);
    });

    test("testPayErc721ForErc1155", async () => {
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      const { attested: buyAttestation } =
        await aliceClient.erc721.buyErc1155WithErc721(
          { address: aliceErc721Token, id: aliceTokenId },
          { address: erc1155Token, id: tokenId, value: amount },
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc1155 = await testClient.getERC1155Balance(
        { address: erc1155Token, id: tokenId },
        alice,
      );

      // Bob approves and fulfills the escrow
      await bobClient.erc1155.approveAll(erc1155Token, "payment");

      const { attested: payAttestation } =
        await bobClient.erc721.payErc721ForErc1155(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc1155 = await testClient.getERC1155Balance(
        { address: erc1155Token, id: tokenId },
        alice,
      );

      const bobOwnsToken = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      // Verify transfers
      expect(compareAddresses(bobOwnsToken, bob)).toBe(true);
      expect(aliceFinalBalanceErc1155 - aliceInitialBalanceErc1155).toBe(
        amount,
      );
    });

    test("testBuyBundleWithErc721", async () => {
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create token bundle
      const bundle = {
        erc20s: [{ address: erc20Token, value: parseEther("5") }],
        erc721s: [{ address: bobErc721Token, id: bobTokenId }],
        erc1155s: [{ address: erc1155Token, id: 1n, value: 20n }],
      };

      // Alice approves and creates an escrow for token bundle
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      const { attested } = await aliceClient.erc721.buyBundleWithErc721(
        { address: aliceErc721Token, id: aliceTokenId },
        bundle,
        alice,
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's token is now in escrow
      const newOwner = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(
        compareAddresses(newOwner, localAddresses.erc721EscrowObligation),
      ).toBe(true);
    });

    test("testPayErc721ForBundle", async () => {
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("5");
      const erc1155TokenId = 1n;
      const erc1155Amount = 20n;

      // Create token bundle
      const bundle = {
        erc20s: [{ address: erc20Token, value: erc20Amount / 2n }],
        erc721s: [{ address: bobErc721Token, id: bobTokenId }],
        erc1155s: [
          {
            address: erc1155Token,
            id: erc1155TokenId,
            value: erc1155Amount / 2n,
          },
        ],
      };

      // Alice approves and creates an escrow for token bundle
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      const { attested: buyAttestation } =
        await aliceClient.erc721.buyBundleWithErc721(
          { address: aliceErc721Token, id: aliceTokenId },
          bundle,
          alice,
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token },
        alice,
      );

      const aliceInitialBalanceErc1155 = await testClient.getERC1155Balance(
        { address: erc1155Token, id: erc1155TokenId },
        alice,
      );

      // Bob approves his tokens using bundle.approve
      console.debug("BOB: Approving tokens for bundle payment");
      const bobPaymentBundle = {
        erc20s: [{ address: erc20Token, value: erc20Amount / 2n }],
        erc721s: [{ address: bobErc721Token, id: bobTokenId }],
        erc1155s: [{ address: erc1155Token, id: erc1155TokenId, value: erc1155Amount / 2n }],
      };
      await bobClient.bundle.approve(bobPaymentBundle, "payment");

      console.debug("Executing payErc721ForBundle");
      const { attested: payAttestation } =
        await bobClient.erc721.payErc721ForBundle(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token },
        alice,
      );

      const aliceFinalBalanceErc1155 = await testClient.getERC1155Balance(
        { address: erc1155Token, id: erc1155TokenId },
        alice,
      );

      const aliceOwnsToken = await testClient.getERC721Owner({
        address: bobErc721Token,
        id: bobTokenId,
      });

      const bobOwnsToken = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      // Verify transfers
      expect(compareAddresses(bobOwnsToken, bob)).toBe(true);
      expect(compareAddresses(aliceOwnsToken, alice)).toBe(true);
      expect(aliceFinalBalanceErc20 - aliceInitialBalanceErc20).toBe(
        erc20Amount / 2n,
      );
      expect(aliceFinalBalanceErc1155 - aliceInitialBalanceErc1155).toBe(
        erc1155Amount / 2n,
      );
    });

    test("testCollectExpired", async () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const shortExpiration = BigInt(currentTime + 60); // 60 seconds from now

      // Alice approves and creates an escrow
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      const { attested: buyAttestation } =
        await aliceClient.erc721.buyErc721ForErc721(
          { address: aliceErc721Token, id: aliceTokenId },
          { address: bobErc721Token, id: bobTokenId },
          shortExpiration,
        );

      // Advance blockchain time to after expiration
      await testClient.increaseTime({ seconds: 120 }); // Advance 120 seconds

      // Alice collects her expired escrow
      await aliceClient.erc721.collectExpired(buyAttestation.uid);

      // Verify Alice got her token back
      const tokenOwner = await testClient.getERC721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(compareAddresses(tokenOwner, alice)).toBe(true);
    });
  });
});
