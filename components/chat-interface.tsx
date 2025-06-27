"use client";

import { useChat, type MessageType } from "@/contexts/chat-context";
import { useEffect, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";

interface ExtendedMessageType extends MessageType {
    suggestions?: string[];
}

export default function ChatInterface() {
    const { messages, sendMessage, currentSuggestions, isLoading } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState<string[]>([]);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Delay showing suggestions
    useEffect(() => {
        if (currentSuggestions.length > 0) {
            const timeout = setTimeout(() => {
                setIsSuggestionsVisible(currentSuggestions);
            }, 5500);

            return () => clearTimeout(timeout);
        } else {
            setIsSuggestionsVisible([]);
        }
    }, [currentSuggestions]);

    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion);
    };

    return (
        <div className="flex flex-col max-w-3xl w-full mx-auto px-4 gap-6 py-28">
            {/* Chat Messages - Left Side */}
            <div className="flex-2 max-w-3xl">
                <div className="space-y-2">
                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}                    
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Suggestions Panel with delay & animation */}
            <AnimatePresence>
                {isSuggestionsVisible.length > 0 && (
                    <motion.div
                        className="flex justify-end mb-8 z-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="space-y-1 sm:w-max w-[90%] flex flex-col items-end">
                            {isSuggestionsVisible.map((suggestion, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="md:w-max w-auto text-left py-3 px-4 rounded-xl border border-gray-200 bg-[#fffef9] hover:from-[#fffdf4] hover:to-[#fffdf4] hover:border-[#fffdf4] transition-all duration-200 group shadow-sm hover:shadow-md"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-[15px] font-medium text-[#555555] group-hover:text-[#333333]">
                                            {suggestion}
                                        </span>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div ref={messagesEndRef}/>
        </div>
    );
}

// Improved markdown parser function
function parseMarkdown(text: string): JSX.Element[] {
    const elements: JSX.Element[] = [];
    let key = 0;
    
    // Split by **bold** first, then handle *italic* within each part
    const boldParts = text.split(/(\*\*.*?\*\*)/g);
    
    boldParts.forEach((part) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            // This is bold text
            const boldContent = part.slice(2, -2);
            // Check if bold content has italic
            const italicParts = boldContent.split(/(\*.*?\*)/g);
            const boldElements: JSX.Element[] = [];
            
            italicParts.forEach((italicPart) => {
                if (italicPart.startsWith('*') && italicPart.endsWith('*') && !italicPart.startsWith('**')) {
                    boldElements.push(<em key={key++}>{italicPart.slice(1, -1)}</em>);
                } else if (italicPart) {
                    boldElements.push(<span key={key++}>{italicPart}</span>);
                }
            });
            
            elements.push(<strong key={key++}>{boldElements}</strong>);
        } else if (part) {
            // Handle italic in non-bold text
            const italicParts = part.split(/(\*.*?\*)/g);
            
            italicParts.forEach((italicPart) => {
                if (italicPart.startsWith('*') && italicPart.endsWith('*')) {
                    elements.push(<em key={key++}>{italicPart.slice(1, -1)}</em>);
                } else if (italicPart) {
                    elements.push(<span key={key++}>{italicPart}</span>);
                }
            });
        }
    });
    
    return elements;
}

// Function to format text with markdown and numbered lists
function formatText(text: string): JSX.Element {
    const lines = text.split('\n');
    const formattedLines: JSX.Element[] = [];
    let key = 0;

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        if (!trimmedLine) {
            formattedLines.push(<br key={key++} />);
            return;
        }

        // Check for numbered lists (1. 2. etc.) - Fixed regex to handle bold text
        const numberedListMatch = trimmedLine.match(/^(\d+)\.\s*(.+)/);
        if (numberedListMatch) {
            const [, number, content] = numberedListMatch;
            formattedLines.push(
                <div key={key++} className="flex items-start gap-2">
                    <span className="font-bold text-gray-800 min-w-[20px]">{number}.</span>
                    <div className="flex-1">{parseMarkdown(content)}</div>
                </div>
            );
            return;
        }

        // Check for bullet points (- or •)
        const bulletMatch = trimmedLine.match(/^[-•]\s+(.+)/);
        if (bulletMatch) {
            const [, content] = bulletMatch;
            formattedLines.push(
                <div key={key++} className="flex items-start gap-2">
                    <span className="text-gray-600 min-w-[20px]">•</span>
                    <div className="flex-1">{parseMarkdown(content)}</div>
                </div>
            );
            return;
        }

        // Regular paragraph
        formattedLines.push(
            <p key={key++} className="my-1 leading-relaxed">
                {parseMarkdown(trimmedLine)}
            </p>
        );
    });

    return <div>{formattedLines}</div>;
}

function MessageBubble({ message }: { message: MessageType }) {
    const isUser = message.role === "user";
    const [displayedText, setDisplayedText] = useState("");
    const [textComplete, setTextComplete] = useState(false);

    // Handle different content types
    let messageContent = "";
    if (typeof message.content === "string") {
        messageContent = message.content;
    } else if (message.content && typeof message.content === "object") {
        // If message.content is an object with text property
        messageContent = (message.content as any).text || JSON.stringify(message.content);
    }

    useEffect(() => {
        if (isUser) {
            setDisplayedText(messageContent);
            setTextComplete(true);
            return;
        }

        // Reset states
        setDisplayedText("");
        setTextComplete(false);

        if (!messageContent || messageContent.length === 0) {
            setTextComplete(true);
            return;
        }

        // Use a timeout to ensure state is properly reset before starting
        const startTyping = () => {
            let i = 0;
            const speed = 1;

            const typingInterval = setInterval(() => {
                if (i < messageContent.length) {
                    const char = messageContent[i];
                    if (char !== undefined) {
                        setDisplayedText((prev) => prev + char);
                    }
                    i++;
                } else {
                    clearInterval(typingInterval);
                    setTextComplete(true);
                }
            }, speed);

            return typingInterval;
        };

        const timeoutId = setTimeout(() => {
            const intervalId = startTyping();
            
            // Store interval ID for cleanup
            return () => clearInterval(intervalId);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [messageContent, isUser]);

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start flex-col md:flex-row"}`}>
            {!isUser && (
                <div className="w-5 h-5 rounded-full animate-pulse shadow-md bg-gradient-to-tl from-[#333333] to-[#333333]/70 flex items-center justify-center mr-3 mt-3">
                    <span className="w-3 h-3 rounded-full animate-pulse bg-[#fffff5]"></span>
                </div>
            )}

            <div
                className={`w-full mb-4 rounded-l-[1.5rem] rounded-br-[1.5rem] rounded-tr-[5px] font-medium ${
                    isUser
                        ? "bg-gradient-to-tl from-[#333333]/80 w-max to-[#333333]/50 text-white p-4"
                        : "bg-transparent text-[#333333] md:w-[80%]"
                }`}
            >
                {isUser ? (
                    <p className="text-[16px] leading-snug whitespace-pre-wrap">{displayedText}</p>
                ) : ( 
                    <div className="p-4">
                        <div className="text-[16px] leading-relaxed">
                            {formatText(displayedText)}
                            {!textComplete && (
                                <span className="animate-pulse">|</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}