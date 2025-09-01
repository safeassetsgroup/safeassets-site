// app/pricing/page.tsx
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pricing | Safe Assets Group",
  description: "Simple weekly service plans with professional monitoring and support.",
};

function Price({
  amount,
  unit = "/week",
}: {
  amount: string;
  unit?: string;
}) {
  return (
    <div className="flex items-end justify-center gap-2">
      <span className="text-2xl font-semibold tracking-tight text-slate-800">
        AU$
      </span>
      <span className="text-6xl font-extrabold leading-none tracking-tight text-slate-900">
        {amount}
      </span>
      <span className="pb-2 text-sm text-slate-600">{unit}</span>
    </div>
  );
}

function Tick({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-slate-700">
      <svg
        className="mt-0.5 h-5 w-5 flex-none text-emerald-600"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </div>
  );
}

export default function Page() {
  return (
    <main className="bg-slate-50 pt-16 sm:pt-20">
      {/* Match your TopNav container: max-w-7xl px-4 */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        {/* Title */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Simple, professional service plans
          </h1>
          <p className="mt-3 text-slate-600">
            Choose a plan that fits. Upgrade any time.
          </p>
        </div>

        {/* Cards Row (two boxes) */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Essential — highlighted */}
          <div className="relative rounded-2xl border border-emerald-300 bg-white shadow-lg ring-1 ring-emerald-300 [box-shadow:0_10px_30px_rgba(16,185,129,0.18)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
              BEST VALUE
            </div>
            <div className="p-8">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600">
                  Essential (Most Popular)
                </p>
                <div className="mt-2">
                  <Price amount="33" />
                </div>

                <div className="mt-6">
                  <button className="w-full rounded-xl bg-emerald-600 px-5 py-4 text-base font-semibold text-white hover:bg-emerald-700">
                    Get This Plan
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Prices in AUD; GST excluded.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6 space-y-3">
                <Tick>Service planning</Tick>
                <Tick>Telemetry monitoring (Mon–Fri 9am–5pm)</Tick>
                <Tick>Oil sample monitoring &amp; trending</Tick>
                <Tick>Email alerts</Tick>
              </div>
            </div>
          </div>

          {/* Professional — neutral */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="p-8">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600">Professional</p>
                <div className="mt-2">
                  <Price amount="55" />
                </div>

                <div className="mt-6">
                  <button className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base font-semibold text-slate-800 shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.05)] hover:bg-slate-50">
                    Select Plan
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Prices in AUD; GST excluded.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6 space-y-3">
                <Tick>Service planning</Tick>
                <Tick>Telemetry monitoring (Mon–Fri 9am–5pm)</Tick>
                <Tick>Oil sample monitoring &amp; trending</Tick>
                <Tick>Service kit development</Tick>
                <Tick>Component forecasting</Tick>
                <Tick>Email alerts and phone calls</Tick>
                <Tick>Service support – planning</Tick>
                <Tick>Parts support – planning</Tick>
              </div>
            </div>
          </div>
        </div>

        {/* Reassurance row */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 text-slate-700 sm:grid-cols-3">
          <Tick>Australian-based support</Tick>
          <Tick>Mon–Fri monitoring 9am–5pm</Tick>
          <Tick>Fast, secure &amp; dependable</Tick>
        </div>
      </section>
    </main>
  );
}
