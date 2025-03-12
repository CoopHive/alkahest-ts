import type { ChainAddresses } from "./types";

export const contractAddresses: Record<string, ChainAddresses> = {
  "Base Sepolia": {
    eas: "0x4200000000000000000000000000000000000021",
    easSchemaRegistry: "0x4200000000000000000000000000000000000020",

    erc20BarterUtils: "0x07E6Cb3Cb45fa35fb364cA24Fd1BfcD19556757A",
    erc20EscrowObligation: "0x4996749214CC20911B9c3169C9eE12cf73686224",
    erc20PaymentObligation: "0x85A8BA268F72eb3c820719Aa298a9d6D156C1d5D",

    erc721BarterUtils: "0x58d04aED5debaD571f728c5aBa0e7856a2e19F7f",
    erc721EscrowObligation: "0xe3eAeeD9438Bd1Db5954eFBd95027cE0259180e9",
    erc721PaymentObligation: "0x1018c085a32772E93Fd13e282ba3F22E3365C642",

    erc1155BarterUtils: "0xcbDEBC0033Aa1fFedfbdec853AE3862165790a91",
    erc1155EscrowObligation: "0x4EC4374e730FCF6c7Aceef49da0c82ea0987298e",
    erc1155PaymentObligation: "0xDe16FC7692161ef4656dB85f0815f7fFB535403A",

    tokenBundleBarterUtils: "0x8AF31c90E7bDbf8cc78548Bfe8983aa7822eFf55",
    tokenBundleEscrowObligation: "0x0f6D03bd26BEB9f2b6eDe69f1e6AefF7DA9E7e40",
    tokenBundlePaymentObligation: "0xF643fD0259b34fFF9cFe2AfC0086163c961c2bB4",

    attestationBarterUtils: "0xADB9439413BCe4d720b2892abcF568B3BE3d5684",
    attestationEscrowObligation: "0x3b58003a160C75D44fc42cABDb8b4F299e53a8F3",
    attestationEscrowObligation2: "0x0433792a2e7481AE696f7b2EE6326C0f3670d100",

    stringObligation: "0x0E8591645144EBaBdbCE518DA75DC3254b29B708",

    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    eurc: "0x808456652fdb597867f38412077A9182bf77359F",

    trustedPartyArbiter: "0x550c511f456f8f30A7357e204B83874bD0dF2566",
    trivialArbiter: "0x862F7E9961B518316260Fe2B45c1110D7f4b9b4e",
    specificAttestationArbiter: "0x6B19cfe622384663aeB8F886Fe3646629caCE375",
    trustedOracleArbiter: "0x77154e8F4204e484e12fAA68d50964e793224d02",
  },
} as const;

export const supportedChains = ["Base Sepolia", "anvil"];
