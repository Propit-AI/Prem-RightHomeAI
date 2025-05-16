"use client"

import { useChat, type MessageType } from "@/contexts/chat-context"
import { useEffect, useRef, useState } from "react"
import Logo from "./ui/logo"

export default function ChatInterface() {
  const { messages } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-6 py-4 md:py-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: MessageType }) {
  const isUser = message.role === "user"
  const [displayedText, setDisplayedText] = useState(
    isUser ? message.content : ""
  )

  useEffect(() => {
    if (isUser) return

    let i = 0
    const speed = 20 // milliseconds per character

    const interval = setInterval(() => {
      if (i < message.content.length) {
        setDisplayedText((prev) => prev + message.content[i])
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [message.content, isUser])

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full animate-pulse shadow-md bg-gradient-to-tl from-[#333333] to-[#333333]/70 flex items-center justify-center mr-3 mt-1">
          <span className="w-4 h-4 rounded-full animate-pulse bg-[#fffff5]"></span>
        </div>
      )}

      <div
        className={`max-w-[80%] mb-10 px-5 py-3 rounded-[1rem] font-medium whitespace-pre-wrap ${
          isUser
            ? "bg-gradient-to-tl from-[#333333]/80 to-[#333333]/50 text-white"
            : "text-[#333333]"
        }`}
      >
        <p className="text-sm">
          {isUser ? message.content : displayedText}
          {!isUser && displayedText.length < message.content.length && (
            <span className="animate-pulse">|</span> // typing cursor
          )}
        </p>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#fffff5] shadow-md flex items-center justify-center ml-3 mt-1">
          <span className="text-[#333333] font-medium text-xs">You</span>
        </div>
      )}
    </div>
  )
}

