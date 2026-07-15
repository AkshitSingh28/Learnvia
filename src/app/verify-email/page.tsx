"use client";

import Link from "next/link";
import { AuthShell, authPrimary, authOutline } from "@/components/public/AuthShell";
import { L } from "@/components/public/lightTheme";

export default function VerifyEmailPage() {
  return (
    <AuthShell title="Verify your email" subtitle="We sent a verification link to your inbox. Click it to activate your account.">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link href="/app" style={authPrimary}>I&apos;ve verified — continue</Link>
        <button style={authOutline}>Resend email</button>
      </div>
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <Link href="/login" style={{ fontSize: 13, color: L.muted }}>Back to login</Link>
      </div>
    </AuthShell>
  );
}
