/**
 * Admin aggregation. Reads the directory-style collections (users, cohorts, ngos, invites, flags)
 * and the Cloud-Function-maintained `stats/summary` counters.
 */
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { listAllUsers } from "@/lib/db/users";
import { listAllCohorts, listNgos } from "@/lib/db/cohorts";
import { listInvites } from "@/lib/db/invites";
import { listFlags, type PortalFlag } from "@/lib/db/flags";
import type { Cohort, Invite, Ngo, PlatformStats, UserProfile } from "@/lib/types";

const EMPTY_STATS: PlatformStats = { totalStudents: 0, totalSubmissions: 0, pendingReviews: 0, avgReadiness: 0 };

export interface AdminData {
  users: UserProfile[];
  cohorts: Cohort[];
  ngos: Ngo[];
  invites: Invite[];
  flags: PortalFlag[];
  stats: PlatformStats;
}

async function loadStats(): Promise<PlatformStats> {
  try {
    const snap = await getDoc(doc(db, "stats", "summary"));
    return snap.exists() ? { ...EMPTY_STATS, ...(snap.data() as Partial<PlatformStats>) } : { ...EMPTY_STATS };
  } catch {
    return { ...EMPTY_STATS };
  }
}

export async function loadAdminData(): Promise<AdminData> {
  const [users, cohorts, ngos, invites, flags, stats] = await Promise.all([
    listAllUsers().catch(() => [] as UserProfile[]),
    listAllCohorts().catch(() => [] as Cohort[]),
    listNgos().catch(() => [] as Ngo[]),
    listInvites().catch(() => [] as Invite[]),
    listFlags().catch(() => [] as PortalFlag[]),
    loadStats(),
  ]);
  return { users, cohorts, ngos, invites, flags, stats };
}
