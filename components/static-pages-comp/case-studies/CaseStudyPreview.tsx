import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import CaseStudyHero from "@/components/static-pages-comp/case-studies/CaseStudyHero";
import CaseStudyPageContent from "@/components/static-pages-comp/case-studies/CaseStudyPageContent";

export default function CaseStudyPreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="case-studies" mode="story" hero={<CaseStudyHero page={page} />} body={<CaseStudyPageContent page={page} />} />;
}
