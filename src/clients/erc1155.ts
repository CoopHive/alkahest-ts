import { getAttestationFromTxHash, type ViemClient } from "../utils";

import { abi as erc1155BarterUtilsAbi } from "../contracts/ERC1155BarterUtils";
import { contractAddresses } from "../config";

export const makeErc1155Client = (viemClient: ViemClient) => ({
  buyErc1155ForErc1155: async (
    bid: { token: `0x${string}`; tokenId: bigint; amount: bigint },
    ask: { token: `0x${string}`; tokenId: bigint; amount: bigint },
    expiration: bigint = 0n,
  ) => {
    const hash = await viemClient.writeContract({
      address: contractAddresses[viemClient.chain.name].erc1155BarterUtils,
      abi: erc1155BarterUtilsAbi.abi,
      functionName: "buyErc1155ForErc1155",
      args: [
        bid.token,
        bid.tokenId,
        bid.amount,
        ask.token,
        ask.tokenId,
        ask.amount,
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
});
