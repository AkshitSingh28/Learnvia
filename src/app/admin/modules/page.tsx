"use client";

import { useContent } from "@/lib/data/DataProvider";
import { CrudList } from "@/components/admin/CrudList";
import { Pill } from "@/components/ui";

export default function AdminModulesPage() {
  const { modules } = useContent();
  return (
    <CrudList
      title="Modules" subtitle="Phase 1 — Learn Foundations content."
      newHref="/admin/module/?id=new" newLabel="+ New module"
      columns={["#", "Title", "Status"]}
      rows={modules.map((m) => ({
        id: m.id,
        editHref: `/admin/module/?id=${m.id}`,
        cells: [m.order, <span key="t" className="font-medium">{m.title}</span>, m.locked ? <Pill key="s">Locked</Pill> : <Pill key="s" tone="green">Live</Pill>],
      }))}
    />
  );
}
