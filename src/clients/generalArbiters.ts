import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiItem,
  parseAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";
import { getOptimalPollingInterval } from "../utils";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";
import { abi as commitTestsArbiterAbi } from "../contracts/CommitTestsArbiter";

// Enum for CommitTestsArbiter.CommitAlgo from the contract
export enum CommitTestsCommitAlgo {
  Sha1 = 0,
  Sha256 = 1,
}

/**
 * General Arbiters Client
 * 
 * Handles basic arbiters that don't depend on specific attestation properties:
 * - IntrinsicsArbiter2: Schema-based validation
 * - TrustedPartyArbiter: Creator-based validation with composable base arbiter
 * - SpecificAttestationArbiter: Validates against a specific attestation UID
 * - TrustedOracleArbiter: Oracle-based decision making with arbitration requests
 * - CommitTestsArbiter: Commit validation using oracle arbitration (same demand structure as TrustedOracleArbiter)
 */
export const makeGeneralArbitersClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  // Cache the parsed event ABI to avoid re-parsing on each call
  const arbitrationMadeEvent = parseAbiItem(
    "event ArbitrationMade(bytes32 indexed statement, address indexed oracle, bool decision)",
  );

  return {
    /**
     * Encodes IntrinsicsArbiter2.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 schema}
     * @returns abi encoded bytes
     */
    encodeIntrinsics2Demand: (demand: { schema: `0x${string}` }) => {
      return encodeAbiParameters(parseAbiParameters("(bytes32 schema)"), [
        demand,
      ]);
    },

    /**
     * Decodes IntrinsicsArbiter2.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeIntrinsics2Demand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bytes32 schema)"),
        demandData,
      )[0];
    },

    /**
     * Encodes TrustedPartyArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, address creator}
     * @returns abi encoded bytes
     */
    encodeTrustedPartyDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      creator: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters(
          "(address baseArbiter, bytes baseDemand, address creator)",
        ),
        [demand],
      );
    },

    /**
     * Decodes TrustedPartyArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeTrustedPartyDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters(
          "(address baseArbiter, bytes baseDemand, address creator)",
        ),
        demandData,
      )[0];
    },

    /**
     * Encodes SpecificAttestationArbiter.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 uid}
     * @returns abi encoded bytes
     */
    encodeSpecificAttestationDemand: (demand: { uid: `0x${string}` }) => {
      return encodeAbiParameters(parseAbiParameters("(bytes32 uid)"), [demand]);
    },

    /**
     * Decodes SpecificAttestationArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeSpecificAttestationDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bytes32 uid)"),
        demandData,
      )[0];
    },

    /**
     * Encodes TrustedOracleArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address oracle, bytes data}
     * @returns abi encoded bytes
     */
    encodeTrustedOracleDemand: (demand: {
      oracle: `0x${string}`;
      data: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address oracle, bytes data)"),
        [demand],
      );
    },

    /**
     * Decodes TrustedOracleArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeTrustedOracleDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address oracle, bytes data)"),
        demandData,
      )[0];
    },

    /**
     * Arbitrate on the validality of an obligation fulfilling
     * a demand for TrustedOracleArbiter
     * @param statement - bytes32 statement
     * @param decision - bool decision
     * @returns transaction hash
     */
    arbitrateAsTrustedOracle: async (
      statement: `0x${string}`,
      decision: boolean,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "arbitrate",
        args: [statement, decision],
      });
      return hash;
    },

    /**
     * Check if an arbitration has already been made for a specific statement by a specific oracle
     * @param statement - bytes32 statement uid
     * @param oracle - address of the oracle
     * @returns the arbitration result if exists, undefined if not
     */
    checkExistingArbitration: async (
      statement: `0x${string}`,
      oracle: `0x${string}`,
    ): Promise<{
      statement: `0x${string}`;
      oracle: `0x${string}`;
      decision: boolean;
    } | undefined> => {
      const logs = await viemClient.getLogs({
        address: addresses.trustedOracleArbiter,
        event: arbitrationMadeEvent,
        args: { statement, oracle },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      if (logs.length > 0) {
        return logs[0].args as {
          statement: `0x${string}`;
          oracle: `0x${string}`;
          decision: boolean;
        };
      }

      return undefined;
    },

    /**
     * Wait for an arbitration to be made on a TrustedOracleArbiter
     * @param statement - bytes32 statement uid
     * @param oracle - address of the oracle
     * @param pollingInterval - polling interval in milliseconds (default: 1000)
     * @returns the event args
     */
    waitForTrustedOracleArbitration: async (
      statement: `0x${string}`,
      oracle: `0x${string}`,
      pollingInterval?: number,
    ): Promise<{
      statement?: `0x${string}` | undefined;
      oracle?: `0x${string}` | undefined;
      decision?: boolean | undefined;
    }> => {
      const logs = await viemClient.getLogs({
        address: addresses.trustedOracleArbiter,
        event: arbitrationMadeEvent,
        args: { statement, oracle },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      if (logs.length) return logs[0].args;

      // Use optimal polling interval based on transport type
      const optimalInterval = getOptimalPollingInterval(viemClient, pollingInterval ?? 1000);

      return new Promise((resolve) => {
        const unwatch = viemClient.watchEvent({
          address: addresses.trustedOracleArbiter,
          event: arbitrationMadeEvent,
          args: { statement, oracle },
          pollingInterval: optimalInterval,
          onLogs: (logs) => {
            resolve(logs[0].args);
            unwatch();
          },
          fromBlock: 1n,
        });
      });
    },

    /**
     * Encodes CommitTestsArbiter.CommitTestsDemandData to bytes.
     * @param demand - struct CommitTestsDemandData {address oracle, string testsCommitHash, string testsCommand, uint8 testsCommitAlgo, string[] hosts}
     * @returns abi encoded bytes
     */
    encodeCommitTestsDemand: (demand: {
      oracle: `0x${string}`;
      testsCommitHash: string;
      testsCommand: string;
      testsCommitAlgo: number; // 0 = Sha1, 1 = Sha256
      hosts: string[];
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address oracle, string testsCommitHash, string testsCommand, uint8 testsCommitAlgo, string[] hosts)"),
        [demand],
      );
    },

    /**
     * Decodes CommitTestsArbiter.CommitTestsDemandData from bytes.
     * @param demandData - CommitTestsDemandData as abi encoded bytes
     * @returns the decoded CommitTestsDemandData object
     */
    decodeCommitTestsDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address oracle, string testsCommitHash, string testsCommand, uint8 testsCommitAlgo, string[] hosts)"),
        demandData,
      )[0];
    },


  };
};
