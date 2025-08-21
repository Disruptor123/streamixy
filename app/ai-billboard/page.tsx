"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  Heart,
  MessageCircle,
  Share,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Volume2,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Mock data for demonstration
const globalChartData = [
  {
    id: 1,
    rank: 1,
    title: "Vampire",
    artist: "Olivia Rodrigo",
    album: "GUTS",
    image: "/vampire-album-cover.png",
    streams: "2.1B",
    sentiment: 94,
    change24h: "+2.5%",
    change7d: "+8.1%",
    trending: "up",
    genre: "Pop",
    duration: "3:39",
  },
  {
    id: 2,
    rank: 2,
    title: "Paint The Town Red",
    artist: "Doja Cat",
    album: "Scarlet",
    image: "/doja-cat-paint-the-town-red-inspired.png",
    streams: "1.8B",
    sentiment: 91,
    change24h: "-1.2%",
    change7d: "+3.4%",
    trending: "down",
    genre: "Hip-Hop",
    duration: "3:50",
  },
  {
    id: 3,
    rank: 3,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    image: "/generic-woman-floral-album.png",
    streams: "1.6B",
    sentiment: 88,
    change24h: "+1.8%",
    change7d: "+5.2%",
    trending: "up",
    genre: "Pop",
    duration: "3:20",
  },
  {
    id: 4,
    rank: 4,
    title: "Unholy",
    artist: "Sam Smith ft. Kim Petras",
    album: "Gloria",
    image: "/unholy-album-cover.png",
    streams: "1.4B",
    sentiment: 85,
    change24h: "0%",
    change7d: "+1.5%",
    trending: "stable",
    genre: "Pop",
    duration: "2:36",
  },
  {
    id: 5,
    rank: 5,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    image: "/placeholder-77g1x.png",
    streams: "1.3B",
    sentiment: 92,
    change24h: "+3%",
    change7d: "+0.9%",
    trending: "up",
    genre: "Pop",
    duration: "3:20",
  },
  ...Array.from({ length: 40 }, (_, i) => ({
    id: i + 11,
    rank: i + 11,
    title: `Song ${i + 11}`,
    artist: `Artist ${i + 11}`,
    album: `Album ${i + 11}`,
    image: "/placeholder.svg?height=64&width=64",
    streams: `${Math.floor(Math.random() * 800 + 100)}M`,
    sentiment: Math.floor(Math.random() * 30 + 70),
    change24h: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 5).toFixed(1)}%`,
    change7d: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 10).toFixed(1)}%`,
    trending: Math.random() > 0.5 ? "up" : "down",
    genre: ["Pop", "Hip-Hop", "R&B", "Rock", "Electronic"][Math.floor(Math.random() * 5)],
    duration: `${Math.floor(Math.random() * 2 + 2)}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`,
  })),
]

const socialFeedData = [
  {
    id: 1,
    user: "@musiccritic",
    avatar: "/music-critic-avatar.png",
    content:
      "Olivia Rodrigo's 'Vampire' is absolutely dominating the charts right now! The production on this track is insane 🔥",
    likes: 1247,
    retweets: 892,
    replies: 156,
    timestamp: "2m ago",
    sentiment: "positive",
    influence: 94,
  },
  {
    id: 2,
    user: "@hiphophead",
    avatar: "/hip-hop-fan-avatar.png",
    content:
      "Doja Cat's versatility is unmatched. Paint The Town Red shows why she's one of the most innovative artists right now",
    likes: 2156,
    retweets: 1432,
    replies: 289,
    timestamp: "5m ago",
    sentiment: "positive",
    influence: 87,
  },
  {
    id: 3,
    user: "@popstanforever",
    avatar: "/pop-music-fan-avatar.png",
    content: "The way Miley Cyrus reinvented herself with Flowers... this song is pure art and the charts reflect that",
    likes: 892,
    retweets: 445,
    replies: 78,
    timestamp: "8m ago",
    sentiment: "positive",
    influence: 76,
  },
]

const trendingArtists = [
  {
    name: "Olivia Rodrigo",
    image: "/artist-photo.png",
    followers: "12.4M",
    growth: "+15%",
    sentiment: 94,
  },
  {
    name: "Doja Cat",
    image: "/doja-cat-artist-photo.png",
    followers: "8.9M",
    growth: "+8%",
    sentiment: 91,
  },
  {
    name: "Taylor Swift",
    image: "/placeholder.svg?height=80&width=80",
    followers: "45.2M",
    growth: "+12%",
    sentiment: 92,
  },
  // Adding 47 more artists to reach 50 total
  ...Array.from({ length: 47 }, (_, i) => ({
    name: `Artist ${i + 4}`,
    image: "/placeholder.svg?height=80&width=80",
    followers: `${Math.floor(Math.random() * 20 + 1)}M`,
    growth: `${Math.random() > 0.5 ? "+" : "-"}${Math.floor(Math.random() * 20 + 1)}%`,
    sentiment: Math.floor(Math.random() * 30 + 70),
  })),
]

export default function AIBillboardPage() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const router = useRouter()

  const handlePlay = (track: any) => {
    if (currentlyPlaying === track.id) {
      setCurrentlyPlaying(null)
      setShowPlayer(false)
      setCurrentTrack(null)
    } else {
      setCurrentlyPlaying(track.id)
      setShowPlayer(true)
      setCurrentTrack(track)
    }
  }

  const handleSocialRedirect = (username: string) => {
    window.open(`https://twitter.com/${username.replace("@", "")}`, "_blank")
  }

  const handleTrackClick = (track: any) => {
    router.push(`/music/${track.id}`)
  }

  const featuredTrack = globalChartData[0]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="mb-8 relative rounded-xl overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${featuredTrack.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="p-8 flex items-center space-x-6">
              <img
                src={featuredTrack.image || "/placeholder.svg"}
                alt={`${featuredTrack.title} by ${featuredTrack.artist}`}
                className="w-32 h-32 rounded-xl object-cover shadow-2xl"
              />

              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h1 className="text-4xl font-bold text-white">{featuredTrack.title}</h1>
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 rounded-full"
                    onClick={() => handlePlay(featuredTrack)}
                  >
                    {currentlyPlaying === featuredTrack.id ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                </div>
                <p className="text-xl text-gray-300 mb-4">{featuredTrack.artist}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Rank:</span>
                    <span className="text-white ml-2">#{featuredTrack.rank}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white ml-2">$0.0234 STREAM</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Sentiment:</span>
                    <span className="text-green-400 ml-2">{featuredTrack.sentiment}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Listeners:</span>
                    <span className="text-white ml-2">{featuredTrack.streams}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Market Cap:</span>
                    <span className="text-white ml-2">$2.4M</span>
                  </div>
                </div>
                <p className="text-gray-300 mt-4">
                  Real-time global charts powered by decentralized AI • Updated every 15 seconds
                </p>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Main Content - Global Charts and Trending Artists */}
            <div className="flex-1 pr-8 space-y-6">
              {/* Chart Header */}
              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center justify-between">
                    Global Top 50
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Live</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto space-y-4">
                    {globalChartData.map((track, index) => (
                      <div
                        key={track.id}
                        className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer"
                        onClick={() => handleTrackClick(track)}
                      >
                        {/* Rank */}
                        <div className="flex items-center space-x-3">
                          <div className="text-lg text-white w-8">{track.rank}</div>
                          <div className="flex items-center">
                            {track.trending === "up" && <TrendingUp className="w-3 h-3 text-green-400" />}
                            {track.trending === "down" && <TrendingDown className="w-3 h-3 text-red-400" />}
                          </div>
                        </div>

                        {/* Album Art */}
                        <div className="relative">
                          <img
                            src={track.image || "/placeholder.svg"}
                            alt={`${track.title} by ${track.artist}`}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <Button
                            size="sm"
                            className="absolute inset-0 bg-black/60 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePlay(track)
                            }}
                          >
                            {currentlyPlaying === track.id ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate">{track.title}</h3>
                          <p className="text-gray-400 truncate">{track.artist}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {track.genre}
                            </Badge>
                            <span className="text-xs text-gray-500">{track.duration}</span>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="text-xs text-white">
                            $0.0{Math.floor(Math.random() * 9 + 1)}
                            {Math.floor(Math.random() * 99 + 10)} STREAM
                          </div>
                          <div className="text-xs text-white">{track.streams} listeners</div>
                          <div className="text-xs text-white">
                            {Math.floor(Math.random() * 50000 + 10000)} sentiment
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                            <Heart className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-400">
                            <Share className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Music Discovery */}
              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Trending Artists</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-4 max-h-96 overflow-y-auto">
                    {trendingArtists.map((artist, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                      >
                        <div className="text-center">
                          <img
                            src={artist.image || "/placeholder.svg"}
                            alt={artist.name}
                            className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                          />
                          <h3 className="text-xs text-white mb-1 truncate">{artist.name}</h3>
                          <p className="text-xs text-gray-400 mb-1">{artist.followers}</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-xs text-green-400">{artist.growth}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Stream Sidebar */}
            <div className="w-80">
              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center justify-between">
                    Social Stream
                    <Badge className="bg-blue-500/20 text-blue-400">Twitter</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {socialFeedData.map((post) => (
                      <div
                        key={post.id}
                        className="p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer"
                        onClick={() => handleSocialRedirect(post.user)}
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={post.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{post.user[1]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-semibold text-white">{post.user}</span>
                              <span className="text-xs text-gray-500">{post.timestamp}</span>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  post.influence >= 90
                                    ? "bg-purple-400"
                                    : post.influence >= 80
                                      ? "bg-blue-400"
                                      : "bg-gray-400"
                                }`}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{post.content}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Heart className="w-3 h-3" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-3 h-3" />
                                <span>{post.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ExternalLink className="w-3 h-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {showPlayer && currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-4 z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={currentTrack.image || "/placeholder.svg"}
                  alt={`${currentTrack.title} by ${currentTrack.artist}`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white">{currentTrack.title}</h4>
                  <p className="text-sm text-gray-400">{currentTrack.artist}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Shuffle className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-gray-200"
                  onClick={() => handlePlay(currentTrack)}
                >
                  {currentlyPlaying === currentTrack.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <SkipForward className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Repeat className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-400">
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowPlayer(false)}
                >
                  ✕
                </Button>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-white h-1 rounded-full" style={{ width: "35%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1:23</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      {!showPlayer && (
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
      )}
    </div>
  )
}
