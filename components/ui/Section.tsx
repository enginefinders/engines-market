import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
};

export default function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <section className={`py-7 sm:py-8 lg:py-10 ${className}`} {...props}>
      {children}
    </section>
  );
}
