import { getAttestationFromTxHash, type ViemClient } from "../utils";
import { contractAddresses } from "../config";
import { abi as attestationEscrowAbi } from "../contracts/AttestationEscrowObligation";
import { abi as attestationEscrow2Abi } from "../contracts/AttestationEscrowObligation2";
import { abi as attestationBarterUtilsAbi } from "../contracts/AttestationBarterUtils";

export const makeAttestationClient = (viemClient: ViemClient) => ({
  /**
   * Creates an escrow using an attestation as the escrowed item.
   * This function uses the original AttestationEscrowObligation contract where the full attestation
   * data is stored in the escrow statement.
   * 
   * @param attestation - The attestation data to be escrowed
   * @param item - The arbiter and demand data for the escrow
   * @param expiration - Optional expiration time for the escrow (default: 0 = no expiration)
   * @returns The transaction hash and attested escrow data
   */
  createEscrow: async (
    attestation: {
      schema: `0x${string}`;
      data: {
        recipient: `0x${string}`;
        expirationTime: bigint;
        revocable: boolean;
        refUID: `0x${string}`;
        data: `0x${string}`;
        value: bigint;
      };
    },
    item: {
      arbiter: `0x${string}`;
      demand: `0x${string}`;
    },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address:
        contractAddresses[viemClient.chain.name].attestationEscrowObligation,
      abi: attestationEscrowAbi.abi,
      functionName: "makeStatement",
      args: [
        {
          attestation,
          arbiter: item.arbiter,
          demand: item.demand,
        },
        expiration,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  /**
   * Collects payment from an attestation escrow by providing a fulfillment attestation.
   * This function is used with the original AttestationEscrowObligation contract.
   * 
   * @param escrowAttestation - The UID of the escrow attestation
   * @param fulfillmentAttestation - The UID of the fulfillment attestation
   * @returns The transaction hash and validation attestation data
   */
  collectEscrow: async (
    escrowAttestation: `0x${string}`,
    fulfillmentAttestation: `0x${string}`,
  ) => {
    const hash = await viemClient.writeContract({
      address:
        contractAddresses[viemClient.chain.name].attestationEscrowObligation,
      abi: attestationEscrowAbi.abi,
      functionName: "collectPayment",
      args: [escrowAttestation, fulfillmentAttestation],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  /**
   * Creates an escrow using an attestation UID as reference.
   * This function uses AttestationEscrowObligation2 which stores only the attestation UID
   * instead of the full attestation data, making it more gas efficient.
   * 
   * @param attestationUid - The UID of the attestation to be escrowed
   * @param item - The arbiter and demand data for the escrow
   * @param expiration - Optional expiration time for the escrow (default: 0 = no expiration)
   * @returns The transaction hash and attested escrow data
   */
  createEscrow2: async (
    attestationUid: `0x${string}`,
    item: {
      arbiter: `0x${string}`;
      demand: `0x${string}`;
    },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address:
        contractAddresses[viemClient.chain.name].attestationEscrowObligation2,
      abi: attestationEscrow2Abi.abi,
      functionName: "makeStatement",
      args: [
        {
          attestationUid,
          arbiter: item.arbiter,
          demand: item.demand,
        },
        expiration,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  /**
   * Collects payment from an attestation escrow by providing a fulfillment attestation.
   * This function is used with AttestationEscrowObligation2 and creates a validation
   * attestation referencing the original attestation.
   * 
   * @param escrowAttestation - The UID of the escrow attestation
   * @param fulfillmentAttestation - The UID of the fulfillment attestation
   * @returns The transaction hash and validation attestation data
   */
  collectEscrow2: async (
    escrowAttestation: `0x${string}`,
    fulfillmentAttestation: `0x${string}`,
  ) => {
    const hash = await viemClient.writeContract({
      address:
        contractAddresses[viemClient.chain.name].attestationEscrowObligation2,
      abi: attestationEscrow2Abi.abi,
      functionName: "collectPayment",
      args: [escrowAttestation, fulfillmentAttestation],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  /**
   * Registers a new schema in the EAS Schema Registry.
   * 
   * @param schema - The schema string defining the attestation structure
   * @param resolver - The address of the resolver contract
   * @param revocable - Whether attestations using this schema can be revoked
   * @returns The transaction hash
   */
  registerSchema: async (
    schema: string,
    resolver: `0x${string}`,
    revocable: boolean,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].attestationBarterUtils,
      abi: attestationBarterUtilsAbi.abi,
      functionName: "registerSchema",
      args: [schema, resolver, revocable],
    });

    return hash;
  },

  /**
   * Creates a new attestation using the AttestationBarterUtils contract.
   * 
   * @param schema - The schema UID for the attestation
   * @param recipient - The recipient address of the attestation
   * @param expirationTime - The expiration time for the attestation
   * @param revocable - Whether the attestation can be revoked
   * @param refUID - Reference to another attestation UID (if any)
   * @param data - The encoded attestation data
   * @returns The transaction hash and attested data
   */
  createAttestation: async (
    schema: `0x${string}`,
    recipient: `0x${string}`,
    expirationTime: bigint,
    revocable: boolean,
    refUID: `0x${string}`,
    data: `0x${string}`,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].attestationBarterUtils,
      abi: attestationBarterUtilsAbi.abi,
      functionName: "attest",
      args: [schema, recipient, expirationTime, revocable, refUID, data],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  /**
   * Creates an attestation and immediately escrows it in a single transaction.
   * This is a convenience function that combines createAttestation and createEscrow.
   * 
   * @param attestation - The attestation data to create and escrow
   * @param escrow - The escrow parameters including arbiter, demand, and expiration
   * @returns The transaction hash and attested data
   */
  attestAndCreateEscrow: async (
    attestation: {
      schema: `0x${string}`;
      data: {
        recipient: `0x${string}`;
        expirationTime: bigint;
        revocable: boolean;
        refUID: `0x${string}`;
        data: `0x${string}`;
        value: bigint;
      };
    },
    escrow: {
      arbiter: `0x${string}`;
      demand: `0x${string}`;
      expirationTime: bigint;
    },
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].attestationBarterUtils,
      abi: attestationBarterUtilsAbi.abi,
      functionName: "attestAndCreateEscrow",
      args: [attestation, escrow.arbiter, escrow.demand, escrow.expirationTime],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },
});
