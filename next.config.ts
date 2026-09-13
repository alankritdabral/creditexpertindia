import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  serverExternalPackages: ["firebase-admin", "@google-cloud/firestore"],
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.11.31'],
};

export default nextConfig;
