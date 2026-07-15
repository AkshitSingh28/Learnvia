"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, homeForRole } from "@/lib/auth/AuthProvider";
import { AuthShell, authField, authPrimary, authOutline } from "@/components/public/AuthShell";
import { L } from "@/components/public/lightTheme";

function friendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found")
    return "Incorrect email or password.";
  if (code === "auth/too-many-requests") return "Too many attempts. Try again later.";
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return "";
  if (code === "auth/popup-blocked") return "Your browser blocked the sign-in popup. Allow popups and try again.";
  if (code === "auth/operation-not-allowed") return "Google sign-in isn't enabled for this project yet. (Admin: enable it in Firebase Console → Authentication → Sign-in method.)";
  if (code === "auth/unauthorized-domain") return "This domain isn't authorized for sign-in. (Admin: add it in Firebase Console → Authentication → Settings → Authorized domains.)";
  return "Something went wrong. Please try again.";
}

export default function LoginPage() {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const profile = await signInWithEmail(email, password);
      router.replace(homeForRole(profile.role));
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setBusy(true);
    try {
      const { profile, isNewUser } = await signInWithGoogle();
      router.replace(isNewUser ? "/onboarding/role" : homeForRole(profile.role));
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue learning."
      footer={<>No account? <Link href="/signup" style={{ color: L.blue, fontWeight: 500 }}>Sign up</Link> · <Link href="/forgot-password" style={{ color: L.muted }}>Forgot password?</Link></>}
    >
      {error && <p style={{ fontSize: 13, color: L.danger, marginBottom: 8 }}>{error}</p>}
      <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={authField} disabled={busy} />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={authField} disabled={busy} />
        <button type="submit" style={authPrimary} disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
      </form>
      <button onClick={handleGoogle} style={{ ...authOutline, marginTop: 12 }} disabled={busy}>
        Continue with Google
      </button>
    </AuthShell>
  );
}
