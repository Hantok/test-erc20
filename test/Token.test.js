const Token = artifacts.require('Token')
const BigNumber = web3.BigNumber
require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should()

contract('Token', ([owner]) => {
    const _name = 'Token'
    const _symbol = 'TTT'
    const _amount = 100000

    beforeEach(async function () {
        this.token = await Token.new(_name, _symbol, _amount)
    })

    describe('token attributes', () => {
        it('has the correct name', async function () {
            const name = await this.token.name()
            name.should.equal(_name)
        })

        it('has the correct symbol', async function () {
            const symbol = await this.token.symbol()
            symbol.should.equal(_symbol)
        })

        it('has the correct admin role', async function () {

        })

        it('has the correct minter role', async function () {

        })

        it('has the correct pauser role', async function () {

        })

        it('has the correct decimals', async function () {
            const decimals = await this.token.decimals()
            // TODO: fix
            //decimals.should.be.bignumber.equal(18)
        })
    })
})