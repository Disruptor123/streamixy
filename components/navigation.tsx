"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet, User, Trophy, Music, BarChart3, ChevronDown } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = async () => {
    // Mock wallet connection
    if (!isConnected) {
      // Simulate wallet connection
      setWalletAddress("0x1234...5678")
      setIsConnected(true)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Streamixy</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/ai-billboard"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>AI Billboard</span>
            </Link>
            <Link
              href="/ai-remixes"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Music className="w-4 h-4" />
              <span>AI Remixes</span>
            </Link>
            <Link
              href="/rewards"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span>Rewards & Earning</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </div>

          {/* Connect Wallet Button */}
          {!isConnected ? (
            <Button className="bg-white hover:bg-gray-100 text-black border-0" onClick={connectWallet}>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-white hover:bg-gray-100 text-black border-0">
                  <Wallet className="w-4 h-4 mr-2" />
                  {walletAddress}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700">
                <DropdownMenuItem className="text-white hover:bg-gray-800">
                  <Link href="/profile" className="flex items-center w-full">
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-800">
                  <Link href="/rewards" className="flex items-center w-full">
                    <Trophy className="w-4 h-4 mr-2" />
                    Rewards
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-800" onClick={disconnectWallet}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}
