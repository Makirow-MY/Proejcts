import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  experimental: {
    instrumentationHook: true, // Keep if already in use
  },
};

export default nextConfig;
