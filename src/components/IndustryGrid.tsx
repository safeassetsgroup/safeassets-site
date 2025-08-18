'use client';
import Image from "next/image";

type Item = {
  slug: string;
  title: string;
  tagline?: string;
  poster: string;
};

export default function IndustryGrid({ items }: { items: Item[] }) {
  return (
    <section className="bg-[#282D33] px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-2xl font-semibold mb-4">Industries</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <a
              key={it.slug}
              href={`/industries/${it.slug}`}
              className="group block bg-[#1E2328] rounded overflow-hidden ring-1 ring-white/10"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={it.poster}
                  alt={it.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2">
                <div className="text-white font-semibold">{it.title}</div>
                {it.tagline && <div className="text-sm text-[#B8BDC4]">{it.tagline}</div>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


