"use client"

import DiscoverContent from "@/components/discover-content"
import ChatInterface from "@/components/chat-interface"
import { useChat } from "@/contexts/chat-context"

export default function DiscoverPage() {
  const { isConversationStarted } = useChat()

  return (
    <div className="h-full overflow-auto pb-24">
      {isConversationStarted ? (
        <div className="p-6">
          <ChatInterface />
        </div>
      ) : (
        <DiscoverContent />
      )}
    </div>
  )
}
