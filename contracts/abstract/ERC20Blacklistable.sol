// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/GSN/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./Blacklistable.sol";

pragma solidity >=0.6.0 <0.8.0;

/**
 * @title Blacklistable Token
 */
abstract contract ERC20Blacklistable is Initializable, ERC20Upgradeable, Blacklistable {
    /**
     * @dev Initializes the contract.
     */
    function __ERC20Blacklistable_init() internal initializer {
        __Context_init_unchained();
        __Blacklistable_init_unchained();
        __ERC20Blacklistable_init_unchained;
    }

    function __ERC20Blacklistable_init_unchained() internal initializer {}

    /**
     * @dev See {ERC20-_beforeTokenTransfer}.
     *
     * Requirements:
     *
     * - the sender must not be blacklisted
     * - the receiver must not be blacklisted
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(!blacklisted[from], "Blacklistable: sender is blacklisted");
        require(!blacklisted[to], "Blacklistable: receiver is blacklisted");
    }
    uint256[50] private __gap;
}
