'use client'
import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";
import React, { useState } from "react";

interface Property {
    title: string;
    price: string;
    location: string;
    features: string[];
    link: string;
    image: string;
    isNew?: boolean;
    type: string;
}

function PropertyCard({ property }: { property: Property }) {
    const [isLiked, setIsLiked] = useState(false);

    const bedroomCount = property.features.find(f => f.includes('Bedroom'))?.split(' ')[0] || '0';
    const bathroomCount = property.features.find(f => f.includes('Bathroom'))?.split(' ')[0] || '0';
    const sqftCount = property.features.find(f => f.includes('sq ft'))?.replace(' sq ft', '') || '0';

    return (
        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
        <div className="relative">
            <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-64 object-cover"
            />
            <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
            >
            <Heart
                className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
            </button>
            {property.isNew && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                NEW
            </div>
            )}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {property.type}
            </div>
        </div>
        
        <div className="p-6">
            <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                {property.title}
            </h3>
            <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{property.location}</span>
            </div>
            </div>

            <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span className="text-sm">{bedroomCount}</span>
                </div>
                <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span className="text-sm">{bathroomCount}</span>
                </div>
                <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span className="text-sm">{sqftCount}</span>
                </div>
            </div>
            </div>

            <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{property.price}</span>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200">
                View Details
            </button>
            </div>
        </div>
        </div>
    );
}

export default PropertyCard;