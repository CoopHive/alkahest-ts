import {
  parseAbiItem,
  parseEventLogs,
  publicActions,
  type Account,
  type Chain,
  type TestClient,
  type Transport,
  type WalletClient,
} from "viem";
import { contractAddresses, supportedChains } from "./config";
import { makeErc20Client } from "./clients/erc20";
import { makeErc721Client } from "./clients/erc721";
import { makeErc1155Client } from "./clients/erc1155";
import { makeTokenBundleClient } from "./clients/tokenBundle";
import { makeAttestationClient } from "./clients/attestation";
import { makeStringObligationClient } from "./clients/stringObligation";

import { abi as easAbi } from "./contracts/IEAS";
import { makeArbitersClient } from "./clients/arbiters";
import { getAttestation } from "./utils";

/**
 * Creates an Alkahest client for interacting with the protocol
 * @param account - Viem account object (viem's automatic nonce management recommended)
 * @param chain - Viem chain object (only Base Sepolia supported currently)
 * @param rpcUrl - RPC URL for the chain
 * @returns Client object with methods for interacting with different token standards and attestations
 * @throws Error if chain is not supported
 *
 * @example
 * ```ts
 * const client = makeClient(
 *   privateKeyToAccount(process.env.PRIVKEY as `0x${string}`, {
 *     nonceManager, // automatic nonce management
 *   }),
 *   baseSepolia,
 *   process.env.RPC_URL as string,
 * );
 * ```
 */
export const makeClient = (
  walletClient: WalletClient<Transport, Chain, Account>,
) => {
  if (!supportedChains.includes(walletClient.chain.name)) {
    throw new Error("unsupported chain");
  }

  const viemClient = walletClient.extend(publicActions);

  return {
    /** Methods for interacting with Arbiters */
    arbiters: makeArbitersClient(viemClient),

    /** Methods for interacting with ERC20 tokens */
    erc20: makeErc20Client(viemClient),

    /** Methods for interacting with ERC721 tokens */
    erc721: makeErc721Client(viemClient),

    /** Methods for interacting with ERC1155 tokens */
    erc1155: makeErc1155Client(viemClient),

    /** Methods for interacting with token bundles */
    bundle: makeTokenBundleClient(viemClient),

    /** Methods for interacting with attestations */
    attestation: makeAttestationClient(viemClient),

    /** Utilities for StringObligation */
    stringResult: makeStringObligationClient(viemClient),

    /** The underlying Viem client */
    viemClient,

    /** Address of the account used to create this client */
    address: viemClient.account.address,

    /**
     * Retrieves an attestation by its UID
     * @param uid - The unique identifier of the attestation
     * @returns The attestation data
     */
    getAttestation: async (uid: `0x${string}`) => {
      return await getAttestation(viemClient, uid);
    },

    /**
     * Gets an attestation from a transaction hash
     * @param hash - The transaction hash
     * @returns The attestation event args
     */
    getAttestedEventFromTxHash: async (hash: `0x${string}`) => {
      const tx = await viemClient.waitForTransactionReceipt({ hash });
      return parseEventLogs({
        abi: easAbi.abi,
        eventName: "Attested",
        logs: tx.logs,
      })[0].args;
    },

    /**
     * Waits for an escrow to be fulfilled
     * @param contractAddress - The address of the escrow contract
     * @param buyAttestation - The UID of the buy attestation
     * @returns Object containing payment, fulfillment and fulfiller details
     *
     * @example
     * ```ts
     * // Wait for fulfillment of an escrow
     * const fulfillment = await client.waitForFulfillment(
     *   contractAddresses["Base Sepolia"].erc20EscrowObligation,
     *   escrow.attested.uid,
     * );
     * ```
     */
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
