import { privateKeyToAccount } from "viem/accounts";
import { contractAddresses, makeClient } from ".";
import { baseSepolia } from "viem/chains";

const client = makeClient(
  privateKeyToAccount(
    "0x9602eb5f82003cd0faa5eef377b6d417a84a1ab04f6ecc55ea0e13dd134c96de",
  ),
  baseSepolia,
);

console.log(
  await client.buy(
    { token: contractAddresses["Base Sepolia"].usdc, amount: 10n },
    { arbiter: "0x0000000000000000000000000000000000000000", demand: "0x" },
  ),
);
