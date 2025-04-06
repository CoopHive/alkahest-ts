import {
  decodeAbiParameters,
  parseAbiItem,
  parseAbiParameter,
  parseAbiParameters,
  type AbiEvent,
  type AbiParameter,
  type Address,
  type BlockNumber,
  type BlockTag,
  type DecodeAbiParametersReturnType,
  type GetEventArgs,
  type GetLogsReturnType,
  type Log,
} from "viem";
import type { ChainAddresses } from "../types";
import { getAttestation, type ViemClient } from "../utils";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";

type ArbitrateParams<T extends readonly AbiParameter[]> = {
  contractAddress: Address | Address[];
  recipient?: Address;
  statementAbi: T;
  arbitrate: (
    statement: DecodeAbiParametersReturnType<T>,
  ) => Promise<boolean | null>;
};

export const makeOracleClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  const attestedEvent = parseAbiItem(
    "event Attested(address indexed recipient, address indexed attester, bytes32 uid, bytes32 indexed schemaUID)",
  );

  const arbitrateLog = async <T extends readonly AbiParameter[]>(
    params: ArbitrateParams<T>,
    log: Log<bigint, number, boolean, typeof attestedEvent>,
  ) => {
    const uid = log.args.uid!;
    const attestation = await getAttestation(viemClient, uid);

    const statement = decodeAbiParameters(
      params.statementAbi,
      attestation.data,
    );

    const decision = await params.arbitrate(statement);
    if (decision === null) return null;

    const hash = await viemClient.writeContract({
      address: addresses.trustedOracleArbiter,
      abi: trustedOracleArbiterAbi.abi,
      functionName: "arbitrate",
      args: [uid, decision],
    });
    return { hash, decision };
  };

  const arbitratePast = async <T extends readonly AbiParameter[]>(
    params: ArbitrateParams<T>,
  ) => {
    const logs = await viemClient.getLogs({
      address: params.contractAddress,
      event: attestedEvent,
      args: { recipient: params.recipient },
      fromBlock: "earliest",
      toBlock: "latest",
    });
    const decisions = await Promise.all(
      logs.map(async (log) => arbitrateLog(params, log)),
    );

    return decisions;
  };
  return {
    arbitratePast,
    listenAndArbitrate: async <T extends readonly AbiParameter[]>(
      params: ArbitrateParams<T>,
    ) => {
      const decisions = await arbitratePast(params);

      const unwatch = viemClient.watchEvent({
        address: params.contractAddress,
        event: attestedEvent,
        args: { recipient: params.recipient },
        onLogs: async (logs) => {
          await Promise.all(logs.map(async (log) => arbitrateLog(params, log)));
        },
        fromBlock: 1n,
      });

      return { decisions, unwatch };
    },
  };
};
