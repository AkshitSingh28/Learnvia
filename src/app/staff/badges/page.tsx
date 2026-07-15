"use client";

import Link from "next/link";
import { useStaff } from "@/lib/data/DataProvider";
import { Card, PageHeader, Pill, EmptyState } from "@/components/ui";

/** Badges are earned automatically on quiz pass — this is a read-only view of who's earned what. */
export default function StaffBadgesPage() {
  const { students, loading } = useStaff();
  if (loading) return <div className="text-muted">Loading…</div>;
  if (students.length === 0) return (<div><PageHeader title="Student Badges" subtitle="Badges your students have earned." /><EmptyState title="No students yet" hint="Earned badges show up here as students complete modules." /></div>);
  return (
    <div>
      <PageHeader title="Student Badges" subtitle="Badges your students have earned by completing modules." />
      <Card>
        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {students.map((s) => (
            <li key={s.uid} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div><div className="text-sm font-medium">{s.name}</div><div className="text-xs text-muted">{s.cohort}</div></div>
              <div className="flex items-center gap-3">
                <Pill tone={s.badgeCount > 0 ? "accent" : "neutral"}>🏅 {s.badgeCount} earned</Pill>
                <Link href={`/staff/student/?id=${s.uid}`} className="text-sm text-[var(--accent)]">View</Link>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
