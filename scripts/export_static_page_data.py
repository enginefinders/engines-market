"""Export the existing static HTML into clean, structured JSON.

This script is intentionally read-only against the source pages. It writes only
to data/static-pages and keeps source hashes for later parity checks.
"""

from __future__ import annotations

import hashlib
import html
import json
import re
import shutil
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = ROOT / "public"
HUB_ROOT = ROOT / "content" / "hub-pages"
DATA_ROOT = ROOT / "data" / "static-pages"

PUBLIC_ROUTE_FOLDERS = {
    "about",
    "case-studies",
    "compare",
    "failures",
    "insights",
    "legal",
    "prices",
    "services",
    "symptoms",
}


@dataclass
class Node:
    tag: str
    attrs: dict[str, str] = field(default_factory=dict)
    children: list["Node | str"] = field(default_factory=list)


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("document")
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = Node(tag.lower(), {key.lower(): value or "" for key, value in attrs})
        self.stack[-1].children.append(node)
        if tag.lower() not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if self.stack[-1].tag == tag.lower():
            self.stack.pop()

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        self.stack[-1].children.append(data)


def parse_document(source: str) -> Node:
    parser = DocumentParser()
    parser.feed(source)
    parser.close()
    return parser.root


def descendants(node: Node):
    for child in node.children:
        if isinstance(child, Node):
            yield child
            yield from descendants(child)


def first_node(node: Node, tag: str) -> Node | None:
    return next((candidate for candidate in descendants(node) if candidate.tag == tag), None)


def all_nodes(node: Node, tag: str) -> list[Node]:
    return [candidate for candidate in descendants(node) if candidate.tag == tag]


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def node_text(node: Node | str, skip_navigation: bool = False) -> str:
    if isinstance(node, str):
        return clean_text(node)
    if node.tag in {"script", "style", "noscript", "template"}:
        return ""
    if skip_navigation and is_navigation_node(node):
        return ""
    parts = [node_text(child, skip_navigation) for child in node.children]
    return clean_text(" ".join(part for part in parts if part))


def class_tokens(node: Node) -> set[str]:
    value = f"{node.attrs.get('class', '')} {node.attrs.get('id', '')}".lower()
    return {token for token in re.split(r"[^a-z0-9_-]+", value) if token}


def nodes_with_class(node: Node, token: str) -> list[Node]:
    return [candidate for candidate in descendants(node) if token in class_tokens(candidate)]


def first_class_node(node: Node, tokens: list[str]) -> Node | None:
    for token in tokens:
        matches = nodes_with_class(node, token)
        if matches:
            return matches[0]
    return None


def is_navigation_node(node: Node) -> bool:
    tokens = class_tokens(node)
    if node.tag in {"nav", "footer"}:
        return True
    return bool(tokens & {"nav", "navbar", "navigation", "footer", "static-footer", "em-static-footer", "cookie-banner"})


def body_node(document: Node) -> Node:
    return first_node(document, "body") or document


def content_nodes(body: Node) -> list[Node | str]:
    return [child for child in body.children if not (isinstance(child, Node) and is_navigation_node(child))]


def content_text(body: Node) -> str:
    return node_text(Node("content", children=content_nodes(body)), skip_navigation=True)


def attr(node: Node, key: str) -> str:
    return html.unescape(node.attrs.get(key, "")).strip()


def extract_meta(document: Node, key: str, attribute: str = "name") -> str:
    for meta in all_nodes(document, "meta"):
        if attr(meta, attribute).lower() == key.lower():
            return attr(meta, "content")
    return ""


def extract_canonical(document: Node) -> str:
    for link in all_nodes(document, "link"):
        if "canonical" in {token.lower() for token in attr(link, "rel").split()}:
            return attr(link, "href")
    return ""


def canonical_path(value: str) -> str:
    if not value:
        return ""
    parsed = urlparse(value)
    route = parsed.path or value.split("?", 1)[0]
    return route.rstrip("/") or "/"


def fallback_route(relative_path: Path, source_root: str) -> str:
    normalized = relative_path.with_suffix("").as_posix()
    if source_root == "hub-pages":
        return f"/{relative_path.stem}"
    if normalized == "about/about-us":
        return "/about"
    if normalized == "reviews":
        return "/reviews"
    if normalized == "get-a-quote":
        return "/get-a-quote"
    if normalized == "case-studies/nissan-navara-d40-case-study":
        return "/case-studies/nissan-navara-engine-failure"
    return f"/{normalized}"


def extract_json_ld(document: Node) -> list[object]:
    records: list[object] = []
    for script in all_nodes(document, "script"):
        if attr(script, "type").lower() != "application/ld+json":
            continue
        raw = "".join(child for child in script.children if isinstance(child, str)).strip()
        try:
            records.append(json.loads(raw))
        except json.JSONDecodeError:
            records.append({"rawText": clean_text(raw), "parseError": True})
    return records


def extract_headings(nodes: list[Node | str]) -> list[dict[str, str]]:
    results = []
    for node in nodes:
        if isinstance(node, Node):
            if node.tag in {"h1", "h2", "h3", "h4"}:
                text = node_text(node)
                if text:
                    results.append({"level": node.tag, "id": attr(node, "id"), "text": text})
            results.extend(extract_headings(node.children))
    return results


def extract_table(node: Node) -> dict[str, object]:
    rows = []
    for row in all_nodes(node, "tr"):
        cells = [node_text(cell) for cell in row.children if isinstance(cell, Node) and cell.tag in {"th", "td"}]
        if cells:
            rows.append(cells)
    return {"headers": rows[0] if rows else [], "rows": rows[1:] if rows else []}


def extract_list(node: Node) -> dict[str, object]:
    items = []
    for child in node.children:
        if isinstance(child, Node) and child.tag == "li":
            item = re.sub(r"^[•●▪◦]\s*", "", node_text(child, skip_navigation=True))
            if item:
                items.append(item)
    return {"ordered": node.tag == "ol", "items": [item for item in items if item]}


def extract_form(node: Node) -> dict[str, object]:
    fields = []
    for child in descendants(node):
        if child.tag not in {"input", "select", "textarea", "button"}:
            continue
        fields.append({
            "element": child.tag,
            "name": attr(child, "name"),
            "type": attr(child, "type"),
            "placeholder": attr(child, "placeholder"),
            "required": "required" in child.attrs,
        })
    return {"action": attr(node, "action"), "method": (attr(node, "method") or "get").lower(), "fields": fields}


def extract_links(nodes: list[Node | str]) -> list[dict[str, str]]:
    links = []
    seen = set()
    root = Node("content", children=nodes)
    for link in all_nodes(root, "a"):
        href = attr(link, "href")
        text = node_text(link, skip_navigation=True)
        key = (href, text)
        if href and key not in seen:
            links.append({"href": href, "text": text})
            seen.add(key)
    return links


CARD_CONTAINER_SUFFIXES = (
    "-grid",
    "-cards",
    "-list",
    "-items",
    "-steps",
    "-tiles",
    "-panels",
    "-boxes",
    "-rows",
    "-area",
)

CARD_CHILD_MARKERS = (
    "card",
    "item",
    "step",
    "tile",
    "option",
    "choice",
    "feature",
    "box",
    "bar",
    "panel",
    "point",
    "row",
    "column",
    "col",
)


def matching_class_node(node: Node, fragments: tuple[str, ...]) -> Node | None:
    for candidate in descendants(node):
        tokens = class_tokens(candidate)
        if any(any(fragment in token for fragment in fragments) for token in tokens):
            return candidate
    return None


def direct_child_groups(node: Node) -> list[list[Node]]:
    children = [child for child in node.children if isinstance(child, Node)]
    grouped: dict[str, list[Node]] = {}
    for child in children:
        candidates = [
            token
            for token in class_tokens(child)
            if any(marker in token for marker in CARD_CHILD_MARKERS)
        ]
        if candidates:
            grouped.setdefault(candidates[0], []).append(child)
    return [group for group in grouped.values() if len(group) >= 2]


def is_card_container(node: Node) -> bool:
    tokens = class_tokens(node)
    if not any(
        token.endswith(CARD_CONTAINER_SUFFIXES)
        or token.endswith("grid")
        or token.startswith("grid-")
        or token.endswith("-col")
        or token in {"grid", "cards", "list", "items", "steps", "tiles", "panels", "boxes", "rows"}
        for token in tokens
    ):
        return False
    return bool(direct_child_groups(node))


def extract_generic_cards(node: Node) -> list[dict[str, object]]:
    if not is_card_container(node):
        return []

    cards: list[dict[str, object]] = []
    for group in direct_child_groups(node):
        for card in group:
            full_text = node_text(card, skip_navigation=True)
            if not full_text:
                continue

            icon_node = matching_class_node(card, ("icon",))
            title_node = matching_class_node(card, ("title", "heading", "name", "question", "stage", "day", "label"))
            description_node = matching_class_node(card, ("desc", "description", "text", "body", "sub", "note", "hint", "copy", "detail", "info"))
            highlight_node = matching_class_node(card, ("amount", "price", "cost", "value", "val", "num", "number", "rate", "count", "stat", "pct", "percent"))
            meta_node = matching_class_node(card, ("meta", "source", "badge", "tag", "eyebrow", "status", "verified"))

            if title_node is None:
                title_node = next((candidate for candidate in descendants(card) if candidate.tag in {"h3", "h4", "strong"} and node_text(candidate)), None)

            list_items = []
            for list_node in descendants(card):
                if list_node.tag in {"ul", "ol"}:
                    list_items.extend(
                        node_text(item, skip_navigation=True)
                        for item in list_node.children
                        if isinstance(item, Node) and item.tag == "li" and node_text(item, skip_navigation=True)
                    )

            description = node_text(description_node, skip_navigation=True) if description_node else ""
            if not description and list_items:
                description = " ".join(list_items)
            if not description:
                paragraph_text = [
                    node_text(candidate, skip_navigation=True)
                    for candidate in descendants(card)
                    if candidate.tag in {"p", "blockquote"} and node_text(candidate, skip_navigation=True)
                ]
                description = " ".join(dict.fromkeys(paragraph_text))

            card_data = {
                "title": node_text(title_node, skip_navigation=True) if title_node else "",
                "text": description or full_text,
                "highlight": node_text(highlight_node, skip_navigation=True) if highlight_node else "",
                "meta": node_text(meta_node, skip_navigation=True) if meta_node else "",
                "icon": node_text(icon_node, skip_navigation=True) if icon_node else "",
                "items": list_items,
                "fullText": full_text,
            }
            if any(card_data[key] for key in ("title", "text", "highlight", "meta", "icon", "items")):
                cards.append(card_data)

    return cards


def extract_images(nodes: list[Node | str]) -> list[dict[str, str]]:
    root = Node("content", children=nodes)
    images = []
    seen = set()
    for image in all_nodes(root, "img"):
        src = attr(image, "src")
        if src and src not in seen:
            images.append({"src": src, "alt": attr(image, "alt"), "width": attr(image, "width"), "height": attr(image, "height")})
            seen.add(src)
    return images


def extract_faq(node: Node) -> dict[str, str] | None:
    summary = first_node(node, "summary")
    if not summary:
        return None
    question = node_text(summary)
    answer_parts = [child for child in node.children if isinstance(child, Node) and child.tag != "summary"]
    answer = node_text(Node("answer", children=answer_parts))
    return {"question": question, "answer": answer} if question and answer else None


def extract_hero(document: Node, heading_records: list[dict[str, str]], lead_blocks: list[dict[str, object]]) -> dict[str, object]:
    eyebrow_node = first_class_node(document, ["hero-eyebrow", "hero-breadcrumbs"])
    tagline_node = first_class_node(document, ["hero-tagline"])
    hero_costs = first_class_node(document, ["hero-costs"])
    options = []
    if hero_costs:
        for card in nodes_with_class(hero_costs, "hcost"):
            label_node = first_class_node(card, ["hcost-label"])
            amount_node = first_class_node(card, ["hcost-amount"])
            detail_node = first_class_node(card, ["hcost-sub"])
            option = {
                "label": node_text(label_node) if label_node else "",
                "amount": node_text(amount_node) if amount_node else "",
                "detail": node_text(detail_node) if detail_node else "",
            }
            if any(option.values()):
                options.append(option)

    trust_node = first_class_node(document, ["hero-trust-under-cta", "em-hero-trust", "hero-trust"])
    trust = [node_text(item) for item in nodes_with_class(trust_node, "hero-trust-item")] if trust_node else []
    hero_visual = first_class_node(document, ["hero-visual", "hero-widget-col", "hero-image"])
    image_node = first_node(hero_visual, "img") if hero_visual else None
    image = {"src": attr(image_node, "src"), "alt": attr(image_node, "alt")} if image_node else None
    heading = next((heading["text"] for heading in heading_records if heading["level"] == "h1"), "")
    lead = node_text(tagline_node) if tagline_node else next((block["text"] for block in lead_blocks if block.get("type") == "paragraph"), "")
    return {
        "eyebrow": node_text(eyebrow_node) if eyebrow_node else "",
        "heading": heading,
        "lead": lead,
        "options": options,
        "trust": trust,
        "image": image,
    }


def extract_blocks(nodes: list[Node | str]) -> list[dict[str, object]]:
    blocks: list[dict[str, object]] = []
    for node in nodes:
        if isinstance(node, str):
            continue
        if node.tag in {"script", "style", "noscript", "template", "nav", "footer"} or is_navigation_node(node):
            continue
        if node.tag in {"h1", "h2", "h3", "h4"}:
            text = node_text(node)
            if text:
                blocks.append({"type": "heading", "level": node.tag, "id": attr(node, "id"), "text": text})
        elif node.tag == "p":
            text = node_text(node, skip_navigation=True)
            if text:
                blocks.append({"type": "paragraph", "text": text})
        elif node.tag in {"ul", "ol"}:
            block = extract_list(node)
            if block["items"]:
                blocks.append({"type": "list", **block})
        elif node.tag == "table":
            table = extract_table(node)
            if table["headers"] or table["rows"]:
                blocks.append({"type": "table", **table})
        elif node.tag == "details":
            faq = extract_faq(node)
            if faq:
                blocks.append({"type": "faq", **faq})
        elif node.tag == "form":
            blocks.append({"type": "form", **extract_form(node)})
        elif node.tag == "img":
            blocks.append({"type": "image", "src": attr(node, "src"), "alt": attr(node, "alt")})
        elif node.tag in {"blockquote", "pre"}:
            text = node_text(node, skip_navigation=True)
            if text:
                blocks.append({"type": "quote", "text": text})
        else:
            tokens = class_tokens(node)
            if tokens & {"sec-label", "section-label"}:
                text = node_text(node, skip_navigation=True)
                if text:
                    blocks.append({"type": "label", "text": text})
                    continue
            card_specs = [
                ("decision-matrix", "dm-item", ["dm-title"], ["dm-desc"]),
                ("condition-grid", "cond-card", ["cond-title"], ["cond-desc"]),
                ("not-included-list", "ni-item", ["ni-title"], ["ni-desc"]),
                ("market-bars", "market-bar-item", ["mb-engine"], ["mb-note"]),
            ]
            handled_card_container = False
            for container_token, card_token, title_tokens, text_tokens in card_specs:
                if container_token in tokens:
                    handled_card_container = True
                    cards = []
                    for card in nodes_with_class(node, card_token):
                        title_node = first_class_node(card, title_tokens)
                        text_node = first_class_node(card, text_tokens)
                        highlight_node = first_class_node(card, ["mb-count"])
                        meta_node = first_class_node(card, ["mb-verified"])
                        card_data = {
                            "title": node_text(title_node) if title_node else "",
                            "text": node_text(text_node) if text_node else "",
                            "highlight": node_text(highlight_node) if highlight_node else "",
                            "meta": node_text(meta_node) if meta_node else "",
                            "fullText": node_text(card, skip_navigation=True),
                        }
                        if any(card_data.values()):
                            cards.append(card_data)
                    if cards:
                        blocks.append({"type": "cards", "cards": cards})
                    break
            if handled_card_container:
                continue
            if not handled_card_container:
                generic_cards = extract_generic_cards(node)
                if generic_cards:
                    blocks.append({"type": "cards", "cards": generic_cards})
                    continue
                if "market-insight" in tokens:
                    label = first_class_node(node, ["mi-label"])
                    text = first_class_node(node, ["mi-text"])
                    source = first_class_node(node, ["mi-source"])
                    blocks.append({"type": "cards", "cards": [{
                        "title": node_text(label) if label else "Dataset insight",
                        "text": node_text(text) if text else "",
                        "highlight": "",
                        "meta": node_text(source) if source else "",
                    }]})
                    continue
                if "market-total" in tokens:
                    value = first_class_node(node, ["market-num"])
                    label = first_class_node(node, ["market-num-label"])
                    blocks.append({"type": "stat", "value": node_text(value) if value else "", "label": node_text(label) if label else ""})
                    continue
                direct_text = clean_text(" ".join(child for child in node.children if isinstance(child, str)))
                semantic_descendants = [
                    candidate
                    for candidate in descendants(node)
                    if candidate.tag in {"h1", "h2", "h3", "h4", "p", "ul", "ol", "table", "details", "form", "blockquote", "pre", "img"}
                ]
                if direct_text and not semantic_descendants:
                    blocks.append({"type": "paragraph", "text": node_text(node, skip_navigation=True)})
                    continue
            if class_tokens(node) & {"related-grid", "related-links", "link-grid"}:
                links = extract_links([node])
                if links:
                    blocks.append({"type": "links", "links": links})
                    continue
            blocks.extend(extract_blocks(node.children))
    return blocks


def group_sections(blocks: list[dict[str, object]]) -> tuple[list[dict[str, object]], list[dict[str, object]]]:
    lead: list[dict[str, object]] = []
    sections: list[dict[str, object]] = []
    current: dict[str, object] | None = None
    for block in blocks:
        if block.get("type") == "heading" and block.get("level") == "h2":
            heading = str(block.get("text", ""))
            section_id = str(block.get("id") or re.sub(r"[^a-z0-9]+", "-", heading.lower()).strip("-"))
            current = {"id": section_id, "heading": heading, "blocks": []}
            sections.append(current)
            continue
        target = current["blocks"] if current else lead
        target.append(block)
    return lead, sections


def build_record(source: str, raw_bytes: bytes, source_path: Path, source_root: str, relative_path: Path) -> dict[str, object]:
    document = parse_document(source)
    body = body_node(document)
    nodes = content_nodes(body)
    blocks = extract_blocks(nodes)
    lead, sections = group_sections(blocks)
    canonical = extract_canonical(document)
    route = canonical_path(canonical) or fallback_route(relative_path, source_root)
    relative_source = source_path.relative_to(ROOT).as_posix()
    source_hash = hashlib.sha256(raw_bytes).hexdigest()
    heading_records = extract_headings(nodes)
    forms = [extract_form(node) for node in all_nodes(Node("content", children=nodes), "form")]
    links = extract_links(nodes)
    images = extract_images(nodes)
    tables = [extract_table(node) for node in all_nodes(Node("content", children=nodes), "table")]
    faqs = [faq for node in all_nodes(Node("content", children=nodes), "details") if (faq := extract_faq(node))]
    text = content_text(body)
    parts = relative_path.parts
    content_type = "hub" if source_root == "hub-pages" else (parts[0] if len(parts) > 1 else "root")
    slug = relative_path.with_suffix("").as_posix()

    return {
        "id": f"{source_root}/{slug}",
        "contentType": content_type,
        "slug": slug,
        "route": route,
        "source": {
            "originalFile": relative_source,
            "sourceRoot": source_root,
            "sourceHash": f"sha256:{source_hash}",
            "sourceBytes": len(raw_bytes),
            "migrationStatus": "clean-exported",
            "sourceImmutable": True,
        },
        "seo": {
            "title": node_text(first_node(document, "title") or Node("title")),
            "description": extract_meta(document, "description"),
            "canonical": canonical,
            "robots": extract_meta(document, "robots"),
            "openGraph": {
                "title": extract_meta(document, "og:title", "property"),
                "description": extract_meta(document, "og:description", "property"),
                "url": extract_meta(document, "og:url", "property"),
                "image": extract_meta(document, "og:image", "property"),
                "type": extract_meta(document, "og:type", "property"),
            },
        },
        "hero": {
            **extract_hero(document, heading_records, lead),
        },
        "content": {
            "text": text,
            "headings": heading_records,
            "leadBlocks": lead,
            "sections": sections,
        },
        "tables": tables,
        "faqs": faqs,
        "relatedLinks": links,
        "media": images,
        "forms": forms,
        "structuredData": extract_json_ld(document),
        "stats": {
            "wordCount": len(text.split()) if text else 0,
            "headingCount": len(heading_records),
            "tableCount": len(tables),
            "faqCount": len(faqs),
            "formCount": len(forms),
            "linkCount": len(links),
            "imageCount": len(images),
        },
    }


def source_files() -> list[tuple[Path, str, Path]]:
    files = [(path, "hub-pages", path.relative_to(HUB_ROOT)) for path in HUB_ROOT.rglob("*.html")]
    files.extend((path, "public", path.relative_to(PUBLIC_ROOT)) for path in PUBLIC_ROOT.rglob("*.html"))
    return sorted(files, key=lambda item: f"{item[1]}/{item[2].as_posix()}")


def output_path(source_root: str, relative_path: Path) -> Path:
    return DATA_ROOT / source_root / relative_path.with_suffix(".json")


def main() -> None:
    DATA_ROOT.mkdir(parents=True, exist_ok=True)
    for child in DATA_ROOT.iterdir():
        if child.is_dir():
            shutil.rmtree(child)
        elif child.name != ".gitkeep":
            child.unlink()

    records = []
    for source_path, source_root, relative_path in source_files():
        raw_bytes = source_path.read_bytes()
        source = raw_bytes.decode("utf-8")
        record = build_record(source, raw_bytes, source_path, source_root, relative_path)
        destination = output_path(source_root, relative_path)
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(json.dumps(record, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        records.append({
            "id": record["id"],
            "contentType": record["contentType"],
            "slug": record["slug"],
            "route": record["route"],
            "originalFile": record["source"]["originalFile"],
            "sourceHash": record["source"]["sourceHash"],
            "title": record["seo"]["title"],
            "description": record["seo"]["description"],
            "stats": record["stats"],
        })

    index = {
        "sourcePolicy": "Clean structured export of existing static HTML. Source pages are not modified.",
        "totalPages": len(records),
        "records": records,
    }
    (DATA_ROOT / "index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Exported {len(records)} clean static page records to {DATA_ROOT.relative_to(ROOT)}.")


if __name__ == "__main__":
    main()
