import {
  createWalletClient,
  decodeEventLog,
  http,
  parseAbi,
  parseAbiItem,
  parseEventLogs,
  publicActions,
  type Account,
  type Chain,
} from "viem";

import iEasAbi from "./contracts/IEAS.json";
import iErc20Abi from "./contracts/IERC20.json";
import erc20PaymentObligationAbi from "./contracts/ERC20PaymentObligation.json";
import erc20BarterUtilsAbi from "./contracts/ERC20BarterUtils.json";

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
      "0xc38a35f2605277C95C843fC5b9b8809009EcE44c" as const,
    erc20PaymentFulfillmentArbiter:
      "0x46b47c98853753abbb76B5979E0295830b2014B2" as const,
    erc20BarterUtils: "0xf108310c8b90E4E64A773fC1157F845e3CD2CAd2" as const,
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as const,
  },
};

// old base sepolia addresses (no events)
// erc20PaymentObligation: "0xdc1994888fB81D473B22b014CFCe7326846f3ca5" as const,
// erc20PaymentFulfillmentArbiter: "0x335988634e319fBea2b8d2850468e46dEFf0B40b" as const,
// erc20BarterUtils: "0xb3ad5A0A227D07f778154dD4CFc99A26d7091ab2" as const,

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
    const attestedLog = parseEventLogs({
      abi: iEasAbi.abi,
      eventName: "Attested",
      logs: tx.logs,
    })[0];

    return decodeEventLog({
      abi: parseAbi([
        "event Attested(address indexed recipient, address indexed attester, bytes32 uid, bytes32 indexed schemaUID)",
      ]),
      data: attestedLog.data,
      topics: attestedLog.topics,
    });
  };

  const makeErc20PaymentStatement = async (
    price: { token: `0x${string}`; amount: bigint },
    item: { arbiter: `0x${string}`; demand: `0x${string}` },
    fulfilling: `0x${string}`,
  ) => {
    const currentNonce = await viemClient.getTransactionCount({
      address: account.address,
    });

    // approve token
    const currentAllowance = (await viemClient.readContract({
      address: price.token,
      abi: iErc20Abi.abi,
      functionName: "allowance",
      args: [
        account.address,
        contractAddresses[chain.name].erc20PaymentObligation,
      ],
    })) as bigint;

    if (currentAllowance < price.amount) {
      const approveTx = await viemClient.writeContract({
        address: price.token,
        abi: iErc20Abi.abi,
        functionName: "approve",
        args: [
          contractAddresses[chain.name].erc20PaymentObligation,
          price.amount,
        ],
      });

      // Wait for approval to be confirmed
      await viemClient.waitForTransactionReceipt({ hash: approveTx });
    }

    // buy statement
    return await viemClient.writeContract({
      address: contractAddresses[chain.name].erc20PaymentObligation,
      nonce: currentNonce + 2,
      abi: erc20PaymentObligationAbi.abi,
      functionName: "makeStatement",
      args: [
        {
          token: price.token,
          amount: price.amount,
          arbiter: item.arbiter,
          demand: item.demand,
        },
        0,
        fulfilling,
      ],
    });
  };

  // alkahest client
  return {
    approvePayments: async (token: `0x${string}`, amount: bigint) => {
      const approveTx = await viemClient.writeContract({
        address: token,
        abi: iErc20Abi.abi,
        functionName: "approve",
        args: [contractAddresses[chain.name].erc20PaymentObligation, amount],
      });

      return await viemClient.waitForTransactionReceipt({ hash: approveTx });
    },
    buyWithErc20: async (
      price: { token: `0x${string}`; amount: bigint },
      item: { arbiter: `0x${string}`; demand: `0x${string}` },
    ) => {
      const hash = await makeErc20PaymentStatement(
        price,
        item,
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      );
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },
    waitForFulfillment: async (
      buyAttestation: `0x${string}`,
      fromBlock?: bigint,
      toBlock?: bigint,
    ) => {
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
        const data = decodeEventLog({
          abi: parseAbi([
            "event PaymentClaimed(bytes32 indexed payment, bytes32 indexed fulfillment, address indexed fulfiller)",
          ]),
          data: logs[0].data,
          topics: logs[0].topics,
        });
        return data;
      }

      const unwatch = viemClient.watchEvent({
        address: contractAddresses[chain.name].erc20PaymentObligation,
        event: parseAbiItem(
          "event PaymentClaimed(bytes32 indexed payment, bytes32 indexed fulfillment, address indexed fulfiller)",
        ),
        args: {
          payment: buyAttestation,
        },
        onLogs: (logs) => {
          const data = decodeEventLog({
            abi: parseAbi([
              "event PaymentClaimed(bytes32 indexed payment, bytes32 indexed fulfillment, address indexed fulfiller)",
            ]),
            data: logs[0].data,
            topics: logs[0].topics,
          });
          unwatch();
          return data;
        },
      });
    },
    buyErc20ForErc20: async (
      bid: { token: `0x${string}`; amount: bigint },
      ask: { token: `0x${string}`; amount: bigint },
    ) => {
      const hash = await viemClient.writeContract({
        address: contractAddresses[chain.name].erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyErc20ForErc20",
        args: [bid.token, bid.amount, ask.token, ask.amount],
      });
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },
    payErc20ForErc20: async (buyAttestation: `0x${string}`) => {
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
