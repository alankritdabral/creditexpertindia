import { adminDb } from "@/lib/firebaseAdmin";
import { sanitizeAttribution, type Attribution } from "@/lib/analytics/sanitizeAttribution";

/**
 * A copy of a lead with no personal data — no name, phone, PAN, email or
 * free-text fields — written to its own Firestore collection so it (unlike
 * `leads` or `credit_reports`) is safe to export to BigQuery (Phase 7) and
 * join against GA4 events on `ga_client_id`.
 */
export type LeadAnalyticsRecord = {
  lead_source: "contact" | "calculator_lead" | "eligibility";
  created_at: FirebaseFirestore.FieldValue;
  attribution: Attribution;
  ga_client_id: string | null;
  ga_session_id: string | null;
  consent: {
    contact: boolean;
    shareWithLenders: boolean;
    noticeVersion: string | null;
  };
  status: "new";
};

type WriteLeadAnalyticsInput = {
  leadSource: LeadAnalyticsRecord["lead_source"];
  attribution: unknown;
  ga: unknown;
  consent: { contact: boolean; shareWithLenders?: boolean; noticeVersion?: string | null };
};

/**
 * Writes the PII-free copy. Never throws: a failure here must not stop a
 * lead from being saved or a visitor's form from succeeding, since the
 * record this writes is for reporting, not for contacting anyone.
 */
export async function writeLeadAnalytics(input: WriteLeadAnalyticsInput): Promise<string | null> {
  try {
    const gaIds = (input.ga && typeof input.ga === "object" ? input.ga : {}) as {
      clientId?: unknown;
      sessionId?: unknown;
    };
    const record: Omit<LeadAnalyticsRecord, "created_at"> & { created_at: Date } = {
      lead_source: input.leadSource,
      created_at: new Date(),
      attribution: sanitizeAttribution(input.attribution),
      ga_client_id: typeof gaIds.clientId === "string" ? gaIds.clientId : null,
      ga_session_id: typeof gaIds.sessionId === "string" ? gaIds.sessionId : null,
      consent: {
        contact: !!input.consent.contact,
        shareWithLenders: !!input.consent.shareWithLenders,
        noticeVersion: typeof input.consent.noticeVersion === "string" ? input.consent.noticeVersion : null,
      },
      status: "new",
    };
    const docRef = await adminDb.collection("lead_analytics").add(record);
    return docRef.id;
  } catch (e) {
    console.error("[lead_analytics] write failed", e);
    return null;
  }
}
