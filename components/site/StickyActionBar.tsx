"use client";

import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { ctas } from "@/content/site";
import { track } from "@/lib/analytics";

/** Always-visible primary actions on phones and tablets. Hidden from lg up, where the header carries them. */
export function StickyActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface px-3 pt-3 shadow-[0_-4px_16px_rgba(11,31,58,0.08)] lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-[480px] gap-3">
        <WhatsAppButton location="mobile-bar" label="WhatsApp" className="shrink-0 whitespace-nowrap px-4" />
        <ButtonLink
          href="/#get-started"
          className="flex-1 whitespace-nowrap px-3"
          onClick={() => track("cta_click", { location: "mobile-bar", label: ctas.primary })}
        >
          {ctas.primary}
        </ButtonLink>
      </div>
    </div>
  );
}
