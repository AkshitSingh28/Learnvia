"use client";

/**
 * Phase-3 opportunity portal card (review spec): shows Best for, Opportunity type,
 * Mode, Required documents, Safety note, Recommended score, portal-specific
 * Watch Guide links, an Open Portal button (locked until the score is reached) and
 * an Add to Tracker button.
 */
import Link from "next/link";
import { Card, Pill, IconTile } from "@/components/ui";
import { oppMeta } from "@/lib/ui/portalMeta";
import type { Portal } from "@/lib/types";

export function PortalCard({ portal: p, unlocked }: { portal: Portal; unlocked: boolean }) {
  const meta = oppMeta(p.opportunityType);
  const trackerHref = `/app/apply/applications/new/?portal=${encodeURIComponent(p.name)}`;
  return (
    <Card lift={unlocked} className={unlocked ? "" : "opacity-80"}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <IconTile icon={meta.icon} tone={unlocked ? meta.tone : "indigo"} size="sm" />
          <span className="font-bold text-sm truncate">{p.name}</span>
        </div>
        {unlocked ? <Pill tone="accent">{p.opportunityType}</Pill> : <Pill>🔒 {p.recommendedFromScore}+</Pill>}
      </div>

      <dl className="mt-3 space-y-1.5 text-xs">
        {p.bestFor && <div><dt className="inline text-muted">Best for: </dt><dd className="inline">{p.bestFor}</dd></div>}
        <div><dt className="inline text-muted">Mode: </dt><dd className="inline">{p.modes.join(" · ")}</dd></div>
        {p.requiredDocs && <div><dt className="inline text-muted">Required: </dt><dd className="inline">{p.requiredDocs}</dd></div>}
        <div><dt className="inline text-muted">Recommended from: </dt><dd className="inline font-medium">{p.recommendedFromScore}+</dd></div>
      </dl>

      {p.safetyNote && <p className="mt-2 text-xs text-amber-500">⚠ {p.safetyNote}</p>}

      {p.guides && p.guides.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.guides.map((g) => (
            <a key={g.url} href={g.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium hover:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border)" }}>
              <i className="ti ti-player-play" aria-hidden="true" /> {g.label}
            </a>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {unlocked ? (
          <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white" style={{ background: "var(--accent-2)" }}>Open portal ↗</a>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium text-muted" style={{ borderColor: "var(--border)" }}>Unlocks at {p.recommendedFromScore}</span>
        )}
        {unlocked && (
          <Link href={trackerHref} className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium hover:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border)" }}>
            <i className="ti ti-plus" aria-hidden="true" /> Add to Tracker
          </Link>
        )}
      </div>
    </Card>
  );
}
