import {
	createWalletClient,
	decodeAbiParameters,
	encodeAbiParameters,
	http,
	nonceManager,
	parseAbiItem,
	parseAbiParameters,
	publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { contractAddresses, makeClient } from "../src";

const usdc = contractAddresses["Base Sepolia"].usdc;

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

const baseDemand = encodeAbiParameters(parseAbiParameters("(string query)"), [
	{ query: "hello world" },
]);
const demand = encodeAbiParameters(
	parseAbiParameters(
		"(address creator, address baseArbiter, bytes baseDemand)",
	),
	[
		{
			creator: clientSeller.address,
			baseArbiter: contractAddresses["Base Sepolia"].trivialArbiter,
			baseDemand,
		},
	],
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

// make escrow with generic escrow function,
// passing in TrustedPartyArbiter's address and our custom demand,
// and no expiration
const escrow = await clientBuyer.erc20.buyWithErc20(
	{
		address: usdc,
		value: 10n,
	},
	{ arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter, demand },
	0n,
);
console.log(escrow);

const logs = await clientBuyer.waitForFulfillment(
	contractAddresses["Base Sepolia"].erc20EscrowObligation,
	escrow.attested.uid,
);

console.log(logs);
