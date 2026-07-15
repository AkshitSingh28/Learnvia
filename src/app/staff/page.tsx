"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useStaff } from "@/lib/data/DataProvider";
import { PageHeader, Pill, Avatar, StatBox, WidgetPanel } from "@/components/ui";

/** Staff dashboard — mentors see review queues; NGO additionally sees impact metrics. */
export default function StaffDashboard() {
  const { user } = useAuth();
  const { students, submissions, cohorts, loading } = useStaff();
  const isNgo = user?.role === "ngo";
  const pending = submissions.filter((s) => s.status === "Pending");
  const totalStudents = students.length;
  const avgProgress = students.length ? Math.round(students.reduce((s, x) => s + x.phase1, 0) / students.length) : 0;

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title={isNgo ? "NGO Dashboard" : "Mentor Dashboard"} subtitle={isNgo ? "Track impact, cohorts and student progress." : "Review work and support your students."} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        <StatBox value={isNgo ? totalStudents : students.length} label="Students" tone="indigo" icon="ti-users" />
        <StatBox value={pending.length} label="Pending reviews" tone="orange" icon="ti-clipboard-list" />
        <StatBox value={cohorts.length} label="Cohorts" tone="violet" icon="ti-school" />
        {isNgo && <StatBox value="2" label="Mentors" tone="green" icon="ti-user-star" />}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <WidgetPanel title="Pending reviews" action={<Link href="/staff/reviews" className="text-sm text-[var(--accent)]">All →</Link>}>
          {pending.length === 0 ? <div className="text-sm text-muted">All caught up.</div> : (
            <div className="space-y-1">
              {pending.map((s) => (
                <Link key={s.id} href={`/staff/review/?id=${s.id}`} className="gv-hoverrow flex items-center gap-3 rounded-xl px-2.5 py-2.5 -mx-2.5 transition-colors hover:bg-[var(--background)]">
                  <Avatar name={s.studentName} size={34} />
                  <div className="min-w-0 flex-1"><div className="text-sm font-semibold truncate">{s.refTitle}</div><div className="text-xs text-muted">{s.studentName} · {s.submittedAgo}</div></div>
                  <span className="text-sm text-[var(--accent)] shrink-0">Review</span>
                </Link>
              ))}
            </div>
          )}
        </WidgetPanel>

        <WidgetPanel title="Cohorts" action={<Link href="/staff/cohorts" className="text-sm text-[var(--accent)]">Manage →</Link>}>
          <div className="space-y-3">
            {cohorts.map((c) => (
              <div key={c.id} className="flex items-center justify-between">
                <div><div className="text-sm font-medium">{c.name}</div><div className="text-xs text-muted">{c.students} students</div></div>
                <Pill>{c.avgProgress}% avg</Pill>
              </div>
            ))}
          </div>
        </WidgetPanel>
      </div>

      {isNgo && (
        <>
          <h2 className="text-lg font-bold mt-9 mb-4">Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox value={`${totalStudents}`} label="Students reached" tone="indigo" icon="ti-users" />
            <StatBox value={`${avgProgress}%`} label="Avg progress" tone="green" icon="ti-chart-line" />
            <StatBox value={students.reduce((s, x) => s + x.portfolioCount, 0)} label="Portfolio items" tone="violet" icon="ti-folder" />
            <StatBox value={pending.length} label="Pending reviews" tone="orange" icon="ti-clipboard-list" />
          </div>
        </>
      )}
    </div>
  );
}
