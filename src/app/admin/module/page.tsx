"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContent } from "@/lib/data/DataProvider";
import { saveContentDoc } from "@/lib/db/content";
import { Card, Btn, SectionTitle } from "@/components/ui";
import type { Module } from "@/lib/types";

const field = "w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm";

function ModuleEditorInner() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const { modules, reload } = useContent();
  const m = modules.find((x) => x.id === id);
  const isNew = !m;

  const [form, setForm] = useState({
    title: m?.title ?? "",
    subtitle: m?.subtitle ?? "",
    estMinutes: m?.estMinutes ?? 25,
    badge: m?.badge ?? "",
    passScore: m?.passScore ?? 70,
    videoUrl: m?.videoUrl ?? "",
    pptUrl: m?.pptUrl ?? "",
    pdfUrl: m?.pdfUrl ?? "",
    task: m?.task ?? "",
    reflection: m?.reflection ?? "",
  });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "number" ? Number(e.target.value) : e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const order = m?.order ?? (modules.reduce((mx, x) => Math.max(mx, x.order), 0) + 1);
    // Merge edited scalar fields onto the existing module (preserving lessons/quiz/flashcards),
    // or build a minimal valid module skeleton when creating a new one.
    const next: Module = {
      ...(m ?? {
        id: `m${Date.now()}`,
        order,
        level: "Beginner",
        lessons: [],
        flashcards: [],
        promptLab: [],
        quiz: [],
        progress: 0,
        locked: order > 1,
      }),
      ...form,
    } as Module;
    await saveContentDoc("modules", next);
    await reload();
    router.replace("/admin/modules");
  }

  return (
    <div className="max-w-3xl">
      <Link href="/admin/modules" className="text-sm text-muted">← Modules</Link>
      <h1 className="mt-2 text-2xl font-extrabold mb-6">{isNew ? "New module" : `Edit: ${m.title}`}</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <SectionTitle>Basics</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={form.title} onChange={set("title")} placeholder="Title" className={field} style={{ borderColor: "var(--border)" }} />
            <input value={form.estMinutes} onChange={set("estMinutes")} type="number" placeholder="Estimated minutes" className={field} style={{ borderColor: "var(--border)" }} />
            <input value={form.subtitle} onChange={set("subtitle")} placeholder="Subtitle" className={`${field} sm:col-span-2`} style={{ borderColor: "var(--border)" }} />
            <input value={form.badge} onChange={set("badge")} placeholder="Badge to unlock" className={field} style={{ borderColor: "var(--border)" }} />
            <input value={form.passScore} onChange={set("passScore")} type="number" placeholder="Quiz pass %" className={field} style={{ borderColor: "var(--border)" }} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Media</SectionTitle>
          <div className="space-y-3">
            <input value={form.videoUrl} onChange={set("videoUrl")} placeholder="Video embed URL (YouTube/Vimeo unlisted)" className={field} style={{ borderColor: "var(--border)" }} />
            <input value={form.pptUrl} onChange={set("pptUrl")} placeholder="PPT notes URL (Storage)" className={field} style={{ borderColor: "var(--border)" }} />
            <input value={form.pdfUrl} onChange={set("pdfUrl")} placeholder="PDF worksheet URL (Storage)" className={field} style={{ borderColor: "var(--border)" }} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Lessons</SectionTitle>
          <div className="space-y-2">
            {(m?.lessons ?? [{ id: "n", title: "", body: "" }]).map((l, i) => (
              <input key={i} defaultValue={l.title} placeholder={`Lesson ${i + 1} title`} className={field} style={{ borderColor: "var(--border)" }} />
            ))}
          </div>
          <button type="button" className="mt-3 text-sm text-[var(--accent)]">+ Add lesson</button>
        </Card>

        <Card>
          <SectionTitle>Quiz</SectionTitle>
          <div className="space-y-2">
            {(m?.quiz ?? []).map((q, i) => (
              <input key={q.id} defaultValue={q.prompt} placeholder={`Question ${i + 1}`} className={field} style={{ borderColor: "var(--border)" }} />
            ))}
          </div>
          <button type="button" className="mt-3 text-sm text-[var(--accent)]">+ Add question</button>
        </Card>

        <Card>
          <SectionTitle>Task & reflection</SectionTitle>
          <textarea value={form.task} onChange={set("task")} placeholder="Task / output upload prompt" rows={2} className={field} style={{ borderColor: "var(--border)" }} />
          <textarea value={form.reflection} onChange={set("reflection")} placeholder="Reflection question" rows={2} className={`${field} mt-3`} style={{ borderColor: "var(--border)" }} />
        </Card>

        <div className="flex gap-2"><Btn type="submit" disabled={busy}>{busy ? "Saving…" : isNew ? "Create module" : "Save changes"}</Btn><Btn href="/admin/modules" variant="outline">Cancel</Btn></div>
      </form>
    </div>
  );
}

export default function AdminModuleEditor() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><ModuleEditorInner /></Suspense>;
}
