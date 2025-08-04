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

/**
 * General Arbiters Client
 * 
 * Handles basic arbiters that don't depend on specific attestation properties:
 * - IntrinsicsArbiter2: Schema-based validation
 * - TrustedPartyArbiter: Creator-based validation with composable base arbiter
 * - SpecificAttestationArbiter: Validates against a specific attestation UID
 * - TrustedOracleArbiter: Oracle-based decision making with arbitration requests
 *   - Supports requestArbitration for requesting arbitration from specific oracles
 *   - Provides listening functions for oracles to respond only to arbitration requests
 */
export const makeGeneralArbitersClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  // Cache the parsed event ABIs to avoid re-parsing on each call
  const arbitrationMadeEvent = parseAbiItem(
    "event ArbitrationMade(bytes32 indexed obligation, address indexed oracle, bool decision)",
  );
  
  const arbitrationRequestedEvent = parseAbiItem(
    "event ArbitrationRequested(bytes32 indexed obligation, address indexed oracle)",
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
     * @param obligation - bytes32 obligation
     * @param decision - bool decision
     * @returns transaction hash
     */
    arbitrateAsTrustedOracle: async (
      obligation: `0x${string}`,
      decision: boolean,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "arbitrate",
        args: [obligation, decision],
      });
      return hash;
    },

    /**
     * Request arbitration on an obligation from TrustedOracleArbiter
     * @param obligation - bytes32 obligation uid
     * @param oracle - address of the oracle to request arbitration from
     * @returns transaction hash
     */
    requestArbitrationFromTrustedOracle: async (
      obligation: `0x${string}`,
      oracle: `0x${string}`,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "requestArbitration",
        args: [obligation, oracle],
      });
      return hash;
    },

    /**
     * Check if an arbitration has already been made for a specific obligation by a specific oracle
     * @param obligation - bytes32 obligation uid
     * @param oracle - address of the oracle
     * @returns the arbitration result if exists, undefined if not
     */
    checkExistingArbitration: async (
      obligation: `0x${string}`,
      oracle: `0x${string}`,
    ): Promise<{
      obligation: `0x${string}`;
      oracle: `0x${string}`;
      decision: boolean;
    } | undefined> => {
      const logs = await viemClient.getLogs({
        address: addresses.trustedOracleArbiter,
        event: arbitrationMadeEvent,
        args: { obligation, oracle },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      if (logs.length > 0) {
        return logs[0].args as {
          obligation: `0x${string}`;
          oracle: `0x${string}`;
          decision: boolean;
        };
      }

      return undefined;
    },

    /**
     * Wait for an arbitration to be made on a TrustedOracleArbiter
     * @param obligation - bytes32 obligation uid
     * @param oracle - address of the oracle
     * @param pollingInterval - polling interval in milliseconds (default: 1000)
     * @returns the event args
     */
    waitForTrustedOracleArbitration: async (
      obligation: `0x${string}`,
      oracle: `0x${string}`,
      pollingInterval?: number,
    ): Promise<{
      obligation?: `0x${string}` | undefined;
      oracle?: `0x${string}` | undefined;
      decision?: boolean | undefined;
    }> => {
      const logs = await viemClient.getLogs({
        address: addresses.trustedOracleArbiter,
        event: arbitrationMadeEvent,
        args: { obligation, oracle },
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
          args: { obligation, oracle },
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
     * Wait for an arbitration request to be made on a TrustedOracleArbiter
     * @param obligation - bytes32 obligation uid  
     * @param oracle - address of the oracle
     * @param pollingInterval - polling interval in milliseconds (default: 1000)
     * @returns the event args
     */
    waitForTrustedOracleArbitrationRequest: async (
      obligation: `0x${string}`,
      oracle: `0x${string}`,
      pollingInterval?: number,
    ): Promise<{
      obligation?: `0x${string}` | undefined;
      oracle?: `0x${string}` | undefined;
    }> => {
      const logs = await viemClient.getLogs({
        address: addresses.trustedOracleArbiter,
        event: arbitrationRequestedEvent,
        args: { obligation, oracle },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      if (logs.length) return logs[0].args;

      // Use optimal polling interval based on transport type
      const optimalInterval = getOptimalPollingInterval(viemClient, pollingInterval ?? 1000);

      return new Promise((resolve) => {
        const unwatch = viemClient.watchEvent({
          address: addresses.trustedOracleArbiter,
          event: arbitrationRequestedEvent,
          args: { obligation, oracle },
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
     * Listen for arbitration requests and only arbitrate on request
     * This function continuously listens for ArbitrationRequested events
     * and calls the provided arbitration handler for each request
     * @param oracle - address of the oracle (filter for requests to this oracle)
     * @param arbitrationHandler - function to handle arbitration requests
     * @param pollingInterval - polling interval in milliseconds (default: 1000)
     * @returns unwatch function to stop listening
     */
    listenForArbitrationRequestsOnly: (
      oracle: `0x${string}`,
      arbitrationHandler: (obligation: `0x${string}`, oracle: `0x${string}`) => Promise<boolean>,
      pollingInterval?: number,
    ) => {
      // Use optimal polling interval based on transport type
      const optimalInterval = getOptimalPollingInterval(viemClient, pollingInterval ?? 1000);

      return viemClient.watchEvent({
        address: addresses.trustedOracleArbiter,
        event: arbitrationRequestedEvent,
        args: { oracle },
        pollingInterval: optimalInterval,
        onLogs: async (logs) => {
          for (const log of logs) {
            const { obligation: requestedObligation, oracle: requestedOracle } = log.args;
            if (requestedObligation && requestedOracle) {
              try {
                // Call the arbitration handler to get the decision
                const decision = await arbitrationHandler(requestedObligation, requestedOracle);
                
                // Submit the arbitration
                await viemClient.writeContract({
                  address: addresses.trustedOracleArbiter,
                  abi: trustedOracleArbiterAbi.abi,
                  functionName: "arbitrate",
                  args: [requestedObligation, decision],
                });
              } catch (error) {
                console.error(`Failed to arbitrate for obligation ${requestedObligation}:`, error);
              }
            }
          }
        },
        fromBlock: 1n,
      });
    },
  };
};
