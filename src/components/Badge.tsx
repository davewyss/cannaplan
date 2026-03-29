import type { ReactNode } from "react";

export function Badge({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`cp-badge ${dark ? "dark" : ""}`}>{children}</span>;
}
