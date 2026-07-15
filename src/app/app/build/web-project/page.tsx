"use client";

import Link from "next/link";
import { useStudent } from "@/lib/data/DataProvider";
import { webRubric, webSubmissionChecklist, webPassingBands } from "@/lib/seed/data";
import { SubmitWork } from "@/components/SubmitWork";
import { Card, PageHeader, Pill } from "@/components/ui";

const README = `# My Beginner Website Project

## What I built
I created a simple website using HTML, CSS and basic JavaScript.

## Purpose
This website can be used as a student profile / NGO page / small business page / portfolio page.

## Tools used
HTML, CSS, JavaScript, GitHub

## Live link
Paste GitHub Pages link here

## What I learned
I learned how to create a webpage, style it, upload it to GitHub and share a live link.`;

/** Phase 2 — Module 6: Beginner Web Project portfolio assessment (rubric /100 + bands). */
export default function WebProjectPage() {
  const { checkedItems, toggleChecklistItem } = useStudent();
  const done = new Set(checkedItems.web ?? []);
  const totalMarks = webRubric.reduce((s, r) => s + r.marks, 0);

  return (
    <div className="max-w-3xl">
      <Link href="/app/build/track/?id=t5" className="text-sm text-muted">← Beginner Web / Tech</Link>
      <PageHeader title="Beginner Web Project Portfolio" subtitle="The graded assessment for the Web / Tech track. Build a site, publish it, and submit the proof." action={<Pill tone="accent">Rubric /100</Pill>} />

      <Card className="mb-6">
        <div className="font-bold mb-3">Submission checklist</div>
        <div className="space-y-2.5">
          {webSubmissionChecklist.map((item) => {
            const isDone = done.has(item.item);
            return (
              <div key={item.item} className="flex items-start gap-3">
                <button
                  onClick={() => void toggleChecklistItem("web", item.item)}
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs"
                  style={{ borderColor: "var(--border)", background: isDone ? "var(--accent)" : "transparent", color: isDone ? "#fff" : "transparent" }}
                >
                  ✓
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2">
                    <span className="font-medium text-sm">{item.item}</span>
                    <span className="text-xs text-muted">· {item.required}</span>
                  </div>
                  <p className="text-xs text-muted">{item.check}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <Card>
          <div className="font-bold mb-3">Grading rubric</div>
          <ul className="space-y-2 text-sm">
            {webRubric.map((r) => (
              <li key={r.criteria} className="flex justify-between gap-3">
                <span className="text-muted">{r.criteria}</span>
                <span className="font-semibold">{r.marks}</span>
              </li>
            ))}
            <li className="flex justify-between gap-3 border-t pt-2 mt-1" style={{ borderColor: "var(--border)" }}>
              <span className="font-bold">Total</span><span className="font-bold">{totalMarks}</span>
            </li>
          </ul>
        </Card>
        <Card>
          <div className="font-bold mb-3">Passing bands</div>
          <ul className="space-y-2 text-sm">
            {webPassingBands.map((b) => (
              <li key={b.level} className="flex justify-between gap-3">
                <span className="text-muted">{b.level}</span>
                <span className="font-semibold">{b.range}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="font-bold mb-2">Simple README format for students</div>
        <pre className="whitespace-pre-wrap rounded-lg border p-4 text-xs text-muted overflow-x-auto" style={{ borderColor: "var(--border)", background: "var(--track)" }}>{README}</pre>
      </Card>

      <Card>
        <div className="font-bold">Submit your final project</div>
        <p className="mt-1 text-sm text-muted">Paste your GitHub repo link, live GitHub Pages link, or a screenshot for mentor review.</p>
        <div className="mt-4"><SubmitWork refType="project" refTitle="Beginner Web Project Portfolio" label="Submit project for review" /></div>
      </Card>
    </div>
  );
}
