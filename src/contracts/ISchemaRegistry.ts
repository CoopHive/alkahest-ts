export const abi = {
	abi: [
		{
			type: "function",
			name: "getSchema",
			inputs: [
				{
					name: "uid",
					type: "bytes32",
					internalType: "bytes32",
				},
			],
			outputs: [
				{
					name: "",
					type: "tuple",
					internalType: "struct SchemaRecord",
					components: [
						{
							name: "uid",
							type: "bytes32",
							internalType: "bytes32",
						},
						{
							name: "resolver",
							type: "address",
							internalType: "contract ISchemaResolver",
						},
						{
							name: "revocable",
							type: "bool",
							internalType: "bool",
						},
						{
							name: "schema",
							type: "string",
							internalType: "string",
						},
					],
				},
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "register",
			inputs: [
				{
					name: "schema",
					type: "string",
					internalType: "string",
				},
				{
					name: "resolver",
					type: "address",
					internalType: "contract ISchemaResolver",
				},
				{
					name: "revocable",
					type: "bool",
					internalType: "bool",
				},
			],
			outputs: [
				{
					name: "",
					type: "bytes32",
					internalType: "bytes32",
				},
			],
			stateMutability: "nonpayable",
		},
		{
			type: "function",
			name: "version",
			inputs: [],
			outputs: [
				{
					name: "",
					type: "string",
					internalType: "string",
				},
			],
			stateMutability: "view",
		},
		{
			type: "event",
			name: "Registered",
			inputs: [
				{
					name: "uid",
					type: "bytes32",
					indexed: true,
					internalType: "bytes32",
				},
				{
					name: "registerer",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "schema",
					type: "tuple",
					indexed: false,
					internalType: "struct SchemaRecord",
					components: [
						{
							name: "uid",
							type: "bytes32",
							internalType: "bytes32",
						},
						{
							name: "resolver",
							type: "address",
							internalType: "contract ISchemaResolver",
						},
						{
							name: "revocable",
							type: "bool",
							internalType: "bool",
						},
						{
							name: "schema",
							type: "string",
							internalType: "string",
						},
					],
				},
			],
			anonymous: false,
		},
	],
	bytecode: {
		object: "0x",
		sourceMap: "",
		linkReferences: {},
	},
	deployedBytecode: {
		object: "0x",
		sourceMap: "",
		linkReferences: {},
	},
	methodIdentifiers: {
		"getSchema(bytes32)": "a2ea7c6e",
		"register(string,address,bool)": "60d7a278",
		"version()": "54fd4d50",
	},
	rawMetadata:
		'{"compiler":{"version":"0.8.26+commit.8a97fa7a"},"language":"Solidity","output":{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"uid","type":"bytes32"},{"indexed":true,"internalType":"address","name":"registerer","type":"address"},{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"contract ISchemaResolver","name":"resolver","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"string","name":"schema","type":"string"}],"indexed":false,"internalType":"struct SchemaRecord","name":"schema","type":"tuple"}],"name":"Registered","type":"event"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"getSchema","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"contract ISchemaResolver","name":"resolver","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"string","name":"schema","type":"string"}],"internalType":"struct SchemaRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"schema","type":"string"},{"internalType":"contract ISchemaResolver","name":"resolver","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"}],"name":"register","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}],"devdoc":{"events":{"Registered(bytes32,address,(bytes32,address,bool,string))":{"params":{"registerer":"The address of the account used to register the schema.","schema":"The schema data.","uid":"The schema UID."}}},"kind":"dev","methods":{"getSchema(bytes32)":{"params":{"uid":"The UID of the schema to retrieve."},"returns":{"_0":"The schema data members."}},"register(string,address,bool)":{"params":{"resolver":"An optional schema resolver.","revocable":"Whether the schema allows revocations explicitly.","schema":"The schema data schema."},"returns":{"_0":"The UID of the new schema."}},"version()":{"returns":{"_0":"Semver contract version as a string."}}},"title":"ISchemaRegistry","version":1},"userdoc":{"events":{"Registered(bytes32,address,(bytes32,address,bool,string))":{"notice":"Emitted when a new schema has been registered"}},"kind":"user","methods":{"getSchema(bytes32)":{"notice":"Returns an existing schema by UID"},"register(string,address,bool)":{"notice":"Submits and reserves a new schema"},"version()":{"notice":"Returns the full semver contract version."}},"notice":"The interface of global attestation schemas for the Ethereum Attestation Service protocol.","version":1}},"settings":{"compilationTarget":{"lib/eas-contracts/contracts/ISchemaRegistry.sol":"ISchemaRegistry"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/contracts/",":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]}},"version":1}',
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
							internalType: "bytes32",
							name: "uid",
							type: "bytes32",
							indexed: true,
						},
						{
							internalType: "address",
							name: "registerer",
							type: "address",
							indexed: true,
						},
						{
							internalType: "struct SchemaRecord",
							name: "schema",
							type: "tuple",
							components: [
								{
									internalType: "bytes32",
									name: "uid",
									type: "bytes32",
								},
								{
									internalType: "contract ISchemaResolver",
									name: "resolver",
									type: "address",
								},
								{
									internalType: "bool",
									name: "revocable",
									type: "bool",
								},
								{
									internalType: "string",
									name: "schema",
									type: "string",
								},
							],
							indexed: false,
						},
					],
					type: "event",
					name: "Registered",
					anonymous: false,
				},
				{
					inputs: [
						{
							internalType: "bytes32",
							name: "uid",
							type: "bytes32",
						},
					],
					stateMutability: "view",
					type: "function",
					name: "getSchema",
					outputs: [
						{
							internalType: "struct SchemaRecord",
							name: "",
							type: "tuple",
							components: [
								{
									internalType: "bytes32",
									name: "uid",
									type: "bytes32",
								},
								{
									internalType: "contract ISchemaResolver",
									name: "resolver",
									type: "address",
								},
								{
									internalType: "bool",
									name: "revocable",
									type: "bool",
								},
								{
									internalType: "string",
									name: "schema",
									type: "string",
								},
							],
						},
					],
				},
				{
					inputs: [
						{
							internalType: "string",
							name: "schema",
							type: "string",
						},
						{
							internalType: "contract ISchemaResolver",
							name: "resolver",
							type: "address",
						},
						{
							internalType: "bool",
							name: "revocable",
							type: "bool",
						},
					],
					stateMutability: "nonpayable",
					type: "function",
					name: "register",
					outputs: [
						{
							internalType: "bytes32",
							name: "",
							type: "bytes32",
						},
					],
				},
				{
					inputs: [],
					stateMutability: "view",
					type: "function",
					name: "version",
					outputs: [
						{
							internalType: "string",
							name: "",
							type: "string",
						},
					],
				},
			],
			devdoc: {
				kind: "dev",
				methods: {
					"getSchema(bytes32)": {
						params: {
							uid: "The UID of the schema to retrieve.",
						},
						returns: {
							_0: "The schema data members.",
						},
					},
					"register(string,address,bool)": {
						params: {
							resolver: "An optional schema resolver.",
							revocable: "Whether the schema allows revocations explicitly.",
							schema: "The schema data schema.",
						},
						returns: {
							_0: "The UID of the new schema.",
						},
					},
					"version()": {
						returns: {
							_0: "Semver contract version as a string.",
						},
					},
				},
				version: 1,
			},
			userdoc: {
				kind: "user",
				methods: {
					"getSchema(bytes32)": {
						notice: "Returns an existing schema by UID",
					},
					"register(string,address,bool)": {
						notice: "Submits and reserves a new schema",
					},
					"version()": {
						notice: "Returns the full semver contract version.",
					},
				},
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
				"lib/eas-contracts/contracts/ISchemaRegistry.sol": "ISchemaRegistry",
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
			"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
				keccak256:
					"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
				urls: [
					"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
					"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR",
				],
				license: "MIT",
			},
		},
		version: 1,
	},
	id: 2,
} as const;
