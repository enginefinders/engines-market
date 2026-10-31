import type { StaticPageRecord } from "@/lib/staticPagePreview";
import RootPreview from "@/components/static-pages-comp/root/RootPreview";

export default function RootPage({ page }: { page: StaticPageRecord }) {
  return <RootPreview page={page} />;
}
