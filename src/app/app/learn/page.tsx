"use client";

import Link from "next/link";
import { useStudent } from "@/lib/data/DataProvider";
import { Card, PageHeader, ProgressBar, Pill, IconTile, WidgetPanel, type WellTone } from "@/components/ui";

const TONES: WellTone[] = ["indigo", "violet", "blue", "green", "orange", "red"];

/** Phase 1 — Learn Foundations overview. */
export default function LearnPage() {
  const { modules, loading } = useStudent();
  const overall = modules.length ? Math.round(modules.reduce((s, m) => s + m.progress, 0) / modules.length) : 0;
  const done = modules.filter((m) => m.progress === 100).length;

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title="Phase 1 · Learn Foundations" subtitle="Build the base. Understand essential AI and digital concepts step by step." />

      <WidgetPanel className="mb-7" title="Overall progress" action={<span className="text-sm text-muted">{done} of {modules.length} modules</span>}>
        <ProgressBar value={overall} />
      </WidgetPanel>

      <div className="grid md:grid-cols-2 gap-5">
        {modules.map((m) => {
          const tone = TONES[(m.order - 1) % TONES.length];
          const inner = (
            <Card lift={!m.locked} className={`h-full ${m.locked ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <IconTile icon="ti-book" tone={tone} size="lg" />
                  <Pill tone="accent">Module {m.order}</Pill>
                </div>
                {m.locked ? <Pill>🔒 Locked</Pill> : m.progress === 100 ? <Pill tone="green">✓ Completed</Pill> : <span className="text-sm text-muted">{m.progress}%</span>}
              </div>
              <div className="mt-3 font-bold">{m.title}</div>
              <p className="mt-1 text-sm text-muted leading-relaxed line-clamp-2">{m.subtitle}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>⏱ {m.estMinutes} min · {m.level}</span><span>🏅 {m.badge}</span>
              </div>
              {!m.locked && <div className="mt-4"><ProgressBar value={m.progress} /></div>}
            </Card>
          );
          return m.locked ? <div key={m.id}>{inner}</div> : <Link key={m.id} href={`/app/learn/module/?id=${m.id}`}>{inner}</Link>;
        })}
      </div>
    </div>
  );
}
