import { cookies } from "next/headers";
import { signToken, verifyToken } from "@/lib/serverTokens";

export async function setTeamSession(branch: string) {
  const cookieStore = await cookies();
  
  // Calculate next 12:00 AM IST
  // IST is UTC+5:30. We want the next occurrence of 00:00:00 IST.
  // Current UTC time:
  const now = new Date();
  
  // Convert now to IST by adding 5 hours and 30 minutes
  const currentIST = new Date(now.getTime() + (5 * 60 + 30) * 60000);
  
  // Create a Date for the next midnight in IST
  const nextMidnightIST = new Date(currentIST);
  nextMidnightIST.setUTCDate(currentIST.getUTCDate() + 1);
  nextMidnightIST.setUTCHours(0, 0, 0, 0);
  
  // Convert back to UTC for the cookie expiration
  const expireDateUTC = new Date(nextMidnightIST.getTime() - (5 * 60 + 30) * 60000);

  cookieStore.set('team_branch', branch, {
    httpOnly: false, // Accessible by client JS
    secure: process.env.NODE_ENV === 'production',
    expires: expireDateUTC,
    path: '/',
  });

  // Signed, HTTP-only proof of the branch. The server trusts this, never the readable cookie alone.
  cookieStore.set('team_sig', signToken('team', branch, expireDateUTC.getTime()), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expireDateUTC,
    path: '/',
  });
}

export async function getTeamSession() {
  const cookieStore = await cookies();
  const branch = cookieStore.get('team_branch')?.value;
  const sig = cookieStore.get('team_sig')?.value;
  if (!branch || !sig) return null;
  return verifyToken('team', branch, sig) ? branch : null;
}

export async function clearTeamSession() {
  const cookieStore = await cookies();
  cookieStore.delete('team_branch');
  cookieStore.delete('team_sig');
}
