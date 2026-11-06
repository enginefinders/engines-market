import type { StaticPageRecord } from "@/lib/staticPagePreview";
import PricePreview from "@/components/static-pages-comp/prices/PricePreview";

export default function PricePage({ page }: { page: StaticPageRecord }) {
  return <PricePreview page={page} />;
}
