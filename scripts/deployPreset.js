const { ethers, upgrades } = require("hardhat");

async function main() {
    const Token = await ethers.getContractFactory("ERC20PresetMinterPauserUpgradeable");
    console.log("Deploying ERC20PresetMinterPauserUpgradeable...");
    const token = await upgrades.deployProxy(Token, ["ERC20PresetMinterPauserUpgradeable", "ERC20PRESET"], { initializer: 'initialize', unsafeAllowCustomTypes: true });
    console.log("ERC20PresetMinterPauserUpgradeable deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });