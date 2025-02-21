export const abi = {
	abi: [
		{
			type: "function",
			name: "balanceOf",
			inputs: [
				{
					name: "account",
					type: "address",
					internalType: "address",
				},
				{
					name: "id",
					type: "uint256",
					internalType: "uint256",
				},
			],
			outputs: [
				{
					name: "",
					type: "uint256",
					internalType: "uint256",
				},
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "balanceOfBatch",
			inputs: [
				{
					name: "accounts",
					type: "address[]",
					internalType: "address[]",
				},
				{
					name: "ids",
					type: "uint256[]",
					internalType: "uint256[]",
				},
			],
			outputs: [
				{
					name: "",
					type: "uint256[]",
					internalType: "uint256[]",
				},
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "isApprovedForAll",
			inputs: [
				{
					name: "account",
					type: "address",
					internalType: "address",
				},
				{
					name: "operator",
					type: "address",
					internalType: "address",
				},
			],
			outputs: [
				{
					name: "",
					type: "bool",
					internalType: "bool",
				},
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "safeBatchTransferFrom",
			inputs: [
				{
					name: "from",
					type: "address",
					internalType: "address",
				},
				{
					name: "to",
					type: "address",
					internalType: "address",
				},
				{
					name: "ids",
					type: "uint256[]",
					internalType: "uint256[]",
				},
				{
					name: "values",
					type: "uint256[]",
					internalType: "uint256[]",
				},
				{
					name: "data",
					type: "bytes",
					internalType: "bytes",
				},
			],
			outputs: [],
			stateMutability: "nonpayable",
		},
		{
			type: "function",
			name: "safeTransferFrom",
			inputs: [
				{
					name: "from",
					type: "address",
					internalType: "address",
				},
				{
					name: "to",
					type: "address",
					internalType: "address",
				},
				{
					name: "id",
					type: "uint256",
					internalType: "uint256",
				},
				{
					name: "value",
					type: "uint256",
					internalType: "uint256",
				},
				{
					name: "data",
					type: "bytes",
					internalType: "bytes",
				},
			],
			outputs: [],
			stateMutability: "nonpayable",
		},
		{
			type: "function",
			name: "setApprovalForAll",
			inputs: [
				{
					name: "operator",
					type: "address",
					internalType: "address",
				},
				{
					name: "approved",
					type: "bool",
					internalType: "bool",
				},
			],
			outputs: [],
			stateMutability: "nonpayable",
		},
		{
			type: "function",
			name: "supportsInterface",
			inputs: [
				{
					name: "interfaceId",
					type: "bytes4",
					internalType: "bytes4",
				},
			],
			outputs: [
				{
					name: "",
					type: "bool",
					internalType: "bool",
				},
			],
			stateMutability: "view",
		},
		{
			type: "event",
			name: "ApprovalForAll",
			inputs: [
				{
					name: "account",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "operator",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "approved",
					type: "bool",
					indexed: false,
					internalType: "bool",
				},
			],
			anonymous: false,
		},
		{
			type: "event",
			name: "TransferBatch",
			inputs: [
				{
					name: "operator",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "from",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "to",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "ids",
					type: "uint256[]",
					indexed: false,
					internalType: "uint256[]",
				},
				{
					name: "values",
					type: "uint256[]",
					indexed: false,
					internalType: "uint256[]",
				},
			],
			anonymous: false,
		},
		{
			type: "event",
			name: "TransferSingle",
			inputs: [
				{
					name: "operator",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "from",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "to",
					type: "address",
					indexed: true,
					internalType: "address",
				},
				{
					name: "id",
					type: "uint256",
					indexed: false,
					internalType: "uint256",
				},
				{
					name: "value",
					type: "uint256",
					indexed: false,
					internalType: "uint256",
				},
			],
			anonymous: false,
		},
		{
			type: "event",
			name: "URI",
			inputs: [
				{
					name: "value",
					type: "string",
					indexed: false,
					internalType: "string",
				},
				{
					name: "id",
					type: "uint256",
					indexed: true,
					internalType: "uint256",
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
		"balanceOf(address,uint256)": "00fdd58e",
		"balanceOfBatch(address[],uint256[])": "4e1273f4",
		"isApprovedForAll(address,address)": "e985e9c5",
		"safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)":
			"2eb2c2d6",
		"safeTransferFrom(address,address,uint256,uint256,bytes)": "f242432a",
		"setApprovalForAll(address,bool)": "a22cb465",
		"supportsInterface(bytes4)": "01ffc9a7",
	},
	rawMetadata:
		'{"compiler":{"version":"0.8.26+commit.8a97fa7a"},"language":"Solidity","output":{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}],"devdoc":{"details":"Required interface of an ERC-1155 compliant contract, as defined in the https://eips.ethereum.org/EIPS/eip-1155[ERC].","events":{"ApprovalForAll(address,address,bool)":{"details":"Emitted when `account` grants or revokes permission to `operator` to transfer their tokens, according to `approved`."},"TransferBatch(address,address,address,uint256[],uint256[])":{"details":"Equivalent to multiple {TransferSingle} events, where `operator`, `from` and `to` are the same for all transfers."},"TransferSingle(address,address,address,uint256,uint256)":{"details":"Emitted when `value` amount of tokens of type `id` are transferred from `from` to `to` by `operator`."},"URI(string,uint256)":{"details":"Emitted when the URI for token type `id` changes to `value`, if it is a non-programmatic URI. If an {URI} event was emitted for `id`, the standard https://eips.ethereum.org/EIPS/eip-1155#metadata-extensions[guarantees] that `value` will equal the value returned by {IERC1155MetadataURI-uri}."}},"kind":"dev","methods":{"balanceOf(address,uint256)":{"details":"Returns the value of tokens of token type `id` owned by `account`."},"balanceOfBatch(address[],uint256[])":{"details":"xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {balanceOf}. Requirements: - `accounts` and `ids` must have the same length."},"isApprovedForAll(address,address)":{"details":"Returns true if `operator` is approved to transfer ``account``\'s tokens. See {setApprovalForAll}."},"safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)":{"details":"xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {safeTransferFrom}. WARNING: This function can potentially allow a reentrancy attack when transferring tokens to an untrusted contract, when invoking {onERC1155BatchReceived} on the receiver. Ensure to follow the checks-effects-interactions pattern and consider employing reentrancy guards when interacting with untrusted contracts. Emits either a {TransferSingle} or a {TransferBatch} event, depending on the length of the array arguments. Requirements: - `ids` and `values` must have the same length. - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the acceptance magic value."},"safeTransferFrom(address,address,uint256,uint256,bytes)":{"details":"Transfers a `value` amount of tokens of type `id` from `from` to `to`. WARNING: This function can potentially allow a reentrancy attack when transferring tokens to an untrusted contract, when invoking {onERC1155Received} on the receiver. Ensure to follow the checks-effects-interactions pattern and consider employing reentrancy guards when interacting with untrusted contracts. Emits a {TransferSingle} event. Requirements: - `to` cannot be the zero address. - If the caller is not `from`, it must have been approved to spend ``from``\'s tokens via {setApprovalForAll}. - `from` must have a balance of tokens of type `id` of at least `value` amount. - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the acceptance magic value."},"setApprovalForAll(address,bool)":{"details":"Grants or revokes permission to `operator` to transfer the caller\'s tokens, according to `approved`, Emits an {ApprovalForAll} event. Requirements: - `operator` cannot be the zero address."},"supportsInterface(bytes4)":{"details":"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas."}},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol":"IERC1155"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/contracts/",":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol":{"keccak256":"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7","license":"MIT","urls":["bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746","dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b"]},"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol":{"keccak256":"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c","license":"MIT","urls":["bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e","dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX"]}},"version":1}',
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
							internalType: "address",
							name: "account",
							type: "address",
							indexed: true,
						},
						{
							internalType: "address",
							name: "operator",
							type: "address",
							indexed: true,
						},
						{
							internalType: "bool",
							name: "approved",
							type: "bool",
							indexed: false,
						},
					],
					type: "event",
					name: "ApprovalForAll",
					anonymous: false,
				},
				{
					inputs: [
						{
							internalType: "address",
							name: "operator",
							type: "address",
							indexed: true,
						},
						{
							internalType: "address",
							name: "from",
							type: "address",
							indexed: true,
						},
						{
							internalType: "address",
							name: "to",
							type: "address",
							indexed: true,
						},
						{
							internalType: "uint256[]",
							name: "ids",
							type: "uint256[]",
							indexed: false,
						},
						{
							internalType: "uint256[]",
							name: "values",
							type: "uint256[]",
							indexed: false,
						},
					],
					type: "event",
					name: "TransferBatch",
					anonymous: false,
				},
				{
					inputs: [
						{
							internalType: "address",
							name: "operator",
							type: "address",
							indexed: true,
						},
						{
							internalType: "address",
							name: "from",
							type: "address",
							indexed: true,
						},
						{
							internalType: "address",
							name: "to",
							type: "address",
							indexed: true,
						},
						{
							internalType: "uint256",
							name: "id",
							type: "uint256",
							indexed: false,
						},
						{
							internalType: "uint256",
							name: "value",
							type: "uint256",
							indexed: false,
						},
					],
					type: "event",
					name: "TransferSingle",
					anonymous: false,
				},
				{
					inputs: [
						{
							internalType: "string",
							name: "value",
							type: "string",
							indexed: false,
						},
						{
							internalType: "uint256",
							name: "id",
							type: "uint256",
							indexed: true,
						},
					],
					type: "event",
					name: "URI",
					anonymous: false,
				},
				{
					inputs: [
						{
							internalType: "address",
							name: "account",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "id",
							type: "uint256",
						},
					],
					stateMutability: "view",
					type: "function",
					name: "balanceOf",
					outputs: [
						{
							internalType: "uint256",
							name: "",
							type: "uint256",
						},
					],
				},
				{
					inputs: [
						{
							internalType: "address[]",
							name: "accounts",
							type: "address[]",
						},
						{
							internalType: "uint256[]",
							name: "ids",
							type: "uint256[]",
						},
					],
					stateMutability: "view",
					type: "function",
					name: "balanceOfBatch",
					outputs: [
						{
							internalType: "uint256[]",
							name: "",
							type: "uint256[]",
						},
					],
				},
				{
					inputs: [
						{
							internalType: "address",
							name: "account",
							type: "address",
						},
						{
							internalType: "address",
							name: "operator",
							type: "address",
						},
					],
					stateMutability: "view",
					type: "function",
					name: "isApprovedForAll",
					outputs: [
						{
							internalType: "bool",
							name: "",
							type: "bool",
						},
					],
				},
				{
					inputs: [
						{
							internalType: "address",
							name: "from",
							type: "address",
						},
						{
							internalType: "address",
							name: "to",
							type: "address",
						},
						{
							internalType: "uint256[]",
							name: "ids",
							type: "uint256[]",
						},
						{
							internalType: "uint256[]",
							name: "values",
							type: "uint256[]",
						},
						{
							internalType: "bytes",
							name: "data",
							type: "bytes",
						},
					],
					stateMutability: "nonpayable",
					type: "function",
					name: "safeBatchTransferFrom",
				},
				{
					inputs: [
						{
							internalType: "address",
							name: "from",
							type: "address",
						},
						{
							internalType: "address",
							name: "to",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "id",
							type: "uint256",
						},
						{
							internalType: "uint256",
							name: "value",
							type: "uint256",
						},
						{
							internalType: "bytes",
							name: "data",
							type: "bytes",
						},
					],
					stateMutability: "nonpayable",
					type: "function",
					name: "safeTransferFrom",
				},
				{
					inputs: [
						{
							internalType: "address",
							name: "operator",
							type: "address",
						},
						{
							internalType: "bool",
							name: "approved",
							type: "bool",
						},
					],
					stateMutability: "nonpayable",
					type: "function",
					name: "setApprovalForAll",
				},
				{
					inputs: [
						{
							internalType: "bytes4",
							name: "interfaceId",
							type: "bytes4",
						},
					],
					stateMutability: "view",
					type: "function",
					name: "supportsInterface",
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
				methods: {
					"balanceOf(address,uint256)": {
						details:
							"Returns the value of tokens of token type `id` owned by `account`.",
					},
					"balanceOfBatch(address[],uint256[])": {
						details:
							"xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {balanceOf}. Requirements: - `accounts` and `ids` must have the same length.",
					},
					"isApprovedForAll(address,address)": {
						details:
							"Returns true if `operator` is approved to transfer ``account``'s tokens. See {setApprovalForAll}.",
					},
					"safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)": {
						details:
							"xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {safeTransferFrom}. WARNING: This function can potentially allow a reentrancy attack when transferring tokens to an untrusted contract, when invoking {onERC1155BatchReceived} on the receiver. Ensure to follow the checks-effects-interactions pattern and consider employing reentrancy guards when interacting with untrusted contracts. Emits either a {TransferSingle} or a {TransferBatch} event, depending on the length of the array arguments. Requirements: - `ids` and `values` must have the same length. - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the acceptance magic value.",
					},
					"safeTransferFrom(address,address,uint256,uint256,bytes)": {
						details:
							"Transfers a `value` amount of tokens of type `id` from `from` to `to`. WARNING: This function can potentially allow a reentrancy attack when transferring tokens to an untrusted contract, when invoking {onERC1155Received} on the receiver. Ensure to follow the checks-effects-interactions pattern and consider employing reentrancy guards when interacting with untrusted contracts. Emits a {TransferSingle} event. Requirements: - `to` cannot be the zero address. - If the caller is not `from`, it must have been approved to spend ``from``'s tokens via {setApprovalForAll}. - `from` must have a balance of tokens of type `id` of at least `value` amount. - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the acceptance magic value.",
					},
					"setApprovalForAll(address,bool)": {
						details:
							"Grants or revokes permission to `operator` to transfer the caller's tokens, according to `approved`, Emits an {ApprovalForAll} event. Requirements: - `operator` cannot be the zero address.",
					},
					"supportsInterface(bytes4)": {
						details:
							"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.",
					},
				},
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
				"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol":
					"IERC1155",
			},
			evmVersion: "cancun",
			libraries: {},
			viaIR: true,
		},
		sources: {
			"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol": {
				keccak256:
					"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7",
				urls: [
					"bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746",
					"dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b",
				],
				license: "MIT",
			},
			"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": {
				keccak256:
					"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c",
				urls: [
					"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e",
					"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX",
				],
				license: "MIT",
			},
		},
		version: 1,
	},
	id: 34,
} as const;
