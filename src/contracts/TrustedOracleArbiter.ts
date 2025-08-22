export const abi = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_eas",
          "type": "address",
          "internalType": "contract IEAS"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "arbitrate",
      "inputs": [
        {
          "name": "obligation",
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
      "type": "function",
      "name": "requestArbitration",
      "inputs": [
        {
          "name": "_obligation",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "oracle",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "ArbitrationMade",
      "inputs": [
        {
          "name": "obligation",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "oracle",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "decision",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ArbitrationRequested",
      "inputs": [
        {
          "name": "obligation",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "oracle",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "UnauthorizedArbitrationRequest",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x608034606f57601f61077638819003918201601f19168301916001600160401b03831184841017607357808492602094604052833981010312606f57516001600160a01b03811690819003606f575f80546001600160a01b0319169190911790556040516106ee90816100888239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d91461043c575080638c08667e146103c9578063e6c9714d146102195763ef9fb71d14610048575f80fd5b3461020a57604036600319011261020a576024356001600160a01b038116906004359082900361020a575f80546040516328c44a9960e21b8152600481018490529190829060249082906001600160a01b03165afa90811561020e575f91610116575b5060e08101516001600160a01b031633141590816100fe575b506100ef577f4a55e4a537f0b657a8b464f243ae30dd8404841df3956cceee1aabac341d382f5f80a3005b63ff323ecb60e01b5f5260045ffd5b60c001516001600160a01b031633141590505f6100c4565b90503d805f833e61012781836105a0565b81019060208183031261020a578051906001600160401b03821161020a57016101408183031261020a576040519161015e83610584565b8151835260208201516020840152610178604083016106a4565b6040840152610189606083016106a4565b606084015261019a608083016106a4565b608084015260a082015160a08401526101b560c0830161064a565b60c08401526101c660e0830161064a565b60e0840152610100820151801515810361020a576101008401526101208201516001600160401b03811161020a576101fe920161065e565b6101208201525f6100ab565b5f80fd5b6040513d5f823e3d90fd5b3461020a57606036600319011261020a576004356001600160401b03811161020a57610140600319823603011261020a576040519061025782610584565b8060040135825260248101356020830152610274604482016105c1565b6040830152610285606482016105c1565b6060830152610296608482016105c1565b608083015260a481013560a08301526102b160c482016105d5565b60c08301526102c260e482016105d5565b60e0830152610104810135801515810361020a57610100830152610124810135906001600160401b03821161020a5760046103009236920101610604565b6101208201526024356001600160401b03811161020a57610325903690600401610604565b805181019060208183031261020a576020810151906001600160401b03821161020a57019060408282031261020a576040519161036183610555565b61036d6020820161064a565b83526040810151916001600160401b03831161020a5761039492602080920192010161065e565b602082015260018060a01b039051165f52600160205260405f2090515f52602052602060ff60405f2054166040519015158152f35b3461020a57604036600319011261020a576004356024359081151580920361020a57335f52600160205260405f20815f5260205260405f2060ff1981541660ff84161790556040519182527f17b56dd782cd998b68e9b95d1fc547096b22671d6848644badf18d515329792760203393a3005b3461020a57602036600319011261020a576004356001600160401b03811161020a573660238201121561020a5780600401356001600160401b03811161020a57810190602482019236841161020a57602081610499606093610555565b5f8152015260208183031261020a576024810135906001600160401b03821161020a5701906040908290031261020a57604051916104d683610555565b6104e2602483016105d5565b83526044820135906001600160401b03821161020a576024610508926080940101610604565b9160208101928352602060405193849282845260018060a01b0390511682840152516040808401528051918291826060860152018484015e5f828201840152601f01601f19168101030190f35b604081019081106001600160401b0382111761057057604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b0382111761057057604052565b90601f801991011681019081106001600160401b0382111761057057604052565b35906001600160401b038216820361020a57565b35906001600160a01b038216820361020a57565b6001600160401b03811161057057601f01601f191660200190565b81601f8201121561020a5780359061061b826105e9565b9261062960405194856105a0565b8284526020838301011161020a57815f926020809301838601378301015290565b51906001600160a01b038216820361020a57565b81601f8201121561020a57805190610675826105e9565b9261068360405194856105a0565b8284526020838301011161020a57815f9260208093018386015e8301015290565b51906001600160401b038216820361020a5756fea2646970667358221220e6a696deb09cb43d35bbe9965606336d0942caa13c2928ff92f01d551956168964736f6c634300081b0033",
    "sourceMap": "239:1622:50:-:0;;;;;;;;;;;;;-1:-1:-1;;239:1622:50;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;-1:-1:-1;239:1622:50;;-1:-1:-1;;;;;;239:1622:50;;;;;;;;;;;;;;;;;-1:-1:-1;239:1622:50;;;;;;-1:-1:-1;239:1622:50;;;;;-1:-1:-1;239:1622:50",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d91461043c575080638c08667e146103c9578063e6c9714d146102195763ef9fb71d14610048575f80fd5b3461020a57604036600319011261020a576024356001600160a01b038116906004359082900361020a575f80546040516328c44a9960e21b8152600481018490529190829060249082906001600160a01b03165afa90811561020e575f91610116575b5060e08101516001600160a01b031633141590816100fe575b506100ef577f4a55e4a537f0b657a8b464f243ae30dd8404841df3956cceee1aabac341d382f5f80a3005b63ff323ecb60e01b5f5260045ffd5b60c001516001600160a01b031633141590505f6100c4565b90503d805f833e61012781836105a0565b81019060208183031261020a578051906001600160401b03821161020a57016101408183031261020a576040519161015e83610584565b8151835260208201516020840152610178604083016106a4565b6040840152610189606083016106a4565b606084015261019a608083016106a4565b608084015260a082015160a08401526101b560c0830161064a565b60c08401526101c660e0830161064a565b60e0840152610100820151801515810361020a576101008401526101208201516001600160401b03811161020a576101fe920161065e565b6101208201525f6100ab565b5f80fd5b6040513d5f823e3d90fd5b3461020a57606036600319011261020a576004356001600160401b03811161020a57610140600319823603011261020a576040519061025782610584565b8060040135825260248101356020830152610274604482016105c1565b6040830152610285606482016105c1565b6060830152610296608482016105c1565b608083015260a481013560a08301526102b160c482016105d5565b60c08301526102c260e482016105d5565b60e0830152610104810135801515810361020a57610100830152610124810135906001600160401b03821161020a5760046103009236920101610604565b6101208201526024356001600160401b03811161020a57610325903690600401610604565b805181019060208183031261020a576020810151906001600160401b03821161020a57019060408282031261020a576040519161036183610555565b61036d6020820161064a565b83526040810151916001600160401b03831161020a5761039492602080920192010161065e565b602082015260018060a01b039051165f52600160205260405f2090515f52602052602060ff60405f2054166040519015158152f35b3461020a57604036600319011261020a576004356024359081151580920361020a57335f52600160205260405f20815f5260205260405f2060ff1981541660ff84161790556040519182527f17b56dd782cd998b68e9b95d1fc547096b22671d6848644badf18d515329792760203393a3005b3461020a57602036600319011261020a576004356001600160401b03811161020a573660238201121561020a5780600401356001600160401b03811161020a57810190602482019236841161020a57602081610499606093610555565b5f8152015260208183031261020a576024810135906001600160401b03821161020a5701906040908290031261020a57604051916104d683610555565b6104e2602483016105d5565b83526044820135906001600160401b03821161020a576024610508926080940101610604565b9160208101928352602060405193849282845260018060a01b0390511682840152516040808401528051918291826060860152018484015e5f828201840152601f01601f19168101030190f35b604081019081106001600160401b0382111761057057604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b0382111761057057604052565b90601f801991011681019081106001600160401b0382111761057057604052565b35906001600160401b038216820361020a57565b35906001600160a01b038216820361020a57565b6001600160401b03811161057057601f01601f191660200190565b81601f8201121561020a5780359061061b826105e9565b9261062960405194856105a0565b8284526020838301011161020a57815f926020809301838601378301015290565b51906001600160a01b038216820361020a57565b81601f8201121561020a57805190610675826105e9565b9261068360405194856105a0565b8284526020838301011161020a57815f9260208093018386015e8301015290565b51906001600160401b038216820361020a5756fea2646970667358221220e6a696deb09cb43d35bbe9965606336d0942caa13c2928ff92f01d551956168964736f6c634300081b0033",
    "sourceMap": "239:1622:50:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;239:1622:50;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;;;;;-1:-1:-1;;;1125:31:50;;239:1622;1125:31;;239:1622;;;;;;;;;;;-1:-1:-1;;;;;239:1622:50;1125:31;;;;;;;239:1622;1125:31;;;239:1622;-1:-1:-1;239:1622:50;1183:19;;239:1622;-1:-1:-1;;;;;239:1622:50;1206:10;1183:33;;;;:83;;239:1622;1166:150;;;1332:41;239:1622;1332:41;;239:1622;1166:150;1284:32;;;239:1622;1284:32;239:1622;;1284:32;1183:83;1232:20;;239:1622;-1:-1:-1;;;;;239:1622:50;1206:10;1232:34;;;-1:-1:-1;1183:83:50;;;1125:31;;;;;239:1622;1125:31;;;;;;:::i;:::-;;;239:1622;;;;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;:::i;:::-;;;;;1125:31;;;239:1622;;;;1125:31;239:1622;;;;;;;;;;;;;;;-1:-1:-1;;239:1622:50;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;:::i;:::-;;;1601:32;;239:1622;;;;;;;;;1601:32;;239:1622;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;1601:32;239:1622;1601:32;;;239:1622;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;239:1622:50;;;;;;;;;;;;;;;;;900:10;239:1622;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;949:49;239:1622;900:10;949:49;;239:1622;;;;;;;-1:-1:-1;;239:1622:50;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;239:1622:50;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;:::o;:::-;;;;-1:-1:-1;239:1622:50;;;;;-1:-1:-1;239:1622:50;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;239:1622:50;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;239:1622:50;;;;;;:::o;:::-;;;-1:-1:-1;;;;;239:1622:50;;;;;;:::o;:::-;-1:-1:-1;;;;;239:1622:50;;;;;;-1:-1:-1;;239:1622:50;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;239:1622:50;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;239:1622:50;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;239:1622:50;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;239:1622:50;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "arbitrate(bytes32,bool)": "8c08667e",
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9",
    "requestArbitration(bytes32,address)": "ef9fb71d"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"UnauthorizedArbitrationRequest\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"obligation\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"oracle\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"decision\",\"type\":\"bool\"}],\"name\":\"ArbitrationMade\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"obligation\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"oracle\",\"type\":\"address\"}],\"name\":\"ArbitrationRequested\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"obligation\",\"type\":\"bytes32\"},{\"internalType\":\"bool\",\"name\":\"decision\",\"type\":\"bool\"}],\"name\":\"arbitrate\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"oracle\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct TrustedOracleArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_obligation\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"oracle\",\"type\":\"address\"}],\"name\":\"requestArbitration\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/TrustedOracleArbiter.sol\":\"TrustedOracleArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12\",\"dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038\",\"dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff\"]},\"src/arbiters/TrustedOracleArbiter.sol\":{\"keccak256\":\"0x254e74316cee878f6611b7715ef0202697fc6b70c462276dfbd0ae547bf550ff\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6f21c7aec65251cb1c7482071ce7392f2eab379febac0c8666ed1b6f8e479a8d\",\"dweb:/ipfs/QmPBGCsWBujmZ2rYHmomPGzA6cV8cnG9jrihdSZZ3gM4Kd\"]}},\"version\":1}",
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
              "internalType": "contract IEAS",
              "name": "_eas",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "UnauthorizedArbitrationRequest"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "obligation",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "oracle",
              "type": "address",
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
              "name": "obligation",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "oracle",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "ArbitrationRequested",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "obligation",
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
              "name": "",
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
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_obligation",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "oracle",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "requestArbitration"
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
      "lib/eas-contracts/contracts/IEAS.sol": {
        "keccak256": "0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12",
        "urls": [
          "bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880",
          "dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/ISchemaRegistry.sol": {
        "keccak256": "0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754",
        "urls": [
          "bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158",
          "dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/ISemver.sol": {
        "keccak256": "0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18",
        "urls": [
          "bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0",
          "dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
        "keccak256": "0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
        "urls": [
          "bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
          "dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"
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
      "src/arbiters/TrustedOracleArbiter.sol": {
        "keccak256": "0x254e74316cee878f6611b7715ef0202697fc6b70c462276dfbd0ae547bf550ff",
        "urls": [
          "bzz-raw://6f21c7aec65251cb1c7482071ce7392f2eab379febac0c8666ed1b6f8e479a8d",
          "dweb:/ipfs/QmPBGCsWBujmZ2rYHmomPGzA6cV8cnG9jrihdSZZ3gM4Kd"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 50
} as const;