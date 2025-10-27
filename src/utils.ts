import { type Account, type Chain, type PublicActions, parseEventLogs, type Transport, type WalletClient } from "viem";
import { contractAddresses } from "./config";
import { abi as easAbi, abi as iEasAbi } from "./contracts/IEAS";
import type { ChainAddresses, TokenBundle, TokenBundleFlat } from "./types";

export type ViemClient = WalletClient<Transport, Chain, Account> & PublicActions;

/**
 * Detect if the viem client is using WebSocket transport
 * @param viemClient - The viem client
 * @returns true if using WebSocket transport, false otherwise
 */
export const isWebSocketTransport = (viemClient: ViemClient): boolean => {
  // Check if the transport has subscription capabilities
  // WebSocket transports typically have a subscribe method
  const transport = viemClient.transport;
  return (
    transport.type === "webSocket" ||
    // Additional check for subscription capabilities
    (typeof transport === "object" && transport !== null && "subscribe" in transport)
  );
};

/**
 * Get optimal polling interval based on transport type
 * @param viemClient - The viem client
 * @param defaultInterval - Default polling interval for HTTP
 * @returns optimal polling interval or undefined for WebSocket
 */
export const getOptimalPollingInterval = (
  viemClient: ViemClient,
  defaultInterval: number = 1000,
): number | undefined => {
  // For WebSocket transports, return undefined to use subscription-based watching
  // For HTTP transports, return the polling interval
  return isWebSocketTransport(viemClient) ? undefined : defaultInterval;
};

export const getAttestation = async (
  viemClient: ViemClient,
  uid: `0x${string}`,
  addresses?: Pick<ChainAddresses, "eas">,
) => {
  const chainAddresses = contractAddresses[viemClient.chain.name];
  if (!chainAddresses) throw new Error(`No contract addresses found for chain ${viemClient.chain.name}`);
  const easAddress = addresses?.eas ?? chainAddresses.eas;

  const attestation = await viemClient.readContract({
    address: easAddress,
    abi: easAbi.abi,
    functionName: "getAttestation",
    args: [uid],
  });
  return attestation;
};

export const getAttestedEventFromTxHash = async (client: ViemClient, hash: `0x${string}`): Promise<any> => {
  let tx;
  try {
    tx = await client.waitForTransactionReceipt({ hash });
  } catch (error) {
    throw new Error(`Failed to get transaction receipt for ${hash}: ${error}`);
  }
  const events = parseEventLogs({
    abi: iEasAbi.abi,
    eventName: "Attested",
    logs: tx.logs,
  });

  if (events.length === 0 || !events[0]) {
    throw new Error(`No Attested event found in transaction ${hash}`);
  }

  return events[0].args;
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
