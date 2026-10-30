import { adminDb } from "@/lib/firebaseAdmin";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY || "missing_key");

const escapeHtml = (unsafe: string) => {
  return (unsafe || "")
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      city,
      netSalary,
      totalDebt,
      currentMonthlyEMI,
      estimatedNewEMI,
      estimatedMonthlySavings,
      debtsCount,
      debtsSummary,
      consent,
    } = body;

    if (!name || !phone || !netSalary) {
      return NextResponse.json(
        { error: "Name, phone and salary are required." },
        { status: 400 }
      );
    }

    const salary = Number(netSalary);
    if (isNaN(salary) || salary < 25000) {
      return NextResponse.json(
        { error: "Monthly net salary must be greater than ₹25,000." },
        { status: 400 }
      );
    }

    // 1. Save to Firestore leads collection
    let leadRefId = "";
    try {
      const docRef = await adminDb.collection("leads").add({
        name,
        phone,
        city: city || "Not provided",
        netSalary: salary,
        totalDebt: Number(totalDebt) || 0,
        currentMonthlyEMI: Number(currentMonthlyEMI) || 0,
        estimatedNewEMI: Number(estimatedNewEMI) || 0,
        estimatedMonthlySavings: Number(estimatedMonthlySavings) || 0,
        debtsCount: Number(debtsCount) || 1,
        debtsSummary: debtsSummary || "",
        requirement: "Debt Consolidation Calculator Assessment",
        consent: !!consent,
        source: "Debt Consolidation Calculator",
        status: "NEW",
        createdAt: new Date(),
      });
      leadRefId = docRef.id;
    } catch (dbError) {
      console.error("Firestore calculator lead save error:", dbError);
    }

    // 2. Send instant email alert
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: "alankrit.dabral@creditexpertindia.com",
          to: ["btyagi419@gmail.com"],
          subject: `🔥 High-Intent Calculator Lead: ${name} (Debt: ₹${totalDebt?.toLocaleString('en-IN')})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
              <h2 style="color: #0F172A; margin-top: 0;">New Debt Consolidation Calculator Lead</h2>
              <p style="color: #64748B; font-size: 14px;">A borrower calculated their single EMI and requested pre-approval review.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
              
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748B;"><strong>Customer Name:</strong></td>
                  <td style="padding: 6px 0; font-weight: bold; color: #0F172A;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;"><strong>Mobile Number:</strong></td>
                  <td style="padding: 6px 0; font-weight: bold; color: #0F172A;">${escapeHtml(phone)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;"><strong>City:</strong></td>
                  <td style="padding: 6px 0; color: #0F172A;">${escapeHtml(city) || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;"><strong>Monthly Net Salary:</strong></td>
                  <td style="padding: 6px 0; color: #0F172A;">₹${Number(salary).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;"><strong>Total Debt Balance:</strong></td>
                  <td style="padding: 6px 0; font-weight: bold; color: #2563EB;">₹${Number(totalDebt).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;"><strong>Current Total Monthly EMI:</strong></td>
                  <td style="padding: 6px 0; color: #DC2626;">₹${Number(currentMonthlyEMI).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;"><strong>Calculated Single EMI:</strong></td>
                  <td style="padding: 6px 0; font-weight: bold; color: #059669;">₹${Number(estimatedNewEMI).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;"><strong>Potential Monthly Relief:</strong></td>
                  <td style="padding: 6px 0; font-weight: bold; color: #059669;">+ ₹${Number(estimatedMonthlySavings).toLocaleString('en-IN')}/mo</td>
                </tr>
              </table>

              <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 13px;">
                <strong>Debts Breakdown:</strong><br/>
                <span style="color: #475569;">${escapeHtml(debtsSummary)}</span>
              </div>

              <div style="margin-top: 24px; display: flex; gap: 12px;">
                <a href="tel:+91${escapeHtml(phone).replace(/[^0-9]/g, '')}" style="background-color: #0F172A; color: white; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: bold; display: inline-block;">📞 Call Customer</a>
                <a href="https://wa.me/91${escapeHtml(phone).replace(/[^0-9]/g, '')}" style="background-color: #25D366; color: white; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: bold; display: inline-block;">💬 WhatsApp Customer</a>
              </div>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Resend calculator alert email error:", emailErr);
    }

    return NextResponse.json({
      success: true,
      leadId: leadRefId,
    });
  } catch (error: any) {
    console.error("Calculator lead API error:", error);
    return NextResponse.json(
      { error: "Failed to process calculator assessment lead." },
      { status: 500 }
    );
  }
}
