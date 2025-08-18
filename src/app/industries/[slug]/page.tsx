"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import industries from "@/app/content/industries.json";
import SpecialOfferBadge from "@/components/SpecialOfferBadge";
import MediaBackground from "@/components/MediaBackground";
import Link from "next/link";

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const { slug } = useParams() as { slug?: string };
  const router = useRouter();
  const [industry, setIndustry] = useState<any | null>(null);
  const [foundMedia, setFoundMedia] = useState<{ url: string; type: "video" | "image" } | null>(null);
  const [resolving, setResolving] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const found =
      industries.find((i: any) => {
        if (!i) return false;
        if (i.slug && i.slug === slug) return true;
        if (i.name && i.name.toLowerCase().replace(/\s+/g, "-") === slug) return true;
        if (i.image) {
          const imgName = String(i.image).split("/").pop()?.split(".")[0];
          if (imgName === slug) return true;
        }
        return false;
      }) ?? null;

    setIndustry(found);
    setFoundMedia(null);
    setResolving(true);

    (async () => {
      if (!found) {
        setResolving(false);
        return;
      }
      const candidates = buildCandidatesForIndustry(found, slug);
      for (const c of candidates) {
        // eslint-disable-next-line no-await-in-loop
        const ok = await probeCandidate(c);
        if (ok) {
          const isVideo = /\.(mp4|webm|ogg)$/i.test(c);
          setFoundMedia({ url: c, type: isVideo ? "video" : "image" });
          setResolving(false);
          return;
        }
      }
      setFoundMedia({ url: "/placeholder.jpg", type: "image" });
      setResolving(false);
    })();
  }, [slug]);

  if (!slug) {
    return (
      <main className="px-6 py-12">
        <p>Invalid industry.</p>
      </main>
    );
  }

  if (!industry) {
    return (
      <main className="px-6 py-12 max-w-4xl mx-auto">
        <p className="mb-4">Industry not found.</p>
        <button className="px-4 py-2 rounded bg-gray-200" onClick={() => router.push("/industries")}>
          Back to industries
        </button>
      </main>
    );
  }

  // heroContent reused for both placeholder and MediaBackground children
  const heroContent = (
    <div className="relative z-20 max-w-4xl mx-auto py-20 text-white">
      {/* Position badge absolutely relative to this container */}
      <SpecialOfferBadge
        price="$33"
        period="/week per unit"
        note="First 100 assets • No setup fees"
        // position: top-right corner of hero; adjust classes to move it
        className="absolute -top-6 right-4 md:-top-10 md:right-10"
        showOnMobile={false}
      />

      <h1 className="text-4xl font-bold">{industry?.name}</h1>
      <p className="mt-2 max-w-3xl text-gray-200">{industry?.description}</p>

      <div className="mt-6">
        <Link href="/industries" className="inline-block bg-white/10 text-white px-4 py-2 rounded">
          Back to industries
        </Link>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#282D33] text-white">
      <MediaBackground folder={`industries/${params.slug}`} height="h-[50vh]" padBottomClass="pb-12">
        {/* children go into MediaBackground's content area; badge will absolutely position inside */}
        {heroContent}
      </MediaBackground>

      {/* rest of page */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-700 mb-6">{industry.longDescription ?? industry.description ?? ""}</p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-2">Key benefits</h3>
            <p className="text-gray-600">{industry.benefits ?? "Improved uptime and safety."}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-2">Typical use-cases</h3>
            <p className="text-gray-600">{industry.useCases ?? "Asset tracking, maintenance, analytics."}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
