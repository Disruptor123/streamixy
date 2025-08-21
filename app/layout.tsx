import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { WalletProvider } from "@/components/wallet-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Streamixy - Decentralized AI Music Platform",
  description: "Decentralized AI platform for music charts, remixes, and social engagement",
  generator: "Streamixy",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}
