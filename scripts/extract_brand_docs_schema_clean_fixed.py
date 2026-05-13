#!/usr/bin/env python3
"""
Extract brand engine DOCX files into JSON files that match the Next.js BrandPageData schema.

Usage:
  py -3 extract_brand_docs_final.py --input "C:\path\to\docs" --output "C:\path\to\json" --pretty

What it does:
- Reads every .docx in the input folder.
- Ignores keyword coverage tables.
- Ignores developer / implementation instructions from the document.
- Extracts ratings from JSON-LD when available.
- Normalizes output to the required Next.js TypeScript schema so .map() fields always exist.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any

from docx import Document


SECTION_ORDER = [
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


SECTION_KEY_MAP = {
    "hero section": "hero",
    "hero": "hero",
    "how it works": "howItWorks",
    "live market prices": "liveMarketPrices",
    "live market": "liveMarketPrices",
    "reviews": "reviews",
    "customer reviews": "reviews",
    "popular models": "models",
    "models": "models",
    "engine codes": "engineCodes",
    "engine price table": "engineCodes",
    "common problems": "commonProblems",
    "engine problems": "commonProblems",
    "engine types": "engineTypes",
    "replacement engine options": "engineTypes",
    "engine sizes": "engineSizes",
    "fuel types": "fuelTypes",
    "engine fuel types": "fuelTypes",
    "engine code directory": "engineCodeDirectory",
    "engine years": "engineYears",
    "faq": "faq",
    "faqs": "faq",
    "trust cta": "trustCta",
    "trust": "trustCta",
}


def clean(value: str) -> str:
    value = (value or "").strip()
    value = re.sub(r"^\ufeff", "", value)
    value = re.sub(r"^[🔒🖼️💰🛡️•\-\u2022]\s*", "", value)
    value = value.replace("–", "-").replace("—", "-").replace("→", "->")
    value = re.sub(r"\*\*(.*?)\*\*", r"\1", value)
    value = re.sub(r"\*(.*?)\*", r"\1", value)
    value = re.sub(r"`([^`]*)`", r"\1", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def strip_label(line: str) -> tuple[str | None, str]:
    text = clean(line)
    match = re.match(r"^([^:]{1,100}):\s*(.*)$", text)

    if not match:
        return None, text

    return clean(match.group(1)).lower(), clean(match.group(2))


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", (value or "").lower()).strip("-")


def camel_from_title(title: str) -> str:
    text = re.sub(r"^#?\s*\d+\s*(?:\(.*?\))?\s*:?\s*", "", title, flags=re.I)
    text = clean(text).lower()

    for key, value in SECTION_KEY_MAP.items():
        if key in text:
            return value

    parts = re.findall(r"[a-z0-9]+", text)

    if not parts:
        return "section"

    return parts[0] + "".join(part.title() for part in parts[1:])


def is_numbered_section(line: str) -> bool:
    return bool(re.match(r"^#\s*\d+", line.strip()))


def read_docx_lines(path: Path) -> list[str]:
    doc = Document(path)
    lines: list[str] = []

    # Paragraphs contain the real frontend copy.
    # Word tables are usually keyword coverage tables, so we skip tables intentionally.
    for paragraph in doc.paragraphs:
        text = paragraph.text.strip()

        if text:
            lines.append(text)

    return lines


def remove_keyword_and_dev_blocks(lines: list[str]) -> list[str]:
    """
    Removes:
    - keyword coverage tables
    - developer notes
    - implementation notes
    - WCAG / CSS / JS / Core Web Vitals guidance
    - accessibility implementation instructions

    Keeps:
    - frontend content
    - JSON-LD / aggregateRating text in raw_doc_lines for rating extraction
    - FAQ questions and answers
    """

    out: list[str] = []
    skip_keyword_table = False
    skip_dev_note = False

    dev_patterns = [
        "developer note",
        "developer notes",
        "developer instruction",
        "developer instructions",
        "implementation note",
        "implementation notes",
        "developer implementation notes",
        "timestamp implementation",
        "flip-card implementation",
        "accessibility note",
        "wcag",
        "core web vitals",
        "aria-expanded",
        "aria-live",
        "lazy-load",
        "responsive css",
        "javascript implementation",
        "component implementation",
        "mobile behaviour",
        "desktop behaviour",
        "developer preference",
    ]

    implementation_regex = re.compile(
        r"\b(css|javascript|wcag|core web vitals|aria-|lazy-load|responsive|desktop|mobile|hover|tap|component|accessibility)\b",
        re.I,
    )

    for raw in lines:
        line = raw.strip()

        if not line:
            continue

        cleaned = clean(line)
        low = cleaned.lower()

        if is_numbered_section(line):
            skip_keyword_table = False
            skip_dev_note = False

        if (
            "keyword coverage table" in low
            or re.match(r"^\|\s*keyword\s*\|", low)
            or low == "| keyword | integration |"
        ):
            skip_keyword_table = True
            continue

        if skip_keyword_table:
            if is_numbered_section(line):
                skip_keyword_table = False
            else:
                continue

        if any(pattern in low for pattern in dev_patterns):
            skip_dev_note = True
            continue

        if skip_dev_note:
            if (
                is_numbered_section(line)
                or re.match(r"^\*\*(tag|h1|h2|h3|h4|category)", line, re.I)
                or low.startswith("tag:")
                or low.startswith("h1:")
                or low.startswith("h2:")
                or low.startswith("h3:")
                or low.startswith("h4:")
                or low.startswith("category:")
            ):
                skip_dev_note = False
            else:
                continue

        if line.startswith("|"):
            continue

        if cleaned in {"---", "___"}:
            continue

        if implementation_regex.search(low):
            continue

        out.append(line)

    return out


def split_sections(lines: list[str]) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {}
    current_key: str | None = None

    for line in lines:
        if is_numbered_section(line):
            current_key = camel_from_title(line)
            sections.setdefault(current_key, [])
            continue

        if current_key is None:
            continue

        sections[current_key].append(line)

    return sections


def get_labeled_value(lines: list[str], wanted: str) -> str | None:
    wanted = wanted.lower()

    for index, line in enumerate(lines):
        label, value = strip_label(line)

        if not label:
            continue

        if wanted in label:
            if value:
                return value

            if index + 1 < len(lines):
                return clean(lines[index + 1])

    return None


def get_first_after(lines: list[str], pattern: str) -> str | None:
    regex = re.compile(pattern, re.I)

    for index, line in enumerate(lines):
        if regex.search(clean(line)) and index + 1 < len(lines):
            return clean(lines[index + 1])

    return None


def make_image_path(brand_slug: str, folder: str, title: str) -> str:
    return f"/images/brands/{brand_slug}/{folder}/{slugify(title)}.webp"


def parse_hero(lines: list[str]) -> dict[str, Any]:
    trust = get_first_after(lines, r"trust badges") or get_labeled_value(lines, "trust badges") or ""
    badges = [clean(item) for item in re.split(r"\s*\|\s*", trust) if clean(item)]

    return {
        "tag": get_labeled_value(lines, "tag"),
        "h1": get_labeled_value(lines, "h1"),
        "subheading": get_labeled_value(lines, "subheading"),
        "trustBadges": badges,
        "ctaLinkText": get_labeled_value(lines, "cta link text") or get_labeled_value(lines, "h3"),
        "supportingText": get_labeled_value(lines, "supporting text"),
        "ticker": get_labeled_value(lines, "ticker"),
        "form": {
            "heading": get_labeled_value(lines, "h2"),
            "subtitle": get_labeled_value(lines, "h2 subtitle"),
            "inputPlaceholder": (get_labeled_value(lines, "input box") or "Registration Number").strip("[]"),
            "buttonText": get_labeled_value(lines, "cta button"),
            "note": get_first_after(lines, r"note/disclaimer under cta") or get_labeled_value(lines, "note"),
        },
    }


def parse_how_it_works(lines: list[str]) -> dict[str, Any]:
    data: dict[str, Any] = {
        "tag": get_labeled_value(lines, "tag"),
        "h2": get_labeled_value(lines, "h2"),
        "cards": [],
        "tagline": "",
    }

    index = 0
    current: dict[str, Any] | None = None
    mode: str | None = None

    while index < len(lines):
        line = clean(lines[index])
        low = line.lower()

        match = re.match(r"card\s+(\d+)\s*\((front|flip|back).*?\)", low, re.I)

        if match:
            number = int(match.group(1))
            face = match.group(2)

            found = next((card for card in data["cards"] if card["number"] == number), None)

            if not found:
                found = {
                    "number": number,
                    "icon": "registration" if number == 1 else "quote" if number == 2 else "shield",
                    "front": {"h3": "", "text": ""},
                    "back": {"heading": "", "text": "", "bullets": []},
                }
                data["cards"].append(found)

            current = found
            mode = "front" if face == "front" else "back"
            index += 1
            continue

        if current and "[icon:" in low:
            icon = re.search(r"\[icon:\s*([^\]]+)\]", line, re.I)

            if icon:
                icon_text = icon.group(1).lower()
                if "quote" in icon_text or "pricing" in icon_text:
                    current["icon"] = "quote"
                elif "shield" in icon_text or "trust" in icon_text:
                    current["icon"] = "shield"
                else:
                    current["icon"] = "registration"

            index += 1
            continue

        label, value = strip_label(lines[index])

        if current and label == "h3" and mode == "front":
            current["front"]["h3"] = value

            if index + 1 < len(lines):
                next_line = clean(lines[index + 1])

                if not re.match(r"(card\s+\d+|your car|quotes you|your choice)", next_line, re.I):
                    current["front"]["text"] = next_line
                    index += 1

            index += 1
            continue

        if current and mode == "back":
            if label is None and line and not line.lower().startswith("tagline"):
                if not current["back"].get("heading"):
                    current["back"]["heading"] = line
                elif not current["back"].get("text"):
                    current["back"]["text"] = line
                else:
                    current["back"].setdefault("bullets", []).append(line)

        if "tagline" in low:
            value_from_label = value if label else get_first_after(lines[index : index + 2], r"tagline")
            data["tagline"] = value_from_label or (clean(lines[index + 1]) if index + 1 < len(lines) else "")

        index += 1

    data["cards"] = sorted(data["cards"], key=lambda card: card["number"])

    return data


def parse_live_market_prices(lines: list[str]) -> dict[str, Any]:
    intro_parts: list[str] = []
    capture_intro = False

    for line in lines:
        cleaned = clean(line)
        low = cleaned.lower()

        if "introductory paragraph" in low:
            capture_intro = True
            continue

        if "[dynamic feed" in low or "timestamp" in low:
            capture_intro = False

        if capture_intro and cleaned:
            intro_parts.append(cleaned)

    intro_text = " ".join(intro_parts).strip()

    return {
        "tag": get_labeled_value(lines, "tag"),
        "h2": get_labeled_value(lines, "h2"),
        "h3": get_labeled_value(lines, "h3"),
        "introBullets": [
            {
                "label": "Real-Time Data",
                "text": intro_text or "View recent engine replacement enquiries and typical market ranges.",
            },
            {
                "label": "Transparent Pricing",
                "text": "Compare typical rebuilt, reconditioned and used engine price ranges from UK suppliers.",
            },
            {
                "label": "Cost Insights",
                "text": "Understand common failure reasons and pricing patterns before requesting quotes.",
            },
            {
                "label": "Get Your Quote",
                "text": "Use this guide as a benchmark, then enter your registration for a tailored quote.",
            },
        ],
        "cta": {
            "heading": "Use the feed as your benchmark",
            "text": "Use recent buyer enquiries to benchmark your own engine price before comparing specialist quotes.",
            "buttonText": "Compare My Engine",
            "note": "Feed timestamps refresh when the underlying feed data is updated.",
        },
        "badges": [
            "20 recent enquiries visible",
            "Typical UK rebuilt ranges",
            "Engine-code matched rows",
            "Updated regularly",
        ],
        "feed": {
            "isDynamic": True,
            "rowsCount": 200,
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
            "visibleRows": 20,
            "entries": [],
        },
    }


def parse_models(lines: list[str], brand_slug: str) -> dict[str, Any]:
    data: dict[str, Any] = {
        "tag": get_labeled_value(lines, "tag"),
        "h2": get_labeled_value(lines, "h2"),
        "subheading": get_labeled_value(lines, "h3") or get_labeled_value(lines, "subheading"),
        "cards": [],
    }

    index = 0

    while index < len(lines):
        label, value = strip_label(lines[index])

        if label == "h4" and value:
            title = value
            item = {
                "h3": title,
                "slug": slugify(title.replace(" Engines", "").replace(" Engine", "")),
                "subtitle": "",
                "priceRange": "",
                "cta": f"Compare {title} Prices",
                "image": make_image_path(brand_slug, "models", title),
            }

            inner_index = index + 1

            while inner_index < len(lines):
                next_label, _ = strip_label(lines[inner_index])
                next_line = clean(lines[inner_index])

                if next_label in {"h4", "tag", "h2", "h3", "category"} or is_numbered_section(next_line):
                    break

                if "available for" in next_line.lower():
                    item["subtitle"] = re.sub(r"^available for\s*", "", next_line, flags=re.I)
                elif "starting from" in next_line.lower():
                    item["priceRange"] = next_line.replace("Starting from", "").strip()
                elif next_line.startswith("->"):
                    item["cta"] = next_line.replace("->", "").strip()

                inner_index += 1

            data["cards"].append(item)
            index = inner_index
            continue

        index += 1

    return data


def parse_engine_codes(lines: list[str]) -> dict[str, Any]:
    groups: list[dict[str, Any]] = []
    current_group: dict[str, Any] | None = None

    for raw in lines:
        line = clean(raw)
        label, value = strip_label(raw)

        if label == "h3" and value:
            current_group = {
                "name": value,
                "era": "",
                "failureNote": "",
                "engines": [],
            }
            groups.append(current_group)
            continue

        if current_group and label == "h4" and value:
            current_group["failureNote"] = value
            continue

        if current_group:
            codes = re.findall(r"\b[A-Z0-9]{3,8}\b", line)

            if codes and any(token in line.lower() for token in ["tdi", "tsi", "tfsi", "petrol", "diesel", "mpi", "engine"]):
                code = codes[0]

                if not any(engine["code"] == code for engine in current_group["engines"]):
                    fuel = ""
                    if "diesel" in line.lower() or "tdi" in line.lower():
                        fuel = "Diesel"
                    elif any(token in line.lower() for token in ["petrol", "tsi", "tfsi", "mpi"]):
                        fuel = "Petrol"

                    current_group["engines"].append(
                        {
                            "code": code,
                            "fuel": fuel,
                            "size": "",
                            "power": "",
                            "compatibleModels": line,
                            "avgRebuiltPrice": "",
                            "cta": f"Compare {code} engine prices",
                        }
                    )

    if not groups:
        groups.append(
            {
                "name": "Engine codes",
                "era": "",
                "failureNote": "",
                "engines": [],
            }
        )

    return {
        "tag": get_labeled_value(lines, "tag") or "Engine Codes",
        "h2": get_labeled_value(lines, "h2"),
        "h3": get_labeled_value(lines, "h3") or "",
        "filters": ["All", "Diesel", "Petrol", "TSI", "TDI"],
        "groups": groups,
    }


def parse_common_problems(lines: list[str], brand_slug: str) -> dict[str, Any]:
    problems: list[dict[str, Any]] = []
    index = 0

    while index < len(lines):
        label, value = strip_label(lines[index])

        if label == "h4" and value:
            title = value
            affected = ""
            mileage = ""
            root = ""
            recommendation = ""
            cta = f"Compare prices for {title}"
            text_parts: list[str] = []
            inner_index = index + 1

            while inner_index < len(lines):
                next_label, next_value = strip_label(lines[inner_index])
                next_line = clean(lines[inner_index])
                low = next_line.lower()

                if next_label == "h4" or is_numbered_section(next_line):
                    break

                if "affected models" in low:
                    affected = next_value or next_line
                elif "typical failure mileage" in low:
                    mileage = next_value or next_line
                elif "root cause" in low:
                    root = next_value or next_line
                elif "recommendation" in low:
                    recommendation = next_value or next_line
                elif next_line.startswith("->"):
                    cta = next_line.replace("->", "").strip()
                elif next_label not in {"tag", "h2", "h3"}:
                    text_parts.append(next_line)

                inner_index += 1

            problems.append(
                {
                    "group": slugify(title),
                    "h4": title,
                    "image": make_image_path(brand_slug, "problems", title),
                    "affectedModels": affected,
                    "typicalFailureMileage": mileage,
                    "rootCause": root or " ".join(text_parts[:2]),
                    "repairOptions": [],
                    "recommendation": recommendation or "Compare quotes from trusted UK specialists before choosing a repair route.",
                    "cta": cta,
                }
            )

            index = inner_index
            continue

        index += 1

    seen_groups: set[str] = set()

    for index, problem in enumerate(problems):
        base_group = problem.get("group") or problem.get("h4") or f"problem-{index + 1}"
        unique_group = slugify(str(base_group)) or f"problem-{index + 1}"

        if unique_group in seen_groups:
            unique_group = f"{unique_group}-{index + 1}"

        seen_groups.add(unique_group)
        problem["group"] = unique_group

    return {
        "tag": get_labeled_value(lines, "tag"),
        "h2": get_labeled_value(lines, "h2"),
        "h3": get_labeled_value(lines, "h3"),
        "problems": problems,
        "finalCta": {
            "h4": "Compare replacement engine quotes",
            "paragraph": "Enter your registration to compare prices from trusted UK engine specialists.",
            "buttonText": "Get Free Engine Quotes",
            "disclaimer": "No obligation. Supplier prices vary by engine code, mileage and fitting requirements.",
        },
    }


def parse_engine_types(lines: list[str]) -> dict[str, Any]:
    types: list[dict[str, str]] = []
    index = 0

    while index < len(lines):
        line = clean(lines[index])
        match = re.match(r"^(\d+)\.\s+(.+)$", line)

        if match:
            title = match.group(2)
            description_parts: list[str] = []
            price_range = ""
            cta = f"Compare {title} prices"
            inner_index = index + 1

            while inner_index < len(lines):
                next_line = clean(lines[inner_index])

                if re.match(r"^\d+\.\s+", next_line) or is_numbered_section(next_line):
                    break

                if "typical price range" in next_line.lower() or "typical added cost" in next_line.lower():
                    price_range = next_line
                elif next_line.startswith("->"):
                    cta = next_line.replace("->", "").strip()
                elif not next_line.lower().startswith("closing"):
                    description_parts.append(next_line)

                inner_index += 1

            types.append(
                {
                    "title": title,
                    "description": " ".join(description_parts).strip(),
                    "priceRange": price_range,
                    "cta": cta,
                }
            )

            index = inner_index
            continue

        index += 1

    return {
        "tag": get_labeled_value(lines, "tag"),
        "h2": get_labeled_value(lines, "h2"),
        "intro": get_labeled_value(lines, "short introduction") or get_labeled_value(lines, "intro") or "",
        "types": types,
        "closing": get_first_after(lines, r"closing line") or "",
    }


def parse_group_items(lines: list[str]) -> dict[str, Any]:
    groups: list[dict[str, Any]] = []
    current_group: dict[str, Any] | None = None
    current_item: dict[str, Any] | None = None

    for raw in lines:
        line = clean(raw)
        label, value = strip_label(raw)

        if label == "h3" and value:
            current_group = {
                "title": value,
                "items": [],
            }
            groups.append(current_group)
            current_item = None
            continue

        if label == "h4" and value:
            if current_group is None:
                current_group = {
                    "title": "",
                    "items": [],
                }
                groups.append(current_group)

            current_item = {
                "title": value,
                "description": "",
                "engineCodes": [],
                "compatibleModels": [],
                "productionYears": "",
                "commonFailurePoints": [],
                "cta": f"Compare {value} prices",
            }
            current_group["items"].append(current_item)
            continue

        if current_item:
            low = line.lower()

            if line.startswith("->"):
                current_item["cta"] = line.replace("->", "").strip()
            elif "engine code" in low or "motor code" in low:
                current_item["engineCodes"].extend(re.findall(r"\b[A-Z0-9]{3,8}\b", line))
            elif "compatible models" in low or "found in" in low or "typical models" in low:
                values = re.sub(r"^[^:]+:\s*", "", line)
                current_item["compatibleModels"].extend([clean(item) for item in re.split(r"[,;/]", values) if clean(item)])
            elif "production years" in low:
                current_item["productionYears"] = re.sub(r"^[^:]+:\s*", "", line).strip()
            elif "failure" in low or "known for" in low or "important notes" in low:
                current_item["commonFailurePoints"].append(re.sub(r"^[^:]+:\s*", "", line).strip())
            elif label not in {"tag", "h2", "intro", "intro line"}:
                current_item["description"] = (current_item["description"] + " " + line).strip()

    for group in groups:
        for item in group["items"]:
            item["engineCodes"] = list(dict.fromkeys(item["engineCodes"]))
            item["compatibleModels"] = list(dict.fromkeys(item["compatibleModels"]))
            item["commonFailurePoints"] = list(dict.fromkeys(item["commonFailurePoints"]))

    return {
        "tag": get_labeled_value(lines, "tag"),
        "h2": get_labeled_value(lines, "h2"),
        "intro": get_labeled_value(lines, "intro") or get_labeled_value(lines, "intro line") or "",
        "groups": groups,
        "closing": get_first_after(lines, r"closing line") or "",
    }


def parse_fuel_types(lines: list[str]) -> dict[str, Any]:
    grouped = parse_group_items(lines)
    items: list[dict[str, Any]] = []

    for group in grouped["groups"]:
        for item in group["items"]:
            items.append(
                {
                    "title": item["title"],
                    "description": item["description"],
                    "descriptor": group.get("title", ""),
                    "families": item.get("engineCodes", []),
                    "foundIn": item.get("compatibleModels", []),
                    "knownFor": item.get("commonFailurePoints", []),
                    "typicalModels": item.get("compatibleModels", []),
                    "importantNotes": item.get("commonFailurePoints", []),
                    "cta": item["cta"],
                }
            )

    return {
        "tag": get_labeled_value(lines, "tag"),
        "h2": get_labeled_value(lines, "h2"),
        "intro": get_labeled_value(lines, "intro") or get_labeled_value(lines, "intro line") or "",
        "items": items,
        "closing": get_first_after(lines, r"closing line") or "",
    }


def parse_engine_code_directory(lines: list[str], brand_slug: str) -> dict[str, Any]:
    families: list[dict[str, Any]] = []
    current_family: dict[str, Any] | None = None

    for raw in lines:
        line = clean(raw)
        label, value = strip_label(raw)

        if label == "h3" and value:
            current_family = {
                "name": value,
                "entries": [],
            }
            families.append(current_family)
            continue

        if label == "h4" and value:
            if current_family is None:
                current_family = {
                    "name": "Engine families",
                    "entries": [],
                }
                families.append(current_family)

            current_family["entries"].append(
                {
                    "title": value,
                    "image": make_image_path(brand_slug, "engines", value),
                    "description": "",
                    "cta": f"Compare {value} engine prices",
                }
            )
            continue

        if current_family and current_family["entries"]:
            if line.startswith("->"):
                current_family["entries"][-1]["cta"] = line.replace("->", "").strip()
            elif label not in {"tag", "h2", "intro"}:
                current_family["entries"][-1]["description"] = (
                    current_family["entries"][-1]["description"] + " " + line
                ).strip()

    codes: list[dict[str, str]] = []

    for raw in lines:
        line = clean(raw)

        for code in re.findall(r"\b[A-Z0-9]{3,8}\b", line):
            if any(item["code"] == code for item in codes):
                continue

            fuel = ""
            if "diesel" in line.lower() or "tdi" in line.lower():
                fuel = "Diesel"
            elif "petrol" in line.lower() or "tsi" in line.lower() or "tfsi" in line.lower():
                fuel = "Petrol"

            codes.append(
                {
                    "code": code,
                    "fuel": fuel,
                }
            )

    return {
        "tag": get_labeled_value(lines, "tag") or "Engine Code Directory",
        "h2": get_labeled_value(lines, "h2"),
        "intro": get_labeled_value(lines, "intro") or get_labeled_value(lines, "intro line") or "",
        "families": families,
        "closing": get_first_after(lines, r"closing line") or "",
        "directory": {
            "h3": "Engine code directory",
            "label": "Search by engine code",
            "intro": "Use this directory to identify common engine codes and compare replacement prices.",
            "codes": codes,
        },
    }


def parse_engine_years(lines: list[str]) -> dict[str, Any]:
    years: list[dict[str, Any]] = []

    for raw in lines:
        line = clean(raw)
        label, value = strip_label(raw)
        year_match = re.search(r"\b(19|20)\d{2}\b", line)

        if label in {"h3", "h4"} and year_match:
            year = year_match.group(0)
            years.append(
                {
                    "year": year,
                    "preview": value,
                    "description": "",
                    "keyChanges": [],
                    "mainEngines": [],
                    "popularModels": [],
                    "knownFor": [],
                    "engineCodesCovered": [],
                    "ticker": "",
                    "cta": f"Compare {year} engine prices",
                }
            )
            continue

        if years:
            low = line.lower()
            current = years[-1]

            if line.startswith("->"):
                current["cta"] = line.replace("->", "").strip()
            elif "key changes" in low:
                current["keyChanges"].append(re.sub(r"^[^:]+:\s*", "", line).strip())
            elif "main engines" in low:
                current["mainEngines"].append(re.sub(r"^[^:]+:\s*", "", line).strip())
            elif "popular models" in low:
                current["popularModels"].append(re.sub(r"^[^:]+:\s*", "", line).strip())
            elif "known for" in low:
                current["knownFor"].append(re.sub(r"^[^:]+:\s*", "", line).strip())
            elif "engine codes" in low:
                current["engineCodesCovered"].extend(re.findall(r"\b[A-Z0-9]{3,8}\b", line))
            elif label not in {"tag", "h2"}:
                current["description"] = (current["description"] + " " + line).strip()

    return {
        "tag": get_labeled_value(lines, "tag"),
        "h2": get_labeled_value(lines, "h2"),
        "intro": get_labeled_value(lines, "intro") or get_labeled_value(lines, "intro line") or "",
        "jumpLabel": "Jump to year",
        "years": years,
        "closing": get_first_after(lines, r"closing line") or "",
    }


def extract_rating_from_lines(lines: list[str]) -> dict[str, Any]:
    joined = "\n".join(lines)

    value_match = re.search(r'"ratingValue"\s*:\s*"?(?P<value>[0-9.]+)"?', joined, re.I)
    count_match = re.search(r'"ratingCount"\s*:\s*"?(?P<count>[0-9,]+)"?', joined, re.I)

    if value_match and count_match:
        return {
            "value": float(value_match.group("value")),
            "count": int(count_match.group("count").replace(",", "")),
            "summary": "Excellent",
            "basedOn": "Customer reviews",
        }

    plain_match = re.search(
        r"(?P<value>[0-9](?:\.[0-9])?)\s*(?:out of\s*)?5.*?(?P<count>[0-9,]+)\s*(?:reviews|ratings)",
        joined,
        re.I | re.S,
    )

    if plain_match:
        return {
            "value": float(plain_match.group("value")),
            "count": int(plain_match.group("count").replace(",", "")),
            "summary": "Excellent",
            "basedOn": "Customer reviews",
        }

    return {
        "value": 4.7,
        "count": 700,
        "summary": "Excellent",
        "basedOn": "Customer reviews",
    }


def parse_reviews(lines: list[str], all_doc_lines: list[str]) -> dict[str, Any]:
    return {
        "tag": get_labeled_value(lines, "tag") or "Customer Reviews",
        "h2": get_labeled_value(lines, "h2") or "Trusted by UK drivers",
        "rating": extract_rating_from_lines(all_doc_lines),
        "reviews": [],
        "leaveReviewCta": {
            "text": "Have you used our engine comparison service?",
            "linkText": "Leave a review",
        },
    }


def parse_faq(lines: list[str]) -> dict[str, Any]:
    data: dict[str, Any] = {
        "tag": get_labeled_value(lines, "tag") or "FAQ",
        "h2": get_labeled_value(lines, "h2") or "Frequently Asked Questions",
        "intro": get_labeled_value(lines, "intro") or get_labeled_value(lines, "intro line") or "",
        "items": [],
    }

    current: dict[str, Any] | None = None

    for raw in lines:
        line = clean(raw)
        label, value = strip_label(raw)

        if not line:
            continue

        question = None

        if label in {"question", "q"} and value:
            question = value
        elif label in {"h3", "h4"} and value and "?" in value:
            question = value
        elif line.endswith("?"):
            question = re.sub(r"^\d+[\).]\s*", "", line).strip()
        elif re.match(r"^(q\d*|faq\s*\d*)[:.)-]\s*.+\?$", line, re.I):
            question = re.sub(r"^(q\d*|faq\s*\d*)[:.)-]\s*", "", line, flags=re.I).strip()

        if question:
            current = {
                "question": question,
                "answer": "",
                "keyPoints": [],
                "cta": "Compare engine quotes",
            }
            data["items"].append(current)
            continue

        if current:
            if line.startswith("->"):
                current["cta"] = line.replace("->", "").strip()
            elif label in {"answer", "a"} and value:
                current["answer"] = (current["answer"] + " " + value).strip()
            elif label == "warning" and value:
                current["warning"] = value
            elif line:
                if not current["answer"]:
                    current["answer"] = line
                else:
                    current["keyPoints"].append(line)

    for item in data["items"]:
        if not item.get("keyPoints"):
            item.pop("keyPoints", None)

    return data


def parse_trust_cta(lines: list[str]) -> dict[str, Any]:
    points: list[dict[str, str]] = []
    current: dict[str, str] | None = None

    for raw in lines:
        line = clean(raw)
        label, value = strip_label(raw)

        if label in {"h3", "h4"} and value:
            current = {
                "title": value,
                "description": "",
            }
            points.append(current)
            continue

        if current and label not in {"tag", "h2", "intro"} and not line.startswith("->"):
            current["description"] = (current["description"] + " " + line).strip()

    return {
        "tag": get_labeled_value(lines, "tag"),
        "h2": get_labeled_value(lines, "h2"),
        "intro": get_labeled_value(lines, "intro") or get_labeled_value(lines, "intro line") or "",
        "points": points,
        "finalText": get_first_after(lines, r"final text") or "",
        "buttonText": get_labeled_value(lines, "button text") or get_labeled_value(lines, "cta button") or "Get Free Engine Quotes",
    }


def build_assets(slug: str) -> dict[str, str]:
    return {
        "heroBg": f"/images/brands/{slug}/brand/{slug}-hero-bg.webp",
        "howItWorksBg": f"/images/brands/{slug}/brand/{slug}-how-it-works-bg.webp",
        "commonProblemsBg": f"/images/brands/{slug}/brand/{slug}-common-problems-bg.webp",
        "engineCodesBg": f"/images/brands/{slug}/brand/{slug}-engine-codes-bg.webp",
        "engineTypesBg": f"/images/brands/{slug}/brand/{slug}-engine-types-bg.webp",
        "engineSizesBg": f"/images/brands/{slug}/brand/{slug}-engine-sizes-bg.webp",
        "fuelTypesBg": f"/images/brands/{slug}/brand/{slug}-fuel-types-bg.webp",
        "engineCodeDirectoryBg": f"/images/brands/{slug}/brand/{slug}-engine-code-directory-bg.webp",
    }


def empty_brand_schema(brand_name: str, slug: str) -> dict[str, Any]:
    return {
        "brand": {
            "name": brand_name,
            "slug": slug,
            "tone": "volume",
        },
        "seo": {
            "title": f"{brand_name} Engine Replacement",
            "description": "",
            "canonical": f"/{slug}",
        },
        "assets": build_assets(slug),
        "sections": {
            "hero": {
                "tag": "",
                "h1": "",
                "subheading": "",
                "trustBadges": [],
                "ctaLinkText": "",
                "supportingText": "",
                "ticker": "",
                "form": {
                    "heading": "",
                    "subtitle": "",
                    "inputPlaceholder": "Registration Number",
                    "buttonText": "",
                    "note": "",
                },
            },
            "howItWorks": {
                "tag": "",
                "h2": "",
                "cards": [],
                "tagline": "",
            },
            "liveMarketPrices": {
                "tag": "",
                "h2": "",
                "h3": "",
                "introBullets": [],
                "cta": {
                    "heading": "",
                    "text": "",
                    "buttonText": "",
                    "note": "",
                },
                "badges": [],
                "feed": {
                    "isDynamic": True,
                    "rowsCount": 200,
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
                    "visibleRows": 20,
                    "entries": [],
                },
            },
            "reviews": {
                "tag": "Customer Reviews",
                "h2": "Trusted by UK drivers",
                "rating": {
                    "value": 4.7,
                    "count": 700,
                    "summary": "Excellent",
                    "basedOn": "Customer reviews",
                },
                "reviews": [],
                "leaveReviewCta": {
                    "text": "Have you used our engine comparison service?",
                    "linkText": "Leave a review",
                },
            },
            "models": {
                "tag": "",
                "h2": "",
                "subheading": "",
                "cards": [],
            },
            "engineCodes": {
                "tag": "",
                "h2": "",
                "h3": "",
                "filters": [],
                "groups": [],
            },
            "commonProblems": {
                "tag": "",
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
                "tag": "",
                "h2": "",
                "intro": "",
                "types": [],
                "closing": "",
            },
            "engineSizes": {
                "tag": "",
                "h2": "",
                "intro": "",
                "groups": [],
                "closing": "",
            },
            "fuelTypes": {
                "tag": "",
                "h2": "",
                "intro": "",
                "items": [],
                "closing": "",
            },
            "engineCodeDirectory": {
                "tag": "",
                "h2": "",
                "intro": "",
                "families": [],
                "closing": "",
                "directory": {
                    "h3": "",
                    "label": "",
                    "intro": "",
                    "codes": [],
                },
            },
            "engineYears": {
                "tag": "",
                "h2": "",
                "intro": "",
                "jumpLabel": "Jump to year",
                "years": [],
                "closing": "",
            },
            "faq": {
                "tag": "FAQ",
                "h2": "Frequently Asked Questions",
                "intro": "",
                "items": [],
            },
            "trustCta": {
                "tag": "",
                "h2": "",
                "intro": "",
                "points": [],
                "finalText": "",
                "buttonText": "",
            },
        },
    }


def deep_merge(base: Any, patch: Any) -> Any:
    if isinstance(base, dict) and isinstance(patch, dict):
        merged = dict(base)

        for key, value in patch.items():
            if key in merged:
                merged[key] = deep_merge(merged[key], value)
            else:
                merged[key] = value

        return merged

    if patch in (None, ""):
        return base

    return patch


def normalize_to_next_schema(data: dict[str, Any]) -> dict[str, Any]:
    brand_name = data["brand"]["name"]
    slug = data["brand"]["slug"]

    normalized = deep_merge(empty_brand_schema(brand_name, slug), data)

    # Convert older extractor output models.models -> models.cards.
    models_section = normalized["sections"]["models"]

    if "cards" not in models_section or not isinstance(models_section.get("cards"), list):
        models_section["cards"] = []

    if not models_section["cards"] and isinstance(models_section.get("models"), list):
        cards = []

        for model in models_section["models"]:
            title = model.get("title") or model.get("h3") or ""
            cards.append(
                {
                    "h3": title,
                    "slug": slugify(title.replace(" Engines", "").replace(" Engine", "")),
                    "subtitle": model.get("variants") or model.get("subtitle") or "",
                    "priceRange": model.get("priceRange") or "",
                    "cta": model.get("cta") or f"Compare {title} Prices",
                    "image": make_image_path(slug, "models", title),
                }
            )

        models_section["cards"] = cards

    models_section.pop("models", None)

    # Make sure every common problem has a unique non-empty group key.
    seen_groups: set[str] = set()

    for index, problem in enumerate(normalized["sections"]["commonProblems"]["problems"]):
        base_group = problem.get("group") or problem.get("h4") or f"problem-{index + 1}"
        unique_group = slugify(str(base_group)) or f"problem-{index + 1}"

        if unique_group in seen_groups:
            unique_group = f"{unique_group}-{index + 1}"

        seen_groups.add(unique_group)
        problem["group"] = unique_group

    # Force required section order.
    normalized["sections"] = {
        key: normalized["sections"][key]
        for key in SECTION_ORDER
    }

    hero = normalized["sections"]["hero"]

    if not normalized["seo"]["title"]:
        normalized["seo"]["title"] = hero.get("h1") or f"{brand_name} Engine Replacement"

    if not normalized["seo"]["description"]:
        normalized["seo"]["description"] = hero.get("subheading") or ""

    return normalized


def parse_docx(path: Path) -> dict[str, Any]:
    brand_name = path.stem.strip()
    slug = slugify(brand_name)

    raw_doc_lines = read_docx_lines(path)
    clean_lines = remove_keyword_and_dev_blocks(raw_doc_lines)
    raw_sections = split_sections(clean_lines)

    data = empty_brand_schema(brand_name, slug)

    for key, section_lines in raw_sections.items():
        if key == "hero":
            data["sections"][key] = parse_hero(section_lines)
        elif key == "howItWorks":
            data["sections"][key] = parse_how_it_works(section_lines)
        elif key == "liveMarketPrices":
            data["sections"][key] = parse_live_market_prices(section_lines)
        elif key == "reviews":
            data["sections"][key] = parse_reviews(section_lines, raw_doc_lines)
        elif key == "models":
            data["sections"][key] = parse_models(section_lines, slug)
        elif key == "engineCodes":
            data["sections"][key] = parse_engine_codes(section_lines)
        elif key == "commonProblems":
            data["sections"][key] = parse_common_problems(section_lines, slug)
        elif key == "engineTypes":
            data["sections"][key] = parse_engine_types(section_lines)
        elif key == "engineSizes":
            data["sections"][key] = parse_group_items(section_lines)
        elif key == "fuelTypes":
            data["sections"][key] = parse_fuel_types(section_lines)
        elif key == "engineCodeDirectory":
            data["sections"][key] = parse_engine_code_directory(section_lines, slug)
        elif key == "engineYears":
            data["sections"][key] = parse_engine_years(section_lines)
        elif key == "faq":
            data["sections"][key] = parse_faq(section_lines)
        elif key == "trustCta":
            data["sections"][key] = parse_trust_cta(section_lines)

    # Rating sometimes exists only in JSON-LD, not a visible review section.
    data["sections"]["reviews"] = parse_reviews(raw_sections.get("reviews", []), raw_doc_lines)

    # Derive engine code directory from engineCodes if no directory section exists.
    if not data["sections"]["engineCodeDirectory"]["families"] and raw_sections.get("engineCodes"):
        data["sections"]["engineCodeDirectory"] = parse_engine_code_directory(raw_sections["engineCodes"], slug)

    data["seo"]["title"] = data["sections"]["hero"].get("h1") or f"{brand_name} Engine Replacement"
    data["seo"]["description"] = data["sections"]["hero"].get("subheading") or ""
    data["seo"]["canonical"] = f"/{slug}"

    return normalize_to_next_schema(data)


def validate_required_shape(data: dict[str, Any]) -> list[str]:
    errors: list[str] = []

    required_paths = {
        "sections.hero.trustBadges": list,
        "sections.howItWorks.cards": list,
        "sections.liveMarketPrices.introBullets": list,
        "sections.liveMarketPrices.feed.entries": list,
        "sections.reviews.rating.value": (int, float),
        "sections.reviews.rating.count": int,
        "sections.reviews.reviews": list,
        "sections.models.cards": list,
        "sections.engineCodes.groups": list,
        "sections.commonProblems.problems": list,
        "sections.engineTypes.types": list,
        "sections.engineSizes.groups": list,
        "sections.fuelTypes.items": list,
        "sections.engineCodeDirectory.families": list,
        "sections.engineCodeDirectory.directory.codes": list,
        "sections.engineYears.years": list,
        "sections.faq.items": list,
        "sections.trustCta.points": list,
    }

    for path, expected_type in required_paths.items():
        current: Any = data

        for part in path.split("."):
            if not isinstance(current, dict) or part not in current:
                errors.append(f"Missing {path}")
                current = None
                break

            current = current[part]

        if current is not None and not isinstance(current, expected_type):
            errors.append(f"Wrong type for {path}: expected {expected_type}, got {type(current)}")

    return errors


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", required=True, help="Folder containing .docx files")
    parser.add_argument("--output", "-o", default="brand-json", help="Output folder for .json files")
    parser.add_argument("--pretty", action="store_true", help="Pretty-print JSON with indentation")
    parser.add_argument("--validate", action="store_true", help="Validate required Next.js schema shape")

    args = parser.parse_args()

    input_dir = Path(args.input)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(input_dir.glob("*.docx"))

    if not files:
        raise SystemExit(f"No .docx files found in: {input_dir}")

    for file in files:
        data = parse_docx(file)

        if args.validate:
            errors = validate_required_shape(data)

            if errors:
                raise SystemExit(f"Schema validation failed for {file.name}:\n" + "\n".join(errors))

        out_path = output_dir / f"{data['brand']['slug']}.json"

        out_path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2 if args.pretty else None),
            encoding="utf-8",
        )

        print(f"✅ {file.name} -> {out_path}")

    print(f"\nDone. Extracted {len(files)} file(s).")


if __name__ == "__main__":
    main()
