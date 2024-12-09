import {
  createWalletClient,
  decodeEventLog,
  http,
  parseAbi,
  parseEventLogs,
  publicActions,
  type Account,
  type Chain,
} from "viem";

import erc20PaymentObligationAbi from "./contracts/ERC20PaymentObligation.json";
import iErc20Abi from "./contracts/IERC20.json";
import iEas from "./contracts/IEAS.json";

export const contractAddresses: Record<
  string,
  {
    erc20PaymentObligation: `0x${string}`;
    usdc: `0x${string}`;
  }
> = {
  "Base Sepolia": {
    erc20PaymentObligation:
      "0xdc1994888fB81D473B22b014CFCe7326846f3ca5" as const,
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as const,
  },
};

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
      abi: iEas.abi,
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
    // approve token
    await viemClient.writeContract({
      address: price.token,
      abi: iErc20Abi.abi,
      functionName: "approve",
      args: [
        contractAddresses[chain.name].erc20PaymentObligation,
        price.amount,
      ],
    });

    // buy statement
    return await viemClient.writeContract({
      address: contractAddresses[chain.name].erc20PaymentObligation,
      nonce:
        (await viemClient.getTransactionCount({
          address: account.address,
        })) + 1,
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
    payFor: async (
      item: `0x${string}`,
      price: { token: `0x${string}`; amount: bigint },
    ) => {
      const hash = await makeErc20PaymentStatement(
        price,
        {
          arbiter: "0x0000000000000000000000000000000000000000",
          demand:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
        },
        item,
      );
      const attested = await getAttestationFromTxHash(hash);
      return { hash, attested };
    },
    buy: async (
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
  };
};
