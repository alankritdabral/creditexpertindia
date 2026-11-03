"use server";

import { adminDb } from "@/lib/firebaseAdmin";
import { setTeamSession, getTeamSession as _getTeamSession } from "@/lib/auth";

export async function getTeamSession() {
  return await _getTeamSession();
}

export async function verifyTeamCode(branch: string, code: string) {
  try {
    const docRef = adminDb.collection("access_code_creditexpert").doc(branch);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      return { success: false, error: "Access code not configured for this branch." };
    }
    
    const data = docSnap.data();
    if (data?.code === code) {
      // Valid code, set session
      await setTeamSession(branch);
      return { success: true };
    } else {
      return { success: false, error: "Invalid daily access code." };
    }
  } catch (error) {
    console.error("Error verifying team code:", error);
    return { success: false, error: "An internal error occurred." };
  }
}
