// src/components/Footer.tsx
"use client";

import Link from "next/link";
import { INDUSTRIES } from "@/data/industries";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand + intro + contact */}
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white">
              SAFE<span className="text-orange-500">ASSETS</span> GROUP
            </h3>
            <p className="mt-4 text-slate-300">
              Private, connected and verifiable CMMS/ERP — designed for construction,
              agriculture, transport, energy, defence & strata industries.
            </p>

            <ul className="mt-6 space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                {/* location icon */}
                <svg className="h-5 w-5 text-orange-500 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5Z" />
                </svg>
                <span>Australia &amp; New Zealand</span>
              </li>
              <li className="flex items-start gap-3">
                {/* phone icon */}
                <svg className="h-5 w-5 text-orange-500 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l2-2a1 1 0 0 1 1-.24c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1C11.6 20 4 12.4 4 3a1 1 0 0 1 1-1h3.27a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.24 1l-2 2Z" />
                </svg>
                <span>+61 (0) 123 456 789</span>
              </li>
              <li className="flex items-start gap-3">
                {/* email icon */}
                <svg className="h-5 w-5 text-orange-500 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.4 3.25-7.2 5.1a1 1 0 0 1-1.2 0L4.4 7.25a.75.75 0 1 1 .85-1.23L12 10.8l6.75-4.78a.75.75 0 1 1 .85 1.23Z" />
                </svg>
                <a href="mailto:contact@safeassets.group" className="hover:text-white">
                  contact@safeassets.group
                </a>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white font-semibold text-xl">Industries</h4>
            <ul className="mt-4 space-y-3">
              {INDUSTRIES.map((i) => (
                <li key={i.slug}>
                  <Link className="hover:text-white" href={`/industries#${i.slug}`}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-xl">Company</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
          <p>© {year} SafeAssets Group. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-3 md:mt-0">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
