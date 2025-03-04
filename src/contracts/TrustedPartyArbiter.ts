export const abi = {
  "abi": [
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
      "type": "error",
      "name": "NotTrustedParty",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60808060405234601557610494908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b3461033f57606036600319011261033f5760043567ffffffffffffffff811161033f57610140600319823603011261033f576101c06040526004810135608052602481013560a0526100786044820161039b565b60c09081529061008a6064820161039b565b60e090815261009b6084830161039b565b61010090815260a48301356101209081529093906100bb60c485016103b0565b610140526100cb60e485016103b0565b61016090815293610104810135801515810361033f57610180526101248101359067ffffffffffffffff821161033f57600461010a92369201016103e0565b6101a05260243567ffffffffffffffff811161033f5761012e9036906004016103e0565b9182518301602081019360208183031261033f5760208101519067ffffffffffffffff821161033f5701906060908290031261033f576040516060810181811067ffffffffffffffff8211176103655760405261018d60208301610426565b815261019b60408301610426565b9160208201928352606081015167ffffffffffffffff811161033f57603f8282010187131561033f57602081830101516101d4816103c4565b976101e2604051998a610379565b81895260408484018301011161033f578060208080945f96010101838a015e87010152604081019485526101405190516001600160a01b0391821691160361035657519251604051631272ff8b60e01b815260606004820152608051606482015260a0516084820152915167ffffffffffffffff90811660a48401529451851660c4830152955190931660e48401525161010483015261014080516001600160a01b03908116610124850152935184166101448401526101805115156101648401526101a05161018484019190915291936020938593921691839182916102e591906102d3906101a485019061043a565b8381036003190160248501529061043a565b604435604483015203915afa801561034b575f9061030b575b6020906040519015158152f35b506020813d602011610343575b8161032560209383610379565b8101031261033f5751801515810361033f576020906102fe565b5f80fd5b3d9150610318565b6040513d5f823e3d90fd5b634673ab7b60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761036557604052565b359067ffffffffffffffff8216820361033f57565b35906001600160a01b038216820361033f57565b67ffffffffffffffff811161036557601f01601f191660200190565b81601f8201121561033f578035906103f7826103c4565b926104056040519485610379565b8284526020838301011161033f57815f926020809301838601378301015290565b51906001600160a01b038216820361033f57565b805180835260209291819084018484015e5f828201840152601f01601f191601019056fea26469706673582212208fdea9380c468a5d2e35a69c2d2f128b7911d17385777054df797f072ca7292f64736f6c634300081a0033",
    "sourceMap": "202:730:53:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b3461033f57606036600319011261033f5760043567ffffffffffffffff811161033f57610140600319823603011261033f576101c06040526004810135608052602481013560a0526100786044820161039b565b60c09081529061008a6064820161039b565b60e090815261009b6084830161039b565b61010090815260a48301356101209081529093906100bb60c485016103b0565b610140526100cb60e485016103b0565b61016090815293610104810135801515810361033f57610180526101248101359067ffffffffffffffff821161033f57600461010a92369201016103e0565b6101a05260243567ffffffffffffffff811161033f5761012e9036906004016103e0565b9182518301602081019360208183031261033f5760208101519067ffffffffffffffff821161033f5701906060908290031261033f576040516060810181811067ffffffffffffffff8211176103655760405261018d60208301610426565b815261019b60408301610426565b9160208201928352606081015167ffffffffffffffff811161033f57603f8282010187131561033f57602081830101516101d4816103c4565b976101e2604051998a610379565b81895260408484018301011161033f578060208080945f96010101838a015e87010152604081019485526101405190516001600160a01b0391821691160361035657519251604051631272ff8b60e01b815260606004820152608051606482015260a0516084820152915167ffffffffffffffff90811660a48401529451851660c4830152955190931660e48401525161010483015261014080516001600160a01b03908116610124850152935184166101448401526101805115156101648401526101a05161018484019190915291936020938593921691839182916102e591906102d3906101a485019061043a565b8381036003190160248501529061043a565b604435604483015203915afa801561034b575f9061030b575b6020906040519015158152f35b506020813d602011610343575b8161032560209383610379565b8101031261033f5751801515810361033f576020906102fe565b5f80fd5b3d9150610318565b6040513d5f823e3d90fd5b634673ab7b60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761036557604052565b359067ffffffffffffffff8216820361033f57565b35906001600160a01b038216820361033f57565b67ffffffffffffffff811161036557601f01601f191660200190565b81601f8201121561033f578035906103f7826103c4565b926104056040519485610379565b8284526020838301011161033f57815f926020809301838601378301015290565b51906001600160a01b038216820361033f57565b805180835260209291819084018484015e5f828201840152601f01601f191601019056fea26469706673582212208fdea9380c468a5d2e35a69c2d2f128b7911d17385777054df797f072ca7292f64736f6c634300081a0033",
    "sourceMap": "202:730:53:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;202:730:53;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;632:32;;202:730;632:32;;202:730;;;;;;;;;632:32;;202:730;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;202:730:53;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;202:730:53;;;;;678:38;674:68;;202:730;861:18;;202:730;;-1:-1:-1;;;772:151:53;;202:730;;772:151;;202:730;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;202:730:53;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;861:18;202:730;;;;;;;:::i;:::-;;;;-1:-1:-1;;202:730:53;;;;;;;:::i;:::-;;;;;;;772:151;;;;;;;;202:730;772:151;;;202:730;;;;;;;;;;;772:151;;202:730;772:151;;202:730;772:151;;;;;;202:730;772:151;;;:::i;:::-;;;202:730;;;;;;;;;;;;;772:151;;;202:730;;;;772:151;;;-1:-1:-1;772:151:53;;;202:730;;;;;;;;;674:68;725:17;;;202:730;725:17;202:730;;725:17;202:730;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;202:730:53;;;;;;:::o;:::-;;;;;;;;-1:-1:-1;;202:730:53;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;202:730:53;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;202:730:53;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;202:730:53;;;;;;;;-1:-1:-1;;202:730:53;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "1272ff8b"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"NotTrustedParty\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"counteroffer\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Validators/TrustedPartyArbiter.sol\":\"TrustedPartyArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265\",\"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Validators/TrustedPartyArbiter.sol\":{\"keccak256\":\"0x5868cc5895e174967a160074b0a267ed1dcdf1461360f73dae9d2531d2ed72d3\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f604d25d31fbc798b66636386e339ae8816b2c0fa756ffb4c773497873c44c7a\",\"dweb:/ipfs/QmTdxBttTvcs4bFikXyXmmZemxNGW6wNYJzCQUzt6VhU7T\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.26+commit.8a97fa7a"
    },
    "language": "Solidity",
    "output": {
      "abi": [
        {
          "inputs": [],
          "type": "error",
          "name": "NotTrustedParty"
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
              "name": "counteroffer",
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
        "src/Validators/TrustedPartyArbiter.sol": "TrustedPartyArbiter"
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
        "keccak256": "0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c",
        "urls": [
          "bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265",
          "dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ"
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
      "src/Validators/TrustedPartyArbiter.sol": {
        "keccak256": "0x5868cc5895e174967a160074b0a267ed1dcdf1461360f73dae9d2531d2ed72d3",
        "urls": [
          "bzz-raw://f604d25d31fbc798b66636386e339ae8816b2c0fa756ffb4c773497873c44c7a",
          "dweb:/ipfs/QmTdxBttTvcs4bFikXyXmmZemxNGW6wNYJzCQUzt6VhU7T"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 53
} as const;