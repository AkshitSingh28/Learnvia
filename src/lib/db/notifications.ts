/**
 * Notifications repository. Top-level `notifications` collection keyed by `userId`. Most docs are
 * written server-side by Cloud Functions (e.g. on submission review); the client reads its own and
 * marks them read.
 */
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { NotificationItem } from "@/lib/types";

export async function listNotifications(uid: string): Promise<NotificationItem[]> {
  const snap = await getDocs(
    query(collection(db, "notifications"), where("userId", "==", uid), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<NotificationItem, "id">) }));
}

export async function markNotificationRead(id: string): Promise<void> {
  await updateDoc(doc(db, "notifications", id), { read: true });
}
