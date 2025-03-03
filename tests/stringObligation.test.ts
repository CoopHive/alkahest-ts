import { beforeAll, expect, test } from "bun:test";
import { makeClient } from "../src";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { createWalletClient, http } from "viem";
import { z } from "zod";
import * as arktype from "arktype";

let client: ReturnType<typeof makeClient>;

beforeAll(() => {
  // create client
  client = makeClient(
    createWalletClient({
      account: privateKeyToAccount(process.env.PRIVKEY_ALICE as `0x${string}`, {
        nonceManager, // automatic nonce management
      }),
      chain: baseSepolia,
      transport: http(process.env.RPC_URL as string),
    }),
  );
});

test("makeStringStatement", async () => {
  const stringValue = "Test string statement";
  const hash = await client.stringResult.makeStatement(stringValue);
  expect(hash).toBeString();

  const attestation = await client.getAttestedEventFromTxHash(hash);
  expect(attestation).toBeDefined();

  // The decoded value comes from the attestation uid
  const decodedValue = client.stringResult.decode(attestation.uid);
  expect(decodedValue.item).toBe(stringValue);
});

test("makeJsonStatement", async () => {
  const jsonObject = {
    name: "Test Object",
    value: 123,
    nested: {
      property: true,
    },
  };

  const hash = await client.stringResult.makeStatementJson(jsonObject);
  expect(hash).toBeString();

  const attestation = await client.getAttestedEventFromTxHash(hash);
  expect(attestation).toBeDefined();

  const decodedJson = client.stringResult.decodeJson<typeof jsonObject>(
    attestation.uid,
  );
  expect(decodedJson).toEqual(jsonObject);
  expect(decodedJson.name).toBe("Test Object");
  expect(decodedJson.value).toBe(123);
  expect(decodedJson.nested.property).toBe(true);
});

test("decodeWithZod", async () => {
  // Define Zod schema
  const TestSchema = z.object({
    id: z.number(),
    name: z.string(),
    active: z.boolean(),
  });

  const testData = {
    id: 42,
    name: "Zod test",
    active: true,
  };

  // Create statement with JSON data
  const hash = await client.stringResult.makeStatementJson(testData);
  const attestation = await client.getAttestedEventFromTxHash(hash);

  // Decode with Zod schema
  const decodedWithZod = client.stringResult.decodeZod(
    attestation.uid,
    TestSchema,
    undefined,
    { async: false, safe: false },
  );

  expect(decodedWithZod).toEqual(testData);
});

test("decodeWithArktype", async () => {
  // Define Arktype schema
  const TestType = arktype.type({
    id: "number",
    name: "string",
    active: "boolean",
  });

  const testData = {
    id: 99,
    name: "Arktype test",
    active: true,
  };

  // Create statement with JSON data
  const hash = await client.stringResult.makeStatementJson(testData);
  const attestation = await client.getAttestedEventFromTxHash(hash);

  // Decode with Arktype schema
  const decodedWithArktype = client.stringResult.decodeArkType(
    attestation.uid,
    TestType as unknown as arktype.Type<unknown, unknown>,
  );

  expect(decodedWithArktype).toEqual(testData);
});
