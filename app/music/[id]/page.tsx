"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  BarChart3,
  Share2,
  Twitter,
  Play,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react"

export default function MusicContentPage() {
  const params = useParams()
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [stakeAmount, setStakeAmount] = useState("")
  const [stakeType, setStakeType] = useState<"long" | "short">("long")
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [currency, setCurrency] = useState<"USDT" | "STR">("STR")
  const [leverage, setLeverage] = useState(2)
  const [listenerPrediction, setListenerPrediction] = useState("")
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)

  const musicData = {
    id: params.id,
    title: "Vampire (Drill Remix)",
    artist: "Olivia Rodrigo",
    albumArt: "/vampire-drill-remix.png",
    tokenPrice: 0.0234,
    mindshare: 87.5,
    sentiment: 156789,
    marketCap: 2340000,
    ath: "2024-01-15",
    change24h: "+12.5%",
    change7d: "+34.2%",
    globalReach: 2500000,
    earning24h: 45600,
    goodSentiment: 78,
    badSentiment: 22,
    totalCalls: 45623,
    platforms: {
      spotify: "https://spotify.com/artist/olivia-rodrigo",
      appleMusic: "https://music.apple.com/artist/olivia-rodrigo",
      youtube: "https://youtube.com/olivia-rodrigo",
      tiktok: "https://tiktok.com/@oliviarodrigo",
      twitter: "https://twitter.com/oliviarodrigo",
    },
  }

  const generateChartData = () => {
    return Array.from({ length: 50 }, (_, i) => ({
      time: Date.now() - (50 - i) * 3600000,
      price: 0.02 + Math.random() * 0.01,
      sentiment: 150000 + Math.random() * 20000,
      listeners: 1000 + Math.random() * 500,
      volume: Math.random() * 1000000,
    }))
  }

  const chartData = generateChartData()

  const topSnappers = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Snapper ${i + 1}`,
    avatar: `/hip-hop-fan-avatar.png`,
    mindshare: Math.floor(Math.random() * 100),
    followers: Math.floor(Math.random() * 10000),
    rank: i + 1,
  }))

  const smartFeeds = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    user: `@snapper${i + 1}`,
    avatar: `/pop-music-fan-avatar.png`,
    content: `Just snapped on Vampire (Drill Remix)! This track is fire 🔥 #Streamixy`,
    time: `${Math.floor(Math.random() * 24)}h`,
    twitterUrl: `https://twitter.com/snapper${i + 1}`,
  }))

  const handlePlayClick = () => {
    setShowAudioPlayer(true)
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-900/30 border-r border-gray-800 overflow-y-auto h-screen sticky top-0">
          <div className="p-6 space-y-4">
            {/* Music Info Card */}
            <Card className="bg-gray-900/70 border-gray-700 p-6">
              <div className="flex items-start space-x-4 mb-6">
                <Image
                  src={musicData.albumArt || "/placeholder.svg"}
                  alt={musicData.title}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-white font-medium text-lg">{musicData.title}</h3>
                  <p className="text-gray-400">{musicData.artist}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePlayClick}
                  className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-green-400 hover:bg-green-900/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Spotify
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:bg-gray-800">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apple Music
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-red-400 hover:bg-red-900/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-pink-400 hover:bg-pink-900/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  TikTok
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-blue-400 hover:bg-blue-900/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </Card>

            {/* Community Sentiment Card */}
            <Card className="bg-black border-gray-700 p-6">
              <h4 className="text-white font-medium mb-4 text-lg">Community Sentiment</h4>
              <p className="text-gray-400 mb-4">Total Calls: {musicData.totalCalls.toLocaleString()}</p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-green-400">Good Sentiment</span>
                    <span className="text-green-400 font-medium">{musicData.goodSentiment}%</span>
                  </div>
                  <Progress value={musicData.goodSentiment} className="h-3 bg-gray-800" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-red-400">Bad Sentiment</span>
                    <span className="text-red-400 font-medium">{musicData.badSentiment}%</span>
                  </div>
                  <Progress value={musicData.badSentiment} className="h-3 bg-gray-800" />
                </div>
              </div>
            </Card>

            {/* Market Data Card */}
            <Card className="bg-black border-gray-700 p-6">
              <h4 className="text-white font-medium mb-4 text-lg">Market Data</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span className="text-white font-medium">${musicData.marketCap.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Price</span>
                  <span className="text-purple-400">{musicData.tokenPrice} $STREAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ATH Date</span>
                  <span className="text-white">{musicData.ath}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">24h</span>
                  <span className="text-green-400">{musicData.change24h}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">7d</span>
                  <span className="text-green-400">{musicData.change7d}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Trading Chart */}
            <Card className="bg-gray-900/70 border-gray-700 p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-8">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Price</p>
                    <span className="text-lg text-purple-400">{musicData.tokenPrice} $STREAM</span>
                  </div>
                  <span className="text-purple-400 text-xs">Mindshare: {musicData.mindshare}%</span>
                  <span className="text-gray-400 text-xs">Sentiment: {musicData.sentiment.toLocaleString()}</span>
                </div>
              </div>

              {/* Main Candlestick Chart */}
              <div className="h-96 bg-black rounded-lg flex items-center justify-center border border-gray-800">
                <div className="text-center">
                  <BarChart3 className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Real-time Trading Chart</p>
                  <p className="text-gray-500">Advanced candlestick chart with sentiment & listener data</p>
                </div>
              </div>
            </Card>

            {/* Global Reach & Earnings */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gray-900/70 border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-400 text-xs">Global Reach</span>
                </div>
                <p className="text-2xl text-white">{musicData.globalReach.toLocaleString()}</p>
              </Card>
              <Card className="bg-gray-900/70 border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <span className="text-gray-400 text-xs">24h Earnings</span>
                </div>
                <p className="text-2xl text-white">${musicData.earning24h.toLocaleString()}</p>
              </Card>
            </div>

            {/* Staking Section */}
            <Card className="bg-gray-900/70 border-gray-700 p-8">
              <h3 className="text-sm text-white mb-6">Stake to Go Long or Short</h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <Button
                  variant={stakeType === "long" ? "default" : "outline"}
                  onClick={() => setStakeType("long")}
                  className={`h-6 text-xs ${
                    stakeType === "long" ? "bg-green-600 hover:bg-green-700" : "border-green-600 text-green-400"
                  }`}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Long Position
                </Button>
                <Button
                  variant={stakeType === "short" ? "default" : "outline"}
                  onClick={() => setStakeType("short")}
                  className={`h-6 text-xs ${stakeType === "short" ? "bg-red-600 hover:bg-red-700" : "border-red-600 text-red-400"}`}
                >
                  <TrendingDown className="w-3 h-3 mr-1" />
                  Short Position
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded-lg px-3 py-1 text-white text-xs"
                    />
                    <div className="absolute right-2 top-1">
                      <button
                        onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                        className="flex items-center space-x-1 text-gray-400 hover:text-white text-xs"
                      >
                        <span>{currency}</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      {showCurrencyDropdown && (
                        <div className="absolute top-6 right-0 bg-gray-800 border border-gray-700 rounded-lg py-1 z-10">
                          <button
                            onClick={() => {
                              setCurrency("STR")
                              setShowCurrencyDropdown(false)
                            }}
                            className="block w-full px-3 py-1 text-left text-xs text-gray-300 hover:bg-gray-700"
                          >
                            STR
                          </button>
                          <button
                            onClick={() => {
                              setCurrency("USDT")
                              setShowCurrencyDropdown(false)
                            }}
                            className="block w-full px-3 py-1 text-left text-xs text-gray-300 hover:bg-gray-700"
                          >
                            USDT
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 text-xs">Open Position</Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-2">Leverage & Risk</label>
                    <select
                      value={leverage}
                      onChange={(e) => setLeverage(Number(e.target.value))}
                      className="w-full bg-black border border-gray-700 rounded-lg px-2 py-1 text-white text-xs"
                    >
                      {Array.from({ length: 50 }, (_, i) => (i + 1) * 2).map((x) => (
                        <option key={x} value={x}>
                          {x}x
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-2">Listener Prediction</label>
                    <input
                      type="number"
                      placeholder="Predict listeners"
                      value={listenerPrediction}
                      onChange={(e) => setListenerPrediction(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded-lg px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Top 25 Snappers */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Top 25 Snappers</h3>
              <div className="space-y-3">
                {topSnappers.slice(0, 10).map((snapper) => (
                  <div key={snapper.id} className="flex items-center justify-between p-4 bg-black rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 w-8 text-xs">#{snapper.rank}</span>
                      <Image
                        src={snapper.avatar || "/placeholder.svg"}
                        alt={snapper.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span className="text-white text-xs">{snapper.name}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <span className="text-purple-400 text-xs">{snapper.mindshare}%</span>
                      <span className="text-gray-400 text-xs">{snapper.followers.toLocaleString()}</span>
                      <Button size="sm" variant="ghost" className="text-blue-400">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-gray-900/30 border-l border-gray-800 overflow-y-auto h-screen sticky top-0">
          <div className="p-6">
            <Card className="bg-gray-900/70 border-gray-700 p-6 h-full">
              <h3 className="text-xl font-bold text-white mb-6">Smart Feeds</h3>
              <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                {smartFeeds.map((feed) => (
                  <div
                    key={feed.id}
                    className="p-4 bg-black rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                    onClick={() => window.open(feed.twitterUrl, "_blank")}
                  >
                    <div className="flex items-start space-x-3">
                      <Image
                        src={feed.avatar || "/placeholder.svg"}
                        alt={feed.user}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-blue-400 font-medium">{feed.user}</span>
                          <span className="text-gray-500 text-sm">{feed.time}</span>
                        </div>
                        <p className="text-gray-300">{feed.content}</p>
                      </div>
                      <Twitter className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {showAudioPlayer && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <Image
                src={musicData.albumArt || "/placeholder.svg"}
                alt={musicData.title}
                width={50}
                height={50}
                className="rounded"
              />
              <div>
                <p className="text-white font-medium">{musicData.title}</p>
                <p className="text-gray-400 text-sm">{musicData.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setIsPlaying(!isPlaying)} className="bg-purple-600 hover:bg-purple-700">
                <Play className="w-4 h-4" />
              </Button>
              <Button onClick={() => setShowAudioPlayer(false)} variant="ghost" className="text-gray-400">
                ×
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900/50 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Streamixy</h3>
              <p className="text-gray-400">Decentralized AI music platform</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">$STREAM</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/tokenomics" className="text-gray-400 hover:text-white transition-colors">
                    Tokenomics
                  </Link>
                </li>
                <li>
                  <Link href="/staking" className="text-gray-400 hover:text-white transition-colors">
                    Staking
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Get Listed</h4>
              <ul className="space-y-2 mb-6">
                <li>
                  <Link href="/submit-music" className="text-gray-400 hover:text-white transition-colors">
                    Submit Music
                  </Link>
                </li>
                <li>
                  <Link href="/apply-label" className="text-gray-400 hover:text-white transition-colors">
                    Apply as Label
                  </Link>
                </li>
              </ul>

              <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://twitter.com"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    Twitter <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://telegram.org"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    Telegram <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Streamixy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
