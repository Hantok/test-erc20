const { ethers, upgrades } = require("hardhat");

async function main() {
    const proxyAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

    const Token = await ethers.getContractFactory("TokenUpgradeableV2");
    console.log("Preparing upgrade TokenUpgradableV2...");
    const tokenV2Address = await upgrades.prepareUpgrade(proxyAddress, Token, {unsafeAllowCustomTypes: true });
    console.log("TokenUpgradableV2 at:", tokenV2Address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });