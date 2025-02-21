export const abi = {
	abi: [
		{
			type: "function",
			name: "checkStatement",
			inputs: [
				{
					name: "",
					type: "tuple",
					internalType: "struct Attestation",
					components: [
						{
							name: "uid",
							type: "bytes32",
							internalType: "bytes32",
						},
						{
							name: "schema",
							type: "bytes32",
							internalType: "bytes32",
						},
						{
							name: "time",
							type: "uint64",
							internalType: "uint64",
						},
						{
							name: "expirationTime",
							type: "uint64",
							internalType: "uint64",
						},
						{
							name: "revocationTime",
							type: "uint64",
							internalType: "uint64",
						},
						{
							name: "refUID",
							type: "bytes32",
							internalType: "bytes32",
						},
						{
							name: "recipient",
							type: "address",
							internalType: "address",
						},
						{
							name: "attester",
							type: "address",
							internalType: "address",
						},
						{
							name: "revocable",
							type: "bool",
							internalType: "bool",
						},
						{
							name: "data",
							type: "bytes",
							internalType: "bytes",
						},
					],
				},
				{
					name: "",
					type: "bytes",
					internalType: "bytes",
				},
				{
					name: "",
					type: "bytes32",
					internalType: "bytes32",
				},
			],
			outputs: [
				{
					name: "",
					type: "bool",
					internalType: "bool",
				},
			],
			stateMutability: "pure",
		},
	],
	bytecode: {
		object:
			"0x60808060405234601557610230908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b346101515760603660031901126101515760043567ffffffffffffffff81116101515761014060031982360301126101515760405190610140820182811067ffffffffffffffff82111761015557604052806004013582526024810135602083015261009260448201610169565b60408301526100a360648201610169565b60608301526100b460848201610169565b608083015260a481013560a08301526100cf60c4820161017e565b60c08301526100e060e4820161017e565b60e083015261010481013580151581036101515761010083015261012481013567ffffffffffffffff8111610151576101209160046101229236920101610192565b91015260243567ffffffffffffffff811161015157610145903690600401610192565b50602060405160018152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b359067ffffffffffffffff8216820361015157565b35906001600160a01b038216820361015157565b81601f820112156101515780359067ffffffffffffffff82116101555760405192601f8301601f19908116603f0116840167ffffffffffffffff811185821017610155576040528284526020838301011161015157815f92602080930183860137830101529056fea26469706673582212207643705a52c157ed75e78297f1b75c4b6179c0be72efdb60480854ae32e4c5e864736f6c634300081a0033",
		sourceMap: "202:247:51:-:0;;;;;;;;;;;;;;;;;",
		linkReferences: {},
	},
	deployedBytecode: {
		object:
			"0x60806040526004361015610011575f80fd5b5f3560e01c631272ff8b14610024575f80fd5b346101515760603660031901126101515760043567ffffffffffffffff81116101515761014060031982360301126101515760405190610140820182811067ffffffffffffffff82111761015557604052806004013582526024810135602083015261009260448201610169565b60408301526100a360648201610169565b60608301526100b460848201610169565b608083015260a481013560a08301526100cf60c4820161017e565b60c08301526100e060e4820161017e565b60e083015261010481013580151581036101515761010083015261012481013567ffffffffffffffff8111610151576101209160046101229236920101610192565b91015260243567ffffffffffffffff811161015157610145903690600401610192565b50602060405160018152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b359067ffffffffffffffff8216820361015157565b35906001600160a01b038216820361015157565b81601f820112156101515780359067ffffffffffffffff82116101555760405192601f8301601f19908116603f0116840167ffffffffffffffff811185821017610155576040528284526020838301011161015157815f92602080930183860137830101529056fea26469706673582212207643705a52c157ed75e78297f1b75c4b6179c0be72efdb60480854ae32e4c5e864736f6c634300081a0033",
		sourceMap:
			"202:247:51:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;202:247:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;202:247:51;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;202:247:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;202:247:51;;;;;;;;;;;;;;:::o",
		linkReferences: {},
	},
	methodIdentifiers: {
		"checkStatement((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
			"1272ff8b",
	},
	rawMetadata:
		'{"compiler":{"version":"0.8.26+commit.8a97fa7a"},"language":"Solidity","output":{"abi":[{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"","type":"tuple"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkStatement","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/Validators/TrivialArbiter.sol":"TrivialArbiter"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/contracts/",":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"src/ArbiterUtils.sol":{"keccak256":"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c","license":"UNLICENSED","urls":["bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265","dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ"]},"src/IArbiter.sol":{"keccak256":"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647","license":"UNLICENSED","urls":["bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778","dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp"]},"src/Validators/TrivialArbiter.sol":{"keccak256":"0xa5090babe8a6ef52a3cb4634a9cd61f5a68dde91978372b70b35b08780f1011c","license":"UNLICENSED","urls":["bzz-raw://91d3a86e33801e90fb3bd15b1fff4e89283c3f57130f1ed0c52a80b587b132b6","dweb:/ipfs/QmNzq2YgJYRqnhk761UUCHzv8C2u29mqv9CsAoViqUSyWq"]}},"version":1}',
	metadata: {
		compiler: {
			version: "0.8.26+commit.8a97fa7a",
		},
		language: "Solidity",
		output: {
			abi: [
				{
					inputs: [
						{
							internalType: "struct Attestation",
							name: "",
							type: "tuple",
							components: [
								{
									internalType: "bytes32",
									name: "uid",
									type: "bytes32",
								},
								{
									internalType: "bytes32",
									name: "schema",
									type: "bytes32",
								},
								{
									internalType: "uint64",
									name: "time",
									type: "uint64",
								},
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
								{
									internalType: "bytes32",
									name: "refUID",
									type: "bytes32",
								},
								{
									internalType: "address",
									name: "recipient",
									type: "address",
								},
								{
									internalType: "address",
									name: "attester",
									type: "address",
								},
								{
									internalType: "bool",
									name: "revocable",
									type: "bool",
								},
								{
									internalType: "bytes",
									name: "data",
									type: "bytes",
								},
							],
						},
						{
							internalType: "bytes",
							name: "",
							type: "bytes",
						},
						{
							internalType: "bytes32",
							name: "",
							type: "bytes32",
						},
					],
					stateMutability: "pure",
					type: "function",
					name: "checkStatement",
					outputs: [
						{
							internalType: "bool",
							name: "",
							type: "bool",
						},
					],
				},
			],
			devdoc: {
				kind: "dev",
				methods: {},
				version: 1,
			},
			userdoc: {
				kind: "user",
				methods: {},
				version: 1,
			},
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
			optimizer: {
				enabled: true,
				runs: 200,
			},
			metadata: {
				bytecodeHash: "ipfs",
			},
			compilationTarget: {
				"src/Validators/TrivialArbiter.sol": "TrivialArbiter",
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
			"src/ArbiterUtils.sol": {
				keccak256:
					"0x1ae482f265bdcbd8bb02a1f6ef7ffdbca8957e8d2b34aae31ba67c1f8d53f11c",
				urls: [
					"bzz-raw://c23924e0e10367b023c4a0b6d64bda4303e2b3d96bed226fc7623b9b7255b265",
					"dweb:/ipfs/QmTEJsmSyRACQqWDL1rN9vTgeCXZf6wqBrX8cBeYHh2UtZ",
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
			"src/Validators/TrivialArbiter.sol": {
				keccak256:
					"0xa5090babe8a6ef52a3cb4634a9cd61f5a68dde91978372b70b35b08780f1011c",
				urls: [
					"bzz-raw://91d3a86e33801e90fb3bd15b1fff4e89283c3f57130f1ed0c52a80b587b132b6",
					"dweb:/ipfs/QmNzq2YgJYRqnhk761UUCHzv8C2u29mqv9CsAoViqUSyWq",
				],
				license: "UNLICENSED",
			},
		},
		version: 1,
	},
	id: 51,
} as const;
