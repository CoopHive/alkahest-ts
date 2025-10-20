import { describe, expect, it } from "bun:test";
import type { Account, Chain, Transport, WalletClient } from "viem";
import { makeMinimalClient } from "../src";

describe("Client Extension Tests", () => {
  it("can chain multiple extensions", () => {
    // Mock wallet client
    const mockWalletClient = {
      extend: () => mockWalletClient,
      account: { address: "0xMockAddress" },
      chain: { name: "MockChain" },
    } as unknown as WalletClient<Transport, Chain, Account>;

    // Create minimal client
    const client = makeMinimalClient(mockWalletClient);

    const extensionA = (_baseClient: unknown) => ({
      methodA: () => "Extension A",
    });

    const firstExtension = client.extend(extensionA);

    const extensionB = (_baseClient: unknown) => ({
      methodB: () => "Extension B",
    });

    const extendedClient = firstExtension.extend(extensionB);

    // Verify extensions
    expect(extendedClient.methodA()).toBe("Extension A");
    expect(extendedClient.methodB()).toBe("Extension B");
    expect(extendedClient.address).toBe("0xMockAddress");
  });
});
