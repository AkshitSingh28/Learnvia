"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdmin } from "@/lib/data/DataProvider";
import { setUserRole } from "@/lib/db/users";
import { Card, Btn, EmptyState } from "@/components/ui";
import type { Role } from "@/lib/types";

const field = "w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm";
const ROLES: Role[] = ["student", "mentor", "ngo", "admin"];

function UserEditorInner() {
  const router = useRouter();
  const { users, cohorts, reload } = useAdmin();
  const u = users.find((x) => x.uid === useSearchParams().get("id"));
  const [role, setRole] = useState<Role>(u?.role ?? "student");
  const [busy, setBusy] = useState(false);

  if (!u) return <EmptyState title="User not found" hint="They may not be registered yet." />;
  const cohortName = cohorts.find((c) => c.id === u.cohortId)?.name ?? "—";

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await setUserRole(u!.uid, role); // Cloud Function mirrors this into the custom claim
    await reload();
    router.replace("/admin/users");
  }

  return (
    <div className="max-w-lg">
      <Link href="/admin/users" className="text-sm text-muted">← Users</Link>
      <h1 className="mt-2 text-2xl font-extrabold mb-6">{u.displayName}</h1>
      <Card>
        <form onSubmit={save} className="space-y-3">
          <input value={u.displayName} disabled className={`${field} opacity-60`} style={{ borderColor: "var(--border)" }} />
          <input value={u.email} disabled className={`${field} opacity-60`} style={{ borderColor: "var(--border)" }} />
          <div>
            <div className="text-sm text-muted mb-1">Role</div>
            <select value={role} onChange={(e) => setRole(e.target.value as Role)} className={field} style={{ borderColor: "var(--border)" }}>
              {ROLES.map((r) => <option key={r} className="bg-black">{r}</option>)}
            </select>
          </div>
          <input value={cohortName} disabled className={`${field} opacity-60`} style={{ borderColor: "var(--border)" }} />
          <p className="text-xs text-muted">Role changes take effect on the user&apos;s next sign-in (custom claim refresh).</p>
          <div className="flex gap-2 pt-1"><Btn type="submit" disabled={busy}>{busy ? "Saving…" : "Save role"}</Btn><Btn href="/admin/users" variant="outline">Cancel</Btn></div>
        </form>
      </Card>
    </div>
  );
}

export default function AdminUserEditor() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><UserEditorInner /></Suspense>;
}
