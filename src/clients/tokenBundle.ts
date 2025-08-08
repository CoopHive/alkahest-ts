import {
  flattenTokenBundle,
  getAttestedEventFromTxHash,
  type ViemClient,
} from "../utils";
import type { ChainAddresses } from "../types";
import type { ApprovalPurpose, Demand, TokenBundle } from "../types";

import { abi as tokenBundleBarterUtilsAbi } from "../contracts/TokenBundleBarterUtils";
import { abi as tokenBundleEscrowAbi } from "../contracts/TokenBundleEscrowObligation";
import { abi as tokenBundlePaymentAbi } from "../contracts/TokenBundlePaymentObligation";
import { abi as erc20Abi } from "../contracts/ERC20Permit";
import { abi as erc721Abi } from "../contracts/IERC721";
import { abi as erc1155Abi } from "../contracts/IERC1155";
import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";

export const makeTokenBundleClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  // Extract ABI types for encoding/decoding from contract ABIs
  const escrowObligationDataType = tokenBundleEscrowAbi.abi.find(
    (item) => item.type === "function" && item.name === "decodeObligationData"
  )?.outputs?.[0];

  const paymentObligationDataType = tokenBundlePaymentAbi.abi.find(
    (item) => item.type === "function" && item.name === "decodeObligationData"
  )?.outputs?.[0];

  /**
   * Encodes TokenBundleEscrowObligation.ObligationData to bytes using raw parameters.
   * @param data - ObligationData object to encode
   * @returns the abi encoded ObligationData as bytes
   */
  const encodeEscrowObligationRaw = (data: {
    erc20Tokens: `0x${string}`[];
    erc20Amounts: bigint[];
    erc721Tokens: `0x${string}`[];
    erc721TokenIds: bigint[];
    erc1155Tokens: `0x${string}`[];
    erc1155TokenIds: bigint[];
    erc1155Amounts: bigint[];
    arbiter: `0x${string}`;
    demand: `0x${string}`;
  }) => {
    return encodeAbiParameters(
      escrowObligationDataType ? [escrowObligationDataType] : parseAbiParameters(
        "(address arbiter, bytes demand, address[] erc20Tokens, uint256[] erc20Amounts, address[] erc721Tokens, uint256[] erc721TokenIds, address[] erc1155Tokens, uint256[] erc1155TokenIds, uint256[] erc1155Amounts)",
      ),
      [data],
    );
  };

  /**
   * Encodes TokenBundlePaymentObligation.ObligationData to bytes using raw parameters.
   * @param data - ObligationData object to encode
   * @returns the abi encoded ObligationData as bytes
   */
  const encodePaymentObligationRaw = (data: {
    erc20Tokens: `0x${string}`[];
    erc20Amounts: bigint[];
    erc721Tokens: `0x${string}`[];
    erc721TokenIds: bigint[];
    erc1155Tokens: `0x${string}`[];
    erc1155TokenIds: bigint[];
    erc1155Amounts: bigint[];
    payee: `0x${string}`;
  }) => {
    return encodeAbiParameters(
      paymentObligationDataType ? [paymentObligationDataType] : parseAbiParameters(
        "(address[] erc20Tokens, uint256[] erc20Amounts, address[] erc721Tokens, uint256[] erc721TokenIds, address[] erc1155Tokens, uint256[] erc1155TokenIds, uint256[] erc1155Amounts, address payee)",
      ),
      [data],
    );
  };

  return {
    encodeEscrowObligationRaw,
    encodePaymentObligationRaw,
    /**
     * Encodes TokenBundleEscrowObligation.ObligationData to bytes using type-based parameters.
     * @param bundle - Bundle of tokens for payment
     * @param demand - Custom demand details
     * @returns the abi encoded ObligationData as bytes
     */
    encodeEscrowObligation: (bundle: TokenBundle, demand: Demand) => {
      const flatBundle = flattenTokenBundle(bundle);

      return encodeEscrowObligationRaw({
        ...flatBundle,
        arbiter: demand.arbiter,
        demand: demand.demand,
      });
    },

    /**
     * Encodes TokenBundlePaymentObligation.ObligationData to bytes using type-based parameters.
     * @param bundle - Bundle of tokens for payment
     * @param payee - Address to receive the payment
     * @returns the abi encoded ObligationData as bytes
     */
    encodePaymentObligation: (bundle: TokenBundle, payee: `0x${string}`) => {
      const flatBundle = flattenTokenBundle(bundle);

      return encodePaymentObligationRaw({
        ...flatBundle,
        payee,
      });
    },

    /**
     * Decodes TokenBundleEscrowObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodeEscrowObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters(
        escrowObligationDataType ? [escrowObligationDataType] : parseAbiParameters(
          "(address[] erc20Tokens, uint256[] erc20Amounts, address[] erc721Tokens, uint256[] erc721TokenIds, address[] erc1155Tokens, uint256[] erc1155TokenIds, uint256[] erc1155Amounts)",
        ),
        obligationData,
      )[0];
    },
    /**
     * Decodes TokenBundlePaymentObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodePaymentObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters(
        paymentObligationDataType ? [paymentObligationDataType] : parseAbiParameters(
          "(address[] erc20Tokens, uint256[] erc20Amounts, address[] erc721Tokens, uint256[] erc721TokenIds, address[] erc1155Tokens, uint256[] erc1155TokenIds, uint256[] erc1155Amounts, address payee)",
        ),
        obligationData,
      )[0];
    },
    /**
     * Collects payment from an escrow after fulfillment
     * @param buyAttestation - UID of the buy attestation
     * @param fulfillment - UID of the fulfillment attestation
     * @returns Transaction hash
     */
    collectEscrow: async (
      buyAttestation: `0x${string}`,
      fulfillment: `0x${string}`,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.tokenBundleEscrowObligation,
        abi: tokenBundleEscrowAbi.abi,
        functionName: "collectEscrow",
        args: [buyAttestation, fulfillment],
      });
      return hash;
    },

    /**
     * Collects expired escrow funds
     * @param buyAttestation - UID of the expired buy attestation
     * @returns Transaction hash
     */
    reclaimExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.tokenBundleEscrowObligation,
        abi: tokenBundleEscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },

    /**
     * Creates an escrow with a bundle of tokens for a custom demand
     * @param price - Bundle of tokens for payment
     * @param item - Custom demand details including arbiter and demand data
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.tokenBundle.buyWithBundle(
     *   tokenBundle,
     *   { arbiter: arbitratorAddress, demand: encodedDemand },
     *   0n,
     * );
     * ```
     */
    buyWithBundle: async (
      price: TokenBundle,
      item: Demand,
      expiration: bigint,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.tokenBundleEscrowObligation,
        abi: tokenBundleEscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            ...flattenTokenBundle(price),
            ...item,
          },
          expiration,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates a direct payment obligation with a bundle of tokens
     * @param price - Bundle of tokens for payment
     * @param payee - Address to receive the payment
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.tokenBundle.payWithBundle(
     *   tokenBundle,
     *   receiverAddress,
     * );
     * ```
     */
    payWithBundle: async (price: TokenBundle, payee: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.tokenBundlePaymentObligation,
        abi: tokenBundlePaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            ...flattenTokenBundle(price),
            payee,
          },
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading one bundle of tokens for another
     * @param bid - Bundle of tokens offered
     * @param ask - Bundle of tokens requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.tokenBundle.buyBundleForBundle(
     *   myTokenBundle,
     *   theirTokenBundle,
     *   0n,
     * );
     * ```
     */
    buyBundleForBundle: async (
      bid: TokenBundle,
      ask: TokenBundle,
      expiration: bigint,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.tokenBundleBarterUtils,
        abi: tokenBundleBarterUtilsAbi.abi,
        functionName: "buyBundleForBundle",
        args: [
          {
            ...flattenTokenBundle(bid),
            arbiter: "0x0000000000000000000000000000000000000000",
            demand: "0x",
          },
          { ...flattenTokenBundle(ask), payee: viemClient.account.address },
          expiration,
        ],
      });
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills a bundle-bundle trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash
     *
     * @example
     * ```ts
     * const payment = await client.tokenBundle.payBundleForBundle(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payBundleForBundle: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.tokenBundleBarterUtils,
        abi: tokenBundleBarterUtilsAbi.abi,
        functionName: "payBundleForBundle",
        args: [buyAttestation],
      });
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Approves all tokens in a bundle for trading
     * @param bundle - Bundle of tokens to approve
     * @param purpose - Purpose of approval (escrow or payment)
     * @returns Array of transaction hashes
     *
     * @example
     * ```ts
     * const approvals = await client.tokenBundle.approve(
     *   tokenBundle,
     *   "escrow"
     * );
     * ```
     */
    approve: async (bundle: TokenBundle, purpose: ApprovalPurpose) => {
      // Get the appropriate contract address based on purpose
      const target =
        purpose === "escrow"
          ? addresses.tokenBundleEscrowObligation
          : addresses.tokenBundlePaymentObligation;

      // Prepare approval transactions for all token types
      const approvalPromises: Promise<`0x${string}`>[] = [];

      // Process ERC20 tokens in parallel
      bundle.erc20s.forEach((token) => {
        approvalPromises.push(
          viemClient.writeContract({
            address: token.address,
            abi: erc20Abi.abi,
            functionName: "approve",
            args: [target, token.value],
          }),
        );
      });

      // Process ERC721 tokens
      // Group by token contract to use setApprovalForAll when possible
      const erc721AddressesSet = new Set(
        bundle.erc721s.map((token) => token.address),
      );

      // For contracts with multiple tokens, use setApprovalForAll in parallel
      erc721AddressesSet.forEach((address) => {
        approvalPromises.push(
          viemClient.writeContract({
            address: address,
            abi: erc721Abi.abi,
            functionName: "setApprovalForAll",
            args: [target, true],
          }),
        );
      });

      // Process ERC1155 tokens
      // Group by token contract to use setApprovalForAll
      const erc1155AddressesSet = new Set(
        bundle.erc1155s.map((token) => token.address),
      );

      // For ERC1155, always use setApprovalForAll in parallel
      erc1155AddressesSet.forEach((address) => {
        approvalPromises.push(
          viemClient.writeContract({
            address: address,
            abi: erc1155Abi.abi,
            functionName: "setApprovalForAll",
            args: [target, true],
          }),
        );
      });

      // Execute all approval transactions in parallel
      const results = await Promise.all(approvalPromises);
      return results;
    },
  };
};
