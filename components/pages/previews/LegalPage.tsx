import type { StaticPageRecord } from "@/lib/staticPagePreview";
import LegalPreview from "@/components/static-pages-comp/legal/LegalPreview";

export default function LegalPage({ page }: { page: StaticPageRecord }) {
  return <LegalPreview page={page} />;
}
