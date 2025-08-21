"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, Heart, Share2, TrendingUp, Users, Coins, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Mock campaign data
const campaignData = {
  1: {
    title: "Vampire (Drill Remix)",
    artist: "Olivia Rodrigo",
    albumArt: "/vampire-album-cover.png",
    artistPhoto: "/artist-photo.png",
    performanceROI: "+245%",
    rewardPool: "50,000 $STREAM",
    stakerPool: "125,000 $STREAM",
    mindshare: 89,
    sentiment: 94.2,
    totalAudience: "2.4M",
    description:
      "Experience Olivia Rodrigo's hit 'Vampire' transformed into a hard-hitting drill remix. This AI-generated remix captures the raw emotion of the original while adding the signature drill sound that's dominating social media.",
    links: {
      tiktok: "https://tiktok.com/@oliviarodrigo/video/123",
      spotify: "https://open.spotify.com/track/123",
      instagram: "https://instagram.com/p/123",
      twitter: "https://twitter.com/oliviarodrigo/status/123",
    },
  },
}

const leaderboard = [
  { rank: 1, username: "DrillMaster2024", avatar: "/drill-master-avatar.png", snaps: 15420, rewards: "2,450 $STREAM" },
  { rank: 2, username: "VampireVibes", avatar: "/hip-hop-fan-avatar.png", snaps: 12890, rewards: "1,890 $STREAM" },
  { rank: 3, username: "RemixKing", avatar: "/pop-music-fan-avatar.png", snaps: 11250, rewards: "1,650 $STREAM" },
  { rank: 4, username: "SoundWave", avatar: "/music-critic-avatar.png", snaps: 9870, rewards: "1,420 $STREAM" },
  { rank: 5, username: "BeatDropper", avatar: "/drill-master-avatar.png", snaps: 8650, rewards: "1,280 $STREAM" },
]

const twitterFeed = [
  {
    user: "@DrillMaster2024",
    content: "This Vampire drill remix is absolutely insane! 🔥 #Streamixy #VampireDrill",
    time: "2m",
    avatar: "/drill-master-avatar.png",
  },
  {
    user: "@VampireVibes",
    content: "Can't stop playing this on repeat. Olivia would be proud! 💜",
    time: "5m",
    avatar: "/hip-hop-fan-avatar.png",
  },
  {
    user: "@RemixKing",
    content: "The way this AI captured the drill essence while keeping the original emotion... chef's kiss",
    time: "8m",
    avatar: "/pop-music-fan-avatar.png",
  },
  {
    user: "@SoundWave",
    content: "Mindshare at 89%? This is going straight to #1 📈",
    time: "12m",
    avatar: "/music-critic-avatar.png",
  },
  {
    user: "@BeatDropper",
    content: "Staking everything on this remix. It's going to the moon! 🚀",
    time: "15m",
    avatar: "/drill-master-avatar.png",
  },
]

export default function CampaignPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  const campaign = campaignData[1] // Using campaign 1 as example

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    setShowPlayer(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Campaign Header */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="relative">
                  <Image
                    src={campaign.albumArt || "/placeholder.svg"}
                    alt={campaign.title}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  <Button
                    onClick={handlePlay}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-purple-500/80 hover:bg-purple-500 backdrop-blur-sm"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </Button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={campaign.artistPhoto || "/placeholder.svg"}
                      alt={campaign.artist}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h1 className="text-3xl font-bold text-white">{campaign.title}</h1>
                      <p className="text-xl text-gray-300">{campaign.artist}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{campaign.mindshare}%</div>
                      <div className="text-gray-400 text-sm">Mindshare</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{campaign.sentiment}%</div>
                      <div className="text-gray-400 text-sm">Sentiment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{campaign.totalAudience}</div>
                      <div className="text-gray-400 text-sm">Audience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{campaign.performanceROI}</div>
                      <div className="text-gray-400 text-sm">ROI</div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{campaign.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <Link href={campaign.links.tiktok}>
                      <Button
                        variant="outline"
                        className="border-pink-500 text-pink-400 hover:bg-pink-500/10 bg-transparent"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        TikTok
                      </Button>
                    </Link>
                    <Link href={campaign.links.spotify}>
                      <Button
                        variant="outline"
                        className="border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Spotify
                      </Button>
                    </Link>
                    <Link href={campaign.links.instagram}>
                      <Button
                        variant="outline"
                        className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Instagram
                      </Button>
                    </Link>
                    <Link href={campaign.links.twitter}>
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Reward Pools */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 p-6">
                  <div className="flex items-center mb-4">
                    <Coins className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">Reward Pool</h3>
                  </div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">{campaign.rewardPool}</div>
                  <p className="text-gray-300">Available for snappers and voters</p>
                </Card>

                <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30 p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">Staker Pool</h3>
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{campaign.stakerPool}</div>
                  <p className="text-gray-300">Locked by believers in this remix</p>
                </Card>
              </div>

              {/* Leaderboard */}
              <Card className="bg-gray-900/50 border-gray-800 p-6 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-yellow-400" />
                  Music Snapper Leaderboard
                </h3>

                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-yellow-400">#{user.rank}</div>
                        <Image
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.username}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-white">{user.username}</p>
                          <p className="text-gray-400 text-sm">{user.snaps} snaps</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">{user.rewards}</p>
                        <p className="text-gray-400 text-sm">earned</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Twitter Smart Feed Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900/50 border-gray-800 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Share2 className="w-5 h-5 mr-3 text-blue-400" />
                  Live Twitter Feed
                </h3>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {twitterFeed.map((tweet, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <Image
                          src={tweet.avatar || "/placeholder.svg"}
                          alt={tweet.user}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-blue-400 text-sm">{tweet.user}</span>
                            <span className="text-gray-500 text-xs">{tweet.time}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{tweet.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Twitter
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={campaign.albumArt || "/placeholder.svg"}
                alt={campaign.title}
                width={50}
                height={50}
                className="rounded"
              />
              <div>
                <p className="font-semibold text-white">{campaign.title}</p>
                <p className="text-gray-400 text-sm">{campaign.artist}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={handlePlay} variant="ghost" size="sm" className="text-white hover:text-purple-400">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-red-400">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
