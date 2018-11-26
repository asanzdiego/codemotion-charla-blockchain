var HDWalletProvider = require("truffle-hdwallet-provider");

var path = process.cwd();

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 6900000,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function () {

        var fs = require('fs');

        var walletMmnemonic = fs.readFileSync(path + "/private/wallet.mnemonic.rinkeby").toString();
        //console.log(walletMmnemonic);
        
        var apiKey = fs.readFileSync(path + "/private/api.key").toString();
        //console.log(apiKey);

        let provider = new HDWalletProvider(
          walletMmnemonic,
          "https://rinkeby.infura.io/v3/" + apiKey);
        provider.getAddress();
        
        return provider;
      },
      gas: 6900000,
      network_id: 4
    }
  }
};
