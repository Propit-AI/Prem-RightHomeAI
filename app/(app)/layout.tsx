import type React from "react";
import type { Metadata } from "next";
import { Oxygen } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatProvider } from "@/contexts/chat-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import Main from "@/components/main";

const oxygen = Oxygen({
  subsets: ["latin"],
  variable: "--font-oxygen",
  weight: ["400", "700"]
})

export const metadata: Metadata = {
  title: "RightHomeAI - Real Estate Assistant",
  description: "AI-powered real estate assistant to help you find your perfect home in Delhi, Noida, Gurgaon, and more.",
  keywords: ["real estate", "AI assistant", "property search", "2BHK homes", "buy home in Delhi", "RightHomeAI"],
  authors: [{ name: "RightHomeAI", url: "https://righthomeai.com" }],
  creator: "RightHomeAI",
  applicationName: "RightHomeAI",
  metadataBase: new URL("https://righthomeai.com"),

  openGraph: {
    title: "RightHomeAI – Your AI Real Estate Assistant",
    description: "Find your dream home with the help of AI. Browse 2BHK, 3BHK homes, and properties with intelligent search.",
    url: "https://righthomeai.com",
    siteName: "RightHomeAI",
    images: [
      {
        url: "https://righthomeai.com/og-image.jpg", // Add a real image here
        width: 1200,
        height: 630,
        alt: "RightHomeAI - Real Estate AI Assistant",
      },
    ],
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "RightHomeAI – Real Estate AI Assistant",
    description: "Use AI to discover your ideal property. Fast, accurate, and user-friendly.",
    images: ["https://righthomeai.com/og-image.jpg"], // Add a real image here
    creator: "@PExIndia",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oxygen.variable} antialiased`}>
        <ThemeProvider defaultTheme="light" storageKey="righthome-theme">
          <ChatProvider>
            <SidebarProvider>
              <div className="flex h-screen bg-gradient-to-r from-[#f9f8f6] to-[#dddedb] overflow-hidden transition-all duration-300 ease-in-out">
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
