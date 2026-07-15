"use client";

import Link from "next/link";
import { useStaff } from "@/lib/data/DataProvider";
import { Card, PageHeader, Pill, EmptyState } from "@/components/ui";

export default function StaffReviewsPage() {
  const { submissions, loading } = useStaff();
  if (loading) return <div className="text-muted">Loading…</div>;
  // Pending first, then the rest.
  const ordered = [...submissions].sort((a, b) => (a.status === "Pending" ? -1 : 0) - (b.status === "Pending" ? -1 : 0));
  return (
    <div>
      <PageHeader title="Review Queue" subtitle="Approve assignments and give feedback." />
      {submissions.length === 0 ? <EmptyState title="Nothing to review" hint="Submissions from your students will appear here." /> : (
      <Card>
        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {ordered.map((s) => (
            <li key={s.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div><div className="text-sm font-medium">{s.refTitle}</div><div className="text-xs text-muted">{s.studentName} · {s.submittedAgo}</div></div>
              <div className="flex items-center gap-3">
                <Pill tone={s.status === "Approved" ? "green" : s.status === "Needs work" ? "amber" : "neutral"}>{s.status}</Pill>
                <Link href={`/staff/review/?id=${s.id}`} className="text-sm text-[var(--accent)]">Open</Link>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      )}
    </div>
  );
}
