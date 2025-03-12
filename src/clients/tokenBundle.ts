import {
  flattenTokenBundle,
  getAttestedEventFromTxHash,
  type ViemClient,
} from "../utils";
import type { ChainAddresses } from "../types";
import type { Demand, TokenBundle } from "../types";

import { abi as tokenBundleBarterUtilsAbi } from "../contracts/TokenBundleBarterUtils";
import { abi as tokenBundleEscrowAbi } from "../contracts/TokenBundleEscrowObligation";
import { abi as tokenBundlePaymentAbi } from "../contracts/TokenBundlePaymentObligation";
import { decodeAbiParameters, parseAbiParameters } from "viem";

export const makeTokenBundleClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => ({
  /**
   * Decodes TokenBundleEscrowObligation.StatementData from bytes.
   * @param statementData - StatementData as abi encoded bytes
   * @returns the decoded StatementData object
   */
  decodeEscrowStatement: (statementData: `0x${string}`) => {
    return decodeAbiParameters(
      parseAbiParameters(
        "(address[] erc20Tokens, uint256[] erc20Amounts, address[] erc721Tokens, uint256[] erc721TokenIds, address[] erc1155Tokens, uint256[] erc1155TokenIds, uint256[] erc1155Amounts, address arbiter, bytes demand)",
      ),
      statementData,
    )[0];
  },
  /**
   * Decodes TokenBundlePaymentObligation.StatementData from bytes.
   * @param statementData - StatementData as abi encoded bytes
   * @returns the decoded StatementData object
   */
  decodePaymentStatement: (statementData: `0x${string}`) => {
    return decodeAbiParameters(
      parseAbiParameters(
        "(address[] erc20Tokens, uint256[] erc20Amounts, address[] erc721Tokens, uint256[] erc721TokenIds, address[] erc1155Tokens, uint256[] erc1155TokenIds, uint256[] erc1155Amounts, address payee)",
      ),
      statementData,
    )[0];
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
      address: addresses.tokenBundleEscrowObligation,
      abi: tokenBundleEscrowAbi.abi,
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
      address: addresses.tokenBundleEscrowObligation,
      abi: tokenBundleEscrowAbi.abi,
      functionName: "collectExpired",
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
      functionName: "makeStatement",
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
      functionName: "makeStatement",
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
        { ...flattenTokenBundle(bid), arbiter: "0x", demand: "0x" },
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
    const tx = await viemClient.waitForTransactionReceipt({ hash });
    return { hash };
  },
});
