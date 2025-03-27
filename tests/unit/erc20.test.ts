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
import ERC20BarterCrossToken from "@contracts/ERC20BarterCrossToken.json";

// Import implementation contracts from fixtures
// These are needed because they have bytecode for deployment (interfaces don't)
import EAS from "../fixtures/EAS.json";
import SchemaRegistry from "../fixtures/SchemaRegistry.json";
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";

describe("ERC20 Tests", () => {
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
  let erc20TokenA: `0x${string}`;
  let erc20TokenB: `0x${string}`;
  let askErc721Token: `0x${string}`;
  let askErc1155Token: `0x${string}`;

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

    // Deploy the additional obligation contracts needed for ERC20BarterCrossToken

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

    // Deploy ERC20BarterCrossToken which extends ERC20BarterUtils

    const erc20BarterUtilsHash = await testClient.deployContract({
      abi: ERC20BarterCrossToken.abi,
      bytecode: ERC20BarterCrossToken.bytecode.object as `0x${string}`,
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

    const erc20BarterUtilsReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20BarterUtilsHash,
    });

    localAddresses.erc20BarterUtils =
      erc20BarterUtilsReceipt.contractAddress as `0x${string}`;

    // Deploy mock tokens

    const erc20TokenAHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token A", "TKA"],
    });

    const erc20TokenBHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token B", "TKB"],
    });

    const askErc721TokenHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });

    const askErc1155TokenHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });

    // Get contract addresses

    const erc20TokenAReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenAHash,
    });

    const erc20TokenBReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenBHash,
    });

    const askErc721TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: askErc721TokenHash,
    });

    const askErc1155TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: askErc1155TokenHash,
    });

    erc20TokenA = erc20TokenAReceipt.contractAddress as `0x${string}`;
    erc20TokenB = erc20TokenBReceipt.contractAddress as `0x${string}`;
    askErc721Token = askErc721TokenReceipt.contractAddress as `0x${string}`;
    askErc1155Token = askErc1155TokenReceipt.contractAddress as `0x${string}`;

    // Transfer tokens to Alice and Bob like in Solidity tests

    await testClient.writeContract({
      address: erc20TokenA,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [alice, parseEther("1000")],
    });

    await testClient.writeContract({
      address: erc20TokenB,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [bob, parseEther("1000")],
    });

    // Mint NFTs to Bob

    await testClient.writeContract({
      address: askErc721Token,
      abi: MockERC721.abi,
      functionName: "mint",
      args: [bob],
    });

    await testClient.writeContract({
      address: askErc1155Token,
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
    //
    // await anvil.stop();
    await $`pkill anvil`;
    //
  });

  describe("ERC20BarterUtils", () => {
    test("testBuyErc20ForErc20", async () => {
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and buys ERC20 for ERC20

      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        "escrow",
      );

      const { attested } = await aliceClient.erc20.buyErc20ForErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: erc20TokenB, value: askAmount },
        expiration,
      );

      // Assert the attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPermitAndBuyErc20ForErc20", async () => {
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and buys ERC20 for ERC20
      const { attested } = await aliceClient.erc20.permitAndBuyErc20ForErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: erc20TokenB, value: askAmount },
        expiration,
      );

      // Assert the attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPermitAndBuyWithErc20", async () => {
      const amount = parseEther("100");
      const arbiter = getAddress(bob); // Using Bob as the arbiter like in Solidity tests
      const demand =
        `0x${Buffer.from("test demand").toString("hex")}` as `0x${string}`;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and creates custom demand escrow
      const { attested } = await aliceClient.erc20.permitAndBuyWithErc20(
        { address: erc20TokenA, value: amount },
        { arbiter, demand },
        expiration,
      );

      // Assert the escrow attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPermitAndPayWithErc20", async () => {
      const amount = parseEther("100");

      // Alice uses permit and makes direct payment to Bob
      const { attested } = await aliceClient.erc20.permitAndPayWithErc20(
        { address: erc20TokenA, value: amount },
        bob,
      );

      // Assert the payment attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPayErc20ForErc20", async () => {
      // First create a buy attestation
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow

      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        "escrow",
      );

      const { attested: buyAttestation } =
        await aliceClient.erc20.buyErc20ForErc20(
          { address: erc20TokenA, value: bidAmount },
          { address: erc20TokenB, value: askAmount },
          expiration,
        );

      // Bob approves and fulfills the escrow
      // Check balances before the exchange
      const bobInitialBalanceA = await testClient.getERC20Balance(
        { address: erc20TokenA },
        bob,
      );

      const aliceInitialBalanceB = await testClient.getERC20Balance(
        { address: erc20TokenB },
        alice,
      );

      await bobClient.erc20.approve(
        { address: erc20TokenB, value: askAmount },
        "payment",
      );

      const { attested: sellAttestation } =
        await bobClient.erc20.payErc20ForErc20(buyAttestation.uid);

      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers

      const bobFinalBalanceA = await testClient.getERC20Balance(
        { address: erc20TokenA },
        bob,
      );

      const aliceFinalBalanceB = await testClient.getERC20Balance(
        { address: erc20TokenB },
        alice,
      );

      // Verify token transfers by checking the difference
      expect(bobFinalBalanceA - bobInitialBalanceA).toBe(bidAmount);
      expect(aliceFinalBalanceB - aliceInitialBalanceB).toBe(askAmount);
    });

    test("testPermitAndPayErc20ForErc20", async () => {
      // First create a buy attestation
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        "escrow",
      );

      const { attested: buyAttestation } =
        await aliceClient.erc20.buyErc20ForErc20(
          { address: erc20TokenA, value: bidAmount },
          { address: erc20TokenB, value: askAmount },
          expiration,
        );

      // Check balances before the exchange
      const bobInitialBalanceA = await testClient.getERC20Balance(
        { address: erc20TokenA },
        bob,
      );

      const aliceInitialBalanceB = await testClient.getERC20Balance(
        { address: erc20TokenB },
        alice,
      );

      // Bob uses permit and fulfills the escrow
      const { attested: sellAttestation } =
        await bobClient.erc20.permitAndPayErc20ForErc20(buyAttestation.uid);

      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const bobFinalBalanceA = await testClient.getERC20Balance(
        { address: erc20TokenA },
        bob,
      );

      const aliceFinalBalanceB = await testClient.getERC20Balance(
        { address: erc20TokenB },
        alice,
      );

      // Verify token transfers by checking the difference
      expect(bobFinalBalanceA - bobInitialBalanceA).toBe(bidAmount);
      expect(aliceFinalBalanceB - aliceInitialBalanceB).toBe(askAmount);
    });
  });

  describe("ERC20BarterCrossToken", () => {
    test("testBuyErc721WithErc20", async () => {
      const bidAmount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow for ERC721
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        "escrow",
      );

      const { attested } = await aliceClient.erc20.buyErc721WithErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: askErc721Token, id: erc721TokenId },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPermitAndBuyERC721WithERC20", async () => {
      const bidAmount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and creates an escrow for ERC721
      const { attested } = await aliceClient.erc20.permitAndBuyErc721WithErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: askErc721Token, id: erc721TokenId },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testBuyERC1155WithERC20", async () => {
      const bidAmount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow for ERC1155
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        "escrow",
      );

      const { attested } = await aliceClient.erc20.buyErc1155WithErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: askErc1155Token, id: tokenId, value: amount },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPermitAndBuyERC1155WithERC20", async () => {
      const bidAmount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and creates an escrow for ERC1155
      const { attested } = await aliceClient.erc20.permitAndBuyErc1155WithErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: askErc1155Token, id: tokenId, value: amount },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testBuyBundleWithERC20", async () => {
      const bidAmount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create token bundle
      const bundle = {
        erc20s: [{ address: erc20TokenB, value: parseEther("5") }],
        erc721s: [{ address: askErc721Token, id: 1n }],
        erc1155s: [{ address: askErc1155Token, id: 1n, value: 20n }],
      };

      // Alice approves tokens for token bundle escrow
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        "escrow",
      );

      const { attested } = await aliceClient.erc20.buyBundleWithErc20(
        { address: erc20TokenA, value: bidAmount },
        bundle,
        bob,
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPermitAndBuyBundleWithErc20", async () => {
      const bidAmount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create token bundle
      const bundle = {
        erc20s: [{ address: erc20TokenB, value: parseEther("5") }],
        erc721s: [{ address: askErc721Token, id: 1n }],
        erc1155s: [{ address: askErc1155Token, id: 1n, value: 20n }],
      };

      // Alice uses permit and creates an escrow for token bundle
      const { attested } = await aliceClient.erc20.permitAndBuyBundleWithErc20(
        { address: erc20TokenA, value: bidAmount },
        bundle,
        bob,
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });
  });
});
