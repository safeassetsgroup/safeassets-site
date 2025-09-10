"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import industries from "@/app/content/industries.json";
import { buildCandidatesForIndustry, preloadImage } from "@/lib/mediaCandidates";

interface Industry {
  slug?: string;
  name?: string;
  image?: string;
  description?: string;
  excerpt?: string;
}

/** Derive a usable slug: prefer provided slug, else sanitize name, else use image filename, else index */
function deriveSlug(industry: Industry, idx: number) {
  if (industry.slug && String(industry.slug).trim()) return String(industry.slug).trim();
  if (industry.name && String(industry.name).trim()) {
    return String(industry.name)
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }
  if (industry.image && String(industry.image).trim()) {
    const parts = industry.image.split("/").pop()?.split(".") ?? [];
    if (parts.length) return parts[0];
  }
  return `industry-${idx}`;
}

export default function IndustryGrid() {
  const [selected, setSelected] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const nextSelected: Record<string, string> = {};
      for (let i = 0; i < industries.length; i++) {
        const ind = industries[i];
        const key = ind.slug ?? `industry-${i}`;
        const candidates = buildCandidatesForIndustry(ind, ind.slug ?? key);

        let found: string | null = null;
        for (const c of candidates) {
          // try preload sequentially (priority preserved) - images only test will succeed for images
          // eslint-disable-next-line no-await-in-loop
          const ok = await preloadImage(c);
          if (ok) {
            found = c;
            break;
          }
        }

        nextSelected[key] = found ?? "/placeholder.jpg";
        if (cancelled) return;
        setSelected((prev) => ({ ...prev, [key]: nextSelected[key] }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    // full-bleed background that matches the site's dark/blue palette
    <section className="w-full bg-gradient-to-r from-[#071024] via-[#0b2333] to-[#092735] py-14">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-10 text-left">
          <h2 className="text-4xl font-extrabold text-white">All Industries We Serve</h2>
          <p className="text-gray-300 mt-3 max-w-3xl">
            Trusted asset reliability and uptime solutions tailored to each industry.
          </p>
        </div>

        {/* modern responsive grid that stretches to the edges of the max-width container */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          {industries.map((industry: Industry, idx: number) => {
            const key = deriveSlug(industry, idx);
            const src = selected[key] ?? "/placeholder.jpg";
            const slug = deriveSlug(industry, idx);
            const href = `/industries/${encodeURIComponent(slug)}`;

            return (
              <Link
                key={key}
                href={href}
                className="group block rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-2 transition"
              >
                <div className="relative h-56 w-full bg-gray-800 rounded-t-lg overflow-hidden">
                  <img
                    src={src}
                    alt={industry.name ?? "Industry"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
                  <div className="absolute left-6 bottom-6">
                    <h3 className="text-white text-xl font-semibold drop-shadow">{industry.name}</h3>
                    <p className="text-sm text-gray-200/80 mt-1 max-w-xs">{industry.description}</p>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-b from-black/10 to-transparent rounded-b-lg flex items-center justify-between">
                  <div className="text-sm text-gray-300">{industry.excerpt ?? ""}</div>
                  <span
                    className="ml-4 inline-block px-4 py-2 rounded-full font-semibold text-white"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    Explore
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// To kill the process running on port 3000 (if needed)
// netstat -ano | findstr :3000
// taskkill /PID <PID> /F
// rmdir /s /q .next


