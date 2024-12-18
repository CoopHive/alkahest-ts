export const abi = {
  abi: [
    {
      type: "function",
      name: "attest",
      inputs: [
        {
          name: "request",
          type: "tuple",
          internalType: "struct AttestationRequest",
          components: [
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            {
              name: "data",
              type: "tuple",
              internalType: "struct AttestationRequestData",
              components: [
                { name: "recipient", type: "address", internalType: "address" },
                {
                  name: "expirationTime",
                  type: "uint64",
                  internalType: "uint64",
                },
                { name: "revocable", type: "bool", internalType: "bool" },
                { name: "refUID", type: "bytes32", internalType: "bytes32" },
                { name: "data", type: "bytes", internalType: "bytes" },
                { name: "value", type: "uint256", internalType: "uint256" },
              ],
            },
          ],
        },
      ],
      outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "attestByDelegation",
      inputs: [
        {
          name: "delegatedRequest",
          type: "tuple",
          internalType: "struct DelegatedAttestationRequest",
          components: [
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            {
              name: "data",
              type: "tuple",
              internalType: "struct AttestationRequestData",
              components: [
                { name: "recipient", type: "address", internalType: "address" },
                {
                  name: "expirationTime",
                  type: "uint64",
                  internalType: "uint64",
                },
                { name: "revocable", type: "bool", internalType: "bool" },
                { name: "refUID", type: "bytes32", internalType: "bytes32" },
                { name: "data", type: "bytes", internalType: "bytes" },
                { name: "value", type: "uint256", internalType: "uint256" },
              ],
            },
            {
              name: "signature",
              type: "tuple",
              internalType: "struct Signature",
              components: [
                { name: "v", type: "uint8", internalType: "uint8" },
                { name: "r", type: "bytes32", internalType: "bytes32" },
                { name: "s", type: "bytes32", internalType: "bytes32" },
              ],
            },
            { name: "attester", type: "address", internalType: "address" },
            { name: "deadline", type: "uint64", internalType: "uint64" },
          ],
        },
      ],
      outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "getAttestation",
      inputs: [{ name: "uid", type: "bytes32", internalType: "bytes32" }],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct Attestation",
          components: [
            { name: "uid", type: "bytes32", internalType: "bytes32" },
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            { name: "time", type: "uint64", internalType: "uint64" },
            { name: "expirationTime", type: "uint64", internalType: "uint64" },
            { name: "revocationTime", type: "uint64", internalType: "uint64" },
            { name: "refUID", type: "bytes32", internalType: "bytes32" },
            { name: "recipient", type: "address", internalType: "address" },
            { name: "attester", type: "address", internalType: "address" },
            { name: "revocable", type: "bool", internalType: "bool" },
            { name: "data", type: "bytes", internalType: "bytes" },
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getRevokeOffchain",
      inputs: [
        { name: "revoker", type: "address", internalType: "address" },
        { name: "data", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getSchemaRegistry",
      inputs: [],
      outputs: [
        { name: "", type: "address", internalType: "contract ISchemaRegistry" },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getTimestamp",
      inputs: [{ name: "data", type: "bytes32", internalType: "bytes32" }],
      outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "isAttestationValid",
      inputs: [{ name: "uid", type: "bytes32", internalType: "bytes32" }],
      outputs: [{ name: "", type: "bool", internalType: "bool" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "multiAttest",
      inputs: [
        {
          name: "multiRequests",
          type: "tuple[]",
          internalType: "struct MultiAttestationRequest[]",
          components: [
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            {
              name: "data",
              type: "tuple[]",
              internalType: "struct AttestationRequestData[]",
              components: [
                { name: "recipient", type: "address", internalType: "address" },
                {
                  name: "expirationTime",
                  type: "uint64",
                  internalType: "uint64",
                },
                { name: "revocable", type: "bool", internalType: "bool" },
                { name: "refUID", type: "bytes32", internalType: "bytes32" },
                { name: "data", type: "bytes", internalType: "bytes" },
                { name: "value", type: "uint256", internalType: "uint256" },
              ],
            },
          ],
        },
      ],
      outputs: [{ name: "", type: "bytes32[]", internalType: "bytes32[]" }],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "multiAttestByDelegation",
      inputs: [
        {
          name: "multiDelegatedRequests",
          type: "tuple[]",
          internalType: "struct MultiDelegatedAttestationRequest[]",
          components: [
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            {
              name: "data",
              type: "tuple[]",
              internalType: "struct AttestationRequestData[]",
              components: [
                { name: "recipient", type: "address", internalType: "address" },
                {
                  name: "expirationTime",
                  type: "uint64",
                  internalType: "uint64",
                },
                { name: "revocable", type: "bool", internalType: "bool" },
                { name: "refUID", type: "bytes32", internalType: "bytes32" },
                { name: "data", type: "bytes", internalType: "bytes" },
                { name: "value", type: "uint256", internalType: "uint256" },
              ],
            },
            {
              name: "signatures",
              type: "tuple[]",
              internalType: "struct Signature[]",
              components: [
                { name: "v", type: "uint8", internalType: "uint8" },
                { name: "r", type: "bytes32", internalType: "bytes32" },
                { name: "s", type: "bytes32", internalType: "bytes32" },
              ],
            },
            { name: "attester", type: "address", internalType: "address" },
            { name: "deadline", type: "uint64", internalType: "uint64" },
          ],
        },
      ],
      outputs: [{ name: "", type: "bytes32[]", internalType: "bytes32[]" }],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "multiRevoke",
      inputs: [
        {
          name: "multiRequests",
          type: "tuple[]",
          internalType: "struct MultiRevocationRequest[]",
          components: [
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            {
              name: "data",
              type: "tuple[]",
              internalType: "struct RevocationRequestData[]",
              components: [
                { name: "uid", type: "bytes32", internalType: "bytes32" },
                { name: "value", type: "uint256", internalType: "uint256" },
              ],
            },
          ],
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "multiRevokeByDelegation",
      inputs: [
        {
          name: "multiDelegatedRequests",
          type: "tuple[]",
          internalType: "struct MultiDelegatedRevocationRequest[]",
          components: [
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            {
              name: "data",
              type: "tuple[]",
              internalType: "struct RevocationRequestData[]",
              components: [
                { name: "uid", type: "bytes32", internalType: "bytes32" },
                { name: "value", type: "uint256", internalType: "uint256" },
              ],
            },
            {
              name: "signatures",
              type: "tuple[]",
              internalType: "struct Signature[]",
              components: [
                { name: "v", type: "uint8", internalType: "uint8" },
                { name: "r", type: "bytes32", internalType: "bytes32" },
                { name: "s", type: "bytes32", internalType: "bytes32" },
              ],
            },
            { name: "revoker", type: "address", internalType: "address" },
            { name: "deadline", type: "uint64", internalType: "uint64" },
          ],
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "multiRevokeOffchain",
      inputs: [{ name: "data", type: "bytes32[]", internalType: "bytes32[]" }],
      outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "multiTimestamp",
      inputs: [{ name: "data", type: "bytes32[]", internalType: "bytes32[]" }],
      outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "revoke",
      inputs: [
        {
          name: "request",
          type: "tuple",
          internalType: "struct RevocationRequest",
          components: [
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            {
              name: "data",
              type: "tuple",
              internalType: "struct RevocationRequestData",
              components: [
                { name: "uid", type: "bytes32", internalType: "bytes32" },
                { name: "value", type: "uint256", internalType: "uint256" },
              ],
            },
          ],
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "revokeByDelegation",
      inputs: [
        {
          name: "delegatedRequest",
          type: "tuple",
          internalType: "struct DelegatedRevocationRequest",
          components: [
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            {
              name: "data",
              type: "tuple",
              internalType: "struct RevocationRequestData",
              components: [
                { name: "uid", type: "bytes32", internalType: "bytes32" },
                { name: "value", type: "uint256", internalType: "uint256" },
              ],
            },
            {
              name: "signature",
              type: "tuple",
              internalType: "struct Signature",
              components: [
                { name: "v", type: "uint8", internalType: "uint8" },
                { name: "r", type: "bytes32", internalType: "bytes32" },
                { name: "s", type: "bytes32", internalType: "bytes32" },
              ],
            },
            { name: "revoker", type: "address", internalType: "address" },
            { name: "deadline", type: "uint64", internalType: "uint64" },
          ],
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "revokeOffchain",
      inputs: [{ name: "data", type: "bytes32", internalType: "bytes32" }],
      outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "timestamp",
      inputs: [{ name: "data", type: "bytes32", internalType: "bytes32" }],
      outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "version",
      inputs: [],
      outputs: [{ name: "", type: "string", internalType: "string" }],
      stateMutability: "view",
    },
    {
      type: "event",
      name: "Attested",
      inputs: [
        {
          name: "recipient",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "attester",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "uid",
          type: "bytes32",
          indexed: false,
          internalType: "bytes32",
        },
        {
          name: "schemaUID",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Revoked",
      inputs: [
        {
          name: "recipient",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "attester",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "uid",
          type: "bytes32",
          indexed: false,
          internalType: "bytes32",
        },
        {
          name: "schemaUID",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "RevokedOffchain",
      inputs: [
        {
          name: "revoker",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "data",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "timestamp",
          type: "uint64",
          indexed: true,
          internalType: "uint64",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Timestamped",
      inputs: [
        {
          name: "data",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "timestamp",
          type: "uint64",
          indexed: true,
          internalType: "uint64",
        },
      ],
      anonymous: false,
    },
  ],
  bytecode: { object: "0x", sourceMap: "", linkReferences: {} },
  deployedBytecode: { object: "0x", sourceMap: "", linkReferences: {} },
  methodIdentifiers: {
    "attest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)))": "f17325e7",
    "attestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256),(uint8,bytes32,bytes32),address,uint64))":
      "3c042715",
    "getAttestation(bytes32)": "a3112a64",
    "getRevokeOffchain(address,bytes32)": "b469318d",
    "getSchemaRegistry()": "f10b5cc8",
    "getTimestamp(bytes32)": "d45c4435",
    "isAttestationValid(bytes32)": "e30bb563",
    "multiAttest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[])[])":
      "44adc90e",
    "multiAttestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":
      "95411525",
    "multiRevoke((bytes32,(bytes32,uint256)[])[])": "4cb7e9e5",
    "multiRevokeByDelegation((bytes32,(bytes32,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":
      "0eabf660",
    "multiRevokeOffchain(bytes32[])": "13893f61",
    "multiTimestamp(bytes32[])": "e71ff365",
    "revoke((bytes32,(bytes32,uint256)))": "46926267",
    "revokeByDelegation((bytes32,(bytes32,uint256),(uint8,bytes32,bytes32),address,uint64))":
      "a6d4dbc7",
    "revokeOffchain(bytes32)": "cf190f34",
    "timestamp(bytes32)": "4d003070",
    "version()": "54fd4d50",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.26+commit.8a97fa7a"},"language":"Solidity","output":{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"address","name":"attester","type":"address"},{"indexed":false,"internalType":"bytes32","name":"uid","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"schemaUID","type":"bytes32"}],"name":"Attested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"address","name":"attester","type":"address"},{"indexed":false,"internalType":"bytes32","name":"uid","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"schemaUID","type":"bytes32"}],"name":"Revoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"revoker","type":"address"},{"indexed":true,"internalType":"bytes32","name":"data","type":"bytes32"},{"indexed":true,"internalType":"uint64","name":"timestamp","type":"uint64"}],"name":"RevokedOffchain","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"data","type":"bytes32"},{"indexed":true,"internalType":"uint64","name":"timestamp","type":"uint64"}],"name":"Timestamped","type":"event"},{"inputs":[{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AttestationRequestData","name":"data","type":"tuple"}],"internalType":"struct AttestationRequest","name":"request","type":"tuple"}],"name":"attest","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AttestationRequestData","name":"data","type":"tuple"},{"components":[{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"internalType":"struct Signature","name":"signature","type":"tuple"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"uint64","name":"deadline","type":"uint64"}],"internalType":"struct DelegatedAttestationRequest","name":"delegatedRequest","type":"tuple"}],"name":"attestByDelegation","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"getAttestation","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"revoker","type":"address"},{"internalType":"bytes32","name":"data","type":"bytes32"}],"name":"getRevokeOffchain","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSchemaRegistry","outputs":[{"internalType":"contract ISchemaRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"data","type":"bytes32"}],"name":"getTimestamp","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"isAttestationValid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AttestationRequestData[]","name":"data","type":"tuple[]"}],"internalType":"struct MultiAttestationRequest[]","name":"multiRequests","type":"tuple[]"}],"name":"multiAttest","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AttestationRequestData[]","name":"data","type":"tuple[]"},{"components":[{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"internalType":"struct Signature[]","name":"signatures","type":"tuple[]"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"uint64","name":"deadline","type":"uint64"}],"internalType":"struct MultiDelegatedAttestationRequest[]","name":"multiDelegatedRequests","type":"tuple[]"}],"name":"multiAttestByDelegation","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct RevocationRequestData[]","name":"data","type":"tuple[]"}],"internalType":"struct MultiRevocationRequest[]","name":"multiRequests","type":"tuple[]"}],"name":"multiRevoke","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct RevocationRequestData[]","name":"data","type":"tuple[]"},{"components":[{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"internalType":"struct Signature[]","name":"signatures","type":"tuple[]"},{"internalType":"address","name":"revoker","type":"address"},{"internalType":"uint64","name":"deadline","type":"uint64"}],"internalType":"struct MultiDelegatedRevocationRequest[]","name":"multiDelegatedRequests","type":"tuple[]"}],"name":"multiRevokeByDelegation","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"data","type":"bytes32[]"}],"name":"multiRevokeOffchain","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"data","type":"bytes32[]"}],"name":"multiTimestamp","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct RevocationRequestData","name":"data","type":"tuple"}],"internalType":"struct RevocationRequest","name":"request","type":"tuple"}],"name":"revoke","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct RevocationRequestData","name":"data","type":"tuple"},{"components":[{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"internalType":"struct Signature","name":"signature","type":"tuple"},{"internalType":"address","name":"revoker","type":"address"},{"internalType":"uint64","name":"deadline","type":"uint64"}],"internalType":"struct DelegatedRevocationRequest","name":"delegatedRequest","type":"tuple"}],"name":"revokeByDelegation","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"data","type":"bytes32"}],"name":"revokeOffchain","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"data","type":"bytes32"}],"name":"timestamp","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}],"devdoc":{"events":{"Attested(address,address,bytes32,bytes32)":{"params":{"attester":"The attesting account.","recipient":"The recipient of the attestation.","schemaUID":"The UID of the schema.","uid":"The UID of the new attestation."}},"Revoked(address,address,bytes32,bytes32)":{"params":{"attester":"The attesting account.","recipient":"The recipient of the attestation.","schemaUID":"The UID of the schema.","uid":"The UID the revoked attestation."}},"RevokedOffchain(address,bytes32,uint64)":{"params":{"data":"The data.","revoker":"The address of the revoker.","timestamp":"The timestamp."}},"Timestamped(bytes32,uint64)":{"params":{"data":"The data.","timestamp":"The timestamp."}}},"kind":"dev","methods":{"attest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)))":{"params":{"request":"The arguments of the attestation request."},"returns":{"_0":"The UID of the new attestation. Example:     attest({         schema: \\"0facc36681cbe2456019c1b0d1e7bedd6d1d40f6f324bf3dd3a4cef2999200a0\\",         data: {             recipient: \\"0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf\\",             expirationTime: 0,             revocable: true,             refUID: \\"0x0000000000000000000000000000000000000000000000000000000000000000\\",             data: \\"0xF00D\\",             value: 0         }     })"}},"attestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256),(uint8,bytes32,bytes32),address,uint64))":{"params":{"delegatedRequest":"The arguments of the delegated attestation request."},"returns":{"_0":"The UID of the new attestation. Example:     attestByDelegation({         schema: \'0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc\',         data: {             recipient: \'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\',             expirationTime: 1673891048,             revocable: true,             refUID: \'0x0000000000000000000000000000000000000000000000000000000000000000\',             data: \'0x1234\',             value: 0         },         signature: {             v: 28,             r: \'0x148c...b25b\',             s: \'0x5a72...be22\'         },         attester: \'0xc5E8740aD971409492b1A63Db8d83025e0Fc427e\',         deadline: 1673891048     })"}},"getAttestation(bytes32)":{"params":{"uid":"The UID of the attestation to retrieve."},"returns":{"_0":"The attestation data members."}},"getRevokeOffchain(address,bytes32)":{"params":{"data":"The data to query."},"returns":{"_0":"The timestamp the data was timestamped with."}},"getSchemaRegistry()":{"returns":{"_0":"The address of the global schema registry."}},"getTimestamp(bytes32)":{"params":{"data":"The data to query."},"returns":{"_0":"The timestamp the data was timestamped with."}},"isAttestationValid(bytes32)":{"params":{"uid":"The UID of the attestation to retrieve."},"returns":{"_0":"Whether an attestation exists."}},"multiAttest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[])[])":{"params":{"multiRequests":"The arguments of the multi attestation requests. The requests should be grouped by distinct     schema ids to benefit from the best batching optimization."},"returns":{"_0":"The UIDs of the new attestations. Example:     multiAttest([{         schema: \'0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd\',         data: [{             recipient: \'0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf\',             expirationTime: 1673891048,             revocable: true,             refUID: \'0x0000000000000000000000000000000000000000000000000000000000000000\',             data: \'0x1234\',             value: 1000         },         {             recipient: \'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\',             expirationTime: 0,             revocable: false,             refUID: \'0x480df4a039efc31b11bfdf491b383ca138b6bde160988222a2a3509c02cee174\',             data: \'0x00\',             value: 0         }],     },     {         schema: \'0x5ac273ce41e3c8bfa383efe7c03e54c5f0bff29c9f11ef6ffa930fc84ca32425\',         data: [{             recipient: \'0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf\',             expirationTime: 0,             revocable: true,             refUID: \'0x75bf2ed8dca25a8190c50c52db136664de25b2449535839008ccfdab469b214f\',             data: \'0x12345678\',             value: 0         },     }])"}},"multiAttestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":{"params":{"multiDelegatedRequests":"The arguments of the delegated multi attestation requests. The requests should be     grouped by distinct schema ids to benefit from the best batching optimization."},"returns":{"_0":"The UIDs of the new attestations. Example:     multiAttestByDelegation([{         schema: \'0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc\',         data: [{             recipient: \'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\',             expirationTime: 1673891048,             revocable: true,             refUID: \'0x0000000000000000000000000000000000000000000000000000000000000000\',             data: \'0x1234\',             value: 0         },         {             recipient: \'0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf\',             expirationTime: 0,             revocable: false,             refUID: \'0x0000000000000000000000000000000000000000000000000000000000000000\',             data: \'0x00\',             value: 0         }],         signatures: [{             v: 28,             r: \'0x148c...b25b\',             s: \'0x5a72...be22\'         },         {             v: 28,             r: \'0x487s...67bb\',             s: \'0x12ad...2366\'         }],         attester: \'0x1D86495b2A7B524D747d2839b3C645Bed32e8CF4\',         deadline: 1673891048     }])"}},"multiRevoke((bytes32,(bytes32,uint256)[])[])":{"params":{"multiRequests":"The arguments of the multi revocation requests. The requests should be grouped by distinct     schema ids to benefit from the best batching optimization. Example:     multiRevoke([{         schema: \'0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc\',         data: [{             uid: \'0x211296a1ca0d7f9f2cfebf0daaa575bea9b20e968d81aef4e743d699c6ac4b25\',             value: 1000         },         {             uid: \'0xe160ac1bd3606a287b4d53d5d1d6da5895f65b4b4bab6d93aaf5046e48167ade\',             value: 0         }],     },     {         schema: \'0x5ac273ce41e3c8bfa383efe7c03e54c5f0bff29c9f11ef6ffa930fc84ca32425\',         data: [{             uid: \'0x053d42abce1fd7c8fcddfae21845ad34dae287b2c326220b03ba241bc5a8f019\',             value: 0         },     }])"}},"multiRevokeByDelegation((bytes32,(bytes32,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":{"params":{"multiDelegatedRequests":"The arguments of the delegated multi revocation attestation requests. The requests     should be grouped by distinct schema ids to benefit from the best batching optimization. Example:     multiRevokeByDelegation([{         schema: \'0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc\',         data: [{             uid: \'0x211296a1ca0d7f9f2cfebf0daaa575bea9b20e968d81aef4e743d699c6ac4b25\',             value: 1000         },         {             uid: \'0xe160ac1bd3606a287b4d53d5d1d6da5895f65b4b4bab6d93aaf5046e48167ade\',             value: 0         }],         signatures: [{             v: 28,             r: \'0x148c...b25b\',             s: \'0x5a72...be22\'         },         {             v: 28,             r: \'0x487s...67bb\',             s: \'0x12ad...2366\'         }],         revoker: \'0x244934dd3e31bE2c81f84ECf0b3E6329F5381992\',         deadline: 1673891048     }])"}},"multiRevokeOffchain(bytes32[])":{"params":{"data":"The data to timestamp."},"returns":{"_0":"The timestamp the data was revoked with."}},"multiTimestamp(bytes32[])":{"params":{"data":"The data to timestamp."},"returns":{"_0":"The timestamp the data was timestamped with."}},"revoke((bytes32,(bytes32,uint256)))":{"params":{"request":"The arguments of the revocation request. Example:     revoke({         schema: \'0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc\',         data: {             uid: \'0x101032e487642ee04ee17049f99a70590c735b8614079fc9275f9dd57c00966d\',             value: 0         }     })"}},"revokeByDelegation((bytes32,(bytes32,uint256),(uint8,bytes32,bytes32),address,uint64))":{"params":{"delegatedRequest":"The arguments of the delegated revocation request. Example:     revokeByDelegation({         schema: \'0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc\',         data: {             uid: \'0xcbbc12102578c642a0f7b34fe7111e41afa25683b6cd7b5a14caf90fa14d24ba\',             value: 0         },         signature: {             v: 27,             r: \'0xb593...7142\',             s: \'0x0f5b...2cce\'         },         revoker: \'0x244934dd3e31bE2c81f84ECf0b3E6329F5381992\',         deadline: 1673891048     })"}},"revokeOffchain(bytes32)":{"params":{"data":"The data to timestamp."},"returns":{"_0":"The timestamp the data was revoked with."}},"timestamp(bytes32)":{"params":{"data":"The data to timestamp."},"returns":{"_0":"The timestamp the data was timestamped with."}},"version()":{"returns":{"_0":"Semver contract version as a string."}}},"title":"IEAS","version":1},"userdoc":{"events":{"Attested(address,address,bytes32,bytes32)":{"notice":"Emitted when an attestation has been made."},"Revoked(address,address,bytes32,bytes32)":{"notice":"Emitted when an attestation has been revoked."},"RevokedOffchain(address,bytes32,uint64)":{"notice":"Emitted when a data has been revoked."},"Timestamped(bytes32,uint64)":{"notice":"Emitted when a data has been timestamped."}},"kind":"user","methods":{"attest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)))":{"notice":"Attests to a specific schema."},"attestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256),(uint8,bytes32,bytes32),address,uint64))":{"notice":"Attests to a specific schema via the provided ECDSA signature."},"getAttestation(bytes32)":{"notice":"Returns an existing attestation by UID."},"getRevokeOffchain(address,bytes32)":{"notice":"Returns the timestamp that the specified data was timestamped with."},"getSchemaRegistry()":{"notice":"Returns the address of the global schema registry."},"getTimestamp(bytes32)":{"notice":"Returns the timestamp that the specified data was timestamped with."},"isAttestationValid(bytes32)":{"notice":"Checks whether an attestation exists."},"multiAttest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[])[])":{"notice":"Attests to multiple schemas."},"multiAttestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":{"notice":"Attests to multiple schemas using via provided ECDSA signatures."},"multiRevoke((bytes32,(bytes32,uint256)[])[])":{"notice":"Revokes existing attestations to multiple schemas."},"multiRevokeByDelegation((bytes32,(bytes32,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":{"notice":"Revokes existing attestations to multiple schemas via provided ECDSA signatures."},"multiRevokeOffchain(bytes32[])":{"notice":"Revokes the specified multiple bytes32 data."},"multiTimestamp(bytes32[])":{"notice":"Timestamps the specified multiple bytes32 data."},"revoke((bytes32,(bytes32,uint256)))":{"notice":"Revokes an existing attestation to a specific schema."},"revokeByDelegation((bytes32,(bytes32,uint256),(uint8,bytes32,bytes32),address,uint64))":{"notice":"Revokes an existing attestation to a specific schema via the provided ECDSA signature."},"revokeOffchain(bytes32)":{"notice":"Revokes the specified bytes32 data."},"timestamp(bytes32)":{"notice":"Timestamps the specified bytes32 data."},"version()":{"notice":"Returns the full semver contract version."}},"notice":"EAS - Ethereum Attestation Service interface.","version":1}},"settings":{"compilationTarget":{"lib/eas-contracts/contracts/IEAS.sol":"IEAS"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/contracts/",":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]}},"version":1}',
  metadata: {
    compiler: { version: "0.8.26+commit.8a97fa7a" },
    language: "Solidity",
    output: {
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "recipient",
              type: "address",
              indexed: true,
            },
            {
              internalType: "address",
              name: "attester",
              type: "address",
              indexed: true,
            },
            {
              internalType: "bytes32",
              name: "uid",
              type: "bytes32",
              indexed: false,
            },
            {
              internalType: "bytes32",
              name: "schemaUID",
              type: "bytes32",
              indexed: true,
            },
          ],
          type: "event",
          name: "Attested",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "recipient",
              type: "address",
              indexed: true,
            },
            {
              internalType: "address",
              name: "attester",
              type: "address",
              indexed: true,
            },
            {
              internalType: "bytes32",
              name: "uid",
              type: "bytes32",
              indexed: false,
            },
            {
              internalType: "bytes32",
              name: "schemaUID",
              type: "bytes32",
              indexed: true,
            },
          ],
          type: "event",
          name: "Revoked",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "revoker",
              type: "address",
              indexed: true,
            },
            {
              internalType: "bytes32",
              name: "data",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "uint64",
              name: "timestamp",
              type: "uint64",
              indexed: true,
            },
          ],
          type: "event",
          name: "RevokedOffchain",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "data",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "uint64",
              name: "timestamp",
              type: "uint64",
              indexed: true,
            },
          ],
          type: "event",
          name: "Timestamped",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "struct AttestationRequest",
              name: "request",
              type: "tuple",
              components: [
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                {
                  internalType: "struct AttestationRequestData",
                  name: "data",
                  type: "tuple",
                  components: [
                    {
                      internalType: "address",
                      name: "recipient",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "expirationTime",
                      type: "uint64",
                    },
                    { internalType: "bool", name: "revocable", type: "bool" },
                    {
                      internalType: "bytes32",
                      name: "refUID",
                      type: "bytes32",
                    },
                    { internalType: "bytes", name: "data", type: "bytes" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                  ],
                },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "attest",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        },
        {
          inputs: [
            {
              internalType: "struct DelegatedAttestationRequest",
              name: "delegatedRequest",
              type: "tuple",
              components: [
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                {
                  internalType: "struct AttestationRequestData",
                  name: "data",
                  type: "tuple",
                  components: [
                    {
                      internalType: "address",
                      name: "recipient",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "expirationTime",
                      type: "uint64",
                    },
                    { internalType: "bool", name: "revocable", type: "bool" },
                    {
                      internalType: "bytes32",
                      name: "refUID",
                      type: "bytes32",
                    },
                    { internalType: "bytes", name: "data", type: "bytes" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                  ],
                },
                {
                  internalType: "struct Signature",
                  name: "signature",
                  type: "tuple",
                  components: [
                    { internalType: "uint8", name: "v", type: "uint8" },
                    { internalType: "bytes32", name: "r", type: "bytes32" },
                    { internalType: "bytes32", name: "s", type: "bytes32" },
                  ],
                },
                { internalType: "address", name: "attester", type: "address" },
                { internalType: "uint64", name: "deadline", type: "uint64" },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "attestByDelegation",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        },
        {
          inputs: [{ internalType: "bytes32", name: "uid", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
          name: "getAttestation",
          outputs: [
            {
              internalType: "struct Attestation",
              name: "",
              type: "tuple",
              components: [
                { internalType: "bytes32", name: "uid", type: "bytes32" },
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                { internalType: "uint64", name: "time", type: "uint64" },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                { internalType: "bytes32", name: "refUID", type: "bytes32" },
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "address", name: "attester", type: "address" },
                { internalType: "bool", name: "revocable", type: "bool" },
                { internalType: "bytes", name: "data", type: "bytes" },
              ],
            },
          ],
        },
        {
          inputs: [
            { internalType: "address", name: "revoker", type: "address" },
            { internalType: "bytes32", name: "data", type: "bytes32" },
          ],
          stateMutability: "view",
          type: "function",
          name: "getRevokeOffchain",
          outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "getSchemaRegistry",
          outputs: [
            {
              internalType: "contract ISchemaRegistry",
              name: "",
              type: "address",
            },
          ],
        },
        {
          inputs: [{ internalType: "bytes32", name: "data", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
          name: "getTimestamp",
          outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
        },
        {
          inputs: [{ internalType: "bytes32", name: "uid", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
          name: "isAttestationValid",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
        },
        {
          inputs: [
            {
              internalType: "struct MultiAttestationRequest[]",
              name: "multiRequests",
              type: "tuple[]",
              components: [
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                {
                  internalType: "struct AttestationRequestData[]",
                  name: "data",
                  type: "tuple[]",
                  components: [
                    {
                      internalType: "address",
                      name: "recipient",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "expirationTime",
                      type: "uint64",
                    },
                    { internalType: "bool", name: "revocable", type: "bool" },
                    {
                      internalType: "bytes32",
                      name: "refUID",
                      type: "bytes32",
                    },
                    { internalType: "bytes", name: "data", type: "bytes" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                  ],
                },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "multiAttest",
          outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
        },
        {
          inputs: [
            {
              internalType: "struct MultiDelegatedAttestationRequest[]",
              name: "multiDelegatedRequests",
              type: "tuple[]",
              components: [
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                {
                  internalType: "struct AttestationRequestData[]",
                  name: "data",
                  type: "tuple[]",
                  components: [
                    {
                      internalType: "address",
                      name: "recipient",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "expirationTime",
                      type: "uint64",
                    },
                    { internalType: "bool", name: "revocable", type: "bool" },
                    {
                      internalType: "bytes32",
                      name: "refUID",
                      type: "bytes32",
                    },
                    { internalType: "bytes", name: "data", type: "bytes" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                  ],
                },
                {
                  internalType: "struct Signature[]",
                  name: "signatures",
                  type: "tuple[]",
                  components: [
                    { internalType: "uint8", name: "v", type: "uint8" },
                    { internalType: "bytes32", name: "r", type: "bytes32" },
                    { internalType: "bytes32", name: "s", type: "bytes32" },
                  ],
                },
                { internalType: "address", name: "attester", type: "address" },
                { internalType: "uint64", name: "deadline", type: "uint64" },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "multiAttestByDelegation",
          outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
        },
        {
          inputs: [
            {
              internalType: "struct MultiRevocationRequest[]",
              name: "multiRequests",
              type: "tuple[]",
              components: [
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                {
                  internalType: "struct RevocationRequestData[]",
                  name: "data",
                  type: "tuple[]",
                  components: [
                    { internalType: "bytes32", name: "uid", type: "bytes32" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                  ],
                },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "multiRevoke",
        },
        {
          inputs: [
            {
              internalType: "struct MultiDelegatedRevocationRequest[]",
              name: "multiDelegatedRequests",
              type: "tuple[]",
              components: [
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                {
                  internalType: "struct RevocationRequestData[]",
                  name: "data",
                  type: "tuple[]",
                  components: [
                    { internalType: "bytes32", name: "uid", type: "bytes32" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                  ],
                },
                {
                  internalType: "struct Signature[]",
                  name: "signatures",
                  type: "tuple[]",
                  components: [
                    { internalType: "uint8", name: "v", type: "uint8" },
                    { internalType: "bytes32", name: "r", type: "bytes32" },
                    { internalType: "bytes32", name: "s", type: "bytes32" },
                  ],
                },
                { internalType: "address", name: "revoker", type: "address" },
                { internalType: "uint64", name: "deadline", type: "uint64" },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "multiRevokeByDelegation",
        },
        {
          inputs: [
            { internalType: "bytes32[]", name: "data", type: "bytes32[]" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "multiRevokeOffchain",
          outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
        },
        {
          inputs: [
            { internalType: "bytes32[]", name: "data", type: "bytes32[]" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "multiTimestamp",
          outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
        },
        {
          inputs: [
            {
              internalType: "struct RevocationRequest",
              name: "request",
              type: "tuple",
              components: [
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                {
                  internalType: "struct RevocationRequestData",
                  name: "data",
                  type: "tuple",
                  components: [
                    { internalType: "bytes32", name: "uid", type: "bytes32" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                  ],
                },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "revoke",
        },
        {
          inputs: [
            {
              internalType: "struct DelegatedRevocationRequest",
              name: "delegatedRequest",
              type: "tuple",
              components: [
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                {
                  internalType: "struct RevocationRequestData",
                  name: "data",
                  type: "tuple",
                  components: [
                    { internalType: "bytes32", name: "uid", type: "bytes32" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                  ],
                },
                {
                  internalType: "struct Signature",
                  name: "signature",
                  type: "tuple",
                  components: [
                    { internalType: "uint8", name: "v", type: "uint8" },
                    { internalType: "bytes32", name: "r", type: "bytes32" },
                    { internalType: "bytes32", name: "s", type: "bytes32" },
                  ],
                },
                { internalType: "address", name: "revoker", type: "address" },
                { internalType: "uint64", name: "deadline", type: "uint64" },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "revokeByDelegation",
        },
        {
          inputs: [{ internalType: "bytes32", name: "data", type: "bytes32" }],
          stateMutability: "nonpayable",
          type: "function",
          name: "revokeOffchain",
          outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
        },
        {
          inputs: [{ internalType: "bytes32", name: "data", type: "bytes32" }],
          stateMutability: "nonpayable",
          type: "function",
          name: "timestamp",
          outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "version",
          outputs: [{ internalType: "string", name: "", type: "string" }],
        },
      ],
      devdoc: {
        kind: "dev",
        methods: {
          "attest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)))": {
            params: { request: "The arguments of the attestation request." },
            returns: {
              _0: 'The UID of the new attestation. Example:     attest({         schema: "0facc36681cbe2456019c1b0d1e7bedd6d1d40f6f324bf3dd3a4cef2999200a0",         data: {             recipient: "0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf",             expirationTime: 0,             revocable: true,             refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",             data: "0xF00D",             value: 0         }     })',
            },
          },
          "attestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256),(uint8,bytes32,bytes32),address,uint64))":
            {
              params: {
                delegatedRequest:
                  "The arguments of the delegated attestation request.",
              },
              returns: {
                _0: "The UID of the new attestation. Example:     attestByDelegation({         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',         data: {             recipient: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',             expirationTime: 1673891048,             revocable: true,             refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',             data: '0x1234',             value: 0         },         signature: {             v: 28,             r: '0x148c...b25b',             s: '0x5a72...be22'         },         attester: '0xc5E8740aD971409492b1A63Db8d83025e0Fc427e',         deadline: 1673891048     })",
              },
            },
          "getAttestation(bytes32)": {
            params: { uid: "The UID of the attestation to retrieve." },
            returns: { _0: "The attestation data members." },
          },
          "getRevokeOffchain(address,bytes32)": {
            params: { data: "The data to query." },
            returns: { _0: "The timestamp the data was timestamped with." },
          },
          "getSchemaRegistry()": {
            returns: { _0: "The address of the global schema registry." },
          },
          "getTimestamp(bytes32)": {
            params: { data: "The data to query." },
            returns: { _0: "The timestamp the data was timestamped with." },
          },
          "isAttestationValid(bytes32)": {
            params: { uid: "The UID of the attestation to retrieve." },
            returns: { _0: "Whether an attestation exists." },
          },
          "multiAttest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[])[])":
            {
              params: {
                multiRequests:
                  "The arguments of the multi attestation requests. The requests should be grouped by distinct     schema ids to benefit from the best batching optimization.",
              },
              returns: {
                _0: "The UIDs of the new attestations. Example:     multiAttest([{         schema: '0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd',         data: [{             recipient: '0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf',             expirationTime: 1673891048,             revocable: true,             refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',             data: '0x1234',             value: 1000         },         {             recipient: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',             expirationTime: 0,             revocable: false,             refUID: '0x480df4a039efc31b11bfdf491b383ca138b6bde160988222a2a3509c02cee174',             data: '0x00',             value: 0         }],     },     {         schema: '0x5ac273ce41e3c8bfa383efe7c03e54c5f0bff29c9f11ef6ffa930fc84ca32425',         data: [{             recipient: '0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf',             expirationTime: 0,             revocable: true,             refUID: '0x75bf2ed8dca25a8190c50c52db136664de25b2449535839008ccfdab469b214f',             data: '0x12345678',             value: 0         },     }])",
              },
            },
          "multiAttestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":
            {
              params: {
                multiDelegatedRequests:
                  "The arguments of the delegated multi attestation requests. The requests should be     grouped by distinct schema ids to benefit from the best batching optimization.",
              },
              returns: {
                _0: "The UIDs of the new attestations. Example:     multiAttestByDelegation([{         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',         data: [{             recipient: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',             expirationTime: 1673891048,             revocable: true,             refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',             data: '0x1234',             value: 0         },         {             recipient: '0xdEADBeAFdeAdbEafdeadbeafDeAdbEAFdeadbeaf',             expirationTime: 0,             revocable: false,             refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',             data: '0x00',             value: 0         }],         signatures: [{             v: 28,             r: '0x148c...b25b',             s: '0x5a72...be22'         },         {             v: 28,             r: '0x487s...67bb',             s: '0x12ad...2366'         }],         attester: '0x1D86495b2A7B524D747d2839b3C645Bed32e8CF4',         deadline: 1673891048     }])",
              },
            },
          "multiRevoke((bytes32,(bytes32,uint256)[])[])": {
            params: {
              multiRequests:
                "The arguments of the multi revocation requests. The requests should be grouped by distinct     schema ids to benefit from the best batching optimization. Example:     multiRevoke([{         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',         data: [{             uid: '0x211296a1ca0d7f9f2cfebf0daaa575bea9b20e968d81aef4e743d699c6ac4b25',             value: 1000         },         {             uid: '0xe160ac1bd3606a287b4d53d5d1d6da5895f65b4b4bab6d93aaf5046e48167ade',             value: 0         }],     },     {         schema: '0x5ac273ce41e3c8bfa383efe7c03e54c5f0bff29c9f11ef6ffa930fc84ca32425',         data: [{             uid: '0x053d42abce1fd7c8fcddfae21845ad34dae287b2c326220b03ba241bc5a8f019',             value: 0         },     }])",
            },
          },
          "multiRevokeByDelegation((bytes32,(bytes32,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":
            {
              params: {
                multiDelegatedRequests:
                  "The arguments of the delegated multi revocation attestation requests. The requests     should be grouped by distinct schema ids to benefit from the best batching optimization. Example:     multiRevokeByDelegation([{         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',         data: [{             uid: '0x211296a1ca0d7f9f2cfebf0daaa575bea9b20e968d81aef4e743d699c6ac4b25',             value: 1000         },         {             uid: '0xe160ac1bd3606a287b4d53d5d1d6da5895f65b4b4bab6d93aaf5046e48167ade',             value: 0         }],         signatures: [{             v: 28,             r: '0x148c...b25b',             s: '0x5a72...be22'         },         {             v: 28,             r: '0x487s...67bb',             s: '0x12ad...2366'         }],         revoker: '0x244934dd3e31bE2c81f84ECf0b3E6329F5381992',         deadline: 1673891048     }])",
              },
            },
          "multiRevokeOffchain(bytes32[])": {
            params: { data: "The data to timestamp." },
            returns: { _0: "The timestamp the data was revoked with." },
          },
          "multiTimestamp(bytes32[])": {
            params: { data: "The data to timestamp." },
            returns: { _0: "The timestamp the data was timestamped with." },
          },
          "revoke((bytes32,(bytes32,uint256)))": {
            params: {
              request:
                "The arguments of the revocation request. Example:     revoke({         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',         data: {             uid: '0x101032e487642ee04ee17049f99a70590c735b8614079fc9275f9dd57c00966d',             value: 0         }     })",
            },
          },
          "revokeByDelegation((bytes32,(bytes32,uint256),(uint8,bytes32,bytes32),address,uint64))":
            {
              params: {
                delegatedRequest:
                  "The arguments of the delegated revocation request. Example:     revokeByDelegation({         schema: '0x8e72f5bc0a8d4be6aa98360baa889040c50a0e51f32dbf0baa5199bd93472ebc',         data: {             uid: '0xcbbc12102578c642a0f7b34fe7111e41afa25683b6cd7b5a14caf90fa14d24ba',             value: 0         },         signature: {             v: 27,             r: '0xb593...7142',             s: '0x0f5b...2cce'         },         revoker: '0x244934dd3e31bE2c81f84ECf0b3E6329F5381992',         deadline: 1673891048     })",
              },
            },
          "revokeOffchain(bytes32)": {
            params: { data: "The data to timestamp." },
            returns: { _0: "The timestamp the data was revoked with." },
          },
          "timestamp(bytes32)": {
            params: { data: "The data to timestamp." },
            returns: { _0: "The timestamp the data was timestamped with." },
          },
          "version()": {
            returns: { _0: "Semver contract version as a string." },
          },
        },
        version: 1,
      },
      userdoc: {
        kind: "user",
        methods: {
          "attest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)))": {
            notice: "Attests to a specific schema.",
          },
          "attestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256),(uint8,bytes32,bytes32),address,uint64))":
            {
              notice:
                "Attests to a specific schema via the provided ECDSA signature.",
            },
          "getAttestation(bytes32)": {
            notice: "Returns an existing attestation by UID.",
          },
          "getRevokeOffchain(address,bytes32)": {
            notice:
              "Returns the timestamp that the specified data was timestamped with.",
          },
          "getSchemaRegistry()": {
            notice: "Returns the address of the global schema registry.",
          },
          "getTimestamp(bytes32)": {
            notice:
              "Returns the timestamp that the specified data was timestamped with.",
          },
          "isAttestationValid(bytes32)": {
            notice: "Checks whether an attestation exists.",
          },
          "multiAttest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[])[])":
            { notice: "Attests to multiple schemas." },
          "multiAttestByDelegation((bytes32,(address,uint64,bool,bytes32,bytes,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":
            {
              notice:
                "Attests to multiple schemas using via provided ECDSA signatures.",
            },
          "multiRevoke((bytes32,(bytes32,uint256)[])[])": {
            notice: "Revokes existing attestations to multiple schemas.",
          },
          "multiRevokeByDelegation((bytes32,(bytes32,uint256)[],(uint8,bytes32,bytes32)[],address,uint64)[])":
            {
              notice:
                "Revokes existing attestations to multiple schemas via provided ECDSA signatures.",
            },
          "multiRevokeOffchain(bytes32[])": {
            notice: "Revokes the specified multiple bytes32 data.",
          },
          "multiTimestamp(bytes32[])": {
            notice: "Timestamps the specified multiple bytes32 data.",
          },
          "revoke((bytes32,(bytes32,uint256)))": {
            notice: "Revokes an existing attestation to a specific schema.",
          },
          "revokeByDelegation((bytes32,(bytes32,uint256),(uint8,bytes32,bytes32),address,uint64))":
            {
              notice:
                "Revokes an existing attestation to a specific schema via the provided ECDSA signature.",
            },
          "revokeOffchain(bytes32)": {
            notice: "Revokes the specified bytes32 data.",
          },
          "timestamp(bytes32)": {
            notice: "Timestamps the specified bytes32 data.",
          },
          "version()": { notice: "Returns the full semver contract version." },
        },
        version: 1,
      },
    },
    settings: {
      remappings: [
        "@eas/=lib/eas-contracts/contracts/",
        "@openzeppelin/=lib/openzeppelin-contracts/contracts/",
        "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/",
      ],
      optimizer: { enabled: true, runs: 200 },
      metadata: { bytecodeHash: "ipfs" },
      compilationTarget: { "lib/eas-contracts/contracts/IEAS.sol": "IEAS" },
      evmVersion: "cancun",
      libraries: {},
      viaIR: true,
    },
    sources: {
      "lib/eas-contracts/contracts/Common.sol": {
        keccak256:
          "0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685",
        urls: [
          "bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d",
          "dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/IEAS.sol": {
        keccak256:
          "0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12",
        urls: [
          "bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880",
          "dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISchemaRegistry.sol": {
        keccak256:
          "0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754",
        urls: [
          "bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158",
          "dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISemver.sol": {
        keccak256:
          "0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18",
        urls: [
          "bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0",
          "dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
        keccak256:
          "0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
        urls: [
          "bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
          "dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR",
        ],
        license: "MIT",
      },
    },
    version: 1,
  },
  id: 1,
} as const;
