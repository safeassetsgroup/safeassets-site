"use client";

import { INDUSTRIES } from "@/data/industries";

export const metadata = {
  title: "Industries | SafeAssets",
  description: "Industries we serve",
};

export default function IndustriesPage() {
  return (
    <section className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        <h1 className="text-3xl font-bold">Industries</h1>

        {INDUSTRIES.map((i) => (
          <div key={i.slug} id={i.slug} className="scroll-mt-24">
            <h2 className="text-2xl font-semibold">{i.label}</h2>
            {/* ...existing content for {i.label}... */}
          </div>
        ))}
      </div>
    </section>
  );
}