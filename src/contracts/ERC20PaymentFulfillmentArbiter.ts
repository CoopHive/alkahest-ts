export const abi = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_baseStatement",
          "type": "address",
          "internalType": "contract ERC20EscrowObligation"
        },
        {
          "name": "_specificAttestation",
          "type": "address",
          "internalType": "contract SpecificAttestationArbiter"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "checkStatement",
      "inputs": [
        {
          "name": "statement",
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
          "name": "counteroffer",
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
      "name": "paymentStatement",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract ERC20EscrowObligation"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "specificAttestation",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract SpecificAttestationArbiter"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "error",
      "name": "InvalidStatement",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidValidation",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60c034609457601f61063838819003918201601f19168301916001600160401b0383118484101760985780849260409485528339810103126094578051906001600160a01b038216820360945760200151906001600160a01b038216820360945760805260a05260405161058b90816100ad823960805181818160520152610206015260a05181818161036d01526104680152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c9081630ac21e3314610456575080631272ff8b1461008557634bbf918d1461003d575f80fd5b34610081575f366003190112610081576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5f80fd5b34610081576060366003190112610081576004356001600160401b038111610081576101406003198236030112610081576040519061014082018281106001600160401b038211176103ea57604052806004013582526020820191602482013583526100f3604483016104b8565b6040820152610104606483016104b8565b9160608201928352610118608482016104b8565b608083015260a481013560a083015261013360c482016104cc565b60c083015261014460e482016104cc565b60e08301526101048101358015158103610081576101008301526101248101356001600160401b0381116100815761012091600461018592369201016104fb565b91019081526024356001600160401b038111610081576101a99036906004016104fb565b91604083805181010312610081576040519260408401908482106001600160401b038311176103ea5760409182526101e360208201610541565b8552015160208085019182529451604051635bf2f20d60e01b81529195826004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561044b575f92610417575b50036103fe57516001600160401b0316801515908161040d575b506103fe57519182518301916020830193602081850312610081576020810151906001600160401b038211610081570192608090849003126100815760405190608082018281106001600160401b038211176103ea576040526102bd60208501610541565b8252604084015191602081019283526102d860608601610541565b946040820195865260808101516001600160401b03811161008157602091010186601f820112156100815780519061030f826104e0565b9761031d604051998a610497565b8289526020838301011161008157815f926020809301838b015e88010152606081019586525190516001600160a01b039182169116036103db57519051116103db57516001600160a01b039081167f0000000000000000000000000000000000000000000000000000000000000000909116036103db5751602081805181010312610081576040519060208201908282106001600160401b038311176103ea576020916040520151809152604435036103db57602060405160018152f35b634af2691560e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b63090bd44d60e31b5f5260045ffd5b9050421184610258565b9091506020813d602011610443575b8161043360209383610497565b810103126100815751908661023e565b3d9150610426565b6040513d5f823e3d90fd5b34610081575f366003190112610081577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b90601f801991011681019081106001600160401b038211176103ea57604052565b35906001600160401b038216820361008157565b35906001600160a01b038216820361008157565b6001600160401b0381116103ea57601f01601f191660200190565b81601f8201121561008157803590610512826104e0565b926105206040519485610497565b8284526020838301011161008157815f926020809301838601378301015290565b51906001600160a01b03821682036100815756fea2646970667358221220dd7a274f85d5b60091d271c510a5504321f32b3324c0561680e398e726d9668164736f6c634300081a0033",
    "sourceMap": "370:1769:90:-:0;;;;;;;;;;;;;-1:-1:-1;;370:1769:90;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;871:33;;914:42;;370:1769;;;;;;;;871:33;370:1769;;;;;;;;;;914:42;370:1769;;;;;;;;;;;;-1:-1:-1;370:1769:90;;;;;;-1:-1:-1;370:1769:90;;;;;-1:-1:-1;370:1769:90",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c9081630ac21e3314610456575080631272ff8b1461008557634bbf918d1461003d575f80fd5b34610081575f366003190112610081576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5f80fd5b34610081576060366003190112610081576004356001600160401b038111610081576101406003198236030112610081576040519061014082018281106001600160401b038211176103ea57604052806004013582526020820191602482013583526100f3604483016104b8565b6040820152610104606483016104b8565b9160608201928352610118608482016104b8565b608083015260a481013560a083015261013360c482016104cc565b60c083015261014460e482016104cc565b60e08301526101048101358015158103610081576101008301526101248101356001600160401b0381116100815761012091600461018592369201016104fb565b91019081526024356001600160401b038111610081576101a99036906004016104fb565b91604083805181010312610081576040519260408401908482106001600160401b038311176103ea5760409182526101e360208201610541565b8552015160208085019182529451604051635bf2f20d60e01b81529195826004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561044b575f92610417575b50036103fe57516001600160401b0316801515908161040d575b506103fe57519182518301916020830193602081850312610081576020810151906001600160401b038211610081570192608090849003126100815760405190608082018281106001600160401b038211176103ea576040526102bd60208501610541565b8252604084015191602081019283526102d860608601610541565b946040820195865260808101516001600160401b03811161008157602091010186601f820112156100815780519061030f826104e0565b9761031d604051998a610497565b8289526020838301011161008157815f926020809301838b015e88010152606081019586525190516001600160a01b039182169116036103db57519051116103db57516001600160a01b039081167f0000000000000000000000000000000000000000000000000000000000000000909116036103db5751602081805181010312610081576040519060208201908282106001600160401b038311176103ea576020916040520151809152604435036103db57602060405160018152f35b634af2691560e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b63090bd44d60e31b5f5260045ffd5b9050421184610258565b9091506020813d602011610443575b8161043360209383610497565b810103126100815751908661023e565b3d9150610426565b6040513d5f823e3d90fd5b34610081575f366003190112610081577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b90601f801991011681019081106001600160401b038211176103ea57604052565b35906001600160401b038216820361008157565b35906001600160a01b038216820361008157565b6001600160401b0381116103ea57601f01601f191660200190565b81601f8201121561008157803590610512826104e0565b926105206040519485610497565b8284526020838301011161008157815f926020809301838601378301015290565b51906001600160a01b03821682036100815756fea2646970667358221220dd7a274f85d5b60091d271c510a5504321f32b3324c0561680e398e726d9668164736f6c634300081a0033",
    "sourceMap": "370:1769:90:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;370:1769:90;;;;;;609:55;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;;;;;;-1:-1:-1;;370:1769:90;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;:::i;:::-;;;;;;1177:32;;370:1769;;;;;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;1177:32;;370:1769;:::i;:::-;;;;;;;;;;;;;;;;-1:-1:-1;;;1244:37:90;;370:1769;;;;;1244:16;-1:-1:-1;;;;;370:1769:90;1244:37;;;;;;;370:1769;1244:37;;;370:1769;1224:57;;1220:100;;370:1769;-1:-1:-1;;;;;370:1769:90;351:29:66;;;;;:87;;370:1769:90;1330:56;;;1480:14;370:1769;;;1456:99;;;370:1769;1456:99;;370:1769;;;;;;;;;1456:99;;370:1769;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;1570:43;1566:87;;370:1769;;;-1:-1:-1;1663:88:90;;370:1769;-1:-1:-1;;;;;370:1769:90;;;1799:19;370:1769;;;1766:53;1762:97;;1952:20;370:1769;;;;1928:107;;370:1769;;;;;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;;;1928:107;370:1769;;;;;;2050:30;2046:62;;370:1769;;;;;;;2046:62;1634:19;;;370:1769;2089:19;370:1769;;2089:19;370:1769;;;;;;;;;;;;1330:56;1302:18;;;370:1769;1368:18;370:1769;;1368:18;351:87:66;423:15;;;-1:-1:-1;351:87:66;;;1244:37:90;;;;370:1769;1244:37;;370:1769;1244:37;;;;;;370:1769;1244:37;;;:::i;:::-;;;370:1769;;;;;1244:37;;;;;;;-1:-1:-1;1244:37:90;;;370:1769;;;;;;;;;;;;;;;-1:-1:-1;;370:1769:90;;;;670:63;-1:-1:-1;;;;;370:1769:90;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;370:1769:90;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;370:1769:90;;;;;;:::o;:::-;;;-1:-1:-1;;;;;370:1769:90;;;;;;:::o;:::-;-1:-1:-1;;;;;370:1769:90;;;;;;-1:-1:-1;;370:1769:90;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;370:1769:90;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;370:1769:90;;;;;;:::o",
    "linkReferences": {},
    "immutableReferences": {
      "57633": [
        {
          "start": 82,
          "length": 32
        },
        {
          "start": 518,
          "length": 32
        }
      ],
      "57636": [
        {
          "start": 877,
          "length": 32
        },
        {
          "start": 1128,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "1272ff8b",
    "paymentStatement()": "4bbf918d",
    "specificAttestation()": "0ac21e33"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract ERC20EscrowObligation\",\"name\":\"_baseStatement\",\"type\":\"address\"},{\"internalType\":\"contract SpecificAttestationArbiter\",\"name\":\"_specificAttestation\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"InvalidStatement\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidValidation\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"statement\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"counteroffer\",\"type\":\"bytes32\"}],\"name\":\"checkStatement\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"paymentStatement\",\"outputs\":[{\"internalType\":\"contract ERC20EscrowObligation\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"specificAttestation\",\"outputs\":[{\"internalType\":\"contract SpecificAttestationArbiter\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/Validators/ERC20PaymentFulfillmentArbiter.sol\":\"ERC20PaymentFulfillmentArbiter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009\",\"dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4\",\"dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440\",\"dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966\",\"dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb\",\"dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426\",\"dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265\",\"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ\"]},\"src/BaseStatement.sol\":{\"keccak256\":\"0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147\",\"dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778\",\"dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp\"]},\"src/Statements/ERC20EscrowObligation.sol\":{\"keccak256\":\"0x1a59fee223b7db5271068496e2d2def0504b3c264ef2d43c63f0e43c08f051d0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://7fc7d3224da7a11f03d0d0dac1512d4fd18c04c5a76953c470c6cc11b0bf4331\",\"dweb:/ipfs/QmQ8aNrwQTzEnjCX8SjVqW9CfU8pwuLvp9UjysgZVwMp8V\"]},\"src/Validators/ERC20PaymentFulfillmentArbiter.sol\":{\"keccak256\":\"0x1762b5c20df2eb07d1d7ccc0a14d8206555de6474a83d2ea2a196dc9f4cbe917\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ee53849b745ddd754fe03e21cd97976a0d9a5a6ad2aaac29192a65c22fca9188\",\"dweb:/ipfs/Qmdrf5HfvjzhMXrrwvtigWaEarsjqeZB7xTLWFjYiz7NHs\"]},\"src/Validators/SpecificAttestationArbiter.sol\":{\"keccak256\":\"0x8f96f2e366ad580a68350d7a897376eaede4a29ffadb3e3c239367c61a1f4c10\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://9bf1c2d0ffa83505aa16572764196f4ace5d469c1ff489e15200e031100e9850\",\"dweb:/ipfs/QmPZaK79rp2P2uRcmF2pYxSnL5swtkvwK7uQJvEpJJCiUB\"]}},\"version\":1}",
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
              "internalType": "contract ERC20EscrowObligation",
              "name": "_baseStatement",
              "type": "address"
            },
            {
              "internalType": "contract SpecificAttestationArbiter",
              "name": "_specificAttestation",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidStatement"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidValidation"
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation",
              "name": "statement",
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
              "name": "counteroffer",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "checkStatement",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "paymentStatement",
          "outputs": [
            {
              "internalType": "contract ERC20EscrowObligation",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "specificAttestation",
          "outputs": [
            {
              "internalType": "contract SpecificAttestationArbiter",
              "name": "",
              "type": "address"
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
        "src/Validators/ERC20PaymentFulfillmentArbiter.sol": "ERC20PaymentFulfillmentArbiter"
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
      "src/Validators/ERC20PaymentFulfillmentArbiter.sol": {
        "keccak256": "0x1762b5c20df2eb07d1d7ccc0a14d8206555de6474a83d2ea2a196dc9f4cbe917",
        "urls": [
          "bzz-raw://ee53849b745ddd754fe03e21cd97976a0d9a5a6ad2aaac29192a65c22fca9188",
          "dweb:/ipfs/Qmdrf5HfvjzhMXrrwvtigWaEarsjqeZB7xTLWFjYiz7NHs"
        ],
        "license": "UNLICENSED"
      },
      "src/Validators/SpecificAttestationArbiter.sol": {
        "keccak256": "0x8f96f2e366ad580a68350d7a897376eaede4a29ffadb3e3c239367c61a1f4c10",
        "urls": [
          "bzz-raw://9bf1c2d0ffa83505aa16572764196f4ace5d469c1ff489e15200e031100e9850",
          "dweb:/ipfs/QmPZaK79rp2P2uRcmF2pYxSnL5swtkvwK7uQJvEpJJCiUB"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 90
} as const;