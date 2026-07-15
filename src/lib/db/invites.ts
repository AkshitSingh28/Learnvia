/**
 * Invite codes. Reading/generating invite docs is plain Firestore; *redeeming* one goes through
 * the `redeemInvite` Cloud Function so the cohort assignment + counters happen atomically and the
 * role is set as a trusted custom claim.
 */
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/lib/firebase";
import type { Invite } from "@/lib/types";

export async function redeemInvite(code: string): Promise<{ cohortId: string | null; role: string }> {
  const call = httpsCallable<{ code: string }, { cohortId: string | null; role: string }>(functions, "redeemInvite");
  const res = await call({ code });
  return res.data;
}

export async function listInvites(): Promise<Invite[]> {
  const snap = await getDocs(collection(db, "invites"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Invite, "id">) }));
}

/** Admin: create an invite. The code (uppercased) is the document id. */
export async function createInvite(invite: Omit<Invite, "id" | "uses">): Promise<void> {
  const code = invite.code.trim().toUpperCase();
  await setDoc(doc(db, "invites", code), { ...invite, code, uses: 0 });
}
