import Vapi from '@vapi-ai/web';
import { useEffect, useRef, useState } from 'react';

interface UseVapiProps {
    publicKey: string;
    assistantId?: string;
}

export const useVapi = ({ publicKey, assistantId }: UseVapiProps) => {
    const [isCallActive, setIsCallActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const vapiRef = useRef<Vapi | null>(null);

useEffect(() => {
    // Initialize Vapi instance
    vapiRef.current = new Vapi(publicKey);

    const vapi = vapiRef.current;

    // Event listeners
    vapi.on('call-start', () => {
        console.log('Call started');
        setIsCallActive(true);
        setIsLoading(false);
        setError(null);
    });

    vapi.on('call-end', () => {
        console.log('Call ended');
        setIsCallActive(false);
        setIsLoading(false);
    });

    vapi.on('error', (error) => {
        console.error('Vapi error:', error);
        setError(error.message || 'An error occurred');
        setIsLoading(false);
        setIsCallActive(false);
    });

    vapi.on('speech-start', () => {
        console.log('Assistant started speaking');
    });

    vapi.on('speech-end', () => {
        console.log('Assistant finished speaking');
    });

    vapi.on('volume-level', (volume) => {
        console.log('Volume level:', volume);
    });

    vapi.on('message', (message) => {
        console.log('Message received:', message);
    });

    return () => {
        vapi.stop();
    };
}, [publicKey]);

const startCall = async () => {
    if (!vapiRef.current || !assistantId) return;

    try {
        setIsLoading(true);
        setError(null);
        await vapiRef.current.start(assistantId);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start call');
        setIsLoading(false);
    }
};

const endCall = () => {
    if (vapiRef.current) {
        vapiRef.current.stop();
    }
};

const toggleMute = () => {
    if (vapiRef.current) {
        const newMutedState = !isMuted;
        vapiRef.current.setMuted(newMutedState);
        setIsMuted(newMutedState);
    }
};

const sendMessage = (message: string, role: 'user' | 'system' | 'assistant' = 'user') => {
    if (vapiRef.current && isCallActive) {
        vapiRef.current.send({
            type: 'add-message',
            message: {
            role,
            content: message
            }
        });
    }
};

    return {
        isCallActive,
        isLoading,
        error,
        isMuted,
        startCall,
        endCall,
        toggleMute,
        sendMessage
    };
};