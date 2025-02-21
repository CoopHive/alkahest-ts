import {
	decodeAbiParameters,
	encodeAbiParameters,
	parseAbiParameters,
} from "viem";
import type { ViemClient } from "../utils";

export const makeArbitersClient = (viemClient: ViemClient) => ({
	encodeTrustedPartyDemand: (demand: {
		creator: `0x${string}`;
		baseArbiter: `0x${string}`;
		baseDemand: `0x${string}`;
	}) => {
		return encodeAbiParameters(
			parseAbiParameters(
				"(address creator, address baseArbiter, bytes baseDemand)",
			),
			[demand],
		);
	},
	decodeTrustedPartyDemand: (demandData: `0x${string}`) => {
		return decodeAbiParameters(
			parseAbiParameters(
				"(address creator, address baseArbiter, bytes baseDemand)",
			),
			demandData,
		)[0];
	},
	encodeSpecificAttestationDemand: (demand: {
		uid: `0x${string}`;
	}) => {
		return encodeAbiParameters(parseAbiParameters("(bytes32 uid)"), [demand]);
	},
	decodeSpecificAttestationDemand: (demandData: `0x${string}`) => {
		return decodeAbiParameters(
			parseAbiParameters("(bytes32 uid)"),
			demandData,
		)[0];
	},
	encodeTrustedOracleDemand: (demand: {
		oracle: `0x${string}`;
	}) => {
		return encodeAbiParameters(parseAbiParameters("(address oracle)"), [
			demand,
		]);
	},
	decodeTrustedOracleDemand: (demandData: `0x${string}`) => {
		return decodeAbiParameters(
			parseAbiParameters("(address oracle)"),
			demandData,
		)[0];
	},
	arbitrateAsTrustedOracle: async (
		statement: `0x${string}`,
		decision: boolean,
	) => {},
	waitForTrustedOracleArbitration: async (
		oracle: `0x${string}`,
		statement: `0x${string}`,
		fromBlock?: number,
	) => {},
});
