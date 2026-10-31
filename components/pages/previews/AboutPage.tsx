import type { AboutPageRecord } from "@/lib/staticPagePreview";
import AboutPreview from "@/components/static-pages-comp/about/AboutPreview";

export default function AboutPage({ page }: { page: AboutPageRecord }) {
  return <AboutPreview page={page} />;
}
