export const abi = {
	abi: [
		{
			type: "constructor",
			inputs: [
				{
					name: "_eas",
					type: "address",
					internalType: "contract IEAS",
				},
				{
					name: "_schemaRegistry",
					type: "address",
					internalType: "contract ISchemaRegistry",
				},
			],
			stateMutability: "nonpayable",
		},
		{
			type: "receive",
			stateMutability: "payable",
		},
		{
			type: "function",
			name: "ATTESTATION_SCHEMA",
			inputs: [],
			outputs: [
				{
					name: "",
					type: "bytes32",
					internalType: "bytes32",
				},
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "attest",
			inputs: [
				{
					name: "attestation",
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
			],
			outputs: [
				{
					name: "",
					type: "bool",
					internalType: "bool",
				},
			],
			stateMutability: "payable",
		},
		{
			type: "function",
			name: "getSchema",
			inputs: [],
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
			name: "getStatement",
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
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "isPayable",
			inputs: [],
			outputs: [
				{
					name: "",
					type: "bool",
					internalType: "bool",
				},
			],
			stateMutability: "pure",
		},
		{
			type: "function",
			name: "makeStatement",
			inputs: [
				{
					name: "data",
					type: "tuple",
					internalType: "struct JobResultObligation.StatementData",
					components: [
						{
							name: "result",
							type: "string",
							internalType: "string",
						},
					],
				},
				{
					name: "refUID",
					type: "bytes32",
					internalType: "bytes32",
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
			name: "multiAttest",
			inputs: [
				{
					name: "attestations",
					type: "tuple[]",
					internalType: "struct Attestation[]",
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
					name: "values",
					type: "uint256[]",
					internalType: "uint256[]",
				},
			],
			outputs: [
				{
					name: "",
					type: "bool",
					internalType: "bool",
				},
			],
			stateMutability: "payable",
		},
		{
			type: "function",
			name: "multiRevoke",
			inputs: [
				{
					name: "attestations",
					type: "tuple[]",
					internalType: "struct Attestation[]",
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
					name: "values",
					type: "uint256[]",
					internalType: "uint256[]",
				},
			],
			outputs: [
				{
					name: "",
					type: "bool",
					internalType: "bool",
				},
			],
			stateMutability: "payable",
		},
		{
			type: "function",
			name: "revoke",
			inputs: [
				{
					name: "attestation",
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
			],
			outputs: [
				{
					name: "",
					type: "bool",
					internalType: "bool",
				},
			],
			stateMutability: "payable",
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
			type: "error",
			name: "AccessDenied",
			inputs: [],
		},
		{
			type: "error",
			name: "InsufficientValue",
			inputs: [],
		},
		{
			type: "error",
			name: "InvalidEAS",
			inputs: [],
		},
		{
			type: "error",
			name: "InvalidLength",
			inputs: [],
		},
		{
			type: "error",
			name: "NotFromStatement",
			inputs: [],
		},
		{
			type: "error",
			name: "NotPayable",
			inputs: [],
		},
	],
	bytecode: {
		object:
			"0x61016080604052346101a657604081610f2a803803809161002082856101e0565b8339810103126101a65780516001600160a01b038116918282036101a65760200151916001600160a01b0383168084036101a657604080519081016001600160401b038111828210176101cc57604052600d815260208101926c1cdd1c9a5b99c81c995cdd5b1d609a1b84526001608052600360a0525f60c052156101bd576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af19081156101b2575f9161017c575b5061014052604051610d269081610204823960805181610593015260a051816105be015260c051816105e9015260e05181610c980152610100518161017601526101205181818161032401526108270152610140518181816101440152818161035d01528181610551015261077a0152f35b90506020813d6020116101aa575b81610197602093836101e0565b810103126101a657515f61010a565b5f80fd5b3d915061018a565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176101cc5760405256fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f3560e01c908163455577cc146106765750806354fd4d50146105745780635bf2f20d1461053a5780635cc02d2f146102aa5780636b122fe01461010557806388e5b2d9146100e657806391db0b7e146100e6578063ce46e046146100c8578063e49617e1146100a35763e60c3505146100a3575f61000f565b60206100be6100b136610954565b6100b9610c96565b610cd7565b6040519015158152f35b346100e2575f3660031901126100e25760206040515f8152f35b5f80fd5b60206100be6100f436610904565b92610100929192610c96565b610aad565b346100e2575f3660031901126100e257606080604051610124816109a4565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa801561029f575f906101ef575b6060906101eb604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906108b0565b0390f35b503d805f833e6101ff81836109bf565b8101906020818303126100e2578051906001600160401b0382116100e257016080818303126100e25760405190610235826109a4565b8051825260208101516001600160a01b03811681036100e257602083015261025f60408201610a08565b60408301526060810151906001600160401b0382116100e2570182601f820112156100e25760609281602061029693519101610a30565b828201526101a5565b6040513d5f823e3d90fd5b346100e25760203660031901126100e25760606101206040516102cc81610988565b5f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f61010082015201526040516328c44a9960e21b815260043560048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561029f575f91610435575b506020810180517f000000000000000000000000000000000000000000000000000000000000000003610426576101eb61012060405193849360208552815160208601525160408501526001600160401b0360408201511660608501526001600160401b0360608201511660808501526001600160401b0360808201511660a085015260a081015160c085015260018060a01b0360c08201511660e085015260018060a01b0360e0820151166101008501526101008101511515828501520151610140808401526101608301906108b0565b63295d5f3960e01b5f5260045ffd5b90503d805f833e61044681836109bf565b8101906020818303126100e2578051906001600160401b0382116100e2570190610140828203126100e2576040519161047e83610988565b8051835260208101516020840152610498604082016109e0565b60408401526104a9606082016109e0565b60608401526104ba608082016109e0565b608084015260a081015160a08401526104d560c082016109f4565b60c08401526104e660e082016109f4565b60e08401526104f86101008201610a08565b610100840152610120810151906001600160401b0382116100e257019080601f830112156100e257815161052e92602001610a30565b61012082015281610354565b346100e2575f3660031901126100e25760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b346100e2575f3660031901126100e2576101eb602061066260016105b77f0000000000000000000000000000000000000000000000000000000000000000610b29565b81846105e27f0000000000000000000000000000000000000000000000000000000000000000610b29565b818061060d7f0000000000000000000000000000000000000000000000000000000000000000610b29565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f1981018352826109bf565b6040519182916020835260208301906108b0565b346100e25760403660031901126100e2576004356001600160401b0381116100e25780360360206003198201126100e257602083810152600482013590602219018112156100e25701602460048201359101906001600160401b0381116100e25780360382136100e25782816080926107199460206040850152816060850152848401375f838284010152601f801991011681010301601f1981018352826109bf565b6040519060c082018281106001600160401b0382111761089c576040523382525f60208301525f6040830152602435606083015260808201525f60a082015260405160408101908082106001600160401b0383111761089c576020916040527f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0610819608083015160c060e48601526101248501906108b0565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1801561029f575f90610869575b602090604051908152f35b506020813d602011610894575b81610883602093836109bf565b810103126100e2576020905161085e565b3d9150610876565b634e487b7160e01b5f52604160045260245ffd5b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b9181601f840112156100e2578235916001600160401b0383116100e2576020808501948460051b0101116100e257565b60406003198201126100e2576004356001600160401b0381116100e2578161092e916004016108d4565b92909291602435906001600160401b0382116100e257610950916004016108d4565b9091565b60206003198201126100e257600435906001600160401b0382116100e2576101409082900360031901126100e25760040190565b61014081019081106001600160401b0382111761089c57604052565b608081019081106001600160401b0382111761089c57604052565b90601f801991011681019081106001600160401b0382111761089c57604052565b51906001600160401b03821682036100e257565b51906001600160a01b03821682036100e257565b519081151582036100e257565b6001600160401b03811161089c57601f01601f191660200190565b929192610a3c82610a15565b91610a4a60405193846109bf565b8294818452818301116100e2578281602093845f96015e010152565b9190811015610a765760051b0190565b634e487b7160e01b5f52603260045260245ffd5b9190811015610a765760051b8101359061013e19813603018212156100e2570190565b92909192818303610b1a575f91345b848410610ace57505050505050600190565b610ad9848388610a66565b35818111610b0b57610aef6100b9868887610a8a565b15610b005760019103930192610abc565b505050505050505f90565b63044044a560e21b5f5260045ffd5b63251f56a160e21b5f5260045ffd5b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015610c73575b806d04ee2d6d415b85acef8100000000600a921015610c58575b662386f26fc10000811015610c44575b6305f5e100811015610c33575b612710811015610c24575b6064811015610c16575b1015610c0b575b600a60216001840193610bb085610a15565b94610bbe60405196876109bf565b808652610bcd601f1991610a15565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015610c0657600a9091610bd8565b505090565b600190910190610b9e565b606460029104930192610b97565b61271060049104930192610b8d565b6305f5e10060089104930192610b82565b662386f26fc1000060109104930192610b75565b6d04ee2d6d415b85acef810000000060209104930192610b65565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104610b4b565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303610cc857565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b0381168091036100e25730149056fea2646970667358221220cdcc590c64227430fd3765d3139abb0d8d2b9760f9b8da9a289b904e4602ec1464736f6c634300081a0033",
		sourceMap:
			"255:864:77:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;;;-1:-1:-1;;;255:864:77;;496:4;759:14:4;;688:1:6;783:14:4;;-1:-1:-1;807:14:4;;708:26:6;704:76;;255:864:77;790:10:6;;255:864:77;790:10:6;;;712::67;;732:32;;-1:-1:-1;255:864:77;;;;;;;;;;;795:48:67;;255:864:77;795:48:67;;;255:864:77;;;;;;;;;;;;;;;;;;;;;827:4:67;255:864:77;;;;496:4;255:864;;;;;;-1:-1:-1;;255:864:77;;;795:48:67;;;;;;;;;;-1:-1:-1;795:48:67;;;-1:-1:-1;774:69:67;;;255:864:77;;;;;;;;759:14:4;255:864:77;;;;;783:14:4;255:864:77;;;;;807:14:4;255:864:77;;;;;790:10:6;255:864:77;;;;;732:32:67;255:864:77;;;;;712:10:67;255:864:77;;;;;;;;;;774:69:67;255:864:77;;;;;;;;;;;;;;;;;;;;;795:48:67;;;255:864:77;795:48:67;;255:864:77;795:48:67;;;;;;255:864:77;795:48:67;;;:::i;:::-;;;255:864:77;;;;;795:48:67;;;255:864:77;-1:-1:-1;255:864:77;;795:48:67;;;-1:-1:-1;795:48:67;;;255:864:77;;;-1:-1:-1;255:864:77;;;;;704:76:6;757:12;;;-1:-1:-1;757:12:6;;-1:-1:-1;757:12:6;255:864:77;;;;-1:-1:-1;255:864:77;;;;;-1:-1:-1;255:864:77;;;;;;-1:-1:-1;;255:864:77;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;:::o",
		linkReferences: {},
	},
	deployedBytecode: {
		object:
			"0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f3560e01c908163455577cc146106765750806354fd4d50146105745780635bf2f20d1461053a5780635cc02d2f146102aa5780636b122fe01461010557806388e5b2d9146100e657806391db0b7e146100e6578063ce46e046146100c8578063e49617e1146100a35763e60c3505146100a3575f61000f565b60206100be6100b136610954565b6100b9610c96565b610cd7565b6040519015158152f35b346100e2575f3660031901126100e25760206040515f8152f35b5f80fd5b60206100be6100f436610904565b92610100929192610c96565b610aad565b346100e2575f3660031901126100e257606080604051610124816109a4565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa801561029f575f906101ef575b6060906101eb604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906108b0565b0390f35b503d805f833e6101ff81836109bf565b8101906020818303126100e2578051906001600160401b0382116100e257016080818303126100e25760405190610235826109a4565b8051825260208101516001600160a01b03811681036100e257602083015261025f60408201610a08565b60408301526060810151906001600160401b0382116100e2570182601f820112156100e25760609281602061029693519101610a30565b828201526101a5565b6040513d5f823e3d90fd5b346100e25760203660031901126100e25760606101206040516102cc81610988565b5f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f61010082015201526040516328c44a9960e21b815260043560048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561029f575f91610435575b506020810180517f000000000000000000000000000000000000000000000000000000000000000003610426576101eb61012060405193849360208552815160208601525160408501526001600160401b0360408201511660608501526001600160401b0360608201511660808501526001600160401b0360808201511660a085015260a081015160c085015260018060a01b0360c08201511660e085015260018060a01b0360e0820151166101008501526101008101511515828501520151610140808401526101608301906108b0565b63295d5f3960e01b5f5260045ffd5b90503d805f833e61044681836109bf565b8101906020818303126100e2578051906001600160401b0382116100e2570190610140828203126100e2576040519161047e83610988565b8051835260208101516020840152610498604082016109e0565b60408401526104a9606082016109e0565b60608401526104ba608082016109e0565b608084015260a081015160a08401526104d560c082016109f4565b60c08401526104e660e082016109f4565b60e08401526104f86101008201610a08565b610100840152610120810151906001600160401b0382116100e257019080601f830112156100e257815161052e92602001610a30565b61012082015281610354565b346100e2575f3660031901126100e25760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b346100e2575f3660031901126100e2576101eb602061066260016105b77f0000000000000000000000000000000000000000000000000000000000000000610b29565b81846105e27f0000000000000000000000000000000000000000000000000000000000000000610b29565b818061060d7f0000000000000000000000000000000000000000000000000000000000000000610b29565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f1981018352826109bf565b6040519182916020835260208301906108b0565b346100e25760403660031901126100e2576004356001600160401b0381116100e25780360360206003198201126100e257602083810152600482013590602219018112156100e25701602460048201359101906001600160401b0381116100e25780360382136100e25782816080926107199460206040850152816060850152848401375f838284010152601f801991011681010301601f1981018352826109bf565b6040519060c082018281106001600160401b0382111761089c576040523382525f60208301525f6040830152602435606083015260808201525f60a082015260405160408101908082106001600160401b0383111761089c576020916040527f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0610819608083015160c060e48601526101248501906108b0565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1801561029f575f90610869575b602090604051908152f35b506020813d602011610894575b81610883602093836109bf565b810103126100e2576020905161085e565b3d9150610876565b634e487b7160e01b5f52604160045260245ffd5b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b9181601f840112156100e2578235916001600160401b0383116100e2576020808501948460051b0101116100e257565b60406003198201126100e2576004356001600160401b0381116100e2578161092e916004016108d4565b92909291602435906001600160401b0382116100e257610950916004016108d4565b9091565b60206003198201126100e257600435906001600160401b0382116100e2576101409082900360031901126100e25760040190565b61014081019081106001600160401b0382111761089c57604052565b608081019081106001600160401b0382111761089c57604052565b90601f801991011681019081106001600160401b0382111761089c57604052565b51906001600160401b03821682036100e257565b51906001600160a01b03821682036100e257565b519081151582036100e257565b6001600160401b03811161089c57601f01601f191660200190565b929192610a3c82610a15565b91610a4a60405193846109bf565b8294818452818301116100e2578281602093845f96015e010152565b9190811015610a765760051b0190565b634e487b7160e01b5f52603260045260245ffd5b9190811015610a765760051b8101359061013e19813603018212156100e2570190565b92909192818303610b1a575f91345b848410610ace57505050505050600190565b610ad9848388610a66565b35818111610b0b57610aef6100b9868887610a8a565b15610b005760019103930192610abc565b505050505050505f90565b63044044a560e21b5f5260045ffd5b63251f56a160e21b5f5260045ffd5b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015610c73575b806d04ee2d6d415b85acef8100000000600a921015610c58575b662386f26fc10000811015610c44575b6305f5e100811015610c33575b612710811015610c24575b6064811015610c16575b1015610c0b575b600a60216001840193610bb085610a15565b94610bbe60405196876109bf565b808652610bcd601f1991610a15565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015610c0657600a9091610bd8565b505090565b600190910190610b9e565b606460029104930192610b97565b61271060049104930192610b8d565b6305f5e10060089104930192610b82565b662386f26fc1000060109104930192610b75565b6d04ee2d6d415b85acef810000000060209104930192610b65565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104610b4b565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303610cc857565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b0381168091036100e25730149056fea2646970667358221220cdcc590c64227430fd3765d3139abb0d8d2b9760f9b8da9a289b904e4602ec1464736f6c634300081a0033",
		sourceMap:
			"255:864:77:-:0;;;;;;;;;;-1:-1:-1;255:864:77;;;;;;;;;1183:12:6;;;1054:5;1183:12;255:864:77;1054:5:6;1183:12;255:864:77;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3045:39:6;255:864:77;;;:::i;:::-;881:58:6;;:::i;:::-;3045:39;:::i;:::-;255:864:77;;;;;;;;;;;;;;-1:-1:-1;;255:864:77;;;;;;;;;;;;;;;;;1442:1461:6;255:864:77;;;:::i;:::-;881:58:6;;;;;;:::i;:::-;1442:1461;:::i;255:864:77:-;;;;;;-1:-1:-1;;255:864:77;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1710:44:67;;1735:18;255:864:77;1710:44:67;;255:864:77;;;1710:44:67;255:864:77;;;;;;1710:14:67;255:864:77;1710:44:67;;;;;;255:864:77;1710:44:67;;;255:864:77;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;1710:44:67;;;;255:864:77;1710:44:67;;;;;;:::i;:::-;;;255:864:77;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1710:44:67;;;255:864:77;;;;;;;;;;;;;;;-1:-1:-1;;255:864:77;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1483:23:67;;255:864:77;;;1483:23:67;;255:864:77;;;1483:23:67;255:864:77;;;;;;1483:3:67;255:864:77;1483:23:67;;;;;;;255:864:77;1483:23:67;;;255:864:77;1520:18:67;255:864:77;1520:18:67;;255:864:77;;1542:18:67;1520:40;1516:71;;255:864:77;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1516:71:67:-;1569:18;;;255:864:77;1569:18:67;255:864:77;;1569:18:67;1483:23;;;;;255:864:77;1483:23:67;;;;;;:::i;:::-;;;255:864:77;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1483:23:67;;;255:864:77;;;;;;-1:-1:-1;;255:864:77;;;;;;;468:43:67;255:864:77;;;;;;;;;-1:-1:-1;;255:864:77;;;;;1055:104:4;;255:864:77;1072:24:4;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;255:864:77;;;;;;;;;;;;1055:104:4;;;255:864:77;;;;-1:-1:-1;;;255:864:77;;;;;;;;;;;;;;;;;-1:-1:-1;;;255:864:77;;;;;;;;;;;;;;;;;;;;;1055:104:4;;255:864:77;;1055:104:4;;;;;;:::i;:::-;255:864:77;;;;;1055:104:4;255:864:77;;1055:104:4;255:864:77;;;;:::i;:::-;;;;;;-1:-1:-1;;255:864:77;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;;1004:16;;;255:864;;;;;;-1:-1:-1;;255:864:77;;;;;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;1004:16;255:864;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1004:16;;255:864;;1004:16;;;;;;:::i;:::-;255:864;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;837:10;255:864;;;;777:300;;255:864;;;777:300;;255:864;;;;777:300;;255:864;;777:300;;255:864;;777:300;;;255:864;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;731:18;255:864;;682:414;;;255:864;;;;;;;;;;;;654:456;;;255:864;654:456;;255:864;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;;;;;;;;;;;;;777:300;255:864;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;654:456;255:864;;654:3;-1:-1:-1;;;;;255:864:77;654:456;;;;;;255:864;654:456;;;255:864;;;;;;;;;654:456;;255:864;654:456;;255:864;654:456;;;;;;255:864;654:456;;;:::i;:::-;;;255:864;;;;;;;654:456;;;;;-1:-1:-1;654:456:77;;255:864;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;255:864:77;;;;;;;;-1:-1:-1;;255:864:77;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;255:864:77;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;:::i;:::-;;;:::o;:::-;;-1:-1:-1;;255:864:77;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;;;-1:-1:-1;;255:864:77;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;255:864:77;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;255:864:77;;;;;;:::o;:::-;;;-1:-1:-1;;;;;255:864:77;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;-1:-1:-1;;;;;255:864:77;;;;;;-1:-1:-1;;255:864:77;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;255:864:77;;;;;;:::o;:::-;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;3133:1460:6:-;;;;;3340:23;;;3336:76;;3881:1;;3844:9;3884:10;;;;;;4575:11;;;;;;1489:1:0;3133:1460:6;:::o;3896:19::-;4037:9;;;;;:::i;:::-;255:864:77;4064:22:6;;;4060:87;;4274:33;4284:15;;;;;:::i;4274:33::-;;4270:84;;1489:1:0;255:864:77;;3896:19:6;255:864:77;3869:13:6;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;3336:76;3386:15;;;;;;;;637:632:56;759:17;-1:-1:-1;25444:17:62;-1:-1:-1;;;25444:17:62;;;25440:103;;637:632:56;25560:17:62;25569:8;26140:7;25560:17;;;25556:103;;637:632:56;25685:8:62;25676:17;;;25672:103;;637:632:56;25801:7:62;25792:16;;;25788:100;;637:632:56;25914:7:62;25905:16;;;25901:100;;637:632:56;26027:7:62;26018:16;;;26014:100;;637:632:56;26131:16:62;;26127:66;;637:632:56;26140:7:62;874:92:56;779:1;255:864:77;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;:::i;:::-;;;;;;;874:92:56;;;979:247;-1:-1:-1;;255:864:77;;-1:-1:-1;;;1033:111:56;;;;255:864:77;1033:111:56;255:864:77;1194:10:56;;1190:21;;26140:7:62;979:247:56;;;;1190:21;1206:5;;637:632;:::o;26127:66:62:-;26177:1;255:864:77;;;;26127:66:62;;26014:100;26027:7;26098:1;255:864:77;;;;26014:100:62;;;25901;25914:7;25985:1;255:864:77;;;;25901:100:62;;;25788;25801:7;25872:1;255:864:77;;;;25788:100:62;;;25672:103;25685:8;25758:2;255:864:77;;;;25672:103:62;;;25556;25569:8;25642:2;255:864:77;;;;25556:103:62;;;25440;-1:-1:-1;25526:2:62;;-1:-1:-1;;;;255:864:77;;25440:103:62;;6040:128:6;6109:4;-1:-1:-1;;;;;255:864:77;6087:10:6;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1102:240:67;1298:20;;255:864:77;;;;;;;;;;;;;1330:4:67;1298:37;1102:240;:::o",
		linkReferences: {},
		immutableReferences: {
			"446": [
				{
					start: 1427,
					length: 32,
				},
			],
			"448": [
				{
					start: 1470,
					length: 32,
				},
			],
			"450": [
				{
					start: 1513,
					length: 32,
				},
			],
			"588": [
				{
					start: 3224,
					length: 32,
				},
			],
			"50320": [
				{
					start: 374,
					length: 32,
				},
			],
			"50323": [
				{
					start: 804,
					length: 32,
				},
				{
					start: 2087,
					length: 32,
				},
			],
			"50325": [
				{
					start: 324,
					length: 32,
				},
				{
					start: 861,
					length: 32,
				},
				{
					start: 1361,
					length: 32,
				},
				{
					start: 1914,
					length: 32,
				},
			],
		},
	},
	methodIdentifiers: {
		"ATTESTATION_SCHEMA()": "5bf2f20d",
		"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":
			"e60c3505",
		"getSchema()": "6b122fe0",
		"getStatement(bytes32)": "5cc02d2f",
		"isPayable()": "ce46e046",
		"makeStatement((string),bytes32)": "455577cc",
		"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":
			"91db0b7e",
		"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":
			"88e5b2d9",
		"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":
			"e49617e1",
		"version()": "54fd4d50",
	},
	rawMetadata:
		'{"compiler":{"version":"0.8.26+commit.8a97fa7a"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract IEAS","name":"_eas","type":"address"},{"internalType":"contract ISchemaRegistry","name":"_schemaRegistry","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[],"name":"InsufficientValue","type":"error"},{"inputs":[],"name":"InvalidEAS","type":"error"},{"inputs":[],"name":"InvalidLength","type":"error"},{"inputs":[],"name":"NotFromStatement","type":"error"},{"inputs":[],"name":"NotPayable","type":"error"},{"inputs":[],"name":"ATTESTATION_SCHEMA","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"attest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getSchema","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"contract ISchemaResolver","name":"resolver","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"string","name":"schema","type":"string"}],"internalType":"struct SchemaRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"getStatement","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"result","type":"string"}],"internalType":"struct JobResultObligation.StatementData","name":"data","type":"tuple"},{"internalType":"bytes32","name":"refUID","type":"bytes32"}],"name":"makeStatement","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiAttest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiRevoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"revoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}],"devdoc":{"kind":"dev","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The new attestation."},"returns":{"_0":"Whether the attestation is valid."}},"isPayable()":{"returns":{"_0":"Whether the resolver supports ETH transfers."}},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The new attestations.","values":"Explicit ETH amounts which were sent with each attestation."},"returns":{"_0":"Whether all the attestations are valid."}},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The existing attestations to be revoked.","values":"Explicit ETH amounts which were sent with each revocation."},"returns":{"_0":"Whether the attestations can be revoked."}},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The existing attestation to be revoked."},"returns":{"_0":"Whether the attestation can be revoked."}},"version()":{"returns":{"_0":"Semver contract version as a string."}}},"version":1},"userdoc":{"kind":"user","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation and verifies whether it\'s valid."},"isPayable()":{"notice":"Checks if the resolver can be sent ETH."},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes multiple attestations and verifies whether they are valid."},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes revocation of multiple attestation and verifies they can be revoked."},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation revocation and verifies if it can be revoked."},"version()":{"notice":"Returns the full semver contract version."}},"version":1}},"settings":{"compilationTarget":{"src/Statements/JobResultObligation.sol":"JobResultObligation"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/contracts/",":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/Semver.sol":{"keccak256":"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9","license":"MIT","urls":["bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808","dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"lib/eas-contracts/contracts/resolver/SchemaResolver.sol":{"keccak256":"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983","license":"MIT","urls":["bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828","dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"]},"lib/openzeppelin-contracts/contracts/utils/Panic.sol":{"keccak256":"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c","license":"MIT","urls":["bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4","dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"]},"lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2","license":"MIT","urls":["bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440","dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"]},"lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c","license":"MIT","urls":["bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966","dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"]},"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol":{"keccak256":"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481","license":"MIT","urls":["bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb","dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"]},"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0","license":"MIT","urls":["bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426","dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"]},"src/BaseStatement.sol":{"keccak256":"0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57","license":"UNLICENSED","urls":["bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147","dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q"]},"src/IArbiter.sol":{"keccak256":"0x1081592b193da4a0afa7524b03e5714f12770c6979bc65362714a7238705c647","license":"UNLICENSED","urls":["bzz-raw://3d676d3f5dcbb43ad28c18776d07d7b6567094a4effb2de8fe8455a6a45a9778","dweb:/ipfs/QmYvL7JcFowSjcceZV4VRUDFV9RD5tg7vD4zeXTYACUmBp"]},"src/Statements/JobResultObligation.sol":{"keccak256":"0x9fa25ab5df46e6dfe00451b33222b01e30a5ef399e7f4137738720e9172b02ee","license":"UNLICENSED","urls":["bzz-raw://4743b578b759340d468484ef4ef27ea420242a527a1a636e20e7461657642c35","dweb:/ipfs/QmYPbm7FbC7dwAr5mfTAXkCjmRouPzM61fdPAzqGsUu6YY"]}},"version":1}',
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
							internalType: "contract IEAS",
							name: "_eas",
							type: "address",
						},
						{
							internalType: "contract ISchemaRegistry",
							name: "_schemaRegistry",
							type: "address",
						},
					],
					stateMutability: "nonpayable",
					type: "constructor",
				},
				{
					inputs: [],
					type: "error",
					name: "AccessDenied",
				},
				{
					inputs: [],
					type: "error",
					name: "InsufficientValue",
				},
				{
					inputs: [],
					type: "error",
					name: "InvalidEAS",
				},
				{
					inputs: [],
					type: "error",
					name: "InvalidLength",
				},
				{
					inputs: [],
					type: "error",
					name: "NotFromStatement",
				},
				{
					inputs: [],
					type: "error",
					name: "NotPayable",
				},
				{
					inputs: [],
					stateMutability: "view",
					type: "function",
					name: "ATTESTATION_SCHEMA",
					outputs: [
						{
							internalType: "bytes32",
							name: "",
							type: "bytes32",
						},
					],
				},
				{
					inputs: [
						{
							internalType: "struct Attestation",
							name: "attestation",
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
					],
					stateMutability: "payable",
					type: "function",
					name: "attest",
					outputs: [
						{
							internalType: "bool",
							name: "",
							type: "bool",
						},
					],
				},
				{
					inputs: [],
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
							internalType: "bytes32",
							name: "uid",
							type: "bytes32",
						},
					],
					stateMutability: "view",
					type: "function",
					name: "getStatement",
					outputs: [
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
					],
				},
				{
					inputs: [],
					stateMutability: "pure",
					type: "function",
					name: "isPayable",
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
							internalType: "struct JobResultObligation.StatementData",
							name: "data",
							type: "tuple",
							components: [
								{
									internalType: "string",
									name: "result",
									type: "string",
								},
							],
						},
						{
							internalType: "bytes32",
							name: "refUID",
							type: "bytes32",
						},
					],
					stateMutability: "nonpayable",
					type: "function",
					name: "makeStatement",
					outputs: [
						{
							internalType: "bytes32",
							name: "",
							type: "bytes32",
						},
					],
				},
				{
					inputs: [
						{
							internalType: "struct Attestation[]",
							name: "attestations",
							type: "tuple[]",
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
							internalType: "uint256[]",
							name: "values",
							type: "uint256[]",
						},
					],
					stateMutability: "payable",
					type: "function",
					name: "multiAttest",
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
							internalType: "struct Attestation[]",
							name: "attestations",
							type: "tuple[]",
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
							internalType: "uint256[]",
							name: "values",
							type: "uint256[]",
						},
					],
					stateMutability: "payable",
					type: "function",
					name: "multiRevoke",
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
							internalType: "struct Attestation",
							name: "attestation",
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
					],
					stateMutability: "payable",
					type: "function",
					name: "revoke",
					outputs: [
						{
							internalType: "bool",
							name: "",
							type: "bool",
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
				{
					inputs: [],
					stateMutability: "payable",
					type: "receive",
				},
			],
			devdoc: {
				kind: "dev",
				methods: {
					"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":
						{
							params: {
								attestation: "The new attestation.",
							},
							returns: {
								_0: "Whether the attestation is valid.",
							},
						},
					"isPayable()": {
						returns: {
							_0: "Whether the resolver supports ETH transfers.",
						},
					},
					"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":
						{
							params: {
								attestations: "The new attestations.",
								values:
									"Explicit ETH amounts which were sent with each attestation.",
							},
							returns: {
								_0: "Whether all the attestations are valid.",
							},
						},
					"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":
						{
							params: {
								attestations: "The existing attestations to be revoked.",
								values:
									"Explicit ETH amounts which were sent with each revocation.",
							},
							returns: {
								_0: "Whether the attestations can be revoked.",
							},
						},
					"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":
						{
							params: {
								attestation: "The existing attestation to be revoked.",
							},
							returns: {
								_0: "Whether the attestation can be revoked.",
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
					"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":
						{
							notice:
								"Processes an attestation and verifies whether it's valid.",
						},
					"isPayable()": {
						notice: "Checks if the resolver can be sent ETH.",
					},
					"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":
						{
							notice:
								"Processes multiple attestations and verifies whether they are valid.",
						},
					"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":
						{
							notice:
								"Processes revocation of multiple attestation and verifies they can be revoked.",
						},
					"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":
						{
							notice:
								"Processes an attestation revocation and verifies if it can be revoked.",
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
				"src/Statements/JobResultObligation.sol": "JobResultObligation",
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
			"src/BaseStatement.sol": {
				keccak256:
					"0x8d64fa267e4ef6bcef60b0e17c91047c9cce3ccbf21d18b7ff8a515928ce5f57",
				urls: [
					"bzz-raw://c5e0154a9580018f78392a77155b90a9554738f9807854c85d8f84e370ef8147",
					"dweb:/ipfs/QmQiekLr7CwwCK4iGDKJyJTzFqbdrJmKD1i64p9uGR9w2Q",
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
			"src/Statements/JobResultObligation.sol": {
				keccak256:
					"0x9fa25ab5df46e6dfe00451b33222b01e30a5ef399e7f4137738720e9172b02ee",
				urls: [
					"bzz-raw://4743b578b759340d468484ef4ef27ea420242a527a1a636e20e7461657642c35",
					"dweb:/ipfs/QmYPbm7FbC7dwAr5mfTAXkCjmRouPzM61fdPAzqGsUu6YY",
				],
				license: "UNLICENSED",
			},
		},
		version: 1,
	},
	id: 77,
} as const;
