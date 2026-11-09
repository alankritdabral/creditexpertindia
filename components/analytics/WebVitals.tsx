"use client";

import { useEffect } from "react";
import type { CLSMetricWithAttribution, INPMetricWithAttribution, LCPMetricWithAttribution } from "web-vitals/attribution";

type AttributedMetric = CLSMetricWithAttribution | INPMetricWithAttribution | LCPMetricWithAttribution;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends Core Web Vitals to GA4, following the web-vitals library's own
 * documented pattern ("Send the results to Google Analytics" / "Send
 * attribution data" in github.com/GoogleChrome/web-vitals's README) rather
 * than Next's `useReportWebVitals`, whose bundled web-vitals copy still
 * reports the deprecated FID metric (node_modules/next/dist/client/web-vitals.js).
 *
 * Uses the attribution build (web-vitals/attribution) so each event carries
 * a `debug_target` identifying which element was slow — useful once this
 * lands in a GA exploration or BigQuery, not meant to be read in standard
 * reports without registering these as custom dimensions first (Phase 7).
 */
function sendToGA(metric: AttributedMetric) {
  if (typeof window === "undefined" || !window.gtag) return;
  // Each metric's attribution shape names its "what was slow" field
  // differently (CLS: largestShiftTarget, INP: interactionTarget, LCP:
  // target) — narrow by `metric.name` to read the right one.
  const debugTarget =
    metric.name === "CLS"
      ? metric.attribution.largestShiftTarget
      : metric.name === "INP"
        ? metric.attribution.interactionTarget
        : metric.attribution.target;

  window.gtag("event", metric.name, {
    value: metric.delta,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
    ...(debugTarget ? { debug_target: debugTarget } : {}),
  });
}

export function WebVitals() {
  useEffect(() => {
    let cancelled = false;
    import("web-vitals/attribution")
      .then(({ onCLS, onINP, onLCP }) => {
        if (cancelled) return;
        onCLS(sendToGA);
        onINP(sendToGA);
        onLCP(sendToGA);
      })
      .catch(() => {
        // Never let a failed dynamic import of the vitals library break the page.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
