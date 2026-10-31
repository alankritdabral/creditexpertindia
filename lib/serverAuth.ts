import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { verifyToken } from "@/lib/serverTokens";

export type Staff = { kind: "admin"; email: string | null } | { kind: "team"; branch: string };

export function unauthorized(status: 401 | 403 = 401) {
  return NextResponse.json(
    { success: false, error: status === 401 ? "Unauthorized" : "Forbidden" },
    { status }
  );
}

function readCookie(req: Request, name: string): string | null {
  const header = req.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

/** Firebase ID token from "Authorization: Bearer <token>". Optional ADMIN_EMAILS allow-list. */
export async function getAdminUser(req: Request): Promise<{ email: string | null } | null> {
  const header = req.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  try {
    const decoded = await adminAuth.verifyIdToken(match[1]);
    const email = decoded.email ? decoded.email.toLowerCase() : null;
    const allow = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    if (allow.length && (!email || !allow.includes(email))) return null;
    return { email };
  } catch {
    return null;
  }
}

/** Branch from the signed team session cookies, or null if missing, expired or forged. */
export function getTeamBranch(req: Request): string | null {
  const branch = readCookie(req, "team_branch");
  const sig = readCookie(req, "team_sig");
  if (!branch || !sig) return null;
  return verifyToken("team", branch, sig) ? branch : null;
}

export async function getStaff(req: Request): Promise<Staff | null> {
  const admin = await getAdminUser(req);
  if (admin) return { kind: "admin", email: admin.email };
  const branch = getTeamBranch(req);
  return branch ? { kind: "team", branch } : null;
}

/** Returns a 401 response when the caller is not a signed-in admin, otherwise null. */
export async function requireAdmin(req: Request): Promise<NextResponse | null> {
  return (await getAdminUser(req)) ? null : unauthorized(401);
}
