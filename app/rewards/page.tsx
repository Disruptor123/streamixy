"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Wallet, ArrowUpDown, Send } from "lucide-react"
import { useState } from "react"
import { useWallet } from "@/components/wallet-provider"
import { Input } from "@/components/ui/input"

// Mock rewards data
const rewardsData = {
  balance: {
    strm: 45230,
    staked: 12000,
  },
  dailyTasks: [
    {
      id: 1,
      title: "Create a Remix",
      description: "Generate your first AI remix today",
      reward: 100,
      progress: 0,
      total: 1,
      completed: false,
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Vote on 5 Remixes",
      description: "Support the community by voting",
      reward: 50,
      progress: 3,
      total: 5,
      completed: false,
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Share a Remix",
      description: "Share your favorite remix on social media",
      reward: 25,
      progress: 1,
      total: 1,
      completed: true,
      icon: <Wallet className="w-5 h-5" />,
    },
  ],
  stakingPools: [
    {
      id: 1,
      name: "STRM Staking Pool",
      apy: 12.5,
      totalStaked: "2.4M STRM",
      userStaked: 12000,
      rewards: 156.8,
      lockPeriod: "30 days",
      icon: <Coins className="w-6 h-6 text-yellow-400" />,
    },
  ],
}

export default function RewardsPage() {
  const { account, connectWallet, seiBalance, strmBalance, sendTransaction, stakeTokens } = useWallet()
  const [selectedPool, setSelectedPool] = useState<number | null>(null)
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [isTransacting, setIsTransacting] = useState(false)
  const [stakeAmount, setStakeAmount] = useState("")

  const handleSendSei = async () => {
    if (!sendAmount || !sendAddress) return

    setIsTransacting(true)
    try {
      const txHash = await sendTransaction(sendAddress, sendAmount)
      console.log("Transaction sent:", txHash)
      alert(`Transaction sent! Hash: ${txHash}`)
      setSendAmount("")
      setSendAddress("")
    } catch (error) {
      console.error("Send failed:", error)
      alert("Transaction failed")
    } finally {
      setIsTransacting(false)
    }
  }

  const handleSendStrm = async () => {
    if (!sendAmount || !sendAddress) return

    setIsTransacting(true)
    try {
      const txHash = await sendTransaction(sendAddress, sendAmount, "0x1C94d3A43fF46d17cb652137FC7B247E0881Ce0D")
      console.log("STRM Transaction sent:", txHash)
      alert(`STRM Transaction sent! Hash: ${txHash}`)
      setSendAmount("")
      setSendAddress("")
    } catch (error) {
      console.error("STRM Send failed:", error)
      alert("STRM Transaction failed")
    } finally {
      setIsTransacting(false)
    }
  }

  const handleStake = async () => {
    if (!stakeAmount) return

    setIsTransacting(true)
    try {
      const txHash = await stakeTokens(stakeAmount)
      console.log("Staking transaction:", txHash)
      alert(`Staking initiated! Hash: ${txHash}`)
      setStakeAmount("")
    } catch (error) {
      console.error("Staking failed:", error)
      alert("Staking failed")
    } finally {
      setIsTransacting(false)
    }
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <Wallet className="w-24 h-24 text-purple-400 mb-6" />
              <h1 className="text-4xl font-bold mb-4 text-white">Connect Your Wallet</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-md">
                Please connect your Sei Global Wallet to access rewards and earning features
              </p>
              <Button
                onClick={connectWallet}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">Rewards & Earning</h1>
            <p className="text-xl text-gray-300 mb-6">
              Earn STRM tokens by creating, voting, and participating in the Streamixy ecosystem
            </p>
          </div>

          {/* Balance Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-black border-yellow-500/30">
              <CardContent className="p-6 text-center">
                <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {Number.parseFloat(strmBalance).toLocaleString()}
                </div>
                <div className="text-yellow-400">STRM Balance</div>
              </CardContent>
            </Card>
            <Card className="bg-black border-blue-500/30">
              <CardContent className="p-6 text-center">
                <Wallet className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{Number.parseFloat(seiBalance).toFixed(4)}</div>
                <div className="text-blue-400">SEI Balance</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900/50 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <ArrowUpDown className="w-6 h-6" />
                Send & Receive
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Send Tokens</h3>
                  <Input
                    placeholder="Recipient Address"
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Input
                    placeholder="Amount"
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSendSei}
                      disabled={isTransacting || !sendAmount || !sendAddress}
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send SEI
                    </Button>
                    <Button
                      onClick={handleSendStrm}
                      disabled={isTransacting || !sendAmount || !sendAddress}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send STRM
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Receive</h3>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Your Wallet Address:</p>
                    <p className="text-white font-mono text-sm break-all">{account}</p>
                    <Button
                      onClick={() => navigator.clipboard.writeText(account || "")}
                      className="mt-2 bg-gray-700 hover:bg-gray-600"
                      size="sm"
                    >
                      Copy Address
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="staking" className="space-y-6">
            <TabsList className="bg-gray-900/50 border border-gray-700">
              <TabsTrigger value="staking" className="data-[state=active]:bg-purple-500 text-white">
                <Coins className="w-4 h-4 mr-2" />
                Staking
              </TabsTrigger>
            </TabsList>

            {/* Staking Tab */}
            <TabsContent value="staking" className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Staking Pools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-1 gap-6">
                    <Card className="bg-gray-800/30 border-gray-600 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <Coins className="w-6 h-6 text-yellow-400 mx-auto" />
                          <h3 className="font-semibold text-white mt-2">STRM Staking Pool</h3>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span className="text-gray-400">APY</span>
                            <span className="font-semibold text-green-400">12.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Staked</span>
                            <span className="text-white">2.4M STRM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Your Balance</span>
                            <span className="text-white">{Number.parseFloat(strmBalance).toFixed(2)} STRM</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Input
                            placeholder="Amount to stake"
                            type="number"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Button
                            onClick={handleStake}
                            disabled={isTransacting || !stakeAmount}
                            className="w-full bg-purple-500 hover:bg-purple-600"
                          >
                            {isTransacting ? "Processing..." : "Stake STRM Tokens"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900/50 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Streamixy
              </div>
              <p className="text-gray-400 text-sm">Decentralized AI music platform powered by real-time crowd data</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Jukebox
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Radio Stations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Podcasts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    DEX Trading
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">$STREAM</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tokenomics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Staking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Get Listed</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Submit Music
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Apply as Label
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Distributor
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 Streamixy. All rights reserved.</div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
