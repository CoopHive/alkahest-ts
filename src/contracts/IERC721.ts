export const abi = {
  "abi": [
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        {
          "name": "_approved",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {
          "name": "_owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getApproved",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isApprovedForAll",
      "inputs": [
        {
          "name": "_owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_operator",
          "type": "address",
          "internalType": "address"
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
      "name": "ownerOf",
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "inputs": [
        {
          "name": "_from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "inputs": [
        {
          "name": "_from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "setApprovalForAll",
      "inputs": [
        {
          "name": "_operator",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_approved",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "name": "interfaceID",
          "type": "bytes4",
          "internalType": "bytes4"
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
      "name": "transferFrom",
      "inputs": [
        {
          "name": "_from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {
          "name": "_owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "_approved",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ApprovalForAll",
      "inputs": [
        {
          "name": "_owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "_operator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "_approved",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {
          "name": "_from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "_to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    }
  ],
  "bytecode": {
    "object": "0x",
    "sourceMap": "",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x",
    "sourceMap": "",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "approve(address,uint256)": "095ea7b3",
    "balanceOf(address)": "70a08231",
    "getApproved(uint256)": "081812fc",
    "isApprovedForAll(address,address)": "e985e9c5",
    "ownerOf(uint256)": "6352211e",
    "safeTransferFrom(address,address,uint256)": "42842e0e",
    "safeTransferFrom(address,address,uint256,bytes)": "b88d4fde",
    "setApprovalForAll(address,bool)": "a22cb465",
    "supportsInterface(bytes4)": "01ffc9a7",
    "transferFrom(address,address,uint256)": "23b872dd"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.26+commit.8a97fa7a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_approved\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"_approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_approved\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"_approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceID\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"See https://eips.ethereum.org/EIPS/eip-721 Note: the ERC-165 identifier for this interface is 0x80ac58cd.\",\"events\":{\"Approval(address,address,uint256)\":{\"details\":\"This emits when the approved address for an NFT is changed or reaffirmed. The zero address indicates there is no approved address. When a Transfer event emits, this also indicates that the approved address for that NFT (if any) is reset to none.\"},\"ApprovalForAll(address,address,bool)\":{\"details\":\"This emits when an operator is enabled or disabled for an owner. The operator can manage all NFTs of the owner.\"},\"Transfer(address,address,uint256)\":{\"details\":\"This emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any number of NFTs may be created and assigned without emitting Transfer. At the time of any transfer, the approved address for that NFT (if any) is reset to none.\"}},\"kind\":\"dev\",\"methods\":{\"approve(address,uint256)\":{\"details\":\"The zero address indicates there is no approved address. Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.\",\"params\":{\"_approved\":\"The new approved NFT controller\",\"_tokenId\":\"The NFT to approve\"}},\"balanceOf(address)\":{\"details\":\"NFTs assigned to the zero address are considered invalid, and this function throws for queries about the zero address.\",\"params\":{\"_owner\":\"An address for whom to query the balance\"},\"returns\":{\"_0\":\"The number of NFTs owned by `_owner`, possibly zero\"}},\"getApproved(uint256)\":{\"details\":\"Throws if `_tokenId` is not a valid NFT.\",\"params\":{\"_tokenId\":\"The NFT to find the approved address for\"},\"returns\":{\"_0\":\"The approved address for this NFT, or the zero address if there is none\"}},\"isApprovedForAll(address,address)\":{\"params\":{\"_operator\":\"The address that acts on behalf of the owner\",\"_owner\":\"The address that owns the NFTs\"},\"returns\":{\"_0\":\"True if `_operator` is an approved operator for `_owner`, false otherwise\"}},\"ownerOf(uint256)\":{\"details\":\"NFTs assigned to zero address are considered invalid, and queries about them do throw.\",\"params\":{\"_tokenId\":\"The identifier for an NFT\"},\"returns\":{\"_0\":\"The address of the owner of the NFT\"}},\"safeTransferFrom(address,address,uint256)\":{\"details\":\"This works identically to the other function with an extra data parameter, except this function just sets data to \\\"\\\".\",\"params\":{\"_from\":\"The current owner of the NFT\",\"_to\":\"The new owner\",\"_tokenId\":\"The NFT to transfer\"}},\"safeTransferFrom(address,address,uint256,bytes)\":{\"details\":\"Throws unless `msg.sender` is the current owner, an authorized operator, or the approved address for this NFT. Throws if `_from` is not the current owner. Throws if `_to` is the zero address. Throws if `_tokenId` is not a valid NFT. When transfer is complete, this function checks if `_to` is a smart contract (code size > 0). If so, it calls `onERC721Received` on `_to` and throws if the return value is not `bytes4(keccak256(\\\"onERC721Received(address,address,uint256,bytes)\\\"))`.\",\"params\":{\"_from\":\"The current owner of the NFT\",\"_to\":\"The new owner\",\"_tokenId\":\"The NFT to transfer\",\"data\":\"Additional data with no specified format, sent in call to `_to`\"}},\"setApprovalForAll(address,bool)\":{\"details\":\"Emits the ApprovalForAll event. The contract MUST allow multiple operators per owner.\",\"params\":{\"_approved\":\"True if the operator is approved, false to revoke approval\",\"_operator\":\"Address to add to the set of authorized operators\"}},\"supportsInterface(bytes4)\":{\"details\":\"Interface identification is specified in ERC-165. This function uses less than 30,000 gas.\",\"params\":{\"interfaceID\":\"The interface identifier, as specified in ERC-165\"},\"returns\":{\"_0\":\"`true` if the contract implements `interfaceID` and `interfaceID` is not 0xffffffff, `false` otherwise\"}},\"transferFrom(address,address,uint256)\":{\"details\":\"Throws unless `msg.sender` is the current owner, an authorized operator, or the approved address for this NFT. Throws if `_from` is not the current owner. Throws if `_to` is the zero address. Throws if `_tokenId` is not a valid NFT.\",\"params\":{\"_from\":\"The current owner of the NFT\",\"_to\":\"The new owner\",\"_tokenId\":\"The NFT to transfer\"}}},\"title\":\"ERC-721 Non-Fungible Token Standard\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"approve(address,uint256)\":{\"notice\":\"Change or reaffirm the approved address for an NFT\"},\"balanceOf(address)\":{\"notice\":\"Count all NFTs assigned to an owner\"},\"getApproved(uint256)\":{\"notice\":\"Get the approved address for a single NFT\"},\"isApprovedForAll(address,address)\":{\"notice\":\"Query if an address is an authorized operator for another address\"},\"ownerOf(uint256)\":{\"notice\":\"Find the owner of an NFT\"},\"safeTransferFrom(address,address,uint256)\":{\"notice\":\"Transfers the ownership of an NFT from one address to another address\"},\"safeTransferFrom(address,address,uint256,bytes)\":{\"notice\":\"Transfers the ownership of an NFT from one address to another address\"},\"setApprovalForAll(address,bool)\":{\"notice\":\"Enable or disable approval for a third party (\\\"operator\\\") to manage all of `msg.sender`'s assets\"},\"supportsInterface(bytes4)\":{\"notice\":\"Query if a contract implements an interface\"},\"transferFrom(address,address,uint256)\":{\"notice\":\"Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE THEY MAY BE PERMANENTLY LOST\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"lib/forge-std/src/interfaces/IERC721.sol\":\"IERC721\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/forge-std/src/interfaces/IERC165.sol\":{\"keccak256\":\"0x414b2861b1acbf816ccb7346d3f16cf6c1e002e9e5e40d2f1f26fa5ddc2ea600\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://698352fb240868ea8f1d1fe389993035eeab930f10d06934f80ccfb2b6ccbfbc\",\"dweb:/ipfs/QmT6WLHAgXxFhh12kWym895oTzXid1326iZiwT3pyfggoT\"]},\"lib/forge-std/src/interfaces/IERC721.sol\":{\"keccak256\":\"0xf069262a264fdb69f8f37a10d2df7374649e9ba73f8414c9c8a3b51184625f15\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://924a41ca82a68ffbd503a5faf2f76d13e9938f10501a71094716f12bb64b4b7f\",\"dweb:/ipfs/QmdWnqfKc5ZGhmxNPTde4zrFchnv9Yk9MpCMb2rdhXE5gm\"]}},\"version\":1}",
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
              "internalType": "address",
              "name": "_owner",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "_approved",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "Approval",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_owner",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "_operator",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "bool",
              "name": "_approved",
              "type": "bool",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "ApprovalForAll",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_from",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "_to",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "Transfer",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_approved",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "approve"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_owner",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "getApproved",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_operator",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "ownerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "safeTransferFrom"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "safeTransferFrom"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "_approved",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "setApprovalForAll"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceID",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "transferFrom"
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {
          "approve(address,uint256)": {
            "details": "The zero address indicates there is no approved address. Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.",
            "params": {
              "_approved": "The new approved NFT controller",
              "_tokenId": "The NFT to approve"
            }
          },
          "balanceOf(address)": {
            "details": "NFTs assigned to the zero address are considered invalid, and this function throws for queries about the zero address.",
            "params": {
              "_owner": "An address for whom to query the balance"
            },
            "returns": {
              "_0": "The number of NFTs owned by `_owner`, possibly zero"
            }
          },
          "getApproved(uint256)": {
            "details": "Throws if `_tokenId` is not a valid NFT.",
            "params": {
              "_tokenId": "The NFT to find the approved address for"
            },
            "returns": {
              "_0": "The approved address for this NFT, or the zero address if there is none"
            }
          },
          "isApprovedForAll(address,address)": {
            "params": {
              "_operator": "The address that acts on behalf of the owner",
              "_owner": "The address that owns the NFTs"
            },
            "returns": {
              "_0": "True if `_operator` is an approved operator for `_owner`, false otherwise"
            }
          },
          "ownerOf(uint256)": {
            "details": "NFTs assigned to zero address are considered invalid, and queries about them do throw.",
            "params": {
              "_tokenId": "The identifier for an NFT"
            },
            "returns": {
              "_0": "The address of the owner of the NFT"
            }
          },
          "safeTransferFrom(address,address,uint256)": {
            "details": "This works identically to the other function with an extra data parameter, except this function just sets data to \"\".",
            "params": {
              "_from": "The current owner of the NFT",
              "_to": "The new owner",
              "_tokenId": "The NFT to transfer"
            }
          },
          "safeTransferFrom(address,address,uint256,bytes)": {
            "details": "Throws unless `msg.sender` is the current owner, an authorized operator, or the approved address for this NFT. Throws if `_from` is not the current owner. Throws if `_to` is the zero address. Throws if `_tokenId` is not a valid NFT. When transfer is complete, this function checks if `_to` is a smart contract (code size > 0). If so, it calls `onERC721Received` on `_to` and throws if the return value is not `bytes4(keccak256(\"onERC721Received(address,address,uint256,bytes)\"))`.",
            "params": {
              "_from": "The current owner of the NFT",
              "_to": "The new owner",
              "_tokenId": "The NFT to transfer",
              "data": "Additional data with no specified format, sent in call to `_to`"
            }
          },
          "setApprovalForAll(address,bool)": {
            "details": "Emits the ApprovalForAll event. The contract MUST allow multiple operators per owner.",
            "params": {
              "_approved": "True if the operator is approved, false to revoke approval",
              "_operator": "Address to add to the set of authorized operators"
            }
          },
          "supportsInterface(bytes4)": {
            "details": "Interface identification is specified in ERC-165. This function uses less than 30,000 gas.",
            "params": {
              "interfaceID": "The interface identifier, as specified in ERC-165"
            },
            "returns": {
              "_0": "`true` if the contract implements `interfaceID` and `interfaceID` is not 0xffffffff, `false` otherwise"
            }
          },
          "transferFrom(address,address,uint256)": {
            "details": "Throws unless `msg.sender` is the current owner, an authorized operator, or the approved address for this NFT. Throws if `_from` is not the current owner. Throws if `_to` is the zero address. Throws if `_tokenId` is not a valid NFT.",
            "params": {
              "_from": "The current owner of the NFT",
              "_to": "The new owner",
              "_tokenId": "The NFT to transfer"
            }
          }
        },
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {
          "approve(address,uint256)": {
            "notice": "Change or reaffirm the approved address for an NFT"
          },
          "balanceOf(address)": {
            "notice": "Count all NFTs assigned to an owner"
          },
          "getApproved(uint256)": {
            "notice": "Get the approved address for a single NFT"
          },
          "isApprovedForAll(address,address)": {
            "notice": "Query if an address is an authorized operator for another address"
          },
          "ownerOf(uint256)": {
            "notice": "Find the owner of an NFT"
          },
          "safeTransferFrom(address,address,uint256)": {
            "notice": "Transfers the ownership of an NFT from one address to another address"
          },
          "safeTransferFrom(address,address,uint256,bytes)": {
            "notice": "Transfers the ownership of an NFT from one address to another address"
          },
          "setApprovalForAll(address,bool)": {
            "notice": "Enable or disable approval for a third party (\"operator\") to manage all of `msg.sender`'s assets"
          },
          "supportsInterface(bytes4)": {
            "notice": "Query if a contract implements an interface"
          },
          "transferFrom(address,address,uint256)": {
            "notice": "Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE THEY MAY BE PERMANENTLY LOST"
          }
        },
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
        "lib/forge-std/src/interfaces/IERC721.sol": "IERC721"
      },
      "evmVersion": "cancun",
      "libraries": {},
      "viaIR": true
    },
    "sources": {
      "lib/forge-std/src/interfaces/IERC165.sol": {
        "keccak256": "0x414b2861b1acbf816ccb7346d3f16cf6c1e002e9e5e40d2f1f26fa5ddc2ea600",
        "urls": [
          "bzz-raw://698352fb240868ea8f1d1fe389993035eeab930f10d06934f80ccfb2b6ccbfbc",
          "dweb:/ipfs/QmT6WLHAgXxFhh12kWym895oTzXid1326iZiwT3pyfggoT"
        ],
        "license": "MIT"
      },
      "lib/forge-std/src/interfaces/IERC721.sol": {
        "keccak256": "0xf069262a264fdb69f8f37a10d2df7374649e9ba73f8414c9c8a3b51184625f15",
        "urls": [
          "bzz-raw://924a41ca82a68ffbd503a5faf2f76d13e9938f10501a71094716f12bb64b4b7f",
          "dweb:/ipfs/QmdWnqfKc5ZGhmxNPTde4zrFchnv9Yk9MpCMb2rdhXE5gm"
        ],
        "license": "MIT"
      }
    },
    "version": 1
  },
  "id": 26
} as const;