import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import LegalHero from "@/components/static-pages-comp/legal/LegalHero";
import LegalPageContent from "@/components/static-pages-comp/legal/LegalPageContent";

export default function LegalPreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="legal" mode="document" hero={<LegalHero page={page} />} body={<LegalPageContent page={page} />} />;
}
