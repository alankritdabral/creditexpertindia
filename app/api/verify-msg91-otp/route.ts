import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "Token is required" }, { status: 400 });
    }

    const authKey = process.env.MSG91_AUTH_KEY || "519332T5zz4zfdtq6ab50388P1"; // fallback to tokenAuth just in case

    const response = await fetch('https://control.msg91.com/api/v5/widget/verifyAccessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "authkey": authKey,
        "access-token": token
      })
    });

    const data = await response.json();

    if (response.ok && data.type === 'success') {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, error: data.message || "OTP verification failed" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("MSG91 verify error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
