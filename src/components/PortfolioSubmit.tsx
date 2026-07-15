"use client";

/**
 * Guided portfolio submission (review requirement). Instead of a bare button or
 * many file uploads, the student submits ONE Google Drive folder link containing all
 * outputs. Shows clear steps, a sample folder structure, help text, a required-outputs
 * checklist, and — after submitting — the live review status pulled from the student's
 * submission record (Submitted / Under Mentor Review / Changes Requested / Approved).
 */
import { useMemo, useState } from "react";
import { useStudent } from "@/lib/data/DataProvider";
import { Card, IconTile } from "@/components/ui";
import type { Submission } from "@/lib/types";

const STEPS = [
  "Create one Google Drive folder for this portfolio.",
  "Add all the required files listed below into that folder.",
  'Set the folder sharing to "Anyone with the link can view".',
  "Copy the folder link and paste it here.",
  "Tick the checklist to confirm each output is inside.",
  "Submit — your mentor will review the whole folder.",
];

/** Map the internal submission status to the review's friendly review-status labels. */
function statusView(s: Submission["status"]): { label: string; tone: "green" | "amber" | "blue" } {
  if (s === "Approved") return { label: "Approved", tone: "green" };
  if (s === "Needs work") return { label: "Changes Requested", tone: "amber" };
  return { label: "Submitted · Under Mentor Review", tone: "blue" };
}

export function PortfolioSubmit({
  refType,
  refTitle,
  checklist,
  submitLabel = "Submit portfolio",
  sampleName = "GrowHub Portfolio",
}: {
  refType: Submission["refType"];
  refTitle: string;
  checklist: string[];
  submitLabel?: string;
  sampleName?: string;
}) {
  const { submissions, addSubmission } = useStudent();
  const existing = useMemo(() => submissions.find((s) => s.refTitle === refTitle), [submissions, refTitle]);

  const [link, setLink] = useState("");
  const [ticked, setTicked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Optional items — marked "(if available)"/"(optional)" — never block submission.
  const isOptional = (c: string) => /\(if available\)|\(optional\)|^optional:/i.test(c);
  const requiredItems = checklist.filter((c) => !isOptional(c));
  const allTicked = requiredItems.length === 0 || requiredItems.every((c) => ticked.has(c));
  const linkOk = /https?:\/\/(drive|docs)\.google\.com/i.test(link.trim());
  const canSubmit = linkOk && allTicked && !busy;

  // Already submitted (or just submitted) → show the review-status card.
  if (existing || justSubmitted) {
    const view = statusView(existing?.status ?? "Pending");
    const toneCol = view.tone === "green" ? "var(--well-green-fg)" : view.tone === "amber" ? "var(--well-orange-fg)" : "var(--well-blue-fg)";
    return (
      <Card soft={false} className="!p-4">
        <div className="flex items-center gap-3">
          <IconTile icon={view.tone === "green" ? "ti-circle-check" : view.tone === "amber" ? "ti-alert-triangle" : "ti-clock"} tone={view.tone === "green" ? "green" : view.tone === "amber" ? "orange" : "blue"} />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold" style={{ color: toneCol }}>{view.label}</div>
            <div className="text-xs text-muted">Your portfolio folder was submitted for review.</div>
            {existing?.feedback && <div className="mt-1 text-xs text-muted">Mentor note: “{existing.feedback}”</div>}
          </div>
          {existing?.link && <a href={existing.link} target="_blank" rel="noreferrer" className="text-xs text-[var(--accent)] shrink-0">Open folder ↗</a>}
        </div>
      </Card>
    );
  }

  async function submit() {
    setBusy(true);
    await addSubmission({ refType, refTitle, link: link.trim() });
    setBusy(false);
    setJustSubmitted(true);
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-semibold mb-2">How to submit</div>
          <ol className="space-y-1.5 text-sm text-muted">
            {STEPS.map((s, i) => (
              <li key={s} className="flex gap-2.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: "var(--accent)" }}>{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Sample folder structure</div>
          <pre className="rounded-lg border p-3 text-xs text-muted whitespace-pre-wrap" style={{ borderColor: "var(--border)", background: "var(--elevated)" }}>{`📁 ${sampleName}/
${checklist.slice(0, 6).map((c) => `   • ${c}`).join("\n")}${checklist.length > 6 ? "\n   • …" : ""}`}</pre>
          <p className="mt-2 text-xs text-muted">Tip: keep one folder for everything — no need to upload files one by one. Just share the folder link.</p>
        </div>
      </div>

      {checklist.length > 0 && (
        <div>
          <div className="text-sm font-semibold mb-2">Confirm your folder contains</div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {checklist.map((c) => {
              const on = ticked.has(c);
              return (
                <button key={c} onClick={() => setTicked((prev) => { const n = new Set(prev); if (n.has(c)) n.delete(c); else n.add(c); return n; })} className="flex items-start gap-2 text-left text-sm">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px]" style={{ borderColor: "var(--border)", background: on ? "var(--accent)" : "transparent", color: on ? "#fff" : "transparent" }}>✓</span>
                  <span className={on ? "" : "text-muted"}>{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="text-sm font-semibold mb-2">Paste your Google Drive folder link</div>
        <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://drive.google.com/drive/folders/…" className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)" }} />
        {link.trim() && !linkOk && <p className="mt-1 text-xs text-amber-500">Please paste a Google Drive / Docs link.</p>}
      </div>

      <button onClick={submit} disabled={!canSubmit} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: "var(--accent-2)" }}>
        {busy ? "Submitting…" : submitLabel}
      </button>
    </div>
  );
}
