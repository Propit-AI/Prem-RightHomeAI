"use client"
import { useEffect, useState } from "react"
import ChatSuggestions from "@/components/chat-suggestions"
import ChatInterface from "@/components/chat-interface"
import { useChat } from "@/contexts/chat-context"
import MessageInput from "@/components/message-input"

export default function Home() {
  const { isConversationStarted } = useChat()
  const [showBottomInput, setShowBottomInput] = useState(false)

  // Add effect to handle the transition when conversation starts
  useEffect(() => {
    if (isConversationStarted) {
      // Brief delay to allow for smooth transition
      const timer = setTimeout(() => {
        setShowBottomInput(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setShowBottomInput(false)
    }
  }, [isConversationStarted])

  return (
    <div className="h-full w-full flex flex-col md:justify-between items-center p-6 pb-24 overflow-y-auto relative">
      {/* Mobile: Text content at top */}
      <div className="md:hidden text-xs text-[#666666] mb-6 mt-16">
        <p>
          RightHomeAI may make mistakes. By interacting with RightHomeAI, you agree to the{" "}
          <a href="#" className="underline">
            Terms of Use
          </a>
          . See our{" "}
          <a href="#" className="underline">
            Privacy Statement
          </a>
          .
        </p>
      </div>

      {/* Main content area - positioned differently on mobile vs desktop */}
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        {isConversationStarted ? (
          <ChatInterface />
        ) : (
          <>
            <div className="max-w-3xl w-full text-center gap-12 flex flex-col items-center">
              <h1 className="text-2xl md:text-4xl font-semibold text-[#333333]">
                Hey, what's on your mind today?
              </h1>
              <div className="w-full max-w-3xl mt-6">
                <MessageInput />
              </div>
              <ChatSuggestions />
            </div>
          </>
        )}
      </div>

      {/* Fixed MessageInput that appears at the bottom when conversation starts */}
      {isConversationStarted && (
        <div 
          className={`fixed w-full bottom-0 p-4 shadow-md transition-all duration-300 ease-in-out ${
            showBottomInput ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="w-full max-w-3xl mx-auto">
            <MessageInput />
          </div>
        </div>
      )}

      {/* Desktop: Text content at bottom */}
      <div className="hidden md:block text-xs text-[#666666] mt-12 text-center">
        <p>
          RightHomeAI may make mistakes. By interacting with RightHomeAI, you agree to the{" "}
          <a href="#" className="underline">
            Terms of Use
          </a>
          . See our{" "}
          <a href="#" className="underline">
            Privacy Statement
          </a>
          .
        </p>
      </div>
    </div>
  )
}