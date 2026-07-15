/**
 * Cohorts + NGOs repositories. Cohorts link students (via `users.cohortId`) to the staff who own
 * them (`mentorId` / `ngoId` = that staff user's uid). Counters (`students`) are maintained by the
 * `redeemInvite` Cloud Function.
 */
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Cohort, Ngo } from "@/lib/types";

export async function listAllCohorts(): Promise<Cohort[]> {
  const snap = await getDocs(collection(db, "cohorts"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Cohort, "id">) }));
}

/** Cohorts a staff user owns — as mentor or as NGO. */
export async function listCohortsForStaff(uid: string): Promise<Cohort[]> {
  const [asMentor, asNgo] = await Promise.all([
    getDocs(query(collection(db, "cohorts"), where("mentorId", "==", uid))),
    getDocs(query(collection(db, "cohorts"), where("ngoId", "==", uid))),
  ]);
  const map = new Map<string, Cohort>();
  [...asMentor.docs, ...asNgo.docs].forEach((d) => map.set(d.id, { id: d.id, ...(d.data() as Omit<Cohort, "id">) }));
  return [...map.values()];
}

export async function getCohort(id: string): Promise<Cohort | null> {
  const snap = await getDoc(doc(db, "cohorts", id));
  return snap.exists() ? { id: snap.id, ...(snap.data() as Omit<Cohort, "id">) } : null;
}

export async function saveCohort(cohort: Cohort): Promise<void> {
  await setDoc(doc(db, "cohorts", cohort.id), cohort, { merge: true });
}

export async function listNgos(): Promise<Ngo[]> {
  const snap = await getDocs(collection(db, "ngos"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Ngo, "id">) }));
}

export async function saveNgo(ngo: Ngo): Promise<void> {
  await setDoc(doc(db, "ngos", ngo.id), ngo, { merge: true });
}
