"""Validate the versioned static-page family data contract."""

from __future__ import annotations

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

EXPECTED_HERO_KEYS = {
    "eyebrow",
    "title",
    "description",
    "options",
    "trust",
    "image",
    "blocks",
    "links",
}
EXPECTED_ITEM_KEYS = {"id", "title", "description", "blocks", "links", "source"}
EXPECTED_SOURCE_KEYS = {"sectionId", "order"}
EXPECTED_SUPPLEMENTAL_KEYS = {"media", "tables", "faqs", "forms", "links"}


def validate_list(value, label: str, errors: list[str], path: Path) -> bool:
    if not isinstance(value, list):
        errors.append(f"{path}: {label} must be an array")
        return False
    return True


def validate_blocks(blocks, label: str, errors: list[str], path: Path) -> None:
    if not validate_list(blocks, label, errors, path):
        return
    for index, block in enumerate(blocks):
        if not isinstance(block, dict):
            errors.append(f"{path}: {label}[{index}] must be an object")
            continue
        block_type = block.get("type")
        if block_type not in SUPPORTED_BLOCK_TYPES:
            errors.append(f"{path}: unsupported block type {block_type!r}")


def validate_page(path: Path, errors: list[str]) -> bool:
    try:
        page = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:  # pragma: no cover - command-line diagnostic
        errors.append(f"{path}: invalid JSON: {exc}")
        return False

    family = family_for(path, page)
    if family not in SCHEMAS or page.get("route") == "/about":
        return False

    if page.get("schemaVersion") != 2:
        errors.append(f"{path}: schemaVersion must be 2")

    sections = page.get("sections")
    if not isinstance(sections, dict):
        errors.append(f"{path}: sections must be an object")
        return True

    expected_section_keys = {"hero", "supplemental", *SCHEMAS[family]}
    if set(sections) != expected_section_keys:
        errors.append(f"{path}: section keys do not match {family} schema")

    hero = sections.get("hero", {})
    if set(hero) != EXPECTED_HERO_KEYS:
        errors.append(f"{path}: hero keys do not match the shared hero schema")
    validate_blocks(hero.get("blocks"), "hero.blocks", errors, path)
    validate_list(hero.get("links"), "hero.links", errors, path)

    all_orders = []
    for section_name in SCHEMAS[family]:
        bucket = sections.get(section_name, {})
        if set(bucket) != {"items"}:
            errors.append(f"{path}: {section_name} must contain only items")
            continue
        if not validate_list(bucket.get("items"), f"{section_name}.items", errors, path):
            continue
        for index, item in enumerate(bucket["items"]):
            if set(item) != EXPECTED_ITEM_KEYS:
                errors.append(f"{path}: {section_name}.items[{index}] has an inconsistent shape")
                continue
            validate_blocks(item.get("blocks"), f"{section_name}.items[{index}].blocks", errors, path)
            validate_list(item.get("links"), f"{section_name}.items[{index}].links", errors, path)
            source = item.get("source")
            if not isinstance(source, dict) or set(source) != EXPECTED_SOURCE_KEYS:
                errors.append(f"{path}: {section_name}.items[{index}].source is invalid")
                continue
            all_orders.append(source.get("order"))

    supplemental = sections.get("supplemental", {})
    if set(supplemental) != EXPECTED_SUPPLEMENTAL_KEYS:
        errors.append(f"{path}: supplemental keys do not match the shared schema")
    for key in EXPECTED_SUPPLEMENTAL_KEYS:
        validate_list(supplemental.get(key), f"supplemental.{key}", errors, path)

    if sorted(all_orders) != list(range(len(all_orders))):
        errors.append(f"{path}: source item order is not complete and unique")
    return True


def main() -> None:
    errors: list[str] = []
    pages = 0
    for path in sorted((ROOT / "data" / "static-pages").rglob("*.json")):
        if path.name == "index.json":
            continue
        before = len(errors)
        checked = validate_page(path, errors)
        if checked and len(errors) == before:
            pages += 1

    if errors:
        print(f"validated_pages={pages}")
        print(f"errors={len(errors)}")
        for error in errors:
            print(error)
        raise SystemExit(1)

    print(f"validated_pages={pages}")
    print("errors=0")


if __name__ == "__main__":
    main()
