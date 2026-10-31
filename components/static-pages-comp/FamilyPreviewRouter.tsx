import type { StaticPageRecord } from "@/lib/staticPagePreview";
import SourceStaticPage from "@/components/static-pages-comp/SourceStaticPage";

export default function FamilyPreviewRouter({ page }: { page: StaticPageRecord }) {
  return <SourceStaticPage page={page} />;
}
