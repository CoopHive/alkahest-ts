import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";
import { parseEther } from "viem";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "../utils/setup";
import { compareAddresses } from "../utils/tokenTestUtils";

describe("ERC1155 Tests", () => {
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

  // Token IDs and amounts
  let aliceErc1155TokenId: bigint = 1n;
  let aliceErc1155Amount: bigint = 100n;
  let bobErc1155TokenId: bigint = 1n;
  let bobErc1155Amount: bigint = 100n;
  let bobErc721TokenId: bigint;

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

    // First token minted for Bob is ID 1
    bobErc721TokenId = 1n;
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

  describe("ERC1155BarterUtils", () => {
    test("testBuyErc20WithErc1155", async () => {
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const erc20Amount = parseEther("500");

      // Check initial balances
      const initialEscrowBalance = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        testContext.addresses.erc1155EscrowObligation,
      );

      const initialAliceBalance = await testClient.getErc1155Balance(
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
          { address: bobErc20Token, value: erc20Amount },
          expiration,
        );

      // Assert the attestation was created
      expect(buyAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's tokens are now in escrow
      const finalEscrowBalance = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        testContext.addresses.erc1155EscrowObligation,
      );

      const finalAliceBalance = await testClient.getErc1155Balance(
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

      // First, Bob creates a buy attestation by escrowing his ERC20 tokens
      await bobClient.erc20.approve(
        { address: bobErc20Token, value: erc20Amount },
        "escrow",
      );

      const { attested: buyAttestation } =
        await bobClient.erc20.buyErc1155WithErc20(
          { address: bobErc20Token, value: erc20Amount },
          { 
            address: aliceErc1155Token, 
            id: aliceErc1155TokenId, 
            value: aliceErc1155Amount 
          },
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: bobErc20Token },
        alice,
      );

      const bobInitialBalanceErc1155 = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        bob,
      );

      // Alice approves and fulfills the trade with her ERC1155 tokens
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "payment");

      const { attested: payAttestation } =
        await aliceClient.erc1155.payErc1155ForErc20(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token balances after the exchange
      const bobFinalBalanceErc1155 = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        bob,
      );

      const aliceFinalBalanceErc20 = await testClient.getErc20Balance(
        { address: bobErc20Token },
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
      const initialEscrowBalance = await testClient.getErc1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        testContext.addresses.erc1155EscrowObligation,
      );

      const initialAliceBalance = await testClient.getErc1155Balance(
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
          { address: bobErc721Token, id: bobErc721TokenId },
          expiration,
        );

      // Assert the attestation was created
      expect(buyAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's tokens are now in escrow
      const finalEscrowBalance = await testClient.getErc1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        testContext.addresses.erc1155EscrowObligation,
      );

      const finalAliceBalance = await testClient.getErc1155Balance(
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

      // First, Bob creates a buy attestation by escrowing his ERC721 token
      await bobClient.erc721.approve(
        { address: bobErc721Token, id: bobErc721TokenId },
        "escrow",
      );

      const { attested: buyAttestation } =
        await bobClient.erc721.buyErc1155WithErc721(
          { address: bobErc721Token, id: bobErc721TokenId },
          { 
            address: aliceErc1155Token, 
            id: aliceErc1155TokenId, 
            value: aliceErc1155Amount 
          },
          expiration,
        );

      // Check ownership and balances before the exchange
      const bobInitialBalanceErc1155 = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        bob,
      );

      const erc721Owner = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: bobErc721TokenId,
      });

      // The ERC721 should now be in escrow
      expect(compareAddresses(erc721Owner, testContext.addresses.erc721EscrowObligation)).toBe(true);

      // Alice approves and fulfills the trade with her ERC1155 tokens
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "payment");

      const { attested: payAttestation } =
        await aliceClient.erc1155.payErc1155ForErc721(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers after the exchange
      const bobFinalBalanceErc1155 = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        bob,
      );

      const newErc721Owner = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: bobErc721TokenId,
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
      const initialEscrowBalance = await testClient.getErc1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        testContext.addresses.erc1155EscrowObligation,
      );

      const initialAliceBalance = await testClient.getErc1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        alice,
      );

      // Create token bundle
      const bundle = {
        erc20s: [{ address: bobErc20Token, value: erc20Amount }],
        erc721s: [{ address: bobErc721Token, id: bobErc721TokenId }],
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
      const finalEscrowBalance = await testClient.getErc1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        testContext.addresses.erc1155EscrowObligation,
      );

      const finalAliceBalance = await testClient.getErc1155Balance(
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

      // Create token bundle that Bob will escrow
      const bundle = {
        erc20s: [{ address: bobErc20Token, value: erc20Amount }],
        erc721s: [{ address: bobErc721Token, id: bobErc721TokenId }],
        erc1155s: [
          {
            address: bobErc1155Token,
            id: bobErc1155TokenId,
            value: bobErc1155HalfAmount,
          },
        ],
      };

      // Bob approves and creates an escrow for the bundle
      await bobClient.bundle.approve(bundle, "escrow");

      // Create ERC1155 payment statement for Alice's tokens
      const erc1155PaymentStatement = bobClient.erc1155.encodePaymentStatement(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
          value: aliceErc1155Amount,
        },
        bob,
      );

      // Bob creates bundle escrow demanding Alice's ERC1155
      const { attested: buyAttestation } = await bobClient.bundle.buyWithBundle(
        bundle,
        {
          arbiter: testContext.addresses.erc1155PaymentObligation,
          demand: erc1155PaymentStatement,
        },
        expiration,
      );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: bobErc20Token },
        alice,
      );
      const aliceInitialBalanceErc1155Bob = await testClient.getErc1155Balance(
        {
          address: bobErc1155Token,
          id: bobErc1155TokenId,
        },
        alice,
      );
      const bobInitialBalanceErc1155Alice = await testClient.getErc1155Balance(
        {
          address: aliceErc1155Token,
          id: aliceErc1155TokenId,
        },
        bob,
      );

      // Alice approves her ERC1155 tokens for payment
      await aliceClient.erc1155.approveAll(aliceErc1155Token, "payment");

      // Alice fulfills the bundle escrow with her ERC1155
      const { attested: payAttestation } =
        await aliceClient.erc1155.payErc1155ForBundle(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance(
        { address: bobErc20Token },
        alice,
      );
      const aliceFinalBalanceErc1155Bob = await testClient.getErc1155Balance(
        {
          address: bobErc1155Token,
          id: bobErc1155TokenId,
        },
        alice,
      );
      const aliceOwnsToken = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: bobErc721TokenId,
      });

      const bobFinalBalanceErc1155Alice = await testClient.getErc1155Balance(
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
      expect(aliceFinalBalanceErc1155Bob - aliceInitialBalanceErc1155Bob).toBe(
        bobErc1155HalfAmount,
      );
      expect(bobFinalBalanceErc1155Alice - bobInitialBalanceErc1155Alice).toBe(
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
          { address: bobErc20Token, value: parseEther("500") },
          shortExpiration,
        );

      // Advance blockchain time to after expiration
      await testClient.increaseTime({ seconds: 120 }); // Advance 120 seconds

      // Alice collects her expired escrow
      await aliceClient.erc1155.collectExpired(buyAttestation.uid);

      // Verify Alice got her tokens back
      const aliceBalance = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: aliceErc1155TokenId },
        alice,
      );

      expect(aliceBalance).toBe(aliceErc1155Amount);
    });
  });
});
