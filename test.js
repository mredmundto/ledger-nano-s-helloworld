console.log('testing Nano ledger S integration')

var Web3 = require('web3');
var ProviderEngine = require('web3-provider-engine');
var RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
var LedgerWalletSubproviderFactory = require('ledger-wallet-provider').default;
var BigNumber = require('bignumber.js');
var Eth = require('ethjs-query');
var HttpProvider = require('ethjs-provider-http');

var engine = new ProviderEngine();
var web3 = new Web3(engine);

// var eth = new Eth(new HttpProvider('https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'));
var eth = new Eth(new HttpProvider('https://mainnet.infura.io/SYGRk61NUc3yN4NNRs60'));

var padLeft = function (n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// ethereum main net id 
var getNetworkId = () => 1 
// rospten test net id
// const getNetworkId = () => 3

LedgerWalletSubproviderFactory(getNetworkId)
.then((ledgerWalletSubProvider) => {
	engine.addProvider(ledgerWalletSubProvider);
	// engine.addProvider(new RpcSubprovider({rpcUrl: 'https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'})); // you need RPC endpoint
	engine.addProvider(new RpcSubprovider({rpcUrl: 'https://mainnet.infura.io/SYGRk61NUc3yN4NNRs60'})); // you need RPC endpoint
	engine.start();
	web3.eth.getAccounts().then((account) => {
		console.log('account', account)
		eth.getTransactionCount(account[0]).then((nonce) => {
			console.log('nonce', nonce)
			
			// sending
			// web3.eth.sendTransaction({
		 //      from: account[0],
		 //      to: '0xFdb6ac6750690D9c46d038f2536eC995D9d3D6d8',
		 //      value: '201831301',
		 //      nonce: nonce,
		 //    })

		 	// sending erc20 token
		    var value = 20180313
		    var decimal = 8
		    // '0xa9059cbb' == transfer 
		 	var data = '0xa9059cbb' + padLeft('Fdb6ac6750690D9c46d038f2536eC995D9d3D6d8', 64) + padLeft(new BigNumber(value).times(new BigNumber(10).pow(decimal)).toString(16), 64);

		 	console.log(data)
			web3.eth.sendTransaction({
		      from: account[0],
		      to: '0x9208905134a011d1aff62c6e44b57f2c693aad2c',
		      gas: new BigNumber('60000'),
		      gasPrice: new BigNumber('40000000000'),
		      nonce: nonce,
		      data: data
		    })
		})
	});
}) 


