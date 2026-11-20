import type { NextConfig } from "next";

// Static export: the site builds to /out and can be hosted on Vercel,
// Netlify, Cloudflare Pages, Hostinger or any static web host.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
