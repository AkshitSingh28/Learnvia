"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { useStudent } from "@/lib/data/DataProvider";
import { phases, notifications } from "@/lib/seed/data";
import { Card, ProgressBar, ProgressRing, Btn, Pill, IconTile, WidgetPanel, QuickActionCard, ActionRow, SectionHeader, type WellTone } from "@/components/ui";

const QUICK = [
  { icon: "ti-book", tone: "indigo" as WellTone, title: "Continue learning", subtitle: "Phase 1 · AI Foundation", href: "/app/learn" },
  { icon: "ti-bulb", tone: "violet" as WellTone, title: "Build & create", subtitle: "Phase 2 · tracks & portfolio", href: "/app/build" },
  { icon: "ti-briefcase", tone: "green" as WellTone, title: "Opportunities", subtitle: "Phase 3 · apply & track", href: "/app/apply" },
  { icon: "ti-folder", tone: "orange" as WellTone, title: "Portfolio", subtitle: "Your proof of work", href: "/app/portfolio" },
];

const PHASE_META: Record<number, { icon: string; tone: WellTone }> = {
  1: { icon: "ti-book", tone: "indigo" },
  2: { icon: "ti-bulb", tone: "violet" },
  3: { icon: "ti-briefcase", tone: "green" },
};

/** Student Home dashboard — greeting, quick actions, progress, phases, activity. */
export default function HomePage() {
  const { user } = useAuth();
  const { modules, readiness, loading } = useStudent();
  const overall = modules.length ? Math.round(modules.reduce((s, m) => s + m.progress, 0) / modules.length) : 0;
  const current = modules.find((m) => m.progress > 0 && m.progress < 100) ?? modules.find((m) => !m.locked) ?? modules[0];

  if (loading || !current) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Hi, {user?.displayName?.split(" ")[0] ?? "there"} 👋</h1>
          <p className="mt-1.5 text-muted">Let&apos;s achieve something great today.</p>
        </div>
        <Btn href="/app/learn">Continue learning</Btn>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {QUICK.map((q) => <QuickActionCard key={q.href} {...q} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Overall progress + readiness */}
        <WidgetPanel className="lg:col-span-2" title="Your progress">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">Overall course progress</div>
              <div className="mt-1 text-3xl font-extrabold">{overall}%</div>
              <div className="mt-1 text-sm text-muted">Keep going — you&apos;re doing great.</div>
              <div className="mt-4 max-w-xs"><ProgressBar value={overall} /></div>
            </div>
            <div className="relative grid place-items-center shrink-0">
              <ProgressRing value={readiness.score} />
              <div className="absolute text-center">
                <div className="text-xl font-extrabold" style={{ color: "var(--accent)" }}>{readiness.score}</div>
                <div className="text-[10px] text-muted">readiness</div>
              </div>
            </div>
          </div>
        </WidgetPanel>

        {/* Continue learning */}
        <WidgetPanel title="Continue learning">
          <div className="flex items-start gap-3">
            <IconTile icon="ti-player-play" tone="indigo" />
            <div className="min-w-0">
              <div className="font-bold truncate">{current.title}</div>
              <div className="mt-0.5 text-xs text-muted line-clamp-2">{current.subtitle}</div>
            </div>
          </div>
          <div className="mt-3"><ProgressBar value={current.progress} /></div>
          <div className="mt-4"><Btn href={`/app/learn/module/?id=${current.id}`} variant="outline" className="w-full">Resume</Btn></div>
        </WidgetPanel>
      </div>

      {/* Phases */}
      <h2 className="text-lg font-bold mt-9 mb-4">Your phases</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {phases.map((p) => {
          const meta = PHASE_META[p.id] ?? { icon: "ti-flag", tone: "indigo" as WellTone };
          return (
            <Card key={p.id} lift={!p.locked} className="flex flex-col">
              <div className="flex items-start justify-between">
                <IconTile icon={meta.icon} tone={meta.tone} size="lg" />
                {p.locked ? <Pill>🔒 Locked</Pill> : <span className="text-sm text-muted">{p.progress}%</span>}
              </div>
              <div className="mt-3 flex items-center gap-2"><Pill tone="accent">{p.tag}</Pill></div>
              <div className="mt-2 font-bold">{p.name}</div>
              <p className="mt-1 text-sm text-muted leading-relaxed flex-1">{p.desc}</p>
              <div className="mt-4"><ProgressBar value={p.progress} /></div>
              <div className="mt-4"><Btn href={p.href} variant="outline" className="w-full">{p.locked ? "Preview" : "Open"}</Btn></div>
            </Card>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="mt-9">
        <SectionHeader title="Recent activity" href="/app/notifications" linkLabel="View all →" />
        <WidgetPanel>
          <div className="space-y-1">
            {notifications.map((n) => (
              <ActionRow
                key={n.id}
                icon={n.read ? "ti-check" : "ti-bell"}
                tone={n.read ? "green" : "blue"}
                title={n.title}
                subtitle={n.body}
                href="/app/notifications"
                right={<span className="text-xs text-muted">{n.ago}</span>}
              />
            ))}
          </div>
        </WidgetPanel>
      </div>
    </div>
  );
}
