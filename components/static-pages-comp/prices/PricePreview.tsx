import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import PriceHero from "@/components/static-pages-comp/prices/PriceHero";
import PricePageContent from "@/components/static-pages-comp/prices/PricePageContent";

export default function PricePreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="prices" mode="price" hero={<PriceHero page={page} />} body={<PricePageContent page={page} />} />;
}
