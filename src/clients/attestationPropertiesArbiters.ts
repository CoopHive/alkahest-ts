import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
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
  // Extract DemandData struct ABI from contract ABIs
  const attesterArbiterComposingDemandDataType = (AttesterArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const attesterArbiterNonComposingDemandDataType = (AttesterArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const timeAfterArbiterComposingDemandDataType = (TimeAfterArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const timeAfterArbiterNonComposingDemandDataType = (TimeAfterArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const timeBeforeArbiterComposingDemandDataType = (TimeBeforeArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const timeBeforeArbiterNonComposingDemandDataType = (TimeBeforeArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const timeEqualArbiterComposingDemandDataType = (TimeEqualArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const timeEqualArbiterNonComposingDemandDataType = (TimeEqualArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const expirationTimeAfterArbiterComposingDemandDataType = (ExpirationTimeAfterArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const expirationTimeAfterArbiterNonComposingDemandDataType = (ExpirationTimeAfterArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const expirationTimeBeforeArbiterComposingDemandDataType = (ExpirationTimeBeforeArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const expirationTimeBeforeArbiterNonComposingDemandDataType = (ExpirationTimeBeforeArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const expirationTimeEqualArbiterComposingDemandDataType = (ExpirationTimeEqualArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const expirationTimeEqualArbiterNonComposingDemandDataType = (ExpirationTimeEqualArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const recipientArbiterComposingDemandDataType = (RecipientArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const recipientArbiterNonComposingDemandDataType = (RecipientArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const refUidArbiterComposingDemandDataType = (RefUidArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const refUidArbiterNonComposingDemandDataType = (RefUidArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const revocableArbiterComposingDemandDataType = (RevocableArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const revocableArbiterNonComposingDemandDataType = (RevocableArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const schemaArbiterComposingDemandDataType = (SchemaArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const schemaArbiterNonComposingDemandDataType = (SchemaArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const uidArbiterComposingDemandDataType = (UidArbiterComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];
  const uidArbiterNonComposingDemandDataType = (UidArbiterNonComposingAbi.find(
    (item: any) => item.type === 'function' && item.name === 'decodeDemandData'
  ) as { outputs: readonly any[] } | undefined)?.outputs?.[0];

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
      return encodeAbiParameters(
        attesterArbiterComposingDemandDataType ? [attesterArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, address attester)"),
        [demand],
      );
    },

    /**
     * Decodes AttesterArbiterComposing.DemandData from bytes.
     */
    decodeAttesterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        attesterArbiterComposingDemandDataType ? [attesterArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, address attester)"),
        demandData,
      )[0];
    },

    /**
     * Encodes AttesterArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {address attester}
     */
    encodeAttesterArbiterNonComposingDemand: (demand: {
      attester: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        attesterArbiterNonComposingDemandDataType ? [attesterArbiterNonComposingDemandDataType] : parseAbiParameters("(address attester)"),
        [demand],
      );
    },

    /**
     * Decodes AttesterArbiterNonComposing.DemandData from bytes.
     */
    decodeAttesterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        attesterArbiterNonComposingDemandDataType ? [attesterArbiterNonComposingDemandDataType] : parseAbiParameters("(address attester)"),
        demandData,
      )[0];
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
        timeAfterArbiterComposingDemandDataType ? [timeAfterArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeAfterArbiterComposing.DemandData from bytes.
     */
    decodeTimeAfterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        timeAfterArbiterComposingDemandDataType ? [timeAfterArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
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
        timeAfterArbiterNonComposingDemandDataType ? [timeAfterArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeAfterArbiterNonComposing.DemandData from bytes.
     */
    decodeTimeAfterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        timeAfterArbiterNonComposingDemandDataType ? [timeAfterArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 time)"),
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
        timeBeforeArbiterComposingDemandDataType ? [timeBeforeArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeBeforeArbiterComposing.DemandData from bytes.
     */
    decodeTimeBeforeArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        timeBeforeArbiterComposingDemandDataType ? [timeBeforeArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
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
        timeBeforeArbiterNonComposingDemandDataType ? [timeBeforeArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeBeforeArbiterNonComposing.DemandData from bytes.
     */
    decodeTimeBeforeArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        timeBeforeArbiterNonComposingDemandDataType ? [timeBeforeArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 time)"),
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
        timeEqualArbiterComposingDemandDataType ? [timeEqualArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeEqualArbiterComposing.DemandData from bytes.
     */
    decodeTimeEqualArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        timeEqualArbiterComposingDemandDataType ? [timeEqualArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
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
        timeEqualArbiterNonComposingDemandDataType ? [timeEqualArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeEqualArbiterNonComposing.DemandData from bytes.
     */
    decodeTimeEqualArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        timeEqualArbiterNonComposingDemandDataType ? [timeEqualArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 time)"),
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
        expirationTimeAfterArbiterComposingDemandDataType ? [expirationTimeAfterArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeAfterArbiterComposing.DemandData from bytes.
     */
    decodeExpirationTimeAfterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        expirationTimeAfterArbiterComposingDemandDataType ? [expirationTimeAfterArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
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
        expirationTimeAfterArbiterNonComposingDemandDataType ? [expirationTimeAfterArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeAfterArbiterNonComposing.DemandData from bytes.
     */
    decodeExpirationTimeAfterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        expirationTimeAfterArbiterNonComposingDemandDataType ? [expirationTimeAfterArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 expirationTime)"),
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
        expirationTimeBeforeArbiterComposingDemandDataType ? [expirationTimeBeforeArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeBeforeArbiterComposing.DemandData from bytes.
     */
    decodeExpirationTimeBeforeArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        expirationTimeBeforeArbiterComposingDemandDataType ? [expirationTimeBeforeArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
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
        expirationTimeBeforeArbiterNonComposingDemandDataType ? [expirationTimeBeforeArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeBeforeArbiterNonComposing.DemandData from bytes.
     */
    decodeExpirationTimeBeforeArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        expirationTimeBeforeArbiterNonComposingDemandDataType ? [expirationTimeBeforeArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 expirationTime)"),
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
        expirationTimeEqualArbiterComposingDemandDataType ? [expirationTimeEqualArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeEqualArbiterComposing.DemandData from bytes.
     */
    decodeExpirationTimeEqualArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        expirationTimeEqualArbiterComposingDemandDataType ? [expirationTimeEqualArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
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
        expirationTimeEqualArbiterNonComposingDemandDataType ? [expirationTimeEqualArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeEqualArbiterNonComposing.DemandData from bytes.
     */
    decodeExpirationTimeEqualArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        expirationTimeEqualArbiterNonComposingDemandDataType ? [expirationTimeEqualArbiterNonComposingDemandDataType] : parseAbiParameters("(uint64 expirationTime)"),
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
        recipientArbiterComposingDemandDataType ? [recipientArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, address recipient)"),
        [demand],
      );
    },

    /**
     * Decodes RecipientArbiterComposing.DemandData from bytes.
     */
    decodeRecipientArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        recipientArbiterComposingDemandDataType ? [recipientArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, address recipient)"),
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
        recipientArbiterNonComposingDemandDataType ? [recipientArbiterNonComposingDemandDataType] : parseAbiParameters("(address recipient)"),
        [demand],
      );
    },

    /**
     * Decodes RecipientArbiterNonComposing.DemandData from bytes.
     */
    decodeRecipientArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        recipientArbiterNonComposingDemandDataType ? [recipientArbiterNonComposingDemandDataType] : parseAbiParameters("(address recipient)"),
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
        refUidArbiterComposingDemandDataType ? [refUidArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 refUID)"),
        [demand],
      );
    },

    /**
     * Decodes RefUidArbiterComposing.DemandData from bytes.
     */
    decodeRefUidArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        refUidArbiterComposingDemandDataType ? [refUidArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 refUID)"),
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
        refUidArbiterNonComposingDemandDataType ? [refUidArbiterNonComposingDemandDataType] : parseAbiParameters("(bytes32 refUID)"),
        [demand],
      );
    },

    /**
     * Decodes RefUidArbiterNonComposing.DemandData from bytes.
     */
    decodeRefUidArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        refUidArbiterNonComposingDemandDataType ? [refUidArbiterNonComposingDemandDataType] : parseAbiParameters("(bytes32 refUID)"),
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
        revocableArbiterComposingDemandDataType ? [revocableArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, bool revocable)"),
        [demand],
      );
    },

    /**
     * Decodes RevocableArbiterComposing.DemandData from bytes.
     */
    decodeRevocableArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        revocableArbiterComposingDemandDataType ? [revocableArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, bool revocable)"),
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
        revocableArbiterNonComposingDemandDataType ? [revocableArbiterNonComposingDemandDataType] : parseAbiParameters("(bool revocable)"),
        [demand],
      );
    },

    /**
     * Decodes RevocableArbiterNonComposing.DemandData from bytes.
     */
    decodeRevocableArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        revocableArbiterNonComposingDemandDataType ? [revocableArbiterNonComposingDemandDataType] : parseAbiParameters("(bool revocable)"),
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
        schemaArbiterComposingDemandDataType ? [schemaArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 schema)"),
        [demand],
      );
    },

    /**
     * Decodes SchemaArbiterComposing.DemandData from bytes.
     */
    decodeSchemaArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        schemaArbiterComposingDemandDataType ? [schemaArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 schema)"),
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
        schemaArbiterNonComposingDemandDataType ? [schemaArbiterNonComposingDemandDataType] : parseAbiParameters("(bytes32 schema)"),
        [demand],
      );
    },

    /**
     * Decodes SchemaArbiterNonComposing.DemandData from bytes.
     */
    decodeSchemaArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        schemaArbiterNonComposingDemandDataType ? [schemaArbiterNonComposingDemandDataType] : parseAbiParameters("(bytes32 schema)"),
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
        uidArbiterComposingDemandDataType ? [uidArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 uid)"),
        [demand],
      );
    },

    /**
     * Decodes UidArbiterComposing.DemandData from bytes.
     */
    decodeUidArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        uidArbiterComposingDemandDataType ? [uidArbiterComposingDemandDataType] : parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 uid)"),
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
        uidArbiterNonComposingDemandDataType ? [uidArbiterNonComposingDemandDataType] : parseAbiParameters("(bytes32 uid)"),
        [demand],
      );
    },

    /**
     * Decodes UidArbiterNonComposing.DemandData from bytes.
     */
    decodeUidArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        uidArbiterNonComposingDemandDataType ? [uidArbiterNonComposingDemandDataType] : parseAbiParameters("(bytes32 uid)"),
        demandData,
      )[0];
    },
  };
};
