/**
 * Visitor-facing consent notice text. See lib/consent.ts for NOTICE_VERSION
 * (bump it whenever this text changes materially, so re-consent is asked).
 *
 * NOTE: this copy has not been reviewed by counsel. It is written in plain
 * language per the DPDP Act's notice requirements (an itemised description
 * of the data and purpose, and how to withdraw), but the exact wording
 * should be confirmed against legal advice before this ships to production.
 * See plans/01-visibility-and-analytics.md Phase 2, decision D4.
 */
export const consentNotice = {
  heading: "Before you continue",
  body: "We'd like to use a couple of tools to understand how visitors use this site, so we can improve it. None of these send your name, phone number or any other personal details to Google or Microsoft — they only see anonymous usage data.",
  items: [
    {
      key: "analytics" as const,
      label: "Usage analytics (Google Analytics)",
      description:
        "Measures which pages are visited, how people move through the site, and whether an enquiry form was used. Kept for 14 months.",
    },
    {
      key: "recordings" as const,
      label: "Session recordings (Microsoft Clarity)",
      description:
        "Records anonymised mouse movement and scrolling so we can see where visitors get stuck. Form fields are always blanked out. Kept for 30 days.",
    },
  ],
  acceptLabel: "Accept all",
  rejectLabel: "Reject all",
  chooseLabel: "Choose what's used",
  saveLabel: "Save my choice",
  withdrawalNote: "You can change this choice at any time from \"Cookie settings\" in the footer.",
  privacyPolicyHref: "/privacy-policy",
  privacyPolicyLabel: "Read our privacy policy",
};
