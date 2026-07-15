"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, homeForRole } from "@/lib/auth/AuthProvider";
import { AuthShell, authField, authPrimary } from "@/components/public/AuthShell";

export default function OnboardingProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [education, setEducation] = useState("");
  const [goals, setGoals] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await updateUserProfile({ displayName: displayName || undefined, education: education || undefined, goals: goals || undefined });
    router.replace(user ? homeForRole(user.role) : "/app");
  }

  return (
    <AuthShell title="Set up your profile" subtitle="Tell us a little about you." max={460}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input required value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name" style={authField} disabled={busy} />
        <input value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Education (e.g. Class 12 / B.A. 1st year)" style={authField} disabled={busy} />
        <textarea value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="Your goal (e.g. get a content-writing internship)" rows={3} style={{ ...authField, resize: "vertical" }} disabled={busy} />
        <button type="submit" style={authPrimary} disabled={busy}>{busy ? "Saving…" : "Continue"}</button>
      </form>
    </AuthShell>
  );
}
