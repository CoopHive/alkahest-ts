import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";
import { parseEther, getAddress } from "viem";
import { setupTestEnvironment, teardownTestEnvironment, type TestContext } from "../utils/setup";

describe("ERC20 Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let aliceClient: TestContext["aliceClient"];
  let bobClient: TestContext["bobClient"];
  let testClient: TestContext["testClient"];
  
  // Token addresses
  let erc20TokenA: `0x${string}`;
  let erc20TokenB: `0x${string}`;
  let askErc721Token: `0x${string}`;
  let askErc1155Token: `0x${string}`;

  beforeAll(async () => {
    // Setup test environment
    testContext = await setupTestEnvironment();
    
    // Extract the values we need for tests
    alice = testContext.alice;
    bob = testContext.bob;
    aliceClient = testContext.aliceClient;
    bobClient = testContext.bobClient;
    testClient = testContext.testClient;
    
    // Set token addresses from mock addresses
    erc20TokenA = testContext.mockAddresses.erc20A;
    erc20TokenB = testContext.mockAddresses.erc20B;
    askErc721Token = testContext.mockAddresses.erc721A;
    askErc1155Token = testContext.mockAddresses.erc1155A;
  });

  beforeEach(async () => {
    // Reset to initial state before each test
    if (testContext.anvilInitState) {
      await testContext.testClient.loadState({ state: testContext.anvilInitState });
    }
  });

  afterAll(async () => {
    // Clean up
    await teardownTestEnvironment(testContext);
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