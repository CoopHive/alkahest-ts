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

describe("ERC721 Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let aliceClient: TestContext["aliceClient"];
  let bobClient: TestContext["bobClient"];
  let testClient: TestContext["testClient"];

  // Token addresses
  let erc20Token: `0x${string}`;
  let aliceErc721Token: `0x${string}`;
  let bobErc721Token: `0x${string}`;
  let erc1155Token: `0x${string}`;

  // Token IDs
  let aliceTokenId: bigint;
  let bobTokenId: bigint;

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
    erc20Token = testContext.mockAddresses.erc20A;
    aliceErc721Token = testContext.mockAddresses.erc721A;
    bobErc721Token = testContext.mockAddresses.erc721B;
    erc1155Token = testContext.mockAddresses.erc1155A;

    // First token minted for each user is ID 1
    aliceTokenId = 1n;
    bobTokenId = 1n;
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
      const newOwner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(
        compareAddresses(
          newOwner,
          testContext.addresses.erc721EscrowObligation,
        ),
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
      const aliceInitialOwnsToken = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      const bobInitialOwnsToken = await testClient.getErc721Owner({
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
      const aliceFinalOwnsToken = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: bobTokenId,
      });

      const bobFinalOwnsToken = await testClient.getErc721Owner({
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
      const Erc20Amount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow for Erc20
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "escrow",
      );

      const { attested } = await aliceClient.erc721.buyErc20WithErc721(
        { address: aliceErc721Token, id: aliceTokenId },
        { address: erc20Token, value: Erc20Amount },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );

      // Verify Alice's token is now in escrow
      const newOwner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(
        compareAddresses(
          newOwner,
          testContext.addresses.erc721EscrowObligation,
        ),
      ).toBe(true);
    });

    test("testPayErc721ForErc20", async () => {
      const Erc20Amount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing Erc20
      console.log("bob approves");
      await bobClient.erc20.approve(
        { address: erc20Token, value: Erc20Amount },
        "escrow",
      );

      // Create Erc721 payment statement for Alice's token
      /*
      const Erc721PaymentStatement = aliceClient.erc721.encodePaymentStatement(
        { address: aliceErc721Token, id: aliceTokenId },
        bob
      );

      // Create escrow with Bob's Erc20 tokens, demanding Alice's Erc721
      const { attested: buyAttestation } =
        await bobClient.erc20.buyWithErc20(
          { address: erc20Token, value: Erc20Amount },
          {
            arbiter: localAddresses.erc721PaymentObligation,
            demand: Erc721PaymentStatement
          },
          expiration,
        );
      */

      console.log("bob buys");
      const { attested: buyAttestation } =
        await bobClient.erc20.buyErc721WithErc20(
          { address: erc20Token, value: Erc20Amount },
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
      // Alice approves and fulfills the escrow with her Erc721
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

      const bobOwnsToken = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      // Verify transfers
      expect(compareAddresses(bobOwnsToken, bob)).toBe(true);
      expect(aliceFinalBalanceErc20 - aliceInitialBalanceErc20).toBe(
        Erc20Amount,
      );
    });

    test("testBuyErc1155WithErc721", async () => {
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow for Erc1155
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
      const newOwner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(
        compareAddresses(
          newOwner,
          testContext.addresses.erc721EscrowObligation,
        ),
      ).toBe(true);
    });

    test("testPayErc721ForErc1155", async () => {
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing Erc1155
      await bobClient.erc1155.approveAll(erc1155Token, "escrow");

      // Create escrow with Bob's Erc1155 tokens, demanding Alice's Erc721
      const { attested: buyAttestation } =
        await bobClient.erc1155.buyErc721WithErc1155(
          { address: erc1155Token, id: tokenId, value: amount },
          { address: aliceErc721Token, id: aliceTokenId },
          expiration,
        );

      // Check balances before the exchange
      const aliceInitialBalanceErc1155 = await testClient.getErc1155Balance(
        { address: erc1155Token, id: tokenId },
        alice,
      );

      // Alice approves and fulfills the escrow with her Erc721
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
      const aliceFinalBalanceErc1155 = await testClient.getErc1155Balance(
        { address: erc1155Token, id: tokenId },
        alice,
      );

      const bobOwnsToken = await testClient.getErc721Owner({
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
      const newOwner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(
        compareAddresses(
          newOwner,
          testContext.addresses.erc721EscrowObligation,
        ),
      ).toBe(true);
    });

    test("testPayErc721ForBundle", async () => {
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const Erc20Amount = parseEther("5");
      const erc1155TokenId = 1n;
      const Erc1155Amount = 20n;

      // Create token bundle that Bob will escrow
      const bundle = {
        erc20s: [{ address: erc20Token, value: Erc20Amount / 2n }],
        erc721s: [{ address: bobErc721Token, id: bobTokenId }],
        erc1155s: [
          {
            address: erc1155Token,
            id: erc1155TokenId,
            value: Erc1155Amount / 2n,
          },
        ],
      };

      // Bob approves his tokens and creates the bundle escrow
      await bobClient.bundle.approve(bundle, "escrow");

      // Create Erc721 payment statement for Alice's token
      const Erc721PaymentStatement = aliceClient.erc721.encodePaymentStatement(
        { address: aliceErc721Token, id: aliceTokenId },
        bob,
      );

      // Bob creates bundle escrow demanding Alice's Erc721
      const { attested: buyAttestation } = await bobClient.bundle.buyWithBundle(
        bundle,
        {
          arbiter: testContext.addresses.erc721PaymentObligation,
          demand: Erc721PaymentStatement,
        },
        expiration,
      );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance(
        { address: erc20Token },
        alice,
      );

      const aliceInitialBalanceErc1155 = await testClient.getErc1155Balance(
        { address: erc1155Token, id: erc1155TokenId },
        alice,
      );

      // Alice approves her Erc721 token for payment
      await aliceClient.erc721.approve(
        { address: aliceErc721Token, id: aliceTokenId },
        "payment",
      );

      // Alice fulfills the bundle escrow with her Erc721
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

      const aliceFinalBalanceErc1155 = await testClient.getErc1155Balance(
        { address: erc1155Token, id: erc1155TokenId },
        alice,
      );

      const aliceOwnsToken = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: bobTokenId,
      });

      const bobOwnsToken = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      // Verify transfers
      expect(compareAddresses(bobOwnsToken, bob)).toBe(true);
      expect(compareAddresses(aliceOwnsToken, alice)).toBe(true);
      expect(aliceFinalBalanceErc20 - aliceInitialBalanceErc20).toBe(
        Erc20Amount / 2n,
      );
      expect(aliceFinalBalanceErc1155 - aliceInitialBalanceErc1155).toBe(
        Erc1155Amount / 2n,
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
      const tokenOwner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceTokenId,
      });

      expect(compareAddresses(tokenOwner, alice)).toBe(true);
    });
  });
});
