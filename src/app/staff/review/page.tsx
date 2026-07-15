"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStaff } from "@/lib/data/DataProvider";
import { Card, Btn, Pill, EmptyState } from "@/components/ui";
import { DetailHeader } from "@/components/templates";

function ReviewInner() {
  const router = useRouter();
  const { submissions, reviewSubmission, loading } = useStaff();
  const s = submissions.find((x) => x.id === useSearchParams().get("id"));
  const [feedback, setFeedback] = useState(s?.feedback ?? "");
  const [busy, setBusy] = useState(false);

  if (loading) return <div className="text-muted">Loading…</div>;
  if (!s) return <EmptyState title="Submission not found" hint="It may have been removed or isn't in your cohort." />;

  async function decide(status: "Approved" | "Needs work") {
    setBusy(true);
    await reviewSubmission(s!.id, status, feedback.trim() || undefined);
    router.replace("/staff/reviews");
  }

  return (
    <div className="max-w-2xl">
      <DetailHeader backHref="/staff/reviews" backLabel="Review queue" title={s.refTitle} subtitle={`${s.studentName} · ${s.refType} · ${s.submittedAgo}`} />

      <Card className="mt-6">
        <div className="text-sm font-semibold mb-2">Submitted work</div>
        {s.link ? (
          <a href={s.link} target="_blank" rel="noopener noreferrer" className="block rounded-lg border p-4 text-sm text-[var(--accent)] break-all" style={{ borderColor: "var(--border)" }}>🔗 {s.link}</a>
        ) : (
          <div className="rounded-lg border p-6 text-center text-sm text-muted" style={{ borderColor: "var(--border)" }}>No link provided</div>
        )}
      </Card>

      <Card className="mt-5">
        <div className="text-sm font-semibold mb-2">Feedback</div>
        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={3} placeholder="Write feedback for the student…" className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)" }} />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Btn onClick={() => decide("Approved")} disabled={busy}>✓ Approve</Btn>
          <Btn variant="outline" onClick={() => decide("Needs work")} disabled={busy}>Request changes</Btn>
          <Pill tone={s.status === "Approved" ? "green" : s.status === "Needs work" ? "amber" : "neutral"}>Current: {s.status}</Pill>
        </div>
      </Card>
    </div>
  );
}

export default function StaffReviewPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><ReviewInner /></Suspense>;
}
