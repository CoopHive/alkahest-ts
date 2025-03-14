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
    "object": "0x610160806040523461020e57604081611d5c80380380916100208285610248565b83398101031261020e5780516001600160a01b0381169182820361020e5760200151916001600160a01b03831680840361020e57604051608081016001600160401b0381118282101761023457604052604d815260208101927f6164647265737320746f6b656e2c2075696e7432353620746f6b656e49642c2084527f75696e7432353620616d6f756e742c206164647265737320617262697465722c60408301526c08189e5d195cc819195b585b99609a1b60608301526001608052600360a0525f60c05215610225576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af190811561021a575f916101e4575b5061014052604051611af0908161026c823960805181610779015260a051816107a5015260c051816107d0015260e05181611a7b015261010051816104f40152610120518181816102e30152818161066b0152818161089f01526117e30152610140518181816104c2015281816106ab01528181610735015281816109ea0152818161120601526117360152f35b90506020813d602011610212575b816101ff60209383610248565b8101031261020e57515f610156565b5f80fd5b3d91506101f2565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176102345760405256fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610d80575080630b0f07d514610d355780631272ff8b14610c1d57806330088bc91461085d57806354fd4d50146107585780635bf2f20d1461071d5780635cc02d2f146106335780636b122fe01461048157806388e5b2d91461045857806391db0b7e14610458578063a84f2aa0146102a8578063bc197c8114610212578063ce46e046146101f6578063e49617e1146101c4578063e60c3505146101c4578063eed8f352146101465763f23a6e610361000f57346101435760a036600319011261014357610105610e84565b5061010e610e9a565b506084356001600160401b0381116101415761012e903690600401610edf565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b5034610143576080366003190112610143576004356001600160401b0381116101415760a060031982360301126101415761017f610dd3565b604435916001600160a01b03831683036101c057606435936001600160a01b03851685036101435760206101b886868686600401611586565b604051908152f35b8380fd5b60206101e260e06101d4366110d2565b6101dc611a79565b01611572565b6040516001600160a01b0390911630148152f35b5034610143578060031936011261014357602090604051908152f35b50346101435760a03660031901126101435761022c610e84565b50610235610e9a565b506044356001600160401b0381116101415761025590369060040161106b565b506064356001600160401b0381116101415761027590369060040161106b565b506084356001600160401b03811161014157610295903690600401610edf565b5060405163bc197c8160e01b8152602090f35b503461014357602036600319011261014357600435906102c661130e565b506040516328c44a9960e21b8152600481018390529181836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa80938394610434575b5061032e576301fb6dd160e01b825260045260249150fd5b506001600160401b0360608301511642106104255761035b6101208301516020808251830101910161116a565b604081019060c060018060a01b0383511694019260018060a01b03845116606083019560808751940193845192823b156104215791849391846103b7969460405197889586948593637921219560e11b85523060048601611454565b03925af1918261040c575b505061040157905191519251905160405163334a7d1b60e21b81529384936103fd93916001600160a01b03908116913091166004870161148c565b0390fd5b602060405160018152f35b610417828092610e63565b61014357806103c2565b8480fd5b637bf6a16f60e01b8152600490fd5b6104519194503d8085833e6104498183610e63565b810190611379565b925f610316565b60206104776104663661101b565b92610472929192611a79565b6114bf565b6040519015158152f35b50346101435780600319360112610143576060806040516104a181610e48565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561062757809161056e575b60608261056a604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610f25565b0390f35b90503d8082843e61057f8184610e63565b820191602081840312610141578051906001600160401b03821161062357019060808284031261014357604051916105b683610e48565b8051835260208101516001600160a01b03811681036106235760208401526105e06040820161136c565b60408401526060810151906001600160401b03821161062357019083601f8301121561014357506060928160206106199351910161111a565b828201525f610524565b8280fd5b604051903d90823e3d90fd5b50346101435760203660031901126101435761064d61130e565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156107105781926106f4575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036106e5576040516020808252819061056a90820185610f49565b63295d5f3960e01b8152600490fd5b6107099192503d8084833e6104498183610e63565b905f6106a3565b50604051903d90823e3d90fd5b503461014357806003193601126101435760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346101435780600319360112610143576020610849600161056a9361079d7f000000000000000000000000000000000000000000000000000000000000000061190c565b9082856107c97f000000000000000000000000000000000000000000000000000000000000000061190c565b81806107f47f000000000000000000000000000000000000000000000000000000000000000061190c565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282610e63565b604051918291602083526020830190610f25565b5034610b7e576040366003190112610b7e57600435906024359061087f61130e565b5061088861130e565b506040516328c44a9960e21b8152600481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f81602481865afa5f9181610c01575b506108f157846301fb6dd160e01b5f5260045260245ffd5b84906040516328c44a9960e21b81528560048201525f81602481885afa5f9181610be5575b5061092e57856301fb6dd160e01b5f5260045260245ffd5b9085919461093b826118b1565b15610bd6576109a8602061095c61012085015182808251830101910161116a565b9360018060a01b038551166109968a84880151935160405196879586948594631272ff8b60e01b8652606060048701526064860190610f49565b84810360031901602486015290610f25565b90604483015203915afa908115610bcb575f91610b91575b5015610b82576040516109d281610e2d565b8481525f6020820152604051906109e882610e2d565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b15610b7e5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af19081610b69575b50610a6a5763614cf93960e01b84526004839052602484fd5b919092604083019160c060018060a01b0384511696019460018060a01b03865116606086019760808951970196875192823b15610b6557928692839283610ac99660405197889586948593637921219560e11b85523060048601611454565b03925af19182610b50575b5050610b13575050905192519351915160405163334a7d1b60e21b81529485946103fd949293506001600160a01b03918216913091166004870161148c565b602093508560018060a01b03905116917fd903ca32e81477af89f5b8a6ce888d185cc715390e49474a77b4c6846254cccd6040519480a460018152f35b81610b5a91610e63565b6101c0578389610ad4565b8680fd5b610b769195505f90610e63565b5f9386610a51565b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610bc3575b81610bac60209383610e63565b81010312610b7e57610bbd9061136c565b876109c0565b3d9150610b9f565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b610bfa9192503d805f833e6104498183610e63565b9087610916565b610c169192503d805f833e6104498183610e63565b905f6108d9565b34610b7e576060366003190112610b7e576004356001600160401b038111610b7e576101406003198236030112610b7e5760405190610c5b82610dfd565b8060040135825260248101356020830152610c7860448201610de9565b6040830152610c8960648201610de9565b6060830152610c9a60848201610de9565b608083015260a481013560a0830152610cb560c48201610eb0565b60c0830152610cc660e48201610eb0565b60e08301526101048101358015158103610b7e57610100830152610124810135906001600160401b038211610b7e576004610d049236920101610edf565b6101208201526024356001600160401b038111610b7e57602091610d2f610477923690600401610edf565b90611204565b34610b7e576040366003190112610b7e576004356001600160401b038111610b7e5760a06003198236030112610b7e576101b8602091610d73610dd3565b9033913391600401611586565b34610b7e576020366003190112610b7e576004359063ffffffff60e01b8216809203610b7e57602091630271189760e51b8114908115610dc2575b5015158152f35b6301ffc9a760e01b14905083610dbb565b602435906001600160401b0382168203610b7e57565b35906001600160401b0382168203610b7e57565b61014081019081106001600160401b03821117610e1957604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610e1957604052565b608081019081106001600160401b03821117610e1957604052565b90601f801991011681019081106001600160401b03821117610e1957604052565b600435906001600160a01b0382168203610b7e57565b602435906001600160a01b0382168203610b7e57565b35906001600160a01b0382168203610b7e57565b6001600160401b038111610e1957601f01601f191660200190565b81601f82011215610b7e57803590610ef682610ec4565b92610f046040519485610e63565b82845260208383010111610b7e57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b90610140610120610fe89380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610f25565b90565b9181601f84011215610b7e578235916001600160401b038311610b7e576020808501948460051b010111610b7e57565b6040600319820112610b7e576004356001600160401b038111610b7e578161104591600401610feb565b92909291602435906001600160401b038211610b7e5761106791600401610feb565b9091565b9080601f83011215610b7e578135916001600160401b038311610e19578260051b906040519361109e6020840186610e63565b8452602080850192820101928311610b7e57602001905b8282106110c25750505090565b81358152602091820191016110b5565b6020600319820112610b7e57600435906001600160401b038211610b7e57610140908290036003190112610b7e5760040190565b51906001600160a01b0382168203610b7e57565b92919261112682610ec4565b916111346040519384610e63565b829481845281830111610b7e578281602093845f96015e010152565b9080601f83011215610b7e578151610fe89260200161111a565b602081830312610b7e578051906001600160401b038211610b7e57019060a082820312610b7e576040519160a083018381106001600160401b03821117610e19576040526111b781611106565b835260208101516001600160401b038111610b7e576080926111da918301611150565b60208401526111eb60408201611106565b6040840152606081015160608401520151608082015290565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036112ff57611238816118b1565b156112f9576112586101206112689201516020808251830101910161116a565b916020808251830101910161116a565b604082810151908201516001600160a01b0390811691161491826112e6575b826112d2575b826112b9575b8261129d57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611293565b91506080820151608082015111159161128d565b9150606082015160608201511491611287565b50505f90565b635f9bd90760e11b5f5260045ffd5b6040519061131b82610dfd565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610b7e57565b51908115158203610b7e57565b602081830312610b7e578051906001600160401b038211610b7e570161014081830312610b7e57604051916113ad83610dfd565b81518352602082015160208401526113c760408301611358565b60408401526113d860608301611358565b60608401526113e960808301611358565b608084015260a082015160a084015261140460c08301611106565b60c084015261141560e08301611106565b60e0840152611427610100830161136c565b6101008401526101208201516001600160401b038111610b7e5761144b9201611150565b61012082015290565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b929092818403611563575f91345b858410156115585781841015611544578360051b80860135908282116115355784013561013e1985360301811215610b7e5730906001600160a01b039061151890870160e001611572565b160361152a57600191039301926114cd565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b356001600160a01b0381168103610b7e5790565b9391929160408501915f91906001600160a01b036115a385611572565b1694606088013597608081013596803b15610b7e575f886115e0928c838d60405196879586948593637921219560e11b8552309060048601611454565b03925af1908161189c575b5061161b5788886103fd896115ff8a611572565b9360405194859463334a7d1b60e21b865230916004870161148c565b604051602080820152949893975091959094916001600160a01b0361163f82610eb0565b1660408601526020810135601e19823603018112156118985701602081359101916001600160401b038211611898578136038313611898576116d5946101009483889560a060608801528160e08801528787013784840186018c90526001600160a01b03906116ad90610eb0565b16608085015260a084015260c0830152601f801991011681010301601f198101835282610e63565b6040519160c083018381106001600160401b0382111761188457906001600160401b039160405260018060a01b0316938484521660208301526001604083015284606083015260808201528360a0820152602060405161173481610e2d565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06117d5608083015160c060e4860152610124850190610f25565b9101516101048301520381877f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1849181611850575b5061182957634a10301360e11b8452600484fd5b7f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06819480a3565b9091506020813d60201161187c575b8161186c60209383610e63565b810103126104215751905f611815565b3d915061185f565b634e487b7160e01b87526041600452602487fd5b8980fd5b6118a99196505f90610e63565b5f945f6115eb565b6001600160401b036060820151168015159081611902575b506118f357608001516001600160401b03166118e457600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f6118c9565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611a56575b806d04ee2d6d415b85acef8100000000600a921015611a3b575b662386f26fc10000811015611a27575b6305f5e100811015611a16575b612710811015611a07575b60648110156119f9575b10156119ee575b600a6021600184019361199385610ec4565b946119a16040519687610e63565b8086526119b0601f1991610ec4565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156119e957600a90916119bb565b505090565b600190910190611981565b60646002910493019261197a565b61271060049104930192611970565b6305f5e10060089104930192611965565b662386f26fc1000060109104930192611958565b6d04ee2d6d415b85acef810000000060209104930192611948565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461192e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611aab57565b634ca8886760e01b5f5260045ffdfea2646970667358221220507efd08fe13266992788bd4e4e561db1030db87908a786be0deeccacc1b117964736f6c634300081b0033",
    "sourceMap": "605:6705:92:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;605:6705:92;;;;1717:4;605:6705;759:14:6;688:1:9;783:14:6;;-1:-1:-1;807:14:6;;708:26:9;704:76;;605:6705:92;790:10:9;;605:6705:92;790:10:9;;;713::79;;733:32;;-1:-1:-1;605:6705:92;;;;;;;;;;;796:48:79;;605:6705:92;796:48:79;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;828:4:79;605:6705:92;;;;1717:4;605:6705;;;;;;-1:-1:-1;;605:6705:92;;;796:48:79;;;;;;;;;;-1:-1:-1;796:48:79;;;-1:-1:-1;775:69:79;;;605:6705:92;;;;;;;;;;;;;;783:14:6;605:6705:92;;;;;807:14:6;605:6705:92;;;;;790:10:9;605:6705:92;;;;;733:32:79;605:6705:92;;;;;713:10:79;605:6705:92;;;;;;;;;;;;;;;;;;;;775:69:79;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;796:48:79;;;605:6705:92;796:48:79;;605:6705:92;796:48:79;;;;;;605:6705:92;796:48:79;;;:::i;:::-;;;605:6705:92;;;;;796:48:79;;;605:6705:92;-1:-1:-1;605:6705:92;;796:48:79;;;-1:-1:-1;796:48:79;;;605:6705:92;;;-1:-1:-1;605:6705:92;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;605:6705:92;;;;-1:-1:-1;605:6705:92;;;;;-1:-1:-1;605:6705:92;;;;;;-1:-1:-1;;605:6705:92;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610d80575080630b0f07d514610d355780631272ff8b14610c1d57806330088bc91461085d57806354fd4d50146107585780635bf2f20d1461071d5780635cc02d2f146106335780636b122fe01461048157806388e5b2d91461045857806391db0b7e14610458578063a84f2aa0146102a8578063bc197c8114610212578063ce46e046146101f6578063e49617e1146101c4578063e60c3505146101c4578063eed8f352146101465763f23a6e610361000f57346101435760a036600319011261014357610105610e84565b5061010e610e9a565b506084356001600160401b0381116101415761012e903690600401610edf565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b5034610143576080366003190112610143576004356001600160401b0381116101415760a060031982360301126101415761017f610dd3565b604435916001600160a01b03831683036101c057606435936001600160a01b03851685036101435760206101b886868686600401611586565b604051908152f35b8380fd5b60206101e260e06101d4366110d2565b6101dc611a79565b01611572565b6040516001600160a01b0390911630148152f35b5034610143578060031936011261014357602090604051908152f35b50346101435760a03660031901126101435761022c610e84565b50610235610e9a565b506044356001600160401b0381116101415761025590369060040161106b565b506064356001600160401b0381116101415761027590369060040161106b565b506084356001600160401b03811161014157610295903690600401610edf565b5060405163bc197c8160e01b8152602090f35b503461014357602036600319011261014357600435906102c661130e565b506040516328c44a9960e21b8152600481018390529181836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa80938394610434575b5061032e576301fb6dd160e01b825260045260249150fd5b506001600160401b0360608301511642106104255761035b6101208301516020808251830101910161116a565b604081019060c060018060a01b0383511694019260018060a01b03845116606083019560808751940193845192823b156104215791849391846103b7969460405197889586948593637921219560e11b85523060048601611454565b03925af1918261040c575b505061040157905191519251905160405163334a7d1b60e21b81529384936103fd93916001600160a01b03908116913091166004870161148c565b0390fd5b602060405160018152f35b610417828092610e63565b61014357806103c2565b8480fd5b637bf6a16f60e01b8152600490fd5b6104519194503d8085833e6104498183610e63565b810190611379565b925f610316565b60206104776104663661101b565b92610472929192611a79565b6114bf565b6040519015158152f35b50346101435780600319360112610143576060806040516104a181610e48565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561062757809161056e575b60608261056a604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610f25565b0390f35b90503d8082843e61057f8184610e63565b820191602081840312610141578051906001600160401b03821161062357019060808284031261014357604051916105b683610e48565b8051835260208101516001600160a01b03811681036106235760208401526105e06040820161136c565b60408401526060810151906001600160401b03821161062357019083601f8301121561014357506060928160206106199351910161111a565b828201525f610524565b8280fd5b604051903d90823e3d90fd5b50346101435760203660031901126101435761064d61130e565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156107105781926106f4575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036106e5576040516020808252819061056a90820185610f49565b63295d5f3960e01b8152600490fd5b6107099192503d8084833e6104498183610e63565b905f6106a3565b50604051903d90823e3d90fd5b503461014357806003193601126101435760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346101435780600319360112610143576020610849600161056a9361079d7f000000000000000000000000000000000000000000000000000000000000000061190c565b9082856107c97f000000000000000000000000000000000000000000000000000000000000000061190c565b81806107f47f000000000000000000000000000000000000000000000000000000000000000061190c565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282610e63565b604051918291602083526020830190610f25565b5034610b7e576040366003190112610b7e57600435906024359061087f61130e565b5061088861130e565b506040516328c44a9960e21b8152600481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f81602481865afa5f9181610c01575b506108f157846301fb6dd160e01b5f5260045260245ffd5b84906040516328c44a9960e21b81528560048201525f81602481885afa5f9181610be5575b5061092e57856301fb6dd160e01b5f5260045260245ffd5b9085919461093b826118b1565b15610bd6576109a8602061095c61012085015182808251830101910161116a565b9360018060a01b038551166109968a84880151935160405196879586948594631272ff8b60e01b8652606060048701526064860190610f49565b84810360031901602486015290610f25565b90604483015203915afa908115610bcb575f91610b91575b5015610b82576040516109d281610e2d565b8481525f6020820152604051906109e882610e2d565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b15610b7e5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af19081610b69575b50610a6a5763614cf93960e01b84526004839052602484fd5b919092604083019160c060018060a01b0384511696019460018060a01b03865116606086019760808951970196875192823b15610b6557928692839283610ac99660405197889586948593637921219560e11b85523060048601611454565b03925af19182610b50575b5050610b13575050905192519351915160405163334a7d1b60e21b81529485946103fd949293506001600160a01b03918216913091166004870161148c565b602093508560018060a01b03905116917fd903ca32e81477af89f5b8a6ce888d185cc715390e49474a77b4c6846254cccd6040519480a460018152f35b81610b5a91610e63565b6101c0578389610ad4565b8680fd5b610b769195505f90610e63565b5f9386610a51565b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610bc3575b81610bac60209383610e63565b81010312610b7e57610bbd9061136c565b876109c0565b3d9150610b9f565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b610bfa9192503d805f833e6104498183610e63565b9087610916565b610c169192503d805f833e6104498183610e63565b905f6108d9565b34610b7e576060366003190112610b7e576004356001600160401b038111610b7e576101406003198236030112610b7e5760405190610c5b82610dfd565b8060040135825260248101356020830152610c7860448201610de9565b6040830152610c8960648201610de9565b6060830152610c9a60848201610de9565b608083015260a481013560a0830152610cb560c48201610eb0565b60c0830152610cc660e48201610eb0565b60e08301526101048101358015158103610b7e57610100830152610124810135906001600160401b038211610b7e576004610d049236920101610edf565b6101208201526024356001600160401b038111610b7e57602091610d2f610477923690600401610edf565b90611204565b34610b7e576040366003190112610b7e576004356001600160401b038111610b7e5760a06003198236030112610b7e576101b8602091610d73610dd3565b9033913391600401611586565b34610b7e576020366003190112610b7e576004359063ffffffff60e01b8216809203610b7e57602091630271189760e51b8114908115610dc2575b5015158152f35b6301ffc9a760e01b14905083610dbb565b602435906001600160401b0382168203610b7e57565b35906001600160401b0382168203610b7e57565b61014081019081106001600160401b03821117610e1957604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610e1957604052565b608081019081106001600160401b03821117610e1957604052565b90601f801991011681019081106001600160401b03821117610e1957604052565b600435906001600160a01b0382168203610b7e57565b602435906001600160a01b0382168203610b7e57565b35906001600160a01b0382168203610b7e57565b6001600160401b038111610e1957601f01601f191660200190565b81601f82011215610b7e57803590610ef682610ec4565b92610f046040519485610e63565b82845260208383010111610b7e57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b90610140610120610fe89380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610f25565b90565b9181601f84011215610b7e578235916001600160401b038311610b7e576020808501948460051b010111610b7e57565b6040600319820112610b7e576004356001600160401b038111610b7e578161104591600401610feb565b92909291602435906001600160401b038211610b7e5761106791600401610feb565b9091565b9080601f83011215610b7e578135916001600160401b038311610e19578260051b906040519361109e6020840186610e63565b8452602080850192820101928311610b7e57602001905b8282106110c25750505090565b81358152602091820191016110b5565b6020600319820112610b7e57600435906001600160401b038211610b7e57610140908290036003190112610b7e5760040190565b51906001600160a01b0382168203610b7e57565b92919261112682610ec4565b916111346040519384610e63565b829481845281830111610b7e578281602093845f96015e010152565b9080601f83011215610b7e578151610fe89260200161111a565b602081830312610b7e578051906001600160401b038211610b7e57019060a082820312610b7e576040519160a083018381106001600160401b03821117610e19576040526111b781611106565b835260208101516001600160401b038111610b7e576080926111da918301611150565b60208401526111eb60408201611106565b6040840152606081015160608401520151608082015290565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036112ff57611238816118b1565b156112f9576112586101206112689201516020808251830101910161116a565b916020808251830101910161116a565b604082810151908201516001600160a01b0390811691161491826112e6575b826112d2575b826112b9575b8261129d57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611293565b91506080820151608082015111159161128d565b9150606082015160608201511491611287565b50505f90565b635f9bd90760e11b5f5260045ffd5b6040519061131b82610dfd565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610b7e57565b51908115158203610b7e57565b602081830312610b7e578051906001600160401b038211610b7e570161014081830312610b7e57604051916113ad83610dfd565b81518352602082015160208401526113c760408301611358565b60408401526113d860608301611358565b60608401526113e960808301611358565b608084015260a082015160a084015261140460c08301611106565b60c084015261141560e08301611106565b60e0840152611427610100830161136c565b6101008401526101208201516001600160401b038111610b7e5761144b9201611150565b61012082015290565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b929092818403611563575f91345b858410156115585781841015611544578360051b80860135908282116115355784013561013e1985360301811215610b7e5730906001600160a01b039061151890870160e001611572565b160361152a57600191039301926114cd565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b356001600160a01b0381168103610b7e5790565b9391929160408501915f91906001600160a01b036115a385611572565b1694606088013597608081013596803b15610b7e575f886115e0928c838d60405196879586948593637921219560e11b8552309060048601611454565b03925af1908161189c575b5061161b5788886103fd896115ff8a611572565b9360405194859463334a7d1b60e21b865230916004870161148c565b604051602080820152949893975091959094916001600160a01b0361163f82610eb0565b1660408601526020810135601e19823603018112156118985701602081359101916001600160401b038211611898578136038313611898576116d5946101009483889560a060608801528160e08801528787013784840186018c90526001600160a01b03906116ad90610eb0565b16608085015260a084015260c0830152601f801991011681010301601f198101835282610e63565b6040519160c083018381106001600160401b0382111761188457906001600160401b039160405260018060a01b0316938484521660208301526001604083015284606083015260808201528360a0820152602060405161173481610e2d565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06117d5608083015160c060e4860152610124850190610f25565b9101516101048301520381877f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1849181611850575b5061182957634a10301360e11b8452600484fd5b7f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06819480a3565b9091506020813d60201161187c575b8161186c60209383610e63565b810103126104215751905f611815565b3d915061185f565b634e487b7160e01b87526041600452602487fd5b8980fd5b6118a99196505f90610e63565b5f945f6115eb565b6001600160401b036060820151168015159081611902575b506118f357608001516001600160401b03166118e457600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f6118c9565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611a56575b806d04ee2d6d415b85acef8100000000600a921015611a3b575b662386f26fc10000811015611a27575b6305f5e100811015611a16575b612710811015611a07575b60648110156119f9575b10156119ee575b600a6021600184019361199385610ec4565b946119a16040519687610e63565b8086526119b0601f1991610ec4565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156119e957600a90916119bb565b505090565b600190910190611981565b60646002910493019261197a565b61271060049104930192611970565b6305f5e10060089104930192611965565b662386f26fc1000060109104930192611958565b6d04ee2d6d415b85acef810000000060209104930192611948565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461192e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611aab57565b634ca8886760e01b5f5260045ffdfea2646970667358221220507efd08fe13266992788bd4e4e561db1030db87908a786be0deeccacc1b117964736f6c634300081b0033",
    "sourceMap": "605:6705:92:-:0;;;;;;;;;;-1:-1:-1;605:6705:92;;;;;;;;;1183:12:9;;;1054:5;1183:12;605:6705:92;1054:5:9;1183:12;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;605:6705:92;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;:::i;:::-;-1:-1:-1;605:6705:92;;-1:-1:-1;;;605:6705:92;;;;;;;;;;;;;;;;;-1:-1:-1;;605:6705:92;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;1299:20:79;;605:6705:92;;;:::i;:::-;881:58:9;;:::i;:::-;1299:20:79;;:::i;:::-;605:6705:92;;-1:-1:-1;;;;;605:6705:92;;;1331:4:79;1299:37;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;605:6705:92;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;:::i;:::-;-1:-1:-1;605:6705:92;;-1:-1:-1;;;605:6705:92;;;;;;;;;;;;-1:-1:-1;;605:6705:92;;;;;;5560:30;605:6705;;:::i;:::-;-1:-1:-1;605:6705:92;;-1:-1:-1;;;5660:23:92;;605:6705;5660:23;;605:6705;;;;;;5660:23;605:6705;5660:3;-1:-1:-1;;;;;605:6705:92;5660:23;;;;;;;;605:6705;-1:-1:-1;5656:172:92;;-1:-1:-1;;;5793:24:92;;605:6705;;5660:23;;-1:-1:-1;5793:24:92;5656:172;5734:20;-1:-1:-1;;;;;5860:26:92;;;605:6705;;5842:15;:44;5838:87;;5964:79;5988:16;;;;605:6705;;;;5964:79;;;;;;:::i;:::-;605:6705;6121:10;;605:6705;6190:21;605:6705;;;;;;;;6190:21;;605:6705;;;;;;;;;5860:26;6225:12;;605:6705;6251:11;605:6705;;6251:11;;605:6705;;;6112:176;;;;;;605:6705;;;;;6112:176;605:6705;;;;;;;;;;;;;;6112:176;;6171:4;605:6705;6112:176;;;:::i;:::-;;;;;;;;;5656:172;-1:-1:-1;;6108:417:92;;605:6705;;;;;;;;;;-1:-1:-1;;;6319:195:92;;605:6705;;;6319:195;;605:6705;-1:-1:-1;;;;;605:6705:92;;;;6171:4;;605:6705;;6319:195;;;:::i;:::-;;;;6108:417;605:6705;;;;;;;6112:176;;;;;;:::i;:::-;605:6705;;6112:176;;;;605:6705;;;5838:87;-1:-1:-1;;;5907:18:92;;605:6705;;5907:18;5660:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;605:6705;;1442:1461:9;605:6705:92;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;:::-;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;1711:44:79;;1736:18;605:6705:92;1711:44:79;;605:6705:92;;;1711:44:79;605:6705:92;;;;;;1711:14:79;605:6705:92;1711:44:79;;;;;;;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;1711:44:79;;;;;;;;;;;;:::i;:::-;;;605:6705:92;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1711:44:79;;;605:6705:92;;;;1711:44:79;605:6705:92;;;;;;;;;;;;;;;;;-1:-1:-1;;605:6705:92;;;;;;:::i;:::-;-1:-1:-1;605:6705:92;;-1:-1:-1;;;1484:23:79;;605:6705:92;;;1484:23:79;;;605:6705:92;;;;1484:23:79;605:6705:92;1484:3:79;-1:-1:-1;;;;;605:6705:92;1484:23:79;;;;;;;;;;;605:6705:92;1521:18:79;605:6705:92;1521:18:79;;605:6705:92;1543:18:79;1521:40;1517:71;;605:6705:92;;;;;;;;;;;;;;:::i;1517:71:79:-;-1:-1:-1;;;1570:18:79;;605:6705:92;;1570:18:79;1484:23;;;;;;;;;;;;;;:::i;:::-;;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;;;469:43:79;605:6705:92;;;;;;;;;;;;;;;;1055:104:6;;605:6705:92;;1089:6:6;1072:24;1089:6;1072:24;:::i;:::-;1120:6;;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;605:6705:92;;;;;;;;;;;;1055:104:6;;;605:6705:92;;;;-1:-1:-1;;;605:6705:92;;;;;;;;;;;;;;;;;-1:-1:-1;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;:::-;605:6705:92;;;;;1055:104:6;605:6705:92;;1055:104:6;605:6705:92;;;;:::i;:::-;;;;;;;-1:-1:-1;;605:6705:92;;;;;;;;;3543:26;605:6705;;:::i;:::-;3579:30;605:6705;;:::i;:::-;-1:-1:-1;605:6705:92;;-1:-1:-1;;;3687:28:92;;605:6705;3687:28;;605:6705;;;3687:3;-1:-1:-1;;;;;605:6705:92;;;-1:-1:-1;605:6705:92;;;;3687:28;;605:6705;;3687:28;;;605:6705;-1:-1:-1;3683:178:92;;3821:29;;;;605:6705;3821:29;605:6705;;;;3821:29;3683:178;3766:16;;605:6705;;;;;3942:32;;;605:6705;3942:32;;605:6705;;3942:32;605:6705;3942:32;;;;605:6705;;3942:32;;;3683:178;-1:-1:-1;3938:190:92;;3821:29;;;;605:6705;4084:33;605:6705;;;;4084:33;3938:190;4025:20;;;3938:190;4143:25;;;:::i;:::-;4142:26;4138:65;;605:6705;;4249:75;4273:12;;;;605:6705;;;;4249:75;;;;;;:::i;:::-;605:6705;;;;;;;;;;4444:18;;;;;605:6705;;;;;;;;;;;;;;4353:152;;605:6705;;4353:152;;605:6705;;;;;;:::i;:::-;;;;-1:-1:-1;;605:6705:92;;;;;;;:::i;:::-;;;;;;4353:152;;;;;;;;;605:6705;4353:152;;;3938:190;4352:153;;4335:208;;605:6705;;;;;:::i;:::-;;;;;;4718:48;;605:6705;;;;;;;:::i;:::-;4676:18;605:6705;;;4632:149;;605:6705;;;4608:183;;;;;605:6705;;;;;;;;;;;;;;;;4608:183;;605:6705;;4608:183;;605:6705;;;;;;;;;;;;;;4608:183;;;;;;3938:190;-1:-1:-1;4604:255:92;;-1:-1:-1;;;4822:26:92;;605:6705;;;;;4822:26;;4604:255;;;;605:6705;4936:17;;605:6705;5012:21;605:6705;;;;;;;;5012:21;;605:6705;;;;;;;;;;5047:19;;605:6705;5080:18;605:6705;;5080:18;;605:6705;;;4927:197;;;;;;605:6705;;;;;;4927:197;605:6705;;;;;;;;;;;;;4927:197;;4993:4;605:6705;4927:197;;;:::i;:::-;;;;;;;;;4604:255;-1:-1:-1;;4923:459:92;;-1:-1:-1;;605:6705:92;;;;;;;;;;-1:-1:-1;;;5155:216:92;;605:6705;;;5155:216;;605:6705;;-1:-1:-1;;;;;;605:6705:92;;;;4993:4;;605:6705;;5155:216;;;:::i;4923:459::-;605:6705;4923:459;;;605:6705;;;;;;;;;5397:60;605:6705;;5397:60;;;605:6705;;;;4927:197;;;;;:::i;:::-;605:6705;;4927:197;;;;;605:6705;;;4608:183;;;;;605:6705;4608:183;;:::i;:::-;605:6705;4608:183;;;;;605:6705;;;4335:208;4523:20;;;605:6705;4523:20;605:6705;;4523:20;4353:152;;;605:6705;4353:152;;605:6705;4353:152;;;;;;605:6705;4353:152;;;:::i;:::-;;;605:6705;;;;;;;:::i;:::-;4353:152;;;;;;-1:-1:-1;4353:152:92;;;605:6705;;;;;;;;;4138:65;4177:26;;;605:6705;4177:26;605:6705;;4177:26;3942:32;;;;;;;605:6705;3942:32;;;;;;:::i;:::-;;;;;3687:28;;;;;;;605:6705;3687:28;;;;;;:::i;:::-;;;;;605:6705;;;;;;-1:-1:-1;;605:6705:92;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;-1:-1:-1;;605:6705:92;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;3350:62;605:6705;;;;:::i;:::-;3389:10;;;;605:6705;;;3350:62;:::i;605:6705::-;;;;;;-1:-1:-1;;605:6705:92;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;775:49:41;;;:89;;;;605:6705:92;;;;;;;775:89:41;-1:-1:-1;;;862:40:68;;-1:-1:-1;775:89:41;;;605:6705:92;;;;-1:-1:-1;;;;;605:6705:92;;;;;;:::o;:::-;;;-1:-1:-1;;;;;605:6705:92;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;:::o;:::-;;;;-1:-1:-1;605:6705:92;;;;;-1:-1:-1;605:6705:92;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;:::o;:::-;;;1055:104:6;;605:6705:92;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;605:6705:92;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;605:6705:92;;;;;;:::o;:::-;;;-1:-1:-1;;;;;605:6705:92;;;;;;:::o;:::-;-1:-1:-1;;;;;605:6705:92;;;;;;-1:-1:-1;;605:6705:92;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;605:6705:92;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;605:6705:92;;;;;;;;-1:-1:-1;;605:6705:92;;;;:::o;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;605:6705:92;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;-1:-1:-1;;605:6705:92;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;-1:-1:-1;;605:6705:92;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;605:6705:92;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;605:6705:92;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::o;6567:741::-;6777:18;1007:16:78;;;605:6705:92;1007:26:78;1003:54;;1074:26;;;:::i;:::-;6750:46:92;6746:64;;6852:77;6876:14;6973:35;6876:14;;;1007:16:78;605:6705:92;;;6852:77;;;;;;:::i;:::-;605:6705;1007:16:78;605:6705:92;;;6973:35;;;;;;:::i;:::-;7038:13;;;;605:6705;7055:16;;;605:6705;-1:-1:-1;;;;;605:6705:92;;;;;7038:33;;;:86;;6567:741;7038:137;;;6567:741;7038:190;;;6567:741;7038:263;;;7019:282;;6567:741;:::o;7038:263::-;1007:16:78;7254:14:92;;;;;;605:6705;;;;;7244:25;7283:17;;;1007:16:78;605:6705:92;;;;7273:28;7244:57;6567:741;:::o;7038:190::-;605:6705;;;;-1:-1:-1;;;;;605:6705:92;;;;;7191:37;;-1:-1:-1;7038:190:92;;:137;7140:14;;;;;605:6705;7140:14;7158:17;;605:6705;-1:-1:-1;7140:35:92;7038:137;;;:86;7087:15;;;;;605:6705;7087:15;7106:18;;605:6705;7087:37;7038:86;;;6746:64;6798:12;;605:6705;6798:12;:::o;1003:54:78:-;1042:15;;;605:6705:92;1042:15:78;;605:6705:92;1042:15:78;605:6705:92;;;;;;;:::i;:::-;;;;-1:-1:-1;605:6705:92;;-1:-1:-1;605:6705:92;;;;-1:-1:-1;605:6705:92;;;;-1:-1:-1;605:6705:92;;;;-1:-1:-1;605:6705:92;;;;-1:-1:-1;605:6705:92;;;;-1:-1:-1;605:6705:92;;;;-1:-1:-1;605:6705:92;;;;-1:-1:-1;605:6705:92;;;;;;:::o;:::-;;;-1:-1:-1;;;;;605:6705:92;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;:::i;:::-;;;;;;:::o;:::-;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;605:6705:92;;;;;;;:::o;:::-;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;605:6705:92;;;;;;;;;;;;;4064:22:9;;;;4060:87;;605:6705:92;;;;;;;;;;;;;;1331:4:79;;-1:-1:-1;;;;;605:6705:92;1299:20:79;;605:6705:92;;1299:20:79;;;:::i;:::-;605:6705:92;1299:37:79;4270:84:9;;1489:1:0;605:6705:92;;3896:19:9;605:6705:92;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;605:6705:92;;;;3881:1:9;605:6705:92;;;;;3881:1:9;605:6705:92;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;605:6705:92;;-1:-1:-1;;;;;605:6705:92;;;;;;;:::o;1744:1456::-;;;;;2005:10;;;;605:6705;;1744:1456;-1:-1:-1;;;;;2005:10:92;;;:::i;:::-;605:6705;2093:12;;;;605:6705;2119:11;;;;605:6705;1996:160;;;;;;605:6705;;1996:160;605:6705;;;;2005:10;605:6705;;;;;;;;;;;1996:160;;2074:4;1996:160;;;;;:::i;:::-;;;;;;;;;1744:1456;-1:-1:-1;1992:429:92;;2269:10;;2230:180;2269:10;;;;:::i;:::-;605:6705;2005:10;605:6705;5155:216;;;;;;2230:180;;2074:4;2230:180;1996:160;2230:180;;;:::i;1992:429::-;2005:10;605:6705;2840:16;;;;605:6705;1992:429;;;;-1:-1:-1;1992:429:92;;;;;-1:-1:-1;;;;;605:6705:92;1992:429;605:6705;:::i;:::-;;2005:10;605:6705;;;2840:16;605:6705;;;;;;;;;;;;;;;2840:16;605:6705;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;;;2840:16;605:6705;;;;;;;2093:12;605:6705;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;:::i;:::-;;2119:11;605:6705;;;;;;;;;;;;1055:104:6;;605:6705:92;;;;;2840:16;;1055:104:6;;2840:16:92;;;;;;:::i;:::-;2005:10;605:6705;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;-1:-1:-1;;;;;605:6705:92;2005:10;605:6705;;;;;;;;;;;;2840:16;2618:287;;605:6705;;2005:10;2618:287;;605:6705;2618:287;2093:12;2618:287;;605:6705;2119:11;2618:287;;605:6705;2618:287;605:6705;2618:287;;605:6705;2840:16;2005:10;605:6705;;;;:::i;:::-;2576:18;605:6705;;2531:389;;;605:6705;;;2005:10;605:6705;;;;;;;;2507:423;;;1996:160;2507:423;;605:6705;;;;;;;2005:10;605:6705;;;;;;;;;;;;;;;;-1:-1:-1;;;;;605:6705:92;;;;;;;;;2005:10;605:6705;;;;;;;;;2093:12;605:6705;;;;;;;;;2119:11;605:6705;;;;;;;;;;;;;:::i;:::-;;;;;;;;2507:423;605:6705;;2507:3;-1:-1:-1;;;;;605:6705:92;2507:423;;;;;;;1992:429;-1:-1:-1;2503:691:92;;-1:-1:-1;;;3158:25:92;;1996:160;3158:25;;2503:691;2996:27;2967:10;2996:27;;;1744:1456::o;2507:423::-;;;;2840:16;2507:423;;2840:16;2507:423;;;;;;2840:16;2507:423;;;:::i;:::-;;;605:6705;;;;;2507:423;;;;;;;-1:-1:-1;2507:423:92;;605:6705;-1:-1:-1;;;605:6705:92;;;1996:160;605:6705;;;;;;;;1996:160;;;;;605:6705;1996:160;;:::i;:::-;605:6705;1996:160;;;;607:258:78;-1:-1:-1;;;;;352:24:78;;;605:6705:92;;352:29:78;;;:87;;;;607:258;715:54;;;565:24;;605:6705:92;-1:-1:-1;;;;;605:6705:92;779:57:78;;854:4;607:258;:::o;779:57::-;816:20;;;-1:-1:-1;816:20:78;;-1:-1:-1;816:20:78;715:54;752:17;;;-1:-1:-1;752:17:78;;-1:-1:-1;752:17:78;352:87;424:15;;;-1:-1:-1;352:87:78;;;637:632:63;759:17;-1:-1:-1;25444:17:70;-1:-1:-1;;;25444:17:70;;;25440:103;;637:632:63;25560:17:70;25569:8;26140:7;25560:17;;;25556:103;;637:632:63;25685:8:70;25676:17;;;25672:103;;637:632:63;25801:7:70;25792:16;;;25788:100;;637:632:63;25914:7:70;25905:16;;;25901:100;;637:632:63;26027:7:70;26018:16;;;26014:100;;637:632:63;26131:16:70;;26127:66;;637:632:63;26140:7:70;874:92:63;779:1;605:6705:92;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;605:6705:92;;:::i;:::-;;;;;;;874:92:63;;;979:247;-1:-1:-1;;605:6705:92;;-1:-1:-1;;;1033:111:63;;;;605:6705:92;1033:111:63;605:6705:92;1194:10:63;;1190:21;;26140:7:70;979:247:63;;;;1190:21;1206:5;;637:632;:::o;26127:66:70:-;26177:1;605:6705:92;;;;26127:66:70;;26014:100;26027:7;26098:1;605:6705:92;;;;26014:100:70;;;25901;25914:7;25985:1;605:6705:92;;;;25901:100:70;;;25788;25801:7;25872:1;605:6705:92;;;;25788:100:70;;;25672:103;25685:8;25758:2;605:6705:92;;;;25672:103:70;;;25556;25569:8;25642:2;605:6705:92;;;;25556:103:70;;;25440;-1:-1:-1;25526:2:70;;-1:-1:-1;;;;605:6705:92;;25440:103:70;;6040:128:9;6109:4;-1:-1:-1;;;;;605:6705:92;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 1913,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 1957,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 2000,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 6779,
          "length": 32
        }
      ],
      "53702": [
        {
          "start": 1268,
          "length": 32
        }
      ],
      "53705": [
        {
          "start": 739,
          "length": 32
        },
        {
          "start": 1643,
          "length": 32
        },
        {
          "start": 2207,
          "length": 32
        },
        {
          "start": 6115,
          "length": 32
        }
      ],
      "53707": [
        {
          "start": 1218,
          "length": 32
        },
        {
          "start": 1707,
          "length": 32
        },
        {
          "start": 1845,
          "length": 32
        },
        {
          "start": 2538,
          "length": 32
        },
        {
          "start": 4614,
          "length": 32
        },
        {
          "start": 5942,
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
    "getSchema()": "6b122fe0",
    "getStatement(bytes32)": "5cc02d2f",
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
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationCreateFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC1155TransferFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidSchema\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromStatement\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"payment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowClaimed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"payment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"collectExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_payment\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectPayment\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getStatement\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"makeStatement\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"makeStatementFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155BatchReceived\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"supportsInterface(bytes4)\":{\"details\":\"See {IERC165-supportsInterface}.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/ERC1155EscrowObligation.sol\":\"ERC1155EscrowObligation\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746\",\"dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce\",\"dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol\":{\"keccak256\":\"0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd\",\"dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9\",\"dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f\",\"dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x9054efbe0d83eee80617895c7ec3c7457b414f2bcfad00fbf4f37e46e64f06d5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c4bf82d91e2b4a82ec0936298e4026ff84f6745e332a5732e509e3f6cfe9ae36\",\"dweb:/ipfs/QmbTyZSQrfBX8ySdxmMGKv5KwKKU634Pm2k2BV9EpGXz1r\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/obligations/ERC1155EscrowObligation.sol\":{\"keccak256\":\"0x11d52227f37b9223626470425e34ca73d025f43bcf38c9119fc23b87de670f78\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://08c1538b01413b0d07add3060c2ae5ddc69097d1f48ff8f8183c2629fd62ad66\",\"dweb:/ipfs/QmdPyB1HPQ6Yw7PkcT42ewgo4GxjP2JrV6km6Dt5sVGVtJ\"]}},\"version\":1}",
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
        "keccak256": "0x11d52227f37b9223626470425e34ca73d025f43bcf38c9119fc23b87de670f78",
        "urls": [
          "bzz-raw://08c1538b01413b0d07add3060c2ae5ddc69097d1f48ff8f8183c2629fd62ad66",
          "dweb:/ipfs/QmdPyB1HPQ6Yw7PkcT42ewgo4GxjP2JrV6km6Dt5sVGVtJ"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 92
} as const;