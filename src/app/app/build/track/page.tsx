"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStudent } from "@/lib/data/DataProvider";
import { PortfolioSubmit } from "@/components/PortfolioSubmit";
import { TrackCurriculum } from "@/components/TrackCurriculum";
import { Card, Btn, Pill } from "@/components/ui";

function TrackInner() {
  const id = useSearchParams().get("id");
  const { tracks, chosenTrackId, chooseTrack, loading } = useStudent();
  const t = tracks.find((x) => x.id === id) ?? tracks.find((x) => x.kind === "skillTrack");
  if (loading || !t) return <div className="text-muted">Loading…</div>;
  const isChosen = chosenTrackId === t.id;

  return (
    <div className="max-w-3xl">
      <Link href="/app/build" className="text-sm text-muted">← Phase 2</Link>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">{t.glyph ? `${t.glyph} ` : ""}{t.title}</h1>
          <p className="mt-1.5 text-muted max-w-xl">{t.summary}</p>
        </div>
        {t.id === "t5" ? <Pill tone="accent">Web / Tech</Pill> : <Pill tone="accent">Skill track</Pill>}
      </div>

      <div className="mt-4">
        {isChosen ? (
          <Pill tone="green">✓ Your chosen track</Pill>
        ) : (
          <Btn onClick={() => void chooseTrack(t.id)}>Start this track</Btn>
        )}
      </div>

      <div className="mt-6">
        <TrackCurriculum track={t} />
      </div>

      {t.id === "t5" && (
        <Card className="mt-6">
          <div className="font-bold">Graded web portfolio</div>
          <p className="mt-1 text-sm text-muted">This track is assessed with a rubric out of 100. Open the assessment to see the checklist and passing bands.</p>
          <div className="mt-4"><Btn href="/app/build/web-project" variant="outline">Open web portfolio assessment →</Btn></div>
        </Card>
      )}

      <Card className="mt-6">
        <div className="font-bold">Submit Track Portfolio</div>
        <p className="mt-1 text-sm text-muted">Put every output into one Google Drive folder, then submit the folder link below.</p>
        <div className="mt-4">
          <PortfolioSubmit
            refType="track"
            refTitle={`${t.title} portfolio`}
            checklist={t.portfolioChecklist ?? []}
            submitLabel="Submit Track Portfolio"
            sampleName={`${t.title} Portfolio`}
          />
        </div>
      </Card>
    </div>
  );
}

export default function TrackPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><TrackInner /></Suspense>;
}
