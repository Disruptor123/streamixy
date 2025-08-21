import { type NextRequest, NextResponse } from "next/server"
import { createHash, randomBytes } from "crypto"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Twitter OAuth initiation started")

    // Twitter OAuth 2.0 configuration
    const clientId = "NjIyaU94Yzh3U19BUkhVQm1TcDc6MTpjaQ"
    const redirectUri = "https://v0.app/chat/decentralized-ai-platform-uQgaRQiGfS4?b=v0-preview-b_04MnIZVA010&f=1"

    console.log("[v0] Redirect URI:", redirectUri)

    if (!clientId) {
      console.error("[v0] Twitter client ID not configured")
      return NextResponse.json({ error: "Twitter client ID not configured" }, { status: 500 })
    }

    // Generate state and code verifier for PKCE
    const state = Math.random().toString(36).substring(2, 15)
    const codeVerifier = randomBytes(32).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")

    const codeChallenge = createHash("sha256")
      .update(codeVerifier)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")

    console.log("[v0] Generated state and code challenge")

    const twitterAuthUrl =
      `https://twitter.com/i/oauth2/authorize?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=tweet.read%20users.read%20follows.read&` +
      `state=${state}&` +
      `code_challenge=${codeChallenge}&` +
      `code_challenge_method=S256`

    console.log("[v0] Twitter auth URL:", twitterAuthUrl)

    // Store state and code verifier in session/cookie for verification
    const response = NextResponse.redirect(twitterAuthUrl)

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

    console.log("[v0] Cookies set, redirecting to Twitter")
    return response
  } catch (error) {
    console.error("[v0] Twitter OAuth initiation error:", error)
    return NextResponse.json({ error: "Failed to initiate Twitter OAuth" }, { status: 500 })
  }
}
