#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path


SECTION_6_RE = re.compile(r"^\s*6(?:\s*\(Revised\))?\s*:\s*Engine Problems\s*$", re.IGNORECASE)
SECTION_7_RE = re.compile(r"^\s*7(?:\s*\(Revised\))?\s*:\s*Engine Types\s*$", re.IGNORECASE)
CTA_BUTTON_RE = re.compile(r"^\s*CTA Button:\s*", re.IGNORECASE)
FINAL_H4_RE = re.compile(r"^\s*H4:\s*Don't Let Engine Failure Write Off Your\s+", re.IGNORECASE)


def build_block(model_name: str) -> list[str]:
    return [
        f"H4: Don't Let Engine Failure Write Off Your {model_name}",
        "",
        "",
        f"Paragraph: Engine problems in the {model_name} are rarely isolated to a single cheap part, and ignoring early symptoms quickly turns a manageable repair into a total engine loss. Whether you are dealing with timing chain degradation, EGR cracking, cooling system weaknesses, or other model-specific failure points, EngineMarket connects you directly with vetted UK {model_name} specialists who provide transparent, comparable pricing for both targeted repairs and complete {model_name} engine replacement. Every rebuilt unit includes upgraded components that eliminate known weak points, comes with a minimum 12-month unlimited mileage warranty, and is delivered nationwide with full supply & fit options. Stop guessing with main dealer quotes - compare prices from certified specialists and secure a reliable, warranty-backed solution today.",
        "",
        "",
        f"CTA Button: Compare {model_name} Engine Replacement Prices Now →",
        "",
        "",
        "Disclaimer:",
        f"All prices are indicative UK market ranges based on historical quote data and repair requests from our network of engine specialists. Dealer pricing is estimated based on published main dealer labour rates and genuine OEM parts pricing. Specialist pricing reflects actual quote data from EngineMarket's UK network. Actual costs vary depending on damage severity, vehicle condition, variant, and workshop location within the UK. Use our free comparison tool to get tailored quotes for your specific {model_name} and engine code. Every engine supplied through EngineMarket carries a minimum 12-month unlimited mileage warranty - always confirm exact terms with your chosen supplier.",
        "",
        "",
        "",
        "",
    ]


def fix_doc(path: Path) -> bool:
    lines = path.read_text(encoding="utf-8").splitlines()

    section_6 = next((i for i, line in enumerate(lines) if SECTION_6_RE.match(line)), None)
    section_7 = next((i for i, line in enumerate(lines) if SECTION_7_RE.match(line)), None)
    if section_6 is None or section_7 is None or section_7 <= section_6:
        return False

    section_lines = lines[section_6:section_7]
    if any(CTA_BUTTON_RE.match(line) for line in section_lines) and any(FINAL_H4_RE.match(line) for line in section_lines):
        return False

    model_name = path.stem.strip()
    insert_at = section_7
    block = build_block(model_name)
    updated = lines[:insert_at] + block + lines[insert_at:]
    path.write_text("\n".join(updated) + "\n", encoding="utf-8")
    return True


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: fill_bmw_common_problems_cta.py <folder>")
        return 1

    root = Path(sys.argv[1])
    if not root.is_dir():
        print(f"Folder not found: {root}")
        return 1

    changed = []
    for path in sorted(root.glob("BMW*.txt")):
        if fix_doc(path):
            changed.append(path.name)

    for name in changed:
        print(f"UPDATED {name}")

    print(f"Total updated: {len(changed)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
