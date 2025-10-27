import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { exec as execCallback } from "node:child_process";
import { promisify } from "node:util";
import { encodeAbiParameters, hexToBytes, parseAbiParameters, parseEther, stringToHex } from "viem";
import { setupTestEnvironment, type TestContext, teardownTestEnvironment } from "../utils/setup";

const execAsync = promisify(execCallback);

let testContext: TestContext;

type ShellTestCase = {
  input: string;
  output: string;
};

type ShellOracleDemand = {
  description: string;
  test_cases: ShellTestCase[];
};

const stringObligationAbi = parseAbiParameters("(string item)");
const shellDemandAbi = parseAbiParameters("(bytes payload)");

beforeAll(async () => {
  testContext = await setupTestEnvironment();
});

beforeEach(async () => {
  if (testContext.anvilInitState) {
    await testContext.testClient.loadState({
      state: testContext.anvilInitState,
    });
  }
});

afterAll(async () => {
  await teardownTestEnvironment(testContext);
});

test("synchronous offchain oracle capitalization flow", async () => {
  const demandPayload: ShellOracleDemand = {
    description: "Capitalize stdin",
    test_cases: [
      { input: "alice", output: "ALICE" },
      { input: "bob builder", output: "BOB BUILDER" },
    ],
  };

  const demandBytes = encodeAbiParameters(shellDemandAbi, [{ payload: stringToHex(JSON.stringify(demandPayload)) }]);

  const demand = testContext.alice.client.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.charlie.address,
    data: demandBytes,
  });

  const { attested: escrow } = await testContext.alice.client.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: parseEther("100"),
    },
    {
      arbiter: testContext.addresses.trustedOracleArbiter,
      demand,
    },
    BigInt(Math.floor(Date.now() / 1000) + 3600),
  );

  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation(
    "tr '[:lower:]' '[:upper:]'",
    escrow.uid,
  );

  // Request arbitration
  await testContext.bob.client.oracle.requestArbitration(fulfillment.uid, testContext.charlie.address);

  const { decisions, unwatch } = await testContext.charlie.client.oracle.listenAndArbitrate(
    async (attestation) => {
      // Extract obligation data
      const obligation = testContext.charlie.client.extractObligationData(stringObligationAbi, attestation);

      const statement = obligation[0]?.item;
      if (!statement) return false;

      // Get escrow and extract demand data
      const [, demandData] = await testContext.charlie.client.getEscrowAndDemand(shellDemandAbi, attestation);

      const payloadHex = demandData[0]?.payload;
      if (!payloadHex) return false;

      const payloadJson = new TextDecoder().decode(hexToBytes(payloadHex));

      let payload: ShellOracleDemand;
      try {
        payload = JSON.parse(payloadJson) as ShellOracleDemand;
      } catch {
        return false;
      }

      for (const testCase of payload.test_cases) {
        const command = `echo "$INPUT" | ${statement}`;
        try {
          const { stdout } = await execAsync(command, {
            env: {
              ...process.env,
              INPUT: testCase.input,
            },
            shell: "/bin/bash",
          });

          if (stdout.trimEnd() !== testCase.output) {
            return false;
          }
        } catch {
          return false;
        }
      }

      return true;
    },
    { skipAlreadyArbitrated: true },
  );

  unwatch();

  decisions.forEach((decision) => {
    expect(decision?.decision).toBe(true);
  });

  const collectionHash = await testContext.bob.client.erc20.collectEscrow(escrow.uid, fulfillment.uid);

  expect(collectionHash).toBeTruthy();
});
