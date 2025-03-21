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
    "object": "0x608080604052346015576104a1908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b3461034c57606036600319011261034c5760043567ffffffffffffffff811161034c57610140600319823603011261034c576101c06040526004810135608052602481013560a052610078604482016103a8565b60c09081529061008a606482016103a8565b60e090815261009b608483016103a8565b61010090815260a48301356101209081529093906100bb60c485016103bd565b610140526100cb60e485016103bd565b61016090815293610104810135801515810361034c57610180526101248101359067ffffffffffffffff821161034c57600461010a92369201016103ed565b6101a05260243567ffffffffffffffff811161034c5761012e9036906004016103ed565b9182518301602081019360208183031261034c5760208101519167ffffffffffffffff831161034c5760608284019091031261034c57604051916060830183811067ffffffffffffffff82111761037257604052610190602082840101610433565b8352604081830101519067ffffffffffffffff821161034c57603f83820183010187131561034c57602082828501010151926101cb846103d1565b976101d9604051998a610386565b848952604082840185018601011161034c575f602085610214968280606098888801010101838d015e8a010152602085019788520101610433565b60408201819052610140516001600160a01b0390811691160361036357519251604051631272ff8b60e01b815260606004820152608051606482015260a0516084820152915167ffffffffffffffff90811660a48401529451851660c4830152955190931660e48401525161010483015261014080516001600160a01b03908116610124850152935184166101448401526101805115156101648401526101a05161018484019190915291936020938593921691839182916102f291906102e0906101a4850190610447565b83810360031901602485015290610447565b604435604483015203915afa8015610358575f90610318575b6020906040519015158152f35b506020813d602011610350575b8161033260209383610386565b8101031261034c5751801515810361034c5760209061030b565b5f80fd5b3d9150610325565b6040513d5f823e3d90fd5b634673ab7b60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761037257604052565b359067ffffffffffffffff8216820361034c57565b35906001600160a01b038216820361034c57565b67ffffffffffffffff811161037257601f01601f191660200190565b81601f8201121561034c57803590610404826103d1565b926104126040519485610386565b8284526020838301011161034c57815f926020809301838601378301015290565b51906001600160a01b038216820361034c57565b805180835260209291819084018484015e5f828201840152601f01601f191601019056fea26469706673582212205de532d0897953ff569a4a823f34c26043ac6a2fae576f56d1a072a64418a60b64736f6c634300081b0033",
    "sourceMap": "203:730:66:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b3461034c57606036600319011261034c5760043567ffffffffffffffff811161034c57610140600319823603011261034c576101c06040526004810135608052602481013560a052610078604482016103a8565b60c09081529061008a606482016103a8565b60e090815261009b608483016103a8565b61010090815260a48301356101209081529093906100bb60c485016103bd565b610140526100cb60e485016103bd565b61016090815293610104810135801515810361034c57610180526101248101359067ffffffffffffffff821161034c57600461010a92369201016103ed565b6101a05260243567ffffffffffffffff811161034c5761012e9036906004016103ed565b9182518301602081019360208183031261034c5760208101519167ffffffffffffffff831161034c5760608284019091031261034c57604051916060830183811067ffffffffffffffff82111761037257604052610190602082840101610433565b8352604081830101519067ffffffffffffffff821161034c57603f83820183010187131561034c57602082828501010151926101cb846103d1565b976101d9604051998a610386565b848952604082840185018601011161034c575f602085610214968280606098888801010101838d015e8a010152602085019788520101610433565b60408201819052610140516001600160a01b0390811691160361036357519251604051631272ff8b60e01b815260606004820152608051606482015260a0516084820152915167ffffffffffffffff90811660a48401529451851660c4830152955190931660e48401525161010483015261014080516001600160a01b03908116610124850152935184166101448401526101805115156101648401526101a05161018484019190915291936020938593921691839182916102f291906102e0906101a4850190610447565b83810360031901602485015290610447565b604435604483015203915afa8015610358575f90610318575b6020906040519015158152f35b506020813d602011610350575b8161033260209383610386565b8101031261034c5751801515810361034c5760209061030b565b5f80fd5b3d9150610325565b6040513d5f823e3d90fd5b634673ab7b60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761037257604052565b359067ffffffffffffffff8216820361034c57565b35906001600160a01b038216820361034c57565b67ffffffffffffffff811161037257601f01601f191660200190565b81601f8201121561034c57803590610404826103d1565b926104126040519485610386565b8284526020838301011161034c57815f926020809301838601378301015290565b51906001600160a01b038216820361034c57565b805180835260209291819084018484015e5f828201840152601f01601f191601019056fea26469706673582212205de532d0897953ff569a4a823f34c26043ac6a2fae576f56d1a072a64418a60b64736f6c634300081b0033",
    "sourceMap": "203:730:66:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:730:66;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;633:32;;203:730;633:32;;203:730;;;;;;;;;633:32;;203:730;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;203:730:66;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;203:730:66;;;;;679:38;675:68;;203:730;862:18;;203:730;;-1:-1:-1;;;773:151:66;;203:730;;773:151;;203:730;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:730:66;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;862:18;203:730;;;;;;;:::i;:::-;;;;-1:-1:-1;;203:730:66;;;;;;;:::i;:::-;;;;;;;773:151;;;;;;;;203:730;773:151;;;203:730;;;;;;;;;;;773:151;;203:730;773:151;;203:730;773:151;;;;;;203:730;773:151;;;:::i;:::-;;;203:730;;;;;;;;;;;;;773:151;;;203:730;;;;773:151;;;-1:-1:-1;773:151:66;;;203:730;;;;;;;;;675:68;726:17;;;203:730;726:17;203:730;;726:17;203:730;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;203:730:66;;;;;;:::o;:::-;;;;;;;;-1:-1:-1;;203:730:66;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;203:730:66;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;203:730:66;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;203:730:66;;;;;;;;-1:-1:-1;;203:730:66;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "1272ff8b"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"NotTrustedParty\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"counteroffer\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/TrustedPartyArbiter.sol\":\"TrustedPartyArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f\",\"dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/arbiters/TrustedPartyArbiter.sol\":{\"keccak256\":\"0x48794f354b6d5a99ab1b59965f003fde422605ffa323e775bf32ffc8aa09d608\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f73e35c5668d16eea0e2dd4fb59f021039b63d355fe56574c41a23e8918fe9f9\",\"dweb:/ipfs/QmY7N5LPkehpoRJCivfMqQxeFBjeit5aixSxVEr5FFfGgX\"]}},\"version\":1}",
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
        "src/arbiters/TrustedPartyArbiter.sol": "TrustedPartyArbiter"
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
      "src/arbiters/TrustedPartyArbiter.sol": {
        "keccak256": "0x48794f354b6d5a99ab1b59965f003fde422605ffa323e775bf32ffc8aa09d608",
        "urls": [
          "bzz-raw://f73e35c5668d16eea0e2dd4fb59f021039b63d355fe56574c41a23e8918fe9f9",
          "dweb:/ipfs/QmY7N5LPkehpoRJCivfMqQxeFBjeit5aixSxVEr5FFfGgX"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 66
} as const;