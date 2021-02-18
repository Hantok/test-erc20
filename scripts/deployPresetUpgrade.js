const { ethers, upgrades } = require("hardhat");

async function main() {
    const proxyAddress = '0x7d5450442a5Db876316De83Bc474B2275BFcCA6B';

    const Token = await ethers.getContractFactory("ERC20PresetMinterPauserUpgradeable");
    console.log("Preparing upgrade ERC20PresetMinterPauserUpgradeable...");
    const boxV2Address = await upgrades.prepareUpgrade(proxyAddress, Token, {unsafeAllowCustomTypes: true });
    console.log("ERC20PresetMinterPauserUpgradeable at:", boxV2Address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });