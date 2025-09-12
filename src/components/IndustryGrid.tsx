import { INDUSTRIES } from "@/data/industries";
import Link from "next/link";

export default function IndustryGrid() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-600">
            Our Expertise
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by leaders in every major industry
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From construction and agriculture to transport and defence, our
            asset management solutions are built to handle the demands of heavy
            industry. We provide the reliability and intelligence you need to
            keep your operations running smoothly.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {INDUSTRIES.map((industry) => (
              <div key={industry.label} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600">
                    {industry.icon}
                  </div>
                  {industry.label}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {industry.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
