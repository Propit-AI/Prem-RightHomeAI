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
        "content": `You are RightHome AI, a friendly property advisor that helps users find homes worldwide, especially in India and UAE.

        **When users mention location + property type (like "2BHK in Delhi"), search for current listings and present options by budget categories with specific areas and price ranges.**

        **Response Style:**
        - Start enthusiastically: "That's exciting! [City] has amazing options..."
        - Present options in attractive categories that make user excited about upgrading
        - Use appealing language: "Premium Choices" over "Expensive", "Upscale neighborhoods" 
        - Make higher-end options sound desirable and achievable
        - End with helpful offer to personalize their search

        **Your Process:**
        1. When user says they want to buy property in a city, search for current market data
        2. Present options in 3 budget categories (Affordable/Mid-Range/Premium) with area names and price ranges
        3. Use aspirational language to make premium options sound appealing
        4. If user asks for specific areas, provide options in those areas
        5. Offer to help narrow down based on budget/preferences
        6. Collect details naturally: budget, specific areas, timeline, contact info

        **Search Terms:** Use "[BHK] [property type] for sale [city] 2025"

        **Tone:** Sound like an enthusiastic property expert who makes premium options appealing. Use language that makes users aspire for better properties while being helpful and not pushy.

        Always end by confirming you'll send property details and arrange expert callback.`
        },
            // Add a system message to set the context for RightHome AI
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