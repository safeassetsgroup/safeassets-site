"use client";
import React from "react";
import Link from "next/link";

type Props = {
  href?: string;
  showOnMobile?: boolean;
  className?: string;
  variant?: "nav" | "default";
};

export default function SpecialOfferBadge({
  href = "/contact",
  showOnMobile = false,
  className = "",
  variant = "nav",
}: Props) {
  const isNav = variant === "nav";

  const linkClasses = isNav
    ? "badge-link inline-flex items-center justify-center rounded-full border-2 border-white shadow-md bg-gradient-to-br from-orange-400 via-yellow-300 to-yellow-200 w-11 h-11 md:w-12 md:h-12 text-gray-900"
    : "badge-link inline-flex items-center justify-center rounded-full border-4 border-white shadow-2xl bg-gradient-to-br from-orange-400 via-yellow-300 to-yellow-200 w-44 h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 text-gray-900";

  return (
    <div className={`flex ${isNav ? "items-center" : "flex-col items-end"} ${showOnMobile ? "flex" : "hidden md:flex"} ${className}`}>
      <Link
        href={href}
        aria-label="Special Offer: $33 / week per unit — First 100 assets, no setup fees"
        className={linkClasses}
      >
        {isNav ? (
          <div className="flex flex-col items-center justify-center text-center px-1">
            <span className="text-[9px] font-bold uppercase tracking-wide text-white leading-none">Offer</span>
            <span className="text-sm md:text-base font-extrabold leading-none text-red-700">$33</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center px-2">
            <span className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-white">Special Offer</span>
            <span className="mt-1 text-red-700 font-extrabold leading-none text-3xl md:text-4xl lg:text-5xl">$33</span>
            <span className="text-[10px] md:text-xs text-gray-800 mt-1 font-semibold">/ week per unit</span>
          </div>
        )}
      </Link>

      {!isNav && (
        <div className="mt-2 text-right text-xs md:text-sm font-semibold text-gray-900 flex items-center gap-2 select-none">
          <span>🎯 First 100 Assets</span>
          <span className="opacity-50">·</span>
          <span>🚀 No Setup Fees</span>
        </div>
      )}

      <style jsx>{`
        @keyframes bulge {
          0% { transform: scale(1); }
          92% { transform: scale(1); }
          95% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }

        .badge-link {
          will-change: transform, box-shadow;
          animation: bulge 15s ease-in-out infinite;
          transition: transform 200ms ease, box-shadow 200ms ease;
          box-shadow: 0 10px 28px rgba(0,0,0,0.18), 0 6px 18px rgba(250,204,21,0.12);
        }

        .badge-link:hover {
          transform: translateY(-6%) scale(1.05);
          box-shadow: 0 28px 68px rgba(0,0,0,0.28), 0 10px 22px rgba(250,204,21,0.18);
        }
      `}</style>
    </div>
  );
}