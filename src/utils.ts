import {
  parseEventLogs,
  type PublicActions,
  type WalletClient,
  type Transport,
} from "viem";
import { abi as iEasAbi } from "./contracts/IEAS";
import { type Account, type Chain } from "viem";
import type { ChainAddresses, TokenBundle, TokenBundleFlat } from "./types";
import { contractAddresses } from "./config";

import { abi as easAbi } from "./contracts/IEAS";

export type ViemClient = WalletClient<Transport, Chain, Account> &
  PublicActions;

export const getAttestation = async (
  viemClient: ViemClient,
  uid: `0x${string}`,
  addresses?: ChainAddresses,
) => {
  let easAddress =
    addresses?.eas ?? contractAddresses[viemClient.chain.name].eas;

  const attestation = await viemClient.readContract({
    address: easAddress,
    abi: easAbi.abi,
    functionName: "getAttestation",
    args: [uid],
  });
  return attestation;
};

export const getAttestedEventFromTxHash = async (
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

export const flattenTokenBundle = (bundle: TokenBundle): TokenBundleFlat => ({
  erc20Tokens: bundle.erc20s.map((x) => x.address),
  erc20Amounts: bundle.erc20s.map((x) => x.value),
  erc721Tokens: bundle.erc721s.map((x) => x.address),
  erc721TokenIds: bundle.erc721s.map((x) => x.id),
  erc1155Tokens: bundle.erc1155s.map((x) => x.address),
  erc1155TokenIds: bundle.erc1155s.map((x) => x.id),
  erc1155Amounts: bundle.erc1155s.map((x) => x.value),
});
