import { decodeAbiParameters, parseAbiParameters } from "viem";
import type { ViemClient } from "../utils";

import { abi as stringObligationAbi } from "../contracts/StringObligation";
import { contractAddresses } from "../config";
import type { z } from "zod";
import type { Type } from "arktype";

export const makeStringObligationClient = (viemClient: ViemClient) => {
  const decode = (statementData: `0x${string}`) => {
    return decodeAbiParameters(
      parseAbiParameters("(string item)"),
      statementData,
    )[0];
  };

  const makeStatement = async (item: string, refUid?: `0x${string}`) =>
    await viemClient.writeContract({
      address: contractAddresses["Base Sepolia"].stringObligation,
      abi: stringObligationAbi.abi,
      functionName: "makeStatement",
      args: [
        { item },
        refUid ??
          "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32 0
      ],
    });

  const getZodParseFunc = (opts: { async: boolean; safe: boolean }) => {
    let command = opts.safe ? "safeParse" : "parse";
    if (opts.async) {
      command += "Async";
    }
    return command as "parse" | "parseAsync" | "safeParse" | "safeParseAsync";
  };

  return {
    decode,
    decodeJson: <T>(statementData: `0x${string}`) => {
      const decoded = decode(statementData);
      return JSON.parse(decoded.item) as T;
    },
    decodeZod: (
      statementData: `0x${string}`,
      schema: z.ZodSchema<any, any, any>,
      schemaOptions?: Partial<z.ParseParams>,
      parseOptions: {
        async: boolean;
        safe: boolean;
      } = { async: false, safe: false },
    ): z.infer<typeof schema> => {
      return schema[getZodParseFunc(parseOptions)](
        decode(statementData),
        schemaOptions,
      );
    },
    decodeArkType: <Schema extends Type<any, any>>(
      statementData: `0x${string}`,
      schema: Schema,
    ): Schema["inferOut"] => {
      return schema(decode(statementData));
    },
    makeStatement,
    makeStatementJson: async <T>(item: T, refUid?: `0x${string}`) => {
      return await makeStatement(JSON.stringify(item), refUid);
    },
  };
};
