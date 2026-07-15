"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContent } from "@/lib/data/DataProvider";
import { saveContentDoc } from "@/lib/db/content";
import { Card, Btn } from "@/components/ui";
import type { Track } from "@/lib/types";

const field = "w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm";

function TrackEditorInner() {
  const router = useRouter();
  const { tracks, reload } = useContent();
  const t = tracks.find((x) => x.id === useSearchParams().get("id"));
  const isNew = !t;

  const [form, setForm] = useState({
    title: t?.title ?? "",
    kind: t?.kind ?? "skillTrack",
    summary: t?.summary ?? "",
    externalLink: t?.externalLink ?? "",
    practiceTask: t?.practiceTask ?? "",
    requiredOutput: t?.requiredOutput ?? "",
  });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const next: Track = {
      ...(t ?? { id: `t${Date.now()}`, learn: [], progress: 0, locked: false }),
      ...form,
      kind: form.kind as Track["kind"],
    } as Track;
    await saveContentDoc("tracks", next);
    await reload();
    router.replace("/admin/tracks");
  }

  return (
    <div className="max-w-2xl">
      <Link href="/admin/tracks" className="text-sm text-muted">← Tracks</Link>
      <h1 className="mt-2 text-2xl font-extrabold mb-6">{isNew ? "New track" : `Edit: ${t.title}`}</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={form.title} onChange={set("title")} placeholder="Title" className={field} style={{ borderColor: "var(--border)" }} />
          <select value={form.kind} onChange={set("kind")} className={field} style={{ borderColor: "var(--border)" }}>
            <option value="skillTrack" className="bg-black">Skill track</option>
            <option value="digitalFoundation" className="bg-black">Digital Foundation</option>
          </select>
          <textarea value={form.summary} onChange={set("summary")} placeholder="Summary" rows={2} className={field} style={{ borderColor: "var(--border)" }} />
          <input value={form.externalLink} onChange={set("externalLink")} placeholder="External course link" className={field} style={{ borderColor: "var(--border)" }} />
          <input value={form.practiceTask} onChange={set("practiceTask")} placeholder="Practice task" className={field} style={{ borderColor: "var(--border)" }} />
          <input value={form.requiredOutput} onChange={set("requiredOutput")} placeholder="Required output" className={field} style={{ borderColor: "var(--border)" }} />
          <div className="flex gap-2 pt-1"><Btn type="submit" disabled={busy}>{busy ? "Saving…" : isNew ? "Create" : "Save"}</Btn><Btn href="/admin/tracks" variant="outline">Cancel</Btn></div>
        </form>
      </Card>
    </div>
  );
}

export default function AdminTrackEditor() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><TrackEditorInner /></Suspense>;
}
