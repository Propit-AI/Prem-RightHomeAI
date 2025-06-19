'use client';

import VoiceInput from "@/components/VoiceChat";

export default function TalkPage() {
    const handleTranscript = (text: string) => {
        // Handle the transcript if needed
        console.log('Transcript:', text);
    };

    return (
        <VoiceInput 
            isFullScreen={true}
            onTranscript={handleTranscript}
        />
    );
}