require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');

require('@nomiclabs/hardhat-truffle5');

const { projectId, mnemonic, mnemonictest } = require('./secrets.json');

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.7.3",
    networks: {
        hardhat: {
            chainId: 1337
        },
        localhosttest: {
            url: 'http://localhost:8545',
            accounts: {mnemonic: mnemonic},
            chainId: 1337
        },
        bsctestnet: {
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
            accounts: {mnemonic: mnemonic}
        },
        bsctestnettest: {
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
            accounts: {mnemonic: mnemonictest},
            gas: 19500000
        }
    }
};