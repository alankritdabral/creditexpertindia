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

    // INTERNAL_PROXY_SECRET must match the one configured on the VPS
    const internalSecret = process.env.INTERNAL_PROXY_SECRET || "Shashidabral410@";
    const proxyDomain = "https://api.creditexpertindia.com";

    // Extract the path from the endpoint
    const url = new URL(endpoint);
    const path = url.pathname;

    const proxyUrl = `${proxyDomain}${path}`;

    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${internalSecret}`,
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
      return NextResponse.json({ error: "Invalid response from proxy", details: text }, { status: res.status });
    }

  } catch (error: any) {
    console.error("Surepass proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
