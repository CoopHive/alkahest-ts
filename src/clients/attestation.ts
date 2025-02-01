import { getAttestationFromTxHash, type ViemClient } from "../utils";
import { contractAddresses } from "../config";
import { abi as attestationEscrowAbi } from "../contracts/AttestationEscrowObligation";
import { abi as attestationEscrow2Abi } from "../contracts/AttestationEscrowObligation2";
import { abi as attestationBarterUtilsAbi } from "../contracts/AttestationBarterUtils";
import { parseAbiItem } from "viem";

export const makeAttestationClient = (viemClient: ViemClient) => ({
  // AttestationEscrowObligation functions
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

  // AttestationEscrowObligation2 functions
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

  // AttestationBarterUtils functions
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
