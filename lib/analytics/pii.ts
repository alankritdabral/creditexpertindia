/**
 * Last line of defence against personal data reaching GA or Clarity.
 * lib/analytics/events.ts's types should already make this unreachable in
 * practice (every parameter is an enum/band/number, never free text), but
 * this runs on every event regardless, because a typed union only helps as
 * long as every call site is written correctly.
 *
 * Google's PII policy (support.google.com/analytics/answer/7686480) names
 * names, emails, phone numbers and precise addresses; we also check PAN and
 * Aadhaar, since this is an Indian financial site that collects both.
 */

const PATTERNS: Array<{ name: string; re: RegExp }> = [
  // Indian mobile number: optional +91/91 prefix, then a 10-digit number
  // starting 6-9. The 10 digits may be written as one unbroken run or
  // grouped 5+5 with a space/hyphen (e.g. "98765 43210"), both common in
  // how this site's own forms and confirmation copy display a number.
  { name: "mobile", re: /(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}\b/ },
  { name: "email", re: /[^\s@]+@[^\s@]+\.[^\s@]+/ },
  // PAN: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
  { name: "pan", re: /\b[A-Z]{5}\d{4}[A-Z]\b/i },
  // Aadhaar: 12 digits, optionally grouped in 4s
  { name: "aadhaar", re: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/ },
];

/** Returns the names of every pattern that matched somewhere in `value`. */
export function findPII(value: string): string[] {
  return PATTERNS.filter(({ re }) => re.test(value)).map(({ name }) => name);
}

/**
 * Drops any parameter whose value matches findPII, instead of sending it.
 * Works on primitive values only (string/number/boolean) — an event
 * parameter should never be an object or array (see lib/analytics/events.ts).
 * In development, logs a warning naming the dropped parameter so a bad call
 * site gets noticed immediately instead of silently losing data in GA.
 */
export function sanitizeParams<T extends Record<string, unknown>>(params: T): Partial<T> {
  const out: Partial<T> = {};
  for (const key of Object.keys(params) as (keyof T)[]) {
    const value = params[key];
    if (typeof value === "string" && findPII(value).length > 0) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[analytics] dropped parameter "${String(key)}": looked like personal data`, {
          matched: findPII(value),
        });
      }
      continue;
    }
    out[key] = value;
  }
  return out;
}
