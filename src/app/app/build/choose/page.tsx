"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStudent } from "@/lib/data/DataProvider";
import { chooserQuestions } from "@/lib/seed/data";
import { recommendTracks, type ChooserResult } from "@/lib/data/chooser";
import { Card, Btn, Pill, ProgressBar } from "@/components/ui";

/** Phase 2 — "Help me choose" 4-question track recommender. */
export default function ChoosePage() {
  const router = useRouter();
  const { tracks, chooseTrack } = useStudent();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ChooserResult | null>(null);

  const q = chooserQuestions[step];
  const progress = Math.round((step / chooserQuestions.length) * 100);

  function pick(optionIndex: number) {
    const next = { ...answers, [q.id]: optionIndex };
    setAnswers(next);
    if (step < chooserQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(recommendTracks(chooserQuestions, next, tracks));
    }
  }

  async function start(trackId: string) {
    await chooseTrack(trackId);
    router.push(`/app/build/track/?id=${trackId}`);
  }

  if (result) {
    return (
      <div className="max-w-2xl">
        <Link href="/app/build" className="text-sm text-muted">← Phase 2</Link>
        <h1 className="mt-2 text-2xl font-extrabold">Your suggested starting track</h1>
        <p className="mt-1.5 text-muted">This is only a suggestion. You can change or add another track after completing this one.</p>

        <Card className="mt-6 border-[var(--accent)]">
          <Pill tone="accent">Recommended for you</Pill>
          <div className="mt-3 text-xl font-extrabold">{result.main.glyph} {result.main.title}</div>
          <p className="mt-1 text-sm text-muted">{result.main.summary}</p>
          <p className="mt-3 text-sm"><span className="text-[var(--accent)]">Why this fits: </span>{result.reason}</p>
          {result.note && <p className="mt-2 text-xs text-amber-400">{result.note}</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            <Btn onClick={() => void start(result.main.id)}>Start this track</Btn>
            <Btn href="/app/build" variant="outline">View other tracks</Btn>
          </div>
        </Card>

        <Card className="mt-4">
          <div className="text-sm text-muted">Backup option</div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-bold">{result.backup.glyph} {result.backup.title}</div>
              <p className="mt-1 text-sm text-muted max-w-md">{result.backup.tagline ?? result.backup.summary}</p>
            </div>
            <Btn onClick={() => void start(result.backup.id)} variant="outline">Choose this instead</Btn>
          </div>
        </Card>

        <button onClick={() => { setResult(null); setStep(0); setAnswers({}); }} className="mt-5 text-sm text-muted underline">
          Retake the quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link href="/app/build" className="text-sm text-muted">← Phase 2</Link>
      <h1 className="mt-2 text-2xl font-extrabold">Choose your starting track</h1>
      <p className="mt-1.5 text-muted">Pick one track to start, based on what you enjoy and the device you have.</p>

      <div className="mt-6 mb-4"><ProgressBar value={progress} /></div>
      <div className="text-xs text-muted mb-3">Question {step + 1} of {chooserQuestions.length}</div>

      <Card>
        <div className="font-bold text-lg">{q.question}</div>
        <div className="mt-4 space-y-2.5">
          {q.options.map((opt, i) => (
            <button
              key={opt.label}
              onClick={() => pick(i)}
              className="w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="font-medium">{opt.label}</span>
              {opt.note && <span className="block text-xs text-muted mt-0.5">{opt.note}</span>}
            </button>
          ))}
        </div>
      </Card>

      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-muted">← Back</button>
      )}
    </div>
  );
}
