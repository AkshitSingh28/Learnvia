"use client";

/**
 * Shown when the daily in-app AI cap is exhausted: the copy-into-your-own-AI path takes over so
 * the user is never dead-ended. Surfaces the ready prompt with Copy + direct links to open
 * Gemini / ChatGPT (they paste it there). Reused by AiInline and ChatSurface.
 */
import { CopyButton } from "@/components/trainers/CopyButton";

export function ExternalAiFallback({ prompt, showPrompt = true, note }: { prompt: string; showPrompt?: boolean; note?: string }) {
  const ready = !!prompt.trim();
  return (
    <div>
      {note && (
        <div className="flex items-start gap-2.5 rounded-xl px-3.5 py-2.5 mb-3.5" style={{ background: "var(--aic-clay-tint)", border: "1px solid rgba(62,147,236,.26)" /* blue accent — matches --aic-clay-tint (was clay rgba(217,119,87,…)) */ }}>
          <i className="ti ti-info-circle mt-0.5" style={{ fontSize: 16, color: "var(--aic-clay-soft)" }} aria-hidden="true" />
          <span className="text-[12.5px] leading-snug" style={{ color: "#DCD8CE" }}>{note}</span>
        </div>
      )}
      {showPrompt && ready && (
        <>
          <div className="aic-lbl mb-1.5">Your ready prompt</div>
          <div className="aic-field p-3.5 mb-3.5 text-[13px] leading-relaxed whitespace-pre-wrap">{prompt}</div>
        </>
      )}
      <div className="flex flex-wrap gap-2.5">
        <CopyButton text={prompt} label="Copy prompt" className="aic-btn aic-clay" />
        <a href="https://gemini.google.com/app" target="_blank" rel="noreferrer" className="aic-btn aic-out">
          <i className="ti ti-external-link" style={{ fontSize: 15 }} aria-hidden="true" /> Open in Gemini
        </a>
        <a href="https://chatgpt.com" target="_blank" rel="noreferrer" className="aic-btn aic-out">
          <i className="ti ti-external-link" style={{ fontSize: 15 }} aria-hidden="true" /> Open in ChatGPT
        </a>
      </div>
    </div>
  );
}
