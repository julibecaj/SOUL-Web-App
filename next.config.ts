import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.undraw.co',
      },
      {
        protocol: 'https',
        hostname: 'undraw.co',
      },
    ],
  },
};

export default nextConfig;
