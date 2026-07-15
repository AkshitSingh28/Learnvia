"use client";

/**
 * App-wide live-data layer. `ContentProvider` loads the shared catalog from Firestore once
 * (falling back to seed until an admin seeds the DB). `StudentProvider` loads the signed-in
 * user's StudentData doc and exposes mutators that persist to Firestore and update local state
 * optimistically. Student pages call `useStudent()`; admin/content pages call `useContent()`.
 */
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { loadContent, type ContentBundle } from "@/lib/db/content";
import {
  modules as seedModules,
  tracks as seedTracks,
  portals as seedPortals,
  projects as seedProjects,
  badges as seedBadges,
  module5 as seedModule5,
} from "@/lib/seed/data";
import {
  loadStudentData,
  saveStudentData,
  EMPTY_STUDENT_DATA,
  type StudentData,
} from "@/lib/db/studentData";
import { deriveModules, deriveTracks, deriveBadges, deriveReadiness } from "@/lib/data/derive";
import { createSubmission, listSubmissionsForStudent, updateSubmission, type NewSubmission } from "@/lib/db/submissions";
import { loadStaffData, type StaffData, type StaffStudent } from "@/lib/db/staff";
import { loadAdminData, type AdminData } from "@/lib/db/admin";
import type { Application, Badge, Cohort, Module, PortfolioItem, Readiness, Submission, Track } from "@/lib/types";

const SEED_FALLBACK: ContentBundle = {
  modules: seedModules,
  tracks: seedTracks,
  portals: seedPortals,
  projects: seedProjects,
  badges: seedBadges,
};

// ─────────────────────────── Content ───────────────────────────

interface ContentState extends ContentBundle {
  loading: boolean;
  seeded: boolean;
  reload: () => Promise<void>;
}

const ContentContext = createContext<ContentState | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentBundle>({ modules: [], tracks: [], portals: [], projects: [], badges: [] });
  const [seeded, setSeeded] = useState(false);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const { content, seeded } = await loadContent();
      setContent(content);
      setSeeded(seeded);
    } catch {
      // Offline / rules / not-yet-configured: fall back to bundled seed so the app still renders.
      setContent(SEED_FALLBACK);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void reload(); }, [reload]);

  return (
    <ContentContext.Provider value={{ ...content, seeded, loading, reload }}>
      <StudentProvider>
        <StaffProvider>
          <AdminProvider>{children}</AdminProvider>
        </StaffProvider>
      </StudentProvider>
    </ContentContext.Provider>
  );
}

export function useContent(): ContentState {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}

// ─────────────────────────── Student ───────────────────────────

interface StudentState {
  loading: boolean;
  modules: Module[]; // merged with per-user progress + lock state
  tracks: Track[];
  badges: Badge[];
  readiness: Readiness;
  portfolio: PortfolioItem[];
  applications: Application[];
  submissions: Submission[];
  reflections: Record<string, string>;
  /** The skill track the student has chosen (from the chooser / build flow). */
  chosenTrackId?: string;
  /** Completion sets keyed by context ("track:<id>", "module5", "web"). */
  checkedItems: Record<string, string[]>;
  /** Record a quiz attempt; on pass, earns the badge and unlocks the next module. */
  submitQuiz: (moduleId: string, score: number) => Promise<{ passed: boolean }>;
  /** Toggle a lesson's done state (drives module % alongside the quiz). */
  toggleLesson: (moduleId: string, lessonId: string) => Promise<void>;
  saveReflection: (moduleId: string, text: string) => Promise<void>;
  setTrackProgress: (trackId: string, progress: number) => Promise<void>;
  /** Record the student's chosen skill track. */
  chooseTrack: (trackId: string) => Promise<void>;
  /** Toggle a checklist item's done state within a context key. */
  toggleChecklistItem: (contextKey: string, itemId: string) => Promise<void>;
  addPortfolioItem: (item: Omit<PortfolioItem, "id">) => Promise<void>;
  addApplication: (app: Omit<Application, "id" | "studentId">) => Promise<void>;
  /** Submit work (a link) for mentor review. */
  addSubmission: (sub: Pick<NewSubmission, "refType" | "refTitle" | "link">) => Promise<void>;
  /** Gemini-backed actions still allowed in the current rolling window. */
  aiRemaining: number;
  /** Ceiling per rolling window (for rendering "used / limit" meters). */
  aiLimit: number;
  /** Epoch-ms when the next slot frees up (oldest use ages out), or null when slots are free. */
  aiResetAt: number | null;
  /** Record one AI use against the rolling window; old uses age out automatically. */
  recordAiUse: () => Promise<void>;
}

/**
 * Per-user AI ceiling: at most AI_WINDOW_LIMIT Gemini-backed actions (chat messages + coaching
 * calls) in any trailing AI_WINDOW_HOURS window. Strict, rolling (not a fixed midnight reset), so a
 * burst can't be doubled up across a boundary — you can never exceed the limit in any 24-hour span.
 * NOTE: this is a soft UX guard, not a security control — it lives in the user's own Firestore doc.
 * Real abuse/billing protection comes from App Check enforcement (see firebase.ts) + Firestore rules.
 */
const AI_WINDOW_LIMIT = 5;
const AI_WINDOW_HOURS = 24;
const AI_WINDOW_MS = AI_WINDOW_HOURS * 60 * 60 * 1000;

/** Timestamps (epoch ms) of AI uses that still fall inside the trailing window. */
function recentAiUses(uses: number[] | undefined, now: number): number[] {
  return (uses ?? []).filter((t) => now - t < AI_WINDOW_MS);
}

const StudentContext = createContext<StudentState | null>(null);

function StudentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const content = useContent();
  const [data, setData] = useState<StudentData>({ ...EMPTY_STUDENT_DATA });
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!user) {
      setData({ ...EMPTY_STUDENT_DATA });
      setSubmissions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      loadStudentData(user.uid),
      listSubmissionsForStudent(user.uid).catch(() => [] as Submission[]),
    ]).then(([d, subs]) => {
      if (active) {
        setData(d);
        setSubmissions(subs);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [user]);

  // Persist a mutation and update local state together.
  const persist = useCallback(
    async (next: StudentData) => {
      setData(next);
      if (user) await saveStudentData(user.uid, next);
    },
    [user],
  );

  const modules = deriveModules(content.modules, data);
  const tracks = deriveTracks(content.tracks, data);
  const badges = deriveBadges(content.badges, data);
  const readiness = deriveReadiness(content.modules, content.tracks, data, { module5Total: seedModule5.length });

  const submitQuiz = useCallback<StudentState["submitQuiz"]>(
    async (moduleId, score) => {
      const mod = content.modules.find((m) => m.id === moduleId);
      const passed = score >= (mod?.passScore ?? 70);
      const next: StudentData = {
        ...data,
        quizScores: { ...data.quizScores, [moduleId]: Math.max(score, data.quizScores[moduleId] ?? 0) },
        earnedBadges: passed && mod?.badge && !data.earnedBadges.includes(mod.badge) ? [...data.earnedBadges, mod.badge] : data.earnedBadges,
      };
      await persist(next);
      return { passed };
    },
    [content.modules, data, persist],
  );

  const toggleLesson = useCallback<StudentState["toggleLesson"]>(
    async (moduleId, lessonId) => {
      const current = data.completedLessons[moduleId] ?? [];
      const nextList = current.includes(lessonId) ? current.filter((id) => id !== lessonId) : [...current, lessonId];
      await persist({ ...data, completedLessons: { ...data.completedLessons, [moduleId]: nextList } });
    },
    [data, persist],
  );

  const saveReflection = useCallback<StudentState["saveReflection"]>(
    async (moduleId, text) => {
      await persist({ ...data, reflections: { ...data.reflections, [moduleId]: text } });
    },
    [data, persist],
  );

  const setTrackProgress = useCallback<StudentState["setTrackProgress"]>(
    async (trackId, progress) => {
      await persist({ ...data, trackProgress: { ...data.trackProgress, [trackId]: progress } });
    },
    [data, persist],
  );

  const chooseTrack = useCallback<StudentState["chooseTrack"]>(
    async (trackId) => {
      await persist({ ...data, chosenTrackId: trackId });
    },
    [data, persist],
  );

  const toggleChecklistItem = useCallback<StudentState["toggleChecklistItem"]>(
    async (contextKey, itemId) => {
      const checked = data.checkedItems ?? {};
      const current = checked[contextKey] ?? [];
      const nextList = current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId];
      await persist({ ...data, checkedItems: { ...checked, [contextKey]: nextList } });
    },
    [data, persist],
  );

  const addPortfolioItem = useCallback<StudentState["addPortfolioItem"]>(
    async (item) => {
      const withId: PortfolioItem = { ...item, id: `pf-${Date.now()}` };
      await persist({ ...data, portfolio: [withId, ...data.portfolio] });
    },
    [data, persist],
  );

  const addApplication = useCallback<StudentState["addApplication"]>(
    async (app) => {
      const withId: Application = { ...app, id: `a-${Date.now()}`, studentId: user?.uid ?? "me" };
      await persist({ ...data, applications: [withId, ...data.applications] });
    },
    [data, persist, user],
  );

  const addSubmission = useCallback<StudentState["addSubmission"]>(
    async (sub) => {
      if (!user) return;
      await createSubmission({
        studentId: user.uid,
        studentName: user.displayName,
        cohortId: user.cohortId,
        ...sub,
      });
      // Optimistic prepend so the student sees it immediately; createdAt fills in on next load.
      setSubmissions((prev) => [
        { id: `tmp-${Date.now()}`, studentId: user.uid, studentName: user.displayName, cohortId: user.cohortId, status: "Pending", submittedAgo: "just now", ...sub },
        ...prev,
      ]);
    },
    [user],
  );

  const recent = recentAiUses(data.aiUses, Date.now());
  const aiRemaining = Math.max(0, AI_WINDOW_LIMIT - recent.length);
  // When depleted, the oldest in-window use frees a slot once it ages past the window.
  const aiResetAt = aiRemaining === 0 && recent.length ? Math.min(...recent) + AI_WINDOW_MS : null;

  const recordAiUse = useCallback<StudentState["recordAiUse"]>(
    async () => {
      const now = Date.now();
      // Prune aged-out uses as we go so the stored array stays bounded (~AI_WINDOW_LIMIT entries).
      const kept = recentAiUses(data.aiUses, now);
      await persist({ ...data, aiUses: [...kept, now] });
    },
    [data, persist],
  );

  return (
    <StudentContext.Provider
      value={{
        loading: loading || content.loading,
        modules,
        tracks,
        badges,
        readiness,
        portfolio: data.portfolio,
        applications: data.applications,
        submissions,
        reflections: data.reflections,
        chosenTrackId: data.chosenTrackId,
        checkedItems: data.checkedItems ?? {},
        submitQuiz,
        toggleLesson,
        saveReflection,
        setTrackProgress,
        chooseTrack,
        toggleChecklistItem,
        addPortfolioItem,
        addApplication,
        addSubmission,
        aiRemaining,
        aiLimit: AI_WINDOW_LIMIT,
        aiResetAt,
        recordAiUse,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent(): StudentState {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used within ContentProvider");
  return ctx;
}

// ─────────────────────────── Staff (mentor / NGO) ───────────────────────────

interface StaffState extends StaffData {
  loading: boolean;
  reload: () => Promise<void>;
  /** Approve / request changes on a submission; persists + notifies via Cloud Function. */
  reviewSubmission: (id: string, status: Submission["status"], feedback?: string) => Promise<void>;
}

const StaffContext = createContext<StaffState | null>(null);

function StaffProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const content = useContent();
  const [data, setData] = useState<StaffData>({ cohorts: [], students: [], submissions: [], applications: [] });
  const [loading, setLoading] = useState(true);

  const isStaff = user?.role === "mentor" || user?.role === "ngo";

  const reload = useCallback(async () => {
    if (!user || !isStaff) {
      setData({ cohorts: [], students: [], submissions: [], applications: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setData(await loadStaffData(user.uid, content));
    } catch {
      setData({ cohorts: [], students: [], submissions: [], applications: [] });
    } finally {
      setLoading(false);
    }
  }, [user, isStaff, content]);

  useEffect(() => { void reload(); }, [reload]);

  const reviewSubmission = useCallback<StaffState["reviewSubmission"]>(
    async (id, status, feedback) => {
      await updateSubmission(id, { status, feedback, reviewedBy: user?.uid });
      setData((prev) => ({
        ...prev,
        submissions: prev.submissions.map((s) => (s.id === id ? { ...s, status, feedback, reviewedBy: user?.uid } : s)),
      }));
    },
    [user],
  );

  return (
    <StaffContext.Provider value={{ ...data, loading: loading || content.loading, reload, reviewSubmission }}>
      {children}
    </StaffContext.Provider>
  );
}

export function useStaff(): StaffState {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error("useStaff must be used within ContentProvider");
  return ctx;
}

// ─────────────────────────── Admin ───────────────────────────

interface AdminState extends AdminData {
  loading: boolean;
  reload: () => Promise<void>;
}

const AdminContext = createContext<AdminState | null>(null);

const EMPTY_ADMIN: AdminData = {
  users: [], cohorts: [], ngos: [], invites: [], flags: [],
  stats: { totalStudents: 0, totalSubmissions: 0, pendingReviews: 0, avgReadiness: 0 },
};

function AdminProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<AdminData>(EMPTY_ADMIN);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin";

  const reload = useCallback(async () => {
    if (!isAdmin) {
      setData(EMPTY_ADMIN);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setData(await loadAdminData());
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => { void reload(); }, [reload]);

  return (
    <AdminContext.Provider value={{ ...data, loading, reload }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminState {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within ContentProvider");
  return ctx;
}

export type { StaffStudent, Cohort };
