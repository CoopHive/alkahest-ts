import { type ChainAddresses } from "./types";

export const contractAddresses: Record<string, ChainAddresses> = {
  "Base Sepolia": {
    eas: "0x4200000000000000000000000000000000000021",
    easSchemaRegistry: "0x4200000000000000000000000000000000000020",
    erc20EscrowObligation: "0x248cd93922eBDf962c9ea10286E6566C75081948",
    erc20PaymentObligation: "0x702fab66515b3313dFd41E7CE70C2aF0033E2356",
    erc20PaymentFulfillmentArbiter:
      "0xF2C2705F8aD552aCA7e8d4d5d33b9E6f91636cfA",
    erc20BarterUtils: "0xdF3eA58dceCbF2cb58b2b020e700c2E85ae2C4e6",
    erc721BarterUtils: "0xC801A1DD4E11EC6d0f36Fa39c3A31e61D39e27F9",
    erc1155BarterUtils: "0xe45f7E15A86015098f72f5B1179b3130B4480E3b",
    tokenBundleBarterUtils: "0x5cB936d0f508C69DE4860f54f2c02d6b5aBCfb3d",
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
} as const;

export const supportedChains = ["Base Sepolia"];
