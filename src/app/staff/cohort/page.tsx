"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStaff } from "@/lib/data/DataProvider";
import { Card, Stat, Pill, SectionTitle, EmptyState } from "@/components/ui";

function CohortInner() {
  const { cohorts, students, loading } = useStaff();
  const c = cohorts.find((x) => x.id === useSearchParams().get("id"));
  if (loading) return <div className="text-muted">Loading…</div>;
  if (!c) return <EmptyState title="Cohort not found" hint="It may not be assigned to you." />;
  const roster = students.filter((s) => s.cohort === c.name);
  return (
    <div className="max-w-3xl">
      <Link href="/staff/cohorts" className="text-sm text-muted">← Cohorts</Link>
      <h1 className="mt-2 text-2xl font-extrabold">{c.name}</h1>
      <p className="mt-1 text-muted">{c.ngo}</p>

      <div className="grid grid-cols-3 gap-5 mt-6">
        <Card><Stat value={c.students} label="Students" /></Card>
        <Card><Stat value={`${c.avgProgress}%`} label="Avg progress" /></Card>
        <Card><Stat value={<code className="text-base">{c.inviteCode}</code>} label="Invite code" /></Card>
      </div>

      <Card className="mt-5">
        <div className="flex items-center justify-between mb-4"><SectionTitle>Roster</SectionTitle><span className="text-xs text-muted">Share code <code>{c.inviteCode}</code> to invite</span></div>
        <ul className="space-y-3">
          {roster.map((s) => (
            <li key={s.id} className="flex items-center justify-between"><Link href={`/staff/student/?id=${s.id}`} className="text-sm font-medium">{s.name}</Link><Pill tone={s.readiness >= 50 ? "green" : "amber"}>{s.readiness}/100</Pill></li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default function StaffCohortPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><CohortInner /></Suspense>;
}
