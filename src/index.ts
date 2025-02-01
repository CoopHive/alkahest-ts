import { parseAbiItem, parseEventLogs, type Account, type Chain } from "viem";
import { contractAddresses, supportedChains } from "./config";
import { createViemClient } from "./utils";
import { makeErc20Client } from "./clients/erc20";
import { makeErc721Client } from "./clients/erc721";
import { makeErc1155Client } from "./clients/erc1155";
import { makeTokenBundleClient } from "./clients/tokenBundle";
import { makeAttestationClient } from "./clients/attestation";

import { abi as easAbi } from "./contracts/IEAS";

export const makeClient = (account: Account, chain: Chain, rpcUrl: string) => {
  if (!supportedChains.includes(chain.name)) {
    throw new Error("unsupported chain");
  }

  const viemClient = createViemClient(account, chain, rpcUrl);

  return {
    address: account.address,
    erc20: makeErc20Client(viemClient),
    erc721: makeErc721Client(viemClient),
    erc1155: makeErc1155Client(viemClient),
    bundle: makeTokenBundleClient(viemClient),
    attestation: makeAttestationClient(viemClient), // Add the new client

    // Helper Functions
    getAttestation: async (uid: `0x${string}`) => {
      const attestation = await viemClient.readContract({
        address: contractAddresses[viemClient.chain.name].eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [uid],
      });
      return attestation;
    },

    getAttestationFromTxHash: async (hash: `0x${string}`) => {
      const tx = await viemClient.waitForTransactionReceipt({ hash });
      return parseEventLogs({
        abi: easAbi.abi,
        eventName: "Attested",
        logs: tx.logs,
      })[0].args;
    },

    waitForFulfillment: async (
      contractAddress: `0x${string}`,
      buyAttestation: `0x${string}`,
    ): Promise<{
      payment?: `0x${string}` | undefined;
      fulfillment?: `0x${string}` | undefined;
      fulfiller?: `0x${string}` | undefined;
    }> => {
      const fulfillmentEvent = parseAbiItem(
        "event EscrowClaimed(bytes32 indexed payment, bytes32 indexed fulfillment, address indexed fulfiller)",
      );
      const logs = await viemClient.getLogs({
        address: contractAddress,
        event: fulfillmentEvent,
        args: { payment: buyAttestation },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      if (logs.length) return logs[0].args;

      return new Promise((resolve) => {
        const unwatch = viemClient.watchEvent({
          address: contractAddress,
          event: fulfillmentEvent,
          args: { payment: buyAttestation },
          pollingInterval: 1000,
          onLogs: (logs) => {
            resolve(logs[0].args);
            unwatch();
          },
          fromBlock: 1n,
        });
      });
    },
  };
};

export * from "./types";
export * from "./config";
