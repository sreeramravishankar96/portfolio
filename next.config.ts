import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
