// src/app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";
import Script from "next/script";

export const metadata = {
  title: "SafeAssets",
  description: "SafeAssets Group website",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {/* Push content below the fixed 64px nav so it’s always visible */}
        <main className="pt-16">{children}</main>
        {/* reCAPTCHA v3 script */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
