"use client";

import { useState } from "react";
import { useContent, useAdmin } from "@/lib/data/DataProvider";
import { resolveFlag } from "@/lib/db/flags";
import { saveContentDoc } from "@/lib/db/content";
import { Card, PageHeader, Pill, Btn, SectionTitle } from "@/components/ui";

export default function AdminModerationPage() {
  const { portals, reload: reloadContent } = useContent();
  const { flags, reload, loading } = useAdmin();
  const [busy, setBusy] = useState<string | null>(null);
  const open = flags.filter((f) => !f.resolved);

  async function toggleFlag(portalId: string) {
    const portal = portals.find((p) => p.id === portalId);
    if (!portal) return;
    setBusy(portalId);
    await saveContentDoc("portals", { ...portal, flagged: !portal.flagged });
    await reloadContent();
    setBusy(null);
  }

  async function resolve(id: string) {
    setBusy(id);
    await resolveFlag(id);
    await reload();
    setBusy(null);
  }

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title="Moderation" subtitle="Resolve staff flag reports and mark portals safe/unsafe." />
      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <SectionTitle>Flag reports</SectionTitle>
          {open.length === 0 ? <div className="text-sm text-muted">No open reports.</div> : (
            <ul className="space-y-3">
              {open.map((f) => (
                <li key={f.id} className="flex items-center justify-between">
                  <div><div className="text-sm font-medium">{f.portalName}</div><div className="text-xs text-muted">Flagged by {f.byName}</div></div>
                  <Btn variant="outline" onClick={() => resolve(f.id)} disabled={busy === f.id}>Resolve</Btn>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <SectionTitle>Portal safety</SectionTitle>
          <ul className="space-y-3">
            {portals.map((p) => (
              <li key={p.id} className="flex items-center justify-between">
                <div><div className="text-sm font-medium">{p.name}</div><div className="text-xs text-muted">{p.category}</div></div>
                <div className="flex items-center gap-2">
                  {p.flagged && <Pill tone="red">Unsafe</Pill>}
                  <Btn variant="outline" onClick={() => toggleFlag(p.id)} disabled={busy === p.id}>{p.flagged ? "Mark safe" : "Mark unsafe"}</Btn>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
