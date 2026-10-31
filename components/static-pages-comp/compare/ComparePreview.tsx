import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import CompareHero from "@/components/static-pages-comp/compare/CompareHero";
import ComparePageContent from "@/components/static-pages-comp/compare/ComparePageContent";

export default function ComparePreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="compare" mode="comparison" hero={<CompareHero page={page} />} body={<ComparePageContent page={page} />} />;
}
