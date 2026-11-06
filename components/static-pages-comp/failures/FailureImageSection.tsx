import Image from "next/image";
import type { StaticBlock } from "@/lib/staticPagePreview";
type ImageBlock = Extract<StaticBlock, { type: "image" }>;
const imageSrc = (source: string) => source.startsWith("/") ? source : "/" + source.replace(/^\.\//, "");
export default function FailureImageSection({ block }: { block: ImageBlock }) {
  return block.src ? <Image className="my-5 max-h-80 w-full rounded-xl object-contain" src={imageSrc(block.src)} alt={block.alt} width={1200} height={630} /> : null;
}

