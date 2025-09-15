import { INDUSTRIES } from "@/data/industries";
import Link from "next/link";

export default function IndustryGrid() {
  return (
    <div className="bg-slate-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-500">
            Our Expertise
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Partnering with businesses of every size to improve reliability and performance.
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
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
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:border-orange-400/50 hover:bg-orange-50 hover:shadow-orange-400/20"
            >
              <div className="flex items-center gap-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-orange-500 group-hover:ring-orange-500">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold leading-7 text-slate-900">
                  {industry.label}
                </h3>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {industry.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
