"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, ChevronLeft, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function PropertyFilters() {
  const [isOpen, setIsOpen] = useState(true)
  const [priceRange, setPriceRange] = useState([20, 60])

  return (
    <div
      className={cn(
        "border-l border-white/20 bg-white/60 backdrop-blur-md transition-all duration-300 flex flex-col",
        isOpen ? "w-80" : "w-12",
      )}
    >
      <div className="h-16 border-b border-white/20 flex items-center justify-between px-4">
        {isOpen && <h2 className="font-semibold">Property Filters</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full hover:bg-blue-100 hover:text-blue-600"
        >
          {isOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {isOpen && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <Input id="location" placeholder="Delhi, India" className="pl-9 bg-white/70 border-white/30" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Price Range (in lakhs)</Label>
            <div className="pt-4">
              <Slider
                defaultValue={priceRange}
                max={200}
                step={5}
                onValueChange={(value) => setPriceRange(value as number[])}
                className="[&>span]:bg-gradient-to-r [&>span]:from-blue-500 [&>span]:to-purple-500"
              />
              <div className="flex justify-between mt-2 text-sm text-zinc-500">
                <span>₹{priceRange[0]} L</span>
                <span>₹{priceRange[1]} L</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Property Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start bg-white/70 border-white/30">
                Apartment
              </Button>
              <Button variant="outline" className="justify-start bg-white/70 border-white/30">
                House
              </Button>
              <Button variant="outline" className="justify-start bg-white/70 border-white/30">
                Villa
              </Button>
              <Button variant="outline" className="justify-start bg-white/70 border-white/30">
                Plot
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bedrooms</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white/70 border-white/30">
                1 BHK
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200 text-blue-700"
              >
                2 BHK
              </Button>
              <Button variant="outline" size="sm" className="bg-white/70 border-white/30">
                3 BHK
              </Button>
              <Button variant="outline" size="sm" className="bg-white/70 border-white/30">
                4+ BHK
              </Button>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-medium">Suggested Properties</h3>
            <Card className="overflow-hidden bg-white/70 border-white/30">
              <img src="/placeholder.svg?height=120&width=280" alt="Property" className="w-full h-32 object-cover" />
              <CardContent className="p-3">
                <h4 className="font-medium text-sm">Modern 2BHK in Dwarka</h4>
                <p className="text-sm text-zinc-500">₹58.5 Lakhs</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden bg-white/70 border-white/30">
              <img src="/placeholder.svg?height=120&width=280" alt="Property" className="w-full h-32 object-cover" />
              <CardContent className="p-3">
                <h4 className="font-medium text-sm">Spacious 2BHK in Rohini</h4>
                <p className="text-sm text-zinc-500">₹52.8 Lakhs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
