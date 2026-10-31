import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { AboutPageRecord } from "@/lib/staticPagePreview";
import AboutHero from "@/components/static-pages-comp/about/AboutHero";
import AboutPageContent from "@/components/static-pages-comp/about/AboutPageContent";

export default function AboutPreview({ page }: { page: AboutPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="about" mode="brand" hero={<AboutHero page={page} />} body={<AboutPageContent page={page} />} />;
}
