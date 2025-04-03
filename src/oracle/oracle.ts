import type { AbiParameter, DecodeAbiParametersReturnType } from "viem";
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
      V extends readonly AbiParameter[],
    >(params: {
      contract: `0x${string}`;
      statementAbi: T;
      demandAbi: U;
      eventAbi: V;
      getAttestationUidFromEvent: (
        event: DecodeAbiParametersReturnType<V>,
      ) => `0x${string}`;
      arbitrate: (
        statement: DecodeAbiParametersReturnType<T>,
        demand: DecodeAbiParametersReturnType<U>,
      ) => Promise<boolean | null>;
    }) => {},
  };
};
