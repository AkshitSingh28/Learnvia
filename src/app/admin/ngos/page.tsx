"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/data/DataProvider";
import { saveNgo } from "@/lib/db/cohorts";
import { Card, PageHeader, Btn, SectionTitle } from "@/components/ui";
import { CrudList } from "@/components/admin/CrudList";
import type { Ngo } from "@/lib/types";

const field = "w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm";

export default function AdminNgosPage() {
  const { ngos, reload, loading } = useAdmin();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "" });
  const [busy, setBusy] = useState(false);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const ngo: Ngo = { id: `ng-${Date.now()}`, name: form.name, contact: form.contact, mentors: 0, students: 0 };
    await saveNgo(ngo);
    await reload();
    setForm({ name: "", contact: "" });
    setOpen(false);
    setBusy(false);
  }

  return (
    <div>
      <PageHeader title="NGOs" subtitle="Partner organisations and their reach." action={<Btn onClick={() => setOpen((o) => !o)}>{open ? "Close" : "+ Add NGO"}</Btn>} />

      {open && (
        <Card className="mb-5">
          <SectionTitle>New NGO</SectionTitle>
          <form onSubmit={create} className="grid sm:grid-cols-2 gap-3">
            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="NGO name" className={field} style={{ borderColor: "var(--border)" }} />
            <input value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} placeholder="Contact email" className={field} style={{ borderColor: "var(--border)" }} />
            <div className="sm:col-span-2"><Btn type="submit" disabled={busy}>{busy ? "Adding…" : "Add NGO"}</Btn></div>
          </form>
        </Card>
      )}

      <CrudList
        title="" subtitle={loading ? "Loading…" : undefined}
        columns={["Name", "Contact", "Mentors", "Students"]}
        rows={ngos.map((n) => ({
          id: n.id,
          cells: [<span key="n" className="font-medium">{n.name}</span>, n.contact, n.mentors, n.students],
        }))}
      />
    </div>
  );
}
