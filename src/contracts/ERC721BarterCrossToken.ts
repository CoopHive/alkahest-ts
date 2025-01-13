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
        },
        {
          "name": "_erc20Payment",
          "type": "address",
          "internalType": "contract ERC20PaymentObligation"
        },
        {
          "name": "_erc1155Payment",
          "type": "address",
          "internalType": "contract ERC1155PaymentObligation"
        },
        {
          "name": "_bundlePayment",
          "type": "address",
          "internalType": "contract TokenBundlePaymentObligation"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "buyBundleWithErc721",
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
          "name": "askData",
          "type": "tuple",
          "internalType": "struct TokenBundlePaymentObligation.StatementData",
          "components": [
            {
              "name": "erc20Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc20Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc721Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc721TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc1155TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "payee",
              "type": "address",
              "internalType": "address"
            }
          ]
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
      "name": "buyErc1155WithErc721",
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
      "name": "buyErc20WithErc721",
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
    "object": "0x60803461013557601f610bd838819003918201601f19168301916001600160401b038311848410176101395780849260c0946040528339810103126101355780516001600160a01b03811691908290036101355760208101516001600160a01b038116908190036101355760408201516001600160a01b038116908190036101355760608301516001600160a01b03811692908390036101355760808401516001600160a01b03811694908590036101355760a001516001600160a01b03811695908690036101355760018060a01b03195f5416175f5560018060a01b0319600154161760015560018060a01b0319600254161760025560018060a01b0319600354161760035560018060a01b0319600454161760045560018060a01b03196005541617600555604051610a8a908161014e8239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c9081635f19ead11461071657508063cb9d3a5714610533578063e32aa463146104f7578063ebb48d90146103ce5763eff69b5e14610053575f80fd5b3461026a57602036600319011261026a5760043560245f60018060a01b03815416604051928380926328c44a9960e21b82528660048301525afa8015610276575f906102b6575b61012001518051810192915060208184031261026a576020810151906001600160401b03821161026a570160808184031261026a57604051906100dc8261084d565b6100e8602082016109de565b825260408101516020830152610100606082016109de565b60408301526080810151906001600160401b03821161026a57602061012c9281606097019201016109ff565b928391015260608280518101031261026a5761016e60606040519361015085610868565b61015c602082016109de565b855260408101516020860152016109de565b60408381019182526002549051630fba221960e41b815284516001600160a01b03908116600483015260209586015160248301529251831660448201529391849160a49183915f91163360648401523360848401525af1918215610276575f92610281575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af1908115610276575f91610238575b501561022957602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d60201161026e575b8161025360209383610883565b8101031261026a57610264906109f2565b5f610218565b5f80fd5b3d9150610246565b6040513d5f823e3d90fd5b9091506020813d6020116102ae575b8161029d60209383610883565b8101031261026a57519060206101d3565b3d9150610290565b503d805f833e6102c68183610883565b81019060208183031261026a578051906001600160401b03821161026a57016101408183031261026a576040519061014082018281106001600160401b038211176103ba576040528051825260208101516020830152610328604082016109ca565b6040830152610339606082016109ca565b606083015261034a608082016109ca565b608083015260a081015160a083015261036560c082016109de565b60c083015261037660e082016109de565b60e083015261038861010082016109f2565b610100830152610120810151926001600160401b03841161026a57610120936103b192016109ff565b8282015261009a565b634e487b7160e01b5f52604160045260245ffd5b3461026a576104a860206103e1366107fb565b60015460025460405192966001600160a01b039283169690959394919092169261040a85610868565b60018060a01b0316845287840152336040840152610453604051938885019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b60608352610462608084610883565b6040519361046f8561084d565b60018060a01b0316845286840152604083015260608201525f604051809681958294636b72870760e01b845233913391600486016108a4565b03925af18015610276575f906104c4575b602090604051908152f35b506020813d6020116104ef575b816104de60209383610883565b8101031261026a57602090516104b9565b3d91506104d1565b3461026a576104a8602061050a366107fb565b60015460035460405192966001600160a01b039283169690959394919092169261040a85610868565b3461026a57608036600319011261026a5761054c6107d1565b6044356001600160401b03811161026a5780600401610100600319833603011261026a57606435906001600160401b038216820361026a576104a8936106a26020946106cd60018060a01b03600154169460018060a01b0360055416926040519485928a8085015261068f6106846106656106466106276106086105e98a60406101006105d98b80610933565b92909301526101408d0191610967565b6105f660248b0189610933565b8c8303603f190160608e0152906109a6565b61061560448a0188610933565b8b8303603f190160808d015290610967565b6106346064890187610933565b8a8303603f190160a08c0152906109a6565b6106536084880186610933565b898303603f190160c08b015290610967565b61067260a4870185610933565b888303603f190160e08a0152906109a6565b9160c4850190610933565b858303603f1901610100870152906109a6565b906001600160a01b03906106b89060e4016107e7565b1661012083015203601f198101845283610883565b604051926106da8461084d565b60018060a01b0316835260243586840152604083015260608201525f604051809681958294636b72870760e01b845233913391600486016108a4565b3461026a5760c036600319011261026a5761072f6107d1565b906044356001600160a01b038116919082900361026a5760a435906001600160401b038216820361026a576001546004546104a8956020956001600160a01b03938416949193909216906107828161084d565b8281528681019060643582526060604082019160843583520191338352604051948986015251604085015251606084015260018060a01b039051166080830152608082526106cd60a083610883565b600435906001600160a01b038216820361026a57565b35906001600160a01b038216820361026a57565b60a090600319011261026a576004356001600160a01b038116810361026a5790602435906044356001600160a01b038116810361026a5790606435906084356001600160401b038116810361026a5790565b608081019081106001600160401b038211176103ba57604052565b606081019081106001600160401b038211176103ba57604052565b90601f801991011681019081106001600160401b038211176103ba57604052565b926001600160401b036101206020606080969998956080895260018060a01b0381511660808a01528281015160a08a015260018060a01b0360408201511660c08a01520151608060e08901528051918291826101008b0152018389015e5f828289010152601f80199101168601019616602085015260018060a01b0316604084015260018060a01b0316910152565b9035601e198236030181121561026a5701602081359101916001600160401b03821161026a578160051b3603831361026a57565b916020908281520191905f5b8181106109805750505090565b909192602080600192838060a01b03610998886107e7565b168152019401929101610973565b81835290916001600160fb1b03831161026a5760209260051b809284830137010190565b51906001600160401b038216820361026a57565b51906001600160a01b038216820361026a57565b5190811515820361026a57565b81601f8201121561026a578051906001600160401b0382116103ba5760405192610a33601f8401601f191660200185610883565b8284526020838301011161026a57815f9260208093018386015e830101529056fea2646970667358221220bbac2cb57206f58a988b1d925ee97810a13594dfe16d313225a290fe80cb15c564736f6c634300081a0033",
    "sourceMap": "628:3121:86:-:0;;;;;;;;;;;;;-1:-1:-1;;628:3121:86;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;-1:-1:-1;628:3121:86;;;-1:-1:-1;628:3121:86;;;;;;;730:28:87;628:3121:86;;;730:28:87;628:3121:86;;;;;;;768:30:87;628:3121:86;;;768:30:87;628:3121:86;;;;;;;1194:28;628:3121;;;1194:28;628:3121;;;;;;;1232:32;628:3121;;;1232:32;628:3121;;;;;;;1274:30;628:3121;;;1274:30;628:3121;;;;;;;;;;;-1:-1:-1;628:3121:86;;;;;;-1:-1:-1;628:3121:86;;;;;-1:-1:-1;628:3121:86",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c9081635f19ead11461071657508063cb9d3a5714610533578063e32aa463146104f7578063ebb48d90146103ce5763eff69b5e14610053575f80fd5b3461026a57602036600319011261026a5760043560245f60018060a01b03815416604051928380926328c44a9960e21b82528660048301525afa8015610276575f906102b6575b61012001518051810192915060208184031261026a576020810151906001600160401b03821161026a570160808184031261026a57604051906100dc8261084d565b6100e8602082016109de565b825260408101516020830152610100606082016109de565b60408301526080810151906001600160401b03821161026a57602061012c9281606097019201016109ff565b928391015260608280518101031261026a5761016e60606040519361015085610868565b61015c602082016109de565b855260408101516020860152016109de565b60408381019182526002549051630fba221960e41b815284516001600160a01b03908116600483015260209586015160248301529251831660448201529391849160a49183915f91163360648401523360848401525af1918215610276575f92610281575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af1908115610276575f91610238575b501561022957602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d60201161026e575b8161025360209383610883565b8101031261026a57610264906109f2565b5f610218565b5f80fd5b3d9150610246565b6040513d5f823e3d90fd5b9091506020813d6020116102ae575b8161029d60209383610883565b8101031261026a57519060206101d3565b3d9150610290565b503d805f833e6102c68183610883565b81019060208183031261026a578051906001600160401b03821161026a57016101408183031261026a576040519061014082018281106001600160401b038211176103ba576040528051825260208101516020830152610328604082016109ca565b6040830152610339606082016109ca565b606083015261034a608082016109ca565b608083015260a081015160a083015261036560c082016109de565b60c083015261037660e082016109de565b60e083015261038861010082016109f2565b610100830152610120810151926001600160401b03841161026a57610120936103b192016109ff565b8282015261009a565b634e487b7160e01b5f52604160045260245ffd5b3461026a576104a860206103e1366107fb565b60015460025460405192966001600160a01b039283169690959394919092169261040a85610868565b60018060a01b0316845287840152336040840152610453604051938885019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b60608352610462608084610883565b6040519361046f8561084d565b60018060a01b0316845286840152604083015260608201525f604051809681958294636b72870760e01b845233913391600486016108a4565b03925af18015610276575f906104c4575b602090604051908152f35b506020813d6020116104ef575b816104de60209383610883565b8101031261026a57602090516104b9565b3d91506104d1565b3461026a576104a8602061050a366107fb565b60015460035460405192966001600160a01b039283169690959394919092169261040a85610868565b3461026a57608036600319011261026a5761054c6107d1565b6044356001600160401b03811161026a5780600401610100600319833603011261026a57606435906001600160401b038216820361026a576104a8936106a26020946106cd60018060a01b03600154169460018060a01b0360055416926040519485928a8085015261068f6106846106656106466106276106086105e98a60406101006105d98b80610933565b92909301526101408d0191610967565b6105f660248b0189610933565b8c8303603f190160608e0152906109a6565b61061560448a0188610933565b8b8303603f190160808d015290610967565b6106346064890187610933565b8a8303603f190160a08c0152906109a6565b6106536084880186610933565b898303603f190160c08b015290610967565b61067260a4870185610933565b888303603f190160e08a0152906109a6565b9160c4850190610933565b858303603f1901610100870152906109a6565b906001600160a01b03906106b89060e4016107e7565b1661012083015203601f198101845283610883565b604051926106da8461084d565b60018060a01b0316835260243586840152604083015260608201525f604051809681958294636b72870760e01b845233913391600486016108a4565b3461026a5760c036600319011261026a5761072f6107d1565b906044356001600160a01b038116919082900361026a5760a435906001600160401b038216820361026a576001546004546104a8956020956001600160a01b03938416949193909216906107828161084d565b8281528681019060643582526060604082019160843583520191338352604051948986015251604085015251606084015260018060a01b039051166080830152608082526106cd60a083610883565b600435906001600160a01b038216820361026a57565b35906001600160a01b038216820361026a57565b60a090600319011261026a576004356001600160a01b038116810361026a5790602435906044356001600160a01b038116810361026a5790606435906084356001600160401b038116810361026a5790565b608081019081106001600160401b038211176103ba57604052565b606081019081106001600160401b038211176103ba57604052565b90601f801991011681019081106001600160401b038211176103ba57604052565b926001600160401b036101206020606080969998956080895260018060a01b0381511660808a01528281015160a08a015260018060a01b0360408201511660c08a01520151608060e08901528051918291826101008b0152018389015e5f828289010152601f80199101168601019616602085015260018060a01b0316604084015260018060a01b0316910152565b9035601e198236030181121561026a5701602081359101916001600160401b03821161026a578160051b3603831361026a57565b916020908281520191905f5b8181106109805750505090565b909192602080600192838060a01b03610998886107e7565b168152019401929101610973565b81835290916001600160fb1b03831161026a5760209260051b809284830137010190565b51906001600160401b038216820361026a57565b51906001600160a01b038216820361026a57565b5190811515820361026a57565b81601f8201121561026a578051906001600160401b0382116103ba5760405192610a33601f8401601f191660200185610883565b8284526020838301011161026a57815f9260208093018386015e830101529056fea2646970667358221220bbac2cb57206f58a988b1d925ee97810a13594dfe16d313225a290fe80cb15c564736f6c634300081a0033",
    "sourceMap": "628:3121:86:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1821:203;628:3121;1821:203;;;628:3121;1318:206:87;;;628:3121:86;;;;;;;;;-1:-1:-1;;628:3121:86;;;;;;2688:34:87;628:3121:86;;;;;;;;;;;;;;;;;;2688:34:87;;;628:3121:86;2688:34:87;;628:3121:86;2688:34:87;;;;;;628:3121:86;2688:34:87;;;628:3121:86;2813:8:87;;;628:3121:86;;2789:94:87;;;628:3121:86;-1:-1:-1;628:3121:86;;;;;;;;2789:94:87;;628:3121:86;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;2789:94:87;;628:3121:86;2789:94:87;;628:3121:86;;;;:::i;:::-;;;;;;;;;;2947:104:87;;628:3121:86;;;;;;;;;;;;:::i;:::-;;;2947:104:87;;628:3121:86;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;1867:13:87;628:3121:86;;;-1:-1:-1;;;1867:108:87;;628:3121:86;;-1:-1:-1;;;;;628:3121:86;;;;1867:108:87;;628:3121:86;;;;;;;;;;;;;;;;;;;;;;1867:108:87;;628:3121:86;;;;;1931:10:87;628:3121:86;;;;1931:10:87;628:3121:86;;;;1867:108:87;;;;;;;628:3121:86;1867:108:87;;;628:3121:86;-1:-1:-1;628:3121:86;;;;-1:-1:-1;;;1991:60:87;;628:3121:86;1991:60:87;;628:3121:86;;;;2688:34:87;628:3121:86;;;;;;;;;1991:60:87;;628:3121:86;;;;-1:-1:-1;;;;;628:3121:86;1991:60:87;;;;;;;628:3121:86;1991:60:87;;;628:3121:86;1990:61:87;;1986:122;;628:3121:86;;;;;;;;1986:122:87;2074:23;;;628:3121:86;2074:23:87;628:3121:86;;2074:23:87;1991:60;;;628:3121:86;1991:60:87;;628:3121:86;1991:60:87;;;;;;628:3121:86;1991:60:87;;;:::i;:::-;;;628:3121:86;;;;;;;:::i;:::-;1991:60:87;;;628:3121:86;;;;1991:60:87;;;-1:-1:-1;1991:60:87;;;628:3121:86;;;;;;;;;1867:108:87;;;;628:3121:86;1867:108:87;;628:3121:86;1867:108:87;;;;;;628:3121:86;1867:108:87;;;:::i;:::-;;;628:3121:86;;;;;;;1867:108:87;;;;;-1:-1:-1;1867:108:87;;2688:34;;;;628:3121:86;2688:34:87;;;;;;:::i;:::-;;;628:3121:86;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;2813:8:87;628:3121:86;;;;;:::i;:::-;;;;;2688:34:87;;628:3121:86;;;;;;;;;2688:34:87;628:3121:86;;;;;;1037:626:87;1318:206;628:3121:86;;;:::i;:::-;;;1238:13:87;628:3121:86;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;1318:206:87;;;628:3121:86;1487:10:87;628:3121:86;1318:206:87;;628:3121:86;;;;1282:264:87;;;;628:3121:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1282:264:87;;;;;;:::i;:::-;628:3121:86;;;;;;:::i;:::-;;;;;;;;;1084:481:87;;;628:3121:86;;1084:481:87;;628:3121:86;;1084:481:87;;628:3121:86;;;;;;;;;;;;;1037:626:87;;1487:10;;;1037:626;628:3121:86;1037:626:87;;;:::i;:::-;;;;;;;;;628:3121:86;1037:626:87;;;628:3121:86;1318:206:87;628:3121:86;;;;;;;1037:626:87;;1318:206;1037:626;;1318:206;1037:626;;;;;;628:3121:86;1037:626:87;;;:::i;:::-;;;628:3121:86;;;;1318:206:87;628:3121:86;;1037:626:87;;;;;-1:-1:-1;1037:626:87;;628:3121:86;;;;1541:622;1821:203;628:3121;;;:::i;:::-;;;1742:12;628:3121;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;628:3121:86;;;;;;:::i;:::-;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;3359:381;628:3121;;;;3604:19;628:3121;;;;;;;;;;;;;;3560:13;628:3121;;;;;3604:19;;;;;;;628:3121;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;628:3121:86;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;628:3121:86;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;628:3121:86;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;628:3121:86;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;628:3121:86;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;628:3121:86;;;;;;;:::i;:::-;;-1:-1:-1;;;;;628:3121:86;;;;;;:::i;:::-;;;;;;3604:19;;;;;;;;;:::i;:::-;628:3121;;;;;;:::i;:::-;;;;;;;;;;;3406:236;;;628:3121;;3406:236;;628:3121;;3406:236;;628:3121;;;;;;;;;;;;;3359:381;;3688:10;;;3359:381;628:3121;3359:381;;;:::i;628:3121::-;;;;;;-1:-1:-1;;628:3121:86;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;2430:675;;628:3121;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;:::i;:::-;;;;2712:254;;;628:3121;;;;;;;2712:254;;628:3121;;;;;2712:254;2929:10;;628:3121;;;;2676:312;;;;628:3121;;;;;;;;;;;;;;;;;;;;;;;;2676:312;;;628:3121;2676:312;;:::i;628:3121::-;;;;-1:-1:-1;;;;;628:3121:86;;;;;;:::o;:::-;;;-1:-1:-1;;;;;628:3121:86;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;:::o;:::-;;;3604:19;;628:3121;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;:::o;:::-;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3604:19;;628:3121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;-1:-1:-1;628:3121:86;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;628:3121:86;;;;;;:::o;:::-;;;-1:-1:-1;;;;;628:3121:86;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;-1:-1:-1;;;;;628:3121:86;;;;;;;;3604:19;628:3121;;-1:-1:-1;;628:3121:86;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;628:3121:86;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "buyBundleWithErc721(address,uint256,(address[],uint256[],address[],uint256[],address[],uint256[],uint256[],address),uint64)": "cb9d3a57",
    "buyErc1155WithErc721(address,uint256,address,uint256,uint256,uint64)": "5f19ead1",
    "buyErc20WithErc721(address,uint256,address,uint256,uint64)": "e32aa463",
    "buyErc721ForErc721(address,uint256,address,uint256,uint64)": "ebb48d90",
    "payErc721ForErc721(bytes32)": "eff69b5e"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ERC721EscrowObligation\",\"name\":\"_erc721Escrow\",\"type\":\"address\"},{\"internalType\":\"contract ERC721PaymentObligation\",\"name\":\"_erc721Payment\",\"type\":\"address\"},{\"internalType\":\"contract ERC20PaymentObligation\",\"name\":\"_erc20Payment\",\"type\":\"address\"},{\"internalType\":\"contract ERC1155PaymentObligation\",\"name\":\"_erc1155Payment\",\"type\":\"address\"},{\"internalType\":\"contract TokenBundlePaymentObligation\",\"name\":\"_bundlePayment\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"CouldntCollectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"components\":[{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address\",\"name\":\"payee\",\"type\":\"address\"}],\"internalType\":\"struct TokenBundlePaymentObligation.StatementData\",\"name\":\"askData\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyBundleWithErc721\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"askAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc1155WithErc721\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc20WithErc721\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc721ForErc721\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"buyAttestation\",\"type\":\"bytes32\"}],\"name\":\"payErc721ForErc721\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Utils/ERC721BarterCrossToken.sol\":\"ERC721BarterCrossToken\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746\",\"dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce\",\"dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009\",\"dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827\",\"dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265\",\"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147\",\"dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Statements/ERC1155PaymentObligation.sol\":{\"keccak256\":\"0x28ff38a43b13b092d04ab9be2e5327d8e83c19738d13273451fcbe4916767a84\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://cf233578b099e9743394e5b0ea9dbd8832c45ab4100139924842a9bdbf08aec4\",\"dweb:/ipfs/QmeQHSBUgWwsKaqgcfez7X3s1opJGJQGyXstkkhfFAt4ZD\"]},\"src/Statements/ERC20PaymentObligation.sol\":{\"keccak256\":\"0xf5de5b9f7f9f83dc1df346f1d2e66d2d3519632b98ab4b7e28b11251be2f4fdf\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://bc3201e9225988f0ad8ebddd1158cd7f361e05c8823188e2cf9535bef58e0746\",\"dweb:/ipfs/QmZ5EQFS6greLQYszTmJ8ox1BPFxsdmAdqjmFQ14rfqMMN\"]},\"src/Statements/ERC721EscrowObligation.sol\":{\"keccak256\":\"0x70ee7f4ebc2de3a94b2e549116c15c16ab1e7f413a872c7799a47c3fae44f8ff\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://e61a31c8a0f1cfe3cc598ab9417a368a0d9b84e4fe790580101a043515002802\",\"dweb:/ipfs/QmNPBSUxF14NBj2iMBzB783mp161DWL6kzHHNX1LjfuCVn\"]},\"src/Statements/ERC721PaymentObligation.sol\":{\"keccak256\":\"0xb0023912a36d3467a207e5d6cd2e8427ac4296669dac6ff4ee0024c78e27cd1f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://5aa71a4fa465a630ff77e8ca6047f5a3caa12209d428cf1bae6f367f0309741e\",\"dweb:/ipfs/QmdjubhQTS9tT66adstRnSrpJBAAVcw4kAPbF9d7eH2SFk\"]},\"src/Statements/TokenBundlePaymentObligation.sol\":{\"keccak256\":\"0x83d5aa346c38cb6452a20a15c723c61760fa7b071ef0abb25f058e0e0f854eb2\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d5db4fba22b255a038b1af1cf0dd44a5d4d46f5b68828b571188b1a9dc2240ae\",\"dweb:/ipfs/QmeGJRFu35zP1NvHox9AZMoEqJT1SpGkc71KMcwQkQtG3Y\"]},\"src/Utils/ERC721BarterCrossToken.sol\":{\"keccak256\":\"0x7b5fa64bdae3bd1b2a872bc1cdf1b5aa8bde395be61d22357e93379f6e8bce9d\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f219155c7af708e610da27d8118567c6bfea6cdd7d0bc003e96b1fe60b3be2c9\",\"dweb:/ipfs/QmNp9Uk6NsHGW8hqivE9vuKXPMFRvNxR1fT9bG8qceFJKF\"]},\"src/Utils/ERC721BarterUtils.sol\":{\"keccak256\":\"0xe984346e12311d73679d8e76e2ca7652819b11525971f5645177016e226cf1b6\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://216f3097e0ea5a6b9aa04cba1565f1c0b3e65d92683a9a9c3c798049d43d4f37\",\"dweb:/ipfs/QmajaxhP86oPM5XkU4gPyPrxFTsA9eA7PYr1wygDuycq95\"]}},\"version\":1}",
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
            },
            {
              "internalType": "contract ERC20PaymentObligation",
              "name": "_erc20Payment",
              "type": "address"
            },
            {
              "internalType": "contract ERC1155PaymentObligation",
              "name": "_erc1155Payment",
              "type": "address"
            },
            {
              "internalType": "contract TokenBundlePaymentObligation",
              "name": "_bundlePayment",
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
              "internalType": "struct TokenBundlePaymentObligation.StatementData",
              "name": "askData",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address[]",
                  "name": "erc20Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc20Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc721Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc721TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc1155Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address",
                  "name": "payee",
                  "type": "address"
                }
              ]
            },
            {
              "internalType": "uint64",
              "name": "expiration",
              "type": "uint64"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "buyBundleWithErc721",
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
          "name": "buyErc1155WithErc721",
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
          "name": "buyErc20WithErc721",
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
        "src/Utils/ERC721BarterCrossToken.sol": "ERC721BarterCrossToken"
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
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        "keccak256": "0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4",
        "urls": [
          "bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009",
          "dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"
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
      "src/Statements/ERC1155PaymentObligation.sol": {
        "keccak256": "0x28ff38a43b13b092d04ab9be2e5327d8e83c19738d13273451fcbe4916767a84",
        "urls": [
          "bzz-raw://cf233578b099e9743394e5b0ea9dbd8832c45ab4100139924842a9bdbf08aec4",
          "dweb:/ipfs/QmeQHSBUgWwsKaqgcfez7X3s1opJGJQGyXstkkhfFAt4ZD"
        ],
        "license": "UNLICENSED"
      },
      "src/Statements/ERC20PaymentObligation.sol": {
        "keccak256": "0xf5de5b9f7f9f83dc1df346f1d2e66d2d3519632b98ab4b7e28b11251be2f4fdf",
        "urls": [
          "bzz-raw://bc3201e9225988f0ad8ebddd1158cd7f361e05c8823188e2cf9535bef58e0746",
          "dweb:/ipfs/QmZ5EQFS6greLQYszTmJ8ox1BPFxsdmAdqjmFQ14rfqMMN"
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
      "src/Statements/TokenBundlePaymentObligation.sol": {
        "keccak256": "0x83d5aa346c38cb6452a20a15c723c61760fa7b071ef0abb25f058e0e0f854eb2",
        "urls": [
          "bzz-raw://d5db4fba22b255a038b1af1cf0dd44a5d4d46f5b68828b571188b1a9dc2240ae",
          "dweb:/ipfs/QmeGJRFu35zP1NvHox9AZMoEqJT1SpGkc71KMcwQkQtG3Y"
        ],
        "license": "UNLICENSED"
      },
      "src/Utils/ERC721BarterCrossToken.sol": {
        "keccak256": "0x7b5fa64bdae3bd1b2a872bc1cdf1b5aa8bde395be61d22357e93379f6e8bce9d",
        "urls": [
          "bzz-raw://f219155c7af708e610da27d8118567c6bfea6cdd7d0bc003e96b1fe60b3be2c9",
          "dweb:/ipfs/QmNp9Uk6NsHGW8hqivE9vuKXPMFRvNxR1fT9bG8qceFJKF"
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
  "id": 86
} as const;