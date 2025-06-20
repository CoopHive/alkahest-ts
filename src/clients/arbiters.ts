import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";
import { makeGeneralArbitersClient } from "./generalArbiters";
import { makeLogicalArbitersClient } from "./logicalArbiters";

/**
 * @deprecated This client is now split into multiple specialized clients:
 * - Use makeGeneralArbitersClient() for basic arbiters (TrustedParty, SpecificAttestation, TrustedOracle, etc.)
 * - Use makeLogicalArbitersClient() for logical arbiters (Any, All)
 * - Use makeAttestationPropertiesArbitersClient() for attestation property arbiters
 */
export const makeArbitersClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => {
  const generalArbiters = makeGeneralArbitersClient(viemClient, addresses);
  const logicalArbiters = makeLogicalArbitersClient(viemClient, addresses);

  return {
    // Deprecated methods - use makeLogicalArbitersClient() instead
    /**
     * @deprecated Use makeLogicalArbitersClient().encodeAnyArbiterDemand or encodeAllArbiterDemand instead
     */
    encodeMultiArbiterDemand: logicalArbiters.encodeAnyArbiterDemand,

    /**
     * @deprecated Use makeLogicalArbitersClient().decodeAnyArbiterDemand or decodeAllArbiterDemand instead
     */
    decodeMultiArbiterDemand: logicalArbiters.decodeAnyArbiterDemand,

    // Re-export from generalArbiters for backward compatibility
    ...generalArbiters,
  };
};
