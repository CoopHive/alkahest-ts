import {
  decodeAbiParameters,
  parseAbiItem,
  type AbiParameter,
  type Address,
  type DecodeAbiParametersReturnType,
  type Log,
} from "viem";
import type { ChainAddresses } from "../types";
import { getAttestation, type ViemClient } from "../utils";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";

type ArbitrateParams<StatementData extends readonly AbiParameter[]> = {
  fulfillment: {
    address: Address | Address[];
    statementAbi: StatementData;
    recipient?: Address;
    uid?: `0x${string}`;
  };
  arbitrate: (
    statement: DecodeAbiParametersReturnType<StatementData>,
  ) => Promise<boolean | null>;
};

export const makeOracleClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  const attestedEvent = parseAbiItem(
    "event Attested(address indexed recipient, address indexed attester, bytes32 uid, bytes32 indexed schemaUID)",
  );

  const arbitrateLog = async <StatementData extends readonly AbiParameter[]>(
    params: ArbitrateParams<StatementData>,
    log: Log<bigint, number, boolean, typeof attestedEvent>,
  ) => {
    const uid = log.args.uid!;
    const attestation = await getAttestation(viemClient, uid, addresses);

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
    return { hash, log, statement, decision };
  };

  const arbitratePast = async <T extends readonly AbiParameter[]>(
    params: ArbitrateParams<T>,
  ) => {
    const logs = await viemClient.getLogs({
      address: addresses.eas,
      event: attestedEvent,
      args: { recipient: params.recipient, attester: params.contractAddress },
      fromBlock: "earliest",
      toBlock: "latest",
    });
    const decisions = await Promise.all(
      logs.map((log) => arbitrateLog(params, log)),
    );

    return decisions;
  };
  return {
    arbitratePast,
    listenAndArbitrate: async <StatementData extends readonly AbiParameter[]>(
      params: ArbitrateParams<StatementData> & {
        onAfterArbitrate?: (decision: {
          hash: `0x${string}`;
          log: Log<bigint, number, boolean, typeof attestedEvent>;
          statement: DecodeAbiParametersReturnType<StatementData>;
          decision: boolean | null;
        }) => Promise<void>;
        pollingInterval?: number;
      },
    ) => {
      const decisions = await arbitratePast(params);

      const unwatch = viemClient.watchEvent({
        address: addresses.eas,
        event: attestedEvent,
        args: { recipient: params.recipient, attester: params.contractAddress },
        onLogs: async (logs) => {
          await Promise.all(
            logs.map(async (log) => {
              const decision = await arbitrateLog(params, log);
              params.onAfterArbitrate &&
                params.onAfterArbitrate(
                  decision as {
                    hash: `0x${string}`;
                    log: Log<bigint, number, boolean, typeof attestedEvent>;
                    statement: DecodeAbiParametersReturnType<StatementData>;
                    decision: boolean | null;
                  },
                );
            }),
          );
        },
        pollingInterval: params.pollingInterval,
      });

      return { decisions, unwatch };
    },
  };
};
