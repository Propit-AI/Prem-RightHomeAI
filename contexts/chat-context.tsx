"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export type MessageType = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type ChatContextType = {
  messages: MessageType[]
  addMessage: (content: string, role: "user" | "assistant") => void
  clearMessages: () => void
  isConversationStarted: boolean
  startConversation: (initialMessage?: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isConversationStarted, setIsConversationStarted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Reset conversation when navigating to home
  useEffect(() => {
    if (pathname === "/" && messages.length === 0) {
      setIsConversationStarted(false)
    }
  }, [pathname, messages.length])

  const addMessage = (content: string, role: "user" | "assistant") => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const clearMessages = () => {
    setMessages([])
    setIsConversationStarted(false)
  }

  const startConversation = (initialMessage?: string) => {
    if (pathname !== "/") {
      router.push("/")
    }

    setIsConversationStarted(true)

    if (initialMessage) {
      // Add user message
      addMessage(initialMessage, "user")

      // Simulate AI response
      setTimeout(() => {
        let response = "I'm searching for properties that match your criteria. Here are some options I found..."

        if (initialMessage.includes("Delhi")) {
          response =
            "I found several 2BHK apartments in Delhi under 60 lakhs. The best options are in Dwarka, Rohini, and Vasant Kunj areas. Would you like to see specific listings?"
        } else if (initialMessage.includes("neighborhood") || initialMessage.includes("localities")) {
          response =
            "The best localities for families in major cities include Whitefield in Bangalore, Powai in Mumbai, and Gurgaon Sector 45-57 in NCR. These areas have good schools, parks, and security. Would you like more details about any specific area?"
        } else if (initialMessage.includes("price")) {
          response =
            "Property prices vary significantly across cities. In Delhi NCR, the average price is ₹5,500-7,500 per sq ft, while Mumbai ranges from ₹12,000-30,000 per sq ft depending on the area. Bangalore averages ₹5,000-7,000 per sq ft. Would you like a more detailed price comparison?"
        }

        addMessage(response, "assistant")
      }, 1000)
    }
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isConversationStarted,
        startConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
