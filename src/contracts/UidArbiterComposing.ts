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
          "internalType": "struct UidArbiter.DemandData",
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
              "name": "uid",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "error",
      "name": "UidMismatched",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x608080604052346015576105db908161001a8239f35b5f80fdfe6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d914610398575063e6c9714d14610032575f80fd5b3461035e57606036600319011261035e576004356001600160401b03811161035e57610140600319823603011261035e576040519061014082018281106001600160401b0382111761038457604052806004013582526024810135602083015261009e6044820161051c565b604083019081526100b16064830161051c565b90606084019182526100c56084840161051c565b936080810194855260a081019060a485013582526100e560c48601610530565b9460c082019586526100f960e48201610530565b9060e08301918252610104810135801515810361035e57610100840152610124810135906001600160401b03821161035e57600461013a923692010161055f565b6101208301526024356001600160401b03811161035e5761015f90369060040161055f565b9586518701602081019760208183031261035e576020810151916001600160401b03831161035e5760608284019091031261035e57604051916101a1836104e0565b818101602001516001600160a01b038116810361035e57835260408183010151916001600160401b03831161035e57603f8183018401018b131561035e576020838383010101516101f181610544565b9b6101ff6040519d8e6104fb565b818d52604083850186018301011161035e576020815f928e83808060609a8a8a0101010191015e8d010152602084019a8b520101518060408301528451036103755751965160405163e6c9714d60e01b815260606004820152845160648201526020850151608482015295516001600160401b0390811660a48801529651871660c4870152975190951660e4850152915161010484015292516001600160a01b039081166101248401529051811661014483015261010083015115156101648301526101209092015161014061018483015290939190921691839182916102eb906101a48401906104bc565b828103600319016024840152610300916104bc565b604435604483015203815a93602094fa801561036a575f9061032a575b6020906040519015158152f35b506020813d602011610362575b81610344602093836104fb565b8101031261035e5751801515810361035e5760209061031d565b5f80fd5b3d9150610337565b6040513d5f823e3d90fd5b633f51589560e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b3461035e57602036600319011261035e57600435906001600160401b03821161035e573660238301121561035e5781600401356001600160401b03811161035e57820191602483019136831161035e576040816103f55f936104e0565b8281526060602082015201526020602319602483860301011261035e576024810135906001600160401b03821161035e5701916060908390031261035e5760405190610440826104e0565b61044c60248401610530565b82526044830135906001600160401b03821161035e5760246104709285010161055f565b916020820192835260646040830191013581526104b16040519384936020855260018060a01b039051166020850152516060604085015260808401906104bc565b905160608301520390f35b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b606081019081106001600160401b0382111761038457604052565b90601f801991011681019081106001600160401b0382111761038457604052565b35906001600160401b038216820361035e57565b35906001600160a01b038216820361035e57565b6001600160401b03811161038457601f01601f191660200190565b81601f8201121561035e5780359061057682610544565b9261058460405194856104fb565b8284526020838301011161035e57815f92602080930183860137830101529056fea26469706673582212200756ee1cb0fb33506dc8ad9d8d12a414e7640d7408fa71e0d3db8eb8c8b2885d64736f6c634300081b0033",
    "sourceMap": "215:869:80:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d914610398575063e6c9714d14610032575f80fd5b3461035e57606036600319011261035e576004356001600160401b03811161035e57610140600319823603011261035e576040519061014082018281106001600160401b0382111761038457604052806004013582526024810135602083015261009e6044820161051c565b604083019081526100b16064830161051c565b90606084019182526100c56084840161051c565b936080810194855260a081019060a485013582526100e560c48601610530565b9460c082019586526100f960e48201610530565b9060e08301918252610104810135801515810361035e57610100840152610124810135906001600160401b03821161035e57600461013a923692010161055f565b6101208301526024356001600160401b03811161035e5761015f90369060040161055f565b9586518701602081019760208183031261035e576020810151916001600160401b03831161035e5760608284019091031261035e57604051916101a1836104e0565b818101602001516001600160a01b038116810361035e57835260408183010151916001600160401b03831161035e57603f8183018401018b131561035e576020838383010101516101f181610544565b9b6101ff6040519d8e6104fb565b818d52604083850186018301011161035e576020815f928e83808060609a8a8a0101010191015e8d010152602084019a8b520101518060408301528451036103755751965160405163e6c9714d60e01b815260606004820152845160648201526020850151608482015295516001600160401b0390811660a48801529651871660c4870152975190951660e4850152915161010484015292516001600160a01b039081166101248401529051811661014483015261010083015115156101648301526101209092015161014061018483015290939190921691839182916102eb906101a48401906104bc565b828103600319016024840152610300916104bc565b604435604483015203815a93602094fa801561036a575f9061032a575b6020906040519015158152f35b506020813d602011610362575b81610344602093836104fb565b8101031261035e5751801515810361035e5760209061031d565b5f80fd5b3d9150610337565b6040513d5f823e3d90fd5b633f51589560e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b3461035e57602036600319011261035e57600435906001600160401b03821161035e573660238301121561035e5781600401356001600160401b03811161035e57820191602483019136831161035e576040816103f55f936104e0565b8281526060602082015201526020602319602483860301011261035e576024810135906001600160401b03821161035e5701916060908390031261035e5760405190610440826104e0565b61044c60248401610530565b82526044830135906001600160401b03821161035e5760246104709285010161055f565b916020820192835260646040830191013581526104b16040519384936020855260018060a01b039051166020850152516060604085015260808401906104bc565b905160608301520390f35b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b606081019081106001600160401b0382111761038457604052565b90601f801991011681019081106001600160401b0382111761038457604052565b35906001600160401b038216820361035e57565b35906001600160a01b038216820361035e57565b6001600160401b03811161038457601f01601f191660200190565b81601f8201121561035e5780359061057682610544565b9261058460405194856104fb565b8284526020838301011161035e57815f92602080930183860137830101529056fea26469706673582212200756ee1cb0fb33506dc8ad9d8d12a414e7640d7408fa71e0d3db8eb8c8b2885d64736f6c634300081b0033",
    "sourceMap": "215:869:80:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:869:80;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;:::i;:::-;;;;632:32;;215:869;632:32;;215:869;;;;;;;;;632:32;;215:869;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;-1:-1:-1;215:869:80;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;678:29;674:57;;215:869;852:18;;215:869;;-1:-1:-1;;;761:153:80;;215:869;;761:153;;215:869;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;215:869:80;;;;;;;;:::i;:::-;;;;;;;761:153;;;;215:869;761:153;;;;;;215:869;761:153;;;215:869;;;;;;;;;;;761:153;;215:869;761:153;;215:869;761:153;;;;;;215:869;761:153;;;:::i;:::-;;;215:869;;;;;;;;;;;;;761:153;;;215:869;;;;761:153;;;-1:-1:-1;761:153:80;;;215:869;;;;;;;;;674:57;716:15;;;215:869;716:15;215:869;;716:15;215:869;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:869:80;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;215:869:80;;;;;;;;-1:-1:-1;;215:869:80;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;215:869:80;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:869:80;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:869:80;;;;;;:::o;:::-;-1:-1:-1;;;;;215:869:80;;;;;;-1:-1:-1;;215:869:80;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;215:869:80;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"UidMismatched\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"counteroffer\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"baseArbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"baseDemand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"internalType\":\"struct UidArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/attestation-properties/composing/UidArbiter.sol\":\"UidArbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12\",\"dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038\",\"dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff\"]},\"src/arbiters/attestation-properties/composing/UidArbiter.sol\":{\"keccak256\":\"0x34986c24fb7679718e81c8ad472bce03d3954c68e3c7d870e75286b8141dd609\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3924906f9a79d80a3917eb675ad517940347b9a609c8985c197289b618d55c0e\",\"dweb:/ipfs/QmfZ285e3rTv4qWqzi3xHeyhPFVxrp2ontcWBFuZWgPd49\"]}},\"version\":1}",
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
          "name": "UidMismatched"
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
              "internalType": "struct UidArbiter.DemandData",
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
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
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
        "src/arbiters/attestation-properties/composing/UidArbiter.sol": "UidArbiter"
      },
      "evmVersion": "prague",
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
      "src/arbiters/attestation-properties/composing/UidArbiter.sol": {
        "keccak256": "0x34986c24fb7679718e81c8ad472bce03d3954c68e3c7d870e75286b8141dd609",
        "urls": [
          "bzz-raw://3924906f9a79d80a3917eb675ad517940347b9a609c8985c197289b618d55c0e",
          "dweb:/ipfs/QmfZ285e3rTv4qWqzi3xHeyhPFVxrp2ontcWBFuZWgPd49"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 80
} as const;