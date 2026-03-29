import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  primary?: boolean;
};

export function Button({ children, primary = false, className = "", ...rest }: Props) {
  return (
    <button {...rest} className={`cp-button ${primary ? "primary" : ""} ${className}`.trim()}>
      {children}
    </button>
  );
}
