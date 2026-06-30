#!/usr/bin/env python3
"""Sync model liveMarketPrices images from parent brand JSON files."""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BRANDS_DIR = ROOT / "data" / "brands"
MODELS_DIR = ROOT / "data" / "models"
MARKER = " replacement engines UK"


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def dump_json(path: Path, data: dict) -> None:
    try:
        git_style = subprocess.run(
            ["git", "show", f"HEAD:{path.relative_to(ROOT).as_posix()}"],
            cwd=ROOT,
            check=False,
            capture_output=True,
        )
    except Exception:
        git_style = None

    if git_style and git_style.returncode == 0:
        newline_count = git_style.stdout.count(b"\n")
    else:
        original = path.read_text(encoding="utf-8-sig")
        newline_count = original.count("\n")

    payload = json.dumps(data, indent=2, ensure_ascii=False)
    if newline_count > 1:
        path.write_text(f"{payload}\n", encoding="utf-8")
    else:
        path.write_text(
            f"{json.dumps(data, ensure_ascii=False, separators=(', ', ': '))}\n",
            encoding="utf-8",
        )


def build_model_alt(model_name: str, brand_alt: str) -> str:
    if not brand_alt:
        return f"{model_name} live market price reference"

    marker_index = brand_alt.find(MARKER)
    if marker_index != -1:
        return model_name + brand_alt[marker_index:]

    return f"{model_name} – {brand_alt}"


def load_brand_assets() -> dict[str, dict[str, str]]:
    assets: dict[str, dict[str, str]] = {}
    for brand_file in sorted(BRANDS_DIR.glob("*.json")):
        data = read_json(brand_file)
        brand_slug = data.get("brand", {}).get("slug")
        live = data.get("sections", {}).get("liveMarketPrices", {})
        image_src = live.get("imageSrc", "")
        image_alt = live.get("imageAlt", "")
        if brand_slug and image_src:
            assets[brand_slug] = {
                "imageSrc": image_src,
                "imageAlt": image_alt,
            }
    return assets


def model_json_files() -> list[Path]:
    return sorted(
        path
        for path in MODELS_DIR.glob("*.json")
        if not path.name.startswith("_")
    )


def sync_models() -> dict[str, int | list[str]]:
    brand_assets = load_brand_assets()
    updated = 0
    skipped = 0
    missing_brand: list[str] = []

    for model_file in model_json_files():
        data = read_json(model_file)
        brand = data.get("brand", {})
        model = data.get("model", {})
        brand_slug = brand.get("slug")
        model_name = model.get("name", "")

        if not brand_slug or not model_name:
            skipped += 1
            continue

        brand_live = brand_assets.get(brand_slug)
        if not brand_live:
            missing_brand.append(f"{model_file.name} ({brand_slug})")
            skipped += 1
            continue

        live = data.setdefault("sections", {}).setdefault("liveMarketPrices", {})
        live["imageSrc"] = brand_live["imageSrc"]
        live["imageAlt"] = build_model_alt(model_name, brand_live.get("imageAlt", ""))

        dump_json(model_file, data)
        updated += 1

    return {
        "updated": updated,
        "skipped": skipped,
        "missing_brand": missing_brand,
        "brands_loaded": len(brand_assets),
    }


def main() -> None:
    stats = sync_models()
    print(json.dumps(stats, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
