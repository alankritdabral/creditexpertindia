import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import crypto from "crypto";

const ALLOWED_LEVELS = ["info", "warning", "error", "critical"];
const ALLOWED_EVENTS = [
  "BUREAU_REQUEST_STARTED",
  "BUREAU_REQUEST_SUCCESS",
  "BUREAU_FALLBACK_TRIGGERED",
  "BUREAU_FALLBACK_SUCCESS",
  "BUREAU_REQUEST_FAILED",
  "ALL_BUREAUS_FAILED",
  "BUREAU_NETWORK_ERROR"
];

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Sanitize Sensitive Information (PAN/Mobile)
    let sanitizedIdentifiers: any = {};
    if (body.identifiers) {
      if (body.identifiers.pan) {
        // Hash PAN for tracking without exposing it
        sanitizedIdentifiers.pan_hash = crypto
          .createHash("sha256")
          .update(body.identifiers.pan.toUpperCase())
          .digest("hex");
      }
      if (body.identifiers.mobile) {
        // Mask mobile, save only last 4 digits
        const mobileStr = String(body.identifiers.mobile);
        sanitizedIdentifiers.mobile_last4 = mobileStr.length >= 4 
          ? mobileStr.slice(-4) 
          : "XXXX";
      }
    }

    const safeLevel = ALLOWED_LEVELS.includes(body.level) ? body.level : "info";
    const safeEvent = ALLOWED_EVENTS.includes(body.event) ? body.event : "UNKNOWN_EVENT";

    // 2. Prepare Log Document
    const logDocument = {
      level: safeLevel,
      event: safeEvent,
      module: body.module || "unknown",
      request_id: body.request_id || null,
      application_id: body.application_id || null,
      provider: body.provider || {},
      message: body.message || "",
      identifiers: sanitizedIdentifiers,
      duration_ms: body.duration_ms || null,
      metadata: body.metadata || {},
      created_at: new Date() // Store as ISO date or Date object. Firebase admin will handle Date.
    };

    // 3. Save to Firestore
    await adminDb.collection("system_logs").add(logDocument);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("System logging failed:", error);
    return NextResponse.json(
      { success: false, error: "Logging failed" },
      { status: 500 }
    );
  }
}
