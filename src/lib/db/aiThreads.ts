/**
 * Growvia Coach conversation, persisted one document per user at `aiThreads/{uid}`.
 * Kept deliberately small: only the recent tail of the conversation is stored (older turns are
 * dropped) so the doc stays light and each model call sends bounded history.
 */
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

/** A single stored turn. Mirrors ChatSurface's public message shape (minus transient error flags). */
export interface ThreadMessage {
  role: "user" | "model";
  text: string;
}

/** How many recent turns we keep per user. */
export const THREAD_MAX = 40;

export async function loadThread(uid: string): Promise<ThreadMessage[]> {
  const snap = await getDoc(doc(db, "aiThreads", uid));
  if (!snap.exists()) return [];
  const data = snap.data() as { messages?: ThreadMessage[] };
  return Array.isArray(data.messages) ? data.messages : [];
}

export async function saveThread(uid: string, messages: ThreadMessage[]): Promise<void> {
  const trimmed = messages.slice(-THREAD_MAX);
  await setDoc(doc(db, "aiThreads", uid), { messages: trimmed, updatedAt: new Date().toISOString() }, { merge: true });
}
