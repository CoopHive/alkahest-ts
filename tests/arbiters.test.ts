import { beforeAll, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { createWalletClient, http } from "viem";

let clientOracle: ReturnType<typeof makeClient>;
let clientUser: ReturnType<typeof makeClient>;

beforeAll(() => {
  // create clients
  clientOracle = makeClient(
    createWalletClient({
      account: privateKeyToAccount(process.env.PRIVKEY_ALICE as `0x${string}`, {
        nonceManager, // automatic nonce management
      }),
      chain: baseSepolia,
      transport: http(process.env.RPC_URL as string),
    }),
  );
  clientUser = makeClient(
    createWalletClient({
      account: privateKeyToAccount(process.env.PRIVKEY_BOB as `0x${string}`, {
        nonceManager, // automatic nonce management
      }),
      chain: baseSepolia,
      transport: http(process.env.RPC_URL as string),
    }),
  );
});

test("encodeTrustedPartyDemand", () => {
  const demand = {
    creator: clientUser.address,
    baseArbiter: contractAddresses["Base Sepolia"].trivialArbiter,
    baseDemand: "0x1234" as `0x${string}`,
  };

  // Encode demand data
  const encodedDemand = clientOracle.arbiters.encodeTrustedPartyDemand(demand);
  expect(encodedDemand).toBeString();
  expect(encodedDemand.startsWith("0x")).toBe(true);

  // Decode to verify
  const decodedDemand =
    clientOracle.arbiters.decodeTrustedPartyDemand(encodedDemand);
  expect(decodedDemand.creator).toBe(demand.creator);
  expect(decodedDemand.baseArbiter).toBe(demand.baseArbiter);
  expect(decodedDemand.baseDemand).toBe(demand.baseDemand);
});

test("encodeSpecificAttestationDemand", () => {
  const uid =
    "0x1111222233334444555566667777888899990000aaaabbbbccccddddeeeeffff";
  const demand = {
    uid: uid as `0x${string}`,
  };

  // Encode demand data
  const encodedDemand =
    clientOracle.arbiters.encodeSpecificAttestationDemand(demand);
  expect(encodedDemand).toBeString();
  expect(encodedDemand.startsWith("0x")).toBe(true);

  // Decode to verify
  const decodedDemand =
    clientOracle.arbiters.decodeSpecificAttestationDemand(encodedDemand);
  expect(decodedDemand.uid).toBe(demand.uid);
});

test("encodeTrustedOracleDemand", () => {
  const demand = {
    oracle: clientOracle.address,
  };

  // Encode demand data
  const encodedDemand = clientOracle.arbiters.encodeTrustedOracleDemand(demand);
  expect(encodedDemand).toBeString();
  expect(encodedDemand.startsWith("0x")).toBe(true);

  // Decode to verify
  const decodedDemand =
    clientOracle.arbiters.decodeTrustedOracleDemand(encodedDemand);
  expect(decodedDemand.oracle).toBe(demand.oracle);
});

test("oracleArbitration", async () => {
  // Create a test demand that requires oracle arbitration
  const demand = clientUser.arbiters.encodeTrustedOracleDemand({
    oracle: clientOracle.address,
  });

  // Create a string statement to be arbitrated
  const statementHash = await clientUser.stringResult.makeStatement(
    "Statement to arbitrate",
  );
  const statement = await clientUser.getAttestedEventFromTxHash(statementHash);

  // Oracle arbitrates the statement (approves it)
  const arbitrationHash = await clientOracle.arbiters.arbitrateAsTrustedOracle(
    statement.uid,
    true, // Decision: approve
  );
  expect(arbitrationHash).toBeString();

  // Wait for arbitration result
  const arbitrationResult =
    await clientUser.arbiters.waitForTrustedOracleArbitration(
      clientOracle.address,
      statement.uid,
    );

  expect(arbitrationResult).toBeDefined();
  expect(arbitrationResult.oracle).toBe(clientOracle.address);
  expect(arbitrationResult.statement).toBe(statement.uid);
  expect(arbitrationResult.decision).toBe(true);
});
