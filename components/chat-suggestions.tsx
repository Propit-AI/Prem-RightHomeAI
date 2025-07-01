"use client"

import { Button } from "@/components/ui/button"
import { Home, Building, MapPin, Compass, DollarSign, Search, Calendar, FileText } from "lucide-react"
import { useChat } from "@/contexts/chat-context"
import { useEffect, useState } from "react"

export default function ChatSuggestions() {
  const { startConversation } = useChat()
  const [columns, setColumns] = useState(1)

  // Update columns based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1280) { // xl
        setColumns(3)
      } else if (width >= 768) { // md
        setColumns(2)
      } else {
        setColumns(1)
      }
    }
    
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const suggestions = [
  { text: "2BHK under 80 lakhs", icon: Home },
  { text: "Explore luxury apartments", icon: Building },
  { text: "Properties near metro access", icon: MapPin },
  { text: "Best areas for families", icon: Compass },
  { text: "Schedule a 3BHK visit", icon: Calendar },
  { text: "Need help with loan approval?", icon: FileText },
  { text: "Compare city price trends", icon: DollarSign },
  { text: "Show me available villas", icon: Home },
  { text: "Top resale flats to explore", icon: Search },
];


  return (
    <div className="w-full h-full max-w-3xl mx-auto">
      {/* Mobile scrollable container */}
      <div className={`md:hidden flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory scrollbar-hide px-1`}>
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-center justify-start border-muted shadow-md font-medium text-[13px] gap-2 h-auto p-2 rounded-xl bg-[#fffef9] text-[#333333] w-max flex-shrink-0 snap-center z-50"
            onClick={() => startConversation(suggestion.text)}
          >
            {/* <suggestion.icon className="h-4 w-4 text-[#b7b7 b7]" /> */}
            <span className="">{suggestion.text}</span>
          </Button>
        ))}
      </div>
      
      {/* Desktop grid */}
      <div className={`hidden md:flex gap-2 px-2 flex-wrap`}>
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-center justify-start text-[15px] w-max shadow-md border-none gap-2 h-auto py-3 px-4 rounded-xl bg-[#fffef9] text-[#333333] z-10"
            onClick={() => startConversation(suggestion.text)}
          >
            {/* <suggestion.icon className="h-4 w-4 text-[#b7b7b7]" /> */}
            <span>{suggestion.text}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}