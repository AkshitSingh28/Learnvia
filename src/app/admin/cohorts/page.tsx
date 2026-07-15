"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/data/DataProvider";
import { saveCohort } from "@/lib/db/cohorts";
import { Card, PageHeader, Btn, SectionTitle } from "@/components/ui";
import { CrudList } from "@/components/admin/CrudList";
import type { Cohort } from "@/lib/types";

const field = "w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm";

export default function AdminCohortsPage() {
  const { cohorts, users, reload, loading } = useAdmin();
  const staff = users.filter((u) => u.role === "mentor" || u.role === "ngo");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", inviteCode: "", mentorId: "", ngoId: "" });
  const [busy, setBusy] = useState(false);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const id = `co-${Date.now()}`;
    const ngoName = users.find((u) => u.uid === form.ngoId)?.displayName ?? "—";
    const cohort: Cohort = {
      id,
      name: form.name,
      ngo: ngoName,
      ngoId: form.ngoId || undefined,
      mentorId: form.mentorId || undefined,
      students: 0,
      avgProgress: 0,
      inviteCode: (form.inviteCode || `PROV-${id.slice(-4).toUpperCase()}`).toUpperCase(),
    };
    await saveCohort(cohort);
    await reload();
    setForm({ name: "", inviteCode: "", mentorId: "", ngoId: "" });
    setOpen(false);
    setBusy(false);
  }

  return (
    <div>
      <PageHeader title="Cohorts" subtitle="Batches managed by NGOs and mentors." action={<Btn onClick={() => setOpen((o) => !o)}>{open ? "Close" : "+ New cohort"}</Btn>} />

      {open && (
        <Card className="mb-5">
          <SectionTitle>New cohort</SectionTitle>
          <form onSubmit={create} className="grid sm:grid-cols-2 gap-3">
            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Cohort name" className={field} style={{ borderColor: "var(--border)" }} />
            <input value={form.inviteCode} onChange={(e) => setForm((f) => ({ ...f, inviteCode: e.target.value }))} placeholder="Invite code (auto if blank)" className={field} style={{ borderColor: "var(--border)" }} />
            <select value={form.ngoId} onChange={(e) => setForm((f) => ({ ...f, ngoId: e.target.value }))} className={field} style={{ borderColor: "var(--border)" }}>
              <option value="" className="bg-black">NGO owner (optional)</option>
              {staff.filter((u) => u.role === "ngo").map((u) => <option key={u.uid} value={u.uid} className="bg-black">{u.displayName}</option>)}
            </select>
            <select value={form.mentorId} onChange={(e) => setForm((f) => ({ ...f, mentorId: e.target.value }))} className={field} style={{ borderColor: "var(--border)" }}>
              <option value="" className="bg-black">Mentor (optional)</option>
              {staff.filter((u) => u.role === "mentor").map((u) => <option key={u.uid} value={u.uid} className="bg-black">{u.displayName}</option>)}
            </select>
            <div className="sm:col-span-2"><Btn type="submit" disabled={busy}>{busy ? "Creating…" : "Create cohort"}</Btn></div>
          </form>
        </Card>
      )}

      <CrudList
        title="" subtitle={loading ? "Loading…" : undefined}
        columns={["Cohort", "NGO", "Students", "Invite code"]}
        rows={cohorts.map((c) => ({
          id: c.id,
          cells: [<span key="n" className="font-medium">{c.name}</span>, c.ngo, c.students, <code key="i" className="text-xs text-muted">{c.inviteCode}</code>],
        }))}
      />
    </div>
  );
}
