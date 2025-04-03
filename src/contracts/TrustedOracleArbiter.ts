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
          "internalType": "struct TrustedOracleArbiter.DemandData",
          "components": [
            {
              "name": "oracle",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        }
      ],
      "stateMutability": "pure"
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
    "object": "0x608080604052346015576104cc908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c80631272ff8b146101c1578063838a68d9146100af57638c08667e1461003a575f80fd5b346100ab5760403660031901126100ab576004356024358015158091036100ab57335f525f60205260405f20825f5260205260405f2060ff1981541660ff83161790556040519081527f9346ce217f0c6f917b386e18e80c7cdd51b3f0ae86b7f48f79a0114ebfa9455d60203392a3005b5f80fd5b346100ab5760203660031901126100ab576004356001600160401b0381116100ab57366023820112156100ab5780600401356001600160401b0381116100ab57810160248101913683116100ab57606060206101096103d3565b5f815201526020818303126100ab576024810135906001600160401b0382116100ab570190604090829003126100ab576101416103d3565b9161014e6024830161042b565b83526044820135906001600160401b0382116100ab57602461017492608094010161045a565b9160208101928352602060405193849282845260018060a01b0390511682840152516040808401528051918291826060860152018484015e5f828201840152601f01601f19168101030190f35b346100ab5760603660031901126100ab576004356001600160401b0381116100ab5761014060031982360301126100ab576040519061014082018281106001600160401b038211176103bf57604052806004013582526024810135602083015261022d60448201610417565b604083015261023e60648201610417565b606083015261024f60848201610417565b608083015260a481013560a083015261026a60c4820161042b565b60c083015261027b60e4820161042b565b60e083015261010481013580151581036100ab57610100830152610124810135906001600160401b0382116100ab5760046102b9923692010161045a565b6101208201526024356001600160401b0381116100ab576102de90369060040161045a565b805181019060208201906020818403126100ab576020810151906001600160401b0382116100ab570191604090839003126100ab5761031b6103d3565b60208301519092906001600160a01b03811681036100ab57835260408101516001600160401b0381116100ab57602091010181601f820112156100ab5780519061036c6103678361043f565b6103f2565b92828452602083830101116100ab57815f9260208093018386015e83010152602082015260018060a01b039051165f525f60205260405f2090515f52602052602060ff60405f2054166040519015158152f35b634e487b7160e01b5f52604160045260245ffd5b60405190604082018281106001600160401b038211176103bf57604052565b6040519190601f01601f191682016001600160401b038111838210176103bf57604052565b35906001600160401b03821682036100ab57565b35906001600160a01b03821682036100ab57565b6001600160401b0381116103bf57601f01601f191660200190565b81601f820112156100ab578035906104746103678361043f565b92828452602083830101116100ab57815f92602080930183860137830101529056fea26469706673582212207415611150f1542c3313a14ad9220a6d6cfbb2e821299987766fc57a0c669e9764736f6c634300081b0033",
    "sourceMap": "203:1002:26:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c80631272ff8b146101c1578063838a68d9146100af57638c08667e1461003a575f80fd5b346100ab5760403660031901126100ab576004356024358015158091036100ab57335f525f60205260405f20825f5260205260405f2060ff1981541660ff83161790556040519081527f9346ce217f0c6f917b386e18e80c7cdd51b3f0ae86b7f48f79a0114ebfa9455d60203392a3005b5f80fd5b346100ab5760203660031901126100ab576004356001600160401b0381116100ab57366023820112156100ab5780600401356001600160401b0381116100ab57810160248101913683116100ab57606060206101096103d3565b5f815201526020818303126100ab576024810135906001600160401b0382116100ab570190604090829003126100ab576101416103d3565b9161014e6024830161042b565b83526044820135906001600160401b0382116100ab57602461017492608094010161045a565b9160208101928352602060405193849282845260018060a01b0390511682840152516040808401528051918291826060860152018484015e5f828201840152601f01601f19168101030190f35b346100ab5760603660031901126100ab576004356001600160401b0381116100ab5761014060031982360301126100ab576040519061014082018281106001600160401b038211176103bf57604052806004013582526024810135602083015261022d60448201610417565b604083015261023e60648201610417565b606083015261024f60848201610417565b608083015260a481013560a083015261026a60c4820161042b565b60c083015261027b60e4820161042b565b60e083015261010481013580151581036100ab57610100830152610124810135906001600160401b0382116100ab5760046102b9923692010161045a565b6101208201526024356001600160401b0381116100ab576102de90369060040161045a565b805181019060208201906020818403126100ab576020810151906001600160401b0382116100ab570191604090839003126100ab5761031b6103d3565b60208301519092906001600160a01b03811681036100ab57835260408101516001600160401b0381116100ab57602091010181601f820112156100ab5780519061036c6103678361043f565b6103f2565b92828452602083830101116100ab57815f9260208093018386015e83010152602082015260018060a01b039051165f525f60205260405f2090515f52602052602060ff60405f2054166040519015158152f35b634e487b7160e01b5f52604160045260245ffd5b60405190604082018281106001600160401b038211176103bf57604052565b6040519190601f01601f191682016001600160401b038111838210176103bf57604052565b35906001600160401b03821682036100ab57565b35906001600160a01b03821682036100ab57565b6001600160401b0381116103bf57601f01601f191660200190565b81601f820112156100ab578035906104746103678361043f565b92828452602083830101116100ab57815f92602080930183860137830101529056fea26469706673582212207415611150f1542c3313a14ad9220a6d6cfbb2e821299987766fc57a0c669e9764736f6c634300081b0033",
    "sourceMap": "203:1002:26:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:1002:26;;;;;;;;;;;;;;;;632:10;203:1002;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;680:48;203:1002;632:10;680:48;;203:1002;;;;;;;;;;;-1:-1:-1;;203:1002:26;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:1002:26;;;;;;;;;;;;;-1:-1:-1;;203:1002:26;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;:::i;:::-;;;946:32;;;203:1002;946:32;;203:1002;;;;;;;;;946:32;;203:1002;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:1002:26;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;203:1002:26;;;-1:-1:-1;;;;;203:1002:26;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;203:1002:26;;;;;;:::o;:::-;;;-1:-1:-1;;;;;203:1002:26;;;;;;:::o;:::-;-1:-1:-1;;;;;203:1002:26;;;;;;-1:-1:-1;;203:1002:26;;;;:::o;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;-1:-1:-1;203:1002:26;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "arbitrate(bytes32,bool)": "8c08667e",
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "1272ff8b",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"oracle\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"statement\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"decision\",\"type\":\"bool\"}],\"name\":\"ArbitrationMade\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"statement\",\"type\":\"bytes32\"},{\"internalType\":\"bool\",\"name\":\"decision\",\"type\":\"bool\"}],\"name\":\"arbitrate\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"oracle\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct TrustedOracleArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/TrustedOracleArbiter.sol\":\"TrustedOracleArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f\",\"dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/arbiters/TrustedOracleArbiter.sol\":{\"keccak256\":\"0xbd4584c9f10ebf5e550da75f5d2cead353865fbb398b605356264196d3e5a596\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://a5a73080bbd5a920986c07bc757a95c5aea8f29ab14bd6a39fbfca601b384d9a\",\"dweb:/ipfs/QmXczpsfokkY4w61YsBVFdE7FAxXfuTpeZXr8PQansSiWc\"]}},\"version\":1}",
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
              "internalType": "struct TrustedOracleArbiter.DemandData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "oracle",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
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
        "keccak256": "0xbd4584c9f10ebf5e550da75f5d2cead353865fbb398b605356264196d3e5a596",
        "urls": [
          "bzz-raw://a5a73080bbd5a920986c07bc757a95c5aea8f29ab14bd6a39fbfca601b384d9a",
          "dweb:/ipfs/QmXczpsfokkY4w61YsBVFdE7FAxXfuTpeZXr8PQansSiWc"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 26
} as const;