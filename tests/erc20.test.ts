import { expect, test, describe } from "bun:test";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { makeClient } from "../src";
import { contractAddresses } from "../src/config";

const PRIVKEY_ALICE = process.env.PRIVKEY_ALICE as `0x${string}`;
const PRIVKEY_BOB = process.env.PRIVKEY_BOB as `0x${string}`;

const aliceAccount = privateKeyToAccount(PRIVKEY_ALICE);
const bobAccount = privateKeyToAccount(PRIVKEY_BOB);

// Test token addresses - you'll need to replace these with actual testnet addresses
const TOKEN_A = contractAddresses["Base Sepolia"]["usdc"] as `0x${string}`;
const TOKEN_B = contractAddresses["Base Sepolia"]["eurc"] as `0x${string}`;

describe("ERC20 Functions", () => {
  const aliceClient = makeClient(aliceAccount, baseSepolia);
  const bobClient = makeClient(bobAccount, baseSepolia);

  test("approve should work", async () => {
    const amount = 100n * 10n ** 18n;
    const hash = await aliceClient.approve(TOKEN_A, TOKEN_B, amount);
    expect(hash).toBeDefined();
  });

  test("buyErc20ForErc20 flow", async () => {
    const bidAmount = 100n * 10n ** 18n;
    const askAmount = 200n * 10n ** 18n;
    const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day

    // Alice creates buy order
    const buyResult = await aliceClient.buyErc20ForErc20(
      { token: TOKEN_A, amount: bidAmount },
      { token: TOKEN_B, amount: askAmount },
      expiration,
    );
    expect(buyResult.hash).toBeDefined();
    expect(buyResult.attested).toBeDefined();

    // Bob fulfills order
    const payResult = await bobClient.payErc20ForErc20(buyResult.attested.uid);
    expect(payResult.hash).toBeDefined();
    expect(payResult.attested).toBeDefined();
  });

  test("buyErc20ForErc20WithPermit flow", async () => {
    const bidAmount = 100n * 10n ** 18n;
    const askAmount = 200n * 10n ** 18n;
    const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);

    // Note: In a real implementation, you'd need to generate actual permit signatures
    const mockPermit = {
      deadline,
      v: 27,
      r: "0x1234" as `0x${string}`,
      s: "0x5678" as `0x${string}`,
    };

    const buyResult = await aliceClient.buyErc20ForErc20WithPermit(
      { token: TOKEN_A, amount: bidAmount },
      { token: TOKEN_B, amount: askAmount },
      mockPermit,
      expiration,
    );

    expect(buyResult.hash).toBeDefined();
    expect(buyResult.attested).toBeDefined();
  });

  test("generic buyWithErc20 and payWithErc20", async () => {
    const amount = 100n * 10n ** 18n;

    const buyResult = await aliceClient.buyWithErc20(
      { token: TOKEN_A, amount },
      {
        arbiter: bobAccount.address,
        demand: "0x00000000000000000000000000000000" as `0x${string}`,
      },
    );

    expect(buyResult.hash).toBeDefined();
    expect(buyResult.attested).toBeDefined();

    const payResult = await bobClient.payWithErc20(
      { token: TOKEN_B, amount },
      aliceAccount.address,
    );

    expect(payResult.hash).toBeDefined();
    expect(payResult.attested).toBeDefined();
  });
});
