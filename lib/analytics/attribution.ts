"use client";

import { getConsent } from "@/lib/consent";
import { ALLOWED_ATTRIBUTION_KEYS, sanitizeAttribution, type Attribution } from "@/lib/analytics/sanitizeAttribution";

export type { Attribution };
export { sanitizeAttribution };

const LAST_TOUCH_KEY = "cei_lt";
const FIRST_TOUCH_KEY = "cei_ft";
const FIRST_TOUCH_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 days, matching Google's documented GCLID capture pattern

function safeStorage(kind: "local" | "session"): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function readJSON<T>(storage: Storage | null, key: string): T | null {
  try {
    const raw = storage?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON(storage: Storage | null, key: string, value: unknown): void {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private browsing, quota, blocked site data): the
    // capture is lost for next time, which is acceptable — never throw.
  }
}

type StoredFirstTouch = { data: Attribution; capturedAt: number };

/**
 * Captures UTM parameters and ad-click IDs from the current URL. Call this
 * once, on first client render of the root layout. Last-touch is kept for
 * the current tab's session (sessionStorage, no consent needed — it holds
 * nothing but campaign tags, not a persistent identifier). First-touch is
 * kept for 90 days, but ONLY once analytics consent has been granted: it is
 * the closest thing to a cross-visit identifier this module stores, so it
 * follows the same consent gate as everything else analytics-related.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  for (const key of ALLOWED_ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  const hasNewTouch = Object.keys(fromUrl).length > 0;
  const lastTouch: Attribution = sanitizeAttribution({
    ...fromUrl,
    ...(hasNewTouch || !readJSON(safeStorage("session"), LAST_TOUCH_KEY)
      ? { landing_path: window.location.pathname, referrer_host: safeReferrerHost() }
      : {}),
  });
  if (Object.keys(lastTouch).length > 0 || hasNewTouch) {
    writeJSON(safeStorage("session"), LAST_TOUCH_KEY, lastTouch);
  }

  if (getConsent()?.analytics !== "granted") return;

  const localStore = safeStorage("local");
  const existing = readJSON<StoredFirstTouch>(localStore, FIRST_TOUCH_KEY);
  const isExpired = existing ? Date.now() - existing.capturedAt > FIRST_TOUCH_MAX_AGE_MS : true;
  if (hasNewTouch || !existing || isExpired) {
    writeJSON(localStore, FIRST_TOUCH_KEY, {
      data: sanitizeAttribution({
        ...fromUrl,
        landing_path: window.location.pathname,
        referrer_host: safeReferrerHost(),
        first_seen_at: new Date().toISOString(),
      }),
      capturedAt: Date.now(),
    } satisfies StoredFirstTouch);
  }
}

function safeReferrerHost(): string | undefined {
  try {
    return document.referrer ? new URL(document.referrer).hostname : undefined;
  } catch {
    return undefined;
  }
}

/** Reads back what's been captured so far, for attaching to a lead. */
export function getAttribution(): { firstTouch: Attribution; lastTouch: Attribution } {
  const firstTouchStored = readJSON<StoredFirstTouch>(safeStorage("local"), FIRST_TOUCH_KEY);
  const lastTouch = readJSON<Attribution>(safeStorage("session"), LAST_TOUCH_KEY) ?? {};
  return {
    firstTouch: firstTouchStored?.data ?? {},
    lastTouch,
  };
}
