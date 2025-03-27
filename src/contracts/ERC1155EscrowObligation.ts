export const abi = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_eas",
          "type": "address",
          "internalType": "contract IEAS"
        },
        {
          "name": "_schemaRegistry",
          "type": "address",
          "internalType": "contract ISchemaRegistry"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "ATTESTATION_SCHEMA",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "attest",
      "inputs": [
        {
          "name": "attestation",
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
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
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
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "collectExpired",
      "inputs": [
        {
          "name": "uid",
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
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "collectPayment",
      "inputs": [
        {
          "name": "_payment",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "_fulfillment",
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
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "decodeStatementData",
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
          "internalType": "struct ERC1155EscrowObligation.StatementData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "token",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "getSchema",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct SchemaRecord",
          "components": [
            {
              "name": "uid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "resolver",
              "type": "address",
              "internalType": "contract ISchemaResolver"
            },
            {
              "name": "revocable",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "schema",
              "type": "string",
              "internalType": "string"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getStatement",
      "inputs": [
        {
          "name": "uid",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
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
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getStatementData",
      "inputs": [
        {
          "name": "uid",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct ERC1155EscrowObligation.StatementData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "token",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isPayable",
      "inputs": [],
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
      "name": "makeStatement",
      "inputs": [
        {
          "name": "data",
          "type": "tuple",
          "internalType": "struct ERC1155EscrowObligation.StatementData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "token",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "name": "expirationTime",
          "type": "uint64",
          "internalType": "uint64"
        }
      ],
      "outputs": [
        {
          "name": "uid_",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "makeStatementFor",
      "inputs": [
        {
          "name": "data",
          "type": "tuple",
          "internalType": "struct ERC1155EscrowObligation.StatementData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "token",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "name": "expirationTime",
          "type": "uint64",
          "internalType": "uint64"
        },
        {
          "name": "payer",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "recipient",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "uid_",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "multiAttest",
      "inputs": [
        {
          "name": "attestations",
          "type": "tuple[]",
          "internalType": "struct Attestation[]",
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
          "name": "values",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "multiRevoke",
      "inputs": [
        {
          "name": "attestations",
          "type": "tuple[]",
          "internalType": "struct Attestation[]",
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
          "name": "values",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "onERC1155BatchReceived",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "onERC1155Received",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "revoke",
      "inputs": [
        {
          "name": "attestation",
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
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "version",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "EscrowClaimed",
      "inputs": [
        {
          "name": "payment",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "fulfillment",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "fulfiller",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "EscrowMade",
      "inputs": [
        {
          "name": "payment",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "buyer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AccessDenied",
      "inputs": []
    },
    {
      "type": "error",
      "name": "AttestationCreateFailed",
      "inputs": []
    },
    {
      "type": "error",
      "name": "AttestationNotFound",
      "inputs": [
        {
          "name": "attestationId",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "AttestationRevoked",
      "inputs": []
    },
    {
      "type": "error",
      "name": "DeadlineExpired",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ERC1155TransferFailed",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "InsufficientValue",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidEAS",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidEscrow",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidEscrowAttestation",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidFulfillment",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidLength",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidSchema",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotFromStatement",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotPayable",
      "inputs": []
    },
    {
      "type": "error",
      "name": "RevocationFailed",
      "inputs": [
        {
          "name": "attestationId",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "UnauthorizedCall",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x610160806040523461021c57604081611ff380380380916100208285610256565b83398101031261021c5780516001600160a01b0381169182820361021c5760200151916001600160a01b03831680840361021c57604051608081016001600160401b0381118282101761024257604052604d815260208101927f6164647265737320617262697465722c2062797465732064656d616e642c206184527f64647265737320746f6b656e2c2075696e7432353620746f6b656e49642c207560408301526c1a5b9d0c8d4d88185b5bdd5b9d609a1b60608301526001608052600360a0525f60c05215610233576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af1908115610228575f916101f2575b5061014052604051611d79908161027a82396080518161097a015260a051816109a6015260c051816109d1015260e05181611d040152610100518161070a015261012051818181610365015281816105010152818161087901528181610aa00152611a6c0152610140518181816103a5015281816106d8015281816108b90152818161093601528181610beb0152818161146401526119bf0152f35b90506020813d602011610220575b8161020d60209383610256565b8101031261021c57515f610156565b5f80fd5b3d9150610200565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176102425760405256fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610f81575080630b0f07d514610f365780631272ff8b14610e1e57806330088bc914610a5e57806354fd4d50146109595780635bf2f20d1461091e5780635cc02d2f146108415780636b122fe01461069757806388e5b2d91461066e57806391db0b7e1461066e578063a84f2aa0146104c6578063bc197c8114610430578063c75c572b1461032d578063ce46e04614610311578063e112ea081461020c578063e49617e1146101da578063e60c3505146101da578063eed8f3521461015c5763f23a6e610361000f57346101595760a03660031901126101595761011b6110a0565b506101246110b6565b506084356001600160401b038111610157576101449036906004016110fb565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b5034610159576080366003190112610159576004356001600160401b0381116101575760a0600319823603011261015757610195610fd4565b604435916001600160a01b03831683036101d657606435936001600160a01b03851685036101595760206101ce8686868660040161180f565b604051908152f35b8380fd5b60206101f860e06101ea36611340565b6101f2611d02565b016117fb565b6040516001600160a01b0390911630148152f35b503461015957602036600319011261015957600435906001600160401b03821161015957366023830112156101595781600401356001600160401b03811161015757820191602483019036821161030d576102656117d0565b5060208185031261030d576024810135906001600160401b0382116101d657019260a09084900312610157576040519161029e83611064565b6102aa602485016110cc565b83526044840135906001600160401b0382116101595750926102d660a4926024610309968401016110fb565b60208401526102e7606482016110cc565b60408401526084810135606084015201356080820152604051918291826112ee565b0390f35b8280fd5b5034610159578060031936011261015957602090604051908152f35b5034610159576020366003190112610159576103476117d0565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156104235781926103ff575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036103f0576103096103e4610120840151602080825183010191016113d8565b604051918291826112ee565b63629cd40b60e11b8152600490fd5b61041c9192503d8084833e610414818361107f565b8101906115d7565b905f61039d565b50604051903d90823e3d90fd5b50346101595760a03660031901126101595761044a6110a0565b506104536110b6565b506044356001600160401b03811161015757610473903690600401611287565b506064356001600160401b03811161015757610493903690600401611287565b506084356001600160401b038111610157576104b39036906004016110fb565b5060405163bc197c8160e01b8152602090f35b503461015957602036600319011261015957600435906104e461156c565b506040516328c44a9960e21b8152600481018390529181836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa80938394610652575b5061054c576301fb6dd160e01b825260045260249150fd5b506001600160401b03606083015116421061064357610579610120830151602080825183010191016113d8565b604081019060c060018060a01b0383511694019260018060a01b03845116606083019560808751940193845192823b1561063f5791849391846105d5969460405197889586948593637921219560e11b855230600486016116b2565b03925af1918261062a575b505061061f57905191519251905160405163334a7d1b60e21b815293849361061b93916001600160a01b0390811691309116600487016116ea565b0390fd5b602060405160018152f35b61063582809261107f565b61015957806105e0565b8480fd5b637bf6a16f60e01b8152600490fd5b6106679194503d8085833e610414818361107f565b925f610534565b602061068d61067c36611237565b92610688929192611d02565b61171d565b6040519015158152f35b50346101595780600319360112610159576060806040516106b781611049565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa908115610835578091610780575b606082610309604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190611141565b90503d8082843e610791818461107f565b820191602081840312610157578051906001600160401b03821161030d57019060808284031261015957604051916107c883611049565b8051835260208101516001600160a01b038116810361030d5760208401526107f2604082016115ca565b60408401526060810151906001600160401b03821161030d57019083601f83011215610159575060609281602061082b93519101611388565b828201525f61073a565b604051903d90823e3d90fd5b50346101595760203660031901126101595761085b61156c565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610423578192610902575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036108f3576040516020808252819061030990820185611165565b63295d5f3960e01b8152600490fd5b6109179192503d8084833e610414818361107f565b905f6108b1565b503461015957806003193601126101595760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346101595780600319360112610159576020610a4a60016103099361099e7f0000000000000000000000000000000000000000000000000000000000000000611b95565b9082856109ca7f0000000000000000000000000000000000000000000000000000000000000000611b95565b81806109f57f0000000000000000000000000000000000000000000000000000000000000000611b95565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f19810183528261107f565b604051918291602083526020830190611141565b5034610d7f576040366003190112610d7f576004359060243590610a8061156c565b50610a8961156c565b506040516328c44a9960e21b8152600481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f81602481865afa5f9181610e02575b50610af257846301fb6dd160e01b5f5260045260245ffd5b84906040516328c44a9960e21b81528560048201525f81602481885afa5f9181610de6575b50610b2f57856301fb6dd160e01b5f5260045260245ffd5b90859194610b3c82611b3a565b15610dd757610ba96020610b5d6101208501518280825183010191016113d8565b9360018060a01b03855116610b978a84880151935160405196879586948594631272ff8b60e01b8652606060048701526064860190611165565b84810360031901602486015290611141565b90604483015203915afa908115610dcc575f91610d92575b5015610d8357604051610bd38161102e565b8481525f602082015260405190610be98261102e565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b15610d7f5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af19081610d6a575b50610c6b5763614cf93960e01b84526004839052602484fd5b919092604083019160c060018060a01b0384511696019460018060a01b03865116606086019760808951970196875192823b15610d6657928692839283610cca9660405197889586948593637921219560e11b855230600486016116b2565b03925af19182610d51575b5050610d14575050905192519351915160405163334a7d1b60e21b815294859461061b949293506001600160a01b0391821691309116600487016116ea565b602093508560018060a01b03905116917fd903ca32e81477af89f5b8a6ce888d185cc715390e49474a77b4c6846254cccd6040519480a460018152f35b81610d5b9161107f565b6101d6578389610cd5565b8680fd5b610d779195505f9061107f565b5f9386610c52565b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610dc4575b81610dad6020938361107f565b81010312610d7f57610dbe906115ca565b87610bc1565b3d9150610da0565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b610dfb9192503d805f833e610414818361107f565b9087610b17565b610e179192503d805f833e610414818361107f565b905f610ada565b34610d7f576060366003190112610d7f576004356001600160401b038111610d7f576101406003198236030112610d7f5760405190610e5c82610ffe565b8060040135825260248101356020830152610e7960448201610fea565b6040830152610e8a60648201610fea565b6060830152610e9b60848201610fea565b608083015260a481013560a0830152610eb660c482016110cc565b60c0830152610ec760e482016110cc565b60e08301526101048101358015158103610d7f57610100830152610124810135906001600160401b038211610d7f576004610f0592369201016110fb565b6101208201526024356001600160401b038111610d7f57602091610f3061068d9236906004016110fb565b90611462565b34610d7f576040366003190112610d7f576004356001600160401b038111610d7f5760a06003198236030112610d7f576101ce602091610f74610fd4565b903391339160040161180f565b34610d7f576020366003190112610d7f576004359063ffffffff60e01b8216809203610d7f57602091630271189760e51b8114908115610fc3575b5015158152f35b6301ffc9a760e01b14905083610fbc565b602435906001600160401b0382168203610d7f57565b35906001600160401b0382168203610d7f57565b61014081019081106001600160401b0382111761101a57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761101a57604052565b608081019081106001600160401b0382111761101a57604052565b60a081019081106001600160401b0382111761101a57604052565b90601f801991011681019081106001600160401b0382111761101a57604052565b600435906001600160a01b0382168203610d7f57565b602435906001600160a01b0382168203610d7f57565b35906001600160a01b0382168203610d7f57565b6001600160401b03811161101a57601f01601f191660200190565b81601f82011215610d7f57803590611112826110e0565b92611120604051948561107f565b82845260208383010111610d7f57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b906101406101206112049380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190611141565b90565b9181601f84011215610d7f578235916001600160401b038311610d7f576020808501948460051b010111610d7f57565b6040600319820112610d7f576004356001600160401b038111610d7f578161126191600401611207565b92909291602435906001600160401b038211610d7f5761128391600401611207565b9091565b9080601f83011215610d7f578135916001600160401b03831161101a578260051b90604051936112ba602084018661107f565b8452602080850192820101928311610d7f57602001905b8282106112de5750505090565b81358152602091820191016112d1565b6020815260018060a01b03825116602082015260a0608061131d602085015183604086015260c0850190611141565b93600180841b036040820151166060850152606081015182850152015191015290565b6020600319820112610d7f57600435906001600160401b038211610d7f57610140908290036003190112610d7f5760040190565b51906001600160a01b0382168203610d7f57565b929192611394826110e0565b916113a2604051938461107f565b829481845281830111610d7f578281602093845f96015e010152565b9080601f83011215610d7f57815161120492602001611388565b602081830312610d7f578051906001600160401b038211610d7f57019060a082820312610d7f576040519161140c83611064565b61141581611374565b835260208101516001600160401b038111610d7f576080926114389183016113be565b602084015261144960408201611374565b6040840152606081015160608401520151608082015290565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361155d5761149681611b3a565b15611557576114b66101206114c6920151602080825183010191016113d8565b91602080825183010191016113d8565b604082810151908201516001600160a01b039081169116149182611544575b82611530575b82611517575b826114fb57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506114f1565b9150608082015160808201511115916114eb565b91506060820151606082015114916114e5565b50505f90565b635f9bd90760e11b5f5260045ffd5b6040519061157982610ffe565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610d7f57565b51908115158203610d7f57565b602081830312610d7f578051906001600160401b038211610d7f570161014081830312610d7f576040519161160b83610ffe565b8151835260208201516020840152611625604083016115b6565b6040840152611636606083016115b6565b6060840152611647608083016115b6565b608084015260a082015160a084015261166260c08301611374565b60c084015261167360e08301611374565b60e084015261168561010083016115ca565b6101008401526101208201516001600160401b038111610d7f576116a992016113be565b61012082015290565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b9290928184036117c1575f91345b858410156117b657818410156117a2578360051b80860135908282116117935784013561013e1985360301811215610d7f5730906001600160a01b039061177690870160e0016117fb565b1603611788576001910393019261172b565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b604051906117dd82611064565b5f608083828152606060208201528260408201528260608201520152565b356001600160a01b0381168103610d7f5790565b9391929160408501915f91906001600160a01b0361182c856117fb565b1694606088013597608081013596803b15610d7f575f88611869928c838d60405196879586948593637921219560e11b85523090600486016116b2565b03925af19081611b25575b506118a457888861061b896118888a6117fb565b9360405194859463334a7d1b60e21b86523091600487016116ea565b604051602080820152949893975091959094916001600160a01b036118c8826110cc565b1660408601526020810135601e1982360301811215611b215701602081359101916001600160401b038211611b21578136038313611b215761195e946101009483889560a060608801528160e08801528787013784840186018c90526001600160a01b0390611936906110cc565b16608085015260a084015260c0830152601f801991011681010301601f19810183528261107f565b6040519160c083018381106001600160401b03821117611b0d57906001600160401b039160405260018060a01b0316938484521660208301526001604083015284606083015260808201528360a082015260206040516119bd8161102e565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611a5e608083015160c060e4860152610124850190611141565b9101516101048301520381877f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1849181611ad9575b50611ab257634a10301360e11b8452600484fd5b7f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06819480a3565b9091506020813d602011611b05575b81611af56020938361107f565b8101031261063f5751905f611a9e565b3d9150611ae8565b634e487b7160e01b87526041600452602487fd5b8980fd5b611b329196505f9061107f565b5f945f611874565b6001600160401b036060820151168015159081611b8b575b50611b7c57608001516001600160401b0316611b6d57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611b52565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611cdf575b806d04ee2d6d415b85acef8100000000600a921015611cc4575b662386f26fc10000811015611cb0575b6305f5e100811015611c9f575b612710811015611c90575b6064811015611c82575b1015611c77575b600a60216001840193611c1c856110e0565b94611c2a604051968761107f565b808652611c39601f19916110e0565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611c7257600a9091611c44565b505090565b600190910190611c0a565b606460029104930192611c03565b61271060049104930192611bf9565b6305f5e10060089104930192611bee565b662386f26fc1000060109104930192611be1565b6d04ee2d6d415b85acef810000000060209104930192611bd1565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611bb7565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611d3457565b634ca8886760e01b5f5260045ffdfea26469706673582212208112a0e73a3bfb24589100f7c035e2496f873ecb7e03fd2814b1742e3bffd88e64736f6c634300081b0033",
    "sourceMap": "605:7479:86:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;605:7479:86;;;;1763:4;605:7479;759:14:6;688:1:9;783:14:6;;-1:-1:-1;807:14:6;;708:26:9;704:76;;605:7479:86;790:10:9;;605:7479:86;790:10:9;;;713::73;;733:32;;-1:-1:-1;605:7479:86;;;;;;;;;;;796:48:73;;605:7479:86;796:48:73;;;605:7479:86;;;;;;;;;;;;;;;;;;;;;828:4:73;605:7479:86;;;;1763:4;605:7479;;;;;;-1:-1:-1;;605:7479:86;;;796:48:73;;;;;;;;;;-1:-1:-1;796:48:73;;;-1:-1:-1;775:69:73;;;605:7479:86;;;;;;;;;;;;;;783:14:6;605:7479:86;;;;;807:14:6;605:7479:86;;;;;790:10:9;605:7479:86;;;;;733:32:73;605:7479:86;;;;;713:10:73;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;775:69:73;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;796:48:73;;;605:7479:86;796:48:73;;605:7479:86;796:48:73;;;;;;605:7479:86;796:48:73;;;:::i;:::-;;;605:7479:86;;;;;796:48:73;;;605:7479:86;-1:-1:-1;605:7479:86;;796:48:73;;;-1:-1:-1;796:48:73;;;605:7479:86;;;-1:-1:-1;605:7479:86;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;605:7479:86;;;;-1:-1:-1;605:7479:86;;;;;-1:-1:-1;605:7479:86;;;;;;-1:-1:-1;;605:7479:86;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610f81575080630b0f07d514610f365780631272ff8b14610e1e57806330088bc914610a5e57806354fd4d50146109595780635bf2f20d1461091e5780635cc02d2f146108415780636b122fe01461069757806388e5b2d91461066e57806391db0b7e1461066e578063a84f2aa0146104c6578063bc197c8114610430578063c75c572b1461032d578063ce46e04614610311578063e112ea081461020c578063e49617e1146101da578063e60c3505146101da578063eed8f3521461015c5763f23a6e610361000f57346101595760a03660031901126101595761011b6110a0565b506101246110b6565b506084356001600160401b038111610157576101449036906004016110fb565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b5034610159576080366003190112610159576004356001600160401b0381116101575760a0600319823603011261015757610195610fd4565b604435916001600160a01b03831683036101d657606435936001600160a01b03851685036101595760206101ce8686868660040161180f565b604051908152f35b8380fd5b60206101f860e06101ea36611340565b6101f2611d02565b016117fb565b6040516001600160a01b0390911630148152f35b503461015957602036600319011261015957600435906001600160401b03821161015957366023830112156101595781600401356001600160401b03811161015757820191602483019036821161030d576102656117d0565b5060208185031261030d576024810135906001600160401b0382116101d657019260a09084900312610157576040519161029e83611064565b6102aa602485016110cc565b83526044840135906001600160401b0382116101595750926102d660a4926024610309968401016110fb565b60208401526102e7606482016110cc565b60408401526084810135606084015201356080820152604051918291826112ee565b0390f35b8280fd5b5034610159578060031936011261015957602090604051908152f35b5034610159576020366003190112610159576103476117d0565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156104235781926103ff575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036103f0576103096103e4610120840151602080825183010191016113d8565b604051918291826112ee565b63629cd40b60e11b8152600490fd5b61041c9192503d8084833e610414818361107f565b8101906115d7565b905f61039d565b50604051903d90823e3d90fd5b50346101595760a03660031901126101595761044a6110a0565b506104536110b6565b506044356001600160401b03811161015757610473903690600401611287565b506064356001600160401b03811161015757610493903690600401611287565b506084356001600160401b038111610157576104b39036906004016110fb565b5060405163bc197c8160e01b8152602090f35b503461015957602036600319011261015957600435906104e461156c565b506040516328c44a9960e21b8152600481018390529181836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa80938394610652575b5061054c576301fb6dd160e01b825260045260249150fd5b506001600160401b03606083015116421061064357610579610120830151602080825183010191016113d8565b604081019060c060018060a01b0383511694019260018060a01b03845116606083019560808751940193845192823b1561063f5791849391846105d5969460405197889586948593637921219560e11b855230600486016116b2565b03925af1918261062a575b505061061f57905191519251905160405163334a7d1b60e21b815293849361061b93916001600160a01b0390811691309116600487016116ea565b0390fd5b602060405160018152f35b61063582809261107f565b61015957806105e0565b8480fd5b637bf6a16f60e01b8152600490fd5b6106679194503d8085833e610414818361107f565b925f610534565b602061068d61067c36611237565b92610688929192611d02565b61171d565b6040519015158152f35b50346101595780600319360112610159576060806040516106b781611049565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa908115610835578091610780575b606082610309604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190611141565b90503d8082843e610791818461107f565b820191602081840312610157578051906001600160401b03821161030d57019060808284031261015957604051916107c883611049565b8051835260208101516001600160a01b038116810361030d5760208401526107f2604082016115ca565b60408401526060810151906001600160401b03821161030d57019083601f83011215610159575060609281602061082b93519101611388565b828201525f61073a565b604051903d90823e3d90fd5b50346101595760203660031901126101595761085b61156c565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610423578192610902575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036108f3576040516020808252819061030990820185611165565b63295d5f3960e01b8152600490fd5b6109179192503d8084833e610414818361107f565b905f6108b1565b503461015957806003193601126101595760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346101595780600319360112610159576020610a4a60016103099361099e7f0000000000000000000000000000000000000000000000000000000000000000611b95565b9082856109ca7f0000000000000000000000000000000000000000000000000000000000000000611b95565b81806109f57f0000000000000000000000000000000000000000000000000000000000000000611b95565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f19810183528261107f565b604051918291602083526020830190611141565b5034610d7f576040366003190112610d7f576004359060243590610a8061156c565b50610a8961156c565b506040516328c44a9960e21b8152600481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f81602481865afa5f9181610e02575b50610af257846301fb6dd160e01b5f5260045260245ffd5b84906040516328c44a9960e21b81528560048201525f81602481885afa5f9181610de6575b50610b2f57856301fb6dd160e01b5f5260045260245ffd5b90859194610b3c82611b3a565b15610dd757610ba96020610b5d6101208501518280825183010191016113d8565b9360018060a01b03855116610b978a84880151935160405196879586948594631272ff8b60e01b8652606060048701526064860190611165565b84810360031901602486015290611141565b90604483015203915afa908115610dcc575f91610d92575b5015610d8357604051610bd38161102e565b8481525f602082015260405190610be98261102e565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b15610d7f5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af19081610d6a575b50610c6b5763614cf93960e01b84526004839052602484fd5b919092604083019160c060018060a01b0384511696019460018060a01b03865116606086019760808951970196875192823b15610d6657928692839283610cca9660405197889586948593637921219560e11b855230600486016116b2565b03925af19182610d51575b5050610d14575050905192519351915160405163334a7d1b60e21b815294859461061b949293506001600160a01b0391821691309116600487016116ea565b602093508560018060a01b03905116917fd903ca32e81477af89f5b8a6ce888d185cc715390e49474a77b4c6846254cccd6040519480a460018152f35b81610d5b9161107f565b6101d6578389610cd5565b8680fd5b610d779195505f9061107f565b5f9386610c52565b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610dc4575b81610dad6020938361107f565b81010312610d7f57610dbe906115ca565b87610bc1565b3d9150610da0565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b610dfb9192503d805f833e610414818361107f565b9087610b17565b610e179192503d805f833e610414818361107f565b905f610ada565b34610d7f576060366003190112610d7f576004356001600160401b038111610d7f576101406003198236030112610d7f5760405190610e5c82610ffe565b8060040135825260248101356020830152610e7960448201610fea565b6040830152610e8a60648201610fea565b6060830152610e9b60848201610fea565b608083015260a481013560a0830152610eb660c482016110cc565b60c0830152610ec760e482016110cc565b60e08301526101048101358015158103610d7f57610100830152610124810135906001600160401b038211610d7f576004610f0592369201016110fb565b6101208201526024356001600160401b038111610d7f57602091610f3061068d9236906004016110fb565b90611462565b34610d7f576040366003190112610d7f576004356001600160401b038111610d7f5760a06003198236030112610d7f576101ce602091610f74610fd4565b903391339160040161180f565b34610d7f576020366003190112610d7f576004359063ffffffff60e01b8216809203610d7f57602091630271189760e51b8114908115610fc3575b5015158152f35b6301ffc9a760e01b14905083610fbc565b602435906001600160401b0382168203610d7f57565b35906001600160401b0382168203610d7f57565b61014081019081106001600160401b0382111761101a57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761101a57604052565b608081019081106001600160401b0382111761101a57604052565b60a081019081106001600160401b0382111761101a57604052565b90601f801991011681019081106001600160401b0382111761101a57604052565b600435906001600160a01b0382168203610d7f57565b602435906001600160a01b0382168203610d7f57565b35906001600160a01b0382168203610d7f57565b6001600160401b03811161101a57601f01601f191660200190565b81601f82011215610d7f57803590611112826110e0565b92611120604051948561107f565b82845260208383010111610d7f57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b906101406101206112049380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190611141565b90565b9181601f84011215610d7f578235916001600160401b038311610d7f576020808501948460051b010111610d7f57565b6040600319820112610d7f576004356001600160401b038111610d7f578161126191600401611207565b92909291602435906001600160401b038211610d7f5761128391600401611207565b9091565b9080601f83011215610d7f578135916001600160401b03831161101a578260051b90604051936112ba602084018661107f565b8452602080850192820101928311610d7f57602001905b8282106112de5750505090565b81358152602091820191016112d1565b6020815260018060a01b03825116602082015260a0608061131d602085015183604086015260c0850190611141565b93600180841b036040820151166060850152606081015182850152015191015290565b6020600319820112610d7f57600435906001600160401b038211610d7f57610140908290036003190112610d7f5760040190565b51906001600160a01b0382168203610d7f57565b929192611394826110e0565b916113a2604051938461107f565b829481845281830111610d7f578281602093845f96015e010152565b9080601f83011215610d7f57815161120492602001611388565b602081830312610d7f578051906001600160401b038211610d7f57019060a082820312610d7f576040519161140c83611064565b61141581611374565b835260208101516001600160401b038111610d7f576080926114389183016113be565b602084015261144960408201611374565b6040840152606081015160608401520151608082015290565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361155d5761149681611b3a565b15611557576114b66101206114c6920151602080825183010191016113d8565b91602080825183010191016113d8565b604082810151908201516001600160a01b039081169116149182611544575b82611530575b82611517575b826114fb57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506114f1565b9150608082015160808201511115916114eb565b91506060820151606082015114916114e5565b50505f90565b635f9bd90760e11b5f5260045ffd5b6040519061157982610ffe565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610d7f57565b51908115158203610d7f57565b602081830312610d7f578051906001600160401b038211610d7f570161014081830312610d7f576040519161160b83610ffe565b8151835260208201516020840152611625604083016115b6565b6040840152611636606083016115b6565b6060840152611647608083016115b6565b608084015260a082015160a084015261166260c08301611374565b60c084015261167360e08301611374565b60e084015261168561010083016115ca565b6101008401526101208201516001600160401b038111610d7f576116a992016113be565b61012082015290565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b9290928184036117c1575f91345b858410156117b657818410156117a2578360051b80860135908282116117935784013561013e1985360301811215610d7f5730906001600160a01b039061177690870160e0016117fb565b1603611788576001910393019261172b565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b604051906117dd82611064565b5f608083828152606060208201528260408201528260608201520152565b356001600160a01b0381168103610d7f5790565b9391929160408501915f91906001600160a01b0361182c856117fb565b1694606088013597608081013596803b15610d7f575f88611869928c838d60405196879586948593637921219560e11b85523090600486016116b2565b03925af19081611b25575b506118a457888861061b896118888a6117fb565b9360405194859463334a7d1b60e21b86523091600487016116ea565b604051602080820152949893975091959094916001600160a01b036118c8826110cc565b1660408601526020810135601e1982360301811215611b215701602081359101916001600160401b038211611b21578136038313611b215761195e946101009483889560a060608801528160e08801528787013784840186018c90526001600160a01b0390611936906110cc565b16608085015260a084015260c0830152601f801991011681010301601f19810183528261107f565b6040519160c083018381106001600160401b03821117611b0d57906001600160401b039160405260018060a01b0316938484521660208301526001604083015284606083015260808201528360a082015260206040516119bd8161102e565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611a5e608083015160c060e4860152610124850190611141565b9101516101048301520381877f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1849181611ad9575b50611ab257634a10301360e11b8452600484fd5b7f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06819480a3565b9091506020813d602011611b05575b81611af56020938361107f565b8101031261063f5751905f611a9e565b3d9150611ae8565b634e487b7160e01b87526041600452602487fd5b8980fd5b611b329196505f9061107f565b5f945f611874565b6001600160401b036060820151168015159081611b8b575b50611b7c57608001516001600160401b0316611b6d57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611b52565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611cdf575b806d04ee2d6d415b85acef8100000000600a921015611cc4575b662386f26fc10000811015611cb0575b6305f5e100811015611c9f575b612710811015611c90575b6064811015611c82575b1015611c77575b600a60216001840193611c1c856110e0565b94611c2a604051968761107f565b808652611c39601f19916110e0565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611c7257600a9091611c44565b505090565b600190910190611c0a565b606460029104930192611c03565b61271060049104930192611bf9565b6305f5e10060089104930192611bee565b662386f26fc1000060109104930192611be1565b6d04ee2d6d415b85acef810000000060209104930192611bd1565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611bb7565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611d3457565b634ca8886760e01b5f5260045ffdfea26469706673582212208112a0e73a3bfb24589100f7c035e2496f873ecb7e03fd2814b1742e3bffd88e64736f6c634300081b0033",
    "sourceMap": "605:7479:86:-:0;;;;;;;;;;-1:-1:-1;605:7479:86;;;;;;;;;1183:12:9;;;1054:5;1183:12;605:7479:86;1054:5:9;1183:12;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;605:7479:86;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;:::i;:::-;-1:-1:-1;605:7479:86;;-1:-1:-1;;;605:7479:86;;;;;;;;;;;;;;;;;-1:-1:-1;;605:7479:86;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;1299:20:73;;605:7479:86;;;:::i;:::-;881:58:9;;:::i;:::-;1299:20:73;;:::i;:::-;605:7479:86;;-1:-1:-1;;;;;605:7479:86;;;1331:4:73;1299:37;605:7479:86;;;;;;;;;;-1:-1:-1;;605:7479:86;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;:::i;:::-;-1:-1:-1;605:7479:86;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;605:7479:86;;;;;;:::i;:::-;-1:-1:-1;605:7479:86;;-1:-1:-1;;;7719:23:86;;605:7479;;;7719:23;;;605:7479;;;;7719:23;605:7479;7719:3;-1:-1:-1;;;;;605:7479:86;7719:23;;;;;;;;;;;605:7479;7756:18;605:7479;7756:18;;605:7479;7778:18;7756:40;7752:91;;605:7479;7860:45;7871:16;;;;605:7479;;;;7860:45;;;;;;:::i;:::-;605:7479;;;;;;;:::i;7752:91::-;-1:-1:-1;;;7817:26:86;;605:7479;;7817:26;7719:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;605:7479;;;;;;;;;;;;;;;;;;-1:-1:-1;;605:7479:86;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;:::i;:::-;-1:-1:-1;605:7479:86;;-1:-1:-1;;;605:7479:86;;;;;;;;;;;;-1:-1:-1;;605:7479:86;;;;;;5801:30;605:7479;;:::i;:::-;-1:-1:-1;605:7479:86;;-1:-1:-1;;;5893:23:86;;605:7479;5893:23;;605:7479;;;;;;5893:23;605:7479;5893:3;-1:-1:-1;;;;;605:7479:86;5893:23;;;;;;;;605:7479;-1:-1:-1;5889:172:86;;-1:-1:-1;;;6026:24:86;;605:7479;;5893:23;;-1:-1:-1;6026:24:86;5889:172;5967:20;-1:-1:-1;;;;;6093:26:86;;;605:7479;;6075:15;:44;6071:87;;6197:79;6221:16;;;;605:7479;;;;6197:79;;;;;;:::i;:::-;605:7479;6366:10;;605:7479;6443:21;605:7479;;;;;;;;6443:21;;605:7479;;;;;;;;;6093:26;6482:12;;605:7479;6512:11;605:7479;;6512:11;;605:7479;;;6357:200;;;;;;605:7479;;;;;6357:200;605:7479;;;;;;;;;;;;;;6357:200;;6420:4;605:7479;6357:200;;;:::i;:::-;;;;;;;;;5889:172;-1:-1:-1;;6341:458:86;;605:7479;;;;;;;;;;-1:-1:-1;;;6596:192:86;;605:7479;;;6596:192;;605:7479;-1:-1:-1;;;;;605:7479:86;;;;6420:4;;605:7479;;6596:192;;;:::i;:::-;;;;6341:458;605:7479;;;;;;;6357:200;;;;;;:::i;:::-;605:7479;;6357:200;;;;605:7479;;;6071:87;-1:-1:-1;;;6140:18:86;;605:7479;;6140:18;5893:23;;;;;;;;;;;;;;:::i;:::-;;;;;605:7479;;1442:1461:9;605:7479:86;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;:::-;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;1711:44:73;;1736:18;605:7479:86;1711:44:73;;605:7479:86;;;1711:44:73;605:7479:86;;;;;;1711:14:73;605:7479:86;1711:44:73;;;;;;;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1711:44:73:-;;;;;;;;;;;;:::i;:::-;;;605:7479:86;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1711:44:73;;;;605:7479:86;;;;;;;;;;;;;;;;;-1:-1:-1;;605:7479:86;;;;;;:::i;:::-;-1:-1:-1;605:7479:86;;-1:-1:-1;;;1484:23:73;;605:7479:86;;;1484:23:73;;;605:7479:86;;;;1484:23:73;605:7479:86;1484:3:73;-1:-1:-1;;;;;605:7479:86;1484:23:73;;;;;;;;;;;605:7479:86;1521:18:73;605:7479:86;1521:18:73;;605:7479:86;1543:18:73;1521:40;1517:71;;605:7479:86;;;;;;;;;;;;;;:::i;1517:71:73:-;-1:-1:-1;;;1570:18:73;;605:7479:86;;1570:18:73;1484:23;;;;;;;;;;;;;;:::i;:::-;;;;;605:7479:86;;;;;;;;;;;;;;;;469:43:73;605:7479:86;;;;;;;;;;;;;;;;1055:104:6;;605:7479:86;;1089:6:6;1072:24;1089:6;1072:24;:::i;:::-;1120:6;;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;605:7479:86;;;;;;;;;;;;1055:104:6;;;605:7479:86;;;;-1:-1:-1;;;605:7479:86;;;;;;;;;;;;;;;;;-1:-1:-1;;;605:7479:86;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;:::-;605:7479:86;;;;;1055:104:6;605:7479:86;;1055:104:6;605:7479:86;;;;:::i;:::-;;;;;;;-1:-1:-1;;605:7479:86;;;;;;;;;3697:26;605:7479;;:::i;:::-;3733:30;605:7479;;:::i;:::-;-1:-1:-1;605:7479:86;;-1:-1:-1;;;3833:28:86;;605:7479;3833:28;;605:7479;;;3833:3;-1:-1:-1;;;;;605:7479:86;;;-1:-1:-1;605:7479:86;;;;3833:28;;605:7479;;3833:28;;;605:7479;-1:-1:-1;3829:178:86;;3967:29;;;;605:7479;3967:29;605:7479;;;;3967:29;3829:178;3912:16;;605:7479;;;;;4080:32;;;605:7479;4080:32;;605:7479;;4080:32;605:7479;4080:32;;;;605:7479;;4080:32;;;3829:178;-1:-1:-1;4076:212:86;;3967:29;;;;605:7479;4244:33;605:7479;;;;4244:33;4076:212;4185:20;;;4076:212;4303:25;;;:::i;:::-;4302:26;4298:65;;605:7479;;4409:75;4433:12;;;;605:7479;;;;4409:75;;;;;;:::i;:::-;605:7479;;;;;;;;;;4604:18;;;;;605:7479;;;;;;;;;;;;;;4513:152;;605:7479;;4513:152;;605:7479;;;;;;:::i;:::-;;;;-1:-1:-1;;605:7479:86;;;;;;;:::i;:::-;;;;;;4513:152;;;;;;;;;605:7479;4513:152;;;4076:212;4512:153;;4495:208;;605:7479;;;;;:::i;:::-;;;;;;4902:48;;605:7479;;;;;;;:::i;:::-;4856:18;605:7479;;;4808:161;;605:7479;;;4780:203;;;;;605:7479;;;;;;;;;;;;;;;;4780:203;;605:7479;;4780:203;;605:7479;;;;;;;;;;;;;;4780:203;;;;;;4076:212;-1:-1:-1;4764:295:86;;-1:-1:-1;;;5022:26:86;;605:7479;;;;;5022:26;;4764:295;;;;605:7479;5148:17;;605:7479;5232:21;605:7479;;;;;;;;5232:21;;605:7479;;;;;;;;;;5271:19;;605:7479;5308:18;605:7479;;5308:18;;605:7479;;;5139:221;;;;;;605:7479;;;;;;5139:221;605:7479;;;;;;;;;;;;;5139:221;;5209:4;605:7479;5139:221;;;:::i;:::-;;;;;;;;;4764:295;-1:-1:-1;;5123:500:86;;-1:-1:-1;;605:7479:86;;;;;;;;;;-1:-1:-1;;;5399:213:86;;605:7479;;;5399:213;;605:7479;;-1:-1:-1;;;;;;605:7479:86;;;;5209:4;;605:7479;;5399:213;;;:::i;5123:500::-;605:7479;5123:500;;;605:7479;;;;;;;;;5638:60;605:7479;;5638:60;;;605:7479;;;;5139:221;;;;;:::i;:::-;605:7479;;5139:221;;;;;605:7479;;;4780:203;;;;;605:7479;4780:203;;:::i;:::-;605:7479;4780:203;;;;;605:7479;;;4495:208;4683:20;;;605:7479;4683:20;605:7479;;4683:20;4513:152;;;605:7479;4513:152;;605:7479;4513:152;;;;;;605:7479;4513:152;;;:::i;:::-;;;605:7479;;;;;;;:::i;:::-;4513:152;;;;;;-1:-1:-1;4513:152:86;;;605:7479;;;;;;;;;4298:65;4337:26;;;605:7479;4337:26;605:7479;;4337:26;4080:32;;;;;;;605:7479;4080:32;;;;;;:::i;:::-;;;;;3833:28;;;;;;;605:7479;3833:28;;;;;;:::i;:::-;;;;;605:7479;;;;;;-1:-1:-1;;605:7479:86;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;-1:-1:-1;;605:7479:86;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;3504:62;605:7479;;;;:::i;:::-;3543:10;;;;605:7479;;;3504:62;:::i;605:7479::-;;;;;;-1:-1:-1;;605:7479:86;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;775:49:40;;;:89;;;;605:7479:86;;;;;;;775:89:40;-1:-1:-1;;;862:40:67;;-1:-1:-1;775:89:40;;;605:7479:86;;;;-1:-1:-1;;;;;605:7479:86;;;;;;:::o;:::-;;;-1:-1:-1;;;;;605:7479:86;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;:::o;:::-;;;;-1:-1:-1;605:7479:86;;;;;-1:-1:-1;605:7479:86;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;:::o;:::-;;;1055:104:6;;605:7479:86;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;605:7479:86;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;605:7479:86;;;;;;:::o;:::-;;;-1:-1:-1;;;;;605:7479:86;;;;;;:::o;:::-;-1:-1:-1;;;;;605:7479:86;;;;;;-1:-1:-1;;605:7479:86;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;605:7479:86;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;605:7479:86;;;;;;;;-1:-1:-1;;605:7479:86;;;;:::o;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;605:7479:86;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;605:7479:86;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;-1:-1:-1;;605:7479:86;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;605:7479:86;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;605:7479:86;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::o;6833:741::-;7043:18;1007:16:72;;;605:7479:86;1007:26:72;1003:54;;1074:26;;;:::i;:::-;7016:46:86;7012:64;;7118:77;7142:14;7239:35;7142:14;;;1007:16:72;605:7479:86;;;7118:77;;;;;;:::i;:::-;605:7479;1007:16:72;605:7479:86;;;7239:35;;;;;;:::i;:::-;7304:13;;;;605:7479;7321:16;;;605:7479;-1:-1:-1;;;;;605:7479:86;;;;;7304:33;;;:86;;6833:741;7304:137;;;6833:741;7304:190;;;6833:741;7304:263;;;7285:282;;6833:741;:::o;7304:263::-;1007:16:72;7520:14:86;;;;;;605:7479;;;;;7510:25;7549:17;;;1007:16:72;605:7479:86;;;;7539:28;7510:57;6833:741;:::o;7304:190::-;605:7479;;;;-1:-1:-1;;;;;605:7479:86;;;;;7457:37;;-1:-1:-1;7304:190:86;;:137;7406:14;;;;;605:7479;7406:14;7424:17;;605:7479;-1:-1:-1;7406:35:86;7304:137;;;:86;7353:15;;;;;605:7479;7353:15;7372:18;;605:7479;7353:37;7304:86;;;7012:64;7064:12;;605:7479;7064:12;:::o;1003:54:72:-;1042:15;;;605:7479:86;1042:15:72;;605:7479:86;1042:15:72;605:7479:86;;;;;;;:::i;:::-;;;;-1:-1:-1;605:7479:86;;-1:-1:-1;605:7479:86;;;;-1:-1:-1;605:7479:86;;;;-1:-1:-1;605:7479:86;;;;-1:-1:-1;605:7479:86;;;;-1:-1:-1;605:7479:86;;;;-1:-1:-1;605:7479:86;;;;-1:-1:-1;605:7479:86;;;;-1:-1:-1;605:7479:86;;;;;;:::o;:::-;;;-1:-1:-1;;;;;605:7479:86;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;:::i;:::-;;;;;;:::o;:::-;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;605:7479:86;;;;;;;:::o;:::-;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;605:7479:86;;;;;;;;;;;;;4064:22:9;;;;4060:87;;605:7479:86;;;;;;;;;;;;;;1331:4:73;;-1:-1:-1;;;;;605:7479:86;1299:20:73;;605:7479:86;;1299:20:73;;;:::i;:::-;605:7479:86;1299:37:73;4270:84:9;;1489:1:0;605:7479:86;;3896:19:9;605:7479:86;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;605:7479:86;;;;3881:1:9;605:7479:86;;;;;3881:1:9;605:7479:86;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;605:7479:86;;;;;;;:::i;:::-;-1:-1:-1;605:7479:86;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;;;;605:7479:86;;;;;;;:::o;1790:1564::-;;;;;2063:10;;;;605:7479;;1790:1564;-1:-1:-1;;;;;2063:10:86;;;:::i;:::-;605:7479;2163:12;;;;605:7479;2193:11;;;;605:7479;2054:184;;;;;;605:7479;;2054:184;605:7479;;;;2063:10;605:7479;;;;;;;;;;;2054:184;;2140:4;2054:184;;;;;:::i;:::-;;;;;;;;;1790:1564;-1:-1:-1;2038:469:86;;2359:10;;2320:176;2359:10;;;;:::i;:::-;605:7479;2063:10;605:7479;5399:213;;;;;;2320:176;;2140:4;2320:176;2054:184;2320:176;;;:::i;2038:469::-;2063:10;605:7479;2970:16;;;;605:7479;2038:469;;;;-1:-1:-1;2038:469:86;;;;;-1:-1:-1;;;;;605:7479:86;2038:469;605:7479;:::i;:::-;;2063:10;605:7479;;;2970:16;605:7479;;;;;;;;;;;;;;;2970:16;605:7479;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;;;2970:16;605:7479;;;;;;;2163:12;605:7479;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;:::i;:::-;;2193:11;605:7479;;;;;;;;;;;;1055:104:6;;605:7479:86;;;;;2970:16;;1055:104:6;;2970:16:86;;;;;;:::i;:::-;2063:10;605:7479;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;-1:-1:-1;;;;;605:7479:86;2063:10;605:7479;;;;;;;;;;;;2970:16;2728:315;;605:7479;;2063:10;2728:315;;605:7479;2728:315;2163:12;2728:315;;605:7479;2193:11;2728:315;;605:7479;2728:315;605:7479;2728:315;;605:7479;2970:16;2063:10;605:7479;;;;:::i;:::-;2682:18;605:7479;;2633:429;;;605:7479;;;2063:10;605:7479;;;;;;;;2605:471;;;2054:184;2605:471;;605:7479;;;;;;;2063:10;605:7479;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:7479:86;;;;;;;;;2063:10;605:7479;;;;;;;;;2163:12;605:7479;;;;;;;;;2193:11;605:7479;;;;;;;;;;;;;:::i;:::-;;;;;;;;2605:471;605:7479;;2605:3;-1:-1:-1;;;;;605:7479:86;2605:471;;;;;;;2038:469;-1:-1:-1;2589:759:86;;-1:-1:-1;;;3312:25:86;;2054:184;3312:25;;2589:759;3150:27;3121:10;3150:27;;;1790:1564::o;2605:471::-;;;;2970:16;2605:471;;2970:16;2605:471;;;;;;2970:16;2605:471;;;:::i;:::-;;;605:7479;;;;;2605:471;;;;;;;-1:-1:-1;2605:471:86;;605:7479;-1:-1:-1;;;605:7479:86;;;2054:184;605:7479;;;;;;;;2054:184;;;;;605:7479;2054:184;;:::i;:::-;605:7479;2054:184;;;;607:258:72;-1:-1:-1;;;;;352:24:72;;;605:7479:86;;352:29:72;;;:87;;;;607:258;715:54;;;565:24;;605:7479:86;-1:-1:-1;;;;;605:7479:86;779:57:72;;854:4;607:258;:::o;779:57::-;816:20;;;-1:-1:-1;816:20:72;;-1:-1:-1;816:20:72;715:54;752:17;;;-1:-1:-1;752:17:72;;-1:-1:-1;752:17:72;352:87;424:15;;;-1:-1:-1;352:87:72;;;637:632:62;759:17;-1:-1:-1;25444:17:69;-1:-1:-1;;;25444:17:69;;;25440:103;;637:632:62;25560:17:69;25569:8;26140:7;25560:17;;;25556:103;;637:632:62;25685:8:69;25676:17;;;25672:103;;637:632:62;25801:7:69;25792:16;;;25788:100;;637:632:62;25914:7:69;25905:16;;;25901:100;;637:632:62;26027:7:69;26018:16;;;26014:100;;637:632:62;26131:16:69;;26127:66;;637:632:62;26140:7:69;874:92:62;779:1;605:7479:86;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;605:7479:86;;:::i;:::-;;;;;;;874:92:62;;;979:247;-1:-1:-1;;605:7479:86;;-1:-1:-1;;;1033:111:62;;;;605:7479:86;1033:111:62;605:7479:86;1194:10:62;;1190:21;;26140:7:69;979:247:62;;;;1190:21;1206:5;;637:632;:::o;26127:66:69:-;26177:1;605:7479:86;;;;26127:66:69;;26014:100;26027:7;26098:1;605:7479:86;;;;26014:100:69;;;25901;25914:7;25985:1;605:7479:86;;;;25901:100:69;;;25788;25801:7;25872:1;605:7479:86;;;;25788:100:69;;;25672:103;25685:8;25758:2;605:7479:86;;;;25672:103:69;;;25556;25569:8;25642:2;605:7479:86;;;;25556:103:69;;;25440;-1:-1:-1;25526:2:69;;-1:-1:-1;;;;605:7479:86;;25440:103:69;;6040:128:9;6109:4;-1:-1:-1;;;;;605:7479:86;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 2426,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 2470,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 2513,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 7428,
          "length": 32
        }
      ],
      "52554": [
        {
          "start": 1802,
          "length": 32
        }
      ],
      "52557": [
        {
          "start": 869,
          "length": 32
        },
        {
          "start": 1281,
          "length": 32
        },
        {
          "start": 2169,
          "length": 32
        },
        {
          "start": 2720,
          "length": 32
        },
        {
          "start": 6764,
          "length": 32
        }
      ],
      "52559": [
        {
          "start": 933,
          "length": 32
        },
        {
          "start": 1752,
          "length": 32
        },
        {
          "start": 2233,
          "length": 32
        },
        {
          "start": 2358,
          "length": 32
        },
        {
          "start": 3051,
          "length": 32
        },
        {
          "start": 5220,
          "length": 32
        },
        {
          "start": 6591,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "ATTESTATION_SCHEMA()": "5bf2f20d",
    "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e60c3505",
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "1272ff8b",
    "collectExpired(bytes32)": "a84f2aa0",
    "collectPayment(bytes32,bytes32)": "30088bc9",
    "decodeStatementData(bytes)": "e112ea08",
    "getSchema()": "6b122fe0",
    "getStatement(bytes32)": "5cc02d2f",
    "getStatementData(bytes32)": "c75c572b",
    "isPayable()": "ce46e046",
    "makeStatement((address,bytes,address,uint256,uint256),uint64)": "0b0f07d5",
    "makeStatementFor((address,bytes,address,uint256,uint256),uint64,address,address)": "eed8f352",
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "91db0b7e",
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "88e5b2d9",
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": "bc197c81",
    "onERC1155Received(address,address,uint256,uint256,bytes)": "f23a6e61",
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e49617e1",
    "supportsInterface(bytes4)": "01ffc9a7",
    "version()": "54fd4d50"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationCreateFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC1155TransferFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidSchema\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromStatement\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"payment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowClaimed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"payment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"collectExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_payment\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectPayment\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeStatementData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.StatementData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getStatement\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getStatementData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.StatementData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"makeStatement\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"makeStatementFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155BatchReceived\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"supportsInterface(bytes4)\":{\"details\":\"See {IERC165-supportsInterface}.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/ERC1155EscrowObligation.sol\":\"ERC1155EscrowObligation\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746\",\"dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce\",\"dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol\":{\"keccak256\":\"0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd\",\"dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9\",\"dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f\",\"dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x9054efbe0d83eee80617895c7ec3c7457b414f2bcfad00fbf4f37e46e64f06d5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c4bf82d91e2b4a82ec0936298e4026ff84f6745e332a5732e509e3f6cfe9ae36\",\"dweb:/ipfs/QmbTyZSQrfBX8ySdxmMGKv5KwKKU634Pm2k2BV9EpGXz1r\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/obligations/ERC1155EscrowObligation.sol\":{\"keccak256\":\"0x70912a074195aa69c7a6094d6027c43a454bbcf64a08cc2177e86d05b88a0faa\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://191bc3e1c9bf72ad16ff4309c5eefb6d3172efc978b41a30bf57dee31590a291\",\"dweb:/ipfs/QmV78tQXDu64tvCLRmKiSyiBfrGnHRLfN9CE6VTfaTqNqP\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.27+commit.40a35a09"
    },
    "language": "Solidity",
    "output": {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract IEAS",
              "name": "_eas",
              "type": "address"
            },
            {
              "internalType": "contract ISchemaRegistry",
              "name": "_schemaRegistry",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "AccessDenied"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "AttestationCreateFailed"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "attestationId",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "AttestationNotFound"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "AttestationRevoked"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "DeadlineExpired"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "ERC1155TransferFailed"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InsufficientValue"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidEAS"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidEscrow"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidEscrowAttestation"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidFulfillment"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidLength"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidSchema"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "NotFromStatement"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "NotPayable"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "attestationId",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "RevocationFailed"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "UnauthorizedCall"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "payment",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "bytes32",
              "name": "fulfillment",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "fulfiller",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "EscrowClaimed",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "payment",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "EscrowMade",
          "anonymous": false
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "ATTESTATION_SCHEMA",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation",
              "name": "attestation",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "attest",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation",
              "name": "statement",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            },
            {
              "internalType": "bytes",
              "name": "demand",
              "type": "bytes"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "checkStatement",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "uid",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "collectExpired",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_payment",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "_fulfillment",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "collectPayment",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "decodeStatementData",
          "outputs": [
            {
              "internalType": "struct ERC1155EscrowObligation.StatementData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ]
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "getSchema",
          "outputs": [
            {
              "internalType": "struct SchemaRecord",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "contract ISchemaResolver",
                  "name": "resolver",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "string",
                  "name": "schema",
                  "type": "string"
                }
              ]
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "uid",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "getStatement",
          "outputs": [
            {
              "internalType": "struct Attestation",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "uid",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "getStatementData",
          "outputs": [
            {
              "internalType": "struct ERC1155EscrowObligation.StatementData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ]
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "pure",
          "type": "function",
          "name": "isPayable",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct ERC1155EscrowObligation.StatementData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ]
            },
            {
              "internalType": "uint64",
              "name": "expirationTime",
              "type": "uint64"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "makeStatement",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "uid_",
              "type": "bytes32"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct ERC1155EscrowObligation.StatementData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ]
            },
            {
              "internalType": "uint64",
              "name": "expirationTime",
              "type": "uint64"
            },
            {
              "internalType": "address",
              "name": "payer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "makeStatementFor",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "uid_",
              "type": "bytes32"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation[]",
              "name": "attestations",
              "type": "tuple[]",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            },
            {
              "internalType": "uint256[]",
              "name": "values",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "multiAttest",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation[]",
              "name": "attestations",
              "type": "tuple[]",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            },
            {
              "internalType": "uint256[]",
              "name": "values",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "multiRevoke",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onERC1155BatchReceived",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onERC1155Received",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation",
              "name": "attestation",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "revoke",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "version",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "payable",
          "type": "receive"
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {
          "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "params": {
              "attestation": "The new attestation."
            },
            "returns": {
              "_0": "Whether the attestation is valid."
            }
          },
          "isPayable()": {
            "returns": {
              "_0": "Whether the resolver supports ETH transfers."
            }
          },
          "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            "params": {
              "attestations": "The new attestations.",
              "values": "Explicit ETH amounts which were sent with each attestation."
            },
            "returns": {
              "_0": "Whether all the attestations are valid."
            }
          },
          "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            "params": {
              "attestations": "The existing attestations to be revoked.",
              "values": "Explicit ETH amounts which were sent with each revocation."
            },
            "returns": {
              "_0": "Whether the attestations can be revoked."
            }
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "params": {
              "attestation": "The existing attestation to be revoked."
            },
            "returns": {
              "_0": "Whether the attestation can be revoked."
            }
          },
          "supportsInterface(bytes4)": {
            "details": "See {IERC165-supportsInterface}."
          },
          "version()": {
            "returns": {
              "_0": "Semver contract version as a string."
            }
          }
        },
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {
          "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "notice": "Processes an attestation and verifies whether it's valid."
          },
          "isPayable()": {
            "notice": "Checks if the resolver can be sent ETH."
          },
          "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            "notice": "Processes multiple attestations and verifies whether they are valid."
          },
          "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            "notice": "Processes revocation of multiple attestation and verifies they can be revoked."
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "notice": "Processes an attestation revocation and verifies if it can be revoked."
          },
          "version()": {
            "notice": "Returns the full semver contract version."
          }
        },
        "version": 1
      }
    },
    "settings": {
      "remappings": [
        "@eas/=lib/eas-contracts/contracts/",
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
        "@test/=test/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/"
      ],
      "optimizer": {
        "enabled": true,
        "runs": 200
      },
      "metadata": {
        "bytecodeHash": "ipfs"
      },
      "compilationTarget": {
        "src/obligations/ERC1155EscrowObligation.sol": "ERC1155EscrowObligation"
      },
      "evmVersion": "cancun",
      "libraries": {},
      "viaIR": true
    },
    "sources": {
      "lib/eas-contracts/contracts/Common.sol": {
        "keccak256": "0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685",
        "urls": [
          "bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d",
          "dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/IEAS.sol": {
        "keccak256": "0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12",
        "urls": [
          "bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880",
          "dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/ISchemaRegistry.sol": {
        "keccak256": "0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754",
        "urls": [
          "bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158",
          "dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/ISemver.sol": {
        "keccak256": "0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18",
        "urls": [
          "bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0",
          "dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/Semver.sol": {
        "keccak256": "0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9",
        "urls": [
          "bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808",
          "dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
        "keccak256": "0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
        "urls": [
          "bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
          "dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/resolver/SchemaResolver.sol": {
        "keccak256": "0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983",
        "urls": [
          "bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828",
          "dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol": {
        "keccak256": "0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7",
        "urls": [
          "bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746",
          "dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol": {
        "keccak256": "0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7",
        "urls": [
          "bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce",
          "dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol": {
        "keccak256": "0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50",
        "urls": [
          "bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd",
          "dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Panic.sol": {
        "keccak256": "0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c",
        "urls": [
          "bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4",
          "dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Strings.sol": {
        "keccak256": "0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2",
        "urls": [
          "bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440",
          "dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol": {
        "keccak256": "0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e",
        "urls": [
          "bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9",
          "dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": {
        "keccak256": "0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c",
        "urls": [
          "bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e",
          "dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/Math.sol": {
        "keccak256": "0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c",
        "urls": [
          "bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966",
          "dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol": {
        "keccak256": "0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481",
        "urls": [
          "bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb",
          "dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol": {
        "keccak256": "0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0",
        "urls": [
          "bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426",
          "dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"
        ],
        "license": "MIT"
      },
      "src/ArbiterUtils.sol": {
        "keccak256": "0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8",
        "urls": [
          "bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f",
          "dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseStatement.sol": {
        "keccak256": "0x9054efbe0d83eee80617895c7ec3c7457b414f2bcfad00fbf4f37e46e64f06d5",
        "urls": [
          "bzz-raw://c4bf82d91e2b4a82ec0936298e4026ff84f6745e332a5732e509e3f6cfe9ae36",
          "dweb:/ipfs/QmbTyZSQrfBX8ySdxmMGKv5KwKKU634Pm2k2BV9EpGXz1r"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820",
        "urls": [
          "bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11",
          "dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/ERC1155EscrowObligation.sol": {
        "keccak256": "0x70912a074195aa69c7a6094d6027c43a454bbcf64a08cc2177e86d05b88a0faa",
        "urls": [
          "bzz-raw://191bc3e1c9bf72ad16ff4309c5eefb6d3172efc978b41a30bf57dee31590a291",
          "dweb:/ipfs/QmV78tQXDu64tvCLRmKiSyiBfrGnHRLfN9CE6VTfaTqNqP"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 86
} as const;