import { getAttestationFromTxHash, type ViemClient } from "../utils";
import { contractAddresses } from "../config";
import type { TokenBundle } from "../types";

import { abi as erc20BarterUtilsAbi } from "../contracts/ERC20BarterCrossToken";
import { abi as erc20EscrowAbi } from "../contracts/ERC20EscrowObligation";
import { abi as erc20PaymentAbi } from "../contracts/ERC20PaymentObligation";
import { abi as erc20Abi } from "../contracts/IERC20";

export const makeErc20Client = (viemClient: ViemClient) => ({
  // Approval functions
  approve: async (
    token: `0x${string}`,
    spender: `0x${string}`,
    amount: bigint,
  ) => {
    const hash = await viemClient.writeContract({
      address: token,
      abi: erc20Abi.abi,
      functionName: "approve",
      args: [spender, amount],
    });
    return hash;
  },

  approveIfLess: async (
    token: `0x${string}`,
    spender: `0x${string}`,
    amount: bigint,
  ) => {
    const currentAllowance = await viemClient.readContract({
      address: token,
      abi: erc20Abi.abi,
      functionName: "allowance",
      args: [viemClient.account.address, spender],
    });

    if (currentAllowance < amount) {
      return viemClient.writeContract({
        address: token,
        abi: erc20Abi.abi,
        functionName: "approve",
        args: [spender, amount],
      });
    }
    return null;
  },

  // Direct escrow interactions
  buyWithErc20: async (
    token: `0x${string}`,
    amount: bigint,
    arbiter: `0x${string}`,
    demand: `0x${string}`,
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20EscrowObligation,
      abi: erc20EscrowAbi.abi,
      functionName: "makeStatement",
      args: [
        {
          token,
          amount,
          arbiter,
          demand,
        },
        expiration,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  payWithErc20: async (
    token: `0x${string}`,
    amount: bigint,
    payee: `0x${string}`,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20PaymentObligation,
      abi: erc20PaymentAbi.abi,
      functionName: "makeStatement",
      args: [
        {
          token,
          amount,
          payee,
        },
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  // Buy ERC20 for ERC20
  buyErc20ForErc20: async (
    bid: { token: `0x${string}`; amount: bigint },
    ask: { token: `0x${string}`; amount: bigint },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "buyErc20ForErc20",
      args: [bid.token, bid.amount, ask.token, ask.amount, expiration],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  buyErc20ForErc20WithPermit: async (
    bid: { token: `0x${string}`; amount: bigint },
    ask: { token: `0x${string}`; amount: bigint },
    permit: {
      deadline: bigint;
      v: number;
      r: `0x${string}`;
      s: `0x${string}`;
    },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "permitAndBuyErc20ForErc20",
      args: [
        bid.token,
        bid.amount,
        ask.token,
        ask.amount,
        expiration,
        permit.v,
        permit.r,
        permit.s,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  // Buy ERC721 with ERC20
  buyErc721WithErc20: async (
    bid: { token: `0x${string}`; amount: bigint },
    nft: { token: `0x${string}`; tokenId: bigint },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "buyErc721WithErc20",
      args: [bid.token, bid.amount, nft.token, nft.tokenId, expiration],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  buyErc721WithErc20WithPermit: async (
    bid: { token: `0x${string}`; amount: bigint },
    nft: { token: `0x${string}`; tokenId: bigint },
    permit: {
      deadline: bigint;
      v: number;
      r: `0x${string}`;
      s: `0x${string}`;
    },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "permitAndBuyErc721WithErc20",
      args: [
        bid.token,
        bid.amount,
        nft.token,
        nft.tokenId,
        expiration,
        permit.v,
        permit.r,
        permit.s,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  // Buy ERC1155 with ERC20
  buyErc1155WithErc20: async (
    bid: { token: `0x${string}`; amount: bigint },
    nft: { token: `0x${string}`; tokenId: bigint; amount: bigint },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "buyErc1155WithErc20",
      args: [
        bid.token,
        bid.amount,
        nft.token,
        nft.tokenId,
        nft.amount,
        expiration,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  buyErc1155WithErc20WithPermit: async (
    bid: { token: `0x${string}`; amount: bigint },
    nft: { token: `0x${string}`; tokenId: bigint; amount: bigint },
    permit: {
      deadline: bigint;
      v: number;
      r: `0x${string}`;
      s: `0x${string}`;
    },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "permitAndBuyErc1155WithErc20",
      args: [
        bid.token,
        bid.amount,
        nft.token,
        nft.tokenId,
        nft.amount,
        expiration,
        permit.v,
        permit.r,
        permit.s,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  // Buy Token Bundle with ERC20
  buyBundleWithErc20: async (
    bid: { token: `0x${string}`; amount: bigint },
    bundle: TokenBundle,
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "buyBundleWithErc20",
      args: [bid.token, bid.amount, bundle, expiration],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  buyBundleWithErc20WithPermit: async (
    bid: { token: `0x${string}`; amount: bigint },
    bundle: TokenBundle,
    permit: {
      deadline: bigint;
      v: number;
      r: `0x${string}`;
      s: `0x${string}`;
    },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "permitAndBuyBundleWithErc20",
      args: [
        bid.token,
        bid.amount,
        bundle,
        expiration,
        permit.v,
        permit.r,
        permit.s,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },
  // Pay ERC20 for ERC20
  payErc20ForErc20: async (buyAttestation: `0x${string}`) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "payErc20ForErc20",
      args: [buyAttestation],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  payErc20ForErc20WithPermit: async (
    buyAttestation: `0x${string}`,
    permit: {
      v: number;
      r: `0x${string}`;
      s: `0x${string}`;
    },
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "permitAndPayErc20ForErc20",
      args: [buyAttestation, permit.v, permit.r, permit.s],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  // Generic buy with ERC20
  buyWithErc20WithPermit: async (
    bid: { token: `0x${string}`; amount: bigint },
    arbiter: `0x${string}`,
    demand: `0x${string}`,
    permit: {
      deadline: bigint;
      v: number;
      r: `0x${string}`;
      s: `0x${string}`;
    },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "permitAndBuyWithErc20",
      args: [
        bid.token,
        bid.amount,
        arbiter,
        demand,
        expiration,
        permit.v,
        permit.r,
        permit.s,
      ],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  // Generic pay with ERC20
  payWithErc20WithPermit: async (
    token: `0x${string}`,
    amount: bigint,
    payee: `0x${string}`,
    permit: {
      v: number;
      r: `0x${string}`;
      s: `0x${string}`;
    },
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
      abi: erc20BarterUtilsAbi.abi,
      functionName: "permitAndPayWithErc20",
      args: [token, amount, payee, permit.v, permit.r, permit.s],
    });

    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },
});
