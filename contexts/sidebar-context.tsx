'use client'

import { createContext, useContext, useState } from 'react'

interface SidebarContextType {
    isOpen: boolean
    toggleSidebar: () => void
    setIsOpen: (isOpen: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true)

    const toggleSidebar = () => setIsOpen((prev) => !prev)

    return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, setIsOpen }}>
        {children}
    </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) throw new Error('useSidebar must be used within SidebarProvider')
    return context
}
