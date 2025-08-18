// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#282D33] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <div className="inline-flex items-center justify-center rounded-full border border-white/10 px-3 py-1 text-xs text-[#B8BDC4] mb-4">
          404 · Page not found
        </div>

        <h1 className="text-3xl font-semibold">We couldn’t find that page</h1>
        <p className="mt-2 text-[#B8BDC4]">
          The link may be broken or the page may have moved. Try one of these:
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-[#F59E0B] px-4 py-2 font-medium text-black hover:opacity-90 transition"
          >
            Go to Home
          </Link>
          <a
            href="/#industries"
            className="inline-flex items-center justify-center rounded-md border border-white/10 px-4 py-2 text-white hover:bg-white/5 transition"
          >
            Browse Industries
          </a>
        </div>

        <div className="mt-8 text-sm text-[#8A9097]">
          If you typed the address, double-check the spelling.
        </div>
      </div>
    </main>
  );
}
