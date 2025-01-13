import { getAttestationFromTxHash, type ViemClient } from "../utils";
import { contractAddresses } from "../config";

import { abi as erc721BarterUtilsAbi } from "../contracts/ERC721BarterCrossToken";
import { abi as erc721EscrowAbi } from "../contracts/ERC721EscrowObligation";
import { abi as erc721PaymentAbi } from "../contracts/ERC721PaymentObligation";
import { abi as erc721Abi } from "../contracts/IERC721";
import type { Demand, Erc1155, Erc20, Erc721 } from "../types";

type ApprovalPurpose = "escrow" | "payment";

export const makeErc721Client = (viemClient: ViemClient) => ({
  approve: async (token: Erc721, purpose: ApprovalPurpose) => {
    const to =
      purpose === "escrow"
        ? contractAddresses[viemClient.chain.name].erc721EscrowObligation
        : contractAddresses[viemClient.chain.name].erc721PaymentObligation;
    const hash = await viemClient.writeContract({
      address: token.token,
      abi: erc721Abi.abi,
      functionName: "approve",
      args: [to, token.tokenId],
    });

    return hash;
  },
  approveAll: async (
    token_contract: `0x${string}`,
    purpose: ApprovalPurpose,
  ) => {
    const to =
      purpose === "escrow"
        ? contractAddresses[viemClient.chain.name].erc721EscrowObligation
        : contractAddresses[viemClient.chain.name].erc721PaymentObligation;
    const hash = await viemClient.writeContract({
      address: token_contract,
      abi: erc721Abi.abi,
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
        ? contractAddresses[viemClient.chain.name].erc721EscrowObligation
        : contractAddresses[viemClient.chain.name].erc721PaymentObligation;
    const hash = await viemClient.writeContract({
      address: token_contract,
      abi: erc721Abi.abi,
      functionName: "setApprovalForAll",
      args: [to, false],
    });

    return hash;
  },
  buyWithErc721: async (price: Erc721, item: Demand, expiration: bigint) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc721EscrowObligation,
      abi: erc721EscrowAbi.abi,
      functionName: "makeStatement",
      args: [
        {
          token: price.token,
          tokenId: price.tokenId,
          arbiter: item.arbiter,
          demand: item.demand,
        },
        expiration,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },
  payWithErc721: async (price: Erc721, payee: `0x${string}`) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc721PaymentObligation,
      abi: erc721PaymentAbi.abi,
      functionName: "makeStatement",
      args: [
        {
          token: price.token,
          tokenId: price.tokenId,
          payee,
        },
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },
  buyErc721ForErc721: async (bid: Erc721, ask: Erc721, expiration: bigint) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc721BarterUtils,
      abi: erc721BarterUtilsAbi.abi,
      functionName: "buyErc721ForErc721",
      args: [bid.token, bid.tokenId, ask.token, ask.tokenId, expiration],
    });
    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },
  payErc721ForErc721: async (buyAttestation: `0x${string}`) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc721BarterUtils,
      abi: erc721BarterUtilsAbi.abi,
      functionName: "payErc721ForErc721",
      args: [buyAttestation],
    });
    const tx = await viemClient.waitForTransactionReceipt({ hash });
    return { hash };
  },
  buyErc20WithErc721: async (bid: Erc721, ask: Erc20, expiration: bigint) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc721BarterUtils,
      abi: erc721BarterUtilsAbi.abi,
      functionName: "buyErc20WithErc721",
      args: [bid.token, bid.tokenId, ask.token, ask.amount, expiration],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },
  buyErc1155WithErc721: async (
    bid: Erc721,
    ask: Erc1155,
    expiration: bigint,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc721BarterUtils,
      abi: erc721BarterUtilsAbi.abi,
      functionName: "buyErc1155WithErc721",
      args: [
        bid.token,
        bid.tokenId,
        ask.token,
        ask.tokenId,
        ask.amount,
        expiration,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },
  buyBundleWithErc721: async () => {},
});
