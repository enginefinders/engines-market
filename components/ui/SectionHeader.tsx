type SectionHeaderProps = {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  tag,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[860px] text-center" : "max-w-[860px]"}>
      {tag && (
        <p className="section-pill text-label mb-1.5">
          {tag}
        </p>
      )}

      <h2>
        {title}
      </h2>

      {subtitle && (
        <p className="text-body mt-2.5 text-slate-700">
          {subtitle}
        </p>
      )}
    </div>
  );
}
