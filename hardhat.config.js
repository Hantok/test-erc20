require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');

require('@nomiclabs/hardhat-truffle5');

const { projectId, mnemonic } = require('./secrets.json');

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
    bsctestnet: {
          url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
          accounts: {mnemonic: mnemonic}
        }
  }
};