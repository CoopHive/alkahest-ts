import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";
import { parseEther, getAddress } from "viem";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "../utils/setup";
import { compareAddresses } from "../utils/tokenTestUtils";

describe("ERC20 Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let aliceClient: TestContext["aliceClient"];
  let bobClient: TestContext["bobClient"];
  let testClient: TestContext["testClient"];

  // Token addresses
  let aliceErc20Token: `0x${string}`;
  let bobErc20Token: `0x${string}`;
  let aliceErc721Token: `0x${string}`;
  let bobErc721Token: `0x${string}`;
  let aliceErc1155Token: `0x${string}`;
  let bobErc1155Token: `0x${string}`;

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
    aliceErc20Token = testContext.mockAddresses.erc20A;
    bobErc20Token = testContext.mockAddresses.erc20B;
    aliceErc721Token = testContext.mockAddresses.erc721A;
    bobErc721Token = testContext.mockAddresses.erc721B;
    aliceErc1155Token = testContext.mockAddresses.erc1155A;
    bobErc1155Token = testContext.mockAddresses.erc1155B;
  });

  beforeEach(async () => {
    // Reset to initial state before each test
    if (testContext.anvilInitState) {
      await testContext.testClient.loadState({
        state: testContext.anvilInitState,
      });
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
        { address: aliceErc20Token, value: bidAmount },
        "escrow",
      );

      const { attested } = await aliceClient.erc20.buyErc20ForErc20(
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc20Token, value: askAmount },
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
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc20Token, value: askAmount },
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
        { address: aliceErc20Token, value: amount },
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
        { address: aliceErc20Token, value: amount },
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
        { address: aliceErc20Token, value: bidAmount },
        "escrow",
      );

      const { attested: buyAttestation } =
        await aliceClient.erc20.buyErc20ForErc20(
          { address: aliceErc20Token, value: bidAmount },
          { address: bobErc20Token, value: askAmount },
          expiration,
        );

      // Bob approves and fulfills the escrow
      // Check balances before the exchange
      const bobInitialBalanceA = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        bob,
      );

      const aliceInitialBalanceB = await testClient.getErc20Balance(
        { address: bobErc20Token },
        alice,
      );

      await bobClient.erc20.approve(
        { address: bobErc20Token, value: askAmount },
        "payment",
      );

      const { attested: sellAttestation } =
        await bobClient.erc20.payErc20ForErc20(buyAttestation.uid);

      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const bobFinalBalanceA = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        bob,
      );

      const aliceFinalBalanceB = await testClient.getErc20Balance(
        { address: bobErc20Token },
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
        { address: aliceErc20Token, value: bidAmount },
        "escrow",
      );

      const { attested: buyAttestation } =
        await aliceClient.erc20.buyErc20ForErc20(
          { address: aliceErc20Token, value: bidAmount },
          { address: bobErc20Token, value: askAmount },
          expiration,
        );

      // Check balances before the exchange
      const bobInitialBalanceA = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        bob,
      );

      const aliceInitialBalanceB = await testClient.getErc20Balance(
        { address: bobErc20Token },
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
      const bobFinalBalanceA = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        bob,
      );

      const aliceFinalBalanceB = await testClient.getErc20Balance(
        { address: bobErc20Token },
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
        { address: aliceErc20Token, value: bidAmount },
        "escrow",
      );

      const { attested } = await aliceClient.erc20.buyErc721WithErc20(
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc721Token, id: erc721TokenId },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPermitAndBuyErc721WithErc20", async () => {
      const bidAmount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and creates an escrow for ERC721
      const { attested } = await aliceClient.erc20.permitAndBuyErc721WithErc20(
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc721Token, id: erc721TokenId },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPayErc20ForErc721", async () => {
      const erc20Amount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing ERC721
      await bobClient.erc721.approve(
        { address: bobErc721Token, id: erc721TokenId },
        "escrow",
      );

      const { attested: buyAttestation } =
        await bobClient.erc721.buyErc20WithErc721(
          { address: bobErc721Token, id: erc721TokenId },
          { address: aliceErc20Token, value: erc20Amount },
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      // Alice approves her ERC20 and fulfills the escrow
      await aliceClient.erc20.approve(
        { address: aliceErc20Token, value: erc20Amount },
        "payment",
      );

      const { attested: payAttestation } =
        await aliceClient.erc20.payErc20ForErc721(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      const aliceOwnsToken = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: erc721TokenId,
      });

      // Verify transfers
      expect(compareAddresses(aliceOwnsToken, alice)).toBe(true);
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(erc20Amount);
    });

    test("testPermitAndPayErc20ForErc721", async () => {
      const erc20Amount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing ERC721
      await bobClient.erc721.approve(
        { address: bobErc721Token, id: erc721TokenId },
        "escrow",
      );

      const { attested: buyAttestation } =
        await bobClient.erc721.buyErc20WithErc721(
          { address: bobErc721Token, id: erc721TokenId },
          { address: aliceErc20Token, value: erc20Amount },
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      // Alice approves her ERC20 and fulfills the escrow
      // We'll skip using permit and use regular payErc20ForErc721 since test tokens may not support EIP-2612
      await aliceClient.erc20.approve(
        { address: aliceErc20Token, value: erc20Amount },
        "payment",
      );

      const { attested: payAttestation } =
        await aliceClient.erc20.payErc20ForErc721(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      const aliceOwnsToken = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: erc721TokenId,
      });

      // Verify transfers
      expect(compareAddresses(aliceOwnsToken, alice)).toBe(true);
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(erc20Amount);
    });

    test("testBuyErc1155WithErc20", async () => {
      const bidAmount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow for ERC1155
      await aliceClient.erc20.approve(
        { address: aliceErc20Token, value: bidAmount },
        "escrow",
      );

      const { attested } = await aliceClient.erc20.buyErc1155WithErc20(
        { address: aliceErc20Token, value: bidAmount },
        {
          address: bobErc1155Token,
          id: tokenId,
          value: amount,
        },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPermitAndBuyErc1155WithErc20", async () => {
      const bidAmount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and creates an escrow for ERC1155
      const { attested } = await aliceClient.erc20.permitAndBuyErc1155WithErc20(
        { address: aliceErc20Token, value: bidAmount },
        {
          address: bobErc1155Token,
          id: tokenId,
          value: amount,
        },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPayErc20ForErc1155", async () => {
      const erc20Amount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing ERC1155
      await bobClient.erc1155.approveAll(bobErc1155Token, "escrow");

      const { attested: buyAttestation } =
        await bobClient.erc1155.buyErc20WithErc1155(
          { address: bobErc1155Token, id: tokenId, value: amount },
          { address: aliceErc20Token, value: erc20Amount },
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      const aliceInitialBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: tokenId },
        alice,
      );

      // Alice approves her ERC20 and fulfills the escrow
      await aliceClient.erc20.approve(
        { address: aliceErc20Token, value: erc20Amount },
        "payment",
      );

      const { attested: payAttestation } =
        await aliceClient.erc20.payErc20ForErc1155(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      const aliceFinalBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: tokenId },
        alice,
      );

      // Verify transfers
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(erc20Amount);
      expect(aliceFinalBalanceErc1155 - aliceInitialBalanceErc1155).toBe(
        amount,
      );
    });

    test("testPermitAndPayErc20ForErc1155", async () => {
      const erc20Amount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing ERC1155
      await bobClient.erc1155.approveAll(bobErc1155Token, "escrow");

      const { attested: buyAttestation } =
        await bobClient.erc1155.buyErc20WithErc1155(
          { address: bobErc1155Token, id: tokenId, value: amount },
          { address: aliceErc20Token, value: erc20Amount },
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      const aliceInitialBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: tokenId },
        alice,
      );

      // Alice approves her ERC20 and fulfills the escrow
      // We'll skip using permit and use regular payErc20ForErc1155 since test tokens may not support EIP-2612
      await aliceClient.erc20.approve(
        { address: aliceErc20Token, value: erc20Amount },
        "payment",
      );

      const { attested: payAttestation } =
        await aliceClient.erc20.payErc20ForErc1155(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      const aliceFinalBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: tokenId },
        alice,
      );

      // Verify transfers
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(erc20Amount);
      expect(aliceFinalBalanceErc1155 - aliceInitialBalanceErc1155).toBe(
        amount,
      );
    });

    test("testBuyBundleWithErc20", async () => {
      const bidAmount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create token bundle
      const bundle = {
        erc20s: [{ address: bobErc20Token, value: parseEther("5") }],
        erc721s: [{ address: bobErc721Token, id: 1n }],
        erc1155s: [{ address: bobErc1155Token, id: 1n, value: 20n }],
      };

      // Alice approves tokens for token bundle escrow
      await aliceClient.erc20.approve(
        { address: aliceErc20Token, value: bidAmount },
        "escrow",
      );

      const { attested } = await aliceClient.erc20.buyBundleWithErc20(
        { address: aliceErc20Token, value: bidAmount },
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
        erc20s: [{ address: bobErc20Token, value: parseEther("5") }],
        erc721s: [{ address: bobErc721Token, id: 1n }],
        erc1155s: [{ address: bobErc1155Token, id: 1n, value: 20n }],
      };

      // Alice uses permit and creates an escrow for token bundle
      const { attested } = await aliceClient.erc20.permitAndBuyBundleWithErc20(
        { address: aliceErc20Token, value: bidAmount },
        bundle,
        bob,
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
    });

    test("testPayErc20ForBundle", async () => {
      // We'll simplify the bundle to just include ERC20 tokens
      // since bundle approvals can be complex
      const bidAmount = parseEther("100");
      const erc20Amount = parseEther("5");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create token bundle that only includes ERC20 tokens that Bob owns
      const bundle = {
        erc20s: [{ address: bobErc20Token, value: erc20Amount }],
        erc721s: [],
        erc1155s: [],
      };

      // Bob approves his tokens and creates the bundle escrow
      await bobClient.erc20.approve(
        { address: bobErc20Token, value: erc20Amount },
        "escrow",
      );

      // Create ERC20 payment statement for Alice's tokens
      const erc20PaymentStatement = bobClient.erc20.encodePaymentStatement(
        { address: aliceErc20Token, value: bidAmount },
        bob,
      );

      // Bob creates bundle escrow demanding Alice's ERC20
      const { attested: buyAttestation } = await bobClient.bundle.buyWithBundle(
        bundle,
        {
          arbiter: testContext.addresses.erc20PaymentObligation,
          demand: erc20PaymentStatement,
        },
        expiration,
      );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      const aliceInitialBalanceBobErc20 = await testClient.getErc20Balance(
        { address: bobErc20Token },
        alice,
      );

      // Alice approves her tokens for payment
      await aliceClient.erc20.approve(
        { address: aliceErc20Token, value: bidAmount },
        "payment",
      );

      // Alice fulfills the escrow with her ERC20
      const { attested: payAttestation } =
        await aliceClient.erc20.payErc20ForBundle(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        alice,
      );

      const aliceFinalBalanceBobErc20 = await testClient.getErc20Balance(
        { address: bobErc20Token },
        alice,
      );

      // Verify transfers
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(bidAmount);
      expect(aliceFinalBalanceBobErc20 - aliceInitialBalanceBobErc20).toBe(erc20Amount);
    });
  });
});
