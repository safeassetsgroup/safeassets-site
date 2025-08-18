"use client";

import Image from "next/image";
import MediaBackground from "./MediaBackground";
import IndustriesScroll from "./IndustriesScroll";

export default function Hero() {
  return (
    <MediaBackground folder="hero" height="h-[80vh]" padBottomClass="pb-28">
      <div className="text-left">
        <Image src="/brand/logo.png" alt="Logo" width={220} height={66} priority />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 mt-6">
          Advanced Asset Management for Industries
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl">
          Private, connected and verifiable CMMS/ERP — designed for mining, construction, agriculture, transport,
          energy, defence & strata.
        </p>

        <div className="flex flex-wrap gap-4">
          <a href="/contact" className="btn-primary text-white">Talk to us</a>
          <a href="/industries" className="px-6 py-3 rounded font-semibold border border-white text-white bg-transparent hover:bg-white hover:text-black transition">
            Browse industries
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <IndustriesScroll />
      </div>
    </MediaBackground>
  );
}
