module.exports = {
  ADDRESS: '0x9b4633B37eE24555a76DE549C1f6DD3c64cE36eB',
  //ADDRESS: '0xf4f2da8d23bf5d412d172e25b3a6f16619c371e2', - ropsten and started
  ABI: [
{
"constant": true,
"inputs": [],
"name": "mybitFoundation",
"outputs": [
{
"name": "",
"type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x7db02c8b"
},
{
"constant": true,
"inputs": [],
"name": "developmentFund",
"outputs": [
{
"name": "",
"type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x8a2381d7"
},
{
"constant": true,
"inputs": [],
"name": "owner",
"outputs": [
{
"name": "",
"type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x8da5cb5b"
},
{
"constant": true,
"inputs": [],
"name": "tokensPerDay",
"outputs": [
{
"name": "",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x90497c66"
},
{
"constant": true,
"inputs": [
{
"name": "",
"type": "uint16"
}
],
"name": "day",
"outputs": [
{
"name": "totalWeiContributed",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0xbd7255b0"
},
{
"constant": true,
"inputs": [],
"name": "start",
"outputs": [
{
"name": "",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0xbe9a6555"
},
{
"inputs": [
{
"name": "_mybToken",
"type": "address"
},
{
"name": "_mybFoundation",
"type": "address"
},
{
"name": "_developmentFund",
"type": "address"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "constructor",
"signature": "constructor"
},
{
"payable": true,
"stateMutability": "payable",
"type": "fallback"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_owner",
"type": "address"
},
{
"indexed": false,
"name": "_mybFoundation",
"type": "address"
},
{
"indexed": false,
"name": "_developmentFund",
"type": "address"
},
{
"indexed": false,
"name": "_totalMYB",
"type": "uint256"
},
{
"indexed": false,
"name": "_startTime",
"type": "uint256"
}
],
"name": "LogSaleStarted",
"type": "event",
"signature": "0x8374e91c2472351bc5eb07c7e6292d3b801d821ce30fefbff40e013a94af7f94"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_mybFoundation",
"type": "address"
},
{
"indexed": false,
"name": "_amount",
"type": "uint256"
},
{
"indexed": false,
"name": "_day",
"type": "uint16"
}
],
"name": "LogFoundationWithdraw",
"type": "event",
"signature": "0xe56726172348e334b8fff79c722777489b247ed7148d44486ab67b65c1a54f1f"
},
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"name": "_contributor",
"type": "address"
},
{
"indexed": false,
"name": "_amount",
"type": "uint256"
},
{
"indexed": true,
"name": "_day",
"type": "uint16"
}
],
"name": "LogTokensPurchased",
"type": "event",
"signature": "0xd498819977fb9763f29bab6e4eee516c4cf59053922eb6a9fe59370a7bc28b3d"
},
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"name": "_contributor",
"type": "address"
},
{
"indexed": false,
"name": "_amount",
"type": "uint256"
},
{
"indexed": true,
"name": "_day",
"type": "uint16"
}
],
"name": "LogTokensCollected",
"type": "event",
"signature": "0x33a4ae6c0627280fcb7aaf7e07deb59bbce49aa4808ee5457f8622f77ab5d28c"
},
{
"constant": false,
"inputs": [
{
"name": "_timestamp",
"type": "uint256"
}
],
"name": "startSale",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function",
"signature": "0x0e3ab61d"
},
{
"constant": false,
"inputs": [
{
"name": "_day",
"type": "uint16"
}
],
"name": "fund",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": true,
"stateMutability": "payable",
"type": "function",
"signature": "0xce347a65"
},
{
"constant": false,
"inputs": [
{
"name": "_day",
"type": "uint16[]"
}
],
"name": "batchFund",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": true,
"stateMutability": "payable",
"type": "function",
"signature": "0x1ca89953"
},
{
"constant": false,
"inputs": [
{
"name": "_day",
"type": "uint16"
}
],
"name": "withdraw",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function",
"signature": "0x3d972839"
},
{
"constant": false,
"inputs": [
{
"name": "_day",
"type": "uint16[]"
}
],
"name": "batchWithdraw",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function",
"signature": "0x132e8bee"
},
{
"constant": false,
"inputs": [
{
"name": "_amount",
"type": "uint256"
}
],
"name": "foundationWithdraw",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function",
"signature": "0xcedcd770"
},
{
"constant": true,
"inputs": [
{
"name": "_contributor",
"type": "address"
},
{
"name": "_day",
"type": "uint16"
}
],
"name": "getTokensOwed",
"outputs": [
{
"name": "",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x279c7425"
},
{
"constant": true,
"inputs": [
{
"name": "_contributor",
"type": "address"
},
{
"name": "_days",
"type": "uint16[]"
}
],
"name": "getTotalTokensOwed",
"outputs": [
{
"name": "amount",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x1ea6b97f"
},
{
"constant": true,
"inputs": [
{
"name": "_day",
"type": "uint16"
},
{
"name": "_contributor",
"type": "address"
}
],
"name": "getWeiContributed",
"outputs": [
{
"name": "",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0xcf5e36df"
},
{
"constant": true,
"inputs": [
{
"name": "_day",
"type": "uint16"
}
],
"name": "getTotalWeiContributed",
"outputs": [
{
"name": "",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x12635d26"
},
{
"constant": true,
"inputs": [
{
"name": "_timestamp",
"type": "uint256"
}
],
"name": "dayFor",
"outputs": [
{
"name": "",
"type": "uint16"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0xd90c1759"
},
{
"constant": true,
"inputs": [
{
"name": "_day",
"type": "uint16"
}
],
"name": "dayFinished",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x9e211ee8"
},
{
"constant": true,
"inputs": [
{
"name": "_day",
"type": "uint16"
}
],
"name": "duringSale",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x6110e614"
},
{
"constant": true,
"inputs": [],
"name": "currentDay",
"outputs": [
{
"name": "",
"type": "uint16"
}
],
"payable": false,
"stateMutability": "view",
"type": "function",
"signature": "0x5c9302c9"
}
]};
