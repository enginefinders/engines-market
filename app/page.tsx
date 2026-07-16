import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";
import HomeBrandGridSection from "@/components/sections/HomeBrandGridSection";
import HomeDecisionHubSection from "@/components/sections/HomeDecisionHubSection";
import HomeEngineTypesSection from "@/components/sections/HomeEngineTypesSection";
import HomeFaqHubSection from "@/components/sections/HomeFaqHubSection";
import HomeHeroSection from "@/components/sections/HomeHeroSection";
import HomeHowItWorksSection from "@/components/sections/HomeHowItWorksSection";
import HomeLiveFeedSection from "@/components/sections/HomeLiveFeedSection";
import HomeWhyUseUsSection from "@/components/sections/HomeWhyUseUsSection";
import {
  homeBrandPriceDirectory,
  homeFeaturedBrandSlugs,
} from "@/lib/homeBrandGridData";
import {
  homeEngineTypeCards,
  homeHeroData,
  homeHowItWorksSteps,
  homeLiveFeedRows,
} from "@/lib/homepageData";
import { buildHomeStructuredData } from "@/lib/structuredData";

const HOME_TITLE = "Engine Replacement Cost UK - Compare 100+ Vetted Suppliers";
const HOME_DESCRIPTION =
  "Compare engine replacement prices from 100+ vetted UK suppliers. Reconditioned, rebuilt & used engines with 12-24 month warranty. Supply & fit available UK-wide. Get free quotes.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "https://enginesmarket.co.uk/",
  },
  openGraph: {
    title: "Engine Replacement Cost UK - Compare 100+ Vetted Suppliers",
    description:
      "Compare engine replacement prices from 100+ vetted UK suppliers. Reconditioned, rebuilt & used engines with 12-24 month warranty. Supply & fit available UK-wide.",
    url: "https://www.enginesmarket.co.uk/",
    type: "website",
    siteName: "Engines Market",
    images: [
      {
        url: "https://www.enginesmarket.co.uk/images/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description:
      "Compare engine replacement prices from 200+ vetted UK suppliers. Reconditioned, rebuilt & used engines with 12-24 month warranty. Supply & fit available UK-wide.",
    images: ["https://www.enginesmarket.co.uk/images/og-image.png"],
  },
};

export default function Home() {
  const structuredData = buildHomeStructuredData(homeEngineTypeCards);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div id="top" className="bg-white">
        <HomeHeroSection data={homeHeroData} />
        <HomeHowItWorksSection steps={homeHowItWorksSteps} />
        <HomeLiveFeedSection rows={homeLiveFeedRows} />
        <HomeEngineTypesSection cards={homeEngineTypeCards} />
        <HomeBrandGridSection brands={homeBrandPriceDirectory} featuredSlugs={homeFeaturedBrandSlugs} />
        <HomeDecisionHubSection />
        <HomeWhyUseUsSection />
        <HomeFaqHubSection />
      </div>

      <Suspense fallback={null}>
        <QuoteCheckoutModal brandName="replacement" />
      </Suspense>
    </>
  );
}
