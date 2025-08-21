"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Target, Calendar, Music, Vote, Share } from "lucide-react"
import { useState } from "react"

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
      icon: <Music className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Vote on 5 Remixes",
      description: "Support the community by voting",
      reward: 50,
      progress: 3,
      total: 5,
      completed: false,
      icon: <Vote className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Share a Remix",
      description: "Share your favorite remix on social media",
      reward: 25,
      progress: 1,
      total: 1,
      completed: true,
      icon: <Share className="w-5 h-5" />,
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
  const [selectedPool, setSelectedPool] = useState<number | null>(null)

  const claimRewards = (taskId: number) => {
    console.log(`Claiming rewards for task ${taskId}`)
  }

  const stakeTokens = (poolId: number) => {
    console.log(`Staking tokens in pool ${poolId}`)
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
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
              <CardContent className="p-6 text-center">
                <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{rewardsData.balance.strm.toLocaleString()}</div>
                <div className="text-yellow-400">STRM Balance</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{rewardsData.balance.staked.toLocaleString()}</div>
                <div className="text-purple-400">Staked</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList className="bg-gray-900/50 border border-gray-700">
              <TabsTrigger value="tasks" className="data-[state=active]:bg-purple-500 text-white">
                <Target className="w-4 h-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="staking" className="data-[state=active]:bg-purple-500 text-white">
                <Coins className="w-4 h-4 mr-2" />
                Staking
              </TabsTrigger>
            </TabsList>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-6">
              <div className="grid lg:grid-cols-1 gap-6">
                {/* Daily Tasks */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                      Daily Tasks
                      <Badge className="ml-2 bg-blue-500/20 text-blue-400">Resets in 8h</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {rewardsData.dailyTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          task.completed
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-gray-800/30 border-gray-600 hover:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-purple-400">{task.icon}</div>
                            <div>
                              <h3 className="font-semibold text-white">{task.title}</h3>
                              <p className="text-sm text-gray-400">{task.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-yellow-400">+{task.reward} STRM</div>
                          </div>
                        </div>
                        {task.completed ? (
                          <div className="flex items-center justify-between">
                            <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              Claim
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                              <span>Progress</span>
                              <span>
                                {task.progress} / {task.total}
                              </span>
                            </div>
                            <Progress value={(task.progress / task.total) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

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
                            <span className="text-gray-400">Your Stake</span>
                            <span className="text-white">12,000 STRM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Pending Rewards</span>
                            <span className="text-yellow-400">156.8 STRM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Lock Period</span>
                            <span className="text-white">30 days</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full bg-green-500 hover:bg-green-600">Claim Rewards (156.8 STRM)</Button>
                          <Button variant="outline" className="w-full border-gray-600 text-white bg-transparent">
                            Add More
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
