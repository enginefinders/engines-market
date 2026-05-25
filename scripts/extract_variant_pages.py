#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[1]
MODELS_DIR = REPO_ROOT / "data" / "models"
VARIANTS_DIR = REPO_ROOT / "data" / "variants"

SECTION_RE = re.compile(r"^#\s*SECTION\s+(?P<number>\d+)", re.IGNORECASE)
LABEL_RE = re.compile(r"^(?P<label>[A-Za-z0-9 ()/&'\-]+):\s*(?P<value>.*)$")
QUESTION_RE = re.compile(r"^Q:\s*(?P<value>.+)$", re.IGNORECASE)
H3_RE = re.compile(r"^H3:\s*(?P<value>.+)$", re.IGNORECASE)

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


def match_label(line: str) -> tuple[str, str] | None:
    label_match = LABEL_RE.match(normalize_text(line))
    if not label_match:
        return None
    return label_match.group("label").upper(), label_match.group("value").strip()


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

        if matched:
            current_label, current_value = matched
            if collecting and current_label != target:
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
            values.append(normalized)

    return values


def clean_bullet(value: str) -> str:
    return strip_leading_marker(value)


def extract_bullets(lines: list[str], start_label: str) -> list[str]:
    bullets: list[str] = []
    for value in collect_block(lines, start_label):
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


def parse_repair_options(lines: list[str], start_label: str) -> list[dict[str, str]]:
    rows = parse_table(lines, start_label, min_cells=5)
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
        if QUESTION_RE.match(normalize_text(line)):
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
        if H3_RE.match(normalize_text(line)):
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


def parse_metadata(section_lines: list[str]) -> dict[str, Any]:
    title = find_label(section_lines, "META TITLE")
    description = find_label(section_lines, "META DESCRIPTION")
    canonical = find_label(section_lines, "CANONICAL URL")
    if canonical:
        canonical = canonical.replace("https://www.enginesmarket.co.uk", "").rstrip("/") or canonical

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


def derive_route_parts(meta: dict[str, Any], fallback_name: str) -> tuple[str, str, str]:
    canonical = meta.get("canonical") or ""
    parts = [part for part in canonical.strip("/").split("/") if part]
    if len(parts) >= 3:
        return parts[0], parts[1], parts[2]

    fallback_variant = fallback_name.replace(" Engine Replacement", "").replace(" variant", "")
    return "", "", f"{slugify(fallback_variant)}-engine"


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
    if hero.get("highlights"):
        hero["highlights"][0]["title"] = f"{variant_name} Engine"
        hero["highlights"][0]["price"] = price


def parse_how_it_works(section_lines: list[str], variant_name: str) -> dict[str, Any]:
    card_fronts: dict[str, list[str]] = {}
    card_flips: dict[str, list[str]] = {}
    current_key: str | None = None
    current_store: dict[str, list[str]] | None = None

    for raw_line in section_lines:
        line = normalize_text(raw_line)
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
            h3_match = H3_RE.match(line)
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
    return {
        "tag": "Variant History",
        "h2": find_label(section_lines, "H2"),
        "intro": " ".join(collect_block(section_lines, "INTRO PARAGRAPH")),
        "milestones": extract_bullets(section_lines, "KEY MILESTONES"),
        "specsLabel": "Key Specs Snapshot",
        "specs": extract_bullets(section_lines, "KEY SPECS SNAPSHOT"),
    }


def parse_engine_guide(section_lines: list[str]) -> dict[str, Any]:
    items = []
    for block in parse_engine_blocks(section_lines):
        title_match = H3_RE.match(normalize_text(block[0]))
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
        "h2": find_label(section_lines, "H2"),
        "items": items,
        "closing": " ".join(collect_block(section_lines, "SECTION 4 CLOSING")),
    }


def parse_common_problems(section_lines: list[str], variant_name: str) -> dict[str, Any]:
    problems = []
    closing_title = ""
    closing_paragraph = ""

    for block in parse_engine_blocks(section_lines):
        heading_match = H3_RE.match(normalize_text(block[0]))
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
                normalized = normalize_text(line)
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
        "h2": find_label(section_lines, "H2"),
        "h3": " ".join(collect_block(section_lines, "INTRO PARAGRAPH")),
        "problems": problems,
        "finalCta": {
            "h4": closing_title or f"Don't let engine failure write off your {variant_name}",
            "paragraph": closing_paragraph,
            "buttonText": find_label(section_lines, "CTA BUTTON"),
            "disclaimer": " ".join(collect_block(section_lines, "DISCLAIMER")),
        },
    }


def parse_faq(section_lines: list[str], variant_name: str) -> dict[str, Any]:
    items = []
    for block in parse_question_blocks(section_lines):
        question_match = QUESTION_RE.match(normalize_text(block[0]))
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
        "h2": find_label(section_lines, "H2"),
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
    points = []
    for label in ("TRUST BULLET 1", "TRUST BULLET 2", "TRUST BULLET 3"):
        text = find_label(section_lines, label)
        title, description = split_dash_pair(text)
        points.append({"title": title.strip(), "description": description.strip()})

    return {
        "tag": "Why Choose Us",
        "h2": find_label(section_lines, "H2"),
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
    section_map: dict[int, list[str]],
    parent_model: dict[str, Any] | None,
) -> dict[str, Any]:
    metadata = parse_metadata(section_map.get(8, []))
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
            "title": metadata["title"],
            "description": metadata["description"],
            "canonical": metadata["canonical"],
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


def extract_file(source_path: Path, output_dir: Path) -> Path:
    lines = read_lines(source_path)
    section_map = split_sections(lines)
    metadata = parse_metadata(section_map.get(8, []))
    brand_slug, model_slug, _variant_slug = derive_route_parts(metadata, source_path.stem)
    parent_model = load_parent_model_page(brand_slug, model_slug)
    data = build_output_data(source_path, section_map, parent_model)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{data['variant']['storageSlug']}.json"
    output_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return output_path


def collect_input_files(input_path: Path) -> list[Path]:
    if input_path.is_file():
        return [input_path]
    return sorted(
        path
        for path in input_path.iterdir()
        if path.is_file() and path.suffix.lower() in {".txt", ".md", ".markdown"}
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extract variant-page JSON from structured text docs.")
    parser.add_argument("--input", "-i", required=True, help="Variant source file or folder.")
    parser.add_argument("--output", "-o", default=str(VARIANTS_DIR), help="Output folder for variant JSON.")
    return parser.parse_args()


def main() -> int:
    configure_stdio()
    args = parse_args()
    input_path = Path(args.input)
    output_dir = Path(args.output)
    files = collect_input_files(input_path)
    if not files:
        raise SystemExit(f"No variant source files found in {input_path}")

    for source_file in files:
        output_path = extract_file(source_file, output_dir)
        print(f"OK {source_file.name} -> {output_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
