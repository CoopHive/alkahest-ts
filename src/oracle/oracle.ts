import {
  decodeAbiParameters,
  type AbiEvent,
  type AbiParameter,
  type Address,
  type BlockNumber,
  type BlockTag,
  type DecodeAbiParametersReturnType,
  type GetEventArgs,
} from "viem";
import type { ChainAddresses } from "../types";
import { getAttestation, type ViemClient } from "../utils";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";

type ArbitrateParams<
  T extends readonly AbiParameter[],
  abiEvent extends AbiEvent,
  abiEvents extends readonly AbiEvent[] = [abiEvent],
  strict extends boolean | undefined = undefined,
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
> = {
  getLogsArgs: {
    address?: Address | Address[];
    event: abiEvent;
    args?: any;
    fromBlock?: fromBlock;
    toBlock?: toBlock;
  };
  statementAbi: T;
  getAttestationUidFromEvent: (
    event: LogEventType<abiEvent, abiEvents, strict>,
  ) => `0x${string}`;
  arbitrate: (
    statement: DecodeAbiParametersReturnType<T>,
  ) => Promise<boolean | null>;
};

type LogEventType<
  abiEvent extends AbiEvent,
  abiEvents extends readonly AbiEvent[] = [abiEvent],
  strict extends boolean | undefined = undefined,
> = GetEventArgs<
  abiEvents,
  abiEvent["name"],
  {
    EnableUnion: false;
    IndexedOnly: false;
    Required: strict extends boolean ? strict : false;
  }
>;

export const makeOracleClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  const arbitratePast = async <
    T extends readonly AbiParameter[],
    const abiEvent extends AbiEvent,
    const abiEvents extends readonly AbiEvent[] = [abiEvent],
    strict extends boolean | undefined = undefined,
    fromBlock extends BlockNumber | BlockTag | undefined = undefined,
    toBlock extends BlockNumber | BlockTag | undefined = undefined,
  >(
    params: ArbitrateParams<T, abiEvent, abiEvents, strict, fromBlock, toBlock>,
  ) => {
    const logs = await viemClient.getLogs(params.getLogsArgs);
    const decisions = await Promise.all(
      logs.map(async (log) => {
        const uid = params.getAttestationUidFromEvent(
          log.args as LogEventType<abiEvent, abiEvents, strict>,
        );
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
      }),
    );

    return decisions;
  };
  return {
    arbitratePast,
    listenAndArbitrate: async <
      T extends readonly AbiParameter[],
      const abiEvent extends AbiEvent,
      const abiEvents extends readonly AbiEvent[] = [abiEvent],
      strict extends boolean | undefined = undefined,
      fromBlock extends BlockNumber | BlockTag | undefined = undefined,
      toBlock extends BlockNumber | BlockTag | undefined = undefined,
    >(
      params: ArbitrateParams<
        T,
        abiEvent,
        abiEvents,
        strict,
        fromBlock,
        toBlock
      >,
    ) => {
      const decisions = await arbitratePast(params);

      const unwatch = viemClient.watchEvent({
        address: params.getLogsArgs.address,
        event: params.getLogsArgs.event,
        args: params.getLogsArgs.args,
        onLogs: async (logs) => {
          await Promise.all(
            logs.map(async (log) => {
              const uid = params.getAttestationUidFromEvent(
                log.args as LogEventType<abiEvent, abiEvents, strict>,
              );
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
            }),
          );
        },
        fromBlock: 1n,
      });

      return { decisions, unwatch };
    },
  };
};
