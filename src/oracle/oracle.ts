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

type ArbitrateParams<StatementData extends readonly AbiParameter[]> = {
  fulfillment: {
    statementAbi: StatementData;
    attester?: Address | Address[];
    recipient?: Address | Address[];
    schemaUID?: `0x${string}` | `0x${string}`[];
    uid?: `0x${string}` | `0x${string}`[];
    refUID?: `0x${string}` | `0x${string}`[];
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
    recipient?: Address | Address[];
    schemaUID?: `0x${string}` | `0x${string}`[];
    uid?: `0x${string}` | `0x${string}`[];
    refUID?: `0x${string}` | `0x${string}`[];
  };
  fulfillment: {
    statementAbi: StatementData;
    attester?: Address | Address[];
    recipient?: Address | Address[];
    schemaUID?: `0x${string}` | `0x${string}`[];
    uid?: `0x${string}` | `0x${string}`[];
    // refUid?: `0x${string}` | `0x${string}`[]; refUid needed to match fulfillment with escrow
  };
  arbitrate: (
    statement: DecodeAbiParametersReturnType<StatementData>,
    demand: DecodeAbiParametersReturnType<DemandData>,
  ) => Promise<boolean | null>;
};

const validateAttestationIntrinsics = (
  attestation: Attestation,
  params: {
    refUID?: `0x${string}` | `0x${string}`[];
  },
) => {
  if (
    params.refUID &&
    !Array.isArray(params.refUID) &&
    params.refUID !== attestation.refUID
  )
    return false;

  if (params.refUID && !params.refUID.includes(attestation.refUID))
    return false;

  if (
    attestation.expirationTime !== 0n &&
    attestation.expirationTime < Date.now() / 1000
  )
    return false;
  if (
    attestation.revocationTime !== 0n &&
    attestation.revocationTime < Date.now() / 1000
  )
    return false;

  return true;
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

  const getStatements = async <StatementData extends readonly AbiParameter[]>(
    filterArgs: {
      recipient?: Address | Address[];
      attester?: Address | Address[];
      schemaUID?: `0x${string}` | `0x${string}`[];
      uid?: `0x${string}` | `0x${string}`[];
      refUID?: `0x${string}` | `0x${string}`[];
    },
    statementAbi: StatementData,
  ) => {
    const logs = (
      await viemClient.getLogs({
        address: addresses.eas,
        event: attestedEvent,
        args: {
          recipient: filterArgs.recipient,
          attester: filterArgs.attester,
          schemaUID: filterArgs.schemaUID,
        },
        fromBlock: "earliest",
        toBlock: "latest",
      })
    ).filter(($) => !filterArgs.uid || $.args.uid === filterArgs.uid);

    const attestations = (
      await Promise.all(
        logs.map(
          async (log) =>
            await getAttestation(viemClient, log.args.uid!, addresses),
        ),
      )
    ).filter(($) => validateAttestationIntrinsics($, filterArgs));

    const statements = attestations.map(($) =>
      decodeAbiParameters(statementAbi, $.data),
    );

    return logs.map((log, i) => ({
      log,
      attestation: attestations[i],
      statement: statements[i],
    }));
  };

  const arbitrateOnchain = async (
    statementUid: `0x${string}`,
    decision: boolean,
  ) =>

    await viemClient.writeContract({
      address: addresses.trustedOracleArbiter,
      abi: trustedOracleArbiterAbi.abi,
      functionName: "arbitrate",
      args: [statementUid, decision],
    });

  const arbitratePast = async <T extends readonly AbiParameter[]>(
    params: ArbitrateParams<T>,
  ) => {
    const logs = await getStatements(
      params.fulfillment,
      params.fulfillment.statementAbi,
    );

    return await Promise.all(
      statements.map(async ({ attestation, statement }) => {
        const decision = await params.arbitrate(statement);
        if (decision === null) return null;
        const hash = await arbitrateOnchain(attestation.uid, decision);

        return { hash, attestation, statement, decision };
      }),
    );
  };

  const arbitratePastForEscrow = async <
    StatementData extends readonly AbiParameter[],
    DemandData extends readonly AbiParameter[],
  >(
    params: ArbitrateEscrowParams<StatementData, DemandData>,
  ) => {
    const escrowsP = getStatements(params.escrow, arbiterDemandAbi).then(
      (logs) =>
        Promise.all(
          logs.map(async ({ log, attestation, statement }) => {
            if (
              statement[0].arbiter.toLowerCase() !=
              addresses.trustedOracleArbiter.toLowerCase()
            )
              return null;

            const trustedOracleDemand = decodeAbiParameters(
              trustedOracleDemandAbi,
              statement[0].demand,
            )[0];

            const demand = decodeAbiParameters(
              params.escrow.demandAbi,
              trustedOracleDemand.data,
            );

            return {
              log,
              attestation,
              statement,
              demand,
            };
          }),
        ),
    );

    const fulfillmentsP = getStatements(
      params.fulfillment,
      params.fulfillment.statementAbi,
    );

    const [escrows, fulfillments] = await Promise.all([
      escrowsP,
      fulfillmentsP,
    ]);

    const decisions = await Promise.all(
      escrows
        .filter(($) => $ !== null)
        .map(async (escrow) => {
          return await Promise.all(
            fulfillments.map(async ($) => {
              if (
                !validateAttestationIntrinsics($.attestation, {
                  refUID: escrow.attestation.uid,
                })
              )
                return null;
            const decision = await params.arbitrate($.statement, escrow.demand);
            if (decision === null) return null;
            const hash = await arbitrateOnchain($.attestation.uid, decision);


              return {
                hash,
                log: $.log,
                statement: $.statement,
                demand: escrow.demand,
                decision,
              };
            }),
          ).then((decisions) => decisions.filter(($) => $ !== null));
        }),
    ).then((decisions) => decisions.filter(($) => $ !== null).flat());
    return { decisions, escrows, fulfillments };
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
          recipient: params.fulfillment.recipient,
          attester: params.fulfillment.attester,
          schemaUID: params.fulfillment.schemaUID,
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

                const _decision = await params.arbitrate(statement);
                if (_decision === null) return null;
                const hash = await arbitrateOnchain(attestation.uid, _decision);
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
    arbitratePastForEscrow,
    listenAndArbitrateForEscrow: async <
      StatementData extends readonly AbiParameter[],
      DemandData extends readonly AbiParameter[],
    >(
      params: ArbitrateEscrowParams<StatementData, DemandData> & {
        onAfterArbitrate?: (decision: {
          hash: `0x${string}`;
          attestation: Attestation;
          statement: DecodeAbiParametersReturnType<StatementData>;
          demand: DecodeAbiParametersReturnType<DemandData>;
          decision: boolean | null;
        }) => Promise<void>;
        pollingInterval?: number;
      },
    ) => {
      const decisions = await arbitratePastForEscrow(params);
      const unwatchHandles: Array<() => void> = [];

      const unwatchEscrow = viemClient.watchEvent({
        address: addresses.eas,
        event: attestedEvent,
        args: {
          recipient: params.escrow.recipient,
          attester: params.escrow.attester,
          schemaUID: params.escrow.schemaUID,
        },
        onLogs: async (escrowLogs) => {
          await Promise.all([
            escrowLogs.map(async (escrowLog) => {
              if (params.escrow.uid && escrowLog.args.uid !== params.escrow.uid)
                return;

              const escrowAttestation = await getAttestation(
                viemClient,
                escrowLog.args.uid!,
                addresses,
              );

              if (
                !validateAttestationIntrinsics(escrowAttestation, params.escrow)
              )
                return;

              const statementData = decodeAbiParameters(
                arbiterDemandAbi,
                escrowAttestation.data,
              )[0];

              if (
                statementData.arbiter.toLowerCase() !=
                addresses.trustedOracleArbiter.toLowerCase()
              )
                return;

              const trustedOracleDemand = decodeAbiParameters(
                trustedOracleDemandAbi,
                statementData.demand,
              )[0];

              const escrowDemand = decodeAbiParameters(
                params.escrow.demandAbi,
                trustedOracleDemand.data,
              );

              const unwatchHandle = viemClient.watchEvent({
                address: addresses.eas,
                event: attestedEvent,
                args: params.fulfillment,
                onLogs: async (fulfillmentLogs) => {
                  await Promise.all([
                    fulfillmentLogs.map(async (fulfillmentLog) => {
                      if (
                        params.fulfillment.uid &&
                        fulfillmentLog.args.uid !== params.fulfillment.uid
                      )
                        return;

                      const fulfillmentAttestation = await getAttestation(
                        viemClient,
                        fulfillmentLog.args.uid!,
                        addresses,
                      );

                      if (
                        !validateAttestationIntrinsics(fulfillmentAttestation, {
                          refUID: escrowLog.args.uid,
                        })
                      )
                        return;

                      const fulfillmentStatement = decodeAbiParameters(
                        params.fulfillment.statementAbi,
                        fulfillmentAttestation.data,
                      );

                      const decision = await params.arbitrate(
                        fulfillmentStatement,
                        escrowDemand,
                      );
                      if (decision === null) return null;
                      await arbitrateOnchain(
                        fulfillmentAttestation.uid,
                        decision,
                      );
                    }),
                  ]);
                },
              });
              unwatchHandles.push(unwatchHandle);
            }),
          ]);
        },
      });

      const unwatchAll = () => {
        unwatchEscrow();
        unwatchHandles.forEach(($) => $());
      };
      return { decisions, unwatch: unwatchAll };
    },
  };
};
