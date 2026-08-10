"use client";

import { useEffect } from "react";
import type { InternalLinkTarget } from "@/lib/internalLinkIndex";

type Props = {
  targets: InternalLinkTarget[];
  rootSelector?: string;
  maxLinksPerPage?: number;
  maxLinksPerTarget?: number;
};

type PreparedTarget = {
  href: string;
  label: string;
  type: InternalLinkTarget["type"];
  terms: string[];
};

const SKIP_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "script",
  "style",
  "noscript",
  "svg",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "[data-no-auto-link]",
  "[data-auto-internal-link]",
  "[data-quote-trigger]",
].join(",");

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeTerm(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function prepareTargets(targets: InternalLinkTarget[]): PreparedTarget[] {
  const termOwner = new Set<string>();

  return targets
    .map((target) => ({
      ...target,
      terms: target.terms
        .map(normalizeTerm)
        .filter((term) => term.length >= 2)
        .sort((left, right) => right.length - left.length),
    }))
    .filter((target) => target.terms.length > 0)
    .sort((left, right) => {
      const longestLeft = left.terms[0]?.length ?? 0;
      const longestRight = right.terms[0]?.length ?? 0;
      return longestRight - longestLeft;
    })
    .map((target) => {
      const terms = target.terms.filter((term) => {
        const key = term.toLowerCase();
        if (termOwner.has(key)) {
          return false;
        }
        termOwner.add(key);
        return true;
      });

      return { ...target, terms };
    })
    .filter((target) => target.terms.length > 0);
}

function findMatch(text: string, targets: PreparedTarget[], usedTargets: Map<string, number>, maxLinksPerTarget: number) {
  let best:
    | {
        target: PreparedTarget;
        term: string;
        index: number;
      }
    | null = null;

  for (const target of targets) {
    if ((usedTargets.get(target.href) ?? 0) >= maxLinksPerTarget) {
      continue;
    }

    for (const term of target.terms) {
      const pattern = new RegExp(`(^|[^A-Za-z0-9])(${escapeRegex(term)})(?=$|[^A-Za-z0-9])`, "i");
      const match = pattern.exec(text);
      if (!match) {
        continue;
      }

      const prefixLength = match[1]?.length ?? 0;
      const index = match.index + prefixLength;
      if (!best || index < best.index || (index === best.index && term.length > best.term.length)) {
        best = { target, term: match[2] ?? term, index };
      }
    }
  }

  return best;
}

function shouldSkipNode(node: Text) {
  const parent = node.parentElement;
  if (!parent || !node.nodeValue?.trim()) {
    return true;
  }

  return Boolean(parent.closest(SKIP_SELECTOR));
}

function buildLink(matchText: string, target: PreparedTarget) {
  const anchor = document.createElement("a");
  anchor.href = target.href;
  anchor.textContent = matchText;
  anchor.dataset.autoInternalLink = target.type;
  anchor.className =
    "font-semibold text-[#0b7a3b] underline decoration-[#34c759]/30 underline-offset-2 transition hover:text-[#0b2347]";
  anchor.setAttribute("aria-label", `Open ${target.label}`);
  return anchor;
}

export default function AutoInternalLinks({
  targets,
  rootSelector = "main",
  maxLinksPerPage = 24,
  maxLinksPerTarget = 1,
}: Props) {
  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root || !targets.length) {
      return;
    }

    const preparedTargets = prepareTargets(targets);
    if (!preparedTargets.length) {
      return;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let currentNode = walker.nextNode();

    while (currentNode) {
      if (currentNode instanceof Text && !shouldSkipNode(currentNode)) {
        textNodes.push(currentNode);
      }
      currentNode = walker.nextNode();
    }

    const usedTargets = new Map<string, number>();
    let insertedLinks = 0;

    for (const textNode of textNodes) {
      if (insertedLinks >= maxLinksPerPage) {
        break;
      }

      const text = textNode.nodeValue ?? "";
      const match = findMatch(text, preparedTargets, usedTargets, maxLinksPerTarget);
      if (!match) {
        continue;
      }

      const before = text.slice(0, match.index);
      const afterIndex = match.index + match.term.length;
      const after = text.slice(afterIndex);
      const fragment = document.createDocumentFragment();

      if (before) {
        fragment.appendChild(document.createTextNode(before));
      }
      fragment.appendChild(buildLink(match.term, match.target));
      if (after) {
        fragment.appendChild(document.createTextNode(after));
      }

      textNode.parentNode?.replaceChild(fragment, textNode);
      usedTargets.set(match.target.href, (usedTargets.get(match.target.href) ?? 0) + 1);
      insertedLinks += 1;
    }
  }, [maxLinksPerPage, maxLinksPerTarget, rootSelector, targets]);

  return null;
}
