"use client";

import Link from "next/link";
import { useContent } from "@/lib/data/DataProvider";
import { Card, PageHeader } from "@/components/ui";

export default function ProjectsPage() {
  const { projects } = useContent();
  return (
    <div>
      <PageHeader title="Project Lab" subtitle="Apply your skills on real, portfolio-ready projects." />
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p) => (
          <Link key={p.id} href={`/app/build/project/?id=${p.id}`}>
            <Card className="hover:border-[var(--accent)] transition-colors">
              <div className="font-bold">{p.title}</div>
              <p className="mt-1 text-sm text-muted">{p.brief}</p>
              <div className="mt-3 text-xs text-muted">{p.checklist.length}-point quality checklist</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
