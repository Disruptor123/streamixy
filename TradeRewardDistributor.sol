// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/token/ERC20/ERC20.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/security/ReentrancyGuard.sol";



/// @notice Simple staking distributor: users stake STREAM to earn rewards (STREAM)
contract TradeRewardDistributor is ReentrancyGuard {
    IERC20 public immutable stream;

    uint256 public totalStaked;
    mapping(address => uint256) public balanceOf;

    // reward accounting
    uint256 public rewardPerTokenStored;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardsAdded(uint256 amount);

    constructor(IERC20 _stream) {
        stream = _stream;
    }

    /// @notice Called when the token forwards fees to this contract
    /// If STREAM tokens are transferred here directly (via token fee), owner can call notifyRewards to account them.
    function notifyRewards(uint256 amount) external {
        require(amount > 0, "no rewards");
        // require the contract already holds the tokens (tokens must be transferred first).
        // Increase rewardPerTokenStored based on current totalStaked
        require(totalStaked > 0, "no stakers");
        rewardPerTokenStored += (amount * 1e18) / totalStaked;
        emit RewardsAdded(amount);
    }

    // --- staking ---
    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "zero");
        totalStaked += amount;
        balanceOf[msg.sender] += amount;
        require(stream.transferFrom(msg.sender, address(this), amount), "transfer failed");
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "zero");
        require(balanceOf[msg.sender] >= amount, "insufficient");
        totalStaked -= amount;
        balanceOf[msg.sender] -= amount;
        require(stream.transfer(msg.sender, amount), "transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    function claimReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            require(stream.transfer(msg.sender, reward), "transfer failed");
            emit RewardPaid(msg.sender, reward);
        }
    }

    
    // --- reward accounting modifier ---
    modifier updateReward(address account) {
        _;
        // after state changes, update user's earned snapshot
        uint256 balance = balanceOf[account];
        uint256 paid = userRewardPerTokenPaid[account];
        uint256 delta = rewardPerTokenStored - paid;
        if (delta != 0) {
            uint256 earned = (balance * delta) / 1e18;
            if (earned > 0) rewards[account] += earned;
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
    }
}

