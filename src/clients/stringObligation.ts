import { decodeAbiParameters, parseAbiParameters } from "viem";
import type { ViemClient } from "../utils";
import { getAttestation, getAttestedEventFromTxHash } from "../utils";

import { abi as stringObligationAbi } from "../contracts/StringObligation";
import type { ChainAddresses } from "../types";
import type { z, ZodTypeDef, SafeParseReturnType } from "zod";
import type { Type } from "arktype";

// Type helper for Zod parse functions return types
type ZodParseReturnType<
  TSchema extends z.ZodSchema,
  TAsync extends boolean | undefined,
  TSafe extends boolean | undefined,
> = TSafe extends true
  ? TAsync extends true
    ? Promise<SafeParseReturnType<z.infer<TSchema>, z.infer<TSchema>>>
    : SafeParseReturnType<z.infer<TSchema>, z.infer<TSchema>>
  : TAsync extends true
    ? Promise<z.infer<TSchema>>
    : z.infer<TSchema>;

export const makeStringObligationClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  const decode = (statementData: `0x${string}`) => {
    return decodeAbiParameters(
      parseAbiParameters("(string item)"),
      statementData,
    )[0];
  };

  const makeStatement = async (item: string, refUid?: `0x${string}`) => {
    const hash = await viemClient.writeContract({
      address: addresses.stringObligation,
      abi: stringObligationAbi.abi,
      functionName: "makeStatement",
      args: [
        { item },
        refUid ??
          "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32 0
      ],
    });

    const attested = await getAttestedEventFromTxHash(viemClient, hash);
    return { hash, attested };
  };

  const getZodParseFunc = (opts: { async: boolean; safe: boolean }) => {
    let command = opts.safe ? "safeParse" : "parse";
    if (opts.async) {
      command += "Async";
    }
    return command as "parse" | "parseAsync" | "safeParse" | "safeParseAsync";
  };

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.stringObligation,
      abi: stringObligationAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
    });

  return {
    decode,
    decodeJson: <T>(statementData: `0x${string}`) => {
      const decoded = decode(statementData);
      return JSON.parse(decoded.item) as T;
    },
    decodeZod: <
      TSchema extends z.ZodSchema,
      TAsync extends boolean = false,
      TSafe extends boolean = false,
    >(
      statementData: `0x${string}`,
      schema: TSchema,
      schemaOptions?: Partial<z.ParseParams>,
      parseOptions: {
        async: TAsync;
        safe: TSafe;
      } = { async: false, safe: false } as any,
    ): ZodParseReturnType<TSchema, TAsync, TSafe> => {
      const parseFunc = getZodParseFunc(parseOptions);
      const decoded = decode(statementData);

      // Type assertion needed because TypeScript can't infer the connection between parseFunc and return type
      return schema[parseFunc](
        JSON.parse(decoded.item),
        schemaOptions,
      ) as ZodParseReturnType<TSchema, TAsync, TSafe>;
    },
    decodeArkType: <Schema extends Type<any, any>>(
      statementData: `0x${string}`,
      schema: Schema,
    ): Schema["inferOut"] => {
      const decoded = decode(statementData);
      return schema(JSON.parse(decoded.item)) as Schema["inferOut"];
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
        getAttestation(viemClient, uid, addresses),
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
        getAttestation(viemClient, uid, addresses),
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
