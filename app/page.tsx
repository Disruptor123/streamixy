"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  TrendingUp,
  TrendingDown,
  Play,
  ArrowUpRight,
  SkipBack,
  Pause,
  SkipForward,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

// Mock data for music snap campaigns
const snapCampaigns = [
  {
    id: 5,
    title: "Vampire (Drill Remix)",
    artist: "Olivia Rodrigo",
    albumArt: "/vampire-album-cover.png",
    performanceROI: "+245%",
    rewardPool: "50,000 $STREAM",
    mindshare: 89,
    sentiment: "positive",
    chartData: [72, 78, 84, 87, 89, 92, 89],
  },
  {
    id: 6,
    title: "Paint The Town Red (Amapiano)",
    artist: "Doja Cat",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    performanceROI: "+189%",
    rewardPool: "35,000 $STREAM",
    mindshare: 76,
    sentiment: "positive",
    chartData: [58, 64, 70, 74, 76, 79, 76],
  },
  {
    id: 7,
    title: "Flowers (Phonk Remix)",
    artist: "Miley Cyrus",
    albumArt: "/generic-woman-floral-album.png",
    performanceROI: "+156%",
    rewardPool: "28,000 $STREAM",
    mindshare: 82,
    sentiment: "positive",
    chartData: [65, 70, 76, 80, 82, 85, 82],
  },
  {
    id: 8,
    title: "Unholy (Hyperpop)",
    artist: "Sam Smith",
    albumArt: "/unholy-album-cover.png",
    performanceROI: "+134%",
    rewardPool: "42,000 $STREAM",
    mindshare: 71,
    sentiment: "positive",
    chartData: [55, 60, 66, 69, 71, 74, 71],
  },
]

const goodSentimentMusic = [
  {
    id: 1,
    title: "Flowers",
    artist: "Miley Cyrus",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 94,
    change24h: "+12.5%",
  },
  {
    id: 2,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    albumArt: "/vampire-album-cover.png",
    mindshare: 91,
    change24h: "+8.3%",
  },
  {
    id: 3,
    title: "Unholy",
    artist: "Sam Smith",
    albumArt: "/unholy-album-cover.png",
    mindshare: 89,
    change24h: "+15.2%",
  },
  {
    id: 4,
    title: "As It Was",
    artist: "Harry Styles",
    albumArt: "/artist-photo.png",
    mindshare: 87,
    change24h: "+6.7%",
  },
  {
    id: 5,
    title: "Heat Waves",
    artist: "Glass Animals",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 85,
    change24h: "+9.1%",
  },
  {
    id: 6,
    title: "Stay",
    artist: "The Kid LAROI",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 83,
    change24h: "+4.8%",
  },
  {
    id: 7,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    albumArt: "/vampire-album-cover.png",
    mindshare: 82,
    change24h: "+7.2%",
  },
  {
    id: 8,
    title: "Levitating",
    artist: "Dua Lipa",
    albumArt: "/unholy-album-cover.png",
    mindshare: 80,
    change24h: "+5.9%",
  },
  {
    id: 9,
    title: "Blinding Lights",
    artist: "The Weeknd",
    albumArt: "/artist-photo.png",
    mindshare: 79,
    change24h: "+3.4%",
  },
  {
    id: 10,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 77,
    change24h: "+6.1%",
  },
  {
    id: 11,
    title: "Peaches",
    artist: "Justin Bieber",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 76,
    change24h: "+4.3%",
  },
  {
    id: 12,
    title: "Deja Vu",
    artist: "Olivia Rodrigo",
    albumArt: "/vampire-album-cover.png",
    mindshare: 75,
    change24h: "+8.7%",
  },
  {
    id: 13,
    title: "Positions",
    artist: "Ariana Grande",
    albumArt: "/unholy-album-cover.png",
    mindshare: 74,
    change24h: "+2.9%",
  },
  {
    id: 14,
    title: "Drivers License",
    artist: "Olivia Rodrigo",
    albumArt: "/vampire-album-cover.png",
    mindshare: 73,
    change24h: "+5.6%",
  },
  { id: 15, title: "Mood", artist: "24kGoldn", albumArt: "/artist-photo.png", mindshare: 72, change24h: "+7.8%" },
  {
    id: 16,
    title: "Savage",
    artist: "Megan Thee Stallion",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 71,
    change24h: "+3.2%",
  },
  {
    id: 17,
    title: "Rockstar",
    artist: "DaBaby",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 70,
    change24h: "+4.5%",
  },
  {
    id: 18,
    title: "Circles",
    artist: "Post Malone",
    albumArt: "/unholy-album-cover.png",
    mindshare: 69,
    change24h: "+6.3%",
  },
  {
    id: 19,
    title: "Don't Start Now",
    artist: "Dua Lipa",
    albumArt: "/artist-photo.png",
    mindshare: 68,
    change24h: "+2.7%",
  },
  {
    id: 20,
    title: "Adore You",
    artist: "Harry Styles",
    albumArt: "/vampire-album-cover.png",
    mindshare: 67,
    change24h: "+5.1%",
  },
]

const badSentimentMusic = [
  {
    id: 1,
    title: "Industry Baby",
    artist: "Lil Nas X",
    albumArt: "/artist-photo.png",
    mindshare: 45,
    change24h: "-8.3%",
  },
  {
    id: 2,
    title: "Bad Habit",
    artist: "Steve Lacy",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 43,
    change24h: "-12.1%",
  },
  {
    id: 3,
    title: "Running Up",
    artist: "Nicki Minaj",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 41,
    change24h: "-6.7%",
  },
  {
    id: 4,
    title: "First Class",
    artist: "Jack Harlow",
    albumArt: "/unholy-album-cover.png",
    mindshare: 39,
    change24h: "-9.4%",
  },
  {
    id: 5,
    title: "Wait For U",
    artist: "Future",
    albumArt: "/vampire-album-cover.png",
    mindshare: 37,
    change24h: "-5.8%",
  },
  {
    id: 6,
    title: "Break My Soul",
    artist: "Beyoncé",
    albumArt: "/artist-photo.png",
    mindshare: 35,
    change24h: "-11.2%",
  },
  {
    id: 7,
    title: "Me Porto Bonito",
    artist: "Bad Bunny",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 34,
    change24h: "-7.9%",
  },
  {
    id: 8,
    title: "Tití Me Preguntó",
    artist: "Bad Bunny",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 32,
    change24h: "-4.6%",
  },
  {
    id: 9,
    title: "Moscow Mule",
    artist: "Bad Bunny",
    albumArt: "/unholy-album-cover.png",
    mindshare: 31,
    change24h: "-8.7%",
  },
  {
    id: 10,
    title: "Efecto",
    artist: "Bad Bunny",
    albumArt: "/vampire-album-cover.png",
    mindshare: 29,
    change24h: "-6.3%",
  },
  {
    id: 11,
    title: "Ojitos Lindos",
    artist: "Bad Bunny",
    albumArt: "/artist-photo.png",
    mindshare: 28,
    change24h: "-9.1%",
  },
  {
    id: 12,
    title: "Tarot",
    artist: "Bad Bunny",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 27,
    change24h: "-5.4%",
  },
  {
    id: 13,
    title: "Neverita",
    artist: "Bad Bunny",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 26,
    change24h: "-7.8%",
  },
  {
    id: 14,
    title: "La Corriente",
    artist: "Bad Bunny",
    albumArt: "/unholy-album-cover.png",
    mindshare: 25,
    change24h: "-4.2%",
  },
  {
    id: 15,
    title: "Después de la Playa",
    artist: "Bad Bunny",
    albumArt: "/vampire-album-cover.png",
    mindshare: 24,
    change24h: "-8.9%",
  },
  {
    id: 16,
    title: "Dos Mil 16",
    artist: "Bad Bunny",
    albumArt: "/artist-photo.png",
    mindshare: 23,
    change24h: "-6.7%",
  },
  {
    id: 17,
    title: "El Apagón",
    artist: "Bad Bunny",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 22,
    change24h: "-5.3%",
  },
  {
    id: 18,
    title: "Yo No Soy Celoso",
    artist: "Bad Bunny",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 21,
    change24h: "-7.6%",
  },
  {
    id: 19,
    title: "Un Ratito",
    artist: "Bad Bunny",
    albumArt: "/unholy-album-cover.png",
    mindshare: 20,
    change24h: "-4.8%",
  },
  {
    id: 20,
    title: "Andrea",
    artist: "Bad Bunny",
    albumArt: "/vampire-album-cover.png",
    mindshare: 19,
    change24h: "-9.2%",
  },
]

// Comprehensive top 20 music data with all required fields
const top20MusicData = [
  {
    id: 1,
    title: "Vampire (Drill Remix)",
    artist: "Olivia Rodrigo",
    albumArt: "/vampire-album-cover.png",
    mindshare: 94,
    change24h: "+12.5%",
    change7d: "+23.8%",
    sentiment: 89542,
    listeners: 2847392,
    isUp24h: true,
    rank: 1,
  },
  {
    id: 2,
    title: "Paint The Town Red (Amapiano)",
    artist: "Doja Cat",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 91,
    change24h: "-3.2%",
    change7d: "+18.4%",
    sentiment: 76834,
    listeners: 2156789,
    isUp24h: false,
    rank: 2,
  },
  {
    id: 3,
    title: "Flowers (Phonk Remix)",
    artist: "Miley Cyrus",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 89,
    change24h: "+8.7%",
    change7d: "+15.2%",
    sentiment: 82156,
    listeners: 1987654,
    isUp24h: true,
    rank: 3,
  },
  {
    id: 4,
    title: "Unholy (Hyperpop)",
    artist: "Sam Smith",
    albumArt: "/unholy-album-cover.png",
    mindshare: 87,
    change24h: "+5.4%",
    change7d: "+12.1%",
    sentiment: 71293,
    listeners: 1834567,
    isUp24h: true,
    rank: 4,
  },
  {
    id: 5,
    title: "Anti-Hero (Drill)",
    artist: "Taylor Swift",
    albumArt: "/artist-photo.png",
    mindshare: 85,
    change24h: "-1.8%",
    change7d: "+9.6%",
    sentiment: 68745,
    listeners: 1723456,
    isUp24h: false,
    rank: 5,
  },
  {
    id: 6,
    title: "As It Was (Phonk)",
    artist: "Harry Styles",
    albumArt: "/vampire-album-cover.png",
    mindshare: 83,
    change24h: "+7.2%",
    change7d: "+14.3%",
    sentiment: 65892,
    listeners: 1654321,
    isUp24h: true,
    rank: 6,
  },
  {
    id: 7,
    title: "Bad Habit (Amapiano)",
    artist: "Steve Lacy",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 81,
    change24h: "-2.5%",
    change7d: "+6.8%",
    sentiment: 62134,
    listeners: 1567890,
    isUp24h: false,
    rank: 7,
  },
  {
    id: 8,
    title: "Heat Waves (Drill)",
    artist: "Glass Animals",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 79,
    change24h: "+4.1%",
    change7d: "+11.7%",
    sentiment: 58976,
    listeners: 1456789,
    isUp24h: true,
    rank: 8,
  },
  {
    id: 9,
    title: "Stay (Hyperpop)",
    artist: "The Kid LAROI",
    albumArt: "/unholy-album-cover.png",
    mindshare: 77,
    change24h: "+6.3%",
    change7d: "+8.9%",
    sentiment: 55432,
    listeners: 1345678,
    isUp24h: true,
    rank: 9,
  },
  {
    id: 10,
    title: "Industry Baby (Phonk)",
    artist: "Lil Nas X",
    albumArt: "/artist-photo.png",
    mindshare: 75,
    change24h: "-4.7%",
    change7d: "+3.2%",
    sentiment: 52189,
    listeners: 1234567,
    isUp24h: false,
    rank: 10,
  },
  {
    id: 11,
    title: "Good 4 U (Drill Remix)",
    artist: "Olivia Rodrigo",
    albumArt: "/vampire-album-cover.png",
    mindshare: 73,
    change24h: "+2.8%",
    change7d: "+7.5%",
    sentiment: 48756,
    listeners: 1123456,
    isUp24h: true,
    rank: 11,
  },
  {
    id: 12,
    title: "Levitating (Amapiano)",
    artist: "Dua Lipa",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 71,
    change24h: "-1.2%",
    change7d: "+5.4%",
    sentiment: 45321,
    listeners: 1012345,
    isUp24h: false,
    rank: 12,
  },
  {
    id: 13,
    title: "Blinding Lights (Phonk)",
    artist: "The Weeknd",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 69,
    change24h: "+3.6%",
    change7d: "+9.1%",
    sentiment: 41987,
    listeners: 987654,
    isUp24h: true,
    rank: 13,
  },
  {
    id: 14,
    title: "Watermelon Sugar (Hyperpop)",
    artist: "Harry Styles",
    albumArt: "/unholy-album-cover.png",
    mindshare: 67,
    change24h: "+1.9%",
    change7d: "+4.7%",
    sentiment: 38654,
    listeners: 876543,
    isUp24h: true,
    rank: 14,
  },
  {
    id: 15,
    title: "Peaches (Drill Remix)",
    artist: "Justin Bieber",
    albumArt: "/artist-photo.png",
    mindshare: 65,
    change24h: "-3.8%",
    change7d: "+2.1%",
    sentiment: 35432,
    listeners: 765432,
    isUp24h: false,
    rank: 15,
  },
  {
    id: 16,
    title: "Positions (Amapiano)",
    artist: "Ariana Grande",
    albumArt: "/vampire-album-cover.png",
    mindshare: 63,
    change24h: "+5.2%",
    change7d: "+8.3%",
    sentiment: 32198,
    listeners: 654321,
    isUp24h: true,
    rank: 16,
  },
  {
    id: 17,
    title: "Circles (Phonk Remix)",
    artist: "Post Malone",
    albumArt: "/doja-cat-paint-the-town-red-inspired.png",
    mindshare: 61,
    change24h: "-2.1%",
    change7d: "+1.8%",
    sentiment: 28976,
    listeners: 543210,
    isUp24h: false,
    rank: 17,
  },
  {
    id: 18,
    title: "Savage (Hyperpop)",
    artist: "Megan Thee Stallion",
    albumArt: "/generic-woman-floral-album.png",
    mindshare: 59,
    change24h: "+4.5%",
    change7d: "+6.9%",
    sentiment: 25743,
    listeners: 432109,
    isUp24h: true,
    rank: 18,
  },
  {
    id: 19,
    title: "Rockstar (Drill Remix)",
    artist: "DaBaby",
    albumArt: "/unholy-album-cover.png",
    mindshare: 57,
    change24h: "-1.7%",
    change7d: "+3.4%",
    sentiment: 22456,
    listeners: 321098,
    isUp24h: false,
    rank: 19,
  },
  {
    id: 20,
    title: "Mood (Amapiano)",
    artist: "24kGoldn",
    albumArt: "/artist-photo.png",
    mindshare: 55,
    change24h: "+2.3%",
    change7d: "+5.1%",
    sentiment: 19234,
    listeners: 210987,
    isUp24h: true,
    rank: 20,
  },
]

const upcomingDropsData = [
  [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Rose",
      albumArt: "/vampire-album-cover.png",
      price: "0.5",
      audio: "/audio1.mp3",
    },
    {
      id: 2,
      title: "Electric Pulse",
      artist: "Neon Beats",
      albumArt: "/doja-cat-paint-the-town-red-inspired.png",
      price: "0.8",
      audio: "/audio2.mp3",
    },
    {
      id: 3,
      title: "Ocean Waves",
      artist: "Deep Blue",
      albumArt: "/generic-woman-floral-album.png",
      price: "0.3",
      audio: "/audio3.mp3",
    },
  ],
  [
    {
      id: 4,
      title: "Fire Storm",
      artist: "Blaze King",
      albumArt: "/unholy-album-cover.png",
      price: "1.2",
      audio: "/audio4.mp3",
    },
    {
      id: 5,
      title: "Crystal Clear",
      artist: "Diamond Voice",
      albumArt: "/vampire-album-cover.png",
      price: "0.7",
      audio: "/audio5.mp3",
    },
    {
      id: 6,
      title: "Thunder Strike",
      artist: "Storm Rider",
      albumArt: "/doja-cat-paint-the-town-red-inspired.png",
      price: "0.9",
      audio: "/audio6.mp3",
    },
  ],
  [
    {
      id: 7,
      title: "Starlight",
      artist: "Cosmic Dreams",
      albumArt: "/generic-woman-floral-album.png",
      price: "0.6",
      audio: "/audio7.mp3",
    },
    {
      id: 8,
      title: "Neon Nights",
      artist: "City Lights",
      albumArt: "/unholy-album-cover.png",
      price: "1.0",
      audio: "/audio8.mp3",
    },
    {
      id: 9,
      title: "Golden Hour",
      artist: "Sunset Vibes",
      albumArt: "/vampire-album-cover.png",
      price: "0.4",
      audio: "/audio9.mp3",
    },
  ],
]

const trendingArtists = [
  {
    id: 1,
    name: "Olivia Rodrigo",
    image: "/vampire-album-cover.png",
    followers: "2.1M",
    monthlyListeners: "45.2M",
    topSong: "Vampire (Drill Remix)",
    growth: "+15%",
  },
  {
    id: 2,
    name: "Doja Cat",
    image: "/doja-cat-paint-the-town-red-inspired.png",
    followers: "3.8M",
    monthlyListeners: "67.3M",
    topSong: "Paint The Town Red",
    growth: "+23%",
  },
  {
    id: 3,
    name: "Miley Cyrus",
    image: "/generic-woman-floral-album.png",
    followers: "1.9M",
    monthlyListeners: "38.7M",
    topSong: "Flowers (Phonk)",
    growth: "+8%",
  },
  {
    id: 4,
    name: "Sam Smith",
    image: "/unholy-album-cover.png",
    followers: "2.5M",
    monthlyListeners: "52.1M",
    topSong: "Unholy (Hyperpop)",
    growth: "+12%",
  },
  {
    id: 5,
    name: "Bad Bunny",
    image: "/artist-photo.png",
    followers: "4.2M",
    monthlyListeners: "78.9M",
    topSong: "Tití Me Preguntó",
    growth: "+31%",
  },
  {
    id: 6,
    name: "Taylor Swift",
    image: "/vampire-album-cover.png",
    followers: "5.1M",
    monthlyListeners: "89.4M",
    topSong: "Anti-Hero",
    growth: "+19%",
  },
  {
    id: 7,
    name: "The Weeknd",
    image: "/doja-cat-paint-the-town-red-inspired.png",
    followers: "3.3M",
    monthlyListeners: "61.2M",
    topSong: "Blinding Lights",
    growth: "+7%",
  },
  {
    id: 8,
    name: "Ariana Grande",
    image: "/generic-woman-floral-album.png",
    followers: "2.8M",
    monthlyListeners: "55.6M",
    topSong: "Positions",
    growth: "+14%",
  },
  {
    id: 9,
    name: "Drake",
    image: "/unholy-album-cover.png",
    followers: "4.7M",
    monthlyListeners: "82.3M",
    topSong: "God's Plan",
    growth: "+9%",
  },
  {
    id: 10,
    name: "Billie Eilish",
    image: "/artist-photo.png",
    followers: "2.2M",
    monthlyListeners: "47.8M",
    topSong: "bad guy",
    growth: "+16%",
  },
]

export default function HomePage() {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentDropsIndex, setCurrentDropsIndex] = useState(0)
  const [currentCampaignIndex, setCurrentCampaignIndex] = useState(0)
  const router = useRouter()

  const handlePlay = (song: any) => {
    setCurrentAudio(song.audio)
    setIsPlaying(true)
  }

  const handleMusicClick = (musicId: string) => {
    router.push(`/music/${musicId}`)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-x-full")
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = document.querySelectorAll(".campaign-card")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Main Content */}
      <div className="pt-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-purple-400 p-2"
                onClick={() => setCurrentCampaignIndex(Math.max(0, currentCampaignIndex - 1))}
                disabled={currentCampaignIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-xl md:text-2xl font-bold text-white">Music Snap Campaigns</h1>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-purple-400 p-2"
                onClick={() => setCurrentCampaignIndex(Math.min(snapCampaigns.length - 1, currentCampaignIndex + 1))}
                disabled={currentCampaignIndex === snapCampaigns.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-gray-400 text-lg">Discover trending music before it hits the charts</p>
          </div>

          {/* Music Snap Campaigns Grid */}
          <div className="space-y-4 mb-16">
            {snapCampaigns.map((campaign, index) => (
              <Card
                key={campaign.id}
                className="campaign-card relative bg-gray-900/50 border-gray-800 p-6 hover:bg-gray-800/50 transition-all duration-500 h-24 overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${campaign.albumArt || "/placeholder.svg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {campaign.performanceROI}
                  </Badge>
                </div>

                <div className="flex items-center justify-between h-full">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-white text-lg">{campaign.title}</h3>
                      <p className="text-white/80 text-sm">{campaign.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-black/70 px-4 py-2 rounded-lg">
                      <span className="text-white/60 text-sm">Total Reward Pool: </span>
                      <span className="text-purple-400 font-medium">{campaign.rewardPool}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-black hover:bg-gray-800 text-white px-6 py-2"
                      onClick={() => (window.location.href = `/campaign/${campaign.id}`)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Upcoming Drops Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white">Upcoming Drops</h2>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:text-purple-400 p-2"
                  onClick={() => setCurrentDropsIndex(Math.max(0, currentDropsIndex - 1))}
                  disabled={currentDropsIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:text-purple-400 p-2"
                  onClick={() => setCurrentDropsIndex(Math.min(upcomingDropsData.length - 1, currentDropsIndex + 1))}
                  disabled={currentDropsIndex === upcomingDropsData.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingDropsData[currentDropsIndex].map((drop, index) => (
                <Card
                  key={drop.id}
                  className="bg-gray-900/50 border-gray-800 p-4 hover:bg-gray-800/50 transition-all duration-300 h-20"
                >
                  <div className="flex items-center space-x-3 h-full">
                    <Image
                      src={drop.albumArt || "/placeholder.svg"}
                      alt={drop.title}
                      width={48}
                      height={48}
                      className="rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white text-sm font-medium truncate">{drop.title}</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-purple-400 hover:text-purple-300 p-1 flex-shrink-0"
                          onClick={() => handlePlay(drop)}
                        >
                          <Play className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-gray-400 text-xs mb-1 truncate">{drop.artist}</p>
                      <p className="text-green-400 text-xs font-medium">{drop.price} $STREAM</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sentiment Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Good Sentiment */}
            <Card className="bg-green-900/20 border-green-800/30 p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-green-400 mr-3" />
                <h2 className="text-lg text-green-400">Good Sentiment Music</h2>
              </div>
              <div className="max-h-96 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-900/20">
                {goodSentimentMusic.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center space-x-3 p-2 bg-green-900/10 rounded-lg cursor-pointer hover:bg-green-900/20 transition-colors"
                    onClick={() => handleMusicClick(song.id.toString())}
                  >
                    <Image
                      src={song.albumArt || "/vampire-album-cover.png"}
                      alt={song.title}
                      width={32}
                      height={32}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm">{song.title}</p>
                      <p className="text-green-300 text-xs">{song.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 text-sm">{song.mindshare}%</p>
                      <p className="text-green-300 text-xs">{song.change24h}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-green-400 hover:text-green-300 p-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlay(song)
                      }}
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Bad Sentiment */}
            <Card className="bg-red-900/20 border-red-800/30 p-6">
              <div className="flex items-center mb-4">
                <TrendingDown className="w-5 h-5 text-red-400 mr-3" />
                <h2 className="text-lg text-red-400">Bad Sentiment Music</h2>
              </div>
              <div className="max-h-96 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-red-900/20">
                {badSentimentMusic.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center space-x-3 p-2 bg-red-900/10 rounded-lg cursor-pointer hover:bg-red-900/20 transition-colors"
                    onClick={() => handleMusicClick(song.id.toString())}
                  >
                    <Image
                      src={song.albumArt || "/vampire-album-cover.png"}
                      alt={song.title}
                      width={32}
                      height={32}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm">{song.title}</p>
                      <p className="text-red-300 text-xs">{song.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-400 text-sm">{song.mindshare}%</p>
                      <p className="text-red-300 text-xs">-{song.change24h.replace("+", "")}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 p-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlay(song)
                      }}
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Top 20 Music Listings */}
          <Card className="bg-black border-gray-800 p-6 mb-16">
            <h2 className="text-2xl mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Top 20 Music Charts
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">#</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">Song</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">Mindshare</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">24h</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">7d</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">Sentiment</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">Listeners</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {top20MusicData.map((song, index) => (
                    <tr
                      key={song.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
                      style={{
                        animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                      }}
                      onClick={() => handleMusicClick(song.id.toString())}
                    >
                      <td className="py-3 px-2 text-gray-300 text-sm">
                        <div className="flex items-center">
                          {song.rank}
                          {song.isUp24h ? (
                            <TrendingUp className="w-3 h-3 text-green-400 ml-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400 ml-1" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={song.albumArt || "/placeholder.svg"}
                            alt={song.title}
                            width={32}
                            height={32}
                            className="rounded object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="text-white text-sm">{song.title}</p>
                            <p className="text-gray-400 text-xs">{song.artist}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-purple-400 text-sm">{song.mindshare}%</span>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`text-sm ${song.isUp24h ? "text-green-400" : "text-red-400"}`}>
                          {song.change24h}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-blue-400 text-sm">{song.change7d}</span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-gray-300 text-sm">{song.sentiment.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-gray-300 text-sm">{song.listeners.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-purple-400 hover:text-purple-300 p-1"
                          onClick={() => handlePlay(song)}
                        >
                          <Play className="w-3 h-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="bg-black border-gray-800 p-6 mb-16">
            <h2 className="text-2xl mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Top 10 Trending Artists
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {trendingArtists.map((artist, index) => (
                <Card
                  key={artist.id}
                  className="bg-black border-gray-700 p-4 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105"
                  style={{
                    animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="text-center">
                    <Image
                      src={artist.image || "/vampire-album-cover.png"}
                      alt={artist.name}
                      width={80}
                      height={80}
                      className="rounded-full mx-auto mb-3 object-cover"
                    />
                    <h3 className="text-white text-sm font-medium mb-1">{artist.name}</h3>
                    <p className="text-gray-400 text-xs mb-2">{artist.followers} followers</p>
                    <p className="text-gray-400 text-xs mb-2">{artist.monthlyListeners} monthly</p>
                    <p className="text-purple-400 text-xs mb-2">{artist.topSong}</p>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      {artist.growth}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Audio Player */}
      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 p-4 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/placeholder.svg" alt="Current Song" width={48} height={48} className="rounded" />
              <div>
                <p className="text-white text-sm font-medium">Current Song</p>
                <p className="text-gray-400 text-xs">Artist Name</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button size="sm" variant="ghost" className="text-white">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="ghost" className="text-white">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-xs">1:23</span>
              <div className="w-32 h-1 bg-gray-700 rounded-full">
                <div className="w-1/3 h-full bg-purple-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-xs">3:45</span>
              <Button size="sm" variant="ghost" className="text-gray-400 ml-4" onClick={() => setCurrentAudio(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Streamixy</h3>
              <p className="text-gray-400">Decentralized AI music platform</p>
            </div>

            {/* About */}
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

            {/* $STREAM */}
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

            {/* Get Listed & Community */}
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
;<style jsx global>{`
  .animate-fade-in {
    animation: fadeInSlide 0.6s ease-out forwards;
  }
  
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
  }
  
  .scrollbar-thumb-green-600::-webkit-scrollbar-thumb {
    background-color: rgb(34 197 94);
    border-radius: 2px;
  }
  
  .scrollbar-thumb-red-600::-webkit-scrollbar-thumb {
    background-color: rgb(220 38 38);
    border-radius: 2px;
  }
  
  .scrollbar-track-green-900\/20::-webkit-scrollbar-track {
    background-color: rgba(20 83 45 / 0.2);
  }
  
  .scrollbar-track-red-900\/20::-webkit-scrollbar-track {
    background-color: rgba(127 29 29 / 0.2);
  }

  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`}</style>
