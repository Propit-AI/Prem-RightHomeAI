import "../globals.css";
import type { ReactNode } from "react";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-bricolage",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} w-screen h-screen flex items-center justify-center bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
