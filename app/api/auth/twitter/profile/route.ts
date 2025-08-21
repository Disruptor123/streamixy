import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const twitterProfileCookie = request.cookies.get("twitter_profile")

    if (!twitterProfileCookie) {
      return NextResponse.json({ connected: false })
    }

    const twitterProfile = JSON.parse(twitterProfileCookie.value)

    // Remove access token from response for security
    const { access_token, ...profileData } = twitterProfile

    return NextResponse.json({
      connected: true,
      profile: profileData,
    })
  } catch (error) {
    console.error("Error fetching Twitter profile:", error)
    return NextResponse.json({ connected: false })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true })
    response.cookies.delete("twitter_profile")
    return response
  } catch (error) {
    console.error("Error disconnecting Twitter:", error)
    return NextResponse.json({ error: "Failed to disconnect" }, { status: 500 })
  }
}
