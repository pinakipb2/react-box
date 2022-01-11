const path = require('path');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    develop: {
      port: 7545,
    },
    test: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
  },
  compilers: {
    solc: {
      version: '0.8.10',
    },
  },
};
