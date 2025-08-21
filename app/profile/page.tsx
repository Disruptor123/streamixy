"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Share } from "lucide-react"
import { useState, useEffect } from "react"

// Mock user data
const userData = {
  username: "@MusicMaven",
  displayName: "Alex Chen",
  avatar: "/user-avatar.png",
  joinDate: "March 2024",
  bio: "Passionate music lover and remix creator. Specializing in drill and amapiano beats. Always hunting for the next viral sound.",
  verified: true,
  level: 12,
  xp: 8750,
  nextLevelXp: 10000,
  rank: 247,
  totalRank: 50000,
  stats: {
    remixesCreated: 23,
    totalVotes: 15420,
    totalPlays: 89600,
    totalLikes: 12300,
    battlesWon: 8,
    currentStreak: 3,
    tokensEarned: "45,230 STRM",
    nftsOwned: 12,
  },
  achievements: [
    {
      id: 1,
      title: "First Remix",
      description: "Created your first AI remix",
      icon: "🎵",
      earned: true,
      date: "March 15, 2024",
    },
    {
      id: 2,
      title: "Viral Hit",
      description: "Remix reached 10K plays",
      icon: "🔥",
      earned: true,
      date: "April 2, 2024",
    },
    {
      id: 3,
      title: "Battle Champion",
      description: "Won 5 remix battles",
      icon: "👑",
      earned: true,
      date: "May 18, 2024",
    },
    {
      id: 4,
      title: "Community Favorite",
      description: "Received 1000 votes",
      icon: "❤️",
      earned: true,
      date: "June 10, 2024",
    },
    {
      id: 5,
      title: "Genre Master",
      description: "Master all 6 remix genres",
      icon: "🎯",
      earned: false,
      progress: 4,
      total: 6,
    },
    {
      id: 6,
      title: "Legendary Creator",
      description: "Create 50 remixes",
      icon: "⭐",
      earned: false,
      progress: 23,
      total: 50,
    },
  ],
  recentRemixes: [
    {
      id: 1,
      title: "Vampire (Drill Remix)",
      originalArtist: "Olivia Rodrigo",
      genre: "Drill",
      votes: 1247,
      plays: 15600,
      likes: 892,
      date: "2 days ago",
      image: "/drill-remix-cover.png",
      rank: 1,
    },
    {
      id: 2,
      title: "Flowers (Amapiano Flip)",
      originalArtist: "Miley Cyrus",
      genre: "Amapiano",
      votes: 654,
      plays: 8900,
      likes: 423,
      date: "1 week ago",
      image: "/amapiano-remix-cover.png",
      rank: 3,
    },
    {
      id: 3,
      title: "Anti-Hero (Phonk Version)",
      originalArtist: "Taylor Swift",
      genre: "Phonk",
      votes: 892,
      plays: 12300,
      likes: 567,
      date: "2 weeks ago",
      image: "/phonk-remix-cover.png",
      rank: 2,
    },
  ],
  followers: 12400,
  following: 890,
  socialLinks: {
    twitter: "@MusicMaven",
    instagram: "@musicmaven_official",
    tiktok: "@musicmaven",
  },
}

export default function ProfilePage() {
  const [showSocialCard, setShowSocialCard] = useState(false)
  const [twitterConnected, setTwitterConnected] = useState(false)
  const [twitterProfile, setTwitterProfile] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check if user has connected Twitter account
    fetchTwitterProfile()

    // Check for OAuth callback parameters
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("twitter_connected") === "true") {
      fetchTwitterProfile()
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    if (urlParams.get("error")) {
      console.error("Twitter OAuth error:", urlParams.get("error"))
      setIsConnecting(false)
    }
  }, [])

  const fetchTwitterProfile = async () => {
    try {
      const response = await fetch("/api/auth/twitter/profile")
      const data = await response.json()

      if (data.connected && data.profile) {
        setTwitterProfile(data.profile)
        setTwitterConnected(true)
      }
    } catch (error) {
      console.error("Error fetching Twitter profile:", error)
    }
  }

  const handleViewSocialCard = () => {
    setShowSocialCard(true)
  }

  const handleConnectTwitter = async () => {
    setIsConnecting(true)
    try {
      // Redirect to Twitter OAuth
      window.location.href = "/api/auth/twitter"
    } catch (error) {
      console.error("Error initiating Twitter OAuth:", error)
      setIsConnecting(false)
    }
  }

  const handleDisconnectTwitter = async () => {
    try {
      await fetch("/api/auth/twitter/profile", { method: "DELETE" })
      setTwitterProfile(null)
      setTwitterConnected(false)
    } catch (error) {
      console.error("Error disconnecting Twitter:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <Card className="bg-gray-900/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                  {twitterProfile?.profile_image_url ? (
                    <img
                      src={twitterProfile.profile_image_url || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">{userData.displayName[0]}</span>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">{twitterProfile?.name || userData.displayName}</h1>
                    {(userData.verified || twitterProfile?.verified) && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-400">Verified</Badge>
                    )}
                  </div>
                  <p className="text-xl text-gray-400 mb-3">
                    {twitterProfile ? `@${twitterProfile.username}` : userData.username}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">#{userData.rank}</div>
                      <div className="text-sm text-gray-400">Global Rank</div>
                    </div>
                    {twitterProfile?.public_metrics && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {twitterProfile.public_metrics.followers_count.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">Twitter Followers</div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={handleViewSocialCard}
                    >
                      View Social Card
                    </Button>
                    {twitterConnected ? (
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-400 bg-transparent hover:bg-blue-500/10"
                        onClick={handleDisconnectTwitter}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        Connected to Twitter
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="border-gray-600 text-white bg-transparent hover:bg-gray-700"
                        onClick={handleConnectTwitter}
                        disabled={isConnecting}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        {isConnecting ? "Connecting..." : "Connect to Twitter"}
                      </Button>
                    )}
                    <Button variant="outline" className="border-gray-600 text-white bg-transparent">
                      <Share className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-900/50 border border-gray-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500">
                <User className="w-4 h-4 mr-2" />
                <span className="text-white">Overview</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Total Snap Earned</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">15,420</div>
                    <p className="text-gray-400">Total snaps received</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Total Mindshare</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">87.5%</div>
                    <p className="text-gray-400">Average mindshare score</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Total $STREAM Earned</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">45,230</div>
                    <p className="text-gray-400">$STREAM tokens earned</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Social Card Modal */}
      {showSocialCard && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowSocialCard(false)}
        >
          <div
            className="bg-gradient-to-br from-purple-900 to-pink-900 p-8 rounded-2xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                {twitterProfile?.profile_image_url ? (
                  <img
                    src={twitterProfile.profile_image_url || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">{userData.displayName[0]}</span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{userData.displayName}</h2>
              <p className="text-purple-200 mb-4">
                {twitterProfile ? `@${twitterProfile.username}` : userData.username}
              </p>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{userData.stats.remixesCreated}</div>
                  <div className="text-sm text-purple-200">Remixes</div>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center space-x-2"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=Check out my Streamixy profile! ${twitterProfile ? `@${twitterProfile.username}` : userData.username}`,
                      "_blank",
                    )
                  }
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <span>Share on Twitter</span>
                </Button>
                <Button
                  className="w-full bg-white text-purple-900 hover:bg-gray-100"
                  onClick={() => setShowSocialCard(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
