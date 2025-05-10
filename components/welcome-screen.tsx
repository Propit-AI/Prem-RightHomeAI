"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Home, MapPin, TrendingUp } from "lucide-react"

interface WelcomeScreenProps {
  onSearch: (query: string) => void
}

export default function WelcomeScreen({ onSearch }: WelcomeScreenProps) {
  const searchExamples = [
    "Find me a 2 BHK in Delhi under 60 lakhs",
    "Show 3 BHK apartments in Mumbai with sea view",
    "What are the best localities in Bangalore for families?",
    "Compare property prices in Noida vs Gurgaon",
  ]

  return (
    <div className="max-w-3xl min-h-screen mt-20 mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to RightHomeAI</h1>
        <p className="text-zinc-600 max-w-lg mx-auto">
          Your AI-powered real estate assistant. Ask me anything about properties, locations, or market trends to find
          your perfect home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Property Search</h3>
              <p className="text-sm text-zinc-600">
                Find your dream home with specific requirements like location, budget, and amenities
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Location Insights</h3>
              <p className="text-sm text-zinc-600">
                Get detailed information about neighborhoods, connectivity, and nearby amenities
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Market Analysis</h3>
              <p className="text-sm text-zinc-600">
                Understand property trends, investment potential, and price forecasts
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Builder Reputation</h3>
              <p className="text-sm text-zinc-600">Learn about developers, their past projects, and customer reviews</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Try asking about:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {searchExamples.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto py-3 px-4 text-left"
              onClick={() => onSearch(example)}
            >
              {example}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
