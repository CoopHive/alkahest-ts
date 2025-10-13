import nativeTokenEscrowObligationAbi from './NativeTokenEscrowObligation.json';

export const NativeTokenEscrowObligationABI = nativeTokenEscrowObligationAbi.abi;

export type ObligationData = {
  arbiter: string;
  demand: string;
  amount: bigint;
};

export type NativeTokenEscrowObligation = {
  abi: typeof NativeTokenEscrowObligationABI;
};

export default {
  abi: NativeTokenEscrowObligationABI,
} as const;