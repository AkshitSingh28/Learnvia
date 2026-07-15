"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, homeForRole } from "@/lib/auth/AuthProvider";
import { redeemInvite } from "@/lib/db/invites";
import { AuthShell, authField, authPrimary } from "@/components/public/AuthShell";
import { DARK } from "@/lib/brand";

export default function OnboardingCohortPage() {
  const { user, reloadProfile } = useAuth();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function done(role: string) {
    router.replace(homeForRole((role as never) ?? user?.role ?? "student"));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!code.trim()) return done(user?.role ?? "student");
    setBusy(true);
    try {
      const { role } = await redeemInvite(code);
      await reloadProfile();
      done(role);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not redeem that code.");
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Join a cohort (optional)" subtitle="Have an invite code from an NGO or mentor? Add it to join your batch." max={460}>
      {error && <p style={{ fontSize: 13, color: "#F87171", marginBottom: 8 }}>{error}</p>}
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Invite code (optional)" style={{ ...authField, textTransform: "uppercase", letterSpacing: "0.08em" }} disabled={busy} />
        <button type="submit" style={authPrimary} disabled={busy}>{busy ? "Joining…" : "Finish & enter Learnvia"}</button>
      </form>
      <button onClick={() => done(user?.role ?? "student")} style={{ width: "100%", marginTop: 12, background: "none", border: "none", color: DARK.muted, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Skip for now</button>
    </AuthShell>
  );
}
