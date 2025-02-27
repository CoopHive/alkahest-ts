import { beforeAll, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import {
  createWalletClient,
  http,
} from "viem";

let clientBuyer: ReturnType<typeof makeClient>;
let clientSeller: ReturnType<typeof makeClient>;

beforeAll(() => {
  // create clients
  clientBuyer = makeClient(
    createWalletClient({
      account: privateKeyToAccount(process.env.PRIVKEY_ALICE as `0x${string}`, {
        nonceManager, // automatic nonce management
      }),
      chain: baseSepolia,
      transport: http(process.env.RPC_URL as string),
    }),
  );
  clientSeller = makeClient(
    createWalletClient({
      account: privateKeyToAccount(process.env.PRIVKEY_BOB as `0x${string}`, {
        nonceManager, // automatic nonce management
      }),
      chain: baseSepolia,
      transport: http(process.env.RPC_URL as string),
    }),
  );
});

test("createAttestation", async () => {
  // Test creating a basic attestation
  const attestationData = "0x1234"; // Example data
  const schemaUID = "0x0000000000000000000000000000000000000000000000000000000000000000"; // Placeholder schema UID
  const recipient = clientSeller.address;
  const expiration = 0n; // No expiration
  const refUID = "0x0000000000000000000000000000000000000000000000000000000000000000"; // No reference
  
  const result = await clientBuyer.attestation.createAttestation(
    schemaUID as `0x${string}`,
    recipient,
    expiration,
    true, // Revocable
    refUID as `0x${string}`,
    attestationData as `0x${string}`
  );
  
  expect(result.hash).toBeString();
  expect(result.attested).toBeDefined();
});

test("attestationEscrow", async () => {
  // First create an attestation
  const attestationData = "0x5678"; // Example data
  const schemaUID = "0x0000000000000000000000000000000000000000000000000000000000000000"; // Placeholder schema UID
  const recipient = clientBuyer.address;
  const expiration = 0n; // No expiration
  const refUID = "0x0000000000000000000000000000000000000000000000000000000000000000"; // No reference
  
  const attestation = await clientBuyer.attestation.createAttestation(
    schemaUID as `0x${string}`,
    recipient,
    expiration,
    true, // Revocable
    refUID as `0x${string}`,
    attestationData as `0x${string}`
  );
  
  // Create custom demand
  const demand = clientBuyer.arbiters.encodeTrustedPartyDemand({
    creator: clientSeller.address,
    baseArbiter: contractAddresses["Base Sepolia"].trivialArbiter,
    baseDemand: "0x", // Empty demand for test
  });
  
  // Create escrow with attestation
  const escrow = await clientBuyer.attestation.createEscrow2(
    attestation.attested.uid,
    {
      arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter,
      demand,
    }
  );
  
  console.log("Escrow created:", escrow);
  expect(escrow.hash).toBeString();
  
  // Create fulfillment attestation
  const fulfillmentHash = await clientSeller.stringResult.makeStatement("Attestation fulfilled");
  const fulfillment = await clientSeller.getAttestationFromTxHash(fulfillmentHash);
  
  // Collect payment from escrow
  const collection = await clientSeller.attestation.collectEscrow2(
    escrow.attested.uid,
    fulfillment.uid
  );
  
  console.log("Collection:", collection);
  expect(collection.hash).toBeString();
  
  // Verify fulfillment
  const fulfillmentResult = await clientBuyer.waitForFulfillment(
    contractAddresses["Base Sepolia"].attestationEscrowObligation2,
    escrow.attested.uid
  );
  
  console.log("Fulfillment result:", fulfillmentResult);
  expect(fulfillmentResult.fulfillment).toBeDefined();
});

test("attestAndCreateEscrow", async () => {
  // Test creating and escrowing an attestation in one transaction
  const attestationData = "0xabcd"; // Example data
  const schemaUID = "0x0000000000000000000000000000000000000000000000000000000000000000"; // Placeholder schema UID
  const recipient = clientBuyer.address;
  
  // Create custom demand
  const demand = clientBuyer.arbiters.encodeTrustedPartyDemand({
    creator: clientSeller.address,
    baseArbiter: contractAddresses["Base Sepolia"].trivialArbiter,
    baseDemand: "0x", // Empty demand for test
  });
  
  // Create and escrow attestation in one step
  const result = await clientBuyer.attestation.attestAndCreateEscrow(
    {
      schema: schemaUID as `0x${string}`,
      data: {
        recipient: recipient,
        expirationTime: 0n, // No expiration
        revocable: true,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        data: attestationData as `0x${string}`,
        value: 0n,
      }
    },
    {
      arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter,
      demand: demand,
      expirationTime: 0n, // No expiration
    }
  );
  
  console.log("Attest and escrow result:", result);
  expect(result.hash).toBeString();
  expect(result.attested).toBeDefined();
});