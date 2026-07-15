"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Card, PageHeader, Btn } from "@/components/ui";

export default function SettingsPage() {
  const { user, updateUserProfile, signOut } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [education, setEducation] = useState(user?.education ?? "");
  const [goals, setGoals] = useState(user?.goals ?? "");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await updateUserProfile({ displayName, education: education || undefined, goals: goals || undefined });
    setBusy(false);
    setSaved(true);
  }

  return (
    <div className="max-w-lg">
      <PageHeader title="Settings" />
      <Card className="mb-5">
        <div className="font-bold mb-3">Account</div>
        <form onSubmit={save} className="space-y-3">
          <input value={displayName} onChange={(e) => { setDisplayName(e.target.value); setSaved(false); }} placeholder="Display name" className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)" }} />
          <input value={user?.email ?? ""} disabled className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm opacity-60" style={{ borderColor: "var(--border)" }} />
          <input value={education} onChange={(e) => { setEducation(e.target.value); setSaved(false); }} placeholder="Education (e.g. Class 12 / B.A. 1st year)" className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)" }} />
          <textarea value={goals} onChange={(e) => { setGoals(e.target.value); setSaved(false); }} placeholder="Your goal" rows={2} className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)" }} />
          <div className="flex items-center gap-3">
            <Btn type="submit" disabled={busy}>{busy ? "Saving…" : "Save changes"}</Btn>
            {saved && <span className="text-sm text-emerald-600">✓ Saved</span>}
          </div>
        </form>
      </Card>
      <Card className="mb-5">
        <div className="font-bold mb-3">Preferences</div>
        <label className="flex items-center justify-between text-sm py-2"><span>Email notifications</span><input type="checkbox" defaultChecked /></label>
        <label className="flex items-center justify-between text-sm py-2"><span>Language</span><select className="rounded border bg-transparent px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }}><option className="bg-black">English</option><option className="bg-black">हिंदी (soon)</option></select></label>
      </Card>
      <Card>
        <div className="font-bold mb-2">Security</div>
        <Link href="/forgot-password" className="text-sm text-[var(--accent)]">Change password</Link>
        <div className="mt-4"><Btn variant="outline" onClick={() => { signOut().then(() => router.replace("/login")); }}>Sign out</Btn></div>
      </Card>
    </div>
  );
}
