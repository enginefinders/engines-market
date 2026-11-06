"""Normalize the inner data contract for static-page family JSON files.

The family section names are already normalized. This pass makes every hero,
section item, and supplemental container use the same field names without
duplicating the ordered source blocks into parallel arrays.
"""

from __future__ import annotations

import copy
import json
from pathlib import Path

from normalize_static_family_sections import ROOT, SCHEMAS, family_for


SUPPORTED_BLOCK_TYPES = {
    "heading",
    "paragraph",
    "list",
    "table",
    "faq",
    "form",
    "links",
    "label",
    "cards",
    "stat",
    "image",
    "quote",
}


def normalize_hero(hero: dict) -> dict:
    return {
        "eyebrow": hero.get("eyebrow", ""),
        "title": hero.get("title", ""),
        "description": hero.get("description", ""),
        "options": copy.deepcopy(hero.get("options", [])),
        "trust": copy.deepcopy(hero.get("trust", [])),
        "image": copy.deepcopy(hero.get("image")),
        "blocks": copy.deepcopy(hero.get("content", hero.get("blocks", []))),
        "links": copy.deepcopy(hero.get("links", [])),
    }


def normalize_item(item: dict) -> dict:
    source_id = item.get("sourceSectionId", item.get("id", ""))
    source_order = item.get("sourceOrder", 0)
    return {
        "id": source_id,
        "title": item.get("title", ""),
        "description": item.get("description"),
        "blocks": copy.deepcopy(item.get("content", item.get("blocks", []))),
        "links": copy.deepcopy(item.get("links", [])),
        "source": {
            "sectionId": source_id,
            "order": source_order,
        },
    }


def normalize_supplemental(supplemental: dict | None) -> dict:
    source = supplemental or {}
    return {
        "media": copy.deepcopy(source.get("media", [])),
        "tables": copy.deepcopy(source.get("tables", [])),
        "faqs": copy.deepcopy(source.get("faqs", [])),
        "forms": copy.deepcopy(source.get("forms", [])),
        "links": copy.deepcopy(source.get("links", [])),
    }


def normalize_page(path: Path) -> bool:
    page = json.loads(path.read_text(encoding="utf-8"))
    family = family_for(path, page)
    if family not in SCHEMAS or page.get("route") == "/about":
        return False

    old_sections = page.get("sections") or {}
    new_sections = {"hero": normalize_hero(old_sections.get("hero", {}))}
    for section_name in SCHEMAS[family]:
        bucket = old_sections.get(section_name, {"items": []})
        new_sections[section_name] = {
            "items": [normalize_item(item) for item in bucket.get("items", [])]
        }
    new_sections["supplemental"] = normalize_supplemental(old_sections.get("supplemental"))

    page["schemaVersion"] = 2
    page["sections"] = new_sections
    path.write_text(json.dumps(page, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return True


def main() -> None:
    count = 0
    for path in sorted((ROOT / "data" / "static-pages").rglob("*.json")):
        if path.name == "index.json":
            continue
        count += normalize_page(path)
    print(f"normalized_pages={count}")


if __name__ == "__main__":
    main()
