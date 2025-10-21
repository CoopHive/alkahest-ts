import {
  decodeAbiParameters,
  parseAbiParameters,
  type AbiParameter,
  type DecodeAbiParametersReturnType,
} from "viem";
import type { ChainAddresses } from "../types";

// Core types for demand parsing
export type DemandParserConfig = {
  arbiterDecoders: Map<`0x${string}`, ArbiterDecoder>;
};

export type ArbiterDecoder = {
  type: "leaf" | "composing";
  demandDataAbi: readonly AbiParameter[];
  decodeDemandData: (demandData: `0x${string}`) => any;
  extractNestedDemands?: (decoded: any) => Array<{
    arbiter: `0x${string}`;
    demand: `0x${string}`;
  }>;
};

export type ParsedDemand = {
  arbiter: `0x${string}`;
  demandData: `0x${string}`;
  decoded: any;
  type: "leaf" | "composing";
  children?: ParsedDemand[];
};

/**
 * Creates a default demand parser configuration with built-in arbiters
 */
export function createDefaultDemandParserConfig(addresses: ChainAddresses): DemandParserConfig {
  const arbiterDecoders = new Map<`0x${string}`, ArbiterDecoder>();

  // TrustedOracleArbiter - leaf arbiter
  if (addresses.trustedOracleArbiter && addresses.trustedOracleArbiter !== "0x0000000000000000000000000000000000000000") {
    arbiterDecoders.set(addresses.trustedOracleArbiter, {
      type: "leaf",
      demandDataAbi: parseAbiParameters("(address oracle, bytes data)"),
      decodeDemandData: (demandData: `0x${string}`) => {
        return decodeAbiParameters(
          parseAbiParameters("(address oracle, bytes data)"),
          demandData,
        )[0];
      },
    });
  }

  // TrivialArbiter - leaf arbiter
  if (addresses.trivialArbiter && addresses.trivialArbiter !== "0x0000000000000000000000000000000000000000") {
    arbiterDecoders.set(addresses.trivialArbiter, {
      type: "leaf",
      demandDataAbi: [], // No demand data
      decodeDemandData: (demandData: `0x${string}`) => {
        return {}; // TrivialArbiter has no demand data
      },
    });
  }

  // SpecificAttestationArbiter - leaf arbiter
  if (addresses.specificAttestationArbiter && addresses.specificAttestationArbiter !== "0x0000000000000000000000000000000000000000") {
    arbiterDecoders.set(addresses.specificAttestationArbiter, {
      type: "leaf",
      demandDataAbi: parseAbiParameters("(bytes32 attestation)"),
      decodeDemandData: (demandData: `0x${string}`) => {
        return decodeAbiParameters(
          parseAbiParameters("(bytes32 attestation)"),
          demandData,
        )[0];
      },
    });
  }

  // IntrinsicsArbiter2 - leaf arbiter
  if (addresses.intrinsicsArbiter2 && addresses.intrinsicsArbiter2 !== "0x0000000000000000000000000000000000000000") {
    arbiterDecoders.set(addresses.intrinsicsArbiter2, {
      type: "leaf",
      demandDataAbi: parseAbiParameters("(bytes32 schema)"),
      decodeDemandData: (demandData: `0x${string}`) => {
        return decodeAbiParameters(
          parseAbiParameters("(bytes32 schema)"),
          demandData,
        )[0];
      },
    });
  }

  // AnyArbiter - composing arbiter (logical OR)
  if (addresses.anyArbiter && addresses.anyArbiter !== "0x0000000000000000000000000000000000000000") {
    arbiterDecoders.set(addresses.anyArbiter, {
      type: "composing",
      demandDataAbi: parseAbiParameters("(address[] arbiters, bytes[] demands)"),
      decodeDemandData: (demandData: `0x${string}`) => {
        return decodeAbiParameters(
          parseAbiParameters("(address[] arbiters, bytes[] demands)"),
          demandData,
        )[0];
      },
      extractNestedDemands: (decoded: { arbiters: `0x${string}`[]; demands: `0x${string}`[] }) => {
        return decoded.arbiters.map((arbiter, index) => ({
          arbiter,
          demand: decoded.demands[index],
        }));
      },
    });
  }

  // AllArbiter - composing arbiter (logical AND)
  if (addresses.allArbiter && addresses.allArbiter !== "0x0000000000000000000000000000000000000000") {
    arbiterDecoders.set(addresses.allArbiter, {
      type: "composing",
      demandDataAbi: parseAbiParameters("(address[] arbiters, bytes[] demands)"),
      decodeDemandData: (demandData: `0x${string}`) => {
        return decodeAbiParameters(
          parseAbiParameters("(address[] arbiters, bytes[] demands)"),
          demandData,
        )[0];
      },
      extractNestedDemands: (decoded: { arbiters: `0x${string}`[]; demands: `0x${string}`[] }) => {
        return decoded.arbiters.map((arbiter, index) => ({
          arbiter,
          demand: decoded.demands[index],
        }));
      },
    });
  }

  // TrustedPartyArbiter - composing arbiter
  if (addresses.trustedPartyArbiter && addresses.trustedPartyArbiter !== "0x0000000000000000000000000000000000000000") {
    arbiterDecoders.set(addresses.trustedPartyArbiter, {
      type: "composing",
      demandDataAbi: parseAbiParameters("(address baseArbiter, bytes baseDemand, address creator)"),
      decodeDemandData: (demandData: `0x${string}`) => {
        return decodeAbiParameters(
          parseAbiParameters("(address baseArbiter, bytes baseDemand, address creator)"),
          demandData,
        )[0];
      },
      extractNestedDemands: (decoded: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; creator: `0x${string}` }) => {
        return [{ arbiter: decoded.baseArbiter, demand: decoded.baseDemand }];
      },
    });
  }

  // Add composing attestation property arbiters
  const composingArbiters = [
    { key: "attesterArbiterComposing", name: "AttesterArbiterComposing" },
    { key: "expirationTimeArbiterComposing", name: "ExpirationTimeArbiterComposing" },
    { key: "recipientArbiterComposing", name: "RecipientArbiterComposing" },
    { key: "refUidArbiterComposing", name: "RefUidArbiterComposing" },
    { key: "revocableArbiterComposing", name: "RevocableArbiterComposing" },
    { key: "revocationTimeArbiterComposing", name: "RevocationTimeArbiterComposing" },
    { key: "schemaArbiterComposing", name: "SchemaArbiterComposing" },
    { key: "timestampArbiterComposing", name: "TimestampArbiterComposing" },
    { key: "uidArbiterComposing", name: "UidArbiterComposing" },
    { key: "valueArbiterComposing", name: "ValueArbiterComposing" },
  ] as const;

  for (const { key, name } of composingArbiters) {
    const address = addresses[key as keyof ChainAddresses] as `0x${string}`;
    if (address && address !== "0x0000000000000000000000000000000000000000") {
      // Most composing arbiters follow the pattern: (address baseArbiter, bytes baseDemand, <specific_field>)
      // For simplicity, we'll use a generic pattern that works for most
      arbiterDecoders.set(address, {
        type: "composing",
        demandDataAbi: parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 value)"),
        decodeDemandData: (demandData: `0x${string}`) => {
          // Try to decode with the generic pattern
          try {
            return decodeAbiParameters(
              parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 value)"),
              demandData,
            )[0];
          } catch {
            // If that fails, try with address for creator field
            try {
              return decodeAbiParameters(
                parseAbiParameters("(address baseArbiter, bytes baseDemand, address value)"),
                demandData,
              )[0];
            } catch {
              // If that fails, try with uint64 for time fields
              return decodeAbiParameters(
                parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 value)"),
                demandData,
              )[0];
            }
          }
        },
        extractNestedDemands: (decoded: { baseArbiter: `0x${string}`; baseDemand: `0x${string}` }) => {
          return [{ arbiter: decoded.baseArbiter, demand: decoded.baseDemand }];
        },
      });
    }
  }

  return { arbiterDecoders };
}

/**
 * Adds a custom arbiter decoder to the configuration
 */
export function addArbiterDecoder(
  config: DemandParserConfig,
  arbiterAddress: `0x${string}`,
  decoder: ArbiterDecoder,
): void {
  config.arbiterDecoders.set(arbiterAddress, decoder);
}

/**
 * Recursively parses a demand tree starting from an arbiter and demand data
 */
export function parseDemandRecursive(
  config: DemandParserConfig,
  arbiter: `0x${string}`,
  demandData: `0x${string}`,
  maxDepth = 10,
  currentDepth = 0,
): ParsedDemand {
  if (currentDepth >= maxDepth) {
    throw new Error(`Maximum parsing depth (${maxDepth}) exceeded. Possible circular reference.`);
  }

  // Look up decoder, trying both case-sensitive and case-insensitive matches
  let decoder = config.arbiterDecoders.get(arbiter);
  if (!decoder) {
    // Try to find a case-insensitive match
    for (const [addr, dec] of config.arbiterDecoders.entries()) {
      if (typeof arbiter === 'string' && addr.toLowerCase() === arbiter.toLowerCase()) {
        decoder = dec;
        break;
      }
    }
  }

  if (!decoder) {
    // Unknown arbiter - treat as opaque leaf
    return {
      arbiter,
      demandData,
      decoded: { raw: demandData },
      type: "leaf",
    };
  }

  const decoded = decoder.decodeDemandData(demandData);
  const result: ParsedDemand = {
    arbiter,
    demandData,
    decoded,
    type: decoder.type,
  };

  // If this is a composing arbiter, recursively parse nested demands
  if (decoder.type === "composing" && decoder.extractNestedDemands) {
    const nestedDemands = decoder.extractNestedDemands(decoded);
    result.children = nestedDemands.map(({ arbiter: childArbiter, demand: childDemand }) =>
      parseDemandRecursive(config, childArbiter, childDemand, maxDepth, currentDepth + 1),
    );
  }

  return result;
}

/**
 * Parses a demand starting from an escrow attestation
 */
export function parseDemandFromEscrow(
  config: DemandParserConfig,
  escrowData: `0x${string}`,
): ParsedDemand {
  // Parse the escrow data to extract arbiter and demand
  const arbiterDemandAbi = parseAbiParameters("(address arbiter, bytes demand)");
  const arbiterDemand = decodeAbiParameters(arbiterDemandAbi, escrowData)[0];

  return parseDemandRecursive(config, arbiterDemand.arbiter, arbiterDemand.demand);
}

/**
 * Flattens a parsed demand tree into a list of all arbiters used
 */
export function flattenDemandTree(demand: ParsedDemand): Array<{
  arbiter: `0x${string}`;
  demandData: `0x${string}`;
  decoded: any;
  type: "leaf" | "composing";
  depth: number;
}> {
  const result: Array<{
    arbiter: `0x${string}`;
    demandData: `0x${string}`;
    decoded: any;
    type: "leaf" | "composing";
    depth: number;
  }> = [];

  function traverse(node: ParsedDemand, depth: number) {
    result.push({
      arbiter: node.arbiter,
      demandData: node.demandData,
      decoded: node.decoded,
      type: node.type,
      depth,
    });

    if (node.children) {
      for (const child of node.children) {
        traverse(child, depth + 1);
      }
    }
  }

  traverse(demand, 0);
  return result;
}

/**
 * Gets all leaf arbiters (non-composing) from a demand tree
 */
export function getLeafArbiters(demand: ParsedDemand): Array<{
  arbiter: `0x${string}`;
  demandData: `0x${string}`;
  decoded: any;
}> {
  const flattened = flattenDemandTree(demand);
  return flattened
    .filter(node => node.type === "leaf")
    .map(node => ({
      arbiter: node.arbiter,
      demandData: node.demandData,
      decoded: node.decoded,
    }));
}

/**
 * Finds all arbiters of a specific type in the demand tree
 */
export function findArbitersOfType(
  demand: ParsedDemand,
  arbiterAddress: `0x${string}`,
): Array<{
  arbiter: `0x${string}`;
  demandData: `0x${string}`;
  decoded: any;
  depth: number;
}> {
  const flattened = flattenDemandTree(demand);
  return flattened
    .filter(node => node.arbiter.toLowerCase() === arbiterAddress.toLowerCase())
    .map(node => ({
      arbiter: node.arbiter,
      demandData: node.demandData,
      decoded: node.decoded,
      depth: node.depth,
    }));
}

/**
 * Validates that all arbiters in a demand tree are known
 */
export function validateDemandTree(
  config: DemandParserConfig,
  demand: ParsedDemand,
): { isValid: boolean; unknownArbiters: `0x${string}`[] } {
  const flattened = flattenDemandTree(demand);
  const unknownArbiters: `0x${string}`[] = [];

  for (const node of flattened) {
    if (!config.arbiterDecoders.has(node.arbiter)) {
      unknownArbiters.push(node.arbiter);
    }
  }

  return {
    isValid: unknownArbiters.length === 0,
    unknownArbiters,
  };
}