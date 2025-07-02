'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useVapi } from '@/hooks/useVapi';
import { Button } from './ui/button';
import { Mic, MicOff, X, Play, Pause } from 'lucide-react';

interface VoiceInputProps {
    onTranscript?: (text: string) => void;
    className?: string;
    isFullScreen?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ 
    onTranscript, 
    className = '', 
    isFullScreen = false 
}) => {
    const router = useRouter();
    const [isListening, setIsListening] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

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

    // Simulate audio level animation
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isListening && !isPaused) {
            interval = setInterval(() => {
                setAudioLevel(Math.random() * 100);
            }, 150);
        } else {
            setAudioLevel(0);
        }
        return () => clearInterval(interval);
    }, [isListening, isPaused]);

    // Handle connection state
    useEffect(() => {
        if (isFullScreen) {
            if (!isCallActive && !isLoading && !isConnecting) {
                setIsConnecting(true);
                startCall().finally(() => {
                    setIsConnecting(false);
                });
            }
        }
    }, [isFullScreen, isCallActive, isLoading, isConnecting, startCall]);

    // Update listening state based on call status and mute state
    useEffect(() => {
        setIsListening(isCallActive && !isMuted && !isPaused);
    }, [isCallActive, isMuted, isPaused]);

    // Reset pause state when call ends
    useEffect(() => {
        if (!isCallActive) {
            setIsPaused(false);
        }
    }, [isCallActive]);

    const handleMicClick = () => {
        router.push('/chat/talk');
    };

    const handleClose = () => {
        if (isCallActive) {
            endCall();
        }
        setIsPaused(false);
        setIsConnecting(false);
        router.back();
    };

    const handleMuteToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isCallActive) {
            toggleMute();
        }
    };

    const handlePauseToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isCallActive) {
            setIsPaused(!isPaused);
            // If we're pausing, also mute; if resuming, unmute
            if (!isPaused && !isMuted) {
                toggleMute();
            } else if (isPaused && isMuted) {
                toggleMute();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleClose();
        }
        if (e.key === ' ' && isCallActive) {
            e.preventDefault();
            handlePauseToggle(e as any);
        }
    };

    // Determine current status for display
    const getStatus = () => {
        if (isLoading || isConnecting) return 'connecting';
        if (!isCallActive) return 'assistant';
        if (isPaused) return 'paused';
        if (isListening) return 'listening';
        return 'ready';
    };

    const currentStatus = getStatus();

    // Clean gradient orb
    const GradientOrb = () => (
        <motion.div
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center"
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), 0 0 100px rgba(118, 75, 162, 0.2)',
            }}
            animate={{
                scale: isListening ? [1, 1.05, 1] : 1,
                rotate: [0, 360],
            }}
            transition={{
                scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }
            }}
        >
            {/* Inner light core */}
            <motion.div
                className="w-32 h-32 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 70%, transparent 100%)',
                }}
                animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </motion.div>
    );

    // Clean three dots animation
    const ThreeDots = () => (
        <div className="flex space-x-4">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="w-5 h-5 rounded-full"
                    style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                    }}
                    animate={{
                        y: [0, -25, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );

    if (!isFullScreen) {
        return (
            <Button
                onClick={handleMicClick}
                title="Voice input"
                aria-label="Open voice assistant"
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full text-[#666666] hover:bg-gray-100 transition-colors"
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Mic className="h-5 w-5 md:h-6 md:w-6" />
                </motion.div>
            </Button>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col justify-between z-50 overflow-hidden bg-gradient-to-t from-[#f9f8f6] to-[#dddedb]"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            {/* Clean background with subtle gradients */}
            <div className="absolute inset-0">
                {/* Soft gradient overlays */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.06) 0%, transparent 50%)',
                    }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 60% 20%, rgba(240, 147, 251, 0.05) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(67, 56, 202, 0.04) 0%, transparent 50%)',
                    }}
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </div>

            {/* Top section with status text */}
            <motion.div 
                className="flex-1 flex flex-col items-center justify-center relative z-10"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {/* Status text */}
                <motion.div className="mb-16 text-center">
                    <AnimatePresence mode="wait">
                        <motion.h1 
                            key={currentStatus}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-3xl md:text-5xl py-6 font-medium mb-6"
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            {currentStatus === 'connecting' ? 'Connecting...' : 
                                currentStatus === 'listening' ? "I'm Listening..." : 
                                currentStatus === 'paused' ? 'Paused' :
                                currentStatus === 'ready' ? 'Ready to listen' : 
                                `Hi, I'm Zara.`}
                        </motion.h1>
                    </AnimatePresence>
                    
                    {isCallActive && !isLoading && !isConnecting && (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-slate-600 font-semibold text-[14px] md:text-lg"
                        >
                            {isPaused ? 'Press play to resume' : 'Speak naturally, I\'ll help you with your questions'}
                        </motion.p>
                    )}
                </motion.div>

                {/* Center animation */}
                <motion.div 
                    className="flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                >
                    {isListening ? <GradientOrb /> : <ThreeDots />}
                </motion.div>

                {/* Error Display */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-12 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 max-w-md shadow-lg"
                        >
                            <p className="font-medium">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Bottom controls */}
            <motion.div 
                className="p-8 flex justify-center items-center space-x-8 relative z-10"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {!isCallActive ? (
                    // Start button
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            if (!isLoading && !isConnecting) {
                                setIsConnecting(true);
                                startCall().finally(() => {
                                    setIsConnecting(false);
                                });
                            }
                        }}
                        disabled={isLoading || isConnecting}
                        className="flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-2xl border border-slate-200 transition-all disabled:opacity-50"
                        style={{
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                        }}
                    >
                        {(isLoading || isConnecting) ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 border-3 border-slate-300 border-t-blue-500 rounded-full"
                            />
                        ) : (
                            <Play size={32} className="ml-1 text-slate-700" />
                        )}
                    </motion.button>
                ) : (
                    // Active controls
                    <>
                        {/* Mic/Mute button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleMuteToggle}
                            className={`flex items-center justify-center w-[48px] h-[48px] md:w-18 md:h-18 p-3 rounded-full transition-all shadow-lg border ${
                                isMuted 
                                    ? 'bg-red-50 border-red-200 text-red-600' 
                                    : 'bg-white border-slate-200 text-slate-700'
                            }`}
                            style={{
                                boxShadow: isMuted 
                                    ? '0 8px 25px rgba(239, 68, 68, 0.25)' 
                                    : '0 8px 25px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                        </motion.button>

                        {/* Pause/Resume button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePauseToggle}
                            className={`flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full p-3 shadow-2xl border border-slate-200 transition-all ${
                                isPaused ? 'bg-green-50 text-green-600' : 'bg-[#fffef9] text-slate-700'
                            }`}
                            style={{
                                background: isPaused 
                                    ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {isPaused ? <Play size={28} /> : <Pause size={28} />}
                        </motion.button>

                        {/* Close button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleClose}
                            className="flex items-center justify-center w-[48px] h-[48px] md:w-18 md:h-18 rounded-full bg-white shadow-lg p-3 border border-slate-200 text-slate-700 transition-all"
                            style={{
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <X size={24} />
                        </motion.button>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

export default VoiceInput;