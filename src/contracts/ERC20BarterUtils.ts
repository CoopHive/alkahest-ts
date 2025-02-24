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
          "name": "_erc20Escrow",
          "type": "address",
          "internalType": "contract ERC20EscrowObligation"
        },
        {
          "name": "_erc20Payment",
          "type": "address",
          "internalType": "contract ERC20PaymentObligation"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "buyErc20ForErc20",
      "inputs": [
        {
          "name": "bidToken",
          "type": "address",
          "internalType": "address"
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
      "name": "payErc20ForErc20",
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
      "type": "function",
      "name": "permitAndBuyErc20ForErc20",
      "inputs": [
        {
          "name": "bidToken",
          "type": "address",
          "internalType": "address"
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
        },
        {
          "name": "deadline",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "v",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "r",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "s",
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
      "type": "function",
      "name": "permitAndBuyWithErc20",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "arbiter",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "demand",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "expiration",
          "type": "uint64",
          "internalType": "uint64"
        },
        {
          "name": "deadline",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "v",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "r",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "s",
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
      "type": "function",
      "name": "permitAndPayErc20ForErc20",
      "inputs": [
        {
          "name": "buyAttestation",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "deadline",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "v",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "r",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "s",
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
      "type": "function",
      "name": "permitAndPayWithErc20",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "payee",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "deadline",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "v",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "r",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "s",
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
    "object": "0x60803460b957601f610d6538819003918201601f19168301916001600160401b0383118484101760bd5780849260609460405283398101031260b95780516001600160a01b038116919082900360b95760208101516001600160a01b038116919082900360b957604001516001600160a01b038116929083900360b95760018060a01b03195f5416175f5560018060a01b0319600154161760015560018060a01b03196002541617600255604051610c9390816100d28239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe60806040526004361015610011575f80fd5b5f803560e01c80631b24bf52146105f557806367cebb701461048b57806372448d4d1461035e578063a7a6884d14610298578063a8270530146101d85763c26613731461005c575f80fd5b346101d55760e03660031901126101d55780610076610632565b602435610081610648565b6084359260ff841684036101d1576002546001600160a01b03918216949116843b156101cd576100d6918691604051938492839263d505accf60e01b845260c4359160a435918a60643591336004890161070a565b038183885af19081156101c25785916101a4575b5050906020926101459260018060a01b0360025416926040519261010d846106a3565b8352858301526001600160a01b031660408083019190915251630fba221960e41b8152958693849283919033908190600485016109fe565b03925af19081156101985790610161575b602090604051908152f35b506020813d602011610190575b8161017b602093836106be565b8101031261018c5760209051610156565b5f80fd5b3d915061016e565b604051903d90823e3d90fd5b816101b1919493946106be565b6101bd5790835f6100ea565b505050fd5b6040513d87823e3d90fd5b8580fd5b8480fd5b80fd5b50346101d55760203660031901126101d55780546040516328c44a9960e21b815260048035908201819052918390829060249082906001600160a01b03165afa90811561028d57606061024c610120610262959461025c94886020999261026a575b50500151868082518301019101610941565b01518480825183010191016109bf565b90610b4c565b604051908152f35b61028692503d8091833e61027e81836106be565b810190610855565b5f8061023a565b6040513d85823e3d90fd5b50346101d5576101203660031901126101d5576102b3610632565b6024356102be610648565b906102c761065e565b936102d06106fa565b6001546001600160a01b038681169116813b1561035a5791839161031a938360405180968195829463d505accf60e01b8452610104359160e435918d60a43591336004890161070a565b03925af1801561034f5761033a575b60206102628760643587878a610a3d565b6103458280926106be565b6101d55780610329565b6040513d84823e3d90fd5b8380fd5b50346101d55760a03660031901126101d5576004356044359160ff831683036101d55780546040516328c44a9960e21b815260048101849052908290829060249082906001600160a01b03165afa90811561034f576103d96101206103ea936060938691610471575b50015160208082518301019101610941565b0151602080825183010191016109bf565b8051600254602083015192956001600160a01b03918216939190921691823b156101d1579161044193918580946040519687958694859363d505accf60e01b8552608435926064359260243591336004890161070a565b03925af1801561034f5761045c575b60206102628585610b4c565b6104678280926106be565b6101d55780610450565b61048591503d8088833e61027e81836106be565b5f6103c7565b503461018c5761012036600319011261018c576104a6610632565b90602435906104b3610648565b91606435906001600160401b03821161018c573660238301121561018c5781600401356104df816106df565b926104ed60405194856106be565b818452366024838301011161018c57815f92602460209301838701378401015261051561065e565b9161051e6106fa565b60015490966001600160a01b03908116929116823b1561018c57610568975f91604051998a92839263d505accf60e01b8452610104359160e435918a60a43591336004890161070a565b038183865af19687156105ea57610145976105d5575b506020949560018060a01b0360015416936040519361059c85610674565b84528684015260018060a01b03166040830152606082015284604051809781958294636b72870760e01b8452339133916004860161074b565b602095505f6105e3916106be565b5f9461057e565b6040513d5f823e3d90fd5b3461018c5760a036600319011261018c576020610262610613610632565b61061b610648565b9061062461065e565b916064359160243590610a3d565b600435906001600160a01b038216820361018c57565b604435906001600160a01b038216820361018c57565b608435906001600160401b038216820361018c57565b608081019081106001600160401b0382111761068f57604052565b634e487b7160e01b5f52604160045260245ffd5b606081019081106001600160401b0382111761068f57604052565b90601f801991011681019081106001600160401b0382111761068f57604052565b6001600160401b03811161068f57601f01601f191660200190565b60c4359060ff8216820361018c57565b9360c095919897969360ff9360e087019a60018060a01b0316875260018060a01b031660208701526040860152606085015216608083015260a08201520152565b926001600160401b036101206020606080969998956080895260018060a01b0381511660808a01528281015160a08a015260018060a01b0360408201511660c08a01520151608060e08901528051918291826101008b0152018389015e5f828289010152601f80199101168601019616602085015260018060a01b0316604084015260018060a01b0316910152565b51906001600160401b038216820361018c57565b51906001600160a01b038216820361018c57565b5190811515820361018c57565b81601f8201121561018c57805190610826826106df565b9261083460405194856106be565b8284526020838301011161018c57815f9260208093018386015e8301015290565b60208183031261018c578051906001600160401b03821161018c57016101408183031261018c576040519161014083018381106001600160401b0382111761068f5760405281518352602082015160208401526108b4604083016107da565b60408401526108c5606083016107da565b60608401526108d6608083016107da565b608084015260a082015160a08401526108f160c083016107ee565b60c084015261090260e083016107ee565b60e08401526109146101008301610802565b6101008401526101208201516001600160401b03811161018c57610938920161080f565b61012082015290565b60208183031261018c578051906001600160401b03821161018c570160808183031261018c576040519161097483610674565b61097d826107ee565b835260208201516020840152610995604083016107ee565b604084015260608201516001600160401b03811161018c576109b7920161080f565b606082015290565b9081606091031261018c576109f660408051926109db846106a3565b6109e4816107ee565b845260208101516020850152016107ee565b604082015290565b81516001600160a01b03908116825260208084015190830152604092830151811692820192909252918116606083015291909116608082015260a00190565b600154600254604051610b089760209790966001600160a01b0394851696929490931692610a6a856106a3565b60018060a01b0316845287840152336040840152610ab3604051938885019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b60608352610ac26080846106be565b60405193610acf85610674565b60018060a01b0316845286840152604083015260608201525f604051809681958294636b72870760e01b8452339133916004860161074b565b03925af19081156105ea575f91610b1d575090565b90506020813d602011610b44575b81610b38602093836106be565b8101031261018c575190565b3d9150610b2b565b6020610b7f5f9360018060a01b036002541690604051958680948193630fba221960e41b835233903390600485016109fe565b03925af19182156105ea575f92610c28575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af19081156105ea575f91610bee575b5015610bdf5790565b636c7b6f5560e11b5f5260045ffd5b90506020813d602011610c20575b81610c09602093836106be565b8101031261018c57610c1a90610802565b5f610bd6565b3d9150610bfc565b9091506020813d602011610c55575b81610c44602093836106be565b8101031261018c5751906020610b91565b3d9150610c3756fea264697066735822122052acb6ad302747e31250deb3a067549947d760cb2a3f671026cb363bcd37071664736f6c634300081a0033",
    "sourceMap": "390:5980:84:-:0;;;;;;;;;;;;;-1:-1:-1;;390:5980:84;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;;;-1:-1:-1;390:5980:84;;;-1:-1:-1;390:5980:84;;;;;;;737:26;390:5980;;;737:26;390:5980;;;;;;;773:28;390:5980;;;773:28;390:5980;;;;;;;;;;;-1:-1:-1;390:5980:84;;;;;;-1:-1:-1;390:5980:84;;;;;-1:-1:-1;390:5980:84",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f803560e01c80631b24bf52146105f557806367cebb701461048b57806372448d4d1461035e578063a7a6884d14610298578063a8270530146101d85763c26613731461005c575f80fd5b346101d55760e03660031901126101d55780610076610632565b602435610081610648565b6084359260ff841684036101d1576002546001600160a01b03918216949116843b156101cd576100d6918691604051938492839263d505accf60e01b845260c4359160a435918a60643591336004890161070a565b038183885af19081156101c25785916101a4575b5050906020926101459260018060a01b0360025416926040519261010d846106a3565b8352858301526001600160a01b031660408083019190915251630fba221960e41b8152958693849283919033908190600485016109fe565b03925af19081156101985790610161575b602090604051908152f35b506020813d602011610190575b8161017b602093836106be565b8101031261018c5760209051610156565b5f80fd5b3d915061016e565b604051903d90823e3d90fd5b816101b1919493946106be565b6101bd5790835f6100ea565b505050fd5b6040513d87823e3d90fd5b8580fd5b8480fd5b80fd5b50346101d55760203660031901126101d55780546040516328c44a9960e21b815260048035908201819052918390829060249082906001600160a01b03165afa90811561028d57606061024c610120610262959461025c94886020999261026a575b50500151868082518301019101610941565b01518480825183010191016109bf565b90610b4c565b604051908152f35b61028692503d8091833e61027e81836106be565b810190610855565b5f8061023a565b6040513d85823e3d90fd5b50346101d5576101203660031901126101d5576102b3610632565b6024356102be610648565b906102c761065e565b936102d06106fa565b6001546001600160a01b038681169116813b1561035a5791839161031a938360405180968195829463d505accf60e01b8452610104359160e435918d60a43591336004890161070a565b03925af1801561034f5761033a575b60206102628760643587878a610a3d565b6103458280926106be565b6101d55780610329565b6040513d84823e3d90fd5b8380fd5b50346101d55760a03660031901126101d5576004356044359160ff831683036101d55780546040516328c44a9960e21b815260048101849052908290829060249082906001600160a01b03165afa90811561034f576103d96101206103ea936060938691610471575b50015160208082518301019101610941565b0151602080825183010191016109bf565b8051600254602083015192956001600160a01b03918216939190921691823b156101d1579161044193918580946040519687958694859363d505accf60e01b8552608435926064359260243591336004890161070a565b03925af1801561034f5761045c575b60206102628585610b4c565b6104678280926106be565b6101d55780610450565b61048591503d8088833e61027e81836106be565b5f6103c7565b503461018c5761012036600319011261018c576104a6610632565b90602435906104b3610648565b91606435906001600160401b03821161018c573660238301121561018c5781600401356104df816106df565b926104ed60405194856106be565b818452366024838301011161018c57815f92602460209301838701378401015261051561065e565b9161051e6106fa565b60015490966001600160a01b03908116929116823b1561018c57610568975f91604051998a92839263d505accf60e01b8452610104359160e435918a60a43591336004890161070a565b038183865af19687156105ea57610145976105d5575b506020949560018060a01b0360015416936040519361059c85610674565b84528684015260018060a01b03166040830152606082015284604051809781958294636b72870760e01b8452339133916004860161074b565b602095505f6105e3916106be565b5f9461057e565b6040513d5f823e3d90fd5b3461018c5760a036600319011261018c576020610262610613610632565b61061b610648565b9061062461065e565b916064359160243590610a3d565b600435906001600160a01b038216820361018c57565b604435906001600160a01b038216820361018c57565b608435906001600160401b038216820361018c57565b608081019081106001600160401b0382111761068f57604052565b634e487b7160e01b5f52604160045260245ffd5b606081019081106001600160401b0382111761068f57604052565b90601f801991011681019081106001600160401b0382111761068f57604052565b6001600160401b03811161068f57601f01601f191660200190565b60c4359060ff8216820361018c57565b9360c095919897969360ff9360e087019a60018060a01b0316875260018060a01b031660208701526040860152606085015216608083015260a08201520152565b926001600160401b036101206020606080969998956080895260018060a01b0381511660808a01528281015160a08a015260018060a01b0360408201511660c08a01520151608060e08901528051918291826101008b0152018389015e5f828289010152601f80199101168601019616602085015260018060a01b0316604084015260018060a01b0316910152565b51906001600160401b038216820361018c57565b51906001600160a01b038216820361018c57565b5190811515820361018c57565b81601f8201121561018c57805190610826826106df565b9261083460405194856106be565b8284526020838301011161018c57815f9260208093018386015e8301015290565b60208183031261018c578051906001600160401b03821161018c57016101408183031261018c576040519161014083018381106001600160401b0382111761068f5760405281518352602082015160208401526108b4604083016107da565b60408401526108c5606083016107da565b60608401526108d6608083016107da565b608084015260a082015160a08401526108f160c083016107ee565b60c084015261090260e083016107ee565b60e08401526109146101008301610802565b6101008401526101208201516001600160401b03811161018c57610938920161080f565b61012082015290565b60208183031261018c578051906001600160401b03821161018c570160808183031261018c576040519161097483610674565b61097d826107ee565b835260208201516020840152610995604083016107ee565b604084015260608201516001600160401b03811161018c576109b7920161080f565b606082015290565b9081606091031261018c576109f660408051926109db846106a3565b6109e4816107ee565b845260208101516020850152016107ee565b604082015290565b81516001600160a01b03908116825260208084015190830152604092830151811692820192909252918116606083015291909116608082015260a00190565b600154600254604051610b089760209790966001600160a01b0394851696929490931692610a6a856106a3565b60018060a01b0316845287840152336040840152610ab3604051938885019060409060018060a01b038151168352602081015160208401528160018060a01b0391015116910152565b60608352610ac26080846106be565b60405193610acf85610674565b60018060a01b0316845286840152604083015260608201525f604051809681958294636b72870760e01b8452339133916004860161074b565b03925af19081156105ea575f91610b1d575090565b90506020813d602011610b44575b81610b38602093836106be565b8101031261018c575190565b3d9150610b2b565b6020610b7f5f9360018060a01b036002541690604051958680948193630fba221960e41b835233903390600485016109fe565b03925af19182156105ea575f92610c28575b506001546040516330088bc960e01b8152600481019290925260248201839052602090829060449082905f906001600160a01b03165af19081156105ea575f91610bee575b5015610bdf5790565b636c7b6f5560e11b5f5260045ffd5b90506020813d602011610c20575b81610c09602093836106be565b8101031261018c57610c1a90610802565b5f610bd6565b3d9150610bfc565b9091506020813d602011610c55575b81610c44602093836106be565b8101031261018c5751906020610b91565b3d9150610c3756fea264697066735822122052acb6ad302747e31250deb3a067549947d760cb2a3f671026cb363bcd37071664736f6c634300081a0033",
    "sourceMap": "390:5980:84:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;390:5980:84;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;;;;;;2036:12;390:5980;-1:-1:-1;;;;;390:5980:84;;;;;;1977:169;;;;;;390:5980;;;;;;;;;;;;;1977:169;;390:5980;;;;;;;;;2004:10;;390:5980;1977:169;;;:::i;:::-;;;;;;;;;;;;;;;;390:5980;;;;;;2175:277;390:5980;;;;;;2036:12;390:5980;;;;;;;;;:::i;:::-;;;2222:160;;;390:5980;-1:-1:-1;;;;;390:5980:84;;2222:160;;;390:5980;;;;;-1:-1:-1;;;2175:277:84;;390:5980;;;;;;;;2004:10;;;;390:5980;2175:277;;;:::i;:::-;;;;;;;;;;;;;390:5980;;;;;;;;;2175:277;;390:5980;2175:277;;390:5980;2175:277;;;;;;390:5980;2175:277;;;:::i;:::-;;;390:5980;;;;;;;2175:277;;390:5980;-1:-1:-1;390:5980:84;;2175:277;;;-1:-1:-1;2175:277:84;;;390:5980;;;;;;;;;;1977:169;;;;;;;;:::i;:::-;390:5980;;1977:169;;;;;390:5980;;;;;1977:169;390:5980;;;;;;;;;1977:169;390:5980;;;;;;;;;;;;;;;;;-1:-1:-1;;390:5980:84;;;;;;;;-1:-1:-1;;;5943:34:84;;390:5980;;;5943:34;;;390:5980;;;;;;;;5943:34;;390:5980;;-1:-1:-1;;;;;390:5980:84;5943:34;;;;;;;6223:17;6043:93;6067:8;6320:41;5943:34;;6199:103;5943:34;;390:5980;5943:34;;;;390:5980;6067:8;;;;390:5980;;;;6043:93;;;;;;:::i;:::-;6223:17;;390:5980;;;;6199:103;;;;;;:::i;:::-;6320:41;;:::i;:::-;390:5980;;;;;;5943:34;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;390:5980;;;;;;;;;;;;;;;;-1:-1:-1;;390:5980:84;;;;;;:::i;:::-;;;;;:::i;:::-;;;;:::i;:::-;;;;:::i;:::-;;;-1:-1:-1;;;;;390:5980:84;;;;;4139:174;;;;;390:5980;;;4139:174;390:5980;;;;;;;;;;;;;4139:174;;390:5980;;;;;;;;;4169:10;;390:5980;4139:174;;;:::i;:::-;;;;;;;;;;;390:5980;;4342:165;390:5980;;;;;;4342:165;:::i;4139:174::-;;;;;;:::i;:::-;390:5980;;4139:174;;;;390:5980;;;;;;;;;4139:174;390:5980;;;;;;;;;;-1:-1:-1;;390:5980:84;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;4736:34:84;;390:5980;4736:34;;390:5980;;;;;;;;;;;;-1:-1:-1;;;;;390:5980:84;4736:34;;;;;;;4836:93;4860:8;4992:103;4736:34;390:5980;4736:34;;;;;390:5980;4860:8;;;390:5980;;;;4836:93;;;;;;:::i;:::-;5016:17;;390:5980;;;;4992:103;;;;;;:::i;:::-;390:5980;;5229:12;390:5980;;5256:13;;390:5980;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;5167:179;;;;;390:5980;5167:179;390:5980;;;;;;;;;;;;;;;;;5167:179;;390:5980;;;;;;;;5197:10;;390:5980;5167:179;;;:::i;:::-;;;;;;;;;;;390:5980;;5364:41;;;;:::i;5167:179::-;;;;;;:::i;:::-;390:5980;;5167:179;;;4736:34;;;;;;;;;;;;;:::i;:::-;;;;390:5980;;;;;;;-1:-1:-1;;390:5980:84;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;1148:168;;;;;;390:5980;;;;;;;;;;;;;1148:168;;390:5980;;;;;;;;;1175:10;;390:5980;1148:168;;;:::i;:::-;;;;;;;;;;;;1345:343;1148:168;;;390:5980;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;1391:199;;;390:5980;;;;;;;;1391:199;;390:5980;;1391:199;;390:5980;;;;;;;;;;;;;1345:343;;1175:10;;;1345:343;390:5980;1345:343;;;:::i;1148:168::-;390:5980;1148:168;;390:5980;1148:168;;;:::i;:::-;390:5980;1148:168;;;;390:5980;;;;;;;;;;;;;;;-1:-1:-1;;390:5980:84;;;;;5639:165;390:5980;;:::i;:::-;;;:::i;:::-;;;;:::i;:::-;;;;;;;5639:165;;:::i;390:5980::-;;;;-1:-1:-1;;;;;390:5980:84;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;390:5980:84;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;390:5980:84;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;:::o;:::-;;;;-1:-1:-1;390:5980:84;;;;;-1:-1:-1;390:5980:84;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;:::o;:::-;-1:-1:-1;;;;;390:5980:84;;;;;;-1:-1:-1;;390:5980:84;;;;:::o;:::-;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;390:5980:84;;;;;;:::o;:::-;;;-1:-1:-1;;;;;390:5980:84;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;390:5980:84;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;2465:847::-;390:5980;;2884:12;390:5980;;;2687:618;;2963:203;;2687:618;;-1:-1:-1;;;;;390:5980:84;;;;;;;;;;;;;:::i;:::-;;;;;;;;;2963:203;;;390:5980;3129:10;390:5980;2963:203;;390:5980;;;;2927:261;;;;390:5980;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2927:261;;;;;;:::i;:::-;390:5980;;;;;;:::i;:::-;;;;;;;;;2733:474;;;390:5980;;2733:474;;390:5980;;2733:474;;390:5980;-1:-1:-1;390:5980:84;;;;;;;;;;;2687:618;;3129:10;;;2687:618;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;2687:618:84;;;2668:637;2465:847;:::o;2687:618::-;;;2963:203;2687:618;;2963:203;2687:618;;;;;;390:5980;2687:618;;;:::i;:::-;;;390:5980;;;;;2465:847;:::o;2687:618::-;;;-1:-1:-1;2687:618:84;;3318:466;3506:107;;-1:-1:-1;3318:466:84;390:5980;;;;;3506:12;390:5980;;;;;;;;;;;;;;3506:107;;3569:10;;;3506:107;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;3506:107:84;;;3318:466;-1:-1:-1;390:5980:84;;;;-1:-1:-1;;;3629:59:84;;3506:107;3629:59;;390:5980;;;;;;;;;;3506:107;;390:5980;;3629:59;;390:5980;;-1:-1:-1;;;;;;;390:5980:84;3629:59;;;;;;;-1:-1:-1;3629:59:84;;;3318:466;3628:60;;3624:121;;3318:466;:::o;3624:121::-;3711:23;;;-1:-1:-1;3711:23:84;3506:107;-1:-1:-1;3711:23:84;3629:59;;;3506:107;3629:59;;3506:107;3629:59;;;;;;3506:107;3629:59;;;:::i;:::-;;;390:5980;;;;;;;:::i;:::-;3629:59;;;;;;-1:-1:-1;3629:59:84;;3506:107;;;;;;;;;;;;;;390:5980;3506:107;;;:::i;:::-;;;390:5980;;;;;;3506:107;;;;;;-1:-1:-1;3506:107:84;",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "buyErc20ForErc20(address,uint256,address,uint256,uint64)": "1b24bf52",
    "payErc20ForErc20(bytes32)": "a8270530",
    "permitAndBuyErc20ForErc20(address,uint256,address,uint256,uint64,uint256,uint8,bytes32,bytes32)": "a7a6884d",
    "permitAndBuyWithErc20(address,uint256,address,bytes,uint64,uint256,uint8,bytes32,bytes32)": "67cebb70",
    "permitAndPayErc20ForErc20(bytes32,uint256,uint8,bytes32,bytes32)": "72448d4d",
    "permitAndPayWithErc20(address,uint256,address,uint256,uint8,bytes32,bytes32)": "c2661373"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ERC20EscrowObligation\",\"name\":\"_erc20Escrow\",\"type\":\"address\"},{\"internalType\":\"contract ERC20PaymentObligation\",\"name\":\"_erc20Payment\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"CouldntCollectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidAmount\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"}],\"name\":\"buyErc20ForErc20\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"buyAttestation\",\"type\":\"bytes32\"}],\"name\":\"payErc20ForErc20\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"bidToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"bidAmount\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"askToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"askAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"permitAndBuyErc20ForErc20\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expiration\",\"type\":\"uint64\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"permitAndBuyWithErc20\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"buyAttestation\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"permitAndPayErc20ForErc20\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"payee\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"permitAndPayWithErc20\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Utils/ERC20BarterUtils.sol\":\"ERC20BarterUtils\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009\",\"dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol\":{\"keccak256\":\"0xe9d36d0c892aea68546d53f21e02223f7f542295c10110a0764336f9ffeab6d1\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://34d4d72a89193f4d5223763e6d871443fb32a22d6024566843f4ee42eed68bdd\",\"dweb:/ipfs/Qmbsc6kJJNhrkNXP7g7KeqzRETQEvzSXg3ZmJmVLhaEahB\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265\",\"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147\",\"dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Statements/ERC20EscrowObligation.sol\":{\"keccak256\":\"0x1a59fee223b7db5271068496e2d2def0504b3c264ef2d43c63f0e43c08f051d0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://7fc7d3224da7a11f03d0d0dac1512d4fd18c04c5a76953c470c6cc11b0bf4331\",\"dweb:/ipfs/QmQ8aNrwQTzEnjCX8SjVqW9CfU8pwuLvp9UjysgZVwMp8V\"]},\"src/Statements/ERC20PaymentObligation.sol\":{\"keccak256\":\"0xf5de5b9f7f9f83dc1df346f1d2e66d2d3519632b98ab4b7e28b11251be2f4fdf\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://bc3201e9225988f0ad8ebddd1158cd7f361e05c8823188e2cf9535bef58e0746\",\"dweb:/ipfs/QmZ5EQFS6greLQYszTmJ8ox1BPFxsdmAdqjmFQ14rfqMMN\"]},\"src/Utils/ERC20BarterUtils.sol\":{\"keccak256\":\"0xcaa06e3fa67f86b222f2cbf165e8ba362c9020d5d183d4ca89170f53fd85583d\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://7fd56c82d7714d56acb05651784f95493fc25fff409689cf75021cdfaf0fd885\",\"dweb:/ipfs/QmYAN4rZ9qij4idmzKYjGP4md2SbKqLHjHJ2Q513V6hqQc\"]}},\"version\":1}",
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
              "internalType": "contract ERC20EscrowObligation",
              "name": "_erc20Escrow",
              "type": "address"
            },
            {
              "internalType": "contract ERC20PaymentObligation",
              "name": "_erc20Payment",
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
          "name": "buyErc20ForErc20",
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
          "name": "payErc20ForErc20",
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
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "permitAndBuyErc20ForErc20",
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
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "arbiter",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "demand",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "expiration",
              "type": "uint64"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "permitAndBuyWithErc20",
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
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "permitAndPayErc20ForErc20",
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
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "payee",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "permitAndPayWithErc20",
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
        "src/Utils/ERC20BarterUtils.sol": "ERC20BarterUtils"
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
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        "keccak256": "0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4",
        "urls": [
          "bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009",
          "dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol": {
        "keccak256": "0xe9d36d0c892aea68546d53f21e02223f7f542295c10110a0764336f9ffeab6d1",
        "urls": [
          "bzz-raw://34d4d72a89193f4d5223763e6d871443fb32a22d6024566843f4ee42eed68bdd",
          "dweb:/ipfs/Qmbsc6kJJNhrkNXP7g7KeqzRETQEvzSXg3ZmJmVLhaEahB"
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
      "src/Statements/ERC20EscrowObligation.sol": {
        "keccak256": "0x1a59fee223b7db5271068496e2d2def0504b3c264ef2d43c63f0e43c08f051d0",
        "urls": [
          "bzz-raw://7fc7d3224da7a11f03d0d0dac1512d4fd18c04c5a76953c470c6cc11b0bf4331",
          "dweb:/ipfs/QmQ8aNrwQTzEnjCX8SjVqW9CfU8pwuLvp9UjysgZVwMp8V"
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
      "src/Utils/ERC20BarterUtils.sol": {
        "keccak256": "0xcaa06e3fa67f86b222f2cbf165e8ba362c9020d5d183d4ca89170f53fd85583d",
        "urls": [
          "bzz-raw://7fd56c82d7714d56acb05651784f95493fc25fff409689cf75021cdfaf0fd885",
          "dweb:/ipfs/QmYAN4rZ9qij4idmzKYjGP4md2SbKqLHjHJ2Q513V6hqQc"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 84
} as const;