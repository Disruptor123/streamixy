

<img width="1515" height="665" alt="snap2" src="https://github.com/user-attachments/assets/0b6ebb61-337a-4c66-a369-2ef61ac23423" />
<img width="1366" height="671" alt="snap5" src="https://github.com/user-attachments/assets/cf666ce4-c66a-4fa4-a660-27ae5cdea5dc" />
<img width="1551" height="738" alt="snap10" src="https://github.com/user-attachments/assets/13725cb3-b1fb-4c84-af76-3ef592af15c1" />
<img width="1549" height="735" alt="snap1" src="https://github.com/user-attachments/assets/a2c22093-a58b-4b02-9577-258d0b5eb3e4" />

Introduction Statement Streamixy is a Web3-powered music AI platform that revolutionizes music ranking by tapping into the voice of the crowd. It scans major social platforms, streaming data, and radio mentions in real time, then publishes a transparent, on-chain global chart. Think of it as the Billboard for the decentralized era driven by data, not deals.

Problem Statement Today’s music charts are often shaped by opaque industry negotiations, selective reporting, and delayed data cycles. Artists without label backing struggle for fair recognition, while fans rarely see how rankings are determined. This lack of transparency erodes trust, limits artist exposure, and fails to reflect true, real-time cultural impact.

Solution Statement Streamixy delivers a trustless, data-driven alternative. Our AI aggregates live music engagement from across social platforms, streaming services, and radio, then anchors the results on-chain for full transparency and immutability. This creates a real-time, global music chart where every rank is verifiable, community-powered, and resistant to manipulation empowering both independent artists and fans to shape music history together.

https://github.com/Disruptor123/streamixy/blob/main/eliza-config.ts
https://github.com/Disruptor123/streamixy/blob/main/StreamToken.json
https://github.com/Disruptor123/streamixy/blob/main/StreamToken.sol

twitter 
https://github.com/Disruptor123/streamixy/blob/main/app/api/auth/twitter/callback/route.ts
token contract 
Stream token contract:
0x1C94d3A43fF46d17cb652137FC7B247E0881Ce0D
Trade reward address: 
0xDD4170a256dC5B4C5ED32726E0c18FeF50ec6C13
for the connectwallet:
    components/wallet-provider.tsx
    https://github.com/Disruptor123/streamixy/blob/main/components/wallet-provider.tsx  
smartcontract integration : https://github.com/Disruptor123/streamixy/blob/main/app/rewards/page.tsx

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/token/ERC20/ERC20.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/access/Ownable.sol";

(https://github.com/Disruptor123/streamixy/blob/main/StreamToken.sol)

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
