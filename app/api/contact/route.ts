import { adminDb } from "@/lib/firebaseAdmin";
import { Resend } from "resend";
import { NextResponse } from "next/server";

// Using process.env.RESEND_API_KEY. For development without the key, we'll instantiate it but sending will fail if empty.
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
    const { name, phone, email, requirement, message, consent } = body;

    if (!name || !phone || !requirement) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    // 1. Save to Firestore (Server-Side using Admin SDK to bypass client security rules)
    try {
      await adminDb.collection("leads").add({
        name,
        phone,
        email: email || "",
        requirement,
        message: message || "",
        consent: !!consent,
        source: "Credit Expert India Contact Form",
        status: "NEW",
        createdAt: new Date(),
      });
    } catch (dbError) {
      console.error("Firestore Admin save error:", dbError);
      // We log but continue, so we can still try to send the email if DB fails
    }

    const { data, error } = await resend.emails.send({
      from: "alankrit.dabral@creditexpertindia.com",
      to: ["btyagi419@gmail.com"],
      replyTo: email || undefined,
      subject: `New Lead — ${name} — ${requirement}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>New Credit Expert India Lead</h2>
          <hr />
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(email) || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Requirement:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(requirement)}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <div style="background:#f5f5f5; padding:15px; border-radius:8px; margin-top: 8px; white-space: pre-wrap;">
              ${escapeHtml(message) || "No message provided"}
            </div>
          </div>
          
          <div style="margin-top: 25px; display: flex; gap: 10px;">
            <a href="tel:+91${escapeHtml(phone).replace(/[^0-9]/g, '')}" style="background-color: #0F172A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">📞 Call Customer</a>
            <a href="https://wa.me/91${escapeHtml(phone).replace(/[^0-9]/g, '')}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">💬 WhatsApp Customer</a>
          </div>

          <hr style="margin-top: 30px;" />
          <p style="color: #666; font-size: 12px;">
            <strong>Source:</strong> Credit Expert India Contact Form<br/>
            Please contact this customer as soon as possible.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
