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
    "object": "0x60803460b957601f61075d38819003918201601f19168301916001600160401b0383118484101760bd5780849260609460405283398101031260b95780516001600160a01b038116919082900360b95760208101516001600160a01b038116919082900360b957604001516001600160a01b038116929083900360b95760018060a01b03195f5416175f5560018060a01b0319600154161760015560018060a01b0319600254161760025560405161068b90816100d28239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c908163ebb48d90146103b2575063eff69b5e14610032575f80fd5b3461024b57602036600319011261024b5760043560245f60018060a01b03815416604051928380926328c44a9960e21b82528660048301525afa8015610257575f90610297575b61012001518051810192915060208184031261024b5760208101519067ffffffffffffffff821161024b570160808184031261024b57604051906100bc8261058b565b6100c8602082016105de565b8252604081015160208301526100e0606082016105de565b604083015260808101519067ffffffffffffffff821161024b57602061010d9281606097019201016105ff565b928391015260608280518101031261024b5761014f6060604051936101318561056f565b61013d602082016105de565b855260408101516020860152016105de565b60408381019182526002549051630fba221960e41b815284516001600160a01b03908116600483015260209586015160248301529251831660448201529391849160a49183915f91163360648401523360848401525af1918215610257575f92610262575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af1908115610257575f91610219575b501561020a57602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d60201161024f575b81610234602093836105a7565b8101031261024b57610245906105f2565b5f6101f9565b5f80fd5b3d9150610227565b6040513d5f823e3d90fd5b9091506020813d60201161028f575b8161027e602093836105a7565b8101031261024b57519060206101b4565b3d9150610271565b503d805f833e6102a781836105a7565b81019060208183031261024b5780519067ffffffffffffffff821161024b57016101408183031261024b5760405190610140820182811067ffffffffffffffff82111761039e57604052805182526020810151602083015261030b604082016105c9565b604083015261031c606082016105c9565b606083015261032d608082016105c9565b608083015260a081015160a083015261034860c082016105de565b60c083015261035960e082016105de565b60e083015261036b61010082016105f2565b6101008301526101208101519267ffffffffffffffff841161024b576101209361039592016105ff565b82820152610079565b634e487b7160e01b5f52604160045260245ffd5b3461024b5760a036600319011261024b576004356001600160a01b0381169081900361024b576044356001600160a01b0381169081900361024b576084359167ffffffffffffffff831680930361024b576020925f61012460018060a01b03600154169360018060a01b03600254169561042b8961056f565b88526064358789015233604089015261046f60405198888a019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b6060885261047e6080896105a7565b6040519061048b8261058b565b8152602435878201908152604080830197885260608301998a5251636b72870760e01b815260806004820181905292516001600160a01b039081166084830152915160a482015296511660c4870152965160e486019790975286516101048601819052949687958694859282908a018585015e848483850101526024830152336044830152336064830152601f801991011681010301925af18015610257575f9061053c575b602090604051908152f35b506020813d602011610567575b81610556602093836105a7565b8101031261024b5760209051610531565b3d9150610549565b6060810190811067ffffffffffffffff82111761039e57604052565b6080810190811067ffffffffffffffff82111761039e57604052565b90601f8019910116810190811067ffffffffffffffff82111761039e57604052565b519067ffffffffffffffff8216820361024b57565b51906001600160a01b038216820361024b57565b5190811515820361024b57565b81601f8201121561024b5780519067ffffffffffffffff821161039e5760405192610634601f8401601f1916602001856105a7565b8284526020838301011161024b57815f9260208093018386015e830101529056fea264697066735822122063bc3986c31dda64d45e919227635b042a59c17c9a4405b6e48c7c333c7bc7de64736f6c634300081a0033",
    "sourceMap": "374:2747:87:-:0;;;;;;;;;;;;;-1:-1:-1;;374:2747:87;;;;-1:-1:-1;;;;;374:2747:87;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;374:2747:87;;;;;;;;;;;;;-1:-1:-1;;;;;374:2747:87;;;;;;;;;;;;-1:-1:-1;;;;;374:2747:87;;;;;;;;;;;;;;;-1:-1:-1;374:2747:87;;;-1:-1:-1;374:2747:87;;;;;;;730:28;374:2747;;;730:28;374:2747;;;;;;;768:30;374:2747;;;768:30;374:2747;;;;;;;;;;;-1:-1:-1;374:2747:87;;;;;;-1:-1:-1;374:2747:87;;;;;-1:-1:-1;374:2747:87",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c908163ebb48d90146103b2575063eff69b5e14610032575f80fd5b3461024b57602036600319011261024b5760043560245f60018060a01b03815416604051928380926328c44a9960e21b82528660048301525afa8015610257575f90610297575b61012001518051810192915060208184031261024b5760208101519067ffffffffffffffff821161024b570160808184031261024b57604051906100bc8261058b565b6100c8602082016105de565b8252604081015160208301526100e0606082016105de565b604083015260808101519067ffffffffffffffff821161024b57602061010d9281606097019201016105ff565b928391015260608280518101031261024b5761014f6060604051936101318561056f565b61013d602082016105de565b855260408101516020860152016105de565b60408381019182526002549051630fba221960e41b815284516001600160a01b03908116600483015260209586015160248301529251831660448201529391849160a49183915f91163360648401523360848401525af1918215610257575f92610262575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af1908115610257575f91610219575b501561020a57602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d60201161024f575b81610234602093836105a7565b8101031261024b57610245906105f2565b5f6101f9565b5f80fd5b3d9150610227565b6040513d5f823e3d90fd5b9091506020813d60201161028f575b8161027e602093836105a7565b8101031261024b57519060206101b4565b3d9150610271565b503d805f833e6102a781836105a7565b81019060208183031261024b5780519067ffffffffffffffff821161024b57016101408183031261024b5760405190610140820182811067ffffffffffffffff82111761039e57604052805182526020810151602083015261030b604082016105c9565b604083015261031c606082016105c9565b606083015261032d608082016105c9565b608083015260a081015160a083015261034860c082016105de565b60c083015261035960e082016105de565b60e083015261036b61010082016105f2565b6101008301526101208101519267ffffffffffffffff841161024b576101209361039592016105ff565b82820152610079565b634e487b7160e01b5f52604160045260245ffd5b3461024b5760a036600319011261024b576004356001600160a01b0381169081900361024b576044356001600160a01b0381169081900361024b576084359167ffffffffffffffff831680930361024b576020925f61012460018060a01b03600154169360018060a01b03600254169561042b8961056f565b88526064358789015233604089015261046f60405198888a019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b6060885261047e6080896105a7565b6040519061048b8261058b565b8152602435878201908152604080830197885260608301998a5251636b72870760e01b815260806004820181905292516001600160a01b039081166084830152915160a482015296511660c4870152965160e486019790975286516101048601819052949687958694859282908a018585015e848483850101526024830152336044830152336064830152601f801991011681010301925af18015610257575f9061053c575b602090604051908152f35b506020813d602011610567575b81610556602093836105a7565b8101031261024b5760209051610531565b3d9150610549565b6060810190811067ffffffffffffffff82111761039e57604052565b6080810190811067ffffffffffffffff82111761039e57604052565b90601f8019910116810190811067ffffffffffffffff82111761039e57604052565b519067ffffffffffffffff8216820361024b57565b51906001600160a01b038216820361024b57565b5190811515820361024b57565b81601f8201121561024b5780519067ffffffffffffffff821161039e5760405192610634601f8401601f1916602001856105a7565b8284526020838301011161024b57815f9260208093018386015e830101529056fea264697066735822122063bc3986c31dda64d45e919227635b042a59c17c9a4405b6e48c7c333c7bc7de64736f6c634300081a0033",
    "sourceMap": "374:2747:87:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;374:2747:87;;;;;;2688:34;374:2747;;;;;;;;;;;;;;;;;;2688:34;;;374:2747;2688:34;;374:2747;2688:34;;;;;;374:2747;2688:34;;;374:2747;2813:8;;;374:2747;;2789:94;;;374:2747;-1:-1:-1;374:2747:87;;;;;;;;2789:94;;374:2747;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;2789:94;;374:2747;2789:94;;374:2747;;;;:::i;:::-;;;;;;;;;;2947:104;;374:2747;;;;;;;;;;;;:::i;:::-;;;2947:104;;374:2747;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;1867:13;374:2747;;;-1:-1:-1;;;1867:108:87;;374:2747;;-1:-1:-1;;;;;374:2747:87;;;;1867:108;;374:2747;;;;;;;;;;;;;;;;;;;;;;1867:108;;374:2747;;;;;1931:10;374:2747;;;;1931:10;374:2747;;;;1867:108;;;;;;;374:2747;1867:108;;;374:2747;-1:-1:-1;374:2747:87;;;;-1:-1:-1;;;1991:60:87;;374:2747;1991:60;;374:2747;;;;2688:34;374:2747;;;;;;;;;1991:60;;374:2747;;;;-1:-1:-1;;;;;374:2747:87;1991:60;;;;;;;374:2747;1991:60;;;374:2747;1990:61;;1986:122;;374:2747;;;;;;;;1986:122;2074:23;;;374:2747;2074:23;374:2747;;2074:23;1991:60;;;374:2747;1991:60;;374:2747;1991:60;;;;;;374:2747;1991:60;;;:::i;:::-;;;374:2747;;;;;;;:::i;:::-;1991:60;;;374:2747;;;;1991:60;;;-1:-1:-1;1991:60:87;;;374:2747;;;;;;;;;1867:108;;;;374:2747;1867:108;;374:2747;1867:108;;;;;;374:2747;1867:108;;;:::i;:::-;;;374:2747;;;;;;;1867:108;;;;;-1:-1:-1;1867:108:87;;2688:34;;;;374:2747;2688:34;;;;;;:::i;:::-;;;374:2747;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;2813:8;374:2747;;;;;:::i;:::-;;;;;2688:34;;374:2747;;;;;;;;;2688:34;374:2747;;;;;;;;-1:-1:-1;;374:2747:87;;;;;;-1:-1:-1;;;;;374:2747:87;;;;;;;;;;-1:-1:-1;;;;;374:2747:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1238:13;374:2747;;;;;;:::i;:::-;;;;;1318:206;;;374:2747;1487:10;374:2747;1318:206;;374:2747;;;;1282:264;;;;374:2747;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1282:264;;;374:2747;1282:264;;:::i;:::-;374:2747;;;;;;:::i;:::-;;;;;1084:481;;;374:2747;;;;1084:481;;;374:2747;;;;1084:481;;374:2747;;;;-1:-1:-1;;;1037:626:87;;374:2747;;1037:626;;374:2747;;;;;-1:-1:-1;;;;;374:2747:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1487:10;374:2747;;;;1487:10;374:2747;;;;;1282:264;;374:2747;;;;;1037:626;;;;;;;;;374:2747;1037:626;;;374:2747;;;;;;;;;1037:626;;374:2747;1037:626;;374:2747;1037:626;;;;;;374:2747;1037:626;;;:::i;:::-;;;374:2747;;;;;;;1037:626;;;;;-1:-1:-1;1037:626:87;;374:2747;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;1282:264;;374:2747;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;374:2747:87;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;1282:264;374:2747;;-1:-1:-1;;374:2747:87;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;374:2747:87;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "buyErc721ForErc721(address,uint256,address,uint256,uint64)": "ebb48d90",
    "payErc721ForErc721(bytes32)": "eff69b5e"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ERC721EscrowObligation\",\"name\":\"_erc721Escrow\",\"type\":\"address\"},{\"internalType\":\"contract ERC721PaymentObligation\",\"name\":\"_erc721Payment\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"CouldntCollectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc721ForErc721\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"buyAttestation\",\"type\":\"bytes32\"}],\"name\":\"payErc721ForErc721\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Utils/ERC721BarterUtils.sol\":\"ERC721BarterUtils\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827\",\"dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265\",\"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147\",\"dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Statements/ERC721EscrowObligation.sol\":{\"keccak256\":\"0x70ee7f4ebc2de3a94b2e549116c15c16ab1e7f413a872c7799a47c3fae44f8ff\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://e61a31c8a0f1cfe3cc598ab9417a368a0d9b84e4fe790580101a043515002802\",\"dweb:/ipfs/QmNPBSUxF14NBj2iMBzB783mp161DWL6kzHHNX1LjfuCVn\"]},\"src/Statements/ERC721PaymentObligation.sol\":{\"keccak256\":\"0xb0023912a36d3467a207e5d6cd2e8427ac4296669dac6ff4ee0024c78e27cd1f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://5aa71a4fa465a630ff77e8ca6047f5a3caa12209d428cf1bae6f367f0309741e\",\"dweb:/ipfs/QmdjubhQTS9tT66adstRnSrpJBAAVcw4kAPbF9d7eH2SFk\"]},\"src/Utils/ERC721BarterUtils.sol\":{\"keccak256\":\"0xe984346e12311d73679d8e76e2ca7652819b11525971f5645177016e226cf1b6\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://216f3097e0ea5a6b9aa04cba1565f1c0b3e65d92683a9a9c3c798049d43d4f37\",\"dweb:/ipfs/QmajaxhP86oPM5XkU4gPyPrxFTsA9eA7PYr1wygDuycq95\"]}},\"version\":1}",
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
        "src/Utils/ERC721BarterUtils.sol": "ERC721BarterUtils"
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
      "src/Statements/ERC721EscrowObligation.sol": {
        "keccak256": "0x70ee7f4ebc2de3a94b2e549116c15c16ab1e7f413a872c7799a47c3fae44f8ff",
        "urls": [
          "bzz-raw://e61a31c8a0f1cfe3cc598ab9417a368a0d9b84e4fe790580101a043515002802",
          "dweb:/ipfs/QmNPBSUxF14NBj2iMBzB783mp161DWL6kzHHNX1LjfuCVn"
        ],
        "license": "UNLICENSED"
      },
      "src/Statements/ERC721PaymentObligation.sol": {
        "keccak256": "0xb0023912a36d3467a207e5d6cd2e8427ac4296669dac6ff4ee0024c78e27cd1f",
        "urls": [
          "bzz-raw://5aa71a4fa465a630ff77e8ca6047f5a3caa12209d428cf1bae6f367f0309741e",
          "dweb:/ipfs/QmdjubhQTS9tT66adstRnSrpJBAAVcw4kAPbF9d7eH2SFk"
        ],
        "license": "UNLICENSED"
      },
      "src/Utils/ERC721BarterUtils.sol": {
        "keccak256": "0xe984346e12311d73679d8e76e2ca7652819b11525971f5645177016e226cf1b6",
        "urls": [
          "bzz-raw://216f3097e0ea5a6b9aa04cba1565f1c0b3e65d92683a9a9c3c798049d43d4f37",
          "dweb:/ipfs/QmajaxhP86oPM5XkU4gPyPrxFTsA9eA7PYr1wygDuycq95"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 87
} as const;