import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebaseAdmin";
import { createRateLimiter, validateLead } from "@/lib/leadValidation";

const resend = new Resend(process.env.RESEND_API_KEY || "missing_key");
const allow = createRateLimiter(5, 10 * 60 * 1000);

const escapeHtml = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// TODO(legal): confirm this consent wording with counsel before launch.
const CONSENT_TEXT =
  "I agree that Credit Expert India may contact me by phone, SMS and WhatsApp about my request, as described in the Privacy Policy.";

/**
 * Short first-step lead (need, income, mobile). Every valid lead is saved, whatever the income;
 * low incomes are tagged for the team instead of rejected. Same `leads` collection and the same
 * email alert as the existing contact and calculator forms.
 */
export async function POST(request: Request) {
  try {
    const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
    if (!allow(ip)) {
      return NextResponse.json({ success: false, error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const result = validateLead(body);

    if (!result.ok) {
      // Bots get a normal-looking response and nothing is stored.
      if (result.bot) return NextResponse.json({ success: true });
      return NextResponse.json({ success: false, errors: result.errors }, { status: 400 });
    }

    const { lead } = result;
    let leadId = "";
    try {
      const ref = await adminDb.collection("leads").add({
        name: lead.name || "Not provided",
        phone: lead.mobile,
        requirement: lead.need,
        netSalary: lead.monthlyIncome,
        segment: lead.segment,
        consent: true,
        consentText: CONSENT_TEXT,
        consentAt: new Date(),
        source: `Short form: ${lead.source}`,
        status: "NEW",
        createdAt: new Date(),
      });
      leadId = ref.id;
    } catch (dbError) {
      // Keep going so the team still gets the email alert.
      console.error("Firestore short lead save error:", dbError);
    }

    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: "alankrit.dabral@creditexpertindia.com",
          to: ["btyagi419@gmail.com"],
          subject: `New Lead — ${lead.need} — ₹${lead.monthlyIncome.toLocaleString("en-IN")}/month`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
              <h2>New Credit Expert India lead (short form)</h2>
              <table style="width:100%; border-collapse: collapse;">
                <tr><td style="padding:8px 0;"><strong>Need:</strong></td><td>${escapeHtml(lead.need)}</td></tr>
                <tr><td style="padding:8px 0;"><strong>Monthly income:</strong></td><td>₹${lead.monthlyIncome.toLocaleString("en-IN")}${lead.segment === "below_income_guideline" ? " (below ₹25,000 guideline, please review)" : ""}</td></tr>
                <tr><td style="padding:8px 0;"><strong>Mobile:</strong></td><td>${escapeHtml(lead.mobile)}</td></tr>
                <tr><td style="padding:8px 0;"><strong>Name:</strong></td><td>${escapeHtml(lead.name) || "Not provided"}</td></tr>
                <tr><td style="padding:8px 0;"><strong>Source:</strong></td><td>${escapeHtml(lead.source)}</td></tr>
              </table>
              <p style="margin-top:20px;">
                <a href="tel:+91${lead.mobile}">Call customer</a> &nbsp;|&nbsp;
                <a href="https://wa.me/91${lead.mobile}">WhatsApp customer</a>
              </p>
            </div>`,
        });
      }
    } catch (emailError) {
      console.error("Short lead email error:", emailError);
    }

    return NextResponse.json({ success: true, leadId });
  } catch (error) {
    console.error("Short lead API error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
