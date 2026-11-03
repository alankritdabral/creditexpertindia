import type { ReactNode } from "react";

const RULE = "bg-[#d8dee8]";
const EDGE = "max(0px, calc(50% - 610px))";

/** Wraps a page so two faint vertical rails run down the container edges (desktop only). */
export function SectionRules({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full">
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden min-[1240px]:block">
        <span className={`absolute top-0 bottom-0 w-px ${RULE}`} style={{ left: EDGE }} />
        <span className={`absolute top-0 bottom-0 w-px ${RULE}`} style={{ right: EDGE }} />
      </div>
    </div>
  );
}

/** Full-width hairline between sections. */
export function SectionDivider() {
  return (
    <div aria-hidden className={`relative z-30 h-px w-full ${RULE}`} />
  );
}
