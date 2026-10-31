// Validation for the short lead form. Pure, so it is unit tested without Firebase.

export const LEAD_NEEDS = [
  "Reduce existing EMIs",
  "Credit card debt",
  "Personal loan",
  "App loans",
  "Fresh loan",
  "Balance transfer",
] as const;

export type LeadNeed = (typeof LEAD_NEEDS)[number];

/** Income below this is tagged for the team to review; it is never rejected. */
export const LOW_INCOME_TAG_BELOW = 25000;

export type LeadInput = {
  need?: unknown;
  monthlyIncome?: unknown;
  mobile?: unknown;
  name?: unknown;
  consent?: unknown;
  /** Honeypot: real visitors never see or fill this field. */
  website?: unknown;
  source?: unknown;
};

export type ValidLead = {
  need: LeadNeed;
  monthlyIncome: number;
  mobile: string; // 10 digits
  name: string;
  segment: "standard" | "below_income_guideline";
  source: string;
};

export type LeadErrors = Partial<Record<"need" | "monthlyIncome" | "mobile" | "name" | "consent", string>>;

export function normaliseMobile(raw: unknown): string {
  const digits = String(raw ?? "").replace(/\D/g, "");
  return digits.length > 10 && digits.startsWith("91") ? digits.slice(-10) : digits;
}

export function isValidIndianMobile(mobile: string): boolean {
  return /^[6-9]\d{9}$/.test(mobile);
}

export function validateLead(input: LeadInput): { ok: true; lead: ValidLead } | { ok: false; errors: LeadErrors; bot?: boolean } {
  if (typeof input.website === "string" && input.website.trim() !== "") {
    return { ok: false, errors: {}, bot: true };
  }

  const errors: LeadErrors = {};

  const need = LEAD_NEEDS.find((n) => n === input.need);
  if (!need) errors.need = "Please choose what you need help with.";

  const income = Number(String(input.monthlyIncome ?? "").replace(/[,\s₹]/g, ""));
  if (!Number.isFinite(income) || income <= 0) errors.monthlyIncome = "Enter your monthly income in rupees.";
  else if (income > 100000000) errors.monthlyIncome = "Please check the amount you entered.";

  const mobile = normaliseMobile(input.mobile);
  if (!isValidIndianMobile(mobile)) errors.mobile = "Enter a valid 10-digit mobile number.";

  const name = String(input.name ?? "").trim().slice(0, 80);
  if (/[<>]/.test(name)) errors.name = "Name cannot contain < or >.";

  if (input.consent !== true) errors.consent = "Please confirm that we may contact you.";

  if (Object.keys(errors).length || !need) return { ok: false, errors };

  return {
    ok: true,
    lead: {
      need,
      monthlyIncome: income,
      mobile,
      name,
      segment: income < LOW_INCOME_TAG_BELOW ? "below_income_guideline" : "standard",
      source: typeof input.source === "string" ? input.source.slice(0, 60) : "short-form",
    },
  };
}

/** Best-effort per-key limiter (memory is per server instance and resets on restart). */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string, now: number = Date.now()): boolean => {
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    return true;
  };
}
