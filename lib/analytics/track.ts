"use client";

import type { AnalyticsEvent } from "./events";
import { sanitizeParams } from "./pii";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

/** Funnel events worth mirroring into Clarity (Clarity.event(name), Phase 6)
 * so a recording search can jump straight to the moment something happened. */
const CLARITY_MIRRORED: ReadonlySet<AnalyticsEvent["name"]> = new Set([
  "lead_form_submit",
  "otp_sent",
  "otp_verified",
  "generate_lead",
  "credit_report_view",
  "lead_form_error",
  "otp_failed",
]);

/**
 * Sends one typed analytics event to GA4 (and, for a short list of funnel
 * moments, mirrors it into Clarity). Never throws, and does nothing on the
 * server or before gtag.js has loaded — callers don't need to check either
 * condition themselves.
 */
export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  try {
    const safeParams = sanitizeParams(event.params as Record<string, unknown>);
    window.gtag?.("event", event.name, safeParams);
    if (CLARITY_MIRRORED.has(event.name)) {
      window.clarity?.("event", event.name);
    }
  } catch {
    // Analytics must never break the page it's instrumenting.
  }
}

export type JourneyStage = "lead" | "report_viewed";

/**
 * Sets the `journey_stage` user property in GA4 (gtag's `user_properties`,
 * NOT an event parameter — see developers.google.com/tag-platform/gtagjs/
 * reference) and mirrors it as a Clarity session tag, in one call. Used at
 * the two points in Appendix A that define this property: a saved lead, and
 * a viewed credit report.
 */
export function setJourneyStage(stage: JourneyStage): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("set", "user_properties", { journey_stage: stage });
    window.clarity?.("set", "journey_stage", stage);
  } catch {
    // never let this break the page
  }
}
