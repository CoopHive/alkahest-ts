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
          "internalType": "struct TokenBundleEscrowObligation.StatementData",
          "components": [
            {
              "name": "erc20Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc20Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc721Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc721TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc1155TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
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
          "internalType": "struct TokenBundleEscrowObligation.StatementData",
          "components": [
            {
              "name": "erc20Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc20Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc721Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc721TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc1155TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
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
      "stateMutability": "pure"
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
      "stateMutability": "pure"
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
      "stateMutability": "pure"
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
      "name": "BundleClaimed",
      "inputs": [
        {
          "name": "escrow",
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
      "name": "BundleEscrowed",
      "inputs": [
        {
          "name": "escrow",
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
      "name": "ArrayLengthMismatch",
      "inputs": []
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
      "name": "InvalidTransfer",
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
      "name": "UnauthorizedCall",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x61016080604052346102a65760408161255f803803809161002082856102e0565b8339810103126102a65780516001600160a01b038116918282036102a65760200151916001600160a01b0383168084036102a65760405161010081016001600160401b038111828210176102cc5760405260cc815260208101927f616464726573735b5d206572633230546f6b656e732c2075696e743235365b5d84527f206572633230416d6f756e74732c20616464726573735b5d206572633732315460408301527f6f6b656e732c2075696e743235365b5d20657263373231546f6b656e4964732c60608301527f20616464726573735b5d2065726331313535546f6b656e732c2075696e74323560808301527f365b5d2065726331313535546f6b656e4964732c2075696e743235365b5d206560a08301527f726331313535416d6f756e74732c206164647265737320617262697465722c2060c08301526b189e5d195cc819195b585b9960a21b60e08301526001608052600360a0525f60c052156102bd576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af19081156102b2575f9161027c575b506101405260405161225b9081610304823960805181610709015260a05181610735015260c05181610760015260e051816121e60152610100518161045501526101205181818161027c01528181610610015281816108e40152611a2001526101405181818161042301528181610648015281816106c501528181610a0f0152818161123b01526119730152f35b90506020813d6020116102aa575b81610297602093836102e0565b810103126102a657515f6101ee565b5f80fd5b3d915061028a565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176102cc5760405256fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610c5a575080631272ff8b14610b4257806330088bc9146108ba5780633714edb91461086c5780634d9fea94146107ed57806354fd4d50146106e85780635bf2f20d146106ad5780635cc02d2f146105945780636b122fe0146103e257806388e5b2d91461036357806391db0b7e1461033a578063a84f2aa01461024d578063bc197c81146101b4578063ce46e04614610198578063e49617e11461017b578063e60c3505146101495763f23a6e610361000f57346101465760a036600319011261014657610105610d41565b5061010e610d57565b506084356001600160401b0381116101425761012e903690600401610f28565b505060405163f23a6e6160e01b8152602090f35b5080fd5b80fd5b602061016760e061015936610f55565b6101616121e4565b01612063565b6040516001600160a01b0390911630148152f35b61018436610f55565b5061018d6121e4565b602060405160018152f35b5034610146578060031936011261014657602090604051908152f35b50346101465760a0366003190112610146576101ce610d41565b506101d7610d57565b506044356001600160401b038111610142576101f7903690600401610ea8565b50506064356001600160401b03811161014257610218903690600401610ea8565b50506084356001600160401b03811161014257610239903690600401610f28565b505060405163bc197c8160e01b8152602090f35b5034610146576020366003190112610146576040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561032d578192610309575b506001600160401b0360608301511642106102fa5761018d826102e5610120820151602080825183010191016110c6565b60c0909101516001600160a01b031690611e0e565b637bf6a16f60e01b8152600490fd5b6103269192503d8084833e61031e8183610cf6565b81019061132b565b905f6102b4565b50604051903d90823e3d90fd5b602061035961034836610ed8565b926103549291926121e4565b611b2e565b6040519015158152f35b5061036d36610ed8565b909261037a9492946121e4565b8185036103d3578291345b86841061039757602060405160018152f35b6103a2848388611ae7565b35908082116103c457906001916103ba868a87611b0b565b5003930192610385565b63044044a560e21b8652600486fd5b63251f56a160e21b8352600483fd5b503461014657806003193601126101465760608060405161040281610cdb565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa9081156105885780916104cf575b6060826104cb604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610de2565b0390f35b90503d8082843e6104e08184610cf6565b820191602081840312610142578051906001600160401b038211610584570190608082840312610146576040519161051783610cdb565b8051835260208101516001600160a01b03811681036105845760208401526105416040820161131e565b60408401526060810151906001600160401b03821161058457019083601f83011215610146575060609281602061057a93519101611076565b828201525f610485565b8280fd5b604051903d90823e3d90fd5b50346101465760203660031901126101465760606101206040516105b781610c90565b83815283602082015283604082015283838201528360808201528360a08201528360c08201528360e0820152836101008201520152604051906328c44a9960e21b82526004356004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa91821561032d578192610691575b5060208201517f00000000000000000000000000000000000000000000000000000000000000000361068257604051602080825281906104cb90820185610e06565b63295d5f3960e01b8152600490fd5b6106a69192503d8084833e61031e8183610cf6565b905f610640565b503461014657806003193601126101465760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b503461014657806003193601126101465760206107d960016104cb9361072d7f0000000000000000000000000000000000000000000000000000000000000000612077565b9082856107597f0000000000000000000000000000000000000000000000000000000000000000612077565b81806107847f0000000000000000000000000000000000000000000000000000000000000000612077565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282610cf6565b604051918291602083526020830190610de2565b5034610146576080366003190112610146576004356001600160401b03811161014257610120600319823603011261014257610827610d17565b604435916001600160a01b038316830361086857606435936001600160a01b03851685036101465760206108608686868660040161149d565b604051908152f35b8380fd5b503461014657604036600319011261014657600435906001600160401b038211610146576101206003198336030112610146576020610860836108ad610d17565b903391339160040161149d565b34610aae576040366003190112610aae576040516328c44a9960e21b8152600480359082018190527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f82602481865afa918215610aa3575f92610b26575b50604051906328c44a9960e21b825260243560048301525f82602481875afa918215610aa3575f92610b0a575b5061095b83611db3565b15610afb57610978610120840151602080825183010191016110c6565b9260206109cd60018060a01b0360e087015116610100870151935193604051809581948293631272ff8b60e01b8452606060048501526109bb606485018c610e06565b84810360031901602486015290610de2565b90604483015203915afa908115610aa3575f91610ac1575b5015610ab257604051906109f882610cc0565b81525f602082015260405190610a0d82610cc0565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152843b15610aae5760645f92836020976040519889958694634692626760e01b86525160048601525180516024860152015160448401525af1928315610aa35761018d93610a93575b5060c001516001600160a01b031690611e0e565b5f610a9d91610cf6565b5f610a7f565b6040513d5f823e3d90fd5b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610af3575b81610adc60209383610cf6565b81010312610aae57610aed9061131e565b856109e5565b3d9150610acf565b63629cd40b60e11b5f5260045ffd5b610b1f9192503d805f833e61031e8183610cf6565b9084610951565b610b3b9192503d805f833e61031e8183610cf6565b9083610924565b34610aae576060366003190112610aae576004356001600160401b038111610aae576101406003198236030112610aae5760405190610b8082610c90565b8060040135825260248101356020830152610b9d60448201610d2d565b6040830152610bae60648201610d2d565b6060830152610bbf60848201610d2d565b608083015260a481013560a0830152610bda60c48201610d6d565b60c0830152610beb60e48201610d6d565b60e08301526101048101358015158103610aae57610100830152610124810135906001600160401b038211610aae576004610c299236920101610d9c565b6101208201526024356001600160401b038111610aae57602091610c54610359923690600401610d9c565b90611239565b34610aae576020366003190112610aae576004359063ffffffff60e01b8216809203610aae57602091630271189760e51b148152f35b61014081019081106001600160401b03821117610cac57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610cac57604052565b608081019081106001600160401b03821117610cac57604052565b90601f801991011681019081106001600160401b03821117610cac57604052565b602435906001600160401b0382168203610aae57565b35906001600160401b0382168203610aae57565b600435906001600160a01b0382168203610aae57565b602435906001600160a01b0382168203610aae57565b35906001600160a01b0382168203610aae57565b6001600160401b038111610cac57601f01601f191660200190565b81601f82011215610aae57803590610db382610d81565b92610dc16040519485610cf6565b82845260208383010111610aae57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b90610140610120610ea59380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610de2565b90565b9181601f84011215610aae578235916001600160401b038311610aae576020808501948460051b010111610aae57565b6040600319820112610aae576004356001600160401b038111610aae5781610f0291600401610ea8565b92909291602435906001600160401b038211610aae57610f2491600401610ea8565b9091565b9181601f84011215610aae578235916001600160401b038311610aae5760208381860195010111610aae57565b6020600319820112610aae57600435906001600160401b038211610aae57610140908290036003190112610aae5760040190565b6001600160401b038111610cac5760051b60200190565b51906001600160a01b0382168203610aae57565b9080601f83011215610aae578151610fcb81610f89565b92610fd96040519485610cf6565b81845260208085019260051b820101928311610aae57602001905b8282106110015750505090565b6020809161100e84610fa0565b815201910190610ff4565b9080601f83011215610aae57815161103081610f89565b9261103e6040519485610cf6565b81845260208085019260051b820101928311610aae57602001905b8282106110665750505090565b8151815260209182019101611059565b92919261108282610d81565b916110906040519384610cf6565b829481845281830111610aae578281602093845f96015e010152565b9080601f83011215610aae578151610ea592602001611076565b602081830312610aae578051906001600160401b038211610aae570161012081830312610aae576040519161012083018381106001600160401b03821117610cac5760405281516001600160401b038111610aae5781611127918401610fb4565b835260208201516001600160401b038111610aae5781611148918401611019565b602084015260408201516001600160401b038111610aae578161116c918401610fb4565b604084015260608201516001600160401b038111610aae5781611190918401611019565b606084015260808201516001600160401b038111610aae57816111b4918401610fb4565b608084015260a08201516001600160401b038111610aae57816111d8918401611019565b60a084015260c08201516001600160401b038111610aae57816111fc918401611019565b60c084015261120d60e08301610fa0565b60e08401526101008201516001600160401b038111610aae5761123092016110ac565b61010082015290565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036112fb5761126d81611db3565b156112f55761128d61012061129d920151602080825183010191016110c6565b91602080825183010191016110c6565b6112a78183611bd2565b91826112d6575b826112b857505090565b61010091925081015160208151910120910151602081519101201490565b60e080820151908301516001600160a01b0390811691161492506112ae565b50505f90565b635f9bd90760e11b5f5260045ffd5b51906001600160401b0382168203610aae57565b51908115158203610aae57565b602081830312610aae578051906001600160401b038211610aae570161014081830312610aae576040519161135f83610c90565b81518352602082015160208401526113796040830161130a565b604084015261138a6060830161130a565b606084015261139b6080830161130a565b608084015260a082015160a08401526113b660c08301610fa0565b60c08401526113c760e08301610fa0565b60e08401526113d9610100830161131e565b6101008401526101208201516001600160401b038111610aae576113fd92016110ac565b61012082015290565b9035601e1982360301811215610aae5701602081359101916001600160401b038211610aae578160051b36038313610aae57565b916020908281520191905f5b8181106114535750505090565b909192602080600192838060a01b0361146b88610d6d565b168152019401929101611446565b81835290916001600160fb1b038311610aae5760209260051b809284830137010190565b9390926114aa858061202e565b602087019391506114bb848861202e565b91905003611ab45760408601906114d2828861202e565b606089019491506114e3858a61202e565b91905003611ab45760808801906114fa828a61202e565b60a08b0194915061150b858c61202e565b91905014801590611ac3575b611ab4575f5b6115278b8061202e565b9050811015611612576115aa60208c6115708461156a8d8261156361155e61154f888061202e565b6001600160a01b039491611ae7565b612063565b169461202e565b90611ae7565b6040516323b872dd60e01b81526001600160a01b038e166004820152306024820152903560448201529283919082905f9082906064820190565b03925af1908115610aa3575f916115d9575b50156115ca5760010161151d565b632f35253160e01b5f5260045ffd5b90506020813d821161160a575b816115f360209383610cf6565b81010312610aae576116049061131e565b5f6115bc565b3d91506115e6565b5090919293949597895f5b611627888361202e565b90508110156116b8576116508161156a8b8261164961155e61154f8f8a61202e565b169561202e565b3591803b15610aae576040516323b872dd60e01b81526001600160a01b038c16600482015230602482015260448101939093525f908390606490829084905af1918215610aa3576001926116a8575b50018a9061161d565b5f6116b291610cf6565b5f61169f565b5050909192939594975f9560c08b01965b6116d3878d61202e565b905081101561178857808c61170f8261156a8c6117088f9761156a8f61170061155e61154f85938c61202e565b16998861202e565b359461202e565b35833b15610aae57604051637921219560e11b81526001600160a01b038e1660048201523060248201526044810192909252606482015260a060848201525f60a482018190529092839060c490829084905af1918215610aa357600192611778575b50016116c9565b5f61178291610cf6565b5f611771565b50919750959298949391976040519660208801602090526117a98780611406565b60408a0161012090526101608a01906117c19261143a565b906117cc9088611406565b898303603f190160608b01526117e29291611479565b906117ed9087611406565b888303603f190160808a0152611803929161143a565b9061180e9086611406565b878303603f190160a08901526118249291611479565b9061182f9085611406565b868303603f190160c0880152611845929161143a565b906118509084611406565b858303603f190160e08701526118669291611479565b906118719083611406565b848303603f19016101008601526118889291611479565b906001600160a01b0361189d60e08301610d6d565b16610120840152610100810135601e1982360301811215610aae57016020813591016001600160401b038211610aae578136038113610aae5761191292826020938693603f1985850301610140860152818452858401375f848284010152601f8019910116010301601f198101835282610cf6565b6040519360c08501908582106001600160401b03831117610cac576001600160401b039160405260018060a01b031692838652166020850152600160408501525f606085015260808401525f60a0840152602060405161197181610cc0565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611a12608083015160c060e4860152610124850190610de2565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1928315610aa3575f93611a80575b50827fc65ca01d282ff79f0f91a2f3b1bd6a00f0c9df42b8ded2b82ee42ad14a411b905f80a3565b9092506020813d602011611aac575b81611a9c60209383610cf6565b81010312610aae5751915f611a58565b3d9150611a8f565b63512509d360e11b5f5260045ffd5b50611ace838b61202e565b9050611add60c08c018c61202e565b9190501415611517565b9190811015611af75760051b0190565b634e487b7160e01b5f52603260045260245ffd5b9190811015611af75760051b8101359061013e1981360301821215610aae570190565b919290818103611baf575f91345b828410611b4e57505050505050600190565b611b59848388611ae7565b35818111611ba057611b6c858588611b0b565b30906001600160a01b0390611b839060e001612063565b1603611b955760019103930192611b3c565b505050505050505f90565b63044044a560e21b5f5260045ffd5b63251f56a160e21b5f5260045ffd5b8051821015611af75760209160051b010190565b805151825151116112f5575f5b825151811015611c565781516001600160a01b0390611bff908390611bbe565b511660018060a01b03611c13838651611bbe565b511614801590611c31575b611c2a57600101611bdf565b5050505f90565b50611c40816020840151611bbe565b51611c4f826020860151611bbe565b5111611c1e565b506040810191825151604082019081515111611dab575f5b815151811015611ce85784516001600160a01b0390611c8e908390611bbe565b511660018060a01b03611ca2838551611bbe565b511614801590611cc2575b611cb957600101611c6e565b50505050505f90565b50611cd1816060860151611bbe565b51611ce0826060860151611bbe565b511415611cad565b50509150608081019182515192608082019384515111611dab575f5b845151811015611da15781516001600160a01b0390611d24908390611bbe565b511660018060a01b03611d38838851611bbe565b511614801590611d7b575b8015611d56575b611cb957600101611d04565b50611d658160c0860151611bbe565b51611d748260c0860151611bbe565b5111611d4a565b50611d8a8160a0860151611bbe565b51611d998260a0860151611bbe565b511415611d43565b5050505050600190565b505050505f90565b6001600160401b036060820151168015159081611e04575b50611df557608001516001600160401b0316611de657600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611dcb565b905f5b82518051821015611ec8575f906020906001600160a01b0390611e35908590611bbe565b51166044611e468584890151611bbe565b5160405163a9059cbb60e01b81526001600160a01b038816600482015260248101919091529384928391905af1908115610aa3575f91611e8f575b50156115ca57600101611e11565b90506020813d8211611ec0575b81611ea960209383610cf6565b81010312610aae57611eba9061131e565b5f611e81565b3d9150611e9c565b50509190915f5b60408401518051821015611f68576001600160a01b0390611ef1908390611bbe565b511690611f02816060870151611bbe565b5191803b15610aae576040516323b872dd60e01b81523060048201526001600160a01b038516602482015260448101939093525f908390606490829084905af1918215610aa357600192611f58575b5001611ecf565b5f611f6291610cf6565b5f611f51565b50505f5b60808401518051821015612027576001600160a01b0390611f8e908390611bbe565b511690611f9f8160a0870151611bbe565b51611fae8260c0880151611bbe565b51833b15610aae57604051637921219560e11b81523060048201526001600160a01b03861660248201526044810192909252606482015260a060848201525f60a482018190529092839060c490829084905af1918215610aa357600192612017575b5001611f6c565b5f61202191610cf6565b5f612010565b5050509050565b903590601e1981360301821215610aae57018035906001600160401b038211610aae57602001918160051b36038313610aae57565b356001600160a01b0381168103610aae5790565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8210156121c1575b806d04ee2d6d415b85acef8100000000600a9210156121a6575b662386f26fc10000811015612192575b6305f5e100811015612181575b612710811015612172575b6064811015612164575b1015612159575b600a602160018401936120fe85610d81565b9461210c6040519687610cf6565b80865261211b601f1991610d81565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561215457600a9091612126565b505090565b6001909101906120ec565b6064600291049301926120e5565b612710600491049301926120db565b6305f5e100600891049301926120d0565b662386f26fc10000601091049301926120c3565b6d04ee2d6d415b85acef8100000000602091049301926120b3565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104612099565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361221657565b634ca8886760e01b5f5260045ffdfea26469706673582212201855ca6d1a3b6a896d74433f0e121f48793967fe7cd4180e91e19620049646a264736f6c634300081a0033",
    "sourceMap": "709:8864:50:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;709:8864:50;;;;1968:4;709:8864;759:14:4;688:1:6;709:8864:50;783:14:4;-1:-1:-1;709:8864:50;807:14:4;708:26:6;704:76;;709:8864:50;790:10:6;;709:8864:50;790:10:6;709:8864:50;790:10:6;712::39;;709:8864:50;732:32:39;-1:-1:-1;709:8864:50;;;;;;;;;;;795:48:39;;709:8864:50;795:48:39;;;709:8864:50;;;;;;;;;;;;;;;;;;;;;827:4:39;709:8864:50;;;;1968:4;709:8864;;;;;;-1:-1:-1;;709:8864:50;;;795:48:39;;;;;;;;;;-1:-1:-1;795:48:39;;;-1:-1:-1;774:69:39;;;709:8864:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;712:10:39;709:8864:50;;;;;;;;;;;;;;;;;;;;774:69:39;709:8864:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;795:48:39;;;709:8864:50;795:48:39;;709:8864:50;795:48:39;;;;;;709:8864:50;795:48:39;;;:::i;:::-;;;709:8864:50;;;;;795:48:39;;;709:8864:50;-1:-1:-1;709:8864:50;;795:48:39;;;-1:-1:-1;795:48:39;;;709:8864:50;;;-1:-1:-1;709:8864:50;;;;;704:76:6;757:12;;;-1:-1:-1;757:12:6;;-1:-1:-1;757:12:6;709:8864:50;;;;-1:-1:-1;709:8864:50;;;;;-1:-1:-1;709:8864:50;;;;;;-1:-1:-1;;709:8864:50;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610c5a575080631272ff8b14610b4257806330088bc9146108ba5780633714edb91461086c5780634d9fea94146107ed57806354fd4d50146106e85780635bf2f20d146106ad5780635cc02d2f146105945780636b122fe0146103e257806388e5b2d91461036357806391db0b7e1461033a578063a84f2aa01461024d578063bc197c81146101b4578063ce46e04614610198578063e49617e11461017b578063e60c3505146101495763f23a6e610361000f57346101465760a036600319011261014657610105610d41565b5061010e610d57565b506084356001600160401b0381116101425761012e903690600401610f28565b505060405163f23a6e6160e01b8152602090f35b5080fd5b80fd5b602061016760e061015936610f55565b6101616121e4565b01612063565b6040516001600160a01b0390911630148152f35b61018436610f55565b5061018d6121e4565b602060405160018152f35b5034610146578060031936011261014657602090604051908152f35b50346101465760a0366003190112610146576101ce610d41565b506101d7610d57565b506044356001600160401b038111610142576101f7903690600401610ea8565b50506064356001600160401b03811161014257610218903690600401610ea8565b50506084356001600160401b03811161014257610239903690600401610f28565b505060405163bc197c8160e01b8152602090f35b5034610146576020366003190112610146576040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561032d578192610309575b506001600160401b0360608301511642106102fa5761018d826102e5610120820151602080825183010191016110c6565b60c0909101516001600160a01b031690611e0e565b637bf6a16f60e01b8152600490fd5b6103269192503d8084833e61031e8183610cf6565b81019061132b565b905f6102b4565b50604051903d90823e3d90fd5b602061035961034836610ed8565b926103549291926121e4565b611b2e565b6040519015158152f35b5061036d36610ed8565b909261037a9492946121e4565b8185036103d3578291345b86841061039757602060405160018152f35b6103a2848388611ae7565b35908082116103c457906001916103ba868a87611b0b565b5003930192610385565b63044044a560e21b8652600486fd5b63251f56a160e21b8352600483fd5b503461014657806003193601126101465760608060405161040281610cdb565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa9081156105885780916104cf575b6060826104cb604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610de2565b0390f35b90503d8082843e6104e08184610cf6565b820191602081840312610142578051906001600160401b038211610584570190608082840312610146576040519161051783610cdb565b8051835260208101516001600160a01b03811681036105845760208401526105416040820161131e565b60408401526060810151906001600160401b03821161058457019083601f83011215610146575060609281602061057a93519101611076565b828201525f610485565b8280fd5b604051903d90823e3d90fd5b50346101465760203660031901126101465760606101206040516105b781610c90565b83815283602082015283604082015283838201528360808201528360a08201528360c08201528360e0820152836101008201520152604051906328c44a9960e21b82526004356004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa91821561032d578192610691575b5060208201517f00000000000000000000000000000000000000000000000000000000000000000361068257604051602080825281906104cb90820185610e06565b63295d5f3960e01b8152600490fd5b6106a69192503d8084833e61031e8183610cf6565b905f610640565b503461014657806003193601126101465760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b503461014657806003193601126101465760206107d960016104cb9361072d7f0000000000000000000000000000000000000000000000000000000000000000612077565b9082856107597f0000000000000000000000000000000000000000000000000000000000000000612077565b81806107847f0000000000000000000000000000000000000000000000000000000000000000612077565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282610cf6565b604051918291602083526020830190610de2565b5034610146576080366003190112610146576004356001600160401b03811161014257610120600319823603011261014257610827610d17565b604435916001600160a01b038316830361086857606435936001600160a01b03851685036101465760206108608686868660040161149d565b604051908152f35b8380fd5b503461014657604036600319011261014657600435906001600160401b038211610146576101206003198336030112610146576020610860836108ad610d17565b903391339160040161149d565b34610aae576040366003190112610aae576040516328c44a9960e21b8152600480359082018190527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f82602481865afa918215610aa3575f92610b26575b50604051906328c44a9960e21b825260243560048301525f82602481875afa918215610aa3575f92610b0a575b5061095b83611db3565b15610afb57610978610120840151602080825183010191016110c6565b9260206109cd60018060a01b0360e087015116610100870151935193604051809581948293631272ff8b60e01b8452606060048501526109bb606485018c610e06565b84810360031901602486015290610de2565b90604483015203915afa908115610aa3575f91610ac1575b5015610ab257604051906109f882610cc0565b81525f602082015260405190610a0d82610cc0565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152843b15610aae5760645f92836020976040519889958694634692626760e01b86525160048601525180516024860152015160448401525af1928315610aa35761018d93610a93575b5060c001516001600160a01b031690611e0e565b5f610a9d91610cf6565b5f610a7f565b6040513d5f823e3d90fd5b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610af3575b81610adc60209383610cf6565b81010312610aae57610aed9061131e565b856109e5565b3d9150610acf565b63629cd40b60e11b5f5260045ffd5b610b1f9192503d805f833e61031e8183610cf6565b9084610951565b610b3b9192503d805f833e61031e8183610cf6565b9083610924565b34610aae576060366003190112610aae576004356001600160401b038111610aae576101406003198236030112610aae5760405190610b8082610c90565b8060040135825260248101356020830152610b9d60448201610d2d565b6040830152610bae60648201610d2d565b6060830152610bbf60848201610d2d565b608083015260a481013560a0830152610bda60c48201610d6d565b60c0830152610beb60e48201610d6d565b60e08301526101048101358015158103610aae57610100830152610124810135906001600160401b038211610aae576004610c299236920101610d9c565b6101208201526024356001600160401b038111610aae57602091610c54610359923690600401610d9c565b90611239565b34610aae576020366003190112610aae576004359063ffffffff60e01b8216809203610aae57602091630271189760e51b148152f35b61014081019081106001600160401b03821117610cac57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610cac57604052565b608081019081106001600160401b03821117610cac57604052565b90601f801991011681019081106001600160401b03821117610cac57604052565b602435906001600160401b0382168203610aae57565b35906001600160401b0382168203610aae57565b600435906001600160a01b0382168203610aae57565b602435906001600160a01b0382168203610aae57565b35906001600160a01b0382168203610aae57565b6001600160401b038111610cac57601f01601f191660200190565b81601f82011215610aae57803590610db382610d81565b92610dc16040519485610cf6565b82845260208383010111610aae57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b90610140610120610ea59380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610de2565b90565b9181601f84011215610aae578235916001600160401b038311610aae576020808501948460051b010111610aae57565b6040600319820112610aae576004356001600160401b038111610aae5781610f0291600401610ea8565b92909291602435906001600160401b038211610aae57610f2491600401610ea8565b9091565b9181601f84011215610aae578235916001600160401b038311610aae5760208381860195010111610aae57565b6020600319820112610aae57600435906001600160401b038211610aae57610140908290036003190112610aae5760040190565b6001600160401b038111610cac5760051b60200190565b51906001600160a01b0382168203610aae57565b9080601f83011215610aae578151610fcb81610f89565b92610fd96040519485610cf6565b81845260208085019260051b820101928311610aae57602001905b8282106110015750505090565b6020809161100e84610fa0565b815201910190610ff4565b9080601f83011215610aae57815161103081610f89565b9261103e6040519485610cf6565b81845260208085019260051b820101928311610aae57602001905b8282106110665750505090565b8151815260209182019101611059565b92919261108282610d81565b916110906040519384610cf6565b829481845281830111610aae578281602093845f96015e010152565b9080601f83011215610aae578151610ea592602001611076565b602081830312610aae578051906001600160401b038211610aae570161012081830312610aae576040519161012083018381106001600160401b03821117610cac5760405281516001600160401b038111610aae5781611127918401610fb4565b835260208201516001600160401b038111610aae5781611148918401611019565b602084015260408201516001600160401b038111610aae578161116c918401610fb4565b604084015260608201516001600160401b038111610aae5781611190918401611019565b606084015260808201516001600160401b038111610aae57816111b4918401610fb4565b608084015260a08201516001600160401b038111610aae57816111d8918401611019565b60a084015260c08201516001600160401b038111610aae57816111fc918401611019565b60c084015261120d60e08301610fa0565b60e08401526101008201516001600160401b038111610aae5761123092016110ac565b61010082015290565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036112fb5761126d81611db3565b156112f55761128d61012061129d920151602080825183010191016110c6565b91602080825183010191016110c6565b6112a78183611bd2565b91826112d6575b826112b857505090565b61010091925081015160208151910120910151602081519101201490565b60e080820151908301516001600160a01b0390811691161492506112ae565b50505f90565b635f9bd90760e11b5f5260045ffd5b51906001600160401b0382168203610aae57565b51908115158203610aae57565b602081830312610aae578051906001600160401b038211610aae570161014081830312610aae576040519161135f83610c90565b81518352602082015160208401526113796040830161130a565b604084015261138a6060830161130a565b606084015261139b6080830161130a565b608084015260a082015160a08401526113b660c08301610fa0565b60c08401526113c760e08301610fa0565b60e08401526113d9610100830161131e565b6101008401526101208201516001600160401b038111610aae576113fd92016110ac565b61012082015290565b9035601e1982360301811215610aae5701602081359101916001600160401b038211610aae578160051b36038313610aae57565b916020908281520191905f5b8181106114535750505090565b909192602080600192838060a01b0361146b88610d6d565b168152019401929101611446565b81835290916001600160fb1b038311610aae5760209260051b809284830137010190565b9390926114aa858061202e565b602087019391506114bb848861202e565b91905003611ab45760408601906114d2828861202e565b606089019491506114e3858a61202e565b91905003611ab45760808801906114fa828a61202e565b60a08b0194915061150b858c61202e565b91905014801590611ac3575b611ab4575f5b6115278b8061202e565b9050811015611612576115aa60208c6115708461156a8d8261156361155e61154f888061202e565b6001600160a01b039491611ae7565b612063565b169461202e565b90611ae7565b6040516323b872dd60e01b81526001600160a01b038e166004820152306024820152903560448201529283919082905f9082906064820190565b03925af1908115610aa3575f916115d9575b50156115ca5760010161151d565b632f35253160e01b5f5260045ffd5b90506020813d821161160a575b816115f360209383610cf6565b81010312610aae576116049061131e565b5f6115bc565b3d91506115e6565b5090919293949597895f5b611627888361202e565b90508110156116b8576116508161156a8b8261164961155e61154f8f8a61202e565b169561202e565b3591803b15610aae576040516323b872dd60e01b81526001600160a01b038c16600482015230602482015260448101939093525f908390606490829084905af1918215610aa3576001926116a8575b50018a9061161d565b5f6116b291610cf6565b5f61169f565b5050909192939594975f9560c08b01965b6116d3878d61202e565b905081101561178857808c61170f8261156a8c6117088f9761156a8f61170061155e61154f85938c61202e565b16998861202e565b359461202e565b35833b15610aae57604051637921219560e11b81526001600160a01b038e1660048201523060248201526044810192909252606482015260a060848201525f60a482018190529092839060c490829084905af1918215610aa357600192611778575b50016116c9565b5f61178291610cf6565b5f611771565b50919750959298949391976040519660208801602090526117a98780611406565b60408a0161012090526101608a01906117c19261143a565b906117cc9088611406565b898303603f190160608b01526117e29291611479565b906117ed9087611406565b888303603f190160808a0152611803929161143a565b9061180e9086611406565b878303603f190160a08901526118249291611479565b9061182f9085611406565b868303603f190160c0880152611845929161143a565b906118509084611406565b858303603f190160e08701526118669291611479565b906118719083611406565b848303603f19016101008601526118889291611479565b906001600160a01b0361189d60e08301610d6d565b16610120840152610100810135601e1982360301811215610aae57016020813591016001600160401b038211610aae578136038113610aae5761191292826020938693603f1985850301610140860152818452858401375f848284010152601f8019910116010301601f198101835282610cf6565b6040519360c08501908582106001600160401b03831117610cac576001600160401b039160405260018060a01b031692838652166020850152600160408501525f606085015260808401525f60a0840152602060405161197181610cc0565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611a12608083015160c060e4860152610124850190610de2565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1928315610aa3575f93611a80575b50827fc65ca01d282ff79f0f91a2f3b1bd6a00f0c9df42b8ded2b82ee42ad14a411b905f80a3565b9092506020813d602011611aac575b81611a9c60209383610cf6565b81010312610aae5751915f611a58565b3d9150611a8f565b63512509d360e11b5f5260045ffd5b50611ace838b61202e565b9050611add60c08c018c61202e565b9190501415611517565b9190811015611af75760051b0190565b634e487b7160e01b5f52603260045260245ffd5b9190811015611af75760051b8101359061013e1981360301821215610aae570190565b919290818103611baf575f91345b828410611b4e57505050505050600190565b611b59848388611ae7565b35818111611ba057611b6c858588611b0b565b30906001600160a01b0390611b839060e001612063565b1603611b955760019103930192611b3c565b505050505050505f90565b63044044a560e21b5f5260045ffd5b63251f56a160e21b5f5260045ffd5b8051821015611af75760209160051b010190565b805151825151116112f5575f5b825151811015611c565781516001600160a01b0390611bff908390611bbe565b511660018060a01b03611c13838651611bbe565b511614801590611c31575b611c2a57600101611bdf565b5050505f90565b50611c40816020840151611bbe565b51611c4f826020860151611bbe565b5111611c1e565b506040810191825151604082019081515111611dab575f5b815151811015611ce85784516001600160a01b0390611c8e908390611bbe565b511660018060a01b03611ca2838551611bbe565b511614801590611cc2575b611cb957600101611c6e565b50505050505f90565b50611cd1816060860151611bbe565b51611ce0826060860151611bbe565b511415611cad565b50509150608081019182515192608082019384515111611dab575f5b845151811015611da15781516001600160a01b0390611d24908390611bbe565b511660018060a01b03611d38838851611bbe565b511614801590611d7b575b8015611d56575b611cb957600101611d04565b50611d658160c0860151611bbe565b51611d748260c0860151611bbe565b5111611d4a565b50611d8a8160a0860151611bbe565b51611d998260a0860151611bbe565b511415611d43565b5050505050600190565b505050505f90565b6001600160401b036060820151168015159081611e04575b50611df557608001516001600160401b0316611de657600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611dcb565b905f5b82518051821015611ec8575f906020906001600160a01b0390611e35908590611bbe565b51166044611e468584890151611bbe565b5160405163a9059cbb60e01b81526001600160a01b038816600482015260248101919091529384928391905af1908115610aa3575f91611e8f575b50156115ca57600101611e11565b90506020813d8211611ec0575b81611ea960209383610cf6565b81010312610aae57611eba9061131e565b5f611e81565b3d9150611e9c565b50509190915f5b60408401518051821015611f68576001600160a01b0390611ef1908390611bbe565b511690611f02816060870151611bbe565b5191803b15610aae576040516323b872dd60e01b81523060048201526001600160a01b038516602482015260448101939093525f908390606490829084905af1918215610aa357600192611f58575b5001611ecf565b5f611f6291610cf6565b5f611f51565b50505f5b60808401518051821015612027576001600160a01b0390611f8e908390611bbe565b511690611f9f8160a0870151611bbe565b51611fae8260c0880151611bbe565b51833b15610aae57604051637921219560e11b81523060048201526001600160a01b03861660248201526044810192909252606482015260a060848201525f60a482018190529092839060c490829084905af1918215610aa357600192612017575b5001611f6c565b5f61202191610cf6565b5f612010565b5050509050565b903590601e1981360301821215610aae57018035906001600160401b038211610aae57602001918160051b36038313610aae57565b356001600160a01b0381168103610aae5790565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8210156121c1575b806d04ee2d6d415b85acef8100000000600a9210156121a6575b662386f26fc10000811015612192575b6305f5e100811015612181575b612710811015612172575b6064811015612164575b1015612159575b600a602160018401936120fe85610d81565b9461210c6040519687610cf6565b80865261211b601f1991610d81565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561215457600a9091612126565b505090565b6001909101906120ec565b6064600291049301926120e5565b612710600491049301926120db565b6305f5e100600891049301926120d0565b662386f26fc10000601091049301926120c3565b6d04ee2d6d415b85acef8100000000602091049301926120b3565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104612099565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361221657565b634ca8886760e01b5f5260045ffdfea26469706673582212201855ca6d1a3b6a896d74433f0e121f48793967fe7cd4180e91e19620049646a264736f6c634300081a0033",
    "sourceMap": "709:8864:50:-:0;;;;;;;;;;-1:-1:-1;709:8864:50;;;;;;;;;1183:12:6;;;1054:5;1183:12;709:8864:50;1054:5:6;1183:12;709:8864:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;709:8864:50;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;:::i;:::-;-1:-1:-1;;709:8864:50;;-1:-1:-1;;;709:8864:50;;;;;;;;;;;;;;1052:20:39;;709:8864:50;;;:::i;:::-;881:58:6;;:::i;:::-;1052:20:39;;:::i;:::-;709:8864:50;;-1:-1:-1;;;;;709:8864:50;;;1084:4:39;1052:37;709:8864:50;;;;;;;:::i;:::-;;881:58:6;;:::i;:::-;709:8864:50;;;1240:4:39;709:8864:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;709:8864:50;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;:::i;:::-;-1:-1:-1;;709:8864:50;;-1:-1:-1;;;709:8864:50;;;;;;;;;;;;-1:-1:-1;;709:8864:50;;;;;;-1:-1:-1;;;6513:23:50;;709:8864;;;6513:23;;;709:8864;;;;6513:23;709:8864;6513:3;-1:-1:-1;;;;;709:8864:50;6513:23;;;;;;;;;;;709:8864;6569:26;-1:-1:-1;;;;;6569:26:50;;;709:8864;;6551:15;:44;6547:87;;6792:21;6697:16;6673:79;6697:16;;;;709:8864;;;;6673:79;;;;;;:::i;:::-;6792:21;;;;709:8864;-1:-1:-1;;;;;709:8864:50;;6792:21;:::i;6547:87::-;-1:-1:-1;;;6616:18:50;;709:8864;;6616:18;6513:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;709:8864;;;;;;;;;;;;;1442:1461:6;709:8864:50;;;:::i;:::-;881:58:6;;;;;;:::i;:::-;1442:1461;:::i;:::-;709:8864:50;;;;;;;;;;;;;:::i;:::-;881:58:6;;;;;;;:::i;:::-;3340:23;;;3336:76;;3869:13;;3844:9;3884:10;;;;;;709:8864:50;;;1489:1:0;709:8864:50;;;3896:19:6;4037:9;;;;;:::i;:::-;709:8864:50;4064:22:6;;;;4060:87;;4284:15;1489:1:0;4284:15:6;;;;;;:::i;:::-;;709:8864:50;3896:19:6;709:8864:50;3869:13:6;;;4060:87;-1:-1:-1;;;4113:19:6;;709:8864:50;4113:19:6;;3336:76;-1:-1:-1;;;3386:15:6;;709:8864:50;3386:15:6;;709:8864:50;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;1619:44:39;;1644:18;709:8864:50;1619:44:39;;709:8864:50;;;1619:44:39;709:8864:50;;;;;;1619:14:39;709:8864:50;1619:44:39;;;;;;;;;;;709:8864:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;1619:44:39;;;;;;;;;;;;:::i;:::-;;;709:8864:50;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1619:44:39;;;709:8864:50;;;;1619:44:39;709:8864:50;;;;;;;;;;;;;;;;;-1:-1:-1;;709:8864:50;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1392:23:39;;709:8864:50;;;1392:23:39;;709:8864:50;;;1392:23:39;709:8864:50;;;;;;1392:3:39;709:8864:50;1392:23:39;;;;;;;;;;;709:8864:50;1429:18:39;709:8864:50;1429:18:39;;709:8864:50;1451:18:39;1429:40;1425:71;;709:8864:50;;;;;;;;;;;;;;:::i;1425:71:39:-;-1:-1:-1;;;1478:18:39;;709:8864:50;;1478:18:39;1392:23;;;;;;;;;;;;;;:::i;:::-;;;;;709:8864:50;;;;;;;;;;;;;;;;468:43:39;709:8864:50;;;;;;;;;;;;;;;;1055:104:4;;709:8864:50;;1089:6:4;1072:24;1089:6;1072:24;:::i;:::-;1120:6;;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;709:8864:50;;;;;;;;;;;;1055:104:4;;;709:8864:50;;;;-1:-1:-1;;;709:8864:50;;;;;;;;;;;;;;;;;-1:-1:-1;;;709:8864:50;;;;;;;;;;;;;;;;;;;;;1055:104:4;;;;;;;;;;:::i;:::-;709:8864:50;;;;;1055:104:4;709:8864:50;;1055:104:4;709:8864:50;;;;:::i;:::-;;;;;;;-1:-1:-1;;709:8864:50;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;709:8864:50;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;5373:62;709:8864;;;:::i;:::-;5412:10;;;;709:8864;;;5373:62;:::i;709:8864::-;;;;;;-1:-1:-1;;709:8864:50;;;;;;-1:-1:-1;;;5595:28:50;;709:8864;;;5595:28;;;709:8864;;;5595:3;-1:-1:-1;;;;;709:8864:50;;;-1:-1:-1;709:8864:50;;;;5595:28;;;;;;;709:8864;5595:28;;;709:8864;;;;;;;;5666:32;;709:8864;;;5666:32;;709:8864;;5666:32;709:8864;5666:32;;;;;;;;;709:8864;5666:32;;;709:8864;5714:25;;;;:::i;:::-;5713:26;5709:65;;5820:75;5844:12;;;;709:8864;;;;5820:75;;;;;;:::i;:::-;709:8864;;;;;;;;;5933:19;;709:8864;;6015:18;;;;709:8864;;;;;;;;;;;;;;5924:152;;709:8864;;5924:152;;709:8864;;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8864:50;;;;;;;:::i;:::-;;;;;;5924:152;;;;;;;;;709:8864;5924:152;;;709:8864;5923:153;;5906:208;;709:8864;;;;;;:::i;:::-;;;;;6235:48;;709:8864;;;;;;;:::i;:::-;6193:18;709:8864;;;6149:149;;709:8864;;;6125:183;;;;;709:8864;;;;;;;;;;;;;;;;6125:183;;709:8864;;6125:183;;709:8864;;;;;;;;;;;;;;6125:183;;;;;;;6355:21;6125:183;;;709:8864;-1:-1:-1;6355:21:50;;709:8864;-1:-1:-1;;;;;709:8864:50;;6355:21;:::i;6125:183::-;709:8864;6125:183;;;:::i;:::-;709:8864;6125:183;;;709:8864;;;;;;;;;6125:183;709:8864;;;5906:208;6094:20;;;709:8864;6094:20;709:8864;;6094:20;5924:152;;;709:8864;5924:152;;709:8864;5924:152;;;;;;709:8864;5924:152;;;:::i;:::-;;;709:8864;;;;;;;:::i;:::-;5924:152;;;;;;-1:-1:-1;5924:152:50;;5709:65;5748:26;;;709:8864;5748:26;709:8864;;5748:26;5666:32;;;;;;;709:8864;5666:32;;;;;;:::i;:::-;;;;;5595:28;;;;;;;709:8864;5595:28;;;;;;:::i;:::-;;;;;709:8864;;;;;;-1:-1:-1;;709:8864:50;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;-1:-1:-1;;709:8864:50;;;;;;;;;;;;;;;;;;9530:34;;;;9515:49;709:8864;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;:::o;:::-;;;;-1:-1:-1;709:8864:50;;;;;-1:-1:-1;709:8864:50;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;:::o;:::-;;;1055:104:4;;709:8864:50;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;709:8864:50;;;;;;:::o;:::-;;;-1:-1:-1;;;;;709:8864:50;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;709:8864:50;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;709:8864:50;;;;;;:::o;:::-;;;-1:-1:-1;;;;;709:8864:50;;;;;;:::o;:::-;-1:-1:-1;;;;;709:8864:50;;;;;;-1:-1:-1;;709:8864:50;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;709:8864:50;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;709:8864:50;;;;;;;;-1:-1:-1;;709:8864:50;;;;:::o;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;709:8864:50;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;709:8864:50;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;-1:-1:-1;;709:8864:50;;;;;;;:::o;:::-;-1:-1:-1;;;;;709:8864:50;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;709:8864:50;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;709:8864:50;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;:::i;:::-;;;;;;:::o;6848:642::-;7058:18;1006:16:38;;;709:8864:50;1006:26:38;1002:54;;1073:26;;;:::i;:::-;7031:46:50;7027:64;;7133:77;7157:14;7254:35;7157:14;;;1006:16:38;709:8864:50;;;7133:77;;;;;;:::i;:::-;709:8864;1006:16:38;709:8864:50;;;7254:35;;;;;;:::i;:::-;7319:38;;;;:::i;:::-;:91;;;;6848:642;7319:164;;;7300:183;;6848:642;:::o;7319:164::-;7436:14;;;;;;;1006:16:38;709:8864:50;;;;7426:25;7465:17;;;1006:16:38;709:8864:50;;;;7455:28;7426:57;6848:642;:::o;7319:91::-;7373:15;;;;709:8864;7392:18;;;709:8864;-1:-1:-1;;;;;709:8864:50;;;;;7373:37;;-1:-1:-1;7319:91:50;;7027:64;7079:12;;709:8864;7079:12;:::o;1002:54:38:-;1041:15;;;709:8864:50;1041:15:38;;709:8864:50;1041:15:38;709:8864:50;;;-1:-1:-1;;;;;709:8864:50;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;-1:-1:-1;709:8864:50;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;:::o;4469:754::-;;;;2082:16;;;;:::i;:::-;2109:17;;;;;-1:-1:-1;2109:17:50;;;;:::i;:::-;2082:51;;;;2078:97;;2189:17;;;;;;;;:::i;:::-;2217:19;;;;;-1:-1:-1;2217:19:50;;;;:::i;:::-;2189:54;;;;2185:100;;2312:18;;;;;;;;:::i;:::-;2341:20;;;;;-1:-1:-1;2341:20:50;;;;:::i;:::-;2312:56;;;;;;:127;;;4469:754;2295:183;;2647:1;2679:3;2654:16;;;;:::i;:::-;2650:27;;;;;;;2720:161;2109:17;2727:16;2843:20;2727:16;2843:17;2727:16;;:19;;:16;;;;:::i;:::-;-1:-1:-1;;;;;709:8864:50;;2727:19;:::i;:::-;;:::i;:::-;709:8864;2843:17;;:::i;:::-;:20;;:::i;:::-;2189:17;709:8864;-1:-1:-1;;;2720:161:50;;-1:-1:-1;;;;;709:8864:50;;2720:161;;;709:8864;2816:4;709:8864;;;;;;;;;;;;;;;;2647:1;;709:8864;;;;;;;2720:161;;;;;;;;;;2647:1;2720:161;;;2679:3;2719:162;;2698:222;;709:8864;;2638:10;;2698:222;2903:17;;;2647:1;2903:17;2720:161;2647:1;2903:17;2720:161;;;2109:17;2720:161;;;;;;;;;2109:17;2720:161;;;:::i;:::-;;;709:8864;;;;;;;:::i;:::-;2720:161;;;;;;-1:-1:-1;2720:161:50;;2650:27;;;;;;;;;2974:10;2647:1;3016:3;2990:17;;;;:::i;:::-;2986:28;;;;;;;3148:22;3043:17;3148:19;3043:17;;:20;;:17;;;;:::i;:20::-;709:8864;3148:19;;:::i;:22::-;709:8864;3035:149;;;;;;2189:17;709:8864;-1:-1:-1;;;3035:149:50;;-1:-1:-1;;;;;709:8864:50;;2720:161;3035:149;;709:8864;2816:4;709:8864;;;;;;;;;;;-1:-1:-1;;709:8864:50;;;;;;-1:-1:-1;;3035:149:50;;;;;;;709:8864;3035:149;;;3016:3;;709:8864;2974:10;;;;3035:149;2647:1;3035:149;;;:::i;:::-;;;;2986:28;;;;;;;;;;2647:1;3461:19;;;;3234:294;3282:3;3255:18;;;;:::i;:::-;3251:29;;;;;;;3310:18;;3461:22;3310:18;3461:19;3310:18;3420:23;3310:18;;3420:20;3310:18;:21;;:18;;;;;:::i;:21::-;709:8864;3420:20;;;:::i;:23::-;709:8864;3461:19;;:::i;:22::-;709:8864;3301:216;;;;;2189:17;709:8864;-1:-1:-1;;;3301:216:50;;-1:-1:-1;;;;;709:8864:50;;2720:161;3301:216;;709:8864;2816:4;709:8864;;;;;;;;;;;;;;;;;;;;-1:-1:-1;709:8864:50;;;;;;;;;;;;;;-1:-1:-1;;3301:216:50;;;;;;;709:8864;3301:216;;;3282:3;;709:8864;3239:10;;3301:216;2647:1;3301:216;;;:::i;:::-;;;;3251:29;;;;;;;;;;;;2189:17;709:8864;5080:16;2109:17;5080:16;;2109:17;709:8864;;;;;;:::i;:::-;2189:17;709:8864;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8864:50;2217:19;709:8864;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8864:50;2312:18;709:8864;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8864:50;2341:20;709:8864;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8864:50;3461:19;709:8864;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8864:50;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8864:50;;;;;;;;;:::i;:::-;;-1:-1:-1;;;;;709:8864:50;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;2109:17;709:8864;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;5080:16;709:8864;;2109:17;709:8864;;;;;;;;;;;;;;;;;;;;2647:1;709:8864;;;;;;;1055:104:4;;709:8864:50;;;;5080:16;;1055:104:4;;5080:16:50;;;;;;:::i;:::-;2189:17;709:8864;;3461:19;709:8864;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;-1:-1:-1;;;;;709:8864:50;2189:17;709:8864;;;;;;;;;;;;2109:17;4858:287;;709:8864;;2189:17;4858:287;;709:8864;2647:1;2217:19;4858:287;;709:8864;2312:18;4858:287;;709:8864;2647:1;2341:20;4858:287;;709:8864;2109:17;2189;709:8864;;;;:::i;:::-;4816:18;709:8864;;4771:389;;;709:8864;;;2189:17;709:8864;;;;;;;;4747:423;;;2720:161;4747:423;;709:8864;;;;;;;2189:17;709:8864;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;2189:17;709:8864;;;;;;;;;2217:19;709:8864;;;;;;;2341:20;709:8864;2312:18;709:8864;;;3461:19;709:8864;;;;;;;;;:::i;:::-;;;;;;;;4747:423;709:8864;2647:1;4747:3;-1:-1:-1;;;;;709:8864:50;4747:423;;;;;;;2647:1;4747:423;;;3234:294;4740:430;;5185:31;2647:1;5185:31;;4469:754::o;4747:423::-;;;;2109:17;4747:423;;2109:17;4747:423;;;;;;2109:17;4747:423;;;:::i;:::-;;;709:8864;;;;;4747:423;;;;;;;-1:-1:-1;4747:423:50;;2295:183;2154:21;;;2082:16;2457:21;;2082:16;2457:21;2312:127;2384:18;;;;;:::i;:::-;2413:19;;;;;;;;:::i;:::-;2384:55;;;;;2312:127;;709:8864;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;1442:1461:6:-;;;;1649:23;;;1645:76;;2190:1;;2153:9;2193:10;;;;;;2885:11;;;;;;1489:1:0;1442:1461:6;:::o;2205:19::-;2346:9;;;;;:::i;:::-;709:8864:50;2373:22:6;;;2369:87;;2594:15;;;;;:::i;:::-;1084:4:39;;-1:-1:-1;;;;;709:8864:50;1052:20:39;;;;;:::i;:::-;709:8864:50;1052:37:39;2580:84:6;;1489:1:0;709:8864:50;;2205:19:6;709:8864:50;2178:13:6;;;2580:84;2637:12;;;;;;;2190:1;2637:12;:::o;2369:87::-;4113:19;;;2190:1;2422:19;;2190:1;2422:19;1645:76;3386:15;;;1695;;;;;709:8864:50;;;;;;;;;;;;;;;:::o;7496:1374::-;7671:19;;709:8864;7700:18;;709:8864;-1:-1:-1;7667:84:50;;709:8864;7809:3;7782:18;;709:8864;7778:29;;;;;7849:19;;-1:-1:-1;;;;;709:8864:50;7849:22;;:19;;:22;:::i;:::-;709:8864;;;;;;;7875:21;:18;;;:21;:::i;:::-;709:8864;;7849:47;;;:115;;;7809:3;7828:163;;709:8864;;7766:10;;7828:163;7979:12;;;709:8864;7979:12;:::o;7849:115::-;7916:20;:23;:20;;;;;:23;:::i;:::-;709:8864;7942:22;:19;7916:20;7942:19;;;:22;:::i;:::-;709:8864;-1:-1:-1;7849:115:50;;7778:29;;8041:20;;;;;;709:8864;8041:20;8071:19;;;;;709:8864;-1:-1:-1;8037:86:50;;709:8864;8182:3;8154:19;;709:8864;8150:30;;;;;8222:20;;-1:-1:-1;;;;;709:8864:50;8222:23;;:20;;:23;:::i;:::-;709:8864;;;;;;;8249:22;:19;;;:22;:::i;:::-;709:8864;;8222:49;;;:122;;;8182:3;8201:170;;709:8864;;8138:10;;8201:170;8359:12;;;;;709:8864;8359:12;:::o;8222:122::-;8291:22;:25;:22;;;;;:25;:::i;:::-;709:8864;8320:24;:21;8291:22;8320:21;;;:24;:::i;:::-;709:8864;8291:53;;8222:122;;8150:30;;;;;8422:21;;;;;;709:8864;8453:20;8422:21;8453:20;;;;;709:8864;-1:-1:-1;8418:88:50;;709:8864;8566:3;8537:20;;709:8864;8533:31;;;;;8606:21;;-1:-1:-1;;;;;709:8864:50;8606:24;;:21;;:24;:::i;:::-;709:8864;;;;;;;8634:23;:20;;;:23;:::i;:::-;709:8864;;8606:51;;;:126;;;8566:3;8606:198;;;;8566:3;8585:246;;709:8864;;8521:10;;8606:198;8752:22;:25;:22;;;;;:25;:::i;:::-;709:8864;8780:24;:21;8752:22;8780:21;;;:24;:::i;:::-;709:8864;-1:-1:-1;8606:198:50;;:126;8677:23;:26;:23;;;;;:26;:::i;:::-;709:8864;8707:25;:22;8677:23;8707:22;;;:25;:::i;:::-;709:8864;8677:55;;8606:126;;8533:31;;;;;;709:8864;7496:1374;:::o;8418:88::-;8494:12;;;;709:8864;8494:12;:::o;606:258:38:-;-1:-1:-1;;;;;351:24:38;;;709:8864:50;;351:29:38;;;:87;;;;606:258;714:54;;;564:24;;709:8864:50;-1:-1:-1;;;;;709:8864:50;778:57:38;;853:4;606:258;:::o;778:57::-;815:20;;;-1:-1:-1;815:20:38;;-1:-1:-1;815:20:38;714:54;751:17;;;-1:-1:-1;751:17:38;;-1:-1:-1;751:17:38;351:87;423:15;;;-1:-1:-1;351:87:38;;;3540:923:50;;3693:1;3725:3;3700:16;;709:8864;;3696:27;;;;;3693:1;;3790:17;;-1:-1:-1;;;;;709:8864:50;3756:19;;709:8864;;3756:19;:::i;:::-;709:8864;;3749:62;3790:20;:17;;;;;:20;:::i;:::-;709:8864;;;-1:-1:-1;;;3749:62:50;;-1:-1:-1;;;;;709:8864:50;;3749:62;;;709:8864;;;;;;;;;;;;;;3749:62;;;;;;;3693:1;3749:62;;;3725:3;3748:63;;3744:109;;709:8864;;3684:10;;3749:62;;;3790:17;3749:62;;;;;;;;;3790:17;3749:62;;;:::i;:::-;;;709:8864;;;;;;;:::i;:::-;3749:62;;;;;;-1:-1:-1;3749:62:50;;3696:27;;;;;;3693:1;3949:3;709:8864;3923:17;;;709:8864;;3919:28;;;;;-1:-1:-1;;;;;709:8864:50;3976:20;;709:8864;;3976:20;:::i;:::-;709:8864;;4079:19;:22;:19;;;;;:22;:::i;:::-;709:8864;3968:147;;;;;;709:8864;;-1:-1:-1;;;3968:147:50;;4036:4;3749:62;3968:147;;709:8864;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;-1:-1:-1;;709:8864:50;;;;;;-1:-1:-1;;3968:147:50;;;;;;;709:8864;3968:147;;;3949:3;;709:8864;3907:10;;3968:147;3693:1;3968:147;;;:::i;:::-;;;;3919:28;;;3693:1;4213:3;4186:18;;;;709:8864;;4182:29;;;;;-1:-1:-1;;;;;709:8864:50;4241:21;;709:8864;;4241:21;:::i;:::-;709:8864;;4349:20;:23;:20;;;;;:23;:::i;:::-;709:8864;4390:22;:19;;;;;:22;:::i;:::-;709:8864;4232:214;;;;;709:8864;;-1:-1:-1;;;4232:214:50;;4036:4;3749:62;4232:214;;709:8864;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;709:8864:50;;;;;;;;;;;;;;-1:-1:-1;;4232:214:50;;;;;;;709:8864;4232:214;;;4213:3;;709:8864;4170:10;;4232:214;3693:1;4232:214;;;:::i;:::-;;;;4182:29;;;;;;3540:923::o;709:8864::-;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8864:50;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;;;;709:8864:50;;;;;;;:::o;637:632:32:-;759:17;-1:-1:-1;25444:17:34;-1:-1:-1;;;25444:17:34;;;25440:103;;637:632:32;25560:17:34;25569:8;26140:7;25560:17;;;25556:103;;637:632:32;25685:8:34;25676:17;;;25672:103;;637:632:32;25801:7:34;25792:16;;;25788:100;;637:632:32;25914:7:34;25905:16;;;25901:100;;637:632:32;26027:7:34;26018:16;;;26014:100;;637:632:32;26131:16:34;;26127:66;;637:632:32;26140:7:34;874:92:32;779:1;709:8864:50;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:4;;709:8864:50;;:::i;:::-;;;;;;;874:92:32;;;979:247;-1:-1:-1;;709:8864:50;;-1:-1:-1;;;1033:111:32;;;;709:8864:50;1033:111:32;709:8864:50;1194:10:32;;1190:21;;26140:7:34;979:247:32;;;;1190:21;1206:5;;637:632;:::o;26127:66:34:-;26177:1;709:8864:50;;;;26127:66:34;;26014:100;26027:7;26098:1;709:8864:50;;;;26014:100:34;;;25901;25914:7;25985:1;709:8864:50;;;;25901:100:34;;;25788;25801:7;25872:1;709:8864:50;;;;25788:100:34;;;25672:103;25685:8;25758:2;709:8864:50;;;;25672:103:34;;;25556;25569:8;25642:2;709:8864:50;;;;25556:103:34;;;25440;-1:-1:-1;25526:2:34;;-1:-1:-1;;;;709:8864:50;;25440:103:34;;6040:128:6;6109:4;-1:-1:-1;;;;;709:8864:50;6087:10:6;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;",
    "linkReferences": {},
    "immutableReferences": {
      "446": [
        {
          "start": 1801,
          "length": 32
        }
      ],
      "448": [
        {
          "start": 1845,
          "length": 32
        }
      ],
      "450": [
        {
          "start": 1888,
          "length": 32
        }
      ],
      "588": [
        {
          "start": 8678,
          "length": 32
        }
      ],
      "41211": [
        {
          "start": 1109,
          "length": 32
        }
      ],
      "41214": [
        {
          "start": 636,
          "length": 32
        },
        {
          "start": 1552,
          "length": 32
        },
        {
          "start": 2276,
          "length": 32
        },
        {
          "start": 6688,
          "length": 32
        }
      ],
      "41216": [
        {
          "start": 1059,
          "length": 32
        },
        {
          "start": 1608,
          "length": 32
        },
        {
          "start": 1733,
          "length": 32
        },
        {
          "start": 2575,
          "length": 32
        },
        {
          "start": 4667,
          "length": 32
        },
        {
          "start": 6515,
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
    "makeStatement((address[],uint256[],address[],uint256[],address[],uint256[],uint256[],address,bytes),uint64)": "3714edb9",
    "makeStatementFor((address[],uint256[],address[],uint256[],address[],uint256[],uint256[],address,bytes),uint64,address,address)": "4d9fea94",
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "91db0b7e",
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "88e5b2d9",
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": "bc197c81",
    "onERC1155Received(address,address,uint256,uint256,bytes)": "f23a6e61",
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e49617e1",
    "supportsInterface(bytes4)": "01ffc9a7",
    "version()": "54fd4d50"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ArrayLengthMismatch\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidSchema\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidTransfer\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromStatement\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"BundleClaimed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"BundleEscrowed\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"collectExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_payment\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectPayment\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getStatement\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"internalType\":\"struct TokenBundleEscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"makeStatement\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"internalType\":\"struct TokenBundleEscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"makeStatementFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155BatchReceived\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"supportsInterface(bytes4)\":{\"details\":\"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Statements/TokenBundleEscrowObligation.sol\":\"TokenBundleEscrowObligation\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746\",\"dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce\",\"dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009\",\"dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827\",\"dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265\",\"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x1c026a554c131a7c9019cfa74a8c1c96f734eca5bb6d24a16afd6dd4f8cec1ba\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://bba46f25fe7f38886a2a96b0be650c117983ca927784543bc460b921225bb0dd\",\"dweb:/ipfs/QmVBLDrFn4H8JcF4zptZKTXu1Wp62Xjk2rPd5prksBpqhs\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Statements/TokenBundleEscrowObligation.sol\":{\"keccak256\":\"0xfb1eaf961f31c410af511c512030a3fd9192fb554bafa22ce3c393e20e6bc3ed\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://903decc148f84db7ebd02a19620c1788ef1a6de3712f1ac10fefffc35bbae698\",\"dweb:/ipfs/QmVKFndK34XbqkfY93m65Y7CUHiid4RAm5cyaRC2mkmXiH\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.26+commit.8a97fa7a"
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
          "name": "ArrayLengthMismatch"
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
          "name": "InvalidTransfer"
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
          "inputs": [],
          "type": "error",
          "name": "UnauthorizedCall"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "escrow",
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
          "name": "BundleClaimed",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "escrow",
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
          "name": "BundleEscrowed",
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
              "internalType": "struct TokenBundleEscrowObligation.StatementData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address[]",
                  "name": "erc20Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc20Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc721Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc721TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc1155Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
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
              "internalType": "struct TokenBundleEscrowObligation.StatementData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address[]",
                  "name": "erc20Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc20Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc721Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc721TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc1155Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
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
          "stateMutability": "pure",
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
          "stateMutability": "pure",
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
          "stateMutability": "pure",
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
            "details": "Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas."
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
        "@openzeppelin/=lib/openzeppelin-contracts/contracts/",
        "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
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
        "src/Statements/TokenBundleEscrowObligation.sol": "TokenBundleEscrowObligation"
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
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        "keccak256": "0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4",
        "urls": [
          "bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009",
          "dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol": {
        "keccak256": "0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de",
        "urls": [
          "bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827",
          "dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA"
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
        "keccak256": "0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c",
        "urls": [
          "bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265",
          "dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseStatement.sol": {
        "keccak256": "0x1c026a554c131a7c9019cfa74a8c1c96f734eca5bb6d24a16afd6dd4f8cec1ba",
        "urls": [
          "bzz-raw://bba46f25fe7f38886a2a96b0be650c117983ca927784543bc460b921225bb0dd",
          "dweb:/ipfs/QmVBLDrFn4H8JcF4zptZKTXu1Wp62Xjk2rPd5prksBpqhs"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647",
        "urls": [
          "bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778",
          "dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp"
        ],
        "license": "UNLICENSED"
      },
      "src/Statements/TokenBundleEscrowObligation.sol": {
        "keccak256": "0xfb1eaf961f31c410af511c512030a3fd9192fb554bafa22ce3c393e20e6bc3ed",
        "urls": [
          "bzz-raw://903decc148f84db7ebd02a19620c1788ef1a6de3712f1ac10fefffc35bbae698",
          "dweb:/ipfs/QmVKFndK34XbqkfY93m65Y7CUHiid4RAm5cyaRC2mkmXiH"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 50
} as const;