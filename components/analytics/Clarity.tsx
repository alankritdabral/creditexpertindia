"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { getConsent, onConsentChange } from "@/lib/consent";
import { setClarityTag } from "@/lib/analytics/clarityTags";
import { contentGroupFor } from "@/lib/analytics/contentGroup";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

function applyConsent(recordings: "granted" | "denied") {
  // Always pass explicit arguments: calling Clarity.consentV2() with NO
  // arguments GRANTS consent by default (per the npm package's own README),
  // which would be exactly backwards for a visitor who hasn't said yes yet.
  Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: recordings });
}

/**
 * Mounted once in the root layout. Loads Microsoft Clarity only if a
 * project ID is configured (owner action: create a Clarity project and set
 * NEXT_PUBLIC_CLARITY_ID — see plans/01-visibility-and-analytics.md Phase 6),
 * and keeps its consent state in sync with the same banner that gates GA4.
 */
export function ClarityLoader() {
  useEffect(() => {
    if (!CLARITY_PROJECT_ID) return;
    try {
      Clarity.init(CLARITY_PROJECT_ID);
    } catch {
      return; // never let a failed third-party script load break the page
    }

    applyConsent(getConsent()?.recordings === "granted" ? "granted" : "denied");
    setClarityTag("content_group", contentGroupFor(window.location.pathname));

    return onConsentChange((state) => {
      applyConsent(state?.recordings === "granted" ? "granted" : "denied");
    });
  }, []);

  return null;
}
