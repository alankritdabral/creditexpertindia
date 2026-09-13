import { NextResponse } from "next/server";
import { checkRateLimit, acquireIdempotencyLock, releaseIdempotencyLock } from "@/lib/requestGuard";
import { generateHmac, encrypt, decrypt } from "@/lib/security";
import { db } from "@/lib/firebase";

// Helper to get client IP in Next.js App Router
const getClientIp = (req: Request) => {
  return req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown-ip";
};

export async function POST(req: Request) {
  let idempotencyKey = req.headers.get("x-idempotency-key");

  try {
    const body = await req.json();
    const { mobile, pan, name, gender, consent } = body ?? {};

    // 1. Input Validation
    if (!mobile || !/^[6-9]\d{9}$/.test(String(mobile))) return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
    if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(String(pan))) return NextResponse.json({ error: "Invalid PAN" }, { status: 400 });
    if (!name || typeof name !== "string" || name.trim().length < 2) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    if (!gender) return NextResponse.json({ error: "Gender required" }, { status: 400 });
    if (consent !== "Y") return NextResponse.json({ error: "Consent required" }, { status: 400 });

    const ip = getClientIp(req);
    const panHmac = generateHmac(pan);
    const mobileHmac = generateHmac(mobile);

    // 2. IP Rate Limiting (Redis Request Guard)
    const ipLimit = await checkRateLimit(`rate:ip:${ip}`, 10, 600); // 10 reqs per 10 mins
    if (!ipLimit.allowed) {
      console.warn(`[CIBIL V1] IP Rate Limit Exceeded for IP: ${ip}`);
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    // 3. Database Caching Check (Check if we already have this PAN)
    if (db) {
      try {
        const snapshot = await db.collection("credit_reports").where("panHash", "==", panHmac).get();
        if (!snapshot.empty) {
          // Find the most recent record manually (to avoid requiring composite indexes)
          const docs = snapshot.docs.map(doc => doc.data());
          docs.sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime());
          
          const latestReport = docs[0];
          const reportDate = latestReport.createdAt.toDate();
          
          // Check if it's within the 30-day window
          const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          
          if (reportDate > thirtyDaysAgo) {
            console.log(`[CIBIL V1] Cache HIT for PAN HMAC: ${panHmac}`);
            // Decrypt the cached Surepass JSON response
            const cachedData = JSON.parse(decrypt(latestReport.encryptedData));
            return NextResponse.json(cachedData);
          } else {
            console.warn(`[CIBIL V1] Cache EXPIRED for PAN HMAC: ${panHmac}`);
            // Report is older than 30 days. Block the request and tell them to contact support.
            return NextResponse.json(
              { error: "Your credit report on file has expired. Please contact support to authorize a fresh pull." },
              { status: 403 }
            );
          }
        }
      } catch (dbError) {
        console.error("Failed to query Firestore for cache:", dbError);
      }
    }

    // 4. PAN Rate Limiting (For Surepass API calls)
    const panLimit = await checkRateLimit(`rate:pan:${panHmac}`, 2, 86400); // 2 reqs per 24 hours
    if (!panLimit.allowed) {
      console.warn(`[CIBIL V1] PAN Rate Limit Exceeded for PAN HMAC: ${panHmac}`);
      return NextResponse.json({ error: "Report limit reached for this PAN." }, { status: 429 });
    }

    // 5. Idempotency & Locking
    if (!idempotencyKey) {
      idempotencyKey = `idem:${panHmac}:${mobileHmac}`;
    } else {
      idempotencyKey = `idem:${idempotencyKey}`;
    }

    const locked = await acquireIdempotencyLock(idempotencyKey, 30);
    if (!locked) {
      console.warn(`[CIBIL V1] Idempotency Lock Collision for Key: ${idempotencyKey}`);
      return NextResponse.json({ error: "A request is already being processed." }, { status: 429 });
    }

    // 6. API Key setup
    const apiKey = process.env.SUREPASS_API_KEY || process.env.SUREPASS_API_TOKEN;
    if (!apiKey) {
      console.error("[CIBIL V1] Internal configuration error: Missing API Key");
      await releaseIdempotencyLock(idempotencyKey);
      return NextResponse.json({ error: "Internal configuration error" }, { status: 500 });
    }

    // 7. Fetch from Surepass (V1 endpoint)
    const response = await fetch("https://kyc-api.surepass.app/api/v1/credit-report-cibil/fetch-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        mobile,
        pan,
        name,
        gender,
        consent
      })
    });

    const data = await response.json();

    // 8. Release Lock
    await releaseIdempotencyLock(idempotencyKey);

    // 9. Handle Response & Encrypt for Firestore
    if (response.ok && data.success) {
      if (db) {
        try {
          const encryptedPayload = encrypt(JSON.stringify(data));
          const encryptedPan = encrypt(pan);
          const encryptedMobile = encrypt(mobile);

          await db.collection("credit_reports").add({
            bureau: "V1_CIBIL",
            panHash: panHmac,
            mobileHash: mobileHmac,
            creditScore: data?.data?.credit_score ? Number(data.data.credit_score) : null,
            encryptedData: encryptedPayload,
            encryptedPan,
            encryptedMobile,
            consent: {
              given: true,
              timestamp: new Date(),
              ip
            },
            createdAt: new Date(),
          });
        } catch (dbError) {
          console.error("Failed to save report to Firestore:", dbError);
        }
      }
      return NextResponse.json(data);
    } else if (response.status === 422 || data.status_code === 422) {
      console.warn("[CIBIL V1] Surepass Validation Error:", data);
      return NextResponse.json(data, { status: 422 });
    } else {
      console.error("Surepass API error:", data);
      return NextResponse.json({ error: "Unable to verify credit information at this time." }, { status: response.status || 500 });
    }
  } catch (e) {
    if (idempotencyKey) await releaseIdempotencyLock(idempotencyKey);
    console.error("Exception in CIBIL fetch:", e);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
