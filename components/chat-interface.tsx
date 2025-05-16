"use client"

import { useChat, type MessageType } from "@/contexts/chat-context"
import { useEffect, useRef } from "react"
import Logo from "./ui/logo"

export default function ChatInterface() {
  const { messages } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="w-full max-w-3xl mx-auto h-full">
      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto px-4 py-6">
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

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full animate-pulse shadow-md bg-gradient-to-tl from-[#333333] to-[#333333]/70 flex items-center justify-center mr-3 mt-1">
          <span className="w-4 h-4 rounded-full animate-pulse bg-[#fffff5]"></span>
        </div>
      )}

      <div
        className={`max-w-[80%] mb-10 p-3 rounded-2xl font-medium ${isUser ? "bg-gradient-to-tl from-[#333333] to-[#333333]/70 text-white" : "bg-[#777777]/10 text-[#333333]"}`}
      >
        <p className="text-xs md:text-sm">{message.content}</p>
        <div className={`text-[10px] mt-2 ${isUser ? "text-white/80" : "text-[#333333]"}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#fffff5] shadow-md flex items-center justify-center ml-3 mt-1">
          <span className="text-[#333333] font-medium text-xs">You</span>
        </div>
      )}
    </div>
  )
}
