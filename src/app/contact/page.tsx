// src/app/page.tsx
import Hero from "../components/Hero";
import IndustryGrid from "../components/IndustryGrid";
import industries from "./content/industries.json";

export default function Home() {
  return (
    <main className="bg-[#282D33] text-white min-h-screen">
      <Hero
        heading="Advanced Asset Reliability for Heavy Industry"
        subheading="Private, connected and verifiable CMMS/ERP — designed for mining, construction, agriculture, transport, energy, defence & strata."
        ctaPrimaryHref="/contact"
        ctaPrimaryLabel="Talk to us"
        ctaSecondaryHref="#industries"
        ctaSecondaryLabel="Browse industries"
        videoSrc={null}                    // ← no video yet
        posterSrc="/hero/poster.jpg"       // ← using your mining image
      />

      <section id="industries" className="py-12">
        <IndustryGrid items={industries as any} />
      </section>
    </main>
  );
}

