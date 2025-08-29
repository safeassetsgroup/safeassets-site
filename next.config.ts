// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Either 'domains' or 'remotePatterns' works; we'll include both for safety.
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
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "t0.gstatic.com" },
      { protocol: "https", hostname: "t1.gstatic.com" },
      { protocol: "https", hostname: "t2.gstatic.com" },
      { protocol: "https", hostname: "t3.gstatic.com" },
      { protocol: "https", hostname: "t4.gstatic.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
