/**
 * Per-user student state — the part of the product that must persist per account:
 * module/track progress, quiz scores, earned badges, portfolio items, applications.
 * One document per user at `studentData/{uid}`.
 */
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Application, PortfolioItem } from "@/lib/types";

export interface StudentData {
  moduleProgress: Record<string, number>; // legacy; module progress is now derived from lessons + quiz
  completedLessons: Record<string, string[]>; // moduleId -> lesson ids marked done
  reflections: Record<string, string>; // moduleId -> reflection text
  quizScores: Record<string, number>; // moduleId -> best %
  trackProgress: Record<string, number>; // legacy manual trackId -> 0..100
  earnedBadges: string[]; // badge titles
  portfolio: PortfolioItem[];
  applications: Application[];
  /** The skill track the student picked in the "Help me choose" / build flow. */
  chosenTrackId?: string;
  /**
   * Generic completion sets, keyed by context:
   *  - `track:<id>`  → completed TrackModule orders ("1","2",…)
   *  - `module5`     → completed ReadinessSubModule ids ("5.1",…)
   *  - `web`         → completed web-portfolio checklist items
   */
  checkedItems?: Record<string, string[]>;
  /**
   * Per-user AI usage meter — abuse ceiling for Gemini-backed features. A rolling window: each
   * element is the epoch-ms timestamp of one AI use. The cap counts only the timestamps within the
   * trailing window (see AI_WINDOW_* in DataProvider), so old uses "age out" automatically.
   */
  aiUses?: number[];
  /** @deprecated Legacy daily meter (`{ date, count }`). Superseded by the rolling `aiUses` window. */
  aiUsage?: { date: string; count: number };
  updatedAt?: string;
}

export const EMPTY_STUDENT_DATA: StudentData = {
  moduleProgress: {},
  completedLessons: {},
  reflections: {},
  quizScores: {},
  trackProgress: {},
  earnedBadges: [],
  portfolio: [],
  applications: [],
  checkedItems: {},
};

export async function loadStudentData(uid: string): Promise<StudentData> {
  const snap = await getDoc(doc(db, "studentData", uid));
  if (!snap.exists()) return { ...EMPTY_STUDENT_DATA };
  return { ...EMPTY_STUDENT_DATA, ...(snap.data() as Partial<StudentData>) };
}

export async function saveStudentData(uid: string, data: StudentData): Promise<void> {
  await setDoc(doc(db, "studentData", uid), { ...data, updatedAt: new Date().toISOString() }, { merge: true });
}
