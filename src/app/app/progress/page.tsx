"use client";

import { useStudent, useContent } from "@/lib/data/DataProvider";
import { certificates } from "@/lib/seed/data";
import { PageHeader, Pill, WidgetPanel, StatBox, ActionRow, type WellTone } from "@/components/ui";

/** Track & Grow — overall progress across learning, portfolio, applications, readiness. */
export default function ProgressPage() {
  const { modules, readiness, applications, badges, loading } = useStudent();
  const { projects } = useContent();
  const modulesDone = modules.filter((m) => m.progress === 100).length;
  const b = readiness.breakdown;
  // Max values mirror the readiness weights in lib/data/derive.ts (20/25/20/20/15).
  const rows: [string, number, number, WellTone][] = [
    ["AI Foundation completed", b.phase1, 20, "indigo"],
    ["One skill pathway completed", b.phase2, 25, "violet"],
    ["Practical assignments submitted", b.assignments, 20, "blue"],
    ["Portfolio output added", b.portfolio, 20, "orange"],
    ["Application readiness (Module 5)", b.application, 15, "green"],
  ];

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title="Track & Grow" subtitle="Your learning, portfolio, applications and overall readiness." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <StatBox value={`${modulesDone}/${modules.length}`} label="Modules completed" tone="indigo" icon="ti-book" />
        <StatBox value={projects.length} label="Projects" tone="violet" icon="ti-folder" />
        <StatBox value={applications.length} label="Applications" tone="blue" icon="ti-briefcase" />
        <StatBox value={`${readiness.score}/100`} label="Readiness score" tone="green" icon="ti-target-arrow" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <WidgetPanel title="Readiness breakdown">
          <ul className="space-y-4">
            {rows.map(([label, val, max, tone]) => (
              <li key={label}>
                <div className="flex justify-between text-sm mb-1.5"><span>{label}</span><span className="text-muted">{val}/{max}</span></div>
                <div className="h-1.5 w-full rounded-full" style={{ background: "var(--track)" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${(val / max) * 100}%`, background: `var(--well-${tone}-fg)` }} />
                </div>
              </li>
            ))}
          </ul>
        </WidgetPanel>

        <div className="space-y-5">
          <WidgetPanel title="Recent applications">
            {applications.length === 0 ? (
              <p className="text-sm text-muted">No applications yet.</p>
            ) : (
              <div className="space-y-1">
                {applications.map((a) => (
                  <ActionRow
                    key={a.id}
                    icon="ti-briefcase"
                    tone="blue"
                    title={a.role}
                    subtitle={`${a.portalName} · ${a.appliedAgo}`}
                    right={<Pill tone={a.status === "Shortlisted" || a.status === "Selected" ? "green" : a.status === "In Review" ? "amber" : "neutral"}>{a.status}</Pill>}
                  />
                ))}
              </div>
            )}
          </WidgetPanel>

          <WidgetPanel title="Badges & certificates">
            <div className="flex flex-wrap gap-2">
              {badges.map((x) => <Pill key={x.id} tone={x.earned ? "accent" : "neutral"}>{x.earned ? "🏅" : "🔒"} {x.title}</Pill>)}
              {certificates.map((c) => <Pill key={c.id} tone="green">📜 {c.title}</Pill>)}
            </div>
          </WidgetPanel>
        </div>
      </div>
    </div>
  );
}
