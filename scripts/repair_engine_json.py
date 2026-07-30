#!/usr/bin/env python3
import json
from pathlib import Path
from typing import Any
import importlib.util


REPO_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = REPO_ROOT / "data" / "engines"
EXTRACTOR_PATH = Path(__file__).resolve().parent / "extract_engine_pages.py"


def load_extractor() -> Any:
    spec = importlib.util.spec_from_file_location("extract_engine_pages", EXTRACTOR_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError("Unable to load extract_engine_pages helpers")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


extractor = load_extractor()


def text_has_artifacts(value: str) -> bool:
    markers = (
        "META TITLE:",
        "META DESCRIPTION:",
        "CANONICAL URL:",
        "OG TITLE:",
        "OG DESCRIPTION:",
        "OG URL:",
        "TWITTER TITLE:",
        "TWITTER DESCRIPTION:",
        "<script type=\"application/ld+json\">",
        "internal - strip before publish",
        "PRODUCTION NOTES:",
        "PRODUCTION NOTES",
        "[Link:",
        "Â£",
        "â†’",
        "ðŸ",
        "â•",
        "Ã",
        "â€™",
    )
    return any(marker in value for marker in markers)


def clean_value(value: Any, key: str | None = None) -> Any:
    if isinstance(value, dict):
        return {child_key: clean_value(child_value, child_key) for child_key, child_value in value.items()}
    if isinstance(value, list):
        return [clean_value(item, key) for item in value]
    if isinstance(value, str):
        if key in {"href", "canonical"}:
            return extractor.normalize_href(value)
        if key in {"url", "@id", "item"}:
            return value.strip()
        return extractor.cleanup_text(value)
    return value


def structured_faq_lookup(structured_data: dict[str, Any]) -> dict[str, str]:
    lookup: dict[str, str] = {}
    graph = structured_data.get("@graph", [])
    if not isinstance(graph, list):
        return lookup
    for item in graph:
        if not isinstance(item, dict) or item.get("@type") != "FAQPage":
            continue
        for question in item.get("mainEntity", []):
            if not isinstance(question, dict):
                continue
            name = extractor.cleanup_text(str(question.get("name", "")))
            answer = extractor.cleanup_text(str(question.get("acceptedAnswer", {}).get("text", "")))
            if name and answer:
                lookup[name] = answer
    return lookup


def normalize_hero(section: dict[str, Any]) -> None:
    hero = section.get("hero", {})
    if not isinstance(hero, dict):
        return
    hero["trustBadges"] = [
        "Supply & Fit Available",
        "12-Month Warranty",
        "Nationwide Delivery",
        "100+ Suppliers",
    ]
    quote_card = hero.get("quoteCard")
    if isinstance(quote_card, dict):
        quote_card["buttonText"] = extractor.cleanup_text(quote_card.get("buttonText", "")) or "Compare Engine Prices"
        quote_card["note"] = "Secure enquiry - no spam. Quotes only from vetted UK engine specialists."


def normalize_trust_cta(payload: dict[str, Any], section: dict[str, Any]) -> None:
    trust_cta = section.get("trustCta", {})
    if not isinstance(trust_cta, dict):
        return
    engine_code = str(payload.get("engine", {}).get("code", "")).strip() or "this engine"
    paragraph = str(trust_cta.get("paragraph", ""))
    if "PRODUCTION NOTES" in paragraph:
        paragraph = paragraph.split("PRODUCTION NOTES", 1)[0].strip()
    extracted_bullets = extractor.extract_trust_bullets(paragraph)
    if len(extracted_bullets) >= 2:
        trust_cta["bullets"] = extracted_bullets
    else:
        trust_cta["bullets"] = [
            f"Vetted UK specialists for {engine_code} replacements",
            "Minimum 12-month warranty on reconditioned and rebuilt options",
            "Nationwide delivery plus supply and fit availability",
        ]
    trust_cta["paragraph"] = extractor.extract_trust_paragraph(paragraph)
    trust_cta["paragraph"] = trust_cta["paragraph"].replace("TRUST POINTS:", "").replace("CLOSING PARAGRAPH:", "")
    trust_cta["paragraph"] = trust_cta["paragraph"].replace("---", "").strip(" -")
    trust_cta["buttonText"] = extractor.cleanup_text(trust_cta.get("buttonText", "")) or "Get Free Engine Quotes"
    trust_cta["note"] = "Secure enquiry - no spam. Quotes only from vetted UK engine specialists."


def normalize_buying_guide(section: dict[str, Any]) -> None:
    buying_guide = section.get("buyingGuide", {})
    if not isinstance(buying_guide, dict):
        return
    for option in buying_guide.get("options", []):
        if isinstance(option, dict):
            option["body"] = extractor.cleanup_text(option.get("body", ""))
            option["href"] = extractor.normalize_href(option.get("href", "#"))
    buying_guide["supplyFitLine"] = extractor.cleanup_text(buying_guide.get("supplyFitLine", ""))
    buying_guide["vehicleValueNote"] = extractor.cleanup_text(buying_guide.get("vehicleValueNote", ""))
    cta = extractor.remove_links_keep_text(str(buying_guide.get("cta", "")))
    if "PRODUCTION NOTES" in cta:
        cta = cta.split("PRODUCTION NOTES", 1)[0].strip()
    buying_guide["cta"] = cta.strip(" -")


def normalize_faq(section: dict[str, Any], structured_data: dict[str, Any]) -> None:
    faq = section.get("faq", {})
    if not isinstance(faq, dict):
        return
    lookup = structured_faq_lookup(structured_data)
    for item in faq.get("items", []):
        if not isinstance(item, dict):
            continue
        question = extractor.cleanup_text(item.get("question", ""))
        answer = extractor.cleanup_text(item.get("answer", ""))
        better_structured_answer = lookup.get(question)
        if better_structured_answer and (text_has_artifacts(str(item.get("answer", ""))) or len(answer) < len(better_structured_answer) - 25):
            item["answer"] = better_structured_answer
        else:
            item["answer"] = answer
        bullets = item.get("bullets", [])
        if isinstance(bullets, list):
            item["bullets"] = [extractor.cleanup_text(bullet) for bullet in bullets if extractor.cleanup_text(bullet)]


def normalize_sections(payload: dict[str, Any]) -> None:
    sections = payload.get("sections", {})
    if not isinstance(sections, dict):
        return
    normalize_hero(sections)
    normalize_trust_cta(payload, sections)
    normalize_buying_guide(sections)
    normalize_faq(sections, payload.get("structuredData", {}))


def replace_in_place(value: Any, replacements: dict[str, str]) -> Any:
    if isinstance(value, dict):
        return {key: replace_in_place(child, replacements) for key, child in value.items()}
    if isinstance(value, list):
        return [replace_in_place(item, replacements) for item in value]
    if isinstance(value, str):
        updated = value
        for old, new in replacements.items():
            updated = updated.replace(old, new)
        return updated
    return value


def maybe_fix_known_outliers(payload: dict[str, Any]) -> list[str]:
    warnings: list[str] = []
    engine = payload.get("engine", {})
    if not isinstance(engine, dict):
        return warnings
    code = str(engine.get("code", "")).upper()
    if code == "HR12DDR":
        replacements = {
            "1.2L inline-4 Turbo": "1.2L DIG-S Supercharged",
            "1.2L inline-4, direct injection, turbocharged (DIG-T)": "1.2L direct-injection supercharged petrol (DIG-S)",
            "turbocharged petrol": "supercharged petrol",
            "turbocharged torque": "supercharged response",
            "turbocharger": "supercharger",
            "Turbocharger Wear - High-Output Variant": "Supercharger System Wear - High-Output Variant",
            "wastegate": "bypass valve",
            "turbo-induced": "forced-induction",
            "turbo wear": "supercharger wear",
            "turbo plumbing": "supercharger plumbing",
            "turbo mismatch": "forced-induction mismatch",
            "traditional turbocharged maintenance profile": "traditional forced-induction maintenance profile",
        }
        updated_payload = replace_in_place(payload, replacements)
        payload.clear()
        payload.update(updated_payload)
        warnings.append("HR12DDR exact compatible-model coverage should be manually verified against source before publishing")
    return warnings


def main() -> int:
    files = sorted(DATA_DIR.glob("*.json"))
    updated = 0
    warning_map: dict[str, list[str]] = {}
    for path in files:
        payload = json.loads(path.read_text(encoding="utf-8"))
        cleaned = clean_value(payload)
        if not isinstance(cleaned, dict):
            continue
        normalize_sections(cleaned)
        warnings = maybe_fix_known_outliers(cleaned)
        if warnings:
            warning_map[path.name] = warnings
        rendered = json.dumps(cleaned, indent=2, ensure_ascii=False) + "\n"
        if path.read_text(encoding="utf-8") != rendered:
            path.write_text(rendered, encoding="utf-8")
            updated += 1

    summary = {
        "updatedFiles": updated,
        "fileCount": len(files),
        "warnings": warning_map,
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
