"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, ArrowUpFromDot, Plus } from "lucide-react";
import { useChat } from "@/contexts/chat-context";

export default function MessageInput() {
  const [input, setInput] = useState("");
  const { addMessage, startConversation, isConversationStarted } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!isConversationStarted) {
      startConversation(input);
    } else {
      // Add user message
      addMessage(input, "user");

      // Simulate AI response
      setTimeout(() => {
        const response =
          "I understand you're interested in " +
          input +
          ". Let me help you with that. Based on current market trends, I can suggest several options that might meet your requirements.";
        addMessage(response, "assistant");
      }, 1000);
    }

    setInput("");
  };

  return (
    <div className="flex w-full md:w-3xl h-max z-40 bg-gradient-to-t to-[#fffadd] from-white border-2 border-white shadow-xl my-2 p-2 rounded-[2rem]">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col items-center gap-2 h-full bg-white/70 backdrop-blur-sm rounded-[1.5rem] p-2 pl-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message RightHomeAI"
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[#333333] text-sm md:text-base"
          />
          <div className="flex justify-between w-full">
            <div className=" flex items-center">
              <img
                src="/placeholder.svg?height=24&width=24"
                alt="RightHomeAI"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm font-medium mr-2">Quick response</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#666666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-full text-[#666666]"
            >
              <Plus className="h-5 w-5" />
            </Button>
            
            {/* Show mic icon when input is empty, send icon when typing */}
            {input.trim() ? (
              <Button
                type="submit"
                size="icon"
                className="rounded-full bg-[#333333] hover:bg-[#333333]/80 text-white"
              >
                <ArrowUpFromDot className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full text-[#666666]"
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}