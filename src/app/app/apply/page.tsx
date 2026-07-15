"use client";

import { useStudent, useContent } from "@/lib/data/DataProvider";
import { applicationChecklist, roadmapTiers } from "@/lib/seed/data";
import { Card, PageHeader, Btn, Pill, ProgressRing, IconTile, SectionHeader, ActionRow } from "@/components/ui";
import { PortalCard } from "@/components/PortalCard";
import { AiInline } from "@/components/ai/AiInline";

/** Phase 3 — Opportunity Readiness & Applications. Score-gated portals + roadmap. */
export default function ApplyPage() {
  const { readiness, applications, loading } = useStudent();
  const { portals } = useContent();
  const unlocked = readiness.score >= 50;
  const recommended = portals.filter((p) => readiness.score >= p.recommendedFromScore);

  if (loading) return <div className="text-muted">Loading…</div>;

  const band =
    readiness.score >= 85 ? "Online freelance portals are now open to you."
      : readiness.score >= 70 ? "Broader job, internship and apprenticeship portals are recommended."
        : readiness.score >= 50 ? "Starter portals are recommended for you."
          : "Reach 50 to unlock real opportunity portals.";

  return (
    <div>
      <PageHeader title="Phase 3 · Opportunity Readiness & Applications" subtitle="Improve readiness → unlock suitable portals → apply externally → return to GrowHub → upload proof → track → mentor verifies." />

      <Card className="mb-8">
        <div className="flex items-center gap-5">
          <div className="relative grid place-items-center shrink-0">
            <ProgressRing value={readiness.score} />
            <div className="absolute text-center"><div className="text-lg font-extrabold" style={{ color: "var(--accent)" }}>{readiness.score}</div><div className="text-[10px] text-muted">/100</div></div>
          </div>
          <div>
            <div className="font-bold">Your readiness score</div>
            <p className="text-sm text-muted mt-1">{band}</p>
            <div className="mt-3"><Btn href="/app/progress" variant="outline">Improve readiness</Btn></div>
          </div>
        </div>
      </Card>

      {!unlocked && <ImproveReadiness />}

      {/* Roadmap — always shown, so students see what unlocks later. */}
      <SectionHeader title="Your opportunity roadmap" />
      <div className="grid sm:grid-cols-3 gap-4 mb-9">
        {roadmapTiers.map((t) => {
          const open = readiness.score >= t.from;
          return (
            <Card key={t.from} className={open ? "border-[var(--accent)]" : "opacity-80"}>
              <div className="flex items-center justify-between">
                <IconTile icon={open ? "ti-lock-open" : "ti-lock"} tone={open ? "green" : "indigo"} size="sm" />
                {open ? <Pill tone="green">Unlocked</Pill> : <Pill>{t.from}+</Pill>}
              </div>
              <div className="mt-3 font-semibold text-sm">{t.label}</div>
              <p className="mt-1 text-xs text-muted">{t.hint}</p>
            </Card>
          );
        })}
      </div>

      {unlocked && (
        <>
          {/* Application checklist before applying. */}
          <Card className="mb-8">
            <div className="font-bold">Before you apply — quick checklist</div>
            <p className="mt-1 text-sm text-muted">Have these ready so any application takes minutes.</p>
            <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-muted">
              {applicationChecklist.map((c) => (
                <li key={c} className="flex gap-2"><span className="text-[var(--accent)]">✓</span>{c}</li>
              ))}
            </ul>
          </Card>

          {/* AI application helper — unlocked with the portals (readiness ≥ 50). */}
          <Card className="mb-8">
            <div className="flex items-center gap-2.5 mb-1">
              <IconTile icon="ti-sparkles" tone="violet" size="sm" />
              <div className="font-bold">Resume bullet helper</div>
            </div>
            <p className="text-sm text-muted mb-3">Paste a rough line about something you did — AI will rewrite it as a strong, professional resume bullet you can use when applying.</p>
            <AiInline
              label="Improve my bullet"
              resultLabel="Stronger bullet"
              withInput={{ placeholder: "e.g. i made posters for my college fest on canva", rows: 2 }}
              notReadyHint="Type a rough line first."
              system="You are a resume-writing coach for a beginner student in India applying for their first internships/jobs. Turn the student's rough note into ONE strong, honest, action-verb resume bullet (and, if useful, one alternative). Keep it truthful to what they said — don't invent metrics. Be concise."
              buildPrompt={(input) => input.trim() ? `Rewrite this into a strong resume bullet:\n"""${input.trim()}"""` : null}
            />
          </Card>

          <SectionHeader title="Recommended for you" href="/app/apply/portals" linkLabel="All portals + filters →" />
          <div className="grid md:grid-cols-2 gap-5 mb-9">
            {recommended.map((p) => <PortalCard key={p.id} portal={p} unlocked />)}
          </div>
        </>
      )}

      <SectionHeader title="Your applications" href="/app/apply/applications" linkLabel="Open tracker →" />
      <Card>
        {applications.length === 0 ? (
          <p className="text-sm text-muted">No applications yet. After you apply on a portal, return here and add it to your tracker, then upload proof for mentor verification.</p>
        ) : (
          <div className="space-y-1">
            {applications.map((a) => (
              <ActionRow
                key={a.id}
                icon="ti-briefcase"
                tone="blue"
                title={a.role}
                subtitle={`${a.portalName} · ${a.appliedAgo}`}
                href={`/app/apply/application/?id=${a.id}`}
                right={<Pill tone={a.status === "Shortlisted" || a.status === "Selected" ? "green" : a.status === "In Review" ? "amber" : "neutral"}>{a.status}</Pill>}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/** Sub-50 gate with the five improvement actions from the review. */
function ImproveReadiness() {
  const actions = [
    { icon: "ti-checklist", tone: "indigo" as const, label: "Complete missing tasks", hint: "Back to pending assignments", href: "/app/learn" },
    { icon: "ti-folder", tone: "orange" as const, label: "Improve portfolio", hint: "Upload or edit portfolio outputs", href: "/app/portfolio" },
    { icon: "ti-route", tone: "violet" as const, label: "Finish skill pathway", hint: "Complete your chosen Phase-2 track", href: "/app/build" },
    { icon: "ti-book", tone: "blue" as const, label: "Learn application basics", hint: "Go to Application Readiness", href: "/app/build/apply-readiness" },
    { icon: "ti-target-arrow", tone: "green" as const, label: "Check my score", hint: "See what's missing", href: "/app/progress" },
  ];
  return (
    <Card className="mb-8 py-8">
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl" style={{ background: "var(--well-red-bg)", color: "var(--well-red-fg)" }}><i className="ti ti-lock text-2xl" aria-hidden="true" /></div>
        <div className="mt-3 text-lg font-bold">Improve Readiness First</div>
        <p className="mt-1 text-sm text-muted max-w-md mx-auto">Application portals unlock at a readiness score of 50. Below is exactly what to do next.</p>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-2 max-w-xl mx-auto">
        {actions.map((a) => (
          <ActionRow key={a.label} icon={a.icon} tone={a.tone} title={a.label} subtitle={a.hint} href={a.href} />
        ))}
      </div>
    </Card>
  );
}
