"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

/** Loaded lazily so the Firebase auth SDK stays out of the public pages' first load. */
export default function StaffSession() {
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user || document.cookie.includes("team_branch="));
    });
  }, []);

  if (!signedIn) return null;

  const logout = async () => {
    try {
      await signOut(auth);
      // The server also needs the HTTP-only signature, which is useless without this cookie.
      document.cookie = "team_branch=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setSignedIn(false);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <button onClick={logout} className="h-11 px-2 text-sm font-medium text-ink-muted hover:text-danger">
      Log out
    </button>
  );
}
