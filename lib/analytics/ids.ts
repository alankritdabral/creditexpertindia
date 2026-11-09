"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function getField(target: string, field: string, timeoutMs: number): Promise<string | undefined> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.gtag) {
      resolve(undefined);
      return;
    }
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(undefined);
      }
    }, timeoutMs);
    try {
      window.gtag("get", target, field, (value: unknown) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(typeof value === "string" ? value : undefined);
      });
    } catch {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve(undefined);
      }
    }
  });
}

/**
 * Reads GA4's own client_id and session_id via `gtag('get', …)`
 * (developers.google.com/tag-platform/gtagjs/reference). Returns an empty
 * object — never throws — if GA hasn't loaded, is blocked by the visitor's
 * browser, or analytics consent was denied (gtag still responds, but GA's
 * own cookies won't be set, so client_id/session_id are effectively absent
 * across visits). A 1s timeout guards against a callback that never fires.
 */
export async function getGaIds(gaId: string): Promise<{ clientId?: string; sessionId?: string }> {
  const [clientId, sessionId] = await Promise.all([
    getField(gaId, "client_id", 1000),
    getField(gaId, "session_id", 1000),
  ]);
  return { clientId, sessionId };
}
