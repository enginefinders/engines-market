#!/usr/bin/env python3
"""Apply the Mercedes OM651 case-study UI reference to sibling case studies.

The command is dry-run only unless ``--apply`` is supplied. In apply mode it:

* extracts the reference page's existing inline CSS into one reusable asset;
* links that asset after each target page's existing scripts/styles;
* skips the reference page itself;
* never rewrites page content, data, forms, scripts, JSON-LD, or links; and
* prints every page that was actually updated.

Before each HTML write, visible text and structural tag counts are compared.
If either changes, the write is rejected.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import re
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
CASE_STUDY_ROOT = PROJECT_ROOT / "public" / "case-studies"
REFERENCE_RELATIVE = Path("public/case-studies/mercedes-om651-timing-chain.html")
REFERENCE_PATH = PROJECT_ROOT / REFERENCE_RELATIVE
REFERENCE_CSS_PATH = CASE_STUDY_ROOT / "mercedes-om651-timing-chain.css"
REFERENCE_CSS_HREF = "/case-studies/mercedes-om651-timing-chain.css?v=1"
REFERENCE_MARKER = "data-case-study-reference-ui"

TAG_NAMES = (
    "h1", "h2", "h3", "p", "ul", "ol", "table", "form", "details", "script", "img",
)
CLASS_ATTR_RE = re.compile(r"\bclass\s*=\s*([\"'])(.*?)\1", re.IGNORECASE | re.DOTALL)
STYLE_BLOCK_RE = re.compile(r"<style\b[^>]*>([\s\S]*?)</style\s*>", re.IGNORECASE)
STYLESHEET_RE = re.compile(r"<link\b[^>]*rel\s*=\s*([\"'])stylesheet\1[^>]*>", re.IGNORECASE)
HREF_RE = re.compile(r"\bhref\s*=\s*([\"'])(.*?)\1", re.IGNORECASE | re.DOTALL)

# These are the visual system hooks used by the Mercedes reference page.
REFERENCE_HOOKS = (
    "hero", "container", "section", "case-nav", "hero-stats", "hero-quote",
    "reveal", "section-kicker", "timeline-panel", "price-panel", "tab-btn",
    "path-card", "decision-mini", "matrix-card", "cta-box", "btn", "input",
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


def structural_counts(source: str) -> dict[str, int]:
    return {
        tag: len(re.findall(rf"<{tag}\b", source, flags=re.IGNORECASE))
        for tag in TAG_NAMES
    }


def fingerprint(source: str) -> tuple[str, tuple[tuple[str, int], ...]]:
    text = visible_text(source)
    digest = hashlib.sha256(text.encode("utf-8")).hexdigest()
    return digest, tuple(structural_counts(source).items())


def html_classes(source: str) -> set[str]:
    classes: set[str] = set()
    for match in CLASS_ATTR_RE.finditer(source):
        classes.update(match.group(2).split())
    return classes


def stylesheet_hrefs(source: str) -> set[str]:
    hrefs: set[str] = set()
    for match in STYLESHEET_RE.finditer(source):
        href = HREF_RE.search(match.group(0))
        if href:
            hrefs.add(href.group(2).strip())
    return hrefs


def extract_reference_css(source: str) -> str:
    blocks = [match.group(1).strip() for match in STYLE_BLOCK_RE.finditer(source)]
    if not blocks:
        raise ValueError("reference page has no inline <style> block")
    return "\n\n".join(blocks).strip() + "\n"


def inject_reference_link(source: str) -> str:
    if REFERENCE_CSS_HREF in stylesheet_hrefs(source):
        return source

    newline = "\r\n" if "\r\n" in source else "\n"
    link = f'    <link rel="stylesheet" href="{REFERENCE_CSS_HREF}" {REFERENCE_MARKER}>'
    body_close = re.search(r"</body\s*>", source, flags=re.IGNORECASE)
    if body_close:
        return source[: body_close.start()] + link + newline + source[body_close.start() :]
    html_close = re.search(r"</html\s*>", source, flags=re.IGNORECASE)
    if html_close:
        return source[: html_close.start()] + link + newline + source[html_close.start() :]
    return source.rstrip() + newline + link + newline


def page_status(source: str, is_reference: bool) -> str:
    if is_reference:
        return "REFERENCE"
    if REFERENCE_CSS_HREF in stylesheet_hrefs(source) or REFERENCE_MARKER in source:
        return "ALREADY THEMED"
    return "WOULD UPDATE"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="Inspect only; default mode.")
    mode.add_argument("--apply", action="store_true", help="Write the extracted CSS and page links.")
    args = parser.parse_args()
    apply = args.apply

    if not REFERENCE_PATH.is_file():
        print(f"ERROR: missing reference page: {relative_name(REFERENCE_PATH)}")
        return 2

    reference_source = REFERENCE_PATH.read_text(encoding="utf-8")
    try:
        reference_css = extract_reference_css(reference_source)
    except ValueError as error:
        print(f"ERROR: {error}")
        return 2

    reference_css_hash = hashlib.sha256(reference_css.encode("utf-8")).hexdigest()
    if REFERENCE_CSS_PATH.exists():
        existing_hash = hashlib.sha256(REFERENCE_CSS_PATH.read_bytes()).hexdigest()
        css_status = "already present" if existing_hash == reference_css_hash else "CONFLICT"
        if css_status == "CONFLICT":
            print(f"ERROR: {relative_name(REFERENCE_CSS_PATH)} exists but differs from the reference CSS")
            print("Review or remove that asset manually before using --apply.")
            return 3
    else:
        css_status = "would be created" if not apply else "created"

    pages = sorted(CASE_STUDY_ROOT.glob("*.html"))
    if not pages:
        print("ERROR: no case-study HTML pages found")
        return 2

    print("Case-study UI reference migration")
    print(f"Mode: {'APPLY' if apply else 'DRY RUN (no files will be changed)'}")
    print(f"Reference: {relative_name(REFERENCE_PATH)}")
    print(f"Reference stylesheet: {relative_name(REFERENCE_CSS_PATH)} ({css_status})")

    inspected = 0
    skipped = 0
    planned = 0
    changed: list[str] = []
    review = 0

    for page in pages:
        inspected += 1
        source = page.read_text(encoding="utf-8")
        is_reference = page.resolve() == REFERENCE_PATH.resolve()
        hooks = html_classes(source)
        present = [hook for hook in REFERENCE_HOOKS if hook in hooks]
        missing = [hook for hook in REFERENCE_HOOKS if hook not in hooks]
        status = page_status(source, is_reference)
        if status == "REFERENCE" or status == "ALREADY THEMED":
            skipped += 1
        else:
            planned += 1
        if missing:
            review += 1

        line = f"  {status:14} {relative_name(page)} | hooks={len(present)}/{len(REFERENCE_HOOKS)}"
        if missing:
            line += f" | review: {', '.join(missing)}"
        print(line)

        if not apply or status != "WOULD UPDATE":
            continue

        updated = inject_reference_link(source)
        if fingerprint(source) != fingerprint(updated):
            print(f"ERROR: content fingerprint changed; refusing to write {relative_name(page)}")
            return 4
        page.write_text(updated, encoding="utf-8", newline="")
        changed.append(relative_name(page))

    if apply and not REFERENCE_CSS_PATH.exists():
        REFERENCE_CSS_PATH.write_text(reference_css, encoding="utf-8", newline="")

    print("\nSummary")
    print(f"  pages inspected: {inspected}")
    print(f"  reference/already themed: {skipped}")
    print(f"  pages planned: {planned}")
    print(f"  pages needing structural review: {review}")
    print(f"  pages updated: {len(changed)}")
    if changed:
        print("\nUpdated pages:")
        for item in changed:
            print(f"  - {item}")
    if not apply:
        print("\nDry run passed: no HTML or CSS files were modified.")
        print("Run with --apply only after reviewing the page list above.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
