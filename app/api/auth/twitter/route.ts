import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Twitter OAuth 2.0 configuration
    const clientId = process.env.TWITTER_CLIENT_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/twitter/callback`

    if (!clientId) {
      return NextResponse.json({ error: "Twitter client ID not configured" }, { status: 500 })
    }

    // Generate state and code verifier for PKCE
    const state = Math.random().toString(36).substring(2, 15)
    const codeVerifier = Math.random().toString(36).substring(2, 128)
    const codeChallenge = Buffer.from(codeVerifier).toString("base64url")

    // Store state and code verifier in session/cookie for verification
    const response = NextResponse.redirect(
      `https://twitter.com/i/oauth2/authorize?` +
        `response_type=code&` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=tweet.read%20users.read%20follows.read&` +
        `state=${state}&` +
        `code_challenge=${codeChallenge}&` +
        `code_challenge_method=S256`,
    )

    // Set secure cookies for state and code verifier
    response.cookies.set("twitter_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
    })

    response.cookies.set("twitter_code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
    })

    return response
  } catch (error) {
    console.error("Twitter OAuth initiation error:", error)
    return NextResponse.json({ error: "Failed to initiate Twitter OAuth" }, { status: 500 })
  }
}
