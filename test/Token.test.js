//// TODO - Need to fix tests
//
//const { accounts, contract } = require('@openzeppelin/test-environment');
//
//const { BN, expectRevert } = require('@openzeppelin/test-helpers');
//
//const { expect } = require('chai');
//
//const ERC20PausableMock = contract.fromArtifact('Token');
//
//describe('Token', function () {
//  const [ holder, recipient, anotherAccount ] = accounts;
//
//  const initialSupply = new BN(100000);
//
//  const name = 'My Token';
//  const symbol = 'MTKN';
//
//  beforeEach(async function () {
//    this.token = await ERC20PausableMock.new(name, symbol, initialSupply, { from: holder });
//  });
//
//  describe('pausable token', function () {
//    describe('transfer', function () {
//      it('allows to transfer when unpaused', async function () {
//        await this.token.transfer(recipient, initialSupply, { from: accounts[0] });
//
//        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal('0');
//        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(initialSupply);
//      });
//
//      it('allows to transfer when paused and then unpaused', async function () {
//        await this.token.pause();
//        await this.token.unpause();
//
//        await this.token.transfer(recipient, initialSupply, { from: holder });
//
//        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal('0');
//        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(initialSupply);
//      });
//
//      it('reverts when trying to transfer when paused', async function () {
//        await this.token.pause();
//
//        await expectRevert(this.token.transfer(recipient, initialSupply, { from: holder }),
//          'ERC20Pausable: token transfer while paused'
//        );
//      });
//    });
//
//    describe('transfer from', function () {
//      const allowance = new BN(40);
//
//      beforeEach(async function () {
//        await this.token.approve(anotherAccount, allowance, { from: holder });
//      });
//
//      it('allows to transfer from when unpaused', async function () {
//        await this.token.transferFrom(holder, recipient, allowance, { from: anotherAccount });
//
//        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(allowance);
//        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(initialSupply.sub(allowance));
//      });
//
//      it('allows to transfer when paused and then unpaused', async function () {
//        await this.token.pause();
//        await this.token.unpause();
//
//        await this.token.transferFrom(holder, recipient, allowance, { from: anotherAccount });
//
//        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(allowance);
//        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(initialSupply.sub(allowance));
//      });
//
//      it('reverts when trying to transfer from when paused', async function () {
//        await this.token.pause();
//
//        await expectRevert(this.token.transferFrom(
//          holder, recipient, allowance, { from: anotherAccount }), 'ERC20Pausable: token transfer while paused'
//        );
//      });
//    });
//
//    describe('mint', function () {
//      const amount = new BN('42');
//
//      it('allows to mint when unpaused', async function () {
//        await this.token.mint(recipient, amount);
//
//        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(amount);
//      });
//
//      it('allows to mint when paused and then unpaused', async function () {
//        await this.token.pause();
//        await this.token.unpause();
//
//        await this.token.mint(recipient, amount);
//
//        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(amount);
//      });
//
//      it('reverts when trying to mint when paused', async function () {
//        await this.token.pause();
//
//        await expectRevert(this.token.mint(recipient, amount),
//          'ERC20Pausable: token transfer while paused'
//        );
//      });
//    });
//
//    describe('burn', function () {
//      const amount = new BN('42');
//
//      it('allows to burn when unpaused', async function () {
//        await this.token.burn(holder, amount);
//
//        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(initialSupply.sub(amount));
//      });
//
//      it('allows to burn when paused and then unpaused', async function () {
//        await this.token.pause();
//        await this.token.unpause();
//
//        await this.token.burn(holder, amount);
//
//        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(initialSupply.sub(amount));
//      });
//
//      it('reverts when trying to burn when paused', async function () {
//        await this.token.pause();
//
//        await expectRevert(this.token.burn(holder, amount),
//          'ERC20Pausable: token transfer while paused'
//        );
//      });
//    });
//
//    describe('setting role admin', function () {
//        beforeEach(async function () {
//          const receipt = await this.accessControl.setRoleAdmin(ROLE, OTHER_ROLE);
//          expectEvent(receipt, 'RoleAdminChanged', {
//            role: ROLE,
//            previousAdminRole: DEFAULT_ADMIN_ROLE,
//            newAdminRole: OTHER_ROLE,
//          });
//
//          await this.accessControl.grantRole(OTHER_ROLE, otherAdmin, { from: admin });
//        });
//
//        it('a role\'s admin role can be changed', async function () {
//          expect(await this.accessControl.getRoleAdmin(ROLE)).to.equal(OTHER_ROLE);
//        });
//
//        it('the new admin can grant roles', async function () {
//          const receipt = await this.accessControl.grantRole(ROLE, authorized, { from: otherAdmin });
//          expectEvent(receipt, 'RoleGranted', { account: authorized, role: ROLE, sender: otherAdmin });
//        });
//
//        it('the new admin can revoke roles', async function () {
//          await this.accessControl.grantRole(ROLE, authorized, { from: otherAdmin });
//          const receipt = await this.accessControl.revokeRole(ROLE, authorized, { from: otherAdmin });
//          expectEvent(receipt, 'RoleRevoked', { account: authorized, role: ROLE, sender: otherAdmin });
//        });
//
//        it('a role\'s previous admins no longer grant roles', async function () {
//          await expectRevert(
//            this.accessControl.grantRole(ROLE, authorized, { from: admin }),
//            'AccessControl: sender must be an admin to grant'
//          );
//        });
//
//        it('a role\'s previous admins no longer revoke roles', async function () {
//          await expectRevert(
//            this.accessControl.revokeRole(ROLE, authorized, { from: admin }),
//            'AccessControl: sender must be an admin to revoke'
//          );
//        });
//    });
//  });
//});
