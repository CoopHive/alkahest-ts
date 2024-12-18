export const abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        { name: "_eas", type: "address", internalType: "address" },
        {
          name: "_erc20Payment",
          type: "address",
          internalType: "address payable",
        },
        { name: "_erc20Fulfillment", type: "address", internalType: "address" },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "buyErc20ForErc20",
      inputs: [
        { name: "bidToken", type: "address", internalType: "address" },
        { name: "bidAmount", type: "uint256", internalType: "uint256" },
        { name: "askToken", type: "address", internalType: "address" },
        { name: "askAmount", type: "uint256", internalType: "uint256" },
        { name: "expiration", type: "uint64", internalType: "uint64" },
      ],
      outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "payErc20ForErc20",
      inputs: [
        { name: "buyAttestation", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "permitAndBuyErc20ForErc20",
      inputs: [
        { name: "bidToken", type: "address", internalType: "address" },
        { name: "bidAmount", type: "uint256", internalType: "uint256" },
        { name: "askToken", type: "address", internalType: "address" },
        { name: "askAmount", type: "uint256", internalType: "uint256" },
        { name: "expiration", type: "uint64", internalType: "uint64" },
        { name: "v", type: "uint8", internalType: "uint8" },
        { name: "r", type: "bytes32", internalType: "bytes32" },
        { name: "s", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "permitAndBuyWithErc20",
      inputs: [
        { name: "token", type: "address", internalType: "address" },
        { name: "amount", type: "uint256", internalType: "uint256" },
        { name: "arbiter", type: "address", internalType: "address" },
        { name: "demand", type: "bytes", internalType: "bytes" },
        { name: "expiration", type: "uint64", internalType: "uint64" },
        { name: "v", type: "uint8", internalType: "uint8" },
        { name: "r", type: "bytes32", internalType: "bytes32" },
        { name: "s", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "permitAndPayErc20ForErc20",
      inputs: [
        { name: "buyAttestation", type: "bytes32", internalType: "bytes32" },
        { name: "askToken", type: "address", internalType: "address" },
        { name: "askAmount", type: "uint256", internalType: "uint256" },
        { name: "v", type: "uint8", internalType: "uint8" },
        { name: "r", type: "bytes32", internalType: "bytes32" },
        { name: "s", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "permitAndPayWithErc20",
      inputs: [
        { name: "token", type: "address", internalType: "address" },
        { name: "amount", type: "uint256", internalType: "uint256" },
        { name: "item", type: "bytes32", internalType: "bytes32" },
        { name: "expiration", type: "uint64", internalType: "uint64" },
        { name: "v", type: "uint8", internalType: "uint8" },
        { name: "r", type: "bytes32", internalType: "bytes32" },
        { name: "s", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
      stateMutability: "nonpayable",
    },
    { type: "error", name: "CouldntCollectPayment", inputs: [] },
  ],
  bytecode: {
    object:
      "0x60803460ab57601f610d9238819003918201601f19168301916001600160401b0383118484101760af5780849260609460405283398101031260ab5760428160c3565b602082015190916001600160a01b0382169182900360ab5760406064910160c3565b5f80546001600160a01b039485166001600160a01b0319918216179091556001805482169390931790925560028054919093169116179055604051610cbb90816100d78239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b51906001600160a01b038216820360ab5756fe60806040526004361015610011575f80fd5b5f803560e01c80631b24bf52146105ce5780634cbfeeca146104ff5780635957c3111461032c57806395cb9bf014610247578063a8270530146102205763c18ae7411461005c575f80fd5b3461021d5760e036600319011261021d5761007561060b565b9060243591606435906001600160401b0382168092036101f2576084359060ff8216820361021957600180546001600160a01b0392831693429283019390911691831061020557833b15610201579085916100ee604051948593849363d505accf60e01b855260c435928c60a4359333600489016106e3565b038183865af180156101f6579084916101dd575b505060018060a01b0360015416936040519161011d8361065d565b8252602082015282604082015261016c602094859260405161013f85826106a7565b868152606082015285604051809681958294631a65c01f60e21b845260a0600485015260a4840190610724565b906024830152604435604483015233606483015233608483015203925af19182156101d157916101a0575b50604051908152f35b90508181813d83116101ca575b6101b781836106a7565b810103126101c657515f610197565b5f80fd5b503d6101ad565b604051903d90823e3d90fd5b816101e7916106a7565b6101f257825f610102565b8280fd5b6040513d86823e3d90fd5b8580fd5b634e487b7160e01b86526011600452602486fd5b8380fd5b80fd5b503461021d57602036600319011261021d57602061023f600435610922565b604051908152f35b503461021d5761010036600319011261021d5761026261060b565b60243561026d610621565b90610276610637565b9361027f61064d565b6001805442918201926001600160a01b0388811693921691841061031857823b1561031457916102d493918580946040519687958694859363d505accf60e01b855260e435928d60c4359333600489016106e3565b03925af18015610309576102f4575b602061023f8760643587878a6107bf565b6102ff8280926106a7565b61021d57806102e3565b6040513d84823e3d90fd5b8480fd5b634e487b7160e01b85526011600452602485fd5b503461021d5761010036600319011261021d5761034761060b565b602435610352610621565b916064356001600160401b0381116103145736602382011215610314578481600401359161037f836106c8565b9261038d60405194856106a7565b80845236602482840101116101f2578060246020930183860137830101526103b3610637565b936103bc61064d565b6001600160a01b03909316924260018101919082106104eb578790853b156104e75760405163d505accf60e01b815292839182916104099160e4359160c43591908c3033600489016106e3565b038183885af180156104dc576104c7575b50916020939161047896959360018060a01b0360015416936040519361043f8561065d565b84528684015260018060a01b03166040830152606082015284604051809781958294631a65c01f60e21b8452339133916004860161077c565b03925af19081156101d15790610494575b602090604051908152f35b506020813d6020116104bf575b816104ae602093836106a7565b810103126101c65760209051610489565b3d91506104a1565b6104d28780926106a7565b610201575f61041a565b6040513d89823e3d90fd5b5080fd5b634e487b7160e01b88526011600452602488fd5b346101c65760c03660031901126101c6576024356001600160a01b038116908190036101c65760643560ff811681036101c657600180546001600160a01b031692429182019182106105ba57803b156101c657610583935f80946040519687958694859363d505accf60e01b855260a43592608435926044359033600489016106e3565b03925af180156105af5761059f575b602061023f600435610922565b5f6105a9916106a7565b5f610592565b6040513d5f823e3d90fd5b634e487b7160e01b5f52601160045260245ffd5b346101c65760a03660031901126101c657602061023f6105ec61060b565b6105f4610621565b906105fd610637565b9160643591602435906107bf565b600435906001600160a01b03821682036101c657565b604435906001600160a01b03821682036101c657565b608435906001600160401b03821682036101c657565b60a4359060ff821682036101c657565b608081019081106001600160401b0382111761067857604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761067857604052565b90601f801991011681019081106001600160401b0382111761067857604052565b6001600160401b03811161067857601f01601f191660200190565b9360c095919897969360ff9360e087019a60018060a01b0316875260018060a01b031660208701526040860152606085015216608083015260a08201520152565b906020606060a093600180861b0381511684528281015183850152600180861b0360408201511660408501520151608060608401528051918291826080860152018484015e5f828201840152601f01601f1916010190565b926001600160401b0361079c60809497969360a0875260a0870190610724565b961660208501525f60408501526001600160a01b03908116606085015216910152565b6001546002546040516108639760209790966001600160a01b039485169692949093169288906107ee8661068c565b6001600160a01b031680865294019081526040805189810195909552905184820152835261081d6060846106a7565b6040519361082a8561065d565b60018060a01b0316845286840152604083015260608201525f604051809681958294631a65c01f60e21b8452339133916004860161077c565b03925af19081156105af575f91610878575090565b90506020813d60201161089f575b81610893602093836106a7565b810103126101c6575190565b3d9150610886565b51906001600160401b03821682036101c657565b51906001600160a01b03821682036101c657565b519081151582036101c657565b81601f820112156101c6578051906108f3826106c8565b9261090160405194856106a7565b828452602083830101116101c657815f9260208093018386015e8301015290565b5f80546040516328c44a9960e21b8152600481018490529190829060249082906001600160a01b03165afa80156105af575f90610b81575b61012001518051810191506020818303126101c6576020810151906001600160401b0382116101c657016080818303126101c6576040519061099b8261065d565b6109a7602082016108bb565b8252604081015160208301526109bf606082016108bb565b60408301526080810151906001600160401b0382116101c65760206109eb9281606096019201016108dc565b91829101526040818051810103126101c6575f91602091604051610a0e8161068c565b6040610a1b8584016108bb565b928383520151938491015260018060a01b03600154169260405191610a3f8361065d565b60018060a01b031682526020820152836040820152610a956020938492604051610a6985826106a7565b8781526060820152604051968780948193631a65c01f60e21b835260a0600484015260a4830190610724565b82602483015287604483015233606483015233608483015203925af19283156105af575f93610b52575b506001546040516330088bc960e01b81526004810192909252602482018490528290829060449082905f906001600160a01b03165af19182156105af575f92610b1c575b505015610b0d5790565b636c7b6f5560e11b5f5260045ffd5b90809250813d8311610b4b575b610b3381836106a7565b810103126101c657610b44906108cf565b5f80610b03565b503d610b29565b9092508181813d8311610b7a575b610b6a81836106a7565b810103126101c657519181610abf565b503d610b60565b503d805f833e610b9181836106a7565b8101906020818303126101c6578051906001600160401b0382116101c65701610140818303126101c6576040519061014082018281106001600160401b03821117610678576040528051825260208101516020830152610bf3604082016108a7565b6040830152610c04606082016108a7565b6060830152610c15608082016108a7565b608083015260a081015160a0830152610c3060c082016108bb565b60c0830152610c4160e082016108bb565b60e0830152610c5361010082016108cf565b610100830152610120810151926001600160401b0384116101c65761012093610c7c92016108dc565b8282015261095a56fea2646970667358221220bc62fd09a7c7dbbb9927b7eceae68a687a9a36106a6364c90ba4a473bb87eb6b64736f6c634300081a0033",
    sourceMap:
      "408:5942:53:-:0;;;;;;;;;;;;;-1:-1:-1;;408:5942:53;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;;;:::i;:::-;-1:-1:-1;408:5942:53;;-1:-1:-1;;;;;408:5942:53;;;-1:-1:-1;;;;;;408:5942:53;;;;;;;-1:-1:-1;408:5942:53;;;;;;;;;;;824:68;408:5942;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;408:5942:53;;;;;;-1:-1:-1;408:5942:53;;;;;-1:-1:-1;408:5942:53;;;;-1:-1:-1;;;;;408:5942:53;;;;;;:::o",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x60806040526004361015610011575f80fd5b5f803560e01c80631b24bf52146105ce5780634cbfeeca146104ff5780635957c3111461032c57806395cb9bf014610247578063a8270530146102205763c18ae7411461005c575f80fd5b3461021d5760e036600319011261021d5761007561060b565b9060243591606435906001600160401b0382168092036101f2576084359060ff8216820361021957600180546001600160a01b0392831693429283019390911691831061020557833b15610201579085916100ee604051948593849363d505accf60e01b855260c435928c60a4359333600489016106e3565b038183865af180156101f6579084916101dd575b505060018060a01b0360015416936040519161011d8361065d565b8252602082015282604082015261016c602094859260405161013f85826106a7565b868152606082015285604051809681958294631a65c01f60e21b845260a0600485015260a4840190610724565b906024830152604435604483015233606483015233608483015203925af19182156101d157916101a0575b50604051908152f35b90508181813d83116101ca575b6101b781836106a7565b810103126101c657515f610197565b5f80fd5b503d6101ad565b604051903d90823e3d90fd5b816101e7916106a7565b6101f257825f610102565b8280fd5b6040513d86823e3d90fd5b8580fd5b634e487b7160e01b86526011600452602486fd5b8380fd5b80fd5b503461021d57602036600319011261021d57602061023f600435610922565b604051908152f35b503461021d5761010036600319011261021d5761026261060b565b60243561026d610621565b90610276610637565b9361027f61064d565b6001805442918201926001600160a01b0388811693921691841061031857823b1561031457916102d493918580946040519687958694859363d505accf60e01b855260e435928d60c4359333600489016106e3565b03925af18015610309576102f4575b602061023f8760643587878a6107bf565b6102ff8280926106a7565b61021d57806102e3565b6040513d84823e3d90fd5b8480fd5b634e487b7160e01b85526011600452602485fd5b503461021d5761010036600319011261021d5761034761060b565b602435610352610621565b916064356001600160401b0381116103145736602382011215610314578481600401359161037f836106c8565b9261038d60405194856106a7565b80845236602482840101116101f2578060246020930183860137830101526103b3610637565b936103bc61064d565b6001600160a01b03909316924260018101919082106104eb578790853b156104e75760405163d505accf60e01b815292839182916104099160e4359160c43591908c3033600489016106e3565b038183885af180156104dc576104c7575b50916020939161047896959360018060a01b0360015416936040519361043f8561065d565b84528684015260018060a01b03166040830152606082015284604051809781958294631a65c01f60e21b8452339133916004860161077c565b03925af19081156101d15790610494575b602090604051908152f35b506020813d6020116104bf575b816104ae602093836106a7565b810103126101c65760209051610489565b3d91506104a1565b6104d28780926106a7565b610201575f61041a565b6040513d89823e3d90fd5b5080fd5b634e487b7160e01b88526011600452602488fd5b346101c65760c03660031901126101c6576024356001600160a01b038116908190036101c65760643560ff811681036101c657600180546001600160a01b031692429182019182106105ba57803b156101c657610583935f80946040519687958694859363d505accf60e01b855260a43592608435926044359033600489016106e3565b03925af180156105af5761059f575b602061023f600435610922565b5f6105a9916106a7565b5f610592565b6040513d5f823e3d90fd5b634e487b7160e01b5f52601160045260245ffd5b346101c65760a03660031901126101c657602061023f6105ec61060b565b6105f4610621565b906105fd610637565b9160643591602435906107bf565b600435906001600160a01b03821682036101c657565b604435906001600160a01b03821682036101c657565b608435906001600160401b03821682036101c657565b60a4359060ff821682036101c657565b608081019081106001600160401b0382111761067857604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761067857604052565b90601f801991011681019081106001600160401b0382111761067857604052565b6001600160401b03811161067857601f01601f191660200190565b9360c095919897969360ff9360e087019a60018060a01b0316875260018060a01b031660208701526040860152606085015216608083015260a08201520152565b906020606060a093600180861b0381511684528281015183850152600180861b0360408201511660408501520151608060608401528051918291826080860152018484015e5f828201840152601f01601f1916010190565b926001600160401b0361079c60809497969360a0875260a0870190610724565b961660208501525f60408501526001600160a01b03908116606085015216910152565b6001546002546040516108639760209790966001600160a01b039485169692949093169288906107ee8661068c565b6001600160a01b031680865294019081526040805189810195909552905184820152835261081d6060846106a7565b6040519361082a8561065d565b60018060a01b0316845286840152604083015260608201525f604051809681958294631a65c01f60e21b8452339133916004860161077c565b03925af19081156105af575f91610878575090565b90506020813d60201161089f575b81610893602093836106a7565b810103126101c6575190565b3d9150610886565b51906001600160401b03821682036101c657565b51906001600160a01b03821682036101c657565b519081151582036101c657565b81601f820112156101c6578051906108f3826106c8565b9261090160405194856106a7565b828452602083830101116101c657815f9260208093018386015e8301015290565b5f80546040516328c44a9960e21b8152600481018490529190829060249082906001600160a01b03165afa80156105af575f90610b81575b61012001518051810191506020818303126101c6576020810151906001600160401b0382116101c657016080818303126101c6576040519061099b8261065d565b6109a7602082016108bb565b8252604081015160208301526109bf606082016108bb565b60408301526080810151906001600160401b0382116101c65760206109eb9281606096019201016108dc565b91829101526040818051810103126101c6575f91602091604051610a0e8161068c565b6040610a1b8584016108bb565b928383520151938491015260018060a01b03600154169260405191610a3f8361065d565b60018060a01b031682526020820152836040820152610a956020938492604051610a6985826106a7565b8781526060820152604051968780948193631a65c01f60e21b835260a0600484015260a4830190610724565b82602483015287604483015233606483015233608483015203925af19283156105af575f93610b52575b506001546040516330088bc960e01b81526004810192909252602482018490528290829060449082905f906001600160a01b03165af19182156105af575f92610b1c575b505015610b0d5790565b636c7b6f5560e11b5f5260045ffd5b90809250813d8311610b4b575b610b3381836106a7565b810103126101c657610b44906108cf565b5f80610b03565b503d610b29565b9092508181813d8311610b7a575b610b6a81836106a7565b810103126101c657519181610abf565b503d610b60565b503d805f833e610b9181836106a7565b8101906020818303126101c6578051906001600160401b0382116101c65701610140818303126101c6576040519061014082018281106001600160401b03821117610678576040528051825260208101516020830152610bf3604082016108a7565b6040830152610c04606082016108a7565b6060830152610c15608082016108a7565b608083015260a081015160a0830152610c3060c082016108bb565b60c0830152610c4160e082016108bb565b60e0830152610c5361010082016108cf565b610100830152610120810151926001600160401b0384116101c65761012093610c7c92016108dc565b8282015261095a56fea2646970667358221220bc62fd09a7c7dbbb9927b7eceae68a687a9a36106a6364c90ba4a473bb87eb6b64736f6c634300081a0033",
    sourceMap:
      "408:5942:53:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;408:5942:53;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;2182:15;408:5942;;;;;;;;-1:-1:-1;;408:5942:53;;2076:180;;;;;408:5942;;;2076:180;408:5942;;;;;;;;;;2076:180;;408:5942;;;;;;2103:10;;408:5942;2076:180;;;:::i;:::-;;;;;;;;;;;;;;;;408:5942;;;;;;;;;;;;;;;;;;:::i;:::-;;;;2332:199;;408:5942;2332:199;408:5942;2332:199;;408:5942;;;;;;;;;;;;:::i;:::-;;;;;2332:199;;408:5942;;;;;;;;;;;;;2285:366;;408:5942;;2285:366;;408:5942;;;;;;:::i;:::-;;;;;;;;;;;;2103:10;408:5942;;;;2103:10;408:5942;;;;2285:366;;;;;;;;;;;;408:5942;;;;;;;;2285:366;;;;;;;;;;;;;;;;:::i;:::-;;;408:5942;;;;;2285:366;;;408:5942;-1:-1:-1;408:5942:53;;2285:366;;;;;;408:5942;;;;;;;;;;2076:180;;;;;:::i;:::-;408:5942;;2076:180;;;;408:5942;;;;2076:180;408:5942;;;;;;;;;2076:180;408:5942;;;;-1:-1:-1;;;408:5942:53;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;408:5942:53;;;;;6308:33;408:5942;;6308:33;:::i;:::-;408:5942;;;;;;;;;;;;;-1:-1:-1;;408:5942:53;;;;;;:::i;:::-;;;;;:::i;:::-;;;;:::i;:::-;;;;:::i;:::-;;;;4996:15;408:5942;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;;-1:-1:-1;408:5942:53;;4884:186;;;;;408:5942;4884:186;408:5942;;;;;;;;;;;;;;;;;4884:186;;408:5942;;;;;;4914:10;;408:5942;4884:186;;;:::i;:::-;;;;;;;;;;;408:5942;;5099:165;408:5942;;;;;;5099:165;:::i;4884:186::-;;;;;;:::i;:::-;408:5942;;4884:186;;;;408:5942;;;;;;;;;4884:186;408:5942;;;;-1:-1:-1;;;408:5942:53;;;;;;;;;;;;;;;-1:-1:-1;;408:5942:53;;;;;;:::i;:::-;;;;;:::i;:::-;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;;;;;408:5942:53;;;;1311:15;408:5942;;;;;;-1:-1:-1;408:5942:53;;1213:172;;;;;;;408:5942;;-1:-1:-1;;;1213:172:53;;408:5942;;;;;1213:172;;408:5942;;;;;;;1272:4;;1240:10;408:5942;1213:172;;;:::i;:::-;;;;;;;;;;;;;408:5942;;;;;;1414:373;408:5942;;;;;;;;;;;;;;;;;;:::i;:::-;;;1461:200;;;408:5942;;;;;;;;1461:200;;408:5942;;1461:200;;408:5942;;;;;;;;;;;;;1414:373;;1240:10;;;1414:373;408:5942;1414:373;;;:::i;:::-;;;;;;;;;;;;;408:5942;;;;;;;;;1414:373;;408:5942;1414:373;;408:5942;1414:373;;;;;;408:5942;1414:373;;;:::i;:::-;;;408:5942;;;;;;;1414:373;;;;;-1:-1:-1;1414:373:53;;1213:172;;;;;;:::i;:::-;408:5942;;1213:172;;;;408:5942;;;;;;;;;1213:172;408:5942;;;;-1:-1:-1;;;408:5942:53;;;;;;;;;;;;;;-1:-1:-1;;408:5942:53;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;408:5942:53;;5664:15;408:5942;;;;;-1:-1:-1;408:5942:53;;5552:186;;;;;;408:5942;;;;;;;;;;;;;;;;5552:186;;408:5942;;;;;;;;5582:10;;408:5942;5552:186;;;:::i;:::-;;;;;;;;;;;408:5942;;5755:33;408:5942;;5755:33;:::i;5552:186::-;408:5942;5552:186;;;:::i;:::-;408:5942;5552:186;;;408:5942;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;408:5942:53;;;;;6022:165;408:5942;;:::i;:::-;;;:::i;:::-;;;;:::i;:::-;;;;;;;6022:165;;:::i;408:5942::-;;;;-1:-1:-1;;;;;408:5942:53;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;408:5942:53;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;408:5942:53;;;;;;:::o;:::-;;;;;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;:::o;:::-;;;;-1:-1:-1;408:5942:53;;;;;-1:-1:-1;408:5942:53;;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;:::o;:::-;-1:-1:-1;;;;;408:5942:53;;;;;;-1:-1:-1;;408:5942:53;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;408:5942:53;;;;:::o;:::-;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;:::o;2664:839::-;408:5942;;3085:16;408:5942;;;2886:610;;3168:161;;2886:610;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;3168:161;;408:5942;;;:::i;:::-;-1:-1:-1;;;;;408:5942:53;;;;3168:161;;408:5942;;;;;;3132:219;;;408:5942;;;;;;;;;;3132:219;;;;408:5942;3132:219;:::i;:::-;408:5942;;;;;;:::i;:::-;;;;;;;;;2933:437;;;408:5942;;2933:437;;408:5942;3132:219;2933:437;;408:5942;-1:-1:-1;408:5942:53;;;;;;;;;;;2886:610;;3444:10;;;2886:610;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;2886:610:53;;;2867:629;2664:839;:::o;2886:610::-;;;3168:161;2886:610;;3168:161;2886:610;;;;;;408:5942;2886:610;;;:::i;:::-;;;408:5942;;;;;2664:839;:::o;2886:610::-;;;-1:-1:-1;2886:610:53;;408:5942;;;-1:-1:-1;;;;;408:5942:53;;;;;;:::o;:::-;;;-1:-1:-1;;;;;408:5942:53;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;408:5942:53;;;;;;;;;;;;;;:::o;3509:1046::-;3636:3;408:5942;;;;-1:-1:-1;;;3636:34:53;;;;;408:5942;;;;3636:3;408:5942;;3636:34;;408:5942;;-1:-1:-1;;;;;408:5942:53;3636:34;;;;;;:3;:34;;;3509:1046;3762:8;;;408:5942;;3738:94;;;-1:-1:-1;408:5942:53;;;;;;;;3738:94;;408:5942;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;3738:94;;408:5942;3738:94;;408:5942;;;;:::i;:::-;;;;;;;;;;3900:109;;408:5942;;;;3636:3;408:5942;;;;;;;;:::i;:::-;;;3900:109;;;408:5942;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;4089:193;;408:5942;4089:193;408:5942;4089:193;;408:5942;;;;;;;;;;;;:::i;:::-;;;;;4089:193;;408:5942;;;;;;;;;;;;4046:337;;408:5942;3636:34;4046:337;;408:5942;;;;;;:::i;:::-;;3636:34;408:5942;;;;;;;;4339:10;408:5942;;;;4339:10;408:5942;;;;4046:337;;;;;;;;;3636:3;4046:337;;;3509:1046;-1:-1:-1;408:5942:53;;;;-1:-1:-1;;;4399:60:53;;3636:34;4399:60;;408:5942;;;;3636:34;408:5942;;;;;;;;;;;;;3636:3;;-1:-1:-1;;;;;408:5942:53;4399:60;;;;;;;3636:3;4399:60;;;3509:1046;4398:61;;;4394:122;;3509:1046;:::o;4394:122::-;4482:23;;;3636:3;4482:23;3636:34;:3;4482:23;4399:60;;;;;;;;;;;;;;;;:::i;:::-;;;408:5942;;;;;;;:::i;:::-;4399:60;;;;;;;;;4046:337;;;;;;;;;;;;;;;;;:::i;:::-;;;408:5942;;;;;;;4046:337;;;;;;;3636:34;;;;:3;:34;;;;;;:::i;:::-;;;408:5942;;;;;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;408:5942:53;;;;3762:8;408:5942;;;;;:::i;:::-;;;;;3636:34;",
    linkReferences: {},
  },
  methodIdentifiers: {
    "buyErc20ForErc20(address,uint256,address,uint256,uint64)": "1b24bf52",
    "payErc20ForErc20(bytes32)": "a8270530",
    "permitAndBuyErc20ForErc20(address,uint256,address,uint256,uint64,uint8,bytes32,bytes32)":
      "95cb9bf0",
    "permitAndBuyWithErc20(address,uint256,address,bytes,uint64,uint8,bytes32,bytes32)":
      "5957c311",
    "permitAndPayErc20ForErc20(bytes32,address,uint256,uint8,bytes32,bytes32)":
      "4cbfeeca",
    "permitAndPayWithErc20(address,uint256,bytes32,uint64,uint8,bytes32,bytes32)":
      "c18ae741",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.26+commit.8a97fa7a"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"address","name":"_eas","type":"address"},{"internalType":"address payable","name":"_erc20Payment","type":"address"},{"internalType":"address","name":"_erc20Fulfillment","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"CouldntCollectPayment","type":"error"},{"inputs":[{"internalType":"address","name":"bidToken","type":"address"},{"internalType":"uint256","name":"bidAmount","type":"uint256"},{"internalType":"address","name":"askToken","type":"address"},{"internalType":"uint256","name":"askAmount","type":"uint256"},{"internalType":"uint64","name":"expiration","type":"uint64"}],"name":"buyErc20ForErc20","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"buyAttestation","type":"bytes32"}],"name":"payErc20ForErc20","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"bidToken","type":"address"},{"internalType":"uint256","name":"bidAmount","type":"uint256"},{"internalType":"address","name":"askToken","type":"address"},{"internalType":"uint256","name":"askAmount","type":"uint256"},{"internalType":"uint64","name":"expiration","type":"uint64"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permitAndBuyErc20ForErc20","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"uint64","name":"expiration","type":"uint64"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permitAndBuyWithErc20","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"buyAttestation","type":"bytes32"},{"internalType":"address","name":"askToken","type":"address"},{"internalType":"uint256","name":"askAmount","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permitAndPayErc20ForErc20","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32","name":"item","type":"bytes32"},{"internalType":"uint64","name":"expiration","type":"uint64"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permitAndPayWithErc20","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/Utils/ERC20BarterUtils.sol":"ERC20BarterUtils"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/contracts/",":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/Semver.sol":{"keccak256":"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9","license":"MIT","urls":["bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808","dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"lib/eas-contracts/contracts/resolver/SchemaResolver.sol":{"keccak256":"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983","license":"MIT","urls":["bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828","dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"]},"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol":{"keccak256":"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4","license":"MIT","urls":["bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009","dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"]},"lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol":{"keccak256":"0xe9d36d0c892aea68546d53f21e02223f7f542295c10110a0764336f9ffeab6d1","license":"MIT","urls":["bzz-raw://34d4d72a89193f4d5223763e6d871443fb32a22d6024566843f4ee42eed68bdd","dweb:/ipfs/Qmbsc6kJJNhrkNXP7g7KeqzRETQEvzSXg3ZmJmVLhaEahB"]},"lib/openzeppelin-contracts/contracts/utils/Panic.sol":{"keccak256":"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c","license":"MIT","urls":["bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4","dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"]},"lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2","license":"MIT","urls":["bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440","dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"]},"lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c","license":"MIT","urls":["bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966","dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"]},"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol":{"keccak256":"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481","license":"MIT","urls":["bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb","dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"]},"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0","license":"MIT","urls":["bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426","dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"]},"src/ArbiterUtils.sol":{"keccak256":"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c","license":"UNLICENSED","urls":["bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265","dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ"]},"src/BaseStatement.sol":{"keccak256":"0x1c026a554c131a7c9019cfa74a8c1c96f734eca5bb6d24a16afd6dd4f8cec1ba","license":"UNLICENSED","urls":["bzz-raw://bba46f25fe7f38886a2a96b0be650c117983ca927784543bc460b921225bb0dd","dweb:/ipfs/QmVBLDrFn4H8JcF4zptZKTXu1Wp62Xjk2rPd5prksBpqhs"]},"src/IArbiter.sol":{"keccak256":"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647","license":"UNLICENSED","urls":["bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778","dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp"]},"src/Statements/ERC20PaymentObligation.sol":{"keccak256":"0x907da435649e4aa432115118f6e4d25df7ca412ed5269c6919e18d4385e306a0","license":"UNLICENSED","urls":["bzz-raw://6fec46f9f174bc616df4397cf7262645f2e2adeb4d0ac90e509befebd21b4f8f","dweb:/ipfs/QmU1hfGZhSbDPdeLveXV7UHaA7pryGfXoiZuyuNhcX4m6R"]},"src/Utils/ERC20BarterUtils.sol":{"keccak256":"0xaf0db979ffbc982a58b3262e86b97e134538adcb860cc5d1bc1a8cbc6c13132c","license":"UNLICENSED","urls":["bzz-raw://036d721e6d8d687af110ff8436e3a2ea96790effe8423518a222bb3a4af54ea9","dweb:/ipfs/QmdSDAwN4Mo4Zhw9oV7YpH8bQVjN97iQVUiKZB5FRo3iXv"]},"src/Validators/ERC20PaymentFulfillmentArbiter.sol":{"keccak256":"0x05441ddcfab4878224b2358c7c6eb02ffc61a78a248d8c5a5952d4598de84408","license":"UNLICENSED","urls":["bzz-raw://1184d0093df5edad816be8894b4a48780f1e41ec5c2e64737c7a30e43028eb48","dweb:/ipfs/QmaLkv6ye17tN82JXA3UEJcdt9NjLWfpKe3cpjpAhHCvsj"]}},"version":1}',
  metadata: {
    compiler: { version: "0.8.26+commit.8a97fa7a" },
    language: "Solidity",
    output: {
      abi: [
        {
          inputs: [
            { internalType: "address", name: "_eas", type: "address" },
            {
              internalType: "address payable",
              name: "_erc20Payment",
              type: "address",
            },
            {
              internalType: "address",
              name: "_erc20Fulfillment",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        { inputs: [], type: "error", name: "CouldntCollectPayment" },
        {
          inputs: [
            { internalType: "address", name: "bidToken", type: "address" },
            { internalType: "uint256", name: "bidAmount", type: "uint256" },
            { internalType: "address", name: "askToken", type: "address" },
            { internalType: "uint256", name: "askAmount", type: "uint256" },
            { internalType: "uint64", name: "expiration", type: "uint64" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "buyErc20ForErc20",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "buyAttestation",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "payErc20ForErc20",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        },
        {
          inputs: [
            { internalType: "address", name: "bidToken", type: "address" },
            { internalType: "uint256", name: "bidAmount", type: "uint256" },
            { internalType: "address", name: "askToken", type: "address" },
            { internalType: "uint256", name: "askAmount", type: "uint256" },
            { internalType: "uint64", name: "expiration", type: "uint64" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "permitAndBuyErc20ForErc20",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        },
        {
          inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "address", name: "arbiter", type: "address" },
            { internalType: "bytes", name: "demand", type: "bytes" },
            { internalType: "uint64", name: "expiration", type: "uint64" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "permitAndBuyWithErc20",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "buyAttestation",
              type: "bytes32",
            },
            { internalType: "address", name: "askToken", type: "address" },
            { internalType: "uint256", name: "askAmount", type: "uint256" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "permitAndPayErc20ForErc20",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        },
        {
          inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "bytes32", name: "item", type: "bytes32" },
            { internalType: "uint64", name: "expiration", type: "uint64" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "permitAndPayWithErc20",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        },
      ],
      devdoc: { kind: "dev", methods: {}, version: 1 },
      userdoc: { kind: "user", methods: {}, version: 1 },
    },
    settings: {
      remappings: [
        "@eas/=lib/eas-contracts/contracts/",
        "@openzeppelin/=lib/openzeppelin-contracts/contracts/",
        "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/",
      ],
      optimizer: { enabled: true, runs: 200 },
      metadata: { bytecodeHash: "ipfs" },
      compilationTarget: {
        "src/Utils/ERC20BarterUtils.sol": "ERC20BarterUtils",
      },
      evmVersion: "cancun",
      libraries: {},
      viaIR: true,
    },
    sources: {
      "lib/eas-contracts/contracts/Common.sol": {
        keccak256:
          "0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685",
        urls: [
          "bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d",
          "dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/IEAS.sol": {
        keccak256:
          "0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12",
        urls: [
          "bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880",
          "dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISchemaRegistry.sol": {
        keccak256:
          "0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754",
        urls: [
          "bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158",
          "dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISemver.sol": {
        keccak256:
          "0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18",
        urls: [
          "bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0",
          "dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/Semver.sol": {
        keccak256:
          "0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9",
        urls: [
          "bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808",
          "dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
        keccak256:
          "0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
        urls: [
          "bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
          "dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/resolver/SchemaResolver.sol": {
        keccak256:
          "0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983",
        urls: [
          "bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828",
          "dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        keccak256:
          "0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4",
        urls: [
          "bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009",
          "dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol":
        {
          keccak256:
            "0xe9d36d0c892aea68546d53f21e02223f7f542295c10110a0764336f9ffeab6d1",
          urls: [
            "bzz-raw://34d4d72a89193f4d5223763e6d871443fb32a22d6024566843f4ee42eed68bdd",
            "dweb:/ipfs/Qmbsc6kJJNhrkNXP7g7KeqzRETQEvzSXg3ZmJmVLhaEahB",
          ],
          license: "MIT",
        },
      "lib/openzeppelin-contracts/contracts/utils/Panic.sol": {
        keccak256:
          "0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c",
        urls: [
          "bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4",
          "dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/Strings.sol": {
        keccak256:
          "0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2",
        urls: [
          "bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440",
          "dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/Math.sol": {
        keccak256:
          "0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c",
        urls: [
          "bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966",
          "dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol": {
        keccak256:
          "0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481",
        urls: [
          "bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb",
          "dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol": {
        keccak256:
          "0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0",
        urls: [
          "bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426",
          "dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY",
        ],
        license: "MIT",
      },
      "src/ArbiterUtils.sol": {
        keccak256:
          "0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c",
        urls: [
          "bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265",
          "dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ",
        ],
        license: "UNLICENSED",
      },
      "src/BaseStatement.sol": {
        keccak256:
          "0x1c026a554c131a7c9019cfa74a8c1c96f734eca5bb6d24a16afd6dd4f8cec1ba",
        urls: [
          "bzz-raw://bba46f25fe7f38886a2a96b0be650c117983ca927784543bc460b921225bb0dd",
          "dweb:/ipfs/QmVBLDrFn4H8JcF4zptZKTXu1Wp62Xjk2rPd5prksBpqhs",
        ],
        license: "UNLICENSED",
      },
      "src/IArbiter.sol": {
        keccak256:
          "0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647",
        urls: [
          "bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778",
          "dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp",
        ],
        license: "UNLICENSED",
      },
      "src/Statements/ERC20PaymentObligation.sol": {
        keccak256:
          "0x907da435649e4aa432115118f6e4d25df7ca412ed5269c6919e18d4385e306a0",
        urls: [
          "bzz-raw://6fec46f9f174bc616df4397cf7262645f2e2adeb4d0ac90e509befebd21b4f8f",
          "dweb:/ipfs/QmU1hfGZhSbDPdeLveXV7UHaA7pryGfXoiZuyuNhcX4m6R",
        ],
        license: "UNLICENSED",
      },
      "src/Utils/ERC20BarterUtils.sol": {
        keccak256:
          "0xaf0db979ffbc982a58b3262e86b97e134538adcb860cc5d1bc1a8cbc6c13132c",
        urls: [
          "bzz-raw://036d721e6d8d687af110ff8436e3a2ea96790effe8423518a222bb3a4af54ea9",
          "dweb:/ipfs/QmdSDAwN4Mo4Zhw9oV7YpH8bQVjN97iQVUiKZB5FRo3iXv",
        ],
        license: "UNLICENSED",
      },
      "src/Validators/ERC20PaymentFulfillmentArbiter.sol": {
        keccak256:
          "0x05441ddcfab4878224b2358c7c6eb02ffc61a78a248d8c5a5952d4598de84408",
        urls: [
          "bzz-raw://1184d0093df5edad816be8894b4a48780f1e41ec5c2e64737c7a30e43028eb48",
          "dweb:/ipfs/QmaLkv6ye17tN82JXA3UEJcdt9NjLWfpKe3cpjpAhHCvsj",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 53,
} as const;
