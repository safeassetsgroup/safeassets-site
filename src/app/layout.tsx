// src/app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";
import React from "react";

export const metadata = {
  title: "SafeAssets",
  description: "SafeAssets Group website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-900 text-white">
        <TopNav />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
