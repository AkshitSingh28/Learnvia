"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, IconTile } from "@/components/ui";
import { CopyButton } from "@/components/trainers/CopyButton";
import { trainerModules } from "@/lib/seed/trainers";

/** Turn any YouTube link (youtu.be/ID, watch?v=ID, /embed/ID) into a privacy-friendly embed URL. */
function youtubeEmbed(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/)([\w-]{11})/);
  const id = m ? m[1] : "";
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

function ModuleInner() {
  const id = useSearchParams().get("id");
  const m = trainerModules.find((x) => x.id === id) ?? trainerModules[0];
  const [open, setOpen] = useState<number>(0);

  const prev = m.order > 1 ? trainerModules[m.order - 2] : null;
  const next = m.order < trainerModules.length ? trainerModules[m.order] : null;

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/trainers/modules" className="text-sm text-muted">← All modules</Link>

      <div className="mt-3 flex items-start gap-4">
        <IconTile icon={m.icon} tone={m.tone} size="lg" />
        <div>
          <div className="text-xs font-semibold text-muted">Module {m.order}</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{m.title}</h1>
          <p className="text-muted">{m.subtitle}</p>
        </div>
      </div>

      {/* Embedded teaching video when available; otherwise the concept notes stand in. */}
      {m.videoUrl && (
        <div className="mt-4 overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src={youtubeEmbed(m.videoUrl)}
              title={`${m.title} — teaching video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Video concepts as slim notes below the player. */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <i className="ti ti-video mt-0.5 text-[var(--accent)]" aria-hidden="true" />
          <span className="text-muted"><span className="font-semibold text-foreground">Intro video: </span>{m.videoConcept}</span>
        </div>
        <div className="flex items-start gap-2">
          <i className="ti ti-device-desktop mt-0.5 text-[var(--accent)]" aria-hidden="true" />
          <span className="text-muted"><span className="font-semibold text-foreground">Action demo: </span>{m.actionDemoConcept}</span>
        </div>
      </div>

      <h2 className="mt-7 mb-1 text-lg font-bold">Prompt templates</h2>
      <p className="text-sm text-muted mb-4">Tap a template, replace the <span className="font-mono text-[var(--accent)]">[bracketed]</span> parts, and paste it into ChatGPT or Gemini.</p>

      <div className="space-y-3">
        {m.templates.map((t, i) => {
          const isOpen = open === i;
          return (
            <Card key={t.name} className="!p-0 overflow-hidden">
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center gap-3 p-4 text-left">
                <span className="text-xs font-bold text-[var(--accent)] w-8 shrink-0">0{i + 1}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-bold">{t.name}</span>
                  {!isOpen && <span className="block text-xs text-muted truncate">{t.prompt}</span>}
                </span>
                <i className={`ti ti-chevron-${isOpen ? "up" : "down"} text-muted`} aria-hidden="true" />
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <div className="rounded-lg border p-4 text-sm whitespace-pre-line" style={{ borderColor: "var(--border)", background: "var(--elevated)" }}>
                    {t.prompt}
                  </div>
                  <div className="mt-3"><CopyButton text={t.prompt} /></div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {m.extraTools && m.extraTools.length > 0 && (
        <>
          <h2 className="mt-8 mb-1 text-lg font-bold">Extra tools</h2>
          <p className="text-sm text-muted mb-4">External apps that pair with this module, with exact steps for each one.</p>
          <div className="space-y-3">
            {m.extraTools.map((t) => (
              <Card key={t.name} className="flex items-start gap-3">
                <i className="ti ti-tool mt-0.5 text-[var(--accent)]" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="text-sm font-bold">{t.name}</div>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{t.instructions}</p>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 flex items-center justify-between text-sm">
        {prev ? <Link href={`/trainers/module?id=${prev.id}`} className="text-muted">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/trainers/module?id=${next.id}`} className="font-semibold text-[var(--accent)]">{next.title} →</Link> : <span />}
      </div>
    </div>
  );
}

/** Single trainer module — two video concepts + copy-paste templates + external tool how-tos. */
export default function TrainerModulePage() {
  return (
    <Suspense fallback={<div className="text-muted">Loading…</div>}>
      <ModuleInner />
    </Suspense>
  );
}
