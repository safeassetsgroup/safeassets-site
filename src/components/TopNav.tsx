"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SpecialOfferBadge from "@/components/SpecialOfferBadge";

export default function TopNav() {
  const [imgError, setImgError] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center"
      role="navigation"
      aria-label="Top Navigation"
    >
      {/* add extra right padding (pr-6) so controls don't hug the viewport edge */}
      <div className="max-w-7xl mx-auto px-4 pr-6 w-full flex items-center justify-between">
        {/* left: logo (do not shrink) */}
        <Link href="/" className="flex items-center mr-6 flex-shrink-0">
          <div className="flex items-center h-10 md:h-12 overflow-hidden">
            {!imgError ? (
              <Image
                src="/brand/logo.png"
                alt="SafeAssets Group logo"
                width={160}
                height={40}
                className="h-full w-auto object-contain rounded-md"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-lg font-bold text-gray-800">SafeAssets</span>
            )}
          </div>
        </Link>

        {/* center links: hide on small screens to avoid overflow; allow shrinking with min-w-0 */}
        <div className="hidden md:flex items-center gap-6 min-w-0">
          <Link href="/" className="text-gray-800 hover:text-gray-600 transition">
            Home
          </Link>
          <Link href="/about" className="text-gray-800 hover:text-gray-600 transition">
            About
          </Link>
          <Link href="/industries" className="text-gray-800 hover:text-gray-600 transition">
            Industries
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-gray-600 transition">
            Contact
          </Link>
        </div>

        {/* right: login + badge; keep them from shrinking and ensure a small gap from the viewport edge */}
        <div className="ml-4 flex items-center gap-3 flex-shrink-0 pr-2">
          {/* Login button (coming soon) — visually disabled */}
          <button
            type="button"
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center px-4 py-2 rounded-md bg-gray-200 text-gray-600 font-semibold cursor-not-allowed flex-shrink-0"
          >
            <span className="mr-2">Login</span>
            <span className="text-xs uppercase bg-transparent px-2 py-0.5 rounded text-gray-500">Coming Soon</span>
          </button>

          {/* compact nav badge to the right of Login - it will be offset from the viewport edge by pr-6 above */}
          <SpecialOfferBadge variant="nav" showOnMobile={true} className="mr-2" />
        </div>
      </div>
    </nav>
  );
}