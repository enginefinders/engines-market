#!/usr/bin/env python3
"""
Fill known gaps in brand JSON files using the source DOCX files.

This script is intentionally narrow:
- fills missing section copy that exists in the DOCX but was not extracted
- patches Volkswagen fuel types to include PHEV and BEV blocks present in the source
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Callable, Iterable

from docx import Document


REPO_ROOT = Path(__file__).resolve().parents[1]
BRANDS_DIR = REPO_ROOT / "data" / "brands"
DOCS_DIR = REPO_ROOT.parent / "all"

TAG_PREFIXES = ("**Tag:**", "Tag:")
SECTION_END_RE = re.compile(r"^#\d+:", re.IGNORECASE)
YEAR_BLOCK_RE = re.compile(r"^\d{4}\s*[–-]")


def read_docx_lines(path: Path) -> list[str]:
    doc = Document(path)
    return [paragraph.text.strip() for paragraph in doc.paragraphs if paragraph.text.strip()]


def normalize_slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def strip_label(line: str) -> str:
    text = line.strip().strip("*").strip()
    if ":" in text:
        _, value = text.split(":", 1)
        return value.strip()
    return text


def is_separator(line: str) -> bool:
    stripped = line.strip()
    return stripped in {"---", "--", "| :--- | :--- |"} or not stripped


def get_doc_path_for_slug(slug: str) -> Path | None:
    for path in DOCS_DIR.glob("*.docx"):
        if normalize_slug(path.stem) == slug:
            return path
    return None


def find_section(lines: list[str], predicate: Callable[[str], bool]) -> list[str]:
    start = None

    for index, line in enumerate(lines):
        if predicate(line):
            start = index
            break

    if start is None:
        return []

    end = len(lines)
    for index in range(start + 1, len(lines)):
        line = lines[index]
        if SECTION_END_RE.match(line):
            end = index
            break

    return lines[start:end]


def find_tag_section(lines: list[str], tag_name: str) -> list[str]:
    tag_lower = tag_name.lower()
    return find_section(
        lines,
        lambda line: any(line.lower().startswith(prefix.lower()) and tag_lower in line.lower() for prefix in TAG_PREFIXES),
    )


def extract_labeled_or_next(section_lines: Iterable[str], label_fragment: str) -> str:
    lines = list(section_lines)
    label_lower = label_fragment.lower()

    for index, line in enumerate(lines):
        lowered = line.lower()
        if label_lower not in lowered:
            continue

        value = strip_label(line)
        if value and value.lower() != line.strip().strip("*").strip().lower():
            return value

        for next_line in lines[index + 1 :]:
            if is_separator(next_line):
                continue
            return next_line.strip()

    return ""


def extract_h2_and_intro_from_engine_years(section_lines: list[str]) -> tuple[str, str]:
    if not section_lines:
        return "", ""

    title = ""
    intro = ""

    tag_index = 0
    for index, line in enumerate(section_lines):
        if any(line.lower().startswith(prefix.lower()) for prefix in TAG_PREFIXES):
            tag_index = index
            break

    for line in section_lines[tag_index + 1 :]:
        if is_separator(line):
            continue
        title = strip_label(line) if "h2" in line.lower() else line.strip()
        break

    seen_title = False
    for line in section_lines[tag_index + 1 :]:
        if is_separator(line):
            continue
        candidate = strip_label(line) if "intro" in line.lower() else line.strip()
        if not seen_title:
            seen_title = True
            continue
        if YEAR_BLOCK_RE.match(candidate):
            break
        intro = candidate
        break

    return title, intro


def parse_vw_fuel_items(section_lines: list[str]) -> list[dict[str, object]]:
    items: list[dict[str, object]] = []
    current: dict[str, object] | None = None
    mode: str | None = None

    for line in section_lines:
        stripped = line.strip()
        if stripped.startswith("### "):
            if current:
                items.append(current)
            current = {
                "title": stripped.replace("###", "", 1).strip(),
                "description": "",
                "families": [],
                "foundIn": [],
                "knownFor": [],
                "importantNotes": [],
                "cta": "",
            }
            mode = None
            continue

        if current is None:
            continue

        if stripped.startswith("**Short descriptor:**"):
            current["description"] = strip_label(stripped)
            mode = None
            continue

        if stripped.startswith("**Common ") and ("Families" in stripped or "Motors" in stripped):
            mode = "families"
            continue

        if stripped.startswith("**Found In:**"):
            mode = "foundIn"
            continue

        if stripped.startswith("**Known For"):
            mode = "knownFor"
            continue

        if stripped.startswith("**Important Notes"):
            mode = "importantNotes"
            continue

        if stripped.startswith("→"):
            current["cta"] = stripped
            mode = None
            continue

        if stripped == "---":
            if current:
                items.append(current)
            current = None
            mode = None
            continue

        if stripped.startswith("- ") and mode:
            value = stripped[2:].strip()
            current[mode].append(value)

    if current:
        items.append(current)

    return items


def update_brand_json(path: Path) -> list[str]:
    data = json.loads(path.read_text(encoding="utf-8-sig"))
    slug = path.stem
    doc_path = get_doc_path_for_slug(slug)

    if doc_path is None:
        return []

    lines = read_docx_lines(doc_path)
    updates: list[str] = []
    sections = data["sections"]

    common_problems = find_tag_section(lines, "Common Problems")
    engine_sizes = find_tag_section(lines, "Engine Sizes")
    engine_years = find_section(lines, lambda line: "engine years" in line.lower())
    faq = find_section(lines, lambda line: "faq" in line.lower())
    fuel_types = find_tag_section(lines, "Complete Volkswagen Engines List") if slug == "volkswagen" else []

    common_h3 = extract_labeled_or_next(common_problems, "H3")
    if common_h3 and not sections["commonProblems"].get("h3", "").strip():
        sections["commonProblems"]["h3"] = common_h3
        updates.append("commonProblems.h3")

    engine_sizes_intro = extract_labeled_or_next(engine_sizes, "Intro")
    if engine_sizes_intro and not sections["engineSizes"].get("intro", "").strip():
        sections["engineSizes"]["intro"] = engine_sizes_intro
        updates.append("engineSizes.intro")

    engine_years_h2, engine_years_intro = extract_h2_and_intro_from_engine_years(engine_years)
    if engine_years_h2 and not sections["engineYears"].get("h2", "").strip():
        sections["engineYears"]["h2"] = engine_years_h2
        updates.append("engineYears.h2")
    if engine_years_intro and not sections["engineYears"].get("intro", "").strip():
        sections["engineYears"]["intro"] = engine_years_intro
        updates.append("engineYears.intro")

    faq_h2 = extract_labeled_or_next(faq, "H2")
    faq_intro = extract_labeled_or_next(faq, "Intro")
    if faq_h2 and not sections["faq"].get("h2", "").strip():
        sections["faq"]["h2"] = faq_h2
        updates.append("faq.h2")
    if faq_intro and not sections["faq"].get("intro", "").strip():
        sections["faq"]["intro"] = faq_intro
        updates.append("faq.intro")

    if slug == "volkswagen":
        parsed_items = parse_vw_fuel_items(fuel_types)
        if len(parsed_items) >= 4 and len(sections["fuelTypes"].get("items", [])) < 4:
            sections["fuelTypes"]["items"] = parsed_items
            updates.append("fuelTypes.items")

    if updates:
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    return updates


def main() -> int:
    updated = 0

    for path in sorted(BRANDS_DIR.glob("*.json")):
        changes = update_brand_json(path)
        if changes:
            updated += 1
            print(f"{path.name}: {', '.join(changes)}")

    print(f"\nUpdated {updated} brand file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
