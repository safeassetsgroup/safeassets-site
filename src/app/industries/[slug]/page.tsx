import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import industries from "../../content/industries.json";

type Industry = { slug: string; title: string; tagline?: string; poster: string };

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const data = industries as Industry[];
  const item = data.find((i) => i.slug === params.slug);
  if (!item) return notFound();

  return (
    <main className="min-h-screen bg-[#282D33] text-white">
      <header className="mx-auto max-w-6xl px-6 py-6 flex items-center gap-4">
        <Link href="/" className="text-[#B8BDC4] hover:text-white">← Back</Link>
        <div className="text-sm text-[#B8BDC4]">/ industries / {item.slug}</div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="relative w-full h-60 overflow-hidden rounded-xl ring-1 ring-white/10 mb-6">
          <Image src={item.poster} alt={item.title} fill className="object-cover" />
        </div>

        <h1 className="text-3xl font-semibold">{item.title}</h1>
        {item.tagline && <p className="text-[#B8BDC4] mt-2">{item.tagline}</p>}

        <div className="mt-6 text-slate-300 leading-relaxed">
          <p>
            Placeholder page for <strong>{item.title}</strong>. We’ll add service
            offerings, compliance, connectivity/telematics and a contact CTA as we build.
          </p>
        </div>
      </section>
    </main>
  );
}


