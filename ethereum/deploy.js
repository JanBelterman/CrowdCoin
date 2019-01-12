const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

// Create instance of web3
const provider = new HDWalletProvider(
  'become busy traffic social boil critic loop rebel quarter amateur pulp festival',
  'https://rinkeby.infura.io/v3/bc0b9e5d56d541ac85748fa7c00e1063'
);
const web3 = new Web3(provider);

// Deploy function
const deploy = async () => {
  // Get accounts
  const accounts = await web3.eth.getAccounts();
  // Deploy factory
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  // Log
  console.log('Contract deployed to', result.options.address);
};
deploy();