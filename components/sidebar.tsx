"use client";

import { cn } from "@/lib/utils";
import {
  ChevronDown,
  LayoutDashboard,
  PanelLeft,
  Plus,
  SquarePen,
  Webhook,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useChat } from "@/contexts/chat-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useSidebar } from "@/contexts/sidebar-context";
import Logo from "./ui/logo";

const sidebarItems = [
  {
    name: "Discover",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Labs",
    href: "/labs",
    icon: Webhook,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { clearMessages, setIsConversationStarted } = useChat();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { isOpen, toggleSidebar, setIsOpen } = useSidebar();

  useEffect(() => {
    setIsOpen(isDesktop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  const handleNewConversation = () => {
    clearMessages();
  };

  return (
    <div
      className={cn(
        "h-screen bg-[#f8f8f9] absolute md:relative flex flex-col shrink-0 transition-all duration-300 z-50",
        isOpen ? "w-[324px]" : "w-0"
      )}
    >
      <div
        className={`p-4 flex items-center justify-between h-16 ${
          isOpen ? "bg-[#f9f9f8]" : "bg-transparent"
        } w-full`}
      >
        {isOpen && (
          <div className="flex items-center gap-3">
            <Logo/>
            <h1 className="text-md font-bold text-[#333333] font-segoe">RightHomeAI</h1>
          </div>
        )}

        <div className="flex items-center bg-[#fffff5]/70 backdrop-blur-sm p-1 rounded-[1rem]">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="z-10 text-[#666666] hover:bg-[#f2f2f2]"
          >
            <PanelLeft className="h-6 w-6" />
          </Button>
          <Link href={"/chat"} className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (!isDesktop) {
                  setIsOpen(false);
                }
              }}
              className="z-10 text-[#666666] hover:bg-[#f2f2f2]"
            >
              <SquarePen className="h-6 w-6" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <ChevronDown className="h-6 w-6 text-[#666666]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#fffff5]">
              <DropdownMenuItem
                onClick={() => {
                  if (!isDesktop) {
                    setIsOpen(false);
                  }
                  handleNewConversation();
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                <span className="text-[#333333] font-medium">New conversation</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span className="text-[#333333] font-medium">New page</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <nav className={cn(isOpen ? "p-2" : "p-0", "overflow-y-auto h-max")}>
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => {
                  if (!isDesktop) {
                    setIsOpen(false);
                  }

                  if (item.name === "Discover" || pathname === "/labs") {
                    setIsConversationStarted(false);
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-2xl transition-colors",
                  pathname === item.href
                    ? "bg-black/5 backdrop-blur-sm"
                    : "hover:bg-black/5 hover:backdrop-blur-sm"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl shadow-sm flex items-center justify-center",
                    item.name === "Discover"
                      ? "bg-[#fff6e3]"
                      : item.name === "Labs"
                      ? "bg-[#ffd8e0]"
                      : "bg-[#f2e1e1]"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5",
                      item.name === "Discover"
                        ? "text-[#c17c2e]"
                        : item.name === "Labs"
                        ? "text-[#e75480]"
                        : "text-[#666666]"
                    )}
                  />
                </div>
                {isOpen && (
                  <div className="flex flex-col">
                    <span className="font-bold text-[#333333]">
                      {item.name}
                    </span>
                    <span className="text-sm font-medium text-[#333333]">
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

      {isOpen && (
        <div className="flex-shrink-0 p-4">
          <h3 className="text-lg font-bold text-[#333333] mb-3">
            Conversations
          </h3>
          <p className="text-sm text-[#444444] font-medium mb-4">
            Conversations with RightHomeAI will be shown here. Sign in to keep
            your conversations.
          </p>
          <Button
            onClick={() => {
              // Replace the following line with your actual sign-in logic or redirect
              window.location.href = "/login";
            }}
            className="w-full rounded-2xl bg-[#333333] hover:bg-[#444444] text-white text-md"
          >
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
}