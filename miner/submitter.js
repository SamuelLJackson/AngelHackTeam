

const Web3 = require("web3");
const fs = require('fs');
const Tx = require('ethereumjs-tx')
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/zkGX3Vf8njIXiHEGRueB"));
var json = require('../build/contracts/OracleToken.json');

solution = process.argv[2]
value = process.argv[3]


console.log('Nonce submitted: ',solution)
console.log('Value submitted: ',value)


  var address = process.argv[4];
  var abi = json.abi;
  var account = process.argv[5];
  var privateKey = new Buffer('3a10b4bc1258e8bfefb95b498fb8c0f0cd6964a811eabca87df5630bcacd7216', 'hex');
  web3.eth.getTransactionCount(account, function (err, nonce) {
    var data = web3.eth.contract(abi).at(address).proofOfWork.getData(solution,value);
    console.log('Input Data: ',data);
    var tx = new Tx({
      nonce: nonce,
      gasPrice: web3.toHex(web3.toWei('20', 'gwei')),
      gasLimit: 100000,
      to: address,
      value: 0,
      data: data,
    });
    tx.sign(privateKey);

    var raw = '0x' + tx.serialize().toString('hex');
    // web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
    //   console.log(transactionHash);
    // });
  });