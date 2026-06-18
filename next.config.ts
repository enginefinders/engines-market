import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/about",
          destination: "/about/about-us.html",
        },
        {
          source: "/prices/:slug",
          destination: "/prices/:slug.html",
        },
        {
          source: "/about/:slug",
          destination: "/about/:slug.html",
        },
        {
          source: "/legal/:slug",
          destination: "/legal/:slug.html",
        },
        {
          source: "/reviews",
          destination: "/reviews.html",
        },
        {
          source: "/get-a-quote",
          destination: "/get-a-quote.html",
        },
        {
          source: "/failures/:slug",
          destination: "/failures/:slug.html",
        },
      ],
    };
  },
};

export default nextConfig;
