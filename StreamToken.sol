// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/token/ERC20/ERC20.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/access/Ownable.sol";


contract StreamToken is ERC20, ERC20Permit, Ownable {
    // Fee in basis points (parts per 10,000). e.g., 50 = 0.50%
    uint16 public transferFeeBps;
    address public feeRecipient;
    mapping(address => bool) public feeExempt;

    event TransferFeeUpdated(uint16 newBps, address newRecipient);
    event FeeExemptSet(address account, bool isExempt);

    constructor(address initialRecipient) ERC20("Stream", "STREAM") ERC20Permit("Stream") {
        require(initialRecipient != address(0), "invalid initial recipient");
        uint256 initialSupply = 20_000_000 * 10 ** decimals(); // 20,000,000 STREAM
        _mint(msg.sender, initialSupply); // minted to deployer by default
        // owner can later set feeRecipient / feeBps
        feeRecipient = initialRecipient;
        feeExempt[msg.sender] = true;
        feeExempt[address(this)] = true;
    }

    
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    
    function setTransferFee(uint16 _bps, address _recipient) external onlyOwner {
        require(_bps <= 2000, "fee too high"); // safety: cap at 20%
        transferFeeBps = _bps;
        feeRecipient = _recipient;
        emit TransferFeeUpdated(_bps, _recipient);
    }

    function setFeeExempt(address account, bool isExempt) external onlyOwner {
        feeExempt[account] = isExempt;
        emit FeeExemptSet(account, isExempt);
    }

   function _transfer(address sender, address recipient, uint256 amount) internal virtual override {
    if (transferFeeBps > 0 && !feeExempt[sender] && !feeExempt[recipient] && feeRecipient != address(0)) {
        uint256 fee = (amount * transferFeeBps) / 10000;
        uint256 netAmount = amount - fee;
        super._transfer(sender, feeRecipient, fee);
        super._transfer(sender, recipient, netAmount);
    } else {
        super._transfer(sender, recipient, amount);
    }
}

}
