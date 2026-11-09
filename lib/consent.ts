"use client";

/**
 * Visitor consent for analytics (Google Analytics) and session recordings
 * (Microsoft Clarity). Stored client-side only, in localStorage, and never
 * sent anywhere by this module — callers decide what to do with it.
 *
 * Design notes (see plans/01-visibility-and-analytics.md Phase 2, decision D4):
 * - Analytics is OFF (denied) until the visitor explicitly accepts. This is
 *   the cautious reading of the DPDP Act's consent requirements; if counsel
 *   advises a notice-only basis is enough for analytics, ANALYTICS_DEFAULT
 *   is the one constant to change.
 * - Ads storage is always denied: this site runs no ads and debt/credit
 *   products are a Google Ads "sensitive category", so ad personalisation
 *   is never requested.
 * - Every read and write is wrapped in try/catch: localStorage can throw in
 *   private browsing, with blocked site data, or during prerendering/SSR.
 *   A failure here must never break the page.
 */

export const NOTICE_VERSION = "2026-11-v1";
const STORAGE_KEY = "cei_consent";

/** The cautious default: analytics off until the visitor accepts. Flip this
 * one constant if counsel confirms a notice-only basis is sufficient. */
export const ANALYTICS_DEFAULT: ConsentChoice = "denied";

export type ConsentChoice = "granted" | "denied";

export type ConsentState = {
  /** Google Analytics (GA4) and Core Web Vitals reporting. */
  analytics: ConsentChoice;
  /** Microsoft Clarity session recordings and heatmaps. */
  recordings: ConsentChoice;
  /** The content/consent.ts notice text version the visitor saw and agreed to. */
  noticeVersion: string;
  /** ISO timestamp of when this choice was made. */
  ts: string;
};

type Listener = (state: ConsentState | null) => void;
const listeners = new Set<Listener>();

function safeLocalStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

/** The visitor's stored choice, or null if they haven't chosen yet (or
 * storage is unavailable, e.g. private browsing / blocked site data). */
export function getConsent(): ConsentState | null {
  try {
    const raw = safeLocalStorage()?.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      (parsed.analytics === "granted" || parsed.analytics === "denied") &&
      (parsed.recordings === "granted" || parsed.recordings === "denied") &&
      typeof parsed.noticeVersion === "string" &&
      typeof parsed.ts === "string"
    ) {
      return parsed as ConsentState;
    }
    return null;
  } catch {
    return null;
  }
}

/** Stores the visitor's choice and notifies subscribers (e.g. to push it
 * into gtag Consent Mode and Clarity). Never throws. */
export function setConsent(choice: { analytics: ConsentChoice; recordings: ConsentChoice }): ConsentState {
  const state: ConsentState = {
    analytics: choice.analytics,
    recordings: choice.recordings,
    noticeVersion: NOTICE_VERSION,
    ts: new Date().toISOString(),
  };
  try {
    safeLocalStorage()?.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable: the choice still takes effect for this page load
    // via the listeners below, it just won't be remembered on the next visit.
  }
  listeners.forEach((l) => l(state));
  return state;
}

/** Clears the stored choice, so the banner shows again. Used by "Cookie settings". */
export function clearConsent(): void {
  try {
    safeLocalStorage()?.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  listeners.forEach((l) => l(null));
}

/** Subscribes to consent changes made via setConsent/clearConsent in this
 * tab. Returns an unsubscribe function. */
export function onConsentChange(cb: Listener): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/**
 * Maps a consent choice to a Google Consent Mode v2 payload
 * (developers.google.com/tag-platform/security/guides/consent). Ad storage
 * is always denied here: see the module docblock.
 */
export function toGtagConsent(state: Pick<ConsentState, "analytics">): Record<string, ConsentChoice> {
  return {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: state.analytics,
  };
}
