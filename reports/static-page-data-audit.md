# Static Page JSON Parity Audit

**Audit mode:** read-only
**Source policy:** existing static HTML was read but not modified
**JSON records audited:** 141
**Passed:** 141
**Failed:** 0

## Result

PASS — all JSON records match their source HTML for the audited fields.

## Family summary

| Family | Pages | Pages with differences |
|---|---:|---:|
| `about` | 6 | 0 |
| `case-studies` | 20 | 0 |
| `compare` | 13 | 0 |
| `failures` | 25 | 0 |
| `hub` | 10 | 0 |
| `insights` | 10 | 0 |
| `legal` | 5 | 0 |
| `prices` | 15 | 0 |
| `root` | 2 | 0 |
| `services` | 15 | 0 |
| `symptoms` | 20 | 0 |

## Checks performed

- Source SHA-256 hash
- Clean route and content-family mapping
- Title, description, canonical, robots and Open Graph metadata
- Heading sequence
- Tables and rows
- FAQs
- Forms and fields
- Internal links
- Images and alt text
- Content statistics
- Non-empty clean text content
- Absence of raw HTML/CSS fields and markup tags in JSON

## Interpretation

This audit validates the exported data only. It does not activate dynamic routes, change rewrites, edit static HTML, or verify visual parity of future React components.
