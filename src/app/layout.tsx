// src/app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import SpecialOfferPromo from "@/components/SpecialOfferPromo";

export const metadata = {
  title: "SafeAssets",
  description: "SafeAssets Group website",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        {/* Fixed header (assume ~64px height) */}
        <TopNav />

        {/* Spacer so content (and promo) appear below the fixed nav.
           If your nav is taller, bump h-16 -> h-20, etc. */}
        <div className="h-16" aria-hidden />

        {/* Global promo strip: shows on ALL pages, below the nav */}
        <section className="bg-black">
          <div className="mx-auto max-w-7xl px-6 py-4 flex justify-end">
            <SpecialOfferPromo href="/offers/launch-bundle" />
          </div>
        </section>

        {/* Main content—no extra top padding now */}
        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
