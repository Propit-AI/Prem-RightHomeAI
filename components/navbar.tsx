"use client";

import { useState, useEffect } from "react";
import { UserRound, X } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "./ui/logo";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIsMobile();

        // Add event listener
        window.addEventListener("resize", checkIsMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    return (
        <>
        <div className="w-full fixed top-0 h-16 flex justify-end items-center z-30">
            <Button
            variant="outline"
            className="rounded-xl text-sm md:text-md border-none px-3 py-5 md:px-4 md:py-6 bg-[#fffef9] hover:bg-[#fffef9] text-[#333333] shadow-lg backdrop-blur-sm mr-4 mt-4"
            onClick={() => setIsMenuOpen(true)}
            >
            Sign in
            <UserRound className="h-4 w-4 md:h-5 md:w-5 ml-2" />
            </Button>
        </div>

        {/* Modal Overlay */}
        {isMenuOpen && (
            <div
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
            />
        )}

        {/* Modal Menu */}
        <div
            className={`fixed bg-[#fffef9] rounded-[2rem] shadow-xl z-50 transition-all duration-300 ease-in-out ${
            isMobile
                ? `bottom-0 left-0 right-0 ${
                    isMenuOpen ? "translate-y-0" : "translate-y-full"
                }`
                : `top-20 right-4 w-72 ${
                    isMenuOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`
            }`}
        >
            <div className="m-2 p-2 rounded-[2rem] bg-[#fffdf4]/70 border flex flex-col justify-between items-center border-b">
                <div className="p-2">
                <Logo/>
                </div>
                <h2 className="ml-3 text-sm font-medium text-center text-[#333333]">
                    Create an account or sign in for personalized homes, AI search, and voice help.
                </h2>
            </div>

            <div className="p-4">
            <Button
                className="w-full bg-[#333333] hover:bg-[#333333]/90 text-white rounded-[1rem] py-2"
                onClick={() => (window.location.href = "/login")}
            >
                Sign in
            </Button>
            </div>

            <div className="px-4 py-3 space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
                <div className="text-[#333333]">Name</div>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
                <div className="text-[#333333]">Voice</div>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
                <div className="text-[#333333]">Language</div>
                <div className="text-[#555555]">EN</div>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
                <div className="text-[#333333]">Theme</div>
                <div className="text-[#555555]">DAY</div>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
                <div className="text-[#333333]">About</div>
            </div>
            </div>

            <div className="flex justify-center gap-4 p-4 border-t text-xs font-medium">
            <button className="hover:text-[#333333]">Privacy</button>
            <button className="hover:text-[#333333]">Terms</button>
            <button className="hover:text-[#333333]">FAQ</button>
            </div>
        </div>
        </>
    );
}

export default Navbar;
