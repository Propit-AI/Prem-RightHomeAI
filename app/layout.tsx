import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Inter, Outfit } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatProvider } from "@/contexts/chat-context"

const inter = Inter({ subsets: ["latin"] })

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
})

export const metadata: Metadata = {
  title: "RightHomeAI - Real Estate Assistant",
  description: "AI-powered real estate assistant to help you find your perfect home",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider defaultTheme="light" storageKey="righthome-theme">
          <ChatProvider>
            <div className="flex h-screen bg-[#f9f9f8] overflow-hidden">
              <Sidebar />
              <main className="flex-1 relative overflow-hidden">
                {children}
              </main>
            </div>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
