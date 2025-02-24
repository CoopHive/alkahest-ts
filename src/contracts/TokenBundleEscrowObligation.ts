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
    "object": "0x61016080604052346102a6576040816124ce803803809161002082856102e0565b8339810103126102a65780516001600160a01b038116918282036102a65760200151916001600160a01b0383168084036102a65760405161010081016001600160401b038111828210176102cc5760405260cc815260208101927f616464726573735b5d206572633230546f6b656e732c2075696e743235365b5d84527f206572633230416d6f756e74732c20616464726573735b5d206572633732315460408301527f6f6b656e732c2075696e743235365b5d20657263373231546f6b656e4964732c60608301527f20616464726573735b5d2065726331313535546f6b656e732c2075696e74323560808301527f365b5d2065726331313535546f6b656e4964732c2075696e743235365b5d206560a08301527f726331313535416d6f756e74732c206164647265737320617262697465722c2060c08301526b189e5d195cc819195b585b9960a21b60e08301526001608052600360a0525f60c052156102bd576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af19081156102b2575f9161027c575b50610140526040516121ca9081610304823960805181610678015260a051816106a4015260c051816106cf015260e05181612155015261010051816103c401526101205181818161025f0152818161057f01528181610853015261198f015261014051818181610392015281816105b7015281816106340152818161097e015281816111aa01526118e20152f35b90506020813d6020116102aa575b81610297602093836102e0565b810103126102a657515f6101ee565b5f80fd5b3d915061028a565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176102cc5760405256fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610bc9575080631272ff8b14610ab157806330088bc9146108295780633714edb9146107db5780634d9fea941461075c57806354fd4d50146106575780635bf2f20d1461061c5780635cc02d2f146105035780636b122fe01461035157806388e5b2d91461032857806391db0b7e14610328578063a84f2aa014610230578063bc197c8114610197578063ce46e0461461017b578063e49617e114610149578063e60c3505146101495763f23a6e610361000f57346101465760a036600319011261014657610105610cb0565b5061010e610cc6565b506084356001600160401b0381116101425761012e903690600401610e97565b505060405163f23a6e6160e01b8152602090f35b5080fd5b80fd5b602061016760e061015936610ec4565b610161612153565b01611fd2565b6040516001600160a01b0390911630148152f35b5034610146578060031936011261014657602090604051908152f35b50346101465760a0366003190112610146576101b1610cb0565b506101ba610cc6565b506044356001600160401b038111610142576101da903690600401610e17565b50506064356001600160401b038111610142576101fb903690600401610e17565b50506084356001600160401b0381116101425761021c903690600401610e97565b505060405163bc197c8160e01b8152602090f35b5034610146576020366003190112610146576040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561031b5781926102f7575b506001600160401b0360608301511642106102e8576102dd826102c861012082015160208082518301019101611035565b60c0909101516001600160a01b031690611d7d565b602060405160018152f35b637bf6a16f60e01b8152600490fd5b6103149192503d8084833e61030c8183610c65565b81019061129a565b905f610297565b50604051903d90823e3d90fd5b602061034761033636610e47565b92610342929192612153565b611a9d565b6040519015158152f35b503461014657806003193601126101465760608060405161037181610c4a565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa9081156104f757809161043e575b60608261043a604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610d51565b0390f35b90503d8082843e61044f8184610c65565b820191602081840312610142578051906001600160401b0382116104f3570190608082840312610146576040519161048683610c4a565b8051835260208101516001600160a01b03811681036104f35760208401526104b06040820161128d565b60408401526060810151906001600160401b0382116104f357019083601f8301121561014657506060928160206104e993519101610fe5565b828201525f6103f4565b8280fd5b604051903d90823e3d90fd5b503461014657602036600319011261014657606061012060405161052681610bff565b83815283602082015283604082015283838201528360808201528360a08201528360c08201528360e0820152836101008201520152604051906328c44a9960e21b82526004356004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa91821561031b578192610600575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036105f1576040516020808252819061043a90820185610d75565b63295d5f3960e01b8152600490fd5b6106159192503d8084833e61030c8183610c65565b905f6105af565b503461014657806003193601126101465760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346101465780600319360112610146576020610748600161043a9361069c7f0000000000000000000000000000000000000000000000000000000000000000611fe6565b9082856106c87f0000000000000000000000000000000000000000000000000000000000000000611fe6565b81806106f37f0000000000000000000000000000000000000000000000000000000000000000611fe6565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282610c65565b604051918291602083526020830190610d51565b5034610146576080366003190112610146576004356001600160401b03811161014257610120600319823603011261014257610796610c86565b604435916001600160a01b03831683036107d757606435936001600160a01b03851685036101465760206107cf8686868660040161140c565b604051908152f35b8380fd5b503461014657604036600319011261014657600435906001600160401b0382116101465761012060031983360301126101465760206107cf8361081c610c86565b903391339160040161140c565b34610a1d576040366003190112610a1d576040516328c44a9960e21b8152600480359082018190527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f82602481865afa918215610a12575f92610a95575b50604051906328c44a9960e21b825260243560048301525f82602481875afa918215610a12575f92610a79575b506108ca83611d22565b15610a6a576108e761012084015160208082518301019101611035565b92602061093c60018060a01b0360e087015116610100870151935193604051809581948293631272ff8b60e01b84526060600485015261092a606485018c610d75565b84810360031901602486015290610d51565b90604483015203915afa908115610a12575f91610a30575b5015610a21576040519061096782610c2f565b81525f60208201526040519061097c82610c2f565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152843b15610a1d5760645f92836020976040519889958694634692626760e01b86525160048601525180516024860152015160448401525af1928315610a12576102dd93610a02575b5060c001516001600160a01b031690611d7d565b5f610a0c91610c65565b5f6109ee565b6040513d5f823e3d90fd5b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610a62575b81610a4b60209383610c65565b81010312610a1d57610a5c9061128d565b85610954565b3d9150610a3e565b63629cd40b60e11b5f5260045ffd5b610a8e9192503d805f833e61030c8183610c65565b90846108c0565b610aaa9192503d805f833e61030c8183610c65565b9083610893565b34610a1d576060366003190112610a1d576004356001600160401b038111610a1d576101406003198236030112610a1d5760405190610aef82610bff565b8060040135825260248101356020830152610b0c60448201610c9c565b6040830152610b1d60648201610c9c565b6060830152610b2e60848201610c9c565b608083015260a481013560a0830152610b4960c48201610cdc565b60c0830152610b5a60e48201610cdc565b60e08301526101048101358015158103610a1d57610100830152610124810135906001600160401b038211610a1d576004610b989236920101610d0b565b6101208201526024356001600160401b038111610a1d57602091610bc3610347923690600401610d0b565b906111a8565b34610a1d576020366003190112610a1d576004359063ffffffff60e01b8216809203610a1d57602091630271189760e51b148152f35b61014081019081106001600160401b03821117610c1b57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610c1b57604052565b608081019081106001600160401b03821117610c1b57604052565b90601f801991011681019081106001600160401b03821117610c1b57604052565b602435906001600160401b0382168203610a1d57565b35906001600160401b0382168203610a1d57565b600435906001600160a01b0382168203610a1d57565b602435906001600160a01b0382168203610a1d57565b35906001600160a01b0382168203610a1d57565b6001600160401b038111610c1b57601f01601f191660200190565b81601f82011215610a1d57803590610d2282610cf0565b92610d306040519485610c65565b82845260208383010111610a1d57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b90610140610120610e149380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610d51565b90565b9181601f84011215610a1d578235916001600160401b038311610a1d576020808501948460051b010111610a1d57565b6040600319820112610a1d576004356001600160401b038111610a1d5781610e7191600401610e17565b92909291602435906001600160401b038211610a1d57610e9391600401610e17565b9091565b9181601f84011215610a1d578235916001600160401b038311610a1d5760208381860195010111610a1d57565b6020600319820112610a1d57600435906001600160401b038211610a1d57610140908290036003190112610a1d5760040190565b6001600160401b038111610c1b5760051b60200190565b51906001600160a01b0382168203610a1d57565b9080601f83011215610a1d578151610f3a81610ef8565b92610f486040519485610c65565b81845260208085019260051b820101928311610a1d57602001905b828210610f705750505090565b60208091610f7d84610f0f565b815201910190610f63565b9080601f83011215610a1d578151610f9f81610ef8565b92610fad6040519485610c65565b81845260208085019260051b820101928311610a1d57602001905b828210610fd55750505090565b8151815260209182019101610fc8565b929192610ff182610cf0565b91610fff6040519384610c65565b829481845281830111610a1d578281602093845f96015e010152565b9080601f83011215610a1d578151610e1492602001610fe5565b602081830312610a1d578051906001600160401b038211610a1d570161012081830312610a1d576040519161012083018381106001600160401b03821117610c1b5760405281516001600160401b038111610a1d5781611096918401610f23565b835260208201516001600160401b038111610a1d57816110b7918401610f88565b602084015260408201516001600160401b038111610a1d57816110db918401610f23565b604084015260608201516001600160401b038111610a1d57816110ff918401610f88565b606084015260808201516001600160401b038111610a1d5781611123918401610f23565b608084015260a08201516001600160401b038111610a1d5781611147918401610f88565b60a084015260c08201516001600160401b038111610a1d578161116b918401610f88565b60c084015261117c60e08301610f0f565b60e08401526101008201516001600160401b038111610a1d5761119f920161101b565b61010082015290565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361126a576111dc81611d22565b15611264576111fc61012061120c92015160208082518301019101611035565b9160208082518301019101611035565b6112168183611b41565b9182611245575b8261122757505090565b61010091925081015160208151910120910151602081519101201490565b60e080820151908301516001600160a01b03908116911614925061121d565b50505f90565b635f9bd90760e11b5f5260045ffd5b51906001600160401b0382168203610a1d57565b51908115158203610a1d57565b602081830312610a1d578051906001600160401b038211610a1d570161014081830312610a1d57604051916112ce83610bff565b81518352602082015160208401526112e860408301611279565b60408401526112f960608301611279565b606084015261130a60808301611279565b608084015260a082015160a084015261132560c08301610f0f565b60c084015261133660e08301610f0f565b60e0840152611348610100830161128d565b6101008401526101208201516001600160401b038111610a1d5761136c920161101b565b61012082015290565b9035601e1982360301811215610a1d5701602081359101916001600160401b038211610a1d578160051b36038313610a1d57565b916020908281520191905f5b8181106113c25750505090565b909192602080600192838060a01b036113da88610cdc565b1681520194019291016113b5565b81835290916001600160fb1b038311610a1d5760209260051b809284830137010190565b9390926114198580611f9d565b6020870193915061142a8488611f9d565b91905003611a235760408601906114418288611f9d565b60608901949150611452858a611f9d565b91905003611a23576080880190611469828a611f9d565b60a08b0194915061147a858c611f9d565b91905014801590611a32575b611a23575f5b6114968b80611f9d565b90508110156115815761151960208c6114df846114d98d826114d26114cd6114be8880611f9d565b6001600160a01b039491611a56565b611fd2565b1694611f9d565b90611a56565b6040516323b872dd60e01b81526001600160a01b038e166004820152306024820152903560448201529283919082905f9082906064820190565b03925af1908115610a12575f91611548575b50156115395760010161148c565b632f35253160e01b5f5260045ffd5b90506020813d8211611579575b8161156260209383610c65565b81010312610a1d576115739061128d565b5f61152b565b3d9150611555565b5090919293949597895f5b6115968883611f9d565b9050811015611627576115bf816114d98b826115b86114cd6114be8f8a611f9d565b1695611f9d565b3591803b15610a1d576040516323b872dd60e01b81526001600160a01b038c16600482015230602482015260448101939093525f908390606490829084905af1918215610a1257600192611617575b50018a9061158c565b5f61162191610c65565b5f61160e565b5050909192939594975f9560c08b01965b611642878d611f9d565b90508110156116f757808c61167e826114d98c6116778f976114d98f61166f6114cd6114be85938c611f9d565b169988611f9d565b3594611f9d565b35833b15610a1d57604051637921219560e11b81526001600160a01b038e1660048201523060248201526044810192909252606482015260a060848201525f60a482018190529092839060c490829084905af1918215610a12576001926116e7575b5001611638565b5f6116f191610c65565b5f6116e0565b50919750959298949391976040519660208801602090526117188780611375565b60408a0161012090526101608a0190611730926113a9565b9061173b9088611375565b898303603f190160608b015261175192916113e8565b9061175c9087611375565b888303603f190160808a015261177292916113a9565b9061177d9086611375565b878303603f190160a089015261179392916113e8565b9061179e9085611375565b868303603f190160c08801526117b492916113a9565b906117bf9084611375565b858303603f190160e08701526117d592916113e8565b906117e09083611375565b848303603f19016101008601526117f792916113e8565b906001600160a01b0361180c60e08301610cdc565b16610120840152610100810135601e1982360301811215610a1d57016020813591016001600160401b038211610a1d578136038113610a1d5761188192826020938693603f1985850301610140860152818452858401375f848284010152601f8019910116010301601f198101835282610c65565b6040519360c08501908582106001600160401b03831117610c1b576001600160401b039160405260018060a01b031692838652166020850152600160408501525f606085015260808401525f60a084015260206040516118e081610c2f565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611981608083015160c060e4860152610124850190610d51565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1928315610a12575f936119ef575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d602011611a1b575b81611a0b60209383610c65565b81010312610a1d5751915f6119c7565b3d91506119fe565b63512509d360e11b5f5260045ffd5b50611a3d838b611f9d565b9050611a4c60c08c018c611f9d565b9190501415611486565b9190811015611a665760051b0190565b634e487b7160e01b5f52603260045260245ffd5b9190811015611a665760051b8101359061013e1981360301821215610a1d570190565b919290818103611b1e575f91345b828410611abd57505050505050600190565b611ac8848388611a56565b35818111611b0f57611adb858588611a7a565b30906001600160a01b0390611af29060e001611fd2565b1603611b045760019103930192611aab565b505050505050505f90565b63044044a560e21b5f5260045ffd5b63251f56a160e21b5f5260045ffd5b8051821015611a665760209160051b010190565b80515182515111611264575f5b825151811015611bc55781516001600160a01b0390611b6e908390611b2d565b511660018060a01b03611b82838651611b2d565b511614801590611ba0575b611b9957600101611b4e565b5050505f90565b50611baf816020840151611b2d565b51611bbe826020860151611b2d565b5111611b8d565b506040810191825151604082019081515111611d1a575f5b815151811015611c575784516001600160a01b0390611bfd908390611b2d565b511660018060a01b03611c11838551611b2d565b511614801590611c31575b611c2857600101611bdd565b50505050505f90565b50611c40816060860151611b2d565b51611c4f826060860151611b2d565b511415611c1c565b50509150608081019182515192608082019384515111611d1a575f5b845151811015611d105781516001600160a01b0390611c93908390611b2d565b511660018060a01b03611ca7838851611b2d565b511614801590611cea575b8015611cc5575b611c2857600101611c73565b50611cd48160c0860151611b2d565b51611ce38260c0860151611b2d565b5111611cb9565b50611cf98160a0860151611b2d565b51611d088260a0860151611b2d565b511415611cb2565b5050505050600190565b505050505f90565b6001600160401b036060820151168015159081611d73575b50611d6457608001516001600160401b0316611d5557600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611d3a565b905f5b82518051821015611e37575f906020906001600160a01b0390611da4908590611b2d565b51166044611db58584890151611b2d565b5160405163a9059cbb60e01b81526001600160a01b038816600482015260248101919091529384928391905af1908115610a12575f91611dfe575b501561153957600101611d80565b90506020813d8211611e2f575b81611e1860209383610c65565b81010312610a1d57611e299061128d565b5f611df0565b3d9150611e0b565b50509190915f5b60408401518051821015611ed7576001600160a01b0390611e60908390611b2d565b511690611e71816060870151611b2d565b5191803b15610a1d576040516323b872dd60e01b81523060048201526001600160a01b038516602482015260448101939093525f908390606490829084905af1918215610a1257600192611ec7575b5001611e3e565b5f611ed191610c65565b5f611ec0565b50505f5b60808401518051821015611f96576001600160a01b0390611efd908390611b2d565b511690611f0e8160a0870151611b2d565b51611f1d8260c0880151611b2d565b51833b15610a1d57604051637921219560e11b81523060048201526001600160a01b03861660248201526044810192909252606482015260a060848201525f60a482018190529092839060c490829084905af1918215610a1257600192611f86575b5001611edb565b5f611f9091610c65565b5f611f7f565b5050509050565b903590601e1981360301821215610a1d57018035906001600160401b038211610a1d57602001918160051b36038313610a1d57565b356001600160a01b0381168103610a1d5790565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015612130575b806d04ee2d6d415b85acef8100000000600a921015612115575b662386f26fc10000811015612101575b6305f5e1008110156120f0575b6127108110156120e1575b60648110156120d3575b10156120c8575b600a6021600184019361206d85610cf0565b9461207b6040519687610c65565b80865261208a601f1991610cf0565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156120c357600a9091612095565b505090565b60019091019061205b565b606460029104930192612054565b6127106004910493019261204a565b6305f5e1006008910493019261203f565b662386f26fc1000060109104930192612032565b6d04ee2d6d415b85acef810000000060209104930192612022565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104612008565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361218557565b634ca8886760e01b5f5260045ffdfea2646970667358221220ceed694b8c6ab2f81765baff23f6639c1c626ab2daea31eeaef1db7e8b0896c564736f6c634300081a0033",
    "sourceMap": "709:8858:78:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;709:8858:78;;;;1966:4;709:8858;759:14:4;688:1:6;709:8858:78;783:14:4;-1:-1:-1;709:8858:78;807:14:4;708:26:6;704:76;;709:8858:78;790:10:6;;709:8858:78;790:10:6;709:8858:78;790:10:6;712::67;;709:8858:78;732:32:67;-1:-1:-1;709:8858:78;;;;;;;;;;;795:48:67;;709:8858:78;795:48:67;;;709:8858:78;;;;;;;;;;;;;;;;;;;;;827:4:67;709:8858:78;;;;1966:4;709:8858;;;;;;-1:-1:-1;;709:8858:78;;;795:48:67;;;;;;;;;;-1:-1:-1;795:48:67;;;-1:-1:-1;774:69:67;;;709:8858:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;712:10:67;709:8858:78;;;;;;;;;;;;;;;;;;;;774:69:67;709:8858:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;795:48:67;;;709:8858:78;795:48:67;;709:8858:78;795:48:67;;;;;;709:8858:78;795:48:67;;;:::i;:::-;;;709:8858:78;;;;;795:48:67;;;709:8858:78;-1:-1:-1;709:8858:78;;795:48:67;;;-1:-1:-1;795:48:67;;;709:8858:78;;;-1:-1:-1;709:8858:78;;;;;704:76:6;757:12;;;-1:-1:-1;757:12:6;;-1:-1:-1;757:12:6;709:8858:78;;;;-1:-1:-1;709:8858:78;;;;;-1:-1:-1;709:8858:78;;;;;;-1:-1:-1;;709:8858:78;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610bc9575080631272ff8b14610ab157806330088bc9146108295780633714edb9146107db5780634d9fea941461075c57806354fd4d50146106575780635bf2f20d1461061c5780635cc02d2f146105035780636b122fe01461035157806388e5b2d91461032857806391db0b7e14610328578063a84f2aa014610230578063bc197c8114610197578063ce46e0461461017b578063e49617e114610149578063e60c3505146101495763f23a6e610361000f57346101465760a036600319011261014657610105610cb0565b5061010e610cc6565b506084356001600160401b0381116101425761012e903690600401610e97565b505060405163f23a6e6160e01b8152602090f35b5080fd5b80fd5b602061016760e061015936610ec4565b610161612153565b01611fd2565b6040516001600160a01b0390911630148152f35b5034610146578060031936011261014657602090604051908152f35b50346101465760a0366003190112610146576101b1610cb0565b506101ba610cc6565b506044356001600160401b038111610142576101da903690600401610e17565b50506064356001600160401b038111610142576101fb903690600401610e17565b50506084356001600160401b0381116101425761021c903690600401610e97565b505060405163bc197c8160e01b8152602090f35b5034610146576020366003190112610146576040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561031b5781926102f7575b506001600160401b0360608301511642106102e8576102dd826102c861012082015160208082518301019101611035565b60c0909101516001600160a01b031690611d7d565b602060405160018152f35b637bf6a16f60e01b8152600490fd5b6103149192503d8084833e61030c8183610c65565b81019061129a565b905f610297565b50604051903d90823e3d90fd5b602061034761033636610e47565b92610342929192612153565b611a9d565b6040519015158152f35b503461014657806003193601126101465760608060405161037181610c4a565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa9081156104f757809161043e575b60608261043a604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610d51565b0390f35b90503d8082843e61044f8184610c65565b820191602081840312610142578051906001600160401b0382116104f3570190608082840312610146576040519161048683610c4a565b8051835260208101516001600160a01b03811681036104f35760208401526104b06040820161128d565b60408401526060810151906001600160401b0382116104f357019083601f8301121561014657506060928160206104e993519101610fe5565b828201525f6103f4565b8280fd5b604051903d90823e3d90fd5b503461014657602036600319011261014657606061012060405161052681610bff565b83815283602082015283604082015283838201528360808201528360a08201528360c08201528360e0820152836101008201520152604051906328c44a9960e21b82526004356004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa91821561031b578192610600575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036105f1576040516020808252819061043a90820185610d75565b63295d5f3960e01b8152600490fd5b6106159192503d8084833e61030c8183610c65565b905f6105af565b503461014657806003193601126101465760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346101465780600319360112610146576020610748600161043a9361069c7f0000000000000000000000000000000000000000000000000000000000000000611fe6565b9082856106c87f0000000000000000000000000000000000000000000000000000000000000000611fe6565b81806106f37f0000000000000000000000000000000000000000000000000000000000000000611fe6565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282610c65565b604051918291602083526020830190610d51565b5034610146576080366003190112610146576004356001600160401b03811161014257610120600319823603011261014257610796610c86565b604435916001600160a01b03831683036107d757606435936001600160a01b03851685036101465760206107cf8686868660040161140c565b604051908152f35b8380fd5b503461014657604036600319011261014657600435906001600160401b0382116101465761012060031983360301126101465760206107cf8361081c610c86565b903391339160040161140c565b34610a1d576040366003190112610a1d576040516328c44a9960e21b8152600480359082018190527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f82602481865afa918215610a12575f92610a95575b50604051906328c44a9960e21b825260243560048301525f82602481875afa918215610a12575f92610a79575b506108ca83611d22565b15610a6a576108e761012084015160208082518301019101611035565b92602061093c60018060a01b0360e087015116610100870151935193604051809581948293631272ff8b60e01b84526060600485015261092a606485018c610d75565b84810360031901602486015290610d51565b90604483015203915afa908115610a12575f91610a30575b5015610a21576040519061096782610c2f565b81525f60208201526040519061097c82610c2f565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152843b15610a1d5760645f92836020976040519889958694634692626760e01b86525160048601525180516024860152015160448401525af1928315610a12576102dd93610a02575b5060c001516001600160a01b031690611d7d565b5f610a0c91610c65565b5f6109ee565b6040513d5f823e3d90fd5b5f80fd5b630ebe58ef60e11b5f5260045ffd5b90506020813d602011610a62575b81610a4b60209383610c65565b81010312610a1d57610a5c9061128d565b85610954565b3d9150610a3e565b63629cd40b60e11b5f5260045ffd5b610a8e9192503d805f833e61030c8183610c65565b90846108c0565b610aaa9192503d805f833e61030c8183610c65565b9083610893565b34610a1d576060366003190112610a1d576004356001600160401b038111610a1d576101406003198236030112610a1d5760405190610aef82610bff565b8060040135825260248101356020830152610b0c60448201610c9c565b6040830152610b1d60648201610c9c565b6060830152610b2e60848201610c9c565b608083015260a481013560a0830152610b4960c48201610cdc565b60c0830152610b5a60e48201610cdc565b60e08301526101048101358015158103610a1d57610100830152610124810135906001600160401b038211610a1d576004610b989236920101610d0b565b6101208201526024356001600160401b038111610a1d57602091610bc3610347923690600401610d0b565b906111a8565b34610a1d576020366003190112610a1d576004359063ffffffff60e01b8216809203610a1d57602091630271189760e51b148152f35b61014081019081106001600160401b03821117610c1b57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610c1b57604052565b608081019081106001600160401b03821117610c1b57604052565b90601f801991011681019081106001600160401b03821117610c1b57604052565b602435906001600160401b0382168203610a1d57565b35906001600160401b0382168203610a1d57565b600435906001600160a01b0382168203610a1d57565b602435906001600160a01b0382168203610a1d57565b35906001600160a01b0382168203610a1d57565b6001600160401b038111610c1b57601f01601f191660200190565b81601f82011215610a1d57803590610d2282610cf0565b92610d306040519485610c65565b82845260208383010111610a1d57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b90610140610120610e149380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610d51565b90565b9181601f84011215610a1d578235916001600160401b038311610a1d576020808501948460051b010111610a1d57565b6040600319820112610a1d576004356001600160401b038111610a1d5781610e7191600401610e17565b92909291602435906001600160401b038211610a1d57610e9391600401610e17565b9091565b9181601f84011215610a1d578235916001600160401b038311610a1d5760208381860195010111610a1d57565b6020600319820112610a1d57600435906001600160401b038211610a1d57610140908290036003190112610a1d5760040190565b6001600160401b038111610c1b5760051b60200190565b51906001600160a01b0382168203610a1d57565b9080601f83011215610a1d578151610f3a81610ef8565b92610f486040519485610c65565b81845260208085019260051b820101928311610a1d57602001905b828210610f705750505090565b60208091610f7d84610f0f565b815201910190610f63565b9080601f83011215610a1d578151610f9f81610ef8565b92610fad6040519485610c65565b81845260208085019260051b820101928311610a1d57602001905b828210610fd55750505090565b8151815260209182019101610fc8565b929192610ff182610cf0565b91610fff6040519384610c65565b829481845281830111610a1d578281602093845f96015e010152565b9080601f83011215610a1d578151610e1492602001610fe5565b602081830312610a1d578051906001600160401b038211610a1d570161012081830312610a1d576040519161012083018381106001600160401b03821117610c1b5760405281516001600160401b038111610a1d5781611096918401610f23565b835260208201516001600160401b038111610a1d57816110b7918401610f88565b602084015260408201516001600160401b038111610a1d57816110db918401610f23565b604084015260608201516001600160401b038111610a1d57816110ff918401610f88565b606084015260808201516001600160401b038111610a1d5781611123918401610f23565b608084015260a08201516001600160401b038111610a1d5781611147918401610f88565b60a084015260c08201516001600160401b038111610a1d578161116b918401610f88565b60c084015261117c60e08301610f0f565b60e08401526101008201516001600160401b038111610a1d5761119f920161101b565b61010082015290565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361126a576111dc81611d22565b15611264576111fc61012061120c92015160208082518301019101611035565b9160208082518301019101611035565b6112168183611b41565b9182611245575b8261122757505090565b61010091925081015160208151910120910151602081519101201490565b60e080820151908301516001600160a01b03908116911614925061121d565b50505f90565b635f9bd90760e11b5f5260045ffd5b51906001600160401b0382168203610a1d57565b51908115158203610a1d57565b602081830312610a1d578051906001600160401b038211610a1d570161014081830312610a1d57604051916112ce83610bff565b81518352602082015160208401526112e860408301611279565b60408401526112f960608301611279565b606084015261130a60808301611279565b608084015260a082015160a084015261132560c08301610f0f565b60c084015261133660e08301610f0f565b60e0840152611348610100830161128d565b6101008401526101208201516001600160401b038111610a1d5761136c920161101b565b61012082015290565b9035601e1982360301811215610a1d5701602081359101916001600160401b038211610a1d578160051b36038313610a1d57565b916020908281520191905f5b8181106113c25750505090565b909192602080600192838060a01b036113da88610cdc565b1681520194019291016113b5565b81835290916001600160fb1b038311610a1d5760209260051b809284830137010190565b9390926114198580611f9d565b6020870193915061142a8488611f9d565b91905003611a235760408601906114418288611f9d565b60608901949150611452858a611f9d565b91905003611a23576080880190611469828a611f9d565b60a08b0194915061147a858c611f9d565b91905014801590611a32575b611a23575f5b6114968b80611f9d565b90508110156115815761151960208c6114df846114d98d826114d26114cd6114be8880611f9d565b6001600160a01b039491611a56565b611fd2565b1694611f9d565b90611a56565b6040516323b872dd60e01b81526001600160a01b038e166004820152306024820152903560448201529283919082905f9082906064820190565b03925af1908115610a12575f91611548575b50156115395760010161148c565b632f35253160e01b5f5260045ffd5b90506020813d8211611579575b8161156260209383610c65565b81010312610a1d576115739061128d565b5f61152b565b3d9150611555565b5090919293949597895f5b6115968883611f9d565b9050811015611627576115bf816114d98b826115b86114cd6114be8f8a611f9d565b1695611f9d565b3591803b15610a1d576040516323b872dd60e01b81526001600160a01b038c16600482015230602482015260448101939093525f908390606490829084905af1918215610a1257600192611617575b50018a9061158c565b5f61162191610c65565b5f61160e565b5050909192939594975f9560c08b01965b611642878d611f9d565b90508110156116f757808c61167e826114d98c6116778f976114d98f61166f6114cd6114be85938c611f9d565b169988611f9d565b3594611f9d565b35833b15610a1d57604051637921219560e11b81526001600160a01b038e1660048201523060248201526044810192909252606482015260a060848201525f60a482018190529092839060c490829084905af1918215610a12576001926116e7575b5001611638565b5f6116f191610c65565b5f6116e0565b50919750959298949391976040519660208801602090526117188780611375565b60408a0161012090526101608a0190611730926113a9565b9061173b9088611375565b898303603f190160608b015261175192916113e8565b9061175c9087611375565b888303603f190160808a015261177292916113a9565b9061177d9086611375565b878303603f190160a089015261179392916113e8565b9061179e9085611375565b868303603f190160c08801526117b492916113a9565b906117bf9084611375565b858303603f190160e08701526117d592916113e8565b906117e09083611375565b848303603f19016101008601526117f792916113e8565b906001600160a01b0361180c60e08301610cdc565b16610120840152610100810135601e1982360301811215610a1d57016020813591016001600160401b038211610a1d578136038113610a1d5761188192826020938693603f1985850301610140860152818452858401375f848284010152601f8019910116010301601f198101835282610c65565b6040519360c08501908582106001600160401b03831117610c1b576001600160401b039160405260018060a01b031692838652166020850152600160408501525f606085015260808401525f60a084015260206040516118e081610c2f565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611981608083015160c060e4860152610124850190610d51565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1928315610a12575f936119ef575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d602011611a1b575b81611a0b60209383610c65565b81010312610a1d5751915f6119c7565b3d91506119fe565b63512509d360e11b5f5260045ffd5b50611a3d838b611f9d565b9050611a4c60c08c018c611f9d565b9190501415611486565b9190811015611a665760051b0190565b634e487b7160e01b5f52603260045260245ffd5b9190811015611a665760051b8101359061013e1981360301821215610a1d570190565b919290818103611b1e575f91345b828410611abd57505050505050600190565b611ac8848388611a56565b35818111611b0f57611adb858588611a7a565b30906001600160a01b0390611af29060e001611fd2565b1603611b045760019103930192611aab565b505050505050505f90565b63044044a560e21b5f5260045ffd5b63251f56a160e21b5f5260045ffd5b8051821015611a665760209160051b010190565b80515182515111611264575f5b825151811015611bc55781516001600160a01b0390611b6e908390611b2d565b511660018060a01b03611b82838651611b2d565b511614801590611ba0575b611b9957600101611b4e565b5050505f90565b50611baf816020840151611b2d565b51611bbe826020860151611b2d565b5111611b8d565b506040810191825151604082019081515111611d1a575f5b815151811015611c575784516001600160a01b0390611bfd908390611b2d565b511660018060a01b03611c11838551611b2d565b511614801590611c31575b611c2857600101611bdd565b50505050505f90565b50611c40816060860151611b2d565b51611c4f826060860151611b2d565b511415611c1c565b50509150608081019182515192608082019384515111611d1a575f5b845151811015611d105781516001600160a01b0390611c93908390611b2d565b511660018060a01b03611ca7838851611b2d565b511614801590611cea575b8015611cc5575b611c2857600101611c73565b50611cd48160c0860151611b2d565b51611ce38260c0860151611b2d565b5111611cb9565b50611cf98160a0860151611b2d565b51611d088260a0860151611b2d565b511415611cb2565b5050505050600190565b505050505f90565b6001600160401b036060820151168015159081611d73575b50611d6457608001516001600160401b0316611d5557600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611d3a565b905f5b82518051821015611e37575f906020906001600160a01b0390611da4908590611b2d565b51166044611db58584890151611b2d565b5160405163a9059cbb60e01b81526001600160a01b038816600482015260248101919091529384928391905af1908115610a12575f91611dfe575b501561153957600101611d80565b90506020813d8211611e2f575b81611e1860209383610c65565b81010312610a1d57611e299061128d565b5f611df0565b3d9150611e0b565b50509190915f5b60408401518051821015611ed7576001600160a01b0390611e60908390611b2d565b511690611e71816060870151611b2d565b5191803b15610a1d576040516323b872dd60e01b81523060048201526001600160a01b038516602482015260448101939093525f908390606490829084905af1918215610a1257600192611ec7575b5001611e3e565b5f611ed191610c65565b5f611ec0565b50505f5b60808401518051821015611f96576001600160a01b0390611efd908390611b2d565b511690611f0e8160a0870151611b2d565b51611f1d8260c0880151611b2d565b51833b15610a1d57604051637921219560e11b81523060048201526001600160a01b03861660248201526044810192909252606482015260a060848201525f60a482018190529092839060c490829084905af1918215610a1257600192611f86575b5001611edb565b5f611f9091610c65565b5f611f7f565b5050509050565b903590601e1981360301821215610a1d57018035906001600160401b038211610a1d57602001918160051b36038313610a1d57565b356001600160a01b0381168103610a1d5790565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015612130575b806d04ee2d6d415b85acef8100000000600a921015612115575b662386f26fc10000811015612101575b6305f5e1008110156120f0575b6127108110156120e1575b60648110156120d3575b10156120c8575b600a6021600184019361206d85610cf0565b9461207b6040519687610c65565b80865261208a601f1991610cf0565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156120c357600a9091612095565b505090565b60019091019061205b565b606460029104930192612054565b6127106004910493019261204a565b6305f5e1006008910493019261203f565b662386f26fc1000060109104930192612032565b6d04ee2d6d415b85acef810000000060209104930192612022565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104612008565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361218557565b634ca8886760e01b5f5260045ffdfea2646970667358221220ceed694b8c6ab2f81765baff23f6639c1c626ab2daea31eeaef1db7e8b0896c564736f6c634300081a0033",
    "sourceMap": "709:8858:78:-:0;;;;;;;;;;-1:-1:-1;709:8858:78;;;;;;;;;1183:12:6;;;1054:5;1183:12;709:8858:78;1054:5:6;1183:12;709:8858:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;709:8858:78;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;:::i;:::-;-1:-1:-1;;709:8858:78;;-1:-1:-1;;;709:8858:78;;;;;;;;;;;;;;1298:20:67;;709:8858:78;;;:::i;:::-;881:58:6;;:::i;:::-;1298:20:67;;:::i;:::-;709:8858:78;;-1:-1:-1;;;;;709:8858:78;;;1330:4:67;1298:37;709:8858:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;709:8858:78;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;:::i;:::-;-1:-1:-1;;709:8858:78;;-1:-1:-1;;;709:8858:78;;;;;;;;;;;;-1:-1:-1;;709:8858:78;;;;;;-1:-1:-1;;;6507:23:78;;709:8858;;;6507:23;;;709:8858;;;;6507:23;709:8858;6507:3;-1:-1:-1;;;;;709:8858:78;6507:23;;;;;;;;;;;709:8858;6563:26;-1:-1:-1;;;;;6563:26:78;;;709:8858;;6545:15;:44;6541:87;;6786:21;6691:16;6667:79;6691:16;;;;709:8858;;;;6667:79;;;;;;:::i;:::-;6786:21;;;;709:8858;-1:-1:-1;;;;;709:8858:78;;6786:21;:::i;:::-;709:8858;;;;;;;6541:87;-1:-1:-1;;;6610:18:78;;709:8858;;6610:18;6507:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;709:8858;;;;;;;;;;;;;1442:1461:6;709:8858:78;;;:::i;:::-;881:58:6;;;;;;:::i;:::-;1442:1461;:::i;:::-;709:8858:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;1710:44:67;;1735:18;709:8858:78;1710:44:67;;709:8858:78;;;1710:44:67;709:8858:78;;;;;;1710:14:67;709:8858:78;1710:44:67;;;;;;;;;;;709:8858:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;1710:44:67;;;;;;;;;;;;:::i;:::-;;;709:8858:78;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1710:44:67;;;709:8858:78;;;;1710:44:67;709:8858:78;;;;;;;;;;;;;;;;;-1:-1:-1;;709:8858:78;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1483:23:67;;709:8858:78;;;1483:23:67;;709:8858:78;;;1483:23:67;709:8858:78;;;;;;1483:3:67;709:8858:78;1483:23:67;;;;;;;;;;;709:8858:78;1520:18:67;709:8858:78;1520:18:67;;709:8858:78;1542:18:67;1520:40;1516:71;;709:8858:78;;;;;;;;;;;;;;:::i;1516:71:67:-;-1:-1:-1;;;1569:18:67;;709:8858:78;;1569:18:67;1483:23;;;;;;;;;;;;;;:::i;:::-;;;;;709:8858:78;;;;;;;;;;;;;;;;468:43:67;709:8858:78;;;;;;;;;;;;;;;;1055:104:4;;709:8858:78;;1089:6:4;1072:24;1089:6;1072:24;:::i;:::-;1120:6;;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;709:8858:78;;;;;;;;;;;;1055:104:4;;;709:8858:78;;;;-1:-1:-1;;;709:8858:78;;;;;;;;;;;;;;;;;-1:-1:-1;;;709:8858:78;;;;;;;;;;;;;;;;;;;;;1055:104:4;;;;;;;;;;:::i;:::-;709:8858:78;;;;;1055:104:4;709:8858:78;;1055:104:4;709:8858:78;;;;:::i;:::-;;;;;;;-1:-1:-1;;709:8858:78;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;709:8858:78;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;5367:62;709:8858;;;:::i;:::-;5406:10;;;;709:8858;;;5367:62;:::i;709:8858::-;;;;;;-1:-1:-1;;709:8858:78;;;;;;-1:-1:-1;;;5589:28:78;;709:8858;;;5589:28;;;709:8858;;;5589:3;-1:-1:-1;;;;;709:8858:78;;;-1:-1:-1;709:8858:78;;;;5589:28;;;;;;;709:8858;5589:28;;;709:8858;;;;;;;;5660:32;;709:8858;;;5660:32;;709:8858;;5660:32;709:8858;5660:32;;;;;;;;;709:8858;5660:32;;;709:8858;5708:25;;;;:::i;:::-;5707:26;5703:65;;5814:75;5838:12;;;;709:8858;;;;5814:75;;;;;;:::i;:::-;709:8858;;;;;;;;;5927:19;;709:8858;;6009:18;;;;709:8858;;;;;;;;;;;;;;5918:152;;709:8858;;5918:152;;709:8858;;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8858:78;;;;;;;:::i;:::-;;;;;;5918:152;;;;;;;;;709:8858;5918:152;;;709:8858;5917:153;;5900:208;;709:8858;;;;;;:::i;:::-;;;;;6229:48;;709:8858;;;;;;;:::i;:::-;6187:18;709:8858;;;6143:149;;709:8858;;;6119:183;;;;;709:8858;;;;;;;;;;;;;;;;6119:183;;709:8858;;6119:183;;709:8858;;;;;;;;;;;;;;6119:183;;;;;;;6349:21;6119:183;;;709:8858;-1:-1:-1;6349:21:78;;709:8858;-1:-1:-1;;;;;709:8858:78;;6349:21;:::i;6119:183::-;709:8858;6119:183;;;:::i;:::-;709:8858;6119:183;;;709:8858;;;;;;;;;6119:183;709:8858;;;5900:208;6088:20;;;709:8858;6088:20;709:8858;;6088:20;5918:152;;;709:8858;5918:152;;709:8858;5918:152;;;;;;709:8858;5918:152;;;:::i;:::-;;;709:8858;;;;;;;:::i;:::-;5918:152;;;;;;-1:-1:-1;5918:152:78;;5703:65;5742:26;;;709:8858;5742:26;709:8858;;5742:26;5660:32;;;;;;;709:8858;5660:32;;;;;;:::i;:::-;;;;;5589:28;;;;;;;709:8858;5589:28;;;;;;:::i;:::-;;;;;709:8858;;;;;;-1:-1:-1;;709:8858:78;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;-1:-1:-1;;709:8858:78;;;;;;;;;;;;;;;;;;9524:34;;;;9509:49;709:8858;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;:::o;:::-;;;;-1:-1:-1;709:8858:78;;;;;-1:-1:-1;709:8858:78;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;:::o;:::-;;;1055:104:4;;709:8858:78;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;709:8858:78;;;;;;:::o;:::-;;;-1:-1:-1;;;;;709:8858:78;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;709:8858:78;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;709:8858:78;;;;;;:::o;:::-;;;-1:-1:-1;;;;;709:8858:78;;;;;;:::o;:::-;-1:-1:-1;;;;;709:8858:78;;;;;;-1:-1:-1;;709:8858:78;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;709:8858:78;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;709:8858:78;;;;;;;;-1:-1:-1;;709:8858:78;;;;:::o;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;709:8858:78;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;709:8858:78;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;-1:-1:-1;;709:8858:78;;;;;;;:::o;:::-;-1:-1:-1;;;;;709:8858:78;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;709:8858:78;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;709:8858:78;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;:::i;:::-;;;;;;:::o;6842:642::-;7052:18;1006:16:66;;;709:8858:78;1006:26:66;1002:54;;1073:26;;;:::i;:::-;7025:46:78;7021:64;;7127:77;7151:14;7248:35;7151:14;;;1006:16:66;709:8858:78;;;7127:77;;;;;;:::i;:::-;709:8858;1006:16:66;709:8858:78;;;7248:35;;;;;;:::i;:::-;7313:38;;;;:::i;:::-;:91;;;;6842:642;7313:164;;;7294:183;;6842:642;:::o;7313:164::-;7430:14;;;;;;;1006:16:66;709:8858:78;;;;7420:25;7459:17;;;1006:16:66;709:8858:78;;;;7449:28;7420:57;6842:642;:::o;7313:91::-;7367:15;;;;709:8858;7386:18;;;709:8858;-1:-1:-1;;;;;709:8858:78;;;;;7367:37;;-1:-1:-1;7313:91:78;;7021:64;7073:12;;709:8858;7073:12;:::o;1002:54:66:-;1041:15;;;709:8858:78;1041:15:66;;709:8858:78;1041:15:66;709:8858:78;;;-1:-1:-1;;;;;709:8858:78;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;-1:-1:-1;709:8858:78;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;:::o;4467:750::-;;;;2080:16;;;;:::i;:::-;2107:17;;;;;-1:-1:-1;2107:17:78;;;;:::i;:::-;2080:51;;;;2076:97;;2187:17;;;;;;;;:::i;:::-;2215:19;;;;;-1:-1:-1;2215:19:78;;;;:::i;:::-;2187:54;;;;2183:100;;2310:18;;;;;;;;:::i;:::-;2339:20;;;;;-1:-1:-1;2339:20:78;;;;:::i;:::-;2310:56;;;;;;:127;;;4467:750;2293:183;;2645:1;2677:3;2652:16;;;;:::i;:::-;2648:27;;;;;;;2718:161;2107:17;2725:16;2841:20;2725:16;2841:17;2725:16;;:19;;:16;;;;:::i;:::-;-1:-1:-1;;;;;709:8858:78;;2725:19;:::i;:::-;;:::i;:::-;709:8858;2841:17;;:::i;:::-;:20;;:::i;:::-;2187:17;709:8858;-1:-1:-1;;;2718:161:78;;-1:-1:-1;;;;;709:8858:78;;2718:161;;;709:8858;2814:4;709:8858;;;;;;;;;;;;;;;;2645:1;;709:8858;;;;;;;2718:161;;;;;;;;;;2645:1;2718:161;;;2677:3;2717:162;;2696:222;;709:8858;;2636:10;;2696:222;2901:17;;;2645:1;2901:17;2718:161;2645:1;2901:17;2718:161;;;2107:17;2718:161;;;;;;;;;2107:17;2718:161;;;:::i;:::-;;;709:8858;;;;;;;:::i;:::-;2718:161;;;;;;-1:-1:-1;2718:161:78;;2648:27;;;;;;;;;2972:10;2645:1;3014:3;2988:17;;;;:::i;:::-;2984:28;;;;;;;3146:22;3041:17;3146:19;3041:17;;:20;;:17;;;;:::i;:20::-;709:8858;3146:19;;:::i;:22::-;709:8858;3033:149;;;;;;2187:17;709:8858;-1:-1:-1;;;3033:149:78;;-1:-1:-1;;;;;709:8858:78;;2718:161;3033:149;;709:8858;2814:4;709:8858;;;;;;;;;;;-1:-1:-1;;709:8858:78;;;;;;-1:-1:-1;;3033:149:78;;;;;;;709:8858;3033:149;;;3014:3;;709:8858;2972:10;;;;3033:149;2645:1;3033:149;;;:::i;:::-;;;;2984:28;;;;;;;;;;2645:1;3459:19;;;;3232:294;3280:3;3253:18;;;;:::i;:::-;3249:29;;;;;;;3308:18;;3459:22;3308:18;3459:19;3308:18;3418:23;3308:18;;3418:20;3308:18;:21;;:18;;;;;:::i;:21::-;709:8858;3418:20;;;:::i;:23::-;709:8858;3459:19;;:::i;:22::-;709:8858;3299:216;;;;;2187:17;709:8858;-1:-1:-1;;;3299:216:78;;-1:-1:-1;;;;;709:8858:78;;2718:161;3299:216;;709:8858;2814:4;709:8858;;;;;;;;;;;;;;;;;;;;-1:-1:-1;709:8858:78;;;;;;;;;;;;;;-1:-1:-1;;3299:216:78;;;;;;;709:8858;3299:216;;;3280:3;;709:8858;3237:10;;3299:216;2645:1;3299:216;;;:::i;:::-;;;;3249:29;;;;;;;;;;;;2187:17;709:8858;5078:16;2107:17;5078:16;;2107:17;709:8858;;;;;;:::i;:::-;2187:17;709:8858;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8858:78;2215:19;709:8858;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8858:78;2310:18;709:8858;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8858:78;2339:20;709:8858;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8858:78;3459:19;709:8858;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8858:78;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;-1:-1:-1;;709:8858:78;;;;;;;;;:::i;:::-;;-1:-1:-1;;;;;709:8858:78;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;2107:17;709:8858;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;5078:16;709:8858;;2107:17;709:8858;;;;;;;;;;;;;;;;;;;;2645:1;709:8858;;;;;;;1055:104:4;;709:8858:78;;;;5078:16;;1055:104:4;;5078:16:78;;;;;;:::i;:::-;2187:17;709:8858;;3459:19;709:8858;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;-1:-1:-1;;;;;709:8858:78;2187:17;709:8858;;;;;;;;;;;;2107:17;4856:287;;709:8858;;2187:17;4856:287;;709:8858;2645:1;2215:19;4856:287;;709:8858;2310:18;4856:287;;709:8858;2645:1;2339:20;4856:287;;709:8858;2107:17;2187;709:8858;;;;:::i;:::-;4814:18;709:8858;;4769:389;;;709:8858;;;2187:17;709:8858;;;;;;;;4745:423;;;2718:161;4745:423;;709:8858;;;;;;;2187:17;709:8858;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;2187:17;709:8858;;;;;;;;;2215:19;709:8858;;;;;;;2339:20;709:8858;2310:18;709:8858;;;3459:19;709:8858;;;;;;;;;:::i;:::-;;;;;;;;4745:423;709:8858;2645:1;4745:3;-1:-1:-1;;;;;709:8858:78;4745:423;;;;;;;2645:1;4745:423;;;3232:294;4738:430;;5183:27;2645:1;5183:27;;4467:750::o;4745:423::-;;;;2107:17;4745:423;;2107:17;4745:423;;;;;;2107:17;4745:423;;;:::i;:::-;;;709:8858;;;;;4745:423;;;;;;;-1:-1:-1;4745:423:78;;2293:183;2152:21;;;2080:16;2455:21;;2080:16;2455:21;2310:127;2382:18;;;;;:::i;:::-;2411:19;;;;;;;;:::i;:::-;2382:55;;;;;2310:127;;709:8858;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;3133:1460:6:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3884:10;;;;;;4575:11;;;;;;1489:1:0;3133:1460:6;:::o;3896:19::-;4037:9;;;;;:::i;:::-;709:8858:78;4064:22:6;;;4060:87;;4284:15;;;;;:::i;:::-;1330:4:67;;-1:-1:-1;;;;;709:8858:78;1298:20:67;;;;;:::i;:::-;709:8858:78;1298:37:67;4270:84:6;;1489:1:0;709:8858:78;;3896:19:6;709:8858:78;3869:13:6;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;3336:76;3386:15;;;;;;;;709:8858:78;;;;;;;;;;;;;;;:::o;7490:1374::-;7665:19;;709:8858;7694:18;;709:8858;-1:-1:-1;7661:84:78;;709:8858;7803:3;7776:18;;709:8858;7772:29;;;;;7843:19;;-1:-1:-1;;;;;709:8858:78;7843:22;;:19;;:22;:::i;:::-;709:8858;;;;;;;7869:21;:18;;;:21;:::i;:::-;709:8858;;7843:47;;;:115;;;7803:3;7822:163;;709:8858;;7760:10;;7822:163;7973:12;;;709:8858;7973:12;:::o;7843:115::-;7910:20;:23;:20;;;;;:23;:::i;:::-;709:8858;7936:22;:19;7910:20;7936:19;;;:22;:::i;:::-;709:8858;-1:-1:-1;7843:115:78;;7772:29;;8035:20;;;;;;709:8858;8035:20;8065:19;;;;;709:8858;-1:-1:-1;8031:86:78;;709:8858;8176:3;8148:19;;709:8858;8144:30;;;;;8216:20;;-1:-1:-1;;;;;709:8858:78;8216:23;;:20;;:23;:::i;:::-;709:8858;;;;;;;8243:22;:19;;;:22;:::i;:::-;709:8858;;8216:49;;;:122;;;8176:3;8195:170;;709:8858;;8132:10;;8195:170;8353:12;;;;;709:8858;8353:12;:::o;8216:122::-;8285:22;:25;:22;;;;;:25;:::i;:::-;709:8858;8314:24;:21;8285:22;8314:21;;;:24;:::i;:::-;709:8858;8285:53;;8216:122;;8144:30;;;;;8416:21;;;;;;709:8858;8447:20;8416:21;8447:20;;;;;709:8858;-1:-1:-1;8412:88:78;;709:8858;8560:3;8531:20;;709:8858;8527:31;;;;;8600:21;;-1:-1:-1;;;;;709:8858:78;8600:24;;:21;;:24;:::i;:::-;709:8858;;;;;;;8628:23;:20;;;:23;:::i;:::-;709:8858;;8600:51;;;:126;;;8560:3;8600:198;;;;8560:3;8579:246;;709:8858;;8515:10;;8600:198;8746:22;:25;:22;;;;;:25;:::i;:::-;709:8858;8774:24;:21;8746:22;8774:21;;;:24;:::i;:::-;709:8858;-1:-1:-1;8600:198:78;;:126;8671:23;:26;:23;;;;;:26;:::i;:::-;709:8858;8701:25;:22;8671:23;8701:22;;;:25;:::i;:::-;709:8858;8671:55;;8600:126;;8527:31;;;;;;709:8858;7490:1374;:::o;8412:88::-;8488:12;;;;709:8858;8488:12;:::o;606:258:66:-;-1:-1:-1;;;;;351:24:66;;;709:8858:78;;351:29:66;;;:87;;;;606:258;714:54;;;564:24;;709:8858:78;-1:-1:-1;;;;;709:8858:78;778:57:66;;853:4;606:258;:::o;778:57::-;815:20;;;-1:-1:-1;815:20:66;;-1:-1:-1;815:20:66;714:54;751:17;;;-1:-1:-1;751:17:66;;-1:-1:-1;751:17:66;351:87;423:15;;;-1:-1:-1;351:87:66;;;3538:923:78;;3691:1;3723:3;3698:16;;709:8858;;3694:27;;;;;3691:1;;3788:17;;-1:-1:-1;;;;;709:8858:78;3754:19;;709:8858;;3754:19;:::i;:::-;709:8858;;3747:62;3788:20;:17;;;;;:20;:::i;:::-;709:8858;;;-1:-1:-1;;;3747:62:78;;-1:-1:-1;;;;;709:8858:78;;3747:62;;;709:8858;;;;;;;;;;;;;;3747:62;;;;;;;3691:1;3747:62;;;3723:3;3746:63;;3742:109;;709:8858;;3682:10;;3747:62;;;3788:17;3747:62;;;;;;;;;3788:17;3747:62;;;:::i;:::-;;;709:8858;;;;;;;:::i;:::-;3747:62;;;;;;-1:-1:-1;3747:62:78;;3694:27;;;;;;3691:1;3947:3;709:8858;3921:17;;;709:8858;;3917:28;;;;;-1:-1:-1;;;;;709:8858:78;3974:20;;709:8858;;3974:20;:::i;:::-;709:8858;;4077:19;:22;:19;;;;;:22;:::i;:::-;709:8858;3966:147;;;;;;709:8858;;-1:-1:-1;;;3966:147:78;;4034:4;3747:62;3966:147;;709:8858;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;-1:-1:-1;;709:8858:78;;;;;;-1:-1:-1;;3966:147:78;;;;;;;709:8858;3966:147;;;3947:3;;709:8858;3905:10;;3966:147;3691:1;3966:147;;;:::i;:::-;;;;3917:28;;;3691:1;4211:3;4184:18;;;;709:8858;;4180:29;;;;;-1:-1:-1;;;;;709:8858:78;4239:21;;709:8858;;4239:21;:::i;:::-;709:8858;;4347:20;:23;:20;;;;;:23;:::i;:::-;709:8858;4388:22;:19;;;;;:22;:::i;:::-;709:8858;4230:214;;;;;709:8858;;-1:-1:-1;;;4230:214:78;;4034:4;3747:62;4230:214;;709:8858;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;709:8858:78;;;;;;;;;;;;;;-1:-1:-1;;4230:214:78;;;;;;;709:8858;4230:214;;;4211:3;;709:8858;4168:10;;4230:214;3691:1;4230:214;;;:::i;:::-;;;;4180:29;;;;;;3538:923::o;709:8858::-;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;709:8858:78;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;;;;709:8858:78;;;;;;;:::o;637:632:56:-;759:17;-1:-1:-1;25444:17:62;-1:-1:-1;;;25444:17:62;;;25440:103;;637:632:56;25560:17:62;25569:8;26140:7;25560:17;;;25556:103;;637:632:56;25685:8:62;25676:17;;;25672:103;;637:632:56;25801:7:62;25792:16;;;25788:100;;637:632:56;25914:7:62;25905:16;;;25901:100;;637:632:56;26027:7:62;26018:16;;;26014:100;;637:632:56;26131:16:62;;26127:66;;637:632:56;26140:7:62;874:92:56;779:1;709:8858:78;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:4;;709:8858:78;;:::i;:::-;;;;;;;874:92:56;;;979:247;-1:-1:-1;;709:8858:78;;-1:-1:-1;;;1033:111:56;;;;709:8858:78;1033:111:56;709:8858:78;1194:10:56;;1190:21;;26140:7:62;979:247:56;;;;1190:21;1206:5;;637:632;:::o;26127:66:62:-;26177:1;709:8858:78;;;;26127:66:62;;26014:100;26027:7;26098:1;709:8858:78;;;;26014:100:62;;;25901;25914:7;25985:1;709:8858:78;;;;25901:100:62;;;25788;25801:7;25872:1;709:8858:78;;;;25788:100:62;;;25672:103;25685:8;25758:2;709:8858:78;;;;25672:103:62;;;25556;25569:8;25642:2;709:8858:78;;;;25556:103:62;;;25440;-1:-1:-1;25526:2:62;;-1:-1:-1;;;;709:8858:78;;25440:103:62;;6040:128:6;6109:4;-1:-1:-1;;;;;709:8858:78;6087:10:6;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;",
    "linkReferences": {},
    "immutableReferences": {
      "446": [
        {
          "start": 1656,
          "length": 32
        }
      ],
      "448": [
        {
          "start": 1700,
          "length": 32
        }
      ],
      "450": [
        {
          "start": 1743,
          "length": 32
        }
      ],
      "588": [
        {
          "start": 8533,
          "length": 32
        }
      ],
      "50376": [
        {
          "start": 964,
          "length": 32
        }
      ],
      "50379": [
        {
          "start": 607,
          "length": 32
        },
        {
          "start": 1407,
          "length": 32
        },
        {
          "start": 2131,
          "length": 32
        },
        {
          "start": 6543,
          "length": 32
        }
      ],
      "50381": [
        {
          "start": 914,
          "length": 32
        },
        {
          "start": 1463,
          "length": 32
        },
        {
          "start": 1588,
          "length": 32
        },
        {
          "start": 2430,
          "length": 32
        },
        {
          "start": 4522,
          "length": 32
        },
        {
          "start": 6370,
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
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ArrayLengthMismatch\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidSchema\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidTransfer\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromStatement\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"payment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowClaimed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"payment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"collectExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_payment\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectPayment\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getStatement\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"internalType\":\"struct TokenBundleEscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"makeStatement\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"internalType\":\"struct TokenBundleEscrowObligation.StatementData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"makeStatementFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155BatchReceived\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"supportsInterface(bytes4)\":{\"details\":\"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Statements/TokenBundleEscrowObligation.sol\":\"TokenBundleEscrowObligation\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746\",\"dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce\",\"dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009\",\"dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827\",\"dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265\",\"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147\",\"dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Statements/TokenBundleEscrowObligation.sol\":{\"keccak256\":\"0xbb9ceb55b9e49d108b72f6847c5b2b54cf45310378eef2825b578a2413d1c5ce\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ee89c95aa87b59e79b2e7a71e5c009d13d57e73b3fc22098698120b7323d5b70\",\"dweb:/ipfs/QmRdEEtdPThncGh3m3EwjM7vUSmQoGeXzehsdu48LYJfVc\"]}},\"version\":1}",
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
        "keccak256": "0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57",
        "urls": [
          "bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147",
          "dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q"
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
        "keccak256": "0xbb9ceb55b9e49d108b72f6847c5b2b54cf45310378eef2825b578a2413d1c5ce",
        "urls": [
          "bzz-raw://ee89c95aa87b59e79b2e7a71e5c009d13d57e73b3fc22098698120b7323d5b70",
          "dweb:/ipfs/QmRdEEtdPThncGh3m3EwjM7vUSmQoGeXzehsdu48LYJfVc"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 78
} as const;