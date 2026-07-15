"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContent } from "@/lib/data/DataProvider";
import { saveContentDoc } from "@/lib/db/content";
import { Card, Btn } from "@/components/ui";
import type { Portal } from "@/lib/types";

const field = "w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm";
const CATEGORIES: Portal["category"][] = ["Internship", "Apprenticeship", "Freelance", "Jobs", "Government"];

function PortalEditorInner() {
  const router = useRouter();
  const { portals, reload } = useContent();
  const p = portals.find((x) => x.id === useSearchParams().get("id"));
  const isNew = !p;

  const [form, setForm] = useState({
    name: p?.name ?? "",
    url: p?.url ?? "",
    category: p?.category ?? "Internship",
    minReadiness: p?.minReadiness ?? 50,
    flagged: p?.flagged ?? false,
  });
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const opportunityType: Portal["opportunityType"] =
      form.category === "Freelance" ? "Online Freelance"
        : form.category === "Apprenticeship" ? "Apprenticeship"
          : form.category === "Internship" ? "Internships"
            : "Jobs";
    const next: Portal = {
      ...(p ?? { id: `po${Date.now()}`, modes: ["Remote"] as Portal["modes"] }),
      ...form,
      category: form.category as Portal["category"],
      // Keep the score alias in sync and ensure Phase-3 fields always exist.
      recommendedFromScore: form.minReadiness,
      opportunityType: p?.opportunityType ?? opportunityType,
      modes: p?.modes ?? ["Remote"],
    } as Portal;
    await saveContentDoc("portals", next);
    await reload();
    router.replace("/admin/portals");
  }

  return (
    <div className="max-w-xl">
      <Link href="/admin/portals" className="text-sm text-muted">← Portals</Link>
      <h1 className="mt-2 text-2xl font-extrabold mb-6">{isNew ? "New portal" : `Edit: ${p.name}`}</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Portal name" className={field} style={{ borderColor: "var(--border)" }} />
          <input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} placeholder="URL" className={field} style={{ borderColor: "var(--border)" }} />
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Portal["category"] }))} className={field} style={{ borderColor: "var(--border)" }}>
            {CATEGORIES.map((c) => <option key={c} className="bg-black">{c}</option>)}
          </select>
          <input value={form.minReadiness} onChange={(e) => setForm((f) => ({ ...f, minReadiness: Number(e.target.value) }))} type="number" placeholder="Min readiness to unlock" className={field} style={{ borderColor: "var(--border)" }} />
          <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" checked={form.flagged} onChange={(e) => setForm((f) => ({ ...f, flagged: e.target.checked }))} /> Flag as unsafe</label>
          <div className="flex gap-2 pt-1"><Btn type="submit" disabled={busy}>{busy ? "Saving…" : isNew ? "Create" : "Save"}</Btn><Btn href="/admin/portals" variant="outline">Cancel</Btn></div>
        </form>
      </Card>
    </div>
  );
}

export default function AdminPortalEditor() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><PortalEditorInner /></Suspense>;
}
