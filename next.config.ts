import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images1.vinted.net',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
