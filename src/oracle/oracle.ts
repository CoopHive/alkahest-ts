import {
  decodeAbiParameters,
  type AbiEvent,
  type AbiParameter,
  type BlockNumber,
  type BlockTag,
  type DecodeAbiParametersReturnType,
  type GetLogsParameters,
  type Log,
  type MaybeAbiEventName,
} from "viem";
import type { ChainAddresses } from "../types";
import { getAttestation, type ViemClient } from "../utils";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";

export const makeOracleClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  const arbitratePast = async <
    T extends readonly AbiParameter[],
    const abiEvent extends AbiEvent | undefined = undefined,
    const abiEvents extends
      | readonly AbiEvent[]
      | readonly unknown[]
      | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined,
    strict extends boolean | undefined = undefined,
    fromBlock extends BlockNumber | BlockTag | undefined = undefined,
    toBlock extends BlockNumber | BlockTag | undefined = undefined,
  >(params: {
    getLogsArgs: GetLogsParameters<
      abiEvent | undefined,
      abiEvents,
      strict,
      fromBlock,
      toBlock
    >;
    statementAbi: T;
    getAttestationUidFromEventLog: (
      event: Log<
        bigint,
        number,
        boolean,
        abiEvent | undefined,
        strict,
        abiEvents | undefined,
        MaybeAbiEventName<abiEvent>
      >,
    ) => `0x${string}`;
    arbitrate: (
      statement: DecodeAbiParametersReturnType<T>,
    ) => Promise<boolean | null>;
  }) => {
    const logs = await viemClient.getLogs(params.getLogsArgs);
    const decisions = await Promise.all(
      logs.map(async (log) => {
        const attestationUid = params.getAttestationUidFromEventLog(log);
        const attestation = await getAttestation(viemClient, attestationUid);

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
          args: [attestationUid, decision],
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
      const abiEvent extends AbiEvent | undefined = undefined,
      const abiEvents extends
        | readonly AbiEvent[]
        | readonly unknown[]
        | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined,
      strict extends boolean | undefined = undefined,
      fromBlock extends BlockNumber | BlockTag | undefined = undefined,
      toBlock extends BlockNumber | BlockTag | undefined = undefined,
    >(params: {
      getLogsArgs: GetLogsParameters<
        abiEvent | undefined,
        abiEvents,
        strict,
        fromBlock,
        toBlock
      >;
      statementAbi: T;
      getAttestationUidFromEventLog: (
        event: Log<
          bigint,
          number,
          boolean,
          abiEvent | undefined,
          strict,
          abiEvents | undefined,
          MaybeAbiEventName<abiEvent>
        >,
      ) => `0x${string}`;
      arbitrate: (
        statement: DecodeAbiParametersReturnType<T>,
      ) => Promise<boolean | null>;
    }) => {
      const decisions = await arbitratePast(params);
      const unwatch = viemClient.watchEvent({
        address: params.getLogsArgs.address,
        event: params.getLogsArgs.event,
        args: params.getLogsArgs.args,
        onLogs: async (logs) => {
          await Promise.all(
            logs.map(async (log) => {
              const attestationUid = params.getAttestationUidFromEventLog(log);
              const attestation = await getAttestation(
                viemClient,
                attestationUid,
              );

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
                args: [attestationUid, decision],
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
