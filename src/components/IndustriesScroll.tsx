"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import industries from "@/app/content/industries.json";

type AdInfo = { url: string; link?: string; title?: string; isDefault?: boolean };

export default function IndustriesScroll() {
  const [ads, setAds] = useState<Record<string, AdInfo>>({});

  useEffect(() => {
    let cancelled = false;

    const probeImage = (src: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = encodeURI(src);
      });

    async function resolveAds() {
      const next: Record<string, AdInfo> = {};
      for (const ind of industries) {
        if (cancelled) return;
        const slug = ind.slug;
        const candidates: string[] = [];

        if (ind.ad && ind.ad.image) candidates.push(ind.ad.image);

        candidates.push(
          `/ads/${slug}/ad.jpg`,
          `/ads/${slug}/ad.png`,
          `/ads/${slug}/banner.jpg`,
          `/ads/${slug}/banner.png`,
          `/ads/${slug}.jpg`,
          `/ads/${slug}.png`
        );

        const fallback = "/ads/default.jpg";

        let found: string | null = null;
        for (const c of candidates) {
          if (await probeImage(c)) {
            found = c;
            break;
          }
        }

        if (found) {
          next[slug] = { url: found, link: ind.ad?.link, title: ind.ad?.title ?? "" };
        } else {
          next[slug] = { url: fallback, link: ind.ad?.link, title: ind.ad?.title ?? "", isDefault: true };
        }
      }

      if (!cancelled) setAds(next);
    }

    resolveAds();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAdClick = (industrySlug: string, ad: AdInfo | undefined) => {
    if (!ad) return;
    console.log("ad-click", { industry: industrySlug, url: ad.url, link: ad.link });
    if (ad.link) window.location.href = ad.link;
  };

  return (
    // z-10 so content (z-20) renders above this scroller
    <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 overflow-x-auto overflow-y-hidden z-10 industries-scroll">
      <div className="flex gap-4 min-w-max">
        {industries.map((industry: any) => {
          const ad: AdInfo | undefined = ads[industry.slug];
          return (
            <div
              key={industry.slug}
              className="flex-shrink-0 w-64 bg-gray-800 rounded overflow-hidden shadow hover:scale-105 transform transition relative"
            >
              <Link href={industry.slug ? `/industries/${industry.slug}` : "#"} className="block">
                <img
                  src={industry.image ? (industry.image.startsWith("/") ? industry.image : `/industries/${encodeURIComponent(industry.image)}`) : "/placeholder.jpg"}
                  alt={industry.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-white font-bold">{industry.name}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">{industry.description}</p>
                </div>
              </Link>

              <div className="p-3 border-t border-white/5 bg-gradient-to-t from-black/40 to-transparent flex items-center gap-3">
                <img
                  src={ad ? ad.url : "/ads/default.jpg"}
                  alt={ad?.title ?? "Advertisement"}
                  className="w-20 h-12 object-cover rounded"
                  loading="lazy"
                />
                <div className="flex-1">
                  <div className="text-sm text-white font-semibold">{ad?.title ?? "Sponsored"}</div>
                </div>
                <button
                  onClick={() => handleAdClick(industry.slug, ad)}
                  className="ml-3 px-3 py-1 rounded-full font-semibold text-sm"
                  style={{ backgroundColor: "var(--primary-color)", color: "#fff" }}
                >
                  {ad?.link ? "Learn" : "Info"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
