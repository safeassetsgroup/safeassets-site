"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TopNav() {
  const [imgError, setImgError] = useState(false);
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999] bg-white border-b border-gray-200 shadow-2xl h-16 flex items-center"
      role="navigation"
      aria-label="Top Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center mr-2" onClick={close}>
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

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-800 hover:text-gray-600 transition">Home</Link>
          <Link href="/about" className="text-gray-800 hover:text-gray-600 transition">About</Link>
          <Link href="/industries" className="text-gray-800 hover:text-gray-600 transition">Industries</Link>
          <Link href="/pricing" className="text-gray-800 hover:text-gray-600 transition">Pricing</Link>
          <Link href="/contact" className="text-gray-800 hover:text-gray-600 transition">Contact</Link>
        </div>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center px-4 py-2 rounded-md bg-gray-200 text-gray-600 font-semibold cursor-not-allowed"
          >
            <span className="mr-2">Login</span>
            <span className="text-xs uppercase bg-transparent px-2 py-0.5 rounded text-gray-500">
              Coming&nbsp;Soon
            </span>
          </button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-100"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* icon */}
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`${open ? "block" : "hidden"} md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-200 shadow-lg`}
      >
        <div className="px-4 py-3 space-y-1">
          <Link href="/" className="block px-2 py-2 rounded hover:bg-gray-50 text-gray-900" onClick={close}>
            Home
          </Link>
          <Link href="/about" className="block px-2 py-2 rounded hover:bg-gray-50 text-gray-900" onClick={close}>
            About
          </Link>
          <Link href="/industries" className="block px-2 py-2 rounded hover:bg-gray-50 text-gray-900" onClick={close}>
            Industries
          </Link>
          <Link href="/pricing" className="block px-2 py-2 rounded hover:bg-gray-50 text-gray-900" onClick={close}>
            Pricing
          </Link>
          <Link href="/contact" className="block px-2 py-2 rounded hover:bg-gray-50 text-gray-900" onClick={close}>
            Contact
          </Link>

          <div className="pt-2">
            <button
              type="button"
              aria-disabled="true"
              title="Coming soon"
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-gray-200 text-gray-600 font-semibold cursor-not-allowed"
            >
              <span className="mr-2">Login</span>
              <span className="text-xs uppercase px-2 py-0.5 rounded text-gray-500">Coming&nbsp;Soon</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
