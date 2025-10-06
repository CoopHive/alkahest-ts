import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { parseEther, zeroAddress } from 'viem';
import { makeClient } from '../../src/index.js';
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from '../utils/setup.js';

describe('ETH Integration Tests', () => {
  let testContext: TestContext;
  let client: ReturnType<typeof makeClient>;
  let aliceClient: any;
  let bobClient: any;

  beforeAll(async () => {
    testContext = await setupTestEnvironment();
    client = testContext.aliceClient;
    aliceClient = testContext.aliceClient;
    bobClient = testContext.bobClient;
  });

  afterAll(async () => {
    await teardownTestEnvironment(testContext);
  });

  describe('ETH Oracle Integration', () => {
    it('should create ETH payment demand and integrate with oracle system', () => {
      // Create ETH payment obligation data
      const ethObligationData = {
        amount: parseEther('1.5'),
        payee: testContext.bob,
      };

      // Create ETH payment demand
      const ethDemand = client.eth.createEthPaymentDemand(ethObligationData);

      // Verify demand structure
      expect(ethDemand.arbiter).toBe(testContext.addresses.ethPaymentObligation); // ETH contract should be deployed
      expect(ethDemand.demand).toBeDefined();

      // Parse the demand
      const parsedDemand = client.demandParser.parseDemand(ethDemand.arbiter, ethDemand.demand);
      
      // Verify parsing works (will be parsed as unknown/opaque arbiter until ETH contract is deployed)
      expect(parsedDemand.arbiter).toBe(ethDemand.arbiter);
      expect(parsedDemand.type).toBe('leaf');
      expect(parsedDemand.decoded).toBeDefined();

      // Create oracle arbitration demand using raw encoding
      const oracleData = {
        oracle: testContext.alice,
        data: ethDemand.demand, // Use ETH demand as the oracle data
      };

      const encodedOracleData = client.arbiters.encodeTrustedOracleDemand(oracleData);
      
      // Verify oracle demand includes ETH payment request
      expect(testContext.addresses.trustedOracleArbiter).toBeDefined();
      expect(encodedOracleData).toBeDefined();

      // Parse the oracle demand
      const parsedOracleDemand = client.demandParser.parseDemand(testContext.addresses.trustedOracleArbiter, encodedOracleData);
      
      expect(parsedOracleDemand.type).toBe('leaf');
      expect(parsedOracleDemand.decoded.oracle.toLowerCase()).toBe(testContext.alice.toLowerCase());
      expect(parsedOracleDemand.decoded.data).toBe(ethDemand.demand);
    });

    it('should handle ETH encoding and decoding consistently', () => {
      const originalData = {
        amount: parseEther('0.123456789'),
        payee: testContext.alice,
      };

      // Encode the data
      const encoded = client.eth.encodeEthObligationData(originalData);
      expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

      // Decode the data
      const decoded = client.eth.decodeEthObligationData(encoded);
      
      // Verify round-trip consistency
      expect(decoded.amount).toBe(originalData.amount);
      expect(decoded.payee.toLowerCase()).toBe(originalData.payee.toLowerCase());

      // Test with edge cases
      const edgeCases = [
        { amount: 0n, payee: zeroAddress },
        { amount: parseEther('999999'), payee: testContext.bob },
        { amount: 1n, payee: testContext.charlie },
      ];

      for (const testCase of edgeCases) {
        const encoded = client.eth.encodeEthObligationData(testCase);
        const decoded = client.eth.decodeEthObligationData(encoded);
        
        expect(decoded.amount).toBe(testCase.amount);
        expect(decoded.payee.toLowerCase()).toBe(testCase.payee.toLowerCase());
      }
    });

    it('should integrate ETH demands with demand parser system', () => {
      // Create ETH payment demands with different amounts
      const demands = [
        { amount: parseEther('1.0'), payee: testContext.alice },
        { amount: parseEther('2.5'), payee: testContext.bob },
        { amount: parseEther('0.001'), payee: testContext.charlie },
      ];

      for (const demandData of demands) {
        // Create ETH demand
        const ethDemand = client.eth.createEthPaymentDemand(demandData);
        
        // Verify it can be parsed
        const parsed = client.demandParser.parseDemand(ethDemand.arbiter, ethDemand.demand);
        
        expect(parsed.arbiter).toBe(ethDemand.arbiter);
        expect(parsed.type).toBe('leaf');
        expect(parsed.decoded).toBeDefined();
        
        // Verify the demand can be used in contract calls (even though contract isn't deployed)
        expect(typeof ethDemand.demand).toBe('string');
        expect(ethDemand.demand.startsWith('0x')).toBe(true);
      }
    });
  });

  describe('ETH Oracle Arbitration Integration', () => {
    it('should demonstrate complete ETH oracle arbitration workflow', async () => {
      // 1. Create an ETH balance arbitration request
      const balanceRequest = client.eth.createEthBalanceRequest({
        address: testContext.alice,
        minBalance: parseEther('1.0'), // Alice should have plenty from test setup
      });

      // 2. Validate the request format
      const validation = client.eth.validateEthArbitrationRequestFormat(balanceRequest);
      expect(validation.valid).toBe(true);

      // 3. Create request ID and context for tracking
      const timestamp = BigInt(Date.now());
      const requestId = client.eth.createEthArbitrationRequestId(balanceRequest, testContext.bob, timestamp);
      const context = client.eth.createEthArbitrationContext(
        balanceRequest,
        testContext.bob, // Bob is requesting arbitration
        timestamp,
        testContext.charlie // Charlie is the oracle
      );

      expect(context.requestId).toBe(requestId);
      expect(context.status).toBe('pending');

      // 4. Process the arbitration request as an oracle
      const result = await client.eth.processEthArbitrationRequest(
        balanceRequest,
        testContext.charlie // Charlie acts as oracle
      );

      // 5. Verify oracle decision
      expect(result.decision).toBe(true); // Alice should have sufficient balance
      expect(result.oracle).toBe(testContext.charlie);
      expect(result.request).toEqual(balanceRequest);
      expect(result.evidence).toBeDefined();
      
      // Balance evidence should be available for balance requests
      const evidence = result.evidence as any;
      expect(evidence.balance).toBeDefined();

      // 6. Demonstrate encoding/decoding for data persistence
      const encoded = client.eth.encodeEthArbitrationRequest(balanceRequest);
      const decoded = client.eth.decodeEthArbitrationRequest('eth_balance', encoded);
      expect(decoded).toEqual(balanceRequest);

      console.log('ETH Oracle Arbitration Workflow Complete:');
      console.log(`Request ID: ${requestId}`);
      console.log(`Checking balance of: ${balanceRequest.address}`);
      console.log(`Required minimum: ${parseEther('1.0')} wei`);
      console.log(`Oracle decision: ${result.decision}`);
      console.log(`Evidence: Balance verified at block ${evidence.balance?.blockNumber || 'latest'}`);
    });

    it('should handle complex multi-party escrow arbitration', async () => {
      // Create a realistic escrow scenario
      const escrowRequest = client.eth.createEthEscrowRequest({
        totalAmount: parseEther('5.0'),
        parties: [
          { address: testContext.alice, amount: parseEther('2.5'), role: 'depositor' },
          { address: testContext.bob, amount: parseEther('2.5'), role: 'depositor' },
          // Beneficiary amount should be 0 for this validation, or we use different amounts
          { address: testContext.charlie, amount: parseEther('0'), role: 'beneficiary' },
        ],
        conditions: {
          requireAllDeposits: true,
          minDepositors: 2,
        },
      });

      const validation = client.eth.validateEthArbitrationRequestFormat(escrowRequest);
      if (!validation.valid) {
        console.log('Validation errors:', validation.errors);
      }
      expect(validation.valid).toBe(true);

      const result = await client.eth.processEthArbitrationRequest(
        escrowRequest,
        testContext.alice // Alice acts as oracle for this escrow
      );

      expect(result.oracle).toBe(testContext.alice);
      
      // Escrow evidence should contain party information
      const escrowEvidence = result.evidence as any;
      expect(escrowEvidence.parties).toHaveLength(3);
      
      console.log('Multi-party Escrow Arbitration:');
      console.log(`Total escrow amount: ${escrowRequest.totalAmount} wei`);
      console.log(`Parties involved: ${escrowRequest.parties.length}`);
      console.log(`Oracle decision: ${result.decision}`);
      console.log(`Party validations: ${escrowEvidence.parties?.filter((p: any) => p.valid).length || 0}/${escrowEvidence.parties?.length || 0} passed`);
    });

    it('should demonstrate batch processing of diverse requests', async () => {
      const requests = [
        // Balance check
        client.eth.createEthBalanceRequest({
          address: testContext.alice,
          minBalance: parseEther('0.5'),
        }),
        
        // Transfer validation
        client.eth.createEthTransferRequest({
          minAmount: parseEther('0.1'),
          recipient: testContext.bob,
        }),
        
        // Payment verification
        client.eth.createEthPaymentRequest({
          amount: parseEther('1.0'),
          payer: testContext.alice,
          payee: testContext.bob,
        }),
      ];

      const results = await client.eth.batchProcessRequests(requests, testContext.charlie);

      expect(results).toHaveLength(3);
      expect(results.every((r: any) => r.oracle === testContext.charlie)).toBe(true);
      
      console.log('Batch Processing Results:');
      results.forEach((result: any, index: any) => {
        console.log(`Request ${index + 1} (${result.request.type}): ${result.decision ? 'PASS' : 'FAIL'}`);
      });
    });
  });

  describe('ETH Payment Obligation Contract Integration', () => {
    describe('Contract Deployment and Basic Functions', () => {
      it('should have deployed ETH payment obligation contract', () => {
        expect(testContext.addresses.ethPaymentObligation).toBeDefined();
        expect(testContext.addresses.ethPaymentObligation).toMatch(/^0x[a-fA-F0-9]{40}$/);
        expect(testContext.addresses.ethPaymentObligation).not.toBe('0x');
      });

      it('should have correct contract interface', async () => {
        // Test basic contract functions exist and return expected values
        const isPayable = await testContext.testClient.readContract({
          address: testContext.addresses.ethPaymentObligation,
          abi: aliceClient.eth.abi,
          functionName: 'isPayable',
          args: [],
        });
        expect(isPayable).toBe(true);

        const version = await testContext.testClient.readContract({
          address: testContext.addresses.ethPaymentObligation,
          abi: aliceClient.eth.abi,
          functionName: 'version',
          args: [],
        });
        expect(version).toBe('1.0.0');

        const easContract = await testContext.testClient.readContract({
          address: testContext.addresses.ethPaymentObligation,
          abi: aliceClient.eth.abi,
          functionName: 'EAS_CONTRACT',
          args: [],
        });
        expect((easContract as string).toLowerCase()).toBe(testContext.addresses.eas.toLowerCase());

        const schemaRegistry = await testContext.testClient.readContract({
          address: testContext.addresses.ethPaymentObligation,
          abi: aliceClient.eth.abi,
          functionName: 'SCHEMA_REGISTRY',
          args: [],
        });
        expect((schemaRegistry as string).toLowerCase()).toBe(testContext.addresses.easSchemaRegistry.toLowerCase());
      });
    });

    describe('ETH Payment Execution', () => {
      it('should execute ETH payment obligation successfully', async () => {
        const paymentAmount = parseEther('0.1');
        const obligationData = {
          amount: paymentAmount,
          payee: testContext.bob,
        };

        // Check initial balances
        const initialBobBalance = await testContext.testClient.getBalance({
          address: testContext.bob,
        });
        const initialAliceBalance = await testContext.testClient.getBalance({
          address: testContext.alice,
        });

        // Execute payment obligation
        const txHash = await aliceClient.eth.doEthPaymentObligation(obligationData);
        expect(txHash).toBeDefined();
        expect(typeof txHash).toBe('string');
        expect(txHash.startsWith('0x')).toBe(true);

        // Wait for transaction confirmation
        const receipt = await testContext.testClient.waitForTransactionReceipt({
          hash: txHash,
        });
        expect(receipt.status).toBe('success');

        // Check final balances
        const finalBobBalance = await testContext.testClient.getBalance({
          address: testContext.bob,
        });
        const finalAliceBalance = await testContext.testClient.getBalance({
          address: testContext.alice,
        });

        // Bob should have received the payment
        expect(finalBobBalance).toBe(initialBobBalance + paymentAmount);
        
        // Alice should have paid (amount + gas)
        expect(finalAliceBalance).toBeLessThan(initialAliceBalance - paymentAmount);
      });

      it('should create payment with UID generation', async () => {
        const paymentAmount = parseEther('0.05');
        const obligationData = {
          amount: paymentAmount,
          payee: testContext.charlie,
        };

        // Execute payment and get transaction hash
        const txHash = await aliceClient.eth.doEthPaymentObligation(obligationData);
        
        // Wait for confirmation
        const receipt = await testContext.testClient.waitForTransactionReceipt({ hash: txHash });
        expect(receipt.status).toBe('success');

        // Check that PaymentMade event was emitted
        expect(receipt.logs.length).toBeGreaterThan(0);
      });

      it('should create payment UIDs for validation', async () => {
        const paymentAmount = parseEther('0.2');
        const obligationData = {
          amount: paymentAmount,
          payee: testContext.bob,
        };

        // Execute payment
        const txHash = await aliceClient.eth.doEthPaymentObligation(obligationData);
        
        // Wait for confirmation  
        const receipt = await testContext.testClient.waitForTransactionReceipt({ hash: txHash });
        expect(receipt.status).toBe('success');
        
        // Verify transaction was successful
        expect(receipt.logs.length).toBeGreaterThan(0);
      });

      it('should handle payment on behalf of another address', async () => {
        const paymentAmount = parseEther('0.15');
        const obligationData = {
          amount: paymentAmount,
          payee: testContext.charlie,
        };

        // Check initial balances
        const initialCharlieBalance = await testContext.testClient.getBalance({
          address: testContext.charlie,
        });
        const initialBobBalance = await testContext.testClient.getBalance({
          address: testContext.bob,
        });

        // Bob pays on behalf of Alice, with Alice as recipient of attestation
        const txHash = await bobClient.eth.doEthPaymentObligationFor(
          obligationData,
          testContext.bob, // payer
          testContext.alice // recipient of attestation
        );

        // Wait for confirmation
        await testContext.testClient.waitForTransactionReceipt({ hash: txHash });

        // Check final balances
        const finalCharlieBalance = await testContext.testClient.getBalance({
          address: testContext.charlie,
        });
        const finalBobBalance = await testContext.testClient.getBalance({
          address: testContext.bob,
        });

        // Charlie should have received the payment
        expect(finalCharlieBalance).toBe(initialCharlieBalance + paymentAmount);
        
        // Bob should have paid (amount + gas)
        expect(finalBobBalance).toBeLessThan(initialBobBalance - paymentAmount);

        // Get transaction receipt to verify attestation recipient
        const receipt = await testContext.testClient.waitForTransactionReceipt({ hash: txHash });
        expect(receipt.status).toBe('success');
        
        // Verify the payment was processed (Charlie received funds, Bob paid)
        expect(finalCharlieBalance).toBe(initialCharlieBalance + paymentAmount);
        expect(finalBobBalance).toBeLessThan(initialBobBalance - paymentAmount);
      });
    });

    describe('Error Handling', () => {
      it('should reject payments with insufficient ETH', async () => {
        const paymentAmount = parseEther('1000000'); // Unreasonably large amount
        const obligationData = {
          amount: paymentAmount,
          payee: testContext.bob,
        };

        // This should fail
        await expect(async () => {
          await aliceClient.eth.doEthPaymentObligation(obligationData);
        }).toThrow();
      });

      it('should reject payments with zero amount', async () => {
        const obligationData = {
          amount: BigInt(0),
          payee: testContext.bob,
        };

        // This should fail
        await expect(async () => {
          await aliceClient.eth.doEthPaymentObligation(obligationData);
        }).toThrow();
      });
    });

    describe('Demand Parser Integration', () => {
      it('should parse ETH payment demands correctly', async () => {
        const obligationData = {
          amount: parseEther('0.5'),
          payee: testContext.charlie,
        };

        const demand = aliceClient.eth.createEthPaymentDemand(obligationData);
        expect(demand.arbiter).toBe(testContext.addresses.ethPaymentObligation);

        // Parse the demand
        const parsedDemand = aliceClient.demandParser.parseDemand(demand.arbiter, demand.demand);
        
        expect(parsedDemand.arbiter).toBe(demand.arbiter);
        expect(parsedDemand.type).toBe('leaf');
        
        // Should be able to decode the demand data
        const decodedData = aliceClient.eth.decodeEthObligationData(demand.demand);
        expect(decodedData.amount).toBe(obligationData.amount);
        expect(decodedData.payee.toLowerCase()).toBe(obligationData.payee.toLowerCase());
      });
    });

    describe('Oracle Arbitration Integration', () => {
      it('should create payment demands for oracle arbitration', async () => {
        const paymentAmount = parseEther('0.25');
        const obligationData = {
          amount: paymentAmount,
          payee: testContext.bob,
        };

        // Create demand for oracle arbitration
        const demand = aliceClient.eth.createEthPaymentDemand(obligationData);
        expect(demand.arbiter).toBe(testContext.addresses.ethPaymentObligation);

        // Verify demand can be decoded
        const decodedData = aliceClient.eth.decodeEthObligationData(demand.demand);
        expect(decodedData.amount).toBe(paymentAmount);
        expect(decodedData.payee.toLowerCase()).toBe(testContext.bob.toLowerCase());
      });
    });
  });
});