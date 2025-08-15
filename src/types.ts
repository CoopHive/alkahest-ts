import type { Hex, BlockNumber, BlockTag } from "viem";

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

  stringObligation: `0x${string}`;

  trustedPartyArbiter: `0x${string}`;
  trivialArbiter: `0x${string}`;
  specificAttestationArbiter: `0x${string}`;
  trustedOracleArbiter: `0x${string}`;
  anyArbiter: `0x${string}`;
  allArbiter: `0x${string}`;
  intrinsicsArbiter: `0x${string}`;
  intrinsicsArbiter2: `0x${string}`;

  // Attestation Properties Arbiters - Composing
  attesterArbiterComposing?: `0x${string}`;
  expirationTimeArbiterComposing?: `0x${string}`;
  recipientArbiterComposing?: `0x${string}`;
  refUidArbiterComposing?: `0x${string}`;
  revocableArbiterComposing?: `0x${string}`;
  revocationTimeArbiterComposing?: `0x${string}`;
  schemaArbiterComposing?: `0x${string}`;
  timestampArbiterComposing?: `0x${string}`;
  uidArbiterComposing?: `0x${string}`;
  valueArbiterComposing?: `0x${string}`;

  // Attestation Properties Arbiters - Non-Composing
  attesterArbiterNonComposing?: `0x${string}`;
  expirationTimeArbiterNonComposing?: `0x${string}`;
  recipientArbiterNonComposing?: `0x${string}`;
  refUidArbiterNonComposing?: `0x${string}`;
  revocableArbiterNonComposing?: `0x${string}`;
  revocationTimeArbiterNonComposing?: `0x${string}`;
  schemaArbiterNonComposing?: `0x${string}`;
  timestampArbiterNonComposing?: `0x${string}`;
  uidArbiterNonComposing?: `0x${string}`;
  valueArbiterNonComposing?: `0x${string}`;
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

export type Attestation = {
  uid: `0x${string}`;
  schema: `0x${string}`;
  time: bigint;
  expirationTime: bigint;
  revocationTime: bigint;
  refUID: `0x${string}`;
  recipient: `0x${string}`;
  attester: `0x${string}`;
  revocable: boolean;
  data: `0x${string}`;
};

// Enhanced filter types for arbitratePast function
export interface TimeFilters {
  /** Only process attestations after this timestamp (Unix timestamp in seconds) */
  minTime?: bigint;
  /** Only process attestations before this timestamp (Unix timestamp in seconds) */
  maxTime?: bigint;
  /** Skip attestations past their expiration time */
  excludeExpired?: boolean;
  /** Only process attestations older than this duration (seconds) */
  minAge?: bigint;
  /** Only process attestations newer than this duration (seconds) */
  maxAge?: bigint;
}

export interface AttestationFilters {
  /** Only process attestations from specific attester */
  specificAttester?: string;
  /** Skip attestations from these attesters */
  excludeAttesters?: string[];
  /** Only process attestations for specific recipient */
  specificRecipient?: string;
  /** Skip revoked attestations */
  excludeRevoked?: boolean;
  /** Only process attestations with reference UID */
  requireRefUID?: boolean;
  /** Only process attestations with specific schema */
  specificSchema?: string;
}

export interface BlockFilters {
  /** Start from specific block number or block tag */
  fromBlock?: BlockNumber | BlockTag;
  /** End at specific block number or block tag */
  toBlock?: BlockNumber | BlockTag;
  /** Limit the block range to prevent timeouts */
  maxBlockRange?: bigint;
}

export interface BatchFilters {
  /** Limit number of obligations to process */
  maxObligations?: number;
  /** Process recent attestations first */
  prioritizeRecent?: boolean;
  /** Process in batches of this size */
  batchSize?: number;
}

export interface PerformanceFilters {
  /** Skip if estimated gas exceeds limit */
  maxGasPerTx?: bigint;
  /** Only simulate, don't execute transactions */
  dryRun?: boolean;
  /** Skip validation for faster processing */
  skipValidation?: boolean;
}

export interface EnhancedArbitrateFilters extends
  TimeFilters,
  AttestationFilters,
  BlockFilters,
  BatchFilters,
  PerformanceFilters {
  /** Only arbitrate if escrow demands current oracle */
  onlyIfEscrowDemandsCurrentOracle?: boolean;
  /** Skip obligations that have already been arbitrated */
  skipAlreadyArbitrated?: boolean;
}
