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
import { decodeAbiParameters, type Hex, hexToNumber, slice } from "viem";

import { abi as erc20BarterUtilsAbi } from "../contracts/ERC20BarterCrossToken";
import { abi as erc20EscrowAbi } from "../contracts/ERC20EscrowObligation";
import { abi as erc20PaymentAbi } from "../contracts/ERC20PaymentObligation";
import { abi as erc20Abi } from "../contracts/ERC20Permit";
import { abi as easAbi } from "../contracts/IEAS";

export const makeErc20Client = (viemClient: ViemClient) => {
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
    // Approval functions
    approve: async (token: Erc20, spender: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: token.address,
        abi: erc20Abi.abi,
        functionName: "approve",
        args: [spender, token.value],
      });
      return hash;
    },

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

    collectExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[viemClient.chain.name].erc20EscrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "collectExpired",
        args: [buyAttestation],
      });
      return hash;
    },

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

    permitAndpayErc20ForErc20: async (buyAttestation: `0x${string}`) => {
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
