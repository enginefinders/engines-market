export default function AccentHeading({ text, className }: { text: string; className: string }) {
  const words = text.trim().split(/\s+/);
  const accentCount = Math.min(2, words.length);
  const mainText = words.slice(0, -accentCount).join(" ");
  const accentText = words.slice(-accentCount).join(" ");

  return <h2 className={className}>{mainText ? `${mainText} ` : null}<span className="text-[#078d4a]">{accentText}</span></h2>;
}
