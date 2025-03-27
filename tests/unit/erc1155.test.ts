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
    

    // Deploy ERC1155BarterCrossToken which extends ERC1155BarterUtils
    
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
    

    
    const erc1155BarterUtilsReceipt =
      await testClient.waitForTransactionReceipt({
        hash: erc1155BarterUtilsHash,
      });
    

    localAddresses.erc1155BarterUtils =
      erc1155BarterUtilsReceipt.contractAddress as `0x${string}`;
    

    // Deploy mock tokens
    
    const erc20TokenHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Test Token", "TEST"],
    });
    

    
    const erc721TokenHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });
    

    
    const aliceErc1155TokenHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });
    

    
    const bobErc1155TokenHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });
    

    // Get contract addresses
    
    const erc20TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenHash,
    });
    

    
    const erc721TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: erc721TokenHash,
    });
    

    
    const aliceErc1155TokenReceipt = await testClient.waitForTransactionReceipt(
      {
        hash: aliceErc1155TokenHash,
      },
    );
    

    
    const bobErc1155TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: bobErc1155TokenHash,
    });
    

    erc20Token = erc20TokenReceipt.contractAddress as `0x${string}`;
    erc721Token = erc721TokenReceipt.contractAddress as `0x${string}`;
    aliceErc1155Token =
      aliceErc1155TokenReceipt.contractAddress as `0x${string}`;
    bobErc1155Token = bobErc1155TokenReceipt.contractAddress as `0x${string}`;
    

    // Transfer and mint tokens to Alice and Bob
    
    await testClient.writeContract({
      address: erc20Token,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [bob, parseEther("500")],
    });
    

    // Mint NFT for Bob
    
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
    

    // Mint ERC1155 tokens
    
    await testClient.writeContract({
      address: aliceErc1155Token,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [alice, aliceErc1155TokenId, aliceErc1155Amount],
    });
    

    
    await testClient.writeContract({
      address: bobErc1155Token,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [bob, bobErc1155TokenId, bobErc1155Amount],
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

  describe("ERC1155BarterUtils", () => {
    test("testBuyErc20WithErc1155", async () => {
      
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("500");
      

      // Check initial balances
      const initialEscrowBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        localAddresses.erc1155EscrowObligation,
      );

      const initialAliceBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        alice,
      );

      // Alice approves and creates an escrow to trade her ERC1155 for Bob's ERC20
      
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      

      
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
      

      // Assert the attestation was created
      expect(buyAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's tokens are now in escrow
      const finalEscrowBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        localAddresses.erc1155EscrowObligation,
      );

      const finalAliceBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        alice,
      );

      // Verify the correct amount was escrowed
      expect(finalEscrowBalance - initialEscrowBalance).toBe(
        aliceErc1155Amount,
      );
      expect(initialAliceBalance - finalAliceBalance).toBe(aliceErc1155Amount);
      expect(finalAliceBalance).toBe(0n);
      
    });

    test("testPayErc1155ForErc20", async () => {
      
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("500");

      // First, create a buy attestation
      
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");

      
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
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        bob,
      );

      const aliceInitialBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token },
        alice,
      );

      // Bob approves and fulfills the trade
      
      await bobClient.erc20.approve(
        { address: erc20Token, value: erc20Amount },
        "payment",
      );
      

      
      const { attested: payAttestation } =
        await bobClient.erc1155.payErc1155ForErc20(buyAttestation.uid);
      

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token balances after the exchange
      const bobFinalBalanceErc1155 = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        bob,
      );

      const aliceFinalBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token },
        alice,
      );

      // Verify token transfers
      expect(bobFinalBalanceErc1155).toBe(
        bobInitialBalanceErc1155 + aliceErc1155Amount,
      );
      expect(aliceFinalBalanceErc20).toBe(
        aliceInitialBalanceErc20 + erc20Amount,
      );
      
    });

    test("testBuyErc721WithErc1155", async () => {
      
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Check initial balances
      const initialEscrowBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        localAddresses.erc1155EscrowObligation,
      );

      const initialAliceBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        alice,
      );

      // Alice approves and creates an escrow to trade her ERC1155 for Bob's ERC721
      
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      

      
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
      

      // Assert the attestation was created
      expect(buyAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's tokens are now in escrow
      const finalEscrowBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        localAddresses.erc1155EscrowObligation,
      );

      const finalAliceBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        alice,
      );

      // Verify the correct amount was escrowed
      expect(finalEscrowBalance - initialEscrowBalance).toBe(
        aliceErc1155Amount,
      );
      expect(initialAliceBalance - finalAliceBalance).toBe(aliceErc1155Amount);
      expect(finalAliceBalance).toBe(0n);
      
    });

    test("testPayErc1155ForErc721", async () => {
      
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First, create a buy attestation
      
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");

      
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
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        bob,
      );

      const erc721Owner = await testClient.getERC721Owner({
        address: erc721Token,
        id: erc721TokenId,
      });

      expect(compareAddresses(erc721Owner, bob)).toBe(true);

      // Bob approves and fulfills the trade
      
      await bobClient.erc721.approve(
        { address: erc721Token, id: erc721TokenId },
        "payment",
      );
      

      
      const { attested: payAttestation } =
        await bobClient.erc1155.payErc1155ForErc721(buyAttestation.uid);
      

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers after the exchange
      const bobFinalBalanceErc1155 = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
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
      
    });

    test("testBuyBundleWithErc1155", async () => {
      
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("250"); // Half of Bob's ERC20 amount

      // Check initial balances
      const initialEscrowBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        localAddresses.erc1155EscrowObligation,
      );

      const initialAliceBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
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
      
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      

      
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
      

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's tokens are now in escrow
      const finalEscrowBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        localAddresses.erc1155EscrowObligation,
      );

      const finalAliceBalance = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        alice,
      );

      // Verify the correct amount was escrowed
      expect(finalEscrowBalance - initialEscrowBalance).toBe(
        aliceErc1155Amount,
      );
      expect(initialAliceBalance - finalAliceBalance).toBe(aliceErc1155Amount);
      expect(finalAliceBalance).toBe(0n);
      
    });

    test("testPayErc1155ForBundle", async () => {
      
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("250"); // Half of Bob's ERC20 amount
      const bobErc1155HalfAmount = bobErc1155Amount / 2n;

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getERC20Balance(
        { address: erc20Token },
        alice,
      );
      const aliceInitialBalanceErc1155 = await testClient.getERC1155Balance(
        {
          address: bobErc1155Token,
          id: bobErc1155TokenId,
        },
        alice,
      );
      const bobInitialBalanceErc1155 = await testClient.getERC1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
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
      
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      

      
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
      

      // Bob approves his tokens using bundle.approve
      
      const bobPaymentBundle = {
        erc20s: [{ address: erc20Token, value: erc20Amount }],
        erc721s: [{ address: erc721Token, id: erc721TokenId }],
        erc1155s: [{ address: bobErc1155Token, id: bobErc1155TokenId, value: bobErc1155Amount }],
      };
      await bobClient.bundle.approve(bobPaymentBundle, "payment");

      
      const { attested: payAttestation } =
        await bobClient.erc1155.payErc1155ForBundle(buyAttestation.uid);
      

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
        {
          address: bobErc1155Token,
          id: bobErc1155TokenId,
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
          id: aliceErc1155TokenId,
        },
        bob,
      );

      // Verify transfers
      expect(compareAddresses(aliceOwnsToken, alice)).toBe(true);
      expect(aliceFinalBalanceErc20 - aliceInitialBalanceErc20).toBe(
        erc20Amount,
      );
      expect(aliceFinalBalanceErc1155 - aliceInitialBalanceErc1155).toBe(
        bobErc1155HalfAmount,
      );

      expect(bobErc1155Balance - bobInitialBalanceErc1155).toBe(
        aliceErc1155Amount,
      );
      
    });

    test("testCollectExpired", async () => {
      
      const currentTime = Math.floor(Date.now() / 1000);
      const shortExpiration = BigInt(currentTime + 60); // 60 seconds from now

      // Alice approves and creates an escrow
      
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "escrow");
      

      
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
      

      // Advance blockchain time to after expiration
      
      await testClient.increaseTime({ seconds: 120 }); // Advance 120 seconds
      

      // Alice collects her expired escrow
      
      await aliceClient.erc1155.collectExpired(buyAttestation.uid);
      

      // Verify Alice got her tokens back
      const aliceBalance = await testClient.getERC1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        alice,
      );

      expect(aliceBalance).toBe(aliceErc1155Amount);
      
    });
  });
});
