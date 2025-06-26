import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";

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
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, address attester)"),
        [demand],
      );
    },

    /**
     * Decodes AttesterArbiterComposing.DemandData from bytes.
     */
    decodeAttesterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, address attester)"),
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
        parseAbiParameters("(address attester)"),
        [demand],
      );
    },

    /**
     * Decodes AttesterArbiterNonComposing.DemandData from bytes.
     */
    decodeAttesterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address attester)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeAfterArbiterComposing.DemandData from bytes.
     */
    decodeTimeAfterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
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
        parseAbiParameters("(uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeAfterArbiterNonComposing.DemandData from bytes.
     */
    decodeTimeAfterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint64 time)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeBeforeArbiterComposing.DemandData from bytes.
     */
    decodeTimeBeforeArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
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
        parseAbiParameters("(uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeBeforeArbiterNonComposing.DemandData from bytes.
     */
    decodeTimeBeforeArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint64 time)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeEqualArbiterComposing.DemandData from bytes.
     */
    decodeTimeEqualArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 time)"),
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
        parseAbiParameters("(uint64 time)"),
        [demand],
      );
    },

    /**
     * Decodes TimeEqualArbiterNonComposing.DemandData from bytes.
     */
    decodeTimeEqualArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint64 time)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeAfterArbiterComposing.DemandData from bytes.
     */
    decodeExpirationTimeAfterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
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
        parseAbiParameters("(uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeAfterArbiterNonComposing.DemandData from bytes.
     */
    decodeExpirationTimeAfterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint64 expirationTime)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeBeforeArbiterComposing.DemandData from bytes.
     */
    decodeExpirationTimeBeforeArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
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
        parseAbiParameters("(uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeBeforeArbiterNonComposing.DemandData from bytes.
     */
    decodeExpirationTimeBeforeArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint64 expirationTime)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeEqualArbiterComposing.DemandData from bytes.
     */
    decodeExpirationTimeEqualArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 expirationTime)"),
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
        parseAbiParameters("(uint64 expirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeEqualArbiterNonComposing.DemandData from bytes.
     */
    decodeExpirationTimeEqualArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint64 expirationTime)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, address recipient)"),
        [demand],
      );
    },

    /**
     * Decodes RecipientArbiterComposing.DemandData from bytes.
     */
    decodeRecipientArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, address recipient)"),
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
        parseAbiParameters("(address recipient)"),
        [demand],
      );
    },

    /**
     * Decodes RecipientArbiterNonComposing.DemandData from bytes.
     */
    decodeRecipientArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address recipient)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 refUID)"),
        [demand],
      );
    },

    /**
     * Decodes RefUidArbiterComposing.DemandData from bytes.
     */
    decodeRefUidArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 refUID)"),
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
        parseAbiParameters("(bytes32 refUID)"),
        [demand],
      );
    },

    /**
     * Decodes RefUidArbiterNonComposing.DemandData from bytes.
     */
    decodeRefUidArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bytes32 refUID)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bool revocable)"),
        [demand],
      );
    },

    /**
     * Decodes RevocableArbiterComposing.DemandData from bytes.
     */
    decodeRevocableArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bool revocable)"),
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
        parseAbiParameters("(bool revocable)"),
        [demand],
      );
    },

    /**
     * Decodes RevocableArbiterNonComposing.DemandData from bytes.
     */
    decodeRevocableArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bool revocable)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 schema)"),
        [demand],
      );
    },

    /**
     * Decodes SchemaArbiterComposing.DemandData from bytes.
     */
    decodeSchemaArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 schema)"),
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
        parseAbiParameters("(bytes32 schema)"),
        [demand],
      );
    },

    /**
     * Decodes SchemaArbiterNonComposing.DemandData from bytes.
     */
    decodeSchemaArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bytes32 schema)"),
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
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 uid)"),
        [demand],
      );
    },

    /**
     * Decodes UidArbiterComposing.DemandData from bytes.
     */
    decodeUidArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 uid)"),
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
        parseAbiParameters("(bytes32 uid)"),
        [demand],
      );
    },

    /**
     * Decodes UidArbiterNonComposing.DemandData from bytes.
     */
    decodeUidArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bytes32 uid)"),
        demandData,
      )[0];
    },
  };
};
