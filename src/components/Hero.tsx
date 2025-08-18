// src/components/Hero.tsx
"use client";

import Link from "next/link";

type Props = {
  heading: string;
  subheading?: string;
  ctaPrimaryHref?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryHref?: string;
  ctaSecondaryLabel?: string;
  videoSrc?: string | null;  // defaults to /hero/hero_1080.mp4
  posterSrc?: string;        // defaults to /hero/poster.jpg
};

export default function Hero({
  heading,
  subheading,
  ctaPrimaryHref = "/contact",
  ctaPrimaryLabel = "Talk to us",
  ctaSecondaryHref = "#industries",
  ctaSecondaryLabel = "Browse industries",
  videoSrc = "/hero/hero_1080.mp4",   // ← drop-in file name
  posterSrc = "/hero/poster.jpg",     // ← drop-in file name
}: Props) {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden bg-[#1E2328]">
      {/* Background image (always) */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${posterSrc})` }}
        aria-hidden
      />

      {/* Background video (plays when the file exists) */}
      {videoSrc && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Contrast overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Foreground content */}
      <div className="relative z-10 h-full">
        <div className="mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
          <h1 className="text-3xl sm:text-5xl font-semibold text-white">{heading}</h1>
          {subheading && (
            <p className="mt-3 max-w-2xl text-[#B8BDC4] text-base sm:text-lg">{subheading}</p>
          )}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={ctaPrimaryHref}
              className="inline-flex items-center justify-center rounded-md bg-[#F59E0B] px-5 py-2.5 font-medium text-black hover:opacity-90 transition"
            >
              {ctaPrimaryLabel}
            </Link>
            <a
              href={ctaSecondaryHref}
              className="inline-flex items-center justify-center rounded-md border border-white/15 px-5 py-2.5 text-white hover:bg-white/5 transition"
            >
              {ctaSecondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
