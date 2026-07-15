"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContent } from "@/lib/data/DataProvider";
import { SubmitWork } from "@/components/SubmitWork";
import { Card } from "@/components/ui";

function ProjectInner() {
  const id = useSearchParams().get("id");
  const { projects } = useContent();
  const p = projects.find((x) => x.id === id) ?? projects[0];
  if (!p) return <div className="text-muted">Loading…</div>;
  return (
    <div className="max-w-2xl">
      <Link href="/app/build/projects" className="text-sm text-muted">← Project Lab</Link>
      <h1 className="mt-2 text-2xl font-extrabold">{p.title}</h1>
      <p className="mt-1.5 text-muted">{p.brief}</p>

      <Card className="mt-6">
        <div className="font-bold mb-3">Quality checklist</div>
        <ul className="space-y-2">
          {p.checklist.map((c) => (
            <li key={c} className="flex items-center gap-3 text-sm">
              <span className="h-4 w-4 rounded border" style={{ borderColor: "var(--border)" }} />{c}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-5">
        <div className="font-bold">Submit your work</div>
        <p className="mt-1 text-sm text-muted">Paste a link to your finished project for mentor review.</p>
        <div className="mt-3"><SubmitWork refType="project" refTitle={p.title} /></div>
      </Card>
    </div>
  );
}

export default function ProjectPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><ProjectInner /></Suspense>;
}
