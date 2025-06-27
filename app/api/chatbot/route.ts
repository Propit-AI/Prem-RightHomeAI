import { getPropertyDataFromSerpAPI } from "@/lib/getPropertyDataFromSerpAPI";
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

        // Fetch current property listings from the SERP API
        const webResults = await getPropertyDataFromSerpAPI(message);

        interface WebResult {
            title: string;
            link: string;
            [key: string]: any;
        }

        const webResultsTyped: WebResult[] = webResults as WebResult[];

        const webSummary: string = webResultsTyped.length > 0
            ? webResultsTyped.map((r: WebResult, i: number) => `${i + 1}. ${r.title} - ${r.link}`).join('\n')
            : "No real-time property listings found.";

        // Build conversation context with enhanced RightHome AI system
        const messages = [
            {
                "role": "system",
                "content": `You are RightHome AI — a friendly and expert property advisor that helps users find the best homes across India, especially in major cities like Delhi, Mumbai, Bengaluru, Pune, and more.

                🎯 **Your Goal:**
                Adapt your response style based on the user's intent. Be smart, conversational, and insightful — not robotic.

                ---

                🔍 **Search Logic:**
                When the user mentions a location + property type (e.g., "2BHK in New Delhi"), use this search format:
                **"[BHK] [property type] for sale [city] 2025"**

                Real-time results will be passed in:
                ${webSummary}

                ---

                🧠 **Response Strategy (Based on Intent):**

                1. **Broad Queries**  
                _Example: "I want to buy a flat in Noida"_  
                → Respond with an overview of 2–3 top areas (e.g., Sector 75, Sector 137)  
                → Mention average price ranges, key highlights  
                → Ask a clarifying question like “Would you like to see listings in any of these areas?”

                2. **Specific Queries**  
                _Example: "Show 2BHK in South Delhi under 60L"_  
                → Provide actual listings, grouped by budget: Economy / Mid-range / Premium  
                → Include pros, cons, size, and highlights for each property

                3. **Comparison Queries**  
                _Example: "Compare Dwarka and Rohini"_  
                → Return a side-by-side area comparison  
                → Include price range, location pros/cons, connectivity, etc.

                ---

                🏠 **Format for Listings:**

                1. **Headline:** Reflect user's query clearly  
                2. **Listings:** (grouped by category)
                - Area & Property Name  
                - Price (mention if negotiable)  
                - Size (Carpet/Built-up)  
                - Key Highlights  
                - ✅ Pros / ❌ Cons  
                3. **Location Insights:** 2–3 lines with helpful observations  
                4. **Next Steps:** Suggestions like EMI help, compare areas, view similar listings

                ---

                🛠️ **Your Response Format:**

                Always return a JSON object with exactly **2 fields**:

                \`\`\`json
                {
                "response": "<expert reply tailored to the user’s query>",
                "suggestions": [
                    "Show 3BHKs in nearby areas",
                    "Compare price trends in East vs West Delhi",
                    "View resale flats in Sector 137"
                ]
                }
                \`\`\`

                ---

                Use the injected search results ${webSummary} to enrich your answer. Keep the tone warm, professional, and clear. Adjust detail level based on how specific or exploratory the user is.`
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
                content: `
You are a suggestion generator for a property advisor chatbot. Based on the user's question and the AI's response, generate 3 natural, conversational suggestions that represent what a user would naturally say or ask next.

Rules:
- Generate suggestions based on the specific content mentioned in the AI's response
- If the AI mentions property types (2BHK, 3BHK), create suggestions using those specific types
- If the AI mentions areas/locations, incorporate those areas in the suggestions
- Make suggestions sound like natural user statements or questions
- Focus on the user expressing their specific needs or preferences
- Keep suggestions concise and direct (6-12 words each)
- Vary the language and style to feel conversational
- Think about how users would naturally respond to the AI's suggestions

Example scenario:
AI Response: "To provide you with the best options in Dwarka or Rohini, could you specify the property type you're interested in, such as a 2BHK or 3BHK?"

Good suggestions based on this response:
- "I want to buy a 3BHK in Dwarka"
- "Show me 2BHK options in Rohini"
- "What are the prices for 3BHK in these areas?"

Key principle: Generate suggestions that directly respond to what the AI mentioned, using the same specific terms (property types, areas, etc.) that appeared in the AI's response.

Return only a JSON array of 3 suggestion strings, nothing else.`
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
            max_tokens: 200,
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
    return generateSimpleFallbackSuggestions(userMessage);
}

// Simplified fallback function
function generateSimpleFallbackSuggestions(userMessage: string): string[] {
    const message = userMessage.toLowerCase();

    if (message.includes("bhk") || message.includes("apartment")) {
        return [
            "Show me different sizes",
            "What's the best area?",
            "Check my budget options"
        ];
    }

    if (message.includes("budget") || message.includes("price")) {
        return [
            "Find properties in my range",
            "Calculate EMI options",
            "Show me financing help"
        ];
    }

    return [
        "Help me narrow down options",
        "Show me popular areas",
        "What's my next step?"
    ];
}