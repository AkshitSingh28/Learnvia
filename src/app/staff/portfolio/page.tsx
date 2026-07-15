"use client";

import Link from "next/link";
import { useStaff } from "@/lib/data/DataProvider";
import { Card, PageHeader, Avatar, EmptyState } from "@/components/ui";


export default function StaffPortfolioPage() {
  const { students, loading } = useStaff();
  if (loading) return <div className="text-muted">Loading…</div>;
  if (students.length === 0) return (<div><PageHeader title="Portfolio Verification" subtitle="Verify student portfolios and proof-of-work." /><EmptyState title="No students yet" hint="Once students join your cohort, their portfolios show here." /></div>);
  return (
    <div>
      <PageHeader title="Portfolio Verification" subtitle="Verify student portfolios and proof-of-work." />
      <div className="grid md:grid-cols-2 gap-5">
        {students.map((s) => (
          <Card key={s.uid}>
            <div className="flex items-center gap-3"><Avatar name={s.name} size={36} /><div><div className="font-semibold">{s.name}</div><div className="text-xs text-muted">{s.cohort}</div></div></div>
            <div className="mt-3 text-sm text-muted">{s.portfolioCount} portfolio {s.portfolioCount === 1 ? "item" : "items"} · readiness {s.readiness}/100</div>
            <div className="mt-4"><Link href={`/staff/student/?id=${s.uid}`} className="text-sm text-[var(--accent)]">View student →</Link></div>
          </Card>
        ))}
      </div>
    </div>
  );
}
