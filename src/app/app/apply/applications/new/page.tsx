"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStudent } from "@/lib/data/DataProvider";
import { Card, Btn } from "@/components/ui";
import type { ApplicationStatus } from "@/lib/types";

const STATUSES: ApplicationStatus[] = ["Applied", "In Review", "Shortlisted", "Rejected", "Selected"];
const field = "w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm";

function NewApplicationInner() {
  const router = useRouter();
  const { addApplication } = useStudent();
  const prefillPortal = useSearchParams().get("portal") ?? "";
  const [portalName, setPortalName] = useState(prefillPortal);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [proofUrl, setProofUrl] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await addApplication({ portalName, role, status, appliedAgo: date, proofUrl: proofUrl.trim() || undefined });
    router.replace("/app/apply/applications");
  }

  return (
    <div className="max-w-lg">
      <Link href="/app/apply/applications" className="text-sm text-muted">← Tracker</Link>
      <h1 className="mt-2 text-2xl font-extrabold mb-6">Add application</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-muted">Portal name</label>
            <input required value={portalName} onChange={(e) => setPortalName(e.target.value)} placeholder="e.g. Internshala" className={field} style={{ borderColor: "var(--border)" }} />
          </div>
          <div>
            <label className="text-xs text-muted">Opportunity title</label>
            <input required value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Content Writing Intern" className={field} style={{ borderColor: "var(--border)" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted">Date applied</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} style={{ borderColor: "var(--border)" }} />
            </div>
            <div>
              <label className="text-xs text-muted">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as ApplicationStatus)} className={field} style={{ borderColor: "var(--border)" }}>
                {STATUSES.map((s) => <option key={s} className="bg-black">{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-muted">Proof link (screenshot / email / status) — optional</label>
            <input value={proofUrl} onChange={(e) => setProofUrl(e.target.value)} placeholder="Paste a Drive/screenshot link" className={field} style={{ borderColor: "var(--border)" }} />
          </div>
          <Btn type="submit" className="w-full" disabled={busy}>{busy ? "Saving…" : "Save to tracker"}</Btn>
        </form>
      </Card>
    </div>
  );
}

export default function NewApplicationPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><NewApplicationInner /></Suspense>;
}
