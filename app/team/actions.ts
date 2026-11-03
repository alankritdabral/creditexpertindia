"use server";

import { setTeamSession, getTeamSession as _getTeamSession } from "@/lib/auth";

export async function getTeamSession() {
  return await _getTeamSession();
}

export async function verifyTeamCode(branch: string, code: string) {
  // TEMPORARY: any password accepted for branch login (no DB read)
  void code;
  await setTeamSession(branch);
  return { success: true, error: undefined as string | undefined };
}
