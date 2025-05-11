"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useChat } from "@/contexts/chat-context"
import MessageInput from "./message-input"
import Navbar from "./navbar"
import Logo from "./ui/logo"

export default function DiscoverContent() {
  const { startConversation } = useChat()

  const handleDailyClick = () => {
    startConversation("Tell me about the latest real estate news in Mumbai and Pune")
  }

  const handleWeatherClick = () => {
    startConversation("How does the weather in Delhi affect property choices?")
  }

  const handlePodcastClick = () => {
    startConversation("What are the current real estate market trends in 2023?")
  }

  const handleInvestmentClick = () => {
    startConversation("Tell me about the top 10 emerging localities for property investment")
  }

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col items-center mt-20 mb-36">
      <div className="fixed p-2 bottom-0 w-full mx-auto max-w-3xl z-20">
        <MessageInput/>
      </div>

      <div className="absolute top-0 w-full right-0">
        <Navbar/>
      </div>
      <h1 className="text-[26px] md:text-4xl font-semibold text-[#333333] mb-12">It's great to see you</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card
          className="overflow-hidden bg-[#1c2b36] border border-[#e6e6e6] text-white rounded-[3rem] shadow-md border-none cursor-pointer"
          onClick={handleDailyClick}
        >
          <div className="relative">
            <div className="p-6 pb-20 flex flex-col items-center">
              <div className="flex items-center justify-center animate-pulse w-16 h-16 mb-4 rounded-full bg-white/10">
                {/* <img src="/placeholder.svg?height=40&width=40" alt="RightHome Daily" className="w-10 h-10 rounded-full animate-pulse" /> */}
                <Logo/>
              </div>
              <h2 className="text-2xl font-semibold mb-2">RightHome Daily</h2>
              <div className="flex items-center text-sm text-white/70 mb-2">
                <span>May 9</span>
                <span className="mx-2">•</span>
                <span>4 min</span>
              </div>
              <p className="text-white/90">
                Mumbai property prices surge, new metro line boosts Pune suburbs, affordable housing initiative in
                Bangalore
              </p>
            </div>
            <Button className="absolute bottom-6 left-6 bg-white text-[#1c2b36] hover:bg-white/90 rounded-full flex items-center gap-2 px-6">
              <Play className="h-4 w-4" />
              Play now
            </Button>
          </div>
        </Card>

        <Card
          className="overflow-hidden bg-[#f2f2f2] border border-[#e6e6e6] rounded-[3rem] shadow-md border-none cursor-pointer"
          onClick={handleWeatherClick}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium mb-1">New Delhi</h3>
                <div className="flex items-end">
                  <span className="text-6xl font-light">35°</span>
                  <span className="text-sm text-[#666666] ml-2 mb-2">Haze</span>
                </div>
                <div className="text-sm text-[#666666] mt-1">H 35° L 27°</div>
              </div>
              <div className="w-16 h-16 bg-[#e6e6e6] rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="overflow-hidden bg-white rounded-[3rem] shadow-md border-[#e6e6e6] cursor-pointer"
          onClick={handlePodcastClick}
        >
          <CardContent className="p-6 flex flex-col md:flex-row items-start gap-4">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt="Property Insights"
              className="w-28 h-28 rounded-xl object-cover"
            />
            <div>
              <div className="flex items-center mb-2">
                <img src="/placeholder.svg?height=20&width=20" alt="Podcast" className="w-5 h-5 mr-2" />
                <span className="text-sm text-[#666666]">RightHome Podcasts</span>
              </div>
              <h3 className="text-xl font-medium mb-1">Real Estate Market Trends 2023</h3>
              <p className="text-[#666666]">
                Expert insights on the evolving property landscape in major Indian cities
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="overflow-hidden bg-white rounded-[3rem] shadow-md border-[#e6e6e6] cursor-pointer"
          onClick={handleInvestmentClick}
        >
          <CardContent className="p-6 flex flex-col md:flex-row items-start gap-4">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt="Investment Guide"
              className="w-28 h-28 rounded-xl object-cover"
            />
            <div>
              <div className="flex items-center mb-2">
                <img src="/placeholder.svg?height=20&width=20" alt="Guide" className="w-5 h-5 mr-2" />
                <span className="text-sm text-[#666666]">Investment Guide</span>
              </div>
              <h3 className="text-xl font-medium mb-1">Top 10 Emerging Localities</h3>
              <p className="text-[#666666]">
                Discover high-potential areas for property investment with promising returns
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
