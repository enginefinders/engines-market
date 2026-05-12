import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export default function Button({ children, href = "#", className = "", ...props }: ButtonProps) {
  return (
    <a
      href={href}
      className={`button-primary ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
