import { NextRequest, NextResponse } from "next/server";
import { getStaff } from "@/lib/serverAuth";
import { verifyOtpToken } from "@/lib/serverTokens";

export async function POST(req: NextRequest) {
  try {
    const { bureau, bodyPayload } = await req.json();

    // Paid bureau lookups: staff, or a visitor who just verified OTP for this exact mobile number.
    const staff = await getStaff(req);
    if (!staff) {
      const mobile = String(bodyPayload?.mobile_no || bodyPayload?.phone_number || "");
      if (!mobile || !verifyOtpToken(mobile, req.headers.get("x-otp-token"))) {
        return NextResponse.json(
          { error: "Mobile verification required. Please verify your OTP and try again." },
          { status: 401 }
        );
      }
    }

    if (!bureau || !bodyPayload) {
      return NextResponse.json(
        { error: "Missing bureau or bodyPayload" },
        { status: 400 }
      );
    }

    const apiId = process.env.IDSPAY_API_ID;
    const apiKey = process.env.IDSPAY_API_KEY;
    const tokenId = process.env.IDSPAY_TOKEN_ID;

    if (!apiId || !apiKey || !tokenId) {
      return NextResponse.json(
        { error: "IDSPay API credentials are not configured on the server." },
        { status: 500 }
      );
    }

    let endpoint = "";
    const finalPayload = {
      api_id: apiId,
      api_key: apiKey,
      token_id: tokenId,
      ...bodyPayload
    };

    if (bureau.startsWith("v1")) {
      // TransUnion (CIBIL)
      endpoint = "https://javabackend.idspay.in/api/v1/prod/srv5/transunion-Score-Hybrid";
    } else if (bureau.startsWith("crif")) {
      // CRIF
      endpoint = "https://javabackend.idspay.in/api/v1/prod/crif/Credit-ScoreV4";
    } else if (bureau.startsWith("experian")) {
      // Experian
      endpoint = "https://javabackend.idspay.in/api/v1/prod/srv2/credit-report/experian";
    } else {
      return NextResponse.json(
        { error: "Unsupported bureau format." },
        { status: 400 }
      );
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalPayload),
    });

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } else {
      const text = await res.text();
      return NextResponse.json({ error: "Invalid response from IDSPay", details: text }, { status: res.status });
    }

  } catch (error: any) {
    console.error("IDSPay proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
