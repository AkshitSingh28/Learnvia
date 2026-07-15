/**
 * Pure functions that combine shared content with a user's StudentData into the
 * view-model shapes the pages expect (modules/tracks carry per-user progress + lock state,
 * badges carry earned flags, readiness is computed from real activity).
 */
import type { Badge, Module, Readiness, Track } from "@/lib/types";
import type { StudentData } from "@/lib/db/studentData";

/** Has this module's quiz been passed? */
export function quizPassed(m: Module, sd: StudentData): boolean {
  return (sd.quizScores[m.id] ?? 0) >= m.passScore;
}

/**
 * A module's progress, blended from real activity: lessons completed (60%) + quiz passed (40%).
 * 100% therefore requires every lesson marked done *and* a passing quiz.
 */
export function moduleProgressOf(m: Module, sd: StudentData): number {
  const total = m.lessons.length || 1;
  const done = (sd.completedLessons[m.id] ?? []).length;
  const lessonShare = Math.min(done / total, 1) * 60;
  const quizShare = quizPassed(m, sd) ? 40 : 0;
  return Math.round(lessonShare + quizShare);
}

/** Modules with per-user progress, lesson done-flags, and unlock state. Module N unlocks when N-1's quiz passes. */
export function deriveModules(base: Module[], sd: StudentData): Module[] {
  const sorted = [...base].sort((a, b) => a.order - b.order);
  return sorted.map((m, idx) => {
    const doneSet = new Set(sd.completedLessons[m.id] ?? []);
    const lessons = m.lessons.map((l) => ({ ...l, done: doneSet.has(l.id) }));
    const prev = sorted[idx - 1];
    const prevPassed = !prev || quizPassed(prev, sd);
    return { ...m, lessons, progress: moduleProgressOf(m, sd), locked: m.order > 1 && !prevPassed };
  });
}

/** A track's progress = share of its curriculum modules the student has checked off. */
export function trackProgressOf(t: Track, sd: StudentData): number {
  const total = t.modules?.length ?? 0;
  if (total > 0) {
    const done = (sd.checkedItems?.[`track:${t.id}`] ?? []).length;
    return Math.round((Math.min(done, total) / total) * 100);
  }
  // Fallback for tracks without a module table: legacy manual progress.
  return sd.trackProgress[t.id] ?? t.progress;
}

export function deriveTracks(base: Track[], sd: StudentData): Track[] {
  return base.map((t) => ({ ...t, progress: trackProgressOf(t, sd) }));
}

/** Module 5 (Application Readiness) completion, 0..100, from checked sub-modules. */
export function module5ProgressOf(sd: StudentData, total: number): number {
  if (total <= 0) return 0;
  const done = (sd.checkedItems?.module5 ?? []).length;
  return Math.round((Math.min(done, total) / total) * 100);
}

export function deriveBadges(base: Badge[], sd: StudentData): Badge[] {
  return base.map((b) => ({ ...b, earned: sd.earnedBadges.includes(b.title) }));
}

// Master-data readiness weights (out of 100): Phase-1 AI Foundation 20,
// one Phase-2 skill pathway 25, practical assignments 20, portfolio 20,
// Module-5 application readiness 15.
const WEIGHTS = { phase1: 20, phase2: 25, assignments: 20, portfolio: 20, application: 15 };

/**
 * Readiness /100 derived from real activity, per the Phase-3 master-data logic.
 * The "application" component reflects Module-5 (Application Readiness) completion.
 */
export function deriveReadiness(
  modules: Module[],
  tracks: Track[],
  sd: StudentData,
  opts: { module5Total: number } = { module5Total: 0 },
): Readiness {
  const avg = (xs: number[]) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : 0);

  const moduleAvg = avg(modules.map((m) => moduleProgressOf(m, sd))); // Phase 1, 0..100

  // Phase 2 = the student's chosen skill pathway (fallback: best-progressed skill track).
  const skillTracks = tracks.filter((t) => t.kind === "skillTrack");
  const chosen = skillTracks.find((t) => t.id === sd.chosenTrackId);
  const skillProgress = chosen
    ? trackProgressOf(chosen, sd)
    : Math.max(0, ...skillTracks.map((t) => trackProgressOf(t, sd)));

  const quizCount = Object.keys(sd.quizScores).length;

  const phase1 = Math.round((moduleAvg / 100) * WEIGHTS.phase1);
  const phase2 = Math.round((skillProgress / 100) * WEIGHTS.phase2);
  const assignments = Math.min(quizCount * 3, WEIGHTS.assignments);
  const portfolio = Math.min(sd.portfolio.length * 4, WEIGHTS.portfolio);
  const application = Math.round((module5ProgressOf(sd, opts.module5Total) / 100) * WEIGHTS.application);

  const score = phase1 + phase2 + assignments + portfolio + application;
  return { score, breakdown: { phase1, phase2, assignments, portfolio, application } };
}
