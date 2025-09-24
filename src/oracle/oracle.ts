import {
  decodeAbiParameters,
  parseAbiItem,
  parseAbiParameters,
  type AbiParameter,
  type Address,
  type DecodeAbiParametersReturnType,
  type BlockNumber,
  type BlockTag,
} from "viem";
import type {
  Attestation,
  ChainAddresses,
  EnhancedArbitrateFilters,
  TimeFilters,
  AttestationFilters,
  ArbitrateOptions,
} from "../types";
import {
  getAttestation,
  getOptimalPollingInterval,
  type ViemClient,
} from "../utils";

import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";

type ArbitrateParams<ObligationData extends readonly AbiParameter[]> = {
  fulfillment: {
    obligationAbi: ObligationData;
    attester?: Address | Address[];
    recipient?: Address | Address[];
    schemaUID?: `0x${string}` | `0x${string}`[];
    uid?: `0x${string}` | `0x${string}`[];
    refUID?: `0x${string}` | `0x${string}`[];
  };
  arbitrate: (
    obligation: DecodeAbiParametersReturnType<ObligationData>
  ) => Promise<boolean | null>;
  options?: ArbitrateOptions;
};

type ArbitrateEscrowParams<
  ObligationData extends readonly AbiParameter[],
  DemandData extends readonly AbiParameter[]
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
    obligationAbi: ObligationData;
    attester?: Address | Address[];
    recipient?: Address | Address[];
    schemaUID?: `0x${string}` | `0x${string}`[];
    uid?: `0x${string}` | `0x${string}`[];
    // refUid?: `0x${string}` | `0x${string}`[]; refUid needed to match fulfillment with escrow
  };
  arbitrate: (
    obligation: DecodeAbiParametersReturnType<ObligationData>,
    demand: DecodeAbiParametersReturnType<DemandData>
  ) => Promise<boolean | null>;
  options?: ArbitrateOptions;
};

const validateAttestationIntrinsics = (
  attestation: Attestation,
  params: {
    refUID?: `0x${string}` | `0x${string}`[];
  }
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
    attestation.expirationTime !== BigInt(0) &&
    attestation.expirationTime < Date.now() / 1000
  )
    return false;
  if (
    attestation.revocationTime !== BigInt(0) &&
    attestation.revocationTime < Date.now() / 1000
  )
    return false;

  return true;
};

export const makeOracleClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses
) => {
  const attestedEvent = parseAbiItem(
    "event Attested(address indexed recipient, address indexed attester, bytes32 uid, bytes32 indexed schemaUID)"
  );
  const arbitrationMadeEvent = parseAbiItem(
    "event ArbitrationMade(bytes32 indexed obligation, address indexed oracle, bool decision)"
  );
  const arbiterDemandAbi = parseAbiParameters(
    "(address arbiter, bytes demand)"
  );
  const trustedOracleDemandAbi = parseAbiParameters(
    "(address oracle, bytes data)"
  );

  const getObligations = async <ObligationData extends readonly AbiParameter[]>(
    filterArgs: {
      recipient?: Address | Address[];
      attester?: Address | Address[];
      schemaUID?: `0x${string}` | `0x${string}`[];
      uid?: `0x${string}` | `0x${string}`[];
      refUID?: `0x${string}` | `0x${string}`[];
    },
    obligationAbi: ObligationData,
    blockRange?: {
      fromBlock?: BlockNumber | BlockTag;
      toBlock?: BlockNumber | BlockTag;
    }
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
        fromBlock: blockRange?.fromBlock || "earliest",
        toBlock: blockRange?.toBlock || "latest",
      })
    ).filter(($) => !filterArgs.uid || $.args.uid === filterArgs.uid);

    const attestations = (
      await Promise.all(
        logs.map(
          async (log) =>
            await getAttestation(viemClient, log.args.uid!, addresses)
        )
      )
    ).filter(($) => validateAttestationIntrinsics($, filterArgs));

    const obligations = attestations.map(($) =>
      decodeAbiParameters(obligationAbi, $.data)
    );

    return logs.map((log, i) => ({
      log,
      attestation: attestations[i],
      obligation: obligations[i],
    }));
  };

  const arbitrateOnchain = async (
    obligationUid: `0x${string}`,
    decision: boolean
  ) =>
    await viemClient.writeContract({
      address: addresses.trustedOracleArbiter,
      abi: trustedOracleArbiterAbi.abi,
      functionName: "arbitrate",
      args: [obligationUid, decision],
      account: viemClient.account,
      chain: viemClient.chain,
    });

  const arbitratePast = async <T extends readonly AbiParameter[]>(
    params: ArbitrateParams<T> & EnhancedArbitrateFilters
  ) => {
    // Get obligations with block range filtering
    const blockRange = {
      fromBlock: params.fromBlock || "earliest",
      toBlock: params.toBlock || "latest",
    };

    const obligations = await getObligations(
      params.fulfillment,
      params.fulfillment.obligationAbi,
      blockRange
    );

    // Apply batch size limiting and prioritization
    let filteredObligations = obligations;

    if (params.prioritizeRecent) {
      filteredObligations = filteredObligations.sort((a, b) =>
        Number(b.attestation.time - a.attestation.time)
      );
    }

    if (params.maxObligations) {
      filteredObligations = filteredObligations.slice(0, params.maxObligations);
    }

    const decisions = (
      await Promise.all(
        filteredObligations.map(async ({ attestation, obligation }) => {
          // Apply time-based filters
          if (!passesTimeFilters(attestation, params)) {
            return null;
          }

          // Apply attestation property filters
          if (!passesAttestationFilters(attestation, params)) {
            return null;
          }

          // Early return if escrow doesn't demand current oracle
          if (params.options?.requireOracle && !attestation.refUID) {
            return null;
          }

          if (params.options?.requireOracle) {
            const escrowAttestation = await getAttestation(
              viemClient,
              attestation.refUID,
              addresses
            );
            if (!escrowAttestation) return null;

            try {
              const trustedOracleDemand = decodeAbiParameters(
                trustedOracleDemandAbi,
                escrowAttestation.data
              )[0];
              if (
                trustedOracleDemand.oracle.toLowerCase() !==
                viemClient.account.address.toLowerCase()
              ) {
                return null; // Skip not matching oracle
              }
            } catch {
              return null; // Skip if decoding fails
            }
          }

          if (params.options?.skipArbitrated) {
            const existingLogs = await viemClient.getLogs({
              address: addresses.trustedOracleArbiter,
              event: arbitrationMadeEvent,
              args: {
                obligation: attestation.uid,
                oracle: viemClient.account.address,
              },
              fromBlock: "earliest",
              toBlock: "latest",
            });

            if (existingLogs.length > 0) {
              return null; // Skip if already arbitrated
            }
          }

          // Dry run mode - only simulate
          if (params.dryRun) {
            const decision = await params.arbitrate(obligation);
            let estimatedGas: bigint | null = null;

            // Estimate gas for the transaction if decision is not null
            if (decision !== null) {
              try {
                estimatedGas = await viemClient.estimateContractGas({
                  address: addresses.trustedOracleArbiter,
                  abi: trustedOracleArbiterAbi.abi,
                  functionName: "arbitrate",
                  args: [attestation.uid, decision],
                  account: viemClient.account,
                });
              } catch {
                // If gas estimation fails, keep as null
                estimatedGas = null;
              }
            }

            return {
              simulated: true,
              attestation,
              obligation,
              decision,
              estimatedGas,
            };
          }

          const decision = await params.arbitrate(obligation);
          if (decision === null) return null;

          // Gas limit check (if specified)
          if (params.maxGasPerTx) {
            try {
              const gasEstimate = await viemClient.estimateContractGas({
                address: addresses.trustedOracleArbiter,
                abi: trustedOracleArbiterAbi.abi,
                functionName: "arbitrate",
                args: [attestation.uid, decision],
                account: viemClient.account,
              });

              if (gasEstimate > params.maxGasPerTx) {
                return null; // Skip if gas exceeds limit
              }
            } catch {
              // If gas estimation fails, skip or continue based on skipValidation
              if (!params.skipValidation) return null;
            }
          }

          const hash = await arbitrateOnchain(attestation.uid, decision);
          return { hash, attestation, obligation, decision };
        })
      )
    ).filter(($) => $ !== null);

    return { decisions, fulfillments: filteredObligations };
  };

  const arbitratePastForEscrow = async <
    ObligationData extends readonly AbiParameter[],
    DemandData extends readonly AbiParameter[]
  >(
    params: ArbitrateEscrowParams<ObligationData, DemandData> &
      EnhancedArbitrateFilters
  ) => {
    // Get obligations with block range filtering
    const blockRange = {
      fromBlock: params.fromBlock || "earliest",
      toBlock: params.toBlock || "latest",
    };

    const escrowsP = getObligations(params.escrow, arbiterDemandAbi, blockRange)
      .then((obligations) =>
        Promise.all(
          obligations
            .filter(
              ($) =>
                $ && 
                $.obligation && 
                $.obligation[0] &&
                $.obligation[0].arbiter.toLowerCase() ===
                addresses.trustedOracleArbiter.toLowerCase()
            )
            .map(async ({ log, attestation, obligation }) => {
              // Apply time-based filters to escrow attestations
              if (!passesTimeFilters(attestation, params)) {
                return null;
              }

              // Apply attestation property filters to escrow attestations
              if (!passesAttestationFilters(attestation, params)) {
                return null;
              }

              const trustedOracleDemand = decodeAbiParameters(
                trustedOracleDemandAbi,
                obligation[0].demand
              )[0];

              if (
                trustedOracleDemand.oracle.toLowerCase() !==
                viemClient.account.address.toLowerCase()
              )
                return null;

              const demand = decodeAbiParameters(
                params.escrow.demandAbi,
                trustedOracleDemand.data
              );

              return {
                log,
                attestation,
                obligation,
                demand,
              };
            })
        )
      )
      .then(($) => $.filter(($) => $ !== null));

    const fulfillmentsP = getObligations(
      params.fulfillment,
      params.fulfillment.obligationAbi,
      blockRange
    );

    const [escrows, fulfillments] = await Promise.all([
      escrowsP,
      fulfillmentsP,
    ]);

    // Apply batch size limiting and prioritization to fulfillments
    let filteredFulfillments = fulfillments;

    if (params.prioritizeRecent) {
      filteredFulfillments = filteredFulfillments.sort((a, b) =>
        Number(b.attestation.time - a.attestation.time)
      );
    }

    if (params.maxObligations) {
      filteredFulfillments = filteredFulfillments.slice(
        0,
        params.maxObligations
      );
    }

    const escrowsMap = new Map<`0x${string}`, (typeof escrows)[0]>();
    escrows.forEach(($) => escrowsMap.set($.attestation.uid, $));

    const decisions = await Promise.all(
      filteredFulfillments.map(async ($) => {
        // Apply time-based filters to fulfillment attestations
        if (!passesTimeFilters($.attestation, params)) {
          return null;
        }

        // Apply attestation property filters to fulfillment attestations
        if (!passesAttestationFilters($.attestation, params)) {
          return null;
        }

        if (!escrowsMap.has($.attestation.refUID)) return null;

        const escrow = escrowsMap.get($.attestation.refUID)!;

        // Early return if already arbitrated
        if (params.options?.skipArbitrated) {
          const existingLogs = await viemClient.getLogs({
            address: addresses.trustedOracleArbiter,
            event: arbitrationMadeEvent,
            args: {
              obligation: $.attestation.uid,
              oracle: viemClient.account.address,
            },
            fromBlock: "earliest",
            toBlock: "latest",
          });

          if (existingLogs.length > 0) {
            return null; // Skip if already arbitrated
          }
        }

        // Dry run mode - only simulate
        if (params.dryRun) {
          const decision = await params.arbitrate($.obligation, escrow.demand);
          let estimatedGas: bigint | null = null;

          // Estimate gas for the transaction if decision is not null
          if (decision !== null) {
            try {
              estimatedGas = await viemClient.estimateContractGas({
                address: addresses.trustedOracleArbiter,
                abi: trustedOracleArbiterAbi.abi,
                functionName: "arbitrate",
                args: [$.attestation.uid, decision],
                account: viemClient.account,
              });
            } catch {
              // If gas estimation fails, keep as null
              estimatedGas = null;
            }
          }

          return {
            simulated: true,
            attestation: $.attestation,
            obligation: $.obligation,
            demand: escrow.demand,
            escrowAttestation: escrow.attestation,
            decision,
            estimatedGas,
          };
        }

        const decision = await params.arbitrate($.obligation, escrow.demand);
        if (decision === null) return null;

        // Gas limit check (if specified)
        if (params.maxGasPerTx) {
          try {
            const gasEstimate = await viemClient.estimateContractGas({
              address: addresses.trustedOracleArbiter,
              abi: trustedOracleArbiterAbi.abi,
              functionName: "arbitrate",
              args: [$.attestation.uid, decision],
              account: viemClient.account,
            });

            if (gasEstimate > params.maxGasPerTx) {
              return null; // Skip if gas exceeds limit
            }
          } catch {
            // If gas estimation fails, skip or continue based on skipValidation
            if (!params.skipValidation) return null;
          }
        }

        const hash = await arbitrateOnchain($.attestation.uid, decision);
        return {
          hash,
          attestation: $.attestation,
          obligation: $.obligation,
          demand: escrow.demand,
          escrowAttestation: escrow.attestation,
          decision,
        };
      })
    );

    return {
      decisions: decisions.filter(($) => $ !== null),
      escrows,
      fulfillments,
    };
  };

  return {
    arbitratePast,
    listenAndArbitrate: async <ObligationData extends readonly AbiParameter[]>(
      params: ArbitrateParams<ObligationData> & {
        onAfterArbitrate?: (decision: {
          hash: `0x${string}`;
          attestation: Attestation;
          obligation: DecodeAbiParametersReturnType<ObligationData>;
          decision: boolean | null;
        }) => Promise<void>;
        pollingInterval?: number;
      }
    ) => {
      const decisions = params.options?.onlyNew
        ? []
        : await arbitratePast(params);
      // Use optimal polling interval based on transport type
      const optimalInterval = getOptimalPollingInterval(
        viemClient,
        params.pollingInterval
      );

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
                  $.args.uid === params.fulfillment.uid
              )
              .map(async (log) => {
                if (
                  params.fulfillment.uid &&
                  log.args.uid !== params.fulfillment.uid
                )
                  return;

                const attestation = await getAttestation(
                  viemClient,
                  log.args.uid!,
                  addresses
                );

                if (
                  !validateAttestationIntrinsics(
                    attestation,
                    params.fulfillment
                  )
                )
                  return;
                if (
                  params.options?.requireOracle &&
                  attestation.refUID // Check if there's a referenced escrow
                ) {
                  const escrowAttestation = await getAttestation(
                    viemClient,
                    attestation.refUID,
                    addresses
                  );
                  if (!escrowAttestation) return;

                  try {
                    const obligation = decodeAbiParameters(
                      arbiterDemandAbi,
                      escrowAttestation.data
                    )[0];

                    const trustedOracleDemand = decodeAbiParameters(
                      trustedOracleDemandAbi,
                      obligation.demand
                    )[0];

                    if (
                      trustedOracleDemand.oracle.toLowerCase() !==
                      viemClient.account.address.toLowerCase()
                    )
                      return; // Skip if the oracle doesn't match
                  } catch {
                    return; // Skip if decoding fails
                  }
                }
                // Check if arbitration already exists if skipAlreadyArbitrated is enabled
                if (params.options?.skipArbitrated) {
                  const existingLogs = await viemClient.getLogs({
                    address: addresses.trustedOracleArbiter,
                    event: arbitrationMadeEvent,
                    args: {
                      obligation: attestation.uid,
                      oracle: viemClient.account.address,
                    },
                    fromBlock: "earliest",
                    toBlock: "latest",
                  });

                  if (existingLogs.length > 0) {
                    return; // Skip if already arbitrated
                  }
                }

                const obligation = decodeAbiParameters(
                  params.fulfillment.obligationAbi,
                  attestation.data
                );

                const _decision = await params.arbitrate(obligation);
                if (_decision === null) return null;
                const hash = await arbitrateOnchain(attestation.uid, _decision);

                const decision = {
                  hash,
                  attestation,
                  obligation,
                  decision: _decision,
                };

                _decision !== null &&
                  params.onAfterArbitrate &&
                  params.onAfterArbitrate(
                    decision as {
                      hash: `0x${string}`;
                      attestation: Attestation;
                      obligation: DecodeAbiParametersReturnType<ObligationData>;
                      decision: boolean | null;
                    }
                  );
              })
          ),
        pollingInterval: optimalInterval,
      });

      return { decisions, unwatch };
    },
    arbitratePastForEscrow,
    listenAndArbitrateForEscrow: async <
      ObligationData extends readonly AbiParameter[],
      DemandData extends readonly AbiParameter[]
    >(
      params: ArbitrateEscrowParams<ObligationData, DemandData> & {
        onAfterArbitrate?: (decision: {
          hash: `0x${string}`;
          attestation: Attestation;
          obligation: DecodeAbiParametersReturnType<ObligationData>;
          demand: DecodeAbiParametersReturnType<DemandData>;
          escrowAttestation: Attestation;
          decision: boolean | null;
        }) => Promise<void>;
        pollingInterval?: number;
      }
    ) => {
      let decisions, escrowsMap: any;
      if (params.options?.onlyNew) {
        const pastEscrows = await getObligations(
          params.escrow,
          arbiterDemandAbi,
          {
            fromBlock: "earliest",
            toBlock: "latest",
          }
        )
          .then((obligations) =>
            Promise.all(
              obligations
                .filter(
                  ($) =>
                    $.obligation[0].arbiter.toLowerCase() ===
                    addresses.trustedOracleArbiter.toLowerCase()
                )
                .map(async ({ log, attestation, obligation }) => {
                  const trustedOracleDemand = decodeAbiParameters(
                    trustedOracleDemandAbi,
                    obligation[0].demand
                  )[0];

                  if (
                    trustedOracleDemand.oracle.toLowerCase() !==
                    viemClient.account.address.toLowerCase()
                  )
                    return null;

                  const demand = decodeAbiParameters(
                    params.escrow.demandAbi,
                    trustedOracleDemand.data
                  );

                  return {
                    log,
                    attestation,
                    obligation,
                    demand,
                  };
                })
            )
          )
          .then(($) => $.filter(($) => $ !== null));

        // Create a map that includes past escrows and will be updated with new ones
        escrowsMap = new Map<`0x${string}`, (typeof pastEscrows)[0]>();
        pastEscrows.forEach(($) => escrowsMap.set($.attestation.uid, $));
      } else {
        decisions = await arbitratePastForEscrow(params);
        escrowsMap = new Map<`0x${string}`, (typeof decisions)["escrows"][0]>();
        decisions.escrows.forEach(($) => escrowsMap.set($.attestation.uid, $));
      }

      // Use optimal polling interval based on transport type
      const optimalInterval = getOptimalPollingInterval(
        viemClient,
        params.pollingInterval
      );

      const unwatchEscrows = viemClient.watchEvent({
        address: addresses.eas,
        event: attestedEvent,
        args: {
          recipient: params.escrow.recipient,
          attester: params.escrow.attester,
          schemaUID: params.escrow.schemaUID,
        },
        onLogs: async (logs) => {
          await Promise.all(
            logs.map(async (log) => {
              if (!log.args.uid) return;
              if (params.escrow.uid && log.args.uid !== params.escrow.uid)
                return;

              const attestation = await getAttestation(
                viemClient,
                log.args.uid!,
                addresses
              );

              if (!validateAttestationIntrinsics(attestation, params.escrow))
                return;

              const obligation = decodeAbiParameters(
                arbiterDemandAbi,
                attestation.data
              );
              const trustedOracleDemand = decodeAbiParameters(
                trustedOracleDemandAbi,
                obligation[0].demand
              )[0];
              if (
                trustedOracleDemand.oracle.toLowerCase() !==
                viemClient.account.address.toLowerCase()
              )
                return;

              const demand = decodeAbiParameters(
                params.escrow.demandAbi,
                trustedOracleDemand.data
              );

              const escrow = {
                log,
                attestation,
                obligation,
                demand,
              };
              escrowsMap.set(attestation.uid, escrow);
            })
          );
        },
        pollingInterval: optimalInterval,
      });

      const unwatchFulfillments = viemClient.watchEvent({
        address: addresses.eas,
        event: attestedEvent,
        args: {
          recipient: params.fulfillment.recipient,
          attester: params.fulfillment.attester,
          schemaUID: params.fulfillment.schemaUID,
        },
        onLogs: async (logs) => {
          await Promise.all(
            logs.map(async (log) => {
              if (!log.args.uid) return;
              if (
                params.fulfillment.uid &&
                log.args.uid !== params.fulfillment.uid
              )
                return;

              const attestation = await getAttestation(
                viemClient,
                log.args.uid!,
                addresses
              );

              if (!validateAttestationIntrinsics(attestation, {})) return;
              if (!escrowsMap.has(attestation.refUID)) return;

              const escrow = escrowsMap.get(attestation.refUID)!;

              // Check if arbitration already exists if skipAlreadyArbitrated is enabled
              if (params.options?.skipArbitrated) {
                const existingLogs = await viemClient.getLogs({
                  address: addresses.trustedOracleArbiter,
                  event: arbitrationMadeEvent,
                  args: {
                    obligation: attestation.uid,
                    oracle: viemClient.account.address,
                  },
                  fromBlock: "earliest",
                  toBlock: "latest",
                });

                if (existingLogs.length > 0) {
                  return; // Skip if already arbitrated
                }
              }

              const obligation = decodeAbiParameters(
                params.fulfillment.obligationAbi,
                attestation.data
              );

              const _decision = await params.arbitrate(
                obligation,
                escrow.demand
              );
              if (_decision === null) return;
              const hash = await arbitrateOnchain(attestation.uid, _decision);

              const decision = {
                hash,
                attestation,
                obligation,
                demand: escrow.demand,
                escrowAttestation: escrow.attestation,
                decision: _decision,
              };

              _decision !== null &&
                params.onAfterArbitrate &&
                params.onAfterArbitrate(
                  decision as {
                    hash: `0x${string}`;
                    attestation: Attestation;
                    obligation: DecodeAbiParametersReturnType<ObligationData>;
                    demand: DecodeAbiParametersReturnType<DemandData>;
                    escrowAttestation: Attestation;
                    decision: boolean | null;
                  }
                );
            })
          );
        },
        pollingInterval: optimalInterval,
      });

      const unwatch = () => {
        unwatchEscrows();
        unwatchFulfillments();
      };

      return { decisions, unwatch };
    },
  };
};

// Helper function to check if attestation passes time filters
const passesTimeFilters = (attestation: any, filters: TimeFilters): boolean => {
  const currentTime = BigInt(Math.floor(Date.now() / 1000));

  if (filters.minTime && attestation.time < filters.minTime) return false;
  if (filters.maxTime && attestation.time > filters.maxTime) return false;

  if (
    filters.excludeExpired &&
    attestation.expirationTime > BigInt(0) &&
    currentTime > attestation.expirationTime
  ) {
    return false;
  }

  if (filters.minAge && currentTime - attestation.time < filters.minAge)
    return false;
  if (filters.maxAge && currentTime - attestation.time > filters.maxAge)
    return false;

  return true;
};

// Helper function to check if attestation passes property filters
const passesAttestationFilters = (
  attestation: any,
  filters: AttestationFilters
): boolean => {
  if (
    filters.specificAttester &&
    attestation.attester.toLowerCase() !==
      filters.specificAttester.toLowerCase()
  ) {
    return false;
  }

  if (
    filters.excludeAttesters?.some(
      (attester) =>
        attestation.attester.toLowerCase() === attester.toLowerCase()
    )
  ) {
    return false;
  }

  if (
    filters.specificRecipient &&
    attestation.recipient.toLowerCase() !==
      filters.specificRecipient.toLowerCase()
  ) {
    return false;
  }

  if (filters.excludeRevoked && attestation.revocationTime > BigInt(0))
    return false;

  if (filters.requireRefUID && !attestation.refUID) return false;

  if (
    filters.specificSchema &&
    attestation.schema.toLowerCase() !== filters.specificSchema.toLowerCase()
  ) {
    return false;
  }

  return true;
};
