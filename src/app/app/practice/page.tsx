"use client";

import { useState } from "react";
import { useContent, useStudent } from "@/lib/data/DataProvider";
import { scorePrompt, type PromptScore } from "@/lib/ai/gemini";
import { PageHeader, Btn, WidgetPanel, IconTile } from "@/components/ui";
import { ChatSurface } from "@/components/ai/ChatSurface";

/**
 * Local fallback used only when the AI coach call fails (offline / over cap): the original
 * rule-based structural heuristic on the prompt text.
 */
function heuristicScore(prompt: string): PromptScore {
  const trimmed = prompt.trim();
  const hasRole = /^(act as|you are|as an?|imagine you're)/i.test(trimmed);
  const hasFormat = /(list|table|steps|bullet|one line|word|sentence|paragraph|format)/i.test(trimmed);
  const hasAudience = /(beginner|student|kid|expert|for a|for an)/i.test(trimmed);
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;

  const strengths: string[] = [];
  const improvements: string[] = [];
  if (hasRole) strengths.push("Gives the AI a clear role or persona.");
  else improvements.push("Open with a role, e.g. \"Act as a…\".");
  if (hasFormat) strengths.push("Specifies an output format.");
  else improvements.push("Say how you want the answer shaped (list, one line, table…).");
  if (hasAudience) strengths.push("Names an audience or context.");
  else improvements.push("Mention who it's for, e.g. \"for a beginner\".");
  if (wordCount < 6) improvements.push("The prompt is quite short — add a bit more detail.");

  const score = Math.min(100, 25 + strengths.length * 22 + Math.min(wordCount, 8) * 2);
  return { score, strengths, improvements, rewrittenPrompt: trimmed };
}

/** Practice / Prompt Lab — a real Gemini playground plus a structured prompt coach. */
export default function PracticePage() {
  const { modules } = useContent();
  const { addPortfolioItem } = useStudent();
  const starters = modules.flatMap((m) => m.promptLab).map((p) => p.replace(/^"|"$/g, "")).slice(0, 4);

  const [last, setLast] = useState<{ prompt: string; output: string } | null>(null);
  const [coach, setCoach] = useState<PromptScore | null>(null);
  const [coaching, setCoaching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function runCoach() {
    if (!last || coaching) return;
    setCoaching(true);
    setCoach(null);
    const res = await scorePrompt(last.prompt);
    setCoach(res.ok ? res.data : heuristicScore(last.prompt));
    setCoaching(false);
  }

  async function save() {
    if (!last || saving) return;
    setSaving(true);
    await addPortfolioItem({
      type: "AI Output",
      title: last.prompt.slice(0, 60) || "Prompt Lab attempt",
      detail: `Prompt:\n${last.prompt}\n\nAI response:\n${last.output}`,
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <div>
      <PageHeader title="Practice · Prompt Lab" subtitle="Try prompts on a real AI, get coached, and save your best work." />
      <div className="grid lg:grid-cols-[1fr_320px] gap-5 items-start">
        <ChatSurface
          systemInstruction="You are a helpful practice assistant inside GrowHub, a beginner-friendly AI-upskilling platform for students. Answer the student's prompt clearly and concisely so they can see the effect of how they phrased it. Keep replies practical and encouraging."
          greeting="Prompt Lab"
          subGreeting="Write a prompt to see how a real AI responds. Try a starter below, then tweak it and run again."
          starters={starters}
          placeholder="Write a prompt to practice…"
          onExchange={(prompt, output) => { setLast({ prompt, output }); setCoach(null); setSaved(false); }}
        />

        <div className="space-y-5">
          <WidgetPanel title="Prompt coach">
            {!last ? (
              <p className="text-sm text-muted">Run a prompt on the left, then get feedback on how to make it stronger.</p>
            ) : (
              <>
                <Btn onClick={runCoach} disabled={coaching} className="w-full">
                  {coaching ? "Scoring…" : "Score my last prompt"}
                </Btn>
                {coach && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <IconTile icon="ti-target-arrow" tone={coach.score >= 70 ? "green" : coach.score >= 40 ? "orange" : "red"} />
                      <div>
                        <div className="text-2xl font-extrabold leading-none">{coach.score}<span className="text-sm text-muted font-semibold">/100</span></div>
                        <div className="text-xs text-muted">prompt clarity</div>
                      </div>
                    </div>
                    {coach.strengths.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-muted uppercase tracking-wide mb-1">Strengths</div>
                        <ul className="text-sm space-y-1">{coach.strengths.map((s, i) => <li key={i} className="flex gap-1.5"><span className="text-emerald-500">✓</span>{s}</li>)}</ul>
                      </div>
                    )}
                    {coach.improvements.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-muted uppercase tracking-wide mb-1">Try next</div>
                        <ul className="text-sm space-y-1">{coach.improvements.map((s, i) => <li key={i} className="flex gap-1.5"><span className="text-amber-500">→</span>{s}</li>)}</ul>
                      </div>
                    )}
                    {coach.rewrittenPrompt && coach.rewrittenPrompt !== last.prompt && (
                      <div>
                        <div className="text-xs font-bold text-muted uppercase tracking-wide mb-1">Stronger version</div>
                        <div className="rounded-lg border p-2.5 text-sm text-muted" style={{ borderColor: "var(--border)", background: "var(--elevated)" }}>{coach.rewrittenPrompt}</div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </WidgetPanel>

          <WidgetPanel title="Save your work">
            <p className="text-sm text-muted mb-3">Keep a good prompt + response in your portfolio as an AI Output.</p>
            <Btn variant="outline" onClick={save} disabled={!last || saving} className="w-full">
              {saving ? "Saving…" : saved ? "Saved to portfolio ✓" : "Save last result"}
            </Btn>
          </WidgetPanel>
        </div>
      </div>
    </div>
  );
}
