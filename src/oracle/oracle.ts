import {
  decodeAbiParameters,
  parseAbiItem,
  parseAbiParameters,
  type AbiParameter,
  type Address,
  type DecodeAbiParametersReturnType,
  type Log,
} from "viem";
import type { Attestation, ChainAddresses } from "../types";
import { getAttestation, type ViemClient } from "../utils";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";
import { abi as schemaRegistryAbi } from "../contracts/ISchemaRegistry";

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

type ArbitrateEscrowParams<
  StatementData extends readonly AbiParameter[],
  DemandData extends readonly AbiParameter[],
> = {
  escrow: {
    demandAbi: DemandData;
    attester?: Address | Address[];
    recipient?: Address;
    schemaUid?: `0x${string}`;
    uid?: `0x${string}`;
    refUid?: `0x${string}`;
  };
  fulfillment: {
    statementAbi: StatementData;
    attester?: Address | Address[];
    recipient?: Address;
    schemaUid?: `0x${string}`;
    uid?: `0x${string}`;
    // refUid?: `0x${string}`; refUid needed to match fulfillment with escrow
  };
  arbitrate: (
    demand: DecodeAbiParametersReturnType<DemandData>,
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
  const arbiterDemandAbi = parseAbiParameters(
    "(address arbiter, bytes demand)",
  );
  const trustedOracleDemandAbi = parseAbiParameters(
    "(address oracle, bytes data)",
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
    return { hash, attestation, statement, decision };
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
    ).then((decisions) => decisions.filter(($) => $ !== null));

    return decisions;
  };
  return {
    arbitratePast,
    listenAndArbitrate: async <StatementData extends readonly AbiParameter[]>(
      params: ArbitrateParams<StatementData> & {
        onAfterArbitrate?: (decision: {
          hash: `0x${string}`;
          attestation: Attestation;
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
                decision !== null &&
                  params.onAfterArbitrate &&
                  params.onAfterArbitrate(
                    decision as {
                      hash: `0x${string}`;
                      attestation: Attestation;
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
    arbitratePastForEscrow: async <
      StatementData extends readonly AbiParameter[],
      DemandData extends readonly AbiParameter[],
    >(
      params: ArbitrateEscrowParams<StatementData, DemandData>,
    ) => {
      const escrowLogsP = viemClient
        .getLogs({
          address: addresses.eas,
          event: attestedEvent,
          args: {
            attester: params.escrow.attester,
            recipient: params.escrow.recipient,
            schemaUID: params.escrow.schemaUid,
          },
          fromBlock: "earliest",
          toBlock: "latest",
        })
        .then((logs) =>
          logs.filter(
            ($) => !params.escrow.uid || $.args.uid === params.escrow.uid,
          ),
        );

      const fulfillmentsP = viemClient
        .getLogs({
          address: addresses.eas,
          event: attestedEvent,
          args: {
            recipient: params.fulfillment.recipient,
            attester: params.fulfillment.attester,
          },
          fromBlock: "earliest",
          toBlock: "latest",
        })
        .then((logs) =>
          Promise.all(
            logs
              .filter(
                ($) =>
                  !params.fulfillment.uid ||
                  $.args.uid === params.fulfillment.uid,
              )
              .map(async (log) => {
                const attestation = await getAttestation(
                  viemClient,
                  log.args.uid!,
                  addresses,
                );
                const statement = decodeAbiParameters(
                  params.fulfillment.statementAbi,
                  attestation.data,
                );

                return { log, attestation, statement };
              }),
          ),
        );

      const [escrowLogs, fulfillments] = await Promise.all([
        escrowLogsP,
        fulfillmentsP,
      ]);

      const decisions = await Promise.all(
        escrowLogs.map(async (escrowLog) => {
          const escrowAttestation = await getAttestation(
            viemClient,
            escrowLog.args.uid!,
            addresses,
          );

          const schema = await viemClient.readContract({
            address: addresses.easSchemaRegistry,
            abi: schemaRegistryAbi.abi,
            functionName: "getSchema",
            args: [escrowAttestation.schema],
          });

          const statementData = decodeAbiParameters(
            arbiterDemandAbi,
            escrowAttestation.data,
          )[0];

          if (
            statementData.arbiter.toLowerCase() !=
            addresses.trustedOracleArbiter.toLowerCase()
          )
            return null;

          const trustedOracleDemand = decodeAbiParameters(
            trustedOracleDemandAbi,
            statementData.demand,
          )[0];

          const escrowDemand = decodeAbiParameters(
            params.escrow.demandAbi,
            trustedOracleDemand.data,
          );

          const fulfillmentsForEscrow = fulfillments.filter(
            ($) =>
              $.attestation.refUID == escrowAttestation.uid &&
              ($.attestation.expirationTime === 0n ||
                $.attestation.expirationTime > Date.now() / 1000) &&
              ($.attestation.revocationTime === 0n ||
                $.attestation.revocationTime > Date.now() / 1000),
          );

          return await Promise.all(
            fulfillmentsForEscrow.map(async ($) => {
              const decision = await params.arbitrate(
                escrowDemand,
                $.statement,
              );
              if (decision === null) return null;

              const hash = await viemClient.writeContract({
                address: addresses.trustedOracleArbiter,
                abi: trustedOracleArbiterAbi.abi,
                functionName: "arbitrate",
                args: [$.attestation.uid, decision],
              });
              return { hash, log: $.log, statement: $.statement, decision };
            }),
          ).then((decisions) => decisions.filter(($) => $ !== null));
        }),
      ).then((decisions) => decisions.filter(($) => $ !== null).flat());
      return decisions;
    },
  };
};
