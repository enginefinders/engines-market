import type { StaticBlock } from "@/lib/staticPagePreview";
import LegalInlineText from "@/components/static-pages-comp/legal/LegalInlineText";
type TableBlock = Extract<StaticBlock, { type: "table" }>;
export default function LegalTableSection({ block }: { block: TableBlock }) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-[#e2e8f0] bg-white shadow-[0_1px_2px_rgba(0,0,0,.02)]">
      <table className="min-w-[580px] w-full border-collapse text-left text-[15px]">
        {block.headers.length ? <thead className="bg-[#0a2952] text-white"><tr>{block.headers.map((header, index) => <th className="border-b border-white/10 px-4 py-3 font-display text-[13px] font-semibold uppercase tracking-[0.05em] text-[#f1f5f9]" key={`${header}-${index}`}><LegalInlineText text={header} /></th>)}</tr></thead> : null}
        <tbody>{block.rows.map((row, rowIndex) => <tr className="border-b border-[#edf2f7] transition last:border-0 hover:bg-[#f8fafc]" key={rowIndex}>{row.map((cell, cellIndex) => <td className="px-4 py-3 align-top text-[#1e293b]" key={cellIndex}><LegalInlineText text={cell} /></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

