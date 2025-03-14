export const abi = {
  "abi": [
    {
      "type": "function",
      "name": "arbitrate",
      "inputs": [
        {
          "name": "statement",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "decision",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
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
      "type": "event",
      "name": "ArbitrationMade",
      "inputs": [
        {
          "name": "oracle",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "statement",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "decision",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    }
  ],
  "bytecode": {
    "object": "0x6080806040523460155761030b908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c80631272ff8b146100a457638c08667e1461002f575f80fd5b346100a05760403660031901126100a0576004356024358015158091036100a057335f525f60205260405f20825f5260205260405f2060ff1981541660ff83161790556040519081527f9346ce217f0c6f917b386e18e80c7cdd51b3f0ae86b7f48f79a0114ebfa9455d60203392a3005b5f80fd5b346100a05760603660031901126100a05760043567ffffffffffffffff81116100a05761014060031982360301126100a05760405190610140820182811067ffffffffffffffff82111761023057604052806004013582526024810135602083015261011260448201610244565b604083015261012360648201610244565b606083015261013460848201610244565b608083015260a481013560a083015261014f60c48201610259565b60c083015261016060e48201610259565b60e083015261010481013580151581036100a0576101008301526101248101359067ffffffffffffffff82116100a057600461019f923692010161026d565b61012082015260243567ffffffffffffffff81116100a0576101c590369060040161026d565b6020818051810103126100a05760405190602082019082821067ffffffffffffffff83111761023057604091909152602001516001600160a01b038116918282036100a057525f525f60205260405f2090515f52602052602060ff60405f2054166040519015158152f35b634e487b7160e01b5f52604160045260245ffd5b359067ffffffffffffffff821682036100a057565b35906001600160a01b03821682036100a057565b81601f820112156100a05780359067ffffffffffffffff82116102305760405192601f8301601f19908116603f0116840167ffffffffffffffff81118582101761023057604052828452602083830101116100a057815f92602080930183860137830101529056fea2646970667358221220073a9c1fa5c8130a4f5d43c53dcdbccf65733d621351a98742750aa9d834a3d164736f6c634300081b0033",
    "sourceMap": "203:821:83:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c80631272ff8b146100a457638c08667e1461002f575f80fd5b346100a05760403660031901126100a0576004356024358015158091036100a057335f525f60205260405f20825f5260205260405f2060ff1981541660ff83161790556040519081527f9346ce217f0c6f917b386e18e80c7cdd51b3f0ae86b7f48f79a0114ebfa9455d60203392a3005b5f80fd5b346100a05760603660031901126100a05760043567ffffffffffffffff81116100a05761014060031982360301126100a05760405190610140820182811067ffffffffffffffff82111761023057604052806004013582526024810135602083015261011260448201610244565b604083015261012360648201610244565b606083015261013460848201610244565b608083015260a481013560a083015261014f60c48201610259565b60c083015261016060e48201610259565b60e083015261010481013580151581036100a0576101008301526101248101359067ffffffffffffffff82116100a057600461019f923692010161026d565b61012082015260243567ffffffffffffffff81116100a0576101c590369060040161026d565b6020818051810103126100a05760405190602082019082821067ffffffffffffffff83111761023057604091909152602001516001600160a01b038116918282036100a057525f525f60205260405f2090515f52602052602060ff60405f2054166040519015158152f35b634e487b7160e01b5f52604160045260245ffd5b359067ffffffffffffffff821682036100a057565b35906001600160a01b03821682036100a057565b81601f820112156100a05780359067ffffffffffffffff82116102305760405192601f8301601f19908116603f0116840167ffffffffffffffff81118582101761023057604052828452602083830101116100a057815f92602080930183860137830101529056fea2646970667358221220073a9c1fa5c8130a4f5d43c53dcdbccf65733d621351a98742750aa9d834a3d164736f6c634300081b0033",
    "sourceMap": "203:821:83:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:821:83;;;;;;;;;;;;;;;;612:10;203:821;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;660:48;203:821;612:10;660:48;;203:821;;;;;;;;;;;-1:-1:-1;;203:821:83;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;926:32;;203:821;;;;;;;;;;;;;;;;;;;;;;;;;;926:32;203:821;-1:-1:-1;;;;;203:821:83;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;203:821:83;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:821:83;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;203:821:83;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "arbitrate(bytes32,bool)": "8c08667e",
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "1272ff8b"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"oracle\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"statement\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"decision\",\"type\":\"bool\"}],\"name\":\"ArbitrationMade\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"statement\",\"type\":\"bytes32\"},{\"internalType\":\"bool\",\"name\":\"decision\",\"type\":\"bool\"}],\"name\":\"arbitrate\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/TrustedOracleArbiter.sol\":\"TrustedOracleArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f\",\"dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/arbiters/TrustedOracleArbiter.sol\":{\"keccak256\":\"0xc9335a43fabd962cdb0f42742214787e9c9c7b72ed8100c887d45e7bf377d297\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c4cb6de3b5a5b9fe3a05d5d20e27b1af8a1e14a9cd9ada87351a05dbb42cb438\",\"dweb:/ipfs/QmXkctVbMVEM2Fec4BLMqobUhaGApLDKYbMv5Fjqwp7y5z\"]}},\"version\":1}",
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
              "internalType": "address",
              "name": "oracle",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "bytes32",
              "name": "statement",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "bool",
              "name": "decision",
              "type": "bool",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "ArbitrationMade",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "statement",
              "type": "bytes32"
            },
            {
              "internalType": "bool",
              "name": "decision",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "arbitrate"
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
        "src/arbiters/TrustedOracleArbiter.sol": "TrustedOracleArbiter"
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
        "keccak256": "0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8",
        "urls": [
          "bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f",
          "dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs"
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
      "src/arbiters/TrustedOracleArbiter.sol": {
        "keccak256": "0xc9335a43fabd962cdb0f42742214787e9c9c7b72ed8100c887d45e7bf377d297",
        "urls": [
          "bzz-raw://c4cb6de3b5a5b9fe3a05d5d20e27b1af8a1e14a9cd9ada87351a05dbb42cb438",
          "dweb:/ipfs/QmXkctVbMVEM2Fec4BLMqobUhaGApLDKYbMv5Fjqwp7y5z"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 83
} as const;