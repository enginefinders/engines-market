#!/usr/bin/env python3
"""
Batch-friendly wrapper around the stronger model markdown extractor.

Why this exists:
- `extract_model_markdown.py` already has the more reliable parsing logic for the
  model docs you are using.
- This wrapper keeps the simpler workflow:
    py -3 scripts/extract_model_pages.py --input <file-or-folder> --output <file-or-folder> --brand BMW

What it improves over the older script:
- Better section boundary detection
- Correct `How It Works` front/flip parsing
- Better engine-years extraction without leaking content from adjacent sections
- Optional shared brand JSON seeding for repeated content like reviews / CTA / assets
- Safer output naming using the real model slug logic (`BMW 2 Series` -> `series-2`)
"""

from __future__ import annotations

import argparse
import copy
import json
import re
import sys
from pathlib import Path
from typing import Any

from extract_model_markdown import (
    configure_stdio,
    infer_context,
    infer_model_slug_from_name,
    inject_model_ui_defaults,
    load_json,
    parse_document,
    read_lines,
    slugify,
)


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_EXTENSIONS = {".txt", ".md", ".markdown"}


def derive_model_name_from_file(path: Path, brand_name: str) -> str:
    stem = path.stem.strip()
    if re.match(rf"^{re.escape(brand_name)}\s+", stem, flags=re.IGNORECASE):
        return stem
    return f"{brand_name} {stem}".strip()


def resolve_brand_json_path(args: argparse.Namespace) -> Path | None:
    if args.brand_json:
        path = Path(args.brand_json)
        if not path.is_file():
            raise SystemExit(f"Brand JSON not found: {path}")
        return path

    if not args.brand:
        return None

    candidate = REPO_ROOT / "data" / "brands" / f"{slugify(args.brand)}.json"
    return candidate if candidate.is_file() else None


def collect_source_files(input_path: Path) -> list[Path]:
    if input_path.is_file():
        return [input_path]

    if not input_path.is_dir():
        raise SystemExit(f"Input path not found: {input_path}")

    return sorted(
        path
        for path in input_path.iterdir()
        if path.is_file() and path.suffix.lower() in DEFAULT_EXTENSIONS
    )


def build_output_path(
    source_path: Path,
    output_path: Path,
    model_slug: str,
    single_input: bool,
) -> Path:
    if single_input and output_path.suffix.lower() == ".json":
        return output_path

    output_path.mkdir(parents=True, exist_ok=True)
    return output_path / f"{model_slug}.json"


def extract_one(
    source_path: Path,
    args: argparse.Namespace,
    brand_json: dict[str, Any] | None,
    output_path: Path,
) -> tuple[str, list[str]]:
    lines = read_lines(source_path)

    per_file_args = copy.deepcopy(args)
    per_file_args.brand_name = per_file_args.brand
    if not per_file_args.model_name:
        per_file_args.model_name = derive_model_name_from_file(source_path, per_file_args.brand)
    if not per_file_args.model_slug and per_file_args.model_name:
        per_file_args.model_slug = infer_model_slug_from_name(per_file_args.model_name)

    brand_name, brand_slug, model_name, model_slug, legacy_slug = infer_context(
        lines,
        per_file_args,
        brand_json,
    )

    existing_output: dict[str, Any] | None = None
    if args.merge_existing and output_path.is_file():
        try:
            existing_output = json.loads(output_path.read_text(encoding="utf-8"))
        except Exception:
            existing_output = None

    data, warnings = parse_document(
        lines=lines,
        brand_name=brand_name,
        brand_slug=brand_slug,
        model_name=model_name,
        model_slug=model_slug,
        legacy_slug=legacy_slug,
        brand_json=brand_json,
        hero_image=per_file_args.hero_image,
        cta_image=per_file_args.cta_image,
    )
    data = inject_model_ui_defaults(data)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2 if args.pretty else None) + "\n",
        encoding="utf-8",
    )

    return output_path.name, warnings


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extract model-page JSON from structured txt/markdown docs using the stronger parser."
    )
    parser.add_argument(
        "--input",
        "-i",
        required=True,
        help="One source file or a folder of source files.",
    )
    parser.add_argument(
        "--output",
        "-o",
        required=True,
        help="For one file: output .json path or output folder. For a folder: output folder.",
    )
    parser.add_argument(
        "--brand",
        "-b",
        required=True,
        help="Brand display name, e.g. BMW or Land Rover.",
    )
    parser.add_argument("--brand-slug", help="Optional brand route slug, e.g. bmw or land-rover.")
    parser.add_argument("--brand-json", help="Optional brand JSON path. If omitted, tries data/brands/<brand-slug>.json.")
    parser.add_argument("--model-name", help="Optional explicit model name for single-file mode.")
    parser.add_argument("--model-slug", help="Optional explicit canonical slug for single-file mode.")
    parser.add_argument("--legacy-slug", help="Optional explicit legacy slug for single-file mode.")
    parser.add_argument("--hero-image", help="Optional hero image path override.")
    parser.add_argument("--cta-image", help="Optional CTA image path override.")
    parser.add_argument(
        "--merge-existing",
        action="store_true",
        help="Merge into an existing output JSON file instead of overwriting with the fresh extraction.",
    )
    parser.add_argument("--pretty", action="store_true", help="Pretty-print the output JSON.")
    return parser.parse_args()


def main() -> int:
    configure_stdio()
    args = parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)
    source_files = collect_source_files(input_path)
    if not source_files:
        raise SystemExit(f"No matching source files found in: {input_path}")

    brand_json_path = resolve_brand_json_path(args)
    brand_json = load_json(str(brand_json_path)) if brand_json_path else None

    single_input = input_path.is_file()
    if not single_input and output_path.suffix.lower() == ".json":
        raise SystemExit("When --input is a folder, --output must be a folder, not a .json file.")

    warning_report: dict[str, list[str]] = {}

    for source_file in source_files:
        model_name = args.model_name or derive_model_name_from_file(source_file, args.brand)
        model_slug = args.model_slug or infer_model_slug_from_name(model_name)
        final_output_path = build_output_path(source_file, output_path, model_slug, single_input)

        output_name, warnings = extract_one(
            source_path=source_file,
            args=args,
            brand_json=brand_json,
            output_path=final_output_path,
        )
        warning_report[output_name] = warnings

        print(f"OK {source_file.name} -> {final_output_path}")
        if warnings:
            print(f"   warnings: {len(warnings)}")
            for warning in warnings[:15]:
                print(f"   - {warning}")
            if len(warnings) > 15:
                print(f"   ... {len(warnings) - 15} more")

    if warning_report:
        warning_path = (output_path if output_path.is_dir() or not single_input else output_path.parent) / "_model_extraction_warnings.json"
        warning_path.write_text(
            json.dumps(warning_report, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"\nWarnings report: {warning_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
