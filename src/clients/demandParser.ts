import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";
import {
  createDefaultDemandParserConfig,
  addArbiterDecoder,
  parseDemandRecursive,
  parseDemandFromEscrow,
  flattenDemandTree,
  getLeafArbiters,
  findArbitersOfType,
  validateDemandTree,
  type DemandParserConfig,
  type ArbiterDecoder,
  type ParsedDemand,
} from "../utils/demandParser";

/**
 * Demand Parser Client Extension
 * 
 * Provides utilities for parsing composed demands made via logical arbiters.
 * Supports recursive parsing of AnyArbiter, AllArbiter, and other composing arbiters.
 */
export const makeDemandParserClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  // Initialize with default configuration
  let config = createDefaultDemandParserConfig(addresses);

  return {
    /**
     * Get the current demand parser configuration
     */
    getDemandParserConfig: (): DemandParserConfig => config,

    /**
     * Reset to default configuration with current addresses
     */
    resetDemandParserConfig: (): void => {
      config = createDefaultDemandParserConfig(addresses);
    },

    /**
     * Add a custom arbiter decoder to the configuration
     * @param arbiterAddress - The address of the arbiter contract
     * @param decoder - The decoder configuration for this arbiter
     * 
     * @example
     * ```ts
     * import { parseAbiParameters } from "viem";
     * 
     * client.addArbiterDecoder("0x123...", {
     *   type: "leaf",
     *   demandDataAbi: parseAbiParameters("(uint256 value)"),
     *   decodeDemandData: (demandData) => {
     *     return decodeAbiParameters(parseAbiParameters("(uint256 value)"), demandData)[0];
     *   },
     * });
     * ```
     */
    addArbiterDecoder: (arbiterAddress: `0x${string}`, decoder: ArbiterDecoder): void => {
      addArbiterDecoder(config, arbiterAddress, decoder);
    },

    /**
     * Parse a demand tree starting from an arbiter and demand data
     * @param arbiter - The arbiter contract address
     * @param demandData - The encoded demand data
     * @param maxDepth - Maximum recursion depth (default: 10)
     * @returns Parsed demand tree
     * 
     * @example
     * ```ts
     * const demand = client.parseDemand(
     *   "0x123...", // AnyArbiter address
     *   "0xabc...", // Encoded demand data
     * );
     * console.log(demand.type); // "composing"
     * console.log(demand.children); // Array of child demands
     * ```
     */
    parseDemand: (
      arbiter: `0x${string}`,
      demandData: `0x${string}`,
      maxDepth?: number,
    ): ParsedDemand => {
      return parseDemandRecursive(config, arbiter, demandData, maxDepth);
    },

    /**
     * Parse a demand tree from an escrow attestation
     * @param escrowData - The escrow attestation data
     * @returns Parsed demand tree
     * 
     * @example
     * ```ts
     * const escrowAttestation = await client.getAttestation(escrowUid);
     * const demand = client.parseDemandFromEscrow(escrowAttestation.data);
     * ```
     */
    parseDemandFromEscrow: (escrowData: `0x${string}`): ParsedDemand => {
      return parseDemandFromEscrow(config, escrowData);
    },

    /**
     * Flatten a demand tree into a list of all arbiters used
     * @param demand - The parsed demand tree
     * @returns Array of all arbiters with depth information
     * 
     * @example
     * ```ts
     * const flattened = client.flattenDemandTree(demand);
     * flattened.forEach(node => {
     *   console.log(`Depth ${node.depth}: ${node.arbiter} (${node.type})`);
     * });
     * ```
     */
    flattenDemandTree: (demand: ParsedDemand) => {
      return flattenDemandTree(demand);
    },

    /**
     * Get all leaf arbiters (non-composing) from a demand tree
     * @param demand - The parsed demand tree
     * @returns Array of leaf arbiters
     * 
     * @example
     * ```ts
     * const leafArbiters = client.getLeafArbiters(demand);
     * console.log(`Found ${leafArbiters.length} leaf arbiters`);
     * ```
     */
    getLeafArbiters: (demand: ParsedDemand) => {
      return getLeafArbiters(demand);
    },

    /**
     * Find all arbiters of a specific type in the demand tree
     * @param demand - The parsed demand tree
     * @param arbiterAddress - The arbiter address to search for
     * @returns Array of matching arbiters with depth information
     * 
     * @example
     * ```ts
     * const trustedOracles = client.findArbitersOfType(
     *   demand,
     *   addresses.trustedOracleArbiter
     * );
     * ```
     */
    findArbitersOfType: (demand: ParsedDemand, arbiterAddress: `0x${string}`) => {
      return findArbitersOfType(demand, arbiterAddress);
    },

    /**
     * Validate that all arbiters in a demand tree are known
     * @param demand - The parsed demand tree
     * @returns Validation result with unknown arbiters if any
     * 
     * @example
     * ```ts
     * const validation = client.validateDemandTree(demand);
     * if (!validation.isValid) {
     *   console.log("Unknown arbiters:", validation.unknownArbiters);
     * }
     * ```
     */
    validateDemandTree: (demand: ParsedDemand) => {
      return validateDemandTree(config, demand);
    },

    /**
     * Get a human-readable summary of a demand tree
     * @param demand - The parsed demand tree
     * @returns Summary string
     * 
     * @example
     * ```ts
     * console.log(client.getDemandSummary(demand));
     * // Output: "AnyArbiter with 3 children: TrustedOracleArbiter, AllArbiter, TrivialArbiter"
     * ```
     */
    getDemandSummary: (demand: ParsedDemand): string => {
      function getArbiterName(address: `0x${string}`): string {
        // Try to find a friendly name for known arbiters
        for (const [key, value] of Object.entries(addresses)) {
          if (value === address) {
            return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
          }
        }
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
      }

      function summarizeNode(node: ParsedDemand, depth = 0): string {
        const indent = "  ".repeat(depth);
        const name = getArbiterName(node.arbiter);
        
        if (node.type === "leaf") {
          return `${indent}${name} (leaf)`;
        } else {
          const childCount = node.children?.length || 0;
          const childSummaries = node.children?.map(child => 
            summarizeNode(child, depth + 1)
          ).join("\n") || "";
          
          return `${indent}${name} (${childCount} children)${childSummaries ? "\n" + childSummaries : ""}`;
        }
      }

      return summarizeNode(demand);
    },

    /**
     * Check if a demand tree contains a specific arbiter
     * @param demand - The parsed demand tree
     * @param arbiterAddress - The arbiter address to check for
     * @returns True if the arbiter is found in the tree
     * 
     * @example
     * ```ts
     * const hasTrustedOracle = client.demandContainsArbiter(
     *   demand,
     *   addresses.trustedOracleArbiter
     * );
     * ```
     */
    demandContainsArbiter: (demand: ParsedDemand, arbiterAddress: `0x${string}`): boolean => {
      const matches = findArbitersOfType(demand, arbiterAddress);
      return matches.length > 0;
    },

    /**
     * Get the depth of the deepest arbiter in the demand tree
     * @param demand - The parsed demand tree
     * @returns Maximum depth
     * 
     * @example
     * ```ts
     * const maxDepth = client.getDemandTreeDepth(demand);
     * console.log(`Demand tree has ${maxDepth + 1} levels`);
     * ```
     */
    getDemandTreeDepth: (demand: ParsedDemand): number => {
      const flattened = flattenDemandTree(demand);
      return Math.max(...flattened.map(node => node.depth));
    },

    /**
     * Count arbiters by type in the demand tree
     * @param demand - The parsed demand tree
     * @returns Object with counts of leaf vs composing arbiters
     * 
     * @example
     * ```ts
     * const counts = client.countArbitersByType(demand);
     * console.log(`${counts.leaf} leaf arbiters, ${counts.composing} composing arbiters`);
     * ```
     */
    countArbitersByType: (demand: ParsedDemand): { leaf: number; composing: number } => {
      const flattened = flattenDemandTree(demand);
      return flattened.reduce(
        (counts, node) => {
          counts[node.type]++;
          return counts;
        },
        { leaf: 0, composing: 0 }
      );
    },
  };
};