console.log('testing Nano ledger S integration')

// var Web3 = require('web3');
// var ProviderEngine = require('web3-provider-engine');
// var RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
// var LedgerWalletSubproviderFactory = require('ledger-wallet-provider').default;

// var engine = new ProviderEngine();
// var web3 = new Web3(engine);

// // var ledgerWalletSubProvider = async LedgerWalletSubproviderFactory();
// // engine.addProvider(ledgerWalletSubProvider);
// // engine.addProvider(new RpcSubprovider({rpcUrl: '/api'})); // you need RPC endpoint
// // engine.start();

// // web3.eth.getAccounts(console.log);

// LedgerWalletSubproviderFactory()
// .then((ledgerWalletSubProvider) => {
// 	// console.log(ledgerWalletSubProvider)
// 	engine.addProvider(ledgerWalletSubProvider);
// 	engine.addProvider(new RpcSubprovider({rpcUrl: 'https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'})); // you need RPC endpoint
// 	engine.start();
// 	web3.eth.getAccounts(console.log);
// }) 

var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);