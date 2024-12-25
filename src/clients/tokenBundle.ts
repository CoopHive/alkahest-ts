import { getAttestationFromTxHash, type ViemClient } from "../utils";
import { contractAddresses } from "../config";

import { abi as tokenBundleBarterUtilsAbi } from "../contracts/TokenBundleBarterUtils";

export const makeTokenBundleClient = (viemClient: ViemClient) => ({
  buyBundleForBundle: async (
    bid: {
      erc20Tokens: readonly `0x${string}`[];
      erc20Amounts: readonly bigint[];
      erc721Tokens: readonly `0x${string}`[];
      erc721TokenIds: readonly bigint[];
      erc1155Tokens: readonly `0x${string}`[];
      erc1155TokenIds: readonly bigint[];
      erc1155Amounts: readonly bigint[];
    },
    ask: {
      erc20Tokens: readonly `0x${string}`[];
      erc20Amounts: readonly bigint[];
      erc721Tokens: readonly `0x${string}`[];
      erc721TokenIds: readonly bigint[];
      erc1155Tokens: readonly `0x${string}`[];
      erc1155TokenIds: readonly bigint[];
      erc1155Amounts: readonly bigint[];
    },
    permits: Array<{
      deadline: bigint;
      v: number;
      r: `0x${string}`;
      s: `0x${string}`;
    }>,
    expiration: bigint = 0n,
  ) => {
    const bidData = {
      ...bid,
      arbiter: contractAddresses[viemClient.chain.name]
        .tokenBundleBarterUtils as `0x${string}`,
      demand: "0x" as `0x${string}`, // This will be encoded by the contract
    };

    const askData = {
      ...ask,
      payee: viemClient.account.address as `0x${string}`,
    };

    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].tokenBundleBarterUtils,
      abi: tokenBundleBarterUtilsAbi.abi,
      functionName: "permitAndEscrowBundleForBundle",
      args: [
        bidData,
        askData,
        expiration,
        permits.map((p) => ({
          v: p.v,
          r: p.r,
          s: p.s,
          deadline: p.deadline,
        })),
      ],
    });
    const attested = await getAttestationFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  payBundleForBundle: async (
    buyAttestation: `0x${string}`,
    permits: Array<{
      deadline: bigint;
      v: number;
      r: `0x${string}`;
      s: `0x${string}`;
    }>,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].tokenBundleBarterUtils,
      abi: tokenBundleBarterUtilsAbi.abi,
      functionName: "permitAndPayBundleForBundle",
      args: [
        buyAttestation,
        permits.map((p) => ({
          v: p.v,
          r: p.r,
          s: p.s,
          deadline: p.deadline,
        })),
      ],
    });
    const tx = await viemClient.waitForTransactionReceipt({ hash });
    return { hash };
  },
});
