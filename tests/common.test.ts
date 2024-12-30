import { expect, test, describe } from "bun:test";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { makeClient } from "../src";

const PRIVKEY_ALICE = process.env.PRIVKEY_ALICE as `0x${string}`;
const PRIVKEY_BOB = process.env.PRIVKEY_BOB as `0x${string}`;

const aliceAccount = privateKeyToAccount(PRIVKEY_ALICE);
const bobAccount = privateKeyToAccount(PRIVKEY_BOB);

describe("Common SDK Functions", () => {
  test("should create client successfully", () => {
    const client = makeClient(aliceAccount, baseSepolia);
    expect(client).toBeDefined();
  });

  test("should throw error for unsupported chain", () => {
    expect(() => {
      makeClient(aliceAccount, {
        ...baseSepolia,
        name: "Unsupported Chain",
      });
    }).toThrow("unsupported chain");
  });

  test("waitForFulfillment should work with provided attestation", async () => {
    const client = makeClient(aliceAccount, baseSepolia);
    const mockAttestation = "0x1234" as `0x${string}`;

    // Note: This is a basic test. In reality, you'd need to set up proper mock data
    // or use actual network interactions
    const result = await client.waitForFulfillment(mockAttestation);
    expect(result).toBeDefined();
  });
});
