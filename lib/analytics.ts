// Thin wrapper over GA4's gtag so call sites stay one line and safe on the server.
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Conversion events used across the site:
 * generate_lead, otp_sent, otp_verified, report_shown, whatsapp_click, call_click,
 * calculator_used, cta_click.
 * Never pass PAN, mobile number, date of birth or names as parameters.
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
