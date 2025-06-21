import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const { message, conversationHistory = [] } = await req.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // Build conversation context with enhanced RightHome AI system
        const messages = [
            {
                "role": "system",
                "content": `You are RightHome AI, a smart, friendly, multilingual property advisor that helps users explore and find residential or investment properties anywhere in the world. You mostly receive users from India and the UAE, but you can handle buyers interested in any city globally, such as Dubai, Delhi, Mumbai, London, or Toronto.  

                Your goal is to act like a personal property consultant:  
                - Ask smart, friendly questions to understand the buyer's intent and preferences  
                - Suggest relevant locations, budgets, and property types based on inputs  
                - Explain property options clearly (e.g., 2 BHK in Downtown Dubai under 1.5 Cr AED)  
                - Offer to send a summary of the discussion, project brochures, and pricing over WhatsApp or email  
                - Collect user details: full name, city of interest, budget range, BHK preference, timeline, WhatsApp number, and email  
                - Help the user book a callback or site visit (optionally connect with a human expert)  
                - Speak in a friendly tone, using English, Hindi, or Arabic as needed — feel free to mix (e.g., English + Hindi) to match the user's language  
                - Avoid sounding robotic — be natural, consultative, and solution-driven  
                - If the user is unsure or exploring, guide them without pushing

                End each session by confirming:  
                - You'll send a summary of the conversation + brochures  
                - You'll confirm the call or site visit on WhatsApp/email  
                - A human expert will follow up shortly

                Do not ask all questions at once. Keep the flow natural. Personalize based on each response.`
            },
            // Add conversation history with enhanced context awareness
            ...conversationHistory.slice(-10).map((msg: any) => ({
                role: msg.role,
                content: typeof msg.content === 'string' ? msg.content : 'Property listings and recommendations provided'
            })),
            {
                role: 'user' as const,
                content: message,
            },
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            temperature: 0.7,
            max_tokens: 1500,
            messages,
        });

        // More robust content extraction
        const rawContent = completion.choices[0]?.message?.content;
        
        // Check if content exists and is not null/undefined
        if (!rawContent) {
            return NextResponse.json(
                { error: "No response generated" },
                { status: 500 }
            );
        }

        // Ensure we're working with a clean string
        const cleanContent = rawContent.toString().trim();

        // Try to parse as JSON first
        try {
            const parsed = JSON.parse(cleanContent);
            if (parsed.properties && Array.isArray(parsed.properties)) {
                return NextResponse.json(parsed);
            }
        } catch (jsonError) {
            // If not JSON, treat as text response
        }

        // Return as text response with proper content
        return NextResponse.json({ 
            text: cleanContent,
            // Add debugging info (remove in production)
            debug: {
                originalLength: rawContent.length,
                cleanLength: cleanContent.length,
                firstChar: cleanContent.charAt(0),
                firstCharCode: cleanContent.charCodeAt(0)
            }
        });

    } catch (err: any) {
        console.error("OpenAI error:", err);

        if (err.code === "insufficient_quota") {
            return NextResponse.json(
                {
                    error: "API quota exceeded. Please try again later.",
                },
                { status: 429 }
            );
        }

        return NextResponse.json(
            {
                error: "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}