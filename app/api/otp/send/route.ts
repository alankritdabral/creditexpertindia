import { NextResponse } from "next/server";
import { generateOtp, storeOtp, canRequestOtp } from "@/lib/otpStore";
import { sendMessageBotSms } from "@/lib/messagebot";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mobile } = body;

    if (!mobile) {
      return NextResponse.json(
        { success: false, error: "Mobile number is required" },
        { status: 400 }
      );
    }

    const cleanMobile = String(mobile).replace(/\D/g, "").slice(-10);
    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    // Check cooldown
    const rateCheck = await canRequestOtp(cleanMobile, 30);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Please wait ${rateCheck.waitSeconds}s before requesting a new code.`,
          waitSeconds: rateCheck.waitSeconds,
        },
        { status: 429 }
      );
    }

    // Generate 4-digit OTP matching the template (e.g. 8977)
    const otp = generateOtp(4);

    // Format message text
    const template =
      process.env.MESSAGEBOT_OTP_TEMPLATE ||
      "One Time Password foraccount verification is {OTP}. Do not share this OTP with anyone.";
    const messageText = template.replace("{OTP}", otp);

    // Send SMS via MessageBot
    const smsResult = await sendMessageBotSms({
      to: cleanMobile,
      message: messageText,
      messageType: "3", // OTP
      sourceAddress: process.env.MESSAGEBOT_SENDER_ID || "CIBIL",
    });

    if (!smsResult.success) {
      console.error("[OTP Send] MessageBot failed:", smsResult.error);
      return NextResponse.json(
        {
          success: false,
          error:
            smsResult.error ||
            "Unable to send SMS at this moment. Please verify your mobile number.",
        },
        { status: 502 }
      );
    }

    // Store OTP in store (10 minute TTL, 30 second cooldown)
    await storeOtp(cleanMobile, otp, 600, 30);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      messageId: smsResult.data?.MessageId,
    });
  } catch (error: any) {
    console.error("[OTP Send] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
