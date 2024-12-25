import {
  createWalletClient,
  http,
  publicActions,
  parseEventLogs,
  type PublicActions,
  type WalletClient,
  type Transport,
} from "viem";
import { abi as iEasAbi } from "./contracts/IEAS";
import { type Account, type Chain } from "viem";

export type ViemClient = WalletClient<Transport, Chain, Account> &
  PublicActions;

export const createViemClient = (account: Account, chain: Chain) => {
  return createWalletClient({
    chain,
    transport: http(),
    account,
  }).extend(publicActions);
};

export const getAttestationFromTxHash = async (
  client: ViemClient,
  hash: `0x${string}`,
) => {
  const tx = await client.waitForTransactionReceipt({ hash });
  return parseEventLogs({
    abi: iEasAbi.abi,
    eventName: "Attested",
    logs: tx.logs,
  })[0].args;
};
