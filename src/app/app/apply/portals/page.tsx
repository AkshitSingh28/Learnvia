"use client";

import { useState } from "react";
import { useStudent, useContent } from "@/lib/data/DataProvider";
import { PageHeader, Btn, LockedState } from "@/components/ui";
import { PortalCard } from "@/components/PortalCard";
import type { OpportunityType, PortalMode, Portal } from "@/lib/types";

const TYPES: (OpportunityType | "All")[] = ["All", "Jobs", "Internships", "Apprenticeship", "Online Freelance"];
const MODES: (PortalMode | "All")[] = ["All", "Local", "In-office", "Work from Home", "Remote", "Online"];

export default function PortalsPage() {
  const { readiness } = useStudent();
  const { portals } = useContent();
  const [type, setType] = useState<OpportunityType | "All">("All");
  const [mode, setMode] = useState<PortalMode | "All">("All");

  if (readiness.score < 50) {
    return (
      <div>
        <PageHeader title="Opportunity Hub" subtitle="Apply on trusted external portals, then track applications inside GrowHub." />
        <LockedState
          title="Improve Readiness First"
          hint="Opportunity portals unlock at a readiness score of 50. Finish modules, submit assignments, add portfolio outputs and complete Application Readiness."
          action={<Btn href="/app/apply">Back to Phase 3</Btn>}
        />
      </div>
    );
  }

  const matches = (p: Portal) =>
    (type === "All" || p.opportunityType === type) &&
    (mode === "All" || p.modes.includes(mode as PortalMode));

  const visible = portals.filter(matches);
  const recommended = visible.filter((p) => readiness.score >= p.recommendedFromScore);
  const explore = visible.filter((p) => readiness.score < p.recommendedFromScore);

  return (
    <div>
      <PageHeader title="Opportunity Hub" subtitle="Recommended portals appear first based on your readiness score. Apply externally, then track it inside GrowHub." />

      <div className="mb-6 space-y-3">
        <Filter label="Opportunity Type" options={TYPES} value={type} onChange={(v) => setType(v as OpportunityType | "All")} />
        <Filter label="Mode" options={MODES} value={mode} onChange={(v) => setMode(v as PortalMode | "All")} />
      </div>

      <h2 className="text-sm uppercase tracking-wider text-muted mb-3">Recommended for you</h2>
      {recommended.length === 0 ? (
        <p className="text-sm text-muted mb-8">No recommended portals match these filters yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-9">
          {recommended.map((p) => <PortalCard key={p.id} portal={p} unlocked />)}
        </div>
      )}

      {explore.length > 0 && (
        <>
          <h2 className="text-sm uppercase tracking-wider text-muted mb-3">Explore more portals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {explore.map((p) => <PortalCard key={p.id} portal={p} unlocked={false} />)}
          </div>
        </>
      )}
    </div>
  );
}

function Filter({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted w-32 shrink-0">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
          style={{ borderColor: value === o ? "var(--accent)" : "var(--border)", color: value === o ? "var(--accent)" : undefined }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
