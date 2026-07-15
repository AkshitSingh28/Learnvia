import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Role, UserProfile } from "@/lib/types";

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export async function createUserProfile(profile: UserProfile): Promise<void> {
  await setDoc(doc(db, "users", profile.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const clean = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined));
  await updateDoc(doc(db, "users", uid), clean);
}

/** All users (admin). */
export async function listAllUsers(): Promise<UserProfile[]> {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => d.data() as UserProfile);
}

/** Students belonging to any of the given cohorts (mentor/NGO scope). */
export async function listStudentsInCohorts(cohortIds: string[]): Promise<UserProfile[]> {
  if (cohortIds.length === 0) return [];
  const snap = await getDocs(
    query(collection(db, "users"), where("cohortId", "in", cohortIds.slice(0, 30)), where("role", "==", "student")),
  );
  return snap.docs.map((d) => d.data() as UserProfile);
}

/** Admin: set a user's role (the Cloud Function mirrors it into the custom claim). */
export async function setUserRole(uid: string, role: Role): Promise<void> {
  await updateDoc(doc(db, "users", uid), { role });
}
