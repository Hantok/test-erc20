const { ethers, upgrades } = require("hardhat");

async function main() {
  const TokenUpgrade = await ethers.getContractFactory("TokenUpgradable");
  console.log("Deploying upgradable token...");
  const token = await upgrades.deployProxy(TokenUpgrade, ["ERC20 Upgradable TOKEN", "ERC20UP"], { unsafeAllowCustomTypes: true  });
  console.log("Upgradable token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });