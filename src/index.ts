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

export const contractAddresses: Record<
  string,
  {
    eas: `0x${string}`;
    easSchemaRegistry: `0x${string}`;
    erc20PaymentObligation: `0x${string}`;
    erc20PaymentFulfillmentArbiter: `0x${string}`;
    erc20BarterUtils: `0x${string}`;
    usdc: `0x${string}`;
  }
> = {
  "Base Sepolia": {
    eas: "0x4200000000000000000000000000000000000021" as const,
    easSchemaRegistry: "0x4200000000000000000000000000000000000020" as const,
    erc20PaymentObligation:
      "0x9B09a8354AC84A34dd267c843d509e5E1343111f" as const,
    erc20PaymentFulfillmentArbiter:
      "0x308aDDd58832d16369054cC4d50f7bCF3899a3b4" as const,
    erc20BarterUtils: "0xaB1ACD30cAA43C5D8FBc180aDB0f6EC916A4af5F" as const,
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as const,
  },
};

// old base sepolia addresses (no events)
// erc20PaymentObligation: "0xdc1994888fB81D473B22b014CFCe7326846f3ca5" as const,
// erc20PaymentFulfillmentArbiter: "0x335988634e319fBea2b8d2850468e46dEFf0B40b" as const,
// erc20BarterUtils: "0xb3ad5A0A227D07f778154dD4CFc99A26d7091ab2" as const,

// (no makeFor)
// erc20PaymentObligation: "0xc38a35f2605277C95C843fC5b9b8809009EcE44c" as const,
// erc20PaymentFulfillmentArbiter: "0x46b47c98853753abbb76B5979E0295830b2014B2" as const,
// erc20BarterUtils: "0xf108310c8b90E4E64A773fC1157F845e3CD2CAd2" as const,

const supportedChains = ["Base Sepolia"];

export const makeClient = (account: Account, chain: Chain) => {
  // initialize viem client
  if (!supportedChains.includes(chain.name)) {
    throw new Error("unsupported chain");
  }

  const viemClient = createWalletClient({
    chain,
    transport: http(),
    account,
  }).extend(publicActions);

  // decode attestation from logs; result from simulation isn't reliable
  const getAttestationFromTxHash = async (hash: `0x${string}`) => {
    const tx = await viemClient.waitForTransactionReceipt({ hash });
    return parseEventLogs({
      abi: iEasAbi.abi,
      eventName: "Attested",
      logs: tx.logs,
    })[0].args;
  };

  const approveIfLess = async (
    token: `0x${string}`,
    amount: bigint,
    address: `0x${string}`,
  ) => {
    const currentAllowance = (await viemClient.readContract({
      address: token,
      abi: iErc20Abi.abi,
      functionName: "allowance",
      args: [account.address, address],
    })) as bigint;

    if (currentAllowance < amount) {
      const hash = await viemClient.writeContract({
        address: token,
        abi: iErc20Abi.abi,
        functionName: "approve",
        args: [contractAddresses[chain.name].erc20PaymentObligation, amount],
      });

      await viemClient.waitForTransactionReceipt({ hash });
    }
  };

  // alkahest client
  return {
    buyWithErc20: async (
      price: { token: `0x${string}`; amount: bigint },
      item: { arbiter: `0x${string}`; demand: `0x${string}` },
    ) => {
      await approveIfLess(
        price.token,
        price.amount,
        contractAddresses[chain.name].erc20PaymentObligation,
      );

      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc20PaymentObligation,
        abi: erc20PaymentObligationAbi.abi,
        functionName: "makeStatement",
        args: [
          {
            token: price.token,
            amount: price.amount,
            arbiter: item.arbiter,
            demand: item.demand,
          },
          0n,
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        ],
      });
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },
    claimErc20Payment: async (
      payment: `0x${string}`,
      fulfillment: `0x${string}`,
    ) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc20PaymentObligation,
        abi: erc20PaymentObligationAbi.abi,
        functionName: "collectPayment",
        args: [payment, fulfillment],
      });
      const tx = await viemClient.waitForTransactionReceipt({ hash });
      const claimedLog = parseEventLogs({
        abi: erc20PaymentObligationAbi.abi,
        eventName: "PaymentClaimed",
        logs: tx.logs,
      })[0];

      return { hash, claimed: claimedLog.args };
    },
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
    buyErc20ForErc20: async (
      bid: { token: `0x${string}`; amount: bigint },
      ask: { token: `0x${string}`; amount: bigint },
      expiration: bigint = 0n,
    ) => {
      await approveIfLess(
        bid.token,
        bid.amount,
        contractAddresses[chain.name].erc20BarterUtils,
      );
      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyErc20ForErc20",
        args: [bid.token, bid.amount, ask.token, ask.amount, expiration],
      });
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },
    payErc20ForErc20: async (buyAttestation: `0x${string}`) => {
      const buyAttestation_ = await viemClient.readContract({
        address: contractAddresses[chain.name].eas,
        abi: iEasAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });

      const [statementData] = decodeAbiParameters(
        parseAbiParameters(
          "(address token, uint256 amount, address arbiter, bytes demand)",
        ),
        buyAttestation_.data,
      );

      const [demandData] = decodeAbiParameters(
        parseAbiParameters("(address token, uint256 amount)"),
        statementData.demand,
      );

      await approveIfLess(
        demandData.token,
        demandData.amount,
        contractAddresses[chain.name].erc20BarterUtils,
      );

      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc20",
        args: [buyAttestation],
      });
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },
  };
};
