export const abi = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_eas",
          "type": "address",
          "internalType": "contract IEAS"
        },
        {
          "name": "_erc1155Escrow",
          "type": "address",
          "internalType": "contract ERC1155EscrowObligation"
        },
        {
          "name": "_erc1155Payment",
          "type": "address",
          "internalType": "contract ERC1155PaymentObligation"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "buyErc1155ForErc1155",
      "inputs": [
        {
          "name": "bidToken",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "bidTokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "bidAmount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "askToken",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "askId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "askAmount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "expiration",
          "type": "uint64",
          "internalType": "uint64"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "payErc1155ForErc1155",
      "inputs": [
        {
          "name": "buyAttestation",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "error",
      "name": "CouldntCollectPayment",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60803460b957601f61079e38819003918201601f19168301916001600160401b0383118484101760bd5780849260609460405283398101031260b95780516001600160a01b038116919082900360b95760208101516001600160a01b038116919082900360b957604001516001600160a01b038116929083900360b95760018060a01b03195f5416175f5560018060a01b0319600154161760015560018060a01b031960025416176002556040516106cc90816100d28239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c90816333666e5f1461022557506378a56f8f14610032575f80fd5b3461020e5760e036600319011261020e576004356001600160a01b0381169081900361020e576064356001600160a01b0381169081900361020e5760c4359167ffffffffffffffff831680930361020e576001546002546040516020946001600160a01b039384169391925f92610144929116906100af856105cc565b84526084358785015260a4356040850152336060850152610105604051948886019060609060018060a01b03815116835260208101516020840152604081015160408401528160018060a01b0391015116910152565b6080845261011460a0856105e8565b60405190610121826105b0565b8152868101938452604081019586528660608201986024358a526080830160443581526040519a8b998a98899663776c79a960e11b88526080600489015260018060a01b0390511660848801525160a060a48801528051958691826101248a0152018888015e8585018701889052516001600160a01b031660c48601525160e485015251610104840152602483015233604483018190526064830152601f01601f191681010301925af1801561021a575f906101e3575b602090604051908152f35b506020813d602011610212575b816101fd602093836105e8565b8101031261020e57602090516101d8565b5f80fd5b3d91506101f0565b6040513d5f823e3d90fd5b3461020e57602036600319011261020e57600435905f8160248160018060a01b038454166328c44a9960e21b82528660048301525afa801561021a575f90610495575b61012001518051810192915060208184031261020e5760208101519067ffffffffffffffff821161020e57019160a08382031261020e57604051906102ac826105b0565b6102b86020850161061f565b8252604084015167ffffffffffffffff811161020e576102e460a0916020806080950191880101610640565b948560208501526102f76060820161061f565b6040850152828101516060850152015191015260808280518101031261020e57610351608060405193610329856105cc565b6103356020820161061f565b855260408101516020860152606081015160408601520161061f565b6060830190815260025460408051632daf79cd60e01b815285516001600160a01b0390811660048301526020808801516024840152929096015160448201529251851660648401529193849160c49183915f91163360848401523360a48401525af191821561021a575f92610460575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af190811561021a575f91610426575b501561041757602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d602011610458575b81610441602093836105e8565b8101031261020e5761045290610633565b82610406565b3d9150610434565b9091506020813d60201161048d575b8161047c602093836105e8565b8101031261020e57519060206103c1565b3d915061046f565b503d805f833e6104a581836105e8565b81019060208183031261020e5780519067ffffffffffffffff821161020e57016101408183031261020e5760405190610140820182811067ffffffffffffffff82111761059c5760405280518252602081015160208301526105096040820161060a565b604083015261051a6060820161060a565b606083015261052b6080820161060a565b608083015260a081015160a083015261054660c0820161061f565b60c083015261055760e0820161061f565b60e08301526105696101008201610633565b6101008301526101208101519267ffffffffffffffff841161020e57610120936105939201610640565b82820152610268565b634e487b7160e01b5f52604160045260245ffd5b60a0810190811067ffffffffffffffff82111761059c57604052565b6080810190811067ffffffffffffffff82111761059c57604052565b90601f8019910116810190811067ffffffffffffffff82111761059c57604052565b519067ffffffffffffffff8216820361020e57565b51906001600160a01b038216820361020e57565b5190811515820361020e57565b81601f8201121561020e5780519067ffffffffffffffff821161059c5760405192610675601f8401601f1916602001856105e8565b8284526020838301011161020e57815f9260208093018386015e830101529056fea2646970667358221220374a455dc5593bbc1cb2e528c99a7f76abcb9d37ae5b17ff74538c8871b27b6064736f6c634300081b0033",
    "sourceMap": "394:3011:98:-:0;;;;;;;;;;;;;-1:-1:-1;;394:3011:98;;;;-1:-1:-1;;;;;394:3011:98;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;394:3011:98;;;;;;;;;;;;;-1:-1:-1;;;;;394:3011:98;;;;;;;;;;;;-1:-1:-1;;;;;394:3011:98;;;;;;;;;;;;;;;-1:-1:-1;394:3011:98;;;-1:-1:-1;394:3011:98;;;;;;;759:30;394:3011;;;759:30;394:3011;;;;;;;799:32;394:3011;;;799:32;394:3011;;;;;;;;;;;-1:-1:-1;394:3011:98;;;;;;-1:-1:-1;394:3011:98;;;;;-1:-1:-1;394:3011:98",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c90816333666e5f1461022557506378a56f8f14610032575f80fd5b3461020e5760e036600319011261020e576004356001600160a01b0381169081900361020e576064356001600160a01b0381169081900361020e5760c4359167ffffffffffffffff831680930361020e576001546002546040516020946001600160a01b039384169391925f92610144929116906100af856105cc565b84526084358785015260a4356040850152336060850152610105604051948886019060609060018060a01b03815116835260208101516020840152604081015160408401528160018060a01b0391015116910152565b6080845261011460a0856105e8565b60405190610121826105b0565b8152868101938452604081019586528660608201986024358a526080830160443581526040519a8b998a98899663776c79a960e11b88526080600489015260018060a01b0390511660848801525160a060a48801528051958691826101248a0152018888015e8585018701889052516001600160a01b031660c48601525160e485015251610104840152602483015233604483018190526064830152601f01601f191681010301925af1801561021a575f906101e3575b602090604051908152f35b506020813d602011610212575b816101fd602093836105e8565b8101031261020e57602090516101d8565b5f80fd5b3d91506101f0565b6040513d5f823e3d90fd5b3461020e57602036600319011261020e57600435905f8160248160018060a01b038454166328c44a9960e21b82528660048301525afa801561021a575f90610495575b61012001518051810192915060208184031261020e5760208101519067ffffffffffffffff821161020e57019160a08382031261020e57604051906102ac826105b0565b6102b86020850161061f565b8252604084015167ffffffffffffffff811161020e576102e460a0916020806080950191880101610640565b948560208501526102f76060820161061f565b6040850152828101516060850152015191015260808280518101031261020e57610351608060405193610329856105cc565b6103356020820161061f565b855260408101516020860152606081015160408601520161061f565b6060830190815260025460408051632daf79cd60e01b815285516001600160a01b0390811660048301526020808801516024840152929096015160448201529251851660648401529193849160c49183915f91163360848401523360a48401525af191821561021a575f92610460575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af190811561021a575f91610426575b501561041757602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d602011610458575b81610441602093836105e8565b8101031261020e5761045290610633565b82610406565b3d9150610434565b9091506020813d60201161048d575b8161047c602093836105e8565b8101031261020e57519060206103c1565b3d915061046f565b503d805f833e6104a581836105e8565b81019060208183031261020e5780519067ffffffffffffffff821161020e57016101408183031261020e5760405190610140820182811067ffffffffffffffff82111761059c5760405280518252602081015160208301526105096040820161060a565b604083015261051a6060820161060a565b606083015261052b6080820161060a565b608083015260a081015160a083015261054660c0820161061f565b60c083015261055760e0820161061f565b60e08301526105696101008201610633565b6101008301526101208101519267ffffffffffffffff841161020e57610120936105939201610640565b82820152610268565b634e487b7160e01b5f52604160045260245ffd5b60a0810190811067ffffffffffffffff82111761059c57604052565b6080810190811067ffffffffffffffff82111761059c57604052565b90601f8019910116810190811067ffffffffffffffff82111761059c57604052565b519067ffffffffffffffff8216820361020e57565b51906001600160a01b038216820361020e57565b5190811515820361020e57565b81601f8201121561020e5780519067ffffffffffffffff821161059c5760405192610675601f8401601f1916602001856105e8565b8284526020838301011161020e57815f9260208093018386015e830101529056fea2646970667358221220374a455dc5593bbc1cb2e528c99a7f76abcb9d37ae5b17ff74538c8871b27b6064736f6c634300081b0033",
    "sourceMap": "394:3011:98:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;394:3011:98;;;;;;-1:-1:-1;;;;;394:3011:98;;;;;;;;;;-1:-1:-1;;;;;394:3011:98;;;;;;;;;;;;;;;;;;;;;1363:14;394:3011;;;;;-1:-1:-1;;;;;394:3011:98;;;;;;;;;;;;;;;;:::i;:::-;;;;;1444:249;;;394:3011;;;;1444:249;;394:3011;1656:10;394:3011;1444:249;;394:3011;;;;1408:307;;;;394:3011;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1408:307;;;394:3011;1408:307;;:::i;:::-;394:3011;;;;;;:::i;:::-;;;1169:565;;;394:3011;;;;1169:565;;394:3011;;;1169:565;394:3011;1169:565;;394:3011;;;;;;1169:565;;394:3011;;;;;;;;;;;;;;;;1121:711;;394:3011;;1121:711;;394:3011;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;394:3011:98;;;;;;;;;;;;;;;;;;;1656:10;394:3011;;;;;;;;;;;;-1:-1:-1;;394:3011:98;;;1121:711;;;;;;;;;394:3011;1121:711;;;394:3011;;;;;;;;;1121:711;;394:3011;1121:711;;394:3011;1121:711;;;;;;394:3011;1121:711;;;:::i;:::-;;;394:3011;;;;;;;1121:711;;394:3011;;;;1121:711;;;-1:-1:-1;1121:711:98;;;394:3011;;;;;;;;;;;;;;;-1:-1:-1;;394:3011:98;;;;;;;;;2966:34;394:3011;;;;;;;;;;;;2966:34;;;394:3011;2966:34;;394:3011;2966:34;;;;;;394:3011;2966:34;;;394:3011;3092:8;;;394:3011;;3068:95;;;394:3011;-1:-1:-1;394:3011:98;;;;;;;;3068:95;;394:3011;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;;3068:95;394:3011;3068:95;394:3011;3068:95;;394:3011;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;3228:105;;394:3011;;;;;;;;;;;;:::i;:::-;;;3228:105;;394:3011;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;2039:14;394:3011;;;;-1:-1:-1;;;2039:109:98;;394:3011;;-1:-1:-1;;;;;394:3011:98;;;;2039:109;;394:3011;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2039:109;;394:3011;;;;;2104:10;394:3011;;;;2104:10;394:3011;;;;2039:109;;;;;;;394:3011;2039:109;;;394:3011;-1:-1:-1;394:3011:98;;;;-1:-1:-1;;;2164:61:98;;394:3011;2164:61;;394:3011;;;;2966:34;394:3011;;;;;;;;;2164:61;;394:3011;;;;-1:-1:-1;;;;;394:3011:98;2164:61;;;;;;;394:3011;2164:61;;;394:3011;2163:62;;2159:123;;394:3011;;;;;;;;2159:123;2248:23;;;394:3011;2248:23;394:3011;;2248:23;2164:61;;;394:3011;2164:61;;394:3011;2164:61;;;;;;394:3011;2164:61;;;:::i;:::-;;;394:3011;;;;;;;:::i;:::-;2164:61;;;;;;-1:-1:-1;2164:61:98;;2039:109;;;;394:3011;2039:109;;394:3011;2039:109;;;;;;394:3011;2039:109;;;:::i;:::-;;;394:3011;;;;;;;2039:109;;;;;-1:-1:-1;2039:109:98;;2966:34;;;;394:3011;2966:34;;;;;;:::i;:::-;;;394:3011;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;3092:8;394:3011;;;;;:::i;:::-;;;;;2966:34;;394:3011;;;;;;;;;2966:34;394:3011;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;394:3011:98;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;394:3011:98;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;394:3011:98;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "buyErc1155ForErc1155(address,uint256,uint256,address,uint256,uint256,uint64)": "78a56f8f",
    "payErc1155ForErc1155(bytes32)": "33666e5f"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ERC1155EscrowObligation\",\"name\":\"_erc1155Escrow\",\"type\":\"address\"},{\"internalType\":\"contract ERC1155PaymentObligation\",\"name\":\"_erc1155Payment\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"CouldntCollectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"bidAmount\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"askAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc1155ForErc1155\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"buyAttestation\",\"type\":\"bytes32\"}],\"name\":\"payErc1155ForErc1155\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/utils/ERC1155BarterUtils.sol\":\"ERC1155BarterUtils\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746\",\"dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce\",\"dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol\":{\"keccak256\":\"0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd\",\"dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9\",\"dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f\",\"dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x9054efbe0d83eee80617895c7ec3c7457b414f2bcfad00fbf4f37e46e64f06d5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c4bf82d91e2b4a82ec0936298e4026ff84f6745e332a5732e509e3f6cfe9ae36\",\"dweb:/ipfs/QmbTyZSQrfBX8ySdxmMGKv5KwKKU634Pm2k2BV9EpGXz1r\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/obligations/ERC1155EscrowObligation.sol\":{\"keccak256\":\"0x70912a074195aa69c7a6094d6027c43a454bbcf64a08cc2177e86d05b88a0faa\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://191bc3e1c9bf72ad16ff4309c5eefb6d3172efc978b41a30bf57dee31590a291\",\"dweb:/ipfs/QmV78tQXDu64tvCLRmKiSyiBfrGnHRLfN9CE6VTfaTqNqP\"]},\"src/obligations/ERC1155PaymentObligation.sol\":{\"keccak256\":\"0x883be89f1fc33f68d925867c5b042dcf9fc22ce814c7e12cca85ffa9c4d36215\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6849f3fb741543bde31f0aa1f4284401f8ee0215e5fe76d0e20ce996eece136e\",\"dweb:/ipfs/QmSCDadpQNCuVTLSYpFb7yoRxKAe5bB6RTmpCBGirfn3P2\"]},\"src/utils/ERC1155BarterUtils.sol\":{\"keccak256\":\"0x3f5db3f53fd41ca1a15a88b610645c3adc0c3f9cb8c500197c66df932c0f22b3\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://545637024619b10a00b72f3c0e0498b24fbc9d0e734686c9d1a218d2f601e7e7\",\"dweb:/ipfs/QmUh3Sg1YRCQzMdGrCLhekMo5kkmbYr6mPHiSdrJudsKFP\"]}},\"version\":1}",
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
            },
            {
              "internalType": "contract ERC1155EscrowObligation",
              "name": "_erc1155Escrow",
              "type": "address"
            },
            {
              "internalType": "contract ERC1155PaymentObligation",
              "name": "_erc1155Payment",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "CouldntCollectPayment"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "bidToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "bidTokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bidAmount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "askToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "askId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "askAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "expiration",
              "type": "uint64"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "buyErc1155ForErc1155",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "buyAttestation",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "payErc1155ForErc1155",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
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
        "src/utils/ERC1155BarterUtils.sol": "ERC1155BarterUtils"
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
      "lib/eas-contracts/contracts/Semver.sol": {
        "keccak256": "0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9",
        "urls": [
          "bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808",
          "dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"
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
      "lib/eas-contracts/contracts/resolver/SchemaResolver.sol": {
        "keccak256": "0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983",
        "urls": [
          "bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828",
          "dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol": {
        "keccak256": "0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7",
        "urls": [
          "bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746",
          "dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol": {
        "keccak256": "0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7",
        "urls": [
          "bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce",
          "dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol": {
        "keccak256": "0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50",
        "urls": [
          "bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd",
          "dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Panic.sol": {
        "keccak256": "0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c",
        "urls": [
          "bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4",
          "dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Strings.sol": {
        "keccak256": "0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2",
        "urls": [
          "bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440",
          "dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol": {
        "keccak256": "0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e",
        "urls": [
          "bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9",
          "dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": {
        "keccak256": "0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c",
        "urls": [
          "bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e",
          "dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/Math.sol": {
        "keccak256": "0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c",
        "urls": [
          "bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966",
          "dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol": {
        "keccak256": "0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481",
        "urls": [
          "bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb",
          "dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol": {
        "keccak256": "0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0",
        "urls": [
          "bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426",
          "dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"
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
      "src/BaseStatement.sol": {
        "keccak256": "0x9054efbe0d83eee80617895c7ec3c7457b414f2bcfad00fbf4f37e46e64f06d5",
        "urls": [
          "bzz-raw://c4bf82d91e2b4a82ec0936298e4026ff84f6745e332a5732e509e3f6cfe9ae36",
          "dweb:/ipfs/QmbTyZSQrfBX8ySdxmMGKv5KwKKU634Pm2k2BV9EpGXz1r"
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
      "src/obligations/ERC1155EscrowObligation.sol": {
        "keccak256": "0x70912a074195aa69c7a6094d6027c43a454bbcf64a08cc2177e86d05b88a0faa",
        "urls": [
          "bzz-raw://191bc3e1c9bf72ad16ff4309c5eefb6d3172efc978b41a30bf57dee31590a291",
          "dweb:/ipfs/QmV78tQXDu64tvCLRmKiSyiBfrGnHRLfN9CE6VTfaTqNqP"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/ERC1155PaymentObligation.sol": {
        "keccak256": "0x883be89f1fc33f68d925867c5b042dcf9fc22ce814c7e12cca85ffa9c4d36215",
        "urls": [
          "bzz-raw://6849f3fb741543bde31f0aa1f4284401f8ee0215e5fe76d0e20ce996eece136e",
          "dweb:/ipfs/QmSCDadpQNCuVTLSYpFb7yoRxKAe5bB6RTmpCBGirfn3P2"
        ],
        "license": "UNLICENSED"
      },
      "src/utils/ERC1155BarterUtils.sol": {
        "keccak256": "0x3f5db3f53fd41ca1a15a88b610645c3adc0c3f9cb8c500197c66df932c0f22b3",
        "urls": [
          "bzz-raw://545637024619b10a00b72f3c0e0498b24fbc9d0e734686c9d1a218d2f601e7e7",
          "dweb:/ipfs/QmUh3Sg1YRCQzMdGrCLhekMo5kkmbYr6mPHiSdrJudsKFP"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 98
} as const;