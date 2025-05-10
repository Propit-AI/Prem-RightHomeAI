"use client"

import { useChat, type MessageType } from "@/contexts/chat-context"
import { useEffect, useRef } from "react"

export default function ChatInterface() {
  const { messages } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="w-full max-w-3xl mt-16 mx-auto h-full">
      <div className="space-y-6">
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
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3 mt-1">
          <span className="text-white font-bold text-xs">R</span>
        </div>
      )}

      <div
        className={`max-w-[80%] mb-10 p-4 rounded-2xl ${isUser ? "bg-[#0078d4] text-white" : "bg-[#f2f2f2] text-[#333333]"}`}
      >
        <p className="text-sm">{message.content}</p>
        <div className={`text-xs mt-2 ${isUser ? "text-white/70" : "text-[#666666]"}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#f2f2f2] flex items-center justify-center ml-3 mt-1">
          <span className="text-[#666666] font-medium text-xs">You</span>
        </div>
      )}
    </div>
  )
}
