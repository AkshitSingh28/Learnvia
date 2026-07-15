"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, Card, IconTile } from "@/components/ui";
import { trainerModules } from "@/lib/seed/trainers";

/** The 10 core AI modules with a search across titles + template text ("find a prompt for…"). */
export default function TrainerModules() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!query) return trainerModules;
    return trainerModules.filter((m) => {
      const hay = `${m.title} ${m.subtitle} ${m.videoConcept} ${m.actionDemoConcept} ${m.templates.map((t) => `${t.name} ${t.prompt}`).join(" ")} ${(m.extraTools ?? []).map((t) => `${t.name} ${t.instructions}`).join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [query]);

  return (
    <div>
      <PageHeader
        title="The 10 Core AI Modules"
        subtitle="Each module has an intro concept, an action demo, ready-to-use copy-paste prompts, and how-tos for the tools it pairs with."
      />

      {/* Search */}
      <div className="mb-5 flex items-center gap-2 rounded-xl border px-3 h-11 max-w-md" style={{ borderColor: "var(--border)", background: "var(--elevated)" }}>
        <i className="ti ti-search text-[var(--faint)]" aria-hidden="true" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a prompt for… (e.g. quiz, email, roleplay)"
          className="flex-1 bg-transparent text-sm outline-none"
        />
        {q && <button onClick={() => setQ("")} className="text-muted" aria-label="Clear search"><i className="ti ti-x" aria-hidden="true" /></button>}
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-12 text-muted">No modules match that search.</Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((m) => (
            <Link key={m.id} href={`/trainers/module?id=${m.id}`} className="block">
              <Card lift className="h-full flex items-start gap-4">
                <IconTile icon={m.icon} tone={m.tone} size="lg" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-muted">Module {m.order}</div>
                  <div className="text-base font-bold">{m.title}</div>
                  <div className="text-xs text-muted">{m.subtitle}</div>
                  <div className="mt-3 text-xs font-semibold text-[var(--accent)]">{m.templates.length} prompt templates →</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
