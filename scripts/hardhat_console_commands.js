//Commands for hardhat console

const Token = await ethers.getContractFactory("TokenUpgradable")
const token = await Token.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
await token.name()
accounts = await ethers.provider.listAccounts()
await token.totalSupply()

await token.mint(accounts[0], "100000000000000000000")
await token.burn(accounts[0], "100000000000000000000")

await token.balanceOf(accounts[0])
await token.balanceOf(accounts[1])

await token.pause()
await token.unpause()


await token.grantRole(web3.utils.soliditySha3('MINTER_ROLE'), "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
await token.grantRole(web3.utils.soliditySha3('PAUSER_ROLE'), "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

await token.revokeRole(web3.utils.soliditySha3('MINTER_ROLE'), "0xF119492cC512894cA2B7Df5E16E846fDd8eEf620")
await token.revokeRole(web3.utils.soliditySha3('PAUSER_ROLE'), "0xF119492cC512894cA2B7Df5E16E846fDd8eEf620")