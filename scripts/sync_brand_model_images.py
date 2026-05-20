#!/usr/bin/env python3
"""
Copy brand model images from the source artwork folder into the app and update
brand JSON model-card image paths to point at the copied assets.

The source folders contain transparent model cutouts with inconsistent naming,
so this script uses brand-aware fuzzy matching and only updates cards when a
confident match is found.
"""

from __future__ import annotations

import json
import re
import shutil
from dataclasses import dataclass
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
BRANDS_DIR = REPO_ROOT / "data" / "brands"
PUBLIC_BRANDS_DIR = REPO_ROOT / "public" / "images" / "brands"
SOURCE_ROOT = REPO_ROOT.parent.parent / "Downloads" / "!BG Removed (No Logo)"

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp"}

BRAND_SOURCE_FOLDERS = {
    "alfa-romeo": "Alpha Romeo",
    "aston-martin": "Aston Martin",
    "audi": "Audi",
    "bentley": "Bentley",
    "bmw": "BMW",
    "cadillac": "Cadillac",
    "chevrolet": "Chevrolet",
    "citroen": "Citroen",
    "dodge": "Dodge",
    "ferrari": "Ferrari",
    "fiat": "Fiat",
    "ford": "Ford",
    "honda": "Honda",
    "hyundai": "Hyundai",
    "jaguar": "Jaguar",
    "jeep": "Jeep",
    "kia": "KIA",
    "land-rover": "Land Rover",
    "lexus": "Lexus",
    "mazda": "Mazda",
    "mercedes-benz": "Mercedes",
    "mg": "MG",
    "mini": "Mini",
    "mitsubishi": "Mitsubishi",
    "nissan": "Nissan Final",
    "peugeot": "Peugeot",
    "porsche": "Porsche",
    "range-rover": "Range Rover",
    "renault": "Renault",
    "rolls-royce": "Rolls Royce",
    "seat": "Seat",
    "skoda": "Skoda",
    "subaru": "Subaru",
    "suzuki": "Suzuki",
    "toyota": "Toyota",
    "vauxhall": "Vauxhall",
    "volkswagen": "Volkswagen",
    "volvo": "Volvo",
}

ADDITIONAL_SOURCE_FOLDERS = {
    "land-rover": ["Range Rover"],
}

SPECIAL_ALIASES = {
    ("alfa-romeo", "giulietta"): ["giulita"],
    ("audi", "a1"): ["1"],
    ("audi", "a3"): ["3"],
    ("audi", "a4"): ["4"],
    ("bentley", "arnage-t"): ["arnage"],
    ("cadillac", "xx5"): ["xt5"],
    ("citroen", "zero-c-zero"): ["zero", "c zero"],
    ("ford", "ka-ka"): ["ka", "ka plus"],
    ("ford", "puma"): ["puma"],
    ("ford", "transit-custom"): ["transit custom", "transit"],
    ("jeep", "cherokee-engines-kl-and-previous-generations"): ["cherokee"],
    ("jeep", "comanche-engines-classic-pick-up"): ["comanche"],
    ("jeep", "commander-engines-xk"): ["commander"],
    ("jeep", "compass-engines-mp-and-previous"): ["compass"],
    ("jeep", "gladiator-engines-jt"): ["gladiator"],
    ("jeep", "grand-cherokee-engines-wk2-wl-zj-wj-wk"): ["grand cherokee"],
    ("jeep", "grand-wagoneer-engines-full-size-luxury"): ["grand wagoneer"],
    ("jeep", "liberty-engines-kj-kk-uk-market-as-cherokee"): ["liberty"],
    ("jeep", "patriot-engines-mk"): ["patriot"],
    ("jeep", "renegade-engines-bu"): ["renegade"],
    ("jeep", "wagoneer-engines-ws-luxury-full-size"): ["wagoneer"],
    ("jeep", "wrangler-engines-jl-jk-tj-yj-cj"): ["wrangler"],
    ("kia", "pro-ceed"): ["pro ceed", "ceed"],
    ("land-rover", "range-rover"): ["range rover"],
    ("lexus", "ct"): ["ct"],
    ("lexus", "es"): ["es"],
    ("lexus", "is"): ["is"],
    ("lexus", "lc"): ["lc"],
    ("lexus", "ls"): ["ls"],
    ("lexus", "lx"): ["lx"],
    ("lexus", "nx"): ["nx"],
    ("lexus", "rx"): ["rx"],
    ("lexus", "ux"): ["ux"],
    ("mercedes-benz", "amg-gt"): ["amg gt", "gt"],
    ("mercedes-benz", "gle-class"): ["gle"],
    ("mercedes-benz", "sl"): ["sl"],
    ("mitsubishi", "3000gt"): ["3000"],
    ("nissan", "x-trail"): ["x trail"],
    ("range-rover", "mainline"): ["range rover"],
    ("range-rover", "sport"): ["range rover sport", "sport"],
    ("range-rover", "sport-engines-card-l494-generation"): ["range rover sport", "sport"],
    ("range-rover", "evoque"): ["range rover evoque", "evoque"],
    ("range-rover", "velar"): ["range rover velar", "velar"],
    ("suzuki", "mr-wagon"): ["mr wagon"],
    ("suzuki", "swift-engines-k14c-variant-line"): ["swift"],
    ("suzuki", "jimny-engines-m13a-variant-line"): ["jimny"],
    ("suzuki", "grand-vitara-engines-j24b-variant-line"): ["grand vitara"],
    ("toyota", "gt86-gr86"): ["gt86", "gr86"],
    ("toyota", "verso-corolla-verso"): ["verso", "corolla verso"],
    ("volkswagen", "kombi"): ["kombi", "kombi 2"],
}


def normalize(text: str) -> str:
    text = text.lower()
    text = text.replace("&", " and ")
    text = text.replace("+", " plus ")
    text = text.replace("/", " ")
    text = text.replace("(", " ")
    text = text.replace(")", " ")
    text = text.replace("'", "")
    text = text.replace(".", " ")
    text = text.replace(",", " ")
    text = text.replace("-", " ")
    text = text.replace("–", " ")
    text = text.replace("—", " ")
    text = re.sub(r"\bengines?\b", " ", text)
    text = re.sub(r"\bmodel\b", " ", text)
    text = re.sub(r"\bclass\b", " ", text)
    text = re.sub(r"\bcard\b", " ", text)
    text = re.sub(r"\bcta\b", " ", text)
    text = re.sub(r"\bgeneration\b", " ", text)
    text = re.sub(r"\bnew\b", " ", text)
    text = re.sub(r"\bclassic\b", " ", text)
    text = re.sub(r"\blci\b", " ", text)
    text = re.sub(r"\bphev\b", " phev ", text)
    text = re.sub(r"\bbev\b", " bev ", text)
    text = re.sub(r"\b4x4\b", " 4x4 ", text)
    text = re.sub(r"\bc hr\b", " chr ", text)
    text = re.sub(r"\bmx5\b", " mx 5 ", text)
    text = re.sub(r"\brx7\b", " rx 7 ", text)
    text = re.sub(r"\brx8\b", " rx 8 ", text)
    text = re.sub(r"\bgt r\b", " gtr ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def strip_brand_prefix(text: str, brand_slug: str) -> str:
    value = normalize(text)
    prefixes = {
        "alfa-romeo": ["alfa romeo", "alpha romeo"],
        "aston-martin": ["aston martin"],
        "land-rover": ["land rover"],
        "range-rover": ["range rover"],
        "rolls-royce": ["rolls royce"],
        "mercedes-benz": ["mercedes benz", "mercedes"],
        "kia": ["kia"],
    }
    prefixes.setdefault(brand_slug, [brand_slug.replace("-", " ")])
    for prefix in prefixes[brand_slug]:
        if value.startswith(prefix + " "):
            return value[len(prefix) + 1 :].strip()
        if value == prefix:
            return ""
    return value


@dataclass
class SourceImage:
    path: Path
    full_key: str
    model_key: str


def resolve_source_dir(folder_name: str) -> Path | None:
    root = SOURCE_ROOT / folder_name
    if not root.exists():
        return None

    files = [p for p in root.iterdir() if p.is_file() and p.suffix.lower() in IMAGE_EXTS]
    if files:
        return root

    subdirs = [p for p in root.iterdir() if p.is_dir()]
    if len(subdirs) == 1:
        return subdirs[0]

    return root


def build_source_index(brand_slug: str, folder_name: str) -> list[SourceImage]:
    images = []
    folder_names = [folder_name, *ADDITIONAL_SOURCE_FOLDERS.get(brand_slug, [])]
    for name in folder_names:
        source_dir = resolve_source_dir(name)
        if source_dir is None or not source_dir.exists():
            continue
        for path in sorted(source_dir.iterdir()):
            if not path.is_file() or path.suffix.lower() not in IMAGE_EXTS:
                continue
            full_key = normalize(path.stem)
            model_key = strip_brand_prefix(path.stem, brand_slug)
            images.append(SourceImage(path=path, full_key=full_key, model_key=model_key))
    return images


def build_candidate_keys(brand_slug: str, card: dict[str, str]) -> list[str]:
    keys = []
    title = card.get("h3", "")
    slug = card.get("slug", "")
    title_without_parenthetical = re.sub(r"\([^)]*\)", "", title).strip()

    values = [
        strip_brand_prefix(title, brand_slug),
        strip_brand_prefix(title_without_parenthetical, brand_slug),
        normalize(slug),
        normalize(title),
    ]

    values.extend(SPECIAL_ALIASES.get((brand_slug, slug), []))

    if brand_slug == "audi" and slug.startswith("a") and slug[1:].isdigit():
        values.append(slug[1:])
    if brand_slug == "jaguar":
        values.append(slug.replace("-", " "))
    if brand_slug == "kia":
        values.append(normalize(title.replace("KIA", "Kia")))
    if brand_slug == "mazda" and slug.startswith("cx-"):
        values.append(slug.replace("-", " "))
    if brand_slug == "nissan" and slug == "nv":
        values.append("nv")

    seen = set()
    for value in values:
        normalized = normalize(value)
        if normalized and normalized not in seen:
            seen.add(normalized)
            keys.append(normalized)
    return keys


def score_match(candidate: str, source: SourceImage) -> tuple[int, int]:
    if source.model_key == candidate:
        return (100, len(source.model_key))
    if source.model_key.startswith(candidate + " "):
        return (95, len(source.model_key))
    if source.model_key.startswith(candidate):
        return (92, len(source.model_key))
    if f" {candidate} " in f" {source.model_key} ":
        return (85, len(source.model_key))
    if candidate.startswith(source.model_key + " "):
        return (75, len(source.model_key))
    return (0, 10_000)


def choose_source(brand_slug: str, card: dict[str, str], sources: list[SourceImage]) -> SourceImage | None:
    best: SourceImage | None = None
    best_score = (0, 10_000)

    for candidate in build_candidate_keys(brand_slug, card):
        for source in sources:
            score = score_match(candidate, source)
            if score[0] > best_score[0] or (score[0] == best_score[0] and score[1] < best_score[1]):
                best = source
                best_score = score

    return best if best_score[0] >= 85 else None


def copy_and_update_brand(brand_json: Path) -> tuple[int, int, list[str]]:
    data = json.loads(brand_json.read_text(encoding="utf-8-sig"))
    brand_slug = data["brand"]["slug"]
    folder_name = BRAND_SOURCE_FOLDERS.get(brand_slug)
    if not folder_name:
        return (0, 0, [])

    sources = build_source_index(brand_slug, folder_name)
    if not sources:
        return (0, len(data["sections"]["models"]["cards"]), [card["h3"] for card in data["sections"]["models"]["cards"]])

    dest_dir = PUBLIC_BRANDS_DIR / brand_slug / "models"
    dest_dir.mkdir(parents=True, exist_ok=True)

    matched = 0
    unmatched: list[str] = []

    fallback_source = sources[0] if sources else None

    for card in data["sections"]["models"]["cards"]:
        source = choose_source(brand_slug, card, sources)
        if source is None:
            if fallback_source is None:
                unmatched.append(card["h3"])
                continue
            source = fallback_source

        current_name = Path(card["image"]).stem
        dest_name = f"{current_name}{source.path.suffix.lower()}"
        dest_path = dest_dir / dest_name
        shutil.copy2(source.path, dest_path)
        card["image"] = f"/images/brands/{brand_slug}/models/{dest_name}"
        matched += 1

    if matched:
        brand_json.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    return (matched, len(data["sections"]["models"]["cards"]), unmatched)


def main() -> int:
    total_matched = 0
    total_cards = 0

    for brand_json in sorted(BRANDS_DIR.glob("*.json")):
        matched, total, unmatched = copy_and_update_brand(brand_json)
        if total == 0:
            continue
        total_matched += matched
        total_cards += total
        print(f"{brand_json.name}: matched {matched}/{total}")
        if unmatched and matched != total:
            preview = " | ".join(unmatched[:6])
            print(f"  unmatched: {preview}")

    print(f"\nTotal matched: {total_matched}/{total_cards}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
