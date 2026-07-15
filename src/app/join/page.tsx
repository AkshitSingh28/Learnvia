"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, homeForRole } from "@/lib/auth/AuthProvider";
import { redeemInvite } from "@/lib/db/invites";
import { AuthShell, authField, authPrimary } from "@/components/public/AuthShell";
import { L } from "@/components/public/lightTheme";

/** Redeem a cohort/role invite. If signed in, redeem now; otherwise send to signup carrying the code. */
function JoinInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, reloadProfile } = useAuth();
  const [code, setCode] = useState(params.get("code") ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!user) {
      router.replace(`/signup?code=${encodeURIComponent(code)}`);
      return;
    }
    setBusy(true);
    try {
      const { role } = await redeemInvite(code);
      await reloadProfile();
      router.replace(homeForRole(role as never));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not redeem that code.");
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Join with an invite" subtitle="Enter the code your NGO or mentor shared." footer={<Link href="/signup" style={{ color: L.muted }}>No code? Sign up</Link>}>
      {error && <p style={{ fontSize: 13, color: L.danger, marginBottom: 8 }}>{error}</p>}
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input required value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. PROV-AAA1" style={{ ...authField, textTransform: "uppercase", letterSpacing: "0.08em" }} disabled={busy} />
        <button type="submit" style={authPrimary} disabled={busy}>{busy ? "Joining…" : "Join cohort"}</button>
      </form>
    </AuthShell>
  );
}

export default function JoinPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: L.wash, color: L.muted }}>Loading…</div>}><JoinInner /></Suspense>;
}
