/**
 * Arbiters Unit Tests
 *
 * This file contains tests for the arbiter client functionality, including:
 * - TrivialArbiter
 * - TrustedPartyArbiter
 * - TrustedOracleArbiter
 * - SpecificAttestationArbiter
 *
 * These tests mirror the solidity tests in test/unit/arbiters
 */

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";
import { makeClient } from "../../src";
import { createAnvil } from "@viem/anvil";
import {
  createWalletClient,
  http,
  createTestClient,
  publicActions,
  walletActions,
  parseEther,
  getAddress,
  nonceManager,
  parseEventLogs,
  decodeAbiParameters,
  parseAbiParameters,
  encodeAbiParameters,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";
import { $ } from "bun";

// Import contract artifacts
import TrivialArbiter from "../../src/contracts/TrivialArbiter.json";
import TrustedPartyArbiter from "../../src/contracts/TrustedPartyArbiter.json";
import TrustedOracleArbiter from "../../src/contracts/TrustedOracleArbiter.json";
import SpecificAttestationArbiter from "../../src/contracts/SpecificAttestationArbiter.json";

describe("Arbiters Tests", () => {
  // Anvil instance
  const anvil = createAnvil();
  let anvilInitState: `0x${string}`;

  const chain = foundry;
  const transport = http("http://127.0.0.1:8545", { timeout: 60_000 });

  // Client instances
  let aliceClient: ReturnType<typeof makeClient>;
  let bobClient: ReturnType<typeof makeClient>;
  let oracleClient: ReturnType<typeof makeClient>;
  const testClient = createTestClient({
    mode: "anvil",
    account: privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    }),
    chain,
    transport,
  })
    .extend(walletActions)
    .extend(publicActions);

  // Addresses
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let oracle: `0x${string}`;

  // Contract addresses - will be populated when contracts are deployed
  const localAddresses = {
    trivialArbiter: "" as `0x${string}`,
    trustedPartyArbiter: "" as `0x${string}`,
    trustedOracleArbiter: "" as `0x${string}`,
    specificAttestationArbiter: "" as `0x${string}`,
  };

  beforeAll(async () => {
    // Start anvil
    await anvil.start();

    // Setup accounts
    const aliceAccount = privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    });
    const bobAccount = privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    });
    const oracleAccount = privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    });

    alice = aliceAccount.address;
    bob = bobAccount.address;
    oracle = oracleAccount.address;

    // Create wallet clients
    const aliceWalletClient = createWalletClient({
      account: aliceAccount,
      chain,
      transport,
    }).extend(publicActions);

    const bobWalletClient = createWalletClient({
      account: bobAccount,
      chain,
      transport,
    }).extend(publicActions);

    const oracleWalletClient = createWalletClient({
      account: oracleAccount,
      chain,
      transport,
    }).extend(publicActions);

    // Fund accounts with ETH
    await testClient.setBalance({
      address: testClient.account.address,
      value: parseEther("10"),
    });
    await testClient.setBalance({
      address: alice,
      value: parseEther("10"),
    });
    await testClient.setBalance({
      address: bob,
      value: parseEther("10"),
    });
    await testClient.setBalance({
      address: oracle,
      value: parseEther("10"),
    });

    // Deploy the arbiters
    const trivialArbiterHash = await testClient.deployContract({
      abi: TrivialArbiter.abi,
      bytecode: TrivialArbiter.bytecode.object as `0x${string}`,
      args: [],
    });
    const trivialArbiterReceipt = await testClient.waitForTransactionReceipt({
      hash: trivialArbiterHash,
    });

    localAddresses.trivialArbiter =
      trivialArbiterReceipt.contractAddress as `0x${string}`;

    const trustedPartyArbiterHash = await testClient.deployContract({
      abi: TrustedPartyArbiter.abi,
      bytecode: TrustedPartyArbiter.bytecode.object as `0x${string}`,
      args: [],
    });

    const trustedPartyArbiterReceipt =
      await testClient.waitForTransactionReceipt({
        hash: trustedPartyArbiterHash,
      });

    localAddresses.trustedPartyArbiter =
      trustedPartyArbiterReceipt.contractAddress as `0x${string}`;

    const trustedOracleArbiterHash = await testClient.deployContract({
      abi: TrustedOracleArbiter.abi,
      bytecode: TrustedOracleArbiter.bytecode.object as `0x${string}`,
      args: [],
    });

    const trustedOracleArbiterReceipt =
      await testClient.waitForTransactionReceipt({
        hash: trustedOracleArbiterHash,
      });

    localAddresses.trustedOracleArbiter =
      trustedOracleArbiterReceipt.contractAddress as `0x${string}`;

    const specificAttestationArbiterHash = await testClient.deployContract({
      abi: SpecificAttestationArbiter.abi,
      bytecode: SpecificAttestationArbiter.bytecode.object as `0x${string}`,
      args: [],
    });

    const specificAttestationArbiterReceipt =
      await testClient.waitForTransactionReceipt({
        hash: specificAttestationArbiterHash,
      });

    localAddresses.specificAttestationArbiter =
      specificAttestationArbiterReceipt.contractAddress as `0x${string}`;

    // Create clients with local contract addresses
    aliceClient = makeClient(aliceWalletClient, {
      ...localAddresses,
    });
    bobClient = makeClient(bobWalletClient, {
      ...localAddresses,
    });
    oracleClient = makeClient(oracleWalletClient, {
      ...localAddresses,
    });

    anvilInitState = await testClient.dumpState();
  });

  beforeEach(async () => {
    await testClient.loadState({ state: anvilInitState });
  });

  afterAll(async () => {
    await $`pkill anvil`;
  });

  describe("TrivialArbiter", () => {
    // Mirrors test/unit/arbiters/TrivialArbiter.t.sol
    test("testCheckStatementAlwaysReturnsTrue", async () => {
      // Create a test attestation (values don't matter for TrivialArbiter)
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Empty demand data
      const demand = "0x" as `0x${string}`;
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check that the arbiter returns true
      const result = await testClient.readContract({
        address: localAddresses.trivialArbiter,
        abi: TrivialArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      // Should always return true
      expect(result).toBe(true);

      // Try with different values, should still return true
      const attestation2 = {
        ...attestation,
        uid: "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`,
      };

      const demand2 = "0x736f6d652064617461" as `0x${string}`; // "some data" in hex
      const counteroffer2 =
        "0x000000000000000000000000000000000000000000000000000000000000002a" as `0x${string}`; // 42 in hex

      const result2 = await testClient.readContract({
        address: localAddresses.trivialArbiter,
        abi: TrivialArbiter.abi,
        functionName: "checkStatement",
        args: [attestation2, demand2, counteroffer2],
      });

      // Should always return true
      expect(result2).toBe(true);
    });
  });

  describe("TrustedPartyArbiter", () => {
    // Mirrors test/unit/arbiters/TrustedPartyArbiter.t.sol

    // Create mock addresses for testing
    const creator =
      "0x0000000000000000000000000000000000000123" as `0x${string}`;
    const nonCreator =
      "0x0000000000000000000000000000000000000456" as `0x${string}`;

    test("testCheckStatementWithCorrectCreator", async () => {
      // Create a test attestation with the correct recipient (creator)
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient: creator,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data with the correct creator and TrivialArbiter as base arbiter (will return true)
      const demandData = {
        baseArbiter: localAddresses.trivialArbiter,
        baseDemand: "0x" as `0x${string}`,
        creator: creator,
      };

      // Encode the demand data
      // Note: We're using encodeAbiParameters directly as the arbiters client's encodeTrustedPartyDemand
      // now has the correct field order (baseArbiter, baseDemand, creator)
      const demand = encodeAbiParameters(
        parseAbiParameters(
          "(address baseArbiter, bytes baseDemand, address creator)",
        ),
        [demandData],
      );

      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement should return true
      const result = await testClient.readContract({
        address: localAddresses.trustedPartyArbiter,
        abi: TrustedPartyArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckStatementWithIncorrectCreator", async () => {
      // Create a test attestation with an incorrect recipient (not the creator)
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient: nonCreator, // Different from creator
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data with the correct creator
      const demandData = {
        baseArbiter: localAddresses.trivialArbiter,
        baseDemand: "0x" as `0x${string}`,
        creator: creator,
      };

      // Encode the demand data
      const demand = encodeAbiParameters(
        parseAbiParameters(
          "(address baseArbiter, bytes baseDemand, address creator)",
        ),
        [demandData],
      );

      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement should revert with NotTrustedParty
      try {
        await testClient.readContract({
          address: localAddresses.trustedPartyArbiter,
          abi: TrustedPartyArbiter.abi,
          functionName: "checkStatement",
          args: [attestation, demand, counteroffer],
        });
        // If we didn't get an error, the test should fail
        expect(false).toBe(true);
      } catch (error) {
        // The error should contain "NotTrustedParty"
        expect((error as any).toString()).toContain("NotTrustedParty");
      }
    });
  });

  describe("TrustedOracleArbiter", () => {
    // Mirrors test/unit/arbiters/TrustedOracleArbiter.t.sol
    const statementUid =
      "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`;

    test("testConstructor", async () => {
      // Create an attestation with the statement UID
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data
      const demandData = {
        oracle: oracle,
      };

      // Encode demand data
      const demand =
        oracleClient.arbiters.encodeTrustedOracleDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement - should be false initially since no decision has been made
      const result = await testClient.readContract({
        address: localAddresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      // Should be false initially
      expect(result).toBe(false);
    });

    test("testArbitrate", async () => {
      // Create an attestation with the statement UID
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data
      const demandData = {
        oracle: oracle,
      };

      // Encode demand data
      const demand =
        oracleClient.arbiters.encodeTrustedOracleDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Initially the decision should be false (default value)
      const initialResult = await testClient.readContract({
        address: localAddresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(initialResult).toBe(false);

      // Make a positive arbitration decision
      const arbitrateHash =
        await oracleClient.arbiters.arbitrateAsTrustedOracle(
          statementUid,
          true,
        );

      // Wait for transaction receipt
      await testClient.waitForTransactionReceipt({
        hash: arbitrateHash,
      });

      // Now the decision should be true
      const finalResult = await testClient.readContract({
        address: localAddresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(finalResult).toBe(true);
    });

    test("testCheckStatementWithDifferentOracles", async () => {
      // Set up two different oracles with different decisions
      const oracle1 = oracle;
      const oracle2 = bob;

      // Oracle 1 makes a positive decision
      const arbitrateHash1 =
        await oracleClient.arbiters.arbitrateAsTrustedOracle(
          statementUid,
          true,
        );

      // Wait for transaction receipt
      await testClient.waitForTransactionReceipt({
        hash: arbitrateHash1,
      });

      // Oracle 2 makes a negative decision
      const arbitrateHash2 = await bobClient.arbiters.arbitrateAsTrustedOracle(
        statementUid,
        false,
      );

      // Wait for transaction receipt
      await testClient.waitForTransactionReceipt({
        hash: arbitrateHash2,
      });

      // Create the attestation
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Check with oracle1 - should be true
      const demandData1 = {
        oracle: oracle1,
      };
      const demand1 =
        oracleClient.arbiters.encodeTrustedOracleDemand(demandData1);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      const result1 = await testClient.readContract({
        address: localAddresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand1, counteroffer],
      });

      expect(result1).toBe(true);

      // Check with oracle2 - should be false
      const demandData2 = {
        oracle: oracle2,
      };
      const demand2 = bobClient.arbiters.encodeTrustedOracleDemand(demandData2);

      const result2 = await testClient.readContract({
        address: localAddresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand2, counteroffer],
      });

      expect(result2).toBe(false);
    });

    test("testCheckStatementWithNoDecision", async () => {
      // Test with an oracle that hasn't made a decision
      const newOracle = alice;

      // Create the attestation
      const attestation = {
        uid: statementUid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data
      const demandData = {
        oracle: newOracle,
      };

      // Encode demand data
      const demand = aliceClient.arbiters.encodeTrustedOracleDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check with the new oracle - should be false (default value)
      const result = await testClient.readContract({
        address: localAddresses.trustedOracleArbiter,
        abi: TrustedOracleArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(false);
    });
  });

  describe("SpecificAttestationArbiter", () => {
    // Mirrors test/unit/arbiters/SpecificAttestationArbiter.t.sol
    test("testCheckStatementWithCorrectUID", async () => {
      // Create a test attestation
      const uid =
        "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`;
      const attestation = {
        uid: uid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data with matching UID
      const demandData = {
        uid: uid,
      };

      // Encode demand data
      const demand =
        aliceClient.arbiters.encodeSpecificAttestationDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement - should return true
      const result = await testClient.readContract({
        address: localAddresses.specificAttestationArbiter,
        abi: SpecificAttestationArbiter.abi,
        functionName: "checkStatement",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckStatementWithIncorrectUID", async () => {
      // Create a test attestation
      const uid =
        "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`;
      const attestation = {
        uid: uid,
        schema:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient:
          "0x0000000000000000000000000000000000000000" as `0x${string}`,
        attester: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        revocable: true,
        data: "0x" as `0x${string}`,
      };

      // Create demand data with non-matching UID
      const demandData = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000002" as `0x${string}`,
      };

      // Encode demand data
      const demand =
        aliceClient.arbiters.encodeSpecificAttestationDemand(demandData);
      const counteroffer =
        "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Check statement should revert with NotDemandedAttestation
      try {
        await testClient.readContract({
          address: localAddresses.specificAttestationArbiter,
          abi: SpecificAttestationArbiter.abi,
          functionName: "checkStatement",
          args: [attestation, demand, counteroffer],
        });
        // If we didn't get an error, the test should fail
        expect(false).toBe(true);
      } catch (error) {
        // The error should contain "NotDemandedAttestation"
        expect((error as any).toString()).toContain("NotDemandedAttestation");
      }
    });
  });
});
