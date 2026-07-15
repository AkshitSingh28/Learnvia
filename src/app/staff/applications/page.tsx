"use client";

import { useStaff } from "@/lib/data/DataProvider";
import { PageHeader, Pill, EmptyState } from "@/components/ui";
import { DataTable } from "@/components/templates";

export default function StaffApplicationsPage() {
  const { applications, loading } = useStaff();
  if (loading) return <div className="text-muted">Loading…</div>;
  if (applications.length === 0) return (<div><PageHeader title="Student Applications" subtitle="Track applications across your students." /><EmptyState title="No applications yet" hint="Applications your students log will appear here." /></div>);
  return (
    <div>
      <PageHeader title="Student Applications" subtitle="Track applications across your students." />
      <DataTable
        columns={["Student", "Role", "Portal", "Status"]}
        rows={applications.map((a) => ({
          id: a.id,
          cells: [
            <span key="s" className="font-medium">{a.studentName}</span>,
            a.role,
            <span key="p" className="text-muted">{a.portalName}</span>,
            <Pill key="st" tone={a.status === "Shortlisted" || a.status === "Selected" ? "green" : a.status === "In Review" ? "amber" : "neutral"}>{a.status}</Pill>,
          ],
        }))}
      />
    </div>
  );
}
