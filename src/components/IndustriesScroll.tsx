"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

/** Types */
type Industry = {
  name: string;
  description: string;
  website?: string; // domain or full URL
  logo?: string;    // optional explicit logo URL (preferred if provided)
};

/** Helpers */
function toDomain(input?: string): string | null {
  if (!input) return null;
  try {
    const u = input.includes("://") ? new URL(input) : new URL(`https://${input}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return input.replace(/^https?:\/\//, "").replace(/^www\./, "") || null;
  }
}

/** Build a logo source list: explicit → Clearbit → Google s2 */
function useLogoSources(website?: string, explicit?: string, size = 96) {
  const domain = useMemo(() => toDomain(website), [website]);
  return useMemo(() => {
    const arr: string[] = [];
    if (explicit) arr.push(explicit);
    if (domain) {
      arr.push(`https://logo.clearbit.com/${domain}`);
      arr.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`);
    }
    return arr;
  }, [domain, explicit, size]);
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .map((s) => s.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="grid h-20 w-20 place-items-center rounded-md bg-white/15 ring-1 ring-white/20 text-white/80 font-semibold">
      {letters || "?"}
    </div>
  );
}

/** Single card */
function Card({ industry }: { industry: Industry }) {
  const sources = useLogoSources(industry.website, industry.logo, 96);
  const [srcIdx, setSrcIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const href =
    industry.website
      ? industry.website.startsWith("http")
        ? industry.website
        : `https://${industry.website}`
      : "#";

  return (
    <div className="flex-shrink-0 w-64 h-32 p-3 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-700 hover:bg-gray-700/80 transition relative">
      <div className="flex-1 pr-20">
        <h3 className="text-sm font-semibold text-orange-400">{industry.name}</h3>
        <p className="text-gray-300 text-xs mt-1 line-clamp-3">{industry.description}</p>
      </div>

      {/* Clickable logo area (top-right) */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 w-20 h-20 flex items-center justify-center"
        aria-label={`${industry.name} website`}
      >
        <div className="relative h-20 w-20">
          {!failed && sources[srcIdx] ? (
            <Image
              src={sources[srcIdx]}
              alt={`${industry.name} logo`}
              fill
              sizes="80px"
              className="object-contain rounded-md ring-1 ring-white/15 bg-white/5"
              onError={() => {
                // Try next source, else fall to initials
                if (srcIdx < sources.length - 1) {
                  setSrcIdx((i) => i + 1);
                } else {
                  setFailed(true);
                }
              }}
            />
          ) : (
            <Initials name={industry.name} />
          )}
        </div>
      </a>
    </div>
  );
}

/** Horizontal scroll */
export default function IndustriesScroll() {
  // Update these as you wish; only "website" is needed to auto-fetch logos.
  const industries: Industry[] = [
    { name: "Agriculture",        description: "Farming asset management",      website: "bigdutchman.asia },
    { name: "Construction",       description: "Construction tools tracking",   website: "xcmg.net.au" },
    { name: "Transport",          description: "Logistics solutions",           website: "deanetransport.com.au" },
    { name: "Energy",             description: "Energy asset monitoring",       website: "windenergy.org.nz" },
    { name: "Defence",            description: "Defence systems",               website: "military.africa" },
    { name: "Strata",             description: "Property management",           website: "curtisstrata.com.au" },
  ];

  // Duplicate for seamless marquee
  const items = industries.concat(industries);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-transparent">
      <div className="flex overflow-hidden">
        <div className="flex animate-scroll space-x-4">
          {items.map((industry, index) => (
            <Card key={`${industry.name}-${index}`} industry={industry} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
