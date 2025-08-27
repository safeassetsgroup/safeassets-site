"use client";

import { useParams } from "next/navigation";

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();

  // Remove mining-specific content; add generic placeholder
  const industryData: Record<string, { title: string; description: string }> = {
    agriculture: { title: "Agriculture", description: "Asset management for farming and agricultural operations." },
    construction: { title: "Construction", description: "Tools and systems for construction asset tracking." },
    transport: { title: "Transport", description: "Logistics and transport asset management solutions." },
    energy: { title: "Energy", description: "Energy sector asset monitoring and maintenance." },
    defence: { title: "Defence", description: "Defence industry asset management systems." },
    strata: { title: "Strata", description: "Strata property asset management." },
  };

  const data = industryData[slug] || { title: "Industry", description: "Details coming soon." };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="mt-4 text-gray-700">{data.description}</p>
    </div>
  );
}
