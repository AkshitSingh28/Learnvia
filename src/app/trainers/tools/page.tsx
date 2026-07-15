"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/ui";
import { AiInline } from "@/components/ai/AiInline";
import { trainerTools, type TrainerTool } from "@/lib/seed/trainers";

/** Fill-in-the-blank builder for one tool, on the charcoal AI console. Inputs assemble a ready
    prompt; AiInline runs it live (clay Generate) and falls back to copy-into-your-own-AI when the
    daily cap is exhausted. Parent remounts via `key={tool.id}`, so field state resets on switch. */
function ToolBuilder({ tool }: { tool: TrainerTool }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const prompt = useMemo(() => {
    return tool.template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
      const field = tool.fields.find((f) => f.id === key);
      const v = (values[key] ?? "").trim();
      return v || `[${field?.label ?? key}]`;
    });
  }, [tool, values]);

  return (
    <div className="aic p-5">
      <div className="flex items-start gap-3.5">
        <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "var(--aic-clay-tint)", color: "var(--aic-clay-soft)" }}>
          <i className={`ti ${tool.icon}`} style={{ fontSize: 22 }} aria-hidden="true" />
        </span>
        <div>
          <div className="text-lg font-semibold" style={{ color: "var(--aic-text)" }}>{tool.title}</div>
          <div className="text-xs" style={{ color: "var(--aic-faint)" }}>{tool.subtitle}</div>
          <p className="mt-1.5 text-sm" style={{ color: "var(--aic-muted)" }}>{tool.whatItDoes}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {tool.fields.map((f) => (
          <label key={f.id} className="block">
            <span className="aic-lbl">{f.label}</span>
            {f.type === "select" ? (
              <select
                value={values[f.id] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                className="aic-field mt-1.5 w-full px-3 py-2.5 text-sm outline-none"
              >
                <option value="">{f.placeholder}</option>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea
                value={values[f.id] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                rows={4}
                placeholder={f.placeholder}
                className="aic-field mt-1.5 w-full px-3 py-2.5 text-sm outline-none resize-none"
              />
            ) : (
              <input
                value={values[f.id] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                placeholder={f.placeholder}
                className="aic-field mt-1.5 w-full px-3 py-2.5 text-sm outline-none"
              />
            )}
          </label>
        ))}
      </div>

      <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--aic-line)" }}>
        <AiInline wrap={false} label="Generate" resultLabel="Draft" buildPrompt={() => prompt} />
      </div>
    </div>
  );
}

/** Interactive Trainer Tools — a tabbed picker showing one focused builder at a time. */
export default function TrainerTools() {
  const [active, setActive] = useState(trainerTools[0].id);

  useEffect(() => {
    const h = window.location.hash.replace("#", "");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (trainerTools.some((t) => t.id === h)) setActive(h);
  }, []);

  const tool = trainerTools.find((t) => t.id === active) ?? trainerTools[0];

  return (
    <div>
      <PageHeader
        title="Interactive Trainer Tools"
        subtitle="Fill in the blanks, generate a draft instantly, or copy the ready prompt into your own ChatGPT or Gemini — free, on your phone."
      />

      {/* Segmented tool picker */}
      <div className="flex flex-wrap gap-2 mb-5">
        {trainerTools.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
              style={on
                ? { background: "var(--accent-2)", color: "#fff", borderColor: "var(--accent-2)" }
                : { borderColor: "var(--border)", color: "var(--muted)" }}
            >
              <i className={`ti ${t.icon}`} aria-hidden="true" /> {t.title}
            </button>
          );
        })}
      </div>

      <ToolBuilder key={tool.id} tool={tool} />
    </div>
  );
}
