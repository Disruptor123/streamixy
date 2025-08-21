"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TwitterCallback() {
  const router = useRouter()

  useEffect(() => {
    // Handle Twitter OAuth callback
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const state = urlParams.get("state")

    if (code) {
      // In production, exchange code for access token
      // For demo, simulate successful authentication
      const mockTwitterProfile = {
        id: "123456789",
        username: "musicmaven_real",
        name: "Alex Chen",
        profile_image_url: "https://pbs.twimg.com/profile_images/1234567890/avatar.jpg",
        public_metrics: {
          followers_count: 12400,
          following_count: 890,
          tweet_count: 2340,
        },
      }

      localStorage.setItem("twitterProfile", JSON.stringify(mockTwitterProfile))
      router.push("/profile")
    } else {
      // Handle error
      router.push("/profile?error=twitter_auth_failed")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Connecting to Twitter...</p>
      </div>
    </div>
  )
}
