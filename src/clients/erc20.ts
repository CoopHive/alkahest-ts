import {
  flattenTokenBundle,
  getAttestationFromTxHash,
  type ViemClient,
} from "../utils";
import { contractAddresses } from "../config";
import type {
  Demand,
  Eip2612Props,
  Erc1155,
  Erc20,
  Erc721,
  TokenBundle,
} from "../types";
import {
  decodeAbiParameters,
  hexToNumber,
  parseAbiParameters,
  slice,
} from "viem";

import { abi as erc20BarterUtilsAbi } from "../contracts/ERC20BarterCrossToken";
import { abi as erc20EscrowAbi } from "../contracts/ERC20EscrowObligation";
import { abi as erc20PaymentAbi } from "../contracts/ERC20PaymentObligation";
import { abi as erc20Abi } from "../contracts/ERC20Permit";
import { abi as easAbi } from "../contracts/IEAS";

export const makeErc20Client = (viemClient: ViemClient) => {
  /**
   * Signs an EIP-2612 permit for token approval
   * @param props - Permit properties including token details and approval parameters
   * @returns Signature components (r, s, v)
   * @internal
   */
  const signPermit = async (props: Eip2612Props) => {
    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
    const domainData = {
      name: props.erc20Name,
      /** We assume 1 if permit version is not specified */
      version: props.permitVersion ?? "1",
      chainId: props.chainId,
      verifyingContract: props.contractAddress,
    };

    const message = {
      owner: props.ownerAddress,
      spender: props.spenderAddress,
      value: props.value,
      nonce: props.nonce,
      deadline: props.deadline,
    };

    const signature = await viemClient.signTypedData({
      account: props.ownerAddress,
      message,
      domain: domainData,
      primaryType: "Permit",
      types,
    });

    const [r, s, v] = [
      slice(signature, 0, 32),
      slice(signature, 32, 64),
      slice(signature, 64, 65),
    ];

    return { r, s, v: hexToNumber(v) };
  };

  return {
    decodeEscrowStatement: (statementData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters(
          "(address token, uint256 amount, address arbiter, bytes demand)",
        ),
        statementData,
      )[0];
    },
    decodePaymentStatement: (statementData: `0x${string}`) => {
      return decodeAbiParameters(
        parseAbiParameters("(address token, uint256 amount, address payee)"),
        statementData,
      )[0];
    },
    /**
     * Approves the spender to use tokens
     * @param token - Token details including address and amount
     * @param spender - Address to approve
     * @returns Transaction hash
     */
    approve: async (token: Erc20, spender: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: token.address,
        abi: erc20Abi.abi,
        functionName: "approve",
        args: [spender, token.value],
      });
      return hash;
    },

    /**
     * Approves spender if current allowance is less than required amount
     * @param token - Token details including address and amount
     * @param spender - Address to approve
     * @returns Transaction hash or null if approval not needed
     */
    approveIfLess: async (token: Erc20, spender: `0x${string}`) => {
      const currentAllowance = await viemClient.readContract({
        address: token.address,
        abi: erc20Abi.abi,
        functionName: "allowance",
        args: [viemClient.account.address, spender],
      });

      if (currentAllowance < token.value) {
        return viemClient.writeContract({
          address: token.address,
          abi: erc20Abi.abi,
          functionName: "approve",
          args: [spender, token.value],
        });
      }
      return null;
    },

    /**
     * Collects payment from an escrow after fulfillment
     * @param buyAttestation - UID of the buy attestation
     * @param fulfillment - UID of the fulfillment attestation
     * @returns Transaction hash
     */
    collectPayment: async (
      buyAttestation: `0x${string}`,
      fulfillment: `0x${string}`,
    ) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "collectPayment",
        args: [buyAttestation, fulfillment],
      });
      return hash;
    },

    /**
     * Collects expired escrow funds
     * @param buyAttestation - UID of the expired buy attestation
     * @returns Transaction hash
     */
    collectExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "collectExpired",
        args: [buyAttestation],
      });
      return hash;
    },

    /**
     * Creates an escrow with ERC20 tokens for a custom demand
     * @param price - ERC20 token details for payment
     * @param item - Custom demand details including arbiter and demand data
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyWithErc20(
     *   { address: usdc, value: 10n },
     *   { arbiter: arbitratorAddress, demand: encodedDemand },
     *   0n,
     * );
     * ```
     */
    buyWithErc20: async (price: Erc20, item: Demand, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "makeStatement",
        args: [
          {
            token: price.address,
            amount: price.value,
            arbiter: item.arbiter,
            demand: item.demand,
          },
          expiration,
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow with ERC20 tokens using EIP-2612 permit
     * @param price - ERC20 token details for payment
     * @param item - Custom demand details including arbiter and demand data
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.permitAndBuyWithErc20(
     *   { address: usdc, value: 10n },
     *   { arbiter: arbitratorAddress, demand: encodedDemand },
     *   0n,
     * );
     * ```
     */
    permitAndBuyWithErc20: async (
      price: Erc20,
      item: Demand,
      expiration: bigint,
    ) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        value: price.value,
        nonce: await viemClient.readContract({
          address: price.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: price.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: price.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyWithErc20",
        args: [
          price.address,
          price.value,
          item.arbiter,
          item.demand,
          expiration,
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates a direct payment obligation with ERC20 tokens
     * @param price - ERC20 token details for payment
     * @param payee - Address to receive the payment
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc20.payWithErc20(
     *   { address: usdc, value: 10n },
     *   receiverAddress,
     * );
     * ```
     */
    payWithErc20: async (price: Erc20, payee: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address:
          contractAddresses[viemClient.chain.name].erc20PaymentObligation,
        abi: erc20PaymentAbi.abi,
        functionName: "makeStatement",
        args: [
          {
            token: price.address,
            amount: price.value,
            payee,
          },
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates a direct payment obligation with ERC20 tokens using EIP-2612 permit
     * @param price - ERC20 token details for payment
     * @param payee - Address to receive the payment
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc20.permitAndPayWithErc20(
     *   { address: usdc, value: 10n },
     *   receiverAddress,
     * );
     * ```
     */
    permitAndPayWithErc20: async (price: Erc20, payee: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20PaymentObligation,
        value: price.value,
        nonce: await viemClient.readContract({
          address: price.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: price.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: price.address,
        chainId: viemClient.chain.id,
      });
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayWithErc20",
        args: [
          price.address,
          price.value,
          payee,
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for ERC20 tokens
     * @param bid - ERC20 token offered
     * @param ask - ERC20 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyErc20ForErc20(
     *   { address: usdc, value: 10n },
     *   { address: eurc, value: 10n },
     *   0n,
     * );
     * ```
     */
    buyErc20ForErc20: async (bid: Erc20, ask: Erc20, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyErc20ForErc20",
        args: [bid.address, bid.value, ask.address, ask.value, expiration],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for ERC20 tokens using EIP-2612 permit
     * @param bid - ERC20 token offered
     * @param ask - ERC20 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.permitAndBuyErc20ForErc20(
     *   { address: usdc, value: 10n },
     *   { address: eurc, value: 10n },
     *   0n,
     * );
     * ```
     */
    permitAndBuyErc20ForErc20: async (
      bid: Erc20,
      ask: Erc20,
      expiration: bigint,
    ) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        value: bid.value,
        nonce: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: bid.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyErc20ForErc20",
        args: [
          bid.address,
          bid.value,
          ask.address,
          ask.value,
          expiration,
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC20 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc20.payErc20ForErc20(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc20ForErc20: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc20",
        args: [buyAttestation],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates a direct payment obligation with ERC20 tokens using EIP-2612 permit
     * @param price - ERC20 token details for payment
     * @param payee - Address to receive the payment
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc20.permitAndPayWithErc20(
     *   { address: usdc, value: 10n },
     *   receiverAddress,
     * );
     * ```
     */
    permitAndPayErc20ForErc20: async (buyAttestation: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;

      const buyAttestationData = await viemClient.readContract({
        address: contractAddresses[viemClient.chain.name].eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });
      const buyAttestationStatementData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              { name: "token", type: "address" },
              { name: "amount", type: "uint256" },
              { name: "arbiter", type: "address" },
              { name: "demand", type: "bytes" },
            ],
          },
        ],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              { name: "token", type: "address" },
              { name: "amount", type: "uint256" },
              { name: "payee", type: "address" },
            ],
          },
        ],
        buyAttestationStatementData.demand,
      )[0];

      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20PaymentObligation,
        value: demandData.amount,
        nonce: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: demandData.token,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForErc20",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for an ERC721 token
     * @param bid - ERC20 token offered
     * @param ask - ERC721 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyErc721WithErc20(
     *   { address: usdc, value: 10n },
     *   { address: nft, id: 1n },
     *   0n,
     * );
     * ```
     */
    buyErc721WithErc20: async (bid: Erc20, ask: Erc721, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyErc721WithErc20",
        args: [bid.address, bid.value, ask.address, ask.id, expiration],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for an ERC721 token using EIP-2612 permit
     * @param bid - ERC20 token offered
     * @param ask - ERC721 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     */
    permitAndbuyErc721WithErc20: async (
      bid: Erc20,
      ask: Erc721,
      expiration: bigint,
    ) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        value: bid.value,
        nonce: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: bid.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyErc721WithErc20",
        args: [
          bid.address,
          bid.value,
          ask.address,
          ask.id,
          expiration,
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC721 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    payErc20ForErc721: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc721",
        args: [buyAttestation],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC721 trade using EIP-2612 permit
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    permitAndPayErc20ForErc721: async (buyAttestation: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const buyAttestationData = await viemClient.readContract({
        address: contractAddresses[viemClient.chain.name].eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });
      const buyAttestationStatementData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              { name: "token", type: "address" },
              { name: "tokenId", type: "uint256" },
              { name: "amount", type: "uint256" },
              { name: "arbiter", type: "address" },
              { name: "demand", type: "bytes" },
            ],
          },
        ],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              { name: "token", type: "address" },
              { name: "amount", type: "uint256" },
              { name: "payee", type: "address" },
            ],
          },
        ],
        buyAttestationStatementData.demand,
      )[0];
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        value: demandData.amount,
        nonce: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: demandData.token,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForErc721",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for ERC1155 tokens
     * @param bid - ERC20 token offered
     * @param ask - ERC1155 token requested including token ID and amount
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyErc1155WithErc20(
     *   { address: usdc, value: 10n },
     *   { address: token, id: 1n, value: 5n },
     *   0n,
     * );
     * ```
     */
    buyErc1155WithErc20: async (
      bid: Erc20,
      ask: Erc1155,
      expiration: bigint,
    ) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyErc1155WithErc20",
        args: [
          bid.address,
          bid.value,
          ask.address,
          ask.id,
          ask.value,
          expiration,
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for ERC1155 tokens using EIP-2612 permit
     * @param bid - ERC20 token offered
     * @param ask - ERC1155 token requested including token ID and amount
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     */
    permitAndBuyErc1155WithErc20: async (
      bid: Erc20,
      ask: Erc1155,
      expiration: bigint,
    ) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        value: bid.value,
        nonce: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: bid.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyErc1155WithErc20",
        args: [
          bid.address,
          bid.value,
          ask.address,
          ask.id,
          ask.value,
          expiration,
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC1155 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    payErc20ForErc1155: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc1155",
        args: [buyAttestation],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC1155 trade using EIP-2612 permit
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    permitAndPayErc20ForErc1155: async (buyAttestation: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const buyAttestationData = await viemClient.readContract({
        address: contractAddresses[viemClient.chain.name].eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });
      const buyAttestationStatementData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              { name: "token", type: "address" },
              { name: "tokenId", type: "uint256" },
              { name: "amount", type: "uint256" },
              { name: "arbiter", type: "address" },
              { name: "demand", type: "bytes" },
            ],
          },
        ],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              { name: "token", type: "address" },
              { name: "amount", type: "uint256" },
              { name: "payee", type: "address" },
            ],
          },
        ],
        buyAttestationStatementData.demand,
      )[0];
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        value: demandData.amount,
        nonce: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: demandData.token,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForErc1155",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for a bundle of tokens
     * @param bid - ERC20 token offered
     * @param bundle - Bundle of tokens requested (ERC20, ERC721, ERC1155)
     * @param payee - Address to receive the payment
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyBundleWithErc20(
     *   { address: usdc, value: 10n },
     *   {
     *     erc20: [{ address: dai, value: 5n }],
     *     erc721: [{ address: nft, id: 1n }],
     *     erc1155: [{ address: token, id: 1n, value: 3n }],
     *   },
     *   receiverAddress,
     *   0n,
     * );
     * ```
     */
    buyBundleWithErc20: async (
      bid: Erc20,
      bundle: TokenBundle,
      payee: `0x${string}`,
      expiration: bigint,
    ) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyBundleWithErc20",
        args: [
          bid.address,
          bid.value,
          { ...flattenTokenBundle(bundle), payee },
          expiration,
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for a bundle of tokens using EIP-2612 permit
     * @param bid - ERC20 token offered
     * @param bundle - Bundle of tokens requested (ERC20, ERC721, ERC1155)
     * @param payee - Address to receive the payment
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     */
    permitAndBuyBundleWithErc20: async (
      bid: Erc20,
      bundle: TokenBundle,
      payee: `0x${string}`,
      expiration: bigint,
    ) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        value: bid.value,
        nonce: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: bid.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyBundleWithErc20",
        args: [
          bid.address,
          bid.value,
          { ...flattenTokenBundle(bundle), payee },
          expiration,
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-bundle trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    payErc20ForBundle: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForBundle",
        args: [buyAttestation],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-bundle trade using EIP-2612 permit
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    permitAndPayErc20ForBundle: async (buyAttestation: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const buyAttestationData = await viemClient.readContract({
        address: contractAddresses[viemClient.chain.name].eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });
      const buyAttestationStatementData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              {
                name: "erc20Tokens",
                type: "address[]",
                internalType: "address[]",
              },
              {
                name: "erc20Amounts",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "erc721Tokens",
                type: "address[]",
                internalType: "address[]",
              },
              {
                name: "erc721TokenIds",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "erc1155Tokens",
                type: "address[]",
                internalType: "address[]",
              },
              {
                name: "erc1155TokenIds",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "erc1155Amounts",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              { name: "arbiter", type: "address", internalType: "address" },
              { name: "demand", type: "bytes", internalType: "bytes" },
            ],
          },
        ],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              { name: "token", type: "address" },
              { name: "amount", type: "uint256" },
              { name: "payee", type: "address" },
            ],
          },
        ],
        buyAttestationStatementData.demand,
      )[0];
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress:
          contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        value: demandData.amount,
        nonce: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: demandData.token,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForBundle",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestationFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
