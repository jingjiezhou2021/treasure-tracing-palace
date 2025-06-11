// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is ERC20 {
    address public owner;

    constructor() ERC20("Tether USD", "USDT") {
        owner = msg.sender;
        _mint(owner, 1_000_000 * 10 ** decimals()); // Mint 1 million USDT to deployer
    }

    // Only owner can mint new tokens (if needed)
    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can mint");
        _mint(to, amount);
    }

    // Optional: burn function to destroy tokens
    function burn(address from, uint256 amount) external {
        require(msg.sender == owner, "Only owner can burn");
        _burn(from, amount);
    }
}
