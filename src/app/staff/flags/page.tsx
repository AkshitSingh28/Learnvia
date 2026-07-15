"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useContent } from "@/lib/data/DataProvider";
import { createFlag } from "@/lib/db/flags";
import { Card, PageHeader, Btn, Pill } from "@/components/ui";

export default function StaffFlagsPage() {
  const { user } = useAuth();
  const { portals, loading } = useContent();
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<string | null>(null);

  async function flag(portalId: string, portalName: string) {
    if (!user) return;
    setBusy(portalId);
    await createFlag({ portalId, portalName, byUid: user.uid, byName: user.displayName });
    setFlagged((f) => ({ ...f, [portalId]: true }));
    setBusy(null);
  }

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title="Flag Unsafe Opportunities" subtitle="Report portals or listings that look unsafe for students." />
      <Card>
        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {portals.map((p) => {
            const isFlagged = flagged[p.id] || p.flagged;
            return (
              <li key={p.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div><div className="text-sm font-medium">{p.name}</div><div className="text-xs text-muted">{p.category}</div></div>
                <div className="flex items-center gap-3">
                  {isFlagged && <Pill tone="red">Flagged</Pill>}
                  <Btn variant="outline" onClick={() => flag(p.id, p.name)} disabled={isFlagged || busy === p.id}>{busy === p.id ? "Flagging…" : isFlagged ? "Reported" : "Flag"}</Btn>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
