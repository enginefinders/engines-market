#!/usr/bin/env python3
"""
Extract brand page content from structured .docx planning documents and
emit JSON compatible with the Next.js BrandPageData schema in types/brand.ts.

Why this script exists:
- Your .docx files already follow a repeatable numbered-section format.
- Your Next.js app expects a strict JSON shape.
- You want predictable field names and predictable image paths.

This script intentionally uses only the Python standard library.
It reads .docx files directly as ZIP/XML so you do not need python-docx.

Usage examples:
    python extract_brand_docx.py "C:\\Users\\Rahma\\new_engine\\1"

    python extract_brand_docx.py "C:\\Users\\Rahma\\new_engine\\1\\Skoda.docx" ^
      --output "C:\\Users\\Rahma\\new_engine\\engine-market\\data\\brands"
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional, Sequence, Tuple
import xml.etree.ElementTree as ET


W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
NS = {"w": W_NS}

SECTION_HEADING_RE = re.compile(
    r"^(?:(?:master\s+prompt\s*)?(?:#|section\s+))(?P<num>\d+)(?:\s*\([^)]+\))?:\s*(?P<title>.+)$",
    re.IGNORECASE,
)
YEAR_BLOCK_RE = re.compile(
    r"^(?P<year>\d{4}(?:\s*[–-]\s*\d{4}|\s*[–-]\s*Present)?)\s*[–-]\s*(?P<title>.+)$"
)
QUESTION_RE = re.compile(r"^\*{0,2}(?P<num>\d+)\.\s*(?P<question>.+?)\*{0,2}$")
GROUP_RE = re.compile(r"^(?:#{2,4}\s+)?\*{0,2}Group\s+\d+:\s*(?P<name>.+?)\*{0,2}$", re.IGNORECASE)
H3_RE = re.compile(r"^\*{0,2}H3:\*{0,2}\s*(?P<value>.+)?$")
H4_RE = re.compile(r"^\*{0,2}H4:\*{0,2}\s*(?P<value>.+)?$")
NUMBERED_ITEM_RE = re.compile(r"^\*{0,2}(?P<num>\d+)\.\s*(?P<title>.+?)\*{0,2}$")
TOP_GROUP_RE = re.compile(r"^#{3}\s+(?P<title>.+)$")
SUB_GROUP_RE = re.compile(r"^#{4}\s+(?P<title>.+)$")
ARROW_LINE_RE = re.compile(r"^(?:→|\-\>|-\s*>)\s*(?P<text>.+)$")
TAGS_LINE_RE = re.compile(r"^\[Tags\]\s*(?P<label>[^:]+):\s*(?P<value>.+)$", re.IGNORECASE)
TABLE_SKIP_PATTERNS = (
    re.compile(r"\bkeywords?\b", re.IGNORECASE),
    re.compile(r"\bmaster prompt\b", re.IGNORECASE),
)
PRICE_RANGE_FRAGMENT = r"£[\d,]+(?:\s*[â€“-]\s*£?[\d,]+)?(?:\+)?"
REPAIR_OPTION_RE = re.compile(
    rf"^(?P<tier>.+?)\s+(?P<dealer>{PRICE_RANGE_FRAGMENT})\s+(?P<specialist>{PRICE_RANGE_FRAGMENT})\s+(?P<rest>.+)$"
)
REPAIR_PRICE_RE = re.compile(r"[£Ł][\d,]+(?:\s*[–-]\s*[£Ł]?[\d,]+)?(?:\+)?")
REPAIR_LONGEVITY_RE = re.compile(
    r"(?P<longevity>\d+\s*[–-]\s*\d+(?:\+)?\s*years?(?:\.\s*.+)?)$",
    re.IGNORECASE,
)

DEFAULT_LIVE_MARKET_LABELS = [
    "Real-Time Data",
    "Transparent Pricing",
    "Cost Insights",
    "Get Your Quote",
]

GENERIC_REVIEW_LOCATIONS = [
    "London",
    "Leeds",
    "Birmingham",
    "Bradford",
    "Manchester",
    "Glasgow",
]

GENERIC_REVIEW_NAMES = [
    "Jimmy",
    "Pete",
    "Sophie",
    "Ahmed",
    "Liam",
    "Tom",
]

FAQ_QUESTION_RE = re.compile(
    r"^(?:Q:\s*(?P<question_q>.+)|\*{0,2}(?P<num>\d+)\.\s*(?P<question_n>.+?)\*{0,2})$",
    re.IGNORECASE,
)

MOJIBAKE_REPLACEMENTS = {
    "â†’": "→",
    "â€“": "–",
    "â€”": "—",
    "â€‘": "-",
    "â€™": "’",
    "â€˜": "‘",
    "â€œ": '"',
    "â€": '"',
    "Â£": "£",
    "Ł": "£",
    "Â®": "®",
    "â„¢": "™",
    "ðŸ”’": "🔒",
    "ðŸ›¡ï¸": "🛡️",
    "ðŸ’°": "💰",
    "ðŸ–¼ï¸": "🖼️",
    "âš ï¸": "⚠️",
    "ðŸ”´": "🔴",
}


@dataclass
class ParseContext:
    brand_name: str
    brand_slug: str
    source_path: Path


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = (
        value.replace("&", " and ")
        .replace("/", " ")
        .replace("\\", " ")
        .replace("’", "")
        .replace("'", "")
        .replace("®", "")
        .replace("™", "")
    )
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value)
    return value.strip("-")


def clean_text(value: str) -> str:
    value = value.replace("\xa0", " ").replace("\u200b", "").strip()
    value = re.sub(r"\s+", " ", value)
    return value


def repair_text(value: str) -> str:
    repaired = value
    for wrong, right in MOJIBAKE_REPLACEMENTS.items():
        repaired = repaired.replace(wrong, right)
    return repaired


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def default_output_dir() -> Path:
    return repo_root() / "data" / "brands" / "_generated"


def strip_markdown(value: str) -> str:
    value = clean_text(repair_text(value))
    value = value.replace("**", "").replace("__", "")
    if value.startswith("*") and value.endswith("*") and len(value) > 2:
        value = value[1:-1].strip()
    return value.strip()


def normalize_text(value: str) -> str:
    return strip_markdown(repair_text(value))


def normalize_line(value: str) -> str:
    return strip_markdown(value).replace("“", '"').replace("”", '"')


def title_case_filename_stem(path: Path) -> str:
    return path.stem.replace("-", " ").replace("_", " ").strip()


def split_logical_lines(text: str) -> List[str]:
    text = normalize_text(text)
    if not text:
        return []

    label_boundaries = [
        "Tag:",
        "H1:",
        "H2:",
        "H3:",
        "H4:",
        "Subheading:",
        "Trust Badges:",
        "Ticker:",
        "Input Box:",
        "CTA Button:",
        "CTA:",
        "Subtitle:",
        "Price range:",
        "Short Summary:",
        "Key Points:",
        "Affected models:",
        "Typical failure mileage:",
        "Root cause:",
        "Our recommendation:",
        "Accordion label:",
        "Rating Summary:",
        "Star Rating Display:",
        "Leave a Review CTA",
        "Final CTA:",
        "Trust Points:",
        "Closing line:",
        "Intro (1 line):",
        "Intro:",
        "Section Heading:",
        "Section Subheading",
        "H2 subtitle:",
        "Note/Disclaimer Under CTA:",
    ]

    for label in label_boundaries:
        text = re.sub(rf"(?<!^)(?={re.escape(label)})", "\n", text)

    text = re.sub(r"(?<!^)(?=→)", "\n", text)
    return [clean_text(part) for part in text.splitlines() if clean_text(part)]


def infer_brand_name(paragraphs: Sequence[str], fallback_stem: str) -> str:
    fallback_name = title_case_filename_stem(Path(fallback_stem))
    candidates = [
        re.compile(r"^H1:\s*(?P<brand>.+?)\s+Engine Replacement\b", re.IGNORECASE),
        re.compile(r"^Section\s+1:\s*(?P<brand>.+?)\s+Engine Replacement\b", re.IGNORECASE),
        re.compile(r"^#1:\s*(?P<brand>.+?)\s+Engine Replacement\b", re.IGNORECASE),
        re.compile(r"^(?P<brand>.+?)\s+Engines by Year\b", re.IGNORECASE),
    ]

    for line in paragraphs[:40]:
        normalized = normalize_text(line)
        for pattern in candidates:
            match = pattern.match(normalized)
            if match:
                inferred = strip_markdown(match.group("brand"))
                if (
                    fallback_name
                    and len(fallback_name) > len(inferred)
                    and slugify(fallback_name).startswith(slugify(inferred))
                ):
                    return fallback_name
                return inferred

    return fallback_name


def paragraph_text(node: ET.Element) -> str:
    return "".join((t.text or "") for t in node.findall(".//w:t", NS))


def table_rows(table: ET.Element) -> List[List[str]]:
    rows: List[List[str]] = []
    for row in table.findall("w:tr", NS):
        cells: List[str] = []
        for cell in row.findall("w:tc", NS):
            texts = [clean_text(t.text or "") for t in cell.findall(".//w:t", NS)]
            cell_text = clean_text(" ".join(text for text in texts if text))
            cells.append(cell_text)
        if any(cell for cell in cells):
            rows.append(cells)
    return rows


def should_skip_table(rows: Sequence[Sequence[str]]) -> bool:
    table_text = normalize_text(" ".join(cell for row in rows for cell in row))
    return any(pattern.search(table_text) for pattern in TABLE_SKIP_PATTERNS)


def markdown_table_lines(rows: Sequence[Sequence[str]]) -> List[str]:
    lines: List[str] = []
    for row in rows:
        normalized_cells = [clean_text(repair_text(cell)) for cell in row]
        if any(normalized_cells):
            lines.append(f"| {' | '.join(normalized_cells)} |")
    return lines


def read_docx_paragraphs(path: Path) -> List[str]:
    with zipfile.ZipFile(path) as archive:
        doc_xml = ET.fromstring(archive.read("word/document.xml"))
        body = doc_xml.find("w:body", NS)
        if body is None:
            return []

        paragraphs: List[str] = []
        for child in body:
            if child.tag != f"{{{W_NS}}}p":
                if child.tag == f"{{{W_NS}}}tbl":
                    rows = table_rows(child)
                    if rows and not should_skip_table(rows):
                        paragraphs.extend(markdown_table_lines(rows))
                continue
            text = paragraph_text(child)
            paragraphs.extend(split_logical_lines(text))
        return paragraphs


def split_sections(lines: Sequence[str]) -> Dict[int, List[Dict[str, Any]]]:
    sections: Dict[int, List[Dict[str, Any]]] = {}
    current_num: Optional[int] = None
    current_title: Optional[str] = None
    current_lines: List[str] = []

    def flush() -> None:
        nonlocal current_num, current_title, current_lines
        if current_num is not None:
            sections.setdefault(current_num, []).append(
                {
                    "title": current_title or "",
                    "lines": current_lines[:],
                }
            )
        current_num = None
        current_title = None
        current_lines = []

    for raw in lines:
        line = normalize_text(raw)
        heading = SECTION_HEADING_RE.match(line)
        if heading:
            flush()
            current_num = int(heading.group("num"))
            current_title = heading.group("title").strip()
            continue

        if current_num is not None:
            current_lines.append(line)

    flush()
    return sections


def get_section(
    sections: Dict[int, List[Dict[str, Any]]],
    number: int,
    occurrence: int = 0,
) -> Dict[str, Any]:
    matches = sections.get(number, [])
    if 0 <= occurrence < len(matches):
        return matches[occurrence]
    return {"title": "", "lines": []}


def iter_sections(sections: Dict[int, List[Dict[str, Any]]]) -> List[Tuple[int, int, Dict[str, Any]]]:
    ordered: List[Tuple[int, int, Dict[str, Any]]] = []
    for number in sorted(sections.keys()):
        for occurrence, section in enumerate(sections[number]):
            ordered.append((number, occurrence, section))
    return ordered


def find_section_by_keywords(
    sections: Dict[int, List[Dict[str, Any]]],
    title_keywords: Sequence[str],
    fallback: Optional[Tuple[int, int]] = None,
) -> Dict[str, Any]:
    lowered_keywords = tuple(keyword.lower() for keyword in title_keywords)
    for _, _, section in iter_sections(sections):
        title = normalize_text(section.get("title", "")).lower()
        if any(keyword in title for keyword in lowered_keywords):
            return section
    if fallback is not None:
        return get_section(sections, fallback[0], fallback[1])
    return {"title": "", "lines": []}


def trim_section_lines(lines: Sequence[str], stop_prefixes: Sequence[str]) -> List[str]:
    trimmed: List[str] = []
    normalized_stops = tuple(prefix.lower() for prefix in stop_prefixes)
    for line in lines:
        lower = line.lower()
        if any(lower.startswith(prefix) for prefix in normalized_stops):
            break
        trimmed.append(line)
    return trimmed


def extract_labeled_value(lines: Sequence[str], label: str) -> str:
    label_lower = label.lower()
    for idx, line in enumerate(lines):
        plain = strip_markdown(line)
        lower_plain = plain.lower()
        needle = f"{label_lower}:"
        if needle not in lower_plain:
            continue
        start = lower_plain.index(needle) + len(needle)
        value = plain[start:].strip()
        if value:
            return strip_markdown(value)
        if idx + 1 < len(lines):
            return strip_markdown(lines[idx + 1])
    return ""


def find_line_after_prefix(lines: Sequence[str], prefixes: Sequence[str]) -> str:
    lower_prefixes = tuple(prefix.lower() for prefix in prefixes)
    for idx, line in enumerate(lines):
        cleaned = normalize_text(line)
        lower_line = cleaned.lower()
        if any(prefix in lower_line for prefix in lower_prefixes):
            value = cleaned.split(":", 1)[1].strip() if ":" in cleaned else ""
            if value:
                return strip_markdown(value)
            if idx + 1 < len(lines):
                return strip_markdown(lines[idx + 1])
    return ""


def collect_until(
    lines: Sequence[str],
    start_index: int,
    stop_predicates: Sequence,
) -> Tuple[List[str], int]:
    bucket: List[str] = []
    idx = start_index
    while idx < len(lines):
        line = lines[idx]
        if any(predicate(line) for predicate in stop_predicates):
            break
        bucket.append(line)
        idx += 1
    return bucket, idx


def split_markdown_row(line: str) -> List[str]:
    stripped = line.strip().strip("|")
    return [strip_markdown(cell.strip()) for cell in stripped.split("|")]


def is_separator_row(line: str) -> bool:
    cells = split_markdown_row(line)
    return bool(cells) and all(re.fullmatch(r":?-{2,}:?", cell) for cell in cells if cell)


def is_table_row(line: str) -> bool:
    return line.startswith("|") and line.endswith("|")


def split_sentences(text: str) -> List[str]:
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9])", text)
    return [clean_text(part) for part in parts if clean_text(part)]


def default_live_market_intro_bullets(brand: str, intro_text: str) -> List[Dict[str, str]]:
    sentences = split_sentences(intro_text)
    bullets: List[Dict[str, str]] = []
    for label, sentence in zip(DEFAULT_LIVE_MARKET_LABELS, sentences):
        bullets.append({"label": label, "text": sentence})

    while len(bullets) < 4:
        fallback = {
            "Real-Time Data": f"View recent {brand} engine replacement enquiries to see genuine market demand rather than stock-style listings.",
            "Transparent Pricing": f"Benchmark typical {brand} engine prices against realistic UK rebuilt and reconditioned market ranges.",
            "Cost Insights": f"Review quoted prices and failure reasons to understand what is driving {brand} engine replacement demand.",
            "Get Your Quote": f"Use the guide as a benchmark, then enter your registration for a tailored {brand} engine quote.",
        }
        label = DEFAULT_LIVE_MARKET_LABELS[len(bullets)]
        bullets.append({"label": label, "text": fallback[label]})
    return bullets


def derive_tone(lines: Sequence[str]) -> str:
    tone_line = ""
    for line in lines:
        lower = line.lower()
        if "brand tone" in lower:
            tone_line = lower
            break
    if any(word in tone_line for word in ("premium", "luxury", "specialist")):
        return "premium"
    return "volume"


def default_reviews(ctx: ParseContext) -> Dict[str, Any]:
    brand = ctx.brand_name
    reviews = []
    templates = [
        f"Thanks to EngineMarket, I saved over £1,000 on my {brand} engine and found a solid local specialist quickly.",
        f"Got multiple quotes for my {brand} within hours and the whole process felt straightforward.",
        f"I wasn't sure which {brand} engine I needed, but the quote process helped me narrow it down fast.",
        f"Fast turnaround, clear pricing, and the warranty gave me real peace of mind for my {brand}.",
        f"One of the easiest car-related experiences I've had. Honest, quick, and much cheaper than expected.",
        f"EngineMarket made a stressful {brand} engine failure much easier to deal with from start to finish.",
    ]
    for text, name, location in zip(templates, GENERIC_REVIEW_NAMES, GENERIC_REVIEW_LOCATIONS):
        reviews.append({"text": text, "name": name, "location": location})

    return {
        "tag": "Customer Reviews",
        "h2": f"Trusted by {brand} Owners Across the UK",
        "rating": {
            "value": 4.8,
            "count": 1000,
            "summary": f"Rated 4.8 out of 5 by verified customers who sourced reconditioned and used {brand} engines through EngineMarket.",
            "basedOn": "Based on real post-sale feedback from buyers matched with our network of UK engine specialists.",
        },
        "reviews": reviews,
        "leaveReviewCta": {
            "text": "Had a great experience?",
            "linkText": "Leave a review ->",
        },
    }


def parse_reviews(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    if not lines:
        return default_reviews(ctx)
    lines = trim_section_lines(lines, ("developer notes", "master prompt instructions"))

    tag = extract_labeled_value(lines, "Tag") or "Customer Reviews"
    h2 = extract_labeled_value(lines, "H2") or f"Trusted by {ctx.brand_name} Owners Across the UK"

    rating_summary = extract_labeled_value(lines, "Rating Summary")
    star_display = extract_labeled_value(lines, "Star Rating Display")
    rating_value = 4.8
    rating_count = 1000

    if star_display:
        match = re.search(r"(\d+(?:\.\d+)?)\s*/\s*5", star_display)
        if match:
            rating_value = float(match.group(1))

    count_match = re.search(r"by\s+([\d,]+)", rating_summary)
    if count_match:
        rating_count = int(count_match.group(1).replace(",", ""))

    based_on = ""
    if "Based on" in rating_summary:
        parts = re.split(r"(?=Based on)", rating_summary, maxsplit=1)
        rating_summary = parts[0].strip()
        based_on = parts[1].strip() if len(parts) > 1 else ""

    reviews: List[Dict[str, str]] = []
    for line in lines:
        normalized = normalize_text(line)
        if not normalized.startswith('"'):
            continue
        if "\"-" in normalized:
            text, attribution = normalized.rsplit('"-', 1)
        elif '" -' in normalized:
            text, attribution = normalized.rsplit('" -', 1)
        else:
            continue
        text = text.strip().strip('"')
        name, _, location = attribution.partition(",")
        reviews.append(
            {
                "text": text,
                "name": strip_markdown(name),
                "location": strip_markdown(location),
            }
        )

    if not reviews:
        return default_reviews(ctx)

    leave_review = extract_labeled_value(lines, "Leave a Review CTA (small, below slider)") or extract_labeled_value(
        lines, "Leave a Review CTA"
    )
    link_text = "Leave a review ->"
    leave_text = "Had a great experience?"
    if leave_review:
        if "[" in leave_review and "]" in leave_review:
            before, bracket, after = leave_review.partition("[")
            link_text = bracket + after
            link_text = link_text.strip("[]")
            leave_text = before.strip()
        elif "->" in leave_review:
            leave_text = leave_review.split("->", 1)[0].strip()

    return {
        "tag": tag,
        "h2": h2,
        "rating": {
            "value": rating_value,
            "count": rating_count,
            "summary": rating_summary,
            "basedOn": based_on or "Based on real post-sale feedback from buyers matched with our network of UK engine specialists.",
        },
        "reviews": reviews,
        "leaveReviewCta": {
            "text": leave_text or "Had a great experience?",
            "linkText": link_text or "Leave a review ->",
        },
    }


def build_assets(brand_slug: str) -> Dict[str, str]:
    base = f"/images/brands/{brand_slug}/brand"
    return {
        "heroBg": f"{base}/{brand_slug}-hero-bg.webp",
        "howItWorksBg": f"{base}/{brand_slug}-how-it-works-bg.webp",
        "commonProblemsBg": f"{base}/{brand_slug}-common-problems-bg.webp",
        "engineCodesBg": f"{base}/{brand_slug}-engine-codes-bg.webp",
        "engineTypesBg": f"{base}/{brand_slug}-engine-types-bg.webp",
        "engineSizesBg": f"{base}/{brand_slug}-engine-sizes-bg.webp",
        "fuelTypesBg": f"{base}/{brand_slug}-fuel-types-bg.webp",
        "engineCodeDirectoryBg": f"{base}/{brand_slug}-engine-code-directory-bg.webp",
    }


def deep_clean(value: Any) -> Any:
    if isinstance(value, str):
        cleaned = strip_markdown(value)
        cleaned = cleaned.replace("  ", " ").strip()
        return cleaned
    if isinstance(value, list):
        return [deep_clean(item) for item in value]
    if isinstance(value, dict):
        return {key: deep_clean(val) for key, val in value.items()}
    return value


def split_field_values(value: str) -> List[str]:
    if not value:
        return []
    parts = re.split(r"\s*;\s*|\s*,\s*", value)
    return [strip_markdown(part) for part in parts if strip_markdown(part)]


def extract_inline_labeled_segments(text: str, labels: Sequence[Tuple[str, str]]) -> Tuple[str, Dict[str, str]]:
    normalized = clean_text(text)
    lowered = normalized.lower()
    matches: List[Tuple[int, str, str]] = []

    for key, label in labels:
        idx = lowered.find(label.lower())
        if idx != -1:
            matches.append((idx, key, label))

    if not matches:
        return normalized, {}

    matches.sort(key=lambda item: item[0])
    description = normalized[: matches[0][0]].strip(" -:;,.")
    extracted: Dict[str, str] = {}

    for index, (start, key, label) in enumerate(matches):
        value_start = start + len(label)
        value_end = matches[index + 1][0] if index + 1 < len(matches) else len(normalized)
        extracted[key] = normalized[value_start:value_end].strip(" -:;,.")

    return description, extracted


def looks_like_metadata_noise(line: str) -> bool:
    lower = normalize_text(line).lower()
    if not lower:
        return False

    blocked_prefixes = (
        "meta title",
        "meta description",
        "meta:",
        "seo title",
        "seo description",
        "structured data",
        "json-ld",
        '"name":',
        '"text":',
        '"@',
        "{",
        "}",
        "[schema",
        "[json",
    )
    return lower.startswith(blocked_prefixes)


def clean_trust_points(points: Sequence[Dict[str, str]]) -> List[Dict[str, str]]:
    seen: set[Tuple[str, str]] = set()
    cleaned_points: List[Dict[str, str]] = []

    for point in points:
        title = strip_markdown(point.get("title", ""))
        description = strip_markdown(point.get("description", ""))
        if not title or not description:
            continue
        if looks_like_metadata_noise(title) or looks_like_metadata_noise(description):
            continue
        key = (title, description)
        if key in seen:
            continue
        seen.add(key)
        cleaned_points.append({"title": title, "description": description})

    return cleaned_points


def build_code_image_path(brand_slug: str, code: str) -> str:
    code_slug = slugify(code.replace("/", " "))
    return f"/images/brands/{brand_slug}/engines/{brand_slug}-{code_slug}-engine.webp"


def build_problem_image_path(brand_slug: str, group: str) -> str:
    return f"/images/brands/{brand_slug}/engines/{brand_slug}-{slugify(group)}-card.webp"


def build_model_image_path(brand_slug: str, model_slug: str) -> str:
    return f"/images/brands/{brand_slug}/models/{brand_slug}-{model_slug}-model-card.webp"


def parse_hero(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    lines = trim_section_lines(
        lines,
        ("visual / ux", "keywords covered", "master prompt instructions", "important notes"),
    )
    trust_badges_line = ""
    trust_badges: List[str] = []
    for idx, line in enumerate(lines):
        if "trust badges" not in line.lower():
            continue
        if "|" in line and ":" in line:
            trust_badges_line = line.split(":", 1)[1].strip()
        elif idx + 1 < len(lines):
            trust_badges_line = lines[idx + 1]
        if trust_badges_line:
            trust_badges = [clean_text(x) for x in trust_badges_line.split("|") if clean_text(x)]
        if not trust_badges:
            scan = idx + 1
            while scan < len(lines):
                candidate = strip_markdown(lines[scan]).lstrip("-• ").strip()
                if not candidate:
                    break
                if ":" in candidate and not candidate.lower().startswith(("supply", "nationwide", "warranty", "free")):
                    break
                trust_badges.append(candidate)
                scan += 1
        break

    note = ""
    for idx, line in enumerate(lines):
        if "note/disclaimer under cta" in line.lower():
            if idx + 1 < len(lines):
                note = strip_markdown(lines[idx + 1].lstrip("🔒").strip())
            break

    input_placeholder = extract_labeled_value(lines, "Input Box").strip("[]") or "Registration Number"
    cta_link_text = extract_labeled_value(lines, "H3 (CTA link text)") or extract_labeled_value(lines, "H3")
    supporting_text = extract_labeled_value(lines, "Supporting text below H3")
    if not supporting_text:
        for idx, line in enumerate(lines):
            if line.lower().startswith(("h3 (cta link text):", "h3:")):
                if idx + 1 < len(lines):
                    next_line = normalize_text(lines[idx + 1])
                    if ":" not in next_line:
                        supporting_text = next_line
                break

    return {
        "tag": extract_labeled_value(lines, "Tag"),
        "h1": extract_labeled_value(lines, "H1"),
        "subheading": extract_labeled_value(lines, "Subheading"),
        "trustBadges": trust_badges,
        "ctaLinkText": cta_link_text,
        "supportingText": supporting_text,
        "ticker": extract_labeled_value(lines, "Ticker"),
        "form": {
            "heading": extract_labeled_value(lines, "H2"),
            "subtitle": extract_labeled_value(lines, "H2 subtitle") or extract_labeled_value(lines, "Subtitle"),
            "inputPlaceholder": input_placeholder,
            "buttonText": extract_labeled_value(lines, "CTA Button") or extract_labeled_value(lines, "CTA"),
            "note": note,
        },
    }


def infer_card_icon(text: str) -> str:
    lowered = text.lower()
    if "registration" in lowered or "dvla" in lowered:
        return "registration"
    if "quote" in lowered or "price" in lowered:
        return "quote"
    if "shield" in lowered or "save" in lowered or "choice" in lowered:
        return "shield"
    return "document"


def parse_how_it_works(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    lines = trim_section_lines(
        lines,
        ("developer note", "important notes", "master prompt instructions"),
    )
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    tagline = extract_labeled_value(lines, "Tagline (below cards)") or extract_labeled_value(lines, "Tagline")

    cards: List[Dict[str, Any]] = []
    idx = 0
    while idx < len(lines):
        line = lines[idx]
        if "card " in line.lower() and "(front" in line.lower():
            num_match = re.search(r"card\s+(\d+)", line, re.IGNORECASE)
            number = int(num_match.group(1)) if num_match else len(cards) + 1
            icon_line = lines[idx + 1] if idx + 1 < len(lines) else ""
            front_h3 = extract_labeled_value(lines[idx: idx + 8], "H3")
            front_text = ""
            for j in range(idx, min(idx + 8, len(lines))):
                if lines[j].lower().startswith("h3:"):
                    if j + 1 < len(lines):
                        front_text = strip_markdown(lines[j + 1])
                    break

            back_heading = ""
            back_text = ""
            bullets: List[str] = []

            seek = idx
            while seek < len(lines):
                if "card " in lines[seek].lower() and "(flip" in lines[seek].lower():
                    if seek + 1 < len(lines):
                        back_heading = strip_markdown(lines[seek + 1])
                    if seek + 2 < len(lines):
                        back_text = strip_markdown(lines[seek + 2])
                    k = seek + 3
                    while k < len(lines):
                        current = lines[k]
                        lower = current.lower()
                        if current.startswith("---") or ("card " in lower and "(front" in lower):
                            break
                        if current.startswith("•") or current.startswith("-"):
                            bullets.append(strip_markdown(current.lstrip("•- ").strip()))
                        elif current and not current.startswith("**") and current not in ("You choose based on:",):
                            if k > seek + 2:
                                bullets.append(strip_markdown(current))
                        k += 1
                    idx = k - 1
                    break
                seek += 1

            cards.append(
                {
                    "number": number,
                    "icon": infer_card_icon(icon_line or front_h3),
                    "front": {
                        "h3": front_h3,
                        "text": front_text,
                    },
                    "back": {
                        "heading": back_heading,
                        "text": back_text,
                        "bullets": bullets,
                    },
                }
            )
        idx += 1

    return {"tag": tag, "h2": h2, "cards": cards, "tagline": tagline}


def parse_live_market(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    h3 = extract_labeled_value(lines, "H3 (subheading)") or extract_labeled_value(lines, "H3")

    intro_text = ""
    intro_bullets: List[Dict[str, str]] = []
    for idx, line in enumerate(lines):
        lower = line.lower()
        if "introductory paragraph" in lower:
            j = idx + 1
            while j < len(lines):
                current = normalize_text(lines[j])
                lower_current = current.lower()
                if current.startswith("[") or lower_current.startswith(("timestamp:", "developer note")):
                    break
                if is_table_row(current) or SECTION_HEADING_RE.match(current):
                    break
                if ":" in current:
                    label, value = current.split(":", 1)
                    label = strip_markdown(label)
                    value = strip_markdown(value)
                    if value:
                        intro_bullets.append({"label": label, "text": value})
                        if intro_text:
                            intro_text += " "
                        intro_text += value
                elif current:
                    if intro_text:
                        intro_text += " "
                    intro_text += strip_markdown(current)
                j += 1
            break

    if not intro_bullets:
        intro_bullets = default_live_market_intro_bullets(ctx.brand_name, intro_text)

    rows_count = 0
    visible_rows = 20
    entries: List[Dict[str, str]] = []
    timestamp_label = "Last Updated"

    dynamic_feed_line = next(
        (normalize_text(line) for line in lines if "dynamic feed" in line.lower()),
        "",
    )
    visible_match = re.search(r"(\d+)\s+entries", dynamic_feed_line, re.IGNORECASE)
    if visible_match:
        visible_rows = int(visible_match.group(1))

    timestamp_line = next(
        (normalize_text(line) for line in lines if line.lower().startswith("timestamp:")),
        "",
    )
    if timestamp_line:
        timestamp_payload = strip_markdown(timestamp_line.split(":", 1)[1]).strip()
        if timestamp_payload:
            timestamp_label = timestamp_payload.split(":", 1)[0].strip() or timestamp_label

    return {
        "tag": tag,
        "h2": h2,
        "h3": h3,
        "introBullets": intro_bullets,
        "cta": {
            "heading": "Use the feed as your benchmark",
            "text": f"Use these recent buyer enquiries to benchmark your own {ctx.brand_name} engine price before you compare specialist quotes.",
            "buttonText": f"Compare My {ctx.brand_name} Engine",
            "note": "Feed timestamps refresh automatically from the latest quote data.",
        },
        "badges": [
            f"{visible_rows} recent enquiries visible",
            "Typical UK rebuilt ranges",
            "Engine-code matched rows",
            "Updated regularly",
        ],
        "feed": {
            "isDynamic": True,
            "rowsCount": rows_count,
            "columns": [
                "Year",
                "Model",
                "Engine Code",
                "Fuel",
                "Avg. Quoted Price",
                "Reported Issue",
            ],
            "timestampLabel": timestamp_label,
            "refreshLabel": "Refresh feed",
            "density": "premium",
            "visibleRows": visible_rows,
            "entries": entries,
        },
    }


def parse_models(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    lines = trim_section_lines(lines, ("keywords covered", "master prompt instructions"))
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    subheading = (
        extract_labeled_value(lines, "H3 (subheading)")
        or extract_labeled_value(lines, "Section Subheading")
        or find_line_after_prefix(lines, ("section subheading",))
    ).strip('"')

    cards: List[Dict[str, Any]] = []
    idx = 0
    while idx < len(lines):
        line = normalize_text(lines[idx])
        match = re.match(r"^\*{0,2}H4:\s*(.+?)\*{0,2}$", line, re.IGNORECASE)
        card_match = re.match(r"^Card\s+\d+:\s*H3:\s*(.+)$", line, re.IGNORECASE)
        bare_card_match = re.match(r"^Card\s+\d+:\s*$", line, re.IGNORECASE)
        if match:
            h3 = strip_markdown(match.group(1))
            subtitle = strip_markdown(lines[idx + 1]) if idx + 1 < len(lines) else ""
            price_range = strip_markdown(lines[idx + 2]) if idx + 2 < len(lines) else ""
            cta = strip_markdown(lines[idx + 3].lstrip("→").strip()) if idx + 3 < len(lines) else ""

            model_name = re.sub(rf"^{re.escape(ctx.brand_name)}\s+", "", h3, flags=re.IGNORECASE)
            model_name = re.sub(r"\s+Engines?$", "", model_name, flags=re.IGNORECASE)
            model_slug = slugify(model_name)

            cards.append(
                {
                    "h3": h3,
                    "slug": model_slug,
                    "subtitle": subtitle.strip("*"),
                    "priceRange": price_range,
                    "cta": cta,
                    "image": build_model_image_path(ctx.brand_slug, model_slug),
                }
            )
            idx += 4
            continue
        if card_match:
            h3 = strip_markdown(card_match.group(1))
            subtitle = extract_labeled_value(lines[idx + 1 : idx + 4], "Subtitle")
            price_range = extract_labeled_value(lines[idx + 1 : idx + 5], "Price range")
            cta = extract_labeled_value(lines[idx + 1 : idx + 6], "CTA")

            model_name = re.sub(rf"^{re.escape(ctx.brand_name)}\s+", "", h3, flags=re.IGNORECASE)
            model_name = re.sub(r"\s+Engines?$", "", model_name, flags=re.IGNORECASE)
            model_slug = slugify(model_name)

            cards.append(
                {
                    "h3": h3,
                    "slug": model_slug,
                    "subtitle": subtitle,
                    "priceRange": price_range,
                    "cta": cta,
                    "image": build_model_image_path(ctx.brand_slug, model_slug),
                }
            )
            idx += 4
            continue
        normalized_heading = re.sub(r"^#{2,4}\s+", "", line).strip()
        if normalized_heading.lower().endswith(" engines") and idx + 3 < len(lines):
            subtitle = strip_markdown(normalize_text(lines[idx + 1]))
            price_range = strip_markdown(normalize_text(lines[idx + 2]))
            cta_line = normalize_text(lines[idx + 3])
            arrow = ARROW_LINE_RE.match(cta_line)
            if subtitle.lower().startswith("available for") and "starting from" in price_range.lower() and arrow:
                h3 = strip_markdown(normalized_heading)
                cta = arrow.group("text").strip()

                model_name = re.sub(rf"^{re.escape(ctx.brand_name)}\s+", "", h3, flags=re.IGNORECASE)
                model_name = re.sub(r"\s+Engines?$", "", model_name, flags=re.IGNORECASE)
                model_slug = slugify(model_name)

                cards.append(
                    {
                        "h3": h3,
                        "slug": model_slug,
                        "subtitle": subtitle,
                        "priceRange": price_range,
                        "cta": cta,
                        "image": build_model_image_path(ctx.brand_slug, model_slug),
                    }
                )
                idx += 4
                continue
        if bare_card_match:
            block: List[str] = []
            idx += 1
            while idx < len(lines):
                current = normalize_text(lines[idx])
                lower = current.lower()
                if re.match(r"^Card\s+\d+:\s*$", current, re.IGNORECASE):
                    break
                if lower.startswith(("keywords covered", "master prompt instructions", "purpose:", "visual layout suggestion")):
                    break
                block.append(current)
                idx += 1

            h3 = extract_labeled_value(block, "H3")
            subtitle = extract_labeled_value(block, "Subtitle")
            price_range = extract_labeled_value(block, "Price range")
            cta = extract_labeled_value(block, "CTA")
            if not cta:
                for block_line in block:
                    arrow = ARROW_LINE_RE.match(block_line)
                    if arrow:
                        cta = arrow.group("text").strip()
                        break

            if h3:
                model_name = re.sub(rf"^{re.escape(ctx.brand_name)}\s+", "", h3, flags=re.IGNORECASE)
                model_name = re.sub(r"\s+Engines?$", "", model_name, flags=re.IGNORECASE)
                model_slug = slugify(model_name)

                cards.append(
                    {
                        "h3": h3,
                        "slug": model_slug,
                        "subtitle": subtitle,
                        "priceRange": price_range,
                        "cta": cta,
                        "image": build_model_image_path(ctx.brand_slug, model_slug),
                    }
                )
            continue
        idx += 1

    return {"tag": tag, "h2": h2, "subheading": subheading, "cards": cards}


def parse_price_table(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    h3 = extract_labeled_value(lines, "H3 (subheading)") or extract_labeled_value(lines, "H3")

    filters: List[str] = ["All", "Diesel", "Petrol"]
    for line in lines:
        if "filter bar" in line.lower() and "|" in line:
            parts = [clean_text(part) for part in line.split("—")[-1].split("|") if clean_text(part)]
            if parts:
                filters = parts
            break

    groups: List[Dict[str, Any]] = []
    idx = 0
    while idx < len(lines):
        group_match = GROUP_RE.match(lines[idx])
        top_group_match = TOP_GROUP_RE.match(lines[idx])
        if not group_match and not top_group_match:
            idx += 1
            continue

        raw_name = strip_markdown(group_match.group("name") if group_match else top_group_match.group("title"))
        era_match = re.search(r"\(([^)]+)\)$", raw_name)
        era = era_match.group(1).strip() if era_match else "All years"
        name = raw_name[: raw_name.rfind("(")].strip() if era_match else raw_name

        idx += 1
        engines: List[Dict[str, str]] = []
        failure_bits: List[str] = []

        while idx < len(lines):
            line = lines[idx]
            if (
                GROUP_RE.match(line)
                or TOP_GROUP_RE.match(line)
                or line.lower().startswith("**keyword coverage")
                or SECTION_HEADING_RE.match(line)
            ):
                break

            if is_table_row(line) and not is_separator_row(line):
                cells = split_markdown_row(line)
                if cells and cells[0].lower() == "engine code":
                    idx += 1
                    continue
                if cells and cells[0].lower().startswith("get quote"):
                    idx += 1
                    continue
                if len(cells) >= 6:
                    code = cells[0]
                    cta = f"Get Quote for {code}"
                    if idx + 1 < len(lines) and is_table_row(lines[idx + 1]):
                        next_cells = split_markdown_row(lines[idx + 1])
                        if next_cells and next_cells[0]:
                            cta = strip_markdown(next_cells[0].lstrip("→").strip("* "))
                    engines.append(
                        {
                            "code": code,
                            "fuel": cells[1],
                            "size": cells[2],
                            "power": cells[3],
                            "compatibleModels": cells[4],
                            "avgRebuiltPrice": cells[5],
                            "cta": cta,
                        }
                    )
                    idx += 1
                    continue

            if line and not line.startswith("---") and not line.lower().startswith("*developer note"):
                failure_bits.append(strip_markdown(line))
            idx += 1

        failure_note = " ".join(bit for bit in failure_bits if bit and not bit.startswith("|"))
        groups.append(
            {
                "name": name,
                "era": era,
                "failureNote": failure_note,
                "engines": engines,
            }
        )

    for group in groups:
        if group["name"] not in filters:
            short = group["name"].split()[0]
            if short not in filters:
                filters.append(short)

    return {"tag": tag, "h2": h2, "h3": h3, "filters": filters, "groups": groups}


def derive_problem_group(h4: str) -> str:
    known = [
        "Crankshaft & Bearing Failure",
        "Timing Chain Failure",
        "Injector Seal Failure & Head Damage",
        "Coolant Intrusion & Turbo Failure",
        "Turbocharger Failure",
        "DPF / EGR Blockage",
        "Carbon Buildup on Intake Valves",
        "Injector / High-Pressure Pump Failure",
        "High Oil Consumption",
    ]
    normalized = h4.replace("‑", "-")
    for label in known:
        if label.lower() in normalized.lower():
            return label
    head = normalized.split("–", 1)[0].strip()
    if "/" in head and len(head.split()) > 4:
        tail_words = head.split()[-4:]
        return " ".join(tail_words)
    return head


def parse_common_problems(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")

    h3 = ""
    for idx, line in enumerate(lines):
        if line.lower().startswith("**h3") or line.lower().startswith("h3:"):
            value = extract_labeled_value(lines[idx: idx + 2], "H3")
            if value:
                h3 = value
            elif idx + 1 < len(lines):
                h3 = strip_markdown(lines[idx + 1])
            break

    blocks: List[List[str]] = []
    current: List[str] = []
    in_problem_zone = False
    for line in lines:
        if H4_RE.match(line):
            in_problem_zone = True
            if current:
                blocks.append(current)
                current = []
        if in_problem_zone:
            current.append(line)
    if current:
        blocks.append(current)

    problems: List[Dict[str, str]] = []
    final_cta = {
        "h4": "",
        "paragraph": "",
        "buttonText": "",
        "disclaimer": "",
    }

    for block in blocks:
        h4 = extract_labeled_value(block, "H4")
        if not h4:
            continue

        if h4.lower().startswith("don’t let") or h4.lower().startswith("don't let"):
            paragraph_parts = []
            disclaimer = ""
            button_text = extract_labeled_value(block, "CTA Button") or extract_labeled_value(block, "CTA")
            for line in block[1:]:
                lower = line.lower()
                if lower.startswith("**disclaimer") or lower.startswith("disclaimer:"):
                    disclaimer = line.split(":", 1)[1].strip() if ":" in line else ""
                    continue
                if lower.startswith("**cta button") or lower.startswith("**cta:") or lower.startswith("cta:"):
                    continue
                if line and not line.startswith("---"):
                    paragraph_parts.append(strip_markdown(line))

            final_cta = {
                "h4": h4,
                "paragraph": " ".join(part for part in paragraph_parts if part),
                "buttonText": button_text,
                "disclaimer": strip_markdown(disclaimer),
            }
            continue

        group = derive_problem_group(h4)
        recommendation = extract_labeled_value(block, "Our recommendation")
        cta = extract_labeled_value(block, "CTA")
        problems.append(
            {
                "group": group,
                "h4": h4,
                "image": build_problem_image_path(ctx.brand_slug, group),
                "affectedModels": extract_labeled_value(block, "Affected models"),
                "typicalFailureMileage": extract_labeled_value(block, "Typical failure mileage"),
                "rootCause": extract_labeled_value(block, "Root cause"),
                "recommendation": recommendation,
                "cta": cta,
            }
        )

    return {
        "tag": tag,
        "h2": h2,
        "h3": h3,
        "problems": problems,
        "finalCta": final_cta,
    }


def parse_engine_types(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Short introduction (1 sentence)") or extract_labeled_value(lines, "Introduction")

    items: List[Dict[str, str]] = []
    idx = 0
    while idx < len(lines):
        item_match = NUMBERED_ITEM_RE.match(lines[idx])
        if item_match and ctx.brand_name.lower() in lines[idx].lower():
            title = strip_markdown(item_match.group("title"))
            description = strip_markdown(lines[idx + 1]) if idx + 1 < len(lines) else ""
            price_range = strip_markdown(lines[idx + 2]).strip("*") if idx + 2 < len(lines) else ""
            cta = strip_markdown(lines[idx + 3].lstrip("→").strip()) if idx + 3 < len(lines) else ""
            items.append(
                {
                    "title": title,
                    "description": description,
                    "priceRange": price_range,
                    "cta": cta,
                }
            )
            idx += 4
            continue
        idx += 1

    closing = find_line_after_prefix(lines, ("closing line",))
    return {"tag": tag, "h2": h2, "intro": intro, "types": items, "closing": closing}


def parse_engine_sizes(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Intro")
    closing = find_line_after_prefix(lines, ("closing line",))

    groups: List[Dict[str, Any]] = []
    current_group: Optional[Dict[str, Any]] = None
    current_item: Optional[Dict[str, str]] = None

    def flush_item() -> None:
        nonlocal current_item, current_group
        if current_group is not None and current_item is not None:
            description, extracted = extract_inline_labeled_segments(
                clean_text(current_item["description"]),
                (
                    ("engineCodes", "Engine code(s):"),
                    ("engineCodes", "Engine/motor code(s):"),
                    ("compatibleModels", "Compatible models (UK):"),
                    ("productionYears", "Production years:"),
                    ("ignoredImportantNotes", "Important notes:"),
                    ("commonFailurePoints", "Common failure points:"),
                ),
            )
            current_item["description"] = description
            if extracted.get("engineCodes"):
                current_item["engineCodes"] = split_field_values(extracted["engineCodes"])
            if extracted.get("compatibleModels"):
                current_item["compatibleModels"] = split_field_values(extracted["compatibleModels"])
            if extracted.get("productionYears"):
                current_item["productionYears"] = extracted["productionYears"]
            if extracted.get("commonFailurePoints"):
                current_item["commonFailurePoints"] = split_field_values(extracted["commonFailurePoints"])
            current_group["items"].append(current_item)
        current_item = None

    def flush_group() -> None:
        nonlocal current_group
        flush_item()
        if current_group is not None and current_group["items"]:
            groups.append(current_group)
        current_group = None

    for raw in lines:
        line = normalize_text(raw)
        lower = line.lower()
        if lower.startswith(("closing line", "keyword", "master prompt", "objective")):
            break

        group_title = ""
        if TOP_GROUP_RE.match(line):
            group_title = strip_markdown(TOP_GROUP_RE.match(line).group("title"))
        elif lower.endswith("diesel engine sizes") or lower.endswith("petrol engine sizes") or "hybrid & electric powertrains" in lower:
            group_title = line

        if group_title:
            flush_group()
            current_group = {"title": group_title, "items": []}
            continue

        item_title = ""
        sub_match = SUB_GROUP_RE.match(line)
        if sub_match:
            item_title = strip_markdown(sub_match.group("title"))
        elif line.lower().startswith(ctx.brand_name.lower()) and line.lower().endswith("engines"):
            item_title = line

        if item_title:
            if current_group is None:
                continue
            flush_item()
            current_item = {"title": item_title, "description": "", "cta": ""}
            continue

        arrow = ARROW_LINE_RE.match(line)
        if arrow and current_item is not None:
            current_item["cta"] = arrow.group("text").strip()
            continue

        if current_item is not None and line:
            if current_item["description"]:
                current_item["description"] += " "
            current_item["description"] += strip_markdown(line.lstrip("- ").strip())

    flush_group()

    return {"tag": tag, "h2": h2, "intro": intro, "groups": groups, "closing": closing}


def parse_fuel_types(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Intro (1 line)") or extract_labeled_value(lines, "Intro")
    closing = find_line_after_prefix(lines, ("closing line",))

    items: List[Dict[str, str]] = []
    idx = 0
    while idx < len(lines):
        current = normalize_text(lines[idx])
        h3_match = re.match(r"^\*{0,2}H3:\*{0,2}\s*(.+)$", current, re.IGNORECASE)
        if not h3_match:
            idx += 1
            continue

        title = strip_markdown(h3_match.group(1))
        idx += 1
        description_parts: List[str] = []
        cta = ""
        while idx < len(lines):
            line = normalize_text(lines[idx])
            lower = line.lower()
            if re.match(r"^\*{0,2}H3:\*{0,2}\s*(.+)$", line, re.IGNORECASE):
                break
            if lower.startswith(("closing line", "keyword", "master prompt", "objective")):
                break
            arrow = ARROW_LINE_RE.match(line)
            if arrow:
                cta = arrow.group("text").strip()
            else:
                description_parts.append(strip_markdown(line.lstrip("- ").strip()))
            idx += 1
        if not cta:
            cta = f"Compare {title} options"
        items.append({"title": title, "description": " ".join(part for part in description_parts if part), "cta": cta})

    return {"tag": tag, "h2": h2, "intro": intro, "items": items, "closing": closing}


def parse_engine_code_directory(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag") or "Engine Codes"
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Intro (1 line)") or extract_labeled_value(lines, "Intro")
    closing = find_line_after_prefix(lines, ("closing line (block a)", "closing line"))

    families: List[Dict[str, Any]] = []
    idx = 0
    while idx < len(lines):
        match = re.match(r"^\*{0,2}H3:\*{0,2}\s*(.+)$", lines[idx], re.IGNORECASE)
        if not match:
            idx += 1
            continue

        family_name = strip_markdown(match.group(1))
        if family_name.lower().startswith("full "):
            break

        idx += 1
        entries: List[Dict[str, str]] = []
        while idx < len(lines):
            if re.match(r"^\*{0,2}H3:\*{0,2}\s*(.+)$", lines[idx], re.IGNORECASE) or lines[idx].lower().startswith("**block b") or lines[idx].lower().startswith("block b"):
                break

            h4_match = re.match(r"^\*{0,2}H4:\*{0,2}\s*(.+)$", lines[idx], re.IGNORECASE)
            if h4_match:
                title = strip_markdown(h4_match.group(1))
                idx += 1
                description_parts: List[str] = []
                cta = ""
                while idx < len(lines):
                    current = lines[idx]
                    if re.match(r"^\*{0,2}H4:\*{0,2}\s*(.+)$", current, re.IGNORECASE) or re.match(r"^\*{0,2}H3:\*{0,2}\s*(.+)$", current, re.IGNORECASE) or current.lower().startswith("**block b") or current.lower().startswith("block b"):
                        break
                    arrow = ARROW_LINE_RE.match(current)
                    if arrow:
                        cta = arrow.group("text").strip()
                    elif current and current not in ("---",):
                        description_parts.append(strip_markdown(current))
                    idx += 1

                first_code = title.split()[0].replace("/", " ")
                entries.append(
                    {
                        "title": title,
                        "image": build_code_image_path(ctx.brand_slug, first_code),
                        "description": " ".join(description_parts),
                        "cta": cta,
                    }
                )
                continue
            idx += 1

        families.append({"name": family_name, "entries": entries})

    directory_h3 = ""
    directory_label = ""
    directory_intro = ""
    codes: List[Dict[str, str]] = []

    for idx, line in enumerate(lines):
        if "full " in line.lower() and "engine code directory" in line.lower():
            directory_h3 = strip_markdown(line.split(":", 1)[-1].strip()) if ":" in line else strip_markdown(line)
        elif "accordion label" in line.lower():
            directory_label = line.split(":", 1)[-1].strip().strip('"')
        elif line.lower().startswith("**intro (1 line inside accordion)") or line.lower().startswith("intro (1 line inside accordion)"):
            directory_intro = line.split(":", 1)[-1].strip()
        elif line.lower().startswith("**alphabetical engine code list") or line.lower().startswith("alphabetical engine code list"):
            j = idx + 1
            while j < len(lines):
                current = lines[j]
                if current.startswith("---") or current.lower().startswith("**keyword coverage"):
                    break
                if "user to insert complete alphabetical list" in current.lower():
                    j += 1
                    continue
                candidate = strip_markdown(current).lstrip("- ").strip()
                if "engine" in candidate.lower() and " – " in candidate:
                    left, right = candidate.split(" – ", 1)
                    left = re.sub(rf"^{re.escape(ctx.brand_name)}\s+", "", left, flags=re.IGNORECASE).strip()
                    fuel = right.replace("Engine", "").strip()
                    if left:
                        codes.append({"code": left, "fuel": fuel})
                j += 1
            break

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "families": families,
        "closing": closing,
        "directory": {
            "h3": directory_h3 or f"Full {ctx.brand_name} Engine Code Directory (All Years)",
            "label": directory_label or f"View all {ctx.brand_name} engine codes",
            "intro": directory_intro,
            "codes": codes,
        },
    }


def parse_engine_years(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag") or "Engine Years"
    h2 = extract_labeled_value(lines, "H2")
    if not h2 and lines:
        h2 = strip_markdown(lines[1]) if len(lines) > 1 else f"{ctx.brand_name} Engines by Year – What Was Fitted & When"

    intro = ""
    for line in lines:
        if line.startswith("This section covers") or line.lower().startswith("intro") or "year-by-year" in line.lower():
            intro = strip_markdown(line.split(":", 1)[-1].strip()) if ":" in line else strip_markdown(line)
            break

    years: List[Dict[str, str]] = []
    idx = 0
    while idx < len(lines):
        match = YEAR_BLOCK_RE.match(lines[idx])
        if not match:
            idx += 1
            continue

        year_label = match.group("year").strip()
        preview = match.group("title").replace("🔴", "").strip()
        idx += 1
        block_lines: List[str] = []
        cta = ""

        while idx < len(lines):
            current = lines[idx]
            if YEAR_BLOCK_RE.match(current) or current.lower().startswith("closing line") or current.startswith("#12"):
                break
            arrow = ARROW_LINE_RE.match(current)
            if arrow:
                cta = arrow.group("text").strip()
            else:
                block_lines.append(strip_markdown(current))
            idx += 1

        short_intro = ""
        key_changes: List[str] = []
        main_engines: List[str] = []
        popular_models: List[str] = []
        known_for: List[str] = []
        engine_codes_covered: List[str] = []
        ticker = ""
        description_parts: List[str] = []
        current_bucket: Optional[str] = None

        for line in block_lines:
            cleaned = strip_markdown(line)
            lowered = cleaned.lower()
            if not cleaned:
                continue
            if lowered.startswith("short intro:"):
                short_intro = strip_markdown(cleaned.split(":", 1)[1])
                current_bucket = None
                continue
            if lowered == "key changes":
                current_bucket = "key_changes"
                continue
            if lowered == "main engines":
                current_bucket = "main_engines"
                continue
            if lowered == "popular models":
                current_bucket = "popular_models"
                continue
            if lowered == "known for":
                current_bucket = "known_for"
                continue
            if lowered.startswith("[tags] engine codes covered:"):
                codes_value = strip_markdown(cleaned.split(":", 1)[1]) if ":" in cleaned else ""
                engine_codes_covered = [strip_markdown(code) for code in codes_value.split(",") if strip_markdown(code)]
                current_bucket = None
                continue
            if lowered.startswith("[ticker]"):
                ticker = strip_markdown(cleaned.split("]", 1)[-1]).lstrip(": ").strip()
                current_bucket = None
                continue

            if current_bucket == "key_changes":
                key_changes.append(cleaned)
            elif current_bucket == "main_engines":
                main_engines.append(cleaned)
            elif current_bucket == "popular_models":
                popular_models.append(cleaned)
            elif current_bucket == "known_for":
                known_for.append(cleaned)
            else:
                description_parts.append(cleaned)

        description = short_intro or " ".join(part for part in description_parts if part and not part.startswith("[Ticker]"))
        years.append(
            {
                "year": year_label,
                "preview": preview,
                "description": description,
                **({"keyChanges": key_changes} if key_changes else {}),
                **({"mainEngines": main_engines} if main_engines else {}),
                **({"popularModels": popular_models} if popular_models else {}),
                **({"knownFor": known_for} if known_for else {}),
                **({"engineCodesCovered": engine_codes_covered} if engine_codes_covered else {}),
                **({"ticker": ticker} if ticker else {}),
                "cta": cta,
            }
        )

    closing = find_line_after_prefix(lines, ("closing line",))
    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "jumpLabel": "Jump to year",
        "years": years,
        "closing": closing,
    }


def generic_faq_cta(brand: str, question: str) -> str:
    lower = question.lower()
    if "cost" in lower or "price" in lower:
        return f"Compare {brand} engine prices now"
    if "warranty" in lower:
        return f"Find {brand} engines with warranty"
    if "specialists" in lower or "near me" in lower:
        return f"Get quotes from UK {brand} engine specialists"
    if "used" in lower or "reconditioned" in lower:
        return f"Compare used and reconditioned {brand} engine options"
    return f"Get a {brand} engine quote now"


def split_inline_faq_entry(value: str) -> Tuple[str, str, str]:
    text = strip_markdown(value)
    question_match = re.match(r"^(?P<question>.+?\?)(?P<rest>.+)$", text)
    if not question_match:
        return text, "", ""

    question = strip_markdown(question_match.group("question"))
    remainder = strip_markdown(question_match.group("rest"))
    if not remainder:
        return question, "", ""

    sentences = split_sentences(remainder)
    answer = remainder
    cta = ""
    if sentences:
        last_sentence = sentences[-1]
        if any(
            token in last_sentence.lower()
            for token in ("compare", "check", "find", "get", "quote", "quotes", "use our", "secure")
        ):
            cta = last_sentence
            sentences = sentences[:-1]
        answer = " ".join(sentences) if sentences else remainder

    return question, answer, cta


def parse_faq(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag") or "FAQ"
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Intro (1 line)") or extract_labeled_value(lines, "Intro")

    items: List[Dict[str, str]] = []
    idx = 0
    while idx < len(lines):
        question_match = FAQ_QUESTION_RE.match(normalize_text(lines[idx]))
        if not question_match:
            idx += 1
            continue

        raw_question = strip_markdown(question_match.group("question_q") or question_match.group("question_n") or "")
        question, inline_answer, inline_cta = split_inline_faq_entry(raw_question)
        idx += 1
        summary = inline_answer
        key_points: List[str] = []
        warning = ""
        cta = inline_cta
        in_key_points = False

        while idx < len(lines):
            current = normalize_text(lines[idx])
            lower = current.lower()
            if FAQ_QUESTION_RE.match(current) or current.startswith("---") or lower.startswith(("**keyword coverage", "keyword", "master prompt", "objective")) or current.startswith("#13") or current.startswith("Section 13:"):
                break
            if lower.startswith(("disclaimer:", "**disclaimer")):
                break
            if lower.startswith(("short summary:", "**short summary:")):
                summary = strip_markdown(current.split(":", 1)[1]).strip()
                idx += 1
                continue
            if lower.startswith(("key points:", "**key points:")):
                in_key_points = True
                idx += 1
                continue
            arrow = ARROW_LINE_RE.match(current)
            if arrow:
                cta = arrow.group("text").strip()
                in_key_points = False
            elif lower.startswith("warning:") or current.startswith("⚠"):
                warning = strip_markdown(current.split(":", 1)[1]).strip() if ":" in current else strip_markdown(current)
            elif in_key_points:
                key_points.append(strip_markdown(current.lstrip("â€¢- ").strip()))
            else:
                if not summary and current:
                    summary = strip_markdown(current)
            idx += 1

        answer_parts = [summary] if summary else []
        if key_points:
            answer_parts.append(" ".join(key_points))

        items.append(
            {
                "question": question,
                "answer": " ".join(part for part in answer_parts if part),
                "cta": cta or generic_faq_cta(ctx.brand_name, question),
                **({"keyPoints": key_points} if key_points else {}),
                **({"warning": warning} if warning else {}),
            }
        )

    return {"tag": tag, "h2": h2, "intro": intro, "items": items}


def parse_trust_cta(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Intro (1 line)") or extract_labeled_value(lines, "Intro")
    final_text = extract_labeled_value(lines, "Final CTA sentence")
    button_text = extract_labeled_value(lines, "CTA Button text")

    points: List[Dict[str, str]] = []
    for line in lines:
        if line.startswith("- **") and "–" in line:
            left, right = line.lstrip("- ").split("–", 1)
            title = strip_markdown(left)
            description = strip_markdown(right)
            points.append({"title": title, "description": description})

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "points": clean_trust_points(points),
        "finalText": final_text,
        "buttonText": button_text,
    }


def parse_price_table_v2(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    h3 = extract_labeled_value(lines, "H3 (subheading)") or extract_labeled_value(lines, "H3")

    filters: List[str] = ["All", "Diesel", "Petrol"]
    for line in lines:
        if "filter/toggle bar" in line.lower() and "|" in line:
            quoted_match = re.search(r'["“](?P<filters>[^"”]+?\|[^"”]+?)["”]', line)
            if quoted_match:
                toggle_text = quoted_match.group("filters")
            else:
                fallback_match = re.search(r"(?P<filters>All\s*\|.+?)(?:\s+so\b|$)", line, re.IGNORECASE)
                toggle_text = fallback_match.group("filters") if fallback_match else line.split(":", 1)[-1]
            parsed_filters = [clean_text(part.strip('"“”')) for part in toggle_text.split("|") if clean_text(part)]
            if parsed_filters:
                filters = parsed_filters
            break

    groups: List[Dict[str, Any]] = []
    idx = 0
    while idx < len(lines):
        line = lines[idx]
        group_match = GROUP_RE.match(line)
        top_group_match = TOP_GROUP_RE.match(line)
        if not group_match and not top_group_match:
            idx += 1
            continue

        raw_name = strip_markdown(group_match.group("name") if group_match else top_group_match.group("title"))
        if raw_name.lower().startswith(("keyword", "master prompt", "visual", "objective")):
            idx += 1
            continue

        era_match = re.search(r"\(([^)]+)\)$", raw_name)
        era = era_match.group(1).strip() if era_match else "All years"
        name = raw_name[: raw_name.rfind("(")].strip() if era_match else raw_name

        idx += 1
        engines: List[Dict[str, str]] = []
        failure_bits: List[str] = []

        while idx < len(lines):
            current = lines[idx]
            if GROUP_RE.match(current) or TOP_GROUP_RE.match(current) or SECTION_HEADING_RE.match(current):
                break
            if current.lower().startswith(("keyword coverage", "**keyword coverage", "master prompt", "objective")):
                break

            if is_table_row(current) and not is_separator_row(current):
                cells = split_markdown_row(current)
                if cells and cells[0].lower() == "engine code":
                    idx += 1
                    continue
                if cells and cells[0].lower().startswith("get quote"):
                    idx += 1
                    continue
                if len(cells) >= 6:
                    code = cells[0]
                    cta = f"Get Quote for {code}"
                    if idx + 1 < len(lines):
                        next_line = lines[idx + 1]
                        next_arrow = ARROW_LINE_RE.match(next_line)
                        if next_arrow:
                            cta = next_arrow.group("text").strip()
                        elif next_line.lower().startswith("cta:"):
                            cta = strip_markdown(next_line.split(":", 1)[1]).lstrip("→").strip()
                    engines.append(
                        {
                            "code": code,
                            "fuel": cells[1],
                            "size": cells[2],
                            "power": cells[3],
                            "compatibleModels": cells[4],
                            "avgRebuiltPrice": cells[5],
                            "cta": cta,
                        }
                    )
            elif current and not current.startswith("---") and "|" not in current:
                failure_bits.append(strip_markdown(current))
            idx += 1

        failure_note = " ".join(bit for bit in failure_bits if bit)
        failure_note = re.sub(r"(?:\[\s*Get Quote.*?\]\s*)+", "", failure_note, flags=re.IGNORECASE)
        failure_note = re.sub(r"^Common replacement trigger\s*:?\s*", "", failure_note, flags=re.IGNORECASE)
        failure_note = re.sub(
            r"^Common failure points\s*\(expandable note\)\s*:?\s*",
            "",
            failure_note,
            flags=re.IGNORECASE,
        )
        lower_failure_note = failure_note.lower()
        if "closing note" in lower_failure_note:
            failure_note = failure_note[: lower_failure_note.index("closing note")].strip(" -:;,.")

        groups.append(
            {
                "name": name,
                "era": era,
                "failureNote": clean_text(failure_note),
                "engines": engines,
            }
        )

    return {"tag": tag, "h2": h2, "h3": h3, "filters": filters, "groups": groups}


def parse_repair_options(lines: Sequence[str]) -> List[Dict[str, str]]:
    options: List[Dict[str, str]] = []
    in_options = False

    for raw_line in lines:
        line = normalize_text(raw_line)
        lower = line.lower()
        if lower.startswith("repair options"):
            in_options = True
            continue
        if not in_options:
            continue
        if lower.startswith(("our recommendation:", "cta:", "cta button:", "disclaimer:")):
            break
        if lower.startswith("repair tier dealer price"):
            continue

        price_matches = list(REPAIR_PRICE_RE.finditer(line))
        if len(price_matches) < 2:
            continue

        dealer_match, specialist_match = price_matches[0], price_matches[1]
        tier = strip_markdown(line[: dealer_match.start()])
        rest = strip_markdown(line[specialist_match.end() :])
        what_it_involves = rest
        longevity = ""
        longevity_match = REPAIR_LONGEVITY_RE.search(rest)
        if longevity_match:
            longevity = strip_markdown(longevity_match.group("longevity"))
            what_it_involves = strip_markdown(rest[: longevity_match.start()])
        else:
            sentences = split_sentences(rest)
            if len(sentences) > 1 and any(
                token in sentences[-1].lower() for token in ("year", "viable", "appropriate", "suitable", "warranty")
            ):
                what_it_involves = " ".join(sentences[:-1]).strip()
                longevity = sentences[-1].strip()

        options.append(
            {
                "tier": tier,
                "dealerPrice": strip_markdown(dealer_match.group()),
                "specialistPrice": strip_markdown(specialist_match.group()),
                "whatItInvolves": what_it_involves,
                "longevity": longevity,
            }
        )

    return options


def parse_common_problems_v2(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    h3 = extract_labeled_value(lines, "H3")

    blocks: List[List[str]] = []
    current: List[str] = []
    for line in lines:
        if H4_RE.match(line):
            if current:
                blocks.append(current)
            current = [line]
            continue
        if current:
            current.append(line)
    if current:
        blocks.append(current)

    problems: List[Dict[str, str]] = []
    final_cta = {"h4": "", "paragraph": "", "buttonText": "", "disclaimer": ""}

    for block in blocks:
        h4 = extract_labeled_value(block, "H4")
        if not h4:
            continue
        lowered_h4 = h4.lower()
        if lowered_h4.startswith(("don’t let", "don't let")):
            initial_paragraph = extract_labeled_value(block, "Paragraph")
            paragraph_parts: List[str] = [initial_paragraph] if initial_paragraph else []
            disclaimer = extract_labeled_value(block, "Disclaimer")
            button_text = extract_labeled_value(block, "CTA Button") or extract_labeled_value(block, "CTA")
            for line in block[1:]:
                lower = line.lower()
                if lower.startswith(("disclaimer:", "**disclaimer", "keyword coverage", "master prompt", "objective")):
                    break
                elif is_table_row(line):
                    break
                elif ARROW_LINE_RE.match(line) or line.strip() in ("→", "->"):
                    continue
                elif lower.startswith(("cta button:", "cta:", "**cta", "paragraph:", "note/disclaimer under")):
                    continue
                elif line and not line.startswith("---"):
                    paragraph_parts.append(strip_markdown(line))
            final_cta = {
                "h4": h4,
                "paragraph": " ".join(part for part in paragraph_parts if part),
                "buttonText": button_text,
                "disclaimer": strip_markdown(disclaimer),
            }
            continue

        group = derive_problem_group(h4)
        repair_options = parse_repair_options(block)
        problems.append(
            {
                "group": group,
                "h4": h4,
                "image": build_problem_image_path(ctx.brand_slug, group),
                "affectedModels": extract_labeled_value(block, "Affected models"),
                "typicalFailureMileage": extract_labeled_value(block, "Typical failure mileage"),
                "rootCause": extract_labeled_value(block, "Root cause"),
                **({"repairOptions": repair_options} if repair_options else {}),
                "recommendation": extract_labeled_value(block, "Our recommendation"),
                "cta": extract_labeled_value(block, "CTA"),
            }
        )

    return {"tag": tag, "h2": h2, "h3": h3, "problems": problems, "finalCta": final_cta}


def parse_engine_types_v2(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Short introduction (1 sentence)") or extract_labeled_value(lines, "Introduction")

    items: List[Dict[str, str]] = []
    idx = 0
    while idx < len(lines):
        item_match = NUMBERED_ITEM_RE.match(lines[idx])
        if not item_match or ctx.brand_name.lower() not in lines[idx].lower():
            idx += 1
            continue

        raw_title = strip_markdown(item_match.group("title"))
        title = raw_title
        description = ""
        price_range = ""
        cta = ""

        inline_price_match = re.search(r"(Typical (?:price range|added cost):\s*[^→]+)", raw_title, re.IGNORECASE)
        inline_cta_match = re.search(r"(?:→|->)\s*(.+)$", raw_title)
        if inline_price_match:
            price_range = strip_markdown(inline_price_match.group(1))
            title = strip_markdown(raw_title[: inline_price_match.start()]).strip()
        if inline_cta_match:
            cta = strip_markdown(inline_cta_match.group(1))
            if "Typical " in title:
                title = strip_markdown(title.split("Typical ", 1)[0]).strip()

        j = idx + 1
        while j < len(lines):
            current = lines[j]
            lower = current.lower()
            if NUMBERED_ITEM_RE.match(current) and ctx.brand_name.lower() in lower:
                break
            if current.startswith("---") or lower.startswith("closing line"):
                break
            arrow = ARROW_LINE_RE.match(current)
            if "typical price range" in lower or "typical added cost" in lower:
                price_range = strip_markdown(current).strip("*")
            elif arrow:
                cta = arrow.group("text").strip()
            elif lower.startswith("cta:"):
                cta = strip_markdown(current.split(":", 1)[1]).lstrip("→").strip()
            elif current not in ("[FRONT CARD]", "[FLIPCARD]") and not description and current:
                description = strip_markdown(current)
            j += 1

        if not cta:
            cta = f"Compare {title} prices"
        items.append({"title": title, "description": description, "priceRange": price_range, "cta": cta})
        idx = j

    closing = find_line_after_prefix(lines, ("closing line",))
    return {"tag": tag, "h2": h2, "intro": intro, "types": items, "closing": closing}


def parse_engine_code_directory_v2(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag") or "Engine Codes"
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Intro (1 line)") or extract_labeled_value(lines, "Intro")
    closing = find_line_after_prefix(lines, ("closing line (block a)", "closing line"))

    families: List[Dict[str, Any]] = []
    idx = 0
    while idx < len(lines):
        current = lines[idx]
        h3_match = re.match(r"^\*{0,2}H3:\*{0,2}\s*(.+)$", current, re.IGNORECASE)
        top_group_match = TOP_GROUP_RE.match(current)
        if not h3_match and not top_group_match:
            idx += 1
            continue

        family_name = strip_markdown(h3_match.group(1) if h3_match else top_group_match.group("title"))
        lower_family = family_name.lower()
        if lower_family.startswith(("full ", "block b", "keyword", "master prompt")):
            break

        idx += 1
        entries: List[Dict[str, str]] = []
        while idx < len(lines):
            line = lines[idx]
            if (
                re.match(r"^\*{0,2}H3:\*{0,2}\s*(.+)$", line, re.IGNORECASE)
                or TOP_GROUP_RE.match(line)
                or line.lower().startswith(("block b", "**block b", "keyword", "master prompt"))
            ):
                break

            h4_match = re.match(r"^\*{0,2}H4:\*{0,2}\s*(.+)$", line, re.IGNORECASE)
            if not h4_match:
                idx += 1
                continue

            raw_h4 = normalize_text(strip_markdown(h4_match.group(1)))
            title = raw_h4
            description_parts: List[str] = []
            cta = ""

            if "→" in raw_h4:
                head, _, inline_cta = raw_h4.partition("→")
                raw_h4 = head.strip()
                cta = inline_cta.strip()

            inline_match = re.match(
                r"^(?P<title>.+?\b(?:Diesel|Petrol|Hybrid|Electric))(?P<description>.+)$",
                raw_h4,
                re.IGNORECASE,
            )
            if inline_match:
                title = strip_markdown(inline_match.group("title"))
                inline_description = strip_markdown(inline_match.group("description"))
                if inline_description:
                    description_parts.append(inline_description)
            else:
                title = strip_markdown(raw_h4)

            idx += 1
            while idx < len(lines):
                sub = lines[idx]
                lower = sub.lower()
                if (
                    re.match(r"^\*{0,2}H4:\*{0,2}\s*(.+)$", sub, re.IGNORECASE)
                    or re.match(r"^\*{0,2}H3:\*{0,2}\s*(.+)$", sub, re.IGNORECASE)
                    or TOP_GROUP_RE.match(sub)
                    or lower.startswith(("block b", "**block b", "keyword", "master prompt"))
                ):
                    break
                arrow = ARROW_LINE_RE.match(sub)
                if arrow:
                    cta = arrow.group("text").strip()
                elif lower.startswith("cta:"):
                    cta = strip_markdown(sub.split(":", 1)[1]).lstrip("→").strip()
                elif sub and sub not in ("---",):
                    description_parts.append(strip_markdown(sub))
                idx += 1

            first_code = title.split()[0].replace("/", " ")
            if not cta:
                cta = f"Get quotes for {first_code} {ctx.brand_name} engine replacement"
            entries.append(
                {
                    "title": title,
                    "image": build_code_image_path(ctx.brand_slug, first_code),
                    "description": " ".join(description_parts),
                    "cta": cta,
                }
            )

        if entries:
            families.append({"name": family_name, "entries": entries})

    directory_h3 = ""
    directory_label = ""
    directory_intro = ""
    codes: List[Dict[str, str]] = []
    for idx, line in enumerate(lines):
        lower = line.lower()
        if "full " in lower and "engine code directory" in lower:
            directory_h3 = strip_markdown(line.split(":", 1)[-1].strip()) if ":" in line else strip_markdown(line)
        elif "accordion label" in lower:
            directory_label = line.split(":", 1)[-1].strip().strip('"')
        elif lower.startswith(("**intro (1 line inside accordion)", "intro (1 line inside accordion)")):
            directory_intro = line.split(":", 1)[-1].strip()
        elif lower.startswith(("**alphabetical engine code list", "alphabetical engine code list")):
            j = idx + 1
            while j < len(lines):
                candidate = strip_markdown(lines[j]).lstrip("- ").strip()
                lower_candidate = candidate.lower()
                if lines[j].startswith("---") or lower_candidate.startswith(("keyword", "master prompt")):
                    break
                if any(phrase in lower_candidate for phrase in ("user to insert complete alphabetical list", "placeholder", "the user must provide", "[fuel type]")):
                    j += 1
                    continue
                if "engine" in lower_candidate and (" – " in candidate or " â€“ " in candidate):
                    splitter = " – " if " – " in candidate else " â€“ "
                    left, right = candidate.split(splitter, 1)
                    left = re.sub(rf"^{re.escape(ctx.brand_name)}\s+", "", left, flags=re.IGNORECASE).strip()
                    fuel = right.replace("Engine", "").strip()
                    if left:
                        codes.append({"code": left, "fuel": fuel})
                j += 1
            break

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "families": families,
        "closing": closing,
        "directory": {
            "h3": directory_h3 or f"Full {ctx.brand_name} Engine Code Directory (All Years)",
            "label": directory_label or f"View all {ctx.brand_name} engine codes",
            "intro": directory_intro,
            "codes": codes,
        },
    }


def derive_directory_codes_from_engine_groups(engine_codes: Dict[str, Any]) -> List[Dict[str, str]]:
    seen: set[Tuple[str, str]] = set()
    codes: List[Dict[str, str]] = []

    for group in engine_codes.get("groups", []):
        for engine in group.get("engines", []):
            code = strip_markdown(engine.get("code", ""))
            fuel = strip_markdown(engine.get("fuel", ""))
            if not code:
                continue
            key = (code, fuel)
            if key in seen:
                continue
            seen.add(key)
            codes.append({"code": code, "fuel": fuel})

    return codes


def dedupe_directory_codes(codes: Sequence[Dict[str, str]]) -> List[Dict[str, str]]:
    seen: set[Tuple[str, str]] = set()
    unique_codes: List[Dict[str, str]] = []

    for item in codes:
        code = strip_markdown(item.get("code", ""))
        fuel = strip_markdown(item.get("fuel", ""))
        lower_code = code.lower()
        if not code or any(phrase in lower_code for phrase in ("placeholder", "the user must provide", "[fuel type]")):
            continue
        key = (code, fuel)
        if key in seen:
            continue
        seen.add(key)
        unique_codes.append({"code": code, "fuel": fuel})

    return unique_codes


def parse_trust_cta_v2(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Intro (1 line)") or extract_labeled_value(lines, "Intro")
    final_text = extract_labeled_value(lines, "Final CTA sentence")
    button_text = extract_labeled_value(lines, "CTA Button text")

    points: List[Dict[str, str]] = []
    for line in lines:
        stripped = line.lstrip("- ").strip()
        if not line.startswith("- "):
            continue
        if " - " in stripped:
            left, right = stripped.split(" - ", 1)
        elif " â€“ " in stripped:
            left, right = stripped.split(" â€“ ", 1)
        elif " – " in stripped:
            left, right = stripped.split(" – ", 1)
        else:
            continue
        points.append({"title": strip_markdown(left), "description": strip_markdown(right)})

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "points": clean_trust_points(points),
        "finalText": final_text,
        "buttonText": button_text,
    }


def parse_trust_cta_v3(lines: Sequence[str], ctx: ParseContext) -> Dict[str, Any]:
    tag = extract_labeled_value(lines, "Tag")
    h2 = extract_labeled_value(lines, "H2")
    intro = extract_labeled_value(lines, "Intro (1 line)") or extract_labeled_value(lines, "Intro")
    final_text = extract_labeled_value(lines, "Final CTA sentence") or extract_labeled_value(lines, "Final CTA")
    button_text = extract_labeled_value(lines, "CTA Button text") or extract_labeled_value(lines, "CTA Button")
 
    points: List[Dict[str, str]] = []
    reading_points = False
    for line in lines:
        normalized = normalize_text(line)
        lower = normalized.lower()
        if not normalized:
            continue
        if looks_like_metadata_noise(normalized):
            break
        if lower.startswith(("keyword", "master prompt", "objective")):
            break
        if lower.startswith("trust points"):
            reading_points = True
            continue
        if lower.startswith(("final cta", "cta button")):
            reading_points = False
            continue
        if not reading_points and not normalized.startswith("- "):
            continue
        stripped = normalized.lstrip("- ").strip()
        if " - " in stripped:
            left, right = stripped.split(" - ", 1)
        elif " – " in stripped:
            left, right = stripped.split(" – ", 1)
        else:
            continue
        points.append({"title": strip_markdown(left), "description": strip_markdown(right)})

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "points": clean_trust_points(points),
        "finalText": final_text,
        "buttonText": button_text,
    }


def parse_document(path: Path) -> Tuple[Dict[str, Any], List[str]]:
    paragraphs = read_docx_paragraphs(path)
    brand_name = infer_brand_name(paragraphs, path.stem)
    brand_slug = slugify(brand_name)
    ctx = ParseContext(brand_name=brand_name, brand_slug=brand_slug, source_path=path)

    sections = split_sections(paragraphs)
    warnings: List[str] = []

    hero_section = find_section_by_keywords(sections, ("hero",), fallback=(1, 0))
    how_it_works_section = find_section_by_keywords(sections, ("how it works",), fallback=(2, 0))
    live_market_section = find_section_by_keywords(sections, ("live market",), fallback=(3, 0))
    reviews_section = find_section_by_keywords(sections, ("review", "rating"))
    models_section = find_section_by_keywords(sections, ("popular models", "models we cover"), fallback=(5, 0))
    engine_codes_section = find_section_by_keywords(sections, ("engine price table", "price table"), fallback=(6, 0))
    common_problems_section = find_section_by_keywords(
        sections,
        ("engine problems", "common problems"),
        fallback=(6, 1),
    )
    engine_types_section = find_section_by_keywords(sections, ("engine types",), fallback=(8, 0))
    engine_sizes_section = find_section_by_keywords(sections, ("engine sizes",), fallback=(9, 0))
    fuel_types_section = find_section_by_keywords(sections, ("fuel types", "engine fuel types"), fallback=(10, 0))
    engine_code_directory_section = find_section_by_keywords(sections, ("engine codes", "code directory"), fallback=(11, 0))
    engine_years_section = find_section_by_keywords(sections, ("engine years", "engines by year"), fallback=(12, 0))
    faq_section = find_section_by_keywords(sections, ("faq", "frequently asked questions"), fallback=(13, 0))
    trust_cta_section = find_section_by_keywords(sections, ("trust", "cta"), fallback=(14, 0))

    tone = derive_tone(hero_section.get("lines", []))
    hero = parse_hero(hero_section.get("lines", []), ctx)

    live_market = parse_live_market(live_market_section.get("lines", []), ctx)
    engine_codes = parse_price_table_v2(engine_codes_section.get("lines", []), ctx)
    engine_code_directory = parse_engine_code_directory_v2(engine_code_directory_section.get("lines", []), ctx)
    engine_code_directory["directory"]["codes"] = dedupe_directory_codes(engine_code_directory["directory"].get("codes", []))
    if not engine_code_directory["directory"]["codes"]:
        engine_code_directory["directory"]["codes"] = dedupe_directory_codes(
            derive_directory_codes_from_engine_groups(engine_codes)
        )
    if not engine_code_directory["directory"]["codes"]:
        warnings.append(f"{path.name}: full engine code directory list was not found, so directory.codes is empty.")

    data = {
        "brand": {
            "name": brand_name,
            "slug": brand_slug,
            "tone": tone,
        },
        "seo": {
            "title": hero.get("h1") or f"{brand_name} Engine Replacement",
            "description": hero.get("subheading") or f"Compare {brand_name} engine prices from UK specialists.",
            "canonical": f"/{brand_slug}",
        },
        "assets": build_assets(brand_slug),
        "sections": {
            "hero": hero,
            "howItWorks": parse_how_it_works(how_it_works_section.get("lines", []), ctx),
            "liveMarketPrices": live_market,
            "reviews": parse_reviews(reviews_section.get("lines", []), ctx),
            "models": parse_models(models_section.get("lines", []), ctx),
            "engineCodes": engine_codes,
            "commonProblems": parse_common_problems_v2(common_problems_section.get("lines", []), ctx),
            "engineTypes": parse_engine_types_v2(engine_types_section.get("lines", []), ctx),
            "engineSizes": parse_engine_sizes(engine_sizes_section.get("lines", []), ctx),
            "fuelTypes": parse_fuel_types(fuel_types_section.get("lines", []), ctx),
            "engineCodeDirectory": engine_code_directory,
            "engineYears": parse_engine_years(engine_years_section.get("lines", []), ctx),
            "faq": parse_faq(faq_section.get("lines", []), ctx),
            "trustCta": parse_trust_cta_v3(trust_cta_section.get("lines", []), ctx),
        },
    }
    data = deep_clean(data)
    data["sections"]["hero"]["form"]["inputPlaceholder"] = data["sections"]["hero"]["form"]["inputPlaceholder"].strip("[]")
    for year_item in data["sections"]["engineYears"]["years"]:
        if not year_item.get("cta"):
            year_item["cta"] = f"Get quotes for {year_item['year']} {brand_name} engines"

    validate_output(data, warnings, path)
    return data, warnings


def validate_output(data: Dict[str, Any], warnings: List[str], path: Path) -> None:
    required_sections = [
        "hero",
        "howItWorks",
        "liveMarketPrices",
        "reviews",
        "models",
        "engineCodes",
        "commonProblems",
        "engineTypes",
        "engineSizes",
        "fuelTypes",
        "engineCodeDirectory",
        "engineYears",
        "faq",
        "trustCta",
    ]
    for section_name in required_sections:
        if section_name not in data["sections"]:
            warnings.append(f"{path.name}: missing required section '{section_name}'.")

    if not data["sections"]["hero"]["h1"]:
        warnings.append(f"{path.name}: hero.h1 could not be extracted.")
    if not data["sections"]["models"]["cards"]:
        warnings.append(f"{path.name}: no model cards were extracted.")
    if not data["sections"]["engineCodes"]["groups"]:
        warnings.append(f"{path.name}: no engine price table groups were extracted.")
    if not data["sections"]["faq"]["items"]:
        warnings.append(f"{path.name}: no FAQ items were extracted.")


def resolve_inputs(input_path: Path) -> List[Path]:
    if input_path.is_file():
        return [input_path]
    return sorted(p for p in input_path.glob("*.docx") if p.is_file())


def write_output(data: Dict[str, Any], output_dir: Path) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{data['brand']['slug']}.json"
    output_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return output_path


def main(argv: Optional[Sequence[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Extract brand JSON from one .docx file or every .docx file in a folder."
    )
    parser.add_argument(
        "input",
        help="Path to a .docx file or a folder containing brand .docx files.",
    )
    parser.add_argument(
        "--output",
        default=str(default_output_dir()),
        help="Directory where extracted JSON files should be written. Defaults to data/brands/_generated.",
    )
    parser.add_argument(
        "--stdout",
        action="store_true",
        help="Also print the extracted JSON to stdout for single-file runs.",
    )
    args = parser.parse_args(argv)

    input_path = Path(args.input)
    output_dir = Path(args.output)

    files = resolve_inputs(input_path)
    if not files:
        print(f"No .docx files found in: {input_path}", file=sys.stderr)
        return 1

    all_warnings: List[str] = []
    for file_path in files:
        data, warnings = parse_document(file_path)
        output_path = write_output(data, output_dir)
        print(f"Wrote: {output_path}")
        all_warnings.extend(warnings)

        if args.stdout and len(files) == 1:
            print(json.dumps(data, ensure_ascii=False, indent=2))

    if all_warnings:
        print("\nWarnings:", file=sys.stderr)
        for warning in all_warnings:
            print(f"- {warning}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
