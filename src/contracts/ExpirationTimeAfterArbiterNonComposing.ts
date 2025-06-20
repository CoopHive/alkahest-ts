export const abi = {
  "abi": [
    {
        "type": "function",
        "name": "checkStatement",
        "inputs": [
            {
                "name": "statement",
                "type": "tuple",
                "internalType": "struct Attestation",
                "components": [
                    {
                        "name": "uid",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    {
                        "name": "schema",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    {
                        "name": "time",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "expirationTime",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "revocationTime",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "refUID",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    {
                        "name": "recipient",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "attester",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "revocable",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "data",
                        "type": "bytes",
                        "internalType": "bytes"
                    }
                ]
            },
            {
                "name": "demand",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "decodeDemandData",
        "inputs": [
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct ExpirationTimeAfterArbiter.DemandData",
                "components": [
                    {
                        "name": "expirationTime",
                        "type": "uint64",
                        "internalType": "uint64"
                    }
                ]
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "error",
        "name": "ExpirationTimeNotAfter",
        "inputs": []
    }
],
  "bytecode": {
    "object": "0x",
    "sourceMap": "",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x",
    "sourceMap": "",
    "linkReferences": {}
  },
  "methodIdentifiers": {},
  "rawMetadata": "",
  "metadata": {
    "compiler": {
      "version": ""
    },
    "language": "Solidity",
    "output": {
      "abi": [],
      "devdoc": {
        "kind": "dev",
        "methods": {},
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {},
        "version": 1
      }
    },
    "settings": {
      "remappings": [],
      "optimizer": {
        "enabled": false,
        "runs": 200
      },
      "metadata": {
        "bytecodeHash": "ipfs"
      },
      "compilationTarget": {},
      "libraries": {}
    },
    "sources": {},
    "version": 1
  },
  "id": ""
} as const;