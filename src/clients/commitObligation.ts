import {
    decodeAbiParameters,
    encodeAbiParameters,
    parseAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";
import { getAttestation, getAttestedEventFromTxHash } from "../utils";

import { abi as commitObligationAbi } from "../contracts/CommitObligation";
import type { ChainAddresses } from "../types";

// Enum for CommitAlgo from the contract
export enum CommitAlgo {
    SHA256 = 0,
    MD5 = 1,
}

// Type for the CommitObligation data structure
export type CommitObligationData = {
    commitHash: string;
    commitAlgo: CommitAlgo;
    hosts: string[];
};

export const makeCommitObligationClient = (
    viemClient: ViemClient,
    addresses: ChainAddresses,
) => {
    const decode = (obligationData: `0x${string}`) => {
        return decodeAbiParameters(
            parseAbiParameters("(string commitHash,uint8 commitAlgo,string[] hosts)"),
            obligationData,
        )[0];
    };

    const doObligation = async (
        data: CommitObligationData,
        refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) => {
        const { request } = await viemClient.simulateContract({
            address: addresses.commitObligation,
            abi: commitObligationAbi.abi,
            functionName: "doObligation",
            args: [data, refUID],
        });

        const hash = await viemClient.writeContract(request);
        const attested = await getAttestedEventFromTxHash(viemClient, hash);
        return { hash, attested };
    };

    const getSchema = async () =>
        await viemClient.readContract({
            address: addresses.commitObligation,
            abi: commitObligationAbi.abi,
            functionName: "ATTESTATION_SCHEMA",
        });

    const getObligationData = async (uid: `0x${string}`) => {
        return await viemClient.readContract({
            address: addresses.commitObligation,
            abi: commitObligationAbi.abi,
            functionName: "getObligationData",
            args: [uid],
        });
    };

    return {
        encode: (data: CommitObligationData) => {
            return encodeAbiParameters(
                parseAbiParameters("(string commitHash,uint8 commitAlgo,string[] hosts)"),
                [data]
            );
        },
        decode,
        doObligation,
        getSchema,
        getObligationData,
        /**
         * Gets a complete obligation from its attestation UID, combining attestation metadata with decoded obligation data
         * @param uid - UID of the attestation
         * @returns The complete obligation including attestation metadata and decoded obligation data
         */
        getObligation: async (uid: `0x${string}`) => {
            const [attestation, schema] = await Promise.all([
                getAttestation(viemClient, uid, addresses),
                getSchema(),
            ]);

            if (attestation.schema !== schema) {
                throw new Error(`Unsupported schema: ${attestation.schema}`);
            }
            const data = decodeAbiParameters(
                parseAbiParameters("(string commitHash,uint8 commitAlgo,string[] hosts)"),
                attestation.data,
            )[0];

            return {
                ...attestation,
                data,
            };
        },
    };
};
