import React from 'react';
import { notFound } from 'next/navigation';
import { INDUSTRIES } from '@/data/industries.tsx';
import Link from 'next/link';

// Defines the props for the dynamic page, which are passed by Next.js.
type Props = {
  params: {
    slug: string;
  };
};

// The main React component for the dynamic industry page.
export default function IndustryPage({ params }: Props) {
  // Access the slug directly from the params object.
  const industry = INDUSTRIES.find((ind) => ind.slug === params.slug);

  // If no matching industry is found, show a 404 Not Found page.
  if (!industry) {
    notFound();
  }

  // Render the page with the found industry's data.
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-6xl w-full text-center mb-16">
        <div className="mx-auto inline-block p-4 rounded-full bg-white shadow-xl">
          {industry.icon}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-4">
          {industry.label}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {industry.description}
        </p>
      </div>

      {/* Solutions Section with a clean, text-based layout */}
      <div className="w-full max-w-6xl space-y-12">
        {industry.solutions.map((solution, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {solution.heading}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {solution.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dynamic CTA Section at the bottom of each page */}
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