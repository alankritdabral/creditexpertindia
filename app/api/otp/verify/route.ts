import { NextResponse } from "next/server";
import { verifyStoredOtp } from "@/lib/otpStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mobile, otp } = body;

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, error: "Mobile number and OTP are required" },
        { status: 400 }
      );
    }

    const cleanMobile = String(mobile).replace(/\D/g, "").slice(-10);
    const cleanOtp = String(otp).trim();

    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number" },
        { status: 400 }
      );
    }

    if (!cleanOtp) {
      return NextResponse.json(
        { success: false, error: "Please enter the verification code" },
        { status: 400 }
      );
    }

    const verificationResult = await verifyStoredOtp(cleanMobile, cleanOtp);

    if (verificationResult.success) {
      return NextResponse.json({
        success: true,
        message: "Mobile number verified successfully",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: verificationResult.error || "Invalid verification code",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("[OTP Verify] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
