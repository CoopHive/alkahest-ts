import {
  createWalletClient,
  decodeAbiParameters,
  http,
  parseAbiItem,
  parseAbiParameters,
  parseEventLogs,
  publicActions,
  type Account,
  type Chain,
} from "viem";

import { abi as iEasAbi } from "./contracts/IEAS";
import { abi as iErc20Abi } from "./contracts/IERC20";
import { abi as erc20PaymentObligationAbi } from "./contracts/ERC20PaymentObligation";
import { abi as erc20BarterUtilsAbi } from "./contracts/ERC20BarterUtils";
import { abi as erc721BarterUtilsAbi } from "./contracts/ERC721BarterUtils";
import { abi as erc1155BarterUtilsAbi } from "./contracts/ERC1155BarterUtils";
import { abi as tokenBundleBarterUtilsAbi } from "./contracts/TokenBundleBarterUtils";

export const contractAddresses: Record<
  string,
  {
    eas: `0x${string}`;
    easSchemaRegistry: `0x${string}`;
    erc20PaymentObligation: `0x${string}`;
    erc20PaymentFulfillmentArbiter: `0x${string}`;
    erc20BarterUtils: `0x${string}`;
    erc721BarterUtils: `0x${string}`;
    erc1155BarterUtils: `0x${string}`;
    tokenBundleBarterUtils: `0x${string}`;
    usdc: `0x${string}`;
  }
> = {
  "Base Sepolia": {
    eas: "0x4200000000000000000000000000000000000021" as const,
    easSchemaRegistry: "0x4200000000000000000000000000000000000020" as const,
    erc20PaymentObligation:
      "0x702fab66515b3313dFd41E7CE70C2aF0033E2356" as const,
    erc20PaymentFulfillmentArbiter:
      "0xF2C2705F8aD552aCA7e8d4d5d33b9E6f91636cfA" as const,
    erc20BarterUtils: "0xdF3eA58dceCbF2cb58b2b020e700c2E85ae2C4e6" as const,
    erc721BarterUtils: "0xC801A1DD4E11EC6d0f36Fa39c3A31e61D39e27F9" as const,
    erc1155BarterUtils: "0xe45f7E15A86015098f72f5B1179b3130B4480E3b" as const,
    tokenBundleBarterUtils:
      "0x5cB936d0f508C69DE4860f54f2c02d6b5aBCfb3d" as const,
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as const,
  },
};

const supportedChains = ["Base Sepolia"];

export const makeClient = (account: Account, chain: Chain) => {
  if (!supportedChains.includes(chain.name)) {
    throw new Error("unsupported chain");
  }

  const viemClient = createWalletClient({
    chain,
    transport: http(),
    account,
  }).extend(publicActions);

  const getAttestationFromTxHash = async (hash: `0x${string}`) => {
    const tx = await viemClient.waitForTransactionReceipt({ hash });
    return parseEventLogs({
      abi: iEasAbi.abi,
      eventName: "Attested",
      logs: tx.logs,
    })[0].args;
  };

  return {
    // ERC20 Functions
    buyErc20ForErc20WithPermit: async (
      bid: { token: `0x${string}`; amount: bigint },
      ask: { token: `0x${string}`; amount: bigint },
      permit: {
        deadline: bigint;
        v: number;
        r: `0x${string}`;
        s: `0x${string}`;
      },
      expiration: bigint = 0n,
    ) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyErc20ForErc20",
        args: [
          bid.token,
          bid.amount,
          ask.token,
          ask.amount,
          expiration,
          permit.v,
          permit.r,
          permit.s,
        ],
      });
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },

    // ERC721 Functions
    buyErc721ForErc721: async (
      bid: { token: `0x${string}`; tokenId: bigint },
      ask: { token: `0x${string}`; tokenId: bigint },
      expiration: bigint = 0n,
    ) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "buyErc721ForErc721",
        args: [bid.token, bid.tokenId, ask.token, ask.tokenId, expiration],
      });
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },

    payErc721ForErc721: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForErc721",
        args: [buyAttestation],
      });
      const tx = await viemClient.waitForTransactionReceipt({ hash });
      return { hash };
    },

    // ERC1155 Functions
    buyErc1155ForErc1155: async (
      bid: { token: `0x${string}`; tokenId: bigint; amount: bigint },
      ask: { token: `0x${string}`; tokenId: bigint; amount: bigint },
      expiration: bigint = 0n,
    ) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "buyErc1155ForErc1155",
        args: [
          bid.token,
          bid.tokenId,
          bid.amount,
          ask.token,
          ask.tokenId,
          ask.amount,
          expiration,
        ],
      });
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },

    payErc1155ForErc1155: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForErc1155",
        args: [buyAttestation],
      });
      const tx = await viemClient.waitForTransactionReceipt({ hash });
      return { hash };
    },

    // Token Bundle Functions
    buyBundleForBundle: async (
      bid: {
        erc20Tokens: readonly `0x${string}`[];
        erc20Amounts: readonly bigint[];
        erc721Tokens: readonly `0x${string}`[];
        erc721TokenIds: readonly bigint[];
        erc1155Tokens: readonly `0x${string}`[];
        erc1155TokenIds: readonly bigint[];
        erc1155Amounts: readonly bigint[];
      },
      ask: {
        erc20Tokens: readonly `0x${string}`[];
        erc20Amounts: readonly bigint[];
        erc721Tokens: readonly `0x${string}`[];
        erc721TokenIds: readonly bigint[];
        erc1155Tokens: readonly `0x${string}`[];
        erc1155TokenIds: readonly bigint[];
        erc1155Amounts: readonly bigint[];
      },
      permits: Array<{
        deadline: bigint;
        v: number;
        r: `0x${string}`;
        s: `0x${string}`;
      }>,
      expiration: bigint = 0n,
    ) => {
      const bidData = {
        ...bid,
        arbiter: contractAddresses[chain.name]
          .tokenBundleBarterUtils as `0x${string}`,
        demand: "0x" as `0x${string}`, // This will be encoded by the contract
      };

      const askData = {
        ...ask,
        payee: account.address as `0x${string}`,
      };

      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].tokenBundleBarterUtils,
        abi: tokenBundleBarterUtilsAbi.abi,
        functionName: "permitAndEscrowBundleForBundle",
        args: [
          bidData,
          askData,
          expiration,
          permits.map((p) => ({
            v: p.v,
            r: p.r,
            s: p.s,
            deadline: p.deadline,
          })),
        ],
      });
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },

    payBundleForBundle: async (
      buyAttestation: `0x${string}`,
      permits: Array<{
        deadline: bigint;
        v: number;
        r: `0x${string}`;
        s: `0x${string}`;
      }>,
    ) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].tokenBundleBarterUtils,
        abi: tokenBundleBarterUtilsAbi.abi,
        functionName: "permitAndPayBundleForBundle",
        args: [
          buyAttestation,
          permits.map((p) => ({
            v: p.v,
            r: p.r,
            s: p.s,
            deadline: p.deadline,
          })),
        ],
      });
      const tx = await viemClient.waitForTransactionReceipt({ hash });
      return { hash };
    },

    // Helper Functions
    waitForFulfillment: async (
      buyAttestation: `0x${string}`,
      fromBlock?: bigint,
      toBlock?: bigint,
    ): Promise<{
      payment?: `0x${string}` | undefined;
      fulfillment?: `0x${string}` | undefined;
      fulfiller?: `0x${string}` | undefined;
    }> => {
      const logs = await viemClient.getLogs({
        address: contractAddresses[chain.name].erc20PaymentObligation,
        event: parseAbiItem(
          "event PaymentClaimed(bytes32 indexed payment, bytes32 indexed fulfillment, address indexed fulfiller)",
        ),
        args: {
          payment: buyAttestation,
        },
        fromBlock,
        toBlock,
      });
      if (logs.length) {
        return logs[0].args;
      }

      return new Promise((resolve) => {
        const unwatch = viemClient.watchEvent({
          address: contractAddresses[chain.name].erc20PaymentObligation,
          event: parseAbiItem(
            "event PaymentClaimed(bytes32 indexed payment, bytes32 indexed fulfillment, address indexed fulfiller)",
          ),
          args: {
            payment: buyAttestation,
          },
          onLogs: (logs) => {
            unwatch();
            resolve(logs[0].args);
          },
        });
      });
    },
  };
};
