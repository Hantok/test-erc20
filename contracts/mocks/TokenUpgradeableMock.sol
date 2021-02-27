// SPDX-License-Identifier: MIT

import "../TokenUpgradeable.sol";

contract TokenUpgradeableMock is TokenUpgradeable {
    constructor (string memory name, string memory symbol, uint8 decimals) public TokenUpgradeable() {
        _setupDecimals(decimals);
    }

    function transferInternal(address from, address to, uint256 value) public {
        _transfer(from, to, value);
    }

    function approveInternal(address owner, address spender, uint256 value) public {
        _approve(owner, spender, value);
    }
}