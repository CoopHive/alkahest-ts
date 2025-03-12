import { afterAll, beforeAll, describe, expect, test } from "bun:test";
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
import { baseSepolia } from "viem/chains";
import { contractAddresses } from "../../src/config";

// Import contract artifacts from the fixtures directory
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";

describe("ERC20 Tests", () => {
  // Anvil instance
  const anvil = createAnvil({
    forkUrl: process.env.RPC_URL,
  });

  const chain = baseSepolia;
  const transport = http("http://127.0.0.1:8545");

  // Create test client with wallet and public actions

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
    .extend(publicActions);

  // Addresses
  let alice: `0x${string}`;
  let bob: `0x${string}`;

  // Contract instances
  let erc20TokenA: `0x${string}`;
  let erc20TokenB: `0x${string}`;
  let askErc721Token: `0x${string}`;
  let askErc1155Token: `0x${string}`;

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

    // Deploy mock tokens
    console.debug("Deploying ERC20 Token A...");
    const erc20TokenAHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token A", "TKA"],
    });
    console.debug(`ERC20 Token A deployed, tx hash: ${erc20TokenAHash}`);

    console.debug("Deploying ERC20 Token B...");
    const erc20TokenBHash = await testClient.deployContract({
      abi: MockERC20Permit.abi,
      bytecode: MockERC20Permit.bytecode.object as `0x${string}`,
      args: ["Token B", "TKB"],
    });
    console.debug(`ERC20 Token B deployed, tx hash: ${erc20TokenBHash}`);

    console.debug("Deploying ERC721 token...");
    const askErc721TokenHash = await testClient.deployContract({
      abi: MockERC721.abi,
      bytecode: MockERC721.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`ERC721 token deployed, tx hash: ${askErc721TokenHash}`);

    console.debug("Deploying ERC1155 token...");
    const askErc1155TokenHash = await testClient.deployContract({
      abi: MockERC1155.abi,
      bytecode: MockERC1155.bytecode.object as `0x${string}`,
      args: [],
    });
    console.debug(`ERC1155 token deployed, tx hash: ${askErc1155TokenHash}`);

    // Get contract addresses
    console.debug("Waiting for ERC20 Token A transaction receipt...");
    const erc20TokenAReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenAHash,
    });
    console.debug("ERC20 Token A receipt received");

    console.debug("Waiting for ERC20 Token B transaction receipt...");
    const erc20TokenBReceipt = await testClient.waitForTransactionReceipt({
      hash: erc20TokenBHash,
    });
    console.debug("ERC20 Token B receipt received");

    console.debug("Waiting for ERC721 token transaction receipt...");
    const askErc721TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: askErc721TokenHash,
    });
    console.debug("ERC721 token receipt received");

    console.debug("Waiting for ERC1155 token transaction receipt...");
    const askErc1155TokenReceipt = await testClient.waitForTransactionReceipt({
      hash: askErc1155TokenHash,
    });
    console.debug("ERC1155 token receipt received");

    erc20TokenA = erc20TokenAReceipt.contractAddress as `0x${string}`;
    erc20TokenB = erc20TokenBReceipt.contractAddress as `0x${string}`;
    askErc721Token = askErc721TokenReceipt.contractAddress as `0x${string}`;
    askErc1155Token = askErc1155TokenReceipt.contractAddress as `0x${string}`;
    console.debug(`Contract addresses obtained:
      - ERC20 A: ${erc20TokenA}
      - ERC20 B: ${erc20TokenB}
      - ERC721: ${askErc721Token}
      - ERC1155: ${askErc1155Token}`);

    // Transfer tokens to Alice and Bob like in Solidity tests
    console.debug("Transferring ERC20 Token A to Alice...");
    await testClient.writeContract({
      address: erc20TokenA,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [alice, parseEther("1000")],
    });
    console.debug("ERC20 Token A transferred to Alice");

    console.debug("Transferring ERC20 Token B to Bob...");
    await testClient.writeContract({
      address: erc20TokenB,
      abi: MockERC20Permit.abi,
      functionName: "transfer",
      args: [bob, parseEther("1000")],
    });
    console.debug("ERC20 Token B transferred to Bob");

    // Mint NFTs to Bob
    console.debug("Minting ERC721 to Bob...");
    await testClient.writeContract({
      address: askErc721Token,
      abi: MockERC721.abi,
      functionName: "mint",
      args: [bob],
    });
    console.debug("ERC721 minted to Bob");

    console.debug("Minting ERC1155 to Bob...");
    await testClient.writeContract({
      address: askErc1155Token,
      abi: MockERC1155.abi,
      functionName: "mint",
      args: [bob, 1n, 100n],
    });
    console.debug("ERC1155 minted to Bob");

    console.debug("Creating Alice and Bob clients...");
    aliceClient = makeClient(aliceWalletClient);
    bobClient = makeClient(bobWalletClient);
    console.debug("Setup complete");
  });

  afterAll(async () => {
    console.debug("Stopping Anvil instance...");
    await anvil.stop();
    console.debug("Anvil instance stopped");
  });

  describe("ERC20BarterUtils", () => {
    test("testBuyErc20ForErc20", async () => {
      console.debug("Starting testBuyErc20ForErc20 test");
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      console.debug(
        `Test setup: bidAmount=${bidAmount}, askAmount=${askAmount}, expiration=${expiration}`,
      );

      // Alice approves and buys ERC20 for ERC20
      console.debug("Approving ERC20 token for escrow...");
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses["Base Sepolia"].erc20EscrowObligation,
      );
      console.debug("ERC20 token approved for escrow");

      console.debug("Creating ERC20 for ERC20 buy attestation...");
      const { attested } = await aliceClient.erc20.buyErc20ForErc20(
        { address: erc20TokenA, value: bidAmount },
        { address: erc20TokenB, value: askAmount },
        expiration,
      );
      console.debug(`Buy attestation created with UID: ${attested.uid}`);

      // Assert the attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
      console.debug("testBuyErc20ForErc20 test completed successfully");
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
      console.debug("Starting testPayErc20ForErc20 test");
      // First create a buy attestation
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      console.debug(
        `Test setup: bidAmount=${bidAmount}, askAmount=${askAmount}, expiration=${expiration}`,
      );

      // Alice approves and creates an escrow
      console.debug("ALICE: Approving ERC20 token A for escrow...");
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses["Base Sepolia"].erc20EscrowObligation,
      );
      console.debug("ALICE: ERC20 token A approved for escrow");

      console.debug("ALICE: Creating buy attestation (buyErc20ForErc20)...");
      const { attested: buyAttestation } =
        await aliceClient.erc20.buyErc20ForErc20(
          { address: erc20TokenA, value: bidAmount },
          { address: erc20TokenB, value: askAmount },
          expiration,
        );
      console.debug(
        `ALICE: Buy attestation created with UID: ${buyAttestation.uid}`,
      );

      // Bob approves and fulfills the escrow
      console.debug("BOB: Approving ERC20 token B for payment...");
      await bobClient.erc20.approve(
        { address: erc20TokenB, value: askAmount },
        contractAddresses["Base Sepolia"].erc20PaymentObligation,
      );
      console.debug("BOB: ERC20 token B approved for payment");

      console.debug(
        `BOB: Fulfilling escrow with buy attestation UID: ${buyAttestation.uid}`,
      );
      const { attested: sellAttestation } =
        await bobClient.erc20.payErc20ForErc20(buyAttestation.uid);
      console.debug(
        `BOB: Sell attestation created with UID: ${sellAttestation.uid}`,
      );

      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      console.debug("Verifying token transfers...");
      console.debug("Checking Bob's ERC20 token A balance...");
      const bobBalanceA = await testClient.readContract({
        address: erc20TokenA,
        abi: MockERC20Permit.abi,
        functionName: "balanceOf",
        args: [bob],
      });
      console.debug(`Bob's ERC20 token A balance: ${bobBalanceA}`);

      console.debug("Checking Alice's ERC20 token B balance...");
      const aliceBalanceB = await testClient.readContract({
        address: erc20TokenB,
        abi: MockERC20Permit.abi,
        functionName: "balanceOf",
        args: [alice],
      });
      console.debug(`Alice's ERC20 token B balance: ${aliceBalanceB}`);

      // Verify token transfers like in Solidity test
      expect(bobBalanceA).toBe(bidAmount);
      expect(aliceBalanceB).toBe(askAmount);
      console.debug("testPayErc20ForErc20 test completed successfully");
    });

    test("testPermitAndPayErc20ForErc20", async () => {
      // First create a buy attestation
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses["Base Sepolia"].erc20EscrowObligation,
      );

      const { attested: buyAttestation } =
        await aliceClient.erc20.buyErc20ForErc20(
          { address: erc20TokenA, value: bidAmount },
          { address: erc20TokenB, value: askAmount },
          expiration,
        );

      // Bob uses permit and fulfills the escrow
      const { attested: sellAttestation } =
        await bobClient.erc20.permitAndPayErc20ForErc20(buyAttestation.uid);

      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

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
        contractAddresses["Base Sepolia"].erc20EscrowObligation,
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
      const { attested } = await aliceClient.erc20.permitAndbuyErc721WithErc20(
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
        contractAddresses["Base Sepolia"].erc20EscrowObligation,
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

      // Alice approves and creates an escrow for token bundle
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses["Base Sepolia"].erc20EscrowObligation,
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

    test("testPermitAndBuyBundleWithERC20", async () => {
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

    test("testPayErc20ForErc721 - Full Trade Execution", async () => {
      console.debug(
        "Starting testPayErc20ForErc721 test (full trade execution)",
      );
      const bidAmount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      console.debug(
        `Test setup: bidAmount=${bidAmount}, erc721TokenId=${erc721TokenId}, expiration=${expiration}`,
      );

      // Alice approves and creates an escrow for ERC721
      console.debug("ALICE: Approving ERC20 token A for escrow...");
      await aliceClient.erc20.approve(
        { address: erc20TokenA, value: bidAmount },
        contractAddresses["Base Sepolia"].erc20EscrowObligation,
      );
      console.debug("ALICE: ERC20 token A approved for escrow");

      console.debug("ALICE: Creating buy attestation (buyErc721WithErc20)...");
      const { attested: buyAttestation } =
        await aliceClient.erc20.buyErc721WithErc20(
          { address: erc20TokenA, value: bidAmount },
          { address: askErc721Token, id: erc721TokenId },
          expiration,
        );
      console.debug(
        `ALICE: Buy attestation created with UID: ${buyAttestation.uid}`,
      );

      // Bob approves ERC721 and fulfills the escrow
      console.debug(
        `BOB: Approving ERC721 token (ID: ${erc721TokenId}) for escrow...`,
      );
      await bobClient.erc721.approve(
        { address: askErc721Token, id: erc721TokenId },
        "escrow", // Use ApprovalPurpose type instead of raw address
      );
      console.debug("BOB: ERC721 token approved for escrow");

      console.debug(
        `BOB: Fulfilling escrow with buy attestation UID: ${buyAttestation.uid}`,
      );
      const { attested: sellAttestation } =
        await bobClient.erc20.payErc20ForErc721(buyAttestation.uid);
      console.debug(
        `BOB: Sell attestation created with UID: ${sellAttestation.uid}`,
      );

      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      console.debug("Verifying token transfers...");
      console.debug(`Checking ERC721 token (ID: ${erc721TokenId}) owner...`);
      const erc721Owner = await testClient.readContract({
        address: askErc721Token,
        abi: MockERC721.abi,
        functionName: "ownerOf",
        args: [erc721TokenId],
      });
      console.debug(`ERC721 token owner: ${erc721Owner}`);

      console.debug("Checking Bob's ERC20 token A balance...");
      const bobBalanceA = await testClient.readContract({
        address: erc20TokenA,
        abi: MockERC20Permit.abi,
        functionName: "balanceOf",
        args: [bob],
      });
      console.debug(`Bob's ERC20 token A balance: ${bobBalanceA}`);

      // Verify transfers
      expect(erc721Owner).toBe(alice);
      expect(bobBalanceA).toBe(bidAmount);
      console.debug("testPayErc20ForErc721 test completed successfully");
    });
  });
});
