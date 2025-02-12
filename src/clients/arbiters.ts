import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";

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
});
