"use client";
import Link from "next/link";
import { BadgePercent, Timer, ArrowRight } from "lucide-react";

/**
 * Vibrant, inline promo inspired by your samples:
 * - Red “sticker/speech-bubble” with yellow accents
 * - Countdown chip (optional via daysLeft)
 * - Big CTA pill
 * - NO fixed/absolute positioning -> it renders exactly where you place it
 */
export default function SpecialOfferPromo({
  href = "/offers",       // <- correct this to your real offer route
  daysLeft = 7,           // set to null/undefined to hide the countdown chip
  className = "",
}: {
  href?: string;
  daysLeft?: number | null;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="View special offer"
      className={["group block", className].filter(Boolean).join(" ")}
    >
      <div
        className="
          relative isolate overflow-hidden rounded-[28px] px-6 py-5
          bg-red-600 text-white shadow-2xl ring-1 ring-red-400/50
        "
      >
        {/* subtle lights / texture */}
        <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-14 -left-8 h-24 w-24 rounded-full bg-red-800/40 blur-xl" />

        {/* little “tail” for the speech-bubble vibe */}
        <span aria-hidden className="absolute -right-6 bottom-[-14px] h-10 w-10 rotate-45 bg-red-700" />

        {/* top badge */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-extrabold text-yellow-300">
          <BadgePercent className="h-4 w-4" />
          Best deal of the week
        </div>

        {/* main headline */}
        <h3 className="mt-1 text-3xl sm:text-4xl font-black leading-tight">
          Special Offer
        </h3>

        <p className="mt-1 text-sm sm:text-base text-white/95">
          Save on onboarding, telemetry setup & premium support.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          {typeof daysLeft === "number" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/80 px-2 py-1 text-[11px] font-semibold">
              <Timer className="h-3.5 w-3.5" />
              {daysLeft} days to go
            </span>
          )}

          <span
            className="
              inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2
              text-red-900 font-extrabold shadow-md transition-transform
              group-hover:translate-x-0.5
            "
          >
            Shop now <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
