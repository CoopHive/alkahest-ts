import {
  type AbiEvent,
  type AbiParameter,
  type BlockNumber,
  type BlockTag,
  type DecodeAbiParametersReturnType,
  type GetLogsParameters,
} from "viem";
import type { ChainAddresses } from "../types";
import type { ViemClient } from "../utils";

export const makeOracleClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  return {
    listenAndArbitrate: async <
      T extends readonly AbiParameter[],
      U extends readonly AbiParameter[],
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
      abis: { statement: T; demand: U };
      getAttestationUidFromEvent: (event: abiEvent) => `0x${string}`;
      arbitrate: (
        statement: DecodeAbiParametersReturnType<T>,
        demand: DecodeAbiParametersReturnType<U>,
      ) => Promise<boolean | null>;
    }) => {
      const logs = await viemClient.getLogs(params.getLogsArgs);
    },
  };
};
