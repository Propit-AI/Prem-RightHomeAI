"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    MapPin,
    Home,
    Bath,
    Square,
    Car,
    Shield,
    Users,
    Dumbbell,
    Trees,
} from "lucide-react";

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

const amenityIcons: { [key: string]: React.ReactNode } = {
    Parking: <Car className="w-4 h-4" />,
    Security: <Shield className="w-4 h-4" />,
    "24/7 Security": <Shield className="w-4 h-4" />,
    Gym: <Dumbbell className="w-4 h-4" />,
    Garden: <Trees className="w-4 h-4" />,
    "Children's Play Area": <Users className="w-4 h-4" />,
    "Swimming Pool": <div className="w-4 h-4 bg-blue-500 rounded-full"></div>,
};

export default function PropertyDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [property, setProperty] = useState<PropertyType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const propertyId = params.id as string;

        // Try to get property data from sessionStorage first
        const storedProperty = sessionStorage.getItem(`property_${propertyId}`);

        if (storedProperty) {
        try {
            const propertyData = JSON.parse(storedProperty);
            setProperty(propertyData);
            setLoading(false);
        } catch (error) {
            console.error("Error parsing property data:", error);
            // Fallback: could fetch from API here
            setLoading(false);
        }
        } else {
        // Fallback: could fetch from API here using propertyId
        // For now, just set loading to false
        setLoading(false);
        }
    }, [params.id]);

    const handleBack = () => {
        router.back();
    };

    const handleContactAgent = () => {
        // Implement contact functionality
        alert("Contact agent functionality would be implemented here");
    };

    const handleScheduleVisit = () => {
        // Implement schedule visit functionality
        alert("Schedule visit functionality would be implemented here");
    };

    if (loading) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property details...</p>
            </div>
        </div>
        );
    }

    if (!property) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Property Not Found
            </h1>
            <p className="text-gray-600 mb-6">
                The property you're looking for could not be found.
            </p>
            <button
                onClick={handleBack}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Go Back
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="h-full bg-gray-50 relative overflow-y-auto">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 py-4">
            <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Search
            </button>
            </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                {/* Property Image */}
                <div className="relative">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-xl"
                    onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop";
                    }}
                />
                {property.featured && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured Property
                    </div>
                )}
                </div>

                {/* Property Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{property.location}</span>
                    </div>
                    </div>
                    <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                        {property.price}
                    </div>
                    <div className="text-sm text-gray-500">
                        {property.pricePerSqFt}
                    </div>
                    </div>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Home className="w-5 h-5 text-blue-500" />
                    <div>
                        <div className="text-sm text-gray-600">Bedrooms</div>
                        <div className="font-semibold">{property.bedrooms} BHK</div>
                    </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Bath className="w-5 h-5 text-blue-500" />
                    <div>
                        <div className="text-sm text-gray-600">Bathrooms</div>
                        <div className="font-semibold">{property.bathrooms}</div>
                    </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Square className="w-5 h-5 text-blue-500" />
                    <div>
                        <div className="text-sm text-gray-600">Area</div>
                        <div className="font-semibold">{property.area}</div>
                    </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Home className="w-5 h-5 text-blue-500" />
                    <div>
                        <div className="text-sm text-gray-600">Type</div>
                        <div className="font-semibold">{property.propertyType}</div>
                    </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-gray-700 leading-relaxed">
                    {property.description}
                    </p>
                </div>

                {/* Amenities */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                        <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg"
                        >
                        {amenityIcons[amenity] || (
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        )}
                        <span className="text-sm font-medium text-blue-800">
                            {amenity}
                        </span>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                {/* Contact Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h3 className="text-xl font-semibold mb-4">
                    Interested in this property?
                </h3>

                <div className="space-y-3 mb-6">
                    <button
                    onClick={handleContactAgent}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                    Contact Agent
                    </button>
                    <button
                    onClick={handleScheduleVisit}
                    className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    >
                    Schedule Visit
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Quick Facts</h4>
                    <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Property ID:</span>
                        <span className="font-medium">{property.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Property Type:</span>
                        <span className="font-medium">{property.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Total Area:</span>
                        <span className="font-medium">{property.area}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Price per sq ft:</span>
                        <span className="font-medium">{property.pricePerSqFt}</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
