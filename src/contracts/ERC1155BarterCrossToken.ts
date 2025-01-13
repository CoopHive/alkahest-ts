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
        },
        {
          "name": "_erc20Payment",
          "type": "address",
          "internalType": "contract ERC20PaymentObligation"
        },
        {
          "name": "_erc721Payment",
          "type": "address",
          "internalType": "contract ERC721PaymentObligation"
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
      "name": "buyBundleWithErc1155",
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
      "name": "buyErc20WithErc1155",
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
      "name": "buyErc721WithErc1155",
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
    "object": "0x60803461013557601f610c3d38819003918201601f19168301916001600160401b038311848410176101395780849260c0946040528339810103126101355780516001600160a01b03811691908290036101355760208101516001600160a01b038116908190036101355760408201516001600160a01b038116908190036101355760608301516001600160a01b03811692908390036101355760808401516001600160a01b03811694908590036101355760a001516001600160a01b03811695908690036101355760018060a01b03195f5416175f5560018060a01b0319600154161760015560018060a01b0319600254161760025560018060a01b0319600354161760035560018060a01b0319600454161760045560018060a01b03196005541617600555604051610aef908161014e8239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c9081631fa56b20146107d45750806333666e5f1461044957806336bdb00c146102af5780636d1d261f146101d2576378a56f8f14610053575f80fd5b346101bb5760e03660031901126101bb5761006c61080e565b6064356001600160a01b03811691908290036101bb5760c4356001600160401b03811681036101bb57600154600254604051610174956020956001600160a01b0394851694909316906100be836108c4565b82526084358683015260a4356040830152336060830152610114604051928784019060609060018060a01b03815116835260208101516020840152604081015160408401528160018060a01b0391015116910152565b6080825261012360a0836108df565b60405192610130846108a9565b60018060a01b03168352602435868401526044356040840152606083015260808201525f60405180968195829463797b468160e01b84523391339160048601610900565b03925af180156101c7575f90610190575b602090604051908152f35b506020813d6020116101bf575b816101aa602093836108df565b810103126101bb5760209051610185565b5f80fd5b3d915061019d565b6040513d5f823e3d90fd5b346101bb5761017460206101e536610838565b949260018060a01b03600154169460018060a01b0360035416926040519461020c8661088e565b60018060a01b0316855288850152336040850152610255604051948986019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b606084526102646080856108df565b60405194610271866108a9565b60018060a01b03168552878501526040840152606083015260808201525f60405180968195829463797b468160e01b84523391339160048601610900565b346101bb5760a03660031901126101bb576102c861080e565b6064356001600160401b0381116101bb578060040161010060031983360301126101bb57608435906001600160401b03821682036101bb576101749361041e60209461012360018060a01b03600154169460018060a01b0360055416926040519485928a8085015261040b6104006103e16103c26103a36103846103658a60406101006103558b80610a22565b92909301526101408d0191610a56565b61037260248b0189610a22565b8c8303603f190160608e015290610a95565b61039160448a0188610a22565b8b8303603f190160808d015290610a56565b6103b06064890187610a22565b8a8303603f190160a08c015290610a95565b6103cf6084880186610a22565b898303603f190160c08b015290610a56565b6103ee60a4870185610a22565b888303603f190160e08a015290610a95565b9160c4850190610a22565b858303603f190161010087015290610a95565b906001600160a01b03906104349060e401610824565b1661012083015203601f1981018452836108df565b346101bb5760203660031901126101bb5760043560245f60018060a01b03815416604051928380926328c44a9960e21b82528660048301525afa80156101c7575f906106bc575b6101200151805181019291506020818403126101bb576020810151906001600160401b0382116101bb570160a0818403126101bb57604051906104d2826108a9565b6104de602082016109ac565b82526040810151602083015260608101516040830152610500608082016109ac565b606083015260a0810151906001600160401b0382116101bb57602061052c9281608097019201016109cd565b92839101526080828051810103126101bb57610578608060405193610550856108c4565b61055c602082016109ac565b85526040810151602086015260608101516040860152016109ac565b6060830190815260025460408051632daf79cd60e01b815285516001600160a01b0390811660048301526020808801516024840152929096015160448201529251851660648401529193849160c49183915f91163360848401523360a48401525af19182156101c7575f92610687575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af19081156101c7575f9161064d575b501561063e57602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d60201161067f575b81610668602093836108df565b810103126101bb57610679906109c0565b8261062d565b3d915061065b565b9091506020813d6020116106b4575b816106a3602093836108df565b810103126101bb57519060206105e8565b3d9150610696565b503d805f833e6106cc81836108df565b8101906020818303126101bb578051906001600160401b0382116101bb5701610140818303126101bb576040519061014082018281106001600160401b038211176107c057604052805182526020810151602083015261072e60408201610998565b604083015261073f60608201610998565b606083015261075060808201610998565b608083015260a081015160a083015261076b60c082016109ac565b60c083015261077c60e082016109ac565b60e083015261078e61010082016109c0565b610100830152610120810151926001600160401b0384116101bb57610120936107b792016109cd565b82820152610490565b634e487b7160e01b5f52604160045260245ffd5b346101bb576020610174916107e836610838565b959290949360018060a01b03600154169560018060a01b03600454169361020c8661088e565b600435906001600160a01b03821682036101bb57565b35906001600160a01b03821682036101bb57565b60c09060031901126101bb576004356001600160a01b03811681036101bb579060243590604435906064356001600160a01b03811681036101bb57906084359060a4356001600160401b03811681036101bb5790565b606081019081106001600160401b038211176107c057604052565b60a081019081106001600160401b038211176107c057604052565b608081019081106001600160401b038211176107c057604052565b90601f801991011681019081106001600160401b038211176107c057604052565b926001600160401b036101406020608060609699989581895260018060a01b03815116828a01528281015160a08a0152604081015160c08a015260018060a01b03888201511660e08a0152015160a06101008901528051918291826101208b0152018389015e5f828289010152601f80199101168601019616602085015260018060a01b0316604084015260018060a01b0316910152565b51906001600160401b03821682036101bb57565b51906001600160a01b03821682036101bb57565b519081151582036101bb57565b81601f820112156101bb578051906001600160401b0382116107c05760405192610a01601f8401601f1916602001856108df565b828452602083830101116101bb57815f9260208093018386015e8301015290565b9035601e19823603018112156101bb5701602081359101916001600160401b0382116101bb578160051b360383136101bb57565b916020908281520191905f5b818110610a6f5750505090565b909192602080600192838060a01b03610a8788610824565b168152019401929101610a62565b81835290916001600160fb1b0383116101bb5760209260051b80928483013701019056fea2646970667358221220c78cf0e1ce26b9c80fe64966289c228237f80e7675f062d509de6d02e81fb3b764736f6c634300081a0033",
    "sourceMap": "632:3254:81:-:0;;;;;;;;;;;;;-1:-1:-1;;632:3254:81;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;;;-1:-1:-1;632:3254:81;;;-1:-1:-1;632:3254:81;;;;;;;746:30:82;632:3254:81;;;746:30:82;632:3254:81;;;;;;;786:32:82;632:3254:81;;;786:32:82;632:3254:81;;;;;;;1203:28;632:3254;;;1203:28;632:3254;;;;;;;1241:30;632:3254;;;1241:30;632:3254;;;;;;;1281:30;632:3254;;;1281:30;632:3254;;;;;;;;;;;-1:-1:-1;632:3254:81;;;;;;-1:-1:-1;632:3254:81;;;;;-1:-1:-1;632:3254:81",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c9081631fa56b20146107d45750806333666e5f1461044957806336bdb00c146102af5780636d1d261f146101d2576378a56f8f14610053575f80fd5b346101bb5760e03660031901126101bb5761006c61080e565b6064356001600160a01b03811691908290036101bb5760c4356001600160401b03811681036101bb57600154600254604051610174956020956001600160a01b0394851694909316906100be836108c4565b82526084358683015260a4356040830152336060830152610114604051928784019060609060018060a01b03815116835260208101516020840152604081015160408401528160018060a01b0391015116910152565b6080825261012360a0836108df565b60405192610130846108a9565b60018060a01b03168352602435868401526044356040840152606083015260808201525f60405180968195829463797b468160e01b84523391339160048601610900565b03925af180156101c7575f90610190575b602090604051908152f35b506020813d6020116101bf575b816101aa602093836108df565b810103126101bb5760209051610185565b5f80fd5b3d915061019d565b6040513d5f823e3d90fd5b346101bb5761017460206101e536610838565b949260018060a01b03600154169460018060a01b0360035416926040519461020c8661088e565b60018060a01b0316855288850152336040850152610255604051948986019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b606084526102646080856108df565b60405194610271866108a9565b60018060a01b03168552878501526040840152606083015260808201525f60405180968195829463797b468160e01b84523391339160048601610900565b346101bb5760a03660031901126101bb576102c861080e565b6064356001600160401b0381116101bb578060040161010060031983360301126101bb57608435906001600160401b03821682036101bb576101749361041e60209461012360018060a01b03600154169460018060a01b0360055416926040519485928a8085015261040b6104006103e16103c26103a36103846103658a60406101006103558b80610a22565b92909301526101408d0191610a56565b61037260248b0189610a22565b8c8303603f190160608e015290610a95565b61039160448a0188610a22565b8b8303603f190160808d015290610a56565b6103b06064890187610a22565b8a8303603f190160a08c015290610a95565b6103cf6084880186610a22565b898303603f190160c08b015290610a56565b6103ee60a4870185610a22565b888303603f190160e08a015290610a95565b9160c4850190610a22565b858303603f190161010087015290610a95565b906001600160a01b03906104349060e401610824565b1661012083015203601f1981018452836108df565b346101bb5760203660031901126101bb5760043560245f60018060a01b03815416604051928380926328c44a9960e21b82528660048301525afa80156101c7575f906106bc575b6101200151805181019291506020818403126101bb576020810151906001600160401b0382116101bb570160a0818403126101bb57604051906104d2826108a9565b6104de602082016109ac565b82526040810151602083015260608101516040830152610500608082016109ac565b606083015260a0810151906001600160401b0382116101bb57602061052c9281608097019201016109cd565b92839101526080828051810103126101bb57610578608060405193610550856108c4565b61055c602082016109ac565b85526040810151602086015260608101516040860152016109ac565b6060830190815260025460408051632daf79cd60e01b815285516001600160a01b0390811660048301526020808801516024840152929096015160448201529251851660648401529193849160c49183915f91163360848401523360a48401525af19182156101c7575f92610687575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af19081156101c7575f9161064d575b501561063e57602090604051908152f35b636c7b6f5560e11b5f5260045ffd5b90506020813d60201161067f575b81610668602093836108df565b810103126101bb57610679906109c0565b8261062d565b3d915061065b565b9091506020813d6020116106b4575b816106a3602093836108df565b810103126101bb57519060206105e8565b3d9150610696565b503d805f833e6106cc81836108df565b8101906020818303126101bb578051906001600160401b0382116101bb5701610140818303126101bb576040519061014082018281106001600160401b038211176107c057604052805182526020810151602083015261072e60408201610998565b604083015261073f60608201610998565b606083015261075060808201610998565b608083015260a081015160a083015261076b60c082016109ac565b60c083015261077c60e082016109ac565b60e083015261078e61010082016109c0565b610100830152610120810151926001600160401b0384116101bb57610120936107b792016109cd565b82820152610490565b634e487b7160e01b5f52604160045260245ffd5b346101bb576020610174916107e836610838565b959290949360018060a01b03600154169560018060a01b03600454169361020c8661088e565b600435906001600160a01b03821682036101bb57565b35906001600160a01b03821682036101bb57565b60c09060031901126101bb576004356001600160a01b03811681036101bb579060243590604435906064356001600160a01b03811681036101bb57906084359060a4356001600160401b03811681036101bb5790565b606081019081106001600160401b038211176107c057604052565b60a081019081106001600160401b038211176107c057604052565b608081019081106001600160401b038211176107c057604052565b90601f801991011681019081106001600160401b038211176107c057604052565b926001600160401b036101406020608060609699989581895260018060a01b03815116828a01528281015160a08a0152604081015160c08a015260018060a01b03888201511660e08a0152015160a06101008901528051918291826101208b0152018389015e5f828289010152601f80199101168601019616602085015260018060a01b0316604084015260018060a01b0316910152565b51906001600160401b03821682036101bb57565b51906001600160a01b03821682036101bb57565b519081151582036101bb57565b81601f820112156101bb578051906001600160401b0382116107c05760405192610a01601f8401601f1916602001856108df565b828452602083830101116101bb57815f9260208093018386015e8301015290565b9035601e19823603018112156101bb5701602081359101916001600160401b0382116101bb578160051b360383136101bb57565b916020908281520191905f5b818110610a6f5750505090565b909192602080600192838060a01b03610a8788610824565b168152019401929101610a62565b81835290916001600160fb1b0383116101bb5760209260051b80928483013701019056fea2646970667358221220c78cf0e1ce26b9c80fe64966289c228237f80e7675f062d509de6d02e81fb3b764736f6c634300081a0033",
    "sourceMap": "632:3254:81:-:0;;;;;;;;;;;;;;;;;;;;;;;;2828:206;;632:3254;2828:206;;;632:3254;;;;;;;;;;;1897:203;;;632:3254;;;;;;;;;-1:-1:-1;;632:3254:81;;;;;;:::i;:::-;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;1350:14:82;632:3254:81;;;1108:711:82;;632:3254:81;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;:::i;:::-;;;;;1431:249:82;;;632:3254:81;;;;1431:249:82;;632:3254:81;1643:10:82;632:3254:81;1431:249:82;;632:3254:81;;;;1395:307:82;;;;632:3254:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1395:307:82;;;632:3254:81;1395:307:82;;:::i;:::-;632:3254:81;;;;;;:::i;:::-;;;;;;;;;;;1156:565:82;;;632:3254:81;;;;1156:565:82;;632:3254:81;;1156:565:82;;632:3254:81;;1156:565:82;;632:3254:81;;;;;;;;;;;;;1108:711:82;;1643:10;;;1108:711;632:3254:81;1108:711:82;;;:::i;:::-;;;;;;;;;632:3254:81;1108:711:82;;;632:3254:81;;;;;;;;;1108:711:82;;632:3254:81;1108:711:82;;632:3254:81;1108:711:82;;;;;;632:3254:81;1108:711:82;;;:::i;:::-;;;632:3254:81;;;;;;;1108:711:82;;632:3254:81;;;;1108:711:82;;;-1:-1:-1;1108:711:82;;;632:3254:81;;;;;;;;;;;;;1576:663;1897:203;632:3254;;;:::i;:::-;;;;;;;;1576:13;632:3254;;;;;;;;1818:12;632:3254;;;;;;;;;:::i;:::-;;;;;;;;;1897:203;;;632:3254;2063:10;632:3254;1897:203;;632:3254;;;;1861:261;;;;632:3254;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1861:261;;;;;;:::i;:::-;632:3254;;;;;;:::i;:::-;;;;;;;;;1624:517;;;632:3254;;1624:517;;632:3254;;1624:517;;632:3254;1861:261;1624:517;;632:3254;;;;;;;;;;;;;1576:663;;2063:10;;;1576:663;632:3254;1576:663;;;:::i;632:3254::-;;;;;;-1:-1:-1;;632:3254:81;;;;;;:::i;:::-;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;3455:422;632:3254;;;;3741:19;632:3254;;;;;;;;;;;;;;3697:13;632:3254;;;;;3741:19;;;;;;;632:3254;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;632:3254:81;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;632:3254:81;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;632:3254:81;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;632:3254:81;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;632:3254:81;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;632:3254:81;;;;;;;:::i;:::-;;-1:-1:-1;;;;;632:3254:81;;;;;;:::i;:::-;;;;;;3741:19;632:3254;;3741:19;;;;;;:::i;632:3254::-;;;;;;-1:-1:-1;;632:3254:81;;;;;;2953:34:82;632:3254:81;;;;;;;;;;;;;;;;;;2953:34:82;;;632:3254:81;2953:34:82;;632:3254:81;2953:34:82;;;;;;632:3254:81;2953:34:82;;;632:3254:81;3079:8:82;;;632:3254:81;;3055:95:82;;;632:3254:81;-1:-1:-1;632:3254:81;;;;;;;;3055:95:82;;632:3254:81;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;3055:95:82;;632:3254:81;3055:95:82;;632:3254:81;;;;:::i;:::-;;;;;;;;;;3215:105:82;;632:3254:81;;;;;;;;;;;;:::i;:::-;;;3215:105:82;;632:3254:81;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;2026:14:82;632:3254:81;;;;-1:-1:-1;;;2026:109:82;;632:3254:81;;-1:-1:-1;;;;;632:3254:81;;;;2026:109:82;;632:3254:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2026:109:82;;632:3254:81;;;;;2091:10:82;632:3254:81;;;;2091:10:82;632:3254:81;;;;2026:109:82;;;;;;;632:3254:81;2026:109:82;;;632:3254:81;-1:-1:-1;632:3254:81;;;;-1:-1:-1;;;2151:61:82;;632:3254:81;2151:61:82;;632:3254:81;;;;2953:34:82;632:3254:81;;;;;;;;;2151:61:82;;632:3254:81;;;;-1:-1:-1;;;;;632:3254:81;2151:61:82;;;;;;;632:3254:81;2151:61:82;;;632:3254:81;2150:62:82;;2146:123;;632:3254:81;;;;;;;;2146:123:82;2235:23;;;632:3254:81;2235:23:82;632:3254:81;;2235:23:82;2151:61;;;632:3254:81;2151:61:82;;632:3254:81;2151:61:82;;;;;;632:3254:81;2151:61:82;;;:::i;:::-;;;632:3254:81;;;;;;;:::i;:::-;2151:61:82;;;;;;-1:-1:-1;2151:61:82;;2026:109;;;;632:3254:81;2026:109:82;;632:3254:81;2026:109:82;;;;;;632:3254:81;2026:109:82;;;:::i;:::-;;;632:3254:81;;;;;;;2026:109:82;;;;;-1:-1:-1;2026:109:82;;2953:34;;;;632:3254:81;2953:34:82;;;;;;:::i;:::-;;;632:3254:81;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;3079:8:82;632:3254:81;;;;;:::i;:::-;;;;;2953:34:82;;632:3254:81;;;;;;;;;2953:34:82;632:3254:81;;;;;;2828:206;2506:667;632:3254;;;;:::i;:::-;;;;;;;;;;;2506:13;632:3254;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;632:3254:81;;;;;;:::o;:::-;;;-1:-1:-1;;;;;632:3254:81;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;:::o;:::-;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;632:3254:81;;;;;;:::o;:::-;;;-1:-1:-1;;;;;632:3254:81;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;-1:-1:-1;;632:3254:81;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;632:3254:81;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;-1:-1:-1;632:3254:81;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;632:3254:81;;;;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "buyBundleWithErc1155(address,uint256,uint256,(address[],uint256[],address[],uint256[],address[],uint256[],uint256[],address),uint64)": "36bdb00c",
    "buyErc1155ForErc1155(address,uint256,uint256,address,uint256,uint256,uint64)": "78a56f8f",
    "buyErc20WithErc1155(address,uint256,uint256,address,uint256,uint64)": "6d1d261f",
    "buyErc721WithErc1155(address,uint256,uint256,address,uint256,uint64)": "1fa56b20",
    "payErc1155ForErc1155(bytes32)": "33666e5f"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ERC1155EscrowObligation\",\"name\":\"_erc1155Escrow\",\"type\":\"address\"},{\"internalType\":\"contract ERC1155PaymentObligation\",\"name\":\"_erc1155Payment\",\"type\":\"address\"},{\"internalType\":\"contract ERC20PaymentObligation\",\"name\":\"_erc20Payment\",\"type\":\"address\"},{\"internalType\":\"contract ERC721PaymentObligation\",\"name\":\"_erc721Payment\",\"type\":\"address\"},{\"internalType\":\"contract TokenBundlePaymentObligation\",\"name\":\"_bundlePayment\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"CouldntCollectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"bidAmount\",\"type\":\"uint256\"},{\"components\":[{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address\",\"name\":\"payee\",\"type\":\"address\"}],\"internalType\":\"struct TokenBundlePaymentObligation.StatementData\",\"name\":\"askData\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyBundleWithErc1155\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"bidAmount\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"askAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc1155ForErc1155\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"bidAmount\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc20WithErc1155\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"bidAmount\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askTokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc721WithErc1155\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"buyAttestation\",\"type\":\"bytes32\"}],\"name\":\"payErc1155ForErc1155\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Utils/ERC1155BarterCrossToken.sol\":\"ERC1155BarterCrossToken\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746\",\"dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce\",\"dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009\",\"dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827\",\"dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265\",\"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147\",\"dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Statements/ERC1155EscrowObligation.sol\":{\"keccak256\":\"0xc13846189fe3929c3d46ccb344f4244d84f2c8eca1a9c31ffda2f882b13de2a5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://0e5f09d27344400db5038b3cd0521607a8828258f434d13e4ddf5ae5761bce42\",\"dweb:/ipfs/QmQTS5RMCDZ1VZjt9C8i4vSJ2oVTur2eHxdg9XeprhAoK8\"]},\"src/Statements/ERC1155PaymentObligation.sol\":{\"keccak256\":\"0x28ff38a43b13b092d04ab9be2e5327d8e83c19738d13273451fcbe4916767a84\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://cf233578b099e9743394e5b0ea9dbd8832c45ab4100139924842a9bdbf08aec4\",\"dweb:/ipfs/QmeQHSBUgWwsKaqgcfez7X3s1opJGJQGyXstkkhfFAt4ZD\"]},\"src/Statements/ERC20PaymentObligation.sol\":{\"keccak256\":\"0xf5de5b9f7f9f83dc1df346f1d2e66d2d3519632b98ab4b7e28b11251be2f4fdf\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://bc3201e9225988f0ad8ebddd1158cd7f361e05c8823188e2cf9535bef58e0746\",\"dweb:/ipfs/QmZ5EQFS6greLQYszTmJ8ox1BPFxsdmAdqjmFQ14rfqMMN\"]},\"src/Statements/ERC721PaymentObligation.sol\":{\"keccak256\":\"0xb0023912a36d3467a207e5d6cd2e8427ac4296669dac6ff4ee0024c78e27cd1f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://5aa71a4fa465a630ff77e8ca6047f5a3caa12209d428cf1bae6f367f0309741e\",\"dweb:/ipfs/QmdjubhQTS9tT66adstRnSrpJBAAVcw4kAPbF9d7eH2SFk\"]},\"src/Statements/TokenBundlePaymentObligation.sol\":{\"keccak256\":\"0x83d5aa346c38cb6452a20a15c723c61760fa7b071ef0abb25f058e0e0f854eb2\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d5db4fba22b255a038b1af1cf0dd44a5d4d46f5b68828b571188b1a9dc2240ae\",\"dweb:/ipfs/QmeGJRFu35zP1NvHox9AZMoEqJT1SpGkc71KMcwQkQtG3Y\"]},\"src/Utils/ERC1155BarterCrossToken.sol\":{\"keccak256\":\"0xe8ed92d4c1a9e58812803584df0f822d779a49f85c780dff193d4c26eabc1474\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6e8f1c8273b8516c3d7fcdbdefef0d7044a2de728c3186cc1835bf846c2cfa2a\",\"dweb:/ipfs/QmYCtbvRfeEJp9z6inhH86kqhcW7vhs4mnmGdH5N3aaZBL\"]},\"src/Utils/ERC1155BarterUtils.sol\":{\"keccak256\":\"0xd6d94ba59b4a12ab45d7d780287025aa3cec88a6fd29b639e27e6d81b3bf6a65\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6affc0d10e03e5b64adf79f699529c9b154869d82fb1940f442c451588820441\",\"dweb:/ipfs/QmZeNi4nBxkn37BDoPS7gYDqPgQzYvzYaYZD5t9jxr2PN5\"]}},\"version\":1}",
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
            },
            {
              "internalType": "contract ERC20PaymentObligation",
              "name": "_erc20Payment",
              "type": "address"
            },
            {
              "internalType": "contract ERC721PaymentObligation",
              "name": "_erc721Payment",
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
              "internalType": "uint256",
              "name": "bidAmount",
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
          "name": "buyBundleWithErc1155",
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
          "name": "buyErc20WithErc1155",
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
          "name": "buyErc721WithErc1155",
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
        "src/Utils/ERC1155BarterCrossToken.sol": "ERC1155BarterCrossToken"
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
      "src/Statements/ERC1155EscrowObligation.sol": {
        "keccak256": "0xc13846189fe3929c3d46ccb344f4244d84f2c8eca1a9c31ffda2f882b13de2a5",
        "urls": [
          "bzz-raw://0e5f09d27344400db5038b3cd0521607a8828258f434d13e4ddf5ae5761bce42",
          "dweb:/ipfs/QmQTS5RMCDZ1VZjt9C8i4vSJ2oVTur2eHxdg9XeprhAoK8"
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
      "src/Utils/ERC1155BarterCrossToken.sol": {
        "keccak256": "0xe8ed92d4c1a9e58812803584df0f822d779a49f85c780dff193d4c26eabc1474",
        "urls": [
          "bzz-raw://6e8f1c8273b8516c3d7fcdbdefef0d7044a2de728c3186cc1835bf846c2cfa2a",
          "dweb:/ipfs/QmYCtbvRfeEJp9z6inhH86kqhcW7vhs4mnmGdH5N3aaZBL"
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
  "id": 81
} as const;