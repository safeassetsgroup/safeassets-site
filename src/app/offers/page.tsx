// app/page.tsx
import SpecialOfferPromo from "../components/specialofferpromo"; // use this relative path
// If you have a path alias set up (tsconfig baseUrl/paths), you can instead:
// import SpecialOfferPromo from "@/components/specialofferpromo";

export default function HomePage() {
  return (
    <main className="min-h-[120vh] bg-gray-50">
      {/* Simple hero/header area */}
      <section className="bg-gradient-to-b from-blue-700 to-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Welcome to Safe Assets Group
          </h1>
          <p className="mt-4 max-w-2xl text-blue-100">
            Modern asset management, support and telemetry—tailored to your operations.
          </p>
        </div>
      </section>

      {/* Sample content so you can scroll and see the promo hover */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="prose max-w-3xl">
          <h2>What we do</h2>
          <p>
            We help organisations streamline maintenance, track performance, and stay compliant
            using a modern CMMS approach built for real-world operations.
          </p>
          <p>
            Explore our solutions, read case studies, and get in touch to see how we can help your team.
          </p>
        </div>
      </section>

      {/* Floating promo */}
      <SpecialOfferPromo />
    </main>
  );
}
