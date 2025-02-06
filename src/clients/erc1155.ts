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
	/**
	 * Approves all tokens from a contract for trading
	 * @param token_contract - Address of the token contract
	 * @param purpose - Purpose of approval (escrow or payment)
	 * @returns Transaction hash
	 */
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

	/**
	 * Revokes approval for all tokens from a contract
	 * @param token_contract - Address of the token contract
	 * @param purpose - Purpose of approval to revoke (escrow or payment)
	 * @returns Transaction hash
	 */
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

	/**
	 * Collects payment from an escrow after fulfillment
	 * @param buyAttestation - UID of the buy attestation
	 * @param fulfillment - UID of the fulfillment attestation
	 * @returns Transaction hash
	 */
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

	/**
	 * Collects expired escrow funds
	 * @param buyAttestation - UID of the expired buy attestation
	 * @returns Transaction hash
	 */
	collectExpired: async (buyAttestation: `0x${string}`) => {
		const hash = await viemClient.writeContract({
			address: contractAddresses[viemClient.chain.name].erc1155EscrowObligation,
			abi: erc1155EscrowAbi.abi,
			functionName: "collectExpired",
			args: [buyAttestation],
		});
		return hash;
	},

	/**
	 * Creates an escrow with ERC1155 tokens for a custom demand
	 * @param price - ERC1155 token details for payment
	 * @param item - Custom demand details including arbiter and demand data
	 * @param expiration - Escrow expiration time (0 for no expiration)
	 * @returns Transaction hash and attestation
	 * 
	 * @example
	 * ```ts
	 * const escrow = await client.erc1155.buyWithErc1155(
	 *   { address: multiToken, id: 1n, value: 5n },
	 *   { arbiter: arbitratorAddress, demand: encodedDemand },
	 *   0n,
	 * );
	 * ```
	 */
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

	/**
	 * Creates a direct payment obligation with ERC1155 tokens
	 * @param price - ERC1155 token details for payment
	 * @param payee - Address to receive the payment
	 * @returns Transaction hash and attestation
	 * 
	 * @example
	 * ```ts
	 * const payment = await client.erc1155.payWithErc1155(
	 *   { address: multiToken, id: 1n, value: 5n },
	 *   receiverAddress,
	 * );
	 * ```
	 */
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

	/**
	 * Creates an escrow for trading ERC1155 tokens for ERC1155 tokens
	 * @param bid - ERC1155 token offered
	 * @param ask - ERC1155 token requested
	 * @param expiration - Escrow expiration time (0 for no expiration)
	 * @returns Transaction hash and attestation
	 * 
	 * @example
	 * ```ts
	 * const escrow = await client.erc1155.buyErc1155ForErc1155(
	 *   { address: myMultiToken, id: 1n, value: 5n },
	 *   { address: theirMultiToken, id: 2n, value: 10n },
	 *   0n,
	 * );
	 * ```
	 */
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

	/**
	 * Fulfills an ERC1155-ERC1155 trade
	 * @param buyAttestation - UID of the buy attestation to fulfill
	 * @returns Transaction hash
	 * 
	 * @example
	 * ```ts
	 * const payment = await client.erc1155.payErc1155ForErc1155(
	 *   escrow.attested.uid,
	 * );
	 * ```
	 */
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

	/**
	 * Creates an escrow for trading ERC1155 tokens for ERC20 tokens
	 * @param bid - ERC1155 token offered
	 * @param ask - ERC20 token requested
	 * @param expiration - Escrow expiration time (0 for no expiration)
	 * @returns Transaction hash and attestation
	 * 
	 * @example
	 * ```ts
	 * const escrow = await client.erc1155.buyErc20WithErc1155(
	 *   { address: multiToken, id: 1n, value: 5n },
	 *   { address: usdc, value: 1000n },
	 *   0n,
	 * );
	 * ```
	 */
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

	/**
	 * Fulfills an ERC1155-ERC20 trade
	 * @param buyAttestation - UID of the buy attestation to fulfill
	 * @returns Transaction hash and attestation
	 * 
	 * @example
	 * ```ts
	 * const payment = await client.erc1155.payErc1155ForErc20(
	 *   escrow.attested.uid,
	 * );
	 * ```
	 */
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

	/**
	 * Creates an escrow for trading ERC1155 tokens for ERC721 tokens
	 * @param bid - ERC1155 token offered
	 * @param ask - ERC721 token requested
	 * @param expiration - Escrow expiration time (0 for no expiration)
	 * @returns Transaction hash and attestation
	 * 
	 * @example
	 * ```ts
	 * const escrow = await client.erc1155.buyErc721WithErc1155(
	 */
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

	/**
	 * Fulfills an ERC721-ERC1155 trade
	 * @param buyAttestation - UID of the buy attestation to fulfill
	 * @returns Transaction hash and attestation
	 * 
	 * @example
	 * ```ts
	 * const payment = await client.erc1155.payErc1155ForErc721(
	 *   escrow.attested.uid,
	 * );
	 * ```
	 */
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

	/**
	 * Creates an escrow for trading ERC1155 tokens for a bundle of tokens
	 * @param bid - ERC1155 token offered
	 * @param ask - Bundle of tokens requested
	 * @param payee - Address to receive the payment
	 * @param expiration - Escrow expiration time (0 for no expiration)
	 * @returns Transaction hash and attestation
	 * 
	 * @example
	 * ```ts
	 * const escrow = await client.erc1155.buyBundleWithErc1155(
	 *   { address: multiToken, id: 1n, value: 5n },
	 *   tokenBundle,
	 *   receiverAddress,
	 *   0n,
	 * );
	 * ```
	 */
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

	/**
	 * Fulfills an ERC1155-Bundle trade
	 * @param buyAttestation - UID of the buy attestation to fulfill
	 * @returns Transaction hash and attestation
	 * 
	 * @example
	 * ```ts
	 * const payment = await client.erc1155.payErc1155ForBundle(
	 *   escrow.attested.uid,
	 * );
	 * ```
	 */
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
