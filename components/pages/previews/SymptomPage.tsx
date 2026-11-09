import type { StaticPageRecord } from "@/lib/staticPagePreview";
import SymptomPreview from "@/components/static-pages-comp/symptoms/SymptomPreview";

export default function SymptomPage({ page }: { page: StaticPageRecord }) {
  return <SymptomPreview page={page} />;
}
