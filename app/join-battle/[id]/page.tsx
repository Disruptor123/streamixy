"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Play, Pause, Heart, MessageCircle, Share2, Upload, Trophy } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function JoinBattlePage() {
  const params = useParams()
  const battleId = params.id
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [voteAmounts, setVoteAmounts] = useState<{ [key: number]: string }>({})
  const [selectedCurrency, setSelectedCurrency] = useState("STREAM")

  // Mock battle data
  const battleData = {
    id: 1,
    title: "Vampire Drill Remix Battle",
    originalSong: "Vampire - Olivia Rodrigo",
    genre: "Drill",
    participants: 247,
    timeLeft: "2d 14h",
    prize: "5,000 STRM",
    status: "active",
    image: "/vampire-drill-remix.png",
  }

  // Mock top 30 remix submissions
  const remixSubmissions = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Vampire Drill Remix #${i + 1}`,
    artist: `@RemixArtist${i + 1}`,
    duration: "2:45",
    votes: Math.floor(Math.random() * 2000) + 100,
    plays: Math.floor(Math.random() * 20000) + 1000,
    likes: Math.floor(Math.random() * 1000) + 50,
    image: "/drill-remix-cover.png",
    rank: i + 1,
  }))

  // Mock social feed data
  const socialFeed = [
    {
      id: 1,
      user: "@DrillMaster",
      avatar: "/drill-master-avatar.png",
      content: "Just dropped my vampire drill remix! 🔥 Vote for me fam #VampireDrillBattle",
      timestamp: "2m ago",
      likes: 45,
      replies: 12,
    },
    {
      id: 2,
      user: "@RemixQueen",
      avatar: "/remix-queen-avatar.png",
      content: "This battle is insane! So many fire remixes 🎵",
      timestamp: "5m ago",
      likes: 23,
      replies: 8,
    },
    {
      id: 3,
      user: "@BeatMaker",
      avatar: "/beat-maker-avatar.png",
      content: "Voting with 500 $STREAM on @DrillMaster's remix! 💎",
      timestamp: "8m ago",
      likes: 67,
      replies: 15,
    },
  ]

  const handlePlay = (remixId: number) => {
    if (currentlyPlaying === remixId) {
      setCurrentlyPlaying(null)
      setShowAudioPlayer(false)
    } else {
      setCurrentlyPlaying(remixId)
      setShowAudioPlayer(true)
    }
  }

  const handleVote = (remixId: number) => {
    const amount = voteAmounts[remixId]
    if (!amount) return
    console.log(`Voting ${amount} ${selectedCurrency} on remix ${remixId}`)
    // Add voting logic here
  }

  const handleSubmitRemix = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "audio/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log("Submitted remix:", file.name)
        // Add remix submission logic here
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Battle Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={battleData.image || "/placeholder.svg"}
                alt={battleData.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">{battleData.title}</h1>
                <p className="text-gray-400 flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePlay(0)}
                    className="border-gray-600 hover:bg-gray-800 mr-2"
                  >
                    {currentlyPlaying === 0 ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </Button>
                  <span>{battleData.originalSong}</span>
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-purple-500">{battleData.genre}</Badge>
                  <span className="text-sm text-gray-400">{battleData.participants} participants</span>
                  <span className="text-sm text-yellow-400">{battleData.timeLeft} left</span>
                  <span className="text-sm text-green-400">Prize: {battleData.prize}</span>
                </div>
              </div>
            </div>

            {/* Submit Remix Button */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => (window.location.href = `/submit-remix/${battleId}`)}
                className="bg-black text-white border border-white hover:bg-white hover:text-black"
              >
                <Upload className="w-4 h-4 mr-2" />
                Submit Your Remix
              </Button>
              <Button
                onClick={() => (window.location.href = `/battle-announcements/${battleId}`)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                📢 Announcements
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Content - Top 30 Remixes */}
            <div className="lg:col-span-3">
              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                    Top 30 Remix Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {remixSubmissions.map((remix) => (
                      <div
                        key={remix.id}
                        className={`flex items-center space-x-4 p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300 ${
                          remix.rank <= 3 ? "border border-yellow-500/30" : ""
                        }`}
                      >
                        {/* Rank */}
                        <div
                          className={`text-lg font-bold w-8 text-center ${
                            remix.rank === 1
                              ? "text-yellow-400"
                              : remix.rank === 2
                                ? "text-gray-400"
                                : remix.rank === 3
                                  ? "text-orange-600"
                                  : "text-gray-400"
                          }`}
                        >
                          #{remix.rank}
                        </div>

                        {/* Cover Art */}
                        <img
                          src={remix.image || "/placeholder.svg"}
                          alt={remix.title}
                          className="w-12 h-12 rounded object-cover"
                        />

                        {/* Track Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white truncate">{remix.title}</h3>
                          <p className="text-xs text-gray-400 truncate">{remix.artist}</p>
                        </div>

                        {/* Stats */}
                        <div className="text-xs text-gray-400">
                          <div>{remix.votes} votes</div>
                          <div>{remix.plays} plays</div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePlay(remix.id)}
                            className="border-gray-600 hover:bg-gray-800"
                          >
                            {currentlyPlaying === remix.id ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>

                          <div className="flex items-center space-x-1">
                            <Input
                              type="number"
                              placeholder="Amount"
                              value={voteAmounts[remix.id] || ""}
                              onChange={(e) => setVoteAmounts({ ...voteAmounts, [remix.id]: e.target.value })}
                              className="w-20 h-8 text-xs bg-gray-800 border-gray-600"
                            />
                            <select
                              value={selectedCurrency}
                              onChange={(e) => setSelectedCurrency(e.target.value)}
                              className="h-8 text-xs bg-gray-800 border border-gray-600 rounded px-2 text-white"
                            >
                              <option value="STREAM">STRM</option>
                              <option value="USDT">USDT</option>
                            </select>
                            <Button
                              size="sm"
                              onClick={() => handleVote(remix.id)}
                              className="bg-green-600 hover:bg-green-700 h-8 text-xs"
                            >
                              Vote
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Social Feed */}
            <div className="lg:col-span-1">
              <Card className="bg-black border-gray-700 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Battle Feed</CardTitle>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    {socialFeed.map((post) => (
                      <div key={post.id} className="border-b border-gray-700 pb-4 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={post.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{post.user[1]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-white">{post.user}</span>
                              <span className="text-xs text-gray-400">{post.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">{post.content}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-red-400">
                                <Heart className="w-3 h-3" />
                                <span>{post.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-400">
                                <MessageCircle className="w-3 h-3" />
                                <span>{post.replies}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-green-400">
                                <Share2 className="w-3 h-3" />
                              </button>
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
      {showAudioPlayer && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/drill-remix-cover.png" alt="Now Playing" className="w-12 h-12 rounded object-cover" />
              <div>
                <h4 className="text-sm font-medium text-white">Vampire Drill Remix #{currentlyPlaying}</h4>
                <p className="text-xs text-gray-400">@RemixArtist{currentlyPlaying}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                <Play className="w-4 h-4" />
              </Button>
              <div className="w-64 bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-1/3"></div>
              </div>
              <span className="text-xs text-gray-400">1:23 / 2:45</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
