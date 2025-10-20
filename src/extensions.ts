import { makeArbitersClient } from "./clients/arbiters";
import { makeAttestationClient } from "./clients/attestation";
import { makeErc20Client } from "./clients/erc20";
import { makeErc721Client } from "./clients/erc721";
import { makeErc1155Client } from "./clients/erc1155";
import { makeStringObligationClient } from "./clients/stringObligation";
import { makeTokenBundleClient } from "./clients/tokenBundle";
import { makeOracleClient } from "./oracle/oracle";

/**
 * Creates the default extension for the Alkahest client with all standard functionality
 * @param client - The base client to extend
 * @returns Extension object with all standard client functionality
 */
export const makeDefaultExtension = (client: any) => {
  const arbiters = makeArbitersClient(client.viemClient, client.contractAddresses);

  return {
    /** ERC-20 token utilities for barter deals */
    erc20: makeErc20Client(client.viemClient, client.contractAddresses),

    /** ERC-721 NFT utilities for barter deals */
    erc721: makeErc721Client(client.viemClient, client.contractAddresses),

    /** ERC-1155 multi-token utilities for barter deals */
    erc1155: makeErc1155Client(client.viemClient, client.contractAddresses),

    /** Token bundle utilities for complex barter deals */
    bundle: makeTokenBundleClient(client.viemClient, client.contractAddresses),

    /** Attestation utilities for creating buy/sell attestations */
    attestation: makeAttestationClient(client.viemClient, client.contractAddresses),

    /** All arbiters functionality with hierarchical structure */
    arbiters,

    /** Utilities for StringObligation */
    stringObligation: makeStringObligationClient(client.viemClient, client.contractAddresses),

    /** Oracle functionality - backward compatibility alias */
    oracle: makeOracleClient(client.viemClient, client.contractAddresses),
  };
};
