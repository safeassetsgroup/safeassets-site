"use client";
import Link from "next/link";
import { BadgePercent, Timer, ArrowRight } from "lucide-react";

type Props = {
  href?: string;
  daysLeft?: number | null;
  className?: string;
  /** "plain" (default) for no fold, "fold" to show a subtle peeled corner */
  variant?: "plain" | "fold";
  /** Only used by variant="fold": the color under the peel; match the section bg (e.g. "bg-white", "bg-black") */
  revealBgClass?: string;
};

export default function SpecialOfferPromo({
  href = "/offers",
  daysLeft = 7,
  className = "",
  variant = "plain",       // <- default: no fold
  revealBgClass = "bg-white",  // only used when variant="fold"
}: Props) {
  const BaseCard = (
    <div
      className={[
        "relative isolate overflow-visible", // allow content to breathe
        "w-full max-w-[28rem] rounded-[28px] px-6 py-6",
        "bg-gradient-to-br from-red-600 via-red-600 to-orange-500",
        "text-white shadow-2xl ring-1 ring-red-400/40",
      ].join(" ")}
      style={{ perspective: 900 }}
    >
      {/* soft lights for depth */}
      <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-white/25 blur-2xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-28 w-28 rounded-full bg-black/20 blur-3xl" />

      {/* content */}
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-extrabold text-yellow-300">
        <BadgePercent className="h-4 w-4" />
        Limited Time Offer
      </div>

      <h3 className="mt-1 text-3xl sm:text-4xl font-black leading-tight">
        Launch bundle
      </h3>

      <p className="mt-2 text-sm sm:text-base text-white/95">
        Save on onboarding & setup costs.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {typeof daysLeft === "number" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] font-semibold">
            <Timer className="h-3.5 w-3.5" />
            {daysLeft} days to go
          </span>
        )}

        <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-red-900 font-extrabold shadow-md transition-transform hover:translate-x-0.5">
          View offer <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );

  return (
    <Link
      href="/offers"
      aria-label="View special offer"
      className={["group block", className].filter(Boolean).join(" ")}
    >
      {/* plain (no fold) */}
      {variant === "plain" && BaseCard}

      {/* optional: subtle folded corner (more realistic, but still tasteful) */}
      {variant === "fold" && (
        <div className="relative">
          {BaseCard}

          {/* area under the fold (match page/section bg) */}
          <span
            aria-hidden
            className={[
              "absolute bottom-0 right-0 h-20 w-20",
              "transition-all duration-300 ease-out group-hover:h-24 group-hover:w-24",
              revealBgClass,
            ].join(" ")}
            style={{
              clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
              zIndex: 0,
            }}
          />

          {/* soft shadow from the lifted paper */}
          <span
            aria-hidden
            className="absolute bottom-0 right-0 h-20 w-20 opacity-60 blur-[1px] transition-all duration-300 ease-out group-hover:h-24 group-hover:w-24"
            style={{
              clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0) 100%)",
              zIndex: 1,
            }}
          />

          {/* folded paper itself */}
          <span
            aria-hidden
            className="absolute bottom-0 right-0 h-20 w-20 origin-bottom-right rounded-br-[28px] ring-1 ring-black/5 transition-[transform,height,width] duration-300 ease-out group-hover:h-24 group-hover:w-24"
            style={{
              clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.75) 100%)",
              transform: "rotateX(10deg)",
              boxShadow:
                "0 6px 12px rgba(0,0,0,0.25), inset 0 0 1px rgba(0,0,0,0.18)",
              zIndex: 2,
            }}
          />
        </div>
      )}
    </Link>
  );
}
