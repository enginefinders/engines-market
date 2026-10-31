import type { StaticBlock } from "@/lib/staticPagePreview";
type TableBlock = Extract<StaticBlock, { type: "table" }>;
export default function PriceTableSection({ block }: { block: TableBlock }) {
  return <div className="my-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="min-w-full text-left text-sm"><thead className="bg-[#0a2952] text-white">{block.headers.length ? <tr>{block.headers.map((header) => <th className="border-b border-white/10 px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] whitespace-nowrap" key={header}>{header}</th>)}</tr> : null}</thead><tbody>{block.rows.map((row, rowIndex) => <tr className="group odd:bg-white even:bg-slate-50/70 hover:bg-emerald-50/50" key={rowIndex}>{row.map((cell, cellIndex) => <td className="border-b border-slate-100 px-4 py-3.5 align-top leading-6 text-slate-600 group-last:border-b-0" key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

