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

    let dispatchResult: { success: boolean; channel?: string; error?: string; messageId?: any } = { success: false };

    const prefersWhatsapp = body.channel === "whatsapp" || Boolean(process.env.MESSAGEBOT_WHATSAPP_API_TOKEN);

    if (prefersWhatsapp) {
      const waResult = await (await import("@/lib/messagebotWhatsapp")).sendWhatsappOtp({
        phoneNumber: cleanMobile,
        otpCode: otp,
      });

      if (waResult.success) {
        dispatchResult = { success: true, channel: "whatsapp", messageId: waResult.campaignId };
      } else {
        console.warn("[OTP Send] WhatsApp dispatch failed, attempting SMS fallback:", waResult.error);
        // Fallback to SMS if WhatsApp failed
        const smsResult = await sendMessageBotSms({
          to: cleanMobile,
          message: messageText,
          messageType: "3", // OTP
          sourceAddress: process.env.MESSAGEBOT_SENDER_ID || "CIBIL",
        });

        if (smsResult.success) {
          dispatchResult = { success: true, channel: "sms", messageId: smsResult.data?.MessageId };
        } else {
          dispatchResult = {
            success: false,
            error: waResult.error || smsResult.error || "Unable to dispatch verification code via WhatsApp or SMS.",
          };
        }
      }
    } else {
      // Send SMS via MessageBot
      const smsResult = await sendMessageBotSms({
        to: cleanMobile,
        message: messageText,
        messageType: "3", // OTP
        sourceAddress: process.env.MESSAGEBOT_SENDER_ID || "CIBIL",
      });

      if (smsResult.success) {
        dispatchResult = { success: true, channel: "sms", messageId: smsResult.data?.MessageId };
      } else {
        console.error("[OTP Send] MessageBot SMS failed:", smsResult.error);
        dispatchResult = {
          success: false,
          error: smsResult.error || "Unable to send SMS at this moment. Please verify your mobile number.",
        };
      }
    }

    if (!dispatchResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: dispatchResult.error || "Unable to dispatch OTP code. Please try again.",
        },
        { status: 502 }
      );
    }

    // Store OTP in store (10 minute TTL, 30 second cooldown)
    await storeOtp(cleanMobile, otp, 600, 30);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      messageId: dispatchResult.messageId,
    });
  } catch (error: any) {
    console.error("[OTP Send] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
