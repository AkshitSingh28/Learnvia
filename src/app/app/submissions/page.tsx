"use client";

import { useStudent } from "@/lib/data/DataProvider";
import { Card, PageHeader, Pill, EmptyState, IconTile, type WellTone } from "@/components/ui";
import type { Submission } from "@/lib/types";

const REF_META: Record<Submission["refType"], { icon: string; tone: WellTone }> = {
  module: { icon: "ti-book", tone: "indigo" },
  track: { icon: "ti-route", tone: "violet" },
  project: { icon: "ti-folder", tone: "orange" },
  application: { icon: "ti-briefcase", tone: "blue" },
};

export default function SubmissionsPage() {
  const { submissions, loading } = useStudent();

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title="Submission History" subtitle="Everything you've submitted and its review status." />
      {submissions.length === 0 ? (
        <EmptyState title="No submissions yet" hint="Submit a module task, project, or track output for mentor review and it'll appear here." />
      ) : (
        <Card>
          <div className="space-y-1">
            {submissions.map((s) => {
              const meta = REF_META[s.refType] ?? { icon: "ti-file", tone: "indigo" as WellTone };
              return (
                <div key={s.id} className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 -mx-2.5">
                  <IconTile icon={meta.icon} tone={meta.tone} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold truncate">{s.refTitle}</div>
                    <div className="text-xs text-muted capitalize">{s.refType} · {s.submittedAgo}{s.feedback ? ` · “${s.feedback}”` : ""}</div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {s.link && <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)]">View ↗</a>}
                    <Pill tone={s.status === "Approved" ? "green" : s.status === "Needs work" ? "amber" : "neutral"}>{s.status}</Pill>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
