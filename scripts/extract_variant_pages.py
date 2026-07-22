#!/usr/bin/env python3
from __future__ import annotations

import argparse
from functools import lru_cache
import json
import re
import sys
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[1]
BRANDS_DIR = REPO_ROOT / "data" / "brands"
MODELS_DIR = REPO_ROOT / "data" / "models"
VARIANTS_DIR = REPO_ROOT / "data" / "variants"

SECTION_RE = re.compile(r"^#?\s*SECTION\s+(?P<number>\d+)(?:\s*[—-]|\s*$)", re.IGNORECASE)
SECTION_RE = re.compile(r"^(?:#+\s*)?SECTION\s+(?P<number>\d+)(?:\s*[â€”-]|\s*$)", re.IGNORECASE)
LABEL_RE = re.compile(r"^(?P<label>[^:]{1,160}):\s*(?P<value>.*)$")
QUESTION_RE = re.compile(r"^Q(?:\d+)?:\s*(?P<value>.+)$", re.IGNORECASE)
H3_RE = re.compile(r"^H3:\s*(?P<value>.+)$", re.IGNORECASE)
H4_RE = re.compile(r"^H4:\s*(?P<value>.+)$", re.IGNORECASE)
MARKDOWN_HEADING_RE = re.compile(r"^(?P<hashes>#{2,6})\s*(?P<value>.+?)\s*$")

KNOWN_LABEL_PREFIXES = (
    "TAG",
    "TAG PILL",
    "H1",
    "H2",
    "H3",
    "H4",
    "Q",
    "INTRO",
    "SUBHEADING",
    "TRUST BADGES",
    "TRUST BULLET",
    "VARIANT IMAGE",
    "MODEL IMAGE",
    "ENGINE THUMBNAILS",
    "PRICE ANCHOR",
    "PRICE ANCHOR ROW",
    "LINE 1",
    "LINE 2",
    "REGISTRATION INPUT",
    "CTA",
    "CTA BUTTON",
    "CTA NOTE",
    "TICKER",
    "CARD",
    "FRONT",
    "FLIP",
    "TIMELINE",
    "KEY SPECS",
    "KEY SPECS SNAPSHOT",
    "COST GUIDE",
    "COMMON FAILURE",
    "COMMON FAILURES",
    "COMMON OPERATIONAL CHARACTERISTICS",
    "CLOSING LINE",
    "FINAL",
    "AFFECTED",
    "AFFECTED MODELS",
    "AFFECTED VEHICLES",
    "TYPICAL FAILURE MILEAGE",
    "ROOT CAUSE",
    "REPAIR OPTIONS",
    "VEHICLE VALUE CHECK",
    "OUR RECOMMENDATION",
    "PARAGRAPH",
    "FEED TABLE",
    "SUBTITLE",
    "SECTION TITLE",
    "SECTION SUBTITLE",
    "META TITLE",
    "META DESCRIPTION",
    "CANONICAL URL",
    "DISCLAIMER",
    "SHORT SUMMARY",
    "WARNING",
    "KEY POINTS",
    "COMPARISON TABLE",
)

MOJIBAKE_REPLACEMENTS = {
    "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â": "-",
    "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“": "-",
    "ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“": "'",
    "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢": "'",
    "ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ": '"',
    "ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â": '"',
    "ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢": "->",
    "Ãƒâ€šÃ‚Â£": "£",
    "Ã‚Â£": "£",
    "Ã¢â‚¬Â¢": "•",
    "Ã°Å¸â€Â§": "",
    "Ã¢Å“â€¦": "",
    "Ã°Å¸Å¡Å¡": "",
    "Ã°Å¸â€˜Â¥": "",
    "Ã°Å¸â€â€™": "",
    "Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§": "GB",
    "Ã¢â€”Â": "•",
    "Ã¢â‚¬â€˜": "-",
    "Ã¢â‚¬â€œ": "-",
    "Ã¢â‚¬â€": "-",
    "Ã¢â€ â€™": "->",
    "Â£": "£",
    "â€¢": "•",
    "âœ…": "",
    "âœ”": "",
    "âš ï¸": "",
    "ðŸ”§": "",
    "ðŸšš": "",
    "ðŸ‘¥": "",
    "ðŸ”’": "",
    "ðŸ–¼ï¸": "",
    "â†’": "->",
    "â€”": "-",
    "â€“": "-",
    "â€‘": "-",
    "â€™": "'",
    "â€œ": '"',
    "â€": '"',
    "🔧": "",
    "✅": "",
    "🚚": "",
    "👥": "",
    "🔒": "",
    "⚠️": "",
    "→": "->",
    "—": "-",
    "–": "-",
    "‑": "-",
}


def configure_stdio() -> None:
    for stream_name in ("stdout", "stderr"):
        stream = getattr(sys, stream_name, None)
        if stream is not None and hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8")


def repair_text(value: str) -> str:
    repaired = value.replace("\ufeff", "").replace("\xa0", " ").replace("\u200b", "")
    for wrong, right in MOJIBAKE_REPLACEMENTS.items():
        repaired = repaired.replace(wrong, right)
    return repaired


def normalize_text(value: str) -> str:
    text = repair_text(value)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def normalize_structured_line(value: str) -> str:
    text = normalize_text(value)
    if not text:
        return ""

    text = re.sub(r"^>\s*", "", text)
    text = re.sub(r"^\*\*(.+?)\*\*(.*)$", r"\1\2", text)
    text = re.sub(r"^__(.+?)__(.*)$", r"\1\2", text)
    text = re.sub(r"^`(.+?)`(.*)$", r"\1\2", text)
    text = re.sub(r"^\*(?!\*)(.+?:)\*\s*", r"\1 ", text)
    text = re.sub(r"^\*\*(.+?:)\*\*\s*", r"\1 ", text)
    text = re.sub(r"^__(.+?:)__\s*", r"\1 ", text)
    text = re.sub(r"^`(.+?:)`\s*", r"\1 ", text)
    text = re.sub(r"^\*\*(.+)\*\*$", r"\1", text)
    text = re.sub(r"^__(.+)__$", r"\1", text)
    text = re.sub(r"^`(.+)`$", r"\1", text)
    return normalize_text(text)


def is_probable_label_name(label: str) -> bool:
    normalized = normalize_text(label).upper()
    return any(
        normalized == prefix
        or normalized.startswith(f"{prefix} ")
        or normalized.startswith(f"{prefix} (")
        for prefix in KNOWN_LABEL_PREFIXES
    )


def match_markdown_heading(line: str, min_level: int = 2) -> tuple[int, str] | None:
    heading_match = MARKDOWN_HEADING_RE.match(normalize_structured_line(line))
    if not heading_match:
        return None
    level = len(heading_match.group("hashes"))
    if level < min_level:
        return None
    return level, heading_match.group("value").strip()


def first_markdown_heading(lines: list[str], min_level: int = 2, max_level: int | None = None) -> str:
    for line in lines:
        matched = match_markdown_heading(line, min_level=min_level)
        if not matched:
            continue
        level, value = matched
        if max_level is not None and level > max_level:
            continue
        return value
    return ""


def is_separator_line(value: str) -> bool:
    text = normalize_text(value)
    return bool(text) and (
        (len(text) >= 8 and bool(re.fullmatch(r"[=═\-\u2500-\u257f\s]+", text)))
        or (text.startswith("â•") and len(text) >= 8)
    )


def is_noise_line(value: str) -> bool:
    text = normalize_text(value)
    if not text:
        return False
    return is_separator_line(text) or text.upper().startswith("PROMPT ") or text in {".", "…"}


def strip_leading_marker(value: str) -> str:
    return normalize_text(re.sub(r"^(?:•|->|-|\[[^\]]+\])\s*", "", value))


def slugify(value: str) -> str:
    value = normalize_text(value).lower()
    value = value.replace("&", " and ").replace("/", " ")
    value = value.replace("'", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value)
    return value.strip("-")


def read_lines(path: Path) -> list[str]:
    text: str | None = None
    for encoding in ("utf-8-sig", "utf-8", "cp1252", "latin-1"):
        try:
            text = path.read_text(encoding=encoding)
            break
        except UnicodeDecodeError:
            continue

    if text is None:
        text = path.read_text(encoding="utf-8", errors="replace")

    return [repair_text(line.rstrip("\r\n")) for line in text.splitlines()]


def split_sections(lines: list[str]) -> dict[int, list[str]]:
    sections: dict[int, list[str]] = {}
    current_number: int | None = None

    for line in lines:
        stripped = normalize_text(line)
        match = SECTION_RE.match(stripped)
        if match:
            current_number = int(match.group("number"))
            sections[current_number] = []
            continue

        if current_number is not None:
            sections[current_number].append(line.rstrip())

    return sections


def section_contains_text(section_lines: list[str], *phrases: str) -> bool:
    haystack = " ".join(normalize_text(line).upper() for line in section_lines if normalize_text(line))
    return any(normalize_text(phrase).upper() in haystack for phrase in phrases)


def detect_legacy_engine_page_schema(section_map: dict[int, list[str]]) -> bool:
    return any(
        (
            number == 3
            and section_contains_text(lines, "LIVE MARKET PRICES", "LIVE PRICING", "LIVE MARKET")
        )
        or (number == 4 and section_contains_text(lines, "POPULAR SUB-MODELS", "MODELS WE COVER"))
        or (number == 7 and section_contains_text(lines, "ENGINE TYPES", "WHY CHOOSE US / FINAL CTA"))
        or (number == 8 and section_contains_text(lines, "MODEL YEARS COVERAGE", "WHY CHOOSE US / FINAL CTA"))
        for number, lines in section_map.items()
    )


def detect_legacy_engine_page_source(lines: list[str]) -> bool:
    normalized_lines = [normalize_structured_line(line).upper() for line in lines if normalize_structured_line(line)]
    has_live_market_heading = any(
        "SECTION 3" in line
        and (
            "LIVE MARKET PRICES" in line
            or "LIVE PRICING/MARKET SIGNALS" in line
            or "LIVE PRICING" in line
        )
        or "SECTION 3" in line and "LIVE FEED" in line
        or line.startswith("### 3: LIVE MARKET PRICES")
        or line.startswith("### 3: LIVE PRICING")
        or line.startswith("### 3: LIVE FEED")
        or line == "3: LIVE MARKET PRICES"
        or line == "3: LIVE PRICING"
        or line == "3: LIVE FEED"
        for line in normalized_lines
    )
    has_submodels_heading = any(
        ("SECTION 4" in line and "POPULAR SUB-MODELS" in line) or line.startswith("### 4: POPULAR SUB-MODELS")
        or ("SECTION 4" in line and "VARIANT GRID" in line)
        or line.startswith("### 4: VARIANT GRID")
        or line == "4: POPULAR SUB-MODELS"
        or line == "4: VARIANT GRID"
        for line in normalized_lines
    )
    has_engine_types_heading = any(
        ("SECTION 7" in line and "ENGINE TYPES" in line)
        or ("SECTION 7" in line and "REPAIR TYPES" in line)
        or ("SECTION 7" in line and "REPLACEMENT ENGINE OPTIONS" in line)
        or line.startswith("### 7: ENGINE TYPES")
        or line.startswith("### 7 (REVISED): ENGINE TYPES")
        or line.startswith("### 7: REPAIR TYPES")
        or line.startswith("### 7: REPLACEMENT ENGINE OPTIONS")
        or line == "7: ENGINE TYPES"
        or line == "7: REPAIR TYPES"
        or line == "7: REPLACEMENT ENGINE OPTIONS"
        for line in normalized_lines
    )
    has_model_years_heading = any(
        ("SECTION 8" in line and "MODEL YEARS COVERAGE" in line)
        or ("SECTION 8" in line and "ENGINES BY YEAR" in line)
        or ("SECTION 8" in line and "ENGINE SIZES BY FUEL TYPE" in line)
        or ("SECTION 8" in line and "COMPONENT SPECIFICATIONS" in line)
        or ("SECTION 8" in line and "FAQ" in line)
        or line.startswith("### 8: MODEL YEARS COVERAGE")
        or line.startswith("### 8: ENGINE SIZES BY FUEL TYPE")
        or line == "8: ENGINES BY YEAR"
        or line == "8: FAQ"
        for line in normalized_lines
    )
    has_final_cta_heading = any("SECTION 8" in line and "WHY CHOOSE US / FINAL CTA" in line for line in normalized_lines)
    return (
        (has_live_market_heading and has_submodels_heading)
        or has_engine_types_heading
        or has_model_years_heading
        or has_final_cta_heading
    )


def match_label(line: str) -> tuple[str, str] | None:
    normalized_line = normalize_structured_line(line)
    label_match = LABEL_RE.match(normalized_line)
    if not label_match:
        return None
    label = label_match.group("label").upper()
    if not is_probable_label_name(label):
        return None
    return label, label_match.group("value").strip()


def matches_label_variant(current_label: str, target: str) -> bool:
    normalized_current = normalize_text(current_label).upper()
    normalized_target = normalize_text(target).upper()
    return normalized_current == normalized_target or normalized_current.startswith(f"{normalized_target} (")


def find_label(lines: list[str], label: str, default: str = "") -> str:
    target = label.upper()
    for index, line in enumerate(lines):
        matched = match_label(line)
        if matched and matched[0] == target:
            if matched[1]:
                return matched[1]

            for trailing_line in lines[index + 1 :]:
                normalized = normalize_text(trailing_line)
                if not normalized:
                    continue
                if is_noise_line(normalized):
                    continue
                if match_label(normalized):
                    return default
                return normalized
    return default


def find_label_variant(lines: list[str], label: str, default: str = "") -> str:
    target = label.upper()
    for index, line in enumerate(lines):
        matched = match_label(line)
        if matched and matches_label_variant(matched[0], target):
            if matched[1]:
                return matched[1]

            for trailing_line in lines[index + 1 :]:
                normalized = normalize_text(trailing_line)
                if not normalized:
                    continue
                if is_noise_line(normalized):
                    continue
                if match_label(normalized):
                    return default
                return normalized
    return default


def collect_block(lines: list[str], start_label: str) -> list[str]:
    target = start_label.upper()
    values: list[str] = []
    collecting = False

    for raw_line in lines:
        normalized = normalize_text(raw_line)
        matched = match_label(normalized)
        is_bullet_like = bool(re.match(r"^\s*(?:â€¢|•|->|-|\d+\.)\s*", repair_text(raw_line))) or normalized.startswith("|")

        if matched:
            current_label, current_value = matched
            if collecting and current_label != target and not is_bullet_like:
                break
            if current_label == target:
                collecting = True
                if current_value:
                    values.append(current_value)
                continue

        if collecting:
            if not normalized:
                if values:
                    break
                continue
            if is_noise_line(normalized):
                continue
            values.append(normalized)

    return values


def collect_block_variant(lines: list[str], start_label: str) -> list[str]:
    target = start_label.upper()
    values: list[str] = []
    collecting = False

    for raw_line in lines:
        normalized = normalize_text(raw_line)
        matched = match_label(normalized)
        is_bullet_like = bool(re.match(r"^\s*(?:Ã¢â‚¬Â¢|â€¢|->|-|\d+\.)\s*", repair_text(raw_line))) or normalized.startswith("|")

        if matched:
            current_label, current_value = matched
            if collecting and not matches_label_variant(current_label, target) and not is_bullet_like:
                break
            if matches_label_variant(current_label, target):
                collecting = True
                if current_value:
                    values.append(current_value)
                continue

        if collecting:
            if not normalized:
                if values:
                    break
                continue
            if is_noise_line(normalized):
                continue
            values.append(normalized)

    return values


def clean_bullet(value: str) -> str:
    line = strip_leading_marker(value)
    has_marker = bool(re.match(r"^\s*(?:â€¢|•|->|-|\[[^\]]+\])\s*", repair_text(value)))
    if not line or is_noise_line(line) or (match_label(line) and not has_marker):
        return ""
    return line


def extract_bullets(lines: list[str], start_label: str) -> list[str]:
    bullets: list[str] = []
    for value in collect_block(lines, start_label):
        line = clean_bullet(value)
        if line and not line.startswith("|"):
            bullets.append(line)
    return bullets


def extract_bullets_variant(lines: list[str], start_label: str) -> list[str]:
    bullets: list[str] = []
    for value in collect_block_variant(lines, start_label):
        line = clean_bullet(value)
        if line and not line.startswith("|"):
            bullets.append(line)
    return bullets


def parse_table(lines: list[str], start_label: str, min_cells: int) -> list[list[str]]:
    block = collect_block(lines, start_label)
    table_lines = [line for line in block if line.strip().startswith("|")]
    if len(table_lines) < 3:
        return []

    rows: list[list[str]] = []
    for line in table_lines[2:]:
        cells = [normalize_text(cell) for cell in line.strip().strip("|").split("|")]
        if len(cells) >= min_cells:
            rows.append(cells)
    return rows


def parse_table_variant(lines: list[str], start_label: str, min_cells: int) -> list[list[str]]:
    block = collect_block_variant(lines, start_label)
    table_lines = [line for line in block if line.strip().startswith("|")]
    if len(table_lines) < 3:
        return []

    rows: list[list[str]] = []
    for line in table_lines[2:]:
        cells = [normalize_text(cell) for cell in line.strip().strip("|").split("|")]
        if len(cells) >= min_cells:
            rows.append(cells)
    return rows


def parse_first_table(lines: list[str], min_cells: int) -> list[list[str]]:
    table_lines = [line for line in lines if normalize_text(line).startswith("|")]
    if len(table_lines) < 3:
        return []

    rows: list[list[str]] = []
    for line in table_lines[2:]:
        cells = [normalize_text(cell) for cell in line.strip().strip("|").split("|")]
        if len(cells) >= min_cells:
            rows.append(cells)
    return rows


def parse_repair_options(lines: list[str], start_label: str) -> list[dict[str, str]]:
    rows = parse_table(lines, start_label, min_cells=5)
    if not rows:
        rows = parse_table_variant(lines, start_label, min_cells=5)
    if not rows:
        block = collect_block(lines, start_label) or collect_block_variant(lines, start_label)
        values = [normalize_text(line) for line in block if normalize_text(line)]
        header_markers = {
            "Repair Tier",
            "Dealer Price (Parts + Labour)",
            "Specialist Price (Parts + Labour)",
            "What It Involves",
            "Longevity / Suitability",
        }
        values = [value for value in values if value not in header_markers]
        if len(values) >= 5:
            rows = [values[index : index + 5] for index in range(0, len(values), 5) if len(values[index : index + 5]) == 5]

    return [
        {
            "tier": row[0],
            "dealerPrice": row[1],
            "specialistPrice": row[2],
            "whatItInvolves": row[3],
            "longevity": row[4],
        }
        for row in rows
    ]


def parse_question_blocks(lines: list[str]) -> list[list[str]]:
    blocks: list[list[str]] = []
    current: list[str] = []

    for line in lines:
        if QUESTION_RE.match(normalize_structured_line(line)):
            if current:
                blocks.append(current)
            current = [line]
            continue
        if current:
            current.append(line)

    if current:
        blocks.append(current)

    return blocks


def parse_engine_blocks(lines: list[str]) -> list[list[str]]:
    blocks: list[list[str]] = []
    current: list[str] = []

    for line in lines:
        if H3_RE.match(normalize_structured_line(line)):
            if current:
                blocks.append(current)
            current = [line]
            continue
        if current:
            current.append(line)

    if current:
        blocks.append(current)

    return blocks


def parse_h4_blocks(lines: list[str]) -> list[list[str]]:
    blocks: list[list[str]] = []
    current: list[str] = []

    for line in lines:
        markdown_heading = match_markdown_heading(line, min_level=3)
        if H4_RE.match(normalize_structured_line(line)) or markdown_heading:
            if current:
                blocks.append(current)
            current = [line]
            continue
        if current:
            current.append(line)

    if current:
        blocks.append(current)

    return blocks


def find_first_arrow_line(lines: list[str]) -> str:
    for raw_line in lines:
        normalized = normalize_text(raw_line)
        if normalized.startswith("->"):
            return normalized
    return ""


def split_dash_pair(value: str) -> tuple[str, str]:
    parts = re.split(r"\s+(?:-|â€”|â€“|—|–)\s+", normalize_text(value), maxsplit=1)
    if len(parts) == 2:
        return parts[0].strip(), parts[1].strip()
    return normalize_text(value), normalize_text(value)


def extract_metadata_lines(lines: list[str]) -> list[str]:
    for index, raw_line in enumerate(lines):
        normalized = normalize_text(raw_line)
        if normalized.startswith("META TITLE") or normalized.startswith("<script"):
            return lines[index:]
    return []


def split_title_and_description(value: str) -> tuple[str, str]:
    match = re.match(r"^(.*?)\s*\((.+)\)$", normalize_text(value))
    if not match:
        return normalize_text(value), ""
    return match.group(1).strip(), match.group(2).strip()


def split_outside_parentheses(value: str) -> list[str]:
    parts: list[str] = []
    current: list[str] = []
    depth = 0

    for char in value:
        if char == "(":
            depth += 1
        elif char == ")" and depth > 0:
            depth -= 1

        if char == "," and depth == 0:
            piece = "".join(current).strip()
            if piece:
                parts.append(piece)
            current = []
            continue

        current.append(char)

    tail = "".join(current).strip()
    if tail:
        parts.append(tail)

    return parts


def parse_metadata(section_lines: list[str]) -> dict[str, Any]:
    title = find_label(section_lines, "META TITLE")
    description = find_label(section_lines, "META DESCRIPTION")
    canonical = find_label(section_lines, "CANONICAL URL")
    if canonical:
        canonical = re.sub(r"^https?://(?:www\.)?enginesmarket\.co\.uk", "", canonical).rstrip("/") or canonical

    script_lines: list[str] = []
    capture_script = False
    for raw_line in section_lines:
        line = raw_line.rstrip()
        if "<script" in line:
            capture_script = True
            continue
        if "</script>" in line:
            capture_script = False
            continue
        if capture_script:
            script_lines.append(repair_text(line))

    structured_data = None
    if script_lines:
        try:
            structured_data = json.loads("\n".join(script_lines))
        except json.JSONDecodeError:
            structured_data = None

    return {
        "title": title,
        "description": description,
        "canonical": canonical,
        "structuredData": structured_data,
    }


@lru_cache(maxsize=1)
def load_brand_catalog() -> list[dict[str, str | list[str]]]:
    catalog: list[dict[str, str | list[str]]] = []
    if not BRANDS_DIR.is_dir():
        return catalog

    for path in BRANDS_DIR.glob("*.json"):
        if path.stem.startswith("_"):
            continue
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue

        brand = data.get("brand", {})
        brand_name = normalize_text(brand.get("name", ""))
        brand_slug = normalize_text(brand.get("slug", "")) or path.stem
        aliases = {
            brand_name,
            normalize_text(brand_slug.replace("-", " ")),
        }
        if brand_name.endswith(" Benz"):
            aliases.add(normalize_text(brand_name.replace(" Benz", "")))

        clean_aliases = sorted({alias for alias in aliases if alias}, key=len, reverse=True)
        if clean_aliases:
            catalog.append(
                {
                    "name": brand_name or brand_slug.replace("-", " ").title(),
                    "slug": brand_slug,
                    "aliases": clean_aliases,
                }
            )

    return sorted(catalog, key=lambda item: max(len(alias) for alias in item["aliases"]), reverse=True)


@lru_cache(maxsize=1)
def load_model_catalog() -> dict[str, list[dict[str, str | list[str]]]]:
    catalog: dict[str, list[dict[str, str | list[str]]]] = {}
    if not MODELS_DIR.is_dir():
        return catalog

    for path in MODELS_DIR.glob("*.json"):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue

        brand = data.get("brand", {})
        model = data.get("model", {})
        brand_name = normalize_text(brand.get("name", ""))
        brand_slug = normalize_text(brand.get("slug", ""))
        model_name = normalize_text(model.get("name", ""))
        model_slug = normalize_text(model.get("slug", ""))
        legacy_slug = normalize_text(model.get("legacySlug", ""))
        if not brand_slug or not model_slug or not model_name:
            continue

        aliases = {
            model_name,
            normalize_text(model_slug.replace("-", " ")),
            normalize_text(legacy_slug.replace("-", " ")) if legacy_slug else "",
        }
        if brand_name and model_name.lower().startswith(f"{brand_name.lower()} "):
            aliases.add(normalize_text(model_name[len(brand_name) :]))

        clean_aliases = sorted({alias for alias in aliases if alias}, key=len, reverse=True)
        catalog.setdefault(brand_slug, []).append(
            {
                "name": model_name,
                "slug": model_slug,
                "aliases": clean_aliases,
            }
        )

    for brand_slug, items in catalog.items():
        catalog[brand_slug] = sorted(items, key=lambda item: max(len(alias) for alias in item["aliases"]), reverse=True)

    return catalog


def strip_start(text: str, prefix: str) -> str:
    normalized_text = normalize_text(text)
    normalized_prefix = normalize_text(prefix)
    if not normalized_prefix:
        return normalized_text
    if normalized_text.lower() == normalized_prefix.lower():
        return ""
    if normalized_text.lower().startswith(f"{normalized_prefix.lower()} "):
        return normalized_text[len(normalized_prefix) :].strip()
    return normalized_text


def infer_brand_match(source_name: str) -> tuple[str, str, str]:
    normalized = normalize_text(source_name)
    for brand in load_brand_catalog():
        for alias in brand["aliases"]:
            if normalized.lower() == alias.lower() or normalized.lower().startswith(f"{alias.lower()} "):
                return (
                    str(brand["slug"]),
                    str(brand["name"]),
                    strip_start(normalized, alias),
                )
    return "", "", normalized


def infer_model_variant_from_remainder(remainder: str) -> tuple[str, str]:
    normalized = normalize_text(remainder)
    tokens = normalized.split()
    if len(tokens) <= 1:
        return normalized, normalized

    variant_token_count = 1
    last_token = tokens[-1]
    previous_token = tokens[-2] if len(tokens) >= 2 else ""
    if last_token.lower() in {"supercharged", "turbo", "diesel", "petrol", "hybrid", "mhev", "phev"} and previous_token:
        variant_token_count = 2

    model_tokens = tokens[:-variant_token_count]
    variant_tokens = tokens[-variant_token_count:]
    model_name = " ".join(model_tokens).strip() or normalized
    variant_name = " ".join(variant_tokens).strip() or normalized
    return model_name, variant_name


def infer_route_parts_from_name(fallback_name: str) -> tuple[str, str, str]:
    clean_name = normalize_text(fallback_name.replace(" Engine Replacement", "").replace(" variant", ""))
    brand_slug, _brand_name, remainder = infer_brand_match(clean_name)
    if not brand_slug:
        return "", "", f"{slugify(clean_name)}-engine"

    model_catalog = load_model_catalog().get(brand_slug, [])
    for model in model_catalog:
        for alias in model["aliases"]:
            if remainder.lower() == alias.lower() or remainder.lower().startswith(f"{alias.lower()} "):
                variant_name = strip_start(remainder, alias)
                variant_slug = slugify(variant_name or clean_name)
                return brand_slug, str(model["slug"]), f"{variant_slug}-engine"

    inferred_model_name, inferred_variant_name = infer_model_variant_from_remainder(remainder)
    return brand_slug, slugify(inferred_model_name), f"{slugify(inferred_variant_name)}-engine"


def derive_route_parts(meta: dict[str, Any], fallback_name: str) -> tuple[str, str, str]:
    canonical = meta.get("canonical") or ""
    parts = [part for part in canonical.strip("/").split("/") if part]
    if len(parts) >= 3:
        return parts[0], parts[1], parts[2]

    return infer_route_parts_from_name(fallback_name)


def load_parent_model_page(brand_slug: str, model_slug: str) -> dict[str, Any] | None:
    if not brand_slug or not model_slug or not MODELS_DIR.is_dir():
        return None

    for path in MODELS_DIR.glob("*.json"):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue

        page_brand_slug = normalize_text(data.get("brand", {}).get("slug", ""))
        page_model_slug = normalize_text(data.get("model", {}).get("slug", ""))
        page_legacy_slug = normalize_text(data.get("model", {}).get("legacySlug", ""))
        if page_brand_slug == brand_slug and model_slug in {page_model_slug, page_legacy_slug}:
            return data

    return None


def parse_hero(section_lines: list[str], fallback_variant_name: str, hero_bg: str) -> dict[str, Any]:
    trust_badges = [
        normalize_text(part)
        for part in re.split(r"\|", find_label(section_lines, "TRUST BADGES"))
        if normalize_text(part)
    ]
    line1 = find_label(section_lines, "LINE 1")
    line2 = find_label(section_lines, "LINE 2")
    image_alt = find_label(section_lines, "ALT TEXT")
    engine_image_alt = find_label(section_lines, "ENGINE IMAGE ALT TEXT") or image_alt
    engine_option_alts: list[str] = []
    for line in collect_block(section_lines, "ENGINE THUMBNAILS"):
        normalized = normalize_text(line)
        if normalized.lower().startswith("alt text:"):
            engine_option_alts.append(normalized.split(":", 1)[1].strip())

    line2_prices = {
        "used": "",
        "reconditioned": "",
        "rebuilt": "",
    }
    for tone in line2_prices:
        match = re.search(rf"{tone}\s+from\s+([^·]+)", normalize_text(line2), re.IGNORECASE)
        if match:
            line2_prices[tone] = f"From {match.group(1).strip()}"

    engine_options = [
        {
            "label": "Used",
            "price": line2_prices["used"] or "From quote",
            "description": "Tested, bare/short engine",
            "image": "/images/shared/hero-engines/temporary-performance-engine.jpeg",
            "imageAlt": engine_option_alts[0] if len(engine_option_alts) > 0 else engine_image_alt,
            "tone": "used",
        },
        {
            "label": "Reconditioned",
            "price": line2_prices["reconditioned"] or "From quote",
            "description": "Rod bearings addressed, tested",
            "image": "/images/shared/hero-engines/temporary-performance-engine.jpeg",
            "imageAlt": engine_option_alts[1] if len(engine_option_alts) > 1 else engine_image_alt,
            "tone": "reconditioned",
        },
        {
            "label": "Rebuilt",
            "price": line2_prices["rebuilt"] or "From quote",
            "description": "Upgraded bearings, full teardown, revised valvetrain",
            "image": "/images/shared/hero-engines/temporary-performance-engine.jpeg",
            "imageAlt": engine_option_alts[2] if len(engine_option_alts) > 2 else engine_image_alt,
            "tone": "rebuilt",
        },
    ]

    return {
        "tag": find_label(section_lines, "TAG PILL"),
        "h1": find_label(section_lines, "H1"),
        "subheading": find_label(section_lines, "SUBHEADING"),
        "trustBadges": trust_badges,
        "ctaLinkText": find_label(section_lines, "CTA BUTTON"),
        "supportingText": f"Get tailored {fallback_variant_name} engine quotes from vetted UK specialists.",
        "ticker": find_label(section_lines, "TICKER"),
        "imageAlt": image_alt,
        "highlights": [
            {
                "title": f"{fallback_variant_name} Engine",
                "price": line1.replace(f"{fallback_variant_name} Engine - ", "").strip(),
                "line1": line1,
                "line2": line2,
                "detail": line2,
                "image": hero_bg,
                "imageAlt": engine_image_alt,
            }
        ],
        "engineOptions": engine_options,
        "vehicleBadge": fallback_variant_name.split()[-1] if fallback_variant_name else "",
        "mobileBar": {
            "brandText": "ENGINEMARKET",
            "callLabel": "Call",
            "quoteLabel": "GET QUOTES",
        },
        "registrationInput": {
            "label": f"Enter your {fallback_variant_name} registration",
            "platePlaceholder": "AB12 CDE",
            "countryCode": "UK",
            "countryLabel": "United Kingdom",
        },
        "form": {
            "heading": f"Find Your {fallback_variant_name} Engine",
            "subtitle": f"Enter your registration number to compare {fallback_variant_name} engine options.",
            "inputPlaceholder": "AB12 CDE",
            "buttonText": find_label(section_lines, "CTA BUTTON"),
            "note": find_label(section_lines, "CTA NOTE"),
        },
    }


def normalize_hero_variant(hero: dict[str, Any], variant_name: str) -> None:
    line1 = hero.get("highlights", [{}])[0].get("line1", "") if hero.get("highlights") else ""
    price = normalize_text(line1)
    for prefix in (
        f"{variant_name} Engine - ",
        f"{variant_name} Engine -> ",
        f"{variant_name} Engine ",
    ):
        if price.startswith(prefix):
            price = price[len(prefix) :].strip()
            break

    hero["supportingText"] = f"Get tailored {variant_name} engine quotes from vetted UK specialists."
    hero["registrationInput"]["label"] = f"Enter your {variant_name} registration"
    hero["form"]["heading"] = f"Find Your {variant_name} Engine"
    hero["form"]["subtitle"] = f"Enter your registration number to compare {variant_name} engine options."
    hero["vehicleBadge"] = variant_name.split()[-1] if variant_name else hero.get("vehicleBadge", "")
    if hero.get("highlights"):
        hero["highlights"][0]["title"] = f"{variant_name} Engine"
        hero["highlights"][0]["price"] = price


def parse_how_it_works(section_lines: list[str], variant_name: str) -> dict[str, Any]:
    card_pattern = re.compile(r"^CARD\s+(?P<number>\d+)", re.IGNORECASE)
    direct_cards: list[dict[str, Any]] = []
    current_card: dict[str, Any] | None = None

    for raw_line in section_lines:
        line = normalize_structured_line(raw_line)
        if not line or is_noise_line(line):
            continue

        card_match = card_pattern.match(line)
        if card_match:
            if current_card:
                direct_cards.append(current_card)
            current_card = {
                "number": int(card_match.group("number")),
                "front": {"h3": "", "text": ""},
                "back": {"heading": "", "text": "", "bullets": []},
            }
            continue

        if current_card is None:
            continue

        if line.lower().startswith("front:"):
            front_line = line.split(":", 1)[1].strip()
            front_line = re.sub(r"^[^A-Za-z0-9]+[^.]*icon\.\s*", "", front_line, flags=re.IGNORECASE)
            h3_match = re.search(r"H3:\s*(.+?)(?:\.\s+|$)", front_line, re.IGNORECASE)
            if h3_match:
                current_card["front"]["h3"] = h3_match.group(1).strip()
                remaining = front_line.replace(h3_match.group(0), "").strip(" .")
                if remaining:
                    current_card["front"]["text"] = remaining
            else:
                current_card["front"]["text"] = front_line
            continue

        if line.lower().startswith("flip:"):
            flip_line = line.split(":", 1)[1].strip()
            first_sentence, _, remainder = flip_line.partition(". ")
            current_card["back"]["heading"] = first_sentence.strip()
            current_card["back"]["text"] = remainder.strip() if remainder else flip_line
            if remainder:
                current_card["back"]["bullets"] = [part.strip() for part in re.split(r";\s+|,\s+(?=[A-Z])", remainder) if part.strip()]
            continue

    if current_card:
        direct_cards.append(current_card)

    if direct_cards:
        direct_cards.sort(key=lambda card: card["number"])
        icon_map = {1: "registration", 2: "quote", 3: "shield"}
        return {
            "tag": "How It Works",
            "h2": f"3 Simple Steps to Finding the Best {variant_name} Replacement Engine",
            "headingLines": ["3 Simple Steps", f"to Finding the Best {variant_name} Replacement Engine"],
            "cards": [
                {
                    "number": card["number"],
                    "icon": icon_map.get(card["number"], "registration"),
                    "front": card["front"],
                    "back": {
                        **card["back"],
                        "bullets": card["back"]["bullets"] or ([card["back"]["text"]] if card["back"]["text"] else []),
                    },
                }
                for card in direct_cards
            ],
            "tagline": find_label(section_lines, "TAGLINE"),
            "ui": {
                "stepLabel": "Step",
                "desktopClosedLabel": "Click to expand",
                "desktopOpenLabel": "Click to view details",
                "mobileOpenLabel": "Tap to flip",
                "mobileCloseLabel": "Tap to flip back",
                "footerNote": "Most replacements completed within 3-5 days.",
                "mobileTrustItems": [
                    "12-Month Warranty",
                    "Supply & Fit Available",
                    "Nationwide Delivery",
                    "Trusted UK Suppliers",
                ],
            },
        }

    card_fronts: dict[str, list[str]] = {}
    card_flips: dict[str, list[str]] = {}
    current_key: str | None = None
    current_store: dict[str, list[str]] | None = None

    for raw_line in section_lines:
        line = normalize_structured_line(raw_line)
        if line.startswith("CARD ") and line.endswith("FRONT:"):
            current_key = line.replace(":", "")
            current_store = card_fronts
            current_store[current_key] = []
            continue
        if line.startswith("CARD ") and line.endswith("FLIP:"):
            current_key = line.replace(":", "")
            current_store = card_flips
            current_store[current_key] = []
            continue
        if current_store is not None and current_key is not None:
            if is_noise_line(line):
                if current_store[current_key]:
                    current_key = None
                    current_store = None
                continue
            if match_label(line) and not H3_RE.match(line):
                if current_store[current_key]:
                    current_key = None
                    current_store = None
                continue
            if not line and current_store[current_key]:
                current_key = None
                current_store = None
                continue
            if line:
                current_store[current_key].append(line)

    cards = []
    for index, icon in enumerate(("registration", "quote", "shield"), start=1):
        front_key = f"CARD {index} FRONT"
        flip_key = f"CARD {index} FLIP"
        front_lines = card_fronts.get(front_key, [])
        flip_lines = card_flips.get(flip_key, [])

        front_h3 = ""
        front_text_parts: list[str] = []
        for line in front_lines:
            h3_match = H3_RE.match(normalize_structured_line(line))
            if h3_match:
                front_h3 = h3_match.group("value").strip()
                continue
            cleaned = (
                line.replace("[Registration icon]", "")
                .replace("[Comparison icon]", "")
                .replace("[Warranty icon]", "")
                .strip()
            )
            if cleaned:
                front_text_parts.append(re.sub(r"^[^A-Za-z0-9]+", "", cleaned).strip())

        back_heading = normalize_text(flip_lines[0]) if flip_lines else ""
        back_text = normalize_text(flip_lines[1]) if len(flip_lines) > 1 else ""
        back_bullets = [clean_bullet(line) for line in flip_lines[2:] if clean_bullet(line)]

        cards.append(
            {
                "number": index,
                "icon": icon,
                "front": {
                    "h3": front_h3,
                    "text": normalize_text(" ".join(front_text_parts)),
                },
                "back": {
                    "heading": back_heading,
                    "text": back_text,
                    "bullets": back_bullets,
                },
            }
        )

    return {
        "tag": "How It Works",
        "h2": f"3 Simple Steps to Finding the Best {variant_name} Replacement Engine",
        "headingLines": ["3 Simple Steps", f"to Finding the Best {variant_name} Replacement Engine"],
        "cards": cards,
        "tagline": find_label(section_lines, "TAGLINE"),
        "ui": {
            "stepLabel": "Step",
            "desktopClosedLabel": "Click to expand",
            "desktopOpenLabel": "Click to view details",
            "mobileOpenLabel": "Tap to flip",
            "mobileCloseLabel": "Tap to flip back",
            "footerNote": "Most replacements completed within 3-5 days.",
            "mobileTrustItems": [
                "12-Month Warranty",
                "Supply & Fit Available",
                "Nationwide Delivery",
                "Trusted UK Suppliers",
            ],
        },
    }


def parse_history_timeline(section_lines: list[str]) -> dict[str, Any]:
    timeline_bullets = (
        extract_bullets(section_lines, "TIMELINE")
        or extract_bullets_variant(section_lines, "TIMELINE")
        or extract_bullets(section_lines, "KEY MILESTONES")
    )
    timeline_items = []
    for bullet in timeline_bullets:
        year_match = re.match(r"^(?P<year>(?:\d{4}|Present))\s*-\s*(?P<description>.+)$", bullet, re.IGNORECASE)
        timeline_items.append(
            {
                "year": year_match.group("year") if year_match else "",
                "description": year_match.group("description") if year_match else bullet,
            }
        )

    raw_specs = extract_bullets(section_lines, "KEY SPECS SNAPSHOT")
    spec_items = []
    for bullet in raw_specs:
        if ":" in bullet:
            label, value = bullet.split(":", 1)
            spec_items.append({"label": label.strip(), "value": value.strip()})
        else:
            spec_items.append({"label": bullet, "value": bullet})

    intro_lines: list[str] = []
    collecting_intro = False
    for raw_line in section_lines:
        line = normalize_structured_line(raw_line)
        if not line or is_noise_line(line):
            continue
        if line.upper().startswith("TAG:") or line.upper().startswith("H2:"):
            collecting_intro = True
            continue
        if line.upper().startswith("TIMELINE:"):
            break
        if collecting_intro and not match_label(line):
            intro_lines.append(line)

    h2 = find_label(section_lines, "H2") or first_markdown_heading(section_lines, min_level=2, max_level=2)
    vehicle_title = h2.split(" - ", 1)[0].strip() if " - " in h2 else h2.split(" — ", 1)[0].strip()
    closing_note = find_label(section_lines, "CLOSING LINE") or find_label_variant(section_lines, "CLOSING LINE")

    return {
        "tag": "Variant History",
        "h2": h2,
        "intro": (
            find_label(section_lines, "INTRO")
            or find_label_variant(section_lines, "INTRO")
            or " ".join(intro_lines)
            or " ".join(collect_block(section_lines, "INTRO PARAGRAPH"))
            or " ".join(collect_block_variant(section_lines, "INTRO"))
        ),
        "milestones": timeline_items,
        "vehicleTitle": vehicle_title,
        "vehicleMeta": spec_items[:3],
        "specsLabel": "Key Specs Snapshot",
        "specs": spec_items,
        "closingNote": closing_note,
    }


def parse_engine_guide(section_lines: list[str]) -> dict[str, Any]:
    h4_blocks = parse_h4_blocks(section_lines)
    if h4_blocks:
        items = []
        for block in h4_blocks:
            heading_match = H4_RE.match(normalize_structured_line(block[0]))
            heading_value = heading_match.group("value").strip() if heading_match else ""
            if not heading_value:
                markdown_heading = match_markdown_heading(block[0], min_level=3)
                heading_value = markdown_heading[1] if markdown_heading else ""
            if not heading_value:
                continue

            title = heading_value
            code, clean_title = split_dash_pair(title)
            raw_specs = extract_bullets(block[1:], "KEY SPECS")
            specs = []
            compatible_trim_levels: list[str] = []
            for bullet in raw_specs:
                if ":" not in bullet:
                    continue
                label, value = bullet.split(":", 1)
                normalized_label = label.strip()
                normalized_value = value.strip()
                if normalized_label.lower().startswith("compatible trim"):
                    compatible_trim_levels = split_outside_parentheses(normalized_value)
                    continue
                specs.append({"label": normalized_label, "value": normalized_value})

            cost_block: list[str] = []
            collecting_costs = False
            for raw_line in block[1:]:
                normalized = normalize_structured_line(raw_line)
                if not normalized:
                    if cost_block:
                        break
                    continue
                matched = match_label(normalized)
                if normalized.upper().startswith("COST GUIDE"):
                    collecting_costs = True
                    if ":" in normalized:
                        cost_block.append(normalized.split(":", 1)[1].strip())
                    continue
                if collecting_costs and matched and not normalized.startswith("-"):
                    break
                if collecting_costs:
                    cost_block.append(normalized)

            cost_intro = ""
            costs = []
            for line in cost_block:
                normalized = normalize_text(line)
                if not normalized:
                    continue
                if normalized.startswith("-") or normalized.startswith("•"):
                    bullet = clean_bullet(normalized)
                    if ":" in bullet:
                        label, value = bullet.split(":", 1)
                        cost_label, description = split_title_and_description(label)
                        costs.append(
                            {
                                "label": cost_label,
                                "value": value.strip(),
                                "description": description,
                            }
                        )
                elif not cost_intro:
                    cost_intro = normalized

            common_failure = (
                " ".join(collect_block(block[1:], "COMMON FAILURE"))
                or " ".join(collect_block(block[1:], "COMMON FAILURES"))
                or " ".join(collect_block(block[1:], "COMMON OPERATIONAL CHARACTERISTICS"))
            )

            items.append(
                {
                    "code": code,
                    "title": clean_title,
                    "specs": specs,
                    "costs": costs,
                    "compatibleTrimLevels": compatible_trim_levels,
                    "commonFailure": common_failure,
                    "cta": find_label(block[1:], "CTA") or find_first_arrow_line(block[1:]),
                    "closing": " ".join(
                        line
                        for line in collect_block(block[1:], "CTA")
                        if not normalize_text(line).startswith("(")
                    ),
                    "intro": cost_intro,
                }
            )

        prompt = " ".join(collect_block(section_lines, "CAN'T FIND YOUR EXACT SPEC")) or " ".join(
            line
            for line in section_lines
            if normalize_text(line).lower().startswith("can't find your exact spec")
        )

        return {
            "tag": find_label(section_lines, "TAG") or "Compatible Engines",
            "h2": find_label(section_lines, "H2") or first_markdown_heading(section_lines, min_level=2, max_level=2),
            "sectionTitle": find_label(section_lines, "SECTION TITLE") or "Compatible Engine Codes & Cost Guide",
            "sectionSubtitle": find_label(section_lines, "SECTION SUBTITLE") or "Find your exact engine code, specs and UK replacement cost guide.",
            "intro": items[0].pop("intro", "") if items else "",
            "items": items,
            "prompt": prompt,
        }

    items = []
    for block in parse_engine_blocks(section_lines):
        title_match = H3_RE.match(normalize_structured_line(block[0]))
        if not title_match:
            continue

        title = title_match.group("value")
        code, clean_title = split_dash_pair(title)
        specs = []
        for bullet in extract_bullets(block[1:], "KEY SPECS"):
            if ":" in bullet:
                label, value = bullet.split(":", 1)
                specs.append({"label": label.strip(), "value": value.strip()})

        costs = []
        for bullet in extract_bullets(block[1:], "COST GUIDE (UK SUPPLY ONLY)"):
            if ":" in bullet:
                label, value = bullet.split(":", 1)
                costs.append({"label": label.strip(), "value": value.strip()})

        items.append(
            {
                "code": code,
                "title": clean_title,
                "specs": specs,
                "costs": costs,
                "commonFailure": " ".join(collect_block(block[1:], "COMMON FAILURE")),
                "cta": find_label(block[1:], "CTA LINE") or find_first_arrow_line(block[1:]),
                "closing": " ".join(collect_block(block[1:], "CLOSING LINE")),
            }
        )

    return {
        "tag": "Compatible Engines",
        "h2": find_label(section_lines, "H2") or first_markdown_heading(section_lines, min_level=2, max_level=2),
        "items": items,
        "closing": " ".join(collect_block(section_lines, "SECTION 4 CLOSING")),
    }


def parse_common_problems(section_lines: list[str], variant_name: str) -> dict[str, Any]:
    h4_blocks = parse_h4_blocks(section_lines)
    if h4_blocks:
        explicit_intro = find_label(section_lines, "H3") or find_label_variant(section_lines, "H3")
        intro_lines: list[str] = []
        for raw_line in section_lines:
            normalized = normalize_structured_line(raw_line)
            if not normalized or is_noise_line(normalized):
                continue
            if normalized.startswith("## "):
                continue
            if normalized.upper().startswith("TAG:") or normalized.upper().startswith("H2:"):
                continue
            if H4_RE.match(normalized):
                break
            if match_label(normalized) and (normalized.endswith(":") or normalized.upper() == normalized):
                continue
            intro_lines.append(normalized)

        problems = []
        section_recommendation = " ".join(collect_block(section_lines, "OUR RECOMMENDATION"))
        final_cta_title = ""
        final_cta_paragraph = ""

        for block in h4_blocks:
            heading_match = H4_RE.match(normalize_structured_line(block[0]))
            heading_value = heading_match.group("value").strip() if heading_match else ""
            if not heading_value:
                markdown_heading = match_markdown_heading(block[0], min_level=3)
                heading_value = markdown_heading[1] if markdown_heading else ""
            if not heading_value:
                continue

            heading = heading_value
            affected = " ".join(collect_block(block[1:], "AFFECTED MODELS")) or " ".join(collect_block(block[1:], "AFFECTED"))
            root_cause = " ".join(collect_block(block[1:], "ROOT CAUSE"))
            repair_options = parse_repair_options(block[1:], "REPAIR OPTIONS")
            if not repair_options:
                table_rows = parse_first_table(block[1:], min_cells=5)
                repair_options = [
                    {
                        "tier": row[0],
                        "dealerPrice": row[1],
                        "specialistPrice": row[2],
                        "whatItInvolves": row[3],
                        "longevity": row[4],
                    }
                    for row in table_rows
                ]
            if repair_options and len(repair_options[0]) == 5:
                for option in repair_options:
                    option.setdefault("estimatedTime", "")

            typical_failure_mileage = " ".join(collect_block(block[1:], "TYPICAL FAILURE MILEAGE"))
            why_it_happens = " ".join(collect_block(block[1:], "WHY IT HAPPENS"))
            vehicle_value_check = " ".join(collect_block(block[1:], "VEHICLE VALUE CHECK"))
            block_recommendation = " ".join(collect_block(block[1:], "OUR RECOMMENDATION"))
            recommendation = block_recommendation or section_recommendation

            has_structured_problem = bool(
                root_cause or repair_options or typical_failure_mileage or why_it_happens or vehicle_value_check or block_recommendation
            )

            if has_structured_problem:
                for option in repair_options:
                    if len(option) >= 5:
                        continue

                six_cell_rows = parse_table(block[1:], "REPAIR OPTIONS", min_cells=6) or parse_table_variant(block[1:], "REPAIR OPTIONS", min_cells=6)
                if six_cell_rows:
                    repair_options = [
                        {
                            "tier": row[0],
                            "dealerPrice": row[1],
                            "specialistPrice": row[2],
                            "whatItInvolves": row[3],
                            "longevity": row[4],
                            "estimatedTime": row[5],
                        }
                        for row in six_cell_rows
                    ]

                problems.append(
                    {
                        "group": heading.split(" - ", 1)[0].strip(),
                        "h4": heading,
                        "image": "/images/shared/hero-engines/temporary-performance-engine.jpeg",
                        "affectedModels": affected,
                        "typicalFailureMileage": typical_failure_mileage,
                        "rootCause": root_cause,
                        "whyItHappens": why_it_happens,
                        "repairOptions": repair_options,
                        "vehicleValueCheck": vehicle_value_check,
                        "recommendation": recommendation,
                        "cta": find_label(block[1:], "CTA") or find_first_arrow_line(block[1:]),
                    }
                )
                continue

            final_cta_title = heading
            for raw_line in block[1:]:
                normalized = normalize_structured_line(raw_line)
                if normalized and not match_label(normalized):
                    final_cta_paragraph = normalized
                    break

        return {
            "tag": find_label(section_lines, "TAG") or "Common Problems",
            "h2": find_label(section_lines, "H2") or first_markdown_heading(section_lines, min_level=2, max_level=2),
            "h3": explicit_intro or " ".join(intro_lines),
            "problems": problems,
            "emptyState": None,
            "finalCta": {
                "h4": final_cta_title or f"Don't let engine failure write off your {variant_name}",
                "paragraph": final_cta_paragraph,
                "buttonText": find_label(section_lines, "CTA BUTTON"),
                "disclaimer": " ".join(collect_block(section_lines, "DISCLAIMER")),
            },
            "reviewSummary": None,
        }

    problems = []
    closing_title = ""
    closing_paragraph = ""
    intro = " ".join(collect_block(section_lines, "INTRO PARAGRAPH"))

    for block in parse_engine_blocks(section_lines):
        heading_match = H3_RE.match(normalize_structured_line(block[0]))
        if not heading_match:
            continue

        heading = heading_match.group("value")
        has_problem_fields = bool(
            collect_block(block[1:], "AFFECTED MODELS")
            or collect_block(block[1:], "ROOT CAUSE")
            or collect_block(block[1:], "REPAIR OPTIONS & ESTIMATED COSTS (UK RANGES)")
        )

        if not has_problem_fields:
            closing_title = heading
            for line in block[1:]:
                normalized = normalize_structured_line(line)
                if normalized and not match_label(normalized):
                    closing_paragraph = normalized
                    break
            continue

        problems.append(
            {
                "group": heading.split(" - ", 1)[0].strip(),
                "h4": heading,
                "affectedModels": " ".join(collect_block(block[1:], "AFFECTED MODELS")),
                "typicalFailureMileage": " ".join(collect_block(block[1:], "TYPICAL FAILURE MILEAGE")),
                "rootCause": " ".join(collect_block(block[1:], "ROOT CAUSE")),
                "repairOptions": parse_repair_options(block[1:], "REPAIR OPTIONS & ESTIMATED COSTS (UK RANGES)"),
                "recommendation": " ".join(collect_block(block[1:], "OUR RECOMMENDATION")),
                "cta": find_label(block[1:], "CTA LINE") or find_first_arrow_line(block[1:]),
            }
        )

    return {
        "tag": "Common Problems",
        "h2": find_label(section_lines, "H2") or first_markdown_heading(section_lines, min_level=2, max_level=2),
        "h3": intro,
        "problems": problems,
        "emptyState": {
            "title": "No pattern-specific failure blocks are documented for this variant yet.",
            "description": intro,
            "placeholder": "Add structured common-problem entries here when future source documents provide them.",
        }
        if not problems and intro
        else None,
        "finalCta": {
            "h4": closing_title or f"Don't let engine failure write off your {variant_name}",
            "paragraph": closing_paragraph,
            "buttonText": find_label(section_lines, "CTA BUTTON"),
            "disclaimer": " ".join(collect_block(section_lines, "DISCLAIMER")),
        },
    }


def parse_faq(section_lines: list[str], variant_name: str) -> dict[str, Any]:
    direct_questions = parse_question_blocks(section_lines)
    if direct_questions:
        items = []
        for block in direct_questions:
            question_match = QUESTION_RE.match(normalize_structured_line(block[0]))
            if not question_match:
                continue

            answer_lines: list[str] = []
            key_points: list[str] = []
            warning = None
            cta = ""
            for raw_line in block[1:]:
                normalized = normalize_structured_line(raw_line)
                if not normalized:
                    continue
                if normalized.startswith("->"):
                    cta = normalized
                    continue
                if raw_line.strip().startswith("-") or raw_line.strip().startswith("•"):
                    bullet = clean_bullet(raw_line)
                    if bullet:
                        key_points.append(bullet)
                    continue
                if "If you hear knocking" in normalized:
                    warning = normalized
                    continue
                answer_lines.append(normalized)

            items.append(
                {
                    "question": question_match.group("value").strip(),
                    "answer": answer_lines[0] if answer_lines else "",
                    "keyPoints": key_points,
                    "comparisonTable": None,
                    "warning": warning,
                    "cta": cta,
                }
            )

        return {
            "tag": find_label(section_lines, "TAG") or "FAQ",
            "h2": find_label(section_lines, "H2") or first_markdown_heading(section_lines, min_level=2, max_level=2),
            "intro": f"Everything {variant_name} owners usually ask before choosing a rebuilt, reconditioned or used replacement engine.",
            "defaultOpenIndex": 0,
            "disclaimer": " ".join(collect_block(section_lines, "DISCLAIMER")),
            "items": items,
            "ui": {
                "questionLabelPrefix": "Question",
                "keyPointsLabel": "Key points",
                "comparisonTableLabel": "Comparison table",
                "disclaimerLabel": "Disclaimer",
                "warningTitle": "Important",
            },
        }

    items = []
    for block in parse_question_blocks(section_lines):
        question_match = QUESTION_RE.match(normalize_structured_line(block[0]))
        if not question_match:
            continue

        comparison_rows = parse_table(block[1:], "COMPARISON TABLE", min_cells=3)
        key_points = extract_bullets(block[1:], "KEY POINTS")
        comparison_table = None
        if comparison_rows:
            headers = []
            table_block = collect_block(block[1:], "COMPARISON TABLE")
            table_lines = [line for line in table_block if line.strip().startswith("|")]
            if table_lines:
                headers = [normalize_text(cell) for cell in table_lines[0].strip().strip("|").split("|")]
            comparison_table = {
                "headers": headers,
                "rows": comparison_rows,
            }

        items.append(
            {
                "question": question_match.group("value").strip(),
                "answer": " ".join(collect_block(block[1:], "SHORT SUMMARY")),
                "keyPoints": key_points,
                "comparisonTable": comparison_table,
                "warning": find_label(block[1:], "WARNING") or None,
                "cta": find_first_arrow_line(block[1:]),
            }
        )

    return {
        "tag": "FAQs",
        "h2": find_label(section_lines, "H2") or first_markdown_heading(section_lines, min_level=2, max_level=2),
        "intro": f"Everything {variant_name} owners usually ask before choosing a rebuilt, reconditioned or used replacement engine.",
        "defaultOpenIndex": 0,
        "disclaimer": " ".join(collect_block(section_lines, "DISCLAIMER")),
        "items": items,
        "ui": {
            "questionLabelPrefix": "Question",
            "keyPointsLabel": "Key points",
            "comparisonTableLabel": "Comparison table",
            "disclaimerLabel": "Disclaimer",
            "warningTitle": "Important",
        },
    }


def parse_trust_cta(section_lines: list[str], variant_name: str) -> dict[str, Any]:
    trust_badge_lines = extract_bullets(section_lines, "TRUST BADGES") or extract_bullets_variant(section_lines, "TRUST BADGES")
    if trust_badge_lines:
        points = []
        for line in trust_badge_lines[:3]:
            title, description = split_dash_pair(line)
            points.append(
                {
                    "title": title.strip(),
                    "description": description.strip() if description.strip() != title.strip() else "",
                }
            )

        return {
            "tag": find_label(section_lines, "TAG") or "Why Choose Us",
            "h2": find_label(section_lines, "H2") or first_markdown_heading(section_lines, min_level=2, max_level=2),
            "intro": f"Compare quotes from trusted UK {variant_name} engine specialists with warranty-backed rebuilt, reconditioned and used options nationwide.",
            "points": points,
            "finalText": find_label(section_lines, "CLOSING LINE") or find_label_variant(section_lines, "CLOSING LINE"),
            "buttonText": find_label(section_lines, "CTA BUTTON"),
            "secondaryAction": {"text": "", "href": "tel:03330000044"},
            "ui": {
                "showSecondaryAction": False,
            },
        }

    points = []
    for label in ("TRUST BULLET 1", "TRUST BULLET 2", "TRUST BULLET 3"):
        text = find_label(section_lines, label)
        title, description = split_dash_pair(text)
        points.append({"title": title.strip(), "description": description.strip()})

    return {
        "tag": "Why Choose Us",
        "h2": find_label(section_lines, "H2") or first_markdown_heading(section_lines, min_level=2, max_level=2),
        "intro": f"Compare quotes from trusted UK {variant_name} engine specialists with warranty-backed rebuilt, reconditioned and used options nationwide.",
        "points": points,
        "finalText": find_label(section_lines, "FINAL CTA LINE"),
        "buttonText": find_label(section_lines, "CTA BUTTON"),
        "secondaryAction": {"text": "", "href": "tel:03330000044"},
        "ui": {
            "showSecondaryAction": False,
            "imageBadgeLabel": "Variant-specific support",
            "imageBadgeTitle": f"{variant_name} specialists across the UK",
            "imageBadgeText": "Compare supply-only and supply & fit quotes from vetted independent engine specialists.",
        },
    }


def find_variant_name(hero: dict[str, Any]) -> str:
    match = re.match(r"^(.*?)\s+Engine Replacement", hero.get("h1", ""), re.IGNORECASE)
    return match.group(1).strip() if match else hero.get("h1", "").strip()


def build_output_data(
    source_path: Path,
    lines: list[str],
    section_map: dict[int, list[str]],
    parent_model: dict[str, Any] | None,
) -> dict[str, Any]:
    metadata_lines = section_map.get(8, []) or extract_metadata_lines(lines)
    metadata = parse_metadata(metadata_lines)
    parent_brand = parent_model.get("brand", {}) if parent_model else {}
    parent_model_meta = parent_model.get("model", {}) if parent_model else {}
    brand_slug, model_slug, variant_slug = derive_route_parts(metadata, source_path.stem)

    expected_main_image = f"/images/brands/{brand_slug}/models/{brand_slug}-{model_slug}-main.webp" if brand_slug and model_slug else ""
    expected_small_image = f"/images/brands/{brand_slug}/models/{brand_slug}-{model_slug}-small.webp" if brand_slug and model_slug else ""
    hero_bg = parent_model.get("assets", {}).get("mainImage") if parent_model else ""
    if not hero_bg and parent_model:
        hero_bg = parent_model.get("assets", {}).get("heroBg", "")
    how_bg = parent_model.get("assets", {}).get("howItWorksBg") if parent_model else ""
    cta_image = parent_model.get("assets", {}).get("mainImage") if parent_model else hero_bg
    if not cta_image and parent_model:
        cta_image = parent_model.get("assets", {}).get("ctaImage", hero_bg)

    fallback_variant_name = source_path.stem.replace(" variant", "").strip()
    hero = parse_hero(section_map.get(1, []), fallback_variant_name, hero_bg)
    variant_name = find_variant_name(hero)
    normalize_hero_variant(hero, variant_name)
    canonical = metadata["canonical"] or (
        f"/{brand_slug}/{model_slug}/{variant_slug}" if brand_slug and model_slug and variant_slug else ""
    )
    seo_title = metadata["title"] or hero.get("h1", "")
    seo_description = metadata["description"] or hero.get("subheading", "")

    return {
        "brand": {
            "name": parent_brand.get("name") or brand_slug.replace("-", " ").title(),
            "slug": brand_slug,
            "tone": parent_brand.get("tone") or "premium",
        },
        "model": {
            "name": parent_model_meta.get("name") or model_slug.replace("-", " ").title(),
            "slug": parent_model_meta.get("slug") or model_slug,
        },
        "variant": {
            "name": variant_name,
            "slug": variant_slug,
            "storageSlug": f"{brand_slug}-{model_slug}-{variant_slug}",
        },
        "seo": {
            "title": seo_title,
            "description": seo_description,
            "canonical": canonical,
        },
        "assets": {
            "mainImage": (parent_model.get("assets", {}).get("mainImage") if parent_model else "") or expected_main_image,
            "smallImage": (parent_model.get("assets", {}).get("smallImage") if parent_model else "") or expected_small_image,
            "heroBg": hero_bg,
            "howItWorksBg": how_bg,
            "ctaImage": cta_image,
        },
        "structuredData": metadata.get("structuredData"),
        "sections": {
            "hero": hero,
            "howItWorks": parse_how_it_works(section_map.get(2, []), variant_name),
            "historyTimeline": parse_history_timeline(section_map.get(3, [])),
            "engineGuide": parse_engine_guide(section_map.get(4, [])),
            "commonProblems": parse_common_problems(section_map.get(5, []), variant_name),
            "faq": parse_faq(section_map.get(6, []), variant_name),
            "trustCta": parse_trust_cta(section_map.get(7, []), variant_name),
        },
    }


def validate_variant_data(source_path: Path, section_map: dict[int, list[str]], data: dict[str, Any]) -> list[str]:
    source_lines = read_lines(source_path)
    if detect_legacy_engine_page_source(source_lines):
        return [
            "Legacy engine-page schema detected: source uses live-market / sub-model / engine-types sections instead of the variant-page section 3-7 structure."
        ]

    warnings: list[str] = []

    for section_number in range(1, 8):
        if not section_map.get(section_number):
            warnings.append(f"Missing source section {section_number}")

    hero = data.get("sections", {}).get("hero", {})
    if not hero.get("tag"):
        warnings.append("Missing hero tag")
    if not hero.get("h1"):
        warnings.append("Missing hero H1")
    if not hero.get("subheading"):
        warnings.append("Missing hero subheading")
    if not hero.get("trustBadges"):
        warnings.append("Missing hero trust badges")
    if not hero.get("ctaLinkText"):
        warnings.append("Missing hero CTA button text")
    if not hero.get("ticker"):
        warnings.append("Missing hero ticker")

    how_it_works = data.get("sections", {}).get("howItWorks", {})
    cards = how_it_works.get("cards", [])
    if len(cards) < 3:
        warnings.append("How It Works has fewer than 3 cards")
    for index, card in enumerate(cards, start=1):
        if not card.get("front", {}).get("h3"):
            warnings.append(f"How It Works card {index} missing front heading")
        if not card.get("front", {}).get("text"):
            warnings.append(f"How It Works card {index} missing front text")
        if not card.get("back", {}).get("heading"):
            warnings.append(f"How It Works card {index} missing back heading")
        if not card.get("back", {}).get("text"):
            warnings.append(f"How It Works card {index} missing back text")
        if not card.get("back", {}).get("bullets"):
            warnings.append(f"How It Works card {index} missing back bullets")

    history = data.get("sections", {}).get("historyTimeline", {})
    if not history.get("h2"):
        warnings.append("Missing history timeline H2")
    if not history.get("intro"):
        warnings.append("Missing history timeline intro")
    if not history.get("milestones"):
        warnings.append("Missing history timeline milestones")
    if not history.get("specs"):
        warnings.append("Missing history timeline specs")

    guide = data.get("sections", {}).get("engineGuide", {})
    if not guide.get("h2"):
        warnings.append("Missing engine guide H2")
    if not guide.get("items"):
        warnings.append("Missing engine guide items")
    else:
        for index, item in enumerate(guide["items"], start=1):
            if not item.get("code"):
                warnings.append(f"Engine guide item {index} missing code")
            if not item.get("title"):
                warnings.append(f"Engine guide item {index} missing title")
            if not item.get("specs"):
                warnings.append(f"Engine guide item {index} missing specs")
            if not item.get("costs"):
                warnings.append(f"Engine guide item {index} missing costs")
            if not item.get("commonFailure"):
                warnings.append(f"Engine guide item {index} missing common failure")

    common_problems = data.get("sections", {}).get("commonProblems", {})
    if not common_problems.get("h2"):
        warnings.append("Missing common problems H2")
    if not common_problems.get("h3"):
        warnings.append("Missing common problems intro")
    if not common_problems.get("problems") and not common_problems.get("emptyState"):
        warnings.append("Missing common problems items")
    else:
        for index, problem in enumerate(common_problems["problems"], start=1):
            if not problem.get("h4"):
                warnings.append(f"Common problem {index} missing heading")
            if not problem.get("affectedModels"):
                warnings.append(f"Common problem {index} missing affected models")
            if not problem.get("rootCause"):
                warnings.append(f"Common problem {index} missing root cause")
            if not problem.get("repairOptions"):
                warnings.append(f"Common problem {index} missing repair options")
            if not problem.get("recommendation"):
                warnings.append(f"Common problem {index} missing recommendation")

    faq = data.get("sections", {}).get("faq", {})
    if not faq.get("h2"):
        warnings.append("Missing FAQ H2")
    if not faq.get("items"):
        warnings.append("Missing FAQ items")

    trust_cta = data.get("sections", {}).get("trustCta", {})
    if not trust_cta.get("h2"):
        warnings.append("Missing trust CTA H2")
    if not trust_cta.get("points"):
        warnings.append("Missing trust CTA points")
    if not trust_cta.get("finalText"):
        warnings.append("Missing trust CTA final text")
    if not trust_cta.get("buttonText"):
        warnings.append("Missing trust CTA button text")

    return warnings


def extract_file(source_path: Path, output_dir: Path) -> tuple[Path, list[str]]:
    lines = read_lines(source_path)
    section_map = split_sections(lines)
    metadata_lines = section_map.get(8, []) or extract_metadata_lines(lines)
    metadata = parse_metadata(metadata_lines)
    brand_slug, model_slug, _variant_slug = derive_route_parts(metadata, source_path.stem)
    parent_model = load_parent_model_page(brand_slug, model_slug)
    data = build_output_data(source_path, lines, section_map, parent_model)
    warnings = validate_variant_data(source_path, section_map, data)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{data['variant']['storageSlug']}.json"
    output_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return output_path, warnings


def collect_input_files(input_path: Path) -> list[Path]:
    if input_path.is_file():
        return [input_path]
    return sorted(
        path
        for path in input_path.rglob("*")
        if path.is_file() and path.suffix.lower() in {".txt", ".md", ".markdown"}
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extract variant-page JSON from structured text docs.")
    parser.add_argument("--input", "-i", required=True, help="Variant source file or folder.")
    parser.add_argument("--output", "-o", default=str(VARIANTS_DIR), help="Output folder for variant JSON.")
    parser.add_argument(
        "--warnings-output",
        default=str(VARIANTS_DIR / "_variant_extraction_warnings.json"),
        help="Path for extraction warnings JSON report.",
    )
    return parser.parse_args()


def main() -> int:
    configure_stdio()
    args = parse_args()
    input_path = Path(args.input)
    output_dir = Path(args.output)
    warnings_output = Path(args.warnings_output)
    files = collect_input_files(input_path)
    if not files:
        raise SystemExit(f"No variant source files found in {input_path}")

    warnings_report: list[dict[str, Any]] = []
    for source_file in files:
        output_path, warnings = extract_file(source_file, output_dir)
        warnings_report.append(
            {
                "source": str(source_file),
                "output": str(output_path),
                "route": output_path.stem,
                "warnings": warnings,
            }
        )
        status = "WARN" if warnings else "OK"
        print(f"{status} {source_file.name} -> {output_path}")
        for warning in warnings:
            print(f"  - {warning}")

    warnings_output.parent.mkdir(parents=True, exist_ok=True)
    warnings_output.write_text(json.dumps(warnings_report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Warnings report written to {warnings_output}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
