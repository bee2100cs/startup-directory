import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from all sources
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'*',
      },
    ],
  },
  experimental: {
    ppr: "incremental",
  },
};

export default nextConfig;
