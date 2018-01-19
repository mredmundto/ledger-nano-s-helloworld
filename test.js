console.log('testing Nano ledger S integration')

var Web3 = require('web3');
var ProviderEngine = require('web3-provider-engine');
var RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
var LedgerWalletSubproviderFactory = require('ledger-wallet-provider').default;

var engine = new ProviderEngine();
var web3 = new Web3(engine);

const Eth = require('ethjs-query');
const HttpProvider = require('ethjs-provider-http');
const eth = new Eth(new HttpProvider('https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'));
const BN = require('bignumber.js');

LedgerWalletSubproviderFactory()
.then((ledgerWalletSubProvider) => {
	engine.addProvider(ledgerWalletSubProvider);
	engine.addProvider(new RpcSubprovider({rpcUrl: 'https://ropsten.infura.io/SYGRk61NUc3yN4NNRs60'})); // you need RPC endpoint
	engine.start();
	web3.eth.getAccounts().then((account) => {
		console.log('account', account)
		eth.getTransactionCount(account[0]).then((nonce) => {
			console.log('nonce', nonce)
			web3.eth.sendTransaction({
		      from: account[0],
		      to: '0x42AA3D8a40C9Bd501f92617a280a539f3Cb6957A',
		      value: '12345',
		      gas: new BN('2900000'),
		      gasPrice: new BN('20000000000'),
		      nonce: nonce,
		    })
		})
	});
}) 


