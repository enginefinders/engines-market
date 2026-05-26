"use client";

import { useDeferredValue, useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import {
    buildQuestionSearchText,
    getBrandId,
    getClusterId,
    getClusterLabel,
    homeFaqJsonClusters,
    type HomeFaqJsonAnswer,
} from "@/lib/homeFaqJsonData";

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={`h-[18px] w-[18px] flex-none text-[#94a3b8] transition ${open ? "rotate-180 text-[#15803d]" : ""}`}
            fill="none"
            aria-hidden="true"
        >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ClusterIcon({ type }: { type: string }) {
    const commonClassName = "h-[18px] w-[18px]";

    if (type === "pound") {
        return (
            <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
                <path d="M9 6.5c0-1.9 1.4-3.5 3.3-3.5 1.8 0 3.2 1.1 3.7 2.8M7 11h10M7 15h8M8 21h9a4 4 0 0 1-4-4V7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    if (type === "warning") {
        return (
            <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
                <path d="M12 4 3 20h18L12 4Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
                <path d="M12 9v5M12 17h.01" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
        );
    }
    if (type === "layers") {
        return (
            <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
                <path d="m12 4 8 4-8 4-8-4 8-4Zm8 8-8 4-8-4M20 16l-8 4-8-4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    if (type === "scales") {
        return (
            <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
                <path d="M12 4v16M7 7h10M5 7l-3 5h6L5 7Zm14 0-3 5h6l-3-5Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    if (type === "shield") {
        return (
            <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
                <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.9" />
                <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    if (type === "chip") {
        return (
            <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
                <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.9" />
                <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
        );
    }
    if (type === "clock") {
        return (
            <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.9" />
                <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    if (type === "process") {
        return (
            <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
                <path d="M4 7h8M4 12h10M4 17h6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.9" />
                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.9" />
                <circle cx="15" cy="17" r="2" stroke="currentColor" strokeWidth="1.9" />
            </svg>
        );
    }
    if (type === "chart") {
        return (
            <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
                <path d="M4 19h16M7 15l3-3 3 2 5-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 8h3v3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" className={commonClassName} fill="none" aria-hidden="true">
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2l-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        </svg>
    );
}

function TrustIcon({ children }: { children: ReactNode }) {
    return <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0fdf4] text-[#15803d]">{children}</div>;
}

function ShieldTickIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
            <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.9" />
            <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.9" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.9" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.9" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.9" />
        </svg>
    );
}

function PoundIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
            <path d="M9 6.5c0-1.9 1.4-3.5 3.3-3.5 1.8 0 3.2 1.1 3.7 2.8M7 11h10M7 15h8M8 21h9a4 4 0 0 1-4-4V7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, query: string) {
    if (!query) {
        return text;
    }

    const matcher = new RegExp(`(${escapeRegExp(query)})`, "ig");
    const parts = text.split(matcher);
    const lowered = query.toLowerCase();

    return parts.map((part, index) =>
        part.toLowerCase() === lowered ? <mark key={`${part}-${index}`}>{part}</mark> : <span key={`${part}-${index}`}>{part}</span>,
    );
}

function renderTable(table: NonNullable<HomeFaqJsonAnswer["table"]>, query: string) {
    return (
        <div className="overflow-x-auto rounded-[14px] border border-[#d8e1eb] bg-white">
            <table className="min-w-full border-collapse text-left text-[14px]">
                <thead className="bg-[#f8fafc]">
                    <tr>
                        {table.headers.map((header) => (
                            <th key={header} className="border-b border-[#e5ecf3] px-4 py-3 font-semibold text-[#0d1b2e]">
                                {highlightText(header, query)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.rows.map((row, rowIndex) => (
                        <tr key={`${rowIndex}-${row[0] ?? "row"}`} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"}>
                            {row.map((cell, cellIndex) => (
                                <td key={`${rowIndex}-${cellIndex}`} className="border-b border-[#eef2f7] px-4 py-3 align-top text-[#374151]">
                                    {highlightText(cell, query)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function renderAnswerSection(title: string, values: string[] | undefined, query: string) {
    if (!values || values.length === 0) {
        return null;
    }

    return (
        <div className="space-y-2">
            {title ? <p className="text-[15px] font-semibold text-[#0d1b2e]">{title}</p> : null}
            {values.map((value, index) => (
                <p key={`${title}-${index}`} className="text-[15px] leading-[1.75] text-[#374151]">
                    {highlightText(value, query)}
                </p>
            ))}
        </div>
    );
}

function renderAnswer(answer: HomeFaqJsonAnswer, query: string) {
    return (
        <div className="space-y-4">
            {renderAnswerSection("", answer.para, query)}
            {answer.points?.length ? (
                <ul className="space-y-2 rounded-[14px] border border-[#d8e1eb] bg-white px-4 py-4 text-[15px] leading-[1.7] text-[#374151]">
                    {answer.points.map((point, index) => (
                        <li key={`${point}-${index}`} className="flex gap-3">
                            <span className="mt-[0.55rem] h-2 w-2 flex-none rounded-full bg-[#15803d]" />
                            <span>{highlightText(point, query)}</span>
                        </li>
                    ))}
                </ul>
            ) : null}
            {answer.table ? renderTable(answer.table, query) : null}
            {answer.para_additional?.length ? <div className="space-y-2">{answer.para_additional.map((para, index) => <p key={index} className="text-[15px] leading-[1.75] text-[#374151]">{highlightText(para, query)}</p>)}</div> : null}
            {answer.cta ? (
                <p className="text-[14px] font-semibold text-[#15803d]">{highlightText(answer.cta, query)}</p>
            ) : null}
        </div>
    );
}

export default function HomeFaqHubSection() {
    const clusters = homeFaqJsonClusters.map((cluster) => ({
        id: getClusterId(cluster.cluster),
        label: getClusterLabel(cluster.cluster),
        raw: cluster,
        count: cluster.brands.length,
    }));

    const [activeCluster, setActiveCluster] = useState(clusters[0]?.id ?? "");
    const currentCluster = clusters.find((cluster) => cluster.id === activeCluster) ?? clusters[0];
    const clusterBrands = currentCluster?.raw.brands ?? [];
    const [activeBrand, setActiveBrand] = useState(getBrandId(clusterBrands[0]?.brand ?? ""));
    const [searchValue, setSearchValue] = useState("");
    const deferredQuery = useDeferredValue(searchValue.trim().toLowerCase());
    const [manualOpenItemId, setManualOpenItemId] = useState<string | null>(null);

    const currentBrand = clusterBrands.find((brand) => getBrandId(brand.brand) === activeBrand) ?? clusterBrands[0];
    const faqItems = currentBrand?.faqs ?? [];

    const filteredFaqs = useMemo(() => {
        if (!deferredQuery) {
            return faqItems;
        }

        return faqItems.filter((faq) => buildQuestionSearchText(faq.question, faq.answer).includes(deferredQuery));
    }, [faqItems, deferredQuery]);

    const visibleCount = filteredFaqs.length;
    const firstVisibleId = filteredFaqs[0] ? `faq-${getBrandId(currentBrand?.brand ?? "")}-${0}` : null;
    const openItemId = manualOpenItemId && filteredFaqs.some((_, index) => manualOpenItemId === `faq-${getBrandId(currentBrand?.brand ?? "")}-${index}`)
        ? manualOpenItemId
        : firstVisibleId;

    function onClusterKeyDown(index: number, event: KeyboardEvent<HTMLButtonElement>) {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            const next = clusters[Math.min(index + 1, clusters.length - 1)];
            document.getElementById(`home-faq-cluster-${next.id}`)?.focus();
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            const previous = clusters[Math.max(index - 1, 0)];
            document.getElementById(`home-faq-cluster-${previous.id}`)?.focus();
        }
    }

    return (
        <Section className="bg-[#f8fafc] py-8 sm:py-10 lg:py-12">
            <Container className="max-w-[1200px]">
                <div className="mx-auto mb-6 max-w-[860px] text-center">
                    <div className="section-pill mx-auto">
                        <span>ENGINE REPLACEMENT FAQ HUB</span>
                    </div>

                    <h2 className="mt-4 font-['Manrope'] text-[30px] font-bold leading-[1.08] text-[#0d1b2e] sm:text-[34px] lg:text-[40px]">
                        <span>Your Engine Replacement </span>
                        <span className="text-[#15803d]">Questions, Answered </span>
                        <span>by Cluster and Brand.</span>
                    </h2>

                    <p className="mt-3 text-[15px] leading-[1.7] text-[#6b7280]">
                        10 topic clusters. 10 brands. Structured answers with tables, points and paragraphs.
                    </p>

                    <div className="relative mx-auto mt-4 max-w-[560px] text-left text-[#94a3b8]">
                        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2">
                            <SearchIcon />
                        </span>
                        <input
                            id="faq-search-input"
                            type="search"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            placeholder="Search FAQs - e.g. BMW timing chain cost"
                            aria-label="Search FAQs"
                            className="h-[52px] w-full rounded-full border-[1.5px] border-[#d8e1eb] bg-white pl-12 pr-5 text-[15px] text-[#0d1b2e] outline-none transition focus:border-[#15803d] focus:shadow-[0_0_0_3px_rgba(21,128,61,0.15)]"
                        />
                    </div>
                </div>

                <div className="grid items-start gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
                    <nav
                        className="grid grid-cols-2 gap-2 rounded-[24px] bg-[#0d1b2e] p-3 shadow-[0_18px_36px_rgba(13,27,46,0.14)] md:sticky md:top-8 md:grid-cols-1 md:gap-0 md:overflow-hidden md:p-0"
                        aria-label="FAQ topic clusters"
                        role="tablist"
                    >
                        {clusters.map((cluster, index) => {
                            const isActive = cluster.id === activeCluster;

                            return (
                                <button
                                    key={cluster.id}
                                    id={`home-faq-cluster-${cluster.id}`}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls="faq-content"
                                    onClick={() => {
                                        setActiveCluster(cluster.id);
                                        setActiveBrand(getBrandId(cluster.raw.brands[0]?.brand ?? ""));
                                        setManualOpenItemId(null);
                                    }}
                                    onKeyDown={(event) => onClusterKeyDown(index, event)}
                                    className={`relative flex min-h-[84px] flex-col items-start gap-2 rounded-[16px] border border-[#1e3a5f] px-3 py-3 text-left transition md:min-h-[56px] md:flex-row md:items-center md:gap-3 md:rounded-none md:border-x-0 md:border-t-0 md:px-4 md:py-4 ${isActive
                                            ? "bg-[rgba(21,128,61,0.12)] text-white"
                                            : "bg-transparent text-[#94a3b8] hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {isActive ? <span className="absolute left-0 top-0 hidden h-full w-[3px] rounded-r-sm bg-[#22c55e] md:block" /> : null}
                                    <div className="flex items-center gap-2">
                                        <ClusterIcon type={cluster.raw.cluster.includes("COST") ? "pound" : cluster.raw.cluster.includes("FAILURE") ? "warning" : cluster.raw.cluster.includes("TYPE") ? "layers" : cluster.raw.cluster.includes("REBUILD") ? "scales" : cluster.raw.cluster.includes("SPECIALIST") ? "shield" : cluster.raw.cluster.includes("CODE") ? "chip" : cluster.raw.cluster.includes("LIFESPAN") ? "clock" : cluster.raw.cluster.includes("PROCESS") ? "process" : cluster.raw.cluster.includes("VALUE") ? "chart" : "star"} />
                                        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/70 md:hidden">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <span className="flex-1 text-[12px] font-medium leading-[1.35] md:text-[13px]">
                                        <span className="hidden md:inline">{index + 1}. </span>
                                        {cluster.label}
                                    </span>
                                    <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${isActive ? "bg-[#15803d] text-white" : "bg-[#1e3a5f] text-[#94a3b8]"}`}>
                                        {cluster.count}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>

                    <div id="faq-content" className="overflow-hidden rounded-[24px] border border-[#dfe6ef] bg-white shadow-[0_10px_30px_rgba(13,27,46,0.07)]">
                        <div className="border-b border-[#e2e8f0] bg-[#f8fafc] px-4 py-3">
                            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Select car brand">
                                {clusterBrands.map((brand) => {
                                    const isActive = getBrandId(brand.brand) === activeBrand;

                                    return (
                                        <button
                                            key={brand.brand}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            onClick={() => {
                                                setActiveBrand(getBrandId(brand.brand));
                                                setManualOpenItemId(null);
                                            }}
                                            className={`flex min-w-[110px] flex-none flex-col items-center justify-center gap-1 rounded-[14px] border px-3 py-2 text-center transition ${isActive
                                                    ? "border-[#d9e4db] bg-white text-[#0d1b2e] shadow-[0_8px_20px_rgba(13,27,46,0.06)]"
                                                    : "border-transparent bg-transparent text-[#6b7280] hover:bg-white"
                                                }`}
                                        >
                                            <span className={`text-[12px] font-semibold ${isActive ? "text-[#0d1b2e]" : "text-[#6b7280]"}`}>
                                                {brand.brand}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 border-b border-[#eef2f7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-[12px] font-medium text-[#64748b]">
                                {deferredQuery
                                    ? `Showing ${visibleCount} result${visibleCount === 1 ? "" : "s"} for "${searchValue.trim()}"`
                                    : `You are viewing ${currentCluster?.label ?? ""} - ${currentBrand?.brand ?? ""}`}
                            </p>

                            <a
                                href="#home-hero-reg-form"
                                data-quote-context={`FAQ - ${currentBrand?.brand ?? ""} - ${currentCluster?.label ?? ""}`}
                                data-quote-source="home-faq-header-cta"
                                className="inline-flex min-h-[40px] items-center justify-center rounded-[10px] bg-[#15803d] px-4 text-[13px] font-semibold text-white transition hover:bg-[#116533]"
                            >
                                Get Engine Quotes
                            </a>
                        </div>

                        <div className="faq-accordion max-h-[560px] overflow-y-auto [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin] lg:max-h-[640px]" role="region" aria-live="polite">
                            {filteredFaqs.map((faq, index) => {
                                const itemId = `faq-${getBrandId(currentBrand?.brand ?? "")}-${index}`;
                                const isOpen = openItemId === itemId;

                                return (
                                    <div key={itemId} className="block">
                                        <button
                                            type="button"
                                            className={`flex min-h-[56px] w-full items-center justify-between gap-4 border-b px-5 py-5 text-left transition sm:px-6 ${isOpen
                                                    ? "border-b-2 border-[#22c55e] text-[#15803d]"
                                                    : "border-[#f1f5f9] text-[#0d1b2e] hover:bg-[#f8fafc]"
                                                }`}
                                            aria-expanded={isOpen}
                                            aria-controls={`${itemId}-answer`}
                                            onClick={() => setManualOpenItemId((current) => (current === itemId ? null : itemId))}
                                        >
                                            <span className="text-[15px] font-semibold leading-[1.45]">
                                                {highlightText(faq.question, deferredQuery)}
                                            </span>
                                            <ChevronIcon open={isOpen} />
                                        </button>

                                        <div
                                            id={`${itemId}-answer`}
                                            hidden={!isOpen}
                                            className="border-b border-[#e2e8f0] bg-[#f0fdf4] px-5 py-5 sm:px-6 sm:py-6"
                                        >
                                            {renderAnswer(faq.answer, deferredQuery)}

                                            <a
                                                href="#home-hero-reg-form"
                                                data-quote-context={faq.question}
                                                data-quote-source="home-faq-answer-cta"
                                                className="mt-4 inline-block text-[14px] font-semibold text-[#15803d] transition hover:underline"
                                            >
                                                {faq.answer.cta ?? "Get Engine Quotes"}
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className={`px-6 py-12 text-center text-[14px] text-[#6b7280] ${visibleCount === 0 ? "block" : "hidden"}`}>
                                No matching FAQs yet. Try a different brand, cluster or search term.
                            </div>
                        </div>

                        <div className="grid gap-3 border-t border-[#eef2f7] bg-[#fcfdff] px-4 py-4 sm:grid-cols-3 sm:px-6">
                            <div className="flex items-start gap-3">
                                <TrustIcon>
                                    <ShieldTickIcon />
                                </TrustIcon>
                                <div>
                                    <p className="text-[13px] font-semibold text-[#0d1b2e]">100% Independent</p>
                                    <p className="mt-1 text-[12px] leading-[1.6] text-[#6b7280]">We are not a supplier, garage or engine builder.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <TrustIcon>
                                    <UsersIcon />
                                </TrustIcon>
                                <div>
                                    <p className="text-[13px] font-semibold text-[#0d1b2e]">100+ Vetted Specialists</p>
                                    <p className="mt-1 text-[12px] leading-[1.6] text-[#6b7280]">Quotes from trusted UK engine replacement experts.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <TrustIcon>
                                    <PoundIcon />
                                </TrustIcon>
                                <div>
                                    <p className="text-[13px] font-semibold text-[#0d1b2e]">Free & No Obligation</p>
                                    <p className="mt-1 text-[12px] leading-[1.6] text-[#6b7280]">Compare real quotes and decide what is right for you.</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[#eef2f7] bg-white px-4 py-5 sm:px-6 sm:py-6">
                            <div className="rounded-[16px] border border-[#dfe6ef] bg-[#f8fbff] p-4 sm:p-5">
                                <div className="flex flex-col gap-4 border-l-4 border-[#0d1b2e] pl-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="max-w-[54ch]">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748b]">Still Need A Real Price?</p>
                                        <p className="mt-2 text-[14px] leading-[1.7] text-[#475569] sm:text-[15px]">
                                            Compare quotes from vetted UK engine specialists and see real replacement prices for your vehicle, engine code and warranty options.
                                        </p>
                                    </div>

                                    <a
                                        href="#home-hero-reg-form"
                                        data-quote-context="FAQ footer CTA"
                                        data-quote-source="home-faq-footer-cta"
                                        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#0d1b2e] px-5 text-[14px] font-semibold text-white transition hover:bg-[#11284a] sm:w-auto sm:min-w-[250px]"
                                    >
                                        <span>Get Free Engine Quotes</span>
                                        <ArrowIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
