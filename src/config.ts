import type { ChainAddresses } from "./types";

export const contractAddresses: Record<string, ChainAddresses> = {
	"Base Sepolia": {
		eas: "0x4200000000000000000000000000000000000021",
		easSchemaRegistry: "0x4200000000000000000000000000000000000020",

		erc20BarterUtils: "0xeb7daF691b03A906c563c3aa7FD6b8eFef55D13f",
		erc20EscrowObligation: "0xa34CD115800aA79758Ee5A781a4A3C02915c8602",
		erc20PaymentObligation: "0x97128f9ea2cB1C1b49b778Db7df9fd921901B89c",

		erc721BarterUtils: "0xf6F3902bA8b2C45F0dde04EDA14D39045249d867",
		erc721EscrowObligation: "0x73BE84B7cfc60Cea4E953A20ABf138b08B718127",
		erc721PaymentObligation: "0x252424a080BA400196Bd3e7Aa7e2e8118e916bf7",

		erc1155BarterUtils: "0x628Be0Df39C73d257ee1e1909Bf820E4f586e1C0",
		erc1155EscrowObligation: "0x570272784A13477f599c6c98d047e3980f45C8e0",
		erc1155PaymentObligation: "0x418221e2C0426015f10f13d51B25177F1E839Aa0",

		tokenBundleBarterUtils: "0x013C2c98Be06b48f271BdF0469eFa6e89d37BA7A",
		tokenBundleEscrowObligation: "0xc282ec5E2585dc1696471adf4A9f5b3a151359c9",
		tokenBundlePaymentObligation: "0x797C365B6A1300c13001a6D0FDF2ea0684b5BCcD",

		attestationBarterUtils: "0x3C905a7121fb72a4D69Ca8860a93530A88E92f87",
		attestationEscrowObligation: "0x63E8031DA08f6852Abe7bDc4C056903C7863cb7c",
		attestationEscrowObligation2: "0x4200637A112ba709Fe4a5fe315128879a8Bf4082",

		stringObligation: "0xb4692f27f3Ef6968394F12eb5843e7C494a0Ed72",

		usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
		eurc: "0x808456652fdb597867f38412077A9182bf77359F",

		trustedPartyArbiter: "0x82FaE516dE4912C382FBF7D9D6d0194b7f532738",
		trivialArbiter: "0x8fdbf9C22Ce0B83aFEe8da63F14467663D150b5d",
		specificAttestationArbiter: "0x056034D1D432dD9eA0B7fC20A4375b3A54Ce2e48",
		trustedOracleArbiter: "0x8441e4c9eD25C1F2c4d7d191099B6726ADa2D517",
	},
} as const;

export const supportedChains = ["Base Sepolia", "anvil"];
