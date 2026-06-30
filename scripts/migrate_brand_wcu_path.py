#!/usr/bin/env python3
"""Move brand-wcu assets under /images/brand-wcu and update all references."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD_DIR = ROOT / "public" / "brand-wcu"
NEW_DIR = ROOT / "public" / "images" / "brand-wcu"
OLD_PREFIX = "/images/brand-wcu/"
NEW_PREFIX = "/images/images/brand-wcu/"


def replace_in_text(text: str) -> str:
    return text.replace(OLD_PREFIX, NEW_PREFIX)


def migrate_files() -> int:
    if not OLD_DIR.exists():
        return 0

    NEW_DIR.mkdir(parents=True, exist_ok=True)
    moved = 0
    for src in OLD_DIR.glob("*.webp"):
        dest = NEW_DIR / src.name
        if dest.exists():
            dest.unlink()
        shutil.move(str(src), str(dest))
        moved += 1

    if OLD_DIR.exists() and not any(OLD_DIR.iterdir()):
        OLD_DIR.rmdir()

    return moved


def update_json_files() -> int:
    updated = 0
    for folder in (ROOT / "data" / "brands", ROOT / "data" / "models"):
        for path in folder.glob("*.json"):
            if path.name.startswith("_"):
                continue
            raw = path.read_text(encoding="utf-8")
            if OLD_PREFIX not in raw:
                continue
            path.write_text(replace_in_text(raw), encoding="utf-8")
            updated += 1
    return updated


def update_source_files() -> int:
    patterns = ("*.ts", "*.tsx", "*.js", "*.mjs", "*.py")
    updated = 0
    for pattern in patterns:
        for path in ROOT.rglob(pattern):
            if "node_modules" in path.parts or ".next" in path.parts:
                continue
            raw = path.read_text(encoding="utf-8")
            if OLD_PREFIX not in raw:
                continue
            path.write_text(replace_in_text(raw), encoding="utf-8")
            updated += 1
    return updated


def main() -> None:
    moved = migrate_files()
    json_updated = update_json_files()
    source_updated = update_source_files()
    print(
        json.dumps(
            {
                "moved_files": moved,
                "json_updated": json_updated,
                "source_updated": source_updated,
                "new_path": NEW_PREFIX,
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
