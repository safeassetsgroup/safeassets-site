// @ts-nocheck
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/data/industries.tsx";
import Link from "next/link";
import ExternalLogo from "@/components/ExternalLogo";

type Props = { params: { slug: string } };

function MediaPlaceholder({
  icon,
  title,
  website,
  aspectClass = "aspect-[4/3]",
}: {
  icon?: React.ReactNode;
  title?: string;
  website?: string;
  aspectClass?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-gray-200 ${aspectClass}`}>
      {/* gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300" />
      {/* dot pattern */}
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* center content */}
      <div className="relative z-10 h-full w-full grid place-items-center text-gray-600">
        <div className="flex flex-col items-center gap-3 px-4 text-center">
          {/* industry icon */}
          <div className="opacity-80">{icon ?? <span className="text-2xl">🖼️</span>}</div>
          {/* pulled logo from website (if provided) */}
          {website && (
            <ExternalLogo
              websiteOrDomain={website}
              size={56}
              alt={`${title ?? "logo"}`}
              className="rounded-md ring-1 ring-gray-200 bg-white/80 p-1"
            />
          )}
          <span className="text-xs text-gray-700/80">
            {title ? `Add image for “${title}”` : "Add image"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function IndustryPage({ params }: Props) {
  const industry = INDUSTRIES.find((ind) => ind.slug === params.slug);
  if (!industry) notFound();

  const heroImg: string | undefined =
    (industry as any).heroImage ?? (industry.slug ? `/industries/${industry.slug}/hero.jpg` : undefined);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="max-w-6xl w-full text-center mb-12">
        <div className="mx-auto inline-block p-4 rounded-full bg-white shadow-xl">{industry.icon}</div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-4">{industry.label}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{industry.description}</p>

        {/* Hero media (image if present, else placeholder with pulled logo) */}
        <div className="mt-8 relative mx-auto w-full max-w-5xl">
          <div className="relative">
            {heroImg ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-gray-200 shadow">
                <Image src={heroImg} alt={`${industry.label} hero`} fill className="object-cover" priority />
              </div>
            ) : (
              <MediaPlaceholder
                icon={industry.icon}
                title={`${industry.label} hero`}
                website={(industry as any).website}
                aspectClass="aspect-[16/9]"
              />
            )}
          </div>
        </div>
      </div>

      {/* Solutions */}
      <div className="w-full max-w-6xl space-y-12">
        {industry.solutions.map((solution: any, index: number) => {
          const img: string | undefined = solution.image;
          const alt = solution.imageAlt ?? `${industry.label} – ${solution.heading}`;
          return (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{solution.heading}</h2>
                  <p className="text-gray-700 leading-relaxed">{solution.text}</p>
                </div>

                <div className="md:col-span-2">
                  <div className="relative">
                    {img ? (
                      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={img}
                            alt={alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                        </div>
                      </div>
                    ) : (
                      <MediaPlaceholder
                        icon={industry.icon}
                        title={solution.heading}
                        website={(industry as any).website}
                        aspectClass="aspect-[4/3]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="w-full max-w-6xl mt-16 p-8 text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to Elevate Your {industry.label} Operations?
        </h2>
        <p className="text-white text-lg max-w-3xl mx-auto mb-8">
          Contact our team today to discover how our tailored solutions can help you achieve your goals.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-800 font-bold text-lg px-8 py-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}

/* Optional SSG helper (kept identical to your behavior, harmless for build) */
export function generateStaticParams() {
  return INDUSTRIES.map((i: any) => ({ slug: i.slug }));
}
