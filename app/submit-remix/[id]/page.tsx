"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, Music, ImageIcon } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function SubmitRemixPage() {
  const params = useParams()
  const battleId = params.id
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    albumArt: null as File | null,
    audioFile: null as File | null,
  })

  const handleFileUpload = (type: "albumArt" | "audioFile") => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = type === "albumArt" ? "image/*" : "audio/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setFormData({ ...formData, [type]: file })
      }
    }
    input.click()
  }

  const handleSubmit = () => {
    console.log("Submitting remix:", formData)
    // Add submission logic here
    alert("Remix submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-black border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Submit Your Remix</CardTitle>
              <p className="text-gray-400">Upload your remix for the Vampire Drill Remix Battle</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-white">
                  Remix Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter your remix title"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Remix Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your remix..."
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={4}
                />
              </div>

              <div>
                <Label className="text-white">Album Art</Label>
                <Button
                  onClick={() => handleFileUpload("albumArt")}
                  className="w-full bg-gray-800 border border-gray-600 hover:bg-gray-700 mt-2"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {formData.albumArt ? formData.albumArt.name : "Upload Album Art"}
                </Button>
              </div>

              <div>
                <Label className="text-white">Remix Audio</Label>
                <Button
                  onClick={() => handleFileUpload("audioFile")}
                  className="w-full bg-gray-800 border border-gray-600 hover:bg-gray-700 mt-2"
                >
                  <Music className="w-4 h-4 mr-2" />
                  {formData.audioFile ? formData.audioFile.name : "Upload Remix Audio"}
                </Button>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={!formData.title || !formData.audioFile}
              >
                <Upload className="w-4 h-4 mr-2" />
                Submit Remix
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
