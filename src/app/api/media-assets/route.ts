"use client";

import React from 'react';
import { Briefcase, Eye } from 'lucide-react';

// The main React component for the About page.
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-6xl w-full text-center mb-16">
        <div className="mx-auto inline-block p-4 rounded-full bg-white shadow-xl">
          <Briefcase className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-4">
          About Safe Assets Group
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          At Safe Assets Group, our mission is to deliver intelligent, technology-driven asset management solutions for safety-critical and high-utilization equipment across a range of heavy industries. We specialize in predictive maintenance and connected equipment strategies that enhance safety, reduce downtime, and extend asset life. Through data-led decision-making and a commitment to operational excellence, we help our clients run safer, more efficient, and more profitable operations—today and into the future.
        </p>
      </div>

      {/* Our Vision Section */}
      <div className="w-full max-w-6xl mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transition-shadow duration-300 hover:shadow-xl">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <Eye className="h-8 w-8 text-blue-600 mr-4" />
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To redefine equipment asset management through genuine partnerships, where we plan alongside our customers and suppliers, providing the best reliability strategies and connected solutions that build trust, improve performance, and deliver sustainable value.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Core Values Section */}
      <div className="w-full max-w-6xl space-y-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transition-shadow duration-300 hover:shadow-xl">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Our Core Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-1">Partnership First</h3>
                  <p className="leading-relaxed">
                    We believe in building long-term, collaborative relationships with our clients—becoming an extension of their team and supporting their success at every level.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-1">Operational Support</h3>
                  <p className="leading-relaxed">
                    We are hands-on and proactive, assisting with day-to-day planning, maintenance strategies, and decision-making to keep operations running smoothly and efficiently.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-1">Safety & Reliability</h3>
                  <p className="leading-relaxed">
                    We prioritize safety in every solution, ensuring that equipment is managed to reduce risk and support a safe working environment.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-1">Data-Driven Decisions</h3>
                  <p className="leading-relaxed">
                    We harness the power of technology, connectivity, and predictive analytics to drive smarter, more cost-effective asset strategies.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-1">Integrity & Accountability</h3>
                  <p className="leading-relaxed">
                    We take ownership of our role, standing by our advice, and delivering on our promises with transparency and professionalism.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-1">Continuous Improvement</h3>
                  <p className="leading-relaxed">
                    We are committed to evolving with industry needs, advancing our tools, and helping clients stay ahead in an ever-changing operational landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="w-full max-w-6xl mt-16 text-center">
        <div className="p-10 bg-slate-800 rounded-2xl shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-white text-lg max-w-3xl mx-auto mb-8">
            Contact us today to learn more about how our asset management solutions can benefit your business.
          </p>
          <a
            href="/contact"
            className="inline-block bg-orange-500 text-slate-900 font-bold text-lg px-8 py-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}