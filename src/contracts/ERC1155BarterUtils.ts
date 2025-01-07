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
    "object": "0x60803460b957601f61079e38819003918201601f19168301916001600160401b0383118484101760bd5780849260609460405283398101031260b95780516001600160a01b038116919082900360b95760208101516001600160a01b038116919082900360b957604001516001600160a01b038116929083900360b95760018060a01b03195f5416175f5560018060a01b0319600154161760015560018060a01b031960025416176002556040516106cc90816100d28239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c90816333666e5f1461022457506378a56f8f14610032575f80fd5b3461020d5760e036600319011261020d576004356001600160a01b0381169081900361020d576064356001600160a01b0381169081900361020d5760c4359067ffffffffffffffff821680920361020d5760209160018060a01b0360015416905f61014460018060a01b036002541696604051956100af876105cc565b86526084358787015260a4356040870152336060870152610105604051968888019060609060018060a01b03815116835260208101516020840152604081015160408401528160018060a01b0391015116910152565b6080865261011460a0876105e8565b60405190610121826105b0565b81528680820194602435865260408301976044358952606084019a8b52608084019081526040519a8b998a98899663797b468160e01b88526080600489015260018060a01b0390511660848801525160a48701525160c486015260018060a01b0390511660e48501525160a0610104850152805192839182610124870152018585015e848483850101526024830152336044830152336064830152601f801991011681010301925af18015610219575f906101e2575b602090604051908152f35b506020813d602011610211575b816101fc602093836105e8565b8101031261020d57602090516101d7565b5f80fd5b3d91506101ef565b6040513d5f823e3d90fd5b3461020d57602036600319011261020d57600435905f8160248160018060a01b038454166328c44a9960e21b82528660048301525afa8015610219575f90610495575b61012001518051810192915060208184031261020d5760208101519067ffffffffffffffff821161020d570160a08184031261020d57604051906102aa826105b0565b6102b66020820161061f565b825260408101516020830152606081015160408301526102d86080820161061f565b606083015260a08101519067ffffffffffffffff821161020d576020610305928160809701920101610640565b928391015260808280518101031261020d57610351608060405193610329856105cc565b6103356020820161061f565b855260408101516020860152606081015160408601520161061f565b6060830190815260025460408051632daf79cd60e01b815285516001600160a01b0390811660048301526020808801516024840152929096015160448201529251851660648401529193849160c49183915f91163360848401523360a48401525af1918215610219575f92610460575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af1908115610219575f91610426575b501561041757602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d602011610458575b81610441602093836105e8565b8101031261020d5761045290610633565b82610406565b3d9150610434565b9091506020813d60201161048d575b8161047c602093836105e8565b8101031261020d57519060206103c1565b3d915061046f565b503d805f833e6104a581836105e8565b81019060208183031261020d5780519067ffffffffffffffff821161020d57016101408183031261020d5760405190610140820182811067ffffffffffffffff82111761059c5760405280518252602081015160208301526105096040820161060a565b604083015261051a6060820161060a565b606083015261052b6080820161060a565b608083015260a081015160a083015261054660c0820161061f565b60c083015261055760e0820161061f565b60e08301526105696101008201610633565b6101008301526101208101519267ffffffffffffffff841161020d57610120936105939201610640565b82820152610267565b634e487b7160e01b5f52604160045260245ffd5b60a0810190811067ffffffffffffffff82111761059c57604052565b6080810190811067ffffffffffffffff82111761059c57604052565b90601f8019910116810190811067ffffffffffffffff82111761059c57604052565b519067ffffffffffffffff8216820361020d57565b51906001600160a01b038216820361020d57565b5190811515820361020d57565b81601f8201121561020d5780519067ffffffffffffffff821161059c5760405192610675601f8401601f1916602001856105e8565b8284526020838301011161020d57815f9260208093018386015e830101529056fea2646970667358221220c6b64d301696ca7fba766f9688e9dd94e8e2be1e172244e72944ec235e75ccf364736f6c634300081a0033",
    "sourceMap": "381:3011:82:-:0;;;;;;;;;;;;;-1:-1:-1;;381:3011:82;;;;-1:-1:-1;;;;;381:3011:82;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;381:3011:82;;;;;;;;;;;;;-1:-1:-1;;;;;381:3011:82;;;;;;;;;;;;-1:-1:-1;;;;;381:3011:82;;;;;;;;;;;;;;;-1:-1:-1;381:3011:82;;;-1:-1:-1;381:3011:82;;;;;;;746:30;381:3011;;;746:30;381:3011;;;;;;;786:32;381:3011;;;786:32;381:3011;;;;;;;;;;;-1:-1:-1;381:3011:82;;;;;;-1:-1:-1;381:3011:82;;;;;-1:-1:-1;381:3011:82",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c90816333666e5f1461022457506378a56f8f14610032575f80fd5b3461020d5760e036600319011261020d576004356001600160a01b0381169081900361020d576064356001600160a01b0381169081900361020d5760c4359067ffffffffffffffff821680920361020d5760209160018060a01b0360015416905f61014460018060a01b036002541696604051956100af876105cc565b86526084358787015260a4356040870152336060870152610105604051968888019060609060018060a01b03815116835260208101516020840152604081015160408401528160018060a01b0391015116910152565b6080865261011460a0876105e8565b60405190610121826105b0565b81528680820194602435865260408301976044358952606084019a8b52608084019081526040519a8b998a98899663797b468160e01b88526080600489015260018060a01b0390511660848801525160a48701525160c486015260018060a01b0390511660e48501525160a0610104850152805192839182610124870152018585015e848483850101526024830152336044830152336064830152601f801991011681010301925af18015610219575f906101e2575b602090604051908152f35b506020813d602011610211575b816101fc602093836105e8565b8101031261020d57602090516101d7565b5f80fd5b3d91506101ef565b6040513d5f823e3d90fd5b3461020d57602036600319011261020d57600435905f8160248160018060a01b038454166328c44a9960e21b82528660048301525afa8015610219575f90610495575b61012001518051810192915060208184031261020d5760208101519067ffffffffffffffff821161020d570160a08184031261020d57604051906102aa826105b0565b6102b66020820161061f565b825260408101516020830152606081015160408301526102d86080820161061f565b606083015260a08101519067ffffffffffffffff821161020d576020610305928160809701920101610640565b928391015260808280518101031261020d57610351608060405193610329856105cc565b6103356020820161061f565b855260408101516020860152606081015160408601520161061f565b6060830190815260025460408051632daf79cd60e01b815285516001600160a01b0390811660048301526020808801516024840152929096015160448201529251851660648401529193849160c49183915f91163360848401523360a48401525af1918215610219575f92610460575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af1908115610219575f91610426575b501561041757602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d602011610458575b81610441602093836105e8565b8101031261020d5761045290610633565b82610406565b3d9150610434565b9091506020813d60201161048d575b8161047c602093836105e8565b8101031261020d57519060206103c1565b3d915061046f565b503d805f833e6104a581836105e8565b81019060208183031261020d5780519067ffffffffffffffff821161020d57016101408183031261020d5760405190610140820182811067ffffffffffffffff82111761059c5760405280518252602081015160208301526105096040820161060a565b604083015261051a6060820161060a565b606083015261052b6080820161060a565b608083015260a081015160a083015261054660c0820161061f565b60c083015261055760e0820161061f565b60e08301526105696101008201610633565b6101008301526101208101519267ffffffffffffffff841161020d57610120936105939201610640565b82820152610267565b634e487b7160e01b5f52604160045260245ffd5b60a0810190811067ffffffffffffffff82111761059c57604052565b6080810190811067ffffffffffffffff82111761059c57604052565b90601f8019910116810190811067ffffffffffffffff82111761059c57604052565b519067ffffffffffffffff8216820361020d57565b51906001600160a01b038216820361020d57565b5190811515820361020d57565b81601f8201121561020d5780519067ffffffffffffffff821161059c5760405192610675601f8401601f1916602001856105e8565b8284526020838301011161020d57815f9260208093018386015e830101529056fea2646970667358221220c6b64d301696ca7fba766f9688e9dd94e8e2be1e172244e72944ec235e75ccf364736f6c634300081a0033",
    "sourceMap": "381:3011:82:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;381:3011:82;;;;;;-1:-1:-1;;;;;381:3011:82;;;;;;;;;;-1:-1:-1;;;;;381:3011:82;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1350:14;381:3011;;;;;;;;;:::i;:::-;;;;;1431:249;;;381:3011;;;;1431:249;;381:3011;1643:10;381:3011;1431:249;;381:3011;;;;1395:307;;;;381:3011;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1395:307;;;381:3011;1395:307;;:::i;:::-;381:3011;;;;;;:::i;:::-;;;1156:565;;;;381:3011;;;;;;1156:565;;381:3011;;;;;;1156:565;;381:3011;;;;1156:565;;381:3011;;;;;;;;;;;;;;;1108:711;;381:3011;;1108:711;;381:3011;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1643:10;381:3011;;;;1643:10;381:3011;;;;;;;;;;;;1108:711;;;;;;;;;381:3011;1108:711;;;381:3011;;;;;;;;;1108:711;;381:3011;1108:711;;381:3011;1108:711;;;;;;381:3011;1108:711;;;:::i;:::-;;;381:3011;;;;;;;1108:711;;381:3011;;;;1108:711;;;-1:-1:-1;1108:711:82;;;381:3011;;;;;;;;;;;;;;;-1:-1:-1;;381:3011:82;;;;;;;;;2953:34;381:3011;;;;;;;;;;;;2953:34;;;381:3011;2953:34;;381:3011;2953:34;;;;;;381:3011;2953:34;;;381:3011;3079:8;;;381:3011;;3055:95;;;381:3011;-1:-1:-1;381:3011:82;;;;;;;;3055:95;;381:3011;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;3055:95;;381:3011;3055:95;;381:3011;;;;:::i;:::-;;;;;;;;;;3215:105;;381:3011;;;;;;;;;;;;:::i;:::-;;;3215:105;;381:3011;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;2026:14;381:3011;;;;-1:-1:-1;;;2026:109:82;;381:3011;;-1:-1:-1;;;;;381:3011:82;;;;2026:109;;381:3011;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2026:109;;381:3011;;;;;2091:10;381:3011;;;;2091:10;381:3011;;;;2026:109;;;;;;;381:3011;2026:109;;;381:3011;-1:-1:-1;381:3011:82;;;;-1:-1:-1;;;2151:61:82;;381:3011;2151:61;;381:3011;;;;2953:34;381:3011;;;;;;;;;2151:61;;381:3011;;;;-1:-1:-1;;;;;381:3011:82;2151:61;;;;;;;381:3011;2151:61;;;381:3011;2150:62;;2146:123;;381:3011;;;;;;;;2146:123;2235:23;;;381:3011;2235:23;381:3011;;2235:23;2151:61;;;381:3011;2151:61;;381:3011;2151:61;;;;;;381:3011;2151:61;;;:::i;:::-;;;381:3011;;;;;;;:::i;:::-;2151:61;;;;;;-1:-1:-1;2151:61:82;;2026:109;;;;381:3011;2026:109;;381:3011;2026:109;;;;;;381:3011;2026:109;;;:::i;:::-;;;381:3011;;;;;;;2026:109;;;;;-1:-1:-1;2026:109:82;;2953:34;;;;381:3011;2953:34;;;;;;:::i;:::-;;;381:3011;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;3079:8;381:3011;;;;;:::i;:::-;;;;;2953:34;;381:3011;;;;;;;;;2953:34;381:3011;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;381:3011:82;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;381:3011:82;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;381:3011:82;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "buyErc1155ForErc1155(address,uint256,uint256,address,uint256,uint256,uint64)": "78a56f8f",
    "payErc1155ForErc1155(bytes32)": "33666e5f"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ERC1155EscrowObligation\",\"name\":\"_erc1155Escrow\",\"type\":\"address\"},{\"internalType\":\"contract ERC1155PaymentObligation\",\"name\":\"_erc1155Payment\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"CouldntCollectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"bidAmount\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"askAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc1155ForErc1155\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"buyAttestation\",\"type\":\"bytes32\"}],\"name\":\"payErc1155ForErc1155\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Utils/ERC1155BarterUtils.sol\":\"ERC1155BarterUtils\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746\",\"dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265\",\"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147\",\"dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Statements/ERC1155EscrowObligation.sol\":{\"keccak256\":\"0x42bd6af94b0b4c7933897bfd4680e0c6805c3008b8dab583ec62eb258238c351\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://0e4dc392f2f1f408dc0fdd1be731ba51ef9cca1554a51e6bc6b6c9dc893df3b5\",\"dweb:/ipfs/QmcL6tnRfWQ6Sb53VHsAYToQ9bxW1WmcpDCWWtxa9czveN\"]},\"src/Statements/ERC1155PaymentObligation.sol\":{\"keccak256\":\"0x28ff38a43b13b092d04ab9be2e5327d8e83c19738d13273451fcbe4916767a84\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://cf233578b099e9743394e5b0ea9dbd8832c45ab4100139924842a9bdbf08aec4\",\"dweb:/ipfs/QmeQHSBUgWwsKaqgcfez7X3s1opJGJQGyXstkkhfFAt4ZD\"]},\"src/Utils/ERC1155BarterUtils.sol\":{\"keccak256\":\"0xd6d94ba59b4a12ab45d7d780287025aa3cec88a6fd29b639e27e6d81b3bf6a65\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6affc0d10e03e5b64adf79f699529c9b154869d82fb1940f442c451588820441\",\"dweb:/ipfs/QmZeNi4nBxkn37BDoPS7gYDqPgQzYvzYaYZD5t9jxr2PN5\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.26+commit.8a97fa7a"
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
        "src/Utils/ERC1155BarterUtils.sol": "ERC1155BarterUtils"
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
        "keccak256": "0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c",
        "urls": [
          "bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265",
          "dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseStatement.sol": {
        "keccak256": "0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57",
        "urls": [
          "bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147",
          "dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q"
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
      "src/Statements/ERC1155EscrowObligation.sol": {
        "keccak256": "0x42bd6af94b0b4c7933897bfd4680e0c6805c3008b8dab583ec62eb258238c351",
        "urls": [
          "bzz-raw://0e4dc392f2f1f408dc0fdd1be731ba51ef9cca1554a51e6bc6b6c9dc893df3b5",
          "dweb:/ipfs/QmcL6tnRfWQ6Sb53VHsAYToQ9bxW1WmcpDCWWtxa9czveN"
        ],
        "license": "UNLICENSED"
      },
      "src/Statements/ERC1155PaymentObligation.sol": {
        "keccak256": "0x28ff38a43b13b092d04ab9be2e5327d8e83c19738d13273451fcbe4916767a84",
        "urls": [
          "bzz-raw://cf233578b099e9743394e5b0ea9dbd8832c45ab4100139924842a9bdbf08aec4",
          "dweb:/ipfs/QmeQHSBUgWwsKaqgcfez7X3s1opJGJQGyXstkkhfFAt4ZD"
        ],
        "license": "UNLICENSED"
      },
      "src/Utils/ERC1155BarterUtils.sol": {
        "keccak256": "0xd6d94ba59b4a12ab45d7d780287025aa3cec88a6fd29b639e27e6d81b3bf6a65",
        "urls": [
          "bzz-raw://6affc0d10e03e5b64adf79f699529c9b154869d82fb1940f442c451588820441",
          "dweb:/ipfs/QmZeNi4nBxkn37BDoPS7gYDqPgQzYvzYaYZD5t9jxr2PN5"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 82
} as const;