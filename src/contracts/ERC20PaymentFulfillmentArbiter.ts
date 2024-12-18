export const abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_baseStatement",
          type: "address",
          internalType: "contract ERC20PaymentObligation",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "checkStatement",
      inputs: [
        {
          name: "statement",
          type: "tuple",
          internalType: "struct Attestation",
          components: [
            { name: "uid", type: "bytes32", internalType: "bytes32" },
            { name: "schema", type: "bytes32", internalType: "bytes32" },
            { name: "time", type: "uint64", internalType: "uint64" },
            { name: "expirationTime", type: "uint64", internalType: "uint64" },
            { name: "revocationTime", type: "uint64", internalType: "uint64" },
            { name: "refUID", type: "bytes32", internalType: "bytes32" },
            { name: "recipient", type: "address", internalType: "address" },
            { name: "attester", type: "address", internalType: "address" },
            { name: "revocable", type: "bool", internalType: "bool" },
            { name: "data", type: "bytes", internalType: "bytes" },
          ],
        },
        { name: "demand", type: "bytes", internalType: "bytes" },
        { name: "counteroffer", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [{ name: "", type: "bool", internalType: "bool" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "paymentStatement",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract ERC20PaymentObligation",
        },
      ],
      stateMutability: "view",
    },
    { type: "error", name: "InvalidStatement", inputs: [] },
    { type: "error", name: "InvalidValidation", inputs: [] },
  ],
  bytecode: {
    object:
      "0x60a034606c57601f61056238819003918201601f19168301916001600160401b03831184841017607057808492602094604052833981010312606c57516001600160a01b0381168103606c576080526040516104dd90816100858239608051818181604701526101fe0152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c9081631272ff8b1461007a5750634bbf918d14610032575f80fd5b34610076575f366003190112610076576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5f80fd5b346100765760603660031901126100765760043567ffffffffffffffff811161007657610140600319823603011261007657610140820182811067ffffffffffffffff82111761037a57604052806004013582526020820191602482013583526100e660448301610408565b60408201526100f760648301610408565b916060820192835261010b60848201610408565b608083015260a082019060a4810135825261012860c4820161041d565b60c084015261013960e4820161041d565b60e084015261010481013580151581036100765761010084015261012481013567ffffffffffffffff81116100765761012091600461017b923692010161044d565b920191825260243567ffffffffffffffff8111610076576101a090369060040161044d565b926040848051810103126100765760405193604085019085821067ffffffffffffffff83111761037a5760409182526101db60208201610493565b8652015160208086019182529551604051635bf2f20d60e01b81529196826004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156103db575f926103a7575b500361038e575167ffffffffffffffff16801515908161039d575b5061038e5760443590510361036b575190815182019160208301906020818503126100765760208101519067ffffffffffffffff82116100765701926080908490031261007657604051906080820182811067ffffffffffffffff82111761037a576040526102c260208501610493565b8252604084015193602083019485526102dd60608201610493565b6040840152608081015167ffffffffffffffff811161007657602091010181601f820112156100765780519061031282610431565b9261032060405194856103e6565b8284526020838301011161007657815f9260208093018386015e8301015260608201525190516001600160a01b0391821691160361036b575190511161036b57602060405160018152f35b634af2691560e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b63090bd44d60e31b5f5260045ffd5b9050421185610251565b9091506020813d6020116103d3575b816103c3602093836103e6565b8101031261007657519087610236565b3d91506103b6565b6040513d5f823e3d90fd5b90601f8019910116810190811067ffffffffffffffff82111761037a57604052565b359067ffffffffffffffff8216820361007657565b35906001600160a01b038216820361007657565b67ffffffffffffffff811161037a57601f01601f191660200190565b81601f820112156100765780359061046482610431565b9261047260405194856103e6565b8284526020838301011161007657815f926020809301838601378301015290565b51906001600160a01b03821682036100765756fea26469706673582212208b779a8082b45741c2db66ac8bd4af7ab86bdfd19a1c37233494f3b65845fedb64736f6c634300081a0033",
    sourceMap:
      "283:1299:57:-:0;;;;;;;;;;;;;-1:-1:-1;;283:1299:57;;;;-1:-1:-1;;;;;283:1299:57;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;283:1299:57;;;;;;646:33;;283:1299;;;;;;;;646:33;283:1299;;;;;;;;;;;;-1:-1:-1;283:1299:57;;;;;;-1:-1:-1;283:1299:57;;;;;-1:-1:-1;283:1299:57",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x6080806040526004361015610012575f80fd5b5f3560e01c9081631272ff8b1461007a5750634bbf918d14610032575f80fd5b34610076575f366003190112610076576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5f80fd5b346100765760603660031901126100765760043567ffffffffffffffff811161007657610140600319823603011261007657610140820182811067ffffffffffffffff82111761037a57604052806004013582526020820191602482013583526100e660448301610408565b60408201526100f760648301610408565b916060820192835261010b60848201610408565b608083015260a082019060a4810135825261012860c4820161041d565b60c084015261013960e4820161041d565b60e084015261010481013580151581036100765761010084015261012481013567ffffffffffffffff81116100765761012091600461017b923692010161044d565b920191825260243567ffffffffffffffff8111610076576101a090369060040161044d565b926040848051810103126100765760405193604085019085821067ffffffffffffffff83111761037a5760409182526101db60208201610493565b8652015160208086019182529551604051635bf2f20d60e01b81529196826004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156103db575f926103a7575b500361038e575167ffffffffffffffff16801515908161039d575b5061038e5760443590510361036b575190815182019160208301906020818503126100765760208101519067ffffffffffffffff82116100765701926080908490031261007657604051906080820182811067ffffffffffffffff82111761037a576040526102c260208501610493565b8252604084015193602083019485526102dd60608201610493565b6040840152608081015167ffffffffffffffff811161007657602091010181601f820112156100765780519061031282610431565b9261032060405194856103e6565b8284526020838301011161007657815f9260208093018386015e8301015260608201525190516001600160a01b0391821691160361036b575190511161036b57602060405160018152f35b634af2691560e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b63090bd44d60e31b5f5260045ffd5b9050421185610251565b9091506020813d6020116103d3575b816103c3602093836103e6565b8101031261007657519087610236565b3d91506103b6565b6040513d5f823e3d90fd5b90601f8019910116810190811067ffffffffffffffff82111761037a57604052565b359067ffffffffffffffff8216820361007657565b35906001600160a01b038216820361007657565b67ffffffffffffffff811161037a57601f01601f191660200190565b81601f820112156100765780359061046482610431565b9261047260405194856103e6565b8284526020838301011161007657815f926020809301838601378301015290565b51906001600160a01b03821682036100765756fea26469706673582212208b779a8082b45741c2db66ac8bd4af7ab86bdfd19a1c37233494f3b65845fedb64736f6c634300081a0033",
    sourceMap:
      "283:1299:57:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;283:1299:57;;;;;;522:56;-1:-1:-1;;;;;283:1299:57;;;;;;;;;;;;;;;;-1:-1:-1;;283:1299:57;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;900:32;;283:1299;;;;;;;;;;;;;;;;;;;;;;;;;;900:32;;283:1299;:::i;:::-;;;;;;;;;;;;;;;;-1:-1:-1;;;967:37:57;;283:1299;;;;;967:16;-1:-1:-1;;;;;283:1299:57;967:37;;;;;;;283:1299;967:37;;;283:1299;947:57;;943:100;;283:1299;;;351:29:47;;;;;:87;;283:1299:57;1053:56;;;283:1299;;;;1124:32;1120:64;;1279:14;283:1299;;;1255:100;;;283:1299;1255:100;;283:1299;;;;;;;;;1255:100;;283:1299;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;283:1299:57;;;;;1370:43;1366:87;;283:1299;;;-1:-1:-1;1463:88:57;;283:1299;;;;;;;1463:88;1165:19;;;283:1299;1532:19;283:1299;;1532:19;283:1299;;;;;;;;;;;;1053:56;1025:18;;;283:1299;1091:18;283:1299;;1091:18;351:87:47;423:15;;;-1:-1:-1;351:87:47;;;967:37:57;;;;283:1299;967:37;;283:1299;967:37;;;;;;283:1299;967:37;;;:::i;:::-;;;283:1299;;;;;967:37;;;;;;;-1:-1:-1;967:37:57;;;283:1299;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;283:1299:57;;;;;;:::o;:::-;;;;;;;;-1:-1:-1;;283:1299:57;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;283:1299:57;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;283:1299:57;;;;;;:::o",
    linkReferences: {},
    immutableReferences: {
      "48319": [
        { start: 71, length: 32 },
        { start: 510, length: 32 },
      ],
    },
  },
  methodIdentifiers: {
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
      "1272ff8b",
    "paymentStatement()": "4bbf918d",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.26+commit.8a97fa7a"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract ERC20PaymentObligation","name":"_baseStatement","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InvalidStatement","type":"error"},{"inputs":[],"name":"InvalidValidation","type":"error"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"statement","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"counteroffer","type":"bytes32"}],"name":"checkStatement","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paymentStatement","outputs":[{"internalType":"contract ERC20PaymentObligation","name":"","type":"address"}],"stateMutability":"view","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/Validators/ERC20PaymentFulfillmentArbiter.sol":"ERC20PaymentFulfillmentArbiter"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/contracts/",":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/Semver.sol":{"keccak256":"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9","license":"MIT","urls":["bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808","dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"lib/eas-contracts/contracts/resolver/SchemaResolver.sol":{"keccak256":"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983","license":"MIT","urls":["bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828","dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"]},"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol":{"keccak256":"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4","license":"MIT","urls":["bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009","dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"]},"lib/openzeppelin-contracts/contracts/utils/Panic.sol":{"keccak256":"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c","license":"MIT","urls":["bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4","dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"]},"lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2","license":"MIT","urls":["bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440","dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"]},"lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c","license":"MIT","urls":["bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966","dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"]},"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol":{"keccak256":"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481","license":"MIT","urls":["bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb","dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"]},"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0","license":"MIT","urls":["bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426","dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"]},"src/ArbiterUtils.sol":{"keccak256":"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c","license":"UNLICENSED","urls":["bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265","dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ"]},"src/BaseStatement.sol":{"keccak256":"0x1c026a554c131a7c9019cfa74a8c1c96f734eca5bb6d24a16afd6dd4f8cec1ba","license":"UNLICENSED","urls":["bzz-raw://bba46f25fe7f38886a2a96b0be650c117983ca927784543bc460b921225bb0dd","dweb:/ipfs/QmVBLDrFn4H8JcF4zptZKTXu1Wp62Xjk2rPd5prksBpqhs"]},"src/IArbiter.sol":{"keccak256":"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647","license":"UNLICENSED","urls":["bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778","dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp"]},"src/Statements/ERC20PaymentObligation.sol":{"keccak256":"0x44d4e2eab76086ea5de94ba9f7427fac9df183843337487986f70c31006e13f4","license":"UNLICENSED","urls":["bzz-raw://8829183cafd35d8def43f1201b7a3af57c459d74ae731e2c81506e9d452c1171","dweb:/ipfs/QmQeCvVzZSQTeeepHn19q2L8iJwKd3Q5qBRprikpHKhPLJ"]},"src/Validators/ERC20PaymentFulfillmentArbiter.sol":{"keccak256":"0x05441ddcfab4878224b2358c7c6eb02ffc61a78a248d8c5a5952d4598de84408","license":"UNLICENSED","urls":["bzz-raw://1184d0093df5edad816be8894b4a48780f1e41ec5c2e64737c7a30e43028eb48","dweb:/ipfs/QmaLkv6ye17tN82JXA3UEJcdt9NjLWfpKe3cpjpAhHCvsj"]}},"version":1}',
  metadata: {
    compiler: { version: "0.8.26+commit.8a97fa7a" },
    language: "Solidity",
    output: {
      abi: [
        {
          inputs: [
            {
              internalType: "contract ERC20PaymentObligation",
              name: "_baseStatement",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        { inputs: [], type: "error", name: "InvalidStatement" },
        { inputs: [], type: "error", name: "InvalidValidation" },
        {
          inputs: [
            {
              internalType: "struct Attestation",
              name: "statement",
              type: "tuple",
              components: [
                { internalType: "bytes32", name: "uid", type: "bytes32" },
                { internalType: "bytes32", name: "schema", type: "bytes32" },
                { internalType: "uint64", name: "time", type: "uint64" },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                { internalType: "bytes32", name: "refUID", type: "bytes32" },
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "address", name: "attester", type: "address" },
                { internalType: "bool", name: "revocable", type: "bool" },
                { internalType: "bytes", name: "data", type: "bytes" },
              ],
            },
            { internalType: "bytes", name: "demand", type: "bytes" },
            { internalType: "bytes32", name: "counteroffer", type: "bytes32" },
          ],
          stateMutability: "view",
          type: "function",
          name: "checkStatement",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "paymentStatement",
          outputs: [
            {
              internalType: "contract ERC20PaymentObligation",
              name: "",
              type: "address",
            },
          ],
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
        "src/Validators/ERC20PaymentFulfillmentArbiter.sol":
          "ERC20PaymentFulfillmentArbiter",
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
          "0x44d4e2eab76086ea5de94ba9f7427fac9df183843337487986f70c31006e13f4",
        urls: [
          "bzz-raw://8829183cafd35d8def43f1201b7a3af57c459d74ae731e2c81506e9d452c1171",
          "dweb:/ipfs/QmQeCvVzZSQTeeepHn19q2L8iJwKd3Q5qBRprikpHKhPLJ",
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
  id: 57,
} as const;
