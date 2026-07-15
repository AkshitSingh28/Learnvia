"use client";

/**
 * Slim AI-usage bar for the charcoal "AI console" surface. Shows how many of the rolling-window
 * runs are used (used / limit) with a colour that shifts as the student runs low, plus a "frees up
 * in ~Nh" hint once depleted. Reads the rolling window straight off `useStudent()`, so every place
 * it renders stays in sync. Drop it wherever the old "N left today" text used to sit.
 */
import { useStudent } from "@/lib/data/DataProvider";

/** Human "in ~2h 10m" until the next slot frees, from an epoch-ms target. */
function untilLabel(resetAt: number): string {
  const ms = Math.max(0, resetAt - Date.now());
  const totalMin = Math.ceil(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h <= 0) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function AiUsageMeter({ className }: { className?: string }) {
  const { aiRemaining, aiLimit, aiResetAt } = useStudent();
  const used = Math.min(aiLimit, aiLimit - aiRemaining);
  const pct = aiLimit > 0 ? (used / aiLimit) * 100 : 0;

  const empty = aiRemaining <= 0;
  const low = !empty && aiRemaining <= 3;
  const fillClass = empty ? "is-empty" : low ? "is-low" : "";

  return (
    <div className={className} aria-label={`AI runs: ${used} of ${aiLimit} used`}>
      <div className="flex items-center justify-between text-[11px] mb-1" style={{ color: "var(--aic-faint)" }}>
        <span>AI runs used</span>
        <span>
          {used} / {aiLimit}
          {empty && aiResetAt ? ` · frees up in ~${untilLabel(aiResetAt)}` : ""}
        </span>
      </div>
      <div className="aic-meter-track">
        <div className={`aic-meter-fill ${fillClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
