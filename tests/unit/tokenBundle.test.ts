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

// Import contract artifacts from src/contracts where available
import ERC20EscrowObligation from "@contracts/ERC20EscrowObligation.json";
import ERC20PaymentObligation from "@contracts/ERC20PaymentObligation.json";
import ERC721EscrowObligation from "@contracts/ERC721EscrowObligation.json";
import ERC721PaymentObligation from "@contracts/ERC721PaymentObligation.json";
import ERC1155EscrowObligation from "@contracts/ERC1155EscrowObligation.json";
import ERC1155PaymentObligation from "@contracts/ERC1155PaymentObligation.json";
import TokenBundleEscrowObligation from "@contracts/TokenBundleEscrowObligation.json";
import TokenBundlePaymentObligation from "@contracts/TokenBundlePaymentObligation.json";
import TokenBundleBarterUtils from "@contracts/TokenBundleBarterUtils.json";

// Import implementation contracts from fixtures
// These are needed because they have bytecode for deployment (interfaces don't)
import EAS from "../fixtures/EAS.json";
import SchemaRegistry from "../fixtures/SchemaRegistry.json";
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";
import { $ } from "bun";
import { 
  getERC20Balance, 
  getERC721Owner, 
  getERC1155Balance, 
  compareAddresses,
  createTokenTestExtension
} from "../utils/tokenTestUtils";

// Note: This shows how you could use the client extension approach
// in a real test. We're not using it in this file yet to avoid
// refactoring the entire test at once.
// 
// Example usage:
// const extendedClient = testClient.extend(createTokenTestExtension());
// const balance = await extendedClient.getERC20Balance({
//   address: erc20Token,
//   value: 0n
// }, alice);

describe("TokenBundle Tests", () => {
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
    tokenBundleBarterUtils: "" as `0x${string}`,
  };

  // Contract instances
  let erc20TokenA: `0x${string}`;
  let erc20TokenB: `0x${string}`;
  let erc721TokenA: `0x${string}`;
  let erc721TokenB: `0x${string}`;
  let erc1155TokenA: `0x${string}`;
  let erc1155TokenB: `0x${string}`;

  // Token IDs and amounts
  let aliceErc721Id: bigint;
  let bobErc721Id: bigint;
  const erc1155TokenIdA: bigint = 1n;
  const erc1155TokenAmountA: bigint = 100n;
  const erc1155TokenIdB: bigint = 2n;
  const erc1155TokenAmountB: bigint = 50n;
  const erc20AmountA = parseEther("500");
  const erc20AmountB = parseEther("250");

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

    // Deploy TokenBundleBarterUtils
    console.debug("Deploying TokenBundleBarterUtils...");
    const tokenBundleBarterUtilsHash = await testClient.deployContract({
      abi: TokenBundleBarterUtils.abi,
      bytecode: TokenBundleBarterUtils.bytecode.object as `0x${string}`,
      args: [
        localAddresses.eas,
        localAddresses.tokenBundleEscrowObligation,
        localAddresses.tokenBundlePaymentObligation,
      ],
    });
    console.debug(
      `TokenBundleBarterUtils deployed, tx hash: ${tokenBundleBarterUtilsHash}`,
    );

    console.debug("Waiting for TokenBundleBarterUtils transaction receipt...");
    const tokenBundleBarterUtilsReceipt = await testClient.waitForTransactionReceipt(
      {
        hash: tokenBundleBarterUtilsHash,
      },
    );
    console.debug("TokenBundleBarterUtils receipt received");

    localAddresses.tokenBundleBarterUtils =
      tokenBundleBarterUtilsReceipt.contractAddress as `0x${string}`;
    console.debug(
      `TokenBundleBarterUtils deployed at: ${localAddresses.tokenBundleBarterUtils}`,
    );

    // Deploy mock tokens
    console.debug("Deploying ERC20 Token A...");
    const erc20TokenAHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token A", "TKNA"],
    });
    console.debug(`ERC20 Token A deployed, tx hash: ${erc20TokenAHash}`);

    console.debug("Deploying ERC20 Token B...");
    const erc20TokenBHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token B", "TKNB"],
    });
    console.debug(`ERC20 Token B deployed, tx hash: ${erc20TokenBHash}`);

    console.debug("Deploying ERC721 token A...");
    const erc721TokenAHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`ERC721 token A deployed, tx hash: ${erc721TokenAHash}`);

    console.debug("Deploying ERC721 token B...");
    const erc721TokenBHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`ERC721 token B deployed, tx hash: ${erc721TokenBHash}`);

    console.debug("Deploying ERC1155 token A...");
    const erc1155TokenAHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`ERC1155 token A deployed, tx hash: ${erc1155TokenAHash}`);

    console.debug("Deploying ERC1155 token B...");
    const erc1155TokenBHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`ERC1155 token B deployed, tx hash: ${erc1155TokenBHash}`);

    // Get contract addresses
    console.debug("Waiting for token transaction receipts...");
    const erc20TokenAReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenAHash,
    });
    const erc20TokenBReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenBHash,
    });
    const erc721TokenAReceipt = await testClient.waitForTransactionReceipt({
      hash: erc721TokenAHash,
    });
    const erc721TokenBReceipt = await testClient.waitForTransactionReceipt({
      hash: erc721TokenBHash,
    });
    const erc1155TokenAReceipt = await testClient.waitForTransactionReceipt({
      hash: erc1155TokenAHash,
    });
    const erc1155TokenBReceipt = await testClient.waitForTransactionReceipt({
      hash: erc1155TokenBHash,
    });
    console.debug("All token receipts received");

    erc20TokenA = erc20TokenAReceipt.contractAddress as `0x${string}`;
    erc20TokenB = erc20TokenBReceipt.contractAddress as `0x${string}`;
    erc721TokenA = erc721TokenAReceipt.contractAddress as `0x${string}`;
    erc721TokenB = erc721TokenBReceipt.contractAddress as `0x${string}`;
    erc1155TokenA = erc1155TokenAReceipt.contractAddress as `0x${string}`;
    erc1155TokenB = erc1155TokenBReceipt.contractAddress as `0x${string}`;
    console.debug(`Contract addresses obtained:
      - ERC20 A: ${erc20TokenA}
      - ERC20 B: ${erc20TokenB}
      - ERC721 A: ${erc721TokenA}
      - ERC721 B: ${erc721TokenB}
      - ERC1155 A: ${erc1155TokenA}
      - ERC1155 B: ${erc1155TokenB}`);

    // Transfer and mint tokens to Alice and Bob
    console.debug("Transferring ERC20 tokens...");
    await testClient.writeContract({
      address: erc20TokenA,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [alice, erc20AmountA],
    });

    await testClient.writeContract({
      address: erc20TokenB,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [bob, erc20AmountB],
    });
    console.debug("ERC20 tokens transferred");

    // Mint NFTs
    console.debug("Minting ERC721 tokens...");
    const aliceMintTx = await testClient.writeContract({
      address: erc721TokenA,
      abi: MockERC721.abi,
      functionName: "mint",
      args: [alice],
    });
    await testClient.waitForTransactionReceipt({
      hash: aliceMintTx,
    });

    const bobMintTx = await testClient.writeContract({
      address: erc721TokenB,
      abi: MockERC721.abi,
      functionName: "mint",
      args: [bob],
    });
    await testClient.waitForTransactionReceipt({
      hash: bobMintTx,
    });

    // Get the tokenIds - first token minted is ID 1
    aliceErc721Id = 1n;
    bobErc721Id = 1n;
    console.debug(`ERC721 tokens minted - Alice ID: ${aliceErc721Id}, Bob ID: ${bobErc721Id}`);

    // Mint ERC1155 tokens
    console.debug("Minting ERC1155 tokens...");
    await testClient.writeContract({
      address: erc1155TokenA,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [alice, erc1155TokenIdA, erc1155TokenAmountA],
    });

    await testClient.writeContract({
      address: erc1155TokenB,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [bob, erc1155TokenIdB, erc1155TokenAmountB],
    });
    console.debug("ERC1155 tokens minted");

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

  describe("TokenBundleBarterUtils", () => {
    // Helper function to create Alice's bundle
    function createAliceBundle() {
      return {
        erc20s: [{ address: erc20TokenA, value: erc20AmountA }],
        erc721s: [{ address: erc721TokenA, id: aliceErc721Id }],
        erc1155s: [
          {
            address: erc1155TokenA,
            id: erc1155TokenIdA,
            value: erc1155TokenAmountA,
          },
        ],
      };
    }

    // Helper function to create Bob's bundle
    function createBobBundle() {
      return {
        erc20s: [{ address: erc20TokenB, value: erc20AmountB }],
        erc721s: [{ address: erc721TokenB, id: bobErc721Id }],
        erc1155s: [
          {
            address: erc1155TokenB,
            id: erc1155TokenIdB,
            value: erc1155TokenAmountB,
          },
        ],
      };
    }

    test("testBuyBundleForBundle", async () => {
      console.debug("Starting testBuyBundleForBundle test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create bundles
      const aliceBundle = createAliceBundle();
      const bobBundle = createBobBundle();

      // Check initial balances
      const initialErc20ABalanceEscrow = await testClient.getERC20Balance(
        { address: erc20TokenA, value: 0n },
        localAddresses.tokenBundleEscrowObligation
      );

      const initialErc721AOwner = await testClient.getERC721Owner(
        { address: erc721TokenA, id: aliceErc721Id }
      );

      const initialErc1155ABalanceEscrow = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA, value: 0n },
        localAddresses.tokenBundleEscrowObligation
      );

      // Alice approves tokens
      console.debug("ALICE: Approving tokens for escrow...");
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: erc20AmountA },
        "bundleEscrow",
      );
      
      await aliceClient.erc721.approve(
        { address: erc721TokenA, id: aliceErc721Id },
        "bundleEscrow",
      );
      
      await aliceClient.erc1155.approveAll(erc1155TokenA, "bundleEscrow");
      console.debug("ALICE: Tokens approved for escrow");

      // Alice creates buy attestation
      console.debug("ALICE: Creating buy attestation (buyBundleForBundle)...");
      const { attested: buyAttestation } = 
        await aliceClient.bundle.buyBundleForBundle(
          aliceBundle,
          bobBundle,
          alice,
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
      const finalErc20ABalanceEscrow = await testClient.getERC20Balance(
        { address: erc20TokenA, value: 0n },
        localAddresses.tokenBundleEscrowObligation
      );

      const finalErc721AOwner = await testClient.getERC721Owner(
        { address: erc721TokenA, id: aliceErc721Id }
      );

      const finalErc1155ABalanceEscrow = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA, value: 0n },
        localAddresses.tokenBundleEscrowObligation
      );

      // Verify tokens were escrowed
      expect(finalErc20ABalanceEscrow - initialErc20ABalanceEscrow).toBe(erc20AmountA);
      expect(compareAddresses(finalErc721AOwner, localAddresses.tokenBundleEscrowObligation)).toBe(true);
      expect(finalErc1155ABalanceEscrow - initialErc1155ABalanceEscrow).toBe(erc1155TokenAmountA);
      
      console.debug("testBuyBundleForBundle test completed successfully");
    });

    test("testPayBundleForBundle", async () => {
      console.debug("Starting testPayBundleForBundle test");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create bundles
      const aliceBundle = createAliceBundle();
      const bobBundle = createBobBundle();

      // Alice approves and creates escrow
      console.debug("ALICE: Approving tokens for escrow...");
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: erc20AmountA },
        "bundleEscrow",
      );
      
      await aliceClient.erc721.approve(
        { address: erc721TokenA, id: aliceErc721Id },
        "bundleEscrow",
      );
      
      await aliceClient.erc1155.approveAll(erc1155TokenA, "bundleEscrow");
      console.debug("ALICE: Tokens approved for escrow");

      console.debug("ALICE: Creating buy attestation (buyBundleForBundle)...");
      const { attested: buyAttestation } = 
        await aliceClient.bundle.buyBundleForBundle(
          aliceBundle,
          bobBundle,
          alice,
          expiration,
        );
      console.debug(
        `ALICE: Buy attestation created with UID: ${buyAttestation.uid}`,
      );

      // Check balances before fulfillment
      const aliceInitialErc20BBalance = await testClient.getERC20Balance(
        { address: erc20TokenB, value: 0n },
        alice
      );

      const bobInitialErc20ABalance = await testClient.getERC20Balance(
        { address: erc20TokenA, value: 0n },
        bob
      );

      const aliceInitialErc1155BBalance = await testClient.getERC1155Balance(
        { address: erc1155TokenB, id: erc1155TokenIdB, value: 0n },
        alice
      );

      const bobInitialErc1155ABalance = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA, value: 0n },
        bob
      );

      // Bob approves his tokens
      console.debug("BOB: Approving tokens for payment...");
      await bobClient.erc20.approve(
        { address: erc20TokenB, value: erc20AmountB },
        "bundlePayment",
      );
      
      await bobClient.erc721.approve(
        { address: erc721TokenB, id: bobErc721Id },
        "bundlePayment",
      );
      
      await bobClient.erc1155.approveAll(erc1155TokenB, "bundlePayment");
      console.debug("BOB: Tokens approved for payment");

      // Bob fulfills Alice's order
      console.debug(`BOB: Fulfilling buy with attestation UID: ${buyAttestation.uid}`);
      const { attested: payAttestation } = 
        await bobClient.bundle.payBundleForBundle(buyAttestation.uid);
      console.debug(`BOB: Payment attestation created with UID: ${payAttestation.uid}`);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check balances after fulfillment
      const aliceFinalErc20BBalance = await testClient.getERC20Balance(
        { address: erc20TokenB, value: 0n },
        alice
      );

      const bobFinalErc20ABalance = await testClient.getERC20Balance(
        { address: erc20TokenA, value: 0n },
        bob
      );

      const aliceFinalErc1155BBalance = await testClient.getERC1155Balance(
        { address: erc1155TokenB, id: erc1155TokenIdB, value: 0n },
        alice
      );

      const bobFinalErc1155ABalance = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA, value: 0n },
        bob
      );

      const aliceErc721BOwner = await testClient.getERC721Owner(
        { address: erc721TokenB, id: bobErc721Id }
      );

      const bobErc721AOwner = await testClient.getERC721Owner(
        { address: erc721TokenA, id: aliceErc721Id }
      );

      // Verify token transfers
      // Alice receives Bob's tokens
      expect(aliceFinalErc20BBalance - aliceInitialErc20BBalance).toBe(erc20AmountB);
      expect(compareAddresses(aliceErc721BOwner, alice)).toBe(true);
      expect(aliceFinalErc1155BBalance - aliceInitialErc1155BBalance).toBe(erc1155TokenAmountB);

      // Bob receives Alice's tokens
      expect(bobFinalErc20ABalance - bobInitialErc20ABalance).toBe(erc20AmountA);
      expect(compareAddresses(bobErc721AOwner, bob)).toBe(true);
      expect(bobFinalErc1155ABalance - bobInitialErc1155ABalance).toBe(erc1155TokenAmountA);
      
      console.debug("testPayBundleForBundle test completed successfully");
    });

    test("testCollectExpired", async () => {
      console.debug("Starting testCollectExpired test");
      const shortExpiration = BigInt(Math.floor(Date.now() / 1000) + 60); // 60 seconds from now

      // Create bundles
      const aliceBundle = createAliceBundle();
      const bobBundle = createBobBundle();

      // Alice approves and creates escrow
      console.debug("ALICE: Approving tokens for escrow...");
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: erc20AmountA },
        "bundleEscrow",
      );
      
      await aliceClient.erc721.approve(
        { address: erc721TokenA, id: aliceErc721Id },
        "bundleEscrow",
      );
      
      await aliceClient.erc1155.approveAll(erc1155TokenA, "bundleEscrow");
      console.debug("ALICE: Tokens approved for escrow");

      console.debug("ALICE: Creating buy attestation with short expiration...");
      const { attested: buyAttestation } = 
        await aliceClient.bundle.buyBundleForBundle(
          aliceBundle,
          bobBundle,
          alice,
          shortExpiration,
        );
      console.debug(
        `ALICE: Buy attestation created with UID: ${buyAttestation.uid}`,
      );

      // Advance blockchain time to after expiration
      console.debug("Advancing blockchain time past expiration...");
      await testClient.increaseTime({ seconds: 120 }); // Advance 120 seconds
      console.debug("Blockchain time advanced");

      // Check balances before collecting
      const escrowErc721Owner = await testClient.getERC721Owner(
        { address: erc721TokenA, id: aliceErc721Id }
      );
      
      const initialErc20Balance = await testClient.getERC20Balance(
        { address: erc20TokenA, value: 0n },
        alice
      );
      
      const initialErc1155Balance = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA, value: 0n },
        alice
      );
      
      expect(compareAddresses(escrowErc721Owner, localAddresses.tokenBundleEscrowObligation)).toBe(true);

      // Alice collects her expired escrow
      console.debug("ALICE: Collecting expired escrow...");
      await aliceClient.bundle.collectExpired(buyAttestation.uid);
      console.debug("ALICE: Expired escrow collected");

      // Verify Alice got her tokens back
      const finalErc20Balance = await testClient.getERC20Balance(
        { address: erc20TokenA, value: 0n },
        alice
      );

      const finalErc721Owner = await testClient.getERC721Owner(
        { address: erc721TokenA, id: aliceErc721Id }
      );

      const finalErc1155Balance = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA, value: 0n },
        alice
      );

      expect(compareAddresses(finalErc721Owner, alice)).toBe(true);
      expect(finalErc1155Balance - initialErc1155Balance).toBe(erc1155TokenAmountA);
      expect(finalErc20Balance - initialErc20Balance).toBe(erc20AmountA);
      console.debug("testCollectExpired test completed successfully");
    });
  });
});