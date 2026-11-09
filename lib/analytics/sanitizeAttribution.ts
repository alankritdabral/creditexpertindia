/**
 * No "use client" here, deliberately: this file has zero browser
 * dependency, so both lib/analytics/attribution.ts (client-side capture)
 * and the API routes that store a lead's attribution (Phase 5) import it
 * directly, rather than going through a client-only module.
 */

/** Every key this module will ever read from the URL or store. Anything
 * else is dropped by sanitizeAttribution — this is the allowlist referenced
 * in plans/01-visibility-and-analytics.md Phase 3. */
export const ALLOWED_ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "landing_path",
  "referrer_host",
  "first_seen_at",
] as const;

export type AttributionKey = (typeof ALLOWED_ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

const MAX_VALUE_LENGTH = 100;

/**
 * Keeps only allowlisted keys, coerces every value to a string and caps its
 * length. Used both client-side (before writing to storage) and server-side
 * (before writing to Firestore).
 */
export function sanitizeAttribution(input: unknown): Attribution {
  const out: Attribution = {};
  if (!input || typeof input !== "object") return out;
  for (const key of ALLOWED_ATTRIBUTION_KEYS) {
    const raw = (input as Record<string, unknown>)[key];
    if (typeof raw === "string" && raw.length > 0) {
      out[key] = raw.slice(0, MAX_VALUE_LENGTH);
    }
  }
  return out;
}
