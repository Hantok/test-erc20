// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract INDEX is ERC20Pausable, Ownable {

    constructor() public ERC20("Index", "INDX") {
        _mint(msg.sender, 1000);
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}