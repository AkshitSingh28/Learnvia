/**
 * Submissions repository. A submission is a student's "submit for review" action — a pasted link
 * to their work (link-only for now; Storage uploads come later). Students create + read their own;
 * mentors/admins read by cohort and update status/feedback.
 */
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Submission } from "@/lib/types";

const col = () => collection(db, "submissions");

function relativeAgo(ts?: Timestamp): string {
  if (!ts) return "just now";
  const diff = Date.now() - ts.toMillis();
  const h = Math.floor(diff / 3.6e6);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function mapSubmission(d: QueryDocumentSnapshot<DocumentData>): Submission {
  const data = d.data();
  return {
    id: d.id,
    ...(data as Omit<Submission, "id">),
    submittedAgo: relativeAgo(data.createdAt as Timestamp | undefined),
  };
}

export interface NewSubmission {
  studentId: string;
  studentName: string;
  cohortId?: string;
  refType: Submission["refType"];
  refTitle: string;
  link?: string;
}

export async function createSubmission(data: NewSubmission): Promise<void> {
  await addDoc(col(), {
    ...data,
    cohortId: data.cohortId ?? null,
    link: data.link ?? null,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
}

export async function listSubmissionsForStudent(uid: string): Promise<Submission[]> {
  const snap = await getDocs(query(col(), where("studentId", "==", uid), orderBy("createdAt", "desc")));
  return snap.docs.map(mapSubmission);
}

export async function listSubmissionsForCohorts(
  cohortIds: string[],
  status?: Submission["status"],
): Promise<Submission[]> {
  if (cohortIds.length === 0) return [];
  // Firestore `in` supports up to 30 values — fine for a mentor's handful of cohorts.
  const clauses = [where("cohortId", "in", cohortIds.slice(0, 30))];
  if (status) clauses.push(where("status", "==", status));
  const snap = await getDocs(query(col(), ...clauses, orderBy("createdAt", "desc")));
  return snap.docs.map(mapSubmission);
}

export async function updateSubmission(
  id: string,
  patch: { status: Submission["status"]; feedback?: string; reviewedBy?: string },
): Promise<void> {
  await updateDoc(doc(db, "submissions", id), {
    ...patch,
    feedback: patch.feedback ?? null,
    reviewedBy: patch.reviewedBy ?? null,
  });
}
