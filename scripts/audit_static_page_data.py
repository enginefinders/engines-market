"""Read-only parity audit for exported static-page JSON records."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from export_static_page_data import (  # noqa: E402
    DATA_ROOT,
    ROOT,
    all_nodes,
    build_record,
    source_files,
)


RAW_KEYS = {"bodyhtml", "mainhtml", "inlinecss", "rawhtml", "htmlcontent", "css"}
HTML_TAG_PATTERN = re.compile(r"<(?:html|body|div|p|section|script)\b", re.IGNORECASE)


def collect_raw_key_paths(value, path: str = "") -> list[str]:
    found = []
    if isinstance(value, dict):
        for key, child in value.items():
            child_path = f"{path}.{key}" if path else key
            if key.lower() in RAW_KEYS:
                found.append(child_path)
            found.extend(collect_raw_key_paths(child, child_path))
    elif isinstance(value, list):
        for index, child in enumerate(value):
            found.extend(collect_raw_key_paths(child, f"{path}[{index}]"))
    return found


def compare_value(label: str, expected, actual, failures: list[str]) -> None:
    if expected != actual:
        failures.append(label)


def audit_page(source_path: Path, source_root: str, relative_path: Path, record: dict) -> list[str]:
    failures = []
    raw_bytes = source_path.read_bytes()
    source = raw_bytes.decode("utf-8")
    expected = build_record(source, raw_bytes, source_path, source_root, relative_path)

    compare_value("source hash", expected["source"]["sourceHash"], record.get("source", {}).get("sourceHash"), failures)
    compare_value("route", expected["route"], record.get("route"), failures)
    compare_value("content type", expected["contentType"], record.get("contentType"), failures)
    compare_value("SEO metadata", expected["seo"], record.get("seo"), failures)
    compare_value("headings", expected["content"]["headings"], record.get("content", {}).get("headings"), failures)
    compare_value("tables", expected["tables"], record.get("tables"), failures)
    compare_value("FAQs", expected["faqs"], record.get("faqs"), failures)
    compare_value("forms", expected["forms"], record.get("forms"), failures)
    compare_value("links", expected["relatedLinks"], record.get("relatedLinks"), failures)
    compare_value("media", expected["media"], record.get("media"), failures)
    compare_value("stats", expected["stats"], record.get("stats"), failures)

    if not record.get("content", {}).get("text", "").strip():
        failures.append("empty clean content text")
    if collect_raw_key_paths(record):
        failures.append("raw HTML/CSS field present")
    if HTML_TAG_PATTERN.search(json.dumps(record, ensure_ascii=False)):
        failures.append("HTML markup detected in JSON values")

    return failures


def render_report(index: dict, page_results: list[dict], report_path: Path | None) -> str:
    total = len(page_results)
    passed = sum(1 for result in page_results if not result["failures"])
    failed = total - passed
    family_counts = Counter(result["contentType"] for result in page_results)
    family_failures = defaultdict(int)
    for result in page_results:
        if result["failures"]:
            family_failures[result["contentType"]] += 1

    lines = [
        "# Static Page JSON Parity Audit",
        "",
        "**Audit mode:** read-only",
        "**Source policy:** existing static HTML was read but not modified",
        f"**JSON records audited:** {total}",
        f"**Passed:** {passed}",
        f"**Failed:** {failed}",
        "",
        "## Result",
        "",
        ("PASS — all JSON records match their source HTML for the audited fields." if failed == 0 else "FAIL — review the page-level differences below before building dynamic routes."),
        "",
        "## Family summary",
        "",
        "| Family | Pages | Pages with differences |",
        "|---|---:|---:|",
    ]
    for family in sorted(family_counts):
        lines.append(f"| `{family}` | {family_counts[family]} | {family_failures[family]} |")

    if failed:
        lines.extend(["", "## Differences", ""])
        for result in page_results:
            if result["failures"]:
                lines.append(f"### `{result['source']}`")
                for failure in result["failures"]:
                    lines.append(f"- {failure}")

    lines.extend([
        "",
        "## Checks performed",
        "",
        "- Source SHA-256 hash",
        "- Clean route and content-family mapping",
        "- Title, description, canonical, robots and Open Graph metadata",
        "- Heading sequence",
        "- Tables and rows",
        "- FAQs",
        "- Forms and fields",
        "- Internal links",
        "- Images and alt text",
        "- Content statistics",
        "- Non-empty clean text content",
        "- Absence of raw HTML/CSS fields and markup tags in JSON",
        "",
        "## Interpretation",
        "",
        "This audit validates the exported data only. It does not activate dynamic routes, change rewrites, edit static HTML, or verify visual parity of future React components.",
        "",
    ])
    report = "\n".join(lines)
    if report_path:
        report_path.parent.mkdir(parents=True, exist_ok=True)
        report_path.write_text(report, encoding="utf-8")
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit clean static-page JSON against source HTML.")
    parser.add_argument("--report", type=Path, help="Optional Markdown report path.")
    args = parser.parse_args()

    index_path = DATA_ROOT / "index.json"
    if not index_path.exists():
        print(f"Missing {index_path}. Run the exporter first.", file=sys.stderr)
        return 2

    index = json.loads(index_path.read_text(encoding="utf-8"))
    indexed_records = {record["id"]: record for record in index.get("records", [])}
    page_results = []
    for source_path, source_root, relative_path in source_files():
        page_id = f"{source_root}/{relative_path.with_suffix('').as_posix()}"
        json_path = DATA_ROOT / source_root / relative_path.with_suffix(".json")
        failures = []
        if page_id not in indexed_records:
            failures.append("missing from index")
        if not json_path.exists():
            failures.append("missing JSON file")
            record = {}
        else:
            try:
                record = json.loads(json_path.read_text(encoding="utf-8"))
            except json.JSONDecodeError:
                record = {}
                failures.append("invalid JSON")
        if record:
            failures.extend(audit_page(source_path, source_root, relative_path, record))
        page_results.append({
            "source": source_path.relative_to(ROOT).as_posix(),
            "contentType": record.get("contentType", source_root),
            "failures": sorted(set(failures)),
        })

    report = render_report(index, page_results, args.report)
    print(report)
    return 1 if any(result["failures"] for result in page_results) else 0


if __name__ == "__main__":
    raise SystemExit(main())
