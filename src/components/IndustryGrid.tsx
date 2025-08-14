// src/components/IndustryGrid.tsx
import Image from "next/image";

type Item = {
  slug: string;
  title: string;
  tagline?: string;
  poster: string;
};

export default function IndustryGrid({ items }: { items: Item[] }) {
  return (
    <section className="bg-[#282D33]">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-xl font-semibold text-white mb-3">Industries</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <a
              key={it.slug}
              href={`/industries/${it.slug}`}
              className="group relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-[#1E2328]"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={it.poster}
                  alt={it.title}
                  fill
                  sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.03] group-hover:opacity-80"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-white font-semibold">{it.title}</div>
                {it.tagline && (
                  <div className="text-sm text-[#B8BDC4]">{it.tagline}</div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
