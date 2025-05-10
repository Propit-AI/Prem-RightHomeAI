"use client"

import LabsContent from "@/components/labs-content"
import ChatInterface from "@/components/chat-interface"
import { useChat } from "@/contexts/chat-context"

export default function LabsPage() {
  const { isConversationStarted } = useChat()

  return (
    <div className="h-full overflow-auto pb-24">
      {isConversationStarted ? (
        <div className="p-6">
          <ChatInterface />
        </div>
      ) : (
        <LabsContent />
      )}
    </div>
  )
}
