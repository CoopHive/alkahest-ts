import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiItem,
  parseAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";
import { contractAddresses } from "../config";

export const makeArbitersClient = (viemClient: ViemClient) => ({
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
  decodeTrustedPartyDemand: (demandData: `0x${string}`) => {
    return decodeAbiParameters(
      parseAbiParameters(
        "(address creator, address baseArbiter, bytes baseDemand)",
      ),
      demandData,
    )[0];
  },
  encodeSpecificAttestationDemand: (demand: { uid: `0x${string}` }) => {
    return encodeAbiParameters(parseAbiParameters("(bytes32 uid)"), [demand]);
  },
  decodeSpecificAttestationDemand: (demandData: `0x${string}`) => {
    return decodeAbiParameters(
      parseAbiParameters("(bytes32 uid)"),
      demandData,
    )[0];
  },
  encodeTrustedOracleDemand: (demand: { oracle: `0x${string}` }) => {
    return encodeAbiParameters(parseAbiParameters("(address oracle)"), [
      demand,
    ]);
  },
  decodeTrustedOracleDemand: (demandData: `0x${string}`) => {
    return decodeAbiParameters(
      parseAbiParameters("(address oracle)"),
      demandData,
    )[0];
  },
  arbitrateAsTrustedOracle: async (
    statement: `0x${string}`,
    decision: boolean,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].trustedOracleArbiter,
      abi: trustedOracleArbiterAbi.abi,
      functionName: "arbitrate",
      args: [statement, decision],
    });
    return hash;
  },
  waitForTrustedOracleArbitration: async (
    oracle: `0x${string}`,
    statement: `0x${string}`,
  ) => {
    const event = parseAbiItem(
      "event ArbitrationMade(address indexed oracle, bytes32 indexed statement, bool decision)",
    );
    const logs = await viemClient.getLogs({
      address: contractAddresses[viemClient.chain.name].trustedOracleArbiter,
      event,
      args: { oracle, statement },
      fromBlock: "earliest",
      toBlock: "latest",
    });

    if (logs.length) return logs[0].args;

    return new Promise((resolve) => {
      const unwatch = viemClient.watchEvent({
        address: contractAddresses[viemClient.chain.name].trustedOracleArbiter,
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
