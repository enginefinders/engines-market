import type { StaticPageRecord } from "@/lib/staticPagePreview";
import CaseStudyPreview from "@/components/static-pages-comp/case-studies/CaseStudyPreview";

export default function CaseStudiesPage({ page }: { page: StaticPageRecord }) {
  return <CaseStudyPreview page={page} />;
}
