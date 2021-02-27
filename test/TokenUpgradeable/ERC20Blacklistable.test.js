const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const { expect } = require('chai');

const ERC20PausableMock = artifacts.require('TokenUpgradeable');

contract('ERC20Blacklistable', function (accounts) {
    const [ holder, recipient, anotherAccount ] = accounts;

    const initialSupply = new BN(100);

    const name = 'My Token';
    const symbol = 'MTKN';

    beforeEach(async function () {
        this.token = await ERC20PausableMock.new();
        await this.token.initialize(name, symbol, initialSupply, {from: holder});
    });

    describe('blacklistable token', function () {
        describe('blacklist events', function () {
            it('address is blacklisted', async function () {
                expect(await this.token.isBlacklisted(holder)).to.equal(false);
                const receipt = await this.token.blacklist(holder);
                expectEvent(receipt, 'Blacklisted', { account: holder });
                expect(await this.token.isBlacklisted(holder)).to.equal(true);
            });

            it('address is blacklisted, then not blacklisted', async function () {
                expect(await this.token.isBlacklisted(holder)).to.equal(false);

                const receipt = await this.token.blacklist(holder);
                expectEvent(receipt, 'Blacklisted', { account: holder });
                expect(await this.token.isBlacklisted(holder)).to.equal(true);

                const receipt1 = await this.token.unBlacklist(holder);
                expectEvent(receipt1, 'UnBlacklisted', { account: holder });
                expect(await this.token.isBlacklisted(holder)).to.equal(false);
            });
        });

        describe('transfer', function () {

            it('sender is blacklisted', async function () {

                await this.token.blacklist(holder);

                await expectRevert(this.token.transfer(recipient, initialSupply, { from: holder }),
                    'Blacklistable: sender is blacklisted'
                );
            });

            it('receiver is blacklisted', async function () {

                await this.token.blacklist(recipient);

                await expectRevert(this.token.transfer(recipient, initialSupply, { from: holder }),
                    'Blacklistable: receiver is blacklisted'
                );
            });

        });

        describe('mint and burn', function () {

            it('mint: minter is blacklisted', async function () {

                await this.token.blacklist(holder);

                await expectRevert(this.token.mint(recipient, initialSupply, { from: holder }),
                    'Token: minter is blacklisted'
                );
            });

            it('mint: receiver is blacklisted', async function () {

                await this.token.blacklist(recipient);

                await expectRevert(this.token.mint(recipient, initialSupply, { from: holder }),
                    'Blacklistable: receiver is blacklisted'
                );
            });

            it('mint: receiver is blacklisted then not blacklisted', async function () {

                await this.token.blacklist(recipient);
                await this.token.unBlacklist(recipient);

                const amount = new BN(1);
                const receipt = await this.token.mint(recipient, amount, { from: holder });

                expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(amount);

                expectEvent(receipt,'Transfer', {
                    from: ZERO_ADDRESS,
                    to: recipient,
                    value: amount,
                });
            });

            it('burner is blacklisted', async function () {

                await this.token.blacklist(holder);

                await expectRevert(this.token.burn(initialSupply, {from: holder}),
                    'Token: burner is blacklisted'
                );
            });

            it('burner is blacklisted then not blacklisted', async function () {

                await this.token.blacklist(holder);
                await this.token.unBlacklist(holder);

                const amount = new BN(1);
                const receipt = await this.token.burn(amount, { from: holder });

                expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(initialSupply.sub(amount));

                expectEvent(receipt,'Transfer', {
                    from: holder,
                    to: ZERO_ADDRESS,
                    value: amount,
                });
            });
        });

        // describe('transfer from', function () {
        //     const allowance = new BN(40);
        //
        //     beforeEach(async function () {
        //         await this.token.approve(anotherAccount, allowance, { from: holder });
        //     });
        //
        //     it('allows to transfer from when unpaused', async function () {
        //         await this.token.transferFrom(holder, recipient, allowance, { from: anotherAccount });
        //
        //         expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(allowance);
        //         expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(initialSupply.sub(allowance));
        //     });
        //
        //     it('allows to transfer when paused and then unpaused', async function () {
        //         await this.token.pause();
        //         await this.token.unpause();
        //
        //         await this.token.transferFrom(holder, recipient, allowance, { from: anotherAccount });
        //
        //         expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(allowance);
        //         expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(initialSupply.sub(allowance));
        //     });
        //
        //     it('reverts when trying to transfer from when paused', async function () {
        //         await this.token.pause();
        //
        //         await expectRevert(this.token.transferFrom(
        //             holder, recipient, allowance, { from: anotherAccount }), 'ERC20Pausable: token transfer while paused'
        //         );
        //     });
        // });
        //
        // describe('mint', function () {
        //     const amount = new BN('42');
        //
        //     it('allows to mint when unpaused', async function () {
        //         await this.token.mint(recipient, amount);
        //
        //         expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(amount);
        //     });
        //
        //     it('allows to mint when paused and then unpaused', async function () {
        //         await this.token.pause();
        //         await this.token.unpause();
        //
        //         await this.token.mint(recipient, amount);
        //
        //         expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(amount);
        //     });
        //
        //     it('reverts when trying to mint when paused', async function () {
        //         await this.token.pause();
        //
        //         await expectRevert(this.token.mint(recipient, amount),
        //             'ERC20Pausable: token transfer while paused'
        //         );
        //     });
        // });
        //
        // describe('burn', function () {
        //     const amount = new BN('42');
        //
        //     it('allows to burn when unpaused', async function () {
        //         await this.token.burn(amount);
        //
        //         expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(initialSupply.sub(amount));
        //     });
        //
        //     it('allows to burn when paused and then unpaused', async function () {
        //         await this.token.pause();
        //         await this.token.unpause();
        //
        //         await this.token.burn(amount);
        //
        //         expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(initialSupply.sub(amount));
        //     });
        //
        //     it('reverts when trying to burn when paused', async function () {
        //         await this.token.pause();
        //
        //         await expectRevert(this.token.burn(amount),
        //             'ERC20Pausable: token transfer while paused'
        //         );
        //     });
        // });
    });
});
