"""Normalize static-page sections into stable family-level buckets.

This is intentionally data-only. Every existing non-hero section is copied
verbatim into exactly one bucket and receives only sourceSectionId/sourceOrder
metadata so the original section identity and order remain available.
"""

from __future__ import annotations

import copy
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
STATIC_ROOT = ROOT / "data" / "static-pages"


SCHEMAS = {
    "case-studies": [
        "caseSummary",
        "initialSymptom",
        "progression",
        "diagnosis",
        "repairOptions",
        "secondaryRisks",
        "decision",
        "outcome",
        "takeaway",
        "quoteCta",
        "additional",
    ],
    "failures": [
        "urgency",
        "symptoms",
        "causes",
        "diagnosis",
        "affectedEngines",
        "repairOptions",
        "costs",
        "consequences",
        "prevention",
        "faq",
        "related",
        "cta",
        "additional",
    ],
    "compare": [
        "comparison",
        "data",
        "options",
        "costs",
        "decision",
        "risks",
        "recommendation",
        "faq",
        "related",
        "cta",
        "additional",
    ],
    "prices": [
        "overview",
        "priceBreakdown",
        "options",
        "symptoms",
        "causes",
        "costFactors",
        "decision",
        "process",
        "prevention",
        "faq",
        "related",
        "cta",
        "additional",
    ],
    "services": [
        "overview",
        "included",
        "process",
        "costs",
        "coverage",
        "options",
        "risks",
        "questions",
        "faq",
        "related",
        "cta",
        "additional",
    ],
    "symptoms": [
        "overview",
        "causes",
        "diagnosis",
        "severity",
        "urgency",
        "repairRange",
        "decision",
        "prevention",
        "faq",
        "related",
        "cta",
        "additional",
    ],
    "insights": [
        "overview",
        "data",
        "breakdown",
        "methodology",
        "analysis",
        "implications",
        "recommendations",
        "faq",
        "related",
        "cta",
        "additional",
    ],
    "legal": [
        "scope",
        "procedure",
        "dataUse",
        "security",
        "retention",
        "rights",
        "complaints",
        "faq",
        "contact",
        "additional",
    ],
    "hub": ["overview", "featured", "categories", "cta", "additional"],
    "root": ["overview", "content", "faq", "cta", "additional"],
}


def normalized(value: str) -> str:
    return re.sub(r"\s+", " ", value.lower()).strip()


def section_title(section: dict) -> str:
    return str(section.get("title") or section.get("description") or "")


def bucket_for(family: str, title: str, index: int, total: int) -> str:
    """Return a stable semantic bucket without changing source content."""
    text = normalized(title)

    if family == "case-studies":
        ordered = SCHEMAS[family][:-1]
        return ordered[index] if index < len(ordered) else "additional"

    rules = {
        "urgency": ["urgent", "stop driving", "flashing", "red light", "how fast", "progression", "stage of", "at a glance"],
        "symptoms": ["symptom", "warning", "what each means", "what's triggering", "what is triggering", "failure pattern", "failure mode", "common signs"],
        "causes": ["why ", "why?", "cause", "root cause", "how .* mix", "how .* fail", "how .* damage"],
        "diagnosis": ["diagnos", "confirming", "compression test", "leak-down", "fault code", "exact cause", "finding the cause", "getting the code", "test first", "step-by-step", "step by step"],
        "affectedEngines": ["engine(s) with", "engines with", "red flag engine", "affected vehicle", "known .* issue", "known .* pattern", "models .* risk", "years .* engine", "vehicle models"],
        "repairOptions": ["repair option", "repair vs", "repair or", "repair", "replace", "replacement", "cleaning vs", "new vs", "reconditioned vs", "what should you do", "which option", "options explained", "choices", "waste money"],
        "costs": ["cost", "pay", "quote", "pricing", "price", "maths", "math", "value threshold", "what you're paying", "what the quote", "quote data", "quote requests", "based on .* data"],
        "consequences": ["how bad", "consequence", "domino", "internal destruction", "damage escalat", "delay", "destruction", "what happens when", "what happens if"],
        "prevention": ["avoid", "prevent", "protect", "maintenance", "longevity", "rules to", "how to avoid"],
        "faq": ["frequently asked", "common question", "questions answered", "faq"],
        "related": ["related ", "related engine", "related cost", "technical .* guides", "resources"],
        "cta": ["need help", "get a ", "don't wait", "do not wait", "book ", "quote today", "diagnostic quote", "replacement quote"],
        "comparison": ["vs", "side by side", "comparison", "difference"],
        "data": ["data", "statistics", "numbers", "market report", "quote requests", "benchmark"],
        "options": ["options", "choices", "routes", "alternatives"],
        "decision": ["decision", "choose", "which option", "right for you", "confidence", "scenario"],
        "recommendation": ["recommend", "what to do", "best ", "takeaway", "conclusion"],
        "overview": ["overview", "at a glance", "what is", "what are", "summary", "landscape"],
        "priceBreakdown": ["cost by", "cost data", "price by", "breakdown", "labour rate", "labour hours", "repair cost"],
        "costFactors": ["what you're paying", "factors", "exclusions", "where you live", "vehicle segment", "what affects"],
        "included": ["included", "includes", "what's included", "scope of"],
        "process": ["process", "how .* works", "step", "timeline", "from .* to", "lifecycle"],
        "coverage": ["coverage", "network", "where", "location", "uk-wide"],
        "questions": ["what to ask", "questions"],
        "severity": ["serious", "severity", "critical", "urgent attention", "severity of"],
        "repairRange": ["repair range", "repair cost", "cost escalat", "price range"],
        "breakdown": ["breakdown", "by brand", "by vehicle", "per brand", "detailed"],
        "methodology": ["method", "source", "how we", "data quality", "verified"],
        "analysis": ["analysis", "why", "what the data", "patterns", "trend"],
        "implications": ["impact", "implication", "what this means", "could have been"],
        "recommendations": ["recommend", "what to watch", "how to", "advice"],
        "scope": ["scope", "purpose", "what .* about", "applies"],
        "procedure": ["procedure", "submit", "after you", "how to complain"],
        "dataUse": ["data", "collection", "sharing", "supplier", "cookies", "third-party"],
        "security": ["security", "safeguard", "protect"],
        "retention": ["retention", "deletion", "duration"],
        "rights": ["rights", "access", "request", "consent"],
        "complaints": ["complaint", "adr", "ico", "dispute"],
        "contact": ["contact", "address", "social media", "email"],
        "featured": ["featured", "popular", "latest"],
        "categories": ["category", "categories", "browse", "all ", "guides"],
        "content": ["content", "details", "information"],
    }

    # Family-specific precedence prevents broad words such as "cost" from
    # stealing a section that is clearly a FAQ, related-resource, or CTA.
    precedence = {
        "failures": ["faq", "related", "cta", "prevention", "affectedEngines", "costs", "consequences", "repairOptions", "diagnosis", "symptoms", "causes", "urgency"],
        "compare": ["faq", "related", "cta", "comparison", "data", "options", "costs", "risks", "decision", "recommendation"],
        "prices": ["faq", "related", "cta", "prevention", "symptoms", "causes", "decision", "process", "costFactors", "priceBreakdown", "options", "overview"],
        "services": ["faq", "related", "cta", "risks", "questions", "coverage", "process", "costs", "options", "included", "overview"],
        "symptoms": ["faq", "related", "cta", "prevention", "diagnosis", "causes", "urgency", "severity", "repairRange", "decision", "overview"],
        "insights": ["faq", "related", "cta", "recommendations", "implications", "methodology", "analysis", "breakdown", "data", "overview"],
        "legal": ["faq", "contact", "complaints", "rights", "retention", "security", "dataUse", "procedure", "scope"],
        "hub": ["cta", "featured", "categories", "overview"],
        "root": ["faq", "cta", "content", "overview"],
    }

    for bucket in precedence.get(family, []):
        for pattern in rules.get(bucket, []):
            if re.search(pattern, text):
                return bucket

    # Use source order only as a conservative fallback for generic headings.
    fallback = {
        "failures": ["urgency", "symptoms", "causes", "diagnosis", "repairOptions", "costs", "consequences", "prevention"],
        "compare": ["comparison", "data", "options", "costs", "decision"],
        "prices": ["overview", "priceBreakdown", "options", "costFactors", "decision"],
        "services": ["overview", "included", "process", "costs", "options"],
        "symptoms": ["overview", "causes", "diagnosis", "severity", "repairRange"],
        "insights": ["overview", "data", "breakdown", "analysis", "recommendations"],
        "legal": ["scope", "procedure", "dataUse", "security", "rights"],
        "hub": ["overview", "featured", "categories"],
        "root": ["overview", "content", "faq"],
    }.get(family, [])
    return fallback[min(index, len(fallback) - 1)] if fallback else "additional"


def family_for(path: Path, page: dict) -> str:
    if path.parent.name == "hub-pages":
        return "hub"
    if path.parent == STATIC_ROOT / "public":
        return "root"
    return str(page.get("contentType") or path.parent.name)


def normalize_page(path: Path) -> tuple[int, int]:
    page = json.loads(path.read_text(encoding="utf-8"))
    family = family_for(path, page)
    if family not in SCHEMAS or page.get("route") == "/about":
        return 0, 0

    old_sections = page.get("sections") or {}

    # Keep the one-off migration safe to run again while completing a
    # previously normalized file's optional supplemental container.
    already_normalized = all(
        key in old_sections
        and isinstance(old_sections[key], dict)
        and isinstance(old_sections[key].get("items"), list)
        for key in SCHEMAS[family]
    )
    if already_normalized:
        if "supplemental" not in old_sections:
            old_sections["supplemental"] = {
                "media": [],
                "tables": [],
                "faqs": [],
                "forms": [],
                "links": [],
            }
            page["sections"] = old_sections
            path.write_text(json.dumps(page, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        return 0, 0

    new_sections: dict = {}
    if "hero" in old_sections:
        new_sections["hero"] = old_sections["hero"]

    buckets = {key: {"items": []} for key in SCHEMAS[family]}
    detail_keys = [key for key in old_sections if key not in {"hero", "supplemental"}]
    for index, source_id in enumerate(detail_keys):
        item = copy.deepcopy(old_sections[source_id])
        item["sourceSectionId"] = source_id
        item["sourceOrder"] = index
        title = section_title(item)
        bucket = bucket_for(family, title, index, len(detail_keys))
        buckets.setdefault(bucket, {"items": []})["items"].append(item)

    new_sections.update(buckets)
    new_sections["supplemental"] = old_sections.get(
        "supplemental",
        {"media": [], "tables": [], "faqs": [], "forms": [], "links": []},
    )
    page["sections"] = new_sections
    path.write_text(json.dumps(page, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return len(detail_keys), sum(len(value["items"]) for value in buckets.values())


def main() -> None:
    processed = 0
    source_sections = 0
    copied_sections = 0
    for path in sorted(STATIC_ROOT.rglob("*.json")):
        if path.name == "index.json":
            continue
        old_count, copied_count = normalize_page(path)
        if old_count:
            processed += 1
            source_sections += old_count
            copied_sections += copied_count
    print(f"normalized_pages={processed}")
    print(f"source_sections={source_sections}")
    print(f"copied_sections={copied_sections}")


if __name__ == "__main__":
    main()
