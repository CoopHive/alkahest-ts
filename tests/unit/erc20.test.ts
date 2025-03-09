import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { makeClient } from "../../src";
import { createAnvil } from "@viem/anvil";
import { 
  createWalletClient, 
  createPublicClient,
  http, 
  createTestClient,
  publicActions,
  walletActions,
  parseEther,
  getAddress
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";
import { contractAddresses } from "../../src/config";

// Import contract artifacts from the fixtures directory
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";

// Constants from the Solidity tests - using hardhat default keys instead
const ALICE_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" as const;
const BOB_PRIVATE_KEY = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d" as const;

describe("ERC20 Tests", () => {
  // Anvil instance
  const anvil = createAnvil();
  
  // Client instances
  let aliceClient: ReturnType<typeof makeClient>;
  let bobClient: ReturnType<typeof makeClient>;
  let testClient: ReturnType<typeof createPublicClient>;
  
  // Addresses
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  
  // Contract instances
  let erc20TokenA: `0x${string}`;
  let erc20TokenB: `0x${string}`;
  let askErc721Token: `0x${string}`;
  let askErc1155Token: `0x${string}`;
  
  beforeAll(async () => {
    // Start anvil
    await anvil.start();
    
    // Setup accounts like in Solidity tests
    const aliceAccount = privateKeyToAccount(ALICE_PRIVATE_KEY);
    const bobAccount = privateKeyToAccount(BOB_PRIVATE_KEY);
    
    alice = aliceAccount.address;
    bob = bobAccount.address;
    
    // Create test client with wallet and public actions
    const transport = http();
    const client = createPublicClient({
      chain: foundry,
      transport,
    }).extend(walletActions);
    
    testClient = client;
    
    // Create wallet clients for Alice and Bob
    const aliceWalletClient = createWalletClient({
      account: aliceAccount,
      chain: foundry,
      transport,
    }).extend(publicActions);
    
    const bobWalletClient = createWalletClient({
      account: bobAccount,
      chain: foundry,
      transport,
    }).extend(publicActions);
    
    // Deploy mock tokens
    const erc20TokenAHash = await client.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token A", "TKA"],
      account: aliceAccount,
    });
    
    const erc20TokenBHash = await client.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token B", "TKB"],
      account: aliceAccount,
    });
    
    const askErc721TokenHash = await client.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
      account: aliceAccount,
    });
    
    const askErc1155TokenHash = await client.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
      account: aliceAccount,
    });
    
    // Get contract addresses
    const erc20TokenAReceipt = await client.waitForTransactionReceipt({ hash: erc20TokenAHash });
    const erc20TokenBReceipt = await client.waitForTransactionReceipt({ hash: erc20TokenBHash });
    const askErc721TokenReceipt = await client.waitForTransactionReceipt({ hash: askErc721TokenHash });
    const askErc1155TokenReceipt = await client.waitForTransactionReceipt({ hash: askErc1155TokenHash });
    
    erc20TokenA = erc20TokenAReceipt.contractAddress as `0x${string}`;
    erc20TokenB = erc20TokenBReceipt.contractAddress as `0x${string}`;
    askErc721Token = askErc721TokenReceipt.contractAddress as `0x${string}`;
    askErc1155Token = askErc1155TokenReceipt.contractAddress as `0x${string}`;
    
    // Transfer tokens to Alice and Bob like in Solidity tests
    await client.writeContract({
      address: erc20TokenA,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [alice, parseEther("1000")],
      account: aliceAccount,
    });
    
    await client.writeContract({
      address: erc20TokenB,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [bob, parseEther("1000")],
      account: aliceAccount,
    });
    
    // Mint NFTs to Bob
    await client.writeContract({
      address: askErc721Token,
      abi: MockERC721.abi,
      functionName: "mint",
      args: [bob],
      account: aliceAccount,
    });
    
    await client.writeContract({
      address: askErc1155Token,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [bob, 1n, 100n],
      account: aliceAccount,
    });
    
    // Create Alkahest clients with the correct contract addresses
    // Replace the contract addresses in the config with our deployed contracts
    const testAddresses = { 
      ...contractAddresses.anvil,
      usdc: erc20TokenA,
      eurc: erc20TokenB,
    };
    
    // Create clients with correct config
    aliceClient = makeClient(aliceWalletClient, testAddresses);
    bobClient = makeClient(bobWalletClient, testAddresses);
  });
  
  afterAll(async () => {
    try {
      await anvil.stop();
      // Give anvil some time to shut down completely
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error stopping anvil:', error);
    }
  });
  
  describe("ERC20BarterUtils", () => {
    test("testBuyErc20ForErc20", async () => {
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Alice approves and buys ERC20 for ERC20
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses.anvil.erc20EscrowObligation
      );
      
      const { attested } = await aliceClient.erc20.buyErc20ForErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: erc20TokenB, value: askAmount },
        expiration
      );
      
      // Assert the attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    
    test("testPermitAndBuyErc20ForErc20", async () => {
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Alice uses permit and buys ERC20 for ERC20
      const { attested } = await aliceClient.erc20.permitAndBuyErc20ForErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: erc20TokenB, value: askAmount },
        expiration
      );
      
      // Assert the attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    
    test("testPermitAndBuyWithErc20", async () => {
      const amount = parseEther("100");
      const arbiter = getAddress(bob); // Using Bob as the arbiter like in Solidity tests
      const demand = `0x${Buffer.from("test demand").toString("hex")}` as `0x${string}`;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Alice uses permit and creates custom demand escrow
      const { attested } = await aliceClient.erc20.permitAndBuyWithErc20(
        { address: erc20TokenA, value: amount },
        { arbiter, demand },
        expiration
      );
      
      // Assert the escrow attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    
    test("testPermitAndPayWithErc20", async () => {
      const amount = parseEther("100");
      
      // Alice uses permit and makes direct payment to Bob
      const { attested } = await aliceClient.erc20.permitAndPayWithErc20(
        { address: erc20TokenA, value: amount },
        bob
      );
      
      // Assert the payment attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    
    test("testPayErc20ForErc20", async () => {
      // First create a buy attestation
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Alice approves and creates an escrow
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses.anvil.erc20EscrowObligation
      );
      
      const { attested: buyAttestation } = await aliceClient.erc20.buyErc20ForErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: erc20TokenB, value: askAmount },
        expiration
      );
      
      // Bob approves and fulfills the escrow
      await bobClient.erc20.approve(
        { address: erc20TokenB, value: askAmount },
        contractAddresses.anvil.erc20PaymentObligation
      );
      
      const { attested: sellAttestation } = await bobClient.erc20.payErc20ForErc20(
        buyAttestation.uid
      );
      
      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
      
      // Check token transfers
      const bobBalanceA = await testClient.readContract({
        address: erc20TokenA,
        abi: MockERC20Permit.abi,
        functionName: "balanceOf",
        args: [bob],
      });
      
      const aliceBalanceB = await testClient.readContract({
        address: erc20TokenB,
        abi: MockERC20Permit.abi,
        functionName: "balanceOf",
        args: [alice],
      });
      
      // Verify token transfers like in Solidity test
      expect(bobBalanceA).toBe(bidAmount);
      expect(aliceBalanceB).toBe(askAmount);
    });
    
    test("testPermitAndPayErc20ForErc20", async () => {
      // First create a buy attestation
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Alice approves and creates an escrow
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses.anvil.erc20EscrowObligation
      );
      
      const { attested: buyAttestation } = await aliceClient.erc20.buyErc20ForErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: erc20TokenB, value: askAmount },
        expiration
      );
      
      // Bob uses permit and fulfills the escrow
      const { attested: sellAttestation } = await bobClient.erc20.permitAndPayErc20ForErc20(
        buyAttestation.uid
      );
      
      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
      
      // Check token transfers
      const bobBalanceA = await testClient.readContract({
        address: erc20TokenA,
        abi: MockERC20Permit.abi,
        functionName: "balanceOf",
        args: [bob],
      });
      
      const aliceBalanceB = await testClient.readContract({
        address: erc20TokenB,
        abi: MockERC20Permit.abi,
        functionName: "balanceOf",
        args: [alice],
      });
      
      // Verify token transfers like in Solidity test
      expect(bobBalanceA).toBe(bidAmount);
      expect(aliceBalanceB).toBe(askAmount);
    });
  });
  
  describe("ERC20BarterCrossToken", () => {
    test("testBuyERC721WithERC20", async () => {
      const bidAmount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Alice approves and creates an escrow for ERC721
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses.anvil.erc20EscrowObligation
      );
      
      const { attested } = await aliceClient.erc20.buyErc721WithErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: askErc721Token, id: erc721TokenId },
        expiration
      );
      
      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    
    test("testPermitAndBuyERC721WithERC20", async () => {
      const bidAmount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Alice uses permit and creates an escrow for ERC721
      const { attested } = await aliceClient.erc20.permitAndbuyErc721WithErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: askErc721Token, id: erc721TokenId },
        expiration
      );
      
      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    
    test("testBuyERC1155WithERC20", async () => {
      const bidAmount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Alice approves and creates an escrow for ERC1155
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses.anvil.erc20EscrowObligation
      );
      
      const { attested } = await aliceClient.erc20.buyErc1155WithErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: askErc1155Token, id: tokenId, value: amount },
        expiration
      );
      
      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
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
        expiration
      );
      
      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    
    test("testBuyBundleWithERC20", async () => {
      const bidAmount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Create token bundle
      const bundle = {
        erc20s: [{ address: erc20TokenB, value: parseEther("5") }],
        erc721s: [{ address: askErc721Token, id: 1n }],
        erc1155s: [{ address: askErc1155Token, id: 1n, value: 20n }]
      };
      
      // Alice approves and creates an escrow for token bundle
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses.anvil.erc20EscrowObligation
      );
      
      const { attested } = await aliceClient.erc20.buyBundleWithErc20(
        { address: erc20TokenA, value: bidAmount },
        bundle,
        bob,
        expiration
      );
      
      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    
    test("testPermitAndBuyBundleWithERC20", async () => {
      const bidAmount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Create token bundle
      const bundle = {
        erc20s: [{ address: erc20TokenB, value: parseEther("5") }],
        erc721s: [{ address: askErc721Token, id: 1n }],
        erc1155s: [{ address: askErc1155Token, id: 1n, value: 20n }]
      };
      
      // Alice uses permit and creates an escrow for token bundle
      const { attested } = await aliceClient.erc20.permitAndBuyBundleWithErc20(
        { address: erc20TokenA, value: bidAmount },
        bundle,
        bob,
        expiration
      );
      
      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    
    test("testPayErc20ForErc721 - Full Trade Execution", async () => {
      const bidAmount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      
      // Alice approves and creates an escrow for ERC721
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses.anvil.erc20EscrowObligation
      );
      
      const { attested: buyAttestation } = await aliceClient.erc20.buyErc721WithErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: askErc721Token, id: erc721TokenId },
        expiration
      );
      
      // Bob approves ERC721 and fulfills the escrow
      await bobClient.erc721.approve(
        { address: askErc721Token, id: erc721TokenId },
        "escrow" // Use ApprovalPurpose type instead of raw address
      );
      
      const { attested: sellAttestation } = await bobClient.erc20.payErc20ForErc721(
        buyAttestation.uid
      );
      
      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
      
      // Check token transfers
      const erc721Owner = await testClient.readContract({
        address: askErc721Token,
        abi: MockERC721.abi,
        functionName: "ownerOf",
        args: [erc721TokenId],
      });
      
      const bobBalanceA = await testClient.readContract({
        address: erc20TokenA,
        abi: MockERC20Permit.abi,
        functionName: "balanceOf",
        args: [bob],
      });
      
      // Verify transfers
      expect(erc721Owner).toBe(alice);
      expect(bobBalanceA).toBe(bidAmount);
    });
  });
});