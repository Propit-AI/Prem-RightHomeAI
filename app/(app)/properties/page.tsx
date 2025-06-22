"use client";

import { useEffect, useState } from "react";
import mockData from "../../../public/data/mock_properties.json";
import { Home } from "lucide-react";
import PropertyCard from "@/components/property-card";

const PROPERTIES_PER_PAGE = 12;

type Property = {
    id?: string | number; // Optional, but recommended for key
    title: string;
    price: string;
    location: string;
    features: string[];
    link: string;
    image: string;
    type: string;
};

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [visibleCount, setVisibleCount] = useState(PROPERTIES_PER_PAGE);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulate API call
        setProperties(mockData.properties);
        setVisibleCount(PROPERTIES_PER_PAGE);
        setLoading(false);
    }, []);

    const loadMore = async () => {
        setLoading(true);
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setVisibleCount((prev) => prev + PROPERTIES_PER_PAGE);
        setLoading(false);
    };

    const hasMoreProperties = visibleCount < properties.length;

    return (
        <div className="h-full overflow-scroll bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Discover Your Dream Home
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our curated collection of premium properties in the most
                desirable locations
            </p>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
            {properties.slice(0, visibleCount).map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
            </div>

            {/* Load More Button */}
            {hasMoreProperties && (
            <div className="text-center">
                <button
                onClick={loadMore}
                disabled={loading}
                className="bg-[#333333] hover:bg-[#444444] disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:hover:translate-y-0"
                >
                {loading ? (
                    <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Loading More Properties...
                    </div>
                ) : (
                    `Load More Properties (${
                    properties.length - visibleCount
                    } remaining)`
                )}
                </button>
            </div>
            )}

            {/* No More Properties Message */}
            {!hasMoreProperties && properties.length > PROPERTIES_PER_PAGE && (
            <div className="text-center text-gray-600">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Home className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-lg font-semibold">
                You've seen all our properties!
                </p>
                <p className="text-sm">Check back soon for new listings.</p>
            </div>
            )}
        </div>
        </div>
    );
}
