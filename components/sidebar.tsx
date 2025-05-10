"use client"

import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Grid,
  FlaskRoundIcon as Flask,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  LayoutDashboard,
  PanelLeft,
  Webhook,
  Play,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useChat } from "@/contexts/chat-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const sidebarItems = [
  // {
  //   name: "Chat",
  //   href: "/",
  //   icon: MessageSquare,
  // },
  {
    name: "Discover",
    href: "/discover",
    icon: LayoutDashboard,
  },
  {
    name: "Labs",
    href: "/labs",
    icon: Webhook,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)
  const { clearMessages } = useChat()

  // Check if screen is mobile on initial render and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setExpanded(window.innerWidth >= 768)
    }

    // Set initial state
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleNewConversation = () => {
    clearMessages()
  }

  return (
    <div
      className={cn(
        "h-screen bg-[#f8f8f9] shadow-md absolute md:relative flex flex-col shrink-0 transition-all duration-300 z-50",
        expanded ? "w-[324px]" : "w-0",
      )}
    >
      <div className="p-4 flex items-center justify-between h-16 bg-[#f9f9f8] w-full">
            {expanded && (
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold">RightHomeAI</h1>
            </div>
            )}

            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setExpanded(!expanded)}
                className="z-10 text-[#666666] hover:bg-[#f2f2f2]"
              >
                <PanelLeft className="h-6 w-6" />
              </Button>
              <Link href={"/"} className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setExpanded(false);
                  }
                }}
                className="z-10 text-[#666666] hover:bg-[#f2f2f2]"
              >
                <Play className="h-6 w-6" />
              </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <ChevronDown className="h-6 w-6 text-[#666666]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={(e) => {
                    if (window.innerWidth < 768) {
                      setExpanded(false);
                    }
                    handleNewConversation()
                  }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New conversation</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>New page</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
      </div>


      <nav className={`flex-1 ${expanded ? 'p-2' : 'p-0'} overflow-y-auto`}>
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setExpanded(false);
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-2xl transition-colors",
                  pathname === item.href ? "bg-[#f2f2f2]" : "hover:bg-[#f2f2f2]",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl shadow-sm flex items-center justify-center",
                    item.name === "Discover" ? "bg-[#f8f3e9]" : item.name === "Labs" ? "bg-[#f9e9ec]" : "bg-[#f2f2f2]",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5",
                      item.name === "Discover"
                        ? "text-[#c17c2e]"
                        : item.name === "Labs"
                          ? "text-[#e75480]"
                          : "text-[#666666]",
                    )}
                  />
                </div>
                {expanded && (
                  <div className="flex flex-col">
                    <span className="font-medium text-[#333333]">{item.name}</span>
                    <span className="text-xs text-[#666666]">
                      {item.name === "Discover"
                        ? "Your daily property news"
                        : item.name === "Labs"
                          ? "Experimental AI features"
                          : "Find your perfect home"}
                    </span>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {expanded && (
        <div className="p-4">
          <h3 className="text-md font-medium text-[#666666] mb-3">Conversations</h3>
          <p className="text-sm text-[#666666] mb-4">
            Conversations with RightHomeAI will be shown here. Sign in to keep your conversations.
          </p>
          <Button className="w-full bg-[#333333] hover:bg-[#444444] text-white">Sign in</Button>
        </div>
      )}
    </div>
  )
}
