import { decodeAbiParameters, parseAbiParameters } from "viem";
import type { ViemClient } from "../utils";
import { getAttestation } from "../utils";

import { abi as stringObligationAbi } from "../contracts/StringObligation";
import { contractAddresses } from "../config";
import type { z, ZodTypeDef } from "zod";
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

  const getSchema = async () =>
    await viemClient.readContract({
      address: contractAddresses["Base Sepolia"].stringObligation,
      abi: stringObligationAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
    });

  return {
    decode,
    decodeJson: <T>(statementData: `0x${string}`) => {
      const decoded = decode(statementData);
      return JSON.parse(decoded.item) as T;
    },
    decodeZod: (
      statementData: `0x${string}`,
      schema: z.ZodSchema<unknown, ZodTypeDef, unknown>,
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
    decodeArkType: <Schema extends Type<unknown, unknown>>(
      statementData: `0x${string}`,
      schema: Schema,
    ): Schema["inferOut"] => {
      return schema(decode(statementData));
    },
    makeStatement,
    makeStatementJson: async <T>(item: T, refUid?: `0x${string}`) => {
      return await makeStatement(JSON.stringify(item), refUid);
    },
    getSchema,
    /**
     * Gets a complete obligation from its attestation UID, combining attestation metadata with decoded statement data
     * @param uid - UID of the attestation
     * @returns The complete obligation including attestation metadata and decoded statement data
     */
    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([
        getAttestation(viemClient, uid),
        getSchema(),
      ]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters(
        parseAbiParameters("(string item)"),
        attestation.data,
      )[0];

      return {
        ...attestation,
        data,
      };
    },
    getJsonObligation: async <T>(uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([
        getAttestation(viemClient, uid),
        getSchema(),
      ]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters(
        parseAbiParameters("(string item)"),
        attestation.data,
      )[0];

      return {
        ...attestation,
        data: {
          item: JSON.parse(data.item) as T,
        },
      };
    },
  };
};
