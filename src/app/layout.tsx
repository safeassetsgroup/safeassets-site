// src/app/layout.tsx
import React from "react";
import TopNav from "@/components/TopNav";
import "./globals.css";

export const metadata = {
  title: "SafeAssets",
  description: "SafeAssets Group website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <TopNav />
        {/* reserve space for fixed nav (matches TopNav height) */}
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
