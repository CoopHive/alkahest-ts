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
          "internalType": "struct TrustedPartyArbiter.DemandData",
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
              "name": "creator",
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
      "name": "NotTrustedParty",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x608080604052346015576105e2908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c80631272ff8b146101685763838a68d91461002f575f80fd5b34610164576020366003190112610164576004356001600160401b03811161016457366023820112156101645780600401356001600160401b038111610164578101906024820190368211610164575f6040805161008c816104af565b82815260606020820152015260206023196024838603010112610164576024810135906001600160401b0382116101645701916060908390031261016457604051906100d7826104af565b6100e3602484016104ff565b82526044830135906001600160401b0382116101645761010d606491602461011b9487010161052e565b9360208401948552016104ff565b604082019081526101506040519384936020855260018060a01b03905116602085015251606060408501526080840190610574565b90516001600160a01b031660608301520390f35b5f80fd5b34610164576060366003190112610164576004356001600160401b038111610164576101406003198236030112610164576101c06040526004810135608052602481013560a0526101bb604482016104eb565b60c0908152906101cd606482016104eb565b60e09081526101de608483016104eb565b61010090815260a48301356101209081529093906101fe60c485016104ff565b6101405261020e60e485016104ff565b6101609081529361010481013580151581036101645761018052610124810135906001600160401b03821161016457600461024c923692010161052e565b6101a0526024356001600160401b0381116101645761026f90369060040161052e565b91825183016020810193602081830312610164576020810151916001600160401b0383116101645760608284019091031261016457604051916102b1836104af565b6102bf602082840101610598565b835260408183010151906001600160401b03821161016457603f83820183010187131561016457602082828501010151926102f984610513565b97610307604051998a6104ca565b8489526040828401850186010111610164575f602085610342968280606098888801010101838d015e8a010152602085019788520101610598565b60408201819052610140516001600160a01b0390811691160361048c57519251604051631272ff8b60e01b815260606004820152608051606482015260a051608482015291516001600160401b0390811660a48401529451851660c4830152955190931660e48401525161010483015261014080516001600160a01b03908116610124850152935184166101448401526101805115156101648401526101a051610184840191909152919360209385939216918391829161041f919061040d906101a4850190610574565b83810360031901602485015290610574565b604435604483015203915afa8015610481575f90610445575b6020906040519015158152f35b506020813d602011610479575b8161045f602093836104ca565b810103126101645751801515810361016457602090610438565b3d9150610452565b6040513d5f823e3d90fd5b634673ab7b60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b606081019081106001600160401b0382111761049b57604052565b90601f801991011681019081106001600160401b0382111761049b57604052565b35906001600160401b038216820361016457565b35906001600160a01b038216820361016457565b6001600160401b03811161049b57601f01601f191660200190565b81601f820112156101645780359061054582610513565b9261055360405194856104ca565b8284526020838301011161016457815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b51906001600160a01b03821682036101645756fea264697066735822122082a6c161d71c08dcfd20a500cc9ad30dceba48e19aed8c80e51c6dbb2a1d71ce64736f6c634300081b0033",
    "sourceMap": "203:891:78:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c80631272ff8b146101685763838a68d91461002f575f80fd5b34610164576020366003190112610164576004356001600160401b03811161016457366023820112156101645780600401356001600160401b038111610164578101906024820190368211610164575f6040805161008c816104af565b82815260606020820152015260206023196024838603010112610164576024810135906001600160401b0382116101645701916060908390031261016457604051906100d7826104af565b6100e3602484016104ff565b82526044830135906001600160401b0382116101645761010d606491602461011b9487010161052e565b9360208401948552016104ff565b604082019081526101506040519384936020855260018060a01b03905116602085015251606060408501526080840190610574565b90516001600160a01b031660608301520390f35b5f80fd5b34610164576060366003190112610164576004356001600160401b038111610164576101406003198236030112610164576101c06040526004810135608052602481013560a0526101bb604482016104eb565b60c0908152906101cd606482016104eb565b60e09081526101de608483016104eb565b61010090815260a48301356101209081529093906101fe60c485016104ff565b6101405261020e60e485016104ff565b6101609081529361010481013580151581036101645761018052610124810135906001600160401b03821161016457600461024c923692010161052e565b6101a0526024356001600160401b0381116101645761026f90369060040161052e565b91825183016020810193602081830312610164576020810151916001600160401b0383116101645760608284019091031261016457604051916102b1836104af565b6102bf602082840101610598565b835260408183010151906001600160401b03821161016457603f83820183010187131561016457602082828501010151926102f984610513565b97610307604051998a6104ca565b8489526040828401850186010111610164575f602085610342968280606098888801010101838d015e8a010152602085019788520101610598565b60408201819052610140516001600160a01b0390811691160361048c57519251604051631272ff8b60e01b815260606004820152608051606482015260a051608482015291516001600160401b0390811660a48401529451851660c4830152955190931660e48401525161010483015261014080516001600160a01b03908116610124850152935184166101448401526101805115156101648401526101a051610184840191909152919360209385939216918391829161041f919061040d906101a4850190610574565b83810360031901602485015290610574565b604435604483015203915afa8015610481575f90610445575b6020906040519015158152f35b506020813d602011610479575b8161045f602093836104ca565b810103126101645751801515810361016457602090610438565b3d9150610452565b6040513d5f823e3d90fd5b634673ab7b60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b606081019081106001600160401b0382111761049b57604052565b90601f801991011681019081106001600160401b0382111761049b57604052565b35906001600160401b038216820361016457565b35906001600160a01b038216820361016457565b6001600160401b03811161049b57601f01601f191660200190565b81601f820112156101645780359061054582610513565b9261055360405194856104ca565b8284526020838301011161016457815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b51906001600160a01b03821682036101645756fea264697066735822122082a6c161d71c08dcfd20a500cc9ad30dceba48e19aed8c80e51c6dbb2a1d71ce64736f6c634300081b0033",
    "sourceMap": "203:891:78:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:891:78;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:891:78;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;:::i;:::-;;;;633:32;;203:891;633:32;;203:891;;;;;;;;;633:32;;203:891;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;-1:-1:-1;203:891:78;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;679:38;675:68;;203:891;862:18;;203:891;;-1:-1:-1;;;773:151:78;;203:891;;773:151;;203:891;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;862:18;203:891;;;;;;;:::i;:::-;;;;-1:-1:-1;;203:891:78;;;;;;;:::i;:::-;;;;;;;773:151;;;;;;;;203:891;773:151;;;203:891;;;;;;;;;;;773:151;;203:891;773:151;;203:891;773:151;;;;;;203:891;773:151;;;:::i;:::-;;;203:891;;;;;;;;;;;;;773:151;;;;;;-1:-1:-1;773:151:78;;;203:891;;;;;;;;;675:68;726:17;;;203:891;726:17;203:891;;726:17;203:891;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;203:891:78;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;203:891:78;;;;;;:::o;:::-;;;-1:-1:-1;;;;;203:891:78;;;;;;:::o;:::-;-1:-1:-1;;;;;203:891:78;;;;;;-1:-1:-1;;203:891:78;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;203:891:78;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;203:891:78;;;;;;;;-1:-1:-1;;203:891:78;;;;:::o;:::-;;;-1:-1:-1;;;;;203:891:78;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "1272ff8b",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"NotTrustedParty\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"counteroffer\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"baseArbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"baseDemand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"}],\"internalType\":\"struct TrustedPartyArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/TrustedPartyArbiter.sol\":\"TrustedPartyArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f\",\"dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/arbiters/TrustedPartyArbiter.sol\":{\"keccak256\":\"0x8fa628e9a71ba215583ee53d7d8bfd43f56383f0f98d4417ce96472bcc256c09\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6c07f6ebcd46e8630edf48a4b2cc18dfe69a52f948a2f881f2b616933c6940fb\",\"dweb:/ipfs/Qmbb4KEHKcFfucKRbg8HaZR2WqCG3ZAmPyXqBJYnBX6XVn\"]}},\"version\":1}",
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
              "internalType": "struct TrustedPartyArbiter.DemandData",
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
                  "name": "creator",
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
        "keccak256": "0x8fa628e9a71ba215583ee53d7d8bfd43f56383f0f98d4417ce96472bcc256c09",
        "urls": [
          "bzz-raw://6c07f6ebcd46e8630edf48a4b2cc18dfe69a52f948a2f881f2b616933c6940fb",
          "dweb:/ipfs/Qmbb4KEHKcFfucKRbg8HaZR2WqCG3ZAmPyXqBJYnBX6XVn"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 78
} as const;