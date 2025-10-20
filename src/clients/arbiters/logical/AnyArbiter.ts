import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as AnyArbiterAbi } from "../../../contracts/AnyArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const anyArbiterDecodeDemandFunction = getAbiItem({
  abi: AnyArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const anyDemandDataType = anyArbiterDecodeDemandFunction.outputs[0];

/**
 * AnyArbiter Client
 * 
 * Handles logical OR operations for combining multiple arbiters.
 * Returns true if ANY of the provided arbiters returns true.
 * This allows for flexible validation where only one condition needs to be met.
 */
export const makeAnyArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes AnyArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address[] arbiters, bytes[] demands}
     * @returns abi encoded bytes
     */
    encode: (demand: { arbiters: `0x${string}`[]; demands: `0x${string}`[] }) => {
      return encodeAbiParameters([anyDemandDataType], [demand]);
    },

    /**
     * Decodes AnyArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decode: (demandData: `0x${string}`) => {
      return decodeAbiParameters([anyDemandDataType], demandData)[0];
    },
  };
};