// src/app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";

export const metadata = {
  title: "SafeAssets",
  description: "SafeAssets Group website",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-white text-gray-900">
        <TopNav />
        {/* Push content below the fixed 64px nav so it’s always visible */}
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
