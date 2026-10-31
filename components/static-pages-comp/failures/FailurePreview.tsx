import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import FailureHero from "@/components/static-pages-comp/failures/FailureHero";
import FailurePageContent from "@/components/static-pages-comp/failures/FailurePageContent";

export default function FailurePreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="failures" mode="risk" hero={<FailureHero page={page} />} body={<FailurePageContent page={page} />} />;
}
