// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import React from "react";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safe Assets Group",
  description:
    "Advanced asset reliability for heavy industry — mining, construction, agriculture, transport, energy, defence & strata.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Set global page background here so all pages match */}
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <TopNav />
        {/* Reserve space for fixed nav (match TopNav height) so content isn't hidden */}
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
