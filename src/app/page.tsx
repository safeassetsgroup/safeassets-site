"use client";

import Hero from "@/components/Hero";
import IndustryGrid from "@/components/IndustryGrid";
import SpecialOfferPromo from "@/components/SpecialOfferPromo";

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <IndustryGrid />
      <SpecialOfferPromo />
    </main>
  );
}
