/**
 * Staff (mentor/NGO) aggregation. Loads the staff user's cohorts, the students in them with a
 * derived readiness/phase-1 summary, and the submissions across those cohorts. Cohort-scoped reads
 * (a handful of students) — fine client-side; platform-wide numbers come from `stats/summary`.
 */
import { listCohortsForStaff } from "@/lib/db/cohorts";
import { listStudentsInCohorts } from "@/lib/db/users";
import { loadStudentData } from "@/lib/db/studentData";
import { listSubmissionsForCohorts } from "@/lib/db/submissions";
import { deriveReadiness } from "@/lib/data/derive";
import type { Application, Cohort, Module, StudentSummary, Submission, Track } from "@/lib/types";

export interface StaffStudent extends StudentSummary {
  uid: string;
  portfolioCount: number;
  badgeCount: number;
}

export interface StaffApplication extends Application {
  studentName: string;
}

export interface StaffData {
  cohorts: Cohort[];
  students: StaffStudent[];
  submissions: Submission[];
  applications: StaffApplication[];
}

export async function loadStaffData(
  uid: string,
  content: { modules: Module[]; tracks: Track[] },
): Promise<StaffData> {
  const cohorts = await listCohortsForStaff(uid);
  const cohortIds = cohorts.map((c) => c.id);
  const cohortName = (id?: string) => cohorts.find((c) => c.id === id)?.name ?? "—";

  const [profiles, submissions] = await Promise.all([
    listStudentsInCohorts(cohortIds),
    listSubmissionsForCohorts(cohortIds),
  ]);

  const pendingByStudent = submissions.reduce<Record<string, number>>((acc, s) => {
    if (s.status === "Pending") acc[s.studentId] = (acc[s.studentId] ?? 0) + 1;
    return acc;
  }, {});

  const applications: StaffApplication[] = [];

  const students: StaffStudent[] = await Promise.all(
    profiles.map(async (p) => {
      const data = await loadStudentData(p.uid);
      const readiness = deriveReadiness(content.modules, content.tracks, data);
      const phase1 = content.modules.length
        ? Math.round(content.modules.reduce((s, m) => s + (data.moduleProgress[m.id] ?? 0), 0) / content.modules.length)
        : 0;
      data.applications.forEach((a) => applications.push({ ...a, studentName: p.displayName }));
      return {
        uid: p.uid,
        id: p.uid,
        name: p.displayName,
        cohort: cohortName(p.cohortId),
        readiness: readiness.score,
        phase1,
        pendingReviews: pendingByStudent[p.uid] ?? 0,
        portfolioCount: data.portfolio.length,
        badgeCount: data.earnedBadges.length,
      };
    }),
  );

  return { cohorts, students, submissions, applications };
}
