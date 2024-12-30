import { parseAbiItem, type Account, type Chain } from "viem";
import { contractAddresses, supportedChains } from "./config";
import { createViemClient } from "./utils";
import { makeErc20Client } from "./clients/erc20";
import { makeErc721Client } from "./clients/erc721";
import { makeErc1155Client } from "./clients/erc1155";
import { makeTokenBundleClient } from "./clients/tokenBundle";
import { makeAttestationClient } from "./clients/attestation";

export const makeClient = (account: Account, chain: Chain) => {
  if (!supportedChains.includes(chain.name)) {
    throw new Error("unsupported chain");
  }

  const viemClient = createViemClient(account, chain);

  return {
    ...makeErc20Client(viemClient),
    ...makeErc721Client(viemClient),
    ...makeErc1155Client(viemClient),
    ...makeTokenBundleClient(viemClient),
    ...makeAttestationClient(viemClient), // Add the new client

    // Helper Functions
    waitForFulfillment: async (
      buyAttestation: `0x${string}`,
      fromBlock?: bigint,
      toBlock?: bigint,
    ): Promise<{
      payment?: `0x${string}` | undefined;
      fulfillment?: `0x${string}` | undefined;
      fulfiller?: `0x${string}` | undefined;
    }> => {
      const logs = await viemClient.getLogs({
        address: contractAddresses[chain.name].erc20PaymentObligation,
        event: parseAbiItem(
          "event PaymentClaimed(bytes32 indexed payment, bytes32 indexed fulfillment, address indexed fulfiller)",
        ),
        args: {
          payment: buyAttestation,
        },
        fromBlock,
        toBlock,
      });
      if (logs.length) {
        return logs[0].args;
      }

      return new Promise((resolve) => {
        const unwatch = viemClient.watchEvent({
          address: contractAddresses[chain.name].erc20PaymentObligation,
          event: parseAbiItem(
            "event PaymentClaimed(bytes32 indexed payment, bytes32 indexed fulfillment, address indexed fulfiller)",
          ),
          args: {
            payment: buyAttestation,
          },
          onLogs: (logs) => {
            unwatch();
            resolve(logs[0].args);
          },
        });
      });
    },
  };
};

export * from "./types";
