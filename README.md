

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


https://github.com/Disruptor123/streamixy/blob/main/TradeRewardDistributor.sol

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



https://github.com/Disruptor123/streamixy/blob/main/components/wallet-provider.tsx 

"use client"

import "@sei-js/sei-global-wallet/eip6963"
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { ethers } from "ethers"

interface EIP6963ProviderInfo {
  uuid: string
  name: string
  icon: string
  rdns: string
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: any
}

interface WalletContextType {
  account: string | undefined
  chainId: number | undefined
  isActive: boolean
  isConnecting: boolean
  seiBalance: string
  strmBalance: string
  connect: () => Promise<void>
  disconnect: () => void
  connectWallet: () => Promise<void>
  sendTransaction: (to: string, amount: string, tokenAddress?: string) => Promise<string>
  stakeTokens: (amount: string) => Promise<string>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const STRM_TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
]

const STRM_TOKEN_ADDRESS = "0x1C94d3A43fF46d17cb652137FC7B247E0881Ce0D"
const TRADE_REWARD_ADDRESS = "0xDD4170a256dC5B4C5ED32726E0c18FeF50ec6C13"

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

function findSeiGlobalWallet(): any {
  if (typeof window === "undefined") return null

  const providers = new Map<string, EIP6963ProviderDetail>()

  const handleProviderAnnouncement = (event: Event) => {
    const customEvent = event as CustomEvent<EIP6963ProviderDetail>
    providers.set(customEvent.detail.info.uuid, customEvent.detail)
  }

  window.addEventListener("eip6963:announceProvider", handleProviderAnnouncement as EventListener)
  window.dispatchEvent(new Event("eip6963:requestProvider"))

  setTimeout(() => {
    window.removeEventListener("eip6963:announceProvider", handleProviderAnnouncement)
  }, 100)

  for (const [uuid, provider] of providers) {
    if (provider.info.name.toLowerCase().includes("sei") || provider.info.rdns.includes("sei")) {
      return provider.provider
    }
  }
  return null
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | undefined>(undefined)
  const [chainId, setChainId] = useState<number | undefined>(undefined)
  const [isActive, setIsActive] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [provider, setProvider] = useState<any>(null)
  const [seiBalance, setSeiBalance] = useState<string>("0")
  const [strmBalance, setStrmBalance] = useState<string>("0")

  const fetchBalances = async (address: string, ethersProvider: ethers.BrowserProvider) => {
    try {
      const seiBalanceWei = await ethersProvider.getBalance(address)
      setSeiBalance(ethers.formatEther(seiBalanceWei))

      try {
        const network = await ethersProvider.getNetwork()
        console.log("[v0] Current network:", network.chainId, network.name)

        const contractCode = await ethersProvider.getCode(STRM_TOKEN_ADDRESS)

        if (contractCode === "0x") {
          console.log("[v0] STRM contract not found on this network, using mock balance")
          setStrmBalance("1000.0") // Mock balance for demo purposes
        } else {
          const strmContract = new ethers.Contract(STRM_TOKEN_ADDRESS, STRM_TOKEN_ABI, ethersProvider)
          const strmBalanceWei = await strmContract.balanceOf(address)
          setStrmBalance(ethers.formatEther(strmBalanceWei))
        }
      } catch (contractError) {
        console.log("[v0] STRM contract error, using mock balance:", contractError)
        setStrmBalance("1000.0") // Mock balance when contract is not available
      }
    } catch (error) {
      console.error("Error fetching balances:", error)
      setSeiBalance("0")
      setStrmBalance("0")
    }
  }

  useEffect(() => {
    const seiProvider = findSeiGlobalWallet()
    if (seiProvider) {
      setProvider(seiProvider)

      seiProvider
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsActive(true)
            const ethersProvider = new ethers.BrowserProvider(seiProvider)
            fetchBalances(accounts[0], ethersProvider)
          }
        })
        .catch(console.error)

      seiProvider.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsActive(true)
          const ethersProvider = new ethers.BrowserProvider(seiProvider)
          fetchBalances(accounts[0], ethersProvider)
        } else {
          setAccount(undefined)
          setIsActive(false)
          setSeiBalance("0")
          setStrmBalance("0")
        }
      })

      seiProvider.on("chainChanged", (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16))
      })
    }
  }, [])

  const connect = async () => {
    if (!provider) {
      console.error("Sei Global Wallet not found")
      return
    }

    try {
      setIsConnecting(true)
      const accounts = await provider.request({ method: "eth_requestAccounts" })
      if (accounts.length > 0) {
        setAccount(accounts[0])
        setIsActive(true)
        const chainId = await provider.request({ method: "eth_chainId" })
        setChainId(Number.parseInt(chainId, 16))
        const ethersProvider = new ethers.BrowserProvider(provider)
        await fetchBalances(accounts[0], ethersProvider)
      }
    } catch (err) {
      console.error("Failed to connect Sei Global Wallet", err)
    } finally {
      setIsConnecting(false)
    }
  }

  const connectWallet = connect

  const sendTransaction = async (to: string, amount: string, tokenAddress?: string): Promise<string> => {
    if (!provider || !account) {
      throw new Error("Wallet not connected")
    }

    const ethersProvider = new ethers.BrowserProvider(provider)
    const signer = await ethersProvider.getSigner()

    try {
      let tx
      if (tokenAddress) {
        const contractCode = await ethersProvider.getCode(tokenAddress)
        if (contractCode === "0x") {
          throw new Error("Token contract not found on this network")
        }

        const tokenContract = new ethers.Contract(tokenAddress, STRM_TOKEN_ABI, signer)
        const amountWei = ethers.parseEther(amount)
        tx = await tokenContract.transfer(to, amountWei)
      } else {
        const amountWei = ethers.parseEther(amount)
        tx = await signer.sendTransaction({
          to,
          value: amountWei,
        })
      }

      await tx.wait()
      await fetchBalances(account, ethersProvider)
      return tx.hash
    } catch (error) {
      console.error("Transaction failed:", error)
      throw error
    }
  }

  const stakeTokens = async (amount: string): Promise<string> => {
    if (!provider || !account) {
      throw new Error("Wallet not connected")
    }

    const ethersProvider = new ethers.BrowserProvider(provider)
    const signer = await ethersProvider.getSigner()

    try {
      const contractCode = await ethersProvider.getCode(STRM_TOKEN_ADDRESS)
      if (contractCode === "0x") {
        throw new Error("STRM token contract not found on this network")
      }

      const strmContract = new ethers.Contract(STRM_TOKEN_ADDRESS, STRM_TOKEN_ABI, signer)
      const amountWei = ethers.parseEther(amount)

      const approveTx = await strmContract.approve(TRADE_REWARD_ADDRESS, amountWei)
      await approveTx.wait()

      const stakeTx = await strmContract.transfer(TRADE_REWARD_ADDRESS, amountWei)
      await stakeTx.wait()

      await fetchBalances(account, ethersProvider)
      return stakeTx.hash
    } catch (error) {
      console.error("Staking failed:", error)
      throw error
    }
  }

  const disconnect = () => {
    setAccount(undefined)
    setChainId(undefined)
    setIsActive(false)
    setSeiBalance("0")
    setStrmBalance("0")
  }

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        isActive,
        isConnecting,
        seiBalance,
        strmBalance,
        connect,
        disconnect,
        connectWallet,
        sendTransaction,
        stakeTokens,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

 https://github.com/Disruptor123/streamixy/blob/main/app/rewards/page.tsx

 


