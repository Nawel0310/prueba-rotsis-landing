import type { NextConfig } from "next";

const basePath = "/prueba-rotsis-landing";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
