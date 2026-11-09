/**
 * Shared between app/layout.tsx (the gtag-consent-init script) and anything
 * that needs to read GA's own client_id/session_id (lib/analytics/ids.ts),
 * so there is exactly one place this falls back to the literal ID.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VNY6TW0ZW0";
