"use client";

import { useStudent } from "@/lib/data/DataProvider";
import { Card, PageHeader, Btn, Pill, EmptyState, ActionRow } from "@/components/ui";

export default function ApplicationsPage() {
  const { applications } = useStudent();
  return (
    <div>
      <PageHeader title="Application Tracker" subtitle="Update status and upload proof for every application." action={<Btn href="/app/apply/applications/new">+ Add application</Btn>} />
      {applications.length === 0 ? (
        <EmptyState title="No applications yet" hint="Add your first application to start tracking." />
      ) : (
      <Card>
        <div className="space-y-1">
          {applications.map((a) => (
            <ActionRow
              key={a.id}
              icon="ti-briefcase"
              tone="blue"
              title={a.role}
              subtitle={`${a.portalName} · Applied ${a.appliedAgo}`}
              href={`/app/apply/application/?id=${a.id}`}
              right={<Pill tone={a.status === "Shortlisted" || a.status === "Selected" ? "green" : a.status === "In Review" ? "amber" : "neutral"}>{a.status}</Pill>}
            />
          ))}
        </div>
      </Card>
      )}
    </div>
  );
}
