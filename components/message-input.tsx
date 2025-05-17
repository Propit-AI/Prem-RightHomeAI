"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, ArrowUpFromDot, Plus } from "lucide-react";
import { useChat } from "@/contexts/chat-context";

export default function MessageInput() {
  const [input, setInput] = useState("");
  const { addMessage, startConversation, isConversationStarted } = useChat();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allSuggestions, setAllSuggestions] = useState<string[]>([]);
  const [hasSelectedSuggestion, setHasSelectedSuggestion] = useState(false);


  // Load suggestions from JSON file (in /public folder)
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch("/data/chatSuggestions.realEstate.json");
        const json = await res.json();
        const flatList = Object.values(json).flat() as string[];
        setAllSuggestions(flatList);
      } catch (err) {
        console.error("Error loading suggestions:", err);
      }
    };
    fetchSuggestions();
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (input.length > 1) {
        const filtered = allSuggestions.filter((s) =>
          s.toLowerCase().includes(input.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [input, allSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!isConversationStarted) {
      startConversation(input);
    } else {
      addMessage(input, "user");

      setTimeout(() => {
        const response =
          "I understand you're interested in " +
          input +
          ". Let me help you with that.";
        addMessage(response, "assistant");
      }, 1000);
    }

    setInput("");
    setSuggestions([]);
    setHasSelectedSuggestion(false);
  };

  return (
    <div className="flex w-full md:w-3xl z-40 bg-gradient-to-t to-[#fffadd] from-white border-2 border-white shadow-xl my-2 p-[6px] md:p-[8px] rounded-[2rem] relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col justify-center items-center bg-white/70 backdrop-blur-sm rounded-[1.5rem] p-[6px] md:p-[8px] pl-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message RightHomeAI"
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[#333333] text-sm font-medium md:text-base"
          />

          {/* 🧠 Suggestions Dropdown */}
          <div className="">
          {!hasSelectedSuggestion && suggestions.length > 0 && (
            <ul className="absolute top-[-220px] md:top-[160px] -left-1 w-[calc(100%)] md:w-[calc(100%+1rem)] bg-[#fffff5] p-3 border border-[#fffadd] rounded-[1.5rem] shadow-lg z-50 text-sm overflow-hidden">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setInput(s);
                    setSuggestions([]);
                  }}
                  className="px-4 py-2 md:py-3 font-medium text-start cursor-pointer text-[#333333] hover:bg-gray-100"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
          </div>

          <div className="flex justify-between w-full">
            <div className=" flex items-center">
              <img
                src="/placeholder.svg?height=24&width=24"
                alt="RightHomeAI"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm font-medium text-[#333333] mr-2">Quick response</span>
              <svg
                width="18"
                height="18"
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
            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full text-[#777777]"
              >
                <Plus className="h-5 w-5" />
              </Button>

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
