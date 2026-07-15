"use client";

import { useContent } from "@/lib/data/DataProvider";
import { CrudList } from "@/components/admin/CrudList";
import { Pill } from "@/components/ui";

export default function AdminTracksPage() {
  const { tracks } = useContent();
  return (
    <CrudList
      title="Tracks" subtitle="Phase 2 — Digital Foundation & skill tracks."
      newHref="/admin/track/?id=new" newLabel="+ New track"
      columns={["Title", "Type"]}
      rows={tracks.map((t) => ({
        id: t.id,
        editHref: `/admin/track/?id=${t.id}`,
        cells: [<span key="t" className="font-medium">{t.title}</span>, <Pill key="k" tone={t.kind === "digitalFoundation" ? "accent" : "neutral"}>{t.kind === "digitalFoundation" ? "Digital Foundation" : "Skill track"}</Pill>],
      }))}
    />
  );
}
