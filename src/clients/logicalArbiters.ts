import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";

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
      return encodeAbiParameters(
        parseAbiParameters("(address[] arbiters, bytes[] demands)"),
        [demand],
      );
    },

    /**
     * Decodes AnyArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeAnyArbiterDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address[] arbiters, bytes[] demands)"),
        demandData,
      )[0];
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
      return encodeAbiParameters(
        parseAbiParameters("(address[] arbiters, bytes[] demands)"),
        [demand],
      );
    },

    /**
     * Decodes AllArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeAllArbiterDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address[] arbiters, bytes[] demands)"),
        demandData,
      )[0];
    },
  };
};
