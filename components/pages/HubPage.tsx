import { getHubPageContent, getHubPageMetadata } from "@/lib/hubPageContent";

type HubPageProps = {
  slug: string;
};

export { getHubPageMetadata };

export default function HubPage({ slug }: HubPageProps) {
  const page = getHubPageContent(slug);
  const baseIsolationCss = `
    .em-hub-page,
    .em-hub-page * {
      box-sizing: border-box;
    }

    .em-hub-page h1,
    .em-hub-page h2,
    .em-hub-page h3,
    .em-hub-page h4,
    .em-hub-page h5,
    .em-hub-page h6 {
      margin: 0;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      letter-spacing: inherit;
      line-height: inherit;
    }

    .em-hub-page p,
    .em-hub-page li,
    .em-hub-page a,
    .em-hub-page button,
    .em-hub-page input,
    .em-hub-page select,
    .em-hub-page textarea,
    .em-hub-page label,
    .em-hub-page small,
    .em-hub-page strong,
    .em-hub-page span {
      font-family: inherit;
      letter-spacing: inherit;
    }

    .em-hub-page a {
      color: inherit;
    }
  `;
  const revealFallbackCss = `
    .em-hub-page [class*="card"] {
      opacity: 1 !important;
      transform: none !important;
    }
  `;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <style dangerouslySetInnerHTML={{ __html: baseIsolationCss }} />
      <style dangerouslySetInnerHTML={{ __html: page.css }} />
      <style dangerouslySetInnerHTML={{ __html: revealFallbackCss }} />
      <div className="em-hub-page" dangerouslySetInnerHTML={{ __html: page.mainHtml }} />
    </>
  );
}
