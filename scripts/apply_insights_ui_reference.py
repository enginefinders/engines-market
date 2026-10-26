#!/usr/bin/env python3
"""Apply the most-common-engine-failures UI reference to insight pages.

The script is dry-run by default. In apply mode it only adds the two shared
reference stylesheets and presentation-only title-green spans to plain h2
headings. It never rewrites page content, data, links, forms, scripts,
structured data, tables, FAQs, or other functionality. A visible-text and
structural fingerprint must remain identical before any page is written.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import re
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = PROJECT_ROOT / "public"
INSIGHTS_ROOT = PUBLIC_ROOT / "insights"
REFERENCE = INSIGHTS_ROOT / "most-common-engine-failures-uk.html"
STYLESHEETS = (
    "/services/engine-inspection.css?v=2",
    "/insights/most-common-engine-failures-uk.css?v=1",
)

TAG_NAMES = (
    "h1", "h2", "h3", "p", "ul", "ol", "table", "form", "details", "script", "img",
)
CLASS_ATTR_RE = re.compile(r"\bclass\s*=\s*([\"'])(.*?)\1", re.IGNORECASE | re.DOTALL)
STYLESHEET_RE = re.compile(
    r"<link\b[^>]*rel\s*=\s*([\"'])stylesheet\1[^>]*>",
    re.IGNORECASE,
)
HREF_RE = re.compile(r"\bhref\s*=\s*([\"'])(.*?)\1", re.IGNORECASE | re.DOTALL)
H2_RE = re.compile(r"(<h2\b[^>]*>)([\s\S]*?)(</h2\s*>)", re.IGNORECASE)


def relative_name(path: Path) -> str:
    return path.relative_to(PROJECT_ROOT).as_posix()


def read_exact(path: Path) -> str:
    with path.open("r", encoding="utf-8", newline="") as handle:
        return handle.read()


def write_exact(path: Path, source: str) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        handle.write(source)


def visible_text(source: str) -> str:
    body_match = re.search(r"<body\b[^>]*>([\s\S]*?)</body>", source, re.IGNORECASE)
    body = body_match.group(1) if body_match else source
    body = re.sub(r"<script\b[^>]*>[\s\S]*?</script\s*>", " ", body, flags=re.IGNORECASE)
    body = re.sub(r"<style\b[^>]*>[\s\S]*?</style\s*>", " ", body, flags=re.IGNORECASE)
    body = re.sub(r"<[^>]+>", " ", body)
    return re.sub(r"\s+", " ", html.unescape(body)).strip()


def fingerprint(source: str) -> tuple[str, tuple[tuple[str, int], ...]]:
    digest = hashlib.sha256(visible_text(source).encode("utf-8")).hexdigest()
    counts = tuple(
        (tag, len(re.findall(rf"<{tag}\b", source, flags=re.IGNORECASE)))
        for tag in TAG_NAMES
    )
    return digest, counts


def classes_in(source: str) -> set[str]:
    classes: set[str] = set()
    for match in CLASS_ATTR_RE.finditer(source):
        classes.update(match.group(2).split())
    return classes


def stylesheets_in(source: str) -> set[str]:
    hrefs: set[str] = set()
    for match in STYLESHEET_RE.finditer(source):
        href = HREF_RE.search(match.group(0))
        if href:
            hrefs.add(href.group(2).strip())
    return hrefs


def highlight_heading_ends(source: str) -> str:
    """Add green ending spans without changing the rendered heading text."""

    def replace(match: re.Match[str]) -> str:
        opening, inner, closing = match.groups()
        if "title-green" in inner or "<" in inner:
            return match.group(0)
        words = list(re.finditer(r"\S+", inner))
        if len(words) < 2:
            return match.group(0)
        tail_count = 2 if len(words) >= 4 else 1
        start = words[-tail_count].start()
        return f'{opening}{inner[:start]}<span class="title-green">{inner[start:]}</span>{closing}'

    return H2_RE.sub(replace, source)


def heading_report(source: str) -> tuple[int, int, int]:
    total = 0
    highlighted = 0
    eligible = 0
    for match in H2_RE.finditer(source):
        total += 1
        inner = match.group(2)
        if "title-green" in inner:
            highlighted += 1
        elif "<" not in inner:
            eligible += 1
    return highlighted, total, eligible


def inject_stylesheets(source: str) -> str:
    current = stylesheets_in(source)
    missing = [href for href in STYLESHEETS if href not in current]
    if not missing:
        return source

    newline = "\r\n" if "\r\n" in source else "\n"
    links = newline.join(
        f'    <link rel="stylesheet" href="{href}" data-insights-reference-ui="true">'
        for href in missing
    )
    body_close = re.search(r"</body\s*>", source, flags=re.IGNORECASE)
    if body_close:
        return source[: body_close.start()] + links + newline + source[body_close.start() :]
    html_close = re.search(r"</html\s*>", source, flags=re.IGNORECASE)
    if html_close:
        return source[: html_close.start()] + links + newline + source[html_close.start() :]
    return source.rstrip() + newline + links + newline


def structural_hooks(source: str) -> tuple[list[str], list[str]]:
    classes = classes_in(source)
    expected = ("hero", "hero-inner", "hero-h1", "hero-tagline", "hero-actions", "cta-wrapper", "section-inner")
    present = [hook for hook in expected if hook in classes]
    missing = [hook for hook in expected if hook not in classes]
    if "sec-h2" in classes or "sec-title" in classes:
        present.append("section-heading")
    else:
        missing.append("section-heading")
    return present, missing


def page_status(source: str, is_reference: bool) -> str:
    if is_reference:
        return "REFERENCE"
    links_ready = all(href in stylesheets_in(source) for href in STYLESHEETS)
    highlighted, _total, eligible = heading_report(source)
    headings_ready = highlighted >= eligible
    return "ALREADY THEMED" if links_ready and headings_ready else "WOULD UPDATE"


def run(apply: bool) -> int:
    if not REFERENCE.is_file():
        print(f"ERROR missing reference: {relative_name(REFERENCE)}")
        return 2
    for href in STYLESHEETS:
        asset = PUBLIC_ROOT / href.split("?", 1)[0].lstrip("/")
        if not asset.is_file():
            print(f"ERROR missing stylesheet: {asset}")
            return 2

    inspected = 0
    skipped = 0
    planned = 0
    review = 0
    updated: list[str] = []

    print("Insights UI reference migration")
    print(f"Mode: {'APPLY' if apply else 'DRY RUN (no files will be changed)'}")
    print(f"Project: {PROJECT_ROOT}")
    print(f"Reference: {relative_name(REFERENCE)}")
    print(f"Styles: {' | '.join(STYLESHEETS)}")

    for page in sorted(INSIGHTS_ROOT.glob("*.html")):
        inspected += 1
        source = read_exact(page)
        is_reference = page.resolve() == REFERENCE.resolve()
        present, missing = structural_hooks(source)
        highlighted, heading_total, eligible = heading_report(source)
        status = page_status(source, is_reference)
        if status in {"REFERENCE", "ALREADY THEMED"}:
            skipped += 1
        else:
            planned += 1
        if missing:
            review += 1

        line = (
            f"  {status:14} {relative_name(page)} | "
            f"hooks={len(present)}/{len(present) + len(missing)} | "
            f"green headings={highlighted}/{heading_total}"
        )
        if missing:
            line += f" | review: {', '.join(missing)}"
        print(line)

        if not apply or status != "WOULD UPDATE":
            continue
        updated_source = highlight_heading_ends(inject_stylesheets(source))
        if fingerprint(source) != fingerprint(updated_source):
            print(f"ERROR content fingerprint changed; refusing {relative_name(page)}")
            return 3
        write_exact(page, updated_source)
        updated.append(relative_name(page))

    print("\nSummary")
    print(f"  pages inspected: {inspected}")
    print(f"  reference/already themed: {skipped}")
    print(f"  pages planned: {planned}")
    print(f"  pages needing structural review: {review}")
    print(f"  pages updated: {len(updated)}")
    if updated:
        print("\nUpdated pages:")
        for page in updated:
            print(f"  - {page}")
    if not apply:
        print("\nDry run passed: no HTML files were modified.")
        print("Use --apply only after reviewing the plan above.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Apply the reference stylesheet links and heading spans.")
    parser.add_argument("--dry-run", action="store_true", help="Inspect only; this is the default.")
    args = parser.parse_args()
    return run(apply=args.apply)


if __name__ == "__main__":
    sys.exit(main())
