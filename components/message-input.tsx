"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, ArrowUpFromDot, Plus, ChevronDown } from "lucide-react";
import { useChat } from "@/contexts/chat-context";
import { useRouter } from "next/navigation";
import Logo from "./ui/logo";
import VoiceChat from "./VoiceChat";

export default function MessageInput() {
  const [input, setInput] = useState("");
  const { addMessage, startConversation, isConversationStarted, isLoading } = useChat();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allSuggestions, setAllSuggestions] = useState<string[]>([]);
  const [hasSelectedSuggestion, setHasSelectedSuggestion] = useState(false);

  const router = useRouter();

  const handleInputFocus = () => {
    router.push("/chat");
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch("/data/chatSuggestions.realEstate.json");
        if (res.ok) {
          const json = await res.json();
          const flatList = Object.values(json).flat() as string[];
          setAllSuggestions(flatList);
        } else {
          // Fallback suggestions if file doesn't exist
          const defaultSuggestions = [
            "Show me 2BHK apartments in Delhi under 80 lakhs",
            "What are the best family neighborhoods in Bangalore?",
            "Compare property prices in Mumbai vs Delhi",
            "Find villas in Gurgaon with 3+ bedrooms",
            "Show luxury apartments in Noida",
            "What's the average price per sq ft in Pune?",
            "Find builder floor options in Delhi NCR",
            "Show me properties near metro stations"
          ];
          setAllSuggestions(defaultSuggestions);
        }
      } catch (err) {
        console.error("Error loading suggestions:", err);
        // Fallback suggestions
        const defaultSuggestions = [
          "Show me 2BHK apartments in Delhi under 80 lakhs",
          "What are the best family neighborhoods in Bangalore?",
          "Compare property prices in Mumbai vs Delhi",
          "Find villas in Gurgaon with 3+ bedrooms"
        ];
        setAllSuggestions(defaultSuggestions);
      }
    };
    fetchSuggestions();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");
    setSuggestions([]);
    setHasSelectedSuggestion(false);

    if (!isConversationStarted) {
      startConversation(message);
    } else {
      await addMessage(message, "user");
    }
  };

  return (
    <div className="flex w-full md:w-3xl z-40 bg-gradient-to-t to-[#fffdf4] from-white border-2 border-white shadow-2xl my-2 pt-[6px] md:pt-[8px] px-[6px] md:px-[8px] rounded-[2rem] relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col justify-center gap-2 items-center bg-gradient-to-b from-white to-[#fffdf4]  backdrop-blur-sm rounded-[1.5rem] px-[6px] md:p-[8px] pl-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onFocus={handleInputFocus}
            placeholder="Message RightHomeAI"
            disabled={isLoading}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[#333333] text-sm font-medium md:text-base"
          />

          {/* Suggestions */}
          {!hasSelectedSuggestion && suggestions.length > 0 && (
            <ul className="absolute bottom-[100%] left-0 w-full bg-white border border-[#fffadd] rounded-[1.5rem] shadow-lg z-50 text-sm overflow-hidden">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setInput(s);
                    setSuggestions([]);
                    setHasSelectedSuggestion(true);
                  }}
                  className="px-4 py-2 font-medium text-start cursor-pointer text-[#333333] hover:bg-gray-100"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-between w-full mt-2 mb-2">
            {/* <div>
              <VoiceChat/>
            </div> */}
            <div className="flex gap-4 items-center md:ml-3">
              <Logo/>
              <div className="border flex px-3 py-2 rounded-xl shadow-sm">
              <span className="text-sm font-medium text-[#333333] mr-2">Quick response</span>
              <ChevronDown size={20}/>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full text-[#777777]"
              >
                <Plus className="h-5 w-5 md:h-6 md:w-6" />
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
                <>
                  <VoiceChat />
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}