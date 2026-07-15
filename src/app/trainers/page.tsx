"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { Card, IconTile, WidgetPanel, QuickActionCard, ActionRow, SectionHeader, Btn, type WellTone } from "@/components/ui";
import { trainerModules } from "@/lib/seed/trainers";

const QUICK: { icon: string; tone: WellTone; title: string; subtitle: string; href: string }[] = [
  { icon: "ti-tools", tone: "indigo", title: "Trainer Tools", subtitle: "Instant fill-in-the-blank builders", href: "/trainers/tools" },
  { icon: "ti-books", tone: "violet", title: "AI Modules", subtitle: "10 modules · 30 copy-paste prompts", href: "/trainers/modules" },
  { icon: "ti-presentation", tone: "green", title: "Workshop Kit", subtitle: "60-min live-lab run sheet + QR", href: "/trainers/workshop" },
  { icon: "ti-urgent", tone: "orange", title: "Panic Button", subtitle: "Zero-prep activity, right now", href: "/trainers/tools#panic-button" },
];

const VALUE: { icon: string; tone: WellTone; label: string }[] = [
  { icon: "ti-clock", tone: "indigo", label: "Half the prep time" },
  { icon: "ti-map-pin", tone: "violet", label: "Indian & Hinglish" },
  { icon: "ti-device-mobile", tone: "green", label: "Copy on your phone" },
];

/** A few marquee templates surfaced on the home, deep-linking into their module. */
const POPULAR: { moduleId: string; name: string }[] = [
  { moduleId: "lesson-architect", name: "The Unit Planner" },
  { moduleId: "assessment-engine", name: "The Gamified Quiz Generator" },
  { moduleId: "inclusive-educator", name: "The Bilingual Bridge" },
  { moduleId: "career-life-skills-coach", name: "The Mock Interviewer" },
];

/** Trainer Home — mirrors the student dashboard rhythm: greeting → quick actions → hero panels →
    big module tiles → popular-prompts list. */
export default function TrainerHome() {
  const { user } = useAuth();
  const first = user?.displayName?.split(" ")[0] ?? "there";

  return (
    <div>
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Hi, {first} 👋</h1>
          <p className="mt-1.5 text-muted">Copy-paste AI recipes and instant tools — built for Indian classrooms.</p>
        </div>
        <Btn href="/trainers/tools">Browse tools</Btn>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {QUICK.map((q) => <QuickActionCard key={q.href} {...q} />)}
      </div>

      {/* Hero panels */}
      <div className="grid lg:grid-cols-3 gap-5">
        <WidgetPanel className="lg:col-span-2" title="Your teaching toolkit">
          <p className="text-sm text-muted max-w-lg">Cut prep time in half. Every recipe here is copy-paste ready for ChatGPT or Gemini — no setup, and it works on your phone during class.</p>

          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            {VALUE.map((v) => (
              <div key={v.label} className="flex items-center gap-2.5">
                <IconTile icon={v.icon} tone={v.tone} size="sm" />
                <span className="text-sm font-medium">{v.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--elevated)" }}>
            <div className="text-xs font-bold tracking-wide text-muted">THE 3-MOVE FRAMEWORK</div>
            <div className="mt-1.5 text-sm leading-relaxed">
              <span className="font-semibold">1 · Set the scene</span> with context →
              <span className="font-semibold"> 2 · Ask for options</span> →
              <span className="font-semibold"> 3 · Push it further</span> to refine the style.
            </div>
          </div>

          <div className="mt-5"><Btn href="/trainers/tools">Start with a tool</Btn></div>
        </WidgetPanel>

        <WidgetPanel title="In a hurry?">
          <div className="flex items-start gap-3">
            <IconTile icon="ti-urgent" tone="orange" size="lg" />
            <div className="min-w-0">
              <div className="font-bold">Plan-B Panic Button</div>
              <div className="mt-0.5 text-xs text-muted leading-relaxed">Class going sideways? Generate a zero-prep 5-minute activity instantly.</div>
            </div>
          </div>
          <div className="mt-4"><Btn href="/trainers/tools#panic-button" variant="outline" className="w-full">Open Panic Button</Btn></div>
        </WidgetPanel>
      </div>

      {/* Big module tiles */}
      <div className="mt-9">
        <SectionHeader title="The 10 Core AI Modules" href="/trainers/modules" linkLabel="See all →" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trainerModules.map((m) => (
            <Card key={m.id} lift className="flex flex-col">
              <div className="flex items-start justify-between">
                <IconTile icon={m.icon} tone={m.tone} size="lg" />
                <span className="text-sm text-muted">Module {m.order}</span>
              </div>
              <div className="mt-3 font-bold">{m.title}</div>
              <div className="text-xs text-muted">{m.subtitle}</div>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1 line-clamp-3">{m.videoConcept}</p>
              <div className="mt-4"><Btn href={`/trainers/module?id=${m.id}`} variant="outline" className="w-full">Open</Btn></div>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular prompts */}
      <div className="mt-9">
        <SectionHeader title="Popular prompts" href="/trainers/modules" linkLabel="Browse all →" />
        <WidgetPanel>
          <div className="space-y-1">
            {POPULAR.map((p) => {
              const m = trainerModules.find((x) => x.id === p.moduleId);
              if (!m) return null;
              return (
                <ActionRow
                  key={`${p.moduleId}-${p.name}`}
                  icon={m.icon}
                  tone={m.tone}
                  title={p.name}
                  subtitle={`Module ${m.order} · ${m.title}`}
                  href={`/trainers/module?id=${m.id}`}
                />
              );
            })}
          </div>
        </WidgetPanel>
      </div>

      {/* Workshop CTA */}
      <Card lift className="mt-9 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconTile icon="ti-presentation" tone="green" size="lg" />
          <div>
            <div className="text-base font-bold">Running a live session?</div>
            <div className="text-sm text-muted">Open the ready-made 60-minute workshop run sheet + QR handoff.</div>
          </div>
        </div>
        <Btn href="/trainers/workshop">Open workshop kit</Btn>
      </Card>

      <p className="mt-8 text-xs text-muted">Built for NGO educators &amp; vocational trainers</p>
    </div>
  );
}
