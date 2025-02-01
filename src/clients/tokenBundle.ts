import {
	flattenTokenBundle,
	getAttestationFromTxHash,
	type ViemClient,
} from "../utils";
import { contractAddresses } from "../config";
import type { Demand, TokenBundle } from "../types";

import { abi as tokenBundleBarterUtilsAbi } from "../contracts/TokenBundleBarterUtils";
import { abi as tokenBundleEscrowAbi } from "../contracts/TokenBundleEscrowObligation";
import { abi as tokenBundlePaymentAbi } from "../contracts/TokenBundlePaymentObligation";

export const makeTokenBundleClient = (viemClient: ViemClient) => ({
	collectPayment: async (
		buyAttestation: `0x${string}`,
		fulfillment: `0x${string}`,
	) => {
		const hash = await viemClient.writeContract({
			address:
				contractAddresses[viemClient.chain.name].tokenBundleEscrowObligation,
			abi: tokenBundleEscrowAbi.abi,
			functionName: "collectPayment",
			args: [buyAttestation, fulfillment],
		});
		return hash;
	},

	collectExpired: async (buyAttestation: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address:
				contractAddresses[viemClient.chain.name].tokenBundleEscrowObligation,
			abi: tokenBundleEscrowAbi.abi,
			functionName: "collectExpired",
			args: [buyAttestation],
		});
		return hash;
	},

	buyWithBundle: async (
		price: TokenBundle,
		item: Demand,
		expiration: bigint,
	) => {
		const hash = await viemClient.writeContract({
			address:
				contractAddresses[viemClient.chain.name].tokenBundleEscrowObligation,
			abi: tokenBundleEscrowAbi.abi,
			functionName: "makeStatement",
			args: [
				{
					...flattenTokenBundle(price),
					...item,
				},
				expiration,
			],
		});

		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	payWithBundle: async (price: TokenBundle, payee: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address:
				contractAddresses[viemClient.chain.name].tokenBundlePaymentObligation,
			abi: tokenBundlePaymentAbi.abi,
			functionName: "makeStatement",
			args: [
				{
					...flattenTokenBundle(price),
					payee,
				},
			],
		});

		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	buyBundleForBundle: async (
		bid: TokenBundle,
		ask: TokenBundle,
		expiration: bigint,
	) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].tokenBundleBarterUtils,
			abi: tokenBundleBarterUtilsAbi.abi,
			functionName: "buyBundleForBundle",
			args: [
				{ ...flattenTokenBundle(bid), arbiter: "0x", demand: "0x" },
				{ ...flattenTokenBundle(ask), payee: viemClient.account.address },
				expiration,
			],
		});
		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	payBundleForBundle: async (buyAttestation: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].tokenBundleBarterUtils,
			abi: tokenBundleBarterUtilsAbi.abi,
			functionName: "payBundleForBundle",
			args: [buyAttestation],
		});
		const tx = await viemClient.waitForTransactionReceipt({ hash });
		return { hash };
	},
});
