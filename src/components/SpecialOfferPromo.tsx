"use client";
import Link from "next/link";

export default function SpecialOfferPromo() {
  return (
    <Link
      href="/offers"
      aria-label="View special offer"
      className="group absolute right-4 sm:right-6 top-28 sm:top-24 md:top-28 lg:top-32 z-[9000]"
    >
      <div className="w-72 sm:w-80 rounded-2xl border border-orange-400/70 bg-white/90 backdrop-blur-md shadow-xl p-4 sm:p-5">
        <div className="text-xs uppercase tracking-wide text-orange-600 font-semibold">
          Limited-time offer
        </div>
        <div className="mt-1 text-2xl font-extrabold text-gray-900">
          Launch bundle
        </div>
        <p className="mt-2 text-sm text-gray-700">
          Save on onboarding, telemetry setup and support.
        </p>
        <div className="mt-4 inline-flex items-center text-orange-600 font-semibold">
          Learn more
          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.293 15.707a1 1 0 010-1.414L12.586 12H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 111.414-1.414l4.0 4a1 1 0 010 1.414l-4.0 4a1 1 0 01-1.414 0z"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}