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
          "name": "_erc721Escrow",
          "type": "address",
          "internalType": "contract ERC721EscrowObligation"
        },
        {
          "name": "_erc721Payment",
          "type": "address",
          "internalType": "contract ERC721PaymentObligation"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "buyErc721ForErc721",
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
          "name": "askToken",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "askTokenId",
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
      "name": "payErc721ForErc721",
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
    "object": "0x60803460b957601f61076038819003918201601f19168301916001600160401b0383118484101760bd5780849260609460405283398101031260b95780516001600160a01b038116919082900360b95760208101516001600160a01b038116919082900360b957604001516001600160a01b038116929083900360b95760018060a01b03195f5416175f5560018060a01b0319600154161760015560018060a01b0319600254161760025560405161068e90816100d28239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c908163ebb48d90146103b1575063eff69b5e14610032575f80fd5b3461024a57602036600319011261024a5760043560245f60018060a01b03815416604051928380926328c44a9960e21b82528660048301525afa8015610256575f90610296575b61012001518051810192915060208184031261024a5760208101519067ffffffffffffffff821161024a57019160808382031261024a57604051906100bd8261058e565b6100c9602085016105e1565b8252604084015167ffffffffffffffff811161024a576100f56080916020806060950191880101610602565b948560208501526101078382016105e1565b6040850152015191015260608280518101031261024a5761014e60606040519361013085610572565b61013c602082016105e1565b855260408101516020860152016105e1565b60408381019182526002549051630fba221960e41b815284516001600160a01b03908116600483015260209586015160248301529251831660448201529391849160a49183915f91163360648401523360848401525af1918215610256575f92610261575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af1908115610256575f91610218575b501561020957602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d60201161024e575b81610233602093836105aa565b8101031261024a57610244906105f5565b5f6101f8565b5f80fd5b3d9150610226565b6040513d5f823e3d90fd5b9091506020813d60201161028e575b8161027d602093836105aa565b8101031261024a57519060206101b3565b3d9150610270565b503d805f833e6102a681836105aa565b81019060208183031261024a5780519067ffffffffffffffff821161024a57016101408183031261024a5760405190610140820182811067ffffffffffffffff82111761039d57604052805182526020810151602083015261030a604082016105cc565b604083015261031b606082016105cc565b606083015261032c608082016105cc565b608083015260a081015160a083015261034760c082016105e1565b60c083015261035860e082016105e1565b60e083015261036a61010082016105f5565b6101008301526101208101519267ffffffffffffffff841161024a57610120936103949201610602565b82820152610079565b634e487b7160e01b5f52604160045260245ffd5b3461024a5760a036600319011261024a576004356001600160a01b038116919082900361024a576044356001600160a01b038116929083900361024a576084359267ffffffffffffffff841680940361024a576001546002546020946001600160a01b039283169390925f926101249291169061042d85610572565b845260643587850152336040850152610471604051948886019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b606084526104806080856105aa565b6040519061048d8261058e565b8152868101938452604081019586528660608201986024358a52604051998a98899788956307e738a360e11b87526080600488015260018060a01b03905116608487015251608060a4870152805194859182610104890152018787015e8484018601879052516001600160a01b031660c48501525160e4840152602483015233604483018190526064830152601f01601f191681010301925af18015610256575f9061053f575b602090604051908152f35b506020813d60201161056a575b81610559602093836105aa565b8101031261024a5760209051610534565b3d915061054c565b6060810190811067ffffffffffffffff82111761039d57604052565b6080810190811067ffffffffffffffff82111761039d57604052565b90601f8019910116810190811067ffffffffffffffff82111761039d57604052565b519067ffffffffffffffff8216820361024a57565b51906001600160a01b038216820361024a57565b5190811515820361024a57565b81601f8201121561024a5780519067ffffffffffffffff821161039d5760405192610637601f8401601f1916602001856105aa565b8284526020838301011161024a57815f9260208093018386015e830101529056fea2646970667358221220f59c000dc189774849275832ff316d845b97f6b8d898ae4047ee82c307e72a0964736f6c634300081b0033",
    "sourceMap": "387:2747:108:-:0;;;;;;;;;;;;;-1:-1:-1;;387:2747:108;;;;-1:-1:-1;;;;;387:2747:108;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;387:2747:108;;;;;;;;;;;;;-1:-1:-1;;;;;387:2747:108;;;;;;;;;;;;-1:-1:-1;;;;;387:2747:108;;;;;;;;;;;;;;;-1:-1:-1;387:2747:108;;;-1:-1:-1;387:2747:108;;;;;;;743:28;387:2747;;;743:28;387:2747;;;;;;;781:30;387:2747;;;781:30;387:2747;;;;;;;;;;;-1:-1:-1;387:2747:108;;;;;;-1:-1:-1;387:2747:108;;;;;-1:-1:-1;387:2747:108",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c908163ebb48d90146103b1575063eff69b5e14610032575f80fd5b3461024a57602036600319011261024a5760043560245f60018060a01b03815416604051928380926328c44a9960e21b82528660048301525afa8015610256575f90610296575b61012001518051810192915060208184031261024a5760208101519067ffffffffffffffff821161024a57019160808382031261024a57604051906100bd8261058e565b6100c9602085016105e1565b8252604084015167ffffffffffffffff811161024a576100f56080916020806060950191880101610602565b948560208501526101078382016105e1565b6040850152015191015260608280518101031261024a5761014e60606040519361013085610572565b61013c602082016105e1565b855260408101516020860152016105e1565b60408381019182526002549051630fba221960e41b815284516001600160a01b03908116600483015260209586015160248301529251831660448201529391849160a49183915f91163360648401523360848401525af1918215610256575f92610261575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af1908115610256575f91610218575b501561020957602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d60201161024e575b81610233602093836105aa565b8101031261024a57610244906105f5565b5f6101f8565b5f80fd5b3d9150610226565b6040513d5f823e3d90fd5b9091506020813d60201161028e575b8161027d602093836105aa565b8101031261024a57519060206101b3565b3d9150610270565b503d805f833e6102a681836105aa565b81019060208183031261024a5780519067ffffffffffffffff821161024a57016101408183031261024a5760405190610140820182811067ffffffffffffffff82111761039d57604052805182526020810151602083015261030a604082016105cc565b604083015261031b606082016105cc565b606083015261032c608082016105cc565b608083015260a081015160a083015261034760c082016105e1565b60c083015261035860e082016105e1565b60e083015261036a61010082016105f5565b6101008301526101208101519267ffffffffffffffff841161024a57610120936103949201610602565b82820152610079565b634e487b7160e01b5f52604160045260245ffd5b3461024a5760a036600319011261024a576004356001600160a01b038116919082900361024a576044356001600160a01b038116929083900361024a576084359267ffffffffffffffff841680940361024a576001546002546020946001600160a01b039283169390925f926101249291169061042d85610572565b845260643587850152336040850152610471604051948886019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b606084526104806080856105aa565b6040519061048d8261058e565b8152868101938452604081019586528660608201986024358a52604051998a98899788956307e738a360e11b87526080600488015260018060a01b03905116608487015251608060a4870152805194859182610104890152018787015e8484018601879052516001600160a01b031660c48501525160e4840152602483015233604483018190526064830152601f01601f191681010301925af18015610256575f9061053f575b602090604051908152f35b506020813d60201161056a575b81610559602093836105aa565b8101031261024a5760209051610534565b3d915061054c565b6060810190811067ffffffffffffffff82111761039d57604052565b6080810190811067ffffffffffffffff82111761039d57604052565b90601f8019910116810190811067ffffffffffffffff82111761039d57604052565b519067ffffffffffffffff8216820361024a57565b51906001600160a01b038216820361024a57565b5190811515820361024a57565b81601f8201121561024a5780519067ffffffffffffffff821161039d5760405192610637601f8401601f1916602001856105aa565b8284526020838301011161024a57815f9260208093018386015e830101529056fea2646970667358221220f59c000dc189774849275832ff316d845b97f6b8d898ae4047ee82c307e72a0964736f6c634300081b0033",
    "sourceMap": "387:2747:108:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;387:2747:108;;;;;;2701:34;387:2747;;;;;;;;;;;;;;;;;;2701:34;;;387:2747;2701:34;;387:2747;2701:34;;;;;;387:2747;2701:34;;;387:2747;2826:8;;;387:2747;;2802:94;;;387:2747;-1:-1:-1;387:2747:108;;;;;;;;2802:94;;387:2747;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;;2802:94;387:2747;2802:94;387:2747;2802:94;;387:2747;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;2960:104;;387:2747;;;;;;;;;;;;:::i;:::-;;;2960:104;;387:2747;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;1880:13;387:2747;;;-1:-1:-1;;;1880:108:108;;387:2747;;-1:-1:-1;;;;;387:2747:108;;;;1880:108;;387:2747;;;;;;;;;;;;;;;;;;;;;;1880:108;;387:2747;;;;;1944:10;387:2747;;;;1944:10;387:2747;;;;1880:108;;;;;;;387:2747;1880:108;;;387:2747;-1:-1:-1;387:2747:108;;;;-1:-1:-1;;;2004:60:108;;387:2747;2004:60;;387:2747;;;;2701:34;387:2747;;;;;;;;;2004:60;;387:2747;;;;-1:-1:-1;;;;;387:2747:108;2004:60;;;;;;;387:2747;2004:60;;;387:2747;2003:61;;1999:122;;387:2747;;;;;;;;1999:122;2087:23;;;387:2747;2087:23;387:2747;;2087:23;2004:60;;;387:2747;2004:60;;387:2747;2004:60;;;;;;387:2747;2004:60;;;:::i;:::-;;;387:2747;;;;;;;:::i;:::-;2004:60;;;387:2747;;;;2004:60;;;-1:-1:-1;2004:60:108;;;387:2747;;;;;;;;;1880:108;;;;387:2747;1880:108;;387:2747;1880:108;;;;;;387:2747;1880:108;;;:::i;:::-;;;387:2747;;;;;;;1880:108;;;;;-1:-1:-1;1880:108:108;;2701:34;;;;387:2747;2701:34;;;;;;:::i;:::-;;;387:2747;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;2826:8;387:2747;;;;;:::i;:::-;;;;;2701:34;;387:2747;;;;;;;;;2701:34;387:2747;;;;;;;;-1:-1:-1;;387:2747:108;;;;;;-1:-1:-1;;;;;387:2747:108;;;;;;;;;;;-1:-1:-1;;;;;387:2747:108;;;;;;;;;;;;;;;;;;;;;;1251:13;387:2747;;;-1:-1:-1;;;;;387:2747:108;;;;;;;;;;;;;;;;:::i;:::-;;;;;1331:206;;;387:2747;1500:10;387:2747;1331:206;;387:2747;;;;1295:264;;;;387:2747;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1295:264;;;387:2747;1295:264;;:::i;:::-;387:2747;;;;;;:::i;:::-;;;1097:481;;;387:2747;;;;1097:481;;387:2747;;;1097:481;387:2747;1097:481;;387:2747;;;;;;;;;;;;;;;;;1050:626;;387:2747;;1050:626;;387:2747;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;387:2747:108;;;;;;;;;;;;;;1500:10;387:2747;;;;;;;;;;;;-1:-1:-1;;387:2747:108;;;1050:626;;;;;;;;;387:2747;1050:626;;;387:2747;;;;;;;;;1050:626;;387:2747;1050:626;;387:2747;1050:626;;;;;;387:2747;1050:626;;;:::i;:::-;;;387:2747;;;;;;;1050:626;;;;;-1:-1:-1;1050:626:108;;387:2747;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;1295:264;;387:2747;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;387:2747:108;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;1295:264;387:2747;;-1:-1:-1;;387:2747:108;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;387:2747:108;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "buyErc721ForErc721(address,uint256,address,uint256,uint64)": "ebb48d90",
    "payErc721ForErc721(bytes32)": "eff69b5e"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ERC721EscrowObligation\",\"name\":\"_erc721Escrow\",\"type\":\"address\"},{\"internalType\":\"contract ERC721PaymentObligation\",\"name\":\"_erc721Payment\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"CouldntCollectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc721ForErc721\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"buyAttestation\",\"type\":\"bytes32\"}],\"name\":\"payErc721ForErc721\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/utils/ERC721BarterUtils.sol\":\"ERC721BarterUtils\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827\",\"dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x07e3291877ef07d4c3f38b45b65c466bc1dfb3769202b061138eee00ede6dcd8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://10faced49da8965a251f794c9cf178cdfbe68e82a4bedc9e32ef38e60bdf6d4f\",\"dweb:/ipfs/QmbQegvARUKJWNTXJsToB5gjsSv4iYQm1uejHSvEoLNKAs\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x9054efbe0d83eee80617895c7ec3c7457b414f2bcfad00fbf4f37e46e64f06d5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c4bf82d91e2b4a82ec0936298e4026ff84f6745e332a5732e509e3f6cfe9ae36\",\"dweb:/ipfs/QmbTyZSQrfBX8ySdxmMGKv5KwKKU634Pm2k2BV9EpGXz1r\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0xda1b81af79fa1ebc5ac887338bc4b444b7a7e7c11c8ce9e7eb0904216b923820\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ab2339faefcdba72e5653acb106eea4d26c198d1d67e8b84ea16a62deed46e11\",\"dweb:/ipfs/QmaprRBps4833abdkieGfGoeSr31DTp9m6dVXGZjz2DsZj\"]},\"src/obligations/ERC721EscrowObligation.sol\":{\"keccak256\":\"0x822b63c8e9ce17082d44c1305f8b066b8a7ad94523b1990298da427b25cce626\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://4753ab5ef788ff8922a0eee985792704d5a8fe37a73dd8585a45c914b901d2bd\",\"dweb:/ipfs/QmX2AfqMTpQAtBgqhdP9JLV8YM6wTMaxZxa2DGjeSjMu73\"]},\"src/obligations/ERC721PaymentObligation.sol\":{\"keccak256\":\"0x4b616a65e5563bab5aef9d6c872afbdea9d5fc3c6c24c7b1c2703956673816a7\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://4f0a100af25332c38763e7fd660547832183b9308015b66ff968a9db3cd646cd\",\"dweb:/ipfs/Qme6HeXfWNFdz2LkjVruCXCCe6BBTwCEeDDFP58jVFQnq6\"]},\"src/utils/ERC721BarterUtils.sol\":{\"keccak256\":\"0x6ed2f642b8e5554b53be3a84b3d30b4e5ba28dfd74d22883919326a9f489d930\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://5f028158dc4163f17e35a23291faf120f233d2fd5b174ac8609f31a78e5cbfbb\",\"dweb:/ipfs/QmcUmLPgknCPci3x9BUKDdLtnkvkoQrKVtQ9QbeBG9Whv9\"]}},\"version\":1}",
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
              "internalType": "contract ERC721EscrowObligation",
              "name": "_erc721Escrow",
              "type": "address"
            },
            {
              "internalType": "contract ERC721PaymentObligation",
              "name": "_erc721Payment",
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
              "internalType": "address",
              "name": "askToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "askTokenId",
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
          "name": "buyErc721ForErc721",
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
          "name": "payErc721ForErc721",
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
        "src/utils/ERC721BarterUtils.sol": "ERC721BarterUtils"
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
      "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol": {
        "keccak256": "0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de",
        "urls": [
          "bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827",
          "dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA"
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
      "src/obligations/ERC721EscrowObligation.sol": {
        "keccak256": "0x822b63c8e9ce17082d44c1305f8b066b8a7ad94523b1990298da427b25cce626",
        "urls": [
          "bzz-raw://4753ab5ef788ff8922a0eee985792704d5a8fe37a73dd8585a45c914b901d2bd",
          "dweb:/ipfs/QmX2AfqMTpQAtBgqhdP9JLV8YM6wTMaxZxa2DGjeSjMu73"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/ERC721PaymentObligation.sol": {
        "keccak256": "0x4b616a65e5563bab5aef9d6c872afbdea9d5fc3c6c24c7b1c2703956673816a7",
        "urls": [
          "bzz-raw://4f0a100af25332c38763e7fd660547832183b9308015b66ff968a9db3cd646cd",
          "dweb:/ipfs/Qme6HeXfWNFdz2LkjVruCXCCe6BBTwCEeDDFP58jVFQnq6"
        ],
        "license": "UNLICENSED"
      },
      "src/utils/ERC721BarterUtils.sol": {
        "keccak256": "0x6ed2f642b8e5554b53be3a84b3d30b4e5ba28dfd74d22883919326a9f489d930",
        "urls": [
          "bzz-raw://5f028158dc4163f17e35a23291faf120f233d2fd5b174ac8609f31a78e5cbfbb",
          "dweb:/ipfs/QmcUmLPgknCPci3x9BUKDdLtnkvkoQrKVtQ9QbeBG9Whv9"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 108
} as const;