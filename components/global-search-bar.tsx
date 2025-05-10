"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendHorizontal, Mic, ImageIcon, Paperclip } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GlobalSearchBar() {
  const [input, setInput] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Navigate to chat page and pass the query
    router.push("/")

    // In a real app, you would store the query in a global state or context
    // to be picked up by the chat interface

    setInput("")
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 z-50">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-2">
          <Button type="button" size="icon" variant="ghost" className="rounded-full text-zinc-500 hover:text-blue-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="rounded-full text-zinc-500 hover:text-blue-500">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about properties..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button type="button" size="icon" variant="ghost" className="rounded-full text-zinc-500 hover:text-blue-500">
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
