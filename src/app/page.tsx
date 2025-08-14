import Image from "next/image";
import IndustryGrid from "@/components/IndustryGrid";
import industries from "./content/industries.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#282D33] text-white">
      {/* HERO */}
      <section className="flex items-center justify-center">
        <div className="px-6 py-16 text-center">
          <div className="mx-auto w-full flex justify-center mb-8">
            <Image
              src="/brand/SafeAssetsGroup-Logo-original.png"
              alt="Safe Assets Group"
              width={360}
              height={120}
              priority
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Advanced Asset Reliability for Heavy Industry
          </h1>
          <p className="mt-3 text-slate-300">Private, Connected, Verifiable.</p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <div className="pb-16">
        <IndustryGrid items={industries as any} />
      </div>
    </main>
  );
}



