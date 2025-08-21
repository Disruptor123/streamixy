"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trophy, Crown, Star } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function BattleAnnouncementsPage() {
  const params = useParams()
  const battleId = params.id
  const [isOrganizer] = useState(false) // This would be determined by user role
  const [newAnnouncement, setNewAnnouncement] = useState("")

  const announcements = [
    {
      id: 1,
      title: "🏆 Winner Announcement",
      content:
        "Congratulations to @DrillMaster for winning the Vampire Drill Remix Battle with 2,847 votes! Prize of 5,000 STRM has been distributed.",
      timestamp: "2 hours ago",
      type: "winner",
    },
    {
      id: 2,
      title: "⏰ Battle Ending Soon",
      content: "Only 2 hours left to vote! Make sure to cast your votes with $STREAM tokens.",
      timestamp: "4 hours ago",
      type: "update",
    },
    {
      id: 3,
      title: "🎵 New Submission Alert",
      content: "Amazing new remix just submitted by @RemixQueen! Check it out and vote if you like it.",
      timestamp: "6 hours ago",
      type: "submission",
    },
  ]

  const handlePostAnnouncement = () => {
    if (newAnnouncement.trim()) {
      console.log("Posting announcement:", newAnnouncement)
      setNewAnnouncement("")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Battle Announcements</h1>
            <p className="text-gray-400">Stay updated with the latest news from the Vampire Drill Remix Battle</p>
          </div>

          {isOrganizer && (
            <Card className="bg-black border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Post New Announcement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  placeholder="Write your announcement..."
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={4}
                />
                <Button onClick={handlePostAnnouncement} className="bg-blue-600 hover:bg-blue-700">
                  Post Announcement
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="bg-black border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {announcement.type === "winner" && <Trophy className="w-5 h-5 text-yellow-400" />}
                      {announcement.type === "update" && <Star className="w-5 h-5 text-blue-400" />}
                      {announcement.type === "submission" && <Crown className="w-5 h-5 text-purple-400" />}
                      <h3 className="text-lg font-semibold text-white">{announcement.title}</h3>
                    </div>
                    <Badge variant="outline" className="text-gray-400 border-gray-600">
                      {announcement.timestamp}
                    </Badge>
                  </div>
                  <p className="text-gray-300">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
