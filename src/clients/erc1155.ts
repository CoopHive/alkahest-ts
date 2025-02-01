import {
	flattenTokenBundle,
	getAttestationFromTxHash,
	type ViemClient,
} from "../utils";
import { contractAddresses } from "../config";
import type {
	ApprovalPurpose,
	Demand,
	Erc1155,
	Erc20,
	Erc721,
	TokenBundle,
} from "../types";

import { abi as erc1155BarterUtilsAbi } from "../contracts/ERC1155BarterCrossToken";
import { abi as erc1155EscrowAbi } from "../contracts/ERC1155EscrowObligation";
import { abi as erc1155PaymentAbi } from "../contracts/ERC1155PaymentObligation";
import { abi as erc1155Abi } from "../contracts/IERC1155";

export const makeErc1155Client = (viemClient: ViemClient) => ({
	approveAll: async (
		token_contract: `0x${string}`,
		purpose: ApprovalPurpose,
	) => {
		const to =
			purpose === "escrow"
				? contractAddresses[viemClient.chain.name].erc1155EscrowObligation
				: contractAddresses[viemClient.chain.name].erc1155PaymentObligation;
		const hash = await viemClient.writeContract({
			address: token_contract,
			abi: erc1155Abi.abi,
			functionName: "setApprovalForAll",
			args: [to, true],
		});

		return hash;
	},

	revokeAll: async (
		token_contract: `0x${string}`,
		purpose: ApprovalPurpose,
	) => {
		const to =
			purpose === "escrow"
				? contractAddresses[viemClient.chain.name].erc1155EscrowObligation
				: contractAddresses[viemClient.chain.name].erc1155PaymentObligation;
		const hash = await viemClient.writeContract({
			address: token_contract,
			abi: erc1155Abi.abi,
			functionName: "setApprovalForAll",
			args: [to, false],
		});

		return hash;
	},

	collectPayment: async (
		buyAttestation: `0x${string}`,
		fulfillment: `0x${string}`,
	) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155EscrowObligation,
			abi: erc1155EscrowAbi.abi,
			functionName: "collectPayment",
			args: [buyAttestation, fulfillment],
		});
		return hash;
	},

	collectExpired: async (buyAttestation: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155EscrowObligation,
			abi: erc1155EscrowAbi.abi,
			functionName: "collectExpired",
			args: [buyAttestation],
		});
		return hash;
	},

	buyWithErc1155: async (price: Erc1155, item: Demand, expiration: bigint) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155EscrowObligation,
			abi: erc1155EscrowAbi.abi,
			functionName: "makeStatement",
			args: [
				{
					token: price.address,
					tokenId: price.id,
					amount: price.value,
					arbiter: item.arbiter,
					demand: item.demand,
				},
				expiration,
			],
		});

		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	payWithErc1155: async (price: Erc1155, payee: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address:
				contractAddresses[viemClient.chain.name].erc1155PaymentObligation,
			abi: erc1155PaymentAbi.abi,
			functionName: "makeStatement",
			args: [
				{
					token: price.address,
					tokenId: price.id,
					amount: price.value,
					payee,
				},
			],
		});

		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	buyErc1155ForErc1155: async (
		bid: Erc1155,
		ask: Erc1155,
		expiration: bigint,
	) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155BarterUtils,
			abi: erc1155BarterUtilsAbi.abi,
			functionName: "buyErc1155ForErc1155",
			args: [
				bid.address,
				bid.id,
				bid.value,
				ask.address,
				ask.id,
				ask.value,
				expiration,
			],
		});
		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	payErc1155ForErc1155: async (buyAttestation: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155BarterUtils,
			abi: erc1155BarterUtilsAbi.abi,
			functionName: "payErc1155ForErc1155",
			args: [buyAttestation],
		});
		const tx = await viemClient.waitForTransactionReceipt({ hash });
		return { hash };
	},

	buyErc20WithErc1155: async (bid: Erc1155, ask: Erc20, expiration: bigint) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155BarterUtils,
			abi: erc1155BarterUtilsAbi.abi,
			functionName: "buyErc20WithErc1155",
			args: [
				bid.address,
				bid.id,
				bid.value,
				ask.address,
				ask.value,
				expiration,
			],
		});

		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	payErc1155ForErc20: async (buyAttestation: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155BarterUtils,
			abi: erc1155BarterUtilsAbi.abi,
			functionName: "payErc1155ForErc20",
			args: [buyAttestation],
		});

		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	buyErc721WithErc1155: async (
		bid: Erc1155,
		ask: Erc721,
		expiration: bigint,
	) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155BarterUtils,
			abi: erc1155BarterUtilsAbi.abi,
			functionName: "buyErc721WithErc1155",
			args: [bid.address, bid.id, bid.value, ask.address, ask.id, expiration],
		});
		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	payErc1155ForErc721: async (buyAttestation: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155BarterUtils,
			abi: erc1155BarterUtilsAbi.abi,
			functionName: "payErc1155ForErc721",
			args: [buyAttestation],
		});

		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	buyBundleWithErc1155: async (
		bid: Erc1155,
		ask: TokenBundle,
		payee: `0x${string}`,
		expiration: bigint,
	) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155BarterUtils,
			abi: erc1155BarterUtilsAbi.abi,
			functionName: "buyBundleWithErc1155",
			args: [
				bid.address,
				bid.id,
				bid.value,
				{ ...flattenTokenBundle(ask), payee },
				expiration,
			],
		});

		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},

	payErc1155ForBundle: async (buyAttestation: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155BarterUtils,
			abi: erc1155BarterUtilsAbi.abi,
			functionName: "payErc1155ForBundle",
			args: [buyAttestation],
		});

		const attested = await getAttestationFromTxHash(viemClient, hash);
		return { hash, attested };
	},
});
