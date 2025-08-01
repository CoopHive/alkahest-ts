export const abi = {
  "abi": [
    {
      "type": "function",
      "name": "checkObligation",
      "inputs": [
        {
          "name": "obligation",
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
          "name": "counteroffer",
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
          "internalType": "struct TimeAfterArbiter.DemandData",
          "components": [
            {
              "name": "baseArbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "baseDemand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "time",
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
      "name": "TimeNotAfter",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60808060405234601557610606908161001a8239f35b5f80fdfe6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d9146103b2575063e6c9714d14610032575f80fd5b34610378576060366003190112610378576004356001600160401b038111610378576101406003198236030112610378576040519061014082018281106001600160401b0382111761039e57604052806004013582526024810135602083015261009e60448201610547565b604083019081526100b160648301610547565b90606084019182526100c560848401610547565b936080810194855260a081019060a485013582526100e560c4860161055b565b9460c082019586526100f960e4820161055b565b9060e08301918252610104810135801515810361037857610100840152610124810135906001600160401b03821161037857600461013a923692010161058a565b6101208301526024356001600160401b0381116103785761015f90369060040161058a565b95865187016020810197602081830312610378576020810151916001600160401b0383116103785760608284019091031261037857604051916101a18361050b565b818101602001516001600160a01b038116810361037857835260408183010151916001600160401b03831161037857603f8183018401018b1315610378576020838383010101516101f18161056f565b9b6101ff6040519d8e610526565b818d526040838501860183010111610378576020815f928e83808060609a8a8a0101010191015e8d010152602084019a8b520101516001600160401b038116908181036103785760408301526001600160401b038751161061038f5751965160405163e6c9714d60e01b815260606004820152845160648201526020850151608482015295516001600160401b0390811660a48801529651871660c4870152975190951660e4850152915161010484015292516001600160a01b03908116610124840152905181166101448301526101008301511515610164830152610120909201516101406101848301529093919092169183918291610305906101a48401906104e7565b82810360031901602484015261031a916104e7565b604435604483015203815a93602094fa8015610384575f90610344575b6020906040519015158152f35b506020813d60201161037c575b8161035e60209383610526565b810103126103785751801515810361037857602090610337565b5f80fd5b3d9150610351565b6040513d5f823e3d90fd5b633fed642d60e21b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b3461037857602036600319011261037857600435906001600160401b03821161037857366023830112156103785781600401356001600160401b0381116103785782019160248301913683116103785760408161040f5f9361050b565b82815260606020820152015260206023196024838603010112610378576024810135906001600160401b03821161037857019160609083900312610378576040519061045a8261050b565b6104666024840161055b565b82526044830135906001600160401b03821161037857610490606491602461049e9487010161058a565b936020840194855201610547565b604082019081526001600160401b036104db6040519485946020865260018060a01b039051166020860152516060604086015260808501906104e7565b91511660608301520390f35b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b606081019081106001600160401b0382111761039e57604052565b90601f801991011681019081106001600160401b0382111761039e57604052565b35906001600160401b038216820361037857565b35906001600160a01b038216820361037857565b6001600160401b03811161039e57601f01601f191660200190565b81601f82011215610378578035906105a18261056f565b926105af6040519485610526565b8284526020838301011161037857815f92602080930183860137830101529056fea26469706673582212209781c6fbf84b64c610d2ab1b8a2e2fa60af08e616b07a5df6fe0b96e1385171664736f6c634300081b0033",
    "sourceMap": "215:874:95:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d9146103b2575063e6c9714d14610032575f80fd5b34610378576060366003190112610378576004356001600160401b038111610378576101406003198236030112610378576040519061014082018281106001600160401b0382111761039e57604052806004013582526024810135602083015261009e60448201610547565b604083019081526100b160648301610547565b90606084019182526100c560848401610547565b936080810194855260a081019060a485013582526100e560c4860161055b565b9460c082019586526100f960e4820161055b565b9060e08301918252610104810135801515810361037857610100840152610124810135906001600160401b03821161037857600461013a923692010161058a565b6101208301526024356001600160401b0381116103785761015f90369060040161058a565b95865187016020810197602081830312610378576020810151916001600160401b0383116103785760608284019091031261037857604051916101a18361050b565b818101602001516001600160a01b038116810361037857835260408183010151916001600160401b03831161037857603f8183018401018b1315610378576020838383010101516101f18161056f565b9b6101ff6040519d8e610526565b818d526040838501860183010111610378576020815f928e83808060609a8a8a0101010191015e8d010152602084019a8b520101516001600160401b038116908181036103785760408301526001600160401b038751161061038f5751965160405163e6c9714d60e01b815260606004820152845160648201526020850151608482015295516001600160401b0390811660a48801529651871660c4870152975190951660e4850152915161010484015292516001600160a01b03908116610124840152905181166101448301526101008301511515610164830152610120909201516101406101848301529093919092169183918291610305906101a48401906104e7565b82810360031901602484015261031a916104e7565b604435604483015203815a93602094fa8015610384575f90610344575b6020906040519015158152f35b506020813d60201161037c575b8161035e60209383610526565b810103126103785751801515810361037857602090610337565b5f80fd5b3d9150610351565b6040513d5f823e3d90fd5b633fed642d60e21b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b3461037857602036600319011261037857600435906001600160401b03821161037857366023830112156103785781600401356001600160401b0381116103785782019160248301913683116103785760408161040f5f9361050b565b82815260606020820152015260206023196024838603010112610378576024810135906001600160401b03821161037857019160609083900312610378576040519061045a8261050b565b6104666024840161055b565b82526044830135906001600160401b03821161037857610490606491602461049e9487010161058a565b936020840194855201610547565b604082019081526001600160401b036104db6040519485946020865260018060a01b039051166020860152516060604086015260808501906104e7565b91511660608301520390f35b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b606081019081106001600160401b0382111761039e57604052565b90601f801991011681019081106001600160401b0382111761039e57604052565b35906001600160401b038216820361037857565b35906001600160a01b038216820361037857565b6001600160401b03811161039e57601f01601f191660200190565b81601f82011215610378578035906105a18261056f565b926105af6040519485610526565b8284526020838301011161037857815f92602080930183860137830101529056fea26469706673582212209781c6fbf84b64c610d2ab1b8a2e2fa60af08e616b07a5df6fe0b96e1385171664736f6c634300081b0033",
    "sourceMap": "215:874:95:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:874:95;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;:::i;:::-;;;;637:32;;215:874;637:32;;215:874;;;;;;;;;637:32;;215:874;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;-1:-1:-1;215:874:95;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;683:30;679:57;;215:874;857:18;;215:874;;-1:-1:-1;;;766:153:95;;215:874;;766:153;;215:874;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;215:874:95;;;;;;;;:::i;:::-;;;;;;;766:153;;;;215:874;766:153;;;;;;215:874;766:153;;;215:874;;;;;;;;;;;766:153;;215:874;766:153;;215:874;766:153;;;;;;215:874;766:153;;;:::i;:::-;;;215:874;;;;;;;;;;;;;766:153;;;215:874;;;;766:153;;;-1:-1:-1;766:153:95;;;215:874;;;;;;;;;679:57;722:14;;;215:874;722:14;215:874;;722:14;215:874;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:874:95;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;215:874:95;;;;;;;;-1:-1:-1;;215:874:95;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;215:874:95;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:874:95;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:874:95;;;;;;:::o;:::-;-1:-1:-1;;;;;215:874:95;;;;;;-1:-1:-1;;215:874:95;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;215:874:95;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"TimeNotAfter\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"counteroffer\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"baseArbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"baseDemand\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"}],\"internalType\":\"struct TimeAfterArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/attestation-properties/composing/TimeAfterArbiter.sol\":\"TimeAfterArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12\",\"dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038\",\"dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff\"]},\"src/arbiters/attestation-properties/composing/TimeAfterArbiter.sol\":{\"keccak256\":\"0x9148b3e751c9a47918f39fd898cd38453dbed263298ab19d5d112537686baa03\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://63ffa47a92f308bc2175910ec5b3b0593ec69e2933d2eb016f9089bbdb7e11a3\",\"dweb:/ipfs/QmeLEGhsmCwmB28merJpy5SkkciZNFvUQ8pFvCgvnDcmVd\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.27+commit.40a35a09"
    },
    "language": "Solidity",
    "output": {
      "abi": [
        {
          "inputs": [],
          "type": "error",
          "name": "TimeNotAfter"
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation",
              "name": "obligation",
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
              "name": "counteroffer",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "checkObligation",
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
          "name": "decodeDemandData",
          "outputs": [
            {
              "internalType": "struct TimeAfterArbiter.DemandData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "baseArbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "baseDemand",
                  "type": "bytes"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                }
              ]
            }
          ]
        }
      ],
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
        "src/arbiters/attestation-properties/composing/TimeAfterArbiter.sol": "TimeAfterArbiter"
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
      "src/ArbiterUtils.sol": {
        "keccak256": "0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab",
        "urls": [
          "bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12",
          "dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab",
        "urls": [
          "bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038",
          "dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff"
        ],
        "license": "UNLICENSED"
      },
      "src/arbiters/attestation-properties/composing/TimeAfterArbiter.sol": {
        "keccak256": "0x9148b3e751c9a47918f39fd898cd38453dbed263298ab19d5d112537686baa03",
        "urls": [
          "bzz-raw://63ffa47a92f308bc2175910ec5b3b0593ec69e2933d2eb016f9089bbdb7e11a3",
          "dweb:/ipfs/QmeLEGhsmCwmB28merJpy5SkkciZNFvUQ8pFvCgvnDcmVd"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 95
} as const;