import type { Hex } from "viem";

export type ChainAddresses = {
	eas: `0x${string}`;
	easSchemaRegistry: `0x${string}`;

	erc20EscrowObligation: `0x${string}`;
	erc20PaymentObligation: `0x${string}`;
	erc20BarterUtils: `0x${string}`;

	erc721EscrowObligation: `0x${string}`;
	erc721PaymentObligation: `0x${string}`;
	erc721BarterUtils: `0x${string}`;

	erc1155EscrowObligation: `0x${string}`;
	erc1155BarterUtils: `0x${string}`;
	erc1155PaymentObligation: `0x${string}`;

	tokenBundleEscrowObligation: `0x${string}`;
	tokenBundlePaymentObligation: `0x${string}`;
	tokenBundleBarterUtils: `0x${string}`;

	attestationEscrowObligation: `0x${string}`;
	attestationEscrowObligation2: `0x${string}`;
	attestationBarterUtils: `0x${string}`;

	jobResultObligation: `0x${string}`;

	usdc: `0x${string}`;
	eurc: `0x${string}`;

	trustedPartyArbiter: `0x${string}`;
	trivialArbiter: `0x${string}`;
	specificAttestationArbiter: `0x${string}`;
	trustedOracleArbiter: `0x${string}`;
};

export type PermitSignature = {
	deadline: bigint;
	v: number;
	r: `0x${string}`;
	s: `0x${string}`;
};

export type SignPermitProps = {
	/** Address of the token to approve */
	contractAddress: Hex;
	/** Name of the token to approve.
	 * Corresponds to the `name` method on the ERC-20 contract. Please note this must match exactly byte-for-byte */
	erc20Name: string;
	/** Owner of the tokens. Usually the currently connected address. */
	ownerAddress: Hex;
	/** Address to grant allowance to */
	spenderAddress: Hex;
	/** Expiration of this approval, in SECONDS */
	deadline: bigint;
	/** Numerical chainId of the token contract */
	chainId: number;
	/** Defaults to 1. Some tokens need a different version, check the [PERMIT INFORMATION](https://github.com/vacekj/wagmi-permit/blob/main/PERMIT.md) for more information */
	permitVersion?: string;
	/** Permit nonce for the specific address and token contract. You can get the nonce from the `nonces` method on the token contract. */
	nonce: bigint;
};

export type Eip2612Props = SignPermitProps & {
	/** Amount to approve */
	value: bigint;
};

export type Erc20 = {
	address: `0x${string}`;
	value: bigint;
};

export type Erc721 = {
	address: `0x${string}`;
	id: bigint;
};

export type Erc1155 = {
	address: `0x${string}`;
	id: bigint;
	value: bigint;
};

export type Demand = {
	arbiter: `0x${string}`;
	demand: `0x${string}`;
};

export type TokenBundle = {
	erc20s: Erc20[];
	erc721s: Erc721[];
	erc1155s: Erc1155[];
};

export type TokenBundleFlat = {
	erc20Tokens: `0x${string}`[];
	erc20Amounts: bigint[];

	erc721Tokens: `0x${string}`[];
	erc721TokenIds: bigint[];

	erc1155Tokens: `0x${string}`[];
	erc1155TokenIds: bigint[];
	erc1155Amounts: bigint[];
};

export type ApprovalPurpose = "escrow" | "payment";
