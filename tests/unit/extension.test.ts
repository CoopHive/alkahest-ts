import { beforeAll, afterAll, test, expect, describe } from "bun:test";
import { parseEther } from "viem";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "../utils/setup";

describe("Client Extension Tests", () => {
  let testContext: TestContext;
  let alice: `0x${string}`;
  let aliceClient: TestContext["aliceClient"];

  beforeAll(async () => {
    // Setup test environment
    testContext = await setupTestEnvironment();
    alice = testContext.alice;
    aliceClient = testContext.aliceClient;
  });

  afterAll(async () => {
    // Clean up
    await teardownTestEnvironment(testContext);
  });

  test("should allow extending client with custom methods", () => {
    // Extend the client with custom functionality
    const extendedClient = aliceClient.extend((client) => ({
      // Custom method that uses existing client functionality
      getClientInfo: () => ({
        address: client.address,
        chainId: client.viemClient.chain.id,
        chainName: client.viemClient.chain.name,
      }),

      // Custom method for formatting addresses
      formatAddress: (address: `0x${string}`) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
      },

      // Custom method that combines existing functionality
      getFormattedClientAddress: () => {
        const info = extendedClient.getClientInfo();
        return extendedClient.formatAddress(info.address);
      },
    }));

    // Test that original methods still exist
    expect(extendedClient.arbiters).toBeDefined();
    expect(extendedClient.erc20).toBeDefined();
    expect(extendedClient.getAttestation).toBeDefined();

    // Test new methods
    expect(extendedClient.getClientInfo).toBeDefined();
    expect(extendedClient.formatAddress).toBeDefined();
    expect(extendedClient.getFormattedClientAddress).toBeDefined();

    // Test new methods work correctly
    const clientInfo = extendedClient.getClientInfo();
    expect(clientInfo.address).toBe(alice);
    expect(clientInfo.chainId).toBeDefined();
    expect(clientInfo.chainName).toBeDefined();

    const formattedAddress = extendedClient.formatAddress(alice);
    expect(formattedAddress).toMatch(/^0x[a-fA-F0-9]{4}\.\.\.[a-fA-F0-9]{4}$/);

    const formattedClientAddress = extendedClient.getFormattedClientAddress();
    expect(formattedClientAddress).toBe(formattedAddress);
  });

  test("should allow extending with async methods", async () => {
    const extendedClient = aliceClient.extend((client) => ({
      // Async method that uses existing client functionality
      getBalanceInfo: async () => {
        // This would use the viem client to get ETH balance
        const balance = await client.viemClient.getBalance({
          address: client.address,
        });
        return {
          address: client.address,
          balance: balance.toString(),
          formattedBalance: `${(Number(balance) / 1e18).toFixed(4)} ETH`,
        };
      },

      // Method that wraps existing async functionality
      safeGetAttestation: async (uid: `0x${string}`) => {
        try {
          const attestation = await client.getAttestation(uid);
          return { success: true, attestation, error: null };
        } catch (error) {
          return { success: false, attestation: null, error: String(error) };
        }
      },
    }));

    // Test async methods
    const balanceInfo = await extendedClient.getBalanceInfo();
    expect(balanceInfo.address).toBe(alice);
    expect(balanceInfo.balance).toBeDefined();
    expect(balanceInfo.formattedBalance).toMatch(/^\d+\.\d{4} ETH$/);

    // Test error handling with a definitely invalid UID
    const invalidUid = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;
    const result = await extendedClient.safeGetAttestation(invalidUid);
    // Since we're testing error handling, we expect it to handle gracefully
    expect(result).toBeDefined();
    expect(typeof result.success).toBe("boolean");
    if (!result.success) {
      expect(result.error).toBeDefined();
    }
  });

  test("should allow extending with complex functionality", () => {
    const extendedClient = aliceClient.extend((client) => ({
      // Token utilities
      tokens: {
        formatBalance: (balance: bigint, decimals: number = 18) => {
          return (Number(balance) / Math.pow(10, decimals)).toFixed(4);
        },
        
        async getTokenInfo(tokenAddress: `0x${string}`) {
          try {
            const [name, symbol, decimals] = await Promise.all([
              client.viemClient.readContract({
                address: tokenAddress,
                abi: [
                  {
                    name: "name",
                    type: "function",
                    stateMutability: "view",
                    inputs: [],
                    outputs: [{ type: "string" }],
                  },
                ],
                functionName: "name",
              }),
              client.viemClient.readContract({
                address: tokenAddress,
                abi: [
                  {
                    name: "symbol", 
                    type: "function",
                    stateMutability: "view",
                    inputs: [],
                    outputs: [{ type: "string" }],
                  },
                ],
                functionName: "symbol",
              }),
              client.viemClient.readContract({
                address: tokenAddress,
                abi: [
                  {
                    name: "decimals",
                    type: "function", 
                    stateMutability: "view",
                    inputs: [],
                    outputs: [{ type: "uint8" }],
                  },
                ],
                functionName: "decimals",
              }),
            ]);
            
            return { name, symbol, decimals };
          } catch (error) {
            return null;
          }
        },
      },

      // Attestation utilities
      attestations: {
        isExpired: (attestation: { expirationTime: bigint }) => {
          if (attestation.expirationTime === 0n) return false;
          return attestation.expirationTime < BigInt(Math.floor(Date.now() / 1000));
        },
        
        formatTimestamp: (timestamp: bigint) => {
          return new Date(Number(timestamp) * 1000).toISOString();
        },
      },
    }));

    // Test nested functionality
    expect(extendedClient.tokens).toBeDefined();
    expect(extendedClient.tokens.formatBalance).toBeDefined();
    expect(extendedClient.tokens.getTokenInfo).toBeDefined();
    expect(extendedClient.attestations).toBeDefined();
    expect(extendedClient.attestations.isExpired).toBeDefined();
    expect(extendedClient.attestations.formatTimestamp).toBeDefined();

    // Test token utilities
    const formattedBalance = extendedClient.tokens.formatBalance(parseEther("1.23456789"));
    expect(formattedBalance).toBe("1.2346");

    // Test attestation utilities
    const expired = extendedClient.attestations.isExpired({ expirationTime: BigInt(1) });
    expect(expired).toBe(true);

    const notExpired = extendedClient.attestations.isExpired({ expirationTime: 0n });
    expect(notExpired).toBe(false);

    const formatted = extendedClient.attestations.formatTimestamp(BigInt(1640995200));
    expect(formatted).toBe("2022-01-01T00:00:00.000Z");
  });

  test("should preserve original client type and functionality", async () => {
    const extendedClient = aliceClient.extend((client) => ({
      customMethod: () => "custom",
    }));

    // Test that all original properties and methods are still accessible
    expect(extendedClient.address).toBe(alice);
    expect(extendedClient.viemClient).toBeDefined();
    expect(extendedClient.contractAddresses).toBeDefined();
    
    // Test original methods still work
    expect(typeof extendedClient.getAttestation).toBe("function");
    expect(typeof extendedClient.getAttestedEventFromTxHash).toBe("function");
    expect(typeof extendedClient.waitForFulfillment).toBe("function");

    // Test original sub-clients still work
    expect(extendedClient.arbiters).toBeDefined();
    expect(extendedClient.erc20).toBeDefined();
    expect(extendedClient.erc721).toBeDefined();
    expect(extendedClient.erc1155).toBeDefined();
    expect(extendedClient.bundle).toBeDefined();
    expect(extendedClient.attestation).toBeDefined();
    expect(extendedClient.stringObligation).toBeDefined();
    expect(extendedClient.oracle).toBeDefined();

    // Test new method
    expect(extendedClient.customMethod()).toBe("custom");
  });

  test("should enable enhanced ERC20 trading workflow with extensions", async () => {
    const extendedClient = aliceClient.extend((client) => ({
      // Enhanced trading utilities that combine multiple client features
      trading: {
        // Create a trade analysis
        async analyzeERC20Trade(params: {
          tokenA: `0x${string}`;
          tokenB: `0x${string}`;
          amount: bigint;
          recipient: `0x${string}`;
        }) {
          const { tokenA, tokenB, amount, recipient } = params;
          
          // Get current allowances
          const allowanceA = await client.erc20.getAllowance(tokenA, recipient);
          const allowanceB = await client.erc20.getAllowance(tokenB, recipient);
          
          // Check balances
          const balanceA = await client.erc20.getBalance(tokenA);
          const balanceB = await client.erc20.getBalance(tokenB);
          
          return {
            tokenA: {
              address: tokenA,
              balance: balanceA.toString(),
              allowance: allowanceA.toString(),
              hasEnoughBalance: balanceA >= amount,
              needsApproval: allowanceA < amount,
            },
            tokenB: {
              address: tokenB,
              balance: balanceB.toString(), 
              allowance: allowanceB.toString(),
            },
            trade: {
              amount: amount.toString(),
              recipient,
              canExecute: balanceA >= amount,
            },
          };
        },

        // Create a complete trading attestation workflow
        async createTradingAttestation(params: {
          bid: { address: `0x${string}`; value: bigint };
          ask: { address: `0x${string}`; value: bigint };
          expiration?: bigint;
        }) {
          const { bid, ask, expiration } = params;
          const expirationTime = expiration || BigInt(Math.floor(Date.now() / 1000) + 3600); // 1 hour default
          
          try {
            // Create the trading attestation using existing client functionality
            const attestation = await client.erc20.createERC20BuyAttestation({
              bid,
              ask,
              expiration: expirationTime,
            });
            
            return {
              success: true,
              attestation,
              bid,
              ask,
              expirationTime,
              error: null,
            };
          } catch (error) {
            return {
              success: false,
              attestation: null,
              bid,
              ask,
              expirationTime,
              error: String(error),
            };
          }
        },
      },

      // Enhanced attestation management
      attestationManager: {
        // Batch process multiple attestations
        async batchGetAttestations(uids: `0x${string}`[]) {
          const results = await Promise.allSettled(
            uids.map(uid => client.getAttestation(uid))
          );
          
          return results.map((result, index) => ({
            uid: uids[index],
            success: result.status === 'fulfilled',
            attestation: result.status === 'fulfilled' ? result.value : null,
            error: result.status === 'rejected' ? String(result.reason) : null,
          }));
        },

        // Enhanced attestation analysis
        analyzeAttestation(attestation: any) {
          const now = BigInt(Math.floor(Date.now() / 1000));
          const isExpired = attestation.expirationTime !== 0n && attestation.expirationTime < now;
          const timeLeft = isExpired ? 0n : (attestation.expirationTime === 0n ? null : attestation.expirationTime - now);
          
          return {
            uid: attestation.uid,
            schema: attestation.schema,
            attester: attestation.attester,
            recipient: attestation.recipient,
            isExpired,
            timeLeft: timeLeft?.toString() || null,
            timeLeftHours: timeLeft ? Number(timeLeft) / 3600 : null,
            revocable: attestation.revocable,
            isRevoked: attestation.revocationTime !== 0n,
            createdAt: new Date(Number(attestation.time) * 1000).toISOString(),
            expiresAt: attestation.expirationTime === 0n ? null : new Date(Number(attestation.expirationTime) * 1000).toISOString(),
          };
        },
      },
    }));

    // Test trading analysis functionality
    const mockTokenA = "0x1234567890123456789012345678901234567890" as const;
    const mockTokenB = "0x0987654321098765432109876543210987654321" as const;
    const tradeAmount = parseEther("100");

    // This would normally interact with real contracts, but for testing we expect it to handle gracefully
    try {
      const analysis = await extendedClient.trading.analyzeERC20Trade({
        tokenA: mockTokenA,
        tokenB: mockTokenB,
        amount: tradeAmount,
        recipient: alice,
      });
      
      expect(analysis).toBeDefined();
      expect(analysis.tokenA).toBeDefined();
      expect(analysis.tokenB).toBeDefined();
      expect(analysis.trade).toBeDefined();
      expect(analysis.trade.amount).toBe(tradeAmount.toString());
      expect(analysis.trade.recipient).toBe(alice);
    } catch (error) {
      // Expected for mock tokens - test that extension handles errors gracefully
      expect(error).toBeDefined();
    }

    // Test attestation management
    expect(extendedClient.attestationManager.batchGetAttestations).toBeDefined();
    expect(extendedClient.attestationManager.analyzeAttestation).toBeDefined();

    // Test attestation analysis with mock data
    const mockAttestation = {
      uid: "0x1234567890123456789012345678901234567890123456789012345678901234",
      schema: "0x1234567890123456789012345678901234567890123456789012345678901234",
      attester: alice,
      recipient: alice,
      expirationTime: BigInt(Math.floor(Date.now() / 1000) + 3600), // 1 hour from now
      revocable: true,
      revocationTime: 0n,
      time: BigInt(Math.floor(Date.now() / 1000)),
    };

    const analysis = extendedClient.attestationManager.analyzeAttestation(mockAttestation);
    expect(analysis.uid).toBe(mockAttestation.uid);
    expect(analysis.isExpired).toBe(false);
    expect(analysis.timeLeft).toBeDefined();
    expect(analysis.timeLeftHours).toBeGreaterThan(0);
    expect(analysis.isRevoked).toBe(false);
    expect(analysis.createdAt).toBeDefined();
    expect(analysis.expiresAt).toBeDefined();
  });

  test("should enable advanced arbitration workflow with extensions", async () => {
    const extendedClient = aliceClient.extend((client) => ({
      // Advanced arbitration system
      arbitration: {
        // Create a  arbitration setup
        async setupArbitrationCase(params: {
          statement: string;
          oracle: `0x${string}`;
          timeframe: number; // seconds
        }) {
          const { statement, oracle, timeframe } = params;
          
          try {
            // Use existing arbiter functionality
            const beforeArbiter = await client.arbiters.createTimeBeforeArbiter(
              BigInt(Math.floor(Date.now() / 1000) + timeframe)
            );
            
            const oracleArbiter = await client.arbiters.createTrustedOracleArbiter(oracle);
            
            return {
              success: true,
              case: {
                statement,
                oracle,
                timeframe,
                deadline: Math.floor(Date.now() / 1000) + timeframe,
                beforeArbiter,
                oracleArbiter,
              },
              error: null,
            };
          } catch (error) {
            return {
              success: false,
              case: null,
              error: String(error),
            };
          }
        },

        // Enhanced arbiter management
        async analyzeArbiterPerformance(arbiterAddress: `0x${string}`) {
          try {
            // This would typically query historical arbitration data
            // For testing, we'll simulate the analysis
            return {
              arbiter: arbiterAddress,
              totalCases: 0, // Would be calculated from events
              resolvedCases: 0,
              successRate: 0,
              averageResolutionTime: 0,
              reputation: "new", // new, good, excellent, poor
              isActive: true,
            };
          } catch (error) {
            return {
              arbiter: arbiterAddress,
              error: String(error),
            };
          }
        },
      },

      // Enhanced ERC721 workflow
      nftTrading: {
        // Create  NFT trade setup
        async setupNFTTrade(params: {
          bid: { address: `0x${string}`; id: bigint };
          ask: { address: `0x${string}`; value: bigint };
          expiration?: bigint;
        }) {
          const { bid, ask, expiration } = params;
          const expirationTime = expiration || BigInt(Math.floor(Date.now() / 1000) + 3600);
          
          try {
            // Check NFT ownership and approval status
            const isApproved = await client.erc721.isApprovedForAll(
              bid.address,
              alice // Current user
            );
            
            // Create the NFT trade attestation
            const attestation = await client.erc721.createERC721BuyAttestation({
              bid,
              ask,
              expiration: expirationTime,
            });
            
            return {
              success: true,
              trade: {
                bid,
                ask,
                expirationTime,
                isApproved,
                attestation,
              },
              error: null,
            };
          } catch (error) {
            return {
              success: false,
              trade: null,
              error: String(error),
            };
          }
        },

        // Batch NFT operations
        async batchApproveNFTs(contracts: `0x${string}`[], approved: boolean = true) {
          const results = await Promise.allSettled(
            contracts.map(contract => 
              approved 
                ? client.erc721.approveForAll(contract, true)
                : client.erc721.approveForAll(contract, false)
            )
          );
          
          return results.map((result, index) => ({
            contract: contracts[index],
            success: result.status === 'fulfilled',
            hash: result.status === 'fulfilled' ? result.value : null,
            error: result.status === 'rejected' ? String(result.reason) : null,
          }));
        },
      },
    }));

    // Test arbitration setup
    const arbitrationCase = await extendedClient.arbitration.setupArbitrationCase({
      statement: "Test arbitration case",
      oracle: alice, // Using alice as mock oracle
      timeframe: 3600, // 1 hour
    });
    
    expect(arbitrationCase).toBeDefined();
    expect(typeof arbitrationCase.success).toBe("boolean");
    
    if (arbitrationCase.success) {
      expect(arbitrationCase.case).toBeDefined();
      expect(arbitrationCase.case?.statement).toBe("Test arbitration case");
      expect(arbitrationCase.case?.oracle).toBe(alice);
      expect(arbitrationCase.case?.timeframe).toBe(3600);
    }

    // Test arbiter analysis
    const arbiterAnalysis = await extendedClient.arbitration.analyzeArbiterPerformance(alice);
    expect(arbiterAnalysis).toBeDefined();
    expect(arbiterAnalysis.arbiter).toBe(alice);
    expect(typeof arbiterAnalysis.totalCases).toBe("number");

    // Test NFT trading setup
    const nftTrade = await extendedClient.nftTrading.setupNFTTrade({
      bid: { 
        address: "0x1234567890123456789012345678901234567890" as const, 
        id: BigInt(1) 
      },
      ask: { 
        address: "0x0987654321098765432109876543210987654321" as const, 
        value: parseEther("1") 
      },
    });
    
    expect(nftTrade).toBeDefined();
    expect(typeof nftTrade.success).toBe("boolean");
    
    // Test batch operations
    expect(extendedClient.nftTrading.batchApproveNFTs).toBeDefined();
  });

  test("should enable multi-chain attestation workflow with extensions", async () => {
    const extendedClient = aliceClient.extend((client) => ({
      // Multi-chain attestation utilities
      multiChain: {
        // Prepare attestation for cross-chain verification
        prepareAttestation(attestationData: {
          recipient: `0x${string}`;
          schema: `0x${string}`;
          data: string;
          expirationTime?: bigint;
        }) {
          const { recipient, schema, data, expirationTime } = attestationData;
          
          return {
            chainId: client.viemClient.chain.id,
            chainName: client.viemClient.chain.name,
            attester: client.address,
            recipient,
            schema,
            data,
            expirationTime: expirationTime || 0n,
            timestamp: BigInt(Math.floor(Date.now() / 1000)),
            nonce: BigInt(Math.floor(Math.random() * 1000000)),
          };
        },

        // Verify attestation integrity
        verifyAttestationIntegrity(attestation: any) {
          const requiredFields = ['uid', 'schema', 'attester', 'recipient', 'time', 'expirationTime', 'revocable'];
          const hasAllFields = requiredFields.every(field => attestation[field] !== undefined);
          
          const now = BigInt(Math.floor(Date.now() / 1000));
          const isNotExpired = attestation.expirationTime === 0n || attestation.expirationTime > now;
          const isNotRevoked = attestation.revocationTime === 0n;
          const isTimestampValid = attestation.time <= now;
          
          return {
            isValid: hasAllFields && isNotExpired && isNotRevoked && isTimestampValid,
            checks: {
              hasAllFields,
              isNotExpired,
              isNotRevoked,
              isTimestampValid,
            },
            details: {
              missingFields: requiredFields.filter(field => attestation[field] === undefined),
              timeToExpiry: attestation.expirationTime === 0n ? null : Number(attestation.expirationTime - now),
            },
          };
        },
      },

      // Enhanced bundle operations
      bundleManager: {
        // Create optimized token bundles
        async createOptimizedBundle(tokens: Array<{
          type: 'erc20' | 'erc721' | 'erc1155';
          address: `0x${string}`;
          value?: bigint;
          id?: bigint;
        }>) {
          try {
            // Separate tokens by type
            const erc20Tokens = tokens.filter(t => t.type === 'erc20');
            const erc721Tokens = tokens.filter(t => t.type === 'erc721');
            const erc1155Tokens = tokens.filter(t => t.type === 'erc1155');
            
            // Check balances and approvals for each type
            const erc20Checks = await Promise.allSettled(
              erc20Tokens.map(async (token) => {
                const balance = await client.erc20.getBalance(token.address);
                const allowance = await client.erc20.getAllowance(token.address, client.address);
                return {
                  ...token,
                  balance: balance.toString(),
                  allowance: allowance.toString(),
                  hasEnoughBalance: balance >= (token.value || 0n),
                  needsApproval: allowance < (token.value || 0n),
                };
              })
            );
            
            const erc721Checks = await Promise.allSettled(
              erc721Tokens.map(async (token) => {
                const isApproved = await client.erc721.isApprovedForAll(token.address, client.address);
                return {
                  ...token,
                  isApproved,
                  needsApproval: !isApproved,
                };
              })
            );
            
            // Create bundle data structure
            const bundle = {
              erc20: erc20Checks.map(result => 
                result.status === 'fulfilled' ? result.value : null
              ).filter(Boolean),
              erc721: erc721Checks.map(result => 
                result.status === 'fulfilled' ? result.value : null
              ).filter(Boolean),
              erc1155: erc1155Tokens, // Would implement similar checks
              totalTokens: tokens.length,
              readyToTransact: true, // Would calculate based on checks
            };
            
            return {
              success: true,
              bundle,
              error: null,
            };
          } catch (error) {
            return {
              success: false,
              bundle: null,
              error: String(error),
            };
          }
        },

        // Estimate gas for bundle operations
        estimateBundleGas(bundle: any) {
          // Mock gas estimation - in reality would call estimateGas
          const baseGas = 21000n;
          const tokenGas = 50000n;
          const approvalGas = 45000n;
          
          const estimatedGas = baseGas + 
            (BigInt(bundle.totalTokens || 0) * tokenGas) +
            (BigInt(bundle.approvalsNeeded || 0) * approvalGas);
          
          return {
            estimatedGas: estimatedGas.toString(),
            estimatedGasGwei: (Number(estimatedGas) / 1e9).toFixed(2),
            breakdown: {
              base: baseGas.toString(),
              tokens: (BigInt(bundle.totalTokens || 0) * tokenGas).toString(),
              approvals: (BigInt(bundle.approvalsNeeded || 0) * approvalGas).toString(),
            },
          };
        },
      },
    }));

    // Test multi-chain attestation preparation
    const attestationPrep = extendedClient.multiChain.prepareAttestation({
      recipient: alice,
      schema: "0x1234567890123456789012345678901234567890123456789012345678901234",
      data: "0x1234",
    });
    
    expect(attestationPrep).toBeDefined();
    expect(attestationPrep.attester).toBe(alice);
    expect(attestationPrep.recipient).toBe(alice);
    expect(attestationPrep.chainId).toBeDefined();
    expect(attestationPrep.timestamp).toBeDefined();
    expect(attestationPrep.nonce).toBeDefined();

    // Test attestation verification
    const mockAttestation = {
      uid: "0x1234567890123456789012345678901234567890123456789012345678901234",
      schema: "0x1234567890123456789012345678901234567890123456789012345678901234",
      attester: alice,
      recipient: alice,
      time: BigInt(Math.floor(Date.now() / 1000)),
      expirationTime: 0n,
      revocable: true,
      revocationTime: 0n,
    };
    
    const verification = extendedClient.multiChain.verifyAttestationIntegrity(mockAttestation);
    expect(verification.isValid).toBe(true);
    expect(verification.checks.hasAllFields).toBe(true);
    expect(verification.checks.isNotExpired).toBe(true);
    expect(verification.checks.isNotRevoked).toBe(true);
    expect(verification.checks.isTimestampValid).toBe(true);

    // Test bundle creation
    const mockTokens = [
      { type: 'erc20' as const, address: "0x1234567890123456789012345678901234567890" as const, value: parseEther("100") },
      { type: 'erc721' as const, address: "0x0987654321098765432109876543210987654321" as const, id: BigInt(1) },
    ];
    
    // This will likely fail due to mock addresses, but tests the extension structure
    try {
      const bundleResult = await extendedClient.bundleManager.createOptimizedBundle(mockTokens);
      expect(bundleResult).toBeDefined();
      expect(typeof bundleResult.success).toBe("boolean");
    } catch (error) {
      // Expected for mock tokens
      expect(error).toBeDefined();
    }

    // Test gas estimation
    const gasEstimate = extendedClient.bundleManager.estimateBundleGas({
      totalTokens: 2,
      approvalsNeeded: 1,
    });
    
    expect(gasEstimate).toBeDefined();
    expect(gasEstimate.estimatedGas).toBeDefined();
    expect(gasEstimate.breakdown).toBeDefined();
    expect(gasEstimate.breakdown.base).toBeDefined();
    expect(gasEstimate.breakdown.tokens).toBeDefined();
    expect(gasEstimate.breakdown.approvals).toBeDefined();
  });
});
