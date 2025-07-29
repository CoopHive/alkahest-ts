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
          "internalType": "struct AttesterArbiter.DemandData",
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
              "name": "attester",
              "type": "address",
              "internalType": "address"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "error",
      "name": "AttesterMismatched",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60808060405234601557610610908161001a8239f35b5f80fdfe6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d9146103a8575063e6c9714d14610032575f80fd5b3461036e57606036600319011261036e576004356001600160401b03811161036e57610140600319823603011261036e576040519061014082018281106001600160401b0382111761039457604052806004013582526024810135602083015261009e6044820161053d565b604083019081526100b16064830161053d565b90606084019182526100c56084840161053d565b936080810194855260a081019060a485013582526100e560c48601610551565b9460c082019586526100f960e48201610551565b60e0830152610104810135801515810361036e57610100830152610124810135906001600160401b03821161036e5760046101379236920101610580565b6101208201526024356001600160401b03811161036e5761015c903690600401610580565b9485518601602081019660208183031261036e576020810151916001600160401b03831161036e5760608284019091031261036e576040519161019e83610501565b6101ac6020828401016105c6565b835260408183010151906001600160401b03821161036e57603f8382018301018a131561036e57602082828501010151926101e684610565565b9a6101f46040519c8d61051c565b848c52604082840185018601011161036e575f602085610230968e83808060609a8a8a0101010191015e8d010152602085019a8b5201016105c6565b6040820181905260e08401516001600160a01b039081169116036103855751955160405163e6c9714d60e01b815260606004820152835160648201526020840151608482015294516001600160401b0390811660a48701529551861660c4860152965190941660e4840152905161010483015291516001600160a01b0390811661012483015260e0830151811661014483015261010083015115156101648301526101209092015161014061018483015290939190921691839182916102fb906101a48401906104dd565b828103600319016024840152610310916104dd565b604435604483015203815a93602094fa801561037a575f9061033a575b6020906040519015158152f35b506020813d602011610372575b816103546020938361051c565b8101031261036e5751801515810361036e5760209061032d565b5f80fd5b3d9150610347565b6040513d5f823e3d90fd5b63c77ead7160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b3461036e57602036600319011261036e57600435906001600160401b03821161036e573660238301121561036e5781600401356001600160401b03811161036e57820191602483019136831161036e576040816104055f93610501565b8281526060602082015201526020602319602483860301011261036e576024810135906001600160401b03821161036e5701916060908390031261036e576040519061045082610501565b61045c60248401610551565b82526044830135906001600160401b03821161036e57610486606491602461049494870101610580565b936020840194855201610551565b604082019081526104c96040519384936020855260018060a01b039051166020850152516060604085015260808401906104dd565b90516001600160a01b031660608301520390f35b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b606081019081106001600160401b0382111761039457604052565b90601f801991011681019081106001600160401b0382111761039457604052565b35906001600160401b038216820361036e57565b35906001600160a01b038216820361036e57565b6001600160401b03811161039457601f01601f191660200190565b81601f8201121561036e5780359061059782610565565b926105a5604051948561051c565b8284526020838301011161036e57815f926020809301838601378301015290565b51906001600160a01b038216820361036e5756fea26469706673582212208fc4b2fc13e896f72075ecb9ce59f520383d658bcf5b5237ce87f93e49359dc764736f6c634300081b0033",
    "sourceMap": "215:899:87:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d9146103a8575063e6c9714d14610032575f80fd5b3461036e57606036600319011261036e576004356001600160401b03811161036e57610140600319823603011261036e576040519061014082018281106001600160401b0382111761039457604052806004013582526024810135602083015261009e6044820161053d565b604083019081526100b16064830161053d565b90606084019182526100c56084840161053d565b936080810194855260a081019060a485013582526100e560c48601610551565b9460c082019586526100f960e48201610551565b60e0830152610104810135801515810361036e57610100830152610124810135906001600160401b03821161036e5760046101379236920101610580565b6101208201526024356001600160401b03811161036e5761015c903690600401610580565b9485518601602081019660208183031261036e576020810151916001600160401b03831161036e5760608284019091031261036e576040519161019e83610501565b6101ac6020828401016105c6565b835260408183010151906001600160401b03821161036e57603f8382018301018a131561036e57602082828501010151926101e684610565565b9a6101f46040519c8d61051c565b848c52604082840185018601011161036e575f602085610230968e83808060609a8a8a0101010191015e8d010152602085019a8b5201016105c6565b6040820181905260e08401516001600160a01b039081169116036103855751955160405163e6c9714d60e01b815260606004820152835160648201526020840151608482015294516001600160401b0390811660a48701529551861660c4860152965190941660e4840152905161010483015291516001600160a01b0390811661012483015260e0830151811661014483015261010083015115156101648301526101209092015161014061018483015290939190921691839182916102fb906101a48401906104dd565b828103600319016024840152610310916104dd565b604435604483015203815a93602094fa801561037a575f9061033a575b6020906040519015158152f35b506020813d602011610372575b816103546020938361051c565b8101031261036e5751801515810361036e5760209061032d565b5f80fd5b3d9150610347565b6040513d5f823e3d90fd5b63c77ead7160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b3461036e57602036600319011261036e57600435906001600160401b03821161036e573660238301121561036e5781600401356001600160401b03811161036e57820191602483019136831161036e576040816104055f93610501565b8281526060602082015201526020602319602483860301011261036e576024810135906001600160401b03821161036e5701916060908390031261036e576040519061045082610501565b61045c60248401610551565b82526044830135906001600160401b03821161036e57610486606491602461049494870101610580565b936020840194855201610551565b604082019081526104c96040519384936020855260018060a01b039051166020850152516060604085015260808401906104dd565b90516001600160a01b031660608301520390f35b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b606081019081106001600160401b0382111761039457604052565b90601f801991011681019081106001600160401b0382111761039457604052565b35906001600160401b038216820361036e57565b35906001600160a01b038216820361036e57565b6001600160401b03811161039457601f01601f191660200190565b81601f8201121561036e5780359061059782610565565b926105a5604051948561051c565b8284526020838301011161036e57815f926020809301838601378301015290565b51906001600160a01b038216820361036e5756fea26469706673582212208fc4b2fc13e896f72075ecb9ce59f520383d658bcf5b5237ce87f93e49359dc764736f6c634300081b0033",
    "sourceMap": "215:899:87:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:899:87;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;:::i;:::-;;;;647:32;;215:899;647:32;;215:899;;;;;;;;;647:32;;215:899;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;-1:-1:-1;215:899:87;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;693:39;689:72;;215:899;882:18;;215:899;;-1:-1:-1;;;791:153:87;;215:899;;791:153;;215:899;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;215:899:87;;;;;;;;:::i;:::-;;;;;;;791:153;;;;215:899;791:153;;;;;;215:899;791:153;;;215:899;;;;;;;;;;;791:153;;215:899;791:153;;215:899;791:153;;;;;;215:899;791:153;;;:::i;:::-;;;215:899;;;;;;;;;;;;;791:153;;;215:899;;;;791:153;;;-1:-1:-1;791:153:87;;;215:899;;;;;;;;;689:72;741:20;;;215:899;741:20;215:899;;741:20;215:899;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:899:87;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;215:899:87;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;215:899:87;;;;;;;;-1:-1:-1;;215:899:87;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;215:899:87;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:899:87;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:899:87;;;;;;:::o;:::-;-1:-1:-1;;;;;215:899:87;;;;;;-1:-1:-1;;215:899:87;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;215:899:87;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:899:87;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"AttesterMismatched\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"counteroffer\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"baseArbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"baseDemand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"}],\"internalType\":\"struct AttesterArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/attestation-properties/composing/AttesterArbiter.sol\":\"AttesterArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12\",\"dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038\",\"dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff\"]},\"src/arbiters/attestation-properties/composing/AttesterArbiter.sol\":{\"keccak256\":\"0x8c102296de0ab060ab5127c66d10ebb2933987450c40bc590a714174c4174ebb\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://44363de050d8b8fd160f71b1d06b9e37af9e429efd05e4f700bd219cf9d1886a\",\"dweb:/ipfs/QmcW58xfVNwDZ8SCDwagFyo6ospq2dVaDDzBAXPyrNxUXu\"]}},\"version\":1}",
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
          "name": "AttesterMismatched"
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
              "internalType": "struct AttesterArbiter.DemandData",
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
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
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
        "src/arbiters/attestation-properties/composing/AttesterArbiter.sol": "AttesterArbiter"
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
      "src/arbiters/attestation-properties/composing/AttesterArbiter.sol": {
        "keccak256": "0x8c102296de0ab060ab5127c66d10ebb2933987450c40bc590a714174c4174ebb",
        "urls": [
          "bzz-raw://44363de050d8b8fd160f71b1d06b9e37af9e429efd05e4f700bd219cf9d1886a",
          "dweb:/ipfs/QmcW58xfVNwDZ8SCDwagFyo6ospq2dVaDDzBAXPyrNxUXu"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 87
} as const;