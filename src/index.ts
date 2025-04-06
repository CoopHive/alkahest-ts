import {
  parseAbiItem,
  parseEventLogs,
  publicActions,
  type Account,
  type Chain,
  type Transport,
  type WalletClient,
} from "viem";
import { makeArbitersClient } from "./clients/arbiters";
import { makeAttestationClient } from "./clients/attestation";
import { makeErc1155Client } from "./clients/erc1155";
import { makeErc20Client } from "./clients/erc20";
import { makeErc721Client } from "./clients/erc721";
import { makeStringObligationClient } from "./clients/stringObligation";
import { makeTokenBundleClient } from "./clients/tokenBundle";
import {
  contractAddresses as defaultContractAddresses,
  supportedChains,
} from "./config";
import { makeOracleClient } from "./oracle/oracle";
import type { ChainAddresses } from "./types";
import { getAttestation } from "./utils";

import { abi as easAbi } from "./contracts/IEAS";

/**
 * Creates an Alkahest client for interacting with the protocol
 * @param walletClient - Viem wallet client object
 * @param contractAddresses - Optional custom contract addresses (useful for local testing)
 * @returns Client object with methods for interacting with different token standards and attestations
 *
 * @example
 * ```ts
 * const client = makeClient(
 *   privateKeyToAccount(process.env.PRIVKEY as `0x${string}`, {
 *     nonceManager, // automatic nonce management
 *   })
 * );
 * ```
 */
export const makeClient = (
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddresses?: Partial<ChainAddresses>,
) => {
  const viemClient = walletClient.extend(publicActions);

  // Determine base addresses to use
  let baseAddresses: ChainAddresses | undefined = undefined;
  if (supportedChains.includes(viemClient.chain.name)) {
    baseAddresses =
      defaultContractAddresses[
        viemClient.chain.name as keyof typeof defaultContractAddresses
      ];
  }

  if (!baseAddresses && !contractAddresses) {
    throw new Error(
      `Chain "${viemClient.chain.name}" is not supported and no custom contract addresses were provided.`,
    );
  }

  // Create a full ChainAddresses object with zero address fallbacks
  const zeroAddress = "0x0000000000000000000000000000000000000000" as const;
  const addresses: ChainAddresses = {
    eas: contractAddresses?.eas || baseAddresses?.eas || zeroAddress,
    easSchemaRegistry:
      contractAddresses?.easSchemaRegistry ||
      baseAddresses?.easSchemaRegistry ||
      zeroAddress,

    erc20EscrowObligation:
      contractAddresses?.erc20EscrowObligation ||
      baseAddresses?.erc20EscrowObligation ||
      zeroAddress,
    erc20PaymentObligation:
      contractAddresses?.erc20PaymentObligation ||
      baseAddresses?.erc20PaymentObligation ||
      zeroAddress,
    erc20BarterUtils:
      contractAddresses?.erc20BarterUtils ||
      baseAddresses?.erc20BarterUtils ||
      zeroAddress,

    erc721EscrowObligation:
      contractAddresses?.erc721EscrowObligation ||
      baseAddresses?.erc721EscrowObligation ||
      zeroAddress,
    erc721PaymentObligation:
      contractAddresses?.erc721PaymentObligation ||
      baseAddresses?.erc721PaymentObligation ||
      zeroAddress,
    erc721BarterUtils:
      contractAddresses?.erc721BarterUtils ||
      baseAddresses?.erc721BarterUtils ||
      zeroAddress,

    erc1155EscrowObligation:
      contractAddresses?.erc1155EscrowObligation ||
      baseAddresses?.erc1155EscrowObligation ||
      zeroAddress,
    erc1155PaymentObligation:
      contractAddresses?.erc1155PaymentObligation ||
      baseAddresses?.erc1155PaymentObligation ||
      zeroAddress,
    erc1155BarterUtils:
      contractAddresses?.erc1155BarterUtils ||
      baseAddresses?.erc1155BarterUtils ||
      zeroAddress,

    tokenBundleEscrowObligation:
      contractAddresses?.tokenBundleEscrowObligation ||
      baseAddresses?.tokenBundleEscrowObligation ||
      zeroAddress,
    tokenBundlePaymentObligation:
      contractAddresses?.tokenBundlePaymentObligation ||
      baseAddresses?.tokenBundlePaymentObligation ||
      zeroAddress,
    tokenBundleBarterUtils:
      contractAddresses?.tokenBundleBarterUtils ||
      baseAddresses?.tokenBundleBarterUtils ||
      zeroAddress,

    attestationEscrowObligation:
      contractAddresses?.attestationEscrowObligation ||
      baseAddresses?.attestationEscrowObligation ||
      zeroAddress,
    attestationEscrowObligation2:
      contractAddresses?.attestationEscrowObligation2 ||
      baseAddresses?.attestationEscrowObligation2 ||
      zeroAddress,
    attestationBarterUtils:
      contractAddresses?.attestationBarterUtils ||
      baseAddresses?.attestationBarterUtils ||
      zeroAddress,

    stringObligation:
      contractAddresses?.stringObligation ||
      baseAddresses?.stringObligation ||
      zeroAddress,

    trustedPartyArbiter:
      contractAddresses?.trustedPartyArbiter ||
      baseAddresses?.trustedPartyArbiter ||
      zeroAddress,
    trivialArbiter:
      contractAddresses?.trivialArbiter ||
      baseAddresses?.trivialArbiter ||
      zeroAddress,
    specificAttestationArbiter:
      contractAddresses?.specificAttestationArbiter ||
      baseAddresses?.specificAttestationArbiter ||
      zeroAddress,
    trustedOracleArbiter:
      contractAddresses?.trustedOracleArbiter ||
      baseAddresses?.trustedOracleArbiter ||
      zeroAddress,
  };

  return {
    /** Methods for interacting with Arbiters */
    arbiters: makeArbitersClient(viemClient, addresses),

    /** Methods for interacting with ERC20 tokens */
    erc20: makeErc20Client(viemClient, addresses),

    /** Methods for interacting with ERC721 tokens */
    erc721: makeErc721Client(viemClient, addresses),

    /** Methods for interacting with ERC1155 tokens */
    erc1155: makeErc1155Client(viemClient, addresses),

    /** Methods for interacting with token bundles */
    bundle: makeTokenBundleClient(viemClient, addresses),

    /** Methods for interacting with attestations */
    attestation: makeAttestationClient(viemClient, addresses),

    /** Utilities for StringObligation */
    stringObligation: makeStringObligationClient(viemClient, addresses),

    oracle: makeOracleClient(viemClient, addresses),

    /** The underlying Viem client */
    viemClient,

    /** Address of the account used to create this client */
    address: viemClient.account.address,

    /** Contract addresses being used */
    contractAddresses: addresses,

    /**
     * Retrieves an attestation by its UID
     * @param uid - The unique identifier of the attestation
     * @returns The attestation data
     */
    getAttestation: async (uid: `0x${string}`) => {
      return await getAttestation(viemClient, uid, addresses);
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
     *   contractAddresses.erc20EscrowObligation,
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

export * from "./config";
export * from "./types";
