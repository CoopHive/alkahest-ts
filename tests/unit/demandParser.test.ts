import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import {
  createDefaultDemandParserConfig,
  addArbiterDecoder,
  parseDemandRecursive,
  parseDemandFromEscrow,
  flattenDemandTree,
  getLeafArbiters,
  findArbitersOfType,
  validateDemandTree,
  type DemandParserConfig,
} from "../../src/utils/demandParser";
import { makeDemandParserClient } from "../../src/clients/demandParser";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "../utils/setup";

let testContext: TestContext;
let config: DemandParserConfig;

beforeAll(async () => {
  testContext = await setupTestEnvironment();
  config = createDefaultDemandParserConfig(testContext.addresses);
});

beforeEach(async () => {
  // Reset to initial state before each test
  if (testContext.anvilInitState) {
    await testContext.testClient.loadState({
      state: testContext.anvilInitState,
    });
  }
  // Reset config
  config = createDefaultDemandParserConfig(testContext.addresses);
});

afterAll(async () => {
  await teardownTestEnvironment(testContext);
});

test("createDefaultDemandParserConfig creates configuration with known arbiters", () => {
  expect(config.arbiterDecoders.size).toBeGreaterThan(0);
  
  // Check that TrustedOracleArbiter is included
  expect(config.arbiterDecoders.has(testContext.addresses.trustedOracleArbiter)).toBe(true);
  
  // Check that TrivialArbiter is included
  expect(config.arbiterDecoders.has(testContext.addresses.trivialArbiter)).toBe(true);
  
  // Check that logical arbiters are included
  expect(config.arbiterDecoders.has(testContext.addresses.anyArbiter)).toBe(true);
  expect(config.arbiterDecoders.has(testContext.addresses.allArbiter)).toBe(true);
});

test("addArbiterDecoder adds custom arbiter to configuration", () => {
  const customArbiter = "0x1234567890123456789012345678901234567890" as const;
  
  addArbiterDecoder(config, customArbiter, {
    type: "leaf",
    demandDataAbi: parseAbiParameters("(uint256 value)"),
    decodeDemandData: (demandData: `0x${string}`) => {
      return { value: 42n };
    },
  });

  expect(config.arbiterDecoders.has(customArbiter)).toBe(true);
  expect(config.arbiterDecoders.get(customArbiter)?.type).toBe("leaf");
});

test("parseDemandRecursive handles leaf arbiter (TrustedOracleArbiter)", () => {
  const oracle = testContext.alice;
  const data = "0xdeadbeef" as const;
  
  const demandData = encodeAbiParameters(
    parseAbiParameters("(address oracle, bytes data)"),
    [{ oracle, data }]
  );

  const parsed = parseDemandRecursive(
    config,
    testContext.addresses.trustedOracleArbiter,
    demandData
  );

  expect(parsed.type).toBe("leaf");
  expect(parsed.arbiter).toBe(testContext.addresses.trustedOracleArbiter);
  expect(parsed.decoded.oracle).toBe(oracle);
  expect(parsed.decoded.data).toBe(data);
  expect(parsed.children).toBeUndefined();
});

test("parseDemandRecursive handles unknown arbiter as opaque leaf", () => {
  const unknownArbiter = "0x1234567890123456789012345678901234567890" as const;
  const demandData = "0xabcdef" as const;

  const parsed = parseDemandRecursive(config, unknownArbiter, demandData);

  expect(parsed.type).toBe("leaf");
  expect(parsed.arbiter).toBe(unknownArbiter);
  expect(parsed.decoded.raw).toBe(demandData);
  expect(parsed.children).toBeUndefined();
});

test("parseDemandRecursive handles real AnyArbiter contract", () => {
  const client = testContext.aliceClient;
  
  // Create demand using the SDK (like other tests do)
  const originalDemand = {
    arbiters: [testContext.alice, testContext.bob],
    demands: [
      "0x1234" as `0x${string}`,
      "0x5678" as `0x${string}`,
    ],
  };

  // Encode using the real SDK method
  const demandData = client.arbiters.encodeAnyArbiterDemand(originalDemand);

  // Parse using our demand parser with the REAL deployed contract
  const parsed = parseDemandRecursive(
    config,
    testContext.addresses.anyArbiter, // Real deployed contract address
    demandData
  );

  expect(parsed.type).toBe("composing");
  expect(parsed.arbiter).toBe(testContext.addresses.anyArbiter);
  expect(parsed.children).toHaveLength(2);
  expect(parsed.children![0].arbiter.toLowerCase()).toBe(testContext.alice.toLowerCase());
  expect(parsed.children![1].arbiter.toLowerCase()).toBe(testContext.bob.toLowerCase());
  expect(parsed.children![0].demandData).toBe("0x1234");
  expect(parsed.children![1].demandData).toBe("0x5678");
});

test("parseDemandRecursive handles real AllArbiter contract", () => {
  const client = testContext.aliceClient;
  
  // Create demand using the SDK  
  const trustedOracleDemand = client.arbiters.encodeTrustedOracleDemand({
    oracle: testContext.alice,
    data: "0xbeef" as `0x${string}`,
  });

  const originalDemand = {
    arbiters: [testContext.addresses.trustedOracleArbiter, testContext.addresses.trivialArbiter],
    demands: [
      trustedOracleDemand,
      "0x" as `0x${string}`, // TrivialArbiter has no demand data
    ],
  };

  // Encode using the real SDK method
  const demandData = client.arbiters.encodeAllArbiterDemand(originalDemand);

  // Parse using our demand parser with the REAL deployed contract
  const parsed = parseDemandRecursive(
    config,
    testContext.addresses.allArbiter, // Real deployed contract address
    demandData
  );

  expect(parsed.type).toBe("composing");
  expect(parsed.arbiter).toBe(testContext.addresses.allArbiter);
  expect(parsed.children).toHaveLength(2);
  
  // First child should be parsed TrustedOracleArbiter
  expect(parsed.children![0].arbiter.toLowerCase()).toBe(testContext.addresses.trustedOracleArbiter.toLowerCase());
  expect(parsed.children![0].type).toBe("leaf");
  expect(parsed.children![0].decoded.oracle).toBe(testContext.alice);
  expect(parsed.children![0].decoded.data).toBe("0xbeef");
  
  // Second child should be TrivialArbiter
  expect(parsed.children![1].arbiter.toLowerCase()).toBe(testContext.addresses.trivialArbiter.toLowerCase());
  expect(parsed.children![1].type).toBe("leaf");
});

test("parseDemandRecursive handles nested real logical arbiters", () => {
  const client = testContext.aliceClient;
  
  // Create a nested structure: AllArbiter containing an AnyArbiter
  // Step 1: Create an AnyArbiter demand (OR logic)
  const innerAnyDemand = client.arbiters.encodeAnyArbiterDemand({
    arbiters: [testContext.addresses.trustedOracleArbiter, testContext.addresses.trivialArbiter],
    demands: [
      client.arbiters.encodeTrustedOracleDemand({
        oracle: testContext.alice,
        data: "0x696e6e6572" as `0x${string}`, // "inner" as proper hex
      }),
      "0x" as `0x${string}`,
    ],
  });

  // Step 2: Create an AllArbiter demand that includes the AnyArbiter (AND logic)
  const outerAllDemand = client.arbiters.encodeAllArbiterDemand({
    arbiters: [
      testContext.addresses.anyArbiter, // The inner AnyArbiter
      testContext.addresses.trivialArbiter, // And a trivial arbiter
    ],
    demands: [
      innerAnyDemand,
      "0x" as `0x${string}`,
    ],
  });

  // Step 3: Parse the entire nested structure
  const parsed = parseDemandRecursive(
    config,
    testContext.addresses.allArbiter,
    outerAllDemand
  );

  // Verify the outer structure (AllArbiter)
  expect(parsed.type).toBe("composing");
  expect(parsed.arbiter.toLowerCase()).toBe(testContext.addresses.allArbiter.toLowerCase());
  expect(parsed.children).toHaveLength(2);

  // Verify the first child is the nested AnyArbiter
  const nestedAnyChild = parsed.children![0];
  expect(nestedAnyChild.type).toBe("composing");
  expect(nestedAnyChild.arbiter.toLowerCase()).toBe(testContext.addresses.anyArbiter.toLowerCase());
  expect(nestedAnyChild.children).toHaveLength(2);

  // Verify the nested AnyArbiter's children
  const nestedTrustedOracle = nestedAnyChild.children![0];
  expect(nestedTrustedOracle.type).toBe("leaf");
  expect(nestedTrustedOracle.arbiter.toLowerCase()).toBe(testContext.addresses.trustedOracleArbiter.toLowerCase());
  expect(nestedTrustedOracle.decoded.oracle).toBe(testContext.alice);
  expect(nestedTrustedOracle.decoded.data).toBe("0x696e6e6572");

  const nestedTrivial = nestedAnyChild.children![1];
  expect(nestedTrivial.type).toBe("leaf");
  expect(nestedTrivial.arbiter.toLowerCase()).toBe(testContext.addresses.trivialArbiter.toLowerCase());

  // Verify the second child of the outer AllArbiter
  const outerTrivial = parsed.children![1];
  expect(outerTrivial.type).toBe("leaf");
  expect(outerTrivial.arbiter.toLowerCase()).toBe(testContext.addresses.trivialArbiter.toLowerCase());

  // Test analysis utilities on the nested structure
  const flattened = flattenDemandTree(parsed);
  expect(flattened).toHaveLength(5); // AllArbiter + AnyArbiter + 3 leaf arbiters

  const leafArbiters = getLeafArbiters(parsed);
  expect(leafArbiters).toHaveLength(3); // 3 leaf arbiters total

  const anyArbiters = findArbitersOfType(parsed, testContext.addresses.anyArbiter);
  expect(anyArbiters).toHaveLength(1);
  expect(anyArbiters[0].depth).toBe(1); // Nested at depth 1
});

test("parseDemandFromEscrow extracts and parses escrow demand", () => {
  const oracle = testContext.alice;
  const oracleData = "0xdeadbeef" as const;
  
  const trustedOracleDemand = encodeAbiParameters(
    parseAbiParameters("(address oracle, bytes data)"),
    [{ oracle, data: oracleData }]
  );

  const escrowData = encodeAbiParameters(
    parseAbiParameters("(address arbiter, bytes demand)"),
    [{ arbiter: testContext.addresses.trustedOracleArbiter, demand: trustedOracleDemand }]
  );

  const parsed = parseDemandFromEscrow(config, escrowData);

  expect(parsed.type).toBe("leaf");
  expect(parsed.arbiter.toLowerCase()).toBe(testContext.addresses.trustedOracleArbiter.toLowerCase());
  expect(parsed.decoded).toBeDefined();
  expect(parsed.decoded.oracle).toBe(oracle);
  expect(parsed.decoded.data).toBe(oracleData);
});

test("flattenDemandTree returns all nodes with depth information", () => {
  // Create a simple tree with known arbiters
  const mockComposingArbiter = "0x2222222222222222222222222222222222222222" as const;
  
  addArbiterDecoder(config, mockComposingArbiter, {
    type: "composing",
    demandDataAbi: parseAbiParameters("(address arbiter, bytes demand)"),
    decodeDemandData: (demandData: `0x${string}`) => {
      return {
        arbiter: testContext.addresses.trustedOracleArbiter,
        demand: encodeAbiParameters(
          parseAbiParameters("(address oracle, bytes data)"),
          [{ oracle: testContext.alice, data: "0xbeef" }]
        ),
      };
    },
    extractNestedDemands: (decoded: any) => [{ arbiter: decoded.arbiter, demand: decoded.demand }],
  });

  const parsed = parseDemandRecursive(config, mockComposingArbiter, "0xabcd");
  const flattened = flattenDemandTree(parsed);

  expect(flattened).toHaveLength(2);
  expect(flattened[0].depth).toBe(0);
  expect(flattened[0].type).toBe("composing");
  expect(flattened[1].depth).toBe(1);
  expect(flattened[1].type).toBe("leaf");
});

test("getLeafArbiters returns only leaf arbiters", () => {
  const mockComposingArbiter = "0x3333333333333333333333333333333333333333" as const;
  
  addArbiterDecoder(config, mockComposingArbiter, {
    type: "composing",
    demandDataAbi: parseAbiParameters("(address[] arbiters, bytes[] demands)"),
    decodeDemandData: (demandData: `0x${string}`) => {
      return {
        arbiters: [testContext.addresses.trustedOracleArbiter, testContext.addresses.trivialArbiter],
        demands: [
          encodeAbiParameters(
            parseAbiParameters("(address oracle, bytes data)"),
            [{ oracle: testContext.alice, data: "0xbeef" }]
          ),
          "0x",
        ],
      };
    },
    extractNestedDemands: (decoded: any) => {
      return decoded.arbiters.map((arbiter: `0x${string}`, index: number) => ({
        arbiter,
        demand: decoded.demands[index],
      }));
    },
  });

  const parsed = parseDemandRecursive(config, mockComposingArbiter, "0xabcd");
  const leafArbiters = getLeafArbiters(parsed);

  expect(leafArbiters).toHaveLength(2);
  expect(leafArbiters[0].arbiter).toBe(testContext.addresses.trustedOracleArbiter);
  expect(leafArbiters[1].arbiter).toBe(testContext.addresses.trivialArbiter);
});

test("findArbitersOfType finds specific arbiter types", () => {
  const mockComposingArbiter = "0x4444444444444444444444444444444444444444" as const;
  
  addArbiterDecoder(config, mockComposingArbiter, {
    type: "composing",
    demandDataAbi: parseAbiParameters("(address arbiter, bytes demand)"),
    decodeDemandData: (demandData: `0x${string}`) => {
      return {
        arbiter: testContext.addresses.trustedOracleArbiter,
        demand: encodeAbiParameters(
          parseAbiParameters("(address oracle, bytes data)"),
          [{ oracle: testContext.alice, data: "0xbeef" }]
        ),
      };
    },
    extractNestedDemands: (decoded: any) => [{ arbiter: decoded.arbiter, demand: decoded.demand }],
  });

  const parsed = parseDemandRecursive(config, mockComposingArbiter, "0xabcd");
  const trustedOracleMatches = findArbitersOfType(parsed, testContext.addresses.trustedOracleArbiter);
  const trivialMatches = findArbitersOfType(parsed, testContext.addresses.trivialArbiter);

  expect(trustedOracleMatches).toHaveLength(1);
  expect(trustedOracleMatches[0].depth).toBe(1);
  expect(trivialMatches).toHaveLength(0);
});

test("validateDemandTree identifies unknown arbiters", () => {
  const unknownArbiter = "0x5555555555555555555555555555555555555555" as const;
  const parsed = parseDemandRecursive(config, unknownArbiter, "0xabcd");
  
  const validation = validateDemandTree(config, parsed);
  
  expect(validation.isValid).toBe(false);
  expect(validation.unknownArbiters).toHaveLength(1);
  expect(validation.unknownArbiters[0]).toBe(unknownArbiter);
});

test("validateDemandTree passes for known arbiters", () => {
  const demandData = encodeAbiParameters(
    parseAbiParameters("(address oracle, bytes data)"),
    [{ oracle: testContext.alice, data: "0xbeef" }]
  );

  const parsed = parseDemandRecursive(
    config,
    testContext.addresses.trustedOracleArbiter,
    demandData
  );
  
  const validation = validateDemandTree(config, parsed);
  
  expect(validation.isValid).toBe(true);
  expect(validation.unknownArbiters).toHaveLength(0);
});

test("demand parser client integration", () => {
  const client = makeDemandParserClient(testContext.aliceClient.viemClient, testContext.addresses);
  
  // Test adding custom arbiter
  const customArbiter = "0x6666666666666666666666666666666666666666" as const;
  client.addArbiterDecoder(customArbiter, {
    type: "leaf",
    demandDataAbi: parseAbiParameters("(string name)"),
    decodeDemandData: (demandData: `0x${string}`) => ({ name: "test" }),
  });

  // Test that the arbiter was added
  const config = client.getDemandParserConfig();
  expect(config.arbiterDecoders.has(customArbiter)).toBe(true);

  // Test parsing a simple demand
  const demandData = encodeAbiParameters(
    parseAbiParameters("(address oracle, bytes data)"),
    [{ oracle: testContext.alice, data: "0xbeef" }]
  );

  const parsed = client.parseDemand(testContext.addresses.trustedOracleArbiter, demandData);
  expect(parsed.type).toBe("leaf");
  expect(parsed.decoded.oracle).toBe(testContext.alice);

  // Test utility methods
  const flattened = client.flattenDemandTree(parsed);
  expect(flattened).toHaveLength(1);

  const leafArbiters = client.getLeafArbiters(parsed);
  expect(leafArbiters).toHaveLength(1);

  const summary = client.getDemandSummary(parsed);
  expect(summary).toContain("Trusted Oracle Arbiter");

  const hasTrustedOracle = client.demandContainsArbiter(parsed, testContext.addresses.trustedOracleArbiter);
  expect(hasTrustedOracle).toBe(true);

  const depth = client.getDemandTreeDepth(parsed);
  expect(depth).toBe(0);

  const counts = client.countArbitersByType(parsed);
  expect(counts.leaf).toBe(1);
  expect(counts.composing).toBe(0);
});

test("parseDemandRecursive prevents infinite recursion", () => {
  // Create a circular reference scenario
  const arbiterA = "0x7777777777777777777777777777777777777777" as const;
  const arbiterB = "0x8888888888888888888888888888888888888888" as const;

  addArbiterDecoder(config, arbiterA, {
    type: "composing",
    demandDataAbi: parseAbiParameters("(address arbiter, bytes demand)"),
    decodeDemandData: (demandData: `0x${string}`) => ({
      arbiter: arbiterB,
      demand: "0xbbbb",
    }),
    extractNestedDemands: (decoded: any) => [{ arbiter: decoded.arbiter, demand: decoded.demand }],
  });

  addArbiterDecoder(config, arbiterB, {
    type: "composing",
    demandDataAbi: parseAbiParameters("(address arbiter, bytes demand)"),
    decodeDemandData: (demandData: `0x${string}`) => ({
      arbiter: arbiterA,
      demand: "0xaaaa",
    }),
    extractNestedDemands: (decoded: any) => [{ arbiter: decoded.arbiter, demand: decoded.demand }],
  });

  expect(() => {
    parseDemandRecursive(config, arbiterA, "0xabcd", 5); // Low max depth to trigger error
  }).toThrow("Maximum parsing depth");
});

test("client reset configuration works", () => {
  const client = makeDemandParserClient(testContext.aliceClient.viemClient, testContext.addresses);
  
  // Add a custom arbiter
  const customArbiter = "0x9999999999999999999999999999999999999999" as const;
  client.addArbiterDecoder(customArbiter, {
    type: "leaf",
    demandDataAbi: [], // No parameters
    decodeDemandData: () => ({}),
  });

  expect(client.getDemandParserConfig().arbiterDecoders.has(customArbiter)).toBe(true);

  // Reset configuration
  client.resetDemandParserConfig();
  
  expect(client.getDemandParserConfig().arbiterDecoders.has(customArbiter)).toBe(false);
});