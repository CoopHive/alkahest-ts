import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { createAnvil } from "@viem/anvil";
import {
  createWalletClient,
  createTestClient,
  http,
  publicActions,
  walletActions,
  parseEther,
  nonceManager,
  type PublicActions,
  type WalletActions,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";

describe("Viem Client Basic Functionality", () => {
  let anvil: Awaited<ReturnType<typeof createAnvil>>;
  let testClient: ReturnType<typeof createTestClient>;
  let walletClient: ReturnType<typeof createWalletClient> & PublicActions & WalletActions;
  let account: ReturnType<typeof privateKeyToAccount>;

  beforeAll(async () => {
    // Start Anvil instance
    anvil = createAnvil({
      port: 8546, // Use a different port to avoid conflicts
    });
    await anvil.start();

    const chain = foundry;
    const transport = http("http://127.0.0.1:8546", {
      timeout: 60_000,
    });

    // Create test account
    account = privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    });

    // Create test client for contract operations
    testClient = createTestClient({
      mode: "anvil",
      account: privateKeyToAccount(generatePrivateKey(), {
        nonceManager,
      }),
      chain,
      transport,
    })
      .extend(walletActions)
      .extend(publicActions);

    // Create wallet client for the test account
    walletClient = createWalletClient({
      account,
      chain,
      transport,
      pollingInterval: 1000,
    })
      .extend(publicActions)
      .extend(walletActions);

    // Fund the test account with ETH
    await testClient.setBalance({
      address: account.address,
      value: parseEther("10"),
    });
  });

  afterAll(async () => {
    // Clean up Anvil instance
    await anvil.stop();
  });

  // Use test.only() to run only this test, comment out others
  test("should connect to Anvil and get chain info", async () => {
    const chainId = await walletClient.getChainId();
    expect(chainId).toBe(31337); // Anvil default chain ID
    console.log(`Connected to Anvil chain ID: ${chainId}`);
  });

  test("should have funded account with ETH", async () => {
    const balance = await walletClient.getBalance({
      address: account.address,
    });
    
    expect(balance).toBeGreaterThan(0n);
    expect(balance).toBe(parseEther("10"));
    console.log(`Account balance: ${balance} wei`);
  });

  test("should be able to get block number", async () => {
    const blockNumber = await walletClient.getBlockNumber();
    expect(typeof blockNumber).toBe("bigint");
    expect(blockNumber).toBeGreaterThanOrEqual(0n);
  });

  test("should be able to send a transaction", async () => {
    const recipient = privateKeyToAccount(generatePrivateKey()).address;
    
    // Fund recipient first
    await testClient.setBalance({
      address: recipient,
      value: parseEther("1"),
    });

    const initialBalance = await walletClient.getBalance({
      address: recipient,
    });

    // Send transaction
    const hash = await walletClient.sendTransaction({
      account,
      to: recipient,
      value: parseEther("1"),
      chain: foundry,
    });

    expect(hash).toMatch(/^0x[a-fA-F0-9]{64}$/);

    // Wait for transaction to be mined
    const receipt = await walletClient.waitForTransactionReceipt({ hash });
    expect(receipt.status).toBe("success");

    // Check balance changed
    const finalBalance = await walletClient.getBalance({
      address: recipient,
    });

    expect(finalBalance).toBe(initialBalance + parseEther("1"));
  });

  test("should be able to get gas price", async () => {
    const gasPrice = await walletClient.getGasPrice();
    expect(typeof gasPrice).toBe("bigint");
    expect(gasPrice).toBeGreaterThan(0n);
  });

  test("should be able to estimate gas", async () => {
    const recipient = privateKeyToAccount(generatePrivateKey()).address;
    
    const gasEstimate = await walletClient.estimateGas({
      account: account.address,
      to: recipient,
      value: parseEther("0.1"),
    });

    expect(typeof gasEstimate).toBe("bigint");
    expect(gasEstimate).toBeGreaterThan(0n);
  });

  test("should be able to get latest block", async () => {
    const block = await walletClient.getBlock({ blockTag: "latest" });
    
    expect(block).toBeDefined();
    expect(typeof block.number).toBe("bigint");
    expect(typeof block.timestamp).toBe("bigint");
    expect(block.hash).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });
});