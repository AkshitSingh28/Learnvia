"use client";

import Link from "next/link";
import { useContent, useAdmin } from "@/lib/data/DataProvider";
import { PageHeader, Pill, Card, StatBox, WidgetPanel, IconTile, type WellTone } from "@/components/ui";

const LINKS: [string, string, string, WellTone][] = [
  ["Modules", "/admin/modules", "ti-book", "indigo"], ["Tracks", "/admin/tracks", "ti-route", "violet"], ["Portals", "/admin/portals", "ti-briefcase", "blue"],
  ["Users", "/admin/users", "ti-users", "green"], ["Cohorts", "/admin/cohorts", "ti-school", "orange"], ["NGOs", "/admin/ngos", "ti-building-community", "indigo"],
  ["Invites", "/admin/invites", "ti-mail", "violet"], ["Moderation", "/admin/moderation", "ti-flag", "red"], ["Reports", "/admin/reports", "ti-chart-bar", "blue"],
  ["Settings", "/admin/settings", "ti-settings", "green"],
];

export default function AdminConsole() {
  const { modules, tracks, portals } = useContent();
  const { stats, cohorts, users, loading } = useAdmin();
  const studentCount = stats.totalStudents || users.filter((u) => u.role === "student").length;

  return (
    <div>
      <PageHeader title="Admin Console" subtitle="Manage content, users, and the platform." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <StatBox value={modules.length} label="Modules" tone="indigo" icon="ti-book" />
        <StatBox value={tracks.length} label="Tracks" tone="violet" icon="ti-route" />
        <StatBox value={loading ? "…" : studentCount} label="Students" tone="green" icon="ti-users" />
        <StatBox value={loading ? "…" : cohorts.length} label="Cohorts" tone="orange" icon="ti-school" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-7">
        <WidgetPanel title="Platform activity">
          <div className="text-sm text-muted space-y-2">
            <div className="flex justify-between"><span>Total submissions</span><span className="font-semibold text-[var(--foreground)]">{stats.totalSubmissions}</span></div>
            <div className="flex justify-between"><span>Pending reviews</span><span className="font-semibold text-[var(--foreground)]">{stats.pendingReviews}</span></div>
            <div className="flex justify-between"><span>Registered users</span><span className="font-semibold text-[var(--foreground)]">{users.length}</span></div>
          </div>
          {stats.pendingReviews > 0 && <div className="mt-3"><Pill tone="amber">{stats.pendingReviews} awaiting review</Pill></div>}
        </WidgetPanel>
        <WidgetPanel title="Content health">
          <div className="text-sm text-muted space-y-2">
            <div className="flex justify-between"><span>Phase 1 modules</span><span className="font-semibold text-[var(--foreground)]">{modules.length}</span></div>
            <div className="flex justify-between"><span>Skill tracks</span><span className="font-semibold text-[var(--foreground)]">{tracks.filter((t) => t.kind === "skillTrack").length}</span></div>
            <div className="flex justify-between"><span>Opportunity portals</span><span className="font-semibold text-[var(--foreground)]">{portals.length}</span></div>
          </div>
        </WidgetPanel>
      </div>

      <h2 className="text-lg font-bold mb-4">Manage</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {LINKS.map(([label, href, icon, tone]) => (
          <Link key={href} href={href}>
            <Card lift className="flex flex-col items-center text-center gap-2 py-5">
              <IconTile icon={icon} tone={tone} size="lg" />
              <div className="text-sm font-semibold">{label}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
