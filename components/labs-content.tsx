"use client";

import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function LabsContent() {
  return (
    <div className="p-3 pt-28">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-[#333333] text-white px-6 py-3 rounded-[3rem] shadow-md">
            <h2 className="text-xl font-bold tracking-wide">
              WayHomeAI<span className="font-normal">Labs</span>
            </h2>
          </div>
        </div>

        <h1 className="text-[26px] md:text-4xl font-medium text-center text-[#333333] mb-12">
          {`Explore the Future of Real Estate in Dubai`}
          <span className="block mt-2 font-bold">“Welcome to the WayHomeAI Lab”</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#fffff5] shadow-md p-2 rounded-[3rem]">
            <div className="aspect-video rounded-[3rem] bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center relative cursor-pointer">
              {/* <img
                src=""
                alt="Virtual Home Staging"
                className="w-3/4 h-3/4 object-cover rounded-3xl"
              /> */}
              <div className="absolute -bottom-12 shadow-md left-0 right-0 bg-white/70 backdrop-blur-sm rounded-3xl m-4 p-4">
                <h3 className="text-lg md:text-xl font-bold text-[#333333]">
                  Virtual Home Staging
                </h3>
                <p className="text-sm text-[#333333] font-semibold drop-shadow-lg">
                  Transform empty spaces with AI-generated furniture
                </p>
              </div>
            </div>
            <div className="p-6 mt-8 flex flex-col w-max">
              <span className="inline-block w-max bg-gradient-to-br from-pink-100 to-pink-200 text-pink-800 text-xs font-medium px-3 py-1 rounded-full mb-3">
                PREMIUM FEATURE
              </span>
              <Button
                className="bg-[#333333] rounded-[1.5rem] text-md md:text-lg shadow-md hover:bg-[#444444] text-white p-7 md:p-8 mt-4"
                onClick={() => {
                  window.open(
                    "https://www.righthomeai.com/labs/virtual-home-staging",
                    "_blank"
                  );
                }}
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="bg-[#fffff5] shadow-md p-2 rounded-[3rem]">
            <div className="aspect-video rounded-[2.8rem] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative cursor-pointer">
              {/* <img
                src="https://images.unsplash.com/photo-1736818691455-3a24166330fe?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="3D Floor Plan Generator"
                className="w-3/4 h-3/4 object-cover rounded-3xl"
              /> */}
              <div className="absolute -bottom-12 left-0 right-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-md m-4 p-4">
                <h3 className="text-lg md:text-xl font-bold text-[#333333]">
                  3D Floor Plan Generator
                </h3>
                <p className="text-sm font-medium text-[#333333]">
                  Create detailed 3D models from simple floor plans
                </p>
              </div>
            </div>

            <div className="p-6 mt-8 flex flex-col w-max">
              <span className="inline-block w-max bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-3">
                PREMIUM FEATURE
              </span>
              <Button
                className="bg-[#333333] rounded-[1.5rem] text-md md:text-lg shadow-md hover:bg-[#444444] text-white p-7 md:p-8 mt-4"
                onClick={() => {
                  window.open(
                    "https://www.righthomeai.com/labs/3d-floor-plan-generator",
                    "_blank"
                  );
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#fffff5] shadow-md p-2 rounded-[3rem]">
            <div className="aspect-video rounded-[3rem] bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative cursor-pointer">
              {/* <img
                src="https://images.unsplash.com/photo-1652512455891-11933272bc1f?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Neighborhood Analyzer"
                className="w-3/4 h-3/4 object-cover rounded-3xl"
              /> */}
              <div className="absolute -bottom-12 shadow-md left-0 right-0 bg-white/70 backdrop-blur-sm rounded-3xl m-4 p-4">
                <h3 className="text-lg md:text-xl font-bold text-[#333333]">
                  Neighborhood Analyzer
                </h3>
                <p className="text-sm font-medium text-[#333333]">
                  AI-powered insights on locality safety, amenities and growth
                </p>
              </div>
            </div>
            <div className="p-6 mt-8 flex flex-col w-max">
              <span className="inline-block w-max bg-blue-100 bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 text-xs font-medium px-3 py-1 rounded-full mb-3">
                PREMIUM FEATURE
              </span>
              <Button
                className="bg-[#333333] rounded-[1.5rem] text-md md:text-lg shadow-md hover:bg-[#444444] text-white p-7 md:p-8 mt-4"
                onClick={() => {
                  window.open(
                    "https://www.righthomeai.com/labs/neighborhood-analyzer",
                    "_blank"
                  );
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="bg-[#fffff5] shadow-md p-2 rounded-[3rem]">
            <div className="aspect-video rounded-[3rem] bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative cursor-pointer">
              {/* <img
                src="https://images.unsplash.com/photo-1718157582118-f04597eaae56?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Price Prediction Engine"
                className="w-3/4 h-3/4 object-cover rounded-3xl"
              /> */}
              <div className="absolute -bottom-12 shadow-md left-0 right-0 bg-white/70 backdrop-blur-sm rounded-3xl m-4 p-4">
                <h3 className="text-lg md:text-xl font-bold text-[#333333]">
                  Price Prediction Engine
                </h3>
                <p className="text-sm font-medium text-[#333333]">
                  Forecast property values with machine learning models
                </p>
              </div>
            </div>
            <div className="p-6 mt-8 flex flex-col w-max">
              <span className="inline-block w-max bg-blue-100 bg-gradient-to-br from-green-100 to-green-200 text-green-600 text-xs font-medium px-3 py-1 rounded-full mb-3">
                PREMIUM FEATURE
              </span>
              <Button
                className="bg-[#333333] rounded-[1.5rem] text-md md:text-lg shadow-md hover:bg-[#444444] text-white p-7 md:p-8 mt-4"
                onClick={() => {
                  window.open(
                    "https://www.righthomeai.com/labs/price-prediction-engine",
                    "_blank"
                  );
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-[#333333] rounded-[1.5rem] font-medium shadow-md hover:bg-[#444444] text-white px-8 py-4">
            Try all experimental features
          </button>
        </div>

        {/* <div className="mt-12 text-center">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
              <div>
                <Instagram className="h-8 w-8 text-[#333333] mx-auto mb-2" />
                <h1 className="text-lg md:text-xl font-semibold text-[#333333]">
                  Follow us on Instagram
                </h1>
                <h1 className="text-sm md:text-md text-[#666666] mt-2">
                  Stay updated with the latest features and updates from
                  RightHomeAi Labs
                </h1>
              </div>
              <div>
                <Github className="h-8 w-8 text-[#333333] mx-auto mb-2" />
                <h1 className="text-lg md:text-xl font-semibold text-[#333333]">
                  Contribute on GitHub
                </h1>
                <h1 className="text-sm md:text-md text-[#666666] mt-2">
                  Join our open-source community and help us improve RightHomeAi
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
                  Get the latest news and updates from RightHomeAi Labs
                </h1>
              </div>
            </div>

            <div className="w-full h-[2px] my-6 bg-[#333333]"></div>
            <h1 className="text-sm md:text-md text-[#666666] mt-6 text-center">
              Some righthomeai features are experimental and may not work as
              expected. We are constantly improving our AI models and your
              feedback is valuable to us. Please report any issues or
              suggestions to our support team.
              <br />
              <br />
              By using these features, you agree to our{" "}
              <a href="/legal/terms-of-use" className="underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/legal/privacy-statement" className="underline">
                Privacy Statement
              </a>
              .
            </h1>
          </div>
        </div> */}
      </div>
    </div>
  );
}
