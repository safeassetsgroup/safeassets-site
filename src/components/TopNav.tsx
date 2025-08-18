"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TopNav() {
  const [imgError, setImgError] = useState(false);

  return (
    // fixed at top, solid background for good contrast, consistent height (h-16)
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center"
      role="navigation"
      aria-label="Top Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        {/* Logo (left) - responsive constrained container; fallback text if image missing */}
        <Link href="/" className="flex items-center mr-6">
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

        {/* Navigation links */}
        <div className="flex items-center gap-6">
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

        <div className="ml-auto">
          {/* Login button (coming soon) — visually disabled */}
          <button
            type="button"
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center px-4 py-2 rounded-md bg-gray-200 text-gray-600 font-semibold cursor-not-allowed"
          >
            <span className="mr-2">Login</span>
            <span className="text-xs uppercase bg-transparent px-2 py-0.5 rounded text-gray-500">Coming Soon</span>
          </button>
        </div>
      </div>
    </nav>
  );
}