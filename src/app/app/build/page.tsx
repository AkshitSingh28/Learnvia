"use client";

import Link from "next/link";
import { useStudent } from "@/lib/data/DataProvider";
import { Card, PageHeader, ProgressBar, ProgressRing, Pill, Btn, IconTile, type WellTone } from "@/components/ui";

/** Per-track glyph + tone for the polished cards (Tabler icons, GrowHub palette). */
const TRACK_META: Record<string, { icon: string; tone: WellTone }> = {
  df: { icon: "ti-stack-2", tone: "indigo" },
  t1: { icon: "ti-clipboard-data", tone: "blue" },
  t2: { icon: "ti-palette", tone: "violet" },
  t3: { icon: "ti-pencil", tone: "orange" },
  t4: { icon: "ti-headset", tone: "green" },
  t5: { icon: "ti-code", tone: "indigo" },
};

function StepChip({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-white" style={{ background: "var(--accent)" }}>{n}</span>
      <h2 className="text-lg font-bold">{label}</h2>
    </div>
  );
}

/** Phase 2 — Build & Create: a guided 3-step journey (Foundation → Track → Get ready). */
export default function BuildPage() {
  const { tracks, chosenTrackId, loading } = useStudent();
  const df = tracks.find((t) => t.kind === "digitalFoundation");
  const skill = tracks.filter((t) => t.kind === "skillTrack");

  if (loading || !df) return <div className="text-muted">Loading…</div>;

  const dfMeta = TRACK_META.df;

  return (
    <div>
      <PageHeader title="Phase 2 · Build & Create" subtitle="Finish the compulsory foundation, pick one skill track, then get application-ready." />

      {/* Step 1 — Foundation */}
      <section className="mb-9">
        <StepChip n={1} label="Build your foundation" />
        <Link href="/app/build/digital-foundation">
          <Card lift className="gv-hoverrow flex items-center gap-5">
            <div className="relative grid place-items-center shrink-0">
              <ProgressRing value={df.progress} />
              <div className="absolute text-center"><div className="text-base font-extrabold" style={{ color: "var(--accent)" }}>{df.progress}%</div></div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <IconTile icon={dfMeta.icon} tone={dfMeta.tone} size="sm" />
                <span className="font-bold">{df.title}</span>
                <Pill tone="accent">Compulsory first</Pill>
              </div>
              <p className="mt-1.5 text-sm text-muted">{df.summary}</p>
              <div className="mt-2 text-xs text-muted">{df.modules?.length ?? 0} modules · collect every output for your Foundation portfolio</div>
            </div>
            <i className="ti ti-chevron-right gv-arrow text-muted text-xl shrink-0" aria-hidden="true" />
          </Card>
        </Link>
      </section>

      {/* Step 2 — Choose a skill track */}
      <section className="mb-9">
        <StepChip n={2} label="Choose your skill track" />

        <Card className="mb-5 flex flex-wrap items-center justify-between gap-3" soft={false}>
          <div className="flex items-start gap-3">
            <IconTile icon="ti-wand" tone="violet" />
            <div>
              <div className="font-bold">Not sure where to start?</div>
              <p className="mt-0.5 text-sm text-muted max-w-lg">Answer 4 quick questions — GrowHub suggests one starting track based on your interest, device and goal. You can change it later.</p>
            </div>
          </div>
          <Btn href="/app/build/choose">Help me choose →</Btn>
        </Card>

        <div className="grid md:grid-cols-2 gap-5">
          {skill.map((t) => {
            const meta = TRACK_META[t.id] ?? { icon: "ti-bolt", tone: "indigo" as WellTone };
            const chosen = chosenTrackId === t.id;
            return (
              <Link key={t.id} href={`/app/build/track/?id=${t.id}`}>
                <Card lift className={`h-full ${chosen ? "!border-[var(--accent)]" : ""}`}>
                  <div className="flex items-start justify-between gap-3">
                    <IconTile icon={meta.icon} tone={meta.tone} size="lg" />
                    {chosen ? <Pill tone="green">✓ Chosen</Pill> : <span className="text-sm text-muted">{t.progress}%</span>}
                  </div>
                  <div className="mt-3 font-bold">{t.title}</div>
                  <p className="mt-1 text-sm text-muted">{t.tagline ?? t.summary}</p>
                  <div className="mt-4"><ProgressBar value={t.progress} /></div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Step 3 — Get application-ready (single readiness card; no duplicate/optional-project cards) */}
      <section>
        <StepChip n={3} label="Get application-ready" />
        <Card lift>
          <div className="flex items-start gap-4">
            <IconTile icon="ti-clipboard-check" tone="blue" size="lg" />
            <div className="min-w-0 flex-1">
              <div className="font-bold">Application Readiness</div>
              <p className="mt-1 text-sm text-muted">Prepare your resume, portfolio, safety checklist, shortlisted opportunities, application message and tracker before Phase 3.</p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted">
                <li className="flex gap-2"><span className="text-[var(--accent)]">•</span>Resume + portfolio preparation</li>
                <li className="flex gap-2"><span className="text-[var(--accent)]">•</span>LinkedIn / profile (optional)</li>
                <li className="flex gap-2"><span className="text-[var(--accent)]">•</span>Scam-check and safe application</li>
                <li className="flex gap-2"><span className="text-[var(--accent)]">•</span>Shortlist + tracker preparation</li>
              </ul>
              <div className="mt-4"><Btn href="/app/build/apply-readiness">Open Readiness Checklist →</Btn></div>
              <p className="mt-2 text-xs text-muted">This opens the Application Readiness page. Complete the required items and submit your readiness portfolio before moving to Phase 3.</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
