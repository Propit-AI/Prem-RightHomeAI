"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Brain, LineChart, Home, Map, Sparkles, Building, Activity, Globe, Cpu } from "lucide-react"
import { useChat } from "@/contexts/chat-context"
import MessageInput from "./message-input"
import Navbar from "./navbar"
import Logo from "./ui/logo"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function DiscoverContent() {
  const { startConversation } = useChat()
  const [animatedIndex, setAnimatedIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedIndex((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const aiFeatures = [
    { 
      icon: <Brain className="h-6 w-6 text-white/70" />, 
      title: "AI Property Valuation",
      description: "Get instant property valuations powered by our advanced machine learning algorithms"
    },
    { 
      icon: <LineChart className="h-6 w-6 text-white/70" />, 
      title: "Market Prediction",
      description: "See future property value projections based on historical data and market trends"
    },
    { 
      icon: <Map className="h-6 w-6 text-white/70" />, 
      title: "Smart Location Analysis",
      description: "Identify prime locations with optimal accessibility, amenities and growth potential"
    }
  ]

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

  const handleAIValuationClick = () => {
    startConversation("How does AI calculate property valuations?")
  }

  const handleVirtualTourClick = () => {
    startConversation("Tell me about virtual property tours and their benefits")
  }

  const handleMarketPredictionClick = () => {
    startConversation("How accurate are AI-based real estate market predictions?")
  }

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col items-center mt-20 mb-28 relative">
      {/* Futuristic background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-teal-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="fixed p-2 bottom-0 w-full mx-auto max-w-3xl z-20">
        <MessageInput/>
      </div>

      <div className="absolute top-0 w-full right-0">
        <Navbar/>
      </div>

      {/* Hero section with futuristic greeting */}
      <div className="relative mb-12 text-center">
        <h1 className="text-[26px] md:text-4xl font-semibold text-[#333333]">
          Welcome to the Future of Real Estate
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Explore AI-powered insights, market trends, and smart property recommendations
        </p>
      </div>

      {/* Daily Update and Weather Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
        <Card
          className="overflow-hidden bg-[#1c2b36] border border-[#e6e6e6] text-white rounded-[3rem] shadow-md border-none cursor-pointer transition-transform hover:scale-[1.02] group"
          onClick={handleDailyClick}
        >
          <div className="relative">
            <div className="p-6 pb-20 flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white/10">
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
            <Button className="absolute bottom-6 left-6 bg-white text-[#1c2b36] hover:bg-white/90 rounded-full flex items-center gap-2 px-6 group-hover:shadow-lg transition-all">
              <Play className="h-4 w-4" />
              Play now
            </Button>
          </div>
        </Card>

        <Card
          className="overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] border border-[#e6e6e6] rounded-[3rem] shadow-md border-none cursor-pointer transition-transform hover:scale-[1.02]"
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
                <p className="mt-3 text-gray-500">Learn how weather affects property choices</p>
              </div>
              <div className="w-16 h-16 bg-[#1c2b36] rounded-full flex items-center justify-center text-white/40">
                <Globe className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Podcasts and Investment Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
        <Card
          className="overflow-hidden bg-white rounded-[3rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={handlePodcastClick}
        >
          <CardContent className="p-6 flex flex-col md:flex-row items-start gap-4">
              <Image
                src="https://images.unsplash.com/photo-1570563234994-a7a7be1e01a5?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Podcast"
                width={112}
                height={112}
                className="w-28 h-28 object-cover rounded-3xl"
              />
            <div>
              <div className="flex items-center mb-2">
                <Play className="w-5 h-5 mr-2 text-[#1c2b36]" />
                <span className="text-sm text-[#666666]">RightHome Podcasts</span>
              </div>
              <h3 className="text-xl font-medium mb-1">Real Estate Market Trends 2025</h3>
              <p className="text-[#666666]">
                Expert insights on the evolving property landscape in major Indian cities
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="overflow-hidden bg-white rounded-[3rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={handleInvestmentClick}
        >
          <CardContent className="p-6 flex flex-col md:flex-row items-start gap-4">
            <Image
                src="https://images.unsplash.com/photo-1587400873582-230980eb46eb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Investment Guide"
                width={112}
                height={112}
                className="w-28 h-28 object-cover rounded-3xl"
              />
            <div>
              <div className="flex items-center mb-2">
                <Sparkles className="w-5 h-5 mr-2 text-[1c2b36]" />
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

      {/* Virtual Reality Tours Section */}
      <Card
        className="overflow-hidden bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-[3rem] shadow-md border-none cursor-pointer transition-transform hover:scale-[1.01] w-full mb-10"
        onClick={handleVirtualTourClick}
      >
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 text-sm font-medium mb-4">
                <div className="h-2 w-2 rounded-full bg-white/40 animate-pulse mr-2" />
                <span>New Feature</span>
              </div>
              <h2 className="text-3xl font-bold mb-3">Virtual Property Tours</h2>
              <p className="text-white/80 max-w-md">
                Experience properties remotely with our immersive 3D virtual tour technology powered by AI
              </p>
              <Button className="mt-4 bg-white text-purple-900 hover:bg-white/90 rounded-full px-6">
                Explore Tours
              </Button>
            </div>
            <div className="w-48 h-48 relative bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-md">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/50 to-purple-500/50 animate-pulse absolute"></div>
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/70 to-purple-500/70 absolute"></div>
              <div className="w-24 h-24 rounded-full bg-white/20 absolute flex items-center justify-center">
                <Logo/>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* AI Feature Showcase */}
      {/* <div className="w-full mb-12 overflow-hidden rounded-[3rem] bg-[#1c2b36] text-white p-8">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 text-sm font-medium mb-4">
            <Cpu className="h-4 w-4 mr-2" />
            <span>Powered by AI</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Intelligent Real Estate</h2>
          <p className="text-white/70">Discover how our AI is transforming property search and investment</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {aiFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-700 ease-in-out ${
                index === animatedIndex ? "scale-105 bg-white/10" : ""
              }`}
              onClick={() => {
                if (index === 0) handleAIValuationClick();
                if (index === 1) handleMarketPredictionClick();
                if (index === 2) handleVirtualTourClick();
              }}
            >
              <div className="p-3 rounded-xl bg-white/10 inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Smart Property Assistant */}
      <Card className="overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] border border-[#e6e6e6] rounded-[3rem] shadow-md border-none w-full">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Your Smart Property Assistant</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Ask anything about real estate markets, property investments, or home buying tips
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              "How does AI determine property value?",
              "What are smart home features to look for?",
              "Compare property investment vs stock market"
            ].map((question, idx) => (
              <Button
                key={idx}
                className="text-sm shadow-md border-muted gap-2 h-auto py-3 px-4 rounded-2xl bg-[#f8f8f9] hover:bg-[#f2f2f2] text-[#333333]"
                onClick={() => startConversation(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h1 className="text-[16px] md:text-[25px] text-center text-[#333333] mb-12 mt-20">
          RightHomeAI may make mistakes.
        </h1>
      </div>
    </div>
  )
}