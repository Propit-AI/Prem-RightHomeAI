'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVapi } from '@/hooks/useVapi';
import { Button } from './ui/button';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputProps {
    onTranscript?: (text: string) => void;
    className?: string;
    isFullScreen?: boolean; // New prop to determine if it's full screen mode
}

const VoiceInput: React.FC<VoiceInputProps> = ({ 
    onTranscript, 
    className = '', 
    isFullScreen = false 
}) => {
    const router = useRouter();
    const [isListening, setIsListening] = useState(false);

    const {
        isCallActive,
        isLoading,
        error,
        isMuted,
        startCall,
        endCall,
        toggleMute,
        sendMessage
    } = useVapi({
        publicKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!,
        assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!
    });

    // Auto-start call when in full screen mode
    useEffect(() => {
        if (isFullScreen && !isCallActive && !isLoading) {
            startCall();
        }
    }, [isFullScreen, isCallActive, isLoading, startCall]);

    // Update listening state
    useEffect(() => {
        setIsListening(isCallActive && !isMuted);
    }, [isCallActive, isMuted]);

    const handleMicClick = () => {
        // Navigate to the talk route instead of opening modal
        router.push('/chat/talk');
    };

    const handleClose = () => {
        if (isCallActive) {
            endCall();
        }
        // Navigate back to previous page
        router.back();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleClose();
        }
        if (e.key === ' ' && isCallActive) {
            e.preventDefault();
            toggleMute();
        }
    };

    // If not in full screen mode, just render the mic button
    if (!isFullScreen) {
        return (
            <Button
                onClick={handleMicClick}
                title="Voice input"
                aria-label="Open voice assistant"
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full text-[#666666]"
            >
                <Mic className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
        );
    }

    // Full screen voice interface
    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-50 via-white to-blue-100"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div className="w-full h-full flex items-center justify-center p-8">
                {/* Content */}
                <div className="relative text-center max-w-md w-full">
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg"
                        aria-label="Close voice assistant"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" x2="6" y1="6" y2="18"/>
                            <line x1="6" x2="18" y1="6" y2="18"/>
                        </svg>
                    </button>

                    {/* Status Text */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-light text-gray-800 mb-4">
                            {isLoading ? 'Connecting...' : 
                             isListening ? "I'm listening" : 
                             isCallActive ? 'Ready to listen' : 
                             'Voice Assistant'}
                        </h1>
                        {isCallActive && (
                            <p className="text-gray-600 text-lg">
                                Speak naturally, I'll help you with your questions
                            </p>
                        )}
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Large Microphone Visualization */}
                    <div className="mb-12 flex justify-center">
                        <div className="relative">
                            {/* Outer pulse ring */}
                            {isListening && (
                                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30"></div>
                            )}
                            {/* Middle ring */}
                            {isListening && (
                                <div className="absolute inset-4 rounded-full bg-blue-300 animate-pulse opacity-50"></div>
                            )}
                            {/* Mic icon - larger for full screen */}
                            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-2xl ${
                                isListening ? 'bg-blue-500' : 
                                isCallActive ? 'bg-green-500' : 
                                isLoading ? 'bg-gray-400' : 'bg-gray-300'
                            }`}>
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                    <line x1="12" x2="12" y1="19" y2="22"/>
                                    <line x1="8" x2="16" y1="22" y2="22"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex justify-center space-x-6">
                        {!isCallActive ? (
                            <button
                                onClick={startCall}
                                disabled={isLoading}
                                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-full font-medium transition-colors text-lg shadow-lg"
                            >
                                {isLoading ? 'Connecting...' : 'Start Listening'}
                            </button>
                        ) : (
                            <div className="flex items-center space-x-4 p-2 bg-white backdrop-blur-md bg-opacity-30 rounded-2xl shadow-lg">
                                <button
                                    onClick={toggleMute}
                                    className={`px-6 py-3 rounded-xl font-medium transition-colors text-lg shadow-lg`}
                                >
                                    {isMuted ? <MicOff/> : <Mic/>}
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="w-12 h-12 rounded-xl bg bg-opacity-70 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg"
                                    aria-label="Close voice assistant"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" x2="6" y1="6" y2="18"/>
                                        <line x1="6" x2="18" y1="6" y2="18"/>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Keyboard shortcuts hint */}
                    {isCallActive && (
                        <div className="mt-8 text-sm text-gray-500">
                            Press Space to mute/unmute • Press Escape to close
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VoiceInput;