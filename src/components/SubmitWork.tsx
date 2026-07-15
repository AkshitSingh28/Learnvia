"use client";

import { useState } from "react";
import { useStudent } from "@/lib/data/DataProvider";
import { Btn } from "@/components/ui";
import type { Submission } from "@/lib/types";

/**
 * Shared "submit work for review" control. Reveals a link input (Drive/GitHub/Canva), then writes
 * a real submission via the student data layer. Link-only for now (Storage uploads come later).
 */
export function SubmitWork({
  refType,
  refTitle,
  label = "Submit for review",
}: {
  refType: Submission["refType"];
  refTitle: string;
  label?: string;
}) {
  const { addSubmission } = useStudent();
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return <div className="rounded-lg border px-3 py-3 text-sm text-emerald-600" style={{ borderColor: "var(--border)" }}>✓ Submitted for review — your mentor will see it shortly.</div>;
  }

  if (!open) {
    return <Btn onClick={() => setOpen(true)}>{label}</Btn>;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await addSubmission({ refType, refTitle, link: link.trim() || undefined });
    setBusy(false);
    setDone(true);
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <input
        autoFocus
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Paste a link to your work (Drive / GitHub / Canva)"
        className="flex-1 rounded-lg border bg-transparent px-3 py-2.5 text-sm"
        style={{ borderColor: "var(--border)" }}
      />
      <Btn type="submit" disabled={busy}>{busy ? "Submitting…" : "Submit"}</Btn>
    </form>
  );
}
