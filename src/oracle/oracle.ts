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

  const arbitrateOnchain = async (
    statementUid: `0x${string}`,
    decision: boolean | null,
  ) =>
    decision === null
      ? null
      : await viemClient.writeContract({
          address: addresses.trustedOracleArbiter,
          abi: trustedOracleArbiterAbi.abi,
          functionName: "arbitrate",
          args: [statementUid, decision],
        });

  const arbitrateLog = async <StatementData extends readonly AbiParameter[]>(
    params: ArbitrateParams<StatementData>,
    log: Log<bigint, number, boolean, typeof attestedEvent>,
  ) => {
    const uid = log.args.uid!;
    const attestation = await getAttestation(viemClient, uid, addresses);

    if (!validateAttestationIntrinsics(attestation, params.fulfillment))
      return null;

    const statement = decodeAbiParameters(
      params.fulfillment.statementAbi,
      attestation.data,
    );

    const decision = await params.arbitrate(statement);
    const hash = await arbitrateOnchain(uid, decision);

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
          recipient: params.fulfillment.recipient,
          attester: params.fulfillment.attester,
          schemaUID: params.fulfillment.schemaUID,
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

  const arbitratePastForEscrow = async <
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
          recipient: params.escrow.recipient,
          attester: params.escrow.attester,
          schemaUID: params.escrow.schemaUID,
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
          schemaUID: params.fulfillment.schemaUID,
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

        if (!validateAttestationIntrinsics(escrowAttestation, params.escrow))
          return null;

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

        return await Promise.all(
          fulfillments.map(async ($) => {
            if (
              !validateAttestationIntrinsics($.attestation, {
                refUID: escrowAttestation.uid,
              })
            )
              return null;

            const decision = await params.arbitrate($.statement, escrowDemand);
            const hash = await arbitrateOnchain($.attestation.uid, decision);

            return {
              hash,
              log: $.log,
              statement: $.statement,
              demand: escrowDemand,
              decision,
            };
          }),
        ).then((decisions) => decisions.filter(($) => $ !== null));
      }),
    ).then((decisions) => decisions.filter(($) => $ !== null).flat());
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
