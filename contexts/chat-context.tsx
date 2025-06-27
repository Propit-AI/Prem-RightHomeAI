"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export type PropertyType = {
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  area: string;
  image: string;
};

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: any | PropertyType[];
  timestamp: Date;
  isStreaming?: boolean;
  suggestions?: string[]; // Add suggestions field
};

type ChatContextType = {
  messages: MessageType[]
  addMessage: (content: string, role: "user" | "assistant") => Promise<void>
  sendMessage: (content: string) => Promise<void> // Add sendMessage function
  clearMessages: () => void
  isConversationStarted: boolean
  startConversation: (initialMessage?: string) => void
  setIsConversationStarted: (value: boolean) => void;
  isLoading: boolean;
  currentSuggestions: string[]; // Track current suggestions
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isConversationStarted, setIsConversationStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])
  const router = useRouter()
  const pathname = usePathname()

  // Reset conversation when navigating to home
  useEffect(() => {
    if (pathname === "/" && messages.length === 0) {
      setIsConversationStarted(false)
    }
  }, [pathname, messages.length])

  const sendMessage = async (content: string) => {
    // Clear current suggestions when user sends a message
    setCurrentSuggestions([])
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    
    try {
      // Add a streaming message placeholder
      const streamingMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        timestamp: new Date(),
        isStreaming: true,
      }
      setMessages((prev) => [...prev, streamingMessage])

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: content,
          conversationHistory: messages 
        }),
      })

      const data = await response.json()

      // Extract suggestions from response
      const suggestions = data.suggestions || []
      setCurrentSuggestions(suggestions)

      // Update the streaming message with actual response
      setMessages((prev) => prev.map(msg => 
        msg.id === streamingMessage.id 
          ? { 
              ...msg, 
              content: data.properties ? data.properties : data.text || "I'm sorry, I couldn't process your request.",
              isStreaming: false,
              suggestions: suggestions
            }
          : msg
      ))

    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Update with error message
      setMessages((prev) => prev.map(msg => 
        msg.isStreaming 
          ? { 
              ...msg, 
              content: "I'm sorry, there was an error processing your request. Please try again.",
              isStreaming: false 
            }
          : msg
      ))
      setCurrentSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  const addMessage = async (content: string, role: "user" | "assistant") => {
    if (role === "user") {
      await sendMessage(content)
    } else {
      const newMessage: MessageType = {
        id: Date.now().toString(),
        content,
        role,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
    }
  }

  const clearMessages = () => {
    setMessages([])
    setIsConversationStarted(false)
    setCurrentSuggestions([])
  }

  const startConversation = (initialMessage?: string) => {
    if (pathname !== "/chat") {
      router.push("/chat")
    }

    setIsConversationStarted(true)

    if (initialMessage) {
      sendMessage(initialMessage)
    }
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        sendMessage,
        clearMessages,
        isConversationStarted,
        startConversation,
        setIsConversationStarted,
        isLoading,
        currentSuggestions,
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