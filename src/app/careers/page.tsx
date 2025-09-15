// app/careers/page.tsx
import type { Metadata } from "next";
import React from "react";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | Safe Assets Group",
  description: "Find career opportunities at Safe Assets Group.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <div className="mx-auto inline-block p-4 rounded-full bg-white shadow-xl">
          <Briefcase className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-4">
          Careers
        </h1>
        <p className="text-lg text-gray-600">
          There are no vacancies at this time.
        </p>
        <p className="mt-4 text-md text-gray-500">
          Please check back later for future opportunities.
        </p>
      </div>
    </div>
  );
}
