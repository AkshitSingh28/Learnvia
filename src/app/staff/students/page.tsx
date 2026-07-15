"use client";

import { useStaff } from "@/lib/data/DataProvider";
import { PageHeader, Pill, EmptyState } from "@/components/ui";
import { DataTable } from "@/components/templates";

export default function StaffStudentsPage() {
  const { students, loading } = useStaff();
  if (loading) return <div className="text-muted">Loading…</div>;
  if (students.length === 0) return (<div><PageHeader title="Students" subtitle="Track progress across your cohorts." /><EmptyState title="No students yet" hint="Students appear here once they join your cohort with an invite code." /></div>);
  return (
    <div>
      <PageHeader title="Students" subtitle="Track progress across your cohorts." />
      <DataTable
        columns={["Name", "Cohort", "Phase 1", "Readiness"]}
        rows={students.map((s) => ({
          id: s.id,
          href: `/staff/student/?id=${s.id}`,
          cells: [
            <span key="n" className="font-medium">{s.name}</span>,
            <span key="c" className="text-muted">{s.cohort}</span>,
            `${s.phase1}%`,
            <Pill key="r" tone={s.readiness >= 50 ? "green" : "amber"}>{s.readiness}/100</Pill>,
          ],
        }))}
      />
    </div>
  );
}
