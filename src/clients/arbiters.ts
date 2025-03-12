import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiItem,
  parseAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";

export const makeArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => ({
  /**
   * Encodes TrustedPartyArbiter.DemandData to bytes.
   * @param demand - struct DemandData {address creator, address baseArbiter, bytes baseDemand}
   * @returns abi encoded bytes
   */
  encodeTrustedPartyDemand: (demand: {
    creator: `0x${string}`;
    baseArbiter: `0x${string}`;
    baseDemand: `0x${string}`;
  }) => {
    return encodeAbiParameters(
      parseAbiParameters(
        "(address creator, address baseArbiter, bytes baseDemand)",
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
        "(address creator, address baseArbiter, bytes baseDemand)",
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
   * @param demand - struct DemandData {address oracle}
   * @returns abi encoded bytes
   */
  encodeTrustedOracleDemand: (demand: { oracle: `0x${string}` }) => {
    return encodeAbiParameters(parseAbiParameters("(address oracle)"), [
      demand,
    ]);
  },
  /**
   * Decodes TrustedOracleArbiter.DemandData from bytes.
   * @param demandData - DemandData as abi encoded bytes
   * @returns the decoded DemandData object
   */
  decodeTrustedOracleDemand: (demandData: `0x${string}`) => {
    return decodeAbiParameters(
      parseAbiParameters("(address oracle)"),
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
   * Wait for an arbitration to be made on a TrustedOracleArbiter
   * @param oracle - address of the oracle
   * @param statement - bytes32 statement uid
   * @returns the event args
   */
  waitForTrustedOracleArbitration: async (
    oracle: `0x${string}`,
    statement: `0x${string}`,
  ): Promise<{
    oracle?: `0x${string}` | undefined;
    statement?: `0x${string}` | undefined;
    decision?: boolean | undefined;
  }> => {
    const event = parseAbiItem(
      "event ArbitrationMade(address indexed oracle, bytes32 indexed statement, bool decision)",
    );
    const logs = await viemClient.getLogs({
      address: addresses.trustedOracleArbiter,
      event,
      args: { oracle, statement },
      fromBlock: "earliest",
      toBlock: "latest",
    });

    if (logs.length) return logs[0].args;

    return new Promise((resolve) => {
      const unwatch = viemClient.watchEvent({
        address: addresses.trustedOracleArbiter,
        event,
        args: { oracle, statement },
        pollingInterval: 1000,
        onLogs: (logs) => {
          resolve(logs[0].args);
          unwatch();
        },
        fromBlock: 1n,
      });
    });
  },
});
