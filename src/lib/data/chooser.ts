/**
 * "Help me choose" recommendation logic. Turns the 4 chooser answers into one main
 * track suggestion plus one backup, applying the doc's device rules
 * (mobile-only / no-computer → don't start with Web/Tech first).
 */
import type { ChooserQuestion, Track } from "@/lib/types";

export interface ChooserResult {
  main: Track;
  backup: Track;
  /** Any guidance note surfaced from the device answer. */
  note?: string;
  reason: string;
}

const WEB_TRACK = "t5";
const MOBILE_SAFE = ["t4", "t2", "t3"]; // Customer Support, Design, Content

/**
 * @param questions the chooser questions (for option → trackId lookup)
 * @param answers   answer index per question id
 * @param tracks    all tracks (to resolve ids → Track objects)
 */
export function recommendTracks(
  questions: ChooserQuestion[],
  answers: Record<string, number>,
  tracks: Track[],
): ChooserResult | null {
  const byId = (id?: string) => tracks.find((t) => t.id === id);
  const optionFor = (qid: string) => {
    const q = questions.find((x) => x.id === qid);
    const idx = answers[qid];
    return q && idx != null ? q.options[idx] : undefined;
  };

  const q1 = optionFor("q1"); // strongest signal — interest
  const q2 = optionFor("q2"); // device constraint
  const q4 = optionFor("q4"); // goal (used for backup)
  if (!q1?.trackId) return null;

  // Tally weighted votes: interest x3, goal x2, confidence x1.
  const votes = new Map<string, number>();
  const add = (id: string | undefined, w: number) => { if (id) votes.set(id, (votes.get(id) ?? 0) + w); };
  add(q1.trackId, 3);
  add(q4?.trackId, 2);
  add(optionFor("q3")?.trackId, 1);

  const mobileOnly = q2?.label.startsWith("Mobile only") || q2?.label.startsWith("No regular");

  let mainId = q1.trackId;
  let note: string | undefined;
  // Device rule: never recommend Web/Tech first without a computer.
  if (mainId === WEB_TRACK && mobileOnly) {
    mainId = MOBILE_SAFE[0];
    note = "Web/Tech needs a computer, so we've suggested a mobile-friendly track first — you can add Web/Tech later.";
  } else if (q2?.note) {
    note = q2.note;
  }

  // Backup = best-scoring track that isn't the main; device-aware fallback.
  const ranked = [...votes.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
  let backupId = ranked.find((id) => id !== mainId)
    ?? q4?.trackId
    ?? (mainId === "t1" ? "t2" : "t1");
  if (backupId === WEB_TRACK && mobileOnly) backupId = MOBILE_SAFE.find((id) => id !== mainId) ?? "t1";
  if (backupId === mainId) backupId = MOBILE_SAFE.find((id) => id !== mainId) ?? "t1";

  const main = byId(mainId);
  const backup = byId(backupId);
  if (!main || !backup) return null;

  return {
    main,
    backup,
    note,
    reason: `Based on what you enjoy (${q1.label.toLowerCase()})${q4 ? ` and wanting ${q4.label.toLowerCase()}` : ""}, this track fits you best.`,
  };
}
