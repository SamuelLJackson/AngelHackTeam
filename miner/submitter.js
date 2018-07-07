

const Web3 = require("web3");
const fs = require('fs');
const Tx = require('ethereumjs-tx')
const web3 = new Web3(new Web3.providers.HttpProvider("http://40.117.249.181:8545"));


nonce = process.argv[2]
value = process.argv[3]


console.log('Nonce submitted: ',nonce)
console.log('Value submitted: ',value)


var abi = [{"constant":false,"inputs":[{"name":"_new_owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_date","type":"uint256"}],"name":"RetrieveData","outputs":[{"name":"data","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"StoreDocument","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_key","type":"uint256"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"DocumentStored","type":"event"}]
var contractAddress =process.argv[4];
var _ = require('lodash');
var SolidityFunction = require('web3/lib/web3/function');
var solidityFunction = new SolidityFunction('', _.find(abi, { name: 'proofOfWork()' }), '');


var account1= process.argv[5];
var key1 = new Buffer('3a10b4bc1258e8bfefb95b498fb8c0f0cd6964a811eabca87df5630bcacd7216', 'hex');

var payloadData = solidityFunction.toPayload([nonce,value]).data;

function sendSigned(txData, cb) {
  const transaction = new Tx(txData)
  transaction.sign(key1)
  const serializedTx = transaction.serialize().toString('hex')
  web3.eth.sendRawTransaction('0x' + serializedTx, cb)
}

// get the number of transactions sent so far so we can create a fresh nonce
txCount = web3.eth.getTransactionCount(account1);
  // construct the transaction data
  const txData = {
    nonce: web3.toHex(txCount),
    gasLimit: web3.toHex(250000),
    gasPrice: web3.toHex(100e9), // 100 Gwei
    to: contractAddress,
    from: account1,
    value: web3.toHex(web3.toWei(0, 'wei')),
    data: payloadData,
    chainId:3
  }

  // fire away!
  sendSigned(txData, function(err, result) {
    if (err) return console.log('error', err)
    console.log('sent', result)
  })
