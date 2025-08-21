import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    const callbackUrl = "https://streamixy.vercel.app/"

    if (error) {
      return NextResponse.redirect(`${callbackUrl}&error=access_denied`)
    }

    if (!code || !state) {
      return NextResponse.redirect(`${callbackUrl}&error=invalid_request`)
    }

    // Verify state parameter
    const storedState = request.cookies.get("twitter_state")?.value
    const codeVerifier = request.cookies.get("twitter_code_verifier")?.value

    if (!storedState || !codeVerifier || storedState !== state) {
      return NextResponse.redirect(`${callbackUrl}&error=invalid_state`)
    }

    const clientId = "NjIyaU94Yzh3U19BUkhVQm1TcDc6MTpjaQ"
    const clientSecret = "kNHyGMlwt7-4LmZ0RzWS6389MYefWF-YrwWnwAx8szQh_PWfYv"

    // Exchange code for access token
    const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://streamixy.vercel.app/",
        code_verifier: codeVerifier,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error("Token exchange failed:", errorData)
      return NextResponse.redirect(`${callbackUrl}&error=token_exchange_failed`)
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Fetch user profile
    const userResponse = await fetch(
      "https://api.twitter.com/2/users/me?user.fields=id,name,username,description,profile_image_url,public_metrics,verified",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!userResponse.ok) {
      console.error("Failed to fetch user profile")
      return NextResponse.redirect(`${callbackUrl}&error=profile_fetch_failed`)
    }

    const userData = await userResponse.json()
    const user = userData.data

    const response = NextResponse.redirect(`${callbackUrl}&twitter_connected=true`)

    // Store Twitter profile data in secure cookie
    response.cookies.set(
      "twitter_profile",
      JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        description: user.description,
        profile_image_url: user.profile_image_url,
        public_metrics: user.public_metrics,
        verified: user.verified || false,
        access_token: accessToken,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    )

    // Clear temporary cookies
    response.cookies.delete("twitter_state")
    response.cookies.delete("twitter_code_verifier")

    return response
  } catch (error) {
    console.error("Twitter OAuth callback error:", error)
    return NextResponse.redirect(
      "https://v0.app/chat/decentralized-ai-platform-uQgaRQiGfS4?b=v0-preview-b_04MnIZVA010&f=1&error=callback_error",
    )
  }
}
