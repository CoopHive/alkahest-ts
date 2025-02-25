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
      "stateMutability": "pure"
    },
    {
      "type": "error",
      "name": "NotDemandedAttestation",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60808060405234601557610279908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b346101ae5760603660031901126101ae5760043567ffffffffffffffff81116101ae5761014060031982360301126101ae5760405190610140820182811067ffffffffffffffff82111761019a576040528060040135825260248101356020830152610092604482016101b2565b60408301526100a3606482016101b2565b60608301526100b4608482016101b2565b608083015260a481013560a08301526100cf60c482016101c7565b60c08301526100e060e482016101c7565b60e083015261010481013580151581036101ae576101008301526101248101359067ffffffffffffffff82116101ae57600461011f92369201016101db565b61012082015260243567ffffffffffffffff81116101ae576101459036906004016101db565b906020828051810103126101ae5760405191602083019083821067ffffffffffffffff83111761019a576020916040520151809252510361018b57602060405160018152f35b631579b0f760e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b5f80fd5b359067ffffffffffffffff821682036101ae57565b35906001600160a01b03821682036101ae57565b81601f820112156101ae5780359067ffffffffffffffff821161019a5760405192601f8301601f19908116603f0116840167ffffffffffffffff81118582101761019a57604052828452602083830101116101ae57815f92602080930183860137830101529056fea2646970667358221220e96e0452d509d47266c25f62ea681018cf5f438b1446cde8c37f31b81fa4db1c64736f6c634300081a0033",
    "sourceMap": "152:485:49:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b346101ae5760603660031901126101ae5760043567ffffffffffffffff81116101ae5761014060031982360301126101ae5760405190610140820182811067ffffffffffffffff82111761019a576040528060040135825260248101356020830152610092604482016101b2565b60408301526100a3606482016101b2565b60608301526100b4608482016101b2565b608083015260a481013560a08301526100cf60c482016101c7565b60c08301526100e060e482016101c7565b60e083015261010481013580151581036101ae576101008301526101248101359067ffffffffffffffff82116101ae57600461011f92369201016101db565b61012082015260243567ffffffffffffffff81116101ae576101459036906004016101db565b906020828051810103126101ae5760405191602083019083821067ffffffffffffffff83111761019a576020916040520151809252510361018b57602060405160018152f35b631579b0f760e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b5f80fd5b359067ffffffffffffffff821682036101ae57565b35906001600160a01b03821682036101ae57565b81601f820112156101ae5780359067ffffffffffffffff821161019a5760405192601f8301601f19908116603f0116840167ffffffffffffffff81118582101761019a57604052828452602083830101116101ae57815f92602080930183860137830101529056fea2646970667358221220e96e0452d509d47266c25f62ea681018cf5f438b1446cde8c37f31b81fa4db1c64736f6c634300081a0033",
    "sourceMap": "152:485:49:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;152:485:49;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;500:32;;152:485;;;;;;;;;;;;;;;;;;;;;;;;500:32;152:485;;;;;546:28;542:65;;152:485;;;;;;;542:65;583:24;;;152:485;583:24;152:485;;583:24;152:485;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;152:485:49;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;152:485:49;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;152:485:49;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "1272ff8b"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"NotDemandedAttestation\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Validators/SpecificAttestationArbiter.sol\":\"SpecificAttestationArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Validators/SpecificAttestationArbiter.sol\":{\"keccak256\":\"0x835379cf781c102fe0be07bb0b67a6d388f2633223b17a51cfdbdc99b1fb3755\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://1d45f1503ac830723fe31baf81d31d3c0e83ed24ef431b1382b1e434a1217201\",\"dweb:/ipfs/QmYZidKfBWresAcwDsuQWDVpmg4Ta5gTRTgBhjMHjjekcw\"]}},\"version\":1}",
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
          "name": "NotDemandedAttestation"
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
          "stateMutability": "pure",
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
        "src/Validators/SpecificAttestationArbiter.sol": "SpecificAttestationArbiter"
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
      "src/IArbiter.sol": {
        "keccak256": "0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647",
        "urls": [
          "bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778",
          "dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp"
        ],
        "license": "UNLICENSED"
      },
      "src/Validators/SpecificAttestationArbiter.sol": {
        "keccak256": "0x835379cf781c102fe0be07bb0b67a6d388f2633223b17a51cfdbdc99b1fb3755",
        "urls": [
          "bzz-raw://1d45f1503ac830723fe31baf81d31d3c0e83ed24ef431b1382b1e434a1217201",
          "dweb:/ipfs/QmYZidKfBWresAcwDsuQWDVpmg4Ta5gTRTgBhjMHjjekcw"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 49
} as const;