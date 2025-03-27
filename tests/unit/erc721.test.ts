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
    // Start anvil
    await anvil.start();

    // Setup accounts like in Solidity tests
    const aliceAccount = privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    });
    const bobAccount = privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    });

    alice = aliceAccount.address;
    bob = bobAccount.address;

    // Create wallet clients for Alice and Bob
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
    const schemaRegistryHash = await testClient.deployContract({
      abi: SchemaRegistry.abi,
      bytecode: SchemaRegistry.bytecode.object as `0x${string}`,
      args: [],
    });

    const schemaRegistryReceipt = await testClient.waitForTransactionReceipt({
      hash: schemaRegistryHash,
    });

    localAddresses.easSchemaRegistry =
      schemaRegistryReceipt.contractAddress as `0x${string}`;

    const easHash = await testClient.deployContract({
      abi: EAS.abi,
      bytecode: EAS.bytecode.object as `0x${string}`,
      args: [localAddresses.easSchemaRegistry],
    });

    const easReceipt = await testClient.waitForTransactionReceipt({
      hash: easHash,
    });

    localAddresses.eas = easReceipt.contractAddress as `0x${string}`;

    // Deploy Obligations
    const erc20EscrowObligationHash = await testClient.deployContract({
      abi: ERC20EscrowObligation.abi,
      bytecode: ERC20EscrowObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });

    const erc20EscrowObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc20EscrowObligationHash,
      });

    localAddresses.erc20EscrowObligation =
      erc20EscrowObligationReceipt.contractAddress as `0x${string}`;

    const erc20PaymentObligationHash = await testClient.deployContract({
      abi: ERC20PaymentObligation.abi,
      bytecode: ERC20PaymentObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });

    const erc20PaymentObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc20PaymentObligationHash,
      });

    localAddresses.erc20PaymentObligation =
      erc20PaymentObligationReceipt.contractAddress as `0x${string}`;

    const erc721EscrowObligationHash = await testClient.deployContract({
      abi: ERC721EscrowObligation.abi,
      bytecode: ERC721EscrowObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });

    const erc721EscrowObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc721EscrowObligationHash,
      });

    localAddresses.erc721EscrowObligation =
      erc721EscrowObligationReceipt.contractAddress as `0x${string}`;

    const erc721PaymentObligationHash = await testClient.deployContract({
      abi: ERC721PaymentObligation.abi,
      bytecode: ERC721PaymentObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });

    const erc721PaymentObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc721PaymentObligationHash,
      });

    localAddresses.erc721PaymentObligation =
      erc721PaymentObligationReceipt.contractAddress as `0x${string}`;

    const erc1155EscrowObligationHash = await testClient.deployContract({
      abi: ERC1155EscrowObligation.abi,
      bytecode: ERC1155EscrowObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });

    const erc1155EscrowObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc1155EscrowObligationHash,
      });

    localAddresses.erc1155EscrowObligation =
      erc1155EscrowObligationReceipt.contractAddress as `0x${string}`;

    const erc1155PaymentObligationHash = await testClient.deployContract({
      abi: ERC1155PaymentObligation.abi,
      bytecode: ERC1155PaymentObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });

    const erc1155PaymentObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc1155PaymentObligationHash,
      });

    localAddresses.erc1155PaymentObligation =
      erc1155PaymentObligationReceipt.contractAddress as `0x${string}`;

    const tokenBundleEscrowObligationHash = await testClient.deployContract({
      abi: TokenBundleEscrowObligation.abi,
      bytecode: TokenBundleEscrowObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });

    const tokenBundleEscrowObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: tokenBundleEscrowObligationHash,
      });

    localAddresses.tokenBundleEscrowObligation =
      tokenBundleEscrowObligationReceipt.contractAddress as `0x${string}`;

    const tokenBundlePaymentObligationHash = await testClient.deployContract({
      abi: TokenBundlePaymentObligation.abi,
      bytecode: TokenBundlePaymentObligation.bytecode.object as `0x${string}`,
      args: [localAddresses.eas, localAddresses.easSchemaRegistry],
    });

    const tokenBundlePaymentObligationReceipt =
      await testClient.waitForTransactionReceipt({
        hash: tokenBundlePaymentObligationHash,
      });

    localAddresses.tokenBundlePaymentObligation =
      tokenBundlePaymentObligationReceipt.contractAddress as `0x${string}`;

    // Deploy ERC721BarterCrossToken which extends ERC721BarterUtils
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

    const erc721BarterUtilsReceipt = await testClient.waitForTransactionReceipt(
      {
        hash: erc721BarterUtilsHash,
      },
    );

    localAddresses.erc721BarterUtils =
      erc721BarterUtilsReceipt.contractAddress as `0x${string}`;

    // Deploy mock tokens
    const erc20TokenHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Test Token", "TEST"],
    });

    const aliceErc721TokenHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });

    const bobErc721TokenHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });

    const erc1155TokenHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });

    // Get contract addresses
    const erc20TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenHash,
    });

    const aliceErc721TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: aliceErc721TokenHash,
    });

    const bobErc721TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: bobErc721TokenHash,
    });

    const erc1155TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: erc1155TokenHash,
    });

    erc20Token = erc20TokenReceipt.contractAddress as `0x${string}`;
    aliceErc721Token = aliceErc721TokenReceipt.contractAddress as `0x${string}`;
    bobErc721Token = bobErc721TokenReceipt.contractAddress as `0x${string}`;
    erc1155Token = erc1155TokenReceipt.contractAddress as `0x${string}`;

    // Transfer and mint tokens to Alice and Bob
    await testClient.writeContract({
      address: erc20Token,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [bob, parseEther("1000")],
    });

    // Mint NFTs
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

    await testClient.writeContract({
      address: erc1155Token,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [bob, 1n, 100n],
    });

    // Create clients with local contract addresses
    aliceClient = makeClient(aliceWalletClient, localAddresses);
    bobClient = makeClient(bobWalletClient, localAddresses);
    anvilInitState = await testClient.dumpState();
  });

  beforeEach(async () => {
    await testClient.loadState({ state: anvilInitState });
  });

  afterAll(async () => {
    await $`pkill anvil`;
  });

  describe("ERC721BarterUtils", () => {
    test("testBuyErc721ForErc721", async () => {
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow to trade her ERC721 for Bob's ERC721
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      const { attested: buyAttestation } =
        await aliceClient.erc721.buyErc721ForErc721(
          { address: aliceErc721Token, id: aliceTokenId },
          { address: bobErc721Token, id: bobTokenId },
          expiration,
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
    });

    test("testPayErc721ForErc721", async () => {
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First, create a buy attestation
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

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

      // Bob approves and fulfills the trade
      await bobClient.erc721.approve(
        { address: bobErc721Token, id: bobTokenId },
        "payment",
      );

      const { hash } = await bobClient.erc721.payErc721ForErc721(
        buyAttestation.uid,
      );

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

      // First create a buy attestation with Bob escrowing ERC20
      console.log("bob approves");
      await bobClient.erc20.approve(
        { address: erc20Token, value: erc20Amount },
        "escrow",
      );

      // Create ERC721 payment statement for Alice's token
      /*
      const erc721PaymentStatement = aliceClient.erc721.encodePaymentStatement(
        { address: aliceErc721Token, id: aliceTokenId },
        bob
      );

      // Create escrow with Bob's ERC20 tokens, demanding Alice's ERC721
      const { attested: buyAttestation } =
        await bobClient.erc20.buyWithErc20(
          { address: erc20Token, value: erc20Amount },
          {
            arbiter: localAddresses.erc721PaymentObligation,
            demand: erc721PaymentStatement
          },
          expiration,
        );
      */

      console.log("bob buys");
      const { attested: buyAttestation } =
        await bobClient.erc20.buyErc721WithErc20(
          { address: erc20Token, value: erc20Amount },
          { address: aliceErc721Token, id: aliceTokenId },
          expiration,
        );
      console.log(`attestation: ${buyAttestation.uid}`);

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: erc20Token },
        alice,
      );

      console.log("alice approves");
      // Alice approves and fulfills the escrow with her ERC721
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "payment",
      );

      console.log("alice pays");
      const { attested: payAttestation } =
        await aliceClient.erc721.payErc721ForErc20(buyAttestation.uid);
      console.log(`pay attestation: ${payAttestation.uid}`);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance(
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

      // First create a buy attestation with Bob escrowing ERC1155
      await bobClient.erc1155.approveAll(erc1155Token, "escrow");

      // Create escrow with Bob's ERC1155 tokens, demanding Alice's ERC721
      const { attested: buyAttestation } =
        await bobClient.erc1155.buyErc721WithErc1155(
          { address: erc1155Token, id: tokenId, value: amount },
          { address: aliceErc721Token, id: aliceTokenId },
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc1155 = await testClient.getERC1155Balance(
        { address: erc1155Token, id: tokenId },
        alice,
      );

      // Alice approves and fulfills the escrow with her ERC721
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "payment",
      );

      const { attested: payAttestation } =
        await aliceClient.erc721.payErc721ForErc1155(buyAttestation.uid);

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

      // Create token bundle that Bob will escrow
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

      // Bob approves his tokens and creates the bundle escrow
      await bobClient.bundle.approve(bundle, "escrow");

      // Create ERC721 payment statement for Alice's token
      const erc721PaymentStatement = aliceClient.erc721.encodePaymentStatement(
        { address: aliceErc721Token, id: aliceTokenId },
        bob,
      );

      // Bob creates bundle escrow demanding Alice's ERC721
      const { attested: buyAttestation } = await bobClient.bundle.buyWithBundle(
        bundle,
        {
          arbiter: localAddresses.erc721PaymentObligation,
          demand: erc721PaymentStatement,
        },
        expiration,
      );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: erc20Token },
        alice,
      );

      const aliceInitialBalanceErc1155 = await testClient.getERC1155Balance(
        { address: erc1155Token, id: erc1155TokenId },
        alice,
      );

      // Alice approves her ERC721 token for payment
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "payment",
      );

      // Alice fulfills the bundle escrow with her ERC721
      const { attested: payAttestation } =
        await aliceClient.erc721.payErc721ForBundle(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance(
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
