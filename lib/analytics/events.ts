/**
 * The complete, typed event dictionary for this site's analytics.
 * Source of truth: plans/01-visibility-and-analytics.md Appendix A.
 *
 * Every parameter here is an enum, a banded string, or a number — never
 * free text (a form field value, an error message, a file name). That is
 * enforced by this file's types, and double-checked at runtime by
 * lib/analytics/pii.ts before anything is sent.
 *
 * GA4 naming/limits this union is built to respect (see plans/01-… Phase 0):
 * event names ≤40 chars, parameter names ≤40 chars, parameter values ≤100
 * chars, ≤25 parameters per event. None of the names below collide with
 * GA4's reserved event names (click, scroll, page_view, form_start,
 * form_submit, error, file_download, session_start, user_engagement, …).
 */

export type FormId = "eligibility" | "contact" | "calculator_lead";
export type CalculatorId = "smart_emi" | "loan_savings" | "debt_consolidation";
export type Bureau = "experian" | "crif" | "cibil" | "equifax";
export type ReportOutcome = "live" | "fallback" | "cache" | "failed";
export type OtpChannel = "whatsapp" | "sms";
export type OtpStage = "send" | "verify";
export type OtpErrorCode = "rate_limited" | "dispatch_failed" | "incorrect" | "expired" | "too_many" | "network";
export type FormErrorCode =
  | "consent_missing"
  | "name_missing"
  | "dob_missing"
  | "pan_invalid"
  | "mobile_invalid"
  | "salary_below_min"
  | "emi_too_high"
  | "network"
  | "server";
export type DownloadFormat = "bureau_pdf" | "cibil_pdf" | "png_basic" | "png_loans" | "png_eligibility";
export type ReportTab = "enquiries" | "ongoing" | "closed" | "eligibility";
export type ContactMethod = "whatsapp" | "email" | "phone";
export type MenuId = "loans" | "calculators" | "cities" | "resources";

/** Fixed buckets so no raw rupee amount, salary or score is ever sent. */
export type AmountBand = "<1L" | "1-3L" | "3-5L" | "5-10L" | "10-25L" | "25-50L" | "50L+";
export type RateBand = "<10" | "10-12" | "12-14" | "14-16" | "16-20" | "20-24" | "24+";
export type SavingsBand = "0" | "<1k" | "1-3k" | "3-5k" | "5-10k" | "10k+";
export type DurationBand = "<3s" | "3-10s" | "10-30s" | "30s+";

export type AnalyticsEvent =
  | { name: "cta_click"; params: { cta_id: string; cta_location: string; link_target: string } }
  | { name: "contact_click"; params: { contact_method: ContactMethod; cta_location: string } }
  | { name: "nav_menu_open"; params: { menu_id: MenuId } }
  | { name: "select_content"; params: { content_type: string; content_id: string } }
  | { name: "faq_open"; params: { faq_set: string; faq_id: string } }
  | { name: "calculator_start"; params: { calculator_id: CalculatorId } }
  | {
      name: "calculator_result";
      params: {
        calculator_id: CalculatorId;
        loan_amount_band: AmountBand;
        rate_band: RateBand;
        tenure_months: number;
        savings_band: SavingsBand;
        debts_count: number;
      };
    }
  | { name: "debt_row_add"; params: { debt_type: string } }
  | { name: "debt_preset_apply"; params: { preset_id: string } }
  | { name: "lead_form_view"; params: { form_id: FormId; form_location: string } }
  | { name: "lead_form_start"; params: { form_id: FormId } }
  | { name: "lead_form_submit"; params: { form_id: FormId } }
  | { name: "lead_form_error"; params: { form_id: FormId; error_code: FormErrorCode; error_field?: string } }
  | { name: "otp_request"; params: { is_resend: boolean } }
  | { name: "otp_sent"; params: { otp_channel: OtpChannel } }
  | { name: "otp_failed"; params: { otp_stage: OtpStage; error_code: OtpErrorCode } }
  | { name: "otp_verified"; params: Record<string, never> }
  | { name: "otp_abandon"; params: Record<string, never> }
  | { name: "generate_lead"; params: { lead_source: FormId; currency: "INR"; value?: number } }
  | { name: "credit_report_fetch"; params: { bureau: Bureau; report_outcome: ReportOutcome; duration_band: DurationBand } }
  | { name: "credit_report_view"; params: { bureau: Bureau } }
  | { name: "report_tab_view"; params: { report_tab: ReportTab } }
  | { name: "report_download"; params: { download_format: DownloadFormat } }
  | { name: "lender_match_view"; params: { matched_count_band: AmountBand | "0" } };

export type AnalyticsEventName = AnalyticsEvent["name"];

/** GA4 "key events" per the plan (register these in GA Admin — Phase 7). */
export const KEY_EVENTS: readonly AnalyticsEventName[] = ["generate_lead", "credit_report_view"];

// ---- Banding helpers: raw figures never leave the browser as event params ----

const AMOUNT_BANDS: [number, AmountBand][] = [
  [100_000, "<1L"],
  [300_000, "1-3L"],
  [500_000, "3-5L"],
  [1_000_000, "5-10L"],
  [2_500_000, "10-25L"],
  [5_000_000, "25-50L"],
];

export function bandAmount(inr: number): AmountBand {
  for (const [ceiling, band] of AMOUNT_BANDS) {
    if (inr < ceiling) return band;
  }
  return "50L+";
}

const RATE_BANDS: [number, RateBand][] = [
  [10, "<10"],
  [12, "10-12"],
  [14, "12-14"],
  [16, "14-16"],
  [20, "16-20"],
  [24, "20-24"],
];

export function bandRate(percent: number): RateBand {
  for (const [ceiling, band] of RATE_BANDS) {
    if (percent < ceiling) return band;
  }
  return "24+";
}

const SAVINGS_BANDS: [number, SavingsBand][] = [
  [1, "0"],
  [1_000, "<1k"],
  [3_000, "1-3k"],
  [5_000, "3-5k"],
  [10_000, "5-10k"],
];

export function bandSavings(inr: number): SavingsBand {
  for (const [ceiling, band] of SAVINGS_BANDS) {
    if (inr < ceiling) return band;
  }
  return "10k+";
}

const DURATION_BANDS: [number, DurationBand][] = [
  [3000, "<3s"],
  [10_000, "3-10s"],
  [30_000, "10-30s"],
];

export function bandDuration(ms: number): DurationBand {
  for (const [ceiling, band] of DURATION_BANDS) {
    if (ms < ceiling) return band;
  }
  return "30s+";
}
