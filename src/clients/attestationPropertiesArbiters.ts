import {
  decodeAbiParameters,
  encodeAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";

// Import all attestation properties arbiter ABIs
import { abi as AttesterArbiterComposingAbi } from "../contracts/AttesterArbiterComposing";
import { abi as AttesterArbiterNonComposingAbi } from "../contracts/AttesterArbiterNonComposing";
import { abi as TimeAfterArbiterComposingAbi } from "../contracts/TimeAfterArbiterComposing";
import { abi as TimeAfterArbiterNonComposingAbi } from "../contracts/TimeAfterArbiterNonComposing";
import { abi as TimeBeforeArbiterComposingAbi } from "../contracts/TimeBeforeArbiterComposing";
import { abi as TimeBeforeArbiterNonComposingAbi } from "../contracts/TimeBeforeArbiterNonComposing";
import { abi as TimeEqualArbiterComposingAbi } from "../contracts/TimeEqualArbiterComposing";
import { abi as TimeEqualArbiterNonComposingAbi } from "../contracts/TimeEqualArbiterNonComposing";
import { abi as ExpirationTimeAfterArbiterComposingAbi } from "../contracts/ExpirationTimeAfterArbiterComposing";
import { abi as ExpirationTimeAfterArbiterNonComposingAbi } from "../contracts/ExpirationTimeAfterArbiterNonComposing";
import { abi as ExpirationTimeBeforeArbiterComposingAbi } from "../contracts/ExpirationTimeBeforeArbiterComposing";
import { abi as ExpirationTimeBeforeArbiterNonComposingAbi } from "../contracts/ExpirationTimeBeforeArbiterNonComposing";
import { abi as ExpirationTimeEqualArbiterComposingAbi } from "../contracts/ExpirationTimeEqualArbiterComposing";
import { abi as ExpirationTimeEqualArbiterNonComposingAbi } from "../contracts/ExpirationTimeEqualArbiterNonComposing";
import { abi as RecipientArbiterComposingAbi } from "../contracts/RecipientArbiterComposing";
import { abi as RecipientArbiterNonComposingAbi } from "../contracts/RecipientArbiterNonComposing";
import { abi as RefUidArbiterComposingAbi } from "../contracts/RefUidArbiterComposing";
import { abi as RefUidArbiterNonComposingAbi } from "../contracts/RefUidArbiterNonComposing";
import { abi as RevocableArbiterComposingAbi } from "../contracts/RevocableArbiterComposing";
import { abi as RevocableArbiterNonComposingAbi } from "../contracts/RevocableArbiterNonComposing";
import { abi as SchemaArbiterComposingAbi } from "../contracts/SchemaArbiterComposing";
import { abi as SchemaArbiterNonComposingAbi } from "../contracts/SchemaArbiterNonComposing";
import { abi as UidArbiterComposingAbi } from "../contracts/UidArbiterComposing";
import { abi as UidArbiterNonComposingAbi } from "../contracts/UidArbiterNonComposing";

// Extract DemandData struct ABIs from contract ABIs at module initialization
const attesterArbiterComposingDecodeDemandFunction = AttesterArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const attesterArbiterNonComposingDecodeDemandFunction = AttesterArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const timeAfterArbiterComposingDecodeDemandFunction = TimeAfterArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const timeAfterArbiterNonComposingDecodeDemandFunction = TimeAfterArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const timeBeforeArbiterComposingDecodeDemandFunction = TimeBeforeArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const timeBeforeArbiterNonComposingDecodeDemandFunction = TimeBeforeArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const timeEqualArbiterComposingDecodeDemandFunction = TimeEqualArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const timeEqualArbiterNonComposingDecodeDemandFunction = TimeEqualArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const expirationTimeAfterArbiterComposingDecodeDemandFunction = ExpirationTimeAfterArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const expirationTimeAfterArbiterNonComposingDecodeDemandFunction = ExpirationTimeAfterArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const expirationTimeBeforeArbiterComposingDecodeDemandFunction = ExpirationTimeBeforeArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const expirationTimeBeforeArbiterNonComposingDecodeDemandFunction = ExpirationTimeBeforeArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const expirationTimeEqualArbiterComposingDecodeDemandFunction = ExpirationTimeEqualArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const expirationTimeEqualArbiterNonComposingDecodeDemandFunction = ExpirationTimeEqualArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const recipientArbiterComposingDecodeDemandFunction = RecipientArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const recipientArbiterNonComposingDecodeDemandFunction = RecipientArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const refUidArbiterComposingDecodeDemandFunction = RefUidArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const refUidArbiterNonComposingDecodeDemandFunction = RefUidArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const revocableArbiterComposingDecodeDemandFunction = RevocableArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const revocableArbiterNonComposingDecodeDemandFunction = RevocableArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const schemaArbiterComposingDecodeDemandFunction = SchemaArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const schemaArbiterNonComposingDecodeDemandFunction = SchemaArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const uidArbiterComposingDecodeDemandFunction = UidArbiterComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);
const uidArbiterNonComposingDecodeDemandFunction = UidArbiterNonComposingAbi.find(
  (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
);

// Extract the DemandData struct types from the function outputs
const attesterArbiterComposingDemandDataType = (attesterArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const attesterArbiterNonComposingDemandDataType = (attesterArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const timeAfterArbiterComposingDemandDataType = (timeAfterArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const timeAfterArbiterNonComposingDemandDataType = (timeAfterArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const timeBeforeArbiterComposingDemandDataType = (timeBeforeArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const timeBeforeArbiterNonComposingDemandDataType = (timeBeforeArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const timeEqualArbiterComposingDemandDataType = (timeEqualArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const timeEqualArbiterNonComposingDemandDataType = (timeEqualArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const expirationTimeAfterArbiterComposingDemandDataType = (expirationTimeAfterArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const expirationTimeAfterArbiterNonComposingDemandDataType = (expirationTimeAfterArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const expirationTimeBeforeArbiterComposingDemandDataType = (expirationTimeBeforeArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const expirationTimeBeforeArbiterNonComposingDemandDataType = (expirationTimeBeforeArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const expirationTimeEqualArbiterComposingDemandDataType = (expirationTimeEqualArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const expirationTimeEqualArbiterNonComposingDemandDataType = (expirationTimeEqualArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const recipientArbiterComposingDemandDataType = (recipientArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const recipientArbiterNonComposingDemandDataType = (recipientArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const refUidArbiterComposingDemandDataType = (refUidArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const refUidArbiterNonComposingDemandDataType = (refUidArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const revocableArbiterComposingDemandDataType = (revocableArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const revocableArbiterNonComposingDemandDataType = (revocableArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const schemaArbiterComposingDemandDataType = (schemaArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const schemaArbiterNonComposingDemandDataType = (schemaArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const uidArbiterComposingDemandDataType = (uidArbiterComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];
const uidArbiterNonComposingDemandDataType = (uidArbiterNonComposingDecodeDemandFunction as { outputs: readonly any[] } | undefined)?.outputs?.[0];

// Ensure ABI extraction succeeded - fail fast if contract JSONs are malformed
if (!attesterArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from AttesterArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!attesterArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from AttesterArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!timeAfterArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from TimeAfterArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!timeAfterArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from TimeAfterArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!timeBeforeArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from TimeBeforeArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!timeBeforeArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from TimeBeforeArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!timeEqualArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from TimeEqualArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!timeEqualArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from TimeEqualArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!expirationTimeAfterArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from ExpirationTimeAfterArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!expirationTimeAfterArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from ExpirationTimeAfterArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!expirationTimeBeforeArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from ExpirationTimeBeforeArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!expirationTimeBeforeArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from ExpirationTimeBeforeArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!expirationTimeEqualArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from ExpirationTimeEqualArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!expirationTimeEqualArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from ExpirationTimeEqualArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!recipientArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from RecipientArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!recipientArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from RecipientArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!refUidArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from RefUidArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!refUidArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from RefUidArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!revocableArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from RevocableArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!revocableArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from RevocableArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!schemaArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from SchemaArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!schemaArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from SchemaArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!uidArbiterComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from UidArbiterComposing contract JSON. The contract definition may be missing or malformed.');
}
if (!uidArbiterNonComposingDemandDataType) {
  throw new Error('Failed to extract ABI type from UidArbiterNonComposing contract JSON. The contract definition may be missing or malformed.');
}

/**
 * Attestation Properties Arbiters Client
 * 
 * Handles arbiters that validate specific properties of attestations. Each arbiter type
 * comes in two variants:
 * - Composing: Can be combined with a base arbiter for additional validation
 * - Non-Composing: Standalone validation against the property
 * 
 * Supported attestation properties:
 * - Attester: Validates the attester address
 * - Time: Validates timestamp (After/Before/Equal variants)
 * - ExpirationTime: Validates expiration timestamp (After/Before/Equal variants)
 * - Recipient: Validates the recipient address  
 * - RefUID: Validates the reference UID
 * - Revocable: Validates the revocable flag
 * - Schema: Validates the schema hash
 * - UID: Validates the attestation UID
 */
export const makeAttestationPropertiesArbitersClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  return {
    // Attester Arbiters
    /**
     * Encodes AttesterArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, address attester}
     */
    encodeAttesterArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      attester: `0x${string}`;
    }) => {
      return encodeAbiParameters([attesterArbiterComposingDemandDataType], [demand]);
    },

    /**
     * Decodes AttesterArbiterComposing.DemandData from bytes.
     */
    decodeAttesterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters([attesterArbiterComposingDemandDataType], demandData)[0];
    },

    /**
     * Encodes AttesterArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {address attester}
     */
    encodeAttesterArbiterNonComposingDemand: (demand: {
      attester: `0x${string}`;
    }) => {
      return encodeAbiParameters([attesterArbiterNonComposingDemandDataType], [demand]);
    },

    /**
     * Decodes AttesterArbiterNonComposing.DemandData from bytes.
     */
    decodeAttesterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters([attesterArbiterNonComposingDemandDataType], demandData)[0];
    },

    // Time After Arbiters
    /**
     * Encodes TimeAfterArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 time}
     */
    encodeTimeAfterArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      time: bigint;
    }) => {
      return encodeAbiParameters(
        [timeAfterArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes TimeAfterArbiterComposing.DemandData from bytes.
     */
    decodeTimeAfterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [timeAfterArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes TimeAfterArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint64 time}
     */
    encodeTimeAfterArbiterNonComposingDemand: (demand: {
      time: bigint;
    }) => {
      return encodeAbiParameters(
        [timeAfterArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes TimeAfterArbiterNonComposing.DemandData from bytes.
     */
    decodeTimeAfterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [timeAfterArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // Time Before Arbiters
    /**
     * Encodes TimeBeforeArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 time}
     */
    encodeTimeBeforeArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      time: bigint;
    }) => {
      return encodeAbiParameters(
        [timeBeforeArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes TimeBeforeArbiterComposing.DemandData from bytes.
     */
    decodeTimeBeforeArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [timeBeforeArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes TimeBeforeArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint64 time}
     */
    encodeTimeBeforeArbiterNonComposingDemand: (demand: {
      time: bigint;
    }) => {
      return encodeAbiParameters(
        [timeBeforeArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes TimeBeforeArbiterNonComposing.DemandData from bytes.
     */
    decodeTimeBeforeArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [timeBeforeArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // Time Equal Arbiters
    /**
     * Encodes TimeEqualArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 time}
     */
    encodeTimeEqualArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      time: bigint;
    }) => {
      return encodeAbiParameters(
        [timeEqualArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes TimeEqualArbiterComposing.DemandData from bytes.
     */
    decodeTimeEqualArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [timeEqualArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes TimeEqualArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint64 time}
     */
    encodeTimeEqualArbiterNonComposingDemand: (demand: {
      time: bigint;
    }) => {
      return encodeAbiParameters(
        [timeEqualArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes TimeEqualArbiterNonComposing.DemandData from bytes.
     */
    decodeTimeEqualArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [timeEqualArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // Expiration Time After Arbiters
    /**
     * Encodes ExpirationTimeAfterArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 expirationTime}
     */
    encodeExpirationTimeAfterArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      expirationTime: bigint;
    }) => {
      return encodeAbiParameters(
        [expirationTimeAfterArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeAfterArbiterComposing.DemandData from bytes.
     */
    decodeExpirationTimeAfterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [expirationTimeAfterArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes ExpirationTimeAfterArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint64 expirationTime}
     */
    encodeExpirationTimeAfterArbiterNonComposingDemand: (demand: {
      expirationTime: bigint;
    }) => {
      return encodeAbiParameters(
        [expirationTimeAfterArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeAfterArbiterNonComposing.DemandData from bytes.
     */
    decodeExpirationTimeAfterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [expirationTimeAfterArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // Expiration Time Before Arbiters
    /**
     * Encodes ExpirationTimeBeforeArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 expirationTime}
     */
    encodeExpirationTimeBeforeArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      expirationTime: bigint;
    }) => {
      return encodeAbiParameters(
        [expirationTimeBeforeArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeBeforeArbiterComposing.DemandData from bytes.
     */
    decodeExpirationTimeBeforeArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [expirationTimeBeforeArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes ExpirationTimeBeforeArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint64 expirationTime}
     */
    encodeExpirationTimeBeforeArbiterNonComposingDemand: (demand: {
      expirationTime: bigint;
    }) => {
      return encodeAbiParameters(
        [expirationTimeBeforeArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeBeforeArbiterNonComposing.DemandData from bytes.
     */
    decodeExpirationTimeBeforeArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [expirationTimeBeforeArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // Expiration Time Equal Arbiters
    /**
     * Encodes ExpirationTimeEqualArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 expirationTime}
     */
    encodeExpirationTimeEqualArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      expirationTime: bigint;
    }) => {
      return encodeAbiParameters(
        [expirationTimeEqualArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeEqualArbiterComposing.DemandData from bytes.
     */
    decodeExpirationTimeEqualArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [expirationTimeEqualArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes ExpirationTimeEqualArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint64 expirationTime}
     */
    encodeExpirationTimeEqualArbiterNonComposingDemand: (demand: {
      expirationTime: bigint;
    }) => {
      return encodeAbiParameters(
        [expirationTimeEqualArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeEqualArbiterNonComposing.DemandData from bytes.
     */
    decodeExpirationTimeEqualArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [expirationTimeEqualArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // Recipient Arbiters
    /**
     * Encodes RecipientArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, address recipient}
     */
    encodeRecipientArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      recipient: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        [recipientArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes RecipientArbiterComposing.DemandData from bytes.
     */
    decodeRecipientArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [recipientArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes RecipientArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {address recipient}
     */
    encodeRecipientArbiterNonComposingDemand: (demand: {
      recipient: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        [recipientArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes RecipientArbiterNonComposing.DemandData from bytes.
     */
    decodeRecipientArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [recipientArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // RefUID Arbiters
    /**
     * Encodes RefUidArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bytes32 refUID}
     */
    encodeRefUidArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      refUID: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        [refUidArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes RefUidArbiterComposing.DemandData from bytes.
     */
    decodeRefUidArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [refUidArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes RefUidArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 refUID}
     */
    encodeRefUidArbiterNonComposingDemand: (demand: {
      refUID: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        [refUidArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes RefUidArbiterNonComposing.DemandData from bytes.
     */
    decodeRefUidArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [refUidArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // Revocable Arbiters
    /**
     * Encodes RevocableArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bool revocable}
     */
    encodeRevocableArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      revocable: boolean;
    }) => {
      return encodeAbiParameters(
        [revocableArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes RevocableArbiterComposing.DemandData from bytes.
     */
    decodeRevocableArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [revocableArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes RevocableArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {bool revocable}
     */
    encodeRevocableArbiterNonComposingDemand: (demand: {
      revocable: boolean;
    }) => {
      return encodeAbiParameters(
        [revocableArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes RevocableArbiterNonComposing.DemandData from bytes.
     */
    decodeRevocableArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [revocableArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // Schema Arbiters
    /**
     * Encodes SchemaArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bytes32 schema}
     */
    encodeSchemaArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      schema: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        [schemaArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes SchemaArbiterComposing.DemandData from bytes.
     */
    decodeSchemaArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [schemaArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes SchemaArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 schema}
     */
    encodeSchemaArbiterNonComposingDemand: (demand: {
      schema: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        [schemaArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes SchemaArbiterNonComposing.DemandData from bytes.
     */
    decodeSchemaArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [schemaArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },

    // UID Arbiters
    /**
     * Encodes UidArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bytes32 uid}
     */
    encodeUidArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      uid: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        [uidArbiterComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes UidArbiterComposing.DemandData from bytes.
     */
    decodeUidArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [uidArbiterComposingDemandDataType],
        demandData,
      )[0];
    },

    /**
     * Encodes UidArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 uid}
     */
    encodeUidArbiterNonComposingDemand: (demand: {
      uid: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        [uidArbiterNonComposingDemandDataType],
        [demand],
      );
    },

    /**
     * Decodes UidArbiterNonComposing.DemandData from bytes.
     */
    decodeUidArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        [uidArbiterNonComposingDemandDataType],
        demandData,
      )[0];
    },
  };
};
