import {
  decodeAbiParameters,
  encodeAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";
import { abi as AllArbiterAbi } from "../contracts/AllArbiter";
import { abi as AnyArbiterAbi } from "../contracts/AnyArbiter";

/**
 * Logical Arbiters Client
 * 
 * Handles logical composition arbiters for combining multiple arbiters:
 * - AnyArbiter: Returns true if ANY of the provided arbiters returns true (logical OR)
 * - AllArbiter: Returns true if ALL of the provided arbiters return true (logical AND)
 * 
 * These arbiters take arrays of arbiter addresses and their corresponding demand data,
 * allowing for complex logical compositions of arbitration rules.
 */
export const makeLogicalArbitersClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  // Extract DemandData struct ABI from contract ABIs
  const anyArbiterDecodeDemandFunction = AnyArbiterAbi.abi.find(
    (item) => item.type === 'function' && item.name === 'decodeDemandData'
  );
  const allArbiterDecodeDemandFunction = AllArbiterAbi.abi.find(
    (item) => item.type === 'function' && item.name === 'decodeDemandData'
  );

  // Extract the DemandData struct type from the function outputs
  const anyDemandDataType = anyArbiterDecodeDemandFunction?.outputs?.[0];
  const allDemandDataType = allArbiterDecodeDemandFunction?.outputs?.[0];

  return {
    /**
     * Encodes AnyArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address[] arbiters, bytes[] demands}
     * @returns abi encoded bytes
     */
    encodeAnyArbiterDemand: (demand: {
      arbiters: `0x${string}`[];
      demands: `0x${string}`[];
    }) => {
      if (!anyDemandDataType) {
        throw new Error("AnyArbiter DemandData ABI not found");
      }
      return encodeAbiParameters([anyDemandDataType], [demand]);
    },

    /**
     * Decodes AnyArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeAnyArbiterDemand: (demandData: `0x${string}`) => {
      if (!anyDemandDataType) {
        throw new Error("AnyArbiter DemandData ABI not found");
      }
      return decodeAbiParameters([anyDemandDataType], demandData)[0];
    },

    /**
     * Encodes AllArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address[] arbiters, bytes[] demands}
     * @returns abi encoded bytes
     */
    encodeAllArbiterDemand: (demand: {
      arbiters: `0x${string}`[];
      demands: `0x${string}`[];
    }) => {
      if (!allDemandDataType) {
        throw new Error("AllArbiter DemandData ABI not found");
      }
      return encodeAbiParameters([allDemandDataType], [demand]);
    },

    /**
     * Decodes AllArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeAllArbiterDemand: (demandData: `0x${string}`) => {
      if (!allDemandDataType) {
        throw new Error("AllArbiter DemandData ABI not found");
      }
      return decodeAbiParameters([allDemandDataType], demandData)[0];
    },
  };
};
