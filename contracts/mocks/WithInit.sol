// SPDX-License-Identifier: MIT

import "../ERC20PresetMinterPauserUpgradeable.sol";
import "../TokenUpgradeable.sol";

contract ERC20PresetMinterPauserUpgradeableWithInit is ERC20PresetMinterPauserUpgradeable {
    constructor(string memory name, string memory symbol) public payable {
        initialize(name, symbol);
    }
}

contract TokenUpgradeableWithInit is TokenUpgradeable {
    constructor(string memory name, string memory symbol, uint256 amount) public payable {
        initialize(name, symbol, amount);
    }

    function transferInternal(address from, address to, uint256 value) public {
        _transfer(from, to, value);
    }

    function approveInternal(address owner, address spender, uint256 value) public {
        _approve(owner, spender, value);
    }
}