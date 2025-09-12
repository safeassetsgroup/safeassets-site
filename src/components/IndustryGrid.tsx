"use client";

import { ChevronRight, Factory, Tractor, Wrench, Truck, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { Industry, INDUSTRIES } from "@/data/industries";
import Image from "next/image";
import Link from "next/link";

// Define a specific type for the props instead of using 'any'
type IndustryCardProps = {
  industry: Industry;
  idx: number;
};

function IndustryCard({ industry, idx }: IndustryCardProps) {
  const [imgSrc, setImgSrc] = useState(`/industries/sm/${industry.slug}.jpg`);

  return (
    <Link
      key={idx}
      href={industry.link}
      className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border-t-4 border-b-4 border-transparent hover:border-blue-500"
    >
      <div className="mb-4">
        <Image
          src={imgSrc}
          alt={industry.label}
          width={100}
          height={100}
          className="w-24 h-24 object-contain mx-auto"
          onError={() => setImgSrc('/industries/sm/default.jpg')}
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {industry.label}
      </h2>
      <p className="text-gray-600 mb-6 flex-grow">
        {industry.description}
      </p>
      <div
        className="mt-auto inline-flex items-center text-blue-600 font-semibold transition-colors duration-200 group-hover:text-blue-800"
      >
        Learn More
        <ChevronRight className="ml-1 w-4 h-4" />
      </div>
    </Link>
  );
}

// The main React component for the Industries page.
export default function IndustryGrid() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Expert Asset Management Across Key Industries
        </h1>
        <p className="text-lg text-gray-600">
          At Safe Assets Group, we deliver expert asset management solutions for
          heavy equipment across a range of heavy industries. Our mission is to help you get the most out of
          your assets—safely, efficiently, and cost-effectively.
        </p>
      </div>

      {/* Grid of Industry Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {INDUSTRIES.map((industry, index) => (
          <IndustryCard key={index} industry={industry} idx={index} />
        ))}
      </div>

      {/* Additional Text Section */}
      <div className="max-w-4xl text-center mt-16 p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Technology and Strategy That Drive Results
        </h2>
        <p className="text-gray-600">
          We specialize in **predictive maintenance**, leveraging the latest technologies in **telematics**, **IoT sensors**, and **equipment connectivity** to anticipate failures before they happen. This proactive approach reduces unplanned downtime, extends equipment life, and lowers total cost of ownership. Our services span the entire asset lifecycle—from equipment procurement and performance optimization to maintenance planning, inventory control, and strategic replacement budgeting. We align our practices with industry standards and regulatory compliance to ensure your operation runs reliably and sustainably.
        </p>
      </div>
    </div>
  );
}
