console.log('testing Nano ledger S integration')

var Web3 = require('web3');
var ProviderEngine = require('web3-provider-engine');
var RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
var LedgerWalletSubproviderFactory = require('ledger-wallet-provider').default;

var BigNumber = require('bignumber.js');

var engine = new ProviderEngine();
var web3 = new Web3(engine);

const Eth = require('ethjs-query');
const HttpProvider = require('ethjs-provider-http');
const eth = new Eth(new HttpProvider('https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'));
const BN = require('bignumber.js');

var padLeft = function (n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

LedgerWalletSubproviderFactory()
.then((ledgerWalletSubProvider) => {
	engine.addProvider(ledgerWalletSubProvider);
	engine.addProvider(new RpcSubprovider({rpcUrl: 'https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'})); // you need RPC endpoint
	engine.start();
	web3.eth.getAccounts().then((account) => {
		console.log('account', account)
		eth.getTransactionCount(account[0]).then((nonce) => {
			console.log('nonce', nonce)
			
			// sending
			// web3.eth.sendTransaction({
		 //      from: account[0],
		 //      to: '0x42AA3D8a40C9Bd501f92617a280a539f3Cb6957A',
		 //      value: '1234567890',
		 //      gas: new BN('2900000'),
		 //      gasPrice: new BN('20000000000'),
		 //      nonce: nonce,
		 //    })

		 	// sending erc20 token
		    var value = 321
		    var decimal = 18
		    // '0xa9059cbb' == transfer 
		 	var data = '0xa9059cbb' + padLeft('42AA3D8a40C9Bd501f92617a280a539f3Cb6957A', 64) + padLeft(new BigNumber(value).times(new BigNumber(10).pow(decimal)).toString(16), 64);

		 	console.log(data)
			web3.eth.sendTransaction({
		      from: account[0],
		      to: '0x91575803b1a2181b328ebffc996354d2ff0654c1',
		      gas: new BN('2900000'),
		      gasPrice: new BN('20000000000'),
		      nonce: nonce,
		      data: data
		    })
		})
	});
}) 


