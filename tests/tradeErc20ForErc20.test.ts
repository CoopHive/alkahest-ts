import { expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { baseSepolia } from "viem/chains";

const usdc = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const eurc = "0x808456652fdb597867f38412077A9182bf77359F";

test("tradeErc20ForErc20", async () => {
  // create clients
  const clientBuyer = makeClient(
    privateKeyToAccount(process.env["PRIVKEY_ALICE"] as `0x${string}`, {
      nonceManager, // automatic nonce management
    }),
    baseSepolia,
    process.env["RPC_URL"] as string, // RPC url for Base Sepolia
  );
  const clientSeller = makeClient(
    privateKeyToAccount(process.env["PRIVKEY_BOB"] as `0x${string}`, {
      nonceManager,
    }),
    baseSepolia,
    process.env["RPC_URL"] as string,
  );

  // approve escrow contract to spend tokens
  const escrowApproval = await clientBuyer.erc20.approve(
    {
      address: usdc,
      value: 10n,
    },
    contractAddresses["Base Sepolia"].erc20EscrowObligation,
  );
  console.log(escrowApproval);
  expect(escrowApproval).toBeString();

  // deposit 10usdc into escrow, demanding 10eurc, with no expiration
  const escrow = await clientBuyer.erc20.buyErc20ForErc20(
    { address: usdc, value: 10n },
    { address: eurc, value: 10n },
    0n,
  );
  console.log(escrow);

  // approve payment contract to spend tokens
  const paymentApproval = await clientSeller.erc20.approve(
    {
      address: eurc,
      value: 10n,
    },
    contractAddresses["Base Sepolia"].erc20PaymentObligation,
  );
  console.log(paymentApproval);
  expect(paymentApproval).toBeString();

  // pay 10eurc for 10usdc (fulfill the buy order)
  const payment = await clientSeller.erc20.payErc20ForErc20(
    escrow.attested.uid,
  );
  console.log(payment);
});
