import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "creditexpertindia";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.11.31'],
};

export default nextConfig;
