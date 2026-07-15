"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { PageHeader, Card, IconTile, Pill } from "@/components/ui";
import { workshopSchedule, workshopParts } from "@/lib/seed/trainers";

/** Stable public URL the workshop QR sends trainers to (login-gated). */
const PORTAL_URL = "https://aarohan-2701b.web.app/trainers";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(PORTAL_URL)}`;

/** Facilitator kit for the 60-minute live lab: timeline + QR handoff + collapsible run sheet. */
export default function TrainerWorkshop() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="The 60-Minute Live Lab"
        subtitle="A ready-to-run facilitator script for your in-person trainer workshop."
      />

      {/* Timeline */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4"><IconTile icon="ti-clock" tone="indigo" size="sm" /><span className="text-base font-bold">Timeline</span></div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {workshopSchedule.map((s) => (
            <div key={s.time} className="flex items-center gap-4 py-2.5">
              <span className="w-24 shrink-0 text-sm font-semibold text-[var(--accent)]">{s.time}</span>
              <span className="flex-1 text-sm">{s.focus}</span>
              <Pill>{s.minutes}</Pill>
            </div>
          ))}
        </div>
      </Card>

      {/* QR handoff — prominent, near the top */}
      <Card className="mb-7 flex flex-wrap items-center gap-6">
        <img src={QR_SRC} alt="QR code to the trainer portal" width={150} height={150} className="rounded-lg border p-2" style={{ borderColor: "var(--border)", background: "#fff" }} />
        <div className="min-w-0">
          <div className="text-base font-bold">The Portal Handoff</div>
          <p className="text-sm text-muted mt-1 max-w-sm">Project this in Part 5. Trainers scan it to open the portal on their phones and sign in with their Learnvia trainer account.</p>
          <div className="mt-2 text-sm font-mono break-all text-[var(--accent)]">{PORTAL_URL}</div>
        </div>
      </Card>

      {/* Run sheet — collapsible parts */}
      <h2 className="mb-3 text-lg font-bold">Facilitator script</h2>
      <div className="space-y-3">
        {workshopParts.map((p, i) => {
          const isOpen = open === i;
          return (
            <Card key={p.title} className="!p-0 overflow-hidden">
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center gap-3 p-4 text-left">
                <span className="flex-1 min-w-0 text-sm font-bold">{p.title}</span>
                <Pill tone="accent">{p.window}</Pill>
                <i className={`ti ti-chevron-${isOpen ? "up" : "down"} text-muted`} aria-hidden="true" />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-2">
                  {p.scenario && <p className="text-sm"><span className="font-semibold">Scenario: </span><span className="text-muted">{p.scenario}</span></p>}
                  {p.actions && <ul className="list-disc pl-5 space-y-1 text-sm text-muted">{p.actions.map((a, j) => <li key={j}>{a}</li>)}</ul>}
                  {p.script && <p className="text-sm text-muted italic">{p.script}</p>}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
