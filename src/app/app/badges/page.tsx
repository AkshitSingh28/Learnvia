"use client";

import { useStudent } from "@/lib/data/DataProvider";
import { Card, PageHeader, Pill } from "@/components/ui";

export default function BadgesPage() {
  const { badges } = useStudent();
  const earnedCount = badges.filter((b) => b.earned).length;
  return (
    <div>
      <PageHeader title="Badges" subtitle="Earn badges by completing modules and tasks." action={<Pill tone="accent">{earnedCount} / {badges.length} earned</Pill>} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {badges.map((b) => (
          <Card key={b.id} lift={b.earned} className={`text-center ${b.earned ? "" : "opacity-60"}`}>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl" style={{ background: b.earned ? "var(--well-green-bg)" : "var(--track)", color: b.earned ? "var(--well-green-fg)" : "var(--faint)" }}>
              <i className={`ti ${b.earned ? "ti-award" : "ti-lock"} text-3xl`} aria-hidden="true" />
            </span>
            <div className="mt-3 font-semibold text-sm">{b.title}</div>
            <div className="mt-1 text-xs text-muted">{b.earned ? "Earned" : "Locked"}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
