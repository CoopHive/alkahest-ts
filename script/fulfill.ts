import { createWalletClient, nonceManager, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { contractAddresses, makeClient } from "../src";

import { abi as jobResultObligationAbi } from "../src/contracts/JobResultObligation";

const clientSeller = makeClient(
  privateKeyToAccount(process.env["PRIVKEY_BOB"] as `0x${string}`, {
    nonceManager,
  }),
  baseSepolia,
  process.env["RPC_URL"] as string,
);

// make a Viem client
const viemClient = createWalletClient({
  chain: baseSepolia,
  account: privateKeyToAccount(process.env["PRIVKEY_BOB"] as `0x${string}`, {
    nonceManager, // automatic nonce management
  }),
  transport: http(process.env["RPC_URL"] as string),
}).extend(publicActions);
const resultHash = await viemClient.writeContract({
  address: contractAddresses["Base Sepolia"].jobResultObligation,
  abi: jobResultObligationAbi.abi,
  functionName: "makeStatement",
  args: [
    { result: "HELLO WORLD" },
    "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32 0
  ],
});
console.log(resultHash);
const resultStatement = await clientSeller.getAttestationFromTxHash(resultHash);
console.log(resultStatement);

const collection = await clientSeller.erc20.collectPayment(
  "0x94f9c98200af5336c19da47613094fec9534ee02674fae9ca5b2b90d2c28ffd4",
  resultStatement.uid,
);

console.log(collection);
