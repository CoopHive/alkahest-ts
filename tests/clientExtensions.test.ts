import { makeMinimalClient } from "../src";
import { WalletClient, Transport, Chain, Account } from "viem";

describe("Client Extension Tests", () => {
  it("can chain multiple extensions", () => {
    // Mock wallet client
    const mockWalletClient = {
      extend: jest.fn(() => mockWalletClient),
      account: { address: "0xMockAddress" },
      chain: { name: "MockChain" },
    } as unknown as WalletClient<Transport, Chain, Account>;

    // Create minimal client
    const client = makeMinimalClient(mockWalletClient);

    // Define extensions
    const extensionA = (baseClient: any) => ({
      methodA: () => "Extension A",
    });

    const extensionB = (baseClient: any) => ({
      methodB: () => "Extension B",
    });

    // Apply extensions
    const extendedClient = client.extend(extensionA).extend(extensionB);

    // Verify extensions
    expect(extendedClient.methodA()).toBe("Extension A");
    expect(extendedClient.methodB()).toBe("Extension B");
    expect(extendedClient.address).toBe("0xMockAddress");
  });
});
