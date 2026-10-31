import crypto from "crypto";

// Short-lived HMAC tokens. Pure crypto so they can be unit tested without Firebase.

export const OTP_TOKEN_TTL_MS = 20 * 60 * 1000;

function secret(): string {
  const s = process.env.HMAC_SECRET;
  if (!s) throw new Error("HMAC_SECRET is not configured");
  return s;
}

function mac(scope: string, subject: string, expiresAt: number): string {
  return crypto
    .createHmac("sha256", secret())
    .update(`${scope}|${subject}|${expiresAt}`)
    .digest("hex");
}

/** Returns "<expiresAtMs>.<hex mac>" bound to a scope and subject. */
export function signToken(scope: string, subject: string, expiresAt: number): string {
  return `${expiresAt}.${mac(scope, subject, expiresAt)}`;
}

export function verifyToken(
  scope: string,
  subject: string,
  token: string | null | undefined,
  now: number = Date.now()
): boolean {
  if (!token) return false;
  const [exp, given] = token.split(".");
  const expiresAt = Number(exp);
  if (!given || !Number.isFinite(expiresAt) || expiresAt < now) return false;
  try {
    const a = Buffer.from(given, "hex");
    const b = Buffer.from(mac(scope, subject, expiresAt), "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

const lastTen = (mobile: string) => String(mobile).replace(/\D/g, "").slice(-10);

/** Issued by /api/otp/verify; required by /api/idspay for public visitors. */
export function issueOtpToken(mobile: string, now: number = Date.now()): string {
  return signToken("otp", lastTen(mobile), now + OTP_TOKEN_TTL_MS);
}

export function verifyOtpToken(mobile: string, token: string | null | undefined, now: number = Date.now()): boolean {
  return verifyToken("otp", lastTen(mobile), token, now);
}
