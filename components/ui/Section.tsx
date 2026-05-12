type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`py-7 sm:py-8 lg:py-10 ${className}`}>
      {children}
    </section>
  );
}
