"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { AuthShell, authField, authPrimary } from "@/components/public/AuthShell";
import { L } from "@/components/public/lightTheme";

export default function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await sendPasswordReset(email);
    } catch {
      // Always show success to avoid leaking whether an email exists
    } finally {
      setSent(true);
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Reset your password" footer={<Link href="/login" style={{ color: L.blue, fontWeight: 500 }}>Back to login</Link>}>
      {sent ? (
        <p style={{ fontSize: 14, color: L.muted }}>If an account exists for that email, a reset link is on its way.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={authField} disabled={busy} />
          <button type="submit" style={authPrimary} disabled={busy}>{busy ? "Sending…" : "Send reset link"}</button>
        </form>
      )}
    </AuthShell>
  );
}
