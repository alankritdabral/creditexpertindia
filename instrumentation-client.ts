/**
 * Runs once per document load, after the HTML has loaded and before
 * hydration (node_modules/next/dist/docs/01-app/03-api-reference/
 * 03-file-conventions/instrumentation-client.md). Only synchronous
 * top-level code here is guaranteed to finish before hydration, so the
 * capture below must stay synchronous (it only reads the URL and
 * localStorage — see lib/analytics/attribution.ts).
 */
import { captureAttribution } from "@/lib/analytics/attribution";
import { contentGroupFor } from "@/lib/analytics/contentGroup";
import { setClarityTag } from "@/lib/analytics/clarityTags";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

captureAttribution();

// The gtag-consent-init script (app/layout.tsx) runs `beforeInteractive`, so
// `window.gtag` already exists by the time this file runs. This sets the
// content_group for the FIRST page load; onRouterTransitionStart below
// handles every subsequent client-side navigation.
if (typeof window !== "undefined" && window.gtag) {
  try {
    window.gtag("set", { content_group: contentGroupFor(window.location.pathname) });
  } catch {
    // never block page load over this
  }
}

/**
 * Fired on every client-side navigation. Sets the GA4 `content_group` for
 * the page being navigated TO, before enhanced measurement's history-based
 * `page_view` fires for it, so that page_view carries the right group. This
 * is the one piece of Phase 2's gtag-consent-init script that was
 * deliberately deferred to here (see app/layout.tsx), since contentGroupFor
 * didn't exist until this phase.
 */
export function onRouterTransitionStart(url: string) {
  try {
    const pathname = new URL(url, window.location.href).pathname;
    const group = contentGroupFor(pathname);
    window.gtag?.("set", { content_group: group });
    setClarityTag("content_group", group);
  } catch {
    // A malformed url should never break navigation.
  }
}
