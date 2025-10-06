import {
  getAttestation,
  getAttestedEventFromTxHash,
  type ViemClient,
} from "../utils";
import type {
  ChainAddresses,
  Demand,
  EthArbitrationRequest,
  EthArbitrationResult,
  EthArbitrationContext,
  EthTransferArbitrationRequest,
  EthBalanceArbitrationRequest,
  EthPaymentArbitrationRequest,
  EthEscrowArbitrationRequest,
} from "../types";
import {
  decodeAbiParameters,
  encodeAbiParameters,
  getAbiItem,
  parseAbiParameter,
  parseAbiParameters,
  keccak256,
  formatEther,
  type Address,
  type Hash,
  type PublicClient,
  type Transaction,
} from "viem";

import { abi as ethPaymentAbi } from "../contracts/ETHPaymentObligation";
import { abi as easAbi } from "../contracts/IEAS";

// Extract ObligationData struct ABI from contract ABI at module initialization
const ethPaymentDoObligationFunction = getAbiItem({
  abi: ethPaymentAbi.abi,
  name: 'doObligation'
});

if (!ethPaymentDoObligationFunction || ethPaymentDoObligationFunction.type !== 'function') {
  throw new Error('doObligation function not found in ETHPaymentObligation ABI');
}

const ethObligationDataAbi = ethPaymentDoObligationFunction.inputs[0];

if (!ethObligationDataAbi || ethObligationDataAbi.type !== 'tuple') {
  throw new Error('ObligationData parameter not found or not a tuple in doObligation function');
}

/**
 * ETH Payment Obligation Data structure
 */
export type EthObligationData = {
  amount: bigint;
  payee: Address;
};

/**
 * Creates an ETH payment client for interacting with ETH payment obligations
 */
export const makeEthClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  /**
   * Encode ETH obligation data for contract interaction
   */
  const encodeEthObligationData = (data: EthObligationData): `0x${string}` => {
    return encodeAbiParameters(
      ethObligationDataAbi.components!,
      [data.amount, data.payee]
    );
  };

  /**
   * Decode ETH obligation data from encoded bytes
   */
  const decodeEthObligationData = (data: `0x${string}`): EthObligationData => {
    const [amount, payee] = decodeAbiParameters(
      ethObligationDataAbi.components!,
      data
    );
    return {
      amount: amount as bigint,
      payee: payee as Address,
    };
  };

  /**
   * Create an ETH payment obligation
   */
  const doEthPaymentObligation = async (
    data: EthObligationData,
    expirationTime?: bigint,
    refUID?: `0x${string}`,
  ) => {
    const encodedData = encodeEthObligationData(data);
    
    if (expirationTime !== undefined || refUID !== undefined) {
      return await viemClient.writeContract({
        address: addresses.ethPaymentObligation,
        abi: ethPaymentAbi.abi,
        functionName: "doObligationRaw",
        args: [
          encodedData,
          expirationTime || BigInt(0),
          refUID || "0x0000000000000000000000000000000000000000000000000000000000000000"
        ],
        account: viemClient.account,
        chain: viemClient.chain,
      });
    }

    return await viemClient.writeContract({
      address: addresses.ethPaymentObligation,
      abi: ethPaymentAbi.abi,
      functionName: "doObligation",
      args: [data],
      value: data.amount,
      account: viemClient.account,
      chain: viemClient.chain,
    });
  };

  /**
   * Create an ETH payment obligation for another payer
   */
  const doEthPaymentObligationFor = async (
    data: EthObligationData,
    payer: Address,
    recipient: Address,
    expirationTime?: bigint,
    refUID?: `0x${string}`,
  ) => {
    const encodedData = encodeEthObligationData(data);
    
    if (expirationTime !== undefined || refUID !== undefined) {
      return await viemClient.writeContract({
        address: addresses.ethPaymentObligation,
        abi: ethPaymentAbi.abi,
        functionName: "doObligationForRaw",
        args: [
          encodedData,
          expirationTime || BigInt(0),
          payer,
          recipient,
          refUID || "0x0000000000000000000000000000000000000000000000000000000000000000"
        ],
        value: data.amount,
        account: viemClient.account,
        chain: viemClient.chain,
      });
    }

    return await viemClient.writeContract({
      address: addresses.ethPaymentObligation,
      abi: ethPaymentAbi.abi,
      functionName: "doObligationFor",
      args: [data, payer, recipient],
      value: data.amount,
      account: viemClient.account,
      chain: viemClient.chain,
    });
  };

  /**
   * Get ETH obligation data from attestation UID
   */
  const getEthObligationData = async (uid: `0x${string}`): Promise<EthObligationData> => {
    const result = await viemClient.readContract({
      address: addresses.ethPaymentObligation,
      abi: ethPaymentAbi.abi,
      functionName: "getObligationData",
      args: [uid],
    });

    // The contract returns a tuple structure that matches EthObligationData
    return result as EthObligationData;
  };

  /**
   * Check if an ETH payment obligation is valid/fulfilled
   */
  const checkEthObligation = async (uid: `0x${string}`): Promise<boolean> => {
    const attestation = await getAttestation(viemClient, uid, addresses);
    
    return await viemClient.readContract({
      address: addresses.ethPaymentObligation,
      abi: ethPaymentAbi.abi,
      functionName: "checkObligation",
      args: [attestation],
    }) as boolean;
  };

  /**
   * Get ETH payment obligation details from transaction hash
   */
  const getEthObligationFromTxHash = async (txHash: `0x${string}`) => {
    const event = await getAttestedEventFromTxHash(viemClient, txHash);
    if (!event) {
      throw new Error("No Attested event found in transaction");
    }

    const obligationData = await getEthObligationData(event.uid!);
    
    return {
      uid: event.uid!,
      schema: event.schema!,
      recipient: event.recipient!,
      attester: event.attester!,
      data: obligationData,
    };
  };

  /**
   * Create an ETH payment demand for use with arbiters
   */
  const createEthPaymentDemand = (data: EthObligationData): Demand => {
    return {
      arbiter: addresses.ethPaymentObligation,
      demand: encodeEthObligationData(data),
    };
  };

  // =====================================
  // ETH Oracle Arbitration Functionality
  // =====================================

  /**
   * Creates a unique request ID for an ETH arbitration request
   */
  const createEthArbitrationRequestId = (
    request: EthArbitrationRequest,
    requester: Address,
    timestamp: bigint
  ): Hash => {
    const { encodeAbiParameters, parseAbiParameters, keccak256 } = require('viem');
    const requestData = encodeAbiParameters(
      parseAbiParameters('string, address, uint256, bytes'),
      [
        request.type,
        requester,
        timestamp,
        encodeEthArbitrationRequest(request)
      ]
    );
    return keccak256(requestData);
  };

  /**
   * Encodes an ETH arbitration request for transmission
   */
  const encodeEthArbitrationRequest = (request: EthArbitrationRequest): `0x${string}` => {
    const { encodeAbiParameters, parseAbiParameters } = require('viem');
    
    switch (request.type) {
      case 'eth_transfer':
        return encodeAbiParameters(
          parseAbiParameters('uint256, address, address, uint256, uint256, bytes32'),
          [
            request.minAmount,
            request.recipient,
            request.sender || '0x0000000000000000000000000000000000000000',
            request.afterBlock || 0n,
            request.beforeBlock || 0n,
            request.txHash || '0x0000000000000000000000000000000000000000000000000000000000000000'
          ]
        );
      
      case 'eth_balance':
        return encodeAbiParameters(
          parseAbiParameters('address, uint256, uint256'),
          [
            request.address,
            request.minBalance,
            request.atBlock || 0n
          ]
        );
      
      case 'eth_payment':
        return encodeAbiParameters(
          parseAbiParameters('uint256, address, address, bytes32, uint256, uint256'),
          [
            request.amount,
            request.payer,
            request.payee,
            request.paymentTx || '0x0000000000000000000000000000000000000000000000000000000000000000',
            request.blockRange?.fromBlock || 0n,
            request.blockRange?.toBlock || 0n
          ]
        );
      
      case 'eth_escrow':
        // Encode parties as arrays
        const addresses = request.parties.map(p => p.address);
        const amounts = request.parties.map(p => p.amount);
        const roles = request.parties.map(p => p.role === 'depositor' ? 0 : p.role === 'beneficiary' ? 1 : 2);
        
        return encodeAbiParameters(
          parseAbiParameters('uint256, address[], uint256[], uint8[], bool, uint256, uint256, uint256'),
          [
            request.totalAmount,
            addresses,
            amounts,
            roles,
            request.conditions.requireAllDeposits,
            BigInt(request.conditions.minDepositors),
            request.conditions.depositDeadline || 0n,
            request.conditions.claimDeadline || 0n
          ]
        );
      
      default:
        throw new Error(`Unknown ETH arbitration request type: ${(request as any).type}`);
    }
  };

  /**
   * Decodes an ETH arbitration request from encoded data
   */
  const decodeEthArbitrationRequest = (requestType: string, encodedData: `0x${string}`): EthArbitrationRequest => {
    const { decodeAbiParameters, parseAbiParameters } = require('viem');
    
    switch (requestType) {
      case 'eth_transfer': {
        const [minAmount, recipient, sender, afterBlock, beforeBlock, txHash] = decodeAbiParameters(
          parseAbiParameters('uint256, address, address, uint256, uint256, bytes32'),
          encodedData
        );
        return {
          type: 'eth_transfer',
          minAmount: minAmount as bigint,
          recipient: recipient as Address,
          sender: sender === '0x0000000000000000000000000000000000000000' ? undefined : sender as Address,
          afterBlock: afterBlock === 0n ? undefined : afterBlock as bigint,
          beforeBlock: beforeBlock === 0n ? undefined : beforeBlock as bigint,
          txHash: txHash === '0x0000000000000000000000000000000000000000000000000000000000000000' ? undefined : txHash as Hash
        };
      }
      
      case 'eth_balance': {
        const [address, minBalance, atBlock] = decodeAbiParameters(
          parseAbiParameters('address, uint256, uint256'),
          encodedData
        );
        return {
          type: 'eth_balance',
          address: address as Address,
          minBalance: minBalance as bigint,
          atBlock: atBlock === 0n ? undefined : atBlock as bigint
        };
      }
      
      case 'eth_payment': {
        const [amount, payer, payee, paymentTx, fromBlock, toBlock] = decodeAbiParameters(
          parseAbiParameters('uint256, address, address, bytes32, uint256, uint256'),
          encodedData
        );
        return {
          type: 'eth_payment',
          amount: amount as bigint,
          payer: payer as Address,
          payee: payee as Address,
          paymentTx: paymentTx === '0x0000000000000000000000000000000000000000000000000000000000000000' ? undefined : paymentTx as Hash,
          blockRange: fromBlock === 0n && toBlock === 0n ? undefined : {
            fromBlock: fromBlock as bigint,
            toBlock: toBlock as bigint
          }
        };
      }
      
      case 'eth_escrow': {
        const [totalAmount, addresses, amounts, roles, requireAllDeposits, minDepositors, depositDeadline, claimDeadline] = decodeAbiParameters(
          parseAbiParameters('uint256, address[], uint256[], uint8[], bool, uint256, uint256, uint256'),
          encodedData
        );
        
        const parties = (addresses as Address[]).map((addr, i) => ({
          address: addr,
          amount: (amounts as bigint[])[i],
          role: (roles as number[])[i] === 0 ? 'depositor' as const : 
                (roles as number[])[i] === 1 ? 'beneficiary' as const : 'arbiter' as const
        }));
        
        return {
          type: 'eth_escrow',
          totalAmount: totalAmount as bigint,
          parties,
          conditions: {
            requireAllDeposits: requireAllDeposits as boolean,
            minDepositors: Number(minDepositors),
            depositDeadline: depositDeadline === 0n ? undefined : depositDeadline as bigint,
            claimDeadline: claimDeadline === 0n ? undefined : claimDeadline as bigint
          }
        };
      }
      
      default:
        throw new Error(`Unknown ETH arbitration request type: ${requestType}`);
    }
  };

  /**
   * Creates an arbitration context for tracking
   */
  const createEthArbitrationContext = (
    request: EthArbitrationRequest,
    requester: Address,
    timestamp: bigint,
    assignedOracle?: Address
  ): EthArbitrationContext => {
    return {
      request,
      requester,
      createdAt: timestamp,
      assignedOracle,
      status: 'pending',
      requestId: createEthArbitrationRequestId(request, requester, timestamp)
    };
  };

  /**
   * Validates an ETH arbitration request format
   */
  const validateEthArbitrationRequest_Format = (request: EthArbitrationRequest): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Common validations
    if (!request.type) {
      errors.push('Request type is required');
    }
    
    switch (request.type) {
      case 'eth_transfer':
        if (!request.recipient || request.recipient === '0x0000000000000000000000000000000000000000') {
          errors.push('Recipient address is required for transfer requests');
        }
        if (!request.minAmount || request.minAmount <= 0n) {
          errors.push('Minimum amount must be greater than 0');
        }
        if (request.afterBlock && request.beforeBlock && request.afterBlock >= request.beforeBlock) {
          errors.push('afterBlock must be less than beforeBlock');
        }
        break;
        
      case 'eth_balance':
        if (!request.address || request.address === '0x0000000000000000000000000000000000000000') {
          errors.push('Address is required for balance requests');
        }
        if (!request.minBalance || request.minBalance < 0n) {
          errors.push('Minimum balance must be non-negative');
        }
        break;
        
      case 'eth_payment':
        if (!request.payer || request.payer === '0x0000000000000000000000000000000000000000') {
          errors.push('Payer address is required for payment requests');
        }
        if (!request.payee || request.payee === '0x0000000000000000000000000000000000000000') {
          errors.push('Payee address is required for payment requests');
        }
        if (request.payer === request.payee) {
          errors.push('payer and payee cannot be the same address');
        }
        if (!request.amount || request.amount <= 0n) {
          errors.push('Amount must be greater than 0');
        }
        if (request.blockRange && request.blockRange.fromBlock >= request.blockRange.toBlock) {
          errors.push('fromBlock must be less than toBlock in blockRange');
        }
        break;
        
      case 'eth_escrow':
        if (!request.totalAmount || request.totalAmount <= 0n) {
          errors.push('Total amount must be greater than 0');
        }
        if (!request.parties || request.parties.length === 0) {
          errors.push('At least one party is required for escrow requests');
        }
        if (request.parties) {
          const depositors = request.parties.filter(p => p.role === 'depositor');
          if (depositors.length < request.conditions.minDepositors) {
            errors.push(`Not enough depositors: ${depositors.length} < ${request.conditions.minDepositors}`);
          }
          
          const totalPartyAmount = request.parties.reduce((sum, p) => sum + p.amount, 0n);
          if (totalPartyAmount !== request.totalAmount) {
            errors.push(`sum of party amounts must equal totalAmount`);
          }
        }
        break;
        
      default:
        errors.push(`Unknown request type: ${(request as any).type}`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  };

  /**
   * Creates an ETH arbitration result
   */
  const createEthArbitrationResult = (
    request: EthArbitrationRequest,
    decision: boolean,
    oracle: Address,
    blockNumber: bigint,
    timestamp: bigint,
    evidence?: EthArbitrationResult['evidence']
  ): EthArbitrationResult => {
    return {
      request,
      decision,
      oracle,
      blockNumber,
      timestamp,
      evidence
    };
  };

  // ETH Oracle Request Creators
  const createEthTransferRequest = (request: Omit<EthTransferArbitrationRequest, 'type'>): EthTransferArbitrationRequest => {
    return {
      type: 'eth_transfer',
      ...request,
    };
  };

  const createEthBalanceRequest = (request: Omit<EthBalanceArbitrationRequest, 'type'>): EthBalanceArbitrationRequest => {
    return {
      type: 'eth_balance',
      ...request,
    };
  };

  const createEthPaymentRequest = (request: Omit<EthPaymentArbitrationRequest, 'type'>): EthPaymentArbitrationRequest => {
    return {
      type: 'eth_payment',
      ...request,
    };
  };

  const createEthEscrowRequest = (request: Omit<EthEscrowArbitrationRequest, 'type'>): EthEscrowArbitrationRequest => {
    return {
      type: 'eth_escrow',
      ...request,
    };
  };

  // ETH Oracle Utility Functions
  const ethOracleUtils = {
    /**
     * Creates a simple ETH transfer request
     */
    createSimpleTransferRequest: (
      minAmount: bigint,
      recipient: Address,
      sender?: Address
    ): EthTransferArbitrationRequest => {
      return {
        type: 'eth_transfer',
        minAmount,
        recipient,
        sender,
      };
    },

    /**
     * Creates a simple balance check request
     */
    createSimpleBalanceRequest: (
      address: Address,
      minBalance: bigint
    ): EthBalanceArbitrationRequest => {
      return {
        type: 'eth_balance',
        address,
        minBalance,
      };
    },

    /**
     * Creates a simple payment verification request
     */
    createSimplePaymentRequest: (
      amount: bigint,
      payer: Address,
      payee: Address,
      paymentTx?: Hash
    ): EthPaymentArbitrationRequest => {
      return {
        type: 'eth_payment',
        amount,
        payer,
        payee,
        paymentTx,
      };
    },

    /**
     * Creates a basic escrow request
     */
    createBasicEscrowRequest: (
      depositor: Address,
      beneficiary: Address,
      amount: bigint,
      arbiter?: Address
    ): EthEscrowArbitrationRequest => {
      const parties: EthEscrowArbitrationRequest['parties'] = [
        { address: depositor, amount, role: 'depositor' },
        { address: beneficiary, amount, role: 'beneficiary' },
      ];

      if (arbiter) {
        parties.push({ address: arbiter, amount: 0n, role: 'arbiter' });
      }

      return {
        type: 'eth_escrow',
        totalAmount: amount,
        parties,
        conditions: {
          requireAllDeposits: true,
          minDepositors: 1,
        },
      };
    },
  };

  // =====================================
  // ETH Validation Functions
  // =====================================

  /**
   * Validates an ETH transfer arbitration request
   */
  const validateEthTransfer = async (
    request: EthTransferArbitrationRequest
  ): Promise<{ valid: boolean; evidence: any; reasoning: string }> => {
    try {
      const currentBlock = await viemClient.getBlockNumber();
      
      // If specific tx hash is provided, validate that transaction
      if (request.txHash) {
        const tx = await viemClient.getTransaction({ hash: request.txHash });
        
        // Check if transaction meets criteria
        const validAmount = tx.value >= request.minAmount;
        const validRecipient = tx.to?.toLowerCase() === request.recipient.toLowerCase();
        const validSender = !request.sender || tx.from.toLowerCase() === request.sender.toLowerCase();
        const validBlock = (!request.afterBlock || tx.blockNumber! > request.afterBlock) &&
                          (!request.beforeBlock || tx.blockNumber! < request.beforeBlock);
        
        const valid = validAmount && validRecipient && validSender && validBlock;
        
        return {
          valid,
          evidence: {
            transaction: {
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: tx.value,
              blockNumber: tx.blockNumber,
            }
          },
          reasoning: valid 
            ? `Transaction ${tx.hash} transferred ${formatEther(tx.value)} ETH from ${tx.from} to ${tx.to} meeting all criteria`
            : `Transaction ${tx.hash} failed validation: amount=${validAmount}, recipient=${validRecipient}, sender=${validSender}, block=${validBlock}`
        };
      }
      
      // Otherwise, check if recipient received sufficient ETH
      const recipientBalance = await viemClient.getBalance({ address: request.recipient });
      
      // For transfers without specific tx, we can only verify current balance meets minimum
      const valid = recipientBalance >= request.minAmount;
      
      return {
        valid,
        evidence: {
          balance: {
            address: request.recipient,
            balance: recipientBalance,
            blockNumber: currentBlock,
          }
        },
        reasoning: valid
          ? `Recipient ${request.recipient} has balance ${formatEther(recipientBalance)} ETH, meeting minimum ${formatEther(request.minAmount)} ETH`
          : `Recipient ${request.recipient} has balance ${formatEther(recipientBalance)} ETH, below required ${formatEther(request.minAmount)} ETH`
      };
      
    } catch (error) {
      return {
        valid: false,
        evidence: { error: error instanceof Error ? error.message : 'Unknown error' },
        reasoning: `Validation failed due to error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  /**
   * Validates an ETH balance arbitration request
   */
  const validateEthBalance = async (
    request: EthBalanceArbitrationRequest
  ): Promise<{ valid: boolean; evidence: any; reasoning: string }> => {
    try {
      const blockNumber = request.atBlock || await viemClient.getBlockNumber();
      
      const balance = await viemClient.getBalance({ 
        address: request.address,
        blockTag: request.atBlock ? request.atBlock : 'latest'
      });
      
      const valid = balance >= request.minBalance;
      
      return {
        valid,
        evidence: {
          balance: {
            address: request.address,
            balance,
            blockNumber,
            minBalance: request.minBalance,
          }
        },
        reasoning: valid
          ? `Address ${request.address} has balance ${formatEther(balance)} ETH at block ${blockNumber}, meeting minimum ${formatEther(request.minBalance)} ETH`
          : `Address ${request.address} has balance ${formatEther(balance)} ETH at block ${blockNumber}, below required ${formatEther(request.minBalance)} ETH`
      };
      
    } catch (error) {
      return {
        valid: false,
        evidence: { error: error instanceof Error ? error.message : 'Unknown error' },
        reasoning: `Balance check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  /**
   * Validates an ETH payment arbitration request
   */
  const validateEthPayment = async (
    request: EthPaymentArbitrationRequest
  ): Promise<{ valid: boolean; evidence: any; reasoning: string }> => {
    try {
      const currentBlock = await viemClient.getBlockNumber();
      
      // If specific payment tx is provided, validate it
      if (request.paymentTx) {
        const tx = await viemClient.getTransaction({ hash: request.paymentTx });
        const receipt = await viemClient.getTransactionReceipt({ hash: request.paymentTx });
        
        const validAmount = tx.value === request.amount;
        const validPayer = tx.from.toLowerCase() === request.payer.toLowerCase();
        const validPayee = tx.to?.toLowerCase() === request.payee.toLowerCase();
        const validSuccess = receipt.status === 'success';
        
        // Check block range if specified
        let validBlockRange = true;
        if (request.blockRange) {
          if (tx.blockNumber! < request.blockRange.fromBlock || tx.blockNumber! > request.blockRange.toBlock) {
            validBlockRange = false;
          }
        }
        
        const valid = validAmount && validPayer && validPayee && validSuccess && validBlockRange;
        
        return {
          valid,
          evidence: {
            transaction: {
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: tx.value,
              blockNumber: tx.blockNumber,
              status: receipt.status,
            }
          },
          reasoning: valid
            ? `Payment transaction ${tx.hash} successfully transferred exact amount ${formatEther(tx.value)} ETH from ${tx.from} to ${tx.to}`
            : `Payment validation failed: amount=${validAmount}, payer=${validPayer}, payee=${validPayee}, success=${validSuccess}, blockRange=${validBlockRange}`
        };
      }
      
      // Without specific tx, we can only check if payee received sufficient funds
      const payeeBalance = await viemClient.getBalance({ address: request.payee });
      
      return {
        valid: payeeBalance >= request.amount,
        evidence: {
          balance: {
            address: request.payee,
            balance: payeeBalance,
            blockNumber: currentBlock,
          }
        },
        reasoning: `Payee balance check: ${request.payee} has ${formatEther(payeeBalance)} ETH (required: ${formatEther(request.amount)} ETH)`
      };
      
    } catch (error) {
      return {
        valid: false,
        evidence: { error: error instanceof Error ? error.message : 'Unknown error' },
        reasoning: `Payment validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  /**
   * Validates an ETH escrow arbitration request
   */
  const validateEthEscrow = async (
    request: EthEscrowArbitrationRequest
  ): Promise<{ valid: boolean; evidence: any; reasoning: string }> => {
    try {
      const currentBlock = await viemClient.getBlockNumber();
      
      // Check each party's contributions
      const partyValidations = await Promise.all(
        request.parties.map(async (party) => {
          const balance = await viemClient.getBalance({ address: party.address });
          
          // For depositors, check if they have sufficient funds
          // For beneficiaries, check if they received expected amounts
          let valid = false;
          
          if (party.role === 'depositor') {
            // Check if depositor has/had sufficient funds
            valid = balance >= party.amount;
          } else if (party.role === 'beneficiary') {
            // Check if beneficiary received expected amount
            valid = balance >= party.amount;
          } else if (party.role === 'arbiter') {
            // Arbiters just need to exist
            valid = balance >= 0n;
          }
          
          return {
            party,
            balance,
            valid,
          };
        })
      );
      
      // Apply escrow conditions
      const conditions = request.conditions;
      let escrowValid = true;
      
      if (conditions.requireAllDeposits) {
        const allDeposited = partyValidations
          .filter(p => p.party.role === 'depositor')
          .every(p => p.valid);
        escrowValid = escrowValid && allDeposited;
      }
      
      if (conditions.minDepositors) {
        const validDepositors = partyValidations
          .filter(p => p.party.role === 'depositor' && p.valid)
          .length;
        escrowValid = escrowValid && validDepositors >= conditions.minDepositors;
      }
      
      return {
        valid: escrowValid,
        evidence: {
          parties: partyValidations.map(p => ({
            address: p.party.address,
            role: p.party.role,
            requiredAmount: p.party.amount,
            actualBalance: p.balance,
            valid: p.valid,
          })),
          totalAmount: request.totalAmount,
          blockNumber: currentBlock,
        },
        reasoning: escrowValid
          ? `Escrow conditions satisfied: ${partyValidations.filter(p => p.valid).length}/${partyValidations.length} parties meet requirements`
          : `Escrow conditions not satisfied: ${partyValidations.filter(p => !p.valid).length}/${partyValidations.length} parties failed requirements`
      };
      
    } catch (error) {
      return {
        valid: false,
        evidence: { error: error instanceof Error ? error.message : 'Unknown error' },
        reasoning: `Escrow validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  /**
   * Main validation function that routes to appropriate validator
   */
  const validateEthArbitrationRequest = async (
    request: EthArbitrationRequest
  ): Promise<{ valid: boolean; evidence: any; reasoning: string }> => {
    switch (request.type) {
      case 'eth_transfer':
        return validateEthTransfer(request);
      case 'eth_balance':
        return validateEthBalance(request);
      case 'eth_payment':
        return validateEthPayment(request);
      case 'eth_escrow':
        return validateEthEscrow(request);
      default:
        return {
          valid: false,
          evidence: { error: 'Unknown request type' },
          reasoning: `Unknown ETH arbitration request type: ${(request as any).type}`
        };
    }
  };

  /**
   * Processes an ETH arbitration request (oracle side)
   */
  const processEthArbitrationRequest = async (
    request: EthArbitrationRequest,
    oracle: Address
  ): Promise<EthArbitrationResult> => {
    // First validate the request format
    const formatValidation = validateEthArbitrationRequest_Format(request);
    if (!formatValidation.valid) {
      const currentBlock = await viemClient.getBlockNumber();
      const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));
      
      return createEthArbitrationResult(
        request,
        false,
        oracle,
        currentBlock,
        currentTimestamp,
        {
          reasoning: `Request format invalid: ${formatValidation.errors.join(', ')}`,
        }
      );
    }

    // Validate the actual ETH conditions
    const validation = await validateEthArbitrationRequest(request);
    const currentBlock = await viemClient.getBlockNumber();
    const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));

    return createEthArbitrationResult(
      request,
      validation.valid,
      oracle,
      currentBlock,
      currentTimestamp,
      {
        ...validation.evidence,
        reasoning: validation.reasoning,
      }
    );
  };

  /**
   * Batch process multiple ETH arbitration requests
   */
  const batchProcessRequests = async (
    requests: EthArbitrationRequest[],
    oracle: Address
  ): Promise<EthArbitrationResult[]> => {
    // Process requests in parallel for efficiency
    const results = await Promise.all(
      requests.map(request => processEthArbitrationRequest(request, oracle))
    );
    
    return results;
  };

  return {
    // Core payment functions
    encodeEthObligationData,
    decodeEthObligationData,
    doEthPaymentObligation,
    doEthPaymentObligationFor,
    getEthObligationData,
    checkEthObligation,
    getEthObligationFromTxHash,
    createEthPaymentDemand,
    
    // Oracle arbitration functions
    createEthArbitrationRequestId,
    encodeEthArbitrationRequest,
    decodeEthArbitrationRequest,
    createEthArbitrationContext,
    validateEthArbitrationRequest,
    validateEthArbitrationRequest_Format,
    createEthArbitrationResult,
    createEthTransferRequest,
    createEthBalanceRequest,
    createEthPaymentRequest,
    createEthEscrowRequest,
    batchProcessRequests,
    ethOracleUtils,
    
    // Validation functions
    validateEthTransfer,
    validateEthBalance,
    validateEthPayment,
    validateEthEscrow,
    processEthArbitrationRequest,
    
    // Aliases for convenience
    payEth: doEthPaymentObligation,
    payEthFor: doEthPaymentObligationFor,
    getEthPayment: getEthObligationData,
    checkEthPayment: checkEthObligation,
    validateEthArbitrationRequestFormat: validateEthArbitrationRequest_Format,
    
    // ABI for contract interactions
    abi: ethPaymentAbi.abi,
  };
};

export type EthClient = ReturnType<typeof makeEthClient>;