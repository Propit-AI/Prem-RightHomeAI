import type React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatProvider } from "@/contexts/chat-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import Main from "@/components/main";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "RightHomeAI - Real Estate Assistant",
  description:
    "AI-powered real estate assistant to help you find your perfect home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ThemeProvider defaultTheme="light" storageKey="righthome-theme">
          <ChatProvider>
            <SidebarProvider>
              <div className="flex h-screen bg-gradient-to-br from-[#f8f8f9] to-[#fffff5] overflow-hidden transition-all duration-300 ease-in-out">
                <Sidebar />
                <Main>{children}</Main>
              </div>
            </SidebarProvider>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
