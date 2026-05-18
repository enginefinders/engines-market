import HomeEngineTypesSection from "@/components/sections/HomeEngineTypesSection";
import HomeHowItWorksSection from "@/components/sections/HomeHowItWorksSection";
import HomeLiveFeedSection from "@/components/sections/HomeLiveFeedSection";
import {
  homeEngineTypeCards,
  homeHowItWorksSteps,
  homeLiveFeedPinnedBrands,
  homeLiveFeedRows,
} from "@/lib/homepageData";

export default function Home() {
  return (
    <div id="top" className="bg-[#f7f9fc]">
      <HomeHowItWorksSection steps={homeHowItWorksSteps} />
      <HomeLiveFeedSection rows={homeLiveFeedRows} pinnedBrands={homeLiveFeedPinnedBrands} />
      <HomeEngineTypesSection cards={homeEngineTypeCards} />
    </div>
  );
}
