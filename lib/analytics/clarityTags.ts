"use client";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Sets a Clarity session tag (learn.microsoft.com/en-us/clarity/setup-and-
 * installation/clarity-api — `window.clarity('set', key, value)`), without
 * requiring every caller to import the @microsoft/clarity package or check
 * whether it has loaded yet. A no-op before Clarity.init() has run
 * (components/analytics/Clarity.tsx) or if no project ID is configured.
 */
export function setClarityTag(key: string, value: string): void {
  try {
    window.clarity?.("set", key, value);
  } catch {
    // never let a tagging call break the page
  }
}
