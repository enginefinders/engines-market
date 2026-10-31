import type { StaticBlock } from "@/lib/staticPagePreview";
type TableBlock = Extract<StaticBlock, { type: "table" }>;
export default function FailureTableSection({ block }: { block: TableBlock }) {
  return <div className="my-5 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm"><table className="min-w-full text-left text-sm"><thead className="bg-[#0a2952] text-white">{block.headers.length ? <tr>{block.headers.map((header) => <th className="border-b border-white/10 px-4 py-3 font-bold" key={header}>{header}</th>)}</tr> : null}</thead><tbody>{block.rows.map((row, rowIndex) => <tr className={`odd:bg-white even:bg-rose-50/50`} key={rowIndex}>{row.map((cell, cellIndex) => <td className="border-b border-slate-100 px-4 py-3 align-top text-slate-700" key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

