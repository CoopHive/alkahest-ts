import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import {
    setupTestEnvironment,
    teardownTestEnvironment,
    type TestContext,
} from "../utils/setup";
import { CommitAlgo, type CommitObligationData } from "../../src/clients/commitObligation";

let testContext: TestContext;

beforeAll(async () => {
    testContext = await setupTestEnvironment();
});

beforeEach(async () => {
    // Reset to initial state before each test
    if (testContext.anvilInitState) {
        await testContext.testClient.loadState({
            state: testContext.anvilInitState,
        });
    }
});

afterAll(async () => {
    // Clean up
    await teardownTestEnvironment(testContext);
});

test("trivialArbitratePastEscrowWithCommitObligation", async () => {
    const arbiter = testContext.addresses.trustedOracleArbiter;
    const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
        oracle: testContext.bob,
        data: encodeAbiParameters(parseAbiParameters("(string commitHash,uint8 commitAlgo,string[] hosts)"), [
            {
                commitHash: "required-commit-hash",
                commitAlgo: CommitAlgo.SHA256,
                hosts: ["required.domain.com"]
            },
        ]),
    });

    const { attested: escrow } =
        await testContext.aliceClient.erc20.permitAndBuyWithErc20(
            {
                address: testContext.mockAddresses.erc20A,
                value: 10n,
            },
            { arbiter, demand },
            0n,
        );

    const { attested: fulfillment } =
        await testContext.bobClient.commitObligation.doObligation(
            {
                commitHash: "required-commit-hash",
                commitAlgo: CommitAlgo.SHA256,
                hosts: ["required.domain.com"],
            },
            escrow.uid,
        );

    const decisions = await testContext.bobClient.oracle.arbitratePastForEscrow({
        escrow: {
            attester: testContext.addresses.erc20EscrowObligation,
            demandAbi: parseAbiParameters("(string commitHash,uint8 commitAlgo,string[] hosts)"),
        },
        fulfillment: {
            attester: testContext.addresses.commitObligation,
            obligationAbi: parseAbiParameters("(string commitHash,uint8 commitAlgo,string[] hosts)"),
        },
        arbitrate: async (obligation, demand) => {
            // Check if the obligation matches the demand exactly
            return obligation[0].commitHash === demand[0].commitHash &&
                obligation[0].commitAlgo === demand[0].commitAlgo &&
                obligation[0].hosts.includes(demand[0].hosts[0]);
        },
    });

    decisions.decisions.forEach(($) => expect($?.decision).toBe(true));

    // Wait for the arbitration decision to be confirmed before attempting collection
    const decision = decisions.decisions[0];
    if (decision && 'hash' in decision && decision.hash) {
        await testContext.testClient.waitForTransactionReceipt({
            hash: decision.hash,
        });
    }

    const collectionHash = await testContext.bobClient.erc20.collectEscrow(
        escrow.uid,
        fulfillment.uid,
    );

    expect(collectionHash).toBeTruthy();
});

test("listenAndArbitrateWithCommitObligation", async () => {
    const arbiter = testContext.addresses.trustedOracleArbiter;
    const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
        oracle: testContext.bob,
        data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [
            { mockDemand: "listen-test" },
        ]),
    });

    const { attested: escrow } =
        await testContext.aliceClient.erc20.permitAndBuyWithErc20(
            {
                address: testContext.mockAddresses.erc20A,
                value: 10n,
            },
            { arbiter, demand },
            0n,
        );

    let arbitrationProcessed = false;
    let processedCommitHash = "";

    const { unwatch } = await testContext.bobClient.oracle.listenAndArbitrate({
        fulfillment: {
            attester: testContext.addresses.commitObligation,
            obligationAbi: parseAbiParameters("(string commitHash,uint8 commitAlgo,string[] hosts)"),
        },
        arbitrate: async (obligation) => {
            arbitrationProcessed = true;
            processedCommitHash = obligation[0].commitHash;
            return obligation[0].commitHash.includes("listen-test");
        },
        onAfterArbitrate: async (decision) => {
            expect(decision?.obligation[0].commitHash).toEqual("listen-test-hash");
            expect(decision?.obligation[0].commitAlgo).toBe(CommitAlgo.SHA256);
            expect(decision?.decision).toBe(true);
        },
        pollingInterval: 50,
    });

    // Create fulfillment after starting to listen
    const { attested: fulfillment } =
        await testContext.bobClient.commitObligation.doObligation(
            {
                commitHash: "listen-test-hash",
                commitAlgo: CommitAlgo.SHA256,
                hosts: ["listen.test.com"],
            },
            escrow.uid,
        );

    await Bun.sleep(150);

    expect(arbitrationProcessed).toBe(true);
    expect(processedCommitHash).toBe("listen-test-hash");

    const collectionHash = await testContext.bobClient.erc20.collectEscrow(
        escrow.uid,
        fulfillment.uid,
    );

    expect(collectionHash).toBeTruthy();

    unwatch();
});

test("Git App Flow", async () => {
    const arbiter = testContext.addresses.trustedOracleArbiter;
    // 1. Alice create test suit and commit to the git repository
    //  Alice make an escrow deposit, released to anyone who writes a commit that makes the test suite pass

    const commitTestsData = testContext.aliceClient.arbiters.encodeCommitTestsDemand({
        oracle: testContext.bob,
        testsCommitHash: "test-sui-commit-hash",
        testsCommand: "npm test",
        testsCommitAlgo: 1, // CommitTestsCommitAlgo.Sha256
        hosts: ["required.host.com"]
    });
    const demand = testContext.aliceClient.arbiters.encodeTrustedOracleDemand({
        oracle: testContext.bob,
        data: commitTestsData,
    });

    const { attested: escrow } =
        await testContext.aliceClient.erc20.permitAndBuyWithErc20(
            {
                address: testContext.mockAddresses.erc20A,
                value: 10n,
            },
            { arbiter, demand },
            0n,
        );

    // 2. Bob fulfills the escrow by writing a commit that makes the test suite pass
    const { attested: fulfillment } =
        await testContext.bobClient.commitObligation.doObligation(
            {
                commitHash: "commit hash that makes the test suite pass",
                commitAlgo: CommitAlgo.SHA256,
                hosts: ["required.host.com", "additional.host.com"],
            },
            escrow.uid,
        );

    await Bun.sleep(150);


    // 2 .a Bob listens for the escrow and fulfills it by writing a commit that makes the test suite pass
    const { unwatch } = await testContext.bobClient.oracle.listenAndArbitrateForEscrow({
        escrow: {
            attester: testContext.addresses.erc20EscrowObligation,
            demandAbi: parseAbiParameters("(address oracle, string testsCommitHash, string testsCommand, uint8 testsCommitAlgo, string[] hosts)"),
        },
        fulfillment: {
            attester: testContext.addresses.commitObligation,
            obligationAbi: parseAbiParameters("(string commitHash,uint8 commitAlgo,string[] hosts)"),
        },
        arbitrate: async (obligation, demand) => {
            console.log("Arbitrating obligation:", obligation, "against demand:", demand);
            //After Bob writes a commit that makes the test suite pass,
            //Clone the repository, run the tests, and check if they pass
            return true;
        },
        onAfterArbitrate: async (decision) => {

        },
        pollingInterval: 50,
    });

    // 3. Bob collects the escrow
    const collectionHash = await testContext.bobClient.erc20.collectEscrow(
        escrow.uid,
        fulfillment.uid,
    );

    expect(collectionHash).toBeTruthy();

    unwatch();
});
