"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { redeemInvite } from "@/lib/db/invites";
import { AuthShell, authField, authPrimary, authOutline } from "@/components/public/AuthShell";
import { L } from "@/components/public/lightTheme";

function friendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";
  if (code === "auth/email-already-in-use") return "An account with this email already exists.";
  if (code === "auth/weak-password") return "Password must be at least 6 characters.";
  if (code === "auth/invalid-email") return "Please enter a valid email address.";
  if (code === "auth/popup-closed-by-user") return "";
  return "Something went wrong. Please try again.";
}

function SignupInner() {
  const { signUpWithEmail, signInWithGoogle, reloadProfile } = useAuth();
  const router = useRouter();
  const inviteCode = useSearchParams().get("code")?.trim() || "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // After creating an account, redeem an invite code if one was carried in, else go to onboarding.
  async function afterAccount(isNewUser: boolean) {
    if (inviteCode) {
      try {
        await redeemInvite(inviteCode);
        await reloadProfile();
        router.replace("/onboarding/profile");
        return;
      } catch {
        // fall through to normal onboarding if the code is bad
      }
    }
    router.replace(isNewUser ? "/onboarding/role" : "/app");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signUpWithEmail(email, password, name);
      await afterAccount(true);
    } catch (err) {
      setError(friendlyError(err));
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setBusy(true);
    try {
      const { isNewUser } = await signInWithGoogle();
      await afterAccount(isNewUser);
    } catch (err) {
      setError(friendlyError(err));
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle={inviteCode ? `Joining with code ${inviteCode}` : "Free for students. Start in minutes."}
      footer={<>Have an account? <Link href="/login" style={{ color: L.blue, fontWeight: 500 }}>Log in</Link> · Joining via an NGO? <Link href="/join" style={{ color: L.muted, textDecoration: "underline" }}>Use a code</Link></>}
    >
      {error && <p style={{ fontSize: 13, color: L.danger, marginBottom: 8 }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" style={authField} disabled={busy} />
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={authField} disabled={busy} />
        <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6 chars)" style={authField} disabled={busy} />
        <button type="submit" style={authPrimary} disabled={busy}>{busy ? "Creating account…" : "Create account"}</button>
      </form>
      <button onClick={handleGoogle} style={{ ...authOutline, marginTop: 12 }} disabled={busy}>
        Sign up with Google
      </button>
    </AuthShell>
  );
}

export default function SignupPage() {
  return <Suspense fallback={<div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: L.wash, color: L.muted }}>Loading…</div>}><SignupInner /></Suspense>;
}
