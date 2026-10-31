"""Build an ordered, preview-only data layer from the existing static-page JSON.

This script does not modify public HTML or the existing data/static-pages files.
It creates data/static-pages-dynamic, which is disposable and consumed only by
the preview loader.
"""

from __future__ import annotations

import copy
import json
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "data" / "static-pages"
OUTPUT_ROOT = ROOT / "data" / "static-pages-dynamic"


def is_about_root(page: dict) -> bool:
    return page.get("contentType") == "about" and page.get("route") == "/about"


def ordered_sections(page: dict) -> list[dict]:
    sections = page.get("sections", {})
    ordered: list[dict] = []
    for bucket_name, bucket in sections.items():
        if bucket_name in {"hero", "supplemental"} or not isinstance(bucket, dict):
            continue
        items = bucket.get("items")
        if not isinstance(items, list):
            # Legacy About/Contact records use direct section objects with
            # `content` instead of the normalized family `items` container.
            items = [bucket] if bucket.get("content") or bucket.get("blocks") or bucket.get("title") else []
        for item in items:
            source = item.get("source", {})
            ordered.append({
                "id": item.get("id") or source.get("sectionId") or bucket_name,
                "title": item.get("title", ""),
                "description": item.get("description"),
                "blocks": copy.deepcopy(item.get("blocks", item.get("content", []))),
                "links": copy.deepcopy(item.get("links", [])),
                "source": {
                    "sectionId": source.get("sectionId", item.get("id", bucket_name)),
                    "order": source.get("order", len(ordered)),
                },
            })
    ordered.sort(key=lambda item: (item["source"]["order"], item["id"]))
    return ordered


def build_page(page: dict) -> dict:
    result = copy.deepcopy(page)
    if is_about_root(page):
        # About Us has an intentionally custom data contract and existing renderer.
        return result

    sections = result.get("sections", {})
    result["schemaVersion"] = 3
    result["sections"] = {
        "hero": copy.deepcopy(sections.get("hero", {})),
        "ordered": ordered_sections(page),
        "supplemental": copy.deepcopy(sections.get("supplemental", {
            "media": [], "tables": [], "faqs": [], "forms": [], "links": [],
        })),
    }
    return result


def main() -> None:
    if OUTPUT_ROOT.exists():
        shutil.rmtree(OUTPUT_ROOT)
    OUTPUT_ROOT.mkdir(parents=True)
    count = 0
    for source_path in sorted(SOURCE_ROOT.rglob("*.json")):
        if source_path.name == "index.json":
            continue
        relative = source_path.relative_to(SOURCE_ROOT)
        destination = OUTPUT_ROOT / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        page = json.loads(source_path.read_text(encoding="utf-8"))
        destination.write_text(json.dumps(build_page(page), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        count += 1

    index = {
        "sourcePolicy": "Generated preview-only ordered data. Source HTML and source JSON are immutable inputs.",
        "totalPages": count,
    }
    (OUTPUT_ROOT / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"generated_pages={count}")
    print(f"output={OUTPUT_ROOT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
