'use client'

import { useSidebar } from "@/contexts/sidebar-context"

export default function Main({ children }: { children: React.ReactNode }) {
    const { isOpen } = useSidebar();

    return (
        <main
        className={`transition-all duration-300 bg-gradient-to-tl from-[#fffdf4] to-[#fffef9] ease-in-out flex-1 relative overflow-hidden md:shadow-xl md:rounded-2xl ${
            isOpen ? 'md:m-2' : 'm-0'
        }`}
        >
        {children}
        </main>
    )
}
