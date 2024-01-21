const platformABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "loaner",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "address payable",
						"name": "poster",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "collectionAddr",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "APR",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "status",
						"type": "bytes32"
					}
				],
				"indexed": false,
				"internalType": "struct Platform.ListingInfo",
				"name": "info",
				"type": "tuple"
			}
		],
		"name": "ApprovalListing",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingIndex",
				"type": "uint256"
			}
		],
		"name": "approveLoan",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "address payable",
						"name": "poster",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "collectionAddr",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "APR",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "status",
						"type": "bytes32"
					}
				],
				"indexed": false,
				"internalType": "struct Platform.ListingInfo",
				"name": "info",
				"type": "tuple"
			}
		],
		"name": "CancelListing",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingIndex",
				"type": "uint256"
			}
		],
		"name": "closeListing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "address payable",
						"name": "poster",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "collectionAddr",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "APR",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "status",
						"type": "bytes32"
					}
				],
				"indexed": false,
				"internalType": "struct Platform.ListingInfo",
				"name": "info",
				"type": "tuple"
			}
		],
		"name": "NewListing",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "check",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingIndex",
				"type": "uint256"
			}
		],
		"name": "giveBackNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collectionAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "APR",
				"type": "uint256"
			}
		],
		"name": "openListing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "address payable",
						"name": "poster",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "collectionAddr",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "APR",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "status",
						"type": "bytes32"
					}
				],
				"indexed": false,
				"internalType": "struct Platform.ListingInfo",
				"name": "info",
				"type": "tuple"
			}
		],
		"name": "repaying",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingIndex",
				"type": "uint256"
			}
		],
		"name": "repayLoan",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingIndex",
				"type": "uint256"
			}
		],
		"name": "updateTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingIndex",
				"type": "uint256"
			}
		],
		"name": "calculateRepayAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getListing",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "getListingInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address payable",
						"name": "poster",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "collectionAddr",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "APR",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "status",
						"type": "bytes32"
					}
				],
				"internalType": "struct Platform.ListingInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "getUpdateTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collectionAddr",
				"type": "address"
			}
		],
		"name": "isApprove",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingIndex",
				"type": "uint256"
			}
		],
		"name": "isExpired",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listNum",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "poster",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "collectionAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "APR",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "status",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "loanerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collectionAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default platformABI;