require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

const config = {
  networks: {
    mainnet: {
      host: "localhost",
      port: 8545,
      network_id: "1"
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: "3"
    },
    kovan: {
      host: "localhost",
      port: 8545,
      network_id: "42"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          process.env.SEED,
          `https://rinkeby.infura.io/v3/22218302c99b4ee29f8a5876ad0b552c`
        );
      },
      network_id: "4"
    }
  },
  mocha: {
    enableTimeouts: false,
    grep: process.env.TEST_GREP
  },
  compilers: {
    solc: {
      version: "0.5.1"
    }
  }
};

const _ = require("lodash");

try {
  _.merge(config, require("./truffle-local"));
} catch (e) {
  if (e.code === "MODULE_NOT_FOUND" && e.message.includes("truffle-local")) {
    // eslint-disable-next-line no-console
    console.log("No local truffle config found. Using all defaults...");
  } else {
    // eslint-disable-next-line no-console
    console.warn("Tried processing local config but got error:", e);
  }
}

module.exports = config;
