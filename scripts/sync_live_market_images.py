from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path
import re

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
BRANDS_DIR = ROOT / "data" / "brands"
IMAGE_EXTENSIONS = (".webp", ".png", ".jpg", ".jpeg")


def normalize_slug(value: str) -> str:
    return re.sub(r"^-+|-+$", "", re.sub(r"[^a-z0-9]+", "-", value.lower().replace("&", "and")))


def read_json(file_path: Path):
    return json.loads(file_path.read_text(encoding="utf-8-sig"))


def dump_json(file_path: Path, data) -> None:
    try:
        git_style = subprocess.run(
            ["git", "show", f"HEAD:{file_path.relative_to(ROOT).as_posix()}"],
            cwd=ROOT,
            check=False,
            capture_output=True,
        )
    except Exception:
        git_style = None

    if git_style and git_style.returncode == 0:
        newline_count = git_style.stdout.count(b"\n")
    else:
        original = file_path.read_text(encoding="utf-8-sig")
        newline_count = original.count("\n")

    if newline_count > 1:
        file_path.write_text(f"{json.dumps(data, indent=2, ensure_ascii=False)}\n", encoding="utf-8")
    else:
        file_path.write_text(f"{json.dumps(data, ensure_ascii=False, separators=(', ', ': '))}\n", encoding="utf-8")


def public_path_to_file(asset_path: str) -> Path:
    return PUBLIC_DIR / asset_path.lstrip("/").replace("/", "\\")


def first_existing_asset(candidates: list[str | None]) -> str | None:
    for candidate in candidates:
        if not candidate:
            continue
        candidate_file = public_path_to_file(candidate)
        if candidate_file.exists():
            return candidate
    return None


def ensure_webp_placeholder(source_asset: str, target_asset: str) -> None:
    source_file = public_path_to_file(source_asset)
    target_file = public_path_to_file(target_asset)
    if not source_file.exists():
        return

    target_file.parent.mkdir(parents=True, exist_ok=True)
    if source_file.resolve() == target_file.resolve():
        return

    if target_file.exists():
        return

    if source_file.suffix.lower() == ".webp":
        shutil.copy2(source_file, target_file)
        return

    with Image.open(source_file) as image:
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA")
        image.save(target_file, format="WEBP", quality=92, method=6)


def brand_live_feed_target(brand_slug: str) -> str:
    return f"/images/brands/{brand_slug}/brand/live-feed-{brand_slug}.webp"


def model_slug_candidates(data: dict) -> list[str]:
    brand_name = data["brand"]["name"]
    model_slug = normalize_slug(data["model"]["slug"])
    raw_name = re.sub(rf"^{re.escape(brand_name)}\s+", "", data["model"]["name"], flags=re.IGNORECASE).strip()
    candidates: list[str] = []

    for value in (model_slug, normalize_slug(raw_name), normalize_slug(data["model"].get("legacySlug", ""))):
        if value and value not in candidates:
            candidates.append(value)

    for value in list(candidates):
        series_match = re.match(r"^series-(\d+)$", value)
        if series_match:
            reverse = f"{series_match.group(1)}-series"
            if reverse not in candidates:
                candidates.append(reverse)

        reverse_match = re.match(r"^(\d+)-series$", value)
        if reverse_match:
            series = f"series-{reverse_match.group(1)}"
            if series not in candidates:
                candidates.append(series)

    return candidates


def model_live_feed_target(brand_slug: str, image_slug: str) -> str:
    return f"/images/brands/{brand_slug}/models/live-feed-{brand_slug}-{image_slug}.webp"


def tracked_model_json_files() -> list[Path]:
    result = subprocess.run(
        ["git", "ls-files", "data/models"],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    files: list[Path] = []
    for line in result.stdout.splitlines():
        if not line.endswith(".json"):
            continue
        file_path = ROOT / line
        if file_path.name.startswith("_"):
            continue
        files.append(file_path)
    return sorted(files)


def brand_source_candidates(data: dict, brand_slug: str, target_asset: str) -> list[str | None]:
    model_cards = data.get("sections", {}).get("models", {}).get("cards", [])

    return [
        data.get("sections", {}).get("liveMarketPrices", {}).get("imageSrc"),
        target_asset,
        *[f"/images/brands/{brand_slug}/brand/{brand_slug}-live-market-bg{extension}" for extension in IMAGE_EXTENSIONS],
        *[f"/images/brands/{brand_slug}/brand/{brand_slug}-hero-bg{extension}" for extension in IMAGE_EXTENSIONS],
        data.get("assets", {}).get("heroBg"),
        model_cards[0].get("image") if model_cards else None,
    ]


def model_source_candidates(data: dict, brand_slug: str, image_slug: str, target_asset: str) -> list[str | None]:
    assets = data.get("assets", {})
    return [
        data.get("sections", {}).get("liveMarketPrices", {}).get("imageSrc"),
        target_asset,
        assets.get("mainImage"),
        assets.get("smallImage"),
        assets.get("heroBg"),
        assets.get("ctaImage"),
        f"/images/brands/{brand_slug}/models/{brand_slug}-{image_slug}-main.webp",
        f"/images/brands/{brand_slug}/models/{brand_slug}-{image_slug}-small.webp",
        *[f"/images/brands/{brand_slug}/models/{brand_slug}-{image_slug}-model-card{extension}" for extension in IMAGE_EXTENSIONS],
    ]


def sync_brand_files() -> dict[str, int]:
    created = 0
    updated = 0

    for brand_file in sorted(BRANDS_DIR.glob("*.json")):
        data = read_json(brand_file)
        brand_slug = data["brand"]["slug"]
        target_asset = brand_live_feed_target(brand_slug)
        source_asset = first_existing_asset(brand_source_candidates(data, brand_slug, target_asset))
        if source_asset:
            target_file = public_path_to_file(target_asset)
            existed_before = target_file.exists()
            ensure_webp_placeholder(source_asset, target_asset)
            if target_file.exists() and not existed_before:
                created += 1

        data.setdefault("sections", {}).setdefault("liveMarketPrices", {})["imageSrc"] = (
            target_asset if public_path_to_file(target_asset).exists() else (source_asset or target_asset)
        )
        dump_json(brand_file, data)
        updated += 1

    return {"created": created, "updated": updated}


def sync_model_files() -> dict[str, int]:
    created = 0
    updated = 0
    skipped = 0

    for model_file in tracked_model_json_files():
        data = read_json(model_file)
        if not isinstance(data, dict) or "brand" not in data or "model" not in data:
            skipped += 1
            continue
        brand_slug = data["brand"]["slug"]
        slug_candidates = model_slug_candidates(data)
        image_slug = slug_candidates[0] if slug_candidates else normalize_slug(data["model"]["slug"])
        target_asset = model_live_feed_target(brand_slug, image_slug)
        source_asset = first_existing_asset(model_source_candidates(data, brand_slug, image_slug, target_asset))
        if source_asset:
            target_file = public_path_to_file(target_asset)
            existed_before = target_file.exists()
            ensure_webp_placeholder(source_asset, target_asset)
            if target_file.exists() and not existed_before:
                created += 1

        data.setdefault("sections", {}).setdefault("liveMarketPrices", {})["imageSrc"] = (
            target_asset if public_path_to_file(target_asset).exists() else (source_asset or target_asset)
        )
        dump_json(model_file, data)
        updated += 1

    return {"created": created, "updated": updated, "skipped": skipped}


def main() -> None:
    brand_stats = sync_brand_files()
    model_stats = sync_model_files()
    print(
        json.dumps(
            {
                "brand_live_feed_pattern": "/images/brands/{brand}/brand/live-feed-{brand}.webp",
                "model_live_feed_pattern": "/images/brands/{brand}/models/live-feed-{brand}-{model}.webp",
                "brands": brand_stats,
                "models": model_stats,
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
