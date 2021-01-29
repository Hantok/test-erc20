require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');

require('@nomiclabs/hardhat-truffle5');

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
};