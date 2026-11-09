import { NextResponse } from "next/server";
import { writeLeadAnalytics } from "@/lib/analytics/leadAnalytics";
import { checkRateLimit } from "@/lib/analytics/rateLimit";

/**
 * Writes the PII-free lead_analytics copy for the eligibility flow. The
 * eligibility form writes its own (PII-containing) credit_reports document
 * straight from the client via the Firebase client SDK, so — unlike contact
 * and calculator-lead, which already go through a server route — it has no
 * existing server-side step to piggyback this on. Called once, right after
 * OTP verification succeeds (plans/01-…/Phase 5).
 */
export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const allowed = await checkRateLimit(`lead-event:${ip}`, 20, 600);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
    }

    const body = await request.json();
    const { attribution, ga, consent } = body;

    if (!consent?.contact) {
      return NextResponse.json({ error: "Missing required consent." }, { status: 400 });
    }

    const leadAnalyticsRef = await writeLeadAnalytics({
      leadSource: "eligibility",
      attribution,
      ga,
      consent: { contact: true, shareWithLenders: !!consent.shareWithLenders, noticeVersion: consent.noticeVersion },
    });

    return NextResponse.json({ success: true, leadAnalyticsRef });
  } catch (error) {
    console.error("[lead-event] error", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
