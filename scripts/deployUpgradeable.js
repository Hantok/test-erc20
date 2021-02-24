const { ethers, upgrades } = require("hardhat");

async function main() {
    const Token = await ethers.getContractFactory("TokenUpgradeable");
    console.log("Deploying upgradable token...");
    const token = await upgrades.deployProxy(Token, ["ERC20 Token", "ERC20UP"], { initializer: 'initialize', unsafeAllowCustomTypes: true });
    console.log("Upgradable token deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });