"use client";

import Link from "next/link";
import { useStudent } from "@/lib/data/DataProvider";
import { module5, readinessPortfolioChecklist, readinessCheckItems } from "@/lib/seed/data";
import { PortfolioSubmit } from "@/components/PortfolioSubmit";
import { Card, PageHeader, Pill, ProgressBar } from "@/components/ui";

/**
 * Application Readiness — a short readiness checkpoint before Phase 3 (NOT a numbered
 * learning module). Prepares resume, portfolio, safety, shortlisting and tracker.
 * Portal-specific guides live on the Phase-3 portal cards.
 */
export default function ApplyReadinessPage() {
  const { checkedItems, toggleChecklistItem } = useStudent();
  const done = new Set(checkedItems.module5 ?? []);
  // Only required items gate progress; the optional LinkedIn step doesn't block beginners.
  const required = module5.filter((m) => !m.optional);
  const requiredDone = required.filter((m) => done.has(m.id)).length;
  const pct = Math.round((Math.min(requiredDone, required.length) / required.length) * 100);

  return (
    <div className="max-w-3xl">
      <Link href="/app/build" className="text-sm text-muted">← Phase 2</Link>
      <PageHeader title="Application Readiness" subtitle="A quick checkpoint before Phase 3 — get your resume, portfolio, safety and shortlist ready. This prepares you; Phase 3 helps you apply." action={<Pill tone="accent">Feeds readiness score</Pill>} />

      <Card className="mb-6">
        <div className="flex justify-between text-sm mb-2"><span>Required readiness items</span><span className="text-muted">{requiredDone}/{required.length} · {pct}%</span></div>
        <ProgressBar value={pct} />
      </Card>

      <div className="space-y-3">
        {module5.map((m) => {
          const isDone = done.has(m.id);
          return (
            <Card key={m.id} className={isDone ? "border-[var(--accent)]" : ""}>
              <div className="flex items-start gap-3">
                <button
                  onClick={() => void toggleChecklistItem("module5", m.id)}
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs"
                  style={{ borderColor: "var(--border)", background: isDone ? "var(--accent)" : "transparent", color: isDone ? "#fff" : "transparent" }}
                >
                  ✓
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2">
                    <span className="font-semibold">{m.title}</span>
                    {m.optional ? <Pill>Optional</Pill> : <Pill tone="accent">Required</Pill>}
                    {m.inApp && <Pill>In-app</Pill>}
                  </div>
                  <p className="mt-1 text-sm text-muted">{m.learns}</p>
                  <p className="mt-1 text-xs"><span className="text-muted">Practice: </span>{m.practice}</p>
                  <p className="mt-1 text-xs"><span className="text-muted">Output: </span>{m.output}</p>
                  <p className="mt-1 text-xs text-amber-400">⚠ {m.boundary}</p>
                  {m.id === "checklist" && <ReadinessChecklist />}
                  {m.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.links.map((l) => (
                        <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium hover:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border)" }}>
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6">
        <div className="font-bold">Submit Readiness Portfolio</div>
        <p className="mt-1 text-sm text-muted">Put all your readiness outputs into one Google Drive folder and submit the link. After submitting your readiness portfolio, you can move to Phase 3 once your required readiness items and score are complete.</p>
        <div className="mt-4">
          <PortfolioSubmit
            refType="track"
            refTitle="Application Readiness portfolio"
            checklist={readinessPortfolioChecklist}
            submitLabel="Submit Readiness Portfolio"
            sampleName="Application Readiness"
          />
        </div>
      </Card>
    </div>
  );
}

/** The interactive "what's ready vs missing" checklist opened from the first card. */
function ReadinessChecklist() {
  const { checkedItems, toggleChecklistItem } = useStudent();
  const done = new Set(checkedItems["readiness-check"] ?? []);
  return (
    <div className="mt-3 rounded-lg border p-3" style={{ borderColor: "var(--border)", background: "var(--elevated)" }}>
      <div className="text-xs font-semibold mb-2">Tick what is ready — untick what is still missing</div>
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {readinessCheckItems.map((item) => {
          const on = done.has(item.id);
          return (
            <button key={item.id} onClick={() => void toggleChecklistItem("readiness-check", item.id)} className="flex items-start gap-2 text-left text-sm">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px]" style={{ borderColor: "var(--border)", background: on ? "var(--accent)" : "transparent", color: on ? "#fff" : "transparent" }}>✓</span>
              <span className={on ? "" : "text-muted"}>{item.label}{item.optional ? " · optional" : ""}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
