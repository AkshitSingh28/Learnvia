"use client";

import { useState } from "react";

/** One-tap copy-to-clipboard button. Shows a transient "Copied ✓" confirmation. */
export function CopyButton({ text, label = "Copy", className }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older / non-secure contexts.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={className ?? "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors"}
      style={className ? undefined : { background: "var(--accent-2)" }}
    >
      <i className={`ti ${copied ? "ti-check" : "ti-copy"}`} aria-hidden="true" />
      {copied ? "Copied ✓" : label}
    </button>
  );
}
