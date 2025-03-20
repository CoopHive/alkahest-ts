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

    trustedPartyArbiter: "0x550c511f456f8f30A7357e204B83874bD0dF2566",
    trivialArbiter: "0x862F7E9961B518316260Fe2B45c1110D7f4b9b4e",
    specificAttestationArbiter: "0x6B19cfe622384663aeB8F886Fe3646629caCE375",
    trustedOracleArbiter: "0x77154e8F4204e484e12fAA68d50964e793224d02",
  },
  "Filecoin Calibration": {
    eas: "0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524",
    easSchemaRegistry: "0x2bb94a4e6ec0d81de7f81007b572ac09a5be37b4",
    specificAttestationArbiter: "0x10788ba2c4c65d1e97bc6005436b61c2c2e51572",
    trustedPartyArbiter: "0xed550301b3258612509615bbddd4b2383cf32df4",
    trivialArbiter: "0x6e9bc0d34fff16140401fc51653347be0a1f0ec0",
    trustedOracleArbiter: "0x5f1db54dbc5006894ef6c43b2174c05ccaa250ec",
    stringObligation: "0xbb022fc36d0cc97b6cae5a2e15d45b7a9ad46f99",
    erc20EscrowObligation: "0x235792a6d077a04fb190a19f362acecab7866ab5",
    erc20PaymentObligation: "0xd8b6199aa91992f5d3bafddc3372b391e46c92ce",
    erc721EscrowObligation: "0x336f2f91b093001edd90e49216422b33b8b4e03b",
    erc721PaymentObligation: "0x4b9b6ff4a7c2bc89eee6f28355b9a94e6649bbf8",
    erc1155EscrowObligation: "0x96c14b182cd99a09ddddc6b755ba0c4ed3d6991c",
    erc1155PaymentObligation: "0x903caa028b1848ab8fdd15c4ccd20c4e7be2b1c0",
    tokenBundleEscrowObligation: "0xdcc1104325d9d99c6bd5faa0804a7d743f3d0c20",
    tokenBundlePaymentObligation: "0xab43cce34a7b831fa7ab134bcdc21a6ba20882b6",
    tokenBundleBarterUtils: "0xb63cf08c6623f69d2ad34e37b8a68cca6c125d49",
    erc20BarterUtils: "0xaeeddd0a2f24f7286eae7e7fa5cea746fcf064fc",
    erc721BarterUtils: "0x2129f46737135fe4ebb3c49953487122088bc739",
    erc1155BarterUtils: "0x66b7398b2bb322bb4a480ae370142c02c52b886a",
    attestationEscrowObligation: "0x553e4de0916074201a9d32123efcc8f734ee5675",
    attestationEscrowObligation2: "0x11c3931f2715d8fca8ea5ca79fac4bbbcdbe9903",
    attestationBarterUtils: "0x0c19138441e1bee2964e65e0edf1702d59a2e786",
  },
} as const;

export const supportedChains = ["Base Sepolia", "Filecoin Calibration"];
