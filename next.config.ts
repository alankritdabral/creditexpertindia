import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.11.31'],
};

export default nextConfig;
