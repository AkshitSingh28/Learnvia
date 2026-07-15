"use client";

import { useStaff } from "@/lib/data/DataProvider";
import { Card, PageHeader, Stat, Btn, SectionTitle, ProgressBar } from "@/components/ui";

export default function StaffReportsPage() {
  const { cohorts, students, loading } = useStaff();
  const avg = students.length ? Math.round(students.reduce((s, x) => s + x.readiness, 0) / students.length) : 0;
  const cohortAvg = (cohortName: string) => {
    const roster = students.filter((s) => s.cohort === cohortName);
    return roster.length ? Math.round(roster.reduce((s, x) => s + x.phase1, 0) / roster.length) : 0;
  };
  if (loading) return <div className="text-muted">Loading…</div>;
  return (
    <div>
      <PageHeader title="Reports" subtitle="Cohort progress and impact you can share." action={<Btn variant="outline">Export</Btn>} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-7">
        <Card><Stat value={cohorts.length} label="Cohorts" /></Card>
        <Card><Stat value={students.length} label="Students" /></Card>
        <Card><Stat value={`${avg}/100`} label="Avg readiness" /></Card>
      </div>
      <Card>
        <SectionTitle>Cohort progress</SectionTitle>
        <ul className="space-y-4">
          {cohorts.map((c) => { const ap = cohortAvg(c.name); return (
            <li key={c.id}><div className="flex justify-between text-sm mb-1.5"><span>{c.name}</span><span className="text-muted">{ap}%</span></div><ProgressBar value={ap} /></li>
          ); })}
        </ul>
      </Card>
    </div>
  );
}
