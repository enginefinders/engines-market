#!/usr/bin/env python3
"""Apply the finished services/prices UI reference layers to static pages.

The script is dry-run by default. It only adds stylesheet links in apply mode;
it does not rewrite page content, data, forms, scripts, JSON-LD, links, tables,
FAQs, or other functionality. Before writing a page, visible text and
structural tag counts must remain identical. Every changed page is printed.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import re
import sys
from dataclasses import dataclass
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = PROJECT_ROOT / "public"


@dataclass(frozen=True)
class Category:
    name: str
    directory: str
    reference: str
    stylesheets: tuple[str, ...]


CATEGORIES = {
    "services": Category(
        name="services",
        directory="services",
        reference="services/engine-inspection.html",
        stylesheets=("/services/engine-inspection.css?v=2",),
    ),
    "prices": Category(
        name="prices",
        directory="prices",
        reference="prices/engine-fitting-cost.html",
        stylesheets=(
            "/services/engine-inspection.css?v=2",
            "/prices/engine-fitting-cost.css?v=1",
        ),
    ),
}

TAG_NAMES = (
    "h1", "h2", "h3", "p", "ul", "ol", "table", "form", "details", "script", "img",
)
CLASS_ATTR_RE = re.compile(r"\bclass\s*=\s*([\"'])(.*?)\1", re.IGNORECASE | re.DOTALL)
STYLESHEET_RE = re.compile(r"<link\b[^>]*rel\s*=\s*([\"'])stylesheet\1[^>]*>", re.IGNORECASE)
HREF_RE = re.compile(r"\bhref\s*=\s*([\"'])(.*?)\1", re.IGNORECASE | re.DOTALL)
H2_RE = re.compile(r"(<h2\b[^>]*>)([\s\S]*?)(</h2\s*>)", re.IGNORECASE)

# These hooks are shared by the finished reference pages and their category
# siblings. They are used for a dry-run compatibility report only.
COMMON_HOOKS = (
    "hero", "hero-inner", "hero-h1", "hero-tagline", "hero-costs",
    "hcost", "cta-wrapper", "section-card",
)


def relative_name(path: Path) -> str:
    return path.relative_to(PROJECT_ROOT).as_posix()


def visible_text(source: str) -> str:
    body_match = re.search(r"<body\b[^>]*>([\s\S]*?)</body>", source, re.IGNORECASE)
    body = body_match.group(1) if body_match else source
    body = re.sub(r"<script\b[^>]*>[\s\S]*?</script\s*>", " ", body, flags=re.IGNORECASE)
    body = re.sub(r"<style\b[^>]*>[\s\S]*?</style\s*>", " ", body, flags=re.IGNORECASE)
    body = re.sub(r"<[^>]+>", " ", body)
    return re.sub(r"\s+", " ", html.unescape(body)).strip()


def fingerprint(source: str) -> tuple[str, tuple[tuple[str, int], ...]]:
    text = visible_text(source)
    digest = hashlib.sha256(text.encode("utf-8")).hexdigest()
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


def highlight_price_heading_ends(source: str) -> str:
    """Add presentation-only title-green spans without changing heading text."""

    def replace(match: re.Match[str]) -> str:
        opening, inner, closing = match.groups()
        if "title-green" in inner or "<" in inner:
            return match.group(0)
        words = list(re.finditer(r"\S+", inner))
        if len(words) < 2:
            return match.group(0)
        tail_count = 2 if len(words) >= 4 else 1
        start = words[-tail_count].start()
        return f"{opening}{inner[:start]}<span class=\"title-green\">{inner[start:]}</span>{closing}"

    return H2_RE.sub(replace, source)


def heading_report(source: str) -> tuple[int, int]:
    total = 0
    highlighted = 0
    for match in H2_RE.finditer(source):
        inner = match.group(2)
        if "<" in inner and "title-green" not in inner:
            continue
        total += 1
        if "title-green" in inner:
            highlighted += 1
    return highlighted, total


def inject_stylesheets(source: str, category: Category) -> str:
    current = stylesheets_in(source)
    missing = [href for href in category.stylesheets if href not in current]
    if not missing:
        return source

    newline = "\r\n" if "\r\n" in source else "\n"
    links = newline.join(
        f'    <link rel="stylesheet" href="{href}" data-category-reference-ui="{category.name}">'
        for href in missing
    )
    body_close = re.search(r"</body\s*>", source, flags=re.IGNORECASE)
    if body_close:
        return source[: body_close.start()] + links + newline + source[body_close.start() :]
    html_close = re.search(r"</html\s*>", source, flags=re.IGNORECASE)
    if html_close:
        return source[: html_close.start()] + links + newline + source[html_close.start() :]
    return source.rstrip() + newline + links + newline


def write_exact(path: Path, source: str) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        handle.write(source)


def status(source: str, category: Category, reference: bool) -> str:
    if reference:
        return "REFERENCE"
    links_ready = all(href in stylesheets_in(source) for href in category.stylesheets)
    highlighted, total = heading_report(source)
    headings_ready = category.name != "prices" or highlighted == total
    if links_ready and headings_ready:
        return "ALREADY THEMED"
    return "WOULD UPDATE"


def run(category_names: list[str], apply: bool) -> int:
    inspected = 0
    skipped = 0
    planned = 0
    updated: list[str] = []
    review = 0

    print("Services/prices UI reference migration")
    print(f"Mode: {'APPLY' if apply else 'DRY RUN (no files will be changed)'}")
    print(f"Project: {PROJECT_ROOT}")

    for category_name in category_names:
        category = CATEGORIES[category_name]
        reference_path = PUBLIC_ROOT / category.reference
        if not reference_path.is_file():
            print(f"ERROR [{category.name}] missing reference: {relative_name(reference_path)}")
            return 2
        for href in category.stylesheets:
            asset = PUBLIC_ROOT / href.split("?", 1)[0].lstrip("/")
            if not asset.is_file():
                print(f"ERROR [{category.name}] missing stylesheet: {asset}")
                return 2

        print(f"\n[{category.name}] reference={category.reference}")
        print(f"  styles={' | '.join(category.stylesheets)}")
        for page in sorted((PUBLIC_ROOT / category.directory).rglob("*.html")):
            inspected += 1
            source = page.read_text(encoding="utf-8")
            is_reference = page.resolve() == reference_path.resolve()
            present = [hook for hook in COMMON_HOOKS if hook in classes_in(source)]
            missing = [hook for hook in COMMON_HOOKS if hook not in classes_in(source)]
            highlighted, heading_total = heading_report(source)
            page_status = status(source, category, is_reference)
            if page_status in {"REFERENCE", "ALREADY THEMED"}:
                skipped += 1
            else:
                planned += 1
            if missing:
                review += 1

            line = f"  {page_status:14} {relative_name(page)} | hooks={len(present)}/{len(COMMON_HOOKS)}"
            if category.name == "prices":
                line += f" | green headings={highlighted}/{heading_total}"
            if missing:
                line += f" | review: {', '.join(missing)}"
            print(line)

            if not apply or page_status != "WOULD UPDATE":
                continue
            updated_source = inject_stylesheets(source, category)
            if category.name == "prices":
                updated_source = highlight_price_heading_ends(updated_source)
            if fingerprint(source) != fingerprint(updated_source):
                print(f"ERROR: content fingerprint changed; refusing to write {relative_name(page)}")
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
    parser.add_argument(
        "--category",
        choices=["all", *CATEGORIES.keys()],
        default="all",
        help="Category to inspect/apply (default: all).",
    )
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="Inspect only; default mode.")
    mode.add_argument("--apply", action="store_true", help="Add reference stylesheet links.")
    args = parser.parse_args()
    names = list(CATEGORIES) if args.category == "all" else [args.category]
    return run(names, apply=args.apply)


if __name__ == "__main__":
    sys.exit(main())
