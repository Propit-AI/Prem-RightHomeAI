'use client'

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Login() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-t from-[#bbe6ff] to-[#fffff5] p-4">
        <div>
            <Button
            onClick={() => {
                window.location.href = "/";
            }}
            className="absolute top-8 right-8 bg-white text-[#333333] shadow-md rounded-full p-2 hover:bg-[#fff] transition duration-200"
            >
            <X />
            </Button>
        </div>
        <div className="max-w-lg w-full flex flex-col items-center justify-center">
            <h2 className="text-[22px] md:text-4xl font-semibold text-center text-[#333333] mb-4">
                Smart. Simple. Tailored for You.
            </h2>
            <p className="text-md text-center max-w-sm text-[#555555] mb-8">
                Create an account or sign in for personalized homes, AI search, and
                voice help.
            </p>
            <div className="flex w-full flex-col items-center gap-4 md:p-6">
            <button className="bg-white text-[#555555] w-full flex items-center justify-center gap-2 font-medium py-5 px-14 rounded-full shadow-md hover:bg-[#fffff5] transition duration-200">
                <img src="/login/microsoft-svgrepo-com.svg" alt="google" className="w-4 h-4"/>
                Continue with Microsoft
            </button>
            <button className="bg-white text-[#555555] w-full flex items-center justify-center gap-2 font-medium py-5 px-14 rounded-full shadow-md hover:bg-[#fffff5] transition duration-200">
                <img src="/login/google-icon-logo-svgrepo-com.svg" alt="google" className="w-4 h-4"/>
                Continue with Google
            </button>
            <button className="bg-white text-[#555555] w-full flex items-center justify-center gap-2 font-medium py-5 px-14 rounded-full shadow-md hover:bg-[#fffff5] transition duration-200">
                <img src="/login/apple-black-logo-svgrepo-com.svg" alt="google" className="w-4 h-4"/>
                Continue with Apple
            </button>
            </div>
        </div>
        </div>
    );
}
