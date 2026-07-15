"use client";

import Link from "next/link";
import { useStaff } from "@/lib/data/DataProvider";
import { Card, PageHeader, Pill, EmptyState } from "@/components/ui";

export default function StaffCohortsPage() {
  const { cohorts, loading } = useStaff();
  if (loading) return <div className="text-muted">Loading…</div>;
  return (
    <div>
      <PageHeader title="Cohorts" subtitle="Manage your batches and invites." />
      {cohorts.length === 0 && <EmptyState title="No cohorts yet" hint="An admin can create a cohort and assign it to you." />}
      <div className="grid md:grid-cols-2 gap-5">
        {cohorts.map((c) => (
          <Link key={c.id} href={`/staff/cohort/?id=${c.id}`}>
            <Card className="hover:border-[var(--accent)] transition-colors">
              <div className="flex items-center justify-between"><span className="font-bold">{c.name}</span><Pill>{c.avgProgress}% avg</Pill></div>
              <div className="mt-1 text-sm text-muted">{c.ngo} · {c.students} students</div>
              <div className="mt-3 text-xs text-muted">Invite code: <code>{c.inviteCode}</code></div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
