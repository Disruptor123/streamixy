"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  Heart,
  Share,
  Trophy,
  Music,
  Sliders,
  Upload,
  Vote,
  Crown,
  TrendingUp,
  Sparkles,
  Download,
} from "lucide-react"
import { useState } from "react"

// Mock data for remix battles
const remixBattles = [
  {
    id: 1,
    title: "Vampire Drill Remix Battle",
    originalSong: "Vampire - Olivia Rodrigo",
    genre: "Drill",
    participants: 247,
    timeLeft: "2d 14h",
    prize: "5,000 STRM",
    status: "active",
    image: "/vampire-drill-remix.png",
    topSubmission: {
      artist: "@DrillMaster",
      votes: 1247,
      plays: 15600,
    },
  },
  {
    id: 2,
    title: "Paint The Town Red Amapiano",
    originalSong: "Paint The Town Red - Doja Cat",
    genre: "Amapiano",
    participants: 189,
    timeLeft: "5d 8h",
    prize: "3,500 STRM",
    status: "active",
    image: "/amapiano-remix.png",
    topSubmission: {
      artist: "@AmaPianoKing",
      votes: 892,
      plays: 12300,
    },
  },
  {
    id: 3,
    title: "Flowers Phonk Challenge",
    originalSong: "Flowers - Miley Cyrus",
    genre: "Phonk",
    participants: 156,
    timeLeft: "1d 3h",
    prize: "2,000 STRM",
    status: "ending-soon",
    image: "/phonk-remix.png",
    topSubmission: {
      artist: "@PhonkPhantom",
      votes: 654,
      plays: 8900,
    },
  },
]

// Mock data for remix submissions - expanded to top 10
const remixSubmissions = [
  {
    id: 1,
    title: "Vampire (Drill Remix)",
    artist: "@DrillMaster",
    originalArtist: "Olivia Rodrigo",
    genre: "Drill",
    duration: "2:45",
    votes: 1247,
    plays: 15600,
    likes: 892,
    image: "/drill-remix-cover.png",
    waveform: "/drill-waveform.png",
    rank: 1,
    trending: true,
  },
  {
    id: 2,
    title: "Paint The Town Red (Amapiano Flip)",
    artist: "@AmaPianoKing",
    originalArtist: "Doja Cat",
    genre: "Amapiano",
    duration: "3:12",
    votes: 892,
    plays: 12300,
    likes: 567,
    image: "/amapiano-remix-cover.png",
    waveform: "/amapiano-waveform.png",
    rank: 2,
    trending: false,
  },
  {
    id: 3,
    title: "Flowers (Phonk Version)",
    artist: "@PhonkPhantom",
    originalArtist: "Miley Cyrus",
    genre: "Phonk",
    duration: "2:58",
    votes: 654,
    plays: 8900,
    likes: 423,
    image: "/phonk-remix-cover.png",
    waveform: "/phonk-waveform.png",
    rank: 3,
    trending: true,
  },
  {
    id: 4,
    title: "Unholy (Hyperpop Remix)",
    artist: "@HyperKing",
    originalArtist: "Sam Smith",
    genre: "Hyperpop",
    duration: "2:33",
    votes: 543,
    plays: 7800,
    likes: 321,
    image: "/placeholder-77g1x.png",
    rank: 4,
    trending: false,
  },
  {
    id: 5,
    title: "Anti-Hero (Drill Flip)",
    artist: "@DrillQueen",
    originalArtist: "Taylor Swift",
    genre: "Drill",
    duration: "3:01",
    votes: 487,
    plays: 6900,
    likes: 298,
    image: "/placeholder-77g1x.png",
    rank: 5,
    trending: true,
  },
  {
    id: 6,
    title: "As It Was (Phonk Remix)",
    artist: "@PhonkMaster",
    originalArtist: "Harry Styles",
    genre: "Phonk",
    duration: "2:47",
    votes: 421,
    plays: 5600,
    likes: 267,
    image: "/placeholder-77g1x.png",
    rank: 6,
    trending: false,
  },
  {
    id: 7,
    title: "Bad Habit (Amapiano Mix)",
    artist: "@AmaPianoQueen",
    originalArtist: "Steve Lacy",
    genre: "Amapiano",
    duration: "3:15",
    votes: 398,
    plays: 5200,
    likes: 234,
    image: "/placeholder-77g1x.png",
    rank: 7,
    trending: true,
  },
  {
    id: 8,
    title: "Heat Waves (Drill Version)",
    artist: "@DrillKing",
    originalArtist: "Glass Animals",
    genre: "Drill",
    duration: "2:52",
    votes: 356,
    plays: 4800,
    likes: 198,
    image: "/placeholder-77g1x.png",
    rank: 8,
    trending: false,
  },
  {
    id: 9,
    title: "Stay (Hyperpop Flip)",
    artist: "@HyperQueen",
    originalArtist: "The Kid LAROI",
    genre: "Hyperpop",
    duration: "2:28",
    votes: 312,
    plays: 4200,
    likes: 176,
    image: "/placeholder-77g1x.png",
    rank: 9,
    trending: true,
  },
  {
    id: 10,
    title: "Industry Baby (Phonk Mix)",
    artist: "@PhonkLord",
    originalArtist: "Lil Nas X",
    genre: "Phonk",
    duration: "2:41",
    votes: 287,
    plays: 3900,
    likes: 154,
    image: "/placeholder-77g1x.png",
    rank: 10,
    trending: false,
  },
]

const leaderboardData = [
  {
    rank: 1,
    user: "@DrillMaster",
    avatar: "/drill-master-avatar.png",
    totalVotes: 15420,
    remixes: 23,
    wins: 8,
    winRate: 34.8,
    streak: 3,
    tokens: "45,230 STRM",
  },
  {
    rank: 2,
    user: "@AmaPianoKing",
    avatar: "/amapiano-king-avatar.png",
    totalVotes: 12890,
    remixes: 19,
    wins: 6,
    winRate: 31.6,
    streak: 2,
    tokens: "38,940 STRM",
  },
  {
    rank: 3,
    user: "@PhonkPhantom",
    avatar: "/phonk-phantom-avatar.png",
    totalVotes: 9876,
    remixes: 15,
    wins: 4,
    winRate: 26.7,
    streak: 1,
    tokens: "29,650 STRM",
  },
  {
    rank: 4,
    user: "@HyperKing",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 8543,
    remixes: 12,
    wins: 3,
    winRate: 25.0,
    streak: 0,
    tokens: "24,780 STRM",
  },
  {
    rank: 5,
    user: "@DrillQueen",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 7892,
    remixes: 14,
    wins: 2,
    winRate: 14.3,
    streak: 1,
    tokens: "22,340 STRM",
  },
  {
    rank: 6,
    user: "@PhonkMaster",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 7234,
    remixes: 11,
    wins: 3,
    winRate: 27.3,
    streak: 0,
    tokens: "20,890 STRM",
  },
  {
    rank: 7,
    user: "@AmaPianoQueen",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 6789,
    remixes: 13,
    wins: 2,
    winRate: 15.4,
    streak: 2,
    tokens: "19,450 STRM",
  },
  {
    rank: 8,
    user: "@DrillKing",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 6234,
    remixes: 10,
    wins: 1,
    winRate: 10.0,
    streak: 0,
    tokens: "17,890 STRM",
  },
  {
    rank: 9,
    user: "@HyperQueen",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 5876,
    remixes: 9,
    wins: 2,
    winRate: 22.2,
    streak: 1,
    tokens: "16,230 STRM",
  },
  {
    rank: 10,
    user: "@PhonkLord",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 5432,
    remixes: 8,
    wins: 1,
    winRate: 12.5,
    streak: 0,
    tokens: "14,670 STRM",
  },
  {
    rank: 11,
    user: "@TrapMaster",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 4987,
    remixes: 7,
    wins: 1,
    winRate: 14.3,
    streak: 0,
    tokens: "13,120 STRM",
  },
  {
    rank: 12,
    user: "@HouseLegend",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 4543,
    remixes: 6,
    wins: 0,
    winRate: 0.0,
    streak: 0,
    tokens: "11,890 STRM",
  },
  {
    rank: 13,
    user: "@BassKing",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 4123,
    remixes: 5,
    wins: 1,
    winRate: 20.0,
    streak: 1,
    tokens: "10,450 STRM",
  },
  {
    rank: 14,
    user: "@SynthQueen",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 3789,
    remixes: 4,
    wins: 0,
    winRate: 0.0,
    streak: 0,
    tokens: "9,230 STRM",
  },
  {
    rank: 15,
    user: "@RemixRookie",
    avatar: "/placeholder-77g1x.png",
    totalVotes: 3456,
    remixes: 3,
    wins: 0,
    winRate: 0.0,
    streak: 0,
    tokens: "8,120 STRM",
  },
]

export default function AIRemixesPage() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [studioSettings, setStudioSettings] = useState({
    tempo: [120],
    genre: "drill",
    energy: [75],
    bassline: [60],
    drums: [80],
    melody: [70],
  })

  const handlePlay = (remixId: number) => {
    setCurrentlyPlaying(currentlyPlaying === remixId ? null : remixId)
    setShowAudioPlayer(true)
  }

  const handleVote = (remixId: number) => {
    console.log(`Voted for remix ${remixId}`)
  }

  const handleShare = (remixId: number) => {
    console.log(`Shared remix ${remixId}`)
  }

  const handleJoinBattle = (battleId: number) => {
    window.location.href = `/join-battle/${battleId}`
  }

  const generateRemix = () => {
    console.log("Generating remix with settings:", studioSettings)
  }

  const handleUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "audio/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log("Uploaded file:", file.name)
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI Remix Studio
            </h1>
            <p className="text-xl text-white mb-6">
              Create viral remixes in drill, amapiano, phonk, hyperpop • Powered by decentralized AI
            </p>
            {/* Removed 247 Active Battles text */}
          </div>

          <Tabs defaultValue="battles" className="space-y-6">
            <TabsList className="bg-gray-900/50 border border-gray-700">
              <TabsTrigger value="battles" className="data-[state=active]:bg-purple-500">
                <Trophy className="w-4 h-4 mr-2" />
                Remix Battles
              </TabsTrigger>
              <TabsTrigger value="studio" className="data-[state=active]:bg-purple-500">
                <Sliders className="w-4 h-4 mr-2" />
                Creation Studio
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-500">
                <Crown className="w-4 h-4 mr-2" />
                Leaderboard
              </TabsTrigger>
            </TabsList>

            {/* Remix Battles Tab */}
            <TabsContent value="battles" className="space-y-6">
              {/* Active Battles */}
              <Card className="bg-black border-gray-700 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center justify-between">
                    Active Remix Battles
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {remixBattles.length} Live
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remixBattles.map((battle) => (
                      <Card
                        key={battle.id}
                        className="bg-black border-gray-600 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105"
                      >
                        <CardContent className="p-6">
                          <div className="relative mb-4">
                            <img
                              src={battle.image || "/placeholder.svg"}
                              alt={battle.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Badge
                              className={`absolute top-2 right-2 ${
                                battle.status === "ending-soon" ? "bg-red-500/80" : "bg-green-500/80"
                              }`}
                            >
                              {battle.status === "ending-soon" ? "Ending Soon" : "Active"}
                            </Badge>
                          </div>

                          <h3 className="font-normal text-white mb-2 text-sm">{battle.title}</h3>
                          <p className="text-xs text-gray-400 mb-3">{battle.originalSong}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Genre</span>
                              <Badge variant="outline" className="text-white border-purple-400">
                                {battle.genre}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Participants</span>
                              <span className="text-white">{battle.participants}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Time Left</span>
                              <span className="text-yellow-400">{battle.timeLeft}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Prize Pool</span>
                              <span className="text-green-400">{battle.prize}</span>
                            </div>
                          </div>

                          <Button
                            className="w-full bg-black text-white border border-white hover:bg-white hover:text-black transition-colors"
                            onClick={() => handleJoinBattle(battle.id)}
                          >
                            Join Battle
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Submissions - Top 10 Leaderboard Style */}
              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Top 10 Trending Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {remixSubmissions.map((remix) => (
                      <div
                        key={remix.id}
                        className={`flex items-center space-x-4 p-4 rounded-lg bg-black hover:bg-gray-900/50 transition-all duration-300 group ${
                          remix.rank <= 3 ? "border border-yellow-500/30" : ""
                        }`}
                      >
                        {/* Rank */}
                        <div className="flex items-center space-x-2">
                          <div
                            className={`text-2xl font-normal w-8 text-xs ${
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
                          {remix.trending && <TrendingUp className="w-4 h-4 text-green-400" />}
                        </div>

                        {/* Cover Art */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={remix.image || "/placeholder.svg"}
                            alt={remix.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <Button
                            size="sm"
                            className="absolute inset-0 bg-black/60 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handlePlay(remix.id)}
                          >
                            {currentlyPlaying === remix.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm text-white truncate">{remix.title}</h3>
                          <p className="text-gray-400 truncate text-xs">
                            {remix.artist} • Original by {remix.originalArtist}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="outline" className="text-xs text-white">
                              {remix.genre}
                            </Badge>
                            <span className="text-xs text-gray-500">{remix.duration}</span>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="text-right space-y-1">
                          <div className="text-xs text-white">{remix.votes} votes</div>
                          <div className="text-xs text-gray-400">{remix.plays} plays</div>
                          <div className="text-xs text-gray-400">{remix.likes} likes</div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-purple-400"
                            onClick={() => handleVote(remix.id)}
                          >
                            <Vote className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-blue-400"
                            onClick={() => handleShare(remix.id)}
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Creation Studio Tab */}
            <TabsContent value="studio" className="space-y-6">
              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
                    AI Remix Creation Studio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Controls */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className="bg-purple-500 text-white">Drill</Badge>
                          <Badge className="bg-blue-500 text-white">Amapiano</Badge>
                          <Badge className="bg-pink-500 text-white">Phonk</Badge>
                          <Badge className="bg-green-500 text-white">Hyperpop</Badge>
                          <Badge className="bg-orange-500 text-white">Trap</Badge>
                          <Badge className="bg-red-500 text-white">House</Badge>
                        </div>

                        <div>
                          <label className="text-sm text-white mb-2 block">Tempo: {studioSettings.tempo[0]} BPM</label>
                          <Slider
                            value={studioSettings.tempo}
                            onValueChange={(value) => setStudioSettings({ ...studioSettings, tempo: value })}
                            max={200}
                            min={60}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-white mb-2 block">
                            Energy Level: {studioSettings.energy[0]}%
                          </label>
                          <Slider
                            value={studioSettings.energy}
                            onValueChange={(value) => setStudioSettings({ ...studioSettings, energy: value })}
                            max={100}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-white mb-2 block">
                            Bassline Intensity: {studioSettings.bassline[0]}%
                          </label>
                          <Slider
                            value={studioSettings.bassline}
                            onValueChange={(value) => setStudioSettings({ ...studioSettings, bassline: value })}
                            max={100}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-white mb-2 block">
                            Drum Pattern: {studioSettings.drums[0]}%
                          </label>
                          <Slider
                            value={studioSettings.drums}
                            onValueChange={(value) => setStudioSettings({ ...studioSettings, drums: value })}
                            max={100}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-white mb-2 block">
                            Melody Complexity: {studioSettings.melody[0]}%
                          </label>
                          <Slider
                            value={studioSettings.melody}
                            onValueChange={(value) => setStudioSettings({ ...studioSettings, melody: value })}
                            max={100}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="space-y-6">
                      <div className="bg-black rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg text-white mb-4">Preview Settings</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Genre:</span>
                            <span className="text-white capitalize">{studioSettings.genre}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tempo:</span>
                            <span className="text-white">{studioSettings.tempo[0]} BPM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Energy:</span>
                            <span className="text-white">{studioSettings.energy[0]}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Estimated Duration:</span>
                            <span className="text-white">2:45</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg text-white mb-4">AI Waveform Preview</h3>
                        <div className="h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                          <div className="flex items-end space-x-1">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div
                                key={i}
                                className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-sm animate-pulse"
                                style={{
                                  height: `${Math.random() * 60 + 10}px`,
                                  width: "3px",
                                  animationDelay: `${i * 0.1}s`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button
                          onClick={handleUpload}
                          className="w-full bg-black text-white border border-white hover:bg-white hover:text-black mb-4"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Sample
                        </Button>
                        <Button
                          onClick={() => console.log("Downloading remix...")}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Remix
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-6">
              <Card className="bg-black border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Crown className="w-6 h-6 mr-2 text-yellow-400" />
                    Top 15 Remix Artists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.map((user, index) => (
                      <div
                        key={user.rank}
                        className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                            : index === 1
                              ? "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30"
                              : index === 2
                                ? "bg-gradient-to-r from-orange-600/20 to-orange-700/20 border border-orange-600/30"
                                : "bg-black hover:bg-gray-900/50"
                        }`}
                      >
                        {/* Rank */}
                        <div className="flex items-center space-x-2">
                          <div
                            className={`text-3xl w-12 text-center text-xs ${
                              index === 0
                                ? "text-yellow-400"
                                : index === 1
                                  ? "text-gray-400"
                                  : index === 2
                                    ? "text-orange-600"
                                    : "text-gray-400"
                            }`}
                          >
                            #{user.rank}
                          </div>
                          {index < 3 && (
                            <Crown
                              className={`w-6 h-6 ${
                                index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-400" : "text-orange-600"
                              }`}
                            />
                          )}
                        </div>

                        {/* Avatar */}
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.user[1]}</AvatarFallback>
                        </Avatar>

                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm text-white">{user.user}</h3>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-400">{user.remixes} remixes</span>
                            <span className="text-xs text-gray-400">{user.totalVotes} votes</span>
                            <span className="text-xs text-green-400">{user.winRate}% win rate</span>
                          </div>
                        </div>

                        {/* Tokens */}
                        <div className="text-right">
                          <div className="text-xs text-gray-400 mb-1">Earned</div>
                          <div className="text-xs text-green-400">{user.tokens}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {showAudioPlayer && (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm">Now Playing: Vampire (Drill Remix)</div>
              <div className="text-gray-400 text-xs">@DrillMaster</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="text-white">
                <Play className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white" onClick={() => setShowAudioPlayer(false)}>
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Streamixy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">$STREAM</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tokenomics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Staking
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Get Listed</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Submit Music
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Apply as a Label
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Community</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">© 2024 Streamixy. All rights reserved.</div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">Streamixy</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
