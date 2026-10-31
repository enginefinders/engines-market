# Static-to-Dynamic Preview Migration

## Goal

Keep every original static page in `/public` unchanged while making the preview pages dynamic at `/preview/[family]/[slug]`.

The dynamic preview must preserve:

- Metadata and structured data
- Original page text and section order
- Tables, lists, FAQs, cards, images, forms, and quotes
- Internal, external, email, telephone, and WhatsApp links
- Existing CTA destinations and form behavior
- Existing family visual themes

## Safest implementation

The existing family JSON buckets are retained as the source input, but the preview data layer creates an ordered view of every source section. The renderer consumes the ordered view instead of assuming that a family has one fixed section sequence.

The flow is:

```text
/public static HTML
        ↓ existing metadata/data resolution
data/static-pages/**/*.json
        ↓ source-faithful dynamic renderer
/preview/[family]/[...slug]
        ↓ existing site shell + original page markup/CSS/behavior
dynamic preview with static-page UI parity
```

The original HTML and current source JSON remain unchanged. The generated dynamic directory is disposable and can be rebuilt whenever source data changes.

## Data strategy

The generated records retain the existing metadata, hero, structured data, and supplemental values. They additionally expose:

```json
{
  "schemaVersion": 3,
  "sections": {
    "hero": {},
    "ordered": [
      {
        "id": "original-section-id",
        "title": "Original section title",
        "description": null,
        "blocks": [],
        "links": [],
        "source": {
          "sectionId": "original-section-id",
          "order": 0
        }
      }
    ],
    "supplemental": {}
  }
}
```

The `ordered` array is the canonical render order. Existing family bucket names are not used to determine display order.

## Rendering strategy

The preview route now uses the matching original HTML as the canonical presentation layer. The source renderer keeps the original body markup, loads local and external page styles, scopes those styles to the preview content root, and replays page scripts on the client. The existing Next Navbar and Footer remain outside the source content.

The generated ordered data layer remains available for structured migration work and fallback rendering, but it is no longer responsible for recreating the source page's visual markup.

Future content types should be added as reusable block renderers or explicit layout variants, not as one component per page. Examples include timeline cards, comparison tables, summary grids, and contact grids.

## Rebuild command

```powershell
python scripts/build_dynamic_static_pages.py
```

The command only reads `/public` and `data/static-pages`, then writes the generated dynamic data directory. It never edits static HTML.

## Validation requirements

Before a production route is changed, validate:

1. Metadata and canonical URL.
2. Heading and section order.
3. Text, tables, lists, images, forms, FAQs, and cards.
4. Exact link destinations, including `mailto:`, `tel:`, and WhatsApp links.
5. CTA and form interactions.
6. Desktop, tablet, and mobile layout.
7. No duplicate H1, form, table, or CTA content.

Production static rewrites remain active until the preview passes these checks for every family.

