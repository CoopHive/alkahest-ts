import { decodeAbiParameters, parseAbiParameters } from "viem";
import type { ViemClient } from "../utils";

import { abi as stringObligationAbi } from "../contracts/StringObligation";
import { contractAddresses } from "../config";

export const makeStringObligationClient = (viemClient: ViemClient) => {
  const decode = (statementData: `0x${string}`) => {
    return decodeAbiParameters(
      parseAbiParameters("(string item)"),
      statementData,
    )[0];
  };

  return {
    decode,
    decodeJson: <T>(statementData: `0x${string}`) => {
      const decoded = decode(statementData);
      return JSON.parse(decoded.item) as T;
    },
    makeStatement: async (item: string, refUid: `0x${string}` | undefined) => {
      return await viemClient.writeContract({
        address: contractAddresses["Base Sepolia"].stringObligation,
        abi: stringObligationAbi.abi,
        functionName: "makeStatement",
        args: [
          { item },
          refUid ??
            "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32 0
        ],
      });
    },
  };
};
