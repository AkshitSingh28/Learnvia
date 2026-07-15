"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/data/DataProvider";
import { createInvite } from "@/lib/db/invites";
import { Card, PageHeader, Btn, SectionTitle, Pill } from "@/components/ui";
import { CrudList } from "@/components/admin/CrudList";
import type { Role } from "@/lib/types";

const field = "w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm";
const ROLES: Role[] = ["student", "mentor", "ngo"];

export default function AdminInvitesPage() {
  const { invites, cohorts, reload, loading } = useAdmin();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code: "", cohortId: "", role: "student" as Role });
  const [busy, setBusy] = useState(false);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const code = (form.code || `PROV-${Math.random().toString(36).slice(2, 6).toUpperCase()}`).toUpperCase();
    const cohortName = cohorts.find((c) => c.id === form.cohortId)?.name;
    await createInvite({ code, cohortId: form.cohortId, cohortName, role: form.role, active: true });
    await reload();
    setForm({ code: "", cohortId: "", role: "student" });
    setOpen(false);
    setBusy(false);
  }

  return (
    <div>
      <PageHeader title="Invites" subtitle="Generate and manage cohort/role invite codes." action={<Btn onClick={() => setOpen((o) => !o)}>{open ? "Close" : "+ Generate invite"}</Btn>} />

      {open && (
        <Card className="mb-5">
          <SectionTitle>New invite</SectionTitle>
          <form onSubmit={create} className="grid sm:grid-cols-3 gap-3">
            <input value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))} placeholder="Code (auto if blank)" className={field} style={{ borderColor: "var(--border)" }} />
            <select required value={form.cohortId} onChange={(e) => setForm((f) => ({ ...f, cohortId: e.target.value }))} className={field} style={{ borderColor: "var(--border)" }}>
              <option value="" className="bg-black">Select cohort…</option>
              {cohorts.map((c) => <option key={c.id} value={c.id} className="bg-black">{c.name}</option>)}
            </select>
            <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role }))} className={field} style={{ borderColor: "var(--border)" }}>
              {ROLES.map((r) => <option key={r} value={r} className="bg-black">{r}</option>)}
            </select>
            <div className="sm:col-span-3"><Btn type="submit" disabled={busy}>{busy ? "Generating…" : "Generate"}</Btn></div>
          </form>
        </Card>
      )}

      <CrudList
        title="" subtitle={loading ? "Loading…" : undefined}
        columns={["Code", "Cohort", "Role", "Uses", "Status"]}
        rows={invites.map((iv) => ({
          id: iv.id,
          cells: [
            <code key="c" className="text-sm">{iv.code}</code>,
            iv.cohortName ?? iv.cohortId,
            iv.role,
            iv.uses,
            <Pill key="s" tone={iv.active ? "green" : "neutral"}>{iv.active ? "Active" : "Inactive"}</Pill>,
          ],
        }))}
      />
    </div>
  );
}
