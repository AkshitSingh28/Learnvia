"use client";

/**
 * A one-shot AI helper on the charcoal "AI console" surface. A button (optionally
 * with an input) runs a single Gemini prompt and streams-in the result with copy + regenerate.
 * When the daily cap is exhausted it flips to the copy-into-your-own-AI fallback so the user is
 * never dead-ended. Reused for module-reflection feedback, apply-sprint helpers, and (bare) the
 * trainer tool generators.
 */
import { useState, type ReactNode } from "react";
import { runPrompt } from "@/lib/ai/gemini";
import { useStudent } from "@/lib/data/DataProvider";
import { CopyButton } from "@/components/trainers/CopyButton";
import { ExternalAiFallback } from "@/components/ai/ExternalAiFallback";
import { AiUsageMeter } from "@/components/ai/AiUsageMeter";
import { cn } from "@/components/ui";

export interface AiInlineProps {
  /** Button label (also the action verb, e.g. "Get feedback", "Generate"). */
  label: string;
  /** Optional system framing for the model. */
  system?: string;
  /** Build the prompt from the optional input value; return null when there's nothing to send. */
  buildPrompt: (input: string) => string | null;
  /** Render an input the user types into before running. */
  withInput?: { placeholder: string; rows?: number };
  /** Disable the trigger (parent knows it's not ready, e.g. empty reflection). */
  disabled?: boolean;
  /** Message shown if `buildPrompt` returns null when clicked. */
  notReadyHint?: string;
  /** When set, the feature is locked: render this hint instead of the control (e.g. readiness gate). */
  gatedHint?: string;
  /** Heading over the result. */
  resultLabel?: string;
  /** When false, skip the charcoal console wrapper (caller provides it, e.g. trainer tools). */
  wrap?: boolean;
  className?: string;
}

export function AiInline({ label, system, buildPrompt, withInput, disabled, notReadyHint, gatedHint, resultLabel = "AI suggestion", wrap = true, className }: AiInlineProps) {
  const { aiRemaining, recordAiUse } = useStudent();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const capReached = aiRemaining <= 0;
  const inputEmpty = !!withInput && !input.trim();
  const currentPrompt = buildPrompt(input) ?? "";

  async function run() {
    const prompt = buildPrompt(input);
    if (!prompt) { setError(notReadyHint ?? "Add a little more first."); return; }
    if (busy || capReached) return;
    setBusy(true); setError(""); setOutput("");
    await recordAiUse();
    const res = await runPrompt(prompt, system);
    if (res.ok) setOutput(res.data); else setError(res.error);
    setBusy(false);
  }

  let body: ReactNode;
  if (gatedHint) {
    body = (
      <div className="aic-field flex items-center gap-2 px-3.5 py-3 text-sm" style={{ color: "var(--aic-muted)" }}>
        <i className="ti ti-lock" aria-hidden="true" /> {gatedHint}
      </div>
    );
  } else if (capReached) {
    body = (
      <>
        {withInput && (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={withInput.rows ?? 3}
            placeholder={withInput.placeholder}
            className="aic-field w-full px-3 py-2.5 text-sm mb-3.5 outline-none"
          />
        )}
        <ExternalAiFallback
          prompt={currentPrompt}
          showPrompt={!withInput}
          note="You've used your in-app AI runs for today. Copy this into your own free ChatGPT or Gemini — your runs free up over the next day."
        />
      </>
    );
  } else {
    body = (
      <>
        {withInput && (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={withInput.rows ?? 3}
            placeholder={withInput.placeholder}
            className="aic-field w-full px-3 py-2.5 text-sm mb-2.5 outline-none"
          />
        )}
        <div className="flex items-center gap-3 flex-wrap">
          <button type="button" onClick={run} disabled={busy || disabled || inputEmpty} className="aic-btn aic-clay">
            <i className={`ti ${busy ? "ti-loader-2 animate-spin" : output ? "ti-refresh" : "ti-sparkles"}`} style={{ fontSize: 16 }} aria-hidden="true" />
            {busy ? "Thinking…" : output ? "Regenerate" : label}
          </button>
          <AiUsageMeter className="min-w-[140px] flex-1 max-w-[220px]" />
        </div>

        {error && <p className="mt-2 text-sm" style={{ color: "#E88B6B" }}>{error}</p>}

        {output && (
          <div className="aic-field p-4 mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="aic-lbl">{resultLabel}</span>
              <CopyButton text={output} label="Copy" className="aic-btn aic-out aic-btn-sm" />
            </div>
            <div className="text-sm whitespace-pre-wrap" style={{ color: "#DCD8CE", lineHeight: 1.6 }}>{output}</div>
          </div>
        )}

        {currentPrompt && (
          <div className="mt-3 text-xs flex items-center gap-1.5" style={{ color: "var(--aic-faint)" }}>
            Prefer your own AI?
            <CopyButton text={currentPrompt} label="Copy the prompt instead" className="aic-link" />
          </div>
        )}
      </>
    );
  }

  if (wrap) return <div className={cn("aic p-4", className)}>{body}</div>;
  return <div className={className}>{body}</div>;
}
