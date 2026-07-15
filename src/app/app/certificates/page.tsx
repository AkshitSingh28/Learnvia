"use client";

import { useStudent } from "@/lib/data/DataProvider";
import { Card, PageHeader, Btn, EmptyState, IconTile } from "@/components/ui";
import type { Certificate } from "@/lib/types";

/** Certificates are derived from real milestones — no certificate exists until it's earned. */
export default function CertificatesPage() {
  const { modules, tracks, loading } = useStudent();

  const earned: Certificate[] = [];
  const phase1Done = modules.length > 0 && modules.every((m) => m.progress >= 100);
  if (phase1Done) earned.push({ id: "cert-phase1", title: "AI Foundation — Phase 1 Complete", issuedBy: "GrowHub", issuedAt: "Earned" });
  tracks.filter((t) => t.progress >= 100).forEach((t) =>
    earned.push({ id: `cert-${t.id}`, title: `${t.title} — Track Complete`, issuedBy: "GrowHub", issuedAt: "Earned" }),
  );

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title="Certificates" subtitle="Download and share your earned certificates." />
      {earned.length === 0 ? (
        <EmptyState title="No certificates yet" hint="Complete all Phase 1 modules or a full track to earn your first certificate." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {earned.map((c) => (
            <Card key={c.id} lift>
              <IconTile icon="ti-certificate" tone="green" size="lg" />
              <div className="mt-3 font-bold">{c.title}</div>
              <div className="mt-1 text-sm text-muted">{c.issuedBy} · {c.issuedAt}</div>
              <div className="mt-4"><Btn variant="outline" className="w-full">Download</Btn></div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
