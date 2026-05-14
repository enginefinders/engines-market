from __future__ import annotations

import json
import re
from pathlib import Path

from docx import Document


BASE_DIR = Path(r"C:\Users\Rahma\new_engine")
DOCS_DIR = BASE_DIR / "all"
JSON_DIR = BASE_DIR / "engine-market" / "data" / "brands"


def slugify_doc_stem(stem: str) -> str:
    return stem.strip().lower().replace(" ", "-")


def fallback_cta(brand_name: str, index: int) -> str:
    templates = [
        f"Compare {brand_name} engine replacement prices now",
        f"Get quotes from UK {brand_name} engine specialists",
        f"Compare rebuilt vs used {brand_name} engine options",
        f"Compare {brand_name} engine supply and fit deals",
        f"Ask about current {brand_name} engine replacement lead times",
        f"Compare reconditioned {brand_name} engines with warranty",
        f"Compare used and reconditioned {brand_name} engine options",
        f"Find {brand_name} engine specialists near you",
        f"Compare {brand_name} replacement engines for common failures",
        f"Compare the best {brand_name} engine deals now",
    ]
    if 0 <= index < len(templates):
        return templates[index]
    return f"Compare {brand_name} engine quotes now"


def strip_markdown(text: str) -> str:
    text = text.strip()
    if text.startswith("**") and text.endswith("**"):
        text = text[2:-2]
    if text.startswith("*") and text.endswith("*"):
        text = text[1:-1]
    return text.strip()


def clean_cta(text: str) -> str:
    text = strip_markdown(text)
    text = text.lstrip("→").strip()
    return text


def split_answer_and_cta(text: str) -> tuple[str, str | None]:
    answer = text.strip()
    cta = None

    answer = re.sub(r"\*Keywords:.*$", "", answer).strip()
    answer = re.sub(r"\*\*Keywords:.*$", "", answer).strip()

    inline_bold_cta_match = re.search(
        r"\*\*(Compare|Get|Find|Use|Ask|Check|Connect)[^*]+\*\*$",
        answer,
    )
    if inline_bold_cta_match:
        cta = clean_cta(inline_bold_cta_match.group(0))
        answer = answer[: inline_bold_cta_match.start()].strip()
        return answer, cta

    inline_cta_match = re.search(r"\*(Compare|Get|Find|Use|Ask|Check|Connect)[^*]+\*$", answer)
    if inline_cta_match:
        cta = clean_cta(inline_cta_match.group(0))
        answer = answer[: inline_cta_match.start()].strip()
        return answer, cta

    if "→" in answer:
        left, right = answer.rsplit("→", 1)
        right = right.strip()
        if right:
            return left.strip(), clean_cta(right)

    sentence_parts = [part.strip() for part in re.split(r"(?<=[.!?])\s+", answer) if part.strip()]
    if sentence_parts:
        last = sentence_parts[-1]
        if re.match(r"^(Compare|Get|Find|Use|Ask|Check|Connect)\b", last):
            cta = clean_cta(last.rstrip("."))
            answer = " ".join(sentence_parts[:-1]).strip()

    return answer.strip(), cta


def collect_faq_lines(doc_path: Path) -> list[str]:
    doc = Document(doc_path)
    lines: list[str] = []
    in_faq = False

    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            continue
        if text.startswith("#12: FAQ"):
            in_faq = True
            continue
        if in_faq and text.startswith("#13:"):
            break
        if in_faq:
            lines.append(text)

    return lines


QUESTION_RE = re.compile(r"^\*\*(\d+)\.\s*(.+?)\*\*$")


def parse_faq_section(lines: list[str]) -> dict:
    tag = "FAQ"
    h2 = ""
    intro = ""
    items: list[dict] = []
    current: dict | None = None

    for raw in lines:
        line = raw.strip()
        if not line:
            continue

        if "Keyword Coverage Table" in line:
            break
        if line.startswith("|"):
            continue
        if line == "---":
            continue
        if line.startswith("*Keywords:") or line.startswith("**Keywords:"):
            continue

        if line.startswith("**Tag:**"):
            tag = line.split("**Tag:**", 1)[1].strip()
            continue

        if line.startswith("**H2:**"):
            h2 = line.split("**H2:**", 1)[1].strip()
            continue

        if line.startswith("**Intro"):
            intro = line.split(":", 1)[1].strip()
            continue

        question_match = QUESTION_RE.match(line)
        if question_match:
            if current:
                items.append(current)
            current = {
                "question": question_match.group(2).strip(),
                "answer": "",
                "cta": "",
            }
            continue

        if current is None:
            continue

        if line.startswith("→"):
            current["cta"] = clean_cta(line)
            continue

        if line.startswith("*") and line.endswith("*") and "Keywords:" not in line:
            current["cta"] = clean_cta(line)
            continue

        answer_text, inline_cta = split_answer_and_cta(line)
        if current["answer"]:
            current["answer"] += " " + answer_text
        else:
            current["answer"] = answer_text

        if inline_cta and not current["cta"]:
            current["cta"] = clean_cta(inline_cta)

    if current:
        items.append(current)

    for item in items:
        item["question"] = strip_markdown(item["question"])
        item["answer"] = item["answer"].strip()
        item["answer"] = re.sub(r"\*Keywords:.*$", "", item["answer"]).strip()
        if not item["cta"]:
            answer, inferred_cta = split_answer_and_cta(item["answer"])
            item["answer"] = answer
            if inferred_cta:
                item["cta"] = inferred_cta
        item["cta"] = clean_cta(item["cta"])

    return {
        "tag": tag,
        "h2": h2,
        "intro": intro,
        "items": items,
    }


def main() -> None:
    updated: list[str] = []

    for doc_path in sorted(DOCS_DIR.glob("*.docx")):
        slug = slugify_doc_stem(doc_path.stem)
        json_path = JSON_DIR / f"{slug}.json"
        if not json_path.exists():
            continue

        faq_lines = collect_faq_lines(doc_path)
        if not faq_lines:
            continue

        faq_section = parse_faq_section(faq_lines)
        if not faq_section["items"]:
            continue

        data = json.loads(json_path.read_text(encoding="utf-8"))
        existing_items = data["sections"]["faq"].get("items", [])
        brand_name = data.get("brand", {}).get("name", doc_path.stem)
        for index, item in enumerate(faq_section["items"]):
            if not item["cta"] and index < len(existing_items):
                item["cta"] = existing_items[index].get("cta", "")
            if not item["cta"]:
                item["cta"] = fallback_cta(brand_name, index)
        data["sections"]["faq"]["tag"] = faq_section["tag"]
        data["sections"]["faq"]["h2"] = faq_section["h2"]
        data["sections"]["faq"]["intro"] = faq_section["intro"]
        data["sections"]["faq"]["items"] = faq_section["items"]
        json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        updated.append(json_path.name)

    print(f"Updated FAQs from docs for {len(updated)} brand JSON file(s).")


if __name__ == "__main__":
    main()
