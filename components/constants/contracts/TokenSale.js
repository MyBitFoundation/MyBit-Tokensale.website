export const ADDRESS = '0x5b341dcbaf89f0fabbf4c31761965c4b5f4d686e';
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
      "name": "weiPerToken",
      "type": "uint256"
    },
    {
      "name": "dayIncome",
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
    },
    {
      "indexed": false,
      "name": "weiPerToken",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "weiContributed",
      "type": "uint256"
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
    },
    {
      "indexed": false,
      "name": "weiPerToken",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "weiContributed",
      "type": "uint256"
    }
  ],
  "name": "LogTokensCollected",
  "type": "event"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_totalAmount",
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
  "outputs": [],
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
  "name": "getTokensForContribution",
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
      "name": "_user",
      "type": "address"
    },
    {
      "name": "_day",
      "type": "uint16"
    }
  ],
  "name": "getUnclaimedAmount",
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
];
