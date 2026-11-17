import { saveWebsiteLead } from "@/lib/websiteLeads";
import { NextResponse } from "next/server";
import { sanitizeAttribution } from "@/lib/analytics/sanitizeAttribution";
import { writeLeadAnalytics } from "@/lib/analytics/leadAnalytics";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, requirement, consent, netSalary, ongoingEmi, attribution, ga } = body;

    if (!name || !phone || !requirement || !netSalary || !ongoingEmi) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    // "Being contacted about this enquiry" consent is mandatory — without it
    // we have no lawful basis to call the person back. Sharing the lead with
    // partner lenders is a separate, optional choice (RBI Digital Lending
    // Directions 2025, para 12(iv): explicit consent per third party).
    if (!consent?.contact) {
      return NextResponse.json(
        { error: "Please agree to being contacted about your enquiry." },
        { status: 400 }
      );
    }

    const salary = Number(netSalary);
    if (isNaN(salary) || salary <= 45000) {
      return NextResponse.json({ error: "Net salary must be greater than ₹45,000." }, { status: 400 });
    }

    const emi = Number(ongoingEmi);
    if (isNaN(emi) || emi > salary * 0.8) {
      return NextResponse.json({ error: "Ongoing EMI cannot be greater than 80% of net salary." }, { status: 400 });
    }

    // Save to the backend (RDS). The staff dashboard reads it from there: admins assign each
    // customer to one employee, and employees only see customers assigned to them. There is no
    // email fallback, so a failed save must fail the request — otherwise the customer would see
    // "success" for a lead nobody can ever see.
    const safeAttribution = sanitizeAttribution(attribution);
    let leadId: string;
    try {
      leadId = await saveWebsiteLead({
        name,
        phone,
        requirement,
        netSalary: Math.round(salary),
        ongoingEmi: Math.round(emi),
        consent: {
          contact: true,
          shareWithLenders: !!consent.shareWithLenders,
          noticeVersion: consent.noticeVersion || null,
          recordedAt: new Date().toISOString(),
        },
        attribution: safeAttribution,
        source: "Amortas Contact Form",
      });
    } catch (dbError) {
      console.error("Backend lead save error:", dbError);
      return NextResponse.json(
        { error: "We could not save your request. Please try again." },
        { status: 500 }
      );
    }

    // A PII-free copy, safe to export to BigQuery and join against GA4
    // events on ga_client_id (plans/01-…/Phase 5 and 7).
    const leadRef = await writeLeadAnalytics({
      leadSource: "contact",
      attribution: safeAttribution,
      ga,
      consent: { contact: true, shareWithLenders: !!consent.shareWithLenders, noticeVersion: consent.noticeVersion },
    });

    return NextResponse.json({
      success: true,
      leadId,
      leadRef,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
