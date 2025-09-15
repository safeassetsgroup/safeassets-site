import { INDUSTRIES } from "@/data/industries";
import Link from "next/link";

export default function IndustryGrid() {
  return (
    <div className="bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-400">
            Our Expertise
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Partnering with businesses of every size to improve reliability and performance.
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            From construction and agriculture to transport and defence, our
            asset management solutions are built to handle the demands of heavy
            industry. We provide the reliability and intelligence you need to
            keep your operations running smoothly.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.label}
              href={`/industries/${industry.slug}`}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg transition-all duration-300 hover:border-orange-400/50 hover:bg-white/10 hover:shadow-orange-400/10"
            >
              <div className="flex items-center gap-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800/80 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-orange-500/90 group-hover:ring-orange-400">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold leading-7 text-white">
                  {industry.label}
                </h3>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-300">
                {industry.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
