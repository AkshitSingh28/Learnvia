"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStudent } from "@/lib/data/DataProvider";
import { SubmitWork } from "@/components/SubmitWork";
import { Card, Pill, EmptyState } from "@/components/ui";
import { DetailHeader } from "@/components/templates";

const STATUSES = ["Applied", "In Review", "Shortlisted", "Rejected", "Selected"];

function ApplicationInner() {
  const id = useSearchParams().get("id");
  const { applications } = useStudent();
  const a = applications.find((x) => x.id === id) ?? applications[0];
  if (!a) return <EmptyState title="Application not found" hint="It may have been removed." />;
  return (
    <div className="max-w-2xl">
      <DetailHeader backHref="/app/apply/applications" backLabel="Tracker" title={a.role} subtitle={`${a.portalName} · Applied ${a.appliedAgo}`} />

      <Card className="mt-6">
        <div className="font-bold mb-3">Status</div>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => <Pill key={s} tone={s === a.status ? "accent" : "neutral"}>{s}</Pill>)}
        </div>
      </Card>

      <Card className="mt-5">
        <div className="font-bold">Proof of application</div>
        <p className="mt-1 text-sm text-muted">Paste a link to a screenshot, email, or the application status for mentor review.</p>
        <div className="mt-3"><SubmitWork refType="application" refTitle={`${a.role} @ ${a.portalName}`} label="Submit proof for review" /></div>
      </Card>
    </div>
  );
}

export default function ApplicationPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><ApplicationInner /></Suspense>;
}
