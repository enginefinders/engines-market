import type { StaticPageRecord } from "@/lib/staticPagePreview";
import FailurePreview from "@/components/static-pages-comp/failures/FailurePreview";

export default function FailurePage({ page }: { page: StaticPageRecord }) {
  return <FailurePreview page={page} />;
}
