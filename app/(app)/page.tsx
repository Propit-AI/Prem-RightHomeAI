"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Brain, LineChart, Home, Map, Sparkles } from "lucide-react";
import { useChat } from "@/contexts/chat-context";
import { useState, useEffect } from "react";
import Image from "next/image";
import MessageInput from "@/components/message-input";
import Navbar from "@/components/navbar";
import Logo from "@/components/ui/logo";
import { useRouter } from "next/navigation";

export default function DiscoverContent() {
  const { startConversation } = useChat();
  const [animatedIndex, setAnimatedIndex] = useState(0);
  const { isConversationStarted } = useChat();
  const router = useRouter();

  useEffect(() => {
    if (isConversationStarted) {
      router.push("/chat");
    }
  }, [isConversationStarted]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // const aiFeatures = [
  //   {
  //     icon: <Brain className="h-6 w-6 text-white/70" />,
  //     title: "AI Property Valuation",
  //     description:
  //       "Get instant property valuations powered by our advanced machine learning algorithms",
  //   },
  //   {
  //     icon: <LineChart className="h-6 w-6 text-white/70" />,
  //     title: "Market Prediction",
  //     description:
  //       "See future property value projections based on historical data and market trends",
  //   },
  //   {
  //     icon: <Map className="h-6 w-6 text-white/70" />,
  //     title: "Smart Location Analysis",
  //     description:
  //       "Identify prime locations with optimal accessibility, amenities and growth potential",
  //   },
  // ];

  const handleDailyClick = () => {
    startConversation(
      "Tell me about the latest real estate news in Mumbai and Pune"
    );
  };

  const handleWeatherClick = () => {
    startConversation("How does the weather in Delhi affect property choices?");
  };

  const handleDreamHomeClick = () => {
    startConversation(
      "Show me the best properties for first-time buyers in my area"
    );
  };

  const handleBuyingGuideClick = () => {
    startConversation(
      "What do I need to know before applying for a home loan?"
    );
  };

  const handleHiddenCostClick = () => {
    startConversation(
      "Tell me about all the hidden charges when buying a house."
    );
  };

  const handleAIValuationClick = () => {
    startConversation("How does AI calculate property valuations?");
  };

  const handleVirtualTourClick = () => {
    startConversation(
      "Tell me about virtual property tours and their benefits"
    );
  };

  const handleMarketPredictionClick = () => {
    startConversation(
      "How accurate are AI-based real estate market predictions?"
    );
  };

  return (
    <div className="h-full w-full overflow-auto pb-24">
          <div className="absolute top-4 w-full flex justify-end">
            <Navbar />
          </div>
      {!isConversationStarted && (
        <div className="p-6 max-w-4xl w-full mx-auto flex flex-col items-center mt-20 mb-28 relative">
          {/* Futuristic background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-teal-500/5 rounded-full blur-2xl"></div>
          </div>
          

          <div className="fixed p-2 bottom-0 w-full mx-auto max-w-3xl z-20">
            <MessageInput />
          </div>


          {/* Hero section with futuristic greeting */}
          <div className="relative mb-8 md:mb-12 text-center font-copilot">
            <h1 className="font-segoe text-[26px] md:text-4xl font-medium text-[#333333]">
              Future of Real Estate, Unlocked.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
            <Card
              className="overflow-hidden bg-gradient-to-tl from-[#333333] to-[#777777] rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={handleDailyClick}
            >
              <CardContent className="p-3 flex flex-col items-center gap-4">
                <div className="relative">
                <div className="p-6 md:p-8 flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-6 rounded-full bg-white/20 animate-pulse">
                    <div className="bg-white/30 w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center animate-pulse">
                      <div className="bg-white/40 w-6 h-6 md:w-10 md:h-10 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <h2 className="text-[22px] md:text-2xl text-white font-semibold mb-2">
                    RightHome Daily
                  </h2>
                  <div className="flex items-center text-xs md:text-sm text-white/70 mb-2">
                    <span>May 13</span>
                    <span className="mx-2">•</span>
                    <span>3 min</span>
                  </div>
                  <p className="text-white/90 text-xs md:text-sm">
                    Mumbai property prices surge, new metro line boosts Pune
                    suburbs, affordable housing initiative in Bangalore
                  </p>
                  <Button className="bg-white mt-6 text-[#333333] hover:bg-white/90 w-full rounded-[2rem] flex items-center gap-2 px-6 py-4 group-hover:shadow-lg transition-all">
                    <Play className="h-4 w-4" />
                    Play now
                  </Button>
                </div>
              </div>
              </CardContent>
            </Card>

            <div className="flex flex-col justify-between gap-4 md:gap-0">
              <Card
                className="overflow-hidden bg-[#fffff5]/60 backdrop-blur-sm rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleBuyingGuideClick}
              >
                <CardContent className="p-3 flex flex-col gap-4">
                  <div className="md:w-40 md:h-40 w-32 h-32 md:p-6 p-3 flex flex-col justify-between">
                    <h1 className="text-sm md:text-md font-bold">New Delhi</h1>
                    <div className="flex items-end">
                        <span className="text-3xl md:text-5xl font-medium">35°</span>
                        <span className="text-sm text-[#666666] ml-2 mb-2 font-medium">
                            Haze
                        </span>
                    </div>
                    <div className="text-xs md:text-sm text-[#666666] mt-1 font-medium">
                        H 35° L 27°
                      </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden bg-[#fffff5] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleHiddenCostClick}
              >
                <CardContent className="p-3 flex items-end gap-4">
                  <Image
                    src={"/images/img3.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="md:w-40 md:h-40 w-32 h-32 object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[18px] md:text-[22px] text-[#333333] p-2 font-medium mb-1">
                    Explore great properties
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl text-center font-medium text-[#333333] mt-16 md:mt-24 mb-12">
            Real Estate Topics You Might Love
          </h1>
          {/* Podcasts and Investment Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
            <Card
              className="overflow-hidden bg-[#fffff5] rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={handleDreamHomeClick}
            >
              <CardContent className="p-3 flex flex-col items-center gap-4">
                <Image
                  src={"/images/img1.png"}
                  alt="Podcast"
                  width={112}
                  height={112}
                  className="w-full h-72 object-cover rounded-[3rem]"
                />
                <h3 className="text-[20px] md:text-[26px] text-[#333333] font-medium mb-1 p-4">
                  Find Your Dream Home
                </h3>
              </CardContent>
            </Card>

            <div className="flex flex-col justify-between gap-4 md:gap-0">
              <Card
                className="overflow-hidden bg-[#fffff5] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleBuyingGuideClick}
              >
                <CardContent className="p-3 flex items-end gap-4">
                  <Image
                    src={"/images/img2.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="md:w-40 md:h-40 w-32 h-32 object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[18px] md:text-[22px] text-[#333333] p-2 font-medium mb-1">
                    Home Buying Guide
                  </h3>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden bg-[#fffff5] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleHiddenCostClick}
              >
                <CardContent className="p-3 flex items-end gap-4">
                  <Image
                    src={"/images/img3.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="md:w-40 md:h-40 w-32 h-32 object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[18px] md:text-[22px] text-[#333333] p-2 font-medium mb-1">
                    Know the Hidden Costs
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl text-center font-medium text-[#333333] mt-16 md:mt-24 mb-12">
            Real Estate Topics Smart Investors Explore
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
            {/* Real Estate Investment */}
            <Card
              className="overflow-hidden bg-[#fffff5] rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={handleDreamHomeClick}
            >
              <CardContent className="p-3 flex flex-col items-center gap-4">
                <Image
                  src="/images/img3.png"
                  alt="Real Estate Investment"
                  width={112}
                  height={112}
                  className="w-full h-72 object-cover rounded-[3rem]"
                />
                <h3 className="text-[20px] md:text-[26px] text-[#333333] font-medium mb-1 p-4">
                  Invest Smart in Real Estate
                </h3>
              </CardContent>
            </Card>

            {/* Side Cards */}
            <div className="flex flex-col justify-between gap-4 md:gap-0">
              <Card
                className="overflow-hidden bg-[#fffff5] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleMarketPredictionClick}
              >
                <CardContent className="p-3 flex items-end gap-4">
                  <Image
                    src="/images/img2.png" // replace with relevant image
                    alt="Rental Yield"
                    width={112}
                    height={112}
                    className="md:w-40 md:h-40 w-32 h-32 object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[18px] md:text-[22px] text-[#333333] p-2 font-medium mb-1">
                    Understand Rental Yields
                  </h3>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden bg-[#fffff5] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleAIValuationClick}
              >
                <CardContent className="p-3 flex items-end gap-4">
                  <Image
                    src="/images/img1.png" // replace with relevant image
                    alt="Legal Property Check"
                    width={112}
                    height={112}
                    className="md:w-40 md:h-40 w-32 h-32 object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[18px] md:text-[22px] text-[#333333] p-2 font-medium mb-1">
                    Legal Checklist for Buyers
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Virtual Reality Tours Section */}
          <Card
            className="overflow-hidden bg-[#fffff5] border border-[#e6e6e6] text-white rounded-[3rem] shadow-md border-none cursor-pointer transition-transform hover:scale-[1.01] w-full mb-10"
            onClick={handleVirtualTourClick}
          >
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#999999]/30 text-sm text-[#333333] font-medium mb-4">
                    <div className="h-2 w-2 rounded-full bg-[#333333]/90 animate-pulse mr-2" />
                    <span>New Feature</span>
                  </div>
                  <h2 className="text-3xl text-[#333333] font-bold mb-3">
                    Virtual Property Tours
                  </h2>
                  <p className="text-[#666666] font-medium max-w-md">
                    Experience properties remotely with our immersive 3D virtual
                    tour technology powered by AI
                  </p>
                  <Button className="mt-4 bg-[#999999]/30 text-[#333333] hover:bg-[#999999]/20 shadow-md rounded-[1rem] px-6 font-medium">
                    Explore Tours
                  </Button>
                </div>
                {/* <div className="w-48 h-48 relative bg-gradient-to-br from-gray-500/30 to-slate-500/30 rounded-full flex items-center justify-center backdrop-blur-md">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-500/50 to-slate-500/50 animate-pulse absolute"></div>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-500/70 to-slate-500/70 absolute"></div>
                  <div className="w-24 h-24 rounded-full bg-white/20 absolute flex items-center justify-center">
                    <Logo />
                  </div>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* Smart Property Assistant */}
          <Card className="overflow-hidden bg-[#fffff5] border border-[#e6e6e6] rounded-[3rem] shadow-md border-none w-full">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2 text-[#333333]">
                  Your Smart Property Assistant
                </h2>
                <p className="text-[#666666] font-medium max-w-lg mx-auto">
                  Ask anything about real estate markets, property investments,
                  or home buying tips
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {[
                  "How does AI determine property value?",
                  "What are smart home features to look for?",
                  "Compare property investment vs stock market",
                ].map((question, idx) => (
                  <Button
                    key={idx}
                    className="text-sm shadow-md border-muted gap-2 h-auto py-3 px-4 rounded-[1rem] bg-[#999999]/30 hover:bg-[#999999]/20 text-[#333333]"
                    onClick={() => startConversation(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div>
            <h1 className="text-[16px] md:text-[20px] text-center text-[#777777] font-medium mt-20">
              RightHomeAI may make mistakes.
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
