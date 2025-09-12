"use client";

import Link from "next/link";

export default function IndustryGrid() {
  return (
    <div className="bg-gray-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Unlock the True Potential of Your Assets
        </h1>
        <p className="text-lg text-gray-600">
          Effective asset management is more than just maintenance; it's about unlocking efficiency, reducing costs, and driving growth. At SafeAssets Group, we provide a private, connected, and verifiable CMMS/ERP solution that empowers you to take full control of your heavy equipment and industrial assets.
        </p>
      </div>

      <div className="max-w-4xl text-center mt-8 p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          From Proactive Maintenance to Strategic Insights
        </h2>
        <p className="text-gray-600 mb-8">
          We specialize in **predictive maintenance**, leveraging the latest technologies in **telematics**, **IoT sensors**, and **equipment connectivity** to anticipate failures before they happen. This proactive approach reduces unplanned downtime, extends equipment life, and lowers total cost of ownership. Our services span the entire asset lifecycle—from equipment procurement and performance optimization to maintenance planning and strategic replacement budgeting. Explore our solutions to see how we can help your specific industry thrive.
        </p>
        <Link href="/industries" className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            Explore Our Industries
        </Link>
      </div>
    </div>
  );
}
