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
                "content": `You are RightHome AI, an expert property advisor specializing in Dubai and Indian real estate markets. You help users find the perfect homes with personalized, professional guidance.

                EXPERTISE AREAS:
                - Dubai: Downtown, Marina, JBR, Business Bay, DIFC, Jumeirah, Palm Jumeirah, Arabian Ranches
                - India: Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad, Chennai, Kolkata

                RESPONSE GUIDELINES:
                1. For Exploratory Queries ("I want to buy in Dubai"):
                - Provide market overview with current 2025 trends
                - Suggest 2-3 prime locations with specific details
                - Ask clarifying questions about budget and preferences

                2. For Specific Searches ("2BHK in Dubai Marina"):
                - Give targeted property insights with real market data
                - Include price ranges, amenities, connectivity details
                - Area & Property Name  
                - Price (mention if negotiable)  
                - Size (Carpet/Built-up)  
                - Key Highlights  
                - ✅ Pros / ❌ Cons  
                **Location Insights:** 2–3 lines with helpful observations  
                **Next Steps:** Suggestions like EMI help, compare areas, view similar listings

                3. For Rental Queries:
                - Provide current rental ranges for 2025
                - Include popular areas and average prices
                - Mention what's included (DEWA, internet, etc.)

                IMPORTANT FORMATTING RULES:
                - Always write in clear, natural language
                - Use specific numbers, prices, and details
                - Include practical advice and market insights
                - Write conversational responses, not placeholder text
                - Never use placeholder characters like "TTTT" or "HHHH"


                RESPONSE FORMAT:
                Always return a JSON object with exactly these fields:

                {
                    "response": "Write your complete, detailed response here in natural language. Include specific information about properties, prices, areas, and helpful advice. Make it conversational and informative.",
                    "suggestions": ["Specific suggestion 1", "Specific suggestion 2", "Specific suggestion 3"],
                    "responseType": "exploratory"
                }

                EXAMPLE RESPONSE:
                {
                    "response": "I'd be happy to help you find 2BHK homes! In Dubai, the most popular areas for 2BHK apartments in 2025 are Dubai Marina (AED 1.2M-2.5M), Downtown Dubai (AED 1.8M-3.2M), and JBR (AED 1.5M-2.8M). Dubai Marina offers stunning waterfront views and excellent dining options, while Downtown provides iconic city views and is close to Dubai Mall. JBR gives you beachfront living with a vibrant nightlife scene. Which area interests you most, and what's your budget range?",
                    "suggestions": ["Show me Marina properties under 2M AED", "What are Downtown Dubai amenities?", "Compare JBR vs Marina for families"],
                    "responseType": "exploratory"
                }

                Remember: Always provide real, helpful information in natural language. Never use placeholder text.`
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
            temperature: 0.8, // Slightly higher for more creative suggestions
            max_tokens: 2000,
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

        // Try to parse as JSON first (expecting the new format)
        try {
            const parsed = JSON.parse(cleanContent);
            
            // Validate the expected structure
            if (parsed.response && parsed.suggestions && Array.isArray(parsed.suggestions)) {
                return NextResponse.json({
                    text: parsed.response,
                    suggestions: parsed.suggestions,
                    success: true
                });
            }
            
            // Handle case where AI returns direct text in response field
            if (parsed.response && !parsed.suggestions) {
                // Generate AI-powered suggestions based on the response
                const aiSuggestions = await generateAISuggestions(message, parsed.response);
                return NextResponse.json({
                    text: parsed.response,
                    suggestions: aiSuggestions,
                    success: true
                });
            }
            
            // Fallback for old property listing format
            if (parsed.properties && Array.isArray(parsed.properties)) {
                const aiSuggestions = await generateAISuggestions(message, "Property listings provided");
                return NextResponse.json({
                    text: "Here are the property options I found for you:",
                    properties: parsed.properties,
                    suggestions: aiSuggestions,
                    success: true
                });
            }
        } catch (jsonError) {
            console.log("JSON parse failed, treating as plain text response");
            
            // Try to extract JSON from text if it's embedded
            const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    const extractedJson = JSON.parse(jsonMatch[0]);
                    if (extractedJson.response && extractedJson.suggestions) {
                        return NextResponse.json({
                            text: extractedJson.response,
                            suggestions: extractedJson.suggestions,
                            success: true
                        });
                    }
                } catch (extractError) {
                    console.log("Failed to extract embedded JSON");
                }
            }
        }

        // Fallback: Generate AI suggestions for plain text response
        const aiSuggestions = await generateAISuggestions(message, cleanContent);

        return NextResponse.json({ 
            text: cleanContent,
            suggestions: aiSuggestions,
            success: true
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

// AI-powered suggestion generation function
async function generateAISuggestions(userMessage: string, aiResponse: string): Promise<string[]> {
    try {
        const suggestionPrompt: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            {
                role: "system",
                content: `You are a suggestion generator for a property chatbot. Create 3 natural statements that a user would realistically ask next.

**Guidelines:**
1. Analyze both the user's original question and the AI's response
2. Generate suggestions that feel like natural conversation flow
3. Use specific property types, areas, or details mentioned in the conversation
4. Make suggestions progressively more specific or explore related aspects
5. Keep each suggestion 4-10 words, conversational and actionable

**Response Format:** 
Return only a JSON array of 3 strings, nothing else.

**Examples:**
If AI mentioned "Dubai Marina and Downtown Dubai", suggestions might be:
["Show me 2BHK options in Marina", "Compare Downtown vs Marina prices", "What's the ROI in these areas?"]

Focus on natural user language, not robotic prompts.`
            },
            {
                role: "user",
                content: `User asked: "${userMessage}"
                AI responded: "${aiResponse.substring(0, 500)}..."
                
                Generate 3 contextual suggestions:`
            }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Using faster model for suggestions
            temperature: 0.9,
            max_tokens: 150,
            messages: suggestionPrompt,
        });

        const suggestionsContent = completion.choices[0]?.message?.content?.trim();
        
        if (suggestionsContent) {
            try {
                const suggestions = JSON.parse(suggestionsContent);
                if (Array.isArray(suggestions) && suggestions.length === 3) {
                    return suggestions;
                }
            } catch (parseError) {
                console.log("Failed to parse AI suggestions, using fallback");
            }
        }
    } catch (error) {
        console.log("AI suggestion generation failed, using fallback");
    }

    // Simple fallback suggestions if AI generation fails
    return generateSmartFallbackSuggestions(userMessage, aiResponse);
}

function generateSmartFallbackSuggestions(userMessage: string, aiResponse: string): string[] {
    const message = userMessage.toLowerCase();
    const response = aiResponse.toLowerCase();

    // Extract mentioned locations
    const dubaiAreas = ['marina', 'downtown', 'jbr', 'business bay', 'jumeirah', 'palm'];
    const indianCities = ['delhi', 'mumbai', 'bangalore', 'bengaluru', 'pune', 'gurgaon', 'noida'];
    
    const mentionedDubaiArea = dubaiAreas.find(area => response.includes(area));
    const mentionedIndianCity = indianCities.find(city => response.includes(city));

    // Property type detection
    const hasPropertyType = /\d+bhk|studio|villa|apartment|flat/.test(message);
    const hasBudget = /budget|price|cost|aed|lakh|crore/.test(message);
    const hasLocation = /dubai|india|delhi|mumbai|marina|downtown/.test(message);

    if (mentionedDubaiArea) {
        return [
            `Show me 2BHK options in ${mentionedDubaiArea}`,
            `What's the average price in ${mentionedDubaiArea}?`,
            "Compare with other Dubai areas"
        ];
    }

    if (mentionedIndianCity) {
        return [
            `Find 3BHK apartments in ${mentionedIndianCity}`,
            `Show me budget options in ${mentionedIndianCity}`,
            "What are the best areas here?"
        ];
    }

    if (hasPropertyType && hasBudget) {
        return [
            "Show me financing options",
            "Find properties in nearby areas",
            "What's the best ROI potential?"
        ];
    }

    if (hasLocation) {
        return [
            "Help me understand the market trends",
            "Show me investment opportunities",
            "What are the upcoming projects?"
        ];
    }

    // General fallbacks
    return [
        "Help me refine my search criteria",
        "Show me popular property options",
        "What should I consider next?"
    ];
}

/**
 * Handles API errors with appropriate responses
 */
function handleAPIError(err: any) {
    if (err.code === "insufficient_quota") {
        return NextResponse.json(
            { error: "Service temporarily unavailable. Please try again later." },
            { status: 429 }
        );
    }

    if (err.code === "rate_limit_exceeded") {
        return NextResponse.json(
            { error: "Too many requests. Please wait a moment and try again." },
            { status: 429 }
        );
    }

    return NextResponse.json(
        { error: "Unable to process your request. Please try again." },
        { status: 500 }
    );
}