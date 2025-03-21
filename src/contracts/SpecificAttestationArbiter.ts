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
    "object": "0x60808060405234601557610279908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b346101ae5760603660031901126101ae5760043567ffffffffffffffff81116101ae5761014060031982360301126101ae5760405190610140820182811067ffffffffffffffff82111761019a576040528060040135825260248101356020830152610092604482016101b2565b60408301526100a3606482016101b2565b60608301526100b4608482016101b2565b608083015260a481013560a08301526100cf60c482016101c7565b60c08301526100e060e482016101c7565b60e083015261010481013580151581036101ae576101008301526101248101359067ffffffffffffffff82116101ae57600461011f92369201016101db565b61012082015260243567ffffffffffffffff81116101ae576101459036906004016101db565b906020828051810103126101ae5760405191602083019083821067ffffffffffffffff83111761019a576020916040520151809252510361018b57602060405160018152f35b631579b0f760e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b5f80fd5b359067ffffffffffffffff821682036101ae57565b35906001600160a01b03821682036101ae57565b81601f820112156101ae5780359067ffffffffffffffff821161019a5760405192601f8301601f19908116603f0116840167ffffffffffffffff81118582101761019a57604052828452602083830101116101ae57815f92602080930183860137830101529056fea2646970667358221220115828bfe2fa8d314579cc7c68c6e135a2f4fb57ba156ad7d491bfa3cd063aa464736f6c634300081b0033",
    "sourceMap": "153:485:63:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b346101ae5760603660031901126101ae5760043567ffffffffffffffff81116101ae5761014060031982360301126101ae5760405190610140820182811067ffffffffffffffff82111761019a576040528060040135825260248101356020830152610092604482016101b2565b60408301526100a3606482016101b2565b60608301526100b4608482016101b2565b608083015260a481013560a08301526100cf60c482016101c7565b60c08301526100e060e482016101c7565b60e083015261010481013580151581036101ae576101008301526101248101359067ffffffffffffffff82116101ae57600461011f92369201016101db565b61012082015260243567ffffffffffffffff81116101ae576101459036906004016101db565b906020828051810103126101ae5760405191602083019083821067ffffffffffffffff83111761019a576020916040520151809252510361018b57602060405160018152f35b631579b0f760e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b5f80fd5b359067ffffffffffffffff821682036101ae57565b35906001600160a01b03821682036101ae57565b81601f820112156101ae5780359067ffffffffffffffff821161019a5760405192601f8301601f19908116603f0116840167ffffffffffffffff81118582101761019a57604052828452602083830101116101ae57815f92602080930183860137830101529056fea2646970667358221220115828bfe2fa8d314579cc7c68c6e135a2f4fb57ba156ad7d491bfa3cd063aa464736f6c634300081b0033",
    "sourceMap": "153:485:63:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;153:485:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;501:32;;153:485;;;;;;;;;;;;;;;;;;;;;;;;501:32;153:485;;;;;547:28;543:65;;153:485;;;;;;;543:65;584:24;;;153:485;584:24;153:485;;584:24;153:485;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;153:485:63;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;153:485:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;153:485:63;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "1272ff8b"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"NotDemandedAttestation\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/SpecificAttestationArbiter.sol\":\"SpecificAttestationArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/arbiters/SpecificAttestationArbiter.sol\":{\"keccak256\":\"0x3b3532bfd7a5138aed06f0adc749aa0e697a996886888b59d985607b323630b8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://8205b7f182367f65faad19ba90530924689c52592b6660bedee0cc386d7a2522\",\"dweb:/ipfs/QmdTPJiwEeNrwdYsxHeKvcce2gX5mHvLrcGgN88P5CBd5X\"]}},\"version\":1}",
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
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
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
        "src/arbiters/SpecificAttestationArbiter.sol": "SpecificAttestationArbiter"
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
        "keccak256": "0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820",
        "urls": [
          "bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11",
          "dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj"
        ],
        "license": "UNLICENSED"
      },
      "src/arbiters/SpecificAttestationArbiter.sol": {
        "keccak256": "0x3b3532bfd7a5138aed06f0adc749aa0e697a996886888b59d985607b323630b8",
        "urls": [
          "bzz-raw://8205b7f182367f65faad19ba90530924689c52592b6660bedee0cc386d7a2522",
          "dweb:/ipfs/QmdTPJiwEeNrwdYsxHeKvcce2gX5mHvLrcGgN88P5CBd5X"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 63
} as const;