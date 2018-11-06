export const ADDRESS = '0xf4f2da8d23bf5d412d172e25b3a6f16619c371e2';
export const ABI = [
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
"type": "function"
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
"type": "function"
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
"type": "function"
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
"type": "function"
},
{
"inputs": [
{
"name": "_mybToken",
"type": "address"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"payable": false,
"stateMutability": "nonpayable",
"type": "fallback"
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
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_contributor",
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
"name": "LogTokensPurchased",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_contributor",
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
"name": "LogTokensCollected",
"type": "event"
},
{
"constant": false,
"inputs": [],
"name": "startSale",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
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
"type": "function"
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
"type": "function"
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
"type": "function"
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
"type": "function"
},
{
"constant": false,
"inputs": [
{
"name": "_day",
"type": "uint256"
}
],
"name": "burnTokens",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [
{
"name": "_user",
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
"type": "function"
},
{
"constant": true,
"inputs": [
{
"name": "_day",
"type": "uint16"
},
{
"name": "_investor",
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
"type": "function"
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
"type": "function"
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
"type": "function"
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
"type": "function"
}
]
;
