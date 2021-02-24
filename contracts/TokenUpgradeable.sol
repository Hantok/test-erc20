// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/GSN/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "./abstract/ERC20Blacklistable.sol";

/**
 * @dev {ERC20} token, including:
 *
 *  - a minter role that allows for token burning (destroy)
 *  - a minter role that allows for token minting (creation)
 *  - a pauser role that allows to stop all token transfers
 *  - a blocker role that adds/removes addressed to/from blacklist
 *
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles - head to its documentation for details.
 *
 * The account that deploys the contract will be granted the minter and pauser
 * roles, as well as the default admin role, which will let it grant both minter
 * and pauser roles to other accounts.
 */
contract TokenUpgradeable is Initializable, ContextUpgradeable, AccessControlUpgradeable, ERC20PausableUpgradeable, ERC20Blacklistable {
    function initialize(string memory name, string memory symbol, uint256 amount) public virtual initializer {
        __TokenUpgradeable_init(name, symbol);
        mint(_msgSender(), amount);
    }
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant BLOCKER_ROLE = keccak256("BLOCKER_ROLE");

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `PAUSER_ROLE` to the
     * account that deploys the contract.
     *
     * See {ERC20-constructor}.
     */
    function __TokenUpgradeable_init(string memory name, string memory symbol) internal initializer {
        __Context_init_unchained();
        __AccessControl_init_unchained();
        __ERC20_init_unchained(name, symbol);
        __Pausable_init_unchained();
        __ERC20Pausable_init_unchained();
        __ERC20Blacklistable_init_unchained();
        __ERC20PresetMinterPauser_init_unchained(name, symbol);
    }

    function __ERC20PresetMinterPauser_init_unchained(string memory name, string memory symbol) internal initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());
        _setupRole(BLOCKER_ROLE, _msgSender());
    }

    /**
     * @dev Creates `amount` new tokens for `to`.
     *
     * See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 amount) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "Token: must have minter role to mint");
        require(!isBlacklisted(_msgSender()), "Token: minter is blacklisted");
        _mint(to, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * See {ERC20-_burn}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function burn(uint256 amount) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "Token: must have minter role to burn");
        require(!isBlacklisted(_msgSender()), "Token: burner is blacklisted");
        _burn(_msgSender(), amount);
    }

    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC20Pausable} and {Pausable-_pause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function pause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "Token: must have pauser role to pause");
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC20Pausable} and {Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function unpause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "Token: must have pauser role to unpause");
        _unpause();
    }

    /**
     * @dev Add address to blacklist.
     *
     * Requirements:
     *
     * - the caller must have the `BLOCKER_ROLE`.
     */
    function blacklist(address account) public virtual {
        require(hasRole(BLOCKER_ROLE, _msgSender()), "Token: must have blocker role to block account");
        _blacklist(account);
    }

    /**
     * @dev Removes address from blacklist.
     *
     * Requirements:
     *
     * - the caller must have the `BLOCKER_ROLE`.
     */
    function unBlacklist(address account) public virtual {
        require(hasRole(BLOCKER_ROLE, _msgSender()), "Token: must have blocker role to unblock account");
        _unBlacklist(account);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC20Blacklistable, ERC20PausableUpgradeable) {
        super._beforeTokenTransfer(from, to, amount);
    }
    uint256[50] private __gap;
}