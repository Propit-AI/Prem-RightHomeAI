"use client"

import { Button } from "@/components/ui/button"
import { useChat } from "@/contexts/chat-context"

export default function LabsContent() {
  const { startConversation } = useChat()

  const handleVirtualStagingClick = () => {
    startConversation("Show me how virtual home staging works")
  }

  const handleFloorPlanClick = () => {
    startConversation("Generate a 3D floor plan for a 2BHK apartment")
  }

  const handleNeighborhoodClick = () => {
    startConversation("Analyze the Whitefield neighborhood in Bangalore")
  }

  const handlePricePredictionClick = () => {
    startConversation("Predict property values in South Delhi for the next 5 years")
  }

  const handleAllFeaturesClick = () => {
    startConversation("Tell me about all the experimental AI features in RightHome Labs")
  }

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
            className="aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center relative cursor-pointer"
            onClick={handleVirtualStagingClick}
          >
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Virtual Home Staging"
              className="w-3/4 h-3/4 object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent p-6">
              <h3 className="text-xl font-medium">Virtual Home Staging</h3>
              <p className="text-sm text-[#666666]">Transform empty spaces with AI-generated furniture</p>
            </div>
          </div>

          <div
            className="aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative cursor-pointer"
            onClick={handleFloorPlanClick}
          >
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="3D Floor Plan Generator"
              className="w-3/4 h-3/4 object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent p-6">
              <h3 className="text-xl font-medium">3D Floor Plan Generator</h3>
              <p className="text-sm text-[#666666]">Create detailed 3D models from simple floor plans</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative cursor-pointer"
            onClick={handleNeighborhoodClick}
          >
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Neighborhood Analyzer"
              className="w-3/4 h-3/4 object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent p-6">
              <h3 className="text-xl font-medium">Neighborhood Analyzer</h3>
              <p className="text-sm text-[#666666]">AI-powered insights on locality safety, amenities and growth</p>
            </div>
          </div>

          <div
            className="aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative cursor-pointer"
            onClick={handlePricePredictionClick}
          >
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Price Prediction Engine"
              className="w-3/4 h-3/4 object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent p-6">
              <h3 className="text-xl font-medium">Price Prediction Engine</h3>
              <p className="text-sm text-[#666666]">Forecast property values with machine learning models</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-[#333333] rounded-[3rem] shadow-md hover:bg-[#444444] text-white px-8" onClick={handleAllFeaturesClick}>
            Try all experimental features
          </Button>
        </div>
      </div>
    </div>
  )
}
