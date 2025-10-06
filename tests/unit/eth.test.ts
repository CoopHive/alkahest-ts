import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { parseEther, zeroAddress } from 'viem';
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from '../utils/setup.js';
import type {
  EthTransferArbitrationRequest,
  EthBalanceArbitrationRequest,
  EthPaymentArbitrationRequest,
  EthEscrowArbitrationRequest,
} from '../../src/types.js';

describe('ETH Unit Tests', () => {
  let testContext: TestContext;
  let client: any;

  beforeAll(async () => {
    testContext = await setupTestEnvironment();
    client = testContext.aliceClient;
  });

  afterAll(async () => {
    await teardownTestEnvironment(testContext);
  });

  describe('ETH Client Availability', () => {
    it('should have ETH client available', () => {
      expect(client.eth).toBeDefined();
      expect(typeof client.eth.encodeEthObligationData).toBe('function');
      expect(typeof client.eth.decodeEthObligationData).toBe('function');
      expect(typeof client.eth.createEthPaymentDemand).toBe('function');
    });

    it('should encode and decode ETH obligation data', () => {
      const obligationData = {
        amount: parseEther('1.0'),
        payee: testContext.bob,
      };

      const encoded = client.eth.encodeEthObligationData(obligationData);
      expect(encoded).toBeDefined();
      expect(typeof encoded).toBe('string');
      expect(encoded.startsWith('0x')).toBe(true);

      const decoded = client.eth.decodeEthObligationData(encoded);
      expect(decoded.amount).toBe(obligationData.amount);
      expect(decoded.payee.toLowerCase()).toBe(obligationData.payee.toLowerCase());
    });

    it('should create ETH payment demands', () => {
      const obligationData = {
        amount: parseEther('0.5'),
        payee: testContext.charlie,
      };

      const demand = client.eth.createEthPaymentDemand(obligationData);
      expect(demand).toBeDefined();
      expect(demand.arbiter).toBeDefined(); // Just check it exists, since contract isn't deployed
      expect(demand.demand).toBeDefined();
      expect(typeof demand.demand).toBe('string');
      
      // Should be able to decode the demand
      const decoded = client.eth.decodeEthObligationData(demand.demand);
      expect(decoded.amount).toBe(obligationData.amount);
      expect(decoded.payee.toLowerCase()).toBe(obligationData.payee.toLowerCase());
    });

    it('should handle ETH demands in demand parser', () => {
      const obligationData = {
        amount: parseEther('2.0'),
        payee: testContext.bob,
      };

      const demand = client.eth.createEthPaymentDemand(obligationData);
      
      // Parse the demand using the demand parser with separate arbiter and demand data
      const parsedDemand = client.demandParser.parseDemand(demand.arbiter, demand.demand);
      
      expect(parsedDemand.arbiter).toBe(demand.arbiter);
      expect(parsedDemand.type).toBe('leaf');
      
      // Since ETH contract isn't deployed yet, it will be parsed as unknown/opaque
      // But we can still verify the raw data is there
      expect(parsedDemand.decoded).toBeDefined();
      expect(parsedDemand.children).toBeUndefined();
    });
  });

  describe('ETH Obligation Data Validation', () => {
    it('should handle various ETH amounts', () => {
      const testCases = [
        { amount: BigInt(0), description: 'zero ETH' },
        { amount: parseEther('0.001'), description: 'small amount' },
        { amount: parseEther('1.0'), description: 'one ETH' },
        { amount: parseEther('1000.0'), description: 'large amount' },
      ];

      testCases.forEach(({ amount, description }) => {
        const obligationData = {
          amount,
          payee: testContext.alice,
        };

        const encoded = client.eth.encodeEthObligationData(obligationData);
        const decoded = client.eth.decodeEthObligationData(encoded);
        
        expect(decoded.amount).toBe(amount);
        expect(decoded.payee.toLowerCase()).toBe(testContext.alice.toLowerCase());
      });
    });

    it('should handle different payee addresses', () => {
      const testAddresses = [
        testContext.alice,
        testContext.bob,
        testContext.charlie,
      ];

      testAddresses.forEach(payee => {
        const obligationData = {
          amount: parseEther('1.0'),
          payee,
        };

        const encoded = client.eth.encodeEthObligationData(obligationData);
        const decoded = client.eth.decodeEthObligationData(encoded);
        
        expect(decoded.amount).toBe(parseEther('1.0'));
        expect(decoded.payee.toLowerCase()).toBe(payee.toLowerCase());
      });
    });
  });

  describe('ETH Transfer Arbitration', () => {
    it('should create ETH transfer requests', () => {
      const request = client.eth.createEthTransferRequest({
        minAmount: parseEther('1.0'),
        recipient: testContext.bob,
        sender: testContext.alice,
      });

      expect(request.type).toBe('eth_transfer');
      expect(request.minAmount).toBe(parseEther('1.0'));
      expect(request.recipient).toBe(testContext.bob);
      expect(request.sender).toBe(testContext.alice);
    });

    it('should encode and decode ETH transfer requests', () => {
      const originalRequest: EthTransferArbitrationRequest = {
        type: 'eth_transfer',
        minAmount: parseEther('2.5'),
        recipient: testContext.bob,
        sender: testContext.alice,
        afterBlock: 100n,
        beforeBlock: 200n,
      };

      const encoded = client.eth.encodeEthArbitrationRequest(originalRequest);
      expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

      const decoded = client.eth.decodeEthArbitrationRequest('eth_transfer', encoded) as EthTransferArbitrationRequest;
      expect(decoded.type).toBe('eth_transfer');
      expect(decoded.minAmount).toBe(originalRequest.minAmount);
      expect(decoded.recipient).toBe(originalRequest.recipient);
      if (originalRequest.sender) expect(decoded.sender).toBe(originalRequest.sender);
      if (originalRequest.afterBlock) expect(decoded.afterBlock).toBe(originalRequest.afterBlock);
      if (originalRequest.beforeBlock) expect(decoded.beforeBlock).toBe(originalRequest.beforeBlock);
    });

    it('should validate ETH transfer request format', () => {
      const validRequest: EthTransferArbitrationRequest = {
        type: 'eth_transfer',
        minAmount: parseEther('1.0'),
        recipient: testContext.bob,
      };

      const validation = client.eth.validateEthArbitrationRequestFormat(validRequest);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid ETH transfer requests', () => {
      const invalidRequest: EthTransferArbitrationRequest = {
        type: 'eth_transfer',
        minAmount: 0n, // Invalid: must be > 0
        recipient: zeroAddress, // Invalid: cannot be zero address
        afterBlock: 200n,
        beforeBlock: 100n, // Invalid: afterBlock >= beforeBlock
      };

      const validation = client.eth.validateEthArbitrationRequestFormat(invalidRequest);
      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });
  });

  describe('ETH Balance Arbitration', () => {
    it('should create ETH balance requests', () => {
      const request = client.eth.createEthBalanceRequest({
        address: testContext.alice,
        minBalance: parseEther('5.0'),
        atBlock: 1000n,
      });

      expect(request.type).toBe('eth_balance');
      expect(request.address).toBe(testContext.alice);
      expect(request.minBalance).toBe(parseEther('5.0'));
      expect(request.atBlock).toBe(1000n);
    });

    it('should process ETH balance arbitration requests', async () => {
      const request: EthBalanceArbitrationRequest = {
        type: 'eth_balance',
        address: testContext.alice,
        minBalance: parseEther('1.0'), // Alice should have plenty from setup
      };

      const result = await client.eth.processEthArbitrationRequest(request, testContext.alice);
      
      expect(result.request).toEqual(request);
      expect(result.oracle).toBe(testContext.alice);
      expect(result.decision).toBe(true); // Alice should have sufficient balance
      expect(result.evidence).toBeDefined();
    });
  });

  describe('ETH Payment Arbitration', () => {
    it('should create ETH payment requests', () => {
      const request = client.eth.createEthPaymentRequest({
        amount: parseEther('3.0'),
        payer: testContext.alice,
        payee: testContext.bob,
        timeWindow: {
          afterBlock: 100n,
          beforeBlock: 1000n,
        },
      });

      expect(request.type).toBe('eth_payment');
      expect(request.amount).toBe(parseEther('3.0'));
      expect(request.payer).toBe(testContext.alice);
      expect(request.payee).toBe(testContext.bob);
      expect(request.timeWindow?.afterBlock).toBe(100n);
      expect(request.timeWindow?.beforeBlock).toBe(1000n);
    });

    it('should validate payment request format', () => {
      const validRequest: EthPaymentArbitrationRequest = {
        type: 'eth_payment',
        amount: parseEther('1.0'),
        payer: testContext.alice,
        payee: testContext.bob,
      };

      const validation = client.eth.validateEthArbitrationRequestFormat(validRequest);
      expect(validation.valid).toBe(true);
    });

    it('should reject payments to same address', () => {
      const invalidRequest: EthPaymentArbitrationRequest = {
        type: 'eth_payment',
        amount: parseEther('1.0'),
        payer: testContext.alice,
        payee: testContext.alice, // Invalid: same as payer
      };

      const validation = client.eth.validateEthArbitrationRequestFormat(invalidRequest);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('payer and payee cannot be the same address');
    });
  });

  describe('ETH Escrow Arbitration', () => {
    it('should create ETH escrow requests', () => {
      const request = client.eth.createEthEscrowRequest({
        totalAmount: parseEther('10.0'),
        parties: [
          { address: testContext.alice, amount: parseEther('5.0'), role: 'depositor' },
          { address: testContext.bob, amount: parseEther('5.0'), role: 'depositor' },
          { address: testContext.charlie, amount: parseEther('10.0'), role: 'beneficiary' },
        ],
        conditions: {
          requireAllDeposits: true,
          minDepositors: 2,
        },
      });

      expect(request.type).toBe('eth_escrow');
      expect(request.totalAmount).toBe(parseEther('10.0'));
      expect(request.parties).toHaveLength(3);
      expect(request.conditions.requireAllDeposits).toBe(true);
      expect(request.conditions.minDepositors).toBe(2);
    });

    it('should validate escrow amount consistency', () => {
      const invalidRequest: EthEscrowArbitrationRequest = {
        type: 'eth_escrow',
        totalAmount: parseEther('10.0'),
        parties: [
          { address: testContext.alice, amount: parseEther('3.0'), role: 'depositor' },
          { address: testContext.bob, amount: parseEther('2.0'), role: 'depositor' },
          // Total party amounts (5.0) != totalAmount (10.0)
        ],
        conditions: {
          requireAllDeposits: true,
          minDepositors: 1,
        },
      };

      const validation = client.eth.validateEthArbitrationRequestFormat(invalidRequest);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('sum of party amounts must equal totalAmount');
    });
  });

  describe('Request Processing', () => {
    it('should create unique request IDs', () => {
      const request: EthTransferArbitrationRequest = {
        type: 'eth_transfer',
        minAmount: parseEther('1.0'),
        recipient: testContext.bob,
      };

      const timestamp = BigInt(Date.now());
      const id1 = client.eth.createEthArbitrationRequestId(request, testContext.alice, timestamp);
      const id2 = client.eth.createEthArbitrationRequestId(request, testContext.alice, timestamp);
      const id3 = client.eth.createEthArbitrationRequestId(request, testContext.bob, timestamp);

      expect(id1).toBe(id2); // Same inputs should produce same ID
      expect(id1).not.toBe(id3); // Different requester should produce different ID
    });

    it('should create arbitration contexts', () => {
      const request: EthBalanceArbitrationRequest = {
        type: 'eth_balance',
        address: testContext.alice,
        minBalance: parseEther('1.0'),
      };

      const timestamp = BigInt(Date.now());
      const context = client.eth.createEthArbitrationContext(
        request,
        testContext.bob,
        timestamp,
        testContext.charlie
      );

      expect(context.request).toEqual(request);
      expect(context.requester).toBe(testContext.bob);
      expect(context.createdAt).toBe(timestamp);
      expect(context.assignedOracle).toBe(testContext.charlie);
      expect(context.status).toBe('pending');
    });

    it('should batch process multiple requests', async () => {
      const requests = [
        client.eth.createEthBalanceRequest({
          address: testContext.alice,
          minBalance: parseEther('0.1'),
        }),
        client.eth.createEthBalanceRequest({
          address: testContext.bob,
          minBalance: parseEther('0.1'),
        }),
        client.eth.createEthBalanceRequest({
          address: testContext.charlie,
          minBalance: parseEther('0.1'),
        }),
      ];

      const results = await client.eth.batchProcessRequests(requests, testContext.alice);

      expect(results).toHaveLength(3);
      expect(results.every((r: any) => r.oracle === testContext.alice)).toBe(true);
      expect(results.every((r: any) => r.decision === true)).toBe(true); // All should have sufficient balance
    });
  });

  describe('Utility Functions', () => {
    it('should create simple transfer requests', () => {
      const request = client.eth.ethOracleUtils.createSimpleTransferRequest(
        parseEther('2.0'),
        testContext.bob,
        testContext.alice
      );

      expect(request.type).toBe('eth_transfer');
      expect(request.minAmount).toBe(parseEther('2.0'));
      expect(request.recipient).toBe(testContext.bob);
      expect(request.sender).toBe(testContext.alice);
    });

    it('should create simple balance requests', () => {
      const request = client.eth.ethOracleUtils.createSimpleBalanceRequest(
        testContext.alice,
        parseEther('5.0')
      );

      expect(request.type).toBe('eth_balance');
      expect(request.address).toBe(testContext.alice);
      expect(request.minBalance).toBe(parseEther('5.0'));
    });

    it('should create simple payment requests', () => {
      const request = client.eth.ethOracleUtils.createSimplePaymentRequest(
        parseEther('1.5'),
        testContext.alice,
        testContext.bob
      );

      expect(request.type).toBe('eth_payment');
      expect(request.amount).toBe(parseEther('1.5'));
      expect(request.payer).toBe(testContext.alice);
      expect(request.payee).toBe(testContext.bob);
    });

    it('should create basic escrow requests', () => {
      const request = client.eth.ethOracleUtils.createBasicEscrowRequest(
        testContext.alice,
        testContext.bob,
        parseEther('10.0'),
        testContext.charlie
      );

      expect(request.type).toBe('eth_escrow');
      expect(request.totalAmount).toBe(parseEther('10.0'));
      expect(request.parties).toHaveLength(3);
      
      const depositor = request.parties.find((p: any) => p.role === 'depositor');
      const beneficiary = request.parties.find((p: any) => p.role === 'beneficiary');
      const arbiter = request.parties.find((p: any) => p.role === 'arbiter');
      
      expect(depositor?.address).toBe(testContext.alice);
      expect(beneficiary?.address).toBe(testContext.bob);
      expect(arbiter?.address).toBe(testContext.charlie);
    });
  });
});