#!/usr/bin/env python3
import argparse
import json
import re
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any


SECTION_SPLIT_RE = re.compile(r"^# SECTION\s+(\d+)\b.*$", re.MULTILINE)
LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
INLINE_LINK_NOTE_RE = re.compile(
    r"\[(?:Link(?: once)?):\s*(/[^]\s]+|https?://[^]\s]+)\s*\]",
    re.IGNORECASE,
)
BARE_PATH_NOTE_RE = re.compile(r"\[(/[^]\s]+)\s*\]")
SCRIPT_RE = re.compile(
    r'<script type="application/ld\+json">\s*(\{.*?\})\s*</script>',
    re.DOTALL | re.IGNORECASE,
)
FENCED_JSON_RE = re.compile(r"```json\s*(\{.*?\})\s*```", re.DOTALL | re.IGNORECASE)
PRICE_RE = re.compile(r"^(Used|Reconditioned|Rebuilt)\s+from\s+(.+)$", re.IGNORECASE)
QUESTION_RE = re.compile(r"^Q(\d+):\s*(.+)$")
RELATED_RE = re.compile(r"^(PREDECESSOR|SUCCESSOR|SIBLING|CROSS-BRAND TWIN|CROSS-BRAND CONTEXT):\s*(.+)$")
PENDING_RE = re.compile(r"\[LINK PENDING[^\]]*\]", re.IGNORECASE)
ESTIMATED_RE = re.compile(r"\[ESTIMATED[^\]]*\]", re.IGNORECASE)
SOURCE_NOTE_RE = re.compile(
    r"`?\[(?:EM-[^\]]+|PATTERN DATA|THIRD-PARTY[^\]]*|DATA NOT[^\]]*|ESTIMATED[^\]]*|LINK PENDING[^\]]*)\]`?",
    re.IGNORECASE,
)
CODE_TOKEN_RE = re.compile(r"\b(?:[A-Z][A-Z0-9]{2,}[A-Z0-9./-]*|[0-9][A-Z][A-Z0-9./-]*)\b")
NON_ASCII_DASH_RE = re.compile(r"[\u2012\u2013\u2014\u2015]")
WHITESPACE_RE = re.compile(r"\s+")
MOJIBAKE_HINT_RE = re.compile(r"[ÃÂâðœšž€¢™]")
DECORATIVE_RULE_RE = re.compile(r"^(?:[=\-_*#~•·─━═]{6,}\s*)+")
INTERNAL_TRAILER_RE = re.compile(
    r"(?:META TITLE:|META DESCRIPTION:|CANONICAL URL:|OG TITLE:|OG DESCRIPTION:|OG URL:|OG TYPE:|OG SITE NAME:|"
    r"TWITTER CARD:|TWITTER TITLE:|TWITTER DESCRIPTION:|<script type=\"application/ld\+json\">|"
    r"internal - strip before publish|PRODUCTION NOTES\b|LINK PENDING flags:|# META & SCHEMA PACKAGE)",
    re.IGNORECASE,
)
ENGINESMARKET_SERVICE_RE = re.compile(
    r"https?://(?:www\.)?enginesmarket\.co\.uk(/services/[a-z-]+)(?:/)?",
    re.IGNORECASE,
)

SERVICE_PATHS = {
    "used": "/services/used-engines",
    "reconditioned": "/services/reconditioned-engines",
    "rebuilt": "/services/rebuilt-engines",
    "supply & fit": "/services/supply-and-fit",
    "supply and fit": "/services/supply-and-fit",
}


def decode_source_text(value: str) -> str:
    value = value.replace("\ufeff", "").replace("\u00a0", " ")
    fixed = value
    for _ in range(3):
        if not MOJIBAKE_HINT_RE.search(fixed):
            break
        try:
            candidate = fixed.encode("cp1252").decode("utf-8")
        except UnicodeError:
            break
        if candidate == fixed:
            break
        fixed = candidate
    return fixed


def strip_internal_trailer(value: str) -> str:
    match = INTERNAL_TRAILER_RE.search(value)
    if match:
        return value[: match.start()]
    return value


def strip_decorative_prefix(value: str) -> str:
    cleaned = value.lstrip()
    while True:
        updated = DECORATIVE_RULE_RE.sub("", cleaned, count=1).lstrip()
        if updated == cleaned:
            return cleaned
        cleaned = updated


def normalize_whitespace(value: str) -> str:
    value = value.replace("\ufeff", "")
    value = value.replace("\u00a0", " ")
    value = NON_ASCII_DASH_RE.sub("-", value)
    return WHITESPACE_RE.sub(" ", value).strip()


def cleanup_text(value: str) -> str:
    value = normalize_whitespace(value)
    value = value.replace("â†’", "")
    value = value.replace("`", "")
    value = PENDING_RE.sub("", value)
    value = SOURCE_NOTE_RE.sub("", value)
    value = INLINE_LINK_NOTE_RE.sub("", value)
    value = BARE_PATH_NOTE_RE.sub("", value)
    value = value.replace("[]", "")
    return normalize_whitespace(value)


def slugify(value: str) -> str:
    cleaned = cleanup_text(value).lower()
    cleaned = cleaned.replace("&", " and ")
    cleaned = re.sub(r"[^a-z0-9]+", "-", cleaned)
    cleaned = re.sub(r"-{2,}", "-", cleaned).strip("-")
    return cleaned


def clean_label(value: str) -> str:
    value = value.replace("âœ…", "").replace("ðŸ”§", "").replace("ðŸšš", "").replace("ðŸ‘¥", "")
    value = value.replace("ðŸ”’", "").replace("ðŸ‡¬ðŸ‡§", "").replace("GB", "")
    value = value.replace("â†’", "").strip(" :-")
    return cleanup_text(value)


def remove_links_keep_text(value: str) -> str:
    value = LINK_RE.sub(lambda match: match.group(1), value)
    return cleanup_text(value)


def normalize_whitespace(value: str) -> str:
    value = decode_source_text(value)
    value = NON_ASCII_DASH_RE.sub("-", value)
    return WHITESPACE_RE.sub(" ", value).strip()


def cleanup_text(value: str) -> str:
    value = strip_internal_trailer(decode_source_text(value))
    value = strip_decorative_prefix(value)
    value = normalize_whitespace(value)
    value = value.replace("Ã¢â€ â€™", "")
    value = value.replace("→", "").replace("➡", "").replace("➜", "")
    value = value.replace("✅", "").replace("🔧", "").replace("🚚", "").replace("👥", "").replace("🔒", "")
    value = value.replace("`", "")
    value = PENDING_RE.sub("", value)
    value = SOURCE_NOTE_RE.sub("", value)
    value = INLINE_LINK_NOTE_RE.sub("", value)
    value = BARE_PATH_NOTE_RE.sub("", value)
    value = value.replace("[]", "")
    return normalize_whitespace(value)


def clean_label(value: str) -> str:
    value = decode_source_text(value)
    for token in ("✅", "🔧", "🚚", "👥", "🔒", "🇬🇧", "GB"):
        value = value.replace(token, "")
    value = value.replace("Ã¢â€ â€™", "").strip(" :-")
    return cleanup_text(value)


def extract_trust_bullets(value: str) -> list[str]:
    decoded = strip_internal_trailer(decode_source_text(value))
    trust_match = re.search(r"TRUST POINTS:\s*(.+)", decoded, re.IGNORECASE)
    segment = trust_match.group(1) if trust_match else decoded
    segment = re.split(r"\bCLOSING PARAGRAPH:\b", segment, maxsplit=1, flags=re.IGNORECASE)[0]
    return [cleanup_text(part) for part in re.split(r"(?:✅|🔧|🚚|👥|•)", segment) if cleanup_text(part)]


def extract_trust_paragraph(value: str) -> str:
    decoded = strip_internal_trailer(decode_source_text(value))
    closing_match = re.search(r"CLOSING PARAGRAPH:\s*(.+)", decoded, re.IGNORECASE)
    if closing_match:
        return cleanup_text(closing_match.group(1))
    stripped = re.sub(r"\bTRUST POINTS:\b", "", decoded, flags=re.IGNORECASE)
    return cleanup_text(stripped)


def split_sections(raw: str) -> dict[int, str]:
    matches = list(SECTION_SPLIT_RE.finditer(raw))
    sections: dict[int, str] = {}
    for index, match in enumerate(matches):
        number = int(match.group(1))
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(raw)
        sections[number] = raw[start:end].strip()
    return sections


def lines_of(block: str) -> list[str]:
    return [line.rstrip() for line in block.splitlines()]


def clean_prefixed_line(line: str) -> str:
    return line.strip().replace("**", "").replace("`", "")


def prefixed_value(block: str, prefix: str, *extra_prefixes: str) -> str | None:
    prefixes = (prefix, *extra_prefixes)
    for line in lines_of(block):
        plain = clean_prefixed_line(line)
        for current_prefix in prefixes:
            if plain.lower().startswith(current_prefix.lower()):
                return plain[len(current_prefix) :].strip()
    return None


def markdown_links(value: str) -> list[dict[str, str]]:
    return [{"label": cleanup_text(label), "href": href.strip()} for label, href in LINK_RE.findall(value)]


def strip_domain(canonical: str) -> str:
    canonical = canonical.strip()
    if canonical.startswith("http://") or canonical.startswith("https://"):
        match = re.match(r"https?://[^/]+(.*)$", canonical)
        if match:
            canonical = match.group(1) or "/"
    return canonical if canonical.startswith("/") else f"/{canonical.lstrip('/')}"


def normalize_href(href: str) -> str:
    href = cleanup_text(href).strip().rstrip(".,)")
    if not href:
        return "#"
    return strip_domain(href)


def extract_inline_href(value: str, fallback_label: str | None = None) -> str:
    links = markdown_links(value)
    if links:
        return normalize_href(links[0]["href"])

    note_match = INLINE_LINK_NOTE_RE.search(value)
    if note_match:
        return normalize_href(note_match.group(1))

    bare_match = BARE_PATH_NOTE_RE.search(value)
    if bare_match:
        return normalize_href(bare_match.group(1))

    service_match = ENGINESMARKET_SERVICE_RE.search(value)
    if service_match:
        return normalize_href(service_match.group(1))

    lowered = value.lower()
    if fallback_label and fallback_label.lower() in SERVICE_PATHS:
        return SERVICE_PATHS[fallback_label.lower()]
    return "#"


def strip_bold(value: str) -> str:
    return cleanup_text(value.replace("**", ""))


def normalize_brand_identity(name: str) -> tuple[str, str]:
    cleaned = cleanup_text(name)
    lowered = cleaned.lower()
    if lowered in {"mercedes", "mercedez", "mercedes benz"}:
        return "Mercedes-Benz", "mercedes-benz"
    if lowered == "volkswagen":
        return "Volkswagen", "volkswagen"
    return cleaned, slugify(cleaned)


def split_pipe_table_rows(block: str) -> list[list[str]]:
    rows: list[list[str]] = []
    in_table = "TABLE:" not in block
    for line in lines_of(block):
        stripped = line.strip()
        if stripped == "TABLE:":
            in_table = True
            continue
        if not in_table:
            continue
        if not stripped:
            continue
        if stripped.startswith("|---") or stripped.startswith("| ---"):
            continue
        if stripped.startswith("("):
            rows.append([stripped])
            continue
        if "|" not in stripped:
            if rows:
                break
            continue
        parts = [cleanup_text(part) for part in stripped.strip("|").split("|")]
        if len(parts) >= 2:
            rows.append(parts)
    return rows


def sentence_split(text: str) -> list[str]:
    chunks = re.split(r"(?<=[.!?])\s+", cleanup_text(text))
    return [chunk for chunk in chunks if chunk]


def guess_engine_image_src(fuel: str, text_blob: str) -> str:
    fuel_lower = fuel.lower()
    haystack = text_blob.lower()
    if "diesel" in fuel_lower:
        return "/images/shared/hero-engines/temporary-diesel-engine.jpeg"
    if "hybrid" in fuel_lower or "mhev" in fuel_lower or "performance" in haystack or "twin-turbo" in haystack:
        return "/images/shared/hero-engines/temporary-performance-engine.jpeg"
    return "/images/shared/hero-engines/temporary-petrol-engine.jpeg"


def extract_failure_heading(line: str) -> str | None:
    plain = clean_prefixed_line(line)
    if plain.startswith("#### "):
        return cleanup_text(plain[5:])
    if plain.lower().startswith("h4:"):
        return cleanup_text(plain[3:])
    if plain.startswith("**") and plain.endswith("**") and any(char.isdigit() for char in plain):
        return strip_bold(plain).lstrip("1234567890. ").strip()
    return None


@dataclass
class ParseResult:
    data: dict[str, Any] | None
    warnings: list[str]


class EnginePageParser:
    def __init__(self, path: Path) -> None:
        self.path = path
        self.raw = path.read_text(encoding="utf-8").lstrip("\ufeff")
        self.sections = split_sections(self.raw)
        self.warnings: list[str] = []

    def warning(self, message: str) -> None:
        if message not in self.warnings:
            self.warnings.append(message)

    def require_section(self, number: int) -> str:
        block = self.sections.get(number)
        if not block:
            self.warning(f"missing section {number}")
            return ""
        return block

    def empty_related_section(self) -> dict[str, Any]:
        return {"tag": "Related Engines", "title": "Related Engines", "items": []}

    def parse(self) -> ParseResult:
        if 1 not in self.sections:
            return self.parse_markdown_format()

        hero_block = self.require_section(1)
        specs_block = self.require_section(2)
        compatibility_block = self.require_section(3)
        cost_block = self.require_section(4)
        failures_block = self.require_section(5)
        variants_block = self.require_section(6)
        buying_block = self.sections.get(7, "")
        related_block = self.sections.get(8, "")
        faq_block = self.sections.get(9, "")
        trust_block = self.sections.get(10, "")

        if not hero_block:
            return ParseResult(None, self.warnings)

        hero = self.parse_hero(hero_block)
        raw_brand_name = hero["pills"][0] if hero["pills"] else cleanup_text(self.path.parent.name)
        brand_name, brand_slug = normalize_brand_identity(raw_brand_name)
        engine_code = hero["pills"][1] if len(hero["pills"]) > 1 else self.infer_engine_code()
        engine_slug = f"{slugify(engine_code)}-engine"

        specs = self.parse_specs(specs_block)
        compatibility = self.parse_compatibility(compatibility_block)
        cost_guide = self.parse_cost_guide(cost_block)
        failures = self.parse_failures(failures_block)
        related_seed = self.parse_related(related_block) if related_block else self.empty_related_section()
        variants = self.parse_variants(variants_block, related_seed)
        related = related_seed if related_seed["items"] else self.synthesize_related(specs, variants)
        buying_guide = self.parse_buying_guide(buying_block) if buying_block else self.synthesize_buying_guide(cost_guide)
        faq = self.parse_faq(faq_block) if faq_block else self.synthesize_faq(hero, cost_guide, variants, buying_guide)
        trust_cta = self.parse_trust_cta(trust_block) if trust_block else self.synthesize_trust_cta(hero, buying_guide)

        data = {
            "brand": {"name": brand_name, "slug": brand_slug, "tone": "premium"},
            "engine": {"code": engine_code, "slug": engine_slug},
            "seo": self.parse_seo(brand_slug, engine_slug),
            "sections": {
                "hero": hero,
                "specs": specs,
                "compatibility": compatibility,
                "costGuide": cost_guide,
                "failures": failures,
                "variants": variants,
                "buyingGuide": buying_guide,
                "related": related,
                "faq": faq,
                "trustCta": trust_cta,
            },
        }

        structured = self.parse_structured_data(warn_if_missing=False)
        data["structuredData"] = structured if structured is not None else self.build_fallback_structured_data(data)
        data = self.sanitize_payload(data)
        self.scan_quality_signals()
        return ParseResult(data, self.warnings)

    def parse_markdown_sections(self) -> dict[str, str]:
        heading_re = re.compile(r"^##\s+(.+?)\s*$", re.MULTILINE)
        matches = list(heading_re.finditer(self.raw))
        sections: dict[str, str] = {}
        for index, match in enumerate(matches):
            heading = cleanup_text(match.group(1))
            start = match.end()
            end = matches[index + 1].start() if index + 1 < len(matches) else len(self.raw)
            sections[heading] = self.raw[start:end].strip()
        return sections

    def find_markdown_section(self, sections: dict[str, str], *needles: str, warn: bool = True) -> tuple[str, str]:
        lowered = [(heading, block, heading.lower()) for heading, block in sections.items()]
        for needle in needles:
            needle_lower = needle.lower()
            for heading, block, lowered_heading in lowered:
                if needle_lower in lowered_heading:
                    return heading, block
        if warn:
            self.warning(f"markdown section missing: {' / '.join(needles)}")
        return "", ""

    def parse_markdown_format(self) -> ParseResult:
        markdown_sections = self.parse_markdown_sections()
        if not markdown_sections:
            self.warning("no numbered or markdown sections found")
            return ParseResult(None, self.warnings)

        specs_heading, specs_block = self.find_markdown_section(markdown_sections, "specifications")
        compatibility_heading, compatibility_block = self.find_markdown_section(markdown_sections, "compatibility")
        cost_heading, cost_block = self.find_markdown_section(markdown_sections, "replacement cost")
        failures_heading, failures_block = self.find_markdown_section(markdown_sections, "common failures")
        variants_heading, variants_block = self.find_markdown_section(markdown_sections, "confirm you have")
        buying_heading, buying_block = self.find_markdown_section(markdown_sections, "buying guide")
        related_heading, related_block = self.find_markdown_section(markdown_sections, "related engines", warn=False)
        faq_heading, faq_block = self.find_markdown_section(markdown_sections, "faq", warn=False)
        trust_heading, trust_block = self.find_markdown_section(markdown_sections, "trust your", warn=False)

        structured = self.parse_structured_data(warn_if_missing=False)
        structured_graph = []
        if isinstance(structured, dict):
            graph = structured.get("@graph")
            if isinstance(graph, list):
                structured_graph = graph

        hero_line = next((line.strip() for line in lines_of(self.raw) if line.strip().startswith("# ")), "")
        title = cleanup_text(hero_line.lstrip("#").strip())
        specs_table = self.parse_markdown_specs(specs_block, specs_heading)
        fuel = next((item["value"] for item in specs_table["specs"] if item["label"].lower() == "fuel type"), "")
        engine_code = next(
            (item["value"] for item in specs_table["specs"] if item["label"].lower() in {"engine code", "engine"}),
            self.infer_engine_code(),
        )
        raw_brand_name = cleanup_text(title.split(" ", 1)[0]) if title else cleanup_text(self.path.parent.name)
        brand_name, brand_slug = normalize_brand_identity(raw_brand_name)
        engine_slug = f"{slugify(engine_code)}-engine"
        cost_section = self.parse_markdown_cost(cost_block, cost_heading)
        hero = self.parse_markdown_hero(
            title=title,
            brand_name=brand_name,
            brand_slug=brand_slug,
            engine_code=engine_code,
            fuel=fuel,
            cost_rows=cost_section["rows"],
        )
        related_section = self.parse_markdown_related(related_block, related_heading) if related_block else self.empty_related_section()
        variants_section = self.parse_markdown_variants(variants_block, variants_heading, related_section)
        if not related_section["items"]:
            related_section = self.synthesize_related(specs_table, variants_section)
        buying_section = self.parse_markdown_buying(buying_block, buying_heading) if buying_block else self.synthesize_buying_guide(cost_section)
        faq_section = self.parse_markdown_faq(faq_block, faq_heading) if faq_block else self.synthesize_faq(hero, cost_section, variants_section, buying_section)
        trust_section = self.parse_markdown_trust(trust_block, trust_heading, engine_code) if trust_block else self.synthesize_trust_cta(hero, buying_section)

        data = {
            "brand": {"name": brand_name, "slug": brand_slug, "tone": "premium"},
            "engine": {"code": engine_code, "slug": engine_slug},
            "seo": self.parse_markdown_seo(structured_graph, title, brand_slug, engine_slug),
            "sections": {
                "hero": hero,
                "specs": specs_table,
                "compatibility": self.parse_markdown_compatibility(compatibility_block, compatibility_heading),
                "costGuide": cost_section,
                "failures": self.parse_markdown_failures(failures_block, failures_heading),
                "variants": variants_section,
                "buyingGuide": buying_section,
                "related": related_section,
                "faq": faq_section,
                "trustCta": trust_section,
            },
        }

        data["structuredData"] = structured if structured is not None else self.build_fallback_structured_data(data)
        data = self.sanitize_payload(data)
        self.scan_quality_signals()
        return ParseResult(data, self.warnings)

    def infer_engine_code(self) -> str:
        pill_text = prefixed_value(self.raw, "TAG PILL:")
        if pill_text:
            parts = [cleanup_text(part) for part in re.split(r"[•·]", pill_text) if cleanup_text(part)]
            if len(parts) > 1:
                return parts[1]

        spec_match = re.search(
            r"^\|\s*\*{0,2}Engine Code\*{0,2}\s*\|\s*([^|\n]+?)\s*\|",
            self.raw,
            re.MULTILINE,
        )
        if spec_match:
            return cleanup_text(spec_match.group(1)).split("(", 1)[0].strip()

        heading_match = re.search(
            r"^(?:#\s+|H1:\s*|\*\*H1:\*\*\s*)(?:[A-Za-z-]+\s+)([A-Z0-9][A-Z0-9./-]+)\b",
            self.raw,
            re.MULTILINE,
        )
        if heading_match:
            return cleanup_text(heading_match.group(1))

        name = normalize_whitespace(self.path.stem)
        bullet_match = re.search(r"\u2022\s*([A-Z0-9./-]+)\s*\u2022", name)
        if bullet_match:
            return bullet_match.group(1)
        tokens = [token for token in CODE_TOKEN_RE.findall(name) if any(char.isdigit() for char in token)]
        if tokens:
            return cleanup_text(tokens[0])
        self.warning("unable to infer engine code from filename")
        return slugify(name).upper()

    def parse_hero(self, block: str) -> dict[str, Any]:
        breadcrumb_line = prefixed_value(block, "BREADCRUMB LINE:") or ""
        breadcrumbs = []
        links = markdown_links(breadcrumb_line)
        if links:
            breadcrumbs.append(links[0])
        tail = remove_links_keep_text(breadcrumb_line.replace("→", " "))
        if tail:
            crumbs = [cleanup_text(part) for part in re.split(r"\s*>\s*|\s{2,}", tail) if cleanup_text(part)]
            for crumb in crumbs[1:]:
                breadcrumbs.append({"label": crumb})

        pill_text = prefixed_value(block, "TAG PILL:") or ""
        pills = [cleanup_text(part) for part in re.split(r"[•·]", pill_text) if cleanup_text(part)]

        title = cleanup_text(prefixed_value(block, "H1:") or "")
        description = cleanup_text(prefixed_value(block, "SUBHEADING:") or "")
        trust_badges = [
            clean_label(part)
            for part in (prefixed_value(block, "TRUST BADGES:") or "").split("|")
            if clean_label(part)
        ]

        price_anchor = prefixed_value(block, "PRICE ANCHOR:") or ""
        prices = []
        for chunk in [cleanup_text(part) for part in re.split(r"[·•]", price_anchor) if cleanup_text(part)]:
            match = PRICE_RE.match(chunk)
            if not match:
                continue
            label = match.group(1).capitalize()
            prices.append({"label": label, "price": cleanup_text(match.group(2)), "tone": label.lower()})

        cta_button = cleanup_text(prefixed_value(block, "CTA BUTTON:") or "Compare Engine Prices")
        cta_note = clean_label(
            prefixed_value(block, "CTA NOTE:") or "Secure enquiry - no spam. Quotes only from vetted UK engine specialists."
        )
        alt = cleanup_text(prefixed_value(block, "Alt text:") or f"{title} UK replacement prices")
        fuel = pills[2] if len(pills) > 2 else ""
        price_note = ESTIMATED_RE.search(price_anchor)

        return {
            "breadcrumbs": breadcrumbs,
            "pills": pills,
            "title": title,
            "description": description,
            "trustBadges": trust_badges,
            "prices": prices,
            **({"priceNote": price_note.group(0).strip("[]")} if price_note else {}),
            "quoteCard": {
                "heading": "Get Your Engine Quote",
                "subtitle": "Enter your registration to confirm fitment and get exact prices",
                "countryCode": "GB",
                "placeholder": "Enter your reg - e.g. AB12 CDE",
                "buttonText": cta_button,
                "note": cta_note,
            },
            "engineImage": {"src": guess_engine_image_src(fuel, block), "alt": alt},
        }

    def parse_specs(self, block: str) -> dict[str, Any]:
        specs = []
        for row in split_pipe_table_rows(block):
            if len(row) < 2 or row[0].lower() in {"spec", "specification"}:
                continue
            specs.append({"label": row[0], "value": remove_links_keep_text(row[1])})
        return {
            "tag": cleanup_text(prefixed_value(block, "TAG:") or "Key Specs"),
            "title": cleanup_text(prefixed_value(block, "H2:") or ""),
            "specs": specs,
        }

    def parse_compatibility(self, block: str) -> dict[str, Any]:
        rows = []
        for row in split_pipe_table_rows(block):
            if row[0].lower() == "model":
                continue
            if len(row) >= 5:
                rows.append(
                    {
                        "model": row[0],
                        "generation": row[1],
                        "badges": row[2],
                        "years": row[3],
                        "links": markdown_links(row[4]),
                    }
                )
            elif len(row) >= 3:
                rows.append(
                    {
                        "model": row[0],
                        "generation": row[1],
                        "badges": "",
                        "years": row[2],
                        "links": [],
                    }
                )
        intro = cleanup_text(prefixed_value(block, "INTRO:") or "")
        if not intro:
            intro = next((remove_links_keep_text(line) for line in lines_of(block) if line.strip() and "|" not in line), "")
        return {
            "tag": cleanup_text(prefixed_value(block, "TAG:") or "Fitted To"),
            "title": cleanup_text(prefixed_value(block, "H2:") or ""),
            "intro": intro,
            "rows": rows,
            "closing": cleanup_text(
                prefixed_value(block, "CLOSING LINE:")
                or next((line for line in lines_of(block) if "Not sure which engine" in line), "")
            ),
        }

    def parse_cost_guide(self, block: str) -> dict[str, Any]:
        rows = []
        note_lines = []
        for row in split_pipe_table_rows(block):
            if len(row) == 1:
                note_lines.append(remove_links_keep_text(row[0]))
                continue
            if row[0].lower() == "condition":
                continue
            if len(row) >= 4:
                rows.append({"condition": row[0], "supplyOnly": row[1], "fitted": row[2], "warranty": row[3]})
            elif len(row) >= 3:
                rows.append({"condition": row[0], "supplyOnly": row[1], "fitted": row[2], "warranty": "Check supplier"})
        price_factors = prefixed_value(block, "PRICE-FACTORS PARAGRAPH:", "PRICE-FACTORS:")
        if price_factors:
            note_lines.append(remove_links_keep_text(price_factors))
        return {
            "tag": cleanup_text(prefixed_value(block, "TAG:") or "Prices"),
            "title": cleanup_text(prefixed_value(block, "H2:") or ""),
            "rows": rows,
            "labourLine": remove_links_keep_text(prefixed_value(block, "LABOUR LINE:") or ""),
            "paragraphs": [line for line in note_lines if line],
            "cta": cleanup_text(prefixed_value(block, "CTA:", "CTA BUTTON:") or "Compare engine prices"),
        }

    def parse_failures(self, block: str) -> dict[str, Any]:
        items = []
        current: dict[str, str] | None = None
        for line in lines_of(block):
            stripped = line.strip()
            if not stripped:
                continue
            heading = extract_failure_heading(stripped)
            if heading:
                if current:
                    items.append(current)
                current = {"title": heading, "onset": "", "whatHappens": "", "repairVsReplace": ""}
                continue
            if not current:
                continue
            onset = prefixed_value(stripped, "Typical onset:", "Typical Mileage:")
            what_happens = prefixed_value(stripped, "What happens:")
            repair = prefixed_value(stripped, "Repair vs replace:", "Typical Repair Cost:")
            if onset is not None:
                current["onset"] = cleanup_text(onset)
            elif what_happens is not None:
                current["whatHappens"] = remove_links_keep_text(what_happens)
            elif repair is not None:
                current["repairVsReplace"] = remove_links_keep_text(repair)
            elif stripped.startswith("→") and current["repairVsReplace"]:
                current["repairVsReplace"] = cleanup_text(f"{current['repairVsReplace']} {remove_links_keep_text(stripped)}")
        if current:
            items.append(current)
        return {
            "tag": cleanup_text(prefixed_value(block, "TAG:") or "Known Problems"),
            "title": cleanup_text(prefixed_value(block, "H2:") or ""),
            "items": items,
            "goodYearsLine": remove_links_keep_text(prefixed_value(block, "GOOD-YEARS LINE:", "**Good-Years Note:**") or ""),
            "cta": cleanup_text(prefixed_value(block, "CTA:") or "Compare quotes"),
        }

    def parse_variants(self, block: str, related: dict[str, Any]) -> dict[str, Any]:
        paragraph_lines = []
        closing = ""
        for line in lines_of(block):
            stripped = clean_prefixed_line(line)
            if not stripped or stripped.startswith("TAG:") or stripped.startswith("H2:"):
                continue
            if "Not sure" in stripped or "HOW TO CONFIRM YOUR CODE:" in stripped:
                closing = cleanup_text(stripped.split(":", 1)[-1] if ":" in stripped else stripped)
                continue
            if stripped.startswith("H4:") or stripped.startswith("#### "):
                continue
            paragraph_lines.append(remove_links_keep_text(stripped))

        relatives = []
        seen_codes: set[str] = set()
        for item in related["items"]:
            code = cleanup_text(item["code"])
            if not code or code.lower() in {"none", "n/a", "unknown"} or code in seen_codes:
                continue
            relative = {"code": code, "description": item.get("description", "")}
            if item.get("href") and item["href"] != "#":
                relative["href"] = item["href"]
            relatives.append(relative)
            seen_codes.add(code)

        if not relatives:
            current_code = self.infer_engine_code()
            for line in paragraph_lines:
                for match in CODE_TOKEN_RE.findall(line):
                    code = cleanup_text(match)
                    if code == current_code or code in seen_codes or not any(char.isdigit() for char in code):
                        continue
                    relatives.append({"code": code, "description": cleanup_text(line)})
                    seen_codes.add(code)
                    if len(relatives) >= 4:
                        break
                if len(relatives) >= 4:
                    break

        intro = paragraph_lines[0] if paragraph_lines else ""
        if len(paragraph_lines) > 1:
            intro = " ".join(paragraph_lines[:-1])
        return {
            "tag": cleanup_text(prefixed_value(block, "TAG:") or "Engine Variants"),
            "title": cleanup_text(prefixed_value(block, "H2:") or ""),
            "intro": intro,
            "relatives": relatives,
            "closing": closing or (paragraph_lines[-1] if paragraph_lines else ""),
        }

    def parse_buying_guide(self, block: str) -> dict[str, Any]:
        options = []
        for label in ("USED", "RECONDITIONED", "REBUILT"):
            raw = prefixed_value(block, f"{label}:")
            if not raw:
                self.warning(f"buying guide missing {label.lower()} option")
                continue
            href = extract_inline_href(raw, label.lower())
            if href == "#":
                self.warning(f"buying guide {label.lower()} option missing explicit href")
            options.append({"label": label.title(), "body": remove_links_keep_text(raw), "href": href})

        supply_fit = prefixed_value(block, "SUPPLY & FIT:", "SUPPLY & FIT LINE:") or ""
        supply_fit_href = extract_inline_href(supply_fit, "supply & fit")
        if supply_fit and supply_fit_href == "#":
            self.warning("buying guide supply and fit link missing explicit href")

        return {
            "tag": cleanup_text(prefixed_value(block, "TAG:") or "Buying Guide"),
            "title": cleanup_text(prefixed_value(block, "H2:") or ""),
            "options": options,
            "supplyFitLine": remove_links_keep_text(supply_fit),
            "vehicleValueNote": cleanup_text(prefixed_value(block, "VEHICLE VALUE NOTE:") or ""),
            "cta": cleanup_text(prefixed_value(block, "CTA BUTTON:") or "Compare engine prices"),
        }

    def parse_related(self, block: str) -> dict[str, Any]:
        items = []
        for line in lines_of(block):
            stripped = clean_prefixed_line(line)
            match = RELATED_RE.match(stripped)
            if not match:
                continue
            relation = cleanup_text(match.group(1)).title()
            raw = match.group(2)
            href = extract_inline_href(raw)
            links = markdown_links(raw)

            if links:
                code = cleanup_text(links[0]["label"])
                remainder = remove_links_keep_text(LINK_RE.sub("", raw))
            else:
                parts = re.split(r"\s+[—-]\s+", remove_links_keep_text(raw), maxsplit=1)
                code = cleanup_text(parts[0])
                remainder = cleanup_text(parts[1]) if len(parts) > 1 else ""

            code = code.strip("[] ").lstrip("- ").strip()
            if not any(char.isdigit() for char in code):
                token_matches = [token for token in CODE_TOKEN_RE.findall(code) if any(char.isdigit() for char in token)]
                if token_matches:
                    code = cleanup_text(token_matches[0])
            if code.lower() in {"none", "n/a", "na"}:
                href = "#"

            if href == "#" and "LINK PENDING" in raw and code and code.lower() not in {"none", "n/a", "na"}:
                self.warning(f"related {relation.lower()} link pending for {code or 'unknown code'}")

            items.append({"relation": relation, "code": code or "Unknown", "href": href, "description": remainder})

        return {
            "tag": cleanup_text(prefixed_value(block, "TAG:") or "Related Engines"),
            "title": cleanup_text(prefixed_value(block, "H2:") or ""),
            "items": items,
        }

    def parse_faq(self, block: str) -> dict[str, Any]:
        items = []
        current: dict[str, Any] | None = None
        for line in lines_of(block):
            stripped = line.strip()
            if not stripped:
                continue
            q_match = QUESTION_RE.match(clean_prefixed_line(stripped))
            if q_match:
                if current:
                    items.append(current)
                current = {"question": cleanup_text(q_match.group(2)), "answer": "", "bullets": []}
                continue
            if stripped.startswith("**") and stripped.endswith("**") and "?" in stripped:
                if current:
                    items.append(current)
                current = {"question": strip_bold(stripped), "answer": "", "bullets": []}
                continue
            if not current:
                continue
            if stripped.startswith("- "):
                current["bullets"].append(cleanup_text(stripped[2:]))
            elif not current["answer"]:
                current["answer"] = remove_links_keep_text(stripped)
            else:
                current["answer"] = cleanup_text(f"{current['answer']} {remove_links_keep_text(stripped)}")
        if current:
            items.append(current)
        return {"tag": cleanup_text(prefixed_value(block, "TAG:") or "FAQ"), "title": cleanup_text(prefixed_value(block, "H2:") or ""), "items": items}

    def parse_trust_cta(self, block: str) -> dict[str, Any]:
        lines = [clean_prefixed_line(line) for line in lines_of(block)]
        bullets = [clean_label(line) for line in lines if line.startswith(("âœ…", "ðŸ”§", "ðŸšš", "ðŸ‘¥", "- "))]
        paragraph_parts = []
        for line in lines:
            if not line or line.startswith(("TAG:", "H2:", "CTA BUTTON:", "**[", "```", "***")):
                continue
            if line.startswith(("âœ…", "ðŸ”§", "ðŸšš", "ðŸ‘¥", "- ")):
                continue
            paragraph_parts.append(remove_links_keep_text(line))
        return {
            "tag": cleanup_text(prefixed_value(block, "TAG:") or "Why EnginesMarket"),
            "title": cleanup_text(prefixed_value(block, "H2:") or ""),
            "bullets": bullets,
            "paragraph": cleanup_text(" ".join(part for part in paragraph_parts if part)),
            "buttonText": cleanup_text(prefixed_value(block, "CTA BUTTON:") or "Get Free Engine Quotes"),
            "note": "Secure enquiry - no spam. Quotes only from vetted UK engine specialists.",
        }

    def parse_seo(self, brand_slug: str, engine_slug: str) -> dict[str, str]:
        meta_title = prefixed_value(self.raw, "META TITLE:")
        meta_description = prefixed_value(self.raw, "META DESCRIPTION:")
        canonical = prefixed_value(self.raw, "CANONICAL URL:")
        return {
            "title": cleanup_text(meta_title or ""),
            "description": cleanup_text(meta_description or ""),
            "canonical": strip_domain(canonical or f"/{brand_slug}/{engine_slug}"),
        }

    def parse_structured_data(self, warn_if_missing: bool = True) -> Any | None:
        match = SCRIPT_RE.search(self.raw) or FENCED_JSON_RE.search(self.raw)
        if not match:
            if warn_if_missing:
                self.warning("structured data script block missing")
            return None
        payload = match.group(1)
        try:
            return json.loads(payload)
        except json.JSONDecodeError as exc:
            self.warning(f"structured data json parse failed: {exc.msg}")
            return None

    def parse_markdown_specs(self, block: str, heading: str) -> dict[str, Any]:
        specs = []
        for row in split_pipe_table_rows("TABLE:\n" + block):
            if len(row) < 2 or row[0].lower() in {"spec", "specification"}:
                continue
            specs.append({"label": strip_bold(row[0]), "value": remove_links_keep_text(row[1])})
        return {"tag": "Key Specs", "title": heading, "specs": specs}

    def parse_markdown_compatibility(self, block: str, heading: str) -> dict[str, Any]:
        intro = ""
        rows = []
        for line in lines_of(block):
            stripped = line.strip()
            if not stripped or stripped == "---":
                continue
            if "|" in stripped:
                parts = [cleanup_text(part) for part in stripped.strip("|").split("|")]
                if parts[0].lower() == "model":
                    continue
                if len(parts) >= 3:
                    rows.append(
                        {
                            "model": remove_links_keep_text(parts[0]),
                            "generation": parts[1],
                            "badges": "",
                            "years": parts[2],
                            "links": markdown_links(parts[0]),
                        }
                    )
                continue
            if not intro:
                intro = remove_links_keep_text(stripped)
        return {
            "tag": "Fitted To",
            "title": heading,
            "intro": intro,
            "rows": rows,
            "closing": "Enter your registration above and we will confirm the exact fitment before any quotes are sent.",
        }

    def parse_markdown_cost(self, block: str, heading: str) -> dict[str, Any]:
        intro = ""
        rows = []
        labour_hours = ""
        labour_premium = ""
        total_fitted = ""
        paragraphs = []
        for line in lines_of(block):
            stripped = line.strip()
            if not stripped or stripped == "---":
                continue
            if "|" in stripped:
                parts = [cleanup_text(part) for part in stripped.strip("|").split("|")]
                if parts[0].lower() == "condition":
                    continue
                if len(parts) >= 3:
                    rows.append(
                        {
                            "condition": strip_bold(parts[0]).replace(" Engines", ""),
                            "supplyOnly": remove_links_keep_text(parts[1]),
                            "fitted": "Add labour premium",
                            "warranty": "Check supplier",
                        }
                    )
                continue
            plain = clean_prefixed_line(stripped)
            if plain.startswith("- R&R Labour Hours:"):
                labour_hours = cleanup_text(plain.split(":", 1)[1])
                continue
            if plain.startswith("- Typical Fitted Premium"):
                labour_premium = cleanup_text(plain.split(":", 1)[1])
                continue
            if plain.startswith("- Total Fitted Cost"):
                total_fitted = cleanup_text(plain.split(":", 1)[1])
                continue
            if plain.startswith("- "):
                paragraphs.append(remove_links_keep_text(plain[2:]))
                continue
            if plain.startswith("Labour & Fitted Costs") or plain.startswith("Price Factors"):
                continue
            if not intro:
                intro = remove_links_keep_text(stripped)
            else:
                paragraphs.append(remove_links_keep_text(stripped))

        for row in rows:
            label = row["condition"].lower()
            if label.startswith("reconditioned") and total_fitted:
                row["fitted"] = total_fitted
                row["warranty"] = "12-month warranty typical"
            elif labour_premium:
                row["fitted"] = f"Supply + {labour_premium}"
            else:
                row["fitted"] = "Supply + labour"

        paragraph_lines = [intro] if intro else []
        paragraph_lines.extend(paragraphs)
        labour_line_parts = [part for part in [labour_hours, labour_premium, total_fitted] if part]
        return {
            "tag": "Prices",
            "title": heading,
            "rows": rows,
            "labourLine": " | ".join(labour_line_parts),
            "paragraphs": [remove_links_keep_text(line) for line in paragraph_lines if line],
            "cta": f"Compare {self.infer_engine_code()} Engine Prices",
        }

    def parse_markdown_failures(self, block: str, heading: str) -> dict[str, Any]:
        intro = ""
        items = []
        current: dict[str, str] | None = None
        for line in lines_of(block):
            stripped = line.strip()
            if not stripped or stripped == "---":
                continue
            heading_value = extract_failure_heading(stripped)
            if heading_value:
                if current:
                    items.append(current)
                current = {"title": heading_value, "onset": "", "whatHappens": "", "repairVsReplace": ""}
                continue
            if not current:
                if not intro:
                    intro = remove_links_keep_text(stripped)
                continue
            onset = prefixed_value(stripped, "- Typical Mileage:", "Typical Mileage:")
            repair = prefixed_value(stripped, "- Typical Repair Cost:", "Typical Repair Cost:")
            if onset is not None:
                current["onset"] = cleanup_text(onset)
            elif repair is not None:
                current["repairVsReplace"] = cleanup_text(f"Typical repair cost: {repair}")
            elif stripped.startswith("For comprehensive guides"):
                continue
            elif not current["whatHappens"]:
                current["whatHappens"] = remove_links_keep_text(stripped)
            else:
                current["repairVsReplace"] = cleanup_text(f"{current['repairVsReplace']} {remove_links_keep_text(stripped)}")
        if current:
            items.append(current)
        return {
            "tag": "Known Problems",
            "title": heading,
            "items": items,
            "goodYearsLine": "",
            "cta": f"Compare rebuilt {self.infer_engine_code()} prices",
        }

    def parse_markdown_variants(self, block: str, heading: str, related_section: dict[str, Any]) -> dict[str, Any]:
        paragraphs = []
        closing = ""
        for line in lines_of(block):
            stripped = line.strip()
            if not stripped or stripped == "---":
                continue
            plain = clean_prefixed_line(stripped)
            if plain.startswith("Where to Find"):
                continue
            if plain.startswith("- "):
                paragraphs.append(strip_bold(plain[2:]))
                continue
            if plain.lower().startswith("always source") or plain.lower().startswith("enter your registration"):
                closing = remove_links_keep_text(plain)
                continue
            paragraphs.append(remove_links_keep_text(plain))
        relatives = []
        for item in related_section["items"]:
            relative = {"code": item["code"], "description": item["description"]}
            if item.get("href") and item["href"] != "#":
                relative["href"] = item["href"]
            relatives.append(relative)
        return {
            "tag": "Engine Variants",
            "title": heading,
            "intro": " ".join(paragraphs[:2]).strip(),
            "relatives": relatives,
            "closing": closing or (" ".join(paragraphs[2:]).strip() if len(paragraphs) > 2 else ""),
        }

    def parse_markdown_buying(self, block: str, heading: str) -> dict[str, Any]:
        options = []
        current_label: str | None = None
        current_body: list[str] = []
        supply_fit_line = ""
        vehicle_value_note = ""

        def flush_option() -> None:
            nonlocal current_label, current_body
            if not current_label:
                return
            body = " ".join(current_body).strip()
            options.append({"label": current_label, "body": body, "href": extract_inline_href(body, current_label.lower())})
            current_label = None
            current_body = []

        for line in lines_of(block):
            stripped = line.strip()
            if not stripped or stripped == "---":
                continue
            plain = clean_prefixed_line(stripped)
            lowered = plain.lower()
            if lowered.startswith("used"):
                flush_option()
                current_label = "Used"
                continue
            if lowered.startswith("reconditioned"):
                flush_option()
                current_label = "Reconditioned"
                continue
            if lowered.startswith("rebuilt"):
                flush_option()
                current_label = "Rebuilt"
                continue
            if "preventative maintenance" in lowered:
                flush_option()
                continue
            if "mandatory vehicle value note" in lowered:
                flush_option()
                continue
            if lowered.startswith("need a complete solution?"):
                flush_option()
                supply_fit_line = remove_links_keep_text(plain)
                continue
            if "replacement-to-value flag" in lowered or "[third-party]" in lowered or vehicle_value_note:
                vehicle_value_note = cleanup_text(f"{vehicle_value_note} {remove_links_keep_text(plain)}")
                continue
            if current_label:
                current_body.append(remove_links_keep_text(plain))

        flush_option()

        for option in options:
            if option["href"] == "#":
                self.warning(f"buying guide {option['label'].lower()} option missing explicit href")
        if supply_fit_line and extract_inline_href(supply_fit_line, "supply & fit") == "#":
            self.warning("buying guide supply and fit link missing explicit href")

        return {
            "tag": "Buying Guide",
            "title": heading,
            "options": options,
            "supplyFitLine": supply_fit_line,
            "vehicleValueNote": vehicle_value_note,
            "cta": f"Compare {self.infer_engine_code()} Engine Prices Now",
        }

    def parse_markdown_related(self, block: str, heading: str) -> dict[str, Any]:
        items = []
        current_relation = ""
        current_code = ""
        current_description = ""
        current_href = "#"
        for line in lines_of(block):
            stripped = line.strip()
            if not stripped or stripped == "---":
                continue
            if stripped.startswith("*"):
                if current_relation:
                    items.append(
                        {
                            "relation": current_relation,
                            "code": current_code,
                            "href": current_href,
                            "description": current_description,
                        }
                    )
                bullet = stripped.lstrip("* ").strip()
                match = re.match(r"\*\*(.+?):\s*(.+?)\*\*", bullet)
                if match:
                    current_relation = cleanup_text(match.group(1))
                    current_code = remove_links_keep_text(match.group(2))
                else:
                    current_relation = "Related"
                    current_code = remove_links_keep_text(bullet)
                current_description = ""
                current_href = extract_inline_href(bullet)
                continue
            current_description = cleanup_text(f"{current_description} {remove_links_keep_text(stripped)}")
        if current_relation:
            items.append({"relation": current_relation, "code": current_code, "href": current_href, "description": current_description})
        return {"tag": "Related Engines", "title": heading, "items": items}

    def parse_markdown_faq(self, block: str, heading: str) -> dict[str, Any]:
        items = []
        current: dict[str, Any] | None = None
        for line in lines_of(block):
            stripped = line.strip()
            if not stripped or stripped == "---":
                continue
            if stripped.startswith("**") and stripped.endswith("**"):
                if current:
                    items.append(current)
                current = {"question": strip_bold(stripped), "answer": ""}
                continue
            if current and not current["answer"]:
                current["answer"] = remove_links_keep_text(stripped)
            elif current:
                current["answer"] = cleanup_text(f"{current['answer']} {remove_links_keep_text(stripped)}")
        if current:
            items.append(current)
        return {"tag": "FAQ", "title": heading, "items": items}

    def parse_markdown_trust(self, block: str, heading: str, engine_code: str) -> dict[str, Any]:
        paragraphs = []
        button_text = f"Get Free {engine_code} Engine Quotes"
        for line in lines_of(block):
            stripped = line.strip()
            if not stripped or stripped == "---":
                continue
            if stripped.startswith("```") or stripped.startswith("***"):
                break
            if stripped.startswith("**[Get My"):
                button_text = remove_links_keep_text(stripped)
                continue
            if stripped.startswith("**[Enter Registration]**"):
                continue
            paragraphs.append(remove_links_keep_text(stripped))
        return {
            "tag": "Why EnginesMarket",
            "title": heading,
            "bullets": [
                f"Vetted UK specialists who know the {engine_code} and its replacement risks",
                f"Minimum 12-month warranty on reconditioned and rebuilt {engine_code} options",
                "Nationwide delivery with supply-only or supply and fit availability",
            ],
            "paragraph": cleanup_text(" ".join(paragraphs)),
            "buttonText": button_text,
            "note": "Secure enquiry - no spam. Quotes only from vetted UK engine specialists.",
        }

    def parse_markdown_hero(
        self,
        *,
        title: str,
        brand_name: str,
        brand_slug: str,
        engine_code: str,
        fuel: str,
        cost_rows: list[dict[str, str]],
    ) -> dict[str, Any]:
        hero_block = self.raw.split("##", 1)[0]
        lines = [line.strip() for line in lines_of(hero_block) if line.strip()]
        description_candidates = [
            remove_links_keep_text(line)
            for line in lines
            if not line.startswith("#")
            and not line.startswith("**[")
            and not line.startswith("Home >")
        ]
        description = description_candidates[0] if description_candidates else ""
        pills = [brand_name, engine_code]
        if fuel:
            pills.append(fuel)
        price_map = {row["condition"].title(): row["supplyOnly"] for row in cost_rows}
        prices = [
            {"label": "Used", "price": price_map.get("Used", "Check quotes"), "tone": "used"},
            {"label": "Reconditioned", "price": price_map.get("Reconditioned", "Check quotes"), "tone": "reconditioned"},
            {"label": "Rebuilt", "price": price_map.get("Rebuilt", "Check quotes"), "tone": "rebuilt"},
        ]
        return {
            "breadcrumbs": [
                {"label": f"{brand_name} Engines", "href": f"/{brand_slug}"},
                {"label": engine_code},
            ],
            "pills": pills,
            "title": title,
            "description": description,
            "trustBadges": [
                "Supply & Fit Available",
                "12-Month Warranty",
                "Nationwide Delivery",
                "100+ Suppliers",
            ],
            "prices": prices,
            "quoteCard": {
                "heading": "Get Your Engine Quote",
                "subtitle": "Enter your registration to confirm fitment and get exact prices",
                "countryCode": "GB",
                "placeholder": "Enter your reg - e.g. AB12 CDE",
                "buttonText": f"Compare {engine_code} Engine Prices",
                "note": "Secure enquiry - no spam. Quotes only from vetted UK engine specialists.",
            },
            "engineImage": {
                "src": guess_engine_image_src(fuel, title),
                "alt": f"{brand_name} {engine_code} engine replacement UK - reconditioned and rebuilt prices",
            },
        }

    def parse_markdown_seo(self, graph: list[Any], title: str, brand_slug: str, engine_slug: str) -> dict[str, str]:
        webpage = next(
            (item for item in graph if isinstance(item, dict) and item.get("@type") == "WebPage"),
            {},
        )
        seo_title = cleanup_text(str(webpage.get("name", ""))) or title
        seo_description = cleanup_text(str(webpage.get("description", ""))) or title
        canonical = strip_domain(str(webpage.get("url", f"/{brand_slug}/{engine_slug}")))
        return {"title": seo_title, "description": seo_description, "canonical": canonical}

    def synthesize_related(self, specs: dict[str, Any], variants: dict[str, Any]) -> dict[str, Any]:
        items: list[dict[str, str]] = []
        seen: set[tuple[str, str]] = set()

        for spec in specs.get("specs", []):
            relation = ""
            label = spec["label"].lower()
            if label == "replaced":
                relation = "Predecessor"
            elif label == "replaced by":
                relation = "Successor"
            if not relation:
                continue
            value = cleanup_text(spec["value"])
            code = cleanup_text(value.split("—", 1)[0].split("-", 1)[0])
            if not code or code.lower() in {"none", "n/a", "current generation"}:
                continue
            key = (relation, code)
            if key in seen:
                continue
            items.append({"relation": relation, "code": code, "href": "#", "description": value})
            seen.add(key)

        for relative in variants.get("relatives", []):
            code = cleanup_text(relative.get("code", ""))
            if not code:
                continue
            key = ("Sibling", code)
            if key in seen:
                continue
            items.append(
                {
                    "relation": "Sibling",
                    "code": code,
                    "href": relative.get("href", "#"),
                    "description": relative.get("description", ""),
                }
            )
            seen.add(key)

        return {"tag": "Related Engines", "title": "Related Engines", "items": items[:4]}

    def synthesize_buying_guide(self, cost_guide: dict[str, Any]) -> dict[str, Any]:
        engine_code = self.infer_engine_code()
        price_lookup = {row["condition"].lower(): row["supplyOnly"] for row in cost_guide.get("rows", [])}
        options = []
        for label, description in (
            ("Used", "Best for lower-value hosts with strong donor history and documented maintenance."),
            ("Reconditioned", "Usually the safest all-round choice because the common wear points are addressed before fitment."),
            ("Rebuilt", "Best where the original engine suffered major damage or long-term ownership justifies the extra spend."),
        ):
            options.append(
                {
                    "label": label,
                    "body": f"{label} {engine_code} options typically start from {price_lookup.get(label.lower(), 'market rates vary')}. {description}",
                    "href": SERVICE_PATHS[label.lower()],
                }
            )
        return {
            "tag": "Buying Guide",
            "title": f"Buying a Replacement {engine_code} - What to Choose",
            "options": options,
            "supplyFitLine": f"Our vetted network can also arrange nationwide supply and fit for the {engine_code}.",
            "vehicleValueNote": "",
            "cta": f"Compare {engine_code} Engine Prices Now",
        }

    def synthesize_faq(
        self,
        hero: dict[str, Any],
        cost_guide: dict[str, Any],
        variants: dict[str, Any],
        buying_guide: dict[str, Any],
    ) -> dict[str, Any]:
        engine_code = self.infer_engine_code()
        reconditioned_row = next((row for row in cost_guide.get("rows", []) if row["condition"].lower().startswith("reconditioned")), None)
        used_row = next((row for row in cost_guide.get("rows", []) if row["condition"].lower().startswith("used")), None)
        sibling_codes = ", ".join(relative["code"] for relative in variants.get("relatives", [])[:3])
        items = [
            {
                "question": f"How much does a reconditioned {engine_code} engine cost?",
                "answer": (
                    f"A reconditioned {engine_code} engine typically costs {reconditioned_row['supplyOnly']} supply-only."
                    if reconditioned_row
                    else f"Reconditioned {engine_code} pricing varies by supplier and spec."
                ),
            },
            {
                "question": f"How much does a used {engine_code} engine cost?",
                "answer": (
                    f"Used {engine_code} engines usually start from {used_row['supplyOnly']} depending on mileage and provenance."
                    if used_row
                    else f"Used {engine_code} engine prices vary with mileage, service history, and donor condition."
                ),
            },
            {
                "question": f"What should I check before buying a {engine_code} replacement?",
                "answer": buying_guide.get("vehicleValueNote")
                or "Confirm the exact engine code, donor history, warranty terms, and whether the common failure points have already been addressed.",
            },
        ]
        if sibling_codes:
            items.append(
                {
                    "question": f"Can I swap another engine code in place of {engine_code}?",
                    "answer": f"Always verify the exact code before ordering. Common related codes include {sibling_codes}, but calibration, ancillaries, and emissions hardware can differ.",
                }
            )
        return {"tag": "FAQ", "title": f"{engine_code} - Frequently Asked Questions", "items": items}

    def synthesize_trust_cta(self, hero: dict[str, Any], buying_guide: dict[str, Any]) -> dict[str, Any]:
        engine_code = self.infer_engine_code()
        return {
            "tag": "Why EnginesMarket",
            "title": f"Compare {engine_code} Engine Prices Today",
            "bullets": [
                f"Vetted UK specialists for {engine_code} replacements",
                "Minimum 12-month warranty on reconditioned and rebuilt options",
                "Nationwide delivery plus supply and fit availability",
            ],
            "paragraph": buying_guide.get("vehicleValueNote") or hero.get("description", ""),
            "buttonText": hero.get("quoteCard", {}).get("buttonText", f"Compare {engine_code} Engine Prices"),
            "note": "Secure enquiry - no spam. Quotes only from vetted UK engine specialists.",
        }

    def build_fallback_structured_data(self, data: dict[str, Any]) -> dict[str, Any]:
        brand_slug = data["brand"]["slug"]
        engine_code = data["engine"]["code"]
        canonical_path = data["seo"]["canonical"]
        canonical_url = f"https://enginesmarket.co.uk{canonical_path}"
        hero = data["sections"]["hero"]
        compatibility_rows = data["sections"]["compatibility"].get("rows", [])
        faq_rows = data["sections"]["faq"].get("items", [])

        graph: list[dict[str, Any]] = [
            {
                "@type": "WebPage",
                "@id": f"{canonical_url}#webpage",
                "url": canonical_url,
                "name": data["seo"]["title"] or hero["title"],
                "description": data["seo"]["description"] or hero["description"],
                "isPartOf": {"@id": "https://enginesmarket.co.uk/#website"},
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://enginesmarket.co.uk/"},
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": data["brand"]["name"],
                        "item": f"https://enginesmarket.co.uk/{brand_slug}/",
                    },
                    {"@type": "ListItem", "position": 3, "name": f"{engine_code} Engine", "item": canonical_url},
                ],
            },
            {
                "@type": "Service",
                "serviceType": f"{data['brand']['name']} {engine_code} Engine Replacement",
                "provider": {"@type": "Organization", "name": "EnginesMarket.co.uk", "url": "https://enginesmarket.co.uk"},
                "areaServed": "United Kingdom",
                "description": hero["description"],
            },
        ]

        if faq_rows:
            graph.append(
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": item["question"],
                            "acceptedAnswer": {"@type": "Answer", "text": item["answer"]},
                        }
                        for item in faq_rows
                    ],
                }
            )

        if compatibility_rows:
            graph.append(
                {
                    "@type": "ItemList",
                    "itemListElement": [
                        {"@type": "ListItem", "position": index + 1, "name": row["model"]}
                        for index, row in enumerate(compatibility_rows[:10])
                    ],
                }
            )

        return {"@context": "https://schema.org", "@graph": graph}

    def sanitize_payload(self, value: Any) -> Any:
        if isinstance(value, dict):
            cleaned: dict[str, Any] = {}
            for key, item in value.items():
                if isinstance(item, str) and key in {"href", "canonical"}:
                    cleaned[key] = normalize_href(item)
                elif isinstance(item, str) and key in {"url", "@id", "item"}:
                    cleaned[key] = item.strip()
                else:
                    cleaned[key] = self.sanitize_payload(item)
            return cleaned
        if isinstance(value, list):
            return [self.sanitize_payload(item) for item in value]
        if isinstance(value, str):
            return cleanup_text(value)
        return value

    def scan_quality_signals(self) -> None:
        return


def _patched_parse_variants(self: "EnginePageParser", block: str, related: dict[str, Any]) -> dict[str, Any]:
    paragraph_lines: list[str] = []
    closing = ""
    for line in lines_of(block):
        stripped = clean_prefixed_line(decode_source_text(line))
        if not stripped or stripped.startswith("TAG:") or stripped.startswith("H2:"):
            continue
        if INTERNAL_TRAILER_RE.search(stripped) or stripped.startswith("# META"):
            continue
        if "Not sure" in stripped or "HOW TO CONFIRM YOUR CODE:" in stripped:
            closing = cleanup_text(stripped.split(":", 1)[-1] if ":" in stripped else stripped)
            continue
        if stripped.startswith("H4:") or stripped.startswith("#### "):
            continue
        paragraph_lines.append(remove_links_keep_text(stripped))

    relatives = []
    seen_codes: set[str] = set()
    for item in related["items"]:
        code = cleanup_text(item["code"])
        if not code or code.lower() in {"none", "n/a", "unknown"} or code in seen_codes:
            continue
        relative = {"code": code, "description": item.get("description", "")}
        if item.get("href") and item["href"] != "#":
            relative["href"] = item["href"]
        relatives.append(relative)
        seen_codes.add(code)

    if not relatives:
        current_code = self.infer_engine_code()
        for line in paragraph_lines:
            for match in CODE_TOKEN_RE.findall(line):
                code = cleanup_text(match)
                if code == current_code or code in seen_codes or not any(char.isdigit() for char in code):
                    continue
                relatives.append({"code": code, "description": cleanup_text(line)})
                seen_codes.add(code)
                if len(relatives) >= 4:
                    break
            if len(relatives) >= 4:
                break

    intro = paragraph_lines[0] if paragraph_lines else ""
    if len(paragraph_lines) > 1:
        intro = " ".join(paragraph_lines[:-1])
    return {
        "tag": cleanup_text(prefixed_value(block, "TAG:") or "Engine Variants"),
        "title": cleanup_text(prefixed_value(block, "H2:") or ""),
        "intro": intro,
        "relatives": relatives,
        "closing": closing or (paragraph_lines[-1] if paragraph_lines else ""),
    }


def _patched_parse_markdown_variants(
    self: "EnginePageParser", block: str, heading: str, related_section: dict[str, Any]
) -> dict[str, Any]:
    paragraphs = []
    closing = ""
    for line in lines_of(block):
        stripped = line.strip()
        if not stripped or stripped == "---":
            continue
        plain = clean_prefixed_line(decode_source_text(stripped))
        if INTERNAL_TRAILER_RE.search(plain) or plain.startswith("# META"):
            continue
        if plain.startswith("Where to Find"):
            continue
        if plain.startswith("- "):
            paragraphs.append(strip_bold(plain[2:]))
            continue
        if plain.lower().startswith("always source") or plain.lower().startswith("enter your registration"):
            closing = remove_links_keep_text(plain)
            continue
        paragraphs.append(remove_links_keep_text(plain))
    relatives = []
    for item in related_section["items"]:
        relative = {"code": item["code"], "description": item["description"]}
        if item.get("href") and item["href"] != "#":
            relative["href"] = item["href"]
        relatives.append(relative)
    return {
        "tag": "Engine Variants",
        "title": heading,
        "intro": " ".join(paragraphs[:2]).strip(),
        "relatives": relatives,
        "closing": closing or (" ".join(paragraphs[2:]).strip() if len(paragraphs) > 2 else ""),
    }


def _patched_parse_trust_cta(self: "EnginePageParser", block: str) -> dict[str, Any]:
    lines = [clean_prefixed_line(decode_source_text(line)) for line in lines_of(block)]
    bullets: list[str] = []
    paragraph_parts: list[str] = []
    for line in lines:
        if not line or line.startswith(("TAG:", "H2:", "CTA BUTTON:", "**[", "```", "***")):
            continue
        if INTERNAL_TRAILER_RE.search(line) and "TRUST POINTS:" not in line.upper():
            continue
        if "TRUST POINTS:" in line.upper():
            bullets.extend(extract_trust_bullets(line))
            paragraph = extract_trust_paragraph(line)
            if paragraph:
                paragraph_parts.append(paragraph)
            continue
        if line.startswith(("✅", "🔧", "🚚", "👥", "- ")):
            bullets.append(clean_label(line))
            continue
        paragraph_parts.append(remove_links_keep_text(line))
    return {
        "tag": cleanup_text(prefixed_value(block, "TAG:") or "Why EnginesMarket"),
        "title": cleanup_text(prefixed_value(block, "H2:") or ""),
        "bullets": bullets,
        "paragraph": cleanup_text(" ".join(part for part in paragraph_parts if part)),
        "buttonText": cleanup_text(prefixed_value(block, "CTA BUTTON:") or "Get Free Engine Quotes"),
        "note": "Secure enquiry - no spam. Quotes only from vetted UK engine specialists.",
    }


BUYING_GUIDE_LABEL_RE = re.compile(
    r"(?mi)^\s*\*{0,2}(USED|RECONDITIONED|REBUILT|NEW|SUPPLY\s*&\s*FIT(?:\s+LINE)?|VEHICLE VALUE NOTE|CTA BUTTON)\*{0,2}:\s*"
)
MARKDOWN_RELATED_LINE_RE = re.compile(
    r"^\*{0,2}(Predecessor|Successor|Sibling|Cross(?:[\u2010-\u2015-]Brand(?:\s+(?:Twin|Context))?))\s*[—-]\s*(.+?)\*{0,2}\s*[—-]\s*(.+)$",
    re.IGNORECASE,
)


def _normalize_buying_label(label: str) -> str:
    cleaned = cleanup_text(label).upper()
    if cleaned.startswith("SUPPLY & FIT"):
        return "SUPPLY & FIT LINE"
    return cleaned


def _split_buying_guide_entries(block: str) -> dict[str, str]:
    text = decode_source_text(block)
    matches = list(BUYING_GUIDE_LABEL_RE.finditer(text))
    entries: dict[str, str] = {}
    for index, match in enumerate(matches):
        label = _normalize_buying_label(match.group(1))
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        entries[label] = text[start:end].strip()
    return entries


def _maybe_repair_merged_buying_guide(
    self: "EnginePageParser", entries: dict[str, str]
) -> dict[str, str]:
    repaired = dict(entries)
    used_raw = repaired.get("USED", "")
    if "RECONDITIONED" not in repaired and "Compare reconditioned" in used_raw:
        split_markers = (
            "this engine's known weak points:",
            "This effectively resets the engine's reliability clock",
        )
        split_index = -1
        marker_used = ""
        lowered = used_raw.lower()
        for marker in split_markers:
            split_index = lowered.find(marker.lower())
            if split_index != -1:
                marker_used = marker
                break
        if split_index != -1:
            used_text = used_raw[:split_index].strip()
            if "[Explore" in used_text:
                used_text = used_text.split("[Explore", 1)[0].strip()
            repaired["USED"] = used_text
            recon_tail = used_raw[split_index:].strip()
            if marker_used == "this engine's known weak points:":
                brand_name = cleanup_text(self.path.parent.name)
                engine_code = self.infer_engine_code()
                recon_tail = (
                    f"A reconditioned {brand_name} {engine_code} engine should specifically address {recon_tail}"
                )
            repaired["RECONDITIONED"] = recon_tail
    return repaired


def _repatched_parse_buying_guide(self: "EnginePageParser", block: str) -> dict[str, Any]:
    entries = _maybe_repair_merged_buying_guide(self, _split_buying_guide_entries(block))
    options: list[dict[str, str]] = []

    for label in ("USED", "RECONDITIONED"):
        raw = entries.get(label, "")
        if not raw:
            self.warning(f"buying guide missing {label.lower()} option")
            continue
        href = extract_inline_href(raw, label.lower())
        if href == "#":
            self.warning(f"buying guide {label.lower()} option missing explicit href")
        options.append({"label": label.title(), "body": remove_links_keep_text(raw), "href": href})

    top_tier_found = False
    for label in ("REBUILT", "NEW"):
        raw = entries.get(label, "")
        if not raw:
            continue
        top_tier_found = True
        href = extract_inline_href(raw, label.lower())
        if href == "#":
            self.warning(f"buying guide {label.lower()} option missing explicit href")
        options.append({"label": label.title(), "body": remove_links_keep_text(raw), "href": href})

    if not top_tier_found:
        self.warning("buying guide missing rebuilt option")

    supply_fit = entries.get("SUPPLY & FIT LINE", "")
    supply_fit_href = extract_inline_href(supply_fit, "supply & fit")
    if supply_fit and supply_fit_href == "#":
        self.warning("buying guide supply and fit link missing explicit href")

    return {
        "tag": cleanup_text(prefixed_value(block, "TAG:") or "Buying Guide"),
        "title": cleanup_text(prefixed_value(block, "H2:") or ""),
        "options": options,
        "supplyFitLine": remove_links_keep_text(supply_fit),
        "vehicleValueNote": cleanup_text(entries.get("VEHICLE VALUE NOTE", "")),
        "cta": cleanup_text(entries.get("CTA BUTTON", "Compare engine prices")),
    }


def _parse_related_line(self: "EnginePageParser", line: str) -> dict[str, str] | None:
    stripped = clean_prefixed_line(decode_source_text(line))
    if not stripped:
        return None

    classic_match = RELATED_RE.match(stripped)
    if classic_match:
        relation = cleanup_text(classic_match.group(1)).title()
        raw = classic_match.group(2)
    else:
        markdown_match = MARKDOWN_RELATED_LINE_RE.match(stripped)
        if not markdown_match:
            return None
        relation = cleanup_text(markdown_match.group(1)).replace("Brand", "-Brand").title()
        raw = f"{markdown_match.group(2)} - {markdown_match.group(3)}"

    href = extract_inline_href(raw)
    links = markdown_links(raw)
    if links:
        code = cleanup_text(links[0]["label"])
        remainder = remove_links_keep_text(LINK_RE.sub("", raw))
    else:
        parts = re.split(r"\s+[—-]\s+", remove_links_keep_text(raw), maxsplit=1)
        code = cleanup_text(parts[0])
        remainder = cleanup_text(parts[1]) if len(parts) > 1 else ""

    code = code.strip("[] ").lstrip("- ").strip()
    if not any(char.isdigit() for char in code):
        token_matches = [token for token in CODE_TOKEN_RE.findall(code) if any(char.isdigit() for char in token)]
        if token_matches:
            code = cleanup_text(token_matches[0])
    if code.lower() in {"none", "n/a", "na"}:
        href = "#"

    if href == "#" and "LINK PENDING" in raw and code and code.lower() not in {"none", "n/a", "na"}:
        self.warning(f"related {relation.lower()} link pending for {code or 'unknown code'}")

    return {"relation": relation, "code": code or "Unknown", "href": href, "description": remainder}


def _repatched_parse_related(self: "EnginePageParser", block: str) -> dict[str, Any]:
    items = []
    for line in lines_of(block):
        parsed = _parse_related_line(self, line)
        if parsed:
            items.append(parsed)

    return {
        "tag": cleanup_text(prefixed_value(block, "TAG:") or "Related Engines"),
        "title": cleanup_text(prefixed_value(block, "H2:") or ""),
        "items": items,
    }


def _repatched_parse_trust_cta(self: "EnginePageParser", block: str) -> dict[str, Any]:
    lines = [clean_prefixed_line(decode_source_text(line)) for line in lines_of(block)]
    bullets: list[str] = []
    paragraph_parts: list[str] = []
    for line in lines:
        if not line or line.startswith(("TAG:", "H2:", "CTA BUTTON:", "**[", "```", "***")):
            continue
        if line.startswith("<script") or line.startswith("{"):
            break
        if INTERNAL_TRAILER_RE.search(line):
            if "TRUST POINTS:" not in line.upper():
                break
            line = re.split(INTERNAL_TRAILER_RE, line, maxsplit=1, flags=re.IGNORECASE)[0].strip()
        if "TRUST POINTS:" in line.upper():
            bullets.extend(
                bullet for bullet in extract_trust_bullets(line) if bullet and bullet.upper() != "TRUST POINTS:"
            )
            paragraph = extract_trust_paragraph(line)
            if paragraph:
                paragraph_parts.append(paragraph)
            continue
        if line.startswith(("âœ…", "ðŸ”§", "ðŸšš", "ðŸ‘¥", "- ")):
            bullets.append(clean_label(line))
            continue
        paragraph_parts.append(remove_links_keep_text(line))
    return {
        "tag": cleanup_text(prefixed_value(block, "TAG:") or "Why EnginesMarket"),
        "title": cleanup_text(prefixed_value(block, "H2:") or ""),
        "bullets": bullets,
        "paragraph": cleanup_text(" ".join(part for part in paragraph_parts if part)),
        "buttonText": cleanup_text(prefixed_value(block, "CTA BUTTON:") or "Get Free Engine Quotes"),
        "note": "Secure enquiry - no spam. Quotes only from vetted UK engine specialists.",
    }


EnginePageParser.parse_variants = _patched_parse_variants
EnginePageParser.parse_markdown_variants = _patched_parse_markdown_variants
EnginePageParser.parse_trust_cta = _repatched_parse_trust_cta
EnginePageParser.parse_buying_guide = _repatched_parse_buying_guide
EnginePageParser.parse_related = _repatched_parse_related


def collect_files(input_dir: Path) -> list[Path]:
    return sorted(path for path in input_dir.rglob("*.txt") if path.is_file())


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def build_warning_summary(file_warnings: dict[str, list[str]]) -> dict[str, Any]:
    counter = Counter()
    for warnings in file_warnings.values():
        for warning in warnings:
            counter[warning] += 1
    return {"files_with_warnings": len(file_warnings), "warning_counts": dict(counter.most_common())}


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract engine page docs into data/engines JSON.")
    parser.add_argument("input_dir", help="Directory containing engine page txt files")
    parser.add_argument("--output-dir", default="data/engines", help="Destination directory for generated engine JSON files")
    parser.add_argument(
        "--batch-name",
        default="em-engine-pages-2026-07-29",
        help="Batch folder name used for warning output",
    )
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parent.parent
    input_dir = Path(args.input_dir)
    output_dir = (repo_root / args.output_dir).resolve()
    batch_dir = output_dir / "_import_batches" / args.batch_name

    files = collect_files(input_dir)
    if not files:
        print(f"No input files found in {input_dir}")
        return 1

    generated = 0
    skipped_duplicates = []
    file_warnings: dict[str, list[str]] = {}
    seen_output_names: dict[str, Path] = {}
    brand_counts = Counter()

    for source in files:
        result = EnginePageParser(source).parse()
        if not result.data:
            file_warnings[str(source)] = result.warnings + ["parse failed"]
            continue

        brand_slug = result.data["brand"]["slug"]
        engine_slug = result.data["engine"]["slug"]
        output_name = f"{brand_slug}-{engine_slug}.json"
        output_path = output_dir / output_name

        if output_name in seen_output_names:
            warning_list = result.warnings + [f"duplicate output slug: already claimed by {seen_output_names[output_name].name}"]
            file_warnings[str(source)] = warning_list
            skipped_duplicates.append(
                {"source": str(source), "duplicateOf": str(seen_output_names[output_name]), "output": str(output_path)}
            )
            continue

        seen_output_names[output_name] = source
        brand_counts[result.data["brand"]["name"]] += 1
        write_json(output_path, result.data)
        generated += 1
        if result.warnings:
            file_warnings[str(source)] = result.warnings

    batch_dir.mkdir(parents=True, exist_ok=True)
    summary = {
        "inputDir": str(input_dir),
        "outputDir": str(output_dir),
        "generatedCount": generated,
        "sourceFileCount": len(files),
        "duplicateSkipCount": len(skipped_duplicates),
        "brands": dict(brand_counts.most_common()),
        "warningsSummary": build_warning_summary(file_warnings),
    }

    write_json(batch_dir / "summary.json", summary)
    write_json(batch_dir / "warnings.json", file_warnings)
    write_json(batch_dir / "skipped_collisions.json", skipped_duplicates)

    print(json.dumps(summary, indent=2, ensure_ascii=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
