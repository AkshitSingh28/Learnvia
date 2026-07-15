"use client";

/**
 * Renders a track's curriculum table (the Phase-2 master-data rows) with per-module
 * completion checkboxes, plus the final portfolio checklist. Completion persists to
 * StudentData under the key `track:<trackId>`, which drives the track's progress %.
 */
import { useStudent } from "@/lib/data/DataProvider";
import { Card, ProgressBar } from "@/components/ui";
import type { Track } from "@/lib/types";

export function TrackCurriculum({ track }: { track: Track }) {
  const { checkedItems, toggleChecklistItem } = useStudent();
  const modules = track.modules ?? [];
  const key = `track:${track.id}`;
  const done = new Set(checkedItems[key] ?? []);
  // Only required (non-support) modules gate completion — optional/advanced support
  // lessons never block a student from reaching 100%.
  const required = modules.filter((m) => !m.support);
  const requiredDone = required.filter((m) => done.has(String(m.order))).length;
  const pct = required.length ? Math.round((Math.min(requiredDone, required.length) / required.length) * 100) : 0;

  return (
    <div>
      <Card className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Completion</span>
          <span className="text-muted">{requiredDone}/{required.length} · {pct}%</span>
        </div>
        <ProgressBar value={pct} />
      </Card>

      <div className="space-y-3">
        {modules.map((m) => {
          const id = String(m.order);
          const isDone = done.has(id);
          return (
            <Card key={id} className={isDone ? "border-[var(--accent)]" : ""}>
              <div className="flex items-start gap-3">
                <button
                  onClick={() => void toggleChecklistItem(key, id)}
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs"
                  style={{ borderColor: "var(--border)", background: isDone ? "var(--accent)" : "transparent", color: isDone ? "#fff" : "transparent" }}
                >
                  ✓
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-xs text-muted">{m.order}.</span>
                    <span className="font-semibold">{m.title}</span>
                    {m.support && (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "var(--track)", color: "var(--muted)" }}>
                        {m.supportLabel ?? "Optional Support"}
                      </span>
                    )}
                    {m.type && <span className="text-xs text-muted">· {m.type}</span>}
                    {m.duration && <span className="text-xs text-muted">· {m.duration}</span>}
                  </div>
                  <p className="mt-1 text-sm text-muted">{m.covers}</p>
                  {m.note && <p className="mt-1 text-xs text-amber-500">ℹ {m.note}</p>}
                  {m.jobObjective && (
                    <p className="mt-1 text-xs text-muted"><span className="text-[var(--accent)]">Job objective:</span> {m.jobObjective}</p>
                  )}
                  <p className="mt-1 text-xs"><span className="text-muted">Output: </span>{m.output}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {m.link && (
                      <a href={m.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: "var(--accent-2)" }}>
                        <i className="ti ti-player-play" aria-hidden="true" /> {m.watchLabel ?? "Watch lesson"}
                      </a>
                    )}
                    {/* Extra learning resources (additional courses, alternative videos, official docs). */}
                    {(m.learnLinks ?? []).map((ll) => (
                      <a key={ll.url} href={ll.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium hover:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border)" }}>
                        <i className="ti ti-book" aria-hidden="true" /> {ll.label}
                      </a>
                    ))}
                    {/* Clickable "Start Practice" — one button per practice tool. */}
                    {(m.practiceLinks ?? []).map((pl) => (
                      <a key={pl.url} href={pl.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium hover:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border)" }}>
                        <i className="ti ti-external-link" aria-hidden="true" /> {pl.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {track.portfolioChecklist && track.portfolioChecklist.length > 0 && (
        <Card className="mt-6">
          <div className="font-bold">Final portfolio — you should have</div>
          <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted">
            {track.portfolioChecklist.map((item) => (
              <li key={item} className="flex gap-2"><span className="text-[var(--accent)]">•</span>{item}</li>
            ))}
          </ul>
          {track.portfolioNote && (
            <p className="mt-4 rounded-lg border p-3 text-xs text-muted" style={{ borderColor: "var(--border)", background: "var(--elevated)" }}>{track.portfolioNote}</p>
          )}
        </Card>
      )}
    </div>
  );
}
