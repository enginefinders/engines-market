import Image from "next/image";
import type { StaticBlock } from "@/lib/staticPagePreview";
type ImageBlock = Extract<StaticBlock, { type: "image" }>;
const imageSrc = (source: string) => source.startsWith("/") ? source : "/" + source.replace(/^\.\//, "");
export default function PriceImageSection({ block }: { block: ImageBlock }) {
  return block.src ? <div className="my-7 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"><Image className="max-h-80 w-full object-contain" src={imageSrc(block.src)} alt={block.alt} width={1200} height={630} /></div> : null;
}

