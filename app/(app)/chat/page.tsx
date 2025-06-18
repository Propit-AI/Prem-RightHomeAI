"use client";
import { useEffect, useState } from "react";
import ChatSuggestions from "@/components/chat-suggestions";
import ChatInterface from "@/components/chat-interface";
import { useChat } from "@/contexts/chat-context";
import MessageInput from "@/components/message-input";
import Navbar from "@/components/navbar";

export default function Chat() {
    const { isConversationStarted } = useChat();
    const [showBottomInput, setShowBottomInput] = useState(false);

    // Add effect to handle the transition when conversation starts
    useEffect(() => {
        if (isConversationStarted) {
        // Brief delay to allow for smooth transition
        const timer = setTimeout(() => {
            setShowBottomInput(true);
        }, 100);
        return () => clearTimeout(timer);
        } else {
        setShowBottomInput(false);
        }
    }, [isConversationStarted]);

return (
    <div className="h-screen transition-opacity duration-500 ease-in-out w-full flex flex-col md:justify-between items-center bg-[#fffff5] md:p-6 py-20 overflow-y-auto relative">
        <div className="absolute w-screen h-screen top-0 right-0">
            <Navbar />
        </div>
        {/* Mobile: Text content at top */}
        {isConversationStarted && (
            <div className="md:hidden text-xs text-[#777777] text-center font-medium mb-6">
            <p>
                RightHomeAI may make mistakes. By interacting with RightHomeAI, you
                agree to the{" "}
                <a href="#" className="underline">
                Terms of Use
                </a>
                . See our{" "}
                <a href="#" className="underline">
                Privacy Statement
                </a>
            </p>
            </div>
        )}

        {/* Main content area - positioned differently on mobile vs desktop */}
        <div className="flex-grow flex flex-col items-center justify-end w-full">
            {isConversationStarted ? (
            <ChatInterface />
            ) : (
            <>
                <div className="max-w-3xl w-full gap-12 flex flex-col">
                <h1 className="text-2xl md:text-4xl ml-6 font-medium text-start text-[#333333] mb-80 md:mb-0">
                    Hey, what's on your mind today?
                </h1>
                <div className="w-full max-w-3xl fixed bottom-0 md:relative transform-translate-y-0">
                    <div className="text-[#666666] md:hidden text-sm md:text-base p-2">
                    <ChatSuggestions />
                    </div>
                    <MessageInput />
                </div>
                <div className="hidden md:block w-full max-w-3xl">
                    <ChatSuggestions />
                </div>
                </div>
            </>
            )}
        </div>

        {/* Fixed MessageInput that appears at the bottom when conversation starts */}
        {isConversationStarted && (
            <div
            className={`fixed w-full bottom-0 shadow-md transition-all duration-300 ease-in-out ${
                showBottomInput ? "translate-y-0" : "-translate-y-full"
            }`}
            >
            <div className="w-full max-w-3xl px-4 mx-auto pt-6 pb-2 bg-gradient-to-t from-[#fffff5] via-[#fffff5]/70 to-transparent transition-all transform">
                <MessageInput />
            </div>
            </div>
        )}

        {/* Desktop: Text content at bottom */}
        {!isConversationStarted && (
        <div className="hidden md:block text-sm font-medium text-[#777777] mt-12 text-center">
            <p>
            RightHomeAI may make mistakes. By interacting with RightHomeAI, you
            agree to the{" "}
            <a href="#" className="underline">
                Terms of Use
            </a>
            . See our{" "}
            <a href="#" className="underline">
                Privacy Statement
            </a>
            </p>
        </div>
        )}
        </div>
    );
}
