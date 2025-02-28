import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from all sources
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'*',
      }
    ]
  }
};

export default nextConfig;
