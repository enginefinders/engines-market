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
          source: "/compare/:slug",
          destination: "/compare/:slug.html",
        },
        {
          source: "/insights/:slug",
          destination: "/insights/:slug.html",
        },
        {
          source: "/services/:slug",
          destination: "/services/:slug.html",
        },
        {
          source: "/prices/:slug",
          destination: "/prices/:slug.html",
        },
        {
          source: "/services/gearbox-replacement/:slug",
          destination: "/services/gearbox-replacement/:slug.html",
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
        {
          source: "/case-studies/nissan-navara-engine-failure",
          destination: "/case-studies/nissan-navara-d40-case-study.html",
        },
        {
          source: "/case-studies/:slug",
          destination: "/case-studies/:slug.html",
        },
        {
          source: "/symptoms/:slug",
          destination: "/symptoms/:slug.html",
        },
      ],
    };
  },
};

export default nextConfig;
