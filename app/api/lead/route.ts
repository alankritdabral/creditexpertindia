import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mobile, employment, income, requirement } = body ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    if (!mobile || !/^[6-9]\d{9}$/.test(String(mobile))) {
      return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
    }
    if (!employment) return NextResponse.json({ error: "Employment required" }, { status: 400 });
    if (!income) return NextResponse.json({ error: "Income required" }, { status: 400 });
    if (!requirement) return NextResponse.json({ error: "Requirement required" }, { status: 400 });

    // TODO: integrate with CRM / email / webhook
    // For now just log and return success
    console.log("[Lead]", { name, mobile, employment, income, requirement, debt: body.debt, ts: new Date().toISOString() });

    return NextResponse.json({ ok: true, message: "Lead captured" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
