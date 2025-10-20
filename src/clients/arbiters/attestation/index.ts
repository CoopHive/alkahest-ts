import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeAttesterArbiterClient } from "./AttesterArbiter";
import { makeRecipientArbiterClient } from "./RecipientArbiter";
import { makeSchemaArbiterClient } from "./SchemaArbiter";

// TODO: Add imports for other attestation arbiters as they are created
// import { makeTimeArbiterClient } from "./TimeArbiter";
// import { makeUidArbiterClient } from "./UidArbiter";
// import { makeRevocableArbiterClient } from "./RevocableArbiter";
// import { makeRefUidArbiterClient } from "./RefUidArbiter";
// import { makeExpirationTimeArbiterClient } from "./ExpirationTimeArbiter";

/**
 * Attestation Properties Arbiters Client
 * 
 * Provides access to arbiters that validate specific properties of attestations.
 * Each arbiter type comes in two variants:
 * - Composing: Can be combined with a base arbiter for additional validation
 * - Non-Composing: Standalone validation against the property
 * 
 * Supported attestation properties:
 * - Attester: Validates the attester address
 * - Recipient: Validates the recipient address  
 * - Schema: Validates the schema hash
 * - Time: Validates timestamp (After/Before/Equal variants) [TODO]
 * - ExpirationTime: Validates expiration timestamp (After/Before/Equal variants) [TODO]
 * - UID: Validates the attestation UID [TODO]
 * - RefUID: Validates the reference UID [TODO]
 * - Revocable: Validates the revocable flag [TODO]
 */
export const makeAttestationPropertiesArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const attester = makeAttesterArbiterClient(viemClient, addresses);
  const recipient = makeRecipientArbiterClient(viemClient, addresses);
  const schema = makeSchemaArbiterClient(viemClient, addresses);

  // TODO: Add other arbiters as they are implemented
  // const time = makeTimeArbiterClient(viemClient, addresses);
  // const uid = makeUidArbiterClient(viemClient, addresses);
  // const revocable = makeRevocableArbiterClient(viemClient, addresses);
  // const refUid = makeRefUidArbiterClient(viemClient, addresses);
  // const expirationTime = makeExpirationTimeArbiterClient(viemClient, addresses);

  return {
    attester,
    recipient,
    schema,
    // TODO: Add other arbiters
    // time,
    // uid,
    // revocable,
    // refUid,
    // expirationTime,

    // Backward compatibility - flat methods for existing arbiters
    encodeAttesterArbiterComposingDemand: attester.composing.encode,
    decodeAttesterArbiterComposingDemand: attester.composing.decode,
    encodeAttesterArbiterNonComposingDemand: attester.nonComposing.encode,
    decodeAttesterArbiterNonComposingDemand: attester.nonComposing.decode,
    encodeRecipientArbiterComposingDemand: recipient.composing.encode,
    decodeRecipientArbiterComposingDemand: recipient.composing.decode,
    encodeRecipientArbiterNonComposingDemand: recipient.nonComposing.encode,
    decodeRecipientArbiterNonComposingDemand: recipient.nonComposing.decode,
    encodeSchemaArbiterComposingDemand: schema.composing.encode,
    decodeSchemaArbiterComposingDemand: schema.composing.decode,
    encodeSchemaArbiterNonComposingDemand: schema.nonComposing.encode,
    decodeSchemaArbiterNonComposingDemand: schema.nonComposing.decode,

    // TODO: Add flat methods for other arbiters as they are implemented
  };
};