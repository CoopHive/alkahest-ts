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
import ERC1155BarterCrossToken from "@contracts/ERC1155BarterCrossToken.json";

// Import implementation contracts from fixtures
// These are needed because they have bytecode for deployment (interfaces don't)
import EAS from "../fixtures/EAS.json";
import SchemaRegistry from "../fixtures/SchemaRegistry.json";
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";

describe("ERC1155 Tests", () => {
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
    erc20EscrowObligation: "" as `0x${string}`,
    erc20PaymentObligation: "" as `0x${string}`,
    erc721EscrowObligation: "" as `0x${string}`,
    erc721PaymentObligation: "" as `0x${string}`,
    erc1155EscrowObligation: "" as `0x${string}`,
    erc1155PaymentObligation: "" as `0x${string}`,
    tokenBundleEscrowObligation: "" as `0x${string}`,
    tokenBundlePaymentObligation: "" as `0x${string}`,
    erc1155BarterUtils: "" as `0x${string}`,
  };

  // Contract instances
  let erc20Token: `0x${string}`;
  let erc721Token: `0x${string}`;
  let aliceErc1155Token: `0x${string}`;
  let bobErc1155Token: `0x${string}`;

  // Token IDs and amounts
  let erc721TokenId: bigint;
  let aliceErc1155TokenId: bigint = 1n;
  let aliceErc1155Amount: bigint = 100n;
  let bobErc1155TokenId: bigint = 2n;
  let bobErc1155Amount: bigint = 50n;

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

    // Deploy ERC1155BarterCrossToken which extends ERC1155BarterUtils
    console.debug("Deploying ERC1155BarterCrossToken...");
    const erc1155BarterUtilsHash = await testClient.deployContract({
      abi: ERC1155BarterCrossToken.abi,
      bytecode: ERC1155BarterCrossToken.bytecode.object as `0x${string}`,
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
      `ERC1155BarterCrossToken deployed, tx hash: ${erc1155BarterUtilsHash}`,
    );

    console.debug("Waiting for ERC1155BarterCrossToken transaction receipt...");
    const erc1155BarterUtilsReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc1155BarterUtilsHash,
      });
    console.debug("ERC1155BarterCrossToken receipt received");

    localAddresses.erc1155BarterUtils =
      erc1155BarterUtilsReceipt.contractAddress as `0x${string}`;
    console.debug(
      `ERC1155BarterCrossToken deployed at: ${localAddresses.erc1155BarterUtils}`,
    );

    // Deploy mock tokens
    console.debug("Deploying ERC20 Token...");
    const erc20TokenHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Test Token", "TEST"],
    });
    console.debug(`ERC20 Token deployed, tx hash: ${erc20TokenHash}`);

    console.debug("Deploying ERC721 token...");
    const erc721TokenHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`ERC721 token deployed, tx hash: ${erc721TokenHash}`);

    console.debug("Deploying Alice's ERC1155 token...");
    const aliceErc1155TokenHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(
      `Alice's ERC1155 token deployed, tx hash: ${aliceErc1155TokenHash}`,
    );

    console.debug("Deploying Bob's ERC1155 token...");
    const bobErc1155TokenHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(
      `Bob's ERC1155 token deployed, tx hash: ${bobErc1155TokenHash}`,
    );

    // Get contract addresses
    console.debug("Waiting for ERC20 Token transaction receipt...");
    const erc20TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenHash,
    });
    console.debug("ERC20 Token receipt received");

    console.debug("Waiting for ERC721 token transaction receipt...");
    const erc721TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: erc721TokenHash,
    });
    console.debug("ERC721 token receipt received");

    console.debug("Waiting for Alice's ERC1155 token transaction receipt...");
    const aliceErc1155TokenReceipt = await testClient.waitForTransactionReceipt(
      {
        hash: aliceErc1155TokenHash,
      },
    );
    console.debug("Alice's ERC1155 token receipt received");

    console.debug("Waiting for Bob's ERC1155 token transaction receipt...");
    const bobErc1155TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: bobErc1155TokenHash,
    });
    console.debug("Bob's ERC1155 token receipt received");

    erc20Token = erc20TokenReceipt.contractAddress as `0x${string}`;
    erc721Token = erc721TokenReceipt.contractAddress as `0x${string}`;
    aliceErc1155Token =
      aliceErc1155TokenReceipt.contractAddress as `0x${string}`;
    bobErc1155Token = bobErc1155TokenReceipt.contractAddress as `0x${string}`;
    console.debug(`Contract addresses obtained:
      - ERC20: ${erc20Token}
      - ERC721: ${erc721Token}
      - Alice's ERC1155: ${aliceErc1155Token}
      - Bob's ERC1155: ${bobErc1155Token}`);

    // Transfer and mint tokens to Alice and Bob
    console.debug("Transferring ERC20 to Bob...");
    await testClient.writeContract({
      address: erc20Token,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [bob, parseEther("500")],
    });
    console.debug("ERC20 transferred to Bob");

    // Mint NFT for Bob
    console.debug("Minting ERC721 to Bob...");
    const bobMintTx = await testClient.writeContract({
      address: erc721Token,
      abi: MockERC721.abi,
      functionName: "mint",
      args: [bob],
    });
    const bobMintReceipt = await testClient.waitForTransactionReceipt({
      hash: bobMintTx,
    });

    // Get the tokenId from the transaction logs
    erc721TokenId = 1n; // First token minted is ID 1
    console.debug(`ERC721 minted to Bob with ID: ${erc721TokenId}`);

    // Mint ERC1155 tokens
    console.debug("Minting ERC1155 tokens to Alice...");
    await testClient.writeContract({
      address: aliceErc1155Token,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [alice, aliceErc1155TokenId, aliceErc1155Amount],
    });
    console.debug(
      `ERC1155 minted to Alice with ID: ${aliceErc1155TokenId}, Amount: ${aliceErc1155Amount}`,
    );

    console.debug("Minting ERC1155 tokens to Bob...");
    await testClient.writeContract({
      address: bobErc1155Token,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [bob, bobErc1155TokenId, bobErc1155Amount],
    });
    console.debug(
      `ERC1155 minted to Bob with ID: ${bobErc1155TokenId}, Amount: ${bobErc1155Amount}`,
    );

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

  describe("ERC1155BarterUtils", () => {
    test("testBuyErc20WithErc1155", async () => {
      console.debug("Starting testBuyErc20WithErc1155 test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("500");
      console.debug(`Test setup: expiration=${expiration}`);

      // Check initial balances
      const initialEscrowBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId, value: 0n },
        localAddresses.erc1155EscrowObligation,
      );

      const initialAliceBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId, value: 0n },
        alice,
      );

      // Alice approves and creates an escrow to trade her ERC1155 for Bob's ERC20
      console.debug("ALICE: Approving ERC1155 token for escrow...");
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      console.debug("ALICE: ERC1155 token approved for escrow");

      console.debug("ALICE: Creating buy attestation (buyErc20WithErc1155)...");
      const { attested: buyAttestation } =
        await aliceClient.erc1155.buyErc20WithErc1155(
          {
            address: aliceErc1155Token,
            id: aliceErc1155TokenId,
            value: aliceErc1155Amount,
          },
          { address: erc20Token, value: erc20Amount },
          expiration,
        );
      console.debug(
        `ALICE: Buy attestation created with UID: ${buyAttestation.uid}`,
      );

      // Assert the attestation was created
      expect(buyAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's tokens are now in escrow
      const finalEscrowBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId, value: 0n },
        localAddresses.erc1155EscrowObligation,
      );

      const finalAliceBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId, value: 0n },
        alice,
      );

      // Verify the correct amount was escrowed
      expect(finalEscrowBalance - initialEscrowBalance).toBe(
        aliceErc1155Amount,
      );
      expect(initialAliceBalance - finalAliceBalance).toBe(aliceErc1155Amount);
      expect(finalAliceBalance).toBe(0n);
      console.debug("testBuyErc20WithErc1155 test completed successfully");
    });

    test("testPayErc1155ForErc20", async () => {
      console.debug("Starting testPayErc1155ForErc20 test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("500");

      // First, create a buy attestation
      console.debug("ALICE: Approving ERC1155 token for escrow...");
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");

      console.debug("ALICE: Creating buy attestation (buyErc20WithErc1155)...");
      const { attested: buyAttestation } =
        await aliceClient.erc1155.buyErc20WithErc1155(
          {
            address: aliceErc1155Token,
            id: aliceErc1155TokenId,
            value: aliceErc1155Amount,
          },
          { address: erc20Token, value: erc20Amount },
          expiration,
        );

      // Check balances before the exchange
      const bobInitialBalanceErc1155 = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId, value: 0n },
        bob,
      );

      const aliceInitialBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token, value: 0n },
        alice,
      );

      // Bob approves and fulfills the trade
      console.debug("BOB: Approving ERC20 token for payment...");
      await bobClient.erc20.approve(
        { address: erc20Token, value: erc20Amount },
        "payment",
      );
      console.debug("BOB: ERC20 token approved for payment");

      console.debug(
        `BOB: Fulfilling escrow with buy attestation UID: ${buyAttestation.uid}`,
      );
      const { attested: payAttestation } =
        await bobClient.erc1155.payErc1155ForErc20(buyAttestation.uid);
      console.debug(
        `BOB: Payment attestation created with UID: ${payAttestation.uid}`,
      );

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token balances after the exchange
      const bobFinalBalanceErc1155 = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId, value: 0n },
        bob,
      );

      const aliceFinalBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token, value: 0n },
        alice,
      );

      // Verify token transfers
      expect(bobFinalBalanceErc1155).toBe(
        bobInitialBalanceErc1155 + aliceErc1155Amount,
      );
      expect(aliceFinalBalanceErc20).toBe(
        aliceInitialBalanceErc20 + erc20Amount,
      );
      console.debug("testPayErc1155ForErc20 test completed successfully");
    });

    test("testBuyErc721WithErc1155", async () => {
      console.debug("Starting testBuyErc721WithErc1155 test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Check initial balances
      const initialEscrowBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: 0n,
        },
        localAddresses.erc1155EscrowObligation,
      );

      const initialAliceBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: 0n,
        },
        alice,
      );

      // Alice approves and creates an escrow to trade her ERC1155 for Bob's ERC721
      console.debug("ALICE: Approving ERC1155 token for escrow...");
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      console.debug("ALICE: ERC1155 token approved for escrow");

      console.debug(
        "ALICE: Creating buy attestation (buyErc721WithErc1155)...",
      );
      const { attested: buyAttestation } =
        await aliceClient.erc1155.buyErc721WithErc1155(
          {
            address: aliceErc1155Token,
            id: aliceErc1155TokenId,
            value: aliceErc1155Amount,
          },
          { address: erc721Token, id: erc721TokenId },
          expiration,
        );
      console.debug(
        `ALICE: Buy attestation created with UID: ${buyAttestation.uid}`,
      );

      // Assert the attestation was created
      expect(buyAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's tokens are now in escrow
      const finalEscrowBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: 0n,
        },
        localAddresses.erc1155EscrowObligation,
      );

      const finalAliceBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: 0n,
        },
        alice,
      );

      // Verify the correct amount was escrowed
      expect(
        (finalEscrowBalance as bigint) - (initialEscrowBalance as bigint),
      ).toBe(aliceErc1155Amount);
      expect(
        (initialAliceBalance as bigint) - (finalAliceBalance as bigint),
      ).toBe(aliceErc1155Amount);
      expect(finalAliceBalance).toBe(0n);
      console.debug("testBuyErc721WithErc1155 test completed successfully");
    });

    test("testPayErc1155ForErc721", async () => {
      console.debug("Starting testPayErc1155ForErc721 test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First, create a buy attestation
      console.debug("ALICE: Approving ERC1155 token for escrow...");
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");

      console.debug(
        "ALICE: Creating buy attestation (buyErc721WithErc1155)...",
      );
      const { attested: buyAttestation } =
        await aliceClient.erc1155.buyErc721WithErc1155(
          {
            address: aliceErc1155Token,
            id: aliceErc1155TokenId,
            value: aliceErc1155Amount,
          },
          { address: erc721Token, id: erc721TokenId },
          expiration,
        );

      // Check ownership before the exchange
      const bobInitialBalanceErc1155 = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId, value: 0n },
        bob,
      );

      const erc721Owner = await testClient.getERC721Owner({
        address: erc721Token,
        id: erc721TokenId,
      });

      expect(compareAddresses(erc721Owner, bob)).toBe(true);

      // Bob approves and fulfills the trade
      console.debug("BOB: Approving ERC721 token for payment...");
      await bobClient.erc721.approve(
        { address: erc721Token, id: erc721TokenId },
        "payment",
      );
      console.debug("BOB: ERC721 token approved for payment");

      console.debug(
        `BOB: Fulfilling escrow with buy attestation UID: ${buyAttestation.uid}`,
      );
      const { attested: payAttestation } =
        await bobClient.erc1155.payErc1155ForErc721(buyAttestation.uid);
      console.debug(
        `BOB: Payment attestation created with UID: ${payAttestation.uid}`,
      );

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers after the exchange
      const bobFinalBalanceErc1155 = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId, value: 0n },
        bob,
      );

      const newErc721Owner = await testClient.getERC721Owner({
        address: erc721Token,
        id: erc721TokenId,
      });

      // Verify token transfers
      expect(bobFinalBalanceErc1155).toBe(
        bobInitialBalanceErc1155 + aliceErc1155Amount,
      );
      expect(compareAddresses(newErc721Owner, alice)).toBe(true);
      console.debug("testPayErc1155ForErc721 test completed successfully");
    });

    test("testBuyBundleWithErc1155", async () => {
      console.debug("Starting testBuyBundleWithErc1155 test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("250"); // Half of Bob's ERC20 amount

      // Check initial balances
      const initialEscrowBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: 0n,
        },
        localAddresses.erc1155EscrowObligation,
      );

      const initialAliceBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: 0n,
        },
        alice,
      );

      // Create token bundle
      const bundle = {
        erc20s: [{ address: erc20Token, value: erc20Amount }],
        erc721s: [{ address: erc721Token, id: erc721TokenId }],
        erc1155s: [
          {
            address: bobErc1155Token,
            id: bobErc1155TokenId,
            value: bobErc1155Amount / 2n,
          },
        ],
      };

      // Alice approves and creates an escrow for token bundle
      console.debug("ALICE: Approving ERC1155 token for escrow...");
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      console.debug("ALICE: ERC1155 token approved for escrow");

      console.debug(
        "ALICE: Creating buy attestation (buyBundleWithErc1155)...",
      );
      const { attested } = await aliceClient.erc1155.buyBundleWithErc1155(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: aliceErc1155Amount,
        },
        bundle,
        alice,
        expiration,
      );
      console.debug(`ALICE: Buy attestation created with UID: ${attested.uid}`);

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's tokens are now in escrow
      const finalEscrowBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: 0n,
        },
        localAddresses.erc1155EscrowObligation,
      );

      const finalAliceBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: 0n,
        },
        alice,
      );

      // Verify the correct amount was escrowed
      expect(
        (finalEscrowBalance as bigint) - (initialEscrowBalance as bigint),
      ).toBe(aliceErc1155Amount);
      expect(
        (initialAliceBalance as bigint) - (finalAliceBalance as bigint),
      ).toBe(aliceErc1155Amount);
      expect(finalAliceBalance).toBe(0n);
      console.debug("testBuyBundleWithErc1155 test completed successfully");
    });

    test("testPayErc1155ForBundle", async () => {
      console.debug("Starting testPayErc1155ForBundle test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("250"); // Half of Bob's ERC20 amount
      const bobErc1155HalfAmount = bobErc1155Amount / 2n;

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token, value: 0n },
        alice,
      );

      const aliceInitialBalanceErc1155 = await testClient.getERC1155Balance(
        {
          address: bobErc1155Token,
          id: bobErc1155TokenId,
          value: 0n,
        },
        alice,
      );

      const bobInitialBalanceErc1155 = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: bobErc1155TokenId,
          value: 0n,
        },
        bob,
      );

      // Create token bundle
      const bundle = {
        erc20s: [{ address: erc20Token, value: erc20Amount }],
        erc721s: [{ address: erc721Token, id: erc721TokenId }],
        erc1155s: [
          {
            address: bobErc1155Token,
            id: bobErc1155TokenId,
            value: bobErc1155HalfAmount,
          },
        ],
      };

      // Alice approves and creates an escrow for token bundle
      console.debug("ALICE: Approving ERC1155 token for escrow...");
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      console.debug("ALICE: ERC1155 token approved for escrow");

      console.debug(
        "ALICE: Creating buy attestation (buyBundleWithErc1155)...",
      );
      const { attested: buyAttestation } =
        await aliceClient.erc1155.buyBundleWithErc1155(
          {
            address: aliceErc1155Token,
            id: aliceErc1155TokenId,
            value: aliceErc1155Amount,
          },
          bundle,
          alice,
          expiration,
        );
      console.debug(
        `ALICE: Buy attestation created with UID: ${buyAttestation.uid}`,
      );

      // Bob approves his tokens to the TokenBundlePaymentObligation contract
      console.debug(
        "BOB: Approving ERC20 tokens for TokenBundlePaymentObligation",
      );
      await bobClient.viemClient.writeContract({
        address: erc20Token,
        abi: MockERC20Permit.abi,
        functionName: "approve",
        args: [localAddresses.tokenBundlePaymentObligation, erc20Amount],
      });

      console.debug("BOB: Approving ERC721 for TokenBundlePaymentObligation");
      await bobClient.viemClient.writeContract({
        address: erc721Token,
        abi: MockERC721.abi,
        functionName: "approve",
        args: [localAddresses.tokenBundlePaymentObligation, erc721TokenId],
      });

      console.debug("BOB: Approving ERC1155 for TokenBundlePaymentObligation");
      await bobClient.viemClient.writeContract({
        address: bobErc1155Token,
        abi: MockERC1155.abi,
        functionName: "setApprovalForAll",
        args: [localAddresses.tokenBundlePaymentObligation, true],
      });

      console.debug("BOB: Executing payErc1155ForBundle");
      const { attested: payAttestation } =
        await bobClient.erc1155.payErc1155ForBundle(buyAttestation.uid);
      console.debug(
        `BOB: Payment attestation created with UID: ${payAttestation.uid}`,
      );

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token, value: 0n },
        alice,
      );

      const aliceFinalBalanceErc1155 = await testClient.getERC1155Balance(
        {
          address: bobErc1155Token,
          id: bobErc1155TokenId,
          value: 0n,
        },
        alice,
      );

      const aliceOwnsToken = await testClient.getERC721Owner({
        address: erc721Token,
        id: erc721TokenId,
      });

      const bobErc1155Balance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: bobErc1155TokenId,
          value: 0n,
        },
        bob,
      );

      // Verify transfers
      expect(compareAddresses(aliceOwnsToken as string, alice)).toBe(true);

      expect(
        (bobErc1155Balance as bigint) - (bobInitialBalanceErc1155 as bigint),
      ).toBe(aliceErc1155Amount);

      expect(
        (aliceFinalBalanceErc20 as bigint) -
          (aliceInitialBalanceErc20 as bigint),
      ).toBe(erc20Amount);
      expect(
        (aliceFinalBalanceErc1155 as bigint) -
          (aliceInitialBalanceErc1155 as bigint),
      ).toBe(bobErc1155HalfAmount);
      console.debug("testPayErc1155ForBundle test completed successfully");
    });

    test("testCollectExpired", async () => {
      console.debug("Starting testCollectExpired test");
      const currentTime = Math.floor(Date.now() / 1000);
      const shortExpiration = BigInt(currentTime + 60); // 60 seconds from now

      // Alice approves and creates an escrow
      console.debug("ALICE: Approving ERC1155 token for escrow...");
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      console.debug("ALICE: ERC1155 token approved for escrow");

      console.debug("ALICE: Creating buy attestation (buyErc20WithErc1155)...");
      const { attested: buyAttestation } =
        await aliceClient.erc1155.buyErc20WithErc1155(
          {
            address: aliceErc1155Token,
            id: aliceErc1155TokenId,
            value: aliceErc1155Amount,
          },
          { address: erc20Token, value: parseEther("500") },
          shortExpiration,
        );
      console.debug(
        `ALICE: Buy attestation created with UID: ${buyAttestation.uid}`,
      );

      // Advance blockchain time to after expiration
      console.debug("Advancing blockchain time past expiration...");
      await testClient.increaseTime({ seconds: 120 }); // Advance 120 seconds
      console.debug("Blockchain time advanced");

      // Alice collects her expired escrow
      console.debug("ALICE: Collecting expired escrow...");
      await aliceClient.erc1155.collectExpired(buyAttestation.uid);
      console.debug("ALICE: Expired escrow collected");

      // Verify Alice got her tokens back
      const aliceBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId, value: 0n },
        alice,
      );

      expect(aliceBalance).toBe(aliceErc1155Amount);
      console.debug("testCollectExpired test completed successfully");
    });
  });
});
