const { ethers, upgrades } = require("hardhat");

async function main() {
  const Token = await ethers.getContractFactory("Token");
  console.log("Deploying token...");
  const amount = "100000000000000000000000";
  const token = await Token.deploy("ERC20 TEST TOKEN", "ERC20TEST", amount);
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });