"use client";

import Link from "next/link";
import { useStudent } from "@/lib/data/DataProvider";
import { PortfolioSubmit } from "@/components/PortfolioSubmit";
import { TrackCurriculum } from "@/components/TrackCurriculum";
import { Card, PageHeader, Pill } from "@/components/ui";

/** Phase 2 — Digital Foundation (compulsory): the 17-module foundation track. */
export default function DigitalFoundationPage() {
  const { tracks, loading } = useStudent();
  const df = tracks.find((t) => t.kind === "digitalFoundation");
  if (loading || !df) return <div className="text-muted">Loading…</div>;
  return (
    <div className="max-w-3xl">
      <Link href="/app/build" className="text-sm text-muted">← Phase 2</Link>
      <PageHeader title={df.title} subtitle={df.summary} action={<Pill tone="accent">Compulsory first</Pill>} />

      <TrackCurriculum track={df} />

      <Card className="mt-6">
        <div className="font-bold">Submit your Foundation portfolio</div>
        <p className="mt-1 text-sm text-muted">Collect all your Foundation outputs into one Google Drive folder, then submit the folder link below — no need to upload files one by one.</p>
        <div className="mt-4">
          <PortfolioSubmit
            refType="track"
            refTitle={`${df.title} portfolio`}
            checklist={df.portfolioChecklist ?? []}
            submitLabel="Submit Foundation Portfolio"
            sampleName="Foundation Portfolio"
          />
        </div>
      </Card>
    </div>
  );
}
