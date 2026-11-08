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
