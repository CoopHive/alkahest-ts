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
  createTokenTestExtension,
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
    

    // Deploy TokenBundleBarterUtils
    
    const tokenBundleBarterUtilsHash = await testClient.deployContract({
      abi: TokenBundleBarterUtils.abi,
      bytecode: TokenBundleBarterUtils.bytecode.object as `0x${string}`,
      args: [
        localAddresses.eas,
        localAddresses.tokenBundleEscrowObligation,
        localAddresses.tokenBundlePaymentObligation,
      ],
    });
    

    
    const tokenBundleBarterUtilsReceipt =
      await testClient.waitForTransactionReceipt({
        hash: tokenBundleBarterUtilsHash,
      });
    

    localAddresses.tokenBundleBarterUtils =
      tokenBundleBarterUtilsReceipt.contractAddress as `0x${string}`;
    

    // Deploy mock tokens
    
    const erc20TokenAHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token A", "TKNA"],
    });
    

    
    const erc20TokenBHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token B", "TKNB"],
    });
    

    
    const erc721TokenAHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });
    

    
    const erc721TokenBHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });
    

    
    const erc1155TokenAHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });
    

    
    const erc1155TokenBHash = await testClient.deployContract({
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
    

    erc20TokenA = erc20TokenAReceipt.contractAddress as `0x${string}`;
    erc20TokenB = erc20TokenBReceipt.contractAddress as `0x${string}`;
    erc721TokenA = erc721TokenAReceipt.contractAddress as `0x${string}`;
    erc721TokenB = erc721TokenBReceipt.contractAddress as `0x${string}`;
    erc1155TokenA = erc1155TokenAReceipt.contractAddress as `0x${string}`;
    erc1155TokenB = erc1155TokenBReceipt.contractAddress as `0x${string}`;
    

    // Transfer and mint tokens to Alice and Bob
    
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
    

    // Mint NFTs
    
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
    

    // Mint ERC1155 tokens
    
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
      
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create bundles
      const aliceBundle = createAliceBundle();
      const bobBundle = createBobBundle();

      // Check initial balances
      const initialErc20ABalanceEscrow = await testClient.getERC20Balance(
        { address: erc20TokenA },
        localAddresses.tokenBundleEscrowObligation,
      );

      const initialErc721AOwner = await testClient.getERC721Owner({
        address: erc721TokenA,
        id: aliceErc721Id,
      });

      const initialErc1155ABalanceEscrow = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA },
        localAddresses.tokenBundleEscrowObligation,
      );

      // Alice approves tokens using bundle.approve
      
      await aliceClient.bundle.approve(aliceBundle, "escrow");
      

      // Alice creates buy attestation
      
      const { attested: buyAttestation } =
        await aliceClient.bundle.buyBundleForBundle(
          aliceBundle,
          bobBundle,
          expiration,
        );
      

      // Assert the attestation was created
      expect(buyAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's tokens are now in escrow
      const finalErc20ABalanceEscrow = await testClient.getERC20Balance(
        { address: erc20TokenA },
        localAddresses.tokenBundleEscrowObligation,
      );

      const finalErc721AOwner = await testClient.getERC721Owner({
        address: erc721TokenA,
        id: aliceErc721Id,
      });

      const finalErc1155ABalanceEscrow = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA },
        localAddresses.tokenBundleEscrowObligation,
      );

      // Verify tokens were escrowed
      expect(finalErc20ABalanceEscrow - initialErc20ABalanceEscrow).toBe(
        erc20AmountA,
      );
      expect(
        compareAddresses(
          finalErc721AOwner,
          localAddresses.tokenBundleEscrowObligation,
        ),
      ).toBe(true);
      expect(finalErc1155ABalanceEscrow - initialErc1155ABalanceEscrow).toBe(
        erc1155TokenAmountA,
      );

      
    });

    test("testPayBundleForBundle", async () => {
      
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create bundles
      const aliceBundle = createAliceBundle();
      const bobBundle = createBobBundle();

      // Alice approves and creates escrow
      
      await aliceClient.bundle.approve(aliceBundle, "escrow");
      

      
      const { attested: buyAttestation } =
        await aliceClient.bundle.buyBundleForBundle(
          aliceBundle,
          bobBundle,
          expiration,
        );
      

      // Check balances before fulfillment
      const aliceInitialErc20BBalance = await testClient.getERC20Balance(
        { address: erc20TokenB },
        alice,
      );

      const bobInitialErc20ABalance = await testClient.getERC20Balance(
        { address: erc20TokenA },
        bob,
      );

      const aliceInitialErc1155BBalance = await testClient.getERC1155Balance(
        { address: erc1155TokenB, id: erc1155TokenIdB },
        alice,
      );

      const bobInitialErc1155ABalance = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA },
        bob,
      );

      // Bob approves his tokens using bundle.approve
      
      await bobClient.bundle.approve(bobBundle, "payment");
      

      // Bob fulfills Alice's order
      
      const { attested: payAttestation } =
        await bobClient.bundle.payBundleForBundle(buyAttestation.uid);
      

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check balances after fulfillment
      const aliceFinalErc20BBalance = await testClient.getERC20Balance(
        { address: erc20TokenB },
        alice,
      );

      const bobFinalErc20ABalance = await testClient.getERC20Balance(
        { address: erc20TokenA },
        bob,
      );

      const aliceFinalErc1155BBalance = await testClient.getERC1155Balance(
        { address: erc1155TokenB, id: erc1155TokenIdB },
        alice,
      );

      const bobFinalErc1155ABalance = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA },
        bob,
      );

      const aliceErc721BOwner = await testClient.getERC721Owner({
        address: erc721TokenB,
        id: bobErc721Id,
      });

      const bobErc721AOwner = await testClient.getERC721Owner({
        address: erc721TokenA,
        id: aliceErc721Id,
      });

      // Verify token transfers
      // Alice receives Bob's tokens
      expect(aliceFinalErc20BBalance - aliceInitialErc20BBalance).toBe(
        erc20AmountB,
      );
      expect(compareAddresses(aliceErc721BOwner, alice)).toBe(true);
      expect(aliceFinalErc1155BBalance - aliceInitialErc1155BBalance).toBe(
        erc1155TokenAmountB,
      );

      // Bob receives Alice's tokens
      expect(bobFinalErc20ABalance - bobInitialErc20ABalance).toBe(
        erc20AmountA,
      );
      expect(compareAddresses(bobErc721AOwner, bob)).toBe(true);
      expect(bobFinalErc1155ABalance - bobInitialErc1155ABalance).toBe(
        erc1155TokenAmountA,
      );

      
    });

    test("testCollectExpired", async () => {
      
      const shortExpiration = BigInt(Math.floor(Date.now() / 1000) + 60); // 60 seconds from now

      // Create bundles
      const aliceBundle = createAliceBundle();
      const bobBundle = createBobBundle();

      // Alice approves and creates escrow
      
      await aliceClient.bundle.approve(aliceBundle, "escrow");
      

      
      const { attested: buyAttestation } =
        await aliceClient.bundle.buyBundleForBundle(
          aliceBundle,
          bobBundle,
          shortExpiration,
        );
      

      // Advance blockchain time to after expiration
      
      await testClient.increaseTime({ seconds: 120 }); // Advance 120 seconds
      

      // Check balances before collecting
      const escrowErc721Owner = await testClient.getERC721Owner({
        address: erc721TokenA,
        id: aliceErc721Id,
      });

      const initialErc20Balance = await testClient.getERC20Balance(
        { address: erc20TokenA },
        alice,
      );

      const initialErc1155Balance = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA },
        alice,
      );

      expect(
        compareAddresses(
          escrowErc721Owner,
          localAddresses.tokenBundleEscrowObligation,
        ),
      ).toBe(true);

      // Alice collects her expired escrow
      
      await aliceClient.bundle.collectExpired(buyAttestation.uid);
      

      // Verify Alice got her tokens back
      const finalErc20Balance = await testClient.getERC20Balance(
        { address: erc20TokenA },
        alice,
      );

      const finalErc721Owner = await testClient.getERC721Owner({
        address: erc721TokenA,
        id: aliceErc721Id,
      });

      const finalErc1155Balance = await testClient.getERC1155Balance(
        { address: erc1155TokenA, id: erc1155TokenIdA },
        alice,
      );

      expect(compareAddresses(finalErc721Owner, alice)).toBe(true);
      expect(finalErc1155Balance - initialErc1155Balance).toBe(
        erc1155TokenAmountA,
      );
      expect(finalErc20Balance - initialErc20Balance).toBe(erc20AmountA);
      
    });
  });
});
