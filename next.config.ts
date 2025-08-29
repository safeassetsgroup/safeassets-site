import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize external logos/icons used in IndustriesScroll, etc.
  images: {
    domains: [
      "logo.clearbit.com",
      "www.google.com",
      "lh3.googleusercontent.com",
      "t0.gstatic.com",
      "t1.gstatic.com",
      "t2.gstatic.com",
      "t3.gstatic.com",
      "t4.gstatic.com",
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Allow builds to complete even if ESLint finds problems (useful for Preview).
  // Remove this in Production once you’ve cleaned up lint errors.
  eslint: { ignoreDuringBuilds: true },

  // If you also want to ignore TS type errors during Preview builds, uncomment:
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
