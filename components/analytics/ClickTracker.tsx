"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/track";
import type { ContactMethod } from "@/lib/analytics/events";

function contactMethodFor(href: string): ContactMethod | null {
  if (href.startsWith("https://wa.me/") || href.includes("wa.me/")) return "whatsapp";
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  return null;
}

/**
 * One delegated click listener for the whole document, mounted once in the
 * root layout. Two things it recognises, matching plans/01-…/Appendix A:
 *
 * - `cta_click`: any element carrying `data-analytics-cta` (and optionally
 *   `data-analytics-location`), wherever it lives in the tree — server
 *   components like ProductHero/PageSections only need the data attribute
 *   added, not a client-side onClick handler each.
 * - `contact_click`: any wa.me / mailto: / tel: link, recognised by its href
 *   rather than a data attribute, since those exist in several places
 *   (Footer, /contact, ContactForm's success view) that weren't all
 *   otherwise touched for analytics.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const ctaEl = target?.closest<HTMLElement>("[data-analytics-cta]");
      if (ctaEl) {
        const anchor = ctaEl.closest("a") as HTMLAnchorElement | null;
        track({
          name: "cta_click",
          params: {
            cta_id: ctaEl.dataset.analyticsCta ?? "unknown",
            cta_location: ctaEl.dataset.analyticsLocation ?? "unknown",
            link_target: anchor?.getAttribute("href") ?? "",
          },
        });
      }

      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href");
      if (href) {
        const method = contactMethodFor(href);
        if (method) {
          track({
            name: "contact_click",
            params: {
              contact_method: method,
              cta_location: anchor?.closest<HTMLElement>("[data-analytics-location]")?.dataset.analyticsLocation ?? "unknown",
            },
          });
        }
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
