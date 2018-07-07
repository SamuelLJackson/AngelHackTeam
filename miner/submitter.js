

const Web3 = require("web3");
const fs = require('fs');
const Tx = require('ethereumjs-tx')
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/zkGX3Vf8njIXiHEGRueB"));


date = process.argv[2]

//var columns = [,'time','date','price','Bitfinex','GDAX','BITSTAMP','Poloniex','Gemini']
var people = [];
var fileContents = fs.readFileSync("C:/Company/Code/Oracle/Data/eth_"+process.argv[3]+".csv");
var lines = fileContents.toString().split('\n');

for (var i = 0; i < lines.length; i++) {
    people.push(lines[i].toString().split(','));
}

for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < 3; j++) {
    }
    //console.log('\n');
}


var dailyval = parseInt(people[1][3].replace(/\n/g, ''));


console.log(dailyval)
console.log(date)


var abi = [{"constant":false,"inputs":[{"name":"_new_owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_date","type":"uint256"}],"name":"RetrieveData","outputs":[{"name":"data","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"StoreDocument","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_key","type":"uint256"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"DocumentStored","type":"event"}]
var contractAddress ='0xa45b9e262a8e48cb1c960b5ada7f2a7b110cb487';
var _ = require('lodash');
var SolidityFunction = require('web3/lib/web3/function');
var solidityFunction = new SolidityFunction('', _.find(abi, { name: 'StoreDocument' }), '');


var account1= '0x939DD3E2DE8f472573364B3df1337857E758d90D';
var key1 = new Buffer('f47e6311420a4fc5e900cb9aebec5387b7b56228bbeb887b7de424f8af9b1a74', 'hex');

var payloadData = solidityFunction.toPayload([date,dailyval]).data;
console.log(payloadData)

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

/*
var stream = fs.createWriteStream("my_file.csv");
stream.once('open', function(fd) {
  stream.write('woohoo new doc');
  /*stream.write("TransactionOccured",hash);
  stream.write("Contract Created at: ",newAddress);
  stream.end();
});
****/
