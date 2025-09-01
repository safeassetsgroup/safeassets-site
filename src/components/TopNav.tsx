"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const [imgError, setImgError] = useState(false);

  const linkClass = (href: string) =>
    `transition ${
      pathname === href
        ? "text-gray-900 font-semibold"
        : "text-gray-800 hover:text-gray-600"
    }`;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999] h-16 border-b border-gray-200 bg-white shadow-2xl"
      role="navigation"
      aria-label="Top Navigation"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center mr-6" aria-label="SafeAssets Home">
          <div className="flex h-10 items-center overflow-hidden md:h-12">
            {!imgError ? (
              <Image
                src="/brand/logo.png"
                alt="SafeAssets Group logo"
                width={160}
                height={40}
                className="h-full w-auto rounded-md object-contain"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-lg font-bold text-gray-800">SafeAssets</span>
            )}
          </div>
        </Link>

        {/* Primary nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/about" className={linkClass("/about")}>About</Link>
          <Link href="/industries" className={linkClass("/industries")}>Industries</Link>
          <Link href="/pricing" className={linkClass("/pricing")}>Pricing</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
        </div>

        {/* Right side */}
        <div className="ml-4 flex items-center gap-3">
          <button
            type="button"
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex cursor-not-allowed items-center rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-600"
          >
            <span className="mr-2">Login</span>
            <span className="rounded bg-transparent px-2 py-0.5 text-xs uppercase text-gray-500">
              Coming Soon
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
