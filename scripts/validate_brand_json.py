#!/usr/bin/env python3
"""
Validate generated brand JSON files against the current Next.js BrandPageData shape.

This validator is intentionally lightweight:
- standard library only
- accepts one JSON file or a whole folder
- reports hard errors vs softer warnings

Usage examples:
    python validate_brand_json.py "C:\\Users\\Rahma\\new_engine\\engine-market\\data\\brands\\_generated"

    python validate_brand_json.py "C:\\Users\\Rahma\\new_engine\\engine-market\\data\\brands\\seat.json"
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, List, Sequence, Tuple


REQUIRED_SECTIONS = [
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

REQUIRED_ASSET_KEYS = [
    "heroBg",
    "howItWorksBg",
]


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def default_input_dir() -> Path:
    return repo_root() / "data" / "brands" / "_generated"


def load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def resolve_inputs(input_path: Path) -> List[Path]:
    if input_path.is_file():
        return [input_path]
    return sorted(p for p in input_path.glob("*.json") if p.is_file())


def get_nested(data: Dict[str, Any], path: Sequence[str]) -> Any:
    current: Any = data
    for key in path:
        if not isinstance(current, dict) or key not in current:
            return None
        current = current[key]
    return current


def is_non_empty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def expected_prefix(brand_slug: str) -> str:
    return f"/images/brands/{brand_slug}/"


def validate_asset_path(path_value: Any, brand_slug: str, errors: List[str], label: str) -> None:
    if not is_non_empty_string(path_value):
        errors.append(f"{label} must be a non-empty string.")
        return
    if not str(path_value).startswith(expected_prefix(brand_slug)):
        errors.append(
            f"{label} should start with '{expected_prefix(brand_slug)}' but got '{path_value}'."
        )


def validate_models(models: Dict[str, Any], brand_slug: str, errors: List[str]) -> None:
    cards = models.get("cards")
    if not isinstance(cards, list) or not cards:
        errors.append("sections.models.cards must contain at least one model card.")
        return

    for index, card in enumerate(cards, start=1):
        label = f"sections.models.cards[{index}]"
        for key in ("h3", "slug", "subtitle", "priceRange", "cta", "image"):
            if not is_non_empty_string(card.get(key)):
                errors.append(f"{label}.{key} must be a non-empty string.")
        image = card.get("image")
        if isinstance(image, str):
            expected = f"/images/brands/{brand_slug}/models/"
            if not image.startswith(expected):
                errors.append(f"{label}.image should live under '{expected}'.")


def validate_how_it_works(section: Dict[str, Any], errors: List[str]) -> None:
    cards = section.get("cards")
    if not isinstance(cards, list) or len(cards) != 3:
        errors.append("sections.howItWorks.cards should contain exactly 3 cards.")
        return

    for index, card in enumerate(cards, start=1):
        label = f"sections.howItWorks.cards[{index}]"
        if not isinstance(card.get("number"), int):
            errors.append(f"{label}.number must be an integer.")
        if not is_non_empty_string(card.get("icon")):
            errors.append(f"{label}.icon must be a non-empty string.")
        front = card.get("front", {})
        back = card.get("back", {})
        if not is_non_empty_string(front.get("h3")) or not is_non_empty_string(front.get("text")):
            errors.append(f"{label}.front must include non-empty h3 and text.")
        if not is_non_empty_string(back.get("heading")) or not is_non_empty_string(back.get("text")):
            errors.append(f"{label}.back must include non-empty heading and text.")
        bullets = back.get("bullets")
        if not isinstance(bullets, list) or not bullets:
            errors.append(f"{label}.back.bullets must contain at least one item.")


def validate_live_market(section: Dict[str, Any], warnings: List[str], errors: List[str]) -> None:
    feed = section.get("feed", {})
    columns = feed.get("columns")
    expected_columns = [
        "Year",
        "Model",
        "Engine Code",
        "Fuel",
        "Avg. Quoted Price",
        "Reported Issue",
    ]
    if columns != expected_columns:
        errors.append("sections.liveMarketPrices.feed.columns does not match the expected app columns.")
    if feed.get("density") not in ("standard", "premium"):
        errors.append("sections.liveMarketPrices.feed.density must be 'standard' or 'premium'.")
    if not isinstance(feed.get("visibleRows"), int):
        errors.append("sections.liveMarketPrices.feed.visibleRows must be an integer.")
    entries = feed.get("entries")
    if not isinstance(entries, list):
        errors.append("sections.liveMarketPrices.feed.entries must be a list.")
    elif not entries:
        warnings.append(
            "sections.liveMarketPrices.feed.entries is empty. This is okay if live feed rows are added separately."
        )


def validate_engine_codes(section: Dict[str, Any], warnings: List[str], errors: List[str]) -> None:
    groups = section.get("groups")
    if not isinstance(groups, list) or not groups:
        errors.append("sections.engineCodes.groups must contain at least one engine family group.")
        return

    for group_index, group in enumerate(groups, start=1):
        group_label = f"sections.engineCodes.groups[{group_index}]"
        for key in ("name", "era", "failureNote"):
            if not is_non_empty_string(group.get(key)):
                errors.append(f"{group_label}.{key} must be a non-empty string.")
        engines = group.get("engines")
        if not isinstance(engines, list) or not engines:
            warnings.append(f"{group_label}.engines is empty.")
            continue
        for engine_index, engine in enumerate(engines, start=1):
            label = f"{group_label}.engines[{engine_index}]"
            for key in ("code", "fuel", "size", "power", "compatibleModels", "avgRebuiltPrice", "cta"):
                if not is_non_empty_string(engine.get(key)):
                    errors.append(f"{label}.{key} must be a non-empty string.")


def validate_common_problems(section: Dict[str, Any], brand_slug: str, errors: List[str]) -> None:
    problems = section.get("problems")
    if not isinstance(problems, list) or not problems:
        errors.append("sections.commonProblems.problems must contain at least one problem item.")
        return

    for index, item in enumerate(problems, start=1):
        label = f"sections.commonProblems.problems[{index}]"
        for key in ("group", "h4", "affectedModels", "typicalFailureMileage", "rootCause", "recommendation", "cta"):
            if not is_non_empty_string(item.get(key)):
                errors.append(f"{label}.{key} must be a non-empty string.")
        image = item.get("image")
        if image is not None:
            validate_asset_path(image, brand_slug, errors, f"{label}.image")


def validate_simple_list_section(
    section: Dict[str, Any],
    section_name: str,
    list_key: str,
    required_item_keys: Sequence[str],
    errors: List[str],
) -> None:
    items = section.get(list_key)
    if not isinstance(items, list) or not items:
        errors.append(f"sections.{section_name}.{list_key} must contain at least one item.")
        return
    for index, item in enumerate(items, start=1):
        label = f"sections.{section_name}.{list_key}[{index}]"
        for key in required_item_keys:
            if not is_non_empty_string(item.get(key)):
                errors.append(f"{label}.{key} must be a non-empty string.")


def validate_engine_sizes(section: Dict[str, Any], errors: List[str]) -> None:
    groups = section.get("groups")
    if not isinstance(groups, list) or not groups:
        errors.append("sections.engineSizes.groups must contain at least one group.")
        return
    for index, group in enumerate(groups, start=1):
        label = f"sections.engineSizes.groups[{index}]"
        if not is_non_empty_string(group.get("title")):
            errors.append(f"{label}.title must be a non-empty string.")
        items = group.get("items")
        if not isinstance(items, list) or not items:
            errors.append(f"{label}.items must contain at least one item.")
            continue
        for item_index, item in enumerate(items, start=1):
            item_label = f"{label}.items[{item_index}]"
            for key in ("title", "description", "cta"):
                if not is_non_empty_string(item.get(key)):
                    errors.append(f"{item_label}.{key} must be a non-empty string.")


def validate_engine_code_directory(section: Dict[str, Any], brand_slug: str, warnings: List[str], errors: List[str]) -> None:
    families = section.get("families")
    if not isinstance(families, list) or not families:
        errors.append("sections.engineCodeDirectory.families must contain at least one family.")
    else:
        for family_index, family in enumerate(families, start=1):
            family_label = f"sections.engineCodeDirectory.families[{family_index}]"
            if not is_non_empty_string(family.get("name")):
                errors.append(f"{family_label}.name must be a non-empty string.")
            entries = family.get("entries")
            if not isinstance(entries, list) or not entries:
                errors.append(f"{family_label}.entries must contain at least one entry.")
                continue
            for entry_index, entry in enumerate(entries, start=1):
                entry_label = f"{family_label}.entries[{entry_index}]"
                for key in ("title", "description", "cta"):
                    if not is_non_empty_string(entry.get(key)):
                        errors.append(f"{entry_label}.{key} must be a non-empty string.")
                if entry.get("image") is not None:
                    validate_asset_path(entry.get("image"), brand_slug, errors, f"{entry_label}.image")

    directory = section.get("directory", {})
    for key in ("h3", "label", "intro"):
        if not is_non_empty_string(directory.get(key)):
            errors.append(f"sections.engineCodeDirectory.directory.{key} must be a non-empty string.")
    codes = directory.get("codes")
    if not isinstance(codes, list):
        errors.append("sections.engineCodeDirectory.directory.codes must be a list.")
    elif not codes:
        warnings.append(
            "sections.engineCodeDirectory.directory.codes is empty. This is okay if the document only had a placeholder list."
        )


def validate_engine_years(section: Dict[str, Any], errors: List[str]) -> None:
    years = section.get("years")
    if not isinstance(years, list) or not years:
        errors.append("sections.engineYears.years must contain at least one year block.")
        return
    for index, item in enumerate(years, start=1):
        label = f"sections.engineYears.years[{index}]"
        for key in ("year", "preview", "description", "cta"):
            if not is_non_empty_string(item.get(key)):
                errors.append(f"{label}.{key} must be a non-empty string.")


def validate_faq(section: Dict[str, Any], errors: List[str]) -> None:
    items = section.get("items")
    if not isinstance(items, list) or not items:
        errors.append("sections.faq.items must contain at least one FAQ item.")
        return
    for index, item in enumerate(items, start=1):
        label = f"sections.faq.items[{index}]"
        for key in ("question", "answer", "cta"):
            if not is_non_empty_string(item.get(key)):
                errors.append(f"{label}.{key} must be a non-empty string.")


def validate_brand_file(path: Path) -> Tuple[List[str], List[str]]:
    data = load_json(path)
    errors: List[str] = []
    warnings: List[str] = []

    for key in ("brand", "seo", "assets", "sections"):
        if key not in data or not isinstance(data[key], dict):
            errors.append(f"Top-level '{key}' object is missing.")

    if errors:
        return errors, warnings

    brand = data["brand"]
    brand_name = brand.get("name")
    brand_slug = brand.get("slug")
    if not is_non_empty_string(brand_name):
        errors.append("brand.name must be a non-empty string.")
    if not is_non_empty_string(brand_slug):
        errors.append("brand.slug must be a non-empty string.")
        brand_slug = "unknown-brand"

    seo = data["seo"]
    for key in ("title", "description", "canonical"):
        if not is_non_empty_string(seo.get(key)):
            errors.append(f"seo.{key} must be a non-empty string.")

    assets = data["assets"]
    for key in REQUIRED_ASSET_KEYS:
        validate_asset_path(assets.get(key), str(brand_slug), errors, f"assets.{key}")
    for key, value in assets.items():
        if value is not None:
            validate_asset_path(value, str(brand_slug), errors, f"assets.{key}")

    sections = data["sections"]
    for section_name in REQUIRED_SECTIONS:
        if section_name not in sections or not isinstance(sections[section_name], dict):
            errors.append(f"sections.{section_name} is missing or not an object.")

    if errors:
        return errors, warnings

    hero = sections["hero"]
    for key in ("tag", "h1", "subheading", "ctaLinkText", "supportingText", "ticker"):
        if not is_non_empty_string(hero.get(key)):
            errors.append(f"sections.hero.{key} must be a non-empty string.")
    trust_badges = hero.get("trustBadges")
    if not isinstance(trust_badges, list) or len(trust_badges) < 3:
        errors.append("sections.hero.trustBadges should contain at least 3 items.")
    form = hero.get("form", {})
    for key in ("heading", "subtitle", "inputPlaceholder", "buttonText", "note"):
        if not is_non_empty_string(form.get(key)):
            errors.append(f"sections.hero.form.{key} must be a non-empty string.")

    validate_how_it_works(sections["howItWorks"], errors)
    validate_live_market(sections["liveMarketPrices"], warnings, errors)

    reviews = sections["reviews"]
    if not is_non_empty_string(reviews.get("tag")) or not is_non_empty_string(reviews.get("h2")):
        errors.append("sections.reviews.tag and sections.reviews.h2 must be non-empty strings.")
    rating = reviews.get("rating", {})
    if not isinstance(rating.get("value"), (int, float)):
        errors.append("sections.reviews.rating.value must be numeric.")
    if not isinstance(rating.get("count"), int):
        errors.append("sections.reviews.rating.count must be an integer.")
    review_items = reviews.get("reviews")
    if not isinstance(review_items, list) or not review_items:
        errors.append("sections.reviews.reviews must contain at least one review.")

    validate_models(sections["models"], str(brand_slug), errors)
    validate_engine_codes(sections["engineCodes"], warnings, errors)
    validate_common_problems(sections["commonProblems"], str(brand_slug), errors)
    validate_simple_list_section(sections["engineTypes"], "engineTypes", "types", ("title", "description", "priceRange", "cta"), errors)
    validate_engine_sizes(sections["engineSizes"], errors)
    validate_simple_list_section(sections["fuelTypes"], "fuelTypes", "items", ("title", "description", "cta"), errors)
    validate_engine_code_directory(sections["engineCodeDirectory"], str(brand_slug), warnings, errors)
    validate_engine_years(sections["engineYears"], errors)
    validate_faq(sections["faq"], errors)

    trust = sections["trustCta"]
    for key in ("tag", "h2", "intro", "finalText", "buttonText"):
        if not is_non_empty_string(trust.get(key)):
            errors.append(f"sections.trustCta.{key} must be a non-empty string.")
    points = trust.get("points")
    if not isinstance(points, list) or not points:
        errors.append("sections.trustCta.points must contain at least one trust point.")

    return errors, warnings


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Validate one brand JSON file or every brand JSON file in a folder."
    )
    parser.add_argument(
        "input",
        nargs="?",
        default=str(default_input_dir()),
        help="Path to a JSON file or folder of JSON files. Defaults to data/brands/_generated.",
    )
    args = parser.parse_args(argv)

    input_path = Path(args.input)
    files = resolve_inputs(input_path)
    if not files:
        print(f"No .json files found in: {input_path}", file=sys.stderr)
        return 1

    failing = 0
    total_warnings = 0

    for file_path in files:
        errors, warnings = validate_brand_file(file_path)
        total_warnings += len(warnings)

        if errors:
            failing += 1
            print(f"\nFAIL: {file_path.name}")
            for error in errors:
                print(f"  ERROR: {error}")
        else:
            print(f"PASS: {file_path.name}")

        for warning in warnings:
            print(f"  WARN: {warning}")

    print(
        f"\nChecked {len(files)} file(s). "
        f"{len(files) - failing} passed, {failing} failed, {total_warnings} warning(s)."
    )
    return 1 if failing else 0


if __name__ == "__main__":
    raise SystemExit(main())
