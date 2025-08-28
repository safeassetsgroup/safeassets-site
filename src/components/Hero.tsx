"use client";

import Image from "next/image";
import Link from "next/link";
import MediaBackground from "./MediaBackground";
import IndustriesScroll from "./IndustriesScroll";
import SpecialOfferPromo from "./SpecialOfferPromo";

export default function Hero() {
  return (
    <MediaBackground folder="hero" height="h-[80vh]" padBottomClass="pb-28">
      <div className="text-left">
        <Image src="/brand/logo.png" alt="Logo" width={220} height={66} priority />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 mt-6">
          Advanced Asset Management for{" "}
          <span className="text-blue-600">Industries</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl">
          Private, connected and verifiable CMMS/ERP — designed for construction, agriculture,
          transport, energy, defence & strata.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Talk to us
          </Link>
          <Link
            href="/industries"
            className="inline-flex items-center px-6 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold bg-white transition-colors hover:bg-blue-50"
          >
            Browse industries
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <IndustriesScroll />
      </div>

      {/* Special offer badge on the right over the hero */}
      <SpecialOfferPromo />
    </MediaBackground>
  );
}
