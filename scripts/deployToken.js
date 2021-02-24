const { ethers, upgrades } = require("hardhat");

async function main() {
    const Token = await ethers.getContractFactory("TokenUpgradeable");
    console.log("Deploying upgradable token...");
    const amount = '100000000000000000000000'; // 100 000
    const token = await upgrades.deployProxy(Token, ["ERC20 Token", "ERC20UP", amount], { initializer: 'initialize', unsafeAllowCustomTypes: true });
    console.log("Upgradable token deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });