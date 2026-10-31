import type { StaticPageRecord } from "@/lib/staticPagePreview";
import ComparePreview from "@/components/static-pages-comp/compare/ComparePreview";

export default function ComparePage({ page }: { page: StaticPageRecord }) {
  return <ComparePreview page={page} />;
}
