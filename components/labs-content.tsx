"use client";

import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/chat-context";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function LabsContent() {
  const { startConversation } = useChat();

  const handleVirtualStagingClick = () => {
    startConversation("Show me how virtual home staging works");
  };

  const handleFloorPlanClick = () => {
    startConversation("Generate a 3D floor plan for a 2BHK apartment");
  };

  const handleNeighborhoodClick = () => {
    startConversation("Analyze the Whitefield neighborhood in Bangalore");
  };

  const handlePricePredictionClick = () => {
    startConversation(
      "Predict property values in South Delhi for the next 5 years"
    );
  };

  const handleAllFeaturesClick = () => {
    startConversation(
      "Tell me about all the experimental AI features in RightHome Labs"
    );
  };

  return (
    <div className="p-6 pt-28">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-[#2d2a3c] text-white px-6 py-3 rounded-[3rem] shadow-md">
            <h2 className="text-xl font-bold tracking-wide">
              RightHome<span className="font-normal">Labs</span>
            </h2>
          </div>
        </div>

        <h1 className="text-[26px] md:text-4xl font-semibold text-center text-[#333333] mb-12">
          RightHome Labs features are experimental AI initiatives
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            className="aspect-video rounded-[3rem] overflow-hidden bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center relative cursor-pointer"
            onClick={handleVirtualStagingClick}
          >
            <img
              src="https://images.unsplash.com/photo-1669301048918-6ca9a3cd39c1?q=80&w=1358&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Virtual Home Staging"
              className="w-3/4 h-3/4 object-cover rounded-3xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm rounded-3xl m-4 p-4">
              <h3 className="text-lg md:text-xl font-medium">
                Virtual Home Staging
              </h3>
              <p className="text-xs md:text-sm text-[#666666] drop-shadow-lg">
                Transform empty spaces with AI-generated furniture
              </p>
            </div>
          </div>

          <div
            className="aspect-video rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative cursor-pointer"
            onClick={handleFloorPlanClick}
          >
            <img
              src="https://images.unsplash.com/photo-1736818691455-3a24166330fe?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="3D Floor Plan Generator"
              className="w-3/4 h-3/4 object-cover rounded-3xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm rounded-3xl m-4 p-4">
              <h3 className="text-lg md:text-xl font-medium">
                3D Floor Plan Generator
              </h3>
              <p className="text-xs md:text-sm text-[#666666]">
                Create detailed 3D models from simple floor plans
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="aspect-video rounded-[3rem] overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative cursor-pointer"
            onClick={handleNeighborhoodClick}
          >
            <img
              src="https://images.unsplash.com/photo-1652512455891-11933272bc1f?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Neighborhood Analyzer"
              className="w-3/4 h-3/4 object-cover rounded-3xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm rounded-3xl m-4 p-4">
              <h3 className="text-lg md:text-xl font-medium">
                Neighborhood Analyzer
              </h3>
              <p className="text-xs md:text-sm text-[#666666]">
                AI-powered insights on locality safety, amenities and growth
              </p>
            </div>
          </div>

          <div
            className="aspect-video rounded-[3rem] overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative cursor-pointer"
            onClick={handlePricePredictionClick}
          >
            <img
              src="https://images.unsplash.com/photo-1718157582118-f04597eaae56?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Price Prediction Engine"
              className="w-3/4 h-3/4 object-cover rounded-3xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm rounded-3xl m-4 p-4">
              <h3 className="text-lg md:text-xl font-medium">
                Price Prediction Engine
              </h3>
              <p className="text-xs md:text-sm text-[#666666]">
                Forecast property values with machine learning models
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-[#333333] rounded-[3rem] shadow-md hover:bg-[#444444] text-white px-8"
            onClick={handleAllFeaturesClick}
          >
            Try all experimental features
          </Button>
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
              <div>
                <Instagram className="h-8 w-8 text-[#333333] mx-auto mb-2" />
                <h1 className="text-lg md:text-xl font-semibold text-[#333333]">
                  Follow us on Instagram
                </h1>
                <h1 className="text-sm md:text-md text-[#666666] mt-2">
                  Stay updated with the latest features and updates from
                  RightHome Labs
                </h1>
              </div>
              <div>
                <Github className="h-8 w-8 text-[#333333] mx-auto mb-2" />
                <h1 className="text-lg md:text-xl font-semibold text-[#333333]">
                  Contribute on GitHub
                </h1>
                <h1 className="text-sm md:text-md text-[#666666] mt-2">
                  Join our open-source community and help us improve RightHome
                  Labs
                </h1>
              </div>
              <div>
                <Linkedin className="h-8 w-8 text-[#333333] mx-auto mb-2" />
                <h1 className="text-lg md:text-xl font-semibold text-[#333333]">
                  Connect with us on LinkedIn
                </h1>
                <h1 className="text-sm md:text-md text-[#666666] mt-2">
                  Network with our team and explore career opportunities
                </h1>
              </div>
              <div>
                <Twitter className="h-8 w-8 text-[#333333] mx-auto mb-2" />
                <h1 className="text-lg md:text-xl font-semibold text-[#333333]">
                  Follow us on Twitter
                </h1>
                <h1 className="text-sm md:text-md text-[#666666] mt-2">
                  Get the latest news and updates from RightHome Labs
                </h1>
              </div>
            </div>
            <h1 className="text-sm md:text-md text-[#666666] mt-6 text-center">
              Some righthome.ai features are experimental and may not work as
              expected. We are constantly improving our AI models and your
              feedback is valuable to us. Please report any issues or
              suggestions to our support team.
              <br />
              <br />
              By using these features, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Statement
              </a>
              .
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
