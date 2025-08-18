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
    ? // fluid compact size for nav, allow shrinking to avoid horizontal overflow
      "badge-link inline-flex items-center justify-center rounded-full border-2 border-white shadow-md bg-gradient-to-br from-orange-400 via-yellow-300 to-yellow-200 text-gray-900 " +
      "w-[clamp(40px,6.5vw,60px)] h-[clamp(40px,6.5vw,60px)] max-w-[64px] max-h-[64px] text-[clamp(10px,12px,14px)]"
    : // larger fluid size for default badge
      "badge-link inline-flex items-center justify-center rounded-full border-4 border-white shadow-2xl bg-gradient-to-br from-orange-400 via-yellow-300 to-yellow-200 text-gray-900 " +
      "w-[clamp(112px,18vw,220px)] h-[clamp(112px,18vw,220px)] text-[clamp(12px,18px,36px)]";

  return (
    <div
      className={`flex ${isNav ? "items-center" : "flex-col items-end"} ${showOnMobile ? "flex" : "hidden md:flex"} ${className}`}
    >
      <Link
        href={href}
        aria-label="Special Offer: $33 / week per unit — First 100 assets, no setup fees"
        className={linkClasses}
      >
        {isNav ? (
          <div className="flex flex-col items-center justify-center text-center px-1">
            <span className="text-[clamp(8px,1.2vw,10px)] font-bold uppercase tracking-wide text-white leading-none">Offer</span>
            <span className="text-[clamp(12px,2.2vw,14px)] font-extrabold leading-none text-red-700">$33</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center px-2">
            <span className="text-[clamp(10px,1.6vw,14px)] font-extrabold uppercase tracking-wider text-white">Special Offer</span>
            <span className="mt-1 text-red-700 font-extrabold leading-none text-[clamp(24px,4.5vw,48px)]">$33</span>
            <span className="text-[clamp(10px,1.4vw,14px)] text-gray-800 mt-1 font-semibold">/ week per unit</span>
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
          display: inline-flex;
        }

        .badge-link:hover {
          transform: translateY(-6%) scale(1.05);
          box-shadow: 0 28px 68px rgba(0,0,0,0.28), 0 10px 22px rgba(250,204,21,0.18);
        }
      `}</style>
    </div>
  );
}