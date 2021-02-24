//Commands for hardhat console
accounts = await ethers.provider.listAccounts()

const Token = await ethers.getContractFactory("TokenUpgradeable")

// localhost
const token = await Token.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")

// https://testnet.bscscan.com/
const token = await Token.attach("0x6Df183f145F0bDfd676227a3107653100592c1b8")

await token.name()
await token.totalSupply()
await token.decimals()

await token.blacklist(accounts[1])
await token.isBlacklisted(accounts[1])
await token.unBlacklist(accounts[1])

await token.blacklist("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
await token.isBlacklisted("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

await token.blacklist("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
await token.isBlacklisted("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")

await token.unBlacklist("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
await token.isBlacklisted("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")


await token.mint(accounts[0], "100000000000000000000")
await token.burn(accounts[0], "100000000000000000000")

await token.balanceOf(accounts[0])
await token.balanceOf(accounts[1])

await token.transfer(accounts[1], "1")
await token.transfer(accounts[1], "1")


await token.pause()
await token.paused()

await token.unpause()
await token.paused()


await token.grantRole(web3.utils.soliditySha3('MINTER_ROLE'), "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
await token.grantRole(web3.utils.soliditySha3('PAUSER_ROLE'), "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

await token.revokeRole(web3.utils.soliditySha3('MINTER_ROLE'), "0xF119492cC512894cA2B7Df5E16E846fDd8eEf620")
await token.revokeRole(web3.utils.soliditySha3('PAUSER_ROLE'), "0xF119492cC512894cA2B7Df5E16E846fDd8eEf620")