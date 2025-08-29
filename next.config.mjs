/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "logo.clearbit.com",
      "www.google.com",
      "lh3.googleusercontent.com",
      "t0.gstatic.com",
      "t1.gstatic.com",
      "t2.gstatic.com",
      "t3.gstatic.com",
      "t4.gstatic.com"
    ],
    formats: ["image/avif", "image/webp"]
  }
};
export default nextConfig;
