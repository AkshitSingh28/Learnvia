"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStaff } from "@/lib/data/DataProvider";
import { Card, Stat, Pill, Avatar, SectionTitle, ProgressBar, EmptyState } from "@/components/ui";

function StudentInner() {
  const { students, submissions, loading } = useStaff();
  const s = students.find((x) => x.uid === useSearchParams().get("id"));
  if (loading) return <div className="text-muted">Loading…</div>;
  if (!s) return <EmptyState title="Student not found" hint="They may not be in your cohort." />;
  const work = submissions.filter((w) => w.studentId === s.uid);
  return (
    <div className="max-w-3xl">
      <Link href="/staff/students" className="text-sm text-muted">← Students</Link>
      <div className="mt-3 flex items-center gap-4">
        <Avatar name={s.name} size={56} />
        <div><div className="text-xl font-bold">{s.name}</div><div className="text-sm text-muted">{s.cohort}</div></div>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-6">
        <Card><Stat value={`${s.readiness}/100`} label="Readiness" /></Card>
        <Card><Stat value={`${s.phase1}%`} label="Phase 1" /></Card>
        <Card><Stat value={s.pendingReviews} label="Pending reviews" /></Card>
      </div>

      <Card className="mt-5">
        <SectionTitle>Phase 1 progress</SectionTitle>
        <ProgressBar value={s.phase1} />
      </Card>

      <Card className="mt-5">
        <SectionTitle>Submitted work</SectionTitle>
        {work.length === 0 ? <div className="text-sm text-muted">No submissions yet.</div> : (
          <ul className="space-y-3">{work.map((w) => (
            <li key={w.id} className="flex items-center justify-between"><div><div className="text-sm font-medium">{w.refTitle}</div><div className="text-xs text-muted">{w.submittedAgo}</div></div><Pill tone={w.status === "Approved" ? "green" : w.status === "Needs work" ? "amber" : "neutral"}>{w.status}</Pill></li>
          ))}</ul>
        )}
      </Card>
    </div>
  );
}

export default function StaffStudentPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><StudentInner /></Suspense>;
}
