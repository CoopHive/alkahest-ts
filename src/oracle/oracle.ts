import {
  decodeAbiParameters,
  parseAbiItem,
  type AbiParameter,
  type Address,
  type DecodeAbiParametersReturnType,
  type Log,
} from "viem";
import type { ChainAddresses } from "../types";
import { getAttestation, type ViemClient } from "../utils";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";

type ArbitrateParams<StatementData extends readonly AbiParameter[]> = {
  fulfillment: {
    statementAbi: StatementData;
    attester?: Address | Address[];
    recipient?: Address;
    schemaUid?: `0x${string}`;
    uid?: `0x${string}`;
    refUid?: `0x${string}`;
  };
  arbitrate: (
    statement: DecodeAbiParametersReturnType<StatementData>,
  ) => Promise<boolean | null>;
};

export const makeOracleClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  const attestedEvent = parseAbiItem(
    "event Attested(address indexed recipient, address indexed attester, bytes32 uid, bytes32 indexed schemaUID)",
  );

  const arbitrateLog = async <StatementData extends readonly AbiParameter[]>(
    params: ArbitrateParams<StatementData>,
    log: Log<bigint, number, boolean, typeof attestedEvent>,
  ) => {
    const uid = log.args.uid!;
    const attestation = await getAttestation(viemClient, uid, addresses);

    if (
      params.fulfillment.refUid &&
      attestation.refUID != params.fulfillment.refUid
    )
      return null;
    if (
      attestation.expirationTime !== 0n &&
      attestation.expirationTime < Date.now() / 1000
    )
      return null;
    if (
      attestation.revocationTime !== 0n &&
      attestation.revocationTime < Date.now() / 1000
    )
      return null;
    const statement = decodeAbiParameters(
      params.fulfillment.statementAbi,
      attestation.data,
    );

    const decision = await params.arbitrate(statement);
    if (decision === null) return null;

    const hash = await viemClient.writeContract({
      address: addresses.trustedOracleArbiter,
      abi: trustedOracleArbiterAbi.abi,
      functionName: "arbitrate",
      args: [uid, decision],
    });
    return { hash, log, statement, decision };
  };

  const arbitratePast = async <T extends readonly AbiParameter[]>(
    params: ArbitrateParams<T>,
  ) => {
    const logs = await viemClient
      .getLogs({
        address: addresses.eas,
        event: attestedEvent,
        args: {
          attester: params.fulfillment.attester,
          recipient: params.fulfillment.recipient,
          schemaUID: params.fulfillment.schemaUid,
        },
        fromBlock: "earliest",
        toBlock: "latest",
      })
      .then((logs) =>
        logs.filter(
          ($) =>
            !params.fulfillment.uid || $.args.uid === params.fulfillment.uid,
        ),
      );
    const decisions = await Promise.all(
      logs.map((log) => arbitrateLog(params, log)),
    );

    return decisions;
  };
  return {
    arbitratePast,
    listenAndArbitrate: async <StatementData extends readonly AbiParameter[]>(
      params: ArbitrateParams<StatementData> & {
        onAfterArbitrate?: (decision: {
          hash: `0x${string}`;
          log: Log<bigint, number, boolean, typeof attestedEvent>;
          statement: DecodeAbiParametersReturnType<StatementData>;
          decision: boolean | null;
        }) => Promise<void>;
        pollingInterval?: number;
      },
    ) => {
      const decisions = await arbitratePast(params);

      const unwatch = viemClient.watchEvent({
        address: addresses.eas,
        event: attestedEvent,
        args: {
          attester: params.fulfillment.attester,
          recipient: params.fulfillment.recipient,
          schemaUID: params.fulfillment.schemaUid,
        },
        onLogs: async (logs) =>
          await Promise.all(
            logs
              .filter(
                ($) =>
                  !params.fulfillment.uid ||
                  $.args.uid === params.fulfillment.uid,
              )
              .map(async (log) => {
                if (
                  params.fulfillment.uid &&
                  log.args.uid !== params.fulfillment.uid
                )
                  return;

                const decision = await arbitrateLog(params, log);
                params.onAfterArbitrate &&
                  params.onAfterArbitrate(
                    decision as {
                      hash: `0x${string}`;
                      log: Log<bigint, number, boolean, typeof attestedEvent>;
                      statement: DecodeAbiParametersReturnType<StatementData>;
                      decision: boolean | null;
                    },
                  );
              }),
          ),
        pollingInterval: params.pollingInterval,
      });

      return { decisions, unwatch };
    },
  };
};
