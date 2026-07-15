"use client";

import { useContent } from "@/lib/data/DataProvider";
import { CrudList } from "@/components/admin/CrudList";
import { Pill } from "@/components/ui";

export default function AdminPortalsPage() {
  const { portals } = useContent();
  return (
    <CrudList
      title="Opportunity Portals" subtitle="Phase 3 — external portals students can apply on."
      newHref="/admin/portal/?id=new" newLabel="+ New portal"
      columns={["Name", "Category", "Min readiness", "Status"]}
      rows={portals.map((p) => ({
        id: p.id,
        editHref: `/admin/portal/?id=${p.id}`,
        cells: [<span key="n" className="font-medium">{p.name}</span>, p.category, p.minReadiness, p.flagged ? <Pill key="s" tone="red">Flagged</Pill> : <Pill key="s" tone="green">Active</Pill>],
      }))}
    />
  );
}
