"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useChat } from "@/contexts/chat-context";
import { useState, useEffect } from "react";
import Image from "next/image";
import MessageInput from "@/components/message-input";
import Navbar from "@/components/navbar";
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

  const handleDailyClick = () => {
    startConversation(
      "Tell me about the latest real estate news in Dubai"
    );
  };

  const handleWeatherClick = () => {
    startConversation("How does the weather in Dubai affect property choices?");
  };

  const handleGreateProperties = () => {
    startConversation("Let me help with explore great properties")
  }

  const handleInvestment = () => {
    startConversation("Investment strategy guide");
  }

  const handleFirstTimeBuyer = () => {
    startConversation("First Time home buyer checklist");
  }

  const handleTopAreas = () => {
    startConversation("Top areas in Dubai for families & expats");
  }

  const handleUnderstanding = () => {
    startConversation("Understanding freehold vs leasehold in UAE");
  }

  const handleInvest = () => {
    startConversation("How much should you invest as a non-resident?");
  }

  const handleWhereToBuy = () => {
    startConversation("Dubai vs Abu Dhabi — Where to buy?");
  }

  const handlePaymentPlans = () => {
    startConversation("Payment plans: 20:80, 60:40, and what they mean");
  }

  const handleLegal = () => {
    startConversation("Legal checklist before signing any deal");
  }

  const askZara1 = () => {
    startConversation(
      "Zara, where should I buy if I want to rent it out later?"
    );
  };

  const askZara2 = () => {
    startConversation(
      "Which area fits a family under AED 2M?"
    );
  };

  const askZara3 = () => {
    startConversation(
      "How do I compare a ready home vs off-plan?"
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
        <div className="p-6 max-w-4xl w-full mx-auto flex flex-col items-center mt-12 mb-28 relative">
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
                    WayHome Daily
                  </h2>
                  <div className="flex items-center text-xs md:text-sm text-white/70 mb-2">
                    <span>June 30</span>
                    <span className="mx-2">•</span>
                    <span>3 min</span>
                  </div>
                  <p className="text-white/90 text-sm">
                    Dubai sees record off-plan sales; Marina, JVC, and Business Bay top buyer interest. UAE’s Golden Visa attracts global investors.
                  </p>
                  <Button className="bg-white mt-6 text-[#333333] hover:bg-white/90 w-full rounded-[2rem] flex items-center gap-2 px-6 py-4 group-hover:shadow-lg transition-all">
                    <Play className="h-4 w-4" />
                    Play now
                  </Button>
                </div>
              </div>
              </CardContent>
            </Card>

            <div className="grid grid-rows-2 gap-4">
              <Card
                className="overflow-hidden bg-[#fffdf4]/60 backdrop-blur-sm rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleWeatherClick}
              >
                <CardContent className="">
                  <div className="grid grid-rows-3 items-center mt-6">
                    <h1 className="text-sm md:text-md font-bold">Dubai</h1>
                    <div className="">
                        <span className="text-3xl md:text-5xl font-medium">34°</span>
                        <span className="text-sm text-[#666666] ml-2 font-medium">
                            Haze
                        </span>
                    </div>
                    <div className="text-xs md:text-sm text-[#666666] font-medium">
                        H 36° L 29°
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleGreateProperties}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-4">
                  <Image
                    src={"/images/G1img2.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="h-full w-full object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[16px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                    Explore great properties
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* WayHome Guides */}
          <div className="text-center mb-8 md:mb-12 font-copilot">
            <h1 className="text-[26px] md:text-4xl text-center font-medium text-[#333333] mt-16 md:mt-20 mb-4">
              WayHome Guides
            </h1>
            <p className="text-[16px] md:text-xl font-semibold">Explore with confidence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
            <Card
              className="overflow-hidden bg-[#fffdf4] rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={handleTopAreas}
            >
              <CardContent className="p-3 flex flex-col items-center gap-4">
                <Image
                  src={"/heroImages/img1.png"}
                  alt="Podcast"
                  width={112}
                  height={112}
                  className="w-full h-[20rem] object-cover rounded-[3rem]"
                />
                <h3 className="text-[20px] md:text-[24px] text-[#333333] font-medium mb-1 px-4 py-1">
                  Top Areas in Dubai for Families & Expats
                  
                </h3>
              </CardContent>
            </Card>

            <div className="flex flex-col justify-between gap-4">
              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleInvestment}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-2">
                  <Image
                    src={"/heroImages/img2.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="h-full w-full object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[16px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                    Investment Strategy Guide
                  </h3>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleFirstTimeBuyer}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-2">
                  <Image
                    src={"/heroImages/img3.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="h-full w-full object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[16px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                    First-Time Home Buyer Checklist
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Real Estate Topics Section */}
          <div className="text-center mb-8 md:mb-12 font-copilot">
            <h1 className="text-[26px] md:text-4xl text-center font-medium text-[#333333] mt-16 md:mt-20 mb-4">
              {`Real Estate Topics You'll Love`}
            </h1>
            <p className="text-[16px] md:text-xl font-semibold">Made for curious buyers and smart investors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
            <div className="flex flex-col gap-4">
            <Card
              className="overflow-hidden bg-[#fffdf4] rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={handleUnderstanding}
            >
              <CardContent className="p-3 flex flex-col items-center gap-4">
                <Image
                  src={"/heroImages/img4.png"}
                  alt="Podcast"
                  width={112}
                  height={112}
                  className="w-full h-72 top-2 object-cover rounded-[3rem]"
                />
                <h3 className="text-[20px] md:text-[24px] text-[#333333] font-medium mb-1 p-4">
                  Understanding freehold vs leasehold in UAE
                </h3>
              </CardContent>
            </Card>
              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleInvest}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-2">
                  <Image
                    src={"/heroImages/img5.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="h-full w-full object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[16px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                    How much should you invest as a non-resident?
                  </h3>
                </CardContent>
              </Card>
              </div>
            <div className="grid grid-rows-3 justify-between gap-4">
              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleWhereToBuy}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-2">
                  <Image
                    src={"/heroImages/img3.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[16px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                    Dubai vs Abu Dhabi — Where to buy?
                  </h3>
                </CardContent>
              </Card>
              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handlePaymentPlans}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-2">
                  <Image
                    src={"/heroImages/img2.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="h-full w-full object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[16px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                    Payment plans: 20:80, 60:40, and what they mean
                  </h3>
                </CardContent>
              </Card>
              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={handleLegal}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-2">
                  <Image
                    src={"/heroImages/img4.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="h-full w-full object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[16px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                    Legal checklist before signing any deal
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Podcast & play section */}
          <div className="text-center mb-8 md:mb-12 font-copilot">
            <h1 className="text-[26px] md:text-4xl text-center font-medium text-[#333333] mt-16 md:mt-20 mb-4">Podcast & Play🎙</h1>
            <p className="text-[16px] md:text-xl font-semibold">Weekly audio bites on investing smart in Dubai real estate</p>
          </div>
          <div className="grid grid-cols-1 gap-6 mb-10 w-full">
              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                // onClick={handleMarketPredictionClick}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-2">
                  <Image
                    src="/images/play.png" // replace with relevant image
                    alt="Rental Yield"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover rounded-[3rem]"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-[18px] md:text-[40px] text-[#333333] p-2 font-medium">Play Now</h1>
                    <h3 className="text-[14px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                      Ep 07: Best areas to buy under AED 1.5M
                    </h3>
                  </div>
                </CardContent>
              </Card>
          </div>

          {/* Ask Zara */}
          <div className="text-center mb-8 md:mb-12 font-copilot">
            <h1 className="text-[26px] md:text-4xl text-center font-medium text-[#333333] mt-16 md:mt-20 mb-4">
              Ask Zara – Your Property Assistant
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
            <Card
              className="overflow-hidden bg-[#fffdf4] rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={askZara1}
            >
              <CardContent className="p-3 flex flex-col items-center gap-2">
                <Image
                  src={"/images/ZaraImg1.png"}
                  alt="Podcast"
                  width={112}
                  height={112}
                  className="w-full h-[21rem] object-cover rounded-[3rem]"
                />
                <h3 className="text-[20px] md:text-[24px] text-[#333333] font-medium px-4 py-1">
                  Zara, where should I buy if I want to rent it out later?
                </h3>
              </CardContent>
            </Card>

            <div className="grid grid-rows-2 justify-between gap-4">
              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={askZara2}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-2">
                  <Image
                    src={"/images/ZaraImg2.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="md:w-full md:h-full w-32 h-32 object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[16px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                    Which area fits a family under AED 2M?
                  </h3>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden bg-[#fffdf4] rounded-[3rem] md:rounded-[4rem] shadow-md border-[#e6e6e6] cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={askZara3}
              >
                <CardContent className="p-3 grid grid-cols-2 items-end gap-2">
                  <Image
                    src={"/images/ZaraImg3.png"}
                    alt="Investment Guide"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover rounded-[3rem]"
                  />
                  <h3 className="text-[16px] md:text-[20px] text-[#333333] p-2 font-medium mb-1">
                    How do I compare a ready home vs off-plan?
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>
            <h1 className="text-[16px] md:text-xl text-[#333333] font-medium text-center mt-4">
              Just ask. Zara is available 24/7 — via voice or WhatsApp.
              Get clarity, not calls. Smart suggestions, not spam.
            </h1>

          {/* Virtual Reality Tours Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-28 mb-12">
            <div className="inline-flex w-max items-center px-4 py-1 rounded-full bg-[#fffef9] shadow text-sm text-[#333333] font-medium">
            <div className="h-2 w-2 rounded-full bg-[#333333]/90 animate-pulse mr-2" />
              <span>New Feature</span>
            </div>
            <h2 className="text-[26px] md:text-4xl text-center font-medium text-[#333333]">
              Virtual Property Tours
            </h2>
          </div>
          <Card
            className="overflow-hidden bg-[#fffdf4] border border-[#e6e6e6] text-white rounded-[3rem] shadow-md border-none cursor-pointer transition-transform hover:scale-[1.01] w-full mb-10"
            onClick={handleVirtualTourClick}
          >
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                    <h1 className="text-2xl md:text-3xl font-semibold text-[#333333] mb-2">
                      Experience Dubai homes from wherever you are
                    </h1>
                    <p className="text-lg md:text-xl text-[#666666] font-medium">
                      Immersive 3D tours of verified projects powered by AI.
                    </p>
                  <div className="bg-gradient-to-t to-[#fffdf4] from-white text-center w-max mt-4 border-2 rounded-xl border-white shadow-md">
                  <button
                    className="text-sm font-semibold py-3 px-4 text-[#333333]"
                  >
                    Explore Virtual Tours
                  </button>
                </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Property Assistant */}
          <Card className="overflow-hidden bg-[#fffdf4] rounded-[3rem] shadow-md border-none w-full">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 text-[#333333]">
                  Need help deciding?
                </h2>
                <p className="text-[#666666] font-medium max-w-lg mx-auto">
                  Talk to Zara and get your shortlist in under 5 minutes.
                </p>
              </div>

              <div className="grid md:grid-cols-2  grid-rows-1 gap-4 mt-6">
                <div className="bg-gradient-to-t to-[#fffdf4] from-white border-2 text-center rounded-xl border-white shadow-md">
                  <button
                    className="text-sm font-semibold py-3 px-4 text-[#333333]"
                  >
                    Talk to Zara Now
                  </button>
                </div>
                <div className="bg-gradient-to-t to-[#fffdf4] from-white text-center border-2 rounded-xl border-white shadow-md">
                  <button
                    className="text-sm font-semibold py-3 px-4 text-[#333333]"
                  >
                    Get Property Picks on Email
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h1 className="text-[12px] md:text-[16px] text-center tracking-wide text-[#777777] font-medium mt-20">
              RightHomeAI may make mistakes.
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
