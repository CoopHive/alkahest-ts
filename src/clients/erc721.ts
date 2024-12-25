import { getAttestationFromTxHash, type ViemClient } from "../utils";
import { contractAddresses } from "../config";

import { abi as erc721BarterUtilsAbi } from "../contracts/ERC721BarterUtils";

export const makeErc721Client = (viemClient: ViemClient) => ({
  buyErc721ForErc721: async (
    bid: { token: `0x${string}`; tokenId: bigint },
    ask: { token: `0x${string}`; tokenId: bigint },
    expiration: bigint = 0n,
  ) => {
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
});
