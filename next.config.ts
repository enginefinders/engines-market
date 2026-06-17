import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
   async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/prices/:slug",
          destination: "/prices/:slug.html",
        },
      ],
    };
  },
};

export default nextConfig;
