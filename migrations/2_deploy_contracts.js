var Token = artifacts.require("./Token.sol");

module.exports = function (deployer) {
    const name = 'Token'
    const symbol = 'TTT'
    const amount = 100000

    deployer.deploy(Token, name, symbol, amount);
};