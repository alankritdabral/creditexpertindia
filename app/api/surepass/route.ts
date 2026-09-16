import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { endpoint, bodyPayload } = await req.json();

    if (!endpoint || !bodyPayload) {
      return NextResponse.json(
        { error: "Missing endpoint or bodyPayload" },
        { status: 400 }
      );
    }

    const surepassToken = process.env.SUREPASS_API_KEY;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${surepassToken}`,
      },
      body: JSON.stringify(bodyPayload),
    });

    // Check if the response is JSON
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } else {
      const text = await res.text();
      return NextResponse.json({ error: "Invalid response from Surepass API", details: text }, { status: res.status });
    }

  } catch (error: any) {
    console.error("Surepass API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
