#!/usr/bin/env python3
"""
Extract model-page JSON from a structured markdown / txt planning document.

This is designed for model docs that follow the same style as:
    "BMW 2 Series [Markdown].txt"

What this script does:
- Parses the markdown labels and section blocks.
- Builds JSON matching the current ModelPageData schema used by the app.
- Optionally merges shared brand-level sections / assets from a brand JSON file.

Why the brand JSON option matters:
- Some model docs omit repeated/shared content such as full reviews or all
  three "How It Works" cards.
- Passing `--brand-json` lets you seed those repeated fields into the final
  model JSON while still keeping runtime rendering JSON-only.

Usage examples:
    python scripts/extract_model_markdown.py ^
      --input "C:\\Users\\Rahma\\Downloads\\BMW 2 Series [Markdown].txt" ^
      --brand-json "C:\\Users\\Rahma\\new_engine\\engine-market\\data\\brands\\bmw.json" ^
      --brand-name "BMW" ^
      --brand-slug "bmw" ^
      --model-name "BMW 2 Series" ^
      --model-slug "series-2" ^
      --legacy-slug "2-series" ^
      --output "C:\\Users\\Rahma\\new_engine\\engine-market\\data\\models\\series-2.json"

    python scripts/extract_model_markdown.py ^
      --input "C:\\path\\to\\model.md" ^
      --brand-name "Land Rover" ^
      --brand-slug "land-rover" ^
      --model-name "Land Rover Defender" ^
      --model-slug "defender" ^
      --stdout
"""

from __future__ import annotations

import argparse
import copy
import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Sequence, Tuple


MOJIBAKE_REPLACEMENTS = {
    "Ł": "£",
    "â€”": "-",
    "â€“": "-",
    "â€‘": "-",
    "â€’": "-",
    "â€˜": "'",
    "â€™": "'",
    "â€œ": '"',
    "â€": '"',
    "Â£": "£",
    "â†’": "->",
    "â€¢": "•",
    "ðŸ”’": "",
    "ðŸ”§": "",
    "ðŸšš": "",
    "ðŸ‘¥": "",
    "âœ…": "",
    "ðŸ–¼ï¸": "",
    "âš ï¸": "",
    "Ã—": "x",
    "Ã©": "é",
    "â€”": "—",
    "â€“": "–",
    "â€‘": "‑",
    "â†’": "->",
    "Â·": "·",
    "Â£": "£",
}

LABEL_LINE_RE = re.compile(
    r"^(?:\*{0,2})?(?P<label>[A-Za-z0-9 /&()'’+.-]+):(?:\*{0,2})?\s*(?P<value>.*)$"
)
SECTION_HEADER_RE = re.compile(r"^#\s*SECTION\s+\d+", re.IGNORECASE)
INLINE_H_RE = re.compile(r"^\*{0,2}H(?P<level>[1-4])(?:\s*\([^)]*\))?:\*{0,2}\s*(?P<value>.*)$", re.IGNORECASE)
YEAR_BLOCK_RE = re.compile(r"^###\s*(?P<year>.+?)\s*\|\s*(?P<preview>.+)$")
PRICE_RE = re.compile(r"£[\d,]+(?:\s*-\s*£?[\d,]+)?(?:\+)?")
PRICE_WITH_NOTE_RE = re.compile(r"(?P<price>£[\d,]+(?:\s*-\s*£?[\d,]+)?(?:\+)?)\s*(?:\((?P<note>[^)]+)\))?")
CARD_SPEC_RE = re.compile(
    r"^(?P<codes>.+?)\s+(?P<size>\d(?:\.\d)?L)\s+(?P<fuel>Diesel|Petrol|Hybrid|MHEV|PHEV)(?P<rest>.*)$",
    re.IGNORECASE,
)
POWER_RE = re.compile(r"(?P<power>\d{2,3}(?:-\d{2,3})?\s*hp)", re.IGNORECASE)
YEARS_RE = re.compile(r"(?P<years>\d{4}(?:-\d{4}|-present|-Present)?)", re.IGNORECASE)


NORMALIZED_PRICE_RE = re.compile(r"£[\d,]+(?:\s*[-–—]\s*£?[\d,]+)?(?:\+)?")
NORMALIZED_PRICE_WITH_NOTE_RE = re.compile(
    r"(?P<price>£[\d,]+(?:\s*[-–—]\s*£?[\d,]+)?(?:\+)?)\s*(?:\((?P<note>[^)]+)\))?"
)
NORMALIZED_POWER_RE = re.compile(
    r"(?P<power>\d{2,3}(?:\s*[-–—]\s*\d{2,3})?\s*hp(?:\s+combined)?)",
    re.IGNORECASE,
)
NORMALIZED_YEARS_RE = re.compile(
    r"(?P<years>\d{4}(?:\s*[-–—]\s*(?:\d{4}|present|Present))?)",
    re.IGNORECASE,
)


def repair_text(value: str) -> str:
    repaired = value.replace("\ufeff", "").replace("\xa0", " ").replace("\u200b", "")
    if not re.search(r"[ÃÂâðЁ┬т]", repaired):
        return repaired
    for wrong, right in MOJIBAKE_REPLACEMENTS.items():
        repaired = repaired.replace(wrong, right)
    return repaired


def clean_text(value: str) -> str:
    value = repair_text(value)
    value = value.replace("â€‘", "-").replace("â€“", "-").replace("â€”", "-").replace("–", "-").replace("—", "-")
    value = value.replace("\t", " ")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def strip_markdown(value: str) -> str:
    text = clean_text(value)
    text = text.replace("**", "").replace("__", "").replace("`", "")
    text = re.sub(r"^\[(.*?)\]\s*", "", text)
    return text.strip(" -*•")


def normalize_line(value: str) -> str:
    return strip_markdown(value)


def strip_emphasis_preserve_brackets(value: str) -> str:
    text = clean_text(value)
    text = text.replace("**", "").replace("__", "").replace("`", "")
    return text.strip(" -*•")


def normalize_key(value: str) -> str:
    return normalize_line(value).lower()


def slugify(value: str) -> str:
    value = normalize_line(value).lower()
    value = value.replace("&", " and ")
    value = value.replace("/", " ")
    value = value.replace("\\", " ")
    value = value.replace("'", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value)
    return value.strip("-")


def read_lines(path: Path) -> List[str]:
    text: Optional[str] = None
    for encoding in ("utf-8", "utf-8-sig", "cp1252", "latin-1"):
        try:
            text = path.read_text(encoding=encoding)
            break
        except UnicodeDecodeError:
            continue
    if text is None:
        text = path.read_text(encoding="utf-8", errors="replace")
    return [repair_text(line.rstrip("\n\r")) for line in text.splitlines()]


def is_blank(line: str) -> bool:
    return normalize_line(line) == ""


def looks_like_label(line: str) -> bool:
    normalized = normalize_line(line)
    if not normalized:
        return False
    if SECTION_HEADER_RE.match(normalized):
        return True
    if INLINE_H_RE.match(line):
        return True
    if LABEL_LINE_RE.match(line):
        return True
    if normalized.startswith("CARD ") and normalized.endswith(("FRONT:", "FLIP:")):
        return True
    if normalized.startswith("Option "):
        return True
    if normalized.startswith("Row "):
        return True
    if normalized.startswith("### ") or normalized.startswith("#### "):
        return True
    return False


def next_non_blank(lines: Sequence[str], start: int) -> Optional[int]:
    for i in range(start, len(lines)):
        if not is_blank(lines[i]):
            return i
    return None


def find_line(lines: Sequence[str], predicate) -> Optional[int]:
    for i, line in enumerate(lines):
        if predicate(line):
            return i
    return None


def extract_slice(
    lines: Sequence[str],
    start_matchers: Sequence[str],
    end_matchers: Sequence[str],
) -> List[str]:
    start_idx = None
    lowered_matchers = [matcher.lower() for matcher in start_matchers]
    lowered_end_matchers = [matcher.lower() for matcher in end_matchers]

    for idx, line in enumerate(lines):
        normalized = normalize_key(line)
        if any(matcher in normalized for matcher in lowered_matchers):
            start_idx = idx
            break

    if start_idx is None:
        return []

    end_idx = len(lines)
    for idx in range(start_idx + 1, len(lines)):
        normalized = normalize_key(lines[idx])
        if any(matcher in normalized for matcher in lowered_end_matchers):
            end_idx = idx
            break

    return list(lines[start_idx:end_idx])


def extract_label_value(lines: Sequence[str], *labels: str) -> Optional[str]:
    wanted = {label.lower() for label in labels}
    for idx, raw in enumerate(lines):
        match = LABEL_LINE_RE.match(raw.strip())
        if not match:
            continue
        label = normalize_key(match.group("label"))
        if label not in wanted:
            continue
        inline = normalize_line(match.group("value"))
        if inline:
            return inline

        values: List[str] = []
        j = idx + 1
        while j < len(lines):
            if is_blank(lines[j]):
                if values:
                    break
                j += 1
                continue
            if looks_like_label(lines[j]):
                break
            values.append(normalize_line(lines[j]))
            j += 1
        if values:
            return " ".join(values).strip()
    return None


def extract_block_after_label(lines: Sequence[str], *labels: str) -> List[str]:
    wanted = {label.lower() for label in labels}
    for idx, raw in enumerate(lines):
        match = LABEL_LINE_RE.match(raw.strip())
        if not match:
            continue
        label = normalize_key(match.group("label"))
        if label not in wanted:
            continue
        inline = normalize_line(match.group("value"))
        if inline:
            return [inline]

        block: List[str] = []
        j = idx + 1
        while j < len(lines):
            if is_blank(lines[j]):
                if block:
                    break
                j += 1
                continue
            if looks_like_label(lines[j]):
                break
            block.append(normalize_line(lines[j]))
            j += 1
        return block
    return []


def split_bullets(line: str, separators: Sequence[str]) -> List[str]:
    text = normalize_line(line)
    for sep in separators:
        text = text.replace(sep, "|")
    return [item.strip(" |") for item in text.split("|") if item.strip(" |")]


def split_inline_items(line: str) -> List[str]:
    return split_bullets(line, ["·", "Â·", "•", "â€¢", "|", ";"])


def is_bullet_line(line: str) -> bool:
    stripped = repair_text(line).lstrip()
    return stripped.startswith(("-", "â€¢", "•"))


def strip_bullet_text(line: str) -> str:
    stripped = repair_text(line).lstrip()
    if stripped.startswith("-"):
        stripped = stripped[1:].lstrip()
    elif stripped.startswith(("â€¢", "•")):
        stripped = stripped[1:].lstrip()
    return normalize_line(stripped)


def is_arrow_line(line: str) -> bool:
    stripped = normalize_line(line)
    return bool(re.match(r"^(?:->|â†’|→)\s*", stripped))


def strip_arrow_text(line: str) -> str:
    return re.sub(r"^(?:->|â†’|→)\s*", "", normalize_line(line)).strip()


def normalize_price_text(text: str) -> str:
    return normalize_line(text).replace("Ł", "£")


def title_from_h1(h1: str) -> str:
    cleaned = normalize_line(h1)
    cleaned = re.sub(r"\s*-\s*compare.+$", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\s*engine replacement.*$", "", cleaned, flags=re.IGNORECASE)
    return cleaned.strip()


def looks_like_image_path(value: str) -> bool:
    cleaned = normalize_line(value)
    return bool(
        cleaned
        and (
            cleaned.startswith("/")
            or cleaned.startswith("http://")
            or cleaned.startswith("https://")
            or re.search(r"\.(?:png|jpe?g|webp|svg|avif)$", cleaned, flags=re.IGNORECASE)
        )
    )


def infer_storage_slug_from_name(model_name: str) -> str:
    cleaned = normalize_line(model_name)
    bmw_series_match = re.match(r"^(?:BMW\s+)?(?P<number>\d+)\s+Series$", cleaned, flags=re.IGNORECASE)
    if bmw_series_match:
        return f"series-{bmw_series_match.group('number')}"
    return slugify(cleaned)


def infer_model_slug_from_name(model_name: str, brand_name: str | None = None) -> str:
    cleaned = normalize_line(model_name)
    if brand_name:
        cleaned = normalize_model_name_for_brand(cleaned, brand_name)

    bmw_series_match = re.match(r"^(?:BMW\s+)?(?P<number>\d+)\s+Series$", cleaned, flags=re.IGNORECASE)
    if bmw_series_match:
        return f"series-{bmw_series_match.group('number')}"
    return slugify(cleaned)


def normalize_model_name_for_brand(model_name: str, brand_name: str) -> str:
    cleaned_model = normalize_line(model_name)
    cleaned_brand = normalize_line(brand_name)
    if not cleaned_model or not cleaned_brand:
        return cleaned_model

    pattern = re.compile(
        r"^"
        + re.escape(cleaned_brand).replace(r"\ ", r"[\s-]+")
        + r"[\s-]*",
        flags=re.IGNORECASE,
    )
    remainder = cleaned_model
    while True:
        updated = pattern.sub("", remainder, count=1).strip(" -")
        if updated == remainder:
            break
        remainder = updated
    if not remainder:
        return cleaned_brand

    return f"{cleaned_brand} {remainder}".strip()


def parse_canonical_to_paths(url: str) -> Tuple[Optional[str], Optional[str]]:
    cleaned = normalize_line(url)
    match = re.search(r"https?://[^/]+/(?P<brand>[^/]+)/(?P<model>[^/]+)/?$", cleaned, flags=re.IGNORECASE)
    if not match:
        return None, None
    return match.group("brand"), match.group("model")


def default_assets(
    brand_slug: str,
    model_slug: str,
    brand_json: Optional[Dict[str, Any]],
    hero_image: Optional[str],
    cta_image: Optional[str],
) -> Dict[str, str]:
    model_image = hero_image or f"/images/brands/{brand_slug}/models/{brand_slug}-{model_slug}-model-card.png"
    cta = cta_image or model_image
    brand_assets = (brand_json or {}).get("assets", {})

    return {
        "heroBg": model_image,
        "howItWorksBg": brand_assets.get(
            "howItWorksBg",
            f"/images/brands/{brand_slug}/brand/{brand_slug}-how-it-works-bg.webp",
        ),
        "engineCodesBg": brand_assets.get(
            "engineCodesBg",
            f"/images/brands/{brand_slug}/brand/{brand_slug}-engine-codes-bg.webp",
        ),
        "engineTypesBg": brand_assets.get(
            "engineTypesBg",
            f"/images/brands/{brand_slug}/brand/{brand_slug}-engine-types-bg.webp",
        ),
        "engineSizesBg": brand_assets.get(
            "engineSizesBg",
            f"/images/brands/{brand_slug}/brand/{brand_slug}-engine-sizes-bg.webp",
        ),
        "fuelTypesBg": brand_assets.get(
            "fuelTypesBg",
            f"/images/brands/{brand_slug}/brand/{brand_slug}-fuel-types-bg.webp",
        ),
        "ctaImage": cta,
    }


def build_empty_model_json(
    brand_name: str,
    brand_slug: str,
    model_name: str,
    model_slug: str,
    legacy_slug: Optional[str],
    assets: Dict[str, str],
) -> Dict[str, Any]:
    data = {
        "brand": {
            "name": brand_name,
            "slug": brand_slug,
            "tone": "premium",
        },
        "model": {
            "name": model_name,
            "slug": model_slug,
        },
        "seo": {
            "title": f"{model_name} Engine Replacement - Compare Prices",
            "description": "",
            "canonical": f"/{brand_slug}/{model_slug}",
        },
        "assets": assets,
        "sections": {
            "hero": {
                "tag": f"{brand_name.upper()} ENGINE MARKETPLACE",
                "h1": f"{model_name} Engine Replacement - Compare Prices",
                "subheading": "",
                "trustBadges": [],
                "ctaLinkText": f"Compare {model_name} Engine Prices",
                "supportingText": f"Get tailored {model_name} engine quotes from vetted UK specialists.",
                "ticker": "",
                "form": {
                    "heading": f"Find Your {model_name} Engine",
                    "subtitle": f"Enter your registration number to compare {model_name} engine options.",
                    "inputPlaceholder": "Enter Reg (e.g. AB12 CDE)",
                    "buttonText": f"Get Free {model_name} Engine Quotes",
                    "note": "",
                },
            },
            "howItWorks": {
                "tag": "How It Works",
                "h2": f"3 Simple Steps to Finding the Best {model_name} Replacement Engine",
                "cards": [],
                "tagline": "",
            },
            "liveMarketPrices": {
                "tag": "Live UK Engine Market Data",
                "h2": "",
                "h3": "",
                "introBullets": [],
                "cta": {
                    "heading": f"Benchmark your own {model_name} quote",
                    "text": f"Use these recent enquiries to understand the market, then compare tailored quotes for your exact {model_name} engine.",
                    "buttonText": f"Compare My {model_name} Engine",
                    "note": "Prices vary by engine code, damage severity, supplier stock and whether you need supply-only or supply and fit.",
                },
                "badges": [],
                "feed": {
                    "isDynamic": False,
                    "rowsCount": 0,
                    "columns": [
                        "Year",
                        "Model",
                        "Engine Code",
                        "Fuel",
                        "Avg. Quoted Price",
                        "Reported Issue",
                    ],
                    "timestampLabel": "Last Updated",
                    "refreshLabel": "Refresh feed",
                    "density": "premium",
                    "visibleRows": 0,
                    "entries": [],
                },
            },
            "reviews": {
                "tag": "Customer Reviews",
                "h2": f"Trusted by {model_name} Owners Across the UK",
                "rating": {
                    "value": 4.8,
                    "count": 0,
                    "summary": "",
                    "basedOn": "",
                },
                "reviews": [],
                "leaveReviewCta": {
                    "text": "",
                    "linkText": "Leave a review ->",
                },
            },
            "variantCoverage": {
                "tag": "Models We Cover",
                "h2": "",
                "subheading": "",
                "cards": [],
                "directory": {
                    "h3": "",
                    "intro": "",
                    "groups": [],
                },
                "engineGuide": {
                    "tag": "Engine Codes",
                    "h2": "",
                    "h3": "",
                    "families": [],
                    "closing": "",
                },
            },
            "engineCodes": {
                "tag": "Engine Codes",
                "h2": "",
                "h3": "",
                "closingLine": "",
                "filters": [],
                "groups": [],
            },
            "commonProblems": {
                "tag": "Common Problems",
                "h2": "",
                "h3": "",
                "problems": [],
                "finalCta": {
                    "h4": "",
                    "paragraph": "",
                    "buttonText": "",
                    "disclaimer": "",
                },
            },
            "engineTypes": {
                "tag": "Replacement Engine Options",
                "h2": "",
                "intro": "",
                "types": [],
                "closing": "",
            },
            "engineSizes": {
                "tag": "Engine Sizes",
                "h2": "",
                "intro": "",
                "groups": [],
                "closing": "",
            },
            "fuelTypes": {
                "tag": "Fuel Type",
                "h2": "",
                "intro": "",
                "items": [],
                "closing": "",
            },
            "engineYears": {
                "tag": "Engine Years",
                "h2": "",
                "intro": "",
                "jumpLabel": "Jump to model year",
                "years": [],
                "closing": "",
            },
            "faq": {
                "tag": "FAQ",
                "h2": "",
                "intro": "",
                "items": [],
            },
            "trustCta": {
                "tag": "Why Choose Us",
                "h2": "",
                "intro": "",
                "points": [],
                "finalText": "",
                "buttonText": "",
            },
        },
    }
    if legacy_slug:
        data["model"]["legacySlug"] = legacy_slug
    return data


def split_display_heading(text: str) -> List[str]:
    normalized = clean_text(text)
    if not normalized:
        return []
    if " - " in normalized:
        return [part.strip() for part in normalized.split(" - ") if part.strip()]
    if normalized.lower().startswith("3 simple steps to"):
        return ["3 Simple Steps", normalized[len("3 Simple Steps") :].strip()]
    return [normalized]


def strip_engine_replacement(text: str) -> str:
    return re.sub(r"\s+Engine Replacement$", "", clean_text(text), flags=re.IGNORECASE).strip()


def infer_power_score(power: str) -> int:
    matches = [int(value) for value in re.findall(r"\d+", power or "")]
    return max(matches) if matches else 0


def infer_variant_group(card: Dict[str, Any]) -> str:
    title = clean_text(card.get("h3", ""))
    fuel = clean_text(card.get("fuel", "")).lower()
    if title.startswith("BMW M") or infer_power_score(card.get("power", "")) >= 250:
        return "performance"
    if "diesel" in fuel:
        return "diesel"
    return "petrol"


def build_variant_groups(cards: Sequence[Dict[str, Any]]) -> List[Dict[str, Any]]:
    ordered = [
        ("diesel", "Core Diesel Range"),
        ("petrol", "Core Petrol Range"),
        ("performance", "Performance Range"),
    ]
    groups: List[Dict[str, Any]] = []
    for key, title in ordered:
        slugs = [card["slug"] for card in cards if infer_variant_group(card) == key and card.get("slug")]
        if slugs:
            groups.append({"title": title, "cardSlugs": slugs})
    return groups


def build_live_filter_tabs(cards: Sequence[Dict[str, Any]]) -> List[Dict[str, Any]]:
    tabs = [{"key": "all", "label": "All", "matchers": []}]
    seen_keys = {"all"}
    for card in cards:
        title = strip_engine_replacement(card.get("h3", ""))
        label = re.sub(r"^(BMW|Land Rover|Range Rover)\s+", "", title, flags=re.IGNORECASE).strip()
        key = card.get("slug", slugify(label))
        if key in seen_keys:
            continue
        seen_keys.add(key)
        slug_words = key.replace("-", " ").strip().lower()
        tabs.append(
            {
                "key": key,
                "label": label,
                "matchers": [label.lower(), slug_words],
            }
        )
    return tabs


def build_hero_highlights(cards: Sequence[Dict[str, Any]]) -> List[Dict[str, Any]]:
    highlights: List[Dict[str, Any]] = []
    for card in cards[:3]:
        engine_codes = ", ".join(card.get("engineCodes", []))
        detail = f"-> Rebuilt units from {card.get('priceRange', '')}"
        if engine_codes:
            detail += f" - Common codes: {engine_codes}"
        highlights.append(
            {
                "title": strip_engine_replacement(card.get("h3", "")),
                "price": clean_text(card.get("priceRange", "")),
                "detail": detail.strip(),
                "image": card.get("image", ""),
            }
        )
    return highlights


def split_anchor_title_and_price(line_one: str) -> Tuple[str, str]:
    normalized = clean_text(line_one)
    normalized = re.sub(r"^\[[^\]]+\]\s*", "", normalized).strip()
    match = re.search(
        r"(?P<title>.*?)(?:\s+[—-]\s+)(?P<price>from\s+£[\d,]+\s+to\s+£[\d,]+.*)$",
        normalized,
        flags=re.IGNORECASE,
    )
    if match:
        return match.group("title").strip(), match.group("price").strip()
    return normalized, ""


def parse_price_anchor_rows(lines: Sequence[str]) -> List[Dict[str, Any]]:
    highlights: List[Dict[str, Any]] = []
    idx = 0

    while idx < len(lines):
        if not normalize_key(lines[idx]).startswith("price anchor row"):
            idx += 1
            continue

        block: List[str] = []
        j = idx + 1
        while j < len(lines):
            normalized = normalize_line(lines[j])
            if not normalized:
                if block:
                    break
                j += 1
                continue
            if normalize_key(lines[j]).startswith("price anchor row") or SECTION_HEADER_RE.match(lines[j]):
                break
            block.append(normalized)
            j += 1

        line_one = ""
        line_two = ""
        image_alt = ""

        for entry in block:
            match = LABEL_LINE_RE.match(entry)
            if not match:
                continue
            label = normalize_key(match.group("label"))
            value = normalize_line(match.group("value"))
            if label == "line 1":
                line_one = value
            elif label == "line 2":
                line_two = value.replace("→", "->").strip()
            elif label == "engine image alt text":
                image_alt = value

        if line_one:
            title, price = split_anchor_title_and_price(line_one)
            highlight: Dict[str, Any] = {
                "title": title,
                "price": price,
                "line1": re.sub(r"^\[[^\]]+\]\s*", "", line_one).strip(),
                "line2": line_two,
                "detail": line_two,
                "image": "",
            }
            if image_alt:
                highlight["imageAlt"] = image_alt
            highlights.append(highlight)

        idx = j

    return highlights


def engine_placeholder_image(fuel: str) -> str:
    normalized = clean_text(fuel).lower()
    if "diesel" in normalized:
        return "/images/brands/land-rover/engines/land-rover-aj20d6-engine.webp"
    return "/images/brands/land-rover/engines/land-rover-508pn-engine.webp"


def split_year_ticker(ticker: str) -> List[str]:
    if not ticker:
        return []
    normalized = clean_text(ticker)
    parts = [part.strip() for part in re.split(r"[•;|]", normalized) if part.strip()]
    return parts[:4]


def year_badges(entry: Dict[str, Any]) -> List[Dict[str, Any]]:
    key_changes = entry.get("keyChanges") or []
    known_for = entry.get("knownFor") or []
    main_engines = entry.get("mainEngines") or []
    if key_changes or known_for or main_engines:
        badges: List[Dict[str, Any]] = []
        if key_changes:
            badges.append({"label": "Major Engine Changes", "tone": "accent"})
        if known_for or main_engines:
            label = f"{len(main_engines)} engine highlights" if main_engines else "Model year highlights"
            badges.append({"label": label, "tone": "muted"})
        return badges[:2]
    return [{"label": "Year overview", "tone": "accent"}]


def has_meaningful_value(value: Any) -> bool:
    if value is None:
        return False
    if isinstance(value, bool):
        return True
    if isinstance(value, (int, float)):
        return True
    if isinstance(value, str):
        return clean_text(value) != ""
    if isinstance(value, dict):
        return any(has_meaningful_value(item) for item in value.values())
    if isinstance(value, list):
        return any(has_meaningful_value(item) for item in value)
    return True


def canonical_merge_text(value: Any) -> str:
    text = slugify(str(value or ""))
    return re.sub(r"\b(the|a|an|in|on|of|for|to|my|your|our|really|they|is|are|do|does|did|can|will|should)\b", "", text)


def normalize_highlight_bucket(value: Any) -> str:
    lowered = normalize_key(str(value or ""))
    for bucket in ("diesel", "petrol", "performance", "hybrid", "electrified", "electric"):
        if bucket in lowered:
            return bucket
    return canonical_merge_text(value)


def dict_merge_identity(item: Any) -> Optional[Tuple[str, ...]]:
    if not isinstance(item, dict):
        return None

    if item.get("question"):
        return ("question", canonical_merge_text(item.get("question")))

    if item.get("line1") or (item.get("title") and ("line2" in item or "detail" in item) and item.get("price")):
        seed = item.get("line1") or item.get("title")
        return ("highlight", normalize_highlight_bucket(seed))

    if item.get("slug") and item.get("subtitle"):
        return ("slug-subtitle", canonical_merge_text(item.get("slug")), canonical_merge_text(item.get("subtitle")))

    if item.get("slug") and item.get("h3"):
        return ("slug-title", canonical_merge_text(item.get("slug")), canonical_merge_text(item.get("h3")))

    if item.get("code") and item.get("title"):
        return ("code-title", canonical_merge_text(item.get("code")), canonical_merge_text(item.get("title")))

    if item.get("number") is not None:
        return ("number", str(item.get("number")))

    if item.get("year") and item.get("preview"):
        return ("year-preview", canonical_merge_text(item.get("year")), canonical_merge_text(item.get("preview")))

    if item.get("key") is not None:
        return ("key", canonical_merge_text(item.get("key")))

    if item.get("label") and item.get("text"):
        return ("label-text", canonical_merge_text(item.get("label")))

    if item.get("label") and item.get("tone"):
        return ("label-tone", canonical_merge_text(item.get("label")), canonical_merge_text(item.get("tone")))

    if item.get("title") and item.get("description"):
        return ("title-description", canonical_merge_text(item.get("title")))

    return None


def list_merge_key(items: Sequence[Any]) -> Optional[str]:
    candidates = ("slug", "code", "number", "question", "title", "year", "group", "label")
    dict_items = [item for item in items if isinstance(item, dict)]
    if not dict_items:
        return None
    for candidate in candidates:
        if any(candidate in item for item in dict_items):
            return candidate
    return None


def merge_lists(existing: Sequence[Any], extracted: Sequence[Any]) -> List[Any]:
    if not extracted:
        return copy.deepcopy(list(existing))

    if all(isinstance(item, dict) for item in [*existing, *extracted] if item is not None):
        extracted_identities = [dict_merge_identity(item) for item in extracted]
        existing_identities = [dict_merge_identity(item) for item in existing]

        if extracted_identities and all(identity is not None for identity in extracted_identities):
            existing_buckets: Dict[Tuple[str, ...], List[Dict[str, Any]]] = {}
            for item, identity in zip(existing, existing_identities):
                if identity is None or not isinstance(item, dict):
                    continue
                existing_buckets.setdefault(identity, []).append(item)

            merged: List[Any] = []
            extracted_identity_set = {identity for identity in extracted_identities if identity is not None}

            for item, identity in zip(extracted, extracted_identities):
                if identity is not None and existing_buckets.get(identity):
                    merged.append(deep_merge_existing(existing_buckets[identity].pop(0), item))
                else:
                    merged.append(copy.deepcopy(item))

            for item, identity in zip(existing, existing_identities):
                if identity is None:
                    if not merged:
                        merged.append(copy.deepcopy(item))
                    continue
                if identity not in extracted_identity_set and item not in merged:
                    merged.append(copy.deepcopy(item))

            return merged

    merge_key = list_merge_key([*existing, *extracted])
    if not merge_key:
        if len(existing) == len(extracted) and all(isinstance(item, dict) for item in [*existing, *extracted]):
            return [deep_merge_existing(current, new) for current, new in zip(existing, extracted)]
        return copy.deepcopy(list(extracted))

    existing_map = {
        item.get(merge_key): item
        for item in existing
        if isinstance(item, dict) and item.get(merge_key) is not None
    }
    merged: List[Any] = []
    seen_keys = set()

    for item in extracted:
        if isinstance(item, dict):
            key = item.get(merge_key)
            if key is not None and key in existing_map:
                merged.append(deep_merge_existing(existing_map[key], item))
                seen_keys.add(key)
                continue
        merged.append(copy.deepcopy(item))

    for item in existing:
        if not isinstance(item, dict):
            continue
        key = item.get(merge_key)
        if key is not None and key not in seen_keys:
            merged.append(copy.deepcopy(item))

    return merged


def deep_merge_existing(existing: Any, extracted: Any) -> Any:
    if existing is None:
        return copy.deepcopy(extracted)
    if extracted is None:
        return copy.deepcopy(existing)

    if isinstance(existing, dict) and isinstance(extracted, dict):
        merged = copy.deepcopy(existing)
        for key, value in extracted.items():
            if key in merged:
                merged[key] = deep_merge_existing(merged[key], value)
            elif has_meaningful_value(value):
                merged[key] = copy.deepcopy(value)
        return merged

    if isinstance(existing, list) and isinstance(extracted, list):
        return merge_lists(existing, extracted)

    return copy.deepcopy(extracted) if has_meaningful_value(extracted) else copy.deepcopy(existing)


def backfill_list_fields(
    existing_items: Sequence[Any],
    extracted_items: Sequence[Any],
    fields: Sequence[str],
) -> List[Any]:
    existing_buckets: Dict[Tuple[str, ...], List[Dict[str, Any]]] = {}
    for item in existing_items:
        identity = dict_merge_identity(item)
        if identity is None or not isinstance(item, dict):
            continue
        existing_buckets.setdefault(identity, []).append(item)

    merged_items: List[Any] = []
    for item in extracted_items:
        if not isinstance(item, dict):
            merged_items.append(copy.deepcopy(item))
            continue

        merged_item = copy.deepcopy(item)
        identity = dict_merge_identity(item)
        existing_item = None
        if identity is not None and existing_buckets.get(identity):
            existing_item = existing_buckets[identity].pop(0)

        if existing_item:
            for field in fields:
                if not has_meaningful_value(merged_item.get(field)) and has_meaningful_value(existing_item.get(field)):
                    merged_item[field] = copy.deepcopy(existing_item[field])

        merged_items.append(merged_item)

    return merged_items


def restore_doc_driven_sections(
    merged: Dict[str, Any],
    extracted: Dict[str, Any],
    existing_output: Optional[Dict[str, Any]],
) -> Dict[str, Any]:
    if not existing_output:
        return merged

    existing_sections = existing_output.get("sections", {})
    merged_sections = merged.get("sections", {})
    extracted_sections = extracted.get("sections", {})

    extracted_highlights = extracted_sections.get("hero", {}).get("highlights", [])
    if extracted_highlights:
        merged_sections.setdefault("hero", {})["highlights"] = backfill_list_fields(
            existing_sections.get("hero", {}).get("highlights", []),
            extracted_highlights,
            ("image",),
        )

    extracted_variant_cards = extracted_sections.get("variantCoverage", {}).get("cards", [])
    if extracted_variant_cards:
        merged_sections.setdefault("variantCoverage", {})["cards"] = backfill_list_fields(
            existing_sections.get("variantCoverage", {}).get("cards", []),
            extracted_variant_cards,
            ("image",),
        )

    extracted_engine_guide = extracted_sections.get("variantCoverage", {}).get("engineGuide")
    if extracted_engine_guide and has_meaningful_value(extracted_engine_guide.get("families")):
        merged_sections.setdefault("variantCoverage", {})["engineGuide"] = copy.deepcopy(extracted_engine_guide)

    extracted_feed_entries = extracted_sections.get("liveMarketPrices", {}).get("feed", {}).get("entries", [])
    if extracted_feed_entries:
        merged_sections.setdefault("liveMarketPrices", {}).setdefault("feed", {})["entries"] = copy.deepcopy(extracted_feed_entries)

    extracted_common_problems = extracted_sections.get("commonProblems", {}).get("problems", [])
    if extracted_common_problems:
        merged_sections.setdefault("commonProblems", {})["problems"] = copy.deepcopy(extracted_common_problems)

    extracted_years = extracted_sections.get("engineYears", {}).get("years", [])
    if extracted_years:
        merged_sections.setdefault("engineYears", {})["years"] = copy.deepcopy(extracted_years)

    extracted_engine_sizes = extracted_sections.get("engineSizes")
    if extracted_engine_sizes and has_meaningful_value(extracted_engine_sizes.get("groups")):
        merged_sections["engineSizes"] = copy.deepcopy(extracted_engine_sizes)

    extracted_fuel_types = extracted_sections.get("fuelTypes")
    if extracted_fuel_types and has_meaningful_value(extracted_fuel_types.get("items")):
        merged_sections["fuelTypes"] = copy.deepcopy(extracted_fuel_types)

    extracted_engine_years_section = extracted_sections.get("engineYears")
    if extracted_engine_years_section and has_meaningful_value(extracted_engine_years_section.get("years")):
        merged_sections["engineYears"] = copy.deepcopy(extracted_engine_years_section)

    extracted_engine_codes = extracted_sections.get("engineCodes")
    if extracted_engine_codes and has_meaningful_value(extracted_engine_codes.get("groups")):
        merged_sections["engineCodes"] = copy.deepcopy(extracted_engine_codes)

    extracted_faq_items = extracted_sections.get("faq", {}).get("items", [])
    if extracted_faq_items:
        merged_sections.setdefault("faq", {})["items"] = copy.deepcopy(extracted_faq_items)

    return merged


def inject_model_ui_defaults(data: Dict[str, Any]) -> Dict[str, Any]:
    model_name = data["model"]["name"]
    cards = data["sections"]["variantCoverage"].get("cards", [])

    hero = data["sections"]["hero"]
    hero.setdefault("headingLines", split_display_heading(hero.get("h1", "")))
    hero.setdefault("imageAlt", model_name)
    hero.setdefault(
        "mobileBar",
        {
            "brandText": "ENGINEMARKET",
            "callLabel": "Call",
            "quoteLabel": "GET QUOTES",
        },
    )
    hero.setdefault(
        "registrationInput",
        {
            "label": "Enter your vehicle registration",
            "platePlaceholder": "AB12 CDE",
            "countryCode": "UK",
            "countryLabel": "United Kingdom",
        },
    )
    if not hero.get("highlights") and cards:
        hero["highlights"] = build_hero_highlights(cards)

    how = data["sections"]["howItWorks"]
    how.setdefault("headingLines", split_display_heading(how.get("h2", "")))
    how.setdefault(
        "ui",
        {
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
    )

    live = data["sections"]["liveMarketPrices"]
    live.setdefault("headingLines", split_display_heading(live.get("h2", "")))
    live.setdefault("imageAlt", f"{model_name} live market price reference")
    if cards:
        live["filterTabs"] = build_live_filter_tabs(cards)
    else:
        live.setdefault("filterTabs", build_live_filter_tabs(cards))
    live.setdefault(
        "ui",
        {
            "showingSingleLabel": "entry",
            "showingPluralLabel": "entries",
            "acrossAllLabel": "across all models",
            "noEntriesLabel": "No entries match that model filter yet.",
            "updatedLabel": "Last updated:",
            "ctaLabel": "Live Quote Benchmark",
        },
    )

    variant = data["sections"]["variantCoverage"]
    variant.setdefault("headingLines", split_display_heading(variant.get("h2", "")))
    variant.setdefault("groups", build_variant_groups(cards))
    variant.setdefault(
        "ui",
        {
            "fromPriceLabel": "from price",
            "specsLabel": "Specs",
            "rebuiltLabel": "Rebuilt",
            "yearsLabel": "Years",
            "yearsFallback": "Check exact year coverage by registration",
        },
    )
    variant["directory"].setdefault("label", "Variant Directory")

    engine_codes = data["sections"]["engineCodes"]
    engine_codes.setdefault("headingLines", split_display_heading(engine_codes.get("h2", "")))
    engine_codes.setdefault(
        "closingAction",
        {
            "title": "Can't find your engine code?",
            "buttonText": "Enter Your Reg",
        },
    )
    engine_codes.setdefault(
        "ui",
        {
            "summaryPriceLabel": "Avg. rebuilt price",
            "exampleImageLabel": "Example engine visual",
            "historyLabel": "Engine History",
            "variantsLabel": f"Compatible {model_name} variants",
            "specsTitle": "Technical Specifications",
            "fuelLabel": "Fuel type",
            "sizeLabel": "Engine size",
            "powerLabel": "Power output",
            "yearsLabel": "Years fitted",
            "failuresTitle": "Common Failures",
            "supplyLabel": "Supply only",
        },
    )
    for group in engine_codes.get("groups", []):
        for engine in group.get("engines", []):
            engine.setdefault("image", engine_placeholder_image(engine.get("fuel", "")))

    for family in variant.get("engineGuide", {}).get("families", []):
        for entry in family.get("entries", []):
            entry.setdefault("image", engine_placeholder_image(entry.get("fuel", "")))

    engine_types = data["sections"]["engineTypes"]
    engine_types.setdefault("headingLines", split_display_heading(engine_types.get("h2", "")))
    engine_types.setdefault(
        "ui",
        {
            "priceLabel": "Typical price range",
            "frontActionLabel": "What is it?",
            "backActionLabel": "Flip back",
        },
    )
    engine_types.setdefault(
        "closingCard",
        {
            "label": "Engine Replacement Help",
            "title": f"Compare {model_name} engine prices with vetted UK suppliers",
            "buttonText": f"Compare {model_name} Prices",
        },
    )

    engine_sizes = data["sections"]["engineSizes"]
    engine_sizes.setdefault("headingLines", split_display_heading(engine_sizes.get("h2", "")))
    engine_sizes.setdefault(
        "ui",
        {
            "swapLabel": "Swap panel",
            "engineCodesLabel": "Engine Code(s)",
            "compatibleModelsLabel": "Compatible Models (UK)",
            "productionYearsLabel": "Production Years",
            "warningLabel": "Common Failure Points",
            "warningTitle": "Watch for these known weak points",
            "helperLabel": "Engine Size Advice",
            "helperTitle": "Need help matching the exact engine size?",
            "helperButtonText": "Find My Engine",
        },
    )

    fuel_types = data["sections"]["fuelTypes"]
    fuel_types.setdefault("headingLines", split_display_heading(fuel_types.get("h2", "")))
    fuel_types.setdefault(
        "ui",
        {
            "swapLabel": "Swap panel",
            "familiesLabel": "Common Engine Families",
            "foundInLabel": "Found In",
            "knownForLabel": "Known For",
            "modelsLabel": "Typical Models (UK)",
            "notesLabel": "Important Notes",
            "closingButtonText": "Find my engine",
            "emptyStateTitle": "Fuel type guidance",
            "emptyStateDescription": "Detailed fuel-type content is being standardised across all brand pages. You can still use the registration form above to identify the correct engine and matching replacement options.",
        },
    )

    engine_years = data["sections"]["engineYears"]
    engine_years.setdefault("headingLines", split_display_heading(engine_years.get("h2", "")))
    engine_years.setdefault(
        "ui",
        {
            "keyChangesLabel": "Key Changes",
            "knownForLabel": "Known For",
            "mainEnginesLabel": "Main Engines",
            "popularModelsLabel": "Popular Models",
            "engineCodesLabel": "Engine Codes Covered",
            "enquiriesLabel": "Common Replacement Enquiries",
        },
    )
    engine_years.setdefault(
        "summaryCta",
        {
            "label": "Year Finder",
            "title": f"Not sure which year your {model_name} was built?",
            "buttonText": "Find My Engine",
        },
    )
    for entry in engine_years.get("years", []):
        if not entry.get("enquiries"):
            entry["enquiries"] = split_year_ticker(entry.get("ticker", ""))
        if not entry.get("badges"):
            entry["badges"] = year_badges(entry)

    faq = data["sections"]["faq"]
    faq.setdefault("headingLines", split_display_heading(faq.get("h2", "")))
    faq.setdefault("defaultOpenIndex", 0)
    faq.setdefault(
        "ui",
        {
            "questionLabelPrefix": "Question",
            "keyPointsLabel": "Key points",
            "warningTitle": "Check fitment and engine condition before ordering",
        },
    )

    trust = data["sections"]["trustCta"]
    trust.setdefault(
        "secondaryAction",
        {
            "text": "Call Our Experts",
            "href": "tel:03330000044",
        },
    )
    trust.setdefault("imageAlt", f"{model_name} vehicle")
    trust.setdefault(
        "ui",
        {
            "pointLabel": "Included",
            "stripLabel": "Trusted UK Engine Marketplace",
            "stripTitle": f"Compare {model_name} engine prices with vetted UK specialists",
            "trustBullets": [
                "100% Free",
                "No Obligation",
                "Fast & secure process",
                "UK-based support",
            ],
            "imageBadgeLabel": "Trusted supplier network",
            "imageBadgeTitle": "Warranty-backed rebuilt & used options",
            "imageBadgeText": "Every quote checked for fitment, quality and lead time.",
        },
    )

    return data


def parse_hero(lines: Sequence[str], model_name: str) -> Dict[str, Any]:
    trust_badges: List[str] = []
    trust_line = extract_label_value(lines, "TRUST BADGES")
    if trust_line:
        trust_badges = [re.sub(r"^[^\w£]+", "", item).strip() for item in split_bullets(trust_line, ["|", "•"])]

    registration = extract_label_value(lines, "REGISTRATION INPUT") or ""
    placeholder_match = re.search(r"(e\.g\.\s*[^|]+)$", registration, flags=re.IGNORECASE)
    placeholder = f"Enter Reg ({placeholder_match.group(1)})" if placeholder_match else "Enter Reg (e.g. AB12 CDE)"
    model_image_alt = extract_label_value(lines, "ALT TEXT") or ""

    hero = {
        "tag": extract_label_value(lines, "TAG PILL", "TAG") or "ENGINE MARKETPLACE",
        "h1": extract_label_value(lines, "H1") or f"{model_name} Engine Replacement - Compare Prices",
        "subheading": extract_label_value(lines, "SUBHEADING") or "",
        "trustBadges": trust_badges,
        "ctaLinkText": extract_label_value(lines, "CTA BUTTON") or f"Compare {model_name} Engine Prices",
        "supportingText": f"Get tailored {model_name} engine quotes from vetted UK specialists.",
        "ticker": extract_label_value(lines, "TICKER") or "",
        "form": {
            "heading": f"Find Your {model_name} Engine",
            "subtitle": f"Enter your registration number to compare {model_name} engine options.",
            "inputPlaceholder": placeholder,
            "buttonText": extract_label_value(lines, "CTA BUTTON") or f"Get Free {model_name} Engine Quotes",
            "note": extract_label_value(lines, "CTA NOTE") or "",
        },
    }
    if model_image_alt:
        hero["imageAlt"] = model_image_alt
    return hero


def parse_hero_with_anchor_rows(lines: Sequence[str], model_name: str) -> Dict[str, Any]:
    hero = parse_hero(lines, model_name)
    highlights = parse_price_anchor_rows(lines)
    if highlights:
        hero["highlights"] = highlights
    return hero


def parse_how_it_works(lines: Sequence[str], model_name: str) -> Dict[str, Any]:
    cards: List[Dict[str, Any]] = []
    idx = 0

    while idx < len(lines):
        line = normalize_key(lines[idx])
        card_match = re.match(r"card\s+(\d+)\s+front", line, flags=re.IGNORECASE)
        if not card_match:
            idx += 1
            continue

        number = int(card_match.group(1))
        j = idx + 1
        front_lines: List[str] = []
        while j < len(lines):
            lowered = normalize_key(lines[j])
            if re.match(r"card\s+\d+\s+flip", lowered, flags=re.IGNORECASE):
                break
            if SECTION_HEADER_RE.match(lines[j]):
                break
            if not is_blank(lines[j]):
                front_lines.append(normalize_line(lines[j]))
            j += 1

        flip_lines: List[str] = []
        if j < len(lines) and re.match(r"card\s+\d+\s+flip", normalize_key(lines[j]), flags=re.IGNORECASE):
            j += 1
            while j < len(lines):
                lowered = normalize_key(lines[j])
                if re.match(r"card\s+\d+\s+front", lowered, flags=re.IGNORECASE):
                    break
                if lowered.startswith("tag") or any(marker in lowered for marker in ("live uk engine market data", "tag: models we cover", "models we cover")):
                    break
                if not is_blank(lines[j]):
                    flip_lines.append(normalize_line(lines[j]))
                j += 1

        front_h3 = ""
        front_text = ""
        seen_front_h3 = False
        for candidate in front_lines:
            h_match = INLINE_H_RE.match(candidate)
            if h_match and h_match.group("level") == "3":
                front_h3 = normalize_line(h_match.group("value"))
                seen_front_h3 = True
                continue
            if not seen_front_h3:
                continue
            if candidate.startswith("[") and "icon" in candidate.lower():
                continue
            if candidate and not front_text:
                front_text = candidate

        back_heading = flip_lines[0] if flip_lines else ""
        back_text = flip_lines[1] if len(flip_lines) > 1 else ""
        bullets = flip_lines[2:] if len(flip_lines) > 2 else []

        cards.append(
            {
                "number": number,
                "icon": "registration" if number == 1 else "quote" if number == 2 else "shield",
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
        idx = j

    return {
        "tag": "How It Works",
        "h2": f"3 Simple Steps to Finding the Best {model_name} Replacement Engine",
        "cards": cards,
        "tagline": "",
    }


def parse_feed_row(line: str) -> Optional[Dict[str, str]]:
    if "|" not in line:
        return None
    parts = [normalize_line(part) for part in line.split("|")]
    if len(parts) != 6:
        return None
    model, year, price, issue, code, fuel = parts
    return {
        "Year": year,
        "Model": model,
        "Engine Code": code,
        "Fuel": fuel,
        "Avg. Quoted Price": price,
        "Reported Issue": issue,
    }


def parse_live_market(lines: Sequence[str], model_name: str) -> Dict[str, Any]:
    tag = extract_label_value(lines, "TAG", "TAG PILL") or "Live UK Engine Market Data"
    h2 = extract_label_value(lines, "H2") or ""
    paragraph = extract_label_value(lines, "PARAGRAPH", "INTRO", "INTRODUCTORY TEXT", "H3", "SUBHEADING") or ""
    feed_lines = extract_block_after_label(lines, "FEED TABLE", "TABLE", "LIVE FEED TABLE")
    entries = [entry for line in feed_lines if (entry := parse_feed_row(line))]
    count = len(entries)

    return {
        "tag": tag,
        "h2": h2,
        "h3": paragraph,
        "introBullets": [
            {"label": "Live market context", "text": f"See realistic rebuilt-engine quote ranges across documented {model_name} variants."},
            {"label": "Variant specific", "text": "Each row highlights the exact variant, failure trigger, engine code and fuel type behind replacement demand."},
            {"label": "Specialist pricing", "text": "These figures reflect the independent UK engine supplier and rebuilder market rather than main dealer replacement costs."},
            {"label": "Quote benchmark", "text": "Use the feed to benchmark your own enquiry before comparing live quotes for your registration."},
        ],
        "cta": {
            "heading": f"Benchmark your own {model_name} quote",
            "text": f"Use these recent enquiry ranges to understand the market, then compare tailored quotes for your exact {model_name} engine code.",
            "buttonText": f"Compare My {model_name} Engine",
            "note": "Prices vary by engine code, variant, damage severity, mileage, supplier stock and whether you need supply-only or supply and fit.",
        },
        "badges": [
            f"{count} recent enquiries visible",
            "Typical rebuilt market ranges",
            "Engine-code matched rows",
            "UK specialist network",
        ],
        "feed": {
            "isDynamic": False,
            "rowsCount": count,
            "columns": [
                "Year",
                "Model",
                "Engine Code",
                "Fuel",
                "Avg. Quoted Price",
                "Reported Issue",
            ],
            "timestampLabel": "Last Updated",
            "refreshLabel": "Refresh feed",
            "density": "premium",
            "visibleRows": count,
            "entries": entries,
        },
    }


def parse_variant_spec_line(line: str) -> Dict[str, Any]:
    text = normalize_line(line)
    codes: List[str] = []
    fuel = ""
    power = ""
    years = ""
    price = ""
    subtitle = text

    if "Rebuilt:" in text:
        left, right = text.split("Rebuilt:", 1)
        text = left.strip()
        price = normalize_price_text(right)

    parts = [piece.strip() for piece in text.split("•")]
    if parts:
        leading = parts[0]
        if " " in leading:
            maybe_codes, maybe_rest = leading.split(" ", 1)
            if "/" in maybe_codes or re.search(r"[A-Z]\d", maybe_codes):
                codes = [item.strip() for item in maybe_codes.split("/") if item.strip()]
                subtitle = f"{leading} {' · '.join(parts[1:])}".strip()
        if not codes:
            for candidate in re.split(r"\s*[\/,]\s*", leading):
                candidate = candidate.strip()
                if re.search(r"[A-Z]\d", candidate):
                    codes.append(candidate)

    for piece in parts:
        if re.search(r"\b(Diesel|Petrol|Hybrid|MHEV|PHEV)\b", piece, flags=re.IGNORECASE):
            fuel_match = re.search(r"\b(Diesel|Petrol|Hybrid|MHEV|PHEV)\b", piece, flags=re.IGNORECASE)
            if fuel_match:
                fuel = fuel_match.group(1).title()
        if not power:
            power_match = NORMALIZED_POWER_RE.search(piece)
            if power_match:
                power = power_match.group("power").replace(" ", "")
        if not years:
            years_match = NORMALIZED_YEARS_RE.search(piece)
            if years_match:
                years = years_match.group("years")

    subtitle = subtitle.replace(" • ", " · ").replace("•", "·").rstrip(" ·").strip()
    if price and not price.startswith("£"):
        found = NORMALIZED_PRICE_RE.search(price)
        price = found.group(0) if found else price

    return {
        "subtitle": subtitle,
        "engineCodes": codes,
        "fuel": fuel,
        "power": power,
        "years": years,
        "priceRange": price,
    }


def parse_variant_coverage(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "Models We Cover"
    h2 = extract_label_value(lines, "H2") or ""
    subheading = extract_label_value(lines, "Subheading") or ""
    cards: List[Dict[str, Any]] = []
    groups: List[Dict[str, Any]] = []
    directory_h3 = ""
    directory_intro = ""
    directory_groups: List[Dict[str, Any]] = []
    closing = ""
    current_group_title = ""
    current_group_slugs: List[str] = []

    idx = 0
    while idx < len(lines):
        line = strip_emphasis_preserve_brackets(lines[idx])
        row_match = re.match(r"^Row\s+\d+\s*[-:]\s*(.+)$", line, flags=re.IGNORECASE)
        if row_match:
            if current_group_title and current_group_slugs:
                groups.append({"title": current_group_title, "cardSlugs": current_group_slugs[:]})
            current_group_title = row_match.group(1).strip()
            current_group_slugs = []
            idx += 1
            continue

        h3_match = INLINE_H_RE.match(line)
        if h3_match and h3_match.group("level") == "3":
            title = normalize_line(h3_match.group("value"))
            if "all " in title.lower() and "variant" in title.lower():
                if current_group_title and current_group_slugs:
                    groups.append({"title": current_group_title, "cardSlugs": current_group_slugs[:]})
                    current_group_title = ""
                    current_group_slugs = []
                directory_h3 = title
                idx += 1
                continue

            image = ""
            lookahead = idx + 1
            while lookahead < len(lines):
                probe = normalize_line(lines[lookahead])
                if not probe:
                    lookahead += 1
                    continue
                if probe.startswith("[") and probe.endswith("]"):
                    lookahead += 1
                    continue

                image_match = LABEL_LINE_RE.match(probe)
                if image_match and normalize_key(image_match.group("label")) == "image":
                    image_candidate = normalize_line(image_match.group("value"))
                    if looks_like_image_path(image_candidate):
                        image = image_candidate
                    lookahead += 1
                    continue

                break

            spec_line = normalize_line(lines[lookahead]) if lookahead < len(lines) else ""
            cta_line = normalize_line(lines[lookahead + 1]) if lookahead + 1 < len(lines) else ""
            parsed = parse_variant_spec_line(spec_line)
            card_slug = slugify(title.replace(" Engine Replacement", "").replace("BMW ", "").strip()) + "-engine"
            cards.append(
                {
                    "h3": title,
                    "slug": card_slug,
                    "subtitle": parsed["subtitle"],
                    "priceRange": parsed["priceRange"],
                    "cta": cta_line.lstrip("-> ").strip(),
                    "engineCodes": parsed["engineCodes"],
                    "fuel": parsed["fuel"],
                    "power": parsed["power"],
                    "years": parsed["years"],
                    "image": image,
                }
            )
            if current_group_title:
                current_group_slugs.append(card_slug)
            idx = lookahead + 2
            continue

        if normalize_key(line).startswith("introductory text"):
            directory_intro = line.split(":", 1)[1].strip() if ":" in line else ""
        elif normalize_key(line) in {"diesel variants", "petrol variants", "performance variants", "hybrid variants"}:
            title = line
            items_line = normalize_line(lines[idx + 1]) if idx + 1 < len(lines) else ""
            items = [item.strip() for item in items_line.split("•") if item.strip()]
            directory_groups.append({"title": title, "items": items})
            idx += 2
            continue
        elif normalize_key(line).startswith("closing line"):
            closing = line.split(":", 1)[1].strip() if ":" in line else ""
        idx += 1

    if current_group_title and current_group_slugs:
        groups.append({"title": current_group_title, "cardSlugs": current_group_slugs[:]})

    return {
        "tag": tag,
        "h2": h2,
        "subheading": subheading,
        "groups": groups,
        "cards": cards,
        "directory": {
            "h3": directory_h3,
            "intro": directory_intro,
            "groups": directory_groups,
        },
        "closing": closing,
    }


def parse_variant_spec_line_refined(line: str) -> Dict[str, Any]:
    text = normalize_line(line)
    codes: List[str] = []
    fuel = ""
    power = ""
    years = ""
    price = ""
    subtitle = text

    if "Rebuilt:" in text:
        left, right = text.split("Rebuilt:", 1)
        text = left.strip()
        price = normalize_price_text(right)

    parts = split_inline_items(text)
    if parts:
        leading = parts[0]
        if " " in leading:
            maybe_codes, _ = leading.split(" ", 1)
            if "/" in maybe_codes or re.search(r"[A-Z]\d", maybe_codes):
                codes = [item.strip() for item in maybe_codes.split("/") if item.strip()]
                subtitle = " · ".join([leading, *parts[1:]]).strip()

        if not codes:
            for candidate in re.split(r"\s*[\/,]\s*", leading):
                candidate = candidate.strip()
                if re.search(r"[A-Z]\d", candidate):
                    codes.append(candidate)

    for piece in parts:
        if not fuel:
            fuel_match = re.search(r"\b(Diesel|Petrol|Hybrid|MHEV|PHEV)\b", piece, flags=re.IGNORECASE)
            if fuel_match:
                fuel = fuel_match.group(1).title()
        if not power:
            power_match = NORMALIZED_POWER_RE.search(piece)
            if power_match:
                power = power_match.group("power").replace(" ", "")
        if not years:
            years_match = NORMALIZED_YEARS_RE.search(piece)
            if years_match:
                years = years_match.group("years")

    subtitle = subtitle.replace(" • ", " · ").replace("â€¢", "·").rstrip(" ·").strip()
    if price:
        found = NORMALIZED_PRICE_RE.search(price)
        if found:
            price = found.group(0)

    return {
        "subtitle": subtitle,
        "engineCodes": codes,
        "fuel": fuel,
        "power": power,
        "years": years,
        "priceRange": price,
    }


def parse_variant_coverage_refined(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "Models We Cover"
    h2 = extract_label_value(lines, "H2") or ""
    subheading = extract_label_value(lines, "Subheading") or ""
    cards: List[Dict[str, Any]] = []
    groups: List[Dict[str, Any]] = []
    directory_h3 = ""
    directory_intro = ""
    directory_groups: List[Dict[str, Any]] = []
    closing = ""
    current_group_title = ""
    current_group_slugs: List[str] = []
    variant_directory_titles = {
        "diesel variants",
        "petrol variants",
        "performance variants",
        "hybrid variants",
        "electrified variants",
    }

    idx = 0
    while idx < len(lines):
        line = normalize_line(lines[idx])
        line_key = normalize_key(lines[idx])

        row_match = re.match(r"^Row\s+\d+\s*[-:]\s*(.+)$", line, flags=re.IGNORECASE)
        if row_match:
            if current_group_title and current_group_slugs:
                groups.append({"title": current_group_title, "cardSlugs": current_group_slugs[:]})
            current_group_title = row_match.group(1).strip()
            current_group_slugs = []
            idx += 1
            continue

        h3_match = INLINE_H_RE.match(line)
        if h3_match and h3_match.group("level") == "3":
            title = normalize_line(h3_match.group("value"))
            if "all " in title.lower() and "variant" in title.lower():
                if current_group_title and current_group_slugs:
                    groups.append({"title": current_group_title, "cardSlugs": current_group_slugs[:]})
                    current_group_title = ""
                    current_group_slugs = []
                directory_h3 = title
                idx += 1
                continue

            image = ""
            lookahead = idx + 1
            while lookahead < len(lines):
                probe = normalize_line(lines[lookahead])
                if not probe:
                    lookahead += 1
                    continue
                if probe.startswith("[") and probe.endswith("]"):
                    lookahead += 1
                    continue

                image_match = LABEL_LINE_RE.match(probe)
                if image_match and normalize_key(image_match.group("label")) == "image":
                    image_candidate = normalize_line(image_match.group("value"))
                    if looks_like_image_path(image_candidate):
                        image = image_candidate
                    lookahead += 1
                    continue

                break

            spec_idx = lookahead
            while spec_idx < len(lines) and not normalize_line(lines[spec_idx]):
                spec_idx += 1
            cta_idx = spec_idx + 1
            while cta_idx < len(lines) and not normalize_line(lines[cta_idx]):
                cta_idx += 1

            spec_line = normalize_line(lines[spec_idx]) if spec_idx < len(lines) else ""
            cta_line = normalize_line(lines[cta_idx]) if cta_idx < len(lines) else ""
            parsed = parse_variant_spec_line_refined(spec_line)
            card_slug = slugify(title.replace(" Engine Replacement", "").replace("BMW ", "").strip()) + "-engine"
            cards.append(
                {
                    "h3": title,
                    "slug": card_slug,
                    "subtitle": parsed["subtitle"],
                    "priceRange": parsed["priceRange"],
                    "cta": strip_arrow_text(cta_line) if cta_line else "",
                    "engineCodes": parsed["engineCodes"],
                    "fuel": parsed["fuel"],
                    "power": parsed["power"],
                    "years": parsed["years"],
                    "image": image,
                }
            )
            if current_group_title:
                current_group_slugs.append(card_slug)
            idx = max(cta_idx, spec_idx) + 1
            continue

        if line_key.startswith("introductory text"):
            directory_intro = line.split(":", 1)[1].strip() if ":" in line else ""
            idx += 1
            continue

        if line_key in variant_directory_titles:
            title = line
            items: List[str] = []
            idx += 1
            while idx < len(lines):
                probe = normalize_line(lines[idx])
                probe_key = normalize_key(lines[idx])
                if not probe:
                    idx += 1
                    continue
                if (
                    probe_key in variant_directory_titles
                    or probe_key.startswith("closing line")
                    or probe_key.startswith("introductory text")
                    or re.match(r"^row\s+\d+\s*[-:]\s*(.+)$", probe, flags=re.IGNORECASE)
                    or INLINE_H_RE.match(probe)
                ):
                    break
                items.extend(split_inline_items(probe))
                idx += 1
            directory_groups.append({"title": title, "items": items})
            continue

        if line_key.startswith("closing line"):
            closing = line.split(":", 1)[1].strip() if ":" in line else ""

        idx += 1

    if current_group_title and current_group_slugs:
        groups.append({"title": current_group_title, "cardSlugs": current_group_slugs[:]})

    return {
        "tag": tag,
        "h2": h2,
        "subheading": subheading,
        "groups": groups,
        "cards": cards,
        "directory": {
            "h3": directory_h3,
            "intro": directory_intro,
            "groups": directory_groups,
        },
        "closing": closing,
    }


def parse_engine_code_families(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "Engine Codes"
    h2 = extract_label_value(lines, "H2") or ""
    h3 = extract_label_value(lines, "H3 (subheading)", "H3") or ""
    closing = extract_label_value(lines, "Closing line") or ""
    families: List[Dict[str, Any]] = []
    current_top_family = ""
    idx = 0
    engine_title_re = re.compile(
        r"^(?:\[Engine Code\]\s*[-–—]\s*)?"
        r"\[?(?P<code>[A-Z0-9][A-Z0-9.]*(?:(?:\s*[/+&-]\s*|\s+)[A-Z0-9][A-Z0-9.]*)*)\]?\s*(?:[-–—]\s*)?"
        r"(?P<title>(?:\d+(?:\.\d+)?\s*L(?:itre)?|\d+(?:\.\d+)?\s*kWh|Hybrid|Electric).+)$",
        re.IGNORECASE,
    )

    while idx < len(lines):
        line = strip_markdown(lines[idx])

        if line.startswith("### "):
            current_top_family = line.replace("### ", "").strip()
            idx += 1
            continue

        h4_match = re.match(r"^H4:\s*(.+)$", line, flags=re.IGNORECASE)
        if not h4_match:
            idx += 1
            continue

        family_name = h4_match.group(1).strip()
        entries: List[Dict[str, Any]] = []
        idx += 1

        while idx < len(lines):
            current = strip_emphasis_preserve_brackets(lines[idx])
            if current.startswith("### ") or re.match(r"^H4:\s*(.+)$", current, flags=re.IGNORECASE):
                break
            if not current:
                idx += 1
                continue

            title_match = engine_title_re.match(current)
            if not title_match:
                idx += 1
                continue

            code = title_match.group("code").strip()
            title = title_match.group("title").strip()
            detail_lines: List[str] = []
            idx += 1
            while idx < len(lines):
                peek = strip_emphasis_preserve_brackets(lines[idx])
                if peek.startswith("### ") or re.match(r"^H4:\s*(.+)$", peek, flags=re.IGNORECASE):
                    break
                if engine_title_re.match(peek):
                    break
                detail_lines.append(peek)
                idx += 1

            history = ""
            fuel = ""
            size = ""
            power = ""
            years = ""
            compatible_variants: List[str] = []
            common_failures: List[str] = []
            avg_price = ""
            cta = ""
            mode = None

            for detail in detail_lines:
                if not detail:
                    continue
                lowered = normalize_key(detail)
                if lowered.startswith("history"):
                    history = detail.split(":", 1)[1].strip() if ":" in detail else history
                    mode = None
                elif lowered.startswith("technical specifications"):
                    mode = "specs"
                elif lowered.startswith("compatible "):
                    inline_variants = detail.split(":", 1)[1].strip() if ":" in detail else ""
                    if inline_variants:
                        compatible_variants.extend(
                            [item.strip() for item in split_inline_items(inline_variants) if item.strip()]
                        )
                    mode = "variants"
                elif lowered.startswith("common failures"):
                    inline_failures = detail.split(":", 1)[1].strip() if ":" in detail else ""
                    if inline_failures:
                        common_failures.extend(
                            [item.strip() for item in split_inline_items(inline_failures) if item.strip()]
                        )
                    mode = "failures"
                elif lowered.startswith("avg. rebuilt price"):
                    raw = detail.split(":", 1)[1].strip() if ":" in detail else detail
                    price_match = NORMALIZED_PRICE_WITH_NOTE_RE.search(normalize_price_text(raw))
                    avg_price = price_match.group("price") if price_match else raw
                    mode = None
                elif is_arrow_line(detail):
                    cta = strip_arrow_text(detail)
                    mode = None
                elif mode == "specs":
                    stripped = strip_bullet_text(detail)
                    if ":" in stripped:
                        key, value = [part.strip() for part in stripped.split(":", 1)]
                        lowered_key = key.lower()
                        if lowered_key == "fuel type":
                            fuel = value
                        elif lowered_key == "engine size":
                            size = value
                        elif lowered_key == "power output":
                            power = value
                        elif lowered_key == "years fitted":
                            years = value
                elif mode == "variants" and detail:
                    compatible_variants.extend(
                        [item.strip() for item in split_inline_items(detail) if item.strip()]
                    )
                elif mode == "failures" and detail:
                    failure_text = strip_bullet_text(detail)
                    if failure_text:
                        common_failures.append(failure_text)

            entries.append(
                {
                    "code": code,
                    "title": title,
                    "history": history,
                    "fuel": fuel,
                    "size": size,
                    "power": power,
                    "years": years,
                    "compatibleVariants": compatible_variants,
                    "commonFailures": common_failures,
                    "avgRebuiltPrice": avg_price,
                    "cta": cta,
                }
            )

        label = current_top_family or family_name
        if entries:
            existing = next((family for family in families if family["name"] == label), None)
            if existing:
                existing["entries"].extend(entries)
            else:
                families.append({"name": label, "entries": entries})

    return {
        "tag": tag,
        "h2": h2,
        "h3": h3,
        "families": families,
        "closing": closing,
    }


def build_summary_engine_codes(guide: Dict[str, Any], model_name: str) -> Dict[str, Any]:
    grouped: Dict[str, Dict[str, Any]] = {}

    for family in guide["families"]:
        family_name = family["name"]
        if "diesel" in family_name.lower():
            bucket = "Diesel Engines"
            era_default = f"Extracted from detailed diesel engine families across {model_name} variants."
            failure_default = "Main replacement triggers are timing chain wear, EGR / cooling faults and turbo-control issues."
        elif "hybrid" in family_name.lower() or "electrified" in family_name.lower():
            bucket = "Hybrid / Electrified Engines"
            era_default = f"Extracted from electrified powertrains and hybrid engine families used in {model_name} variants."
            failure_default = "Main replacement demand comes from cooling, battery-support and high-voltage control faults."
        else:
            bucket = "Petrol Engines"
            era_default = f"Extracted from detailed petrol and performance engine families across {model_name} variants."
            failure_default = "Main replacement demand comes from timing-chain, cooling-system and performance thermal-management faults."

        target = grouped.setdefault(
            bucket,
            {
                "name": bucket,
                "era": era_default,
                "failureNote": failure_default,
                "engines": [],
            },
        )

        for entry in family["entries"]:
            target["engines"].append(
                {
                    "code": entry["code"],
                    "fuel": entry["fuel"],
                    "size": entry["size"].replace(" Litre", "L"),
                    "power": entry["power"],
                    "compatibleModels": ", ".join(entry["compatibleVariants"]),
                    "avgRebuiltPrice": entry["avgRebuiltPrice"],
                    "cta": entry["cta"],
                }
            )

    filters = list(grouped.keys())

    return {
        "tag": guide["tag"],
        "h2": guide["h2"],
        "h3": guide["h3"],
        "closingLine": guide["closing"],
        "filters": filters,
        "groups": list(grouped.values()),
    }


def parse_common_problems(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "Common Problems"
    h2 = extract_label_value(lines, "H2") or ""
    h3 = extract_label_value(lines, "H3") or ""
    problems: List[Dict[str, Any]] = []
    final_cta = {
        "h4": "",
        "paragraph": "",
        "buttonText": "",
        "disclaimer": extract_label_value(lines, "Disclaimer") or "",
    }
    idx = 0

    while idx < len(lines):
        line = normalize_line(lines[idx])
        lowered = normalize_key(line)
        if not lowered.startswith("h4:"):
            idx += 1
            continue

        heading = line.split(":", 1)[1].strip() if ":" in line else line
        if not heading:
            look_ahead = idx + 1
            while look_ahead < len(lines):
                candidate = normalize_line(lines[look_ahead])
                if not candidate:
                    look_ahead += 1
                    continue
                if normalize_key(candidate).startswith(("affected models", "typical failure mileage", "root cause", "repair options", "our recommendation", "cta", "paragraph", "disclaimer")):
                    break
                heading = candidate
                idx = look_ahead
                break

        if heading.lower().startswith("don't let engine failure"):
            final_cta["h4"] = heading
            idx += 1
            disclaimer_lines: List[str] = []
            while idx < len(lines):
                current = normalize_line(lines[idx])
                lowered_current = normalize_key(current)
                if lowered_current.startswith("h4:"):
                    idx -= 1
                    break
                if lowered_current.startswith("paragraph"):
                    final_cta["paragraph"] = current.split(":", 1)[1].strip() if ":" in current else ""
                elif current and not final_cta["paragraph"] and not lowered_current.startswith(("cta button", "disclaimer")):
                    final_cta["paragraph"] = current
                elif lowered_current.startswith("cta button"):
                    value = current.split(":", 1)[1].strip() if ":" in current else ""
                    if not value:
                        look_ahead = idx + 1
                        while look_ahead < len(lines):
                            candidate = normalize_line(lines[look_ahead])
                            if not candidate:
                                look_ahead += 1
                                continue
                            if normalize_key(candidate).startswith(("disclaimer", "h4:")):
                                break
                            value = candidate
                            idx = look_ahead
                            break
                    final_cta["buttonText"] = strip_arrow_text(value)
                elif lowered_current.startswith("disclaimer"):
                    inline = current.split(":", 1)[1].strip() if ":" in current else ""
                    if inline:
                        disclaimer_lines.append(inline)
                    while idx + 1 < len(lines):
                        peek = normalize_line(lines[idx + 1])
                        peek_lower = normalize_key(peek)
                        if not peek:
                            idx += 1
                            if disclaimer_lines:
                                break
                            continue
                        if peek_lower.startswith(("h4:", "paragraph", "cta button", "affected models", "typical failure mileage", "root cause")):
                            break
                        disclaimer_lines.append(peek)
                        idx += 1
                    final_cta["disclaimer"] = " ".join(disclaimer_lines).strip()
                idx += 1
            break

        problem = {
            "group": heading.split(" - ", 1)[0].strip(),
            "h4": heading,
            "affectedModels": "",
            "typicalFailureMileage": "",
            "rootCause": "",
            "repairOptions": [],
            "recommendation": "",
            "cta": "",
        }
        idx += 1

        while idx < len(lines):
            current = normalize_line(lines[idx])
            lowered_current = normalize_key(current)
            if lowered_current.startswith("h4:"):
                idx -= 1
                break
            if lowered_current.startswith("affected models"):
                problem["affectedModels"] = current.split(":", 1)[1].strip() if ":" in current else ""
            elif lowered_current.startswith("typical failure mileage"):
                problem["typicalFailureMileage"] = current.split(":", 1)[1].strip() if ":" in current else ""
            elif lowered_current.startswith("root cause"):
                problem["rootCause"] = current.split(":", 1)[1].strip() if ":" in current else ""
            elif current.startswith("|"):
                cells = [normalize_line(cell) for cell in current.strip("|").split("|")]
                headerish = (
                    len(cells) >= 5
                    and (
                        normalize_key(cells[0]) == "repair tier"
                        or all(not cell or set(cell) <= {"-"} for cell in cells)
                    )
                )
                if len(cells) >= 5 and not headerish:
                    problem["repairOptions"].append(
                        {
                            "tier": cells[0],
                            "dealerPrice": cells[1],
                            "specialistPrice": cells[2],
                            "whatItInvolves": cells[3],
                            "longevity": cells[4],
                        }
                    )
            elif lowered_current.startswith("our recommendation"):
                value = current.split(":", 1)[1].strip() if ":" in current else ""
                if not value:
                    recommendation_lines: List[str] = []
                    look_ahead = idx + 1
                    while look_ahead < len(lines):
                        candidate = normalize_line(lines[look_ahead])
                        candidate_lower = normalize_key(candidate)
                        if not candidate:
                            if recommendation_lines:
                                break
                            look_ahead += 1
                            continue
                        if candidate_lower.startswith(("cta", "h4:", "affected models", "typical failure mileage", "root cause")) or candidate.startswith("|") or is_arrow_line(candidate):
                            break
                        recommendation_lines.append(candidate)
                        look_ahead += 1
                    if recommendation_lines:
                        value = " ".join(recommendation_lines).strip()
                        idx = look_ahead - 1
                problem["recommendation"] = value
            elif lowered_current.startswith("cta"):
                value = current.split(":", 1)[1].strip() if ":" in current else ""
                problem["cta"] = strip_arrow_text(value)
            elif is_arrow_line(current):
                problem["cta"] = strip_arrow_text(current)
            idx += 1

        problems.append(problem)
        idx += 1

    return {
        "tag": tag,
        "h2": h2,
        "h3": h3,
        "problems": problems,
        "finalCta": final_cta,
    }


def parse_engine_types(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "Replacement Engine Options"
    h2 = extract_label_value(lines, "H2", "Section H2") or ""
    intro = extract_label_value(lines, "Short introduction", "Short introduction (1 sentence)", "Intro", "Paragraph", "Subheading") or ""
    closing = extract_label_value(lines, "Closing line", "Closing") or ""
    types: List[Dict[str, Any]] = []

    idx = 0
    while idx < len(lines):
        line = normalize_line(lines[idx])
        if not normalize_key(line).startswith("option "):
            idx += 1
            continue
        title = line.split(":", 1)[1].strip() if ":" in line else line
        description = ""
        front_description = ""
        front_disclaimer = ""
        back_description = ""
        back_bullets: List[str] = []
        price_range = ""
        cta = ""
        mode = "front"
        j = idx + 1
        while j < len(lines):
            raw_current = lines[j]
            current = normalize_line(raw_current)
            lowered = normalize_key(current)
            if normalize_key(current).startswith("option "):
                break
            if lowered.startswith("front"):
                mode = "front"
                j += 1
                continue
            if lowered.startswith("flip"):
                mode = "flip"
                j += 1
                continue
            if lowered.startswith("description"):
                description = current.split(":", 1)[1].strip() if ":" in current else description
                front_description = description
            elif lowered.startswith("price range"):
                price_range = current.split(":", 1)[1].strip() if ":" in current else price_range
                price_range = price_range.replace("Average price range:", "").replace("Typical added cost:", "").strip()
            elif lowered.startswith("disclaimer"):
                front_disclaimer = current.split(":", 1)[1].strip() if ":" in current else front_disclaimer
            elif lowered.startswith("cta"):
                cta = current.split(":", 1)[1].strip() if ":" in current else cta
                cta = strip_arrow_text(cta)
                cta = re.sub(r"\s*(?:->|→|â†’)\s*$", "", cta).strip()
            elif mode == "flip" and current:
                if is_bullet_line(raw_current):
                    bullet = strip_bullet_text(raw_current)
                    if bullet:
                        back_bullets.append(bullet)
                elif not looks_like_label(current):
                    if back_description:
                        back_description = f"{back_description} {current}".strip()
                    else:
                        back_description = current
            j += 1

        types.append(
            {
                "title": title,
                "description": description,
                "frontDescription": front_description or description,
                "frontDisclaimer": front_disclaimer,
                "backDescription": back_description,
                "backBullets": back_bullets,
                "priceRange": price_range,
                "cta": cta,
            }
        )
        idx = j

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "types": types,
        "closing": closing,
    }


def parse_engine_sizes(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "Engine Sizes"
    h2 = extract_label_value(lines, "H2", "Section H2") or ""
    intro = extract_label_value(lines, "Intro", "Paragraph", "Subheading") or ""
    closing = extract_label_value(lines, "Closing line", "Closing") or ""
    groups: List[Dict[str, Any]] = []
    current_group: Optional[Dict[str, Any]] = None

    idx = 0
    while idx < len(lines):
        line = normalize_line(lines[idx])
        if line.startswith("### "):
            current_group = {"title": line.replace("### ", "").strip(), "items": []}
            groups.append(current_group)
            idx += 1
            continue

        if line.startswith("#### ") and current_group is not None:
            title = line.replace("#### ", "").strip()
            description_parts: List[str] = []
            engine_codes: List[str] = []
            compatible_models: List[str] = []
            production_years = ""
            common_failures: List[str] = []
            cta = ""

            idx += 1
            while idx < len(lines):
                current = normalize_line(lines[idx])
                if SECTION_HEADER_RE.match(lines[idx]) or re.match(r"^\d+\s*[:(]", current):
                    idx -= 1
                    break
                if current.startswith("#### ") or current.startswith("### "):
                    idx -= 1
                    break
                lowered = normalize_key(current)
                if lowered in {
                    "tag",
                    "tag engine years",
                    "tag faq",
                    "tag why choose us",
                } or lowered.startswith("tag: engine years") or lowered.startswith("tag: faq") or lowered.startswith("tag: bmw 2 series engines fuel type") or lowered.startswith("tag: fuel type"):
                    idx -= 1
                    break
                if lowered.startswith("engine code(s)") or lowered.startswith("engine codes"):
                    engine_codes = [item.strip() for item in re.split(r"[,/]", current.split(":", 1)[1]) if item.strip()]
                elif lowered.startswith("compatible models"):
                    raw_models = current.split(":", 1)[1].strip() if ":" in current else ""
                    year_match = re.search(r"\(([^)]+)\)$", raw_models)
                    if year_match:
                        production_years = year_match.group(1)
                        raw_models = raw_models[: year_match.start()].strip()
                    compatible_models = [item.strip() for item in raw_models.split(",") if item.strip()]
                elif lowered.startswith("power output"):
                    pass
                elif lowered.startswith("common failure points"):
                    value = current.split(":", 1)[1].strip() if ":" in current else ""
                    common_failures = [item.strip() for item in re.split(r"\band\b|, ", value) if item.strip()]
                elif is_arrow_line(current):
                    cta = strip_arrow_text(current)
                elif current and not looks_like_label(current) and not current.startswith("-"):
                    description_parts.append(current)
                idx += 1

            current_group["items"].append(
                {
                    "title": title,
                    "description": " ".join(description_parts).strip(),
                    "engineCodes": engine_codes,
                    "compatibleModels": compatible_models,
                    "productionYears": production_years,
                    "commonFailurePoints": common_failures,
                    "cta": cta,
                }
            )
        idx += 1

    groups = [group for group in groups if group.get("items")]

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "groups": groups,
        "closing": closing,
    }


def parse_fuel_types(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "Fuel Type"
    h2 = extract_label_value(lines, "H2", "Section H2") or ""
    intro = extract_label_value(lines, "Intro", "Paragraph", "Subheading") or ""
    closing = extract_label_value(lines, "Closing line", "Closing") or ""
    items: List[Dict[str, Any]] = []
    idx = 0

    while idx < len(lines):
        line = normalize_line(lines[idx])
        if not line.startswith("### "):
            idx += 1
            continue

        title = line.replace("### ", "").strip()
        descriptor = ""
        families: List[str] = []
        found_in: List[str] = []
        known_for: List[str] = []
        typical_models: List[str] = []
        important_notes: List[str] = []
        cta = ""
        description = ""
        mode = None
        idx += 1

        while idx < len(lines):
            current = normalize_line(lines[idx])
            lowered = normalize_key(current)
            if current.startswith("### "):
                idx -= 1
                break
            if lowered.startswith("short descriptor"):
                descriptor = current.split(":", 1)[1].strip() if ":" in current else ""
                description = descriptor
            elif (lowered.startswith("common ") and "families" in lowered) or "engine codes" in lowered:
                mode = "families"
            elif lowered.startswith("found in"):
                mode = "foundIn"
            elif lowered.startswith("known for"):
                mode = "knownFor"
            elif lowered.startswith("typical ") and "models" in lowered:
                mode = "typicalModels"
            elif lowered.startswith("important notes") or lowered.startswith("how bmw mild hybrid"):
                mode = "importantNotes"
            elif is_arrow_line(current):
                cta = strip_arrow_text(current)
                mode = None
            elif is_bullet_line(lines[idx]):
                item = strip_bullet_text(lines[idx])
                if mode == "families":
                    families.append(item)
                elif mode == "foundIn":
                    found_in.append(item)
                elif mode == "knownFor":
                    known_for.append(item)
                elif mode == "typicalModels":
                    typical_models.append(item)
                elif mode == "importantNotes":
                    important_notes.append(item)
            idx += 1

        item = {
            "title": title,
            "description": description,
            "descriptor": descriptor,
            "families": families,
            "foundIn": found_in,
            "knownFor": known_for,
            "typicalModels": typical_models,
            "importantNotes": important_notes,
            "cta": cta,
        }
        if any(
            [
                item["description"],
                item["descriptor"],
                item["cta"],
                item["families"],
                item["foundIn"],
                item["knownFor"],
                item["typicalModels"],
                item["importantNotes"],
            ]
        ):
            items.append(item)
        idx += 1

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "items": items,
        "closing": closing,
    }


def parse_engine_years(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "Engine Years"
    h2 = extract_label_value(lines, "H2", "Section H2") or ""
    intro = extract_label_value(lines, "Intro (1 line)", "Intro", "Paragraph", "Subheading") or ""
    closing = extract_label_value(lines, "Closing line", "Closing") or ""
    years: List[Dict[str, Any]] = []
    idx = 0

    def split_year_heading(text: str) -> Tuple[str, str, List[Dict[str, str]]]:
        cleaned = normalize_line(text).replace("### ", "", 1).strip()
        parts = [part.strip() for part in cleaned.split("|") if part.strip()]
        left = parts[0] if parts else cleaned
        badge_labels = parts[1:]
        year = left
        preview = ""
        match = re.match(r"^(?P<year>\d{4}(?:\s*[-–—]\s*\d{4})?)\s*[-–—]\s*(?P<preview>.+)$", left)
        if match:
            year = match.group("year").strip()
            preview = match.group("preview").strip()
        badges = [
            {"label": label, "tone": "accent" if badge_index == 0 else "muted"}
            for badge_index, label in enumerate(badge_labels)
        ]
        return year, preview, badges

    while idx < len(lines):
        line = normalize_line(lines[idx])
        if not line.startswith("### "):
            idx += 1
            continue

        year, preview, badges = split_year_heading(line)

        entry = {
            "year": year,
            "preview": preview,
            "description": "",
            "keyChanges": [],
            "mainEngines": [],
            "popularModels": [],
            "knownFor": [],
            "engineCodesCovered": [],
            "cta": "",
            "badges": badges,
        }
        mode = None
        idx += 1

        while idx < len(lines):
            current = normalize_line(lines[idx])
            lowered = normalize_key(current)
            if current.startswith("### ") or lowered.startswith("closing line"):
                idx -= 1
                break
            if lowered.startswith("short intro"):
                entry["description"] = current.split(":", 1)[1].strip() if ":" in current else ""
                mode = None
            elif lowered == "key changes":
                mode = "keyChanges"
            elif lowered == "main engines":
                mode = "mainEngines"
            elif lowered.startswith("popular variants") or lowered.startswith("popular models"):
                mode = "popularModels"
            elif lowered == "known for":
                mode = "knownFor"
            elif "engine codes covered" in lowered:
                value = current.split(":", 1)[1].strip() if ":" in current else ""
                entry["engineCodesCovered"] = [item.strip() for item in value.split(",") if item.strip()]
                mode = None
            elif "common replacement enquiries" in lowered:
                value = current.split(":", 1)[1].strip() if ":" in current else ""
                entry["ticker"] = value
                mode = None
            elif is_arrow_line(current):
                entry["cta"] = strip_arrow_text(current)
                mode = None
            elif is_bullet_line(lines[idx]):
                value = strip_bullet_text(lines[idx])
                if mode:
                    entry[mode].append(value)
            idx += 1

        years.append(entry)
        idx += 1

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "jumpLabel": "Jump to model year",
        "years": years,
        "closing": closing,
    }


def parse_faq(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "FAQ"
    h2 = extract_label_value(lines, "H2") or ""
    intro = extract_label_value(lines, "Intro", "Intro (1 line)", "Paragraph", "Subheading") or ""
    items: List[Dict[str, Any]] = []
    idx = 0
    question_re = re.compile(r"^Q\d*:\s*(.+)$", flags=re.IGNORECASE)

    while idx < len(lines):
        line = strip_markdown(lines[idx])
        question_match = question_re.match(line)
        if not question_match:
            idx += 1
            continue

        question = question_match.group(1).strip()
        answer = ""
        key_points: List[str] = []
        warning = ""
        cta = ""
        mode = None
        idx += 1

        while idx < len(lines):
            current = strip_markdown(lines[idx])
            lowered = normalize_key(current)
            if question_re.match(current):
                idx -= 1
                break
            if lowered.startswith("short summary"):
                answer = current.split(":", 1)[1].strip() if ":" in current else ""
                mode = None
            elif lowered.startswith("key points"):
                mode = "keyPoints"
            elif lowered.startswith("warning"):
                warning = current.split(":", 1)[1].strip() if ":" in current else ""
                mode = None
            elif is_arrow_line(current):
                cta = strip_arrow_text(current)
                mode = None
            elif is_bullet_line(lines[idx]) and mode == "keyPoints":
                key_points.append(strip_bullet_text(lines[idx]))
            idx += 1

        items.append(
            {
                "question": question,
                "answer": answer,
                "keyPoints": key_points,
                "cta": cta,
                **({"warning": warning} if warning else {}),
            }
        )
        idx += 1

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "items": items,
    }


def parse_trust_cta(lines: Sequence[str]) -> Dict[str, Any]:
    tag = extract_label_value(lines, "Tag") or "Why Choose Us"
    h2 = extract_label_value(lines, "H2", "Section H2") or ""
    intro = extract_label_value(lines, "Intro", "Paragraph", "Subheading", "H3") or ""
    final_text = extract_label_value(lines, "Final CTA sentence", "Final CTA", "Final text") or ""
    button_text = extract_label_value(lines, "CTA Button text", "CTA Button", "Button text") or ""
    trust_points = extract_block_after_label(lines, "Trust Points", "Points")
    points: List[Dict[str, str]] = []

    for line in trust_points:
        clean = normalize_line(line)
        split = re.split(r"\s[-–—]\s", clean, maxsplit=1)
        if len(split) == 2:
            left, right = split
            points.append({"title": left.strip(), "description": right.strip()})

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "points": points,
        "finalText": final_text,
        "buttonText": button_text,
    }


def merge_missing_how_it_works(
    extracted: Dict[str, Any],
    brand_json: Optional[Dict[str, Any]],
) -> Dict[str, Any]:
    if not brand_json:
        return extracted

    brand_how = copy.deepcopy(brand_json.get("sections", {}).get("howItWorks", {}))
    if not brand_how:
        return extracted

    result = copy.deepcopy(brand_how)
    if extracted.get("tag"):
        result["tag"] = extracted["tag"]
    if extracted.get("h2"):
        result["h2"] = extracted["h2"]
    if extracted.get("tagline"):
        result["tagline"] = extracted["tagline"]

    extracted_cards = {card["number"]: card for card in extracted.get("cards", [])}
    merged_cards = []
    for card in result.get("cards", []):
        override = extracted_cards.get(card.get("number"))
        if not override:
            merged_cards.append(card)
            continue
        merged = copy.deepcopy(card)
        if card.get("number") == 1:
            if override["front"].get("h3"):
                merged["front"]["h3"] = override["front"]["h3"]
            if override["front"].get("text"):
                merged["front"]["text"] = override["front"]["text"]
            if override["back"].get("heading"):
                merged["back"]["heading"] = override["back"]["heading"]
            if override["back"].get("text"):
                merged["back"]["text"] = override["back"]["text"]
            if override["back"].get("bullets"):
                merged["back"]["bullets"] = override["back"]["bullets"]
        merged_cards.append(merged)

    existing_numbers = {card["number"] for card in merged_cards}
    for card in extracted.get("cards", []):
        if card["number"] == 1 and card["number"] not in existing_numbers:
            merged_cards.append(card)

    result["cards"] = merged_cards
    return result


def merge_reviews(
    extracted: Dict[str, Any],
    brand_json: Optional[Dict[str, Any]],
    model_name: str,
) -> Dict[str, Any]:
    if brand_json:
        reviews = copy.deepcopy(brand_json.get("sections", {}).get("reviews"))
        if reviews:
            reviews["h2"] = f"Trusted by {model_name} Owners Across the UK"
            return reviews
    return extracted


def parse_meta(lines: Sequence[str]) -> Dict[str, str]:
    meta_title = extract_label_value(lines, "META TITLE") or ""
    meta_description = extract_label_value(lines, "META DESCRIPTION") or ""
    canonical = extract_label_value(lines, "CANONICAL URL") or ""
    return {
        "title": meta_title,
        "description": meta_description,
        "canonical": canonical,
    }


def parse_document(
    lines: Sequence[str],
    brand_name: str,
    brand_slug: str,
    model_name: str,
    model_slug: str,
    legacy_slug: Optional[str],
    brand_json: Optional[Dict[str, Any]],
    hero_image: Optional[str],
    cta_image: Optional[str],
) -> Tuple[Dict[str, Any], List[str]]:
    warnings: List[str] = []
    assets = default_assets(brand_slug, model_slug, brand_json, hero_image, cta_image)
    data = build_empty_model_json(
        brand_name=brand_name,
        brand_slug=brand_slug,
        model_name=model_name,
        model_slug=model_slug,
        legacy_slug=legacy_slug,
        assets=assets,
    )

    hero_lines = extract_slice(lines, ["# section 1", "hero content", "tag pill"], ["# section 2", "how it works", "3: live market prices", "live uk engine market data"])
    how_lines = extract_slice(lines, ["# section 2", "how it works", "card 1 front"], ["3: live market prices", "live uk engine market data", "4: popular sub-models", "tag: models we cover"])
    live_lines = extract_slice(lines, ["3: live market prices", "live uk engine market data", "feed table"], ["4: popular sub-models", "tag: models we cover"])
    variant_lines = extract_slice(lines, ["4: popular sub-models", "tag: models we cover"], ["5: engine codes", "tag: engine codes"])
    engine_code_lines = extract_slice(lines, ["5: engine codes", "tag: engine codes"], ["6 (revised): engine problems", "6: engine problems", "tag: common problems"])
    common_problem_lines = extract_slice(lines, ["6 (revised): engine problems", "6: engine problems", "tag: common problems"], ["7 (revised): engine types", "7: engine types", "tag: replacement engine options", "tag: engine types"])
    engine_type_lines = extract_slice(lines, ["7 (revised): engine types", "7: engine types", "tag: replacement engine options", "tag: engine types"], ["8: engine sizes by fuel type", "8: engine sizes", "tag: engine sizes"])
    engine_size_lines = extract_slice(lines, ["8: engine sizes by fuel type", "8: engine sizes", "tag: engine sizes"], ["9: engines by fuel type", "tag: fuel type", "tag: bmw 2 series engines fuel type"])
    fuel_lines = extract_slice(lines, ["9: engines by fuel type", "tag: fuel type", "tag: bmw 2 series engines fuel type"], ["10: model years coverage", "tag: engine years"])
    year_lines = extract_slice(lines, ["10: model years coverage", "tag: engine years"], ["11: faqs", "tag: faq"])
    faq_lines = extract_slice(lines, ["11: faqs", "tag: faq", "faq"], ["tag: why choose us", "why choose us", "13: em model page - meta tags"])
    trust_lines = extract_slice(lines, ["tag: why choose us", "why choose us"], ["13: em model page - meta tags", "meta title", "meta description", "canonical url"])

    meta = parse_meta(lines)

    data["sections"]["hero"] = parse_hero_with_anchor_rows(hero_lines or lines, model_name)
    parsed_how = parse_how_it_works(how_lines, model_name)
    data["sections"]["howItWorks"] = merge_missing_how_it_works(parsed_how, brand_json)
    data["sections"]["liveMarketPrices"] = parse_live_market(live_lines, model_name)
    data["sections"]["variantCoverage"] = parse_variant_coverage_refined(variant_lines)
    guide = parse_engine_code_families(engine_code_lines)
    data["sections"]["variantCoverage"]["engineGuide"] = guide
    data["sections"]["variantCoverage"]["engineGuide"]["tag"] = guide["tag"]
    data["sections"]["engineCodes"] = build_summary_engine_codes(guide, model_name)
    data["sections"]["commonProblems"] = parse_common_problems(common_problem_lines)
    data["sections"]["engineTypes"] = parse_engine_types(engine_type_lines)
    data["sections"]["engineSizes"] = parse_engine_sizes(engine_size_lines)
    data["sections"]["fuelTypes"] = parse_fuel_types(fuel_lines)
    data["sections"]["engineYears"] = parse_engine_years(year_lines)
    data["sections"]["faq"] = parse_faq(faq_lines)
    data["sections"]["trustCta"] = parse_trust_cta(trust_lines)

    if brand_json:
        data["sections"]["reviews"] = merge_reviews(
            data["sections"]["reviews"],
            brand_json,
            model_name,
        )
    elif not data["sections"]["reviews"]["reviews"]:
        warnings.append("No reviews section found in markdown and no --brand-json provided; emitted empty reviews block.")

    if meta["title"]:
        data["seo"]["title"] = meta["title"]
    if meta["description"]:
        data["seo"]["description"] = meta["description"]
    if meta["canonical"]:
        _, canonical_model_slug = parse_canonical_to_paths(meta["canonical"])
        data["seo"]["canonical"] = f"/{brand_slug}/{model_slug}"
        if canonical_model_slug and canonical_model_slug != model_slug and not legacy_slug:
            data["model"]["legacySlug"] = canonical_model_slug
    else:
        data["seo"]["canonical"] = f"/{brand_slug}/{model_slug}"

    if brand_json:
        for asset_key in ("howItWorksBg", "engineCodesBg", "engineTypesBg", "engineSizesBg", "fuelTypesBg"):
            if not data["assets"].get(asset_key):
                value = brand_json.get("assets", {}).get(asset_key)
                if value:
                    data["assets"][asset_key] = value

    if not data["sections"]["variantCoverage"]["cards"]:
        warnings.append("No variant coverage cards were parsed.")
    if not data["sections"]["variantCoverage"]["engineGuide"]["families"]:
        warnings.append("No detailed engine guide families were parsed.")
    if not data["sections"]["engineYears"]["years"]:
        warnings.append("No engine-year timeline blocks were parsed.")
    if not data["sections"]["faq"]["items"]:
        warnings.append("No FAQ items were parsed.")

    return data, warnings


def infer_context(
    lines: Sequence[str],
    args: argparse.Namespace,
    brand_json: Optional[Dict[str, Any]],
) -> Tuple[str, str, str, str, Optional[str]]:
    meta = parse_meta(lines)
    canonical_brand, canonical_model = parse_canonical_to_paths(meta["canonical"])
    h1 = extract_label_value(lines, "H1") or ""
    inferred_model_name = args.model_name or title_from_h1(h1)

    brand_name = args.brand_name or (brand_json or {}).get("brand", {}).get("name")
    brand_slug = args.brand_slug or (brand_json or {}).get("brand", {}).get("slug") or canonical_brand
    model_name = normalize_model_name_for_brand(args.model_name or inferred_model_name, brand_name or "")
    model_slug = args.model_slug or infer_model_slug_from_name(model_name, brand_name)
    storage_slug = infer_storage_slug_from_name(model_name)
    legacy_slug = args.legacy_slug or canonical_model or (storage_slug if storage_slug != model_slug else None)

    if not brand_name:
        raise SystemExit("Could not infer brand name. Pass --brand-name or --brand-json.")
    if not brand_slug:
        raise SystemExit("Could not infer brand slug. Pass --brand-slug or --brand-json.")
    if not model_name:
        raise SystemExit("Could not infer model name. Pass --model-name.")
    if not model_slug:
        raise SystemExit("Could not infer model slug. Pass --model-slug.")

    if legacy_slug == model_slug:
        legacy_slug = None

    return brand_name, brand_slug, model_name, model_slug, legacy_slug


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extract model page JSON from structured markdown/txt.")
    parser.add_argument("--input", help="Path to one markdown / txt source file.")
    parser.add_argument("--input-dir", help="Folder containing multiple markdown / txt source files.")
    parser.add_argument("--output", help="Where to write the JSON output.")
    parser.add_argument("--output-dir", help="Folder where batch-generated JSON files should be written.")
    parser.add_argument("--brand-json", help="Optional brand JSON to copy shared sections / assets from.")
    parser.add_argument("--brand-name", help="Brand display name, e.g. BMW or Land Rover.")
    parser.add_argument("--brand-slug", help="Brand route slug, e.g. bmw or land-rover.")
    parser.add_argument("--model-name", help="Model display name, e.g. BMW 2 Series.")
    parser.add_argument("--model-slug", help="Canonical model slug used by the route, e.g. series-2.")
    parser.add_argument("--legacy-slug", help="Optional legacy model slug, e.g. 2-series.")
    parser.add_argument("--hero-image", help="Optional model hero image path to write into assets.heroBg.")
    parser.add_argument("--cta-image", help="Optional CTA image path to write into assets.ctaImage.")
    parser.add_argument("--stdout", action="store_true", help="Also print the generated JSON to stdout.")
    parser.add_argument("--pretty", action="store_true", help="Pretty-print JSON with indentation.")
    parser.add_argument(
        "--extensions",
        default=".txt,.md,.markdown",
        help="Comma-separated file extensions for --input-dir mode. Default: .txt,.md,.markdown",
    )
    args = parser.parse_args()
    if not args.input and not args.input_dir:
        parser.error("Provide either --input or --input-dir.")
    if args.input and args.input_dir:
        parser.error("Use only one of --input or --input-dir.")
    if args.input_dir and not args.output_dir and not args.stdout:
        parser.error("--input-dir requires --output-dir unless you only want --stdout.")
    return args


def load_json(path: Optional[str]) -> Optional[Dict[str, Any]]:
    if not path:
        return None
    return json.loads(Path(path).read_text(encoding="utf-8"))


def configure_stdio() -> None:
    for stream_name in ("stdout", "stderr"):
        stream = getattr(sys, stream_name, None)
        if stream and hasattr(stream, "reconfigure"):
            try:
                stream.reconfigure(encoding="utf-8", errors="replace")
            except Exception:
                pass


def process_single_input(
    input_path: Path,
    args: argparse.Namespace,
    brand_json: Optional[Dict[str, Any]],
    output_path: Optional[Path],
    print_header: bool = False,
) -> int:
    lines = read_lines(input_path)
    brand_name, brand_slug, model_name, model_slug, legacy_slug = infer_context(lines, args, brand_json)
    existing_output: Optional[Dict[str, Any]] = None
    if output_path and output_path.is_file():
        try:
            existing_output = json.loads(output_path.read_text(encoding="utf-8"))
        except Exception:
            existing_output = None

    data, warnings = parse_document(
        lines=lines,
        brand_name=brand_name,
        brand_slug=brand_slug,
        model_name=model_name,
        model_slug=model_slug,
        legacy_slug=legacy_slug,
        brand_json=brand_json,
        hero_image=args.hero_image,
        cta_image=args.cta_image,
    )
    extracted_data = copy.deepcopy(data)

    if existing_output:
        data = deep_merge_existing(existing_output, data)
        data = restore_doc_driven_sections(data, extracted_data, existing_output)

    data = inject_model_ui_defaults(data)

    json_text = json.dumps(data, indent=2 if args.pretty or args.stdout else None, ensure_ascii=False)
    if output_path:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(f"{json_text}\n", encoding="utf-8")

    if args.stdout or not output_path:
        if print_header:
            print(f"\n### {input_path.name}")
        print(json_text)

    for warning in warnings:
        print(f"WARNING [{input_path.name}]: {warning}", file=sys.stderr)

    return 0


def main() -> int:
    configure_stdio()
    args = parse_args()
    brand_json = load_json(args.brand_json)

    if args.input:
        input_path = Path(args.input)
        if not input_path.is_file():
            raise SystemExit(f"Input file not found: {input_path}")
        output_path = Path(args.output) if args.output else None
        return process_single_input(input_path, args, brand_json, output_path)

    input_dir = Path(args.input_dir)
    if not input_dir.is_dir():
        raise SystemExit(f"Input directory not found: {input_dir}")

    allowed_extensions = {
        ext.strip().lower() if ext.strip().startswith(".") else f".{ext.strip().lower()}"
        for ext in args.extensions.split(",")
        if ext.strip()
    }
    files = sorted(
        path for path in input_dir.iterdir() if path.is_file() and path.suffix.lower() in allowed_extensions
    )
    if not files:
        raise SystemExit(f"No matching source files found in: {input_dir}")

    output_dir = Path(args.output_dir) if args.output_dir else None
    for input_path in files:
        lines = read_lines(input_path)
        _, _, _, model_slug, _ = infer_context(lines, args, brand_json)
        output_path = output_dir / f"{model_slug}.json" if output_dir else None
        process_single_input(
            input_path=input_path,
            args=args,
            brand_json=brand_json,
            output_path=output_path,
            print_header=len(files) > 1 and args.stdout,
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
