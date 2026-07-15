"use client";

import { useContent, useAdmin } from "@/lib/data/DataProvider";
import { Card, PageHeader, Stat, Btn, SectionTitle, ProgressBar } from "@/components/ui";

export default function AdminReportsPage() {
  const { modules } = useContent();
  const { stats, cohorts, users, loading } = useAdmin();
  const studentCount = stats.totalStudents || users.filter((u) => u.role === "student").length;

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title="Reports" subtitle="Platform-wide impact and progress." action={<Btn variant="outline">Export CSV</Btn>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-7">
        <Card><Stat value={studentCount} label="Active students" /></Card>
        <Card><Stat value={cohorts.length} label="Cohorts" /></Card>
        <Card><Stat value={stats.totalSubmissions} label="Submissions" /></Card>
        <Card><Stat value={stats.pendingReviews} label="Pending reviews" /></Card>
      </div>
      <Card>
        <SectionTitle>Cohort sizes</SectionTitle>
        {cohorts.length === 0 ? <div className="text-sm text-muted">No cohorts yet.</div> : (
          <ul className="space-y-3">
            {cohorts.map((c) => {
              const pct = studentCount ? Math.round((c.students / studentCount) * 100) : 0;
              return (
                <li key={c.id}>
                  <div className="flex justify-between text-sm mb-1.5"><span>{c.name}</span><span className="text-muted">{c.students} students</span></div>
                  <ProgressBar value={pct} />
                </li>
              );
            })}
          </ul>
        )}
      </Card>
      <Card className="mt-5">
        <SectionTitle>Catalog</SectionTitle>
        <div className="text-sm text-muted">{modules.length} Phase-1 modules published.</div>
      </Card>
    </div>
  );
}
