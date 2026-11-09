import Link from "next/link";
import type { ReactNode } from "react";

const LINK_PATTERN = /(mailto:[^\s<]+|https?:\/\/[^\s<]+|www\.[^\s<]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/gi;
const LINK_TOKEN_PATTERN = /^(mailto:[^\s<]+|https?:\/\/[^\s<]+|www\.[^\s<]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})$/i;

function trimTrailingPunctuation(value: string) {
  const match = value.match(/[.,;:!?)]*$/);
  const trailing = match?.[0] || "";
  return { value: trailing ? value.slice(0, -trailing.length) : value, trailing };
}

function hrefFor(value: string) {
  if (value.toLowerCase().startsWith("mailto:")) return value;
  if (value.includes("@") && !value.includes("://")) return `mailto:${value}`;
  if (value.toLowerCase().startsWith("www.")) return `https://${value}`;
  return value;
}

export default function LegalInlineText({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(LINK_PATTERN);

  return (
    <>
      {parts.map((part, index) => {
        if (!part || !LINK_TOKEN_PATTERN.test(part)) return <span key={`${part}-${index}`}>{part}</span>;
        const { value, trailing } = trimTrailingPunctuation(part);
        const href = hrefFor(value);
        const external = href.startsWith("http://") || href.startsWith("https://");
        const linkClass = `font-semibold text-[#078d4a] underline decoration-[#8bc9a3] underline-offset-2 transition hover:text-[#056b38] ${className}`;
        const link: ReactNode = href.startsWith("/") ? (
          <Link className={linkClass} href={href}>{value}</Link>
        ) : (
          <a className={linkClass} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{value}</a>
        );
        return <span key={`${part}-${index}`}>{link}{trailing}</span>;
      })}
    </>
  );
}
