#!/usr/bin/env python3
"""Apply a finished static-page UI reference layer to a page category.

This tool is intentionally conservative:

* Dry-run is the default. It never writes page files.
* ``--apply`` is required before any HTML file can be changed.
* Only stylesheet links and a small tracking marker are added.
* The reference page is skipped automatically.
* Visible text and structural tag counts are compared before and after an
  application and a write is rejected if either changes.

The reference pages already contain the finished category UI CSS. This tool
propagates those existing CSS layers to sibling static HTML pages without
rewriting their content, data, forms, scripts, JSON-LD, or links.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = PROJECT_ROOT / "public"


@dataclass(frozen=True)
class Category:
    key: str
    directory: str
    reference: str
    stylesheets: tuple[str, ...]
    required_hooks: tuple[str, ...]


CATEGORIES = {
    "symptoms": Category(
        key="symptoms",
        directory="symptoms",
        reference="symptoms/limp-mode.html",
        stylesheets=("/symptoms/limp-mode.css?v=6",),
        required_hooks=(
            "hero", "hero-inner", "hero-h1", "hero-tagline", "hero-costs",
            "hcost", "cta-card", "section-card", "section-title", "section-label",
        ),
    ),
    "services": Category(
        key="services",
        directory="services",
        reference="services/engine-inspection.html",
        stylesheets=("/services/engine-inspection.css?v=2",),
        required_hooks=(
            "hero", "hero-inner", "hero-h1", "hero-tagline", "hero-costs",
            "hcost", "cta-wrapper", "content-card-flow", "section-card", "sec-title",
        ),
    ),
    "prices": Category(
        key="prices",
        directory="prices",
        reference="prices/engine-fitting-cost.html",
        stylesheets=(
            "/services/engine-inspection.css?v=2",
            "/prices/engine-fitting-cost.css?v=1",
        ),
        required_hooks=(
            "hero", "hero-inner", "hero-h1", "hero-tagline", "hero-costs",
            "hcost", "section-card", "section-title", "table-responsive",
        ),
    ),
    "insights": Category(
        key="insights",
        directory="insights",
        reference="insights/most-common-engine-failures-uk.html",
        stylesheets=(
            "/services/engine-inspection.css?v=2",
            "/insights/most-common-engine-failures-uk.css?v=1",
        ),
        required_hooks=(
            "hero", "hero-inner", "hero-h1", "hero-tagline", "hero-costs",
            "hcost", "content-section", "section-inner", "glass-card", "sec-h2",
            "tbl-scroll", "final-cta",
        ),
    ),
}


TAG_NAMES = ("h1", "h2", "h3", "p", "ul", "ol", "table", "form", "details", "script", "img")
CLASS_ATTR_RE = re.compile(r"\bclass\s*=\s*([\"'])(.*?)\1", re.IGNORECASE | re.DOTALL)
STYLE_LINK_RE = re.compile(r"<link\b[^>]*rel\s*=\s*([\"'])stylesheet\1[^>]*>", re.IGNORECASE)
HREF_RE = re.compile(r"\bhref\s*=\s*([\"'])(.*?)\1", re.IGNORECASE | re.DOTALL)


def clean_text(source: str) -> str:
    """Return visible body text with scripts/styles and markup removed."""

    body_match = re.search(r"<body\b[^>]*>([\s\S]*?)</body>", source, re.IGNORECASE)
    body = body_match.group(1) if body_match else source
    body = re.sub(r"<script\b[^>]*>[\s\S]*?</script\s*>", " ", body, flags=re.IGNORECASE)
    body = re.sub(r"<style\b[^>]*>[\s\S]*?</style\s*>", " ", body, flags=re.IGNORECASE)
    body = re.sub(r"<[^>]+>", " ", body)
    return re.sub(r"\s+", " ", html.unescape(body)).strip()


def structural_counts(source: str) -> dict[str, int]:
    return {tag: len(re.findall(rf"<{tag}\b", source, flags=re.IGNORECASE)) for tag in TAG_NAMES}


def fingerprint(source: str) -> dict[str, object]:
    visible = clean_text(source)
    return {
        "visible_text_sha256": hashlib.sha256(visible.encode("utf-8")).hexdigest(),
        "visible_text_length": len(visible),
        "structural_counts": structural_counts(source),
    }


def classes_in_html(source: str) -> set[str]:
    classes: set[str] = set()
    for match in CLASS_ATTR_RE.finditer(source):
        classes.update(match.group(2).split())
    return classes


def existing_stylesheets(source: str) -> set[str]:
    hrefs: set[str] = set()
    for match in STYLE_LINK_RE.finditer(source):
        href_match = HREF_RE.search(match.group(0))
        if href_match:
            hrefs.add(href_match.group(2).strip())
    return hrefs


def page_files(category: Category) -> list[Path]:
    directory = PUBLIC_ROOT / category.directory
    return sorted(path for path in directory.rglob("*.html") if path.is_file())


def relative_name(path: Path) -> str:
    return path.relative_to(PROJECT_ROOT).as_posix()


def inject_stylesheets(source: str, category: Category) -> str:
    marker = f'data-category-ui="{category.key}"'
    if marker in source:
        return source

    missing = [href for href in category.stylesheets if href not in existing_stylesheets(source)]
    if not missing:
        # The page already has the complete reference layer. Add no marker so
        # the tool does not rewrite an otherwise identical file.
        return source

    line_break = "\r\n" if "\r\n" in source else "\n"
    links = line_break.join(
        f'    <link rel="stylesheet" href="{href}" data-category-ui="{category.key}">' 
        for href in missing
    )
    closing_body = re.search(r"</body\s*>", source, flags=re.IGNORECASE)
    if closing_body:
        return source[: closing_body.start()] + links + line_break + source[closing_body.start() :]
    closing_html = re.search(r"</html\s*>", source, flags=re.IGNORECASE)
    if closing_html:
        return source[: closing_html.start()] + links + line_break + source[closing_html.start() :]
    return source.rstrip() + line_break + links + line_break


def coverage(category: Category, source: str) -> tuple[int, int, list[str]]:
    hooks = classes_in_html(source)
    present = [hook for hook in category.required_hooks if hook in hooks]
    missing = [hook for hook in category.required_hooks if hook not in hooks]
    return len(present), len(category.required_hooks), missing


def status_for(source: str, category: Category, is_reference: bool) -> str:
    if is_reference:
        return "REFERENCE"
    if f'data-category-ui="{category.key}"' in source:
        return "ALREADY THEMED"
    if all(href in existing_stylesheets(source) for href in category.stylesheets):
        return "ALREADY LINKED"
    return "WOULD UPDATE"


def run(category_names: list[str], apply: bool) -> int:
    selected = [CATEGORIES[name] for name in category_names]
    total = 0
    planned = 0
    skipped = 0
    review = 0
    changed = 0

    print("Category UI reference migration")
    print(f"Mode: {'APPLY' if apply else 'DRY RUN (no files will be changed)'}")
    print(f"Project: {PROJECT_ROOT}")

    for category in selected:
        reference_path = PUBLIC_ROOT / category.reference
        if not reference_path.is_file():
            print(f"ERROR [{category.key}] missing reference: {relative_name(reference_path)}")
            return 2
        for stylesheet in category.stylesheets:
            asset_path = PUBLIC_ROOT / stylesheet.split("?", 1)[0].lstrip("/")
            if not asset_path.is_file():
                print(f"ERROR [{category.key}] missing stylesheet: {asset_path}")
                return 2

        print(f"\n[{category.key}] reference={category.reference}")
        print(f"  styles={' | '.join(category.stylesheets)}")

        for path in page_files(category):
            total += 1
            source = path.read_text(encoding="utf-8")
            is_reference = path.resolve() == reference_path.resolve()
            present, expected, missing = coverage(category, source)
            state = status_for(source, category, is_reference)
            if state == "REFERENCE":
                skipped += 1
            elif state in {"WOULD UPDATE"}:
                planned += 1
            else:
                skipped += 1
            if missing:
                review += 1

            line = f"  {state:14} {relative_name(path)} | hooks={present}/{expected}"
            if missing:
                line += f" | review: {', '.join(missing)}"
            print(line)

            if not apply or is_reference or state != "WOULD UPDATE":
                continue

            updated = inject_stylesheets(source, category)
            before = fingerprint(source)
            after = fingerprint(updated)
            if before != after:
                print(f"ERROR {relative_name(path)} content fingerprint changed; refusing to write")
                return 3
            path.write_text(updated, encoding="utf-8", newline="")
            changed += 1

    print("\nSummary")
    print(f"  pages inspected: {total}")
    print(f"  pages skipped/reference/already linked: {skipped}")
    print(f"  pages planned for update: {planned}")
    print(f"  pages changed: {changed}")
    print(f"  pages needing structural review: {review}")
    if not apply:
        print("\nDry run passed: no HTML files were modified.")
        print("Use --apply only after reviewing the plan above.")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--category",
        choices=["all", *CATEGORIES.keys()],
        default="all",
        help="Category to inspect/apply (default: all).",
    )
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="Inspect only; this is the default.")
    mode.add_argument("--apply", action="store_true", help="Write stylesheet links after fingerprint checks.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    category_names = list(CATEGORIES) if args.category == "all" else [args.category]
    return run(category_names, apply=args.apply)


if __name__ == "__main__":
    sys.exit(main())
