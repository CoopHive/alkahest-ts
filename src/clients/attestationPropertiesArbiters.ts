import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";

export const makeAttestationPropertiesArbitersClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  return {
    /**
     * Encodes AttesterArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, address expectedAttester}
     * @returns abi encoded bytes
     */
    encodeAttesterArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      expectedAttester: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, address expectedAttester)"),
        [demand],
      );
    },

    /**
     * Decodes AttesterArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeAttesterArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, address expectedAttester)"),
        demandData,
      )[0];
    },

    /**
     * Encodes AttesterArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {address expectedAttester}
     * @returns abi encoded bytes
     */
    encodeAttesterArbiterNonComposingDemand: (demand: {
      expectedAttester: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address expectedAttester)"),
        [demand],
      );
    },

    /**
     * Decodes AttesterArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeAttesterArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address expectedAttester)"),
        demandData,
      )[0];
    },

    /**
     * Encodes ExpirationTimeArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 minExpirationTime, uint64 maxExpirationTime}
     * @returns abi encoded bytes
     */
    encodeExpirationTimeArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      minExpirationTime: bigint;
      maxExpirationTime: bigint;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 minExpirationTime, uint64 maxExpirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeExpirationTimeArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 minExpirationTime, uint64 maxExpirationTime)"),
        demandData,
      )[0];
    },

    /**
     * Encodes ExpirationTimeArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint64 minExpirationTime, uint64 maxExpirationTime}
     * @returns abi encoded bytes
     */
    encodeExpirationTimeArbiterNonComposingDemand: (demand: {
      minExpirationTime: bigint;
      maxExpirationTime: bigint;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(uint64 minExpirationTime, uint64 maxExpirationTime)"),
        [demand],
      );
    },

    /**
     * Decodes ExpirationTimeArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeExpirationTimeArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint64 minExpirationTime, uint64 maxExpirationTime)"),
        demandData,
      )[0];
    },

    /**
     * Encodes RecipientArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, address expectedRecipient}
     * @returns abi encoded bytes
     */
    encodeRecipientArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      expectedRecipient: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, address expectedRecipient)"),
        [demand],
      );
    },

    /**
     * Decodes RecipientArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeRecipientArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, address expectedRecipient)"),
        demandData,
      )[0];
    },

    /**
     * Encodes RecipientArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {address expectedRecipient}
     * @returns abi encoded bytes
     */
    encodeRecipientArbiterNonComposingDemand: (demand: {
      expectedRecipient: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address expectedRecipient)"),
        [demand],
      );
    },

    /**
     * Decodes RecipientArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeRecipientArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address expectedRecipient)"),
        demandData,
      )[0];
    },

    /**
     * Encodes RefUidArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bytes32 expectedRefUID}
     * @returns abi encoded bytes
     */
    encodeRefUidArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      expectedRefUID: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 expectedRefUID)"),
        [demand],
      );
    },

    /**
     * Decodes RefUidArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeRefUidArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 expectedRefUID)"),
        demandData,
      )[0];
    },

    /**
     * Encodes RefUidArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 expectedRefUID}
     * @returns abi encoded bytes
     */
    encodeRefUidArbiterNonComposingDemand: (demand: {
      expectedRefUID: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(bytes32 expectedRefUID)"),
        [demand],
      );
    },

    /**
     * Decodes RefUidArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeRefUidArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bytes32 expectedRefUID)"),
        demandData,
      )[0];
    },

    /**
     * Encodes RevocableArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bool expectedRevocable}
     * @returns abi encoded bytes
     */
    encodeRevocableArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      expectedRevocable: boolean;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bool expectedRevocable)"),
        [demand],
      );
    },

    /**
     * Decodes RevocableArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeRevocableArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bool expectedRevocable)"),
        demandData,
      )[0];
    },

    /**
     * Encodes RevocableArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {bool expectedRevocable}
     * @returns abi encoded bytes
     */
    encodeRevocableArbiterNonComposingDemand: (demand: {
      expectedRevocable: boolean;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(bool expectedRevocable)"),
        [demand],
      );
    },

    /**
     * Decodes RevocableArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeRevocableArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bool expectedRevocable)"),
        demandData,
      )[0];
    },

    /**
     * Encodes RevocationTimeArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 minRevocationTime, uint64 maxRevocationTime}
     * @returns abi encoded bytes
     */
    encodeRevocationTimeArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      minRevocationTime: bigint;
      maxRevocationTime: bigint;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 minRevocationTime, uint64 maxRevocationTime)"),
        [demand],
      );
    },

    /**
     * Decodes RevocationTimeArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeRevocationTimeArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 minRevocationTime, uint64 maxRevocationTime)"),
        demandData,
      )[0];
    },

    /**
     * Encodes RevocationTimeArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint64 minRevocationTime, uint64 maxRevocationTime}
     * @returns abi encoded bytes
     */
    encodeRevocationTimeArbiterNonComposingDemand: (demand: {
      minRevocationTime: bigint;
      maxRevocationTime: bigint;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(uint64 minRevocationTime, uint64 maxRevocationTime)"),
        [demand],
      );
    },

    /**
     * Decodes RevocationTimeArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeRevocationTimeArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint64 minRevocationTime, uint64 maxRevocationTime)"),
        demandData,
      )[0];
    },

    /**
     * Encodes SchemaArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bytes32 expectedSchema}
     * @returns abi encoded bytes
     */
    encodeSchemaArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      expectedSchema: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 expectedSchema)"),
        [demand],
      );
    },

    /**
     * Decodes SchemaArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeSchemaArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 expectedSchema)"),
        demandData,
      )[0];
    },

    /**
     * Encodes SchemaArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 expectedSchema}
     * @returns abi encoded bytes
     */
    encodeSchemaArbiterNonComposingDemand: (demand: {
      expectedSchema: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(bytes32 expectedSchema)"),
        [demand],
      );
    },

    /**
     * Decodes SchemaArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeSchemaArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bytes32 expectedSchema)"),
        demandData,
      )[0];
    },

    /**
     * Encodes TimestampArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 minTimestamp, uint64 maxTimestamp}
     * @returns abi encoded bytes
     */
    encodeTimestampArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      minTimestamp: bigint;
      maxTimestamp: bigint;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 minTimestamp, uint64 maxTimestamp)"),
        [demand],
      );
    },

    /**
     * Decodes TimestampArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeTimestampArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint64 minTimestamp, uint64 maxTimestamp)"),
        demandData,
      )[0];
    },

    /**
     * Encodes TimestampArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint64 minTimestamp, uint64 maxTimestamp}
     * @returns abi encoded bytes
     */
    encodeTimestampArbiterNonComposingDemand: (demand: {
      minTimestamp: bigint;
      maxTimestamp: bigint;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(uint64 minTimestamp, uint64 maxTimestamp)"),
        [demand],
      );
    },

    /**
     * Decodes TimestampArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeTimestampArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint64 minTimestamp, uint64 maxTimestamp)"),
        demandData,
      )[0];
    },

    /**
     * Encodes UidArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bytes32 expectedUID}
     * @returns abi encoded bytes
     */
    encodeUidArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      expectedUID: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 expectedUID)"),
        [demand],
      );
    },

    /**
     * Decodes UidArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeUidArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, bytes32 expectedUID)"),
        demandData,
      )[0];
    },

    /**
     * Encodes UidArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 expectedUID}
     * @returns abi encoded bytes
     */
    encodeUidArbiterNonComposingDemand: (demand: {
      expectedUID: `0x${string}`;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(bytes32 expectedUID)"),
        [demand],
      );
    },

    /**
     * Decodes UidArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeUidArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(bytes32 expectedUID)"),
        demandData,
      )[0];
    },

    /**
     * Encodes ValueArbiterComposing.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint256 minValue, uint256 maxValue}
     * @returns abi encoded bytes
     */
    encodeValueArbiterComposingDemand: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      minValue: bigint;
      maxValue: bigint;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint256 minValue, uint256 maxValue)"),
        [demand],
      );
    },

    /**
     * Decodes ValueArbiterComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeValueArbiterComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address baseArbiter, bytes baseDemand, uint256 minValue, uint256 maxValue)"),
        demandData,
      )[0];
    },

    /**
     * Encodes ValueArbiterNonComposing.DemandData to bytes.
     * @param demand - struct DemandData {uint256 minValue, uint256 maxValue}
     * @returns abi encoded bytes
     */
    encodeValueArbiterNonComposingDemand: (demand: {
      minValue: bigint;
      maxValue: bigint;
    }) => {
      return encodeAbiParameters(
        parseAbiParameters("(uint256 minValue, uint256 maxValue)"),
        [demand],
      );
    },

    /**
     * Decodes ValueArbiterNonComposing.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decodeValueArbiterNonComposingDemand: (demandData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(uint256 minValue, uint256 maxValue)"),
        demandData,
      )[0];
    },
  };
};
