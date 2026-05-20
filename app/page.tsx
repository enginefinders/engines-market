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
  homeLiveFeedPinnedBrands,
  homeLiveFeedRows,
} from "@/lib/homepageData";

export default function Home() {
  return (
    <>
      <div id="top" className="bg-white">
        <HomeHeroSection data={homeHeroData} />
        <HomeHowItWorksSection steps={homeHowItWorksSteps} />
        <HomeLiveFeedSection rows={homeLiveFeedRows} pinnedBrands={homeLiveFeedPinnedBrands} />
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
