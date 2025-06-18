"use client";

import { useChat, type MessageType } from "@/contexts/chat-context";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatInterface() {
  const { messages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-20">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

interface PropertyType {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  propertyType: string;
  amenities: string[];
  description: string;
  image: string;
  featured: boolean;
  pricePerSqFt: string;
}

interface PropertyResponse {
  greeting: string;
  properties: PropertyType[];
  marketInsight?: string;
  nextSteps?: string;
}

function MessageBubble({ message }: { message: MessageType }) {
  const isUser = message.role === "user";
  const router = useRouter();
  const [displayedIntroText, setDisplayedIntroText] = useState("");
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [showProperties, setShowProperties] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [greetingComplete, setGreetingComplete] = useState(false);

  // Handle property view details
  const handleViewDetails = (propertyId: string, propertyData: PropertyType) => {
    // Store property data in sessionStorage for the property page
    sessionStorage.setItem(`property_${propertyId}`, JSON.stringify(propertyData));
    // Navigate to property details page
    router.push(`/property/${propertyId}`);
  };

  // Parse the mixed content
  const parseMessageContent = (content: string) => {
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        const jsonData = JSON.parse(jsonMatch[1]);
        const introText = content.substring(0, content.indexOf('```json')).trim();
        return {
          hasJson: true,
          introText,
          jsonData: jsonData as PropertyResponse
        };
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    }
    return {
      hasJson: false,
      introText: content,
      jsonData: null
    };
  };

  const parsedContent = typeof message.content === "string" && !isUser 
    ? parseMessageContent(message.content)
    : { hasJson: false, introText: typeof message.content === "string" ? message.content : "", jsonData: null };

  useEffect(() => {
    if (isUser) {
      setDisplayedIntroText(typeof message.content === "string" ? message.content : "");
      return;
    }

    // Reset states
    setDisplayedIntroText("");
    setDisplayedGreeting("");
    setShowProperties(false);
    setIntroComplete(false);
    setGreetingComplete(false);

    // Type the intro text first
    let i = 0;
    const speed = 15;
    const introText = parsedContent.introText;

    const introInterval = setInterval(() => {
      if (i < introText.length) {
        setDisplayedIntroText((prev) => prev + introText[i]);
        i++;
      } else {
        clearInterval(introInterval);
        setIntroComplete(true);
        
        // If there's JSON data, start typing the greeting after a short delay
        if (parsedContent.hasJson && parsedContent.jsonData) {
          setTimeout(() => {
            let j = 0;
            const greetingText = parsedContent.jsonData!.greeting;
            const greetingInterval = setInterval(() => {
              if (j < greetingText.length) {
                setDisplayedGreeting((prev) => prev + greetingText[j]);
                j++;
              } else {
                clearInterval(greetingInterval);
                setGreetingComplete(true);
                // Show properties after greeting is complete
                setTimeout(() => {
                  setShowProperties(true);
                }, 500);
              }
            }, 20);
          }, 800);
        }
      }
    }, speed);

    return () => clearInterval(introInterval);
  }, [message.content, isUser]);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-5 h-5 rounded-full animate-pulse shadow-md bg-gradient-to-tl from-[#333333] to-[#333333]/70 flex items-center justify-center mr-3 mt-3">
          <span className="w-3 h-3 rounded-full animate-pulse bg-[#fffff5]"></span>
        </div>
      )}

      <div
        className={`max-w-[90%] mb-10 rounded-[1rem] font-medium ${
          isUser
            ? "bg-gradient-to-tl from-[#333333]/80 w-max to-[#333333]/50 text-white p-4"
            : "bg-transparent text-[#333333] md:w-[80%]"
        }`}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{displayedIntroText}</p>
        ) : ( 
          <div>
            {/* Intro Text */}
            <div className="p-4">
              <p className="text-sm whitespace-pre-wrap">
                {displayedIntroText}
                {!introComplete && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>

            {/* Greeting Message (only if JSON data exists) */}
            {parsedContent.hasJson && parsedContent.jsonData && introComplete && (
              <div className="px-4 pb-2">
                <div className="bg-[#f8f8f9] p-3 rounded-lg shadow">
                  <p className="text-sm text- font-medium">
                    {displayedGreeting}
                    {/* {message.content} */}
                    {!greetingComplete && (
                      <span className="animate-pulse">|</span>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Property Cards */}
            {parsedContent.hasJson && parsedContent.jsonData && showProperties && (
              <div className="px-4 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {parsedContent.jsonData.properties.map((property: PropertyType) => (
                    <div
                      key={property.id}
                      className={`border rounded-xl p-4 shadow-md flex flex-col transition-all duration-300 hover:shadow-lg ${
                        property.featured ? "ring-2 ring-[#333333] ring-opacity-50" : ""
                      }`}
                    >
                      {/* <div className="relative">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="rounded-lg h-40 w-full object-cover mb-3"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop";
                          }}
                        />
                        {property.featured && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </div>
                        )}
                      </div> */}
                      <div className="flex-1">
                        <h3 className="font-bold text-md md:text-lg mb-1 text-gray-800">{property.title}</h3>
                        <p className="text-xs md:text-sm text-gray-600 mb-2">{property.location}</p>
                        <p className="text-xs md:text-sm text-gray-700 mb-2">
                          {property.bedrooms} BHK • {property.bathrooms} Bath • {property.area}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 mb-2">{property.propertyType}</p>
                        
                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {property.amenities.slice(0, 3).map((amenity, idx) => (
                                <span
                                  key={idx}
                                  className="bg-[#333333]/20 text-xs px-2 py-1 rounded-full"
                                >
                                  {amenity}
                                </span>
                              ))}
                              {property.amenities.length > 3 && (
                                <span className="text-xs text-gray-500 px-2 py-1">
                                  +{property.amenities.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Description */}
                        <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">
                          {property.description}
                        </p>
                      </div>
                      
                      {/* Price Section */}
                      <div className="border-t pt-3 mt-auto">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                          <div>
                            <p className="text-green-600 font-bold text-sm md:text-lg">{property.price}</p>
                            <p className="text-xs text-gray-500">{property.pricePerSqFt}</p>
                          </div>
                          <button 
                            onClick={() => handleViewDetails(property.id, property)}
                            className="bg-[#333333] text-white px-4 py-2 rounded-2xl text-sm font-medium hover:bg-[#444444] transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Market Insight */}
                {parsedContent.jsonData.marketInsight && (
                  <div className="mt-4 p-3 bg-[#f8f8f9] rounded-lg shadow">
                    <p className="text-sm">
                      <span className="font-semibold">💡 Market Insight: </span>
                      {parsedContent.jsonData.marketInsight}
                    </p>
                  </div>
                )}

                {/* Next Steps */}
                {parsedContent.jsonData.nextSteps && (
                  <div className="mt-3 p-3 bg-[#f8f8f9] rounded-lg shadow">
                    <p className="text-sm">
                      <span className="font-semibold">🎯 Next Steps: </span>
                      {parsedContent.jsonData.nextSteps}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}