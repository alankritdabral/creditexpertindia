import { auth } from "@/lib/firebaseClient";

/** Authorization header for the signed-in admin; empty when nobody is signed in. */
export async function adminAuthHeaders(): Promise<Record<string, string>> {
  try {
    await auth.authStateReady();
    const token = await auth.currentUser?.getIdToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

/** fetch() that adds the admin's Firebase ID token. Team members rely on their signed cookie instead. */
export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  const extra = await adminAuthHeaders();
  Object.entries(extra).forEach(([k, v]) => headers.set(k, v));
  return fetch(input, { ...init, headers, credentials: "same-origin" });
}
