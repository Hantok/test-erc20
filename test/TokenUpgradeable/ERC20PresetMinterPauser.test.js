const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const { expect } = require('chai');

const Token = artifacts.require('TokenUpgradeable');

contract('ERC20PresetMinterPauser', function (accounts) {
    const [ deployer, other ] = accounts;

    const name = 'MinterPauserToken';
    const symbol = 'DRT';

    const amount = new BN('5000');

    const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const MINTER_ROLE = web3.utils.soliditySha3('MINTER_ROLE');
    const PAUSER_ROLE = web3.utils.soliditySha3('PAUSER_ROLE');

    beforeEach(async function () {
        this.token = await Token.new();
        await this.token.initialize(name, symbol, amount, {from: deployer});
    });

    it('deployer has the default admin role', async function () {
        expect(await this.token.getRoleMemberCount(DEFAULT_ADMIN_ROLE)).to.be.bignumber.equal('1');
        expect(await this.token.getRoleMember(DEFAULT_ADMIN_ROLE, 0)).to.equal(deployer);
    });

    it('deployer has the minter role', async function () {
        expect(await this.token.getRoleMemberCount(MINTER_ROLE)).to.be.bignumber.equal('1');
        expect(await this.token.getRoleMember(MINTER_ROLE, 0)).to.equal(deployer);
    });

    it('deployer has the pauser role', async function () {
        expect(await this.token.getRoleMemberCount(PAUSER_ROLE)).to.be.bignumber.equal('1');
        expect(await this.token.getRoleMember(PAUSER_ROLE, 0)).to.equal(deployer);
    });

    it('minter and pauser role admin is the default admin', async function () {
        expect(await this.token.getRoleAdmin(MINTER_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
        expect(await this.token.getRoleAdmin(PAUSER_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
    });

    describe('minting', function () {
        it('deployer can mint tokens', async function () {
            const receipt = await this.token.mint(other, amount, { from: deployer });
            expectEvent(receipt, 'Transfer', { from: ZERO_ADDRESS, to: other, value: amount });

            expect(await this.token.balanceOf(other)).to.be.bignumber.equal(amount);
        });

        it('other accounts cannot mint tokens', async function () {
            await expectRevert(
                this.token.mint(other, amount, { from: other }),
                'Token: must have minter role to mint'
            );
        });
    });

    describe('pausing', function () {
        it('deployer can pause', async function () {
            const receipt = await this.token.pause({ from: deployer });
            expectEvent(receipt, 'Paused', { account: deployer });

            expect(await this.token.paused()).to.equal(true);
        });

        it('deployer can unpause', async function () {
            await this.token.pause({ from: deployer });

            const receipt = await this.token.unpause({ from: deployer });
            expectEvent(receipt, 'Unpaused', { account: deployer });

            expect(await this.token.paused()).to.equal(false);
        });

        it('cannot mint while paused', async function () {
            await this.token.pause({ from: deployer });

            await expectRevert(
                this.token.mint(other, amount, { from: deployer }),
                'ERC20Pausable: token transfer while paused'
            );
        });

        it('other accounts cannot pause', async function () {
            await expectRevert(this.token.pause({ from: other }), 'Token: must have pauser role to pause');
        });
    });

    describe('burning', function () {
        it('deployer can burn own tokens', async function () {
            const receipt = await this.token.burn(amount.subn(1), { from: deployer });
            expectEvent(receipt, 'Transfer', { from: deployer, to: ZERO_ADDRESS, value: amount.subn(1) });

            expect(await this.token.balanceOf(deployer)).to.be.bignumber.equal('1');
        });

        it('other accounts can not burn own tokens', async function () {
            await this.token.mint(other, amount, { from: deployer });

            await expectRevert(
                this.token.burn(amount, { from: other }),
                'Token: must have minter role to burn',
            );
        });
    });
});
