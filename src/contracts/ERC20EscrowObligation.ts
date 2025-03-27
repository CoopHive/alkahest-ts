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
          "internalType": "struct ERC20EscrowObligation.StatementData",
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
          "internalType": "struct ERC20EscrowObligation.StatementData",
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
          "internalType": "struct ERC20EscrowObligation.StatementData",
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
          "internalType": "struct ERC20EscrowObligation.StatementData",
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
      "name": "ERC20TransferFailed",
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
    "object": "0x610160806040523461020657604081611d8380380380916100208285610240565b8339810103126102065780516001600160a01b038116918282036102065760200151916001600160a01b03831680840361020657604051606081016001600160401b0381118282101761022c57604052603c815260208101927f6164647265737320617262697465722c2062797465732064656d616e642c206184527f64647265737320746f6b656e2c2075696e7432353620616d6f756e740000000060408301526001608052600360a0525f60c0521561021d576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af1908115610212575f916101dc575b5061014052604051611b1f9081610264823960805181610855015260a05181610881015260c051816108ac015260e05181611aaa015261010051816105e8015261012051818181610268015281816103c1015281816107560152818161097a01526113f00152610140518181816102a8015281816105b6015281816107960152818161081201528181610ac50152818161134301526115e10152f35b90506020813d60201161020a575b816101f760209383610240565b8101031261020657515f610140565b5f80fd5b3d91506101ea565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b0382119082101761022c5760405256fe60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c9081630fce714614610e295781631272ff8b14610d1157816330088bc91461093957816354fd4d50146108355781635bf2f20d146107fb5781635cc02d2f1461071f5781636b122fe01461057657816388e5b2d91461054d57816391db0b7e1461054d578163a84f2aa014610387578163b8b0e3fc14610333578163c75c572b14610231578163ce46e04614610216578163e112ea081461011157508063e49617e1146100df5763e60c35050361000e575b60206100fd60e06100ef3661114e565b6100f7611aa8565b01611182565b6040516001600160a01b0390911630148152f35b3461020757602036600319011261020757600435906001600160401b03821161020757366023830112156102075781600401356001600160401b03811161020a578201916024830190368211610212576101696118bc565b50602081850312610212576024810135906001600160401b03821161020e5701926080908490031261020a57604051916101a283610f21565b6101ae60248501610ec2565b83526044840135906001600160401b0382116102075750926101da608492602461020396840101610f78565b60208401526101eb60648201610ec2565b60408401520135606082015260405191829182611104565b0390f35b80fd5b5080fd5b8380fd5b8280fd5b34610207578060031936011261020757602090604051908152f35b346102075760203660031901126102075761024a6118bc565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610326578192610302575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036102f3576102036102e76101208401516020808251830101910161155f565b60405191829182611104565b63629cd40b60e11b8152600490fd5b61031f9192503d8084833e6103178183610f3c565b81019061172e565b90826102a0565b50604051903d90823e3d90fd5b3461020757604036600319011261020757600435906001600160401b038211610207576080600319833603011261020757602061037f83610372610e98565b90339133916004016111ce565b604051908152f35b3461020757602036600319011261020757600435906103a46116d0565b506040516328c44a9960e21b8152600481018390529181836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa80938394610531575b5061040c576301fb6dd160e01b825260045260249150fd5b506001600160401b036060830151164210610522576104396101208301516020808251830101910161155f565b6040818101805160c095909501805160609094018051935163a9059cbb60e01b81526001600160a01b03958616600482015260248101949094529590949193919291602091839160449183918791165af18291816104e6575b506104df57505b156104a957602060405160018152f35b5190519151604051634a73404560e11b81529283926104db92916001600160a01b0390811691309116600486016111a3565b0390fd5b9050610499565b9091506020813d60201161051a575b8161050260209383610f3c565b810103126102125761051390611196565b9086610492565b3d91506104f5565b637bf6a16f60e01b8152600490fd5b6105469194503d8085833e6103178183610f3c565b92846103f4565b602061056c61055b366110b4565b92610567929192611aa8565b611809565b6040519015158152f35b3461020757806003193601126102075760608060405161059581610f21565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561071357809161065e575b606082610203604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610fbe565b90503d8082843e61066f8184610f3c565b82019160208184031261020a578051906001600160401b03821161021257019060808284031261020757604051916106a683610f21565b8051835260208101516001600160a01b03811681036102125760208401526106d060408201611196565b60408401526060810151906001600160401b03821161021257019083601f8301121561020757506060928160206107099351910161150f565b8282015282610618565b604051903d90823e3d90fd5b34610207576020366003190112610207576107386116d0565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156103265781926107df575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036107d0576040516020808252819061020390820185610fe2565b63295d5f3960e01b8152600490fd5b6107f49192503d8084833e6103178183610f3c565b908261078e565b3461020757806003193601126102075760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461020757806003193601126102075760206109256001610203936108797f000000000000000000000000000000000000000000000000000000000000000061193b565b9082856108a57f000000000000000000000000000000000000000000000000000000000000000061193b565b81806108d07f000000000000000000000000000000000000000000000000000000000000000061193b565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282610f3c565b604051918291602083526020830190610fbe565b34610c72576040366003190112610c7257600435906024359061095a6116d0565b506109636116d0565b506040516328c44a9960e21b8152600481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f81602481865afa5f9181610cf5575b506109cc57846301fb6dd160e01b5f5260045260245ffd5b84906040516328c44a9960e21b81528560048201525f81602481885afa5f9181610cd9575b50610a0957856301fb6dd160e01b5f5260045260245ffd5b90859194610a16826118e0565b15610cca57610a836020610a3761012085015182808251830101910161155f565b9360018060a01b03855116610a718a84880151935160405196879586948594631272ff8b60e01b8652606060048701526064860190610fe2565b84810360031901602486015290610fbe565b90604483015203915afa908115610cbf575f91610c85575b5015610c7657604051610aad81610f06565b8481525f602082015260405190610ac382610f06565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b15610c725760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af19081610c5d575b50610b455763614cf93960e01b84526004839052602484fd5b6040818101805160c097909701805160609094018051935163a9059cbb60e01b81526001600160a01b0395861660048201526024810194909452979093919291602091839160449183918b91165af1869181610c1d575b50610c185750845b15610be657506020945060018060a01b03905116917fd903ca32e81477af89f5b8a6ce888d185cc715390e49474a77b4c6846254cccd6040519480a460018152f35b5190518551604051634a73404560e11b81529283926104db92916001600160a01b0391821691309116600486016111a3565b610ba4565b9091506020813d602011610c55575b81610c3960209383610f3c565b81010312610c5157610c4a90611196565b9088610b9c565b8680fd5b3d9150610c2c565b610c6a9195505f90610f3c565b5f9386610b2c565b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610cb7575b81610ca060209383610f3c565b81010312610c7257610cb190611196565b87610a9b565b3d9150610c93565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b610cee9192503d805f833e6103178183610f3c565b90876109f1565b610d0a9192503d805f833e6103178183610f3c565b90866109b4565b34610c72576060366003190112610c72576004356001600160401b038111610c72576101406003198236030112610c725760405190610d4f82610ed6565b8060040135825260248101356020830152610d6c60448201610eae565b6040830152610d7d60648201610eae565b6060830152610d8e60848201610eae565b608083015260a481013560a0830152610da960c48201610ec2565b60c0830152610dba60e48201610ec2565b60e08301526101048101358015158103610c7257610100830152610124810135906001600160401b038211610c72576004610df89236920101610f78565b6101208201526024356001600160401b038111610c7257602091610e2361056c923690600401610f78565b906115df565b34610c72576080366003190112610c72576004356001600160401b038111610c725760806003198236030112610c7257610e61610e98565b906044356001600160a01b0381168103610c7257606435906001600160a01b0382168203610c725760209361037f936004016111ce565b602435906001600160401b0382168203610c7257565b35906001600160401b0382168203610c7257565b35906001600160a01b0382168203610c7257565b61014081019081106001600160401b03821117610ef257604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610ef257604052565b608081019081106001600160401b03821117610ef257604052565b90601f801991011681019081106001600160401b03821117610ef257604052565b6001600160401b038111610ef257601f01601f191660200190565b81601f82011215610c7257803590610f8f82610f5d565b92610f9d6040519485610f3c565b82845260208383010111610c7257815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b906101406101206110819380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610fbe565b90565b9181601f84011215610c72578235916001600160401b038311610c72576020808501948460051b010111610c7257565b6040600319820112610c72576004356001600160401b038111610c7257816110de91600401611084565b92909291602435906001600160401b038211610c725761110091600401611084565b9091565b6020815260018060a01b03825116602082015260806060611133602085015183604086015260a0850190610fbe565b60408501516001600160a01b03168483015293015191015290565b6020600319820112610c7257600435906001600160401b038211610c7257610140908290036003190112610c725760040190565b356001600160a01b0381168103610c725790565b51908115158203610c7257565b6001600160a01b03918216815291811660208301529091166040820152606081019190915260800190565b9293929091604082016001600160a01b036111e882611182565b16915f60206060860135946064604051809481936323b872dd60e01b835260018060a01b03881660048401523060248401528960448401525af15f91816114bf575b506114ba57505f5b156114915750604051602080820152926001600160a01b0361125382610ec2565b1660408501526020810135601e1982360301811215610c725701602081359101906001600160401b038111610c72578036038213610c72576112e29360e093828794608060608701528160c0870152868601375f8484018601526001600160a01b03906112bf90610ec2565b16608084015260a0830152601f801991011681010301601f198101835282610f3c565b6040519360c08501908582106001600160401b03831117610ef2576001600160401b039160405260018060a01b031692838652166020850152600160408501525f606085015260808401525f60a0840152602060405161134181610f06565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06113e2608083015160c060e4860152610124850190610fbe565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af15f938161145d575b5061143657634a10301360e11b5f5260045ffd5b827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9093506020813d602011611489575b8161147960209383610f3c565b81010312610c725751925f611422565b3d915061146c565b9061149e6104db91611182565b92604051938493634a73404560e11b85523091600486016111a3565b611232565b9091506020813d6020116114f3575b816114db60209383610f3c565b81010312610c72576114ec90611196565b905f61122a565b3d91506114ce565b51906001600160a01b0382168203610c7257565b92919261151b82610f5d565b916115296040519384610f3c565b829481845281830111610c72578281602093845f96015e010152565b9080601f83011215610c725781516110819260200161150f565b602081830312610c72578051906001600160401b038211610c72570190608082820312610c72576040519161159383610f21565b61159c816114fb565b835260208101516001600160401b038111610c72576060926115bf918301611545565b60208401526115d0604082016114fb565b60408401520151606082015290565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036116c157611613816118e0565b156116bb576116336101206116439201516020808251830101910161155f565b916020808251830101910161155f565b604082810151908201516001600160a01b0390811691161491826116a7575b8261168e575b8261167257505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611668565b915060608201516060820151111591611662565b50505f90565b635f9bd90760e11b5f5260045ffd5b604051906116dd82610ed6565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610c7257565b602081830312610c72578051906001600160401b038211610c72570161014081830312610c72576040519161176283610ed6565b815183526020820151602084015261177c6040830161171a565b604084015261178d6060830161171a565b606084015261179e6080830161171a565b608084015260a082015160a08401526117b960c083016114fb565b60c08401526117ca60e083016114fb565b60e08401526117dc6101008301611196565b6101008401526101208201516001600160401b038111610c72576118009201611545565b61012082015290565b9290928184036118ad575f91345b858410156118a2578184101561188e578360051b808601359082821161187f5784013561013e1985360301811215610c725730906001600160a01b039061186290870160e001611182565b16036118745760019103930192611817565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b604051906118c982610f21565b5f6060838281528160208201528260408201520152565b6001600160401b036060820151168015159081611931575b5061192257608001516001600160401b031661191357600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f6118f8565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611a85575b806d04ee2d6d415b85acef8100000000600a921015611a6a575b662386f26fc10000811015611a56575b6305f5e100811015611a45575b612710811015611a36575b6064811015611a28575b1015611a1d575b600a602160018401936119c285610f5d565b946119d06040519687610f3c565b8086526119df601f1991610f5d565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611a1857600a90916119ea565b505090565b6001909101906119b0565b6064600291049301926119a9565b6127106004910493019261199f565b6305f5e10060089104930192611994565b662386f26fc1000060109104930192611987565b6d04ee2d6d415b85acef810000000060209104930192611977565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461195d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611ada57565b634ca8886760e01b5f5260045ffdfea264697066735822122023a9ec6ee5e523f2df55786730a5842c2ab09180925b72f4831788781ef22af964736f6c634300081b0033",
    "sourceMap": "506:7270:88:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;;;;;;;;1578:4;759:14:6;;688:1:9;783:14:6;;-1:-1:-1;807:14:6;;708:26:9;704:76;;506:7270:88;790:10:9;;506:7270:88;790:10:9;;;713::73;;733:32;;-1:-1:-1;506:7270:88;;;;;;;;;;;796:48:73;;506:7270:88;796:48:73;;;506:7270:88;;;;;;;;;;;;;;;;;;;;;828:4:73;506:7270:88;;;;1578:4;506:7270;;;;;;-1:-1:-1;;506:7270:88;;;796:48:73;;;;;;;;;;-1:-1:-1;796:48:73;;;-1:-1:-1;775:69:73;;;506:7270:88;;;;;;;;759:14:6;506:7270:88;;;;;783:14:6;506:7270:88;;;;;807:14:6;506:7270:88;;;;;790:10:9;506:7270:88;;;;;733:32:73;506:7270:88;;;;;713:10:73;506:7270:88;;;;;;;;;;;;;;;;;;;;;;;;;775:69:73;506:7270:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;796:48:73;;;506:7270:88;796:48:73;;506:7270:88;796:48:73;;;;;;506:7270:88;796:48:73;;;:::i;:::-;;;506:7270:88;;;;;796:48:73;;;506:7270:88;-1:-1:-1;506:7270:88;;796:48:73;;;-1:-1:-1;796:48:73;;;506:7270:88;;;-1:-1:-1;506:7270:88;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;506:7270:88;;;;-1:-1:-1;506:7270:88;;;;;-1:-1:-1;506:7270:88;;;;;;-1:-1:-1;;506:7270:88;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c9081630fce714614610e295781631272ff8b14610d1157816330088bc91461093957816354fd4d50146108355781635bf2f20d146107fb5781635cc02d2f1461071f5781636b122fe01461057657816388e5b2d91461054d57816391db0b7e1461054d578163a84f2aa014610387578163b8b0e3fc14610333578163c75c572b14610231578163ce46e04614610216578163e112ea081461011157508063e49617e1146100df5763e60c35050361000e575b60206100fd60e06100ef3661114e565b6100f7611aa8565b01611182565b6040516001600160a01b0390911630148152f35b3461020757602036600319011261020757600435906001600160401b03821161020757366023830112156102075781600401356001600160401b03811161020a578201916024830190368211610212576101696118bc565b50602081850312610212576024810135906001600160401b03821161020e5701926080908490031261020a57604051916101a283610f21565b6101ae60248501610ec2565b83526044840135906001600160401b0382116102075750926101da608492602461020396840101610f78565b60208401526101eb60648201610ec2565b60408401520135606082015260405191829182611104565b0390f35b80fd5b5080fd5b8380fd5b8280fd5b34610207578060031936011261020757602090604051908152f35b346102075760203660031901126102075761024a6118bc565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610326578192610302575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036102f3576102036102e76101208401516020808251830101910161155f565b60405191829182611104565b63629cd40b60e11b8152600490fd5b61031f9192503d8084833e6103178183610f3c565b81019061172e565b90826102a0565b50604051903d90823e3d90fd5b3461020757604036600319011261020757600435906001600160401b038211610207576080600319833603011261020757602061037f83610372610e98565b90339133916004016111ce565b604051908152f35b3461020757602036600319011261020757600435906103a46116d0565b506040516328c44a9960e21b8152600481018390529181836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa80938394610531575b5061040c576301fb6dd160e01b825260045260249150fd5b506001600160401b036060830151164210610522576104396101208301516020808251830101910161155f565b6040818101805160c095909501805160609094018051935163a9059cbb60e01b81526001600160a01b03958616600482015260248101949094529590949193919291602091839160449183918791165af18291816104e6575b506104df57505b156104a957602060405160018152f35b5190519151604051634a73404560e11b81529283926104db92916001600160a01b0390811691309116600486016111a3565b0390fd5b9050610499565b9091506020813d60201161051a575b8161050260209383610f3c565b810103126102125761051390611196565b9086610492565b3d91506104f5565b637bf6a16f60e01b8152600490fd5b6105469194503d8085833e6103178183610f3c565b92846103f4565b602061056c61055b366110b4565b92610567929192611aa8565b611809565b6040519015158152f35b3461020757806003193601126102075760608060405161059581610f21565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561071357809161065e575b606082610203604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610fbe565b90503d8082843e61066f8184610f3c565b82019160208184031261020a578051906001600160401b03821161021257019060808284031261020757604051916106a683610f21565b8051835260208101516001600160a01b03811681036102125760208401526106d060408201611196565b60408401526060810151906001600160401b03821161021257019083601f8301121561020757506060928160206107099351910161150f565b8282015282610618565b604051903d90823e3d90fd5b34610207576020366003190112610207576107386116d0565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156103265781926107df575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036107d0576040516020808252819061020390820185610fe2565b63295d5f3960e01b8152600490fd5b6107f49192503d8084833e6103178183610f3c565b908261078e565b3461020757806003193601126102075760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461020757806003193601126102075760206109256001610203936108797f000000000000000000000000000000000000000000000000000000000000000061193b565b9082856108a57f000000000000000000000000000000000000000000000000000000000000000061193b565b81806108d07f000000000000000000000000000000000000000000000000000000000000000061193b565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282610f3c565b604051918291602083526020830190610fbe565b34610c72576040366003190112610c7257600435906024359061095a6116d0565b506109636116d0565b506040516328c44a9960e21b8152600481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f81602481865afa5f9181610cf5575b506109cc57846301fb6dd160e01b5f5260045260245ffd5b84906040516328c44a9960e21b81528560048201525f81602481885afa5f9181610cd9575b50610a0957856301fb6dd160e01b5f5260045260245ffd5b90859194610a16826118e0565b15610cca57610a836020610a3761012085015182808251830101910161155f565b9360018060a01b03855116610a718a84880151935160405196879586948594631272ff8b60e01b8652606060048701526064860190610fe2565b84810360031901602486015290610fbe565b90604483015203915afa908115610cbf575f91610c85575b5015610c7657604051610aad81610f06565b8481525f602082015260405190610ac382610f06565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b15610c725760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af19081610c5d575b50610b455763614cf93960e01b84526004839052602484fd5b6040818101805160c097909701805160609094018051935163a9059cbb60e01b81526001600160a01b0395861660048201526024810194909452979093919291602091839160449183918b91165af1869181610c1d575b50610c185750845b15610be657506020945060018060a01b03905116917fd903ca32e81477af89f5b8a6ce888d185cc715390e49474a77b4c6846254cccd6040519480a460018152f35b5190518551604051634a73404560e11b81529283926104db92916001600160a01b0391821691309116600486016111a3565b610ba4565b9091506020813d602011610c55575b81610c3960209383610f3c565b81010312610c5157610c4a90611196565b9088610b9c565b8680fd5b3d9150610c2c565b610c6a9195505f90610f3c565b5f9386610b2c565b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610cb7575b81610ca060209383610f3c565b81010312610c7257610cb190611196565b87610a9b565b3d9150610c93565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b610cee9192503d805f833e6103178183610f3c565b90876109f1565b610d0a9192503d805f833e6103178183610f3c565b90866109b4565b34610c72576060366003190112610c72576004356001600160401b038111610c72576101406003198236030112610c725760405190610d4f82610ed6565b8060040135825260248101356020830152610d6c60448201610eae565b6040830152610d7d60648201610eae565b6060830152610d8e60848201610eae565b608083015260a481013560a0830152610da960c48201610ec2565b60c0830152610dba60e48201610ec2565b60e08301526101048101358015158103610c7257610100830152610124810135906001600160401b038211610c72576004610df89236920101610f78565b6101208201526024356001600160401b038111610c7257602091610e2361056c923690600401610f78565b906115df565b34610c72576080366003190112610c72576004356001600160401b038111610c725760806003198236030112610c7257610e61610e98565b906044356001600160a01b0381168103610c7257606435906001600160a01b0382168203610c725760209361037f936004016111ce565b602435906001600160401b0382168203610c7257565b35906001600160401b0382168203610c7257565b35906001600160a01b0382168203610c7257565b61014081019081106001600160401b03821117610ef257604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610ef257604052565b608081019081106001600160401b03821117610ef257604052565b90601f801991011681019081106001600160401b03821117610ef257604052565b6001600160401b038111610ef257601f01601f191660200190565b81601f82011215610c7257803590610f8f82610f5d565b92610f9d6040519485610f3c565b82845260208383010111610c7257815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b906101406101206110819380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610fbe565b90565b9181601f84011215610c72578235916001600160401b038311610c72576020808501948460051b010111610c7257565b6040600319820112610c72576004356001600160401b038111610c7257816110de91600401611084565b92909291602435906001600160401b038211610c725761110091600401611084565b9091565b6020815260018060a01b03825116602082015260806060611133602085015183604086015260a0850190610fbe565b60408501516001600160a01b03168483015293015191015290565b6020600319820112610c7257600435906001600160401b038211610c7257610140908290036003190112610c725760040190565b356001600160a01b0381168103610c725790565b51908115158203610c7257565b6001600160a01b03918216815291811660208301529091166040820152606081019190915260800190565b9293929091604082016001600160a01b036111e882611182565b16915f60206060860135946064604051809481936323b872dd60e01b835260018060a01b03881660048401523060248401528960448401525af15f91816114bf575b506114ba57505f5b156114915750604051602080820152926001600160a01b0361125382610ec2565b1660408501526020810135601e1982360301811215610c725701602081359101906001600160401b038111610c72578036038213610c72576112e29360e093828794608060608701528160c0870152868601375f8484018601526001600160a01b03906112bf90610ec2565b16608084015260a0830152601f801991011681010301601f198101835282610f3c565b6040519360c08501908582106001600160401b03831117610ef2576001600160401b039160405260018060a01b031692838652166020850152600160408501525f606085015260808401525f60a0840152602060405161134181610f06565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06113e2608083015160c060e4860152610124850190610fbe565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af15f938161145d575b5061143657634a10301360e11b5f5260045ffd5b827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9093506020813d602011611489575b8161147960209383610f3c565b81010312610c725751925f611422565b3d915061146c565b9061149e6104db91611182565b92604051938493634a73404560e11b85523091600486016111a3565b611232565b9091506020813d6020116114f3575b816114db60209383610f3c565b81010312610c72576114ec90611196565b905f61122a565b3d91506114ce565b51906001600160a01b0382168203610c7257565b92919261151b82610f5d565b916115296040519384610f3c565b829481845281830111610c72578281602093845f96015e010152565b9080601f83011215610c725781516110819260200161150f565b602081830312610c72578051906001600160401b038211610c72570190608082820312610c72576040519161159383610f21565b61159c816114fb565b835260208101516001600160401b038111610c72576060926115bf918301611545565b60208401526115d0604082016114fb565b60408401520151606082015290565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036116c157611613816118e0565b156116bb576116336101206116439201516020808251830101910161155f565b916020808251830101910161155f565b604082810151908201516001600160a01b0390811691161491826116a7575b8261168e575b8261167257505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611668565b915060608201516060820151111591611662565b50505f90565b635f9bd90760e11b5f5260045ffd5b604051906116dd82610ed6565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610c7257565b602081830312610c72578051906001600160401b038211610c72570161014081830312610c72576040519161176283610ed6565b815183526020820151602084015261177c6040830161171a565b604084015261178d6060830161171a565b606084015261179e6080830161171a565b608084015260a082015160a08401526117b960c083016114fb565b60c08401526117ca60e083016114fb565b60e08401526117dc6101008301611196565b6101008401526101208201516001600160401b038111610c72576118009201611545565b61012082015290565b9290928184036118ad575f91345b858410156118a2578184101561188e578360051b808601359082821161187f5784013561013e1985360301811215610c725730906001600160a01b039061186290870160e001611182565b16036118745760019103930192611817565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b604051906118c982610f21565b5f6060838281528160208201528260408201520152565b6001600160401b036060820151168015159081611931575b5061192257608001516001600160401b031661191357600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f6118f8565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611a85575b806d04ee2d6d415b85acef8100000000600a921015611a6a575b662386f26fc10000811015611a56575b6305f5e100811015611a45575b612710811015611a36575b6064811015611a28575b1015611a1d575b600a602160018401936119c285610f5d565b946119d06040519687610f3c565b8086526119df601f1991610f5d565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611a1857600a90916119ea565b505090565b6001909101906119b0565b6064600291049301926119a9565b6127106004910493019261199f565b6305f5e10060089104930192611994565b662386f26fc1000060109104930192611987565b6d04ee2d6d415b85acef810000000060209104930192611977565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461195d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611ada57565b634ca8886760e01b5f5260045ffdfea264697066735822122023a9ec6ee5e523f2df55786730a5842c2ab09180925b72f4831788781ef22af964736f6c634300081b0033",
    "sourceMap": "506:7270:88:-:0;;;;;;;;;-1:-1:-1;506:7270:88;;;;;;;;1183:12:9;;;1054:5;1183:12;506:7270:88;1054:5:9;1183:12;506:7270:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1299:20:73;;506:7270:88;;;:::i;:::-;881:58:9;;:::i;:::-;1299:20:73;;:::i;:::-;506:7270:88;;-1:-1:-1;;;;;506:7270:88;;;1331:4:73;1299:37;506:7270:88;;;;;;;;;-1:-1:-1;;506:7270:88;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;:::i;:::-;-1:-1:-1;506:7270:88;;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;506:7270:88;;;;;;:::i;:::-;-1:-1:-1;506:7270:88;;-1:-1:-1;;;7411:23:88;;506:7270;;;7411:23;;;506:7270;;;;7411:23;506:7270;7411:3;-1:-1:-1;;;;;506:7270:88;7411:23;;;;;;;;;;;506:7270;7448:18;506:7270;7448:18;;506:7270;7470:18;7448:40;7444:91;;506:7270;7552:45;7563:16;;;;506:7270;;;;7552:45;;;;;;:::i;:::-;506:7270;;;;;;;:::i;7444:91::-;-1:-1:-1;;;7509:26:88;;506:7270;;7509:26;7411:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;506:7270;;;;;;;;;;;;;;;;;-1:-1:-1;;506:7270:88;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;3275:62;506:7270;;;:::i;:::-;3314:10;;;;506:7270;;;3275:62;:::i;:::-;506:7270;;;;;;;;;;;;-1:-1:-1;;506:7270:88;;;;;;5575:30;506:7270;;:::i;:::-;-1:-1:-1;506:7270:88;;-1:-1:-1;;;5667:23:88;;506:7270;5667:23;;506:7270;;;;;;5667:23;506:7270;5667:3;-1:-1:-1;;;;;506:7270:88;5667:23;;;;;;;;506:7270;-1:-1:-1;5663:172:88;;-1:-1:-1;;;5800:24:88;;506:7270;;5667:23;;-1:-1:-1;5800:24:88;5663:172;5741:20;-1:-1:-1;;;;;5867:26:88;;;506:7270;;5849:15;:44;5845:87;;5971:79;5995:16;;;;506:7270;;;;5971:79;;;;;;:::i;:::-;506:7270;6153:10;;;506:7270;;6174:21;;;;;506:7270;;5867:26;6197:11;;;506:7270;;;;-1:-1:-1;;;6146:63:88;;-1:-1:-1;;;;;506:7270:88;;;;6146:63;;506:7270;;;;;;;;6197:11;6174:21;;6153:10;;6174:21;;506:7270;;;;;;;;;6174:21;;506:7270;6146:63;;;;;;;5663:172;-1:-1:-1;6130:198:88;;6302:15;6130:198;6342:8;6338:206;;506:7270;;;;;;;6338:206;506:7270;;;;;;;-1:-1:-1;;;6373:160:88;;506:7270;;;6373:160;;506:7270;-1:-1:-1;;;;;506:7270:88;;;;6446:4;;506:7270;;6373:160;;;:::i;:::-;;;;6130:198;6254:16;;6130:198;;6146:63;;;;506:7270;6146:63;;506:7270;6146:63;;;;;;506:7270;6146:63;;;:::i;:::-;;;506:7270;;;;;;;:::i;:::-;6146:63;;;;;;;-1:-1:-1;6146:63:88;;5845:87;-1:-1:-1;;;5914:18:88;;506:7270;;5914:18;5667:23;;;;;;;;;;;;;;:::i;:::-;;;;;506:7270;;1442:1461:9;506:7270:88;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;:::-;506:7270:88;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;1711:44:73;;1736:18;506:7270:88;1711:44:73;;506:7270:88;;;1711:44:73;506:7270:88;;;;;;1711:14:73;506:7270:88;1711:44:73;;;;;;;;;;;506:7270:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1711:44:73:-;;;;;;;;;;;;:::i;:::-;;;506:7270:88;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1711:44:73;;;;506:7270:88;;;;;;;;;;;;;;;;-1:-1:-1;;506:7270:88;;;;;;:::i;:::-;-1:-1:-1;506:7270:88;;-1:-1:-1;;;1484:23:73;;506:7270:88;;;1484:23:73;;;506:7270:88;;;;1484:23:73;506:7270:88;1484:3:73;-1:-1:-1;;;;;506:7270:88;1484:23:73;;;;;;;;;;;506:7270:88;1521:18:73;506:7270:88;1521:18:73;;506:7270:88;1543:18:73;1521:40;1517:71;;506:7270:88;;;;;;;;;;;;;;:::i;1517:71:73:-;-1:-1:-1;;;1570:18:73;;506:7270:88;;1570:18:73;1484:23;;;;;;;;;;;;;;:::i;:::-;;;;;506:7270:88;;;;;;;;;;;;;;;469:43:73;506:7270:88;;;;;;;;;;;;;;;1055:104:6;;506:7270:88;;1089:6:6;1072:24;1089:6;1072:24;:::i;:::-;1120:6;;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;506:7270:88;;;;;;;;;;;;1055:104:6;;;506:7270:88;;;;-1:-1:-1;;;506:7270:88;;;;;;;;;;;;;;;;;-1:-1:-1;;;506:7270:88;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;:::-;506:7270:88;;;;;1055:104:6;506:7270:88;;1055:104:6;506:7270:88;;;;:::i;:::-;;;;;;-1:-1:-1;;506:7270:88;;;;;;;;;3468:26;506:7270;;:::i;:::-;3504:30;506:7270;;:::i;:::-;-1:-1:-1;506:7270:88;;-1:-1:-1;;;3604:28:88;;506:7270;3604:28;;506:7270;;;3604:3;-1:-1:-1;;;;;506:7270:88;;;-1:-1:-1;506:7270:88;;;;3604:28;;506:7270;;3604:28;;;506:7270;-1:-1:-1;3600:178:88;;3738:29;;;;506:7270;3738:29;506:7270;;;;3738:29;3600:178;3683:16;;506:7270;;;;;3851:32;;;506:7270;3851:32;;506:7270;;3851:32;506:7270;3851:32;;;;506:7270;;3851:32;;;3600:178;-1:-1:-1;3847:212:88;;3738:29;;;;506:7270;4015:33;506:7270;;;;4015:33;3847:212;3956:20;;;3847:212;4074:25;;;:::i;:::-;4073:26;4069:65;;506:7270;;4180:75;4204:12;;;;506:7270;;;;4180:75;;;;;;:::i;:::-;506:7270;;;;;;;;;;4375:18;;;;;506:7270;;;;;;;;;;;;;;4284:152;;506:7270;;4284:152;;506:7270;;;;;;:::i;:::-;;;;-1:-1:-1;;506:7270:88;;;;;;;:::i;:::-;;;;;;4284:152;;;;;;;;;506:7270;4284:152;;;3847:212;4283:153;;4266:208;;506:7270;;;;;:::i;:::-;;;;;;4673:48;;506:7270;;;;;;;:::i;:::-;4627:18;506:7270;;;4579:161;;506:7270;;;4551:203;;;;;506:7270;;;;;;;;;;;;;;;;4551:203;;506:7270;;4551:203;;506:7270;;;;;;;;;;;;;;4551:203;;;;;;3847:212;-1:-1:-1;4535:295:88;;-1:-1:-1;;;4793:26:88;;506:7270;;;;;4793:26;;4535:295;506:7270;4932:17;;;506:7270;;4977:21;;;;;506:7270;;;5016:18;;;506:7270;;;;-1:-1:-1;;;4925:123:88;;-1:-1:-1;;;;;506:7270:88;;;;4925:123;;506:7270;;;;;;;;5016:18;4977:21;;4932:17;;506:7270;;;;;;;;;;;;4925:123;;;;;;;4535:295;-1:-1:-1;4909:258:88;;5141:15;;4909:258;5181:8;5177:220;;506:7270;;;;;;;;;;;;;5412:60;506:7270;;5412:60;;;506:7270;;;;5177:220;506:7270;;;;;;;-1:-1:-1;;;5212:174:88;;506:7270;;;5212:174;;506:7270;-1:-1:-1;;;;;506:7270:88;;;;5292:4;;506:7270;;5212:174;;;:::i;4909:258::-;;;4925:123;;;;506:7270;4925:123;;506:7270;4925:123;;;;;;506:7270;4925:123;;;:::i;:::-;;;506:7270;;;;;;;:::i;:::-;4925:123;;;;506:7270;;;;4925:123;;;-1:-1:-1;4925:123:88;;4551:203;;;;;506:7270;4551:203;;:::i;:::-;506:7270;4551:203;;;;;506:7270;;;4266:208;4454:20;;;506:7270;4454:20;506:7270;;4454:20;4284:152;;;506:7270;4284:152;;506:7270;4284:152;;;;;;506:7270;4284:152;;;:::i;:::-;;;506:7270;;;;;;;:::i;:::-;4284:152;;;;;;-1:-1:-1;4284:152:88;;;506:7270;;;;;;;;;4069:65;4108:26;;;506:7270;4108:26;506:7270;;4108:26;3851:32;;;;;;;506:7270;3851:32;;;;;;:::i;:::-;;;;;3604:28;;;;;;;506:7270;3604:28;;;;;;:::i;:::-;;;;;506:7270;;;;;;-1:-1:-1;;506:7270:88;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;-1:-1:-1;;506:7270:88;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;506:7270:88;;;;;;:::o;:::-;;;-1:-1:-1;;;;;506:7270:88;;;;;;:::o;:::-;;;-1:-1:-1;;;;;506:7270:88;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;:::o;:::-;;;;-1:-1:-1;506:7270:88;;;;;-1:-1:-1;506:7270:88;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;:::o;:::-;;;1055:104:6;;506:7270:88;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;:::o;:::-;-1:-1:-1;;;;;506:7270:88;;;;;;-1:-1:-1;;506:7270:88;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;506:7270:88;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;506:7270:88;;;;;;;;-1:-1:-1;;506:7270:88;;;;:::o;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;506:7270:88;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;506:7270:88;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;-1:-1:-1;;506:7270:88;;;;;;;:::o;:::-;;-1:-1:-1;;;;;506:7270:88;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;1605:1520::-;;;;;;1900:10;;;-1:-1:-1;;;;;1900:10:88;;;:::i;:::-;506:7270;1947:11;-1:-1:-1;506:7270:88;1947:11;;;506:7270;;1893:66;1900:10;506:7270;;;;;;;;1893:66;;506:7270;;;;;;;1893:66;;;506:7270;1940:4;506:7270;;;;;;;;;1893:66;;-1:-1:-1;;1893:66:88;;;1605:1520;-1:-1:-1;1877:201:88;;2052:15;-1:-1:-1;1877:201:88;2092:8;2088:190;;-1:-1:-1;1900:10:88;506:7270;;2741:16;;;506:7270;;-1:-1:-1;;;;;506:7270:88;2741:16;506:7270;:::i;:::-;;1900:10;506:7270;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;2741:16;506:7270;;;;;;;1947:11;506:7270;;;;;;;;;;;;-1:-1:-1;506:7270:88;;;;;;-1:-1:-1;;;;;506:7270:88;;;;:::i;:::-;;;;;;;;;;;1055:104:6;;506:7270:88;;;;;2741:16;;1055:104:6;;2741:16:88;;;;;;:::i;:::-;1900:10;506:7270;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;-1:-1:-1;;;;;506:7270:88;1900:10;506:7270;;;;;;;;;;;;;2499:315;;506:7270;;1900:10;2499:315;;506:7270;-1:-1:-1;1947:11:88;2499:315;;506:7270;;2499:315;;506:7270;-1:-1:-1;506:7270:88;2499:315;;506:7270;;1900:10;506:7270;;;;:::i;:::-;2453:18;506:7270;;2404:429;;;506:7270;;;1900:10;506:7270;;;;;;;;2376:471;;;1893:66;2376:471;;506:7270;;;;;;;1900:10;506:7270;;;;;;;;;;;;1893:66;506:7270;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;1900:10;506:7270;;;;;;;;;1947:11;506:7270;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;2376:471;506:7270;-1:-1:-1;2376:3:88;-1:-1:-1;;;;;506:7270:88;2376:471;;-1:-1:-1;;2376:471:88;;;1877:201;-1:-1:-1;2360:759:88;;3083:25;;;-1:-1:-1;3083:25:88;1893:66;-1:-1:-1;3083:25:88;2360:759;2892:10;2921:27;-1:-1:-1;2921:27:88;;1605:1520::o;2376:471::-;;;;506:7270;2376:471;;506:7270;2376:471;;;;;;506:7270;2376:471;;;:::i;:::-;;;506:7270;;;;;2376:471;;;;;;;-1:-1:-1;2376:471:88;;2088:190;2160:10;;2123:144;2160:10;;:::i;:::-;506:7270;1900:10;506:7270;5212:174;;;;;;2123:144;;1940:4;2123:144;1893:66;2123:144;;;:::i;1877:201::-;;;1893:66;;;;506:7270;1893:66;;506:7270;1893:66;;;;;;506:7270;1893:66;;;:::i;:::-;;;506:7270;;;;;;;:::i;:::-;1893:66;;;;;;;-1:-1:-1;1893:66:88;;506:7270;;;-1:-1:-1;;;;;506:7270:88;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;506:7270:88;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::o;6578:688::-;6788:18;1007:16:72;;;506:7270:88;1007:26:72;1003:54;;1074:26;;;:::i;:::-;6761:46:88;6757:64;;6863:77;6887:14;6984:35;6887:14;;;1007:16:72;506:7270:88;;;6863:77;;;;;;:::i;:::-;506:7270;1007:16:72;506:7270:88;;;6984:35;;;;;;:::i;:::-;7049:13;;;;506:7270;7066:16;;;506:7270;-1:-1:-1;;;;;506:7270:88;;;;;7049:33;;;:84;;6578:688;7049:137;;;6578:688;7049:210;;;7030:229;;6578:688;:::o;7049:210::-;1007:16:72;7212:14:88;;;;;;506:7270;;;;;7202:25;7241:17;;;1007:16:72;506:7270:88;;;;7231:28;7202:57;6578:688;:::o;7049:137::-;506:7270;;;;-1:-1:-1;;;;;506:7270:88;;;;;7149:37;;-1:-1:-1;7049:137:88;;:84;7098:14;;;;;506:7270;7098:14;7116:17;;506:7270;-1:-1:-1;7098:35:88;7049:84;;;6757:64;6809:12;;506:7270;6809:12;:::o;1003:54:72:-;1042:15;;;506:7270:88;1042:15:72;;506:7270:88;1042:15:72;506:7270:88;;;;;;;:::i;:::-;;;;-1:-1:-1;506:7270:88;;-1:-1:-1;506:7270:88;;;;-1:-1:-1;506:7270:88;;;;-1:-1:-1;506:7270:88;;;;-1:-1:-1;506:7270:88;;;;-1:-1:-1;506:7270:88;;;;-1:-1:-1;506:7270:88;;;;-1:-1:-1;506:7270:88;;;;-1:-1:-1;506:7270:88;;;;;;:::o;:::-;;;-1:-1:-1;;;;;506:7270:88;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;506:7270:88;;;;;;;;:::i;:::-;;;;;;:::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;506:7270:88;;;;;;;;;;;;;4064:22:9;;;;4060:87;;506:7270:88;;;;;;;;;;;;;;1331:4:73;;-1:-1:-1;;;;;506:7270:88;1299:20:73;;506:7270:88;;1299:20:73;;;:::i;:::-;506:7270:88;1299:37:73;4270:84:9;;1489:1:0;506:7270:88;;3896:19:9;506:7270:88;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;506:7270:88;;;;3881:1:9;506:7270:88;;;;;3881:1:9;506:7270:88;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;506:7270:88;;;;;;;:::i;:::-;-1:-1:-1;506:7270:88;;;;;;;;;;;;;;;;;:::o;607:258:72:-;-1:-1:-1;;;;;352:24:72;;;506:7270:88;;352:29:72;;;:87;;;;607:258;715:54;;;565:24;;506:7270:88;-1:-1:-1;;;;;506:7270:88;779:57:72;;854:4;607:258;:::o;779:57::-;816:20;;;-1:-1:-1;816:20:72;;-1:-1:-1;816:20:72;715:54;752:17;;;-1:-1:-1;752:17:72;;-1:-1:-1;752:17:72;352:87;424:15;;;-1:-1:-1;352:87:72;;;637:632:62;759:17;-1:-1:-1;25444:17:69;-1:-1:-1;;;25444:17:69;;;25440:103;;637:632:62;25560:17:69;25569:8;26140:7;25560:17;;;25556:103;;637:632:62;25685:8:69;25676:17;;;25672:103;;637:632:62;25801:7:69;25792:16;;;25788:100;;637:632:62;25914:7:69;25905:16;;;25901:100;;637:632:62;26027:7:69;26018:16;;;26014:100;;637:632:62;26131:16:69;;26127:66;;637:632:62;26140:7:69;874:92:62;779:1;506:7270:88;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;506:7270:88;;:::i;:::-;;;;;;;874:92:62;;;979:247;-1:-1:-1;;506:7270:88;;-1:-1:-1;;;1033:111:62;;;;506:7270:88;1033:111:62;506:7270:88;1194:10:62;;1190:21;;26140:7:69;979:247:62;;;;1190:21;1206:5;;637:632;:::o;26127:66:69:-;26177:1;506:7270:88;;;;26127:66:69;;26014:100;26027:7;26098:1;506:7270:88;;;;26014:100:69;;;25901;25914:7;25985:1;506:7270:88;;;;25901:100:69;;;25788;25801:7;25872:1;506:7270:88;;;;25788:100:69;;;25672:103;25685:8;25758:2;506:7270:88;;;;25672:103:69;;;25556;25569:8;25642:2;506:7270:88;;;;25556:103:69;;;25440;-1:-1:-1;25526:2:69;;-1:-1:-1;;;;506:7270:88;;25440:103:69;;6040:128:9;6109:4;-1:-1:-1;;;;;506:7270:88;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 2133,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 2177,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 2220,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 6826,
          "length": 32
        }
      ],
      "52554": [
        {
          "start": 1512,
          "length": 32
        }
      ],
      "52557": [
        {
          "start": 616,
          "length": 32
        },
        {
          "start": 961,
          "length": 32
        },
        {
          "start": 1878,
          "length": 32
        },
        {
          "start": 2426,
          "length": 32
        },
        {
          "start": 5104,
          "length": 32
        }
      ],
      "52559": [
        {
          "start": 680,
          "length": 32
        },
        {
          "start": 1462,
          "length": 32
        },
        {
          "start": 1942,
          "length": 32
        },
        {
          "start": 2066,
          "length": 32
        },
        {
          "start": 2757,
          "length": 32
        },
        {
          "start": 4931,
          "length": 32
        },
        {
          "start": 5601,
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
    "makeStatement((address,bytes,address,uint256),uint64)": "b8b0e3fc",
    "makeStatementFor((address,bytes,address,uint256),uint64,address,address)": "0fce7146",
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "91db0b7e",
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "88e5b2d9",
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e49617e1",
    "version()": "54fd4d50"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationCreateFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC20TransferFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidSchema\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromStatement\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"payment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowClaimed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"payment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"collectExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_payment\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectPayment\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeStatementData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowObligation.StatementData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getStatement\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getStatementData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowObligation.StatementData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"makeStatement\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"makeStatementFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/ERC20EscrowObligation.sol\":\"ERC20EscrowObligation\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009\",\"dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f\",\"dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x9054efbe0d83eee80617895c7ec3c7457b414f2bcfad00fbf4f37e46e64f06d5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c4bf82d91e2b4a82ec0936298e4026ff84f6745e332a5732e509e3f6cfe9ae36\",\"dweb:/ipfs/QmbTyZSQrfBX8ySdxmMGKv5KwKKU634Pm2k2BV9EpGXz1r\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/obligations/ERC20EscrowObligation.sol\":{\"keccak256\":\"0x831c12206237d34e0c46a26286e42e1528e2153b13e38d4f5064214d600bf66f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f14cdc59e992f7e7bc2a49c88bcfe3de5afb5673725089e20f76cc3b2d7eb2c0\",\"dweb:/ipfs/QmQXPWWhLJZog4i5JCVeXiPFQyS3SbmPK54CgEYcEFVCrw\"]}},\"version\":1}",
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
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "ERC20TransferFailed"
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
              "internalType": "struct ERC20EscrowObligation.StatementData",
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
              "internalType": "struct ERC20EscrowObligation.StatementData",
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
              "internalType": "struct ERC20EscrowObligation.StatementData",
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
              "internalType": "struct ERC20EscrowObligation.StatementData",
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
        "src/obligations/ERC20EscrowObligation.sol": "ERC20EscrowObligation"
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
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        "keccak256": "0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4",
        "urls": [
          "bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009",
          "dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"
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
      "src/obligations/ERC20EscrowObligation.sol": {
        "keccak256": "0x831c12206237d34e0c46a26286e42e1528e2153b13e38d4f5064214d600bf66f",
        "urls": [
          "bzz-raw://f14cdc59e992f7e7bc2a49c88bcfe3de5afb5673725089e20f76cc3b2d7eb2c0",
          "dweb:/ipfs/QmQXPWWhLJZog4i5JCVeXiPFQyS3SbmPK54CgEYcEFVCrw"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 88
} as const;