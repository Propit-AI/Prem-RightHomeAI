"use client";

import { UserRound } from "lucide-react";
import { Button } from "./ui/button";

function Navbar() {
    return (
        <div className="w-full fixed top-0 h-16 bg-[#fffff5]/80 backdrop-blur-sm flex justify-end items-center z-30">
            <Button
                variant="outline"
                className="rounded-xl text-md border-2 border-[#f2f2f2] bg-white text-[#666666] hover:bg-[#f2f2f2] shadow-xl mr-4"
                onClick={() => {
                    // Handle sign-in logic here
                }}
            >
            Sign In
            <UserRound className="h-5 w-5 ml-2"/>
            </Button>
        </div>
    );
}

export default Navbar;
