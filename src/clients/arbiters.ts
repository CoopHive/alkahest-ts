import type { ChainAddresses } from "../types";
import type { ViemClient } from "../utils";
import { makeAttestationPropertiesArbitersClient } from "./attestationPropertiesArbiters";
import { makeGeneralArbitersClient } from "./generalArbiters";
import { makeLogicalArbitersClient } from "./logicalArbiters";

/**
 * Unified Arbiters Client
 *
 * Provides a single interface for all arbiter functionality by combining:
 * - General arbiters (TrustedParty, SpecificAttestation, TrustedOracle, etc.)
 * - Logical arbiters (Any, All)
 * - Attestation properties arbiters (Attester, Time, Schema, etc.)
 */
export const makeArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const generalArbiters = makeGeneralArbitersClient(viemClient, addresses);
  const logicalArbiters = makeLogicalArbitersClient(viemClient, addresses);
  const attestationPropertiesArbiters = makeAttestationPropertiesArbitersClient(viemClient, addresses);

  return {
    // General arbiters
    ...generalArbiters,

    // Logical arbiters
    ...logicalArbiters,

    // Attestation properties arbiters
    ...attestationPropertiesArbiters,

    // Backward compatibility aliases
    /**
     * @deprecated Use encodeAnyArbiterDemand instead
     */
    encodeMultiArbiterDemand: logicalArbiters.encodeAnyArbiterDemand,

    /**
     * @deprecated Use decodeAnyArbiterDemand instead
     */
    decodeMultiArbiterDemand: logicalArbiters.decodeAnyArbiterDemand,
  };
};
