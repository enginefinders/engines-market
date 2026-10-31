import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import SymptomHero from "@/components/static-pages-comp/symptoms/SymptomHero";
import SymptomPageContent from "@/components/static-pages-comp/symptoms/SymptomPageContent";

export default function SymptomPreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="symptoms" mode="diagnostic" hero={<SymptomHero page={page} />} body={<SymptomPageContent page={page} />} />;
}
