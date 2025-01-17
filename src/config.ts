import type { ChainAddresses } from "./types";

export const contractAddresses: Record<string, ChainAddresses> = {
	"Base Sepolia": {
		eas: "0x4200000000000000000000000000000000000021",
		easSchemaRegistry: "0x4200000000000000000000000000000000000020",
		erc20EscrowObligation: "0x66F9e3Fa7CFc472fB61a3F61bE42558c80C0FC72",
		erc20PaymentObligation: "0x417b73fF013c5E47639816c037e89aE053FD4A63",
		// erc20PaymentFulfillmentArbiter: "0xF2C2705F8aD552aCA7e8d4d5d33b9E6f91636cfA",
		erc20BarterUtils: "0xE352c64993D891719873a36B4225e31085794fde",
		erc721EscrowObligation: "0x868e59ecd79067087Cac7447061b1436eD6C9417",
		erc721PaymentObligation: "0x0F13f5c62D88BE6C85205A1A010511BF54269615",
		erc721BarterUtils: "0xAfBaacEA69961C892797ceA7A8457dBA57568Ebb",
		erc1155EscrowObligation: "0x93B7D9cdD97887a8f7603c77F12938bf3d1331F6",
		erc1155PaymentObligation: "0x1395A7b129503E23eDAa7823b5F5994D65a26BF0",
		erc1155BarterUtils: "0x12D8bF4F01bF011859f6184ffDe3f01f4F568Fe8",
		tokenBundleEscrowObligation: "0x7cCE97b9552dFf0105eC96A46f5721764a24D9AC",
		tokenBundlePaymentObligation: "0x678f5601fe66485CEeD3d41D7385983881411c70",
		tokenBundleBarterUtils: "0x95E18d489c60404e6D659584f51457c3744ba8f8",
		attestationEscrowObligation: "0xD181642bccb8D74c18C15cCd308Bd5618F7dE528",
		attestationEscrowObligation2: "0xA4F18f0aa351DD2FF67CA29b1329bd21a9Ee0C92",
		attestationBarterUtils: "0x907b9cf8faA5d1cBF052bCE82DFA22eB8E1431c9",
		usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
		eurc: "0x808456652fdb597867f38412077A9182bf77359F",
	},
} as const;

export const supportedChains = ["Base Sepolia"];
