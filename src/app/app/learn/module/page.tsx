"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStudent } from "@/lib/data/DataProvider";
import { SubmitWork } from "@/components/SubmitWork";
import { AiInline } from "@/components/ai/AiInline";
import { Card, Btn, Pill, ProgressBar } from "@/components/ui";

/**
 * Module learning page (LearningView) — restructured: a centered reading column with the
 * video as a centered hero, and the rest organized into tabs (one focused section at a time)
 * instead of a cramped 3-column layout. Less loaded, video front-and-center.
 */
const TABS = ["Overview", "Lessons", "Flashcards", "Prompt Lab", "Task", "Reflection"] as const;
type Tab = (typeof TABS)[number];

function ModuleInner() {
  const id = useSearchParams().get("id");
  const { modules, loading, toggleLesson, saveReflection, reflections } = useStudent();
  const m = modules.find((x) => x.id === id) ?? modules[0];
  const [tab, setTab] = useState<Tab>("Lessons");
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [reflection, setReflection] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);

  if (loading || !m) return <div className="text-muted">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Link href="/app/learn" className="text-sm text-muted">← Phase 1 · Learn Foundations</Link>
      <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">Module {m.order}: {m.title}</h1>
      <p className="mt-2 text-muted max-w-2xl">{m.subtitle}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Pill tone="green">🌱 {m.level}</Pill>
        <Pill>⏱ {m.estMinutes} min</Pill>
        <Pill tone="accent">🏅 {m.badge}</Pill>
      </div>
      <div className="mt-4"><ProgressBar value={m.progress} /></div>

      {/* Video hero — centered */}
      <div className="mt-7">
        <div className="mx-auto max-w-3xl aspect-video overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)", boxShadow: "0 12px 34px rgba(13,17,23,.10)" }}>
          <iframe src={m.videoUrl} title="Lesson video" className="h-full w-full" allowFullScreen />
        </div>
        <div className="mt-2.5 text-center text-xs text-muted">{m.videoLengthLabel} explainer · a quick overview of {m.title}</div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-1 overflow-x-auto border-b" style={{ borderColor: "var(--border)" }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors"
            style={{ color: tab === t ? "var(--accent)" : "var(--muted)", borderBottom: `2px solid ${tab === t ? "var(--accent)" : "transparent"}` }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content — single centered column */}
      <div className="mt-6">
        {tab === "Overview" && (
          <div className="space-y-5">
            <Card>
              <div className="font-bold mb-3">What&apos;s in this module</div>
              <ul className="grid sm:grid-cols-2 gap-2.5 text-sm text-muted">
                <li>📘 {m.lessons.length} lesson cards</li>
                <li>▶ {m.videoLengthLabel} explainer video</li>
                <li>🃏 {m.flashcards.length} flashcards</li>
                <li>❓ {m.quiz.length}-question quiz · pass {m.passScore}%</li>
                <li>📝 1 practical task</li>
                <li>🏅 Badge: {m.badge}</li>
              </ul>
            </Card>
            <Card>
              <div className="font-bold mb-2">Downloads</div>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "PPT Notes", href: m.pptUrl },
                  { label: "PDF Worksheet", href: m.pdfUrl },
                  { label: "Flashcards", href: m.flashcardsDocUrl },
                ].map(({ label, href }) =>
                  href ? (
                    <a key={label} href={href} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm" style={{ borderColor: "var(--border)" }}>⬇ {label}</a>
                  ) : (
                    <span key={label} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm text-muted opacity-50 cursor-not-allowed" style={{ borderColor: "var(--border)" }}>{label} · Coming soon</span>
                  ),
                )}
              </div>
            </Card>
          </div>
        )}

        {tab === "Lessons" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {m.lessons.map((l, i) => (
              <Card key={l.id}>
                <div className="flex items-center gap-2 font-bold"><span className="text-[var(--accent)]">{i + 1}</span> {l.title}{l.done && <span className="text-emerald-500 text-sm">✓</span>}</div>
                <p className="mt-2 text-sm text-muted leading-relaxed">{l.body}</p>
                {l.examples && <ul className="mt-3 space-y-1 text-sm text-muted">{l.examples.map((e) => <li key={e}>• {e}</li>)}</ul>}
                <button onClick={() => toggleLesson(m.id, l.id)} className="mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium"
                  style={{ borderColor: l.done ? "var(--accent)" : "var(--border)", color: l.done ? "var(--accent)" : "var(--muted)", background: l.done ? "rgba(75,87,246,0.08)" : "transparent" }}>
                  {l.done ? "✓ Completed" : "Mark as done"}
                </button>
              </Card>
            ))}
          </div>
        )}

        {tab === "Flashcards" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {m.flashcards.map((f, i) => (
              <button key={i} onClick={() => setFlipped((p) => ({ ...p, [i]: !p[i] }))} className="text-left">
                <Card className="cursor-pointer hover:border-[var(--accent)] transition-colors">
                  <div className="text-[10px] uppercase tracking-wider text-muted">{flipped[i] ? "Answer" : "Question · tap to flip"}</div>
                  <div className="mt-1 text-sm font-semibold">{flipped[i] ? f.back : f.front}</div>
                </Card>
              </button>
            ))}
          </div>
        )}

        {tab === "Prompt Lab" && (
          <Card>
            <div className="text-sm font-semibold mb-3">Try these prompts</div>
            {m.promptLab.map((p) => (
              <div key={p} className="flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm text-muted mb-2 last:mb-0" style={{ borderColor: "var(--border)" }}>
                <span>{p}</span><Link href="/app/practice" className="text-xs text-[var(--accent)] whitespace-nowrap ml-3">Open in Prompt Lab</Link>
              </div>
            ))}
          </Card>
        )}

        {tab === "Task" && (
          <Card>
            <div className="font-bold">Your task</div>
            <p className="mt-1.5 text-sm text-muted">{m.task}</p>
            <div className="mt-4"><SubmitWork refType="module" refTitle={`Module ${m.order}: ${m.title} — task`} /></div>
          </Card>
        )}

        {tab === "Reflection" && (
          <Card>
            <div className="text-sm"><span className="font-semibold">💡 Think about it — </span><span className="text-muted">{m.reflection}</span></div>
            <textarea
              rows={3}
              defaultValue={reflections[m.id] ?? ""}
              onChange={(e) => { setReflection(e.target.value); setReflectionSaved(false); }}
              placeholder="Write your reflection…"
              className="mt-4 w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm"
              style={{ borderColor: "var(--border)" }}
            />
            <div className="mt-3 flex items-center gap-3">
              <Btn onClick={async () => { await saveReflection(m.id, reflection || reflections[m.id] || ""); setReflectionSaved(true); }} variant="outline">Save reflection</Btn>
              {reflectionSaved && <span className="text-sm text-emerald-600">✓ Saved</span>}
            </div>
            <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--border)" }}>
              <div className="text-xs font-semibold text-muted mb-2">Want a second opinion? Get quick coach feedback on your reflection.</div>
              <AiInline
                label="Get feedback"
                resultLabel="Coach feedback"
                disabled={!(reflection || reflections[m.id])}
                notReadyHint="Write and save a reflection first, then ask for feedback."
                system="You are a warm, encouraging learning coach for a beginner student on GrowHub. Give brief, specific, formative feedback on their reflection — 2-3 short sentences: name one thing they understood well, then one concrete idea to push their thinking further. Never rewrite it for them."
                buildPrompt={() => {
                  const text = (reflection || reflections[m.id] || "").trim();
                  if (!text) return null;
                  return `Module: "${m.title}". Prompt they reflected on: "${m.reflection}".\n\nStudent's reflection:\n"""${text}"""`;
                }}
              />
            </div>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="mt-9 flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <div className="text-sm text-muted">Module progress · {m.progress}%</div>
        <Btn href={`/app/learn/quiz/?module=${m.id}`}>Continue to Quiz →</Btn>
      </div>
    </div>
  );
}

export default function ModulePage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><ModuleInner /></Suspense>;
}
