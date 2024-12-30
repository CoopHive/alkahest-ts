export type ChainAddresses = {
  eas: `0x${string}`;
  easSchemaRegistry: `0x${string}`;
  erc20EscrowObligation: `0x${string}`;
  erc20PaymentObligation: `0x${string}`;
  erc20PaymentFulfillmentArbiter: `0x${string}`;
  erc20BarterUtils: `0x${string}`;
  erc721EscrowObligation: `0x${string}`;
  erc721BarterUtils: `0x${string}`;
  erc1155EscrowObligation: `0x${string}`;
  erc1155BarterUtils: `0x${string}`;
  tokenBundleBarterUtils: `0x${string}`;
  attestationEscrowObligation: `0x${string}`;
  attestationEscrowObligation2: `0x${string}`;
  attestationBarterUtils: `0x${string}`;
  usdc: `0x${string}`;
};

export type PermitSignature = {
  deadline: bigint;
  v: number;
  r: `0x${string}`;
  s: `0x${string}`;
};

export type TokenBundle = {
  erc20Tokens: `0x${string}`[];
  erc20Amounts: bigint[];

  erc721Tokens: `0x${string}`[];
  erc721TokenIds: bigint[];

  erc1155Tokens: `0x${string}`[];
  erc1155TokenIds: bigint[];
  erc1155Amounts: bigint[];

  payee: `0x${string}`;
};
